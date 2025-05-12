import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const division = searchParams.get("division");
    
    // If ID is provided, return a specific fighter
    if (id) {
      const fighter = await db.fighter.findUnique({
        where: { id }
      });
      
      if (!fighter) {
        return NextResponse.json(
          { error: "Fighter not found" },
          { status: 404 }
        );
      }
      
      return NextResponse.json(fighter);
    }
    
    // If division is provided, filter by division
    if (division) {
      const fighters = await db.fighter.findMany({
        where: { division },
        orderBy: { isChampion: 'desc' }
      });
      
      return NextResponse.json(fighters);
    }
    
    // Otherwise, return all fighters
    const fighters = await db.fighter.findMany({
      orderBy: { name: 'asc' }
    });
    
    return NextResponse.json(fighters);
  } catch (error) {
    console.error("Error fetching fighters:", error);
    return NextResponse.json(
      { error: "Failed to fetch fighters" },
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
    
    // Get fighter data from request body
    const data = await req.json();
    
    // Create new fighter
    const fighter = await db.fighter.create({
      data
    });
    
    return NextResponse.json(fighter, { status: 201 });
  } catch (error) {
    console.error("Error creating fighter:", error);
    return NextResponse.json(
      { error: "Failed to create fighter" },
      { status: 500 }
    );
  }
}

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
    
    // Check if fighter ID is provided
    if (!id) {
      return NextResponse.json(
        { error: "Fighter ID is required" },
        { status: 400 }
      );
    }
    
    // Get fighter data from request body
    const data = await req.json();
    
    // Update fighter
    const fighter = await db.fighter.update({
      where: { id },
      data
    });
    
    return NextResponse.json(fighter);
  } catch (error) {
    console.error("Error updating fighter:", error);
    return NextResponse.json(
      { error: "Failed to update fighter" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
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
    
    // Check if fighter ID is provided
    if (!id) {
      return NextResponse.json(
        { error: "Fighter ID is required" },
        { status: 400 }
      );
    }
    
    // Delete fighter
    await db.fighter.delete({
      where: { id }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting fighter:", error);
    return NextResponse.json(
      { error: "Failed to delete fighter" },
      { status: 500 }
    );
  }
}
