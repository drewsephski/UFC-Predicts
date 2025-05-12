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
        return NextResponse.json(
          { error: "Fight not found" },
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
  } catch (error) {
    console.error("Error fetching fights:", error);
    return NextResponse.json(
      { error: "Failed to fetch fights" },
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
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    // Get user from database and check if admin
    const user = await db.user.findUnique({
      where: { clerkId: userId }
    });
    
    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized - Admin access required" },
        { status: 403 }
      );
    }
    
    // Get fight data from request body
    const data = await req.json();
    
    // Validate required fields
    if (!data.eventId || !data.redCornerId || !data.blueCornerId || !data.weightClass) {
      return NextResponse.json(
        { error: "Missing required fields" },
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
  } catch (error) {
    console.error("Error creating fight:", error);
    return NextResponse.json(
      { error: "Failed to create fight" },
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
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    // Get user from database and check if admin
    const user = await db.user.findUnique({
      where: { clerkId: userId }
    });
    
    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized - Admin access required" },
        { status: 403 }
      );
    }
    
    // Check if fight ID is provided
    if (!id) {
      return NextResponse.json(
        { error: "Fight ID is required" },
        { status: 400 }
      );
    }
    
    // Get fight data from request body
    const data = await req.json();
    
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
  } catch (error) {
    console.error("Error updating fight:", error);
    return NextResponse.json(
      { error: "Failed to update fight" },
      { status: 500 }
    );
  }
}
