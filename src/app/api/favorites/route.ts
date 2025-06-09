import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { userId } = auth();
    
    // Check if user is authenticated
    if (!userId) {
      console.warn("GET /api/favorites: Unauthorized access attempt.");
      return NextResponse.json(
        { error: "Unauthorized", details: "User authentication required." },
        { status: 401 }
      );
    }
    
    // Get user from database
    const user = await db.user.findUnique({
      where: { clerkId: userId }
    });
    
    if (!user) {
      console.warn(`GET /api/favorites: User not found in DB for clerkId: ${userId}`);
      return NextResponse.json(
        { error: "User not found", details: "Authenticated user not found in database." },
        { status: 404 }
      );
    }
    
    // Get user's favorite fighters with fighter details
    const favorites = await db.favorite.findMany({
      where: { userId: user.id },
      include: { fighter: true }
    });
    
    return NextResponse.json(favorites);
  } catch (error: any) {
    const { userId } = auth(); // Get userId again for logging, or pass from outer scope
    console.error(`GET /api/favorites: Error fetching favorites for userId ${userId || 'unknown'}.`, error);
    return NextResponse.json(
      { error: "Failed to fetch favorites from database.", details: error.message || "An unknown database error occurred." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  let userId: string | null = null;
  let fighterIdRequestBody: string | null = null;
  try {
    const authResult = auth();
    userId = authResult.userId;
    
    // Check if user is authenticated
    if (!userId) {
      console.warn("POST /api/favorites: Unauthorized access attempt.");
      return NextResponse.json(
        { error: "Unauthorized", details: "User authentication required." },
        { status: 401 }
      );
    }
    
    // Get user from database
    const user = await db.user.findUnique({
      where: { clerkId: userId }
    });
    
    if (!user) {
      console.warn(`POST /api/favorites: User not found in DB for clerkId: ${userId}`);
      return NextResponse.json(
        { error: "User not found", details: "Authenticated user not found in database." },
        { status: 404 }
      );
    }
    
    // Get fighter ID from request body
    let requestBody;
    try {
      requestBody = await req.json();
    } catch (parseError: any) {
      console.warn(`POST /api/favorites: Invalid JSON in request body for userId: ${userId}.`, parseError);
      return NextResponse.json({ error: "Invalid request body", details: "Request body must be valid JSON." }, { status: 400 });
    }
    fighterIdRequestBody = requestBody.fighterId;
    
    if (!fighterIdRequestBody) {
      console.warn(`POST /api/favorites: Fighter ID is missing in request body for userId: ${userId}.`);
      return NextResponse.json(
        { error: "Fighter ID is required", details: "fighterId must be provided in the request body." },
        { status: 400 }
      );
    }
    
    // Check if fighter exists
    const fighter = await db.fighter.findUnique({
      where: { id: fighterIdRequestBody }
    });
    
    if (!fighter) {
      console.log(`POST /api/favorites: Fighter not found with ID: ${fighterIdRequestBody} for userId: ${userId}.`);
      return NextResponse.json(
        { error: "Fighter not found", details: `Fighter with ID ${fighterIdRequestBody} does not exist.` },
        { status: 404 }
      );
    }
    
    // Check if favorite already exists
    const existingFavorite = await db.favorite.findFirst({
      where: {
        userId: user.id,
        fighterId: fighterIdRequestBody
      }
    });
    
    if (existingFavorite) {
      console.log(`POST /api/favorites: Fighter ${fighterIdRequestBody} already in favorites for userId: ${userId}.`);
      return NextResponse.json(
        { error: "Fighter is already in favorites", details: `Fighter with ID ${fighterIdRequestBody} is already in your favorites.` },
        { status: 400 }
      );
    }
    
    // Create new favorite
    const favorite = await db.favorite.create({
      data: {
        userId: user.id,
        fighterId: fighterIdRequestBody
      },
      include: { fighter: true }
    });
    
    return NextResponse.json(favorite, { status: 201 });
  } catch (error: any) {
    console.error(`POST /api/favorites: Error adding favorite for userId ${userId || 'unknown'} and fighterId ${fighterIdRequestBody || 'unknown'}.`, error);
    return NextResponse.json(
      { error: "Failed to add favorite to database.", details: error.message || "An unknown database error occurred." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  let userId: string | null = null;
  let favoriteIdQueryParam: string | null = null;
  try {
    const authResult = auth();
    userId = authResult.userId;
    const { searchParams } = new URL(req.url);
    favoriteIdQueryParam = searchParams.get("id");
    
    // Check if user is authenticated
    if (!userId) {
      console.warn("DELETE /api/favorites: Unauthorized access attempt.");
      return NextResponse.json(
        { error: "Unauthorized", details: "User authentication required." },
        { status: 401 }
      );
    }
    
    // Get user from database
    const user = await db.user.findUnique({
      where: { clerkId: userId }
    });
    
    if (!user) {
      console.warn(`DELETE /api/favorites: User not found in DB for clerkId: ${userId}`);
      return NextResponse.json(
        { error: "User not found", details: "Authenticated user not found in database." },
        { status: 404 }
      );
    }
    
    // Check if favorite ID is provided
    if (!favoriteIdQueryParam) {
      console.warn(`DELETE /api/favorites: Favorite ID is missing in query params for userId: ${userId}.`);
      return NextResponse.json(
        { error: "Favorite ID is required", details: "Favorite ID must be provided as a query parameter 'id'." },
        { status: 400 }
      );
    }
    
    // Check if favorite exists and belongs to user
    const favorite = await db.favorite.findFirst({
      where: {
        id: favoriteIdQueryParam,
        userId: user.id
      }
    });
    
    if (!favorite) {
      console.log(`DELETE /api/favorites: Favorite not found with ID ${favoriteIdQueryParam} or does not belong to userId: ${userId}.`);
      return NextResponse.json(
        { error: "Favorite not found or does not belong to user", details: `Favorite with ID ${favoriteIdQueryParam} not found or you do not have permission to delete it.` },
        { status: 404 }
      );
    }
    
    // Delete favorite
    await db.favorite.delete({
      where: { id: favoriteIdQueryParam }
    });
    
    return NextResponse.json({ success: true, message: `Favorite with ID ${favoriteIdQueryParam} removed successfully.` });
  } catch (error: any) {
    console.error(`DELETE /api/favorites: Error removing favorite ${favoriteIdQueryParam || 'unknown'} for userId ${userId || 'unknown'}.`, error);
    return NextResponse.json(
      { error: "Failed to remove favorite from database.", details: error.message || "An unknown database error occurred." },
      { status: 500 }
    );
  }
}
