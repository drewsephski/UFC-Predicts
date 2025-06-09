import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * GET /api/fights
 * Get all fights or a specific fight by ID
 * Optional query parameters:
 * - id: Get a specific fight by ID
 * - eventId: Get all fights for a specific event
 * - upcoming: Get upcoming fights (boolean)
 * - completed: Get completed fights (boolean)
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const eventId = searchParams.get("eventId");
    const upcoming = searchParams.get("upcoming") === "true";
    const completed = searchParams.get("completed") === "true";
    
    // If ID is provided, return a specific fight with fighter details
    if (id) {
      const fight = await db.fight.findUnique({
        where: { id },
        include: {
          event: true,
          redCorner: true,
          blueCorner: true,
        }
      });
      
      if (!fight) {
        console.log(`GET /api/fights?id=${id}: Fight not found in database.`);
        return NextResponse.json(
          { error: "Fight not found", details: `No fight found with ID ${id}` },
          { status: 404 }
        );
      }
      
      return NextResponse.json(fight);
    }
    
    // If eventId is provided, return all fights for that event
    if (eventId) {
      const fights = await db.fight.findMany({
        where: { eventId },
        include: {
          redCorner: true,
          blueCorner: true,
        },
        orderBy: [
          { isMainEvent: 'desc' },
          { isTitleFight: 'desc' },
        ]
      });
      
      return NextResponse.json(fights);
    }
    
    // Filter by upcoming or completed status
    let whereClause = {};
    
    if (upcoming) {
      whereClause = {
        ...whereClause,
        status: "scheduled",
        event: {
          date: {
            gte: new Date()
          }
        }
      };
    }
    
    if (completed) {
      whereClause = {
        ...whereClause,
        status: "completed"
      };
    }
    
    // Return all fights with basic filtering
    const fights = await db.fight.findMany({
      where: whereClause,
      include: {
        event: true,
        redCorner: {
          select: {
            id: true,
            name: true,
            nickname: true,
            record: true,
            imageUrl: true,
            isChampion: true
          }
        },
        blueCorner: {
          select: {
            id: true,
            name: true,
            nickname: true,
            record: true,
            imageUrl: true,
            isChampion: true
          }
        }
      },
      orderBy: [
        { 
          event: {
            date: 'asc'
          }
        },
        { isMainEvent: 'desc' }
      ],
      take: 20 // Limit results to prevent large payloads
    });
    
    return NextResponse.json(fights);
  } catch (error: any) {
    const queryParams = req.nextUrl.searchParams.toString();
    console.error(`GET /api/fights?${queryParams}: Error fetching fights.`, error);
    return NextResponse.json(
      {
        error: "Failed to fetch fights from database.",
        details: error.message || "An unknown database error occurred."
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/fights
 * Create a new fight
 * Requires authentication
 */
export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    
    // Check if user is authenticated
    if (!userId) {
      console.warn(`POST /api/fights: Unauthorized access attempt.`);
      return NextResponse.json(
        { error: "Unauthorized", details: "User authentication required." },
        { status: 401 }
      );
    }
    
    // Get user from database and check if admin
    const user = await db.user.findUnique({
      where: { clerkId: userId }
    });
    
    if (!user || user.role !== "admin") {
      console.warn(`POST /api/fights: Forbidden access attempt by userId ${userId} (not an admin).`);
      return NextResponse.json(
        { error: "Forbidden", details: "Admin access required to create fights." },
        { status: 403 }
      );
    }
    
    // Get fight data from request body
    let data;
    try {
      data = await req.json();
    } catch (parseError: any) {
      console.warn(`POST /api/fights: Invalid JSON in request body for userId: ${userId}.`, parseError);
      return NextResponse.json({ error: "Invalid request body", details: "Request body must be valid JSON." }, { status: 400 });
    }
    
    // Validate required fields
    const requiredFields = ['eventId', 'redCornerId', 'blueCornerId', 'weightClass', 'status', 'date'];
    const missingFields = requiredFields.filter(field => !(field in data) || data[field] === null || data[field] === undefined);

    if (missingFields.length > 0) {
      console.warn(`POST /api/fights: Missing required fields by userId ${userId}. Missing: ${missingFields.join(', ')}`);
      return NextResponse.json(
        { error: "Missing required fields", details: `The following fields are required: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }
    
    // Create new fight
    const fight = await db.fight.create({
      data,
      include: {
        event: true,
        redCorner: true,
        blueCorner: true
      }
    });
    
    return NextResponse.json(fight, { status: 201 });
  } catch (error: any) {
    const { userId } = auth(); // Re-auth for logging userId if available
    console.error(`POST /api/fights: Error creating fight by userId ${userId || 'unknown'}.`, error);
    return NextResponse.json(
      { error: "Failed to create fight in database.", details: error.message || "An unknown database error occurred." },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/fights
 * Update a fight
 * Requires authentication and admin role
 */
export async function PUT(req: NextRequest) {
  try {
    const { userId } = auth();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    
    // Check if user is authenticated
    if (!userId) {
      console.warn(`PUT /api/fights: Unauthorized access attempt for fightId ${id || 'unknown'}.`);
      return NextResponse.json(
        { error: "Unauthorized", details: "User authentication required." },
        { status: 401 }
      );
    }
    
    // Get user from database and check if admin
    const user = await db.user.findUnique({
      where: { clerkId: userId }
    });
    
    if (!user || user.role !== "admin") {
      console.warn(`PUT /api/fights: Forbidden access attempt by userId ${userId} (not an admin) for fightId ${id || 'unknown'}.`);
      return NextResponse.json(
        { error: "Forbidden", details: "Admin access required to update fights." },
        { status: 403 }
      );
    }
    
    // Check if fight ID is provided
    if (!id) {
      console.warn(`PUT /api/fights: Fight ID is missing in query params for userId: ${userId}.`);
      return NextResponse.json(
        { error: "Fight ID is required", details: "Fight ID must be provided as a query parameter 'id'." },
        { status: 400 }
      );
    }
    
    // Get fight data from request body
    let data;
    try {
      data = await req.json();
    } catch (parseError: any) {
      console.warn(`PUT /api/fights: Invalid JSON in request body for userId: ${userId}, fightId: ${id}.`, parseError);
      return NextResponse.json({ error: "Invalid request body", details: "Request body must be valid JSON." }, { status: 400 });
    }
    
    // Update fight
    const fight = await db.fight.update({
      where: { id },
      data,
      include: {
        event: true,
        redCorner: true,
        blueCorner: true
      }
    });
    
    return NextResponse.json(fight);
  } catch (error: any) {
    const { userId } = auth(); // Re-auth for logging
    const fightId = new URL(req.url).searchParams.get("id"); // Re-get for logging
    if (error.code === 'P2025') { // Prisma's record not found error
        console.warn(`PUT /api/fights: Fight not found for update. fightId: ${fightId}, userId: ${userId || 'unknown'}.`, error);
        return NextResponse.json({ error: "Fight not found", details: `Fight with ID ${fightId} not found.` }, { status: 404 });
    }
    console.error(`PUT /api/fights: Error updating fight ${fightId || 'unknown'} by userId ${userId || 'unknown'}.`, error);
    return NextResponse.json(
      { error: "Failed to update fight in database.", details: error.message || "An unknown database error occurred." },
      { status: 500 }
    );
  }
}
