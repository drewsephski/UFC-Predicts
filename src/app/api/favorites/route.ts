import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { userId } = auth();
    
    // Check if user is authenticated
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    // Get user from database
    const user = await db.user.findUnique({
      where: { clerkId: userId }
    });
    
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }
    
    // Get user's favorite fighters with fighter details
    const favorites = await db.favorite.findMany({
      where: { userId: user.id },
      include: { fighter: true }
    });
    
    return NextResponse.json(favorites);
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return NextResponse.json(
      { error: "Failed to fetch favorites" },
      { status: 500 }
    );
  }
}

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
    
    // Get user from database
    const user = await db.user.findUnique({
      where: { clerkId: userId }
    });
    
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }
    
    // Get fighter ID from request body
    const { fighterId } = await req.json();
    
    if (!fighterId) {
      return NextResponse.json(
        { error: "Fighter ID is required" },
        { status: 400 }
      );
    }
    
    // Check if fighter exists
    const fighter = await db.fighter.findUnique({
      where: { id: fighterId }
    });
    
    if (!fighter) {
      return NextResponse.json(
        { error: "Fighter not found" },
        { status: 404 }
      );
    }
    
    // Check if favorite already exists
    const existingFavorite = await db.favorite.findFirst({
      where: {
        userId: user.id,
        fighterId
      }
    });
    
    if (existingFavorite) {
      return NextResponse.json(
        { error: "Fighter is already in favorites" },
        { status: 400 }
      );
    }
    
    // Create new favorite
    const favorite = await db.favorite.create({
      data: {
        userId: user.id,
        fighterId
      },
      include: { fighter: true }
    });
    
    return NextResponse.json(favorite, { status: 201 });
  } catch (error) {
    console.error("Error adding favorite:", error);
    return NextResponse.json(
      { error: "Failed to add favorite" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { userId } = auth();
    const { searchParams } = new URL(req.url);
    const favoriteId = searchParams.get("id");
    
    // Check if user is authenticated
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    // Get user from database
    const user = await db.user.findUnique({
      where: { clerkId: userId }
    });
    
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }
    
    // Check if favorite ID is provided
    if (!favoriteId) {
      return NextResponse.json(
        { error: "Favorite ID is required" },
        { status: 400 }
      );
    }
    
    // Check if favorite exists and belongs to user
    const favorite = await db.favorite.findFirst({
      where: {
        id: favoriteId,
        userId: user.id
      }
    });
    
    if (!favorite) {
      return NextResponse.json(
        { error: "Favorite not found or does not belong to user" },
        { status: 404 }
      );
    }
    
    // Delete favorite
    await db.favorite.delete({
      where: { id: favoriteId }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error removing favorite:", error);
    return NextResponse.json(
      { error: "Failed to remove favorite" },
      { status: 500 }
    );
  }
}
