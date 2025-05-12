import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const user = await db.user.findUnique({
      where: { clerkId: userId }
    });
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    
    // Get user's predictions with fighter details
    const predictions = await db.prediction.findMany({
      where: { userId: user.id },
      include: { fighter: true },
      orderBy: { createdAt: 'desc' }
    });
    
    return NextResponse.json(predictions);
  } catch (error) {
    console.error("Error fetching predictions:", error);
    return NextResponse.json(
      { error: "Failed to fetch predictions" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const user = await db.user.findUnique({
      where: { clerkId: userId }
    });
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    
    const { fighterId, prediction, confidence, notes } = await req.json();
    
    // Validate required fields
    if (!fighterId || !prediction || confidence === undefined) {
      return NextResponse.json(
        { error: "Missing required fields" },
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
    
    // Create prediction
    const newPrediction = await db.prediction.create({
      data: {
        fighterId,
        userId: user.id,
        prediction,
        confidence,
        notes
      },
      include: { fighter: true }
    });
    
    return NextResponse.json(newPrediction, { status: 201 });
  } catch (error) {
    console.error("Error creating prediction:", error);
    return NextResponse.json(
      { error: "Failed to create prediction" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { userId } = auth();
    const { searchParams } = new URL(req.url);
    const predictionId = searchParams.get("id");
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const user = await db.user.findUnique({
      where: { clerkId: userId }
    });
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    
    if (!predictionId) {
      return NextResponse.json(
        { error: "Prediction ID is required" },
        { status: 400 }
      );
    }
    
    // Check if prediction exists and belongs to user
    const prediction = await db.prediction.findFirst({
      where: {
        id: predictionId,
        userId: user.id
      }
    });
    
    if (!prediction) {
      return NextResponse.json(
        { error: "Prediction not found or does not belong to user" },
        { status: 404 }
      );
    }
    
    // Delete prediction
    await db.prediction.delete({
      where: { id: predictionId }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting prediction:", error);
    return NextResponse.json(
      { error: "Failed to delete prediction" },
      { status: 500 }
    );
  }
}
