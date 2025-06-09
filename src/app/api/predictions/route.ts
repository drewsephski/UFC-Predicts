import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      console.warn("GET /api/predictions: Unauthorized access attempt.");
      return NextResponse.json({ error: "Unauthorized", details: "User authentication required." }, { status: 401 });
    }
    
    const user = await db.user.findUnique({
      where: { clerkId: userId }
    });
    
    if (!user) {
      console.warn(`GET /api/predictions: User not found in DB for clerkId: ${userId}`);
      return NextResponse.json({ error: "User not found", details: "Authenticated user not found in database." }, { status: 404 });
    }
    
    // Get user's predictions with fighter details
    const predictions = await db.prediction.findMany({
      where: { userId: user.id },
      include: { fighter: true },
      orderBy: { createdAt: 'desc' }
    });
    
    return NextResponse.json(predictions);
  } catch (error: any) {
    const { userId } = auth(); // For logging
    console.error(`GET /api/predictions: Error fetching predictions for userId ${userId || 'unknown'}.`, error);
    return NextResponse.json(
      { error: "Failed to fetch predictions from database.", details: error.message || "An unknown database error occurred." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  let userId: string | null = null;
  let requestBody: any = {}; // For logging in catch block
  try {
    const authResult = auth();
    userId = authResult.userId;
    
    if (!userId) {
      console.warn("POST /api/predictions: Unauthorized access attempt.");
      return NextResponse.json({ error: "Unauthorized", details: "User authentication required." }, { status: 401 });
    }
    
    const user = await db.user.findUnique({
      where: { clerkId: userId }
    });
    
    if (!user) {
      console.warn(`POST /api/predictions: User not found in DB for clerkId: ${userId}`);
      return NextResponse.json({ error: "User not found", details: "Authenticated user not found in database." }, { status: 404 });
    }

    try {
      requestBody = await req.json();
    } catch (parseError: any) {
      console.warn(`POST /api/predictions: Invalid JSON in request body for userId: ${userId}.`, parseError);
      return NextResponse.json({ error: "Invalid request body", details: "Request body must be valid JSON." }, { status: 400 });
    }
    
    const { fighterId, prediction, confidence, notes } = requestBody;
    
    // Validate required fields
    const missingFields = [];
    if (!fighterId) missingFields.push("fighterId");
    if (!prediction) missingFields.push("prediction"); // prediction outcome (e.g., "win", "loss", "draw")
    if (confidence === undefined || confidence === null) missingFields.push("confidence"); // 0-100

    if (missingFields.length > 0) {
      const errorMsg = `Missing required fields: ${missingFields.join(', ')}`;
      console.warn(`POST /api/predictions: ${errorMsg} for userId: ${userId}. Body:`, requestBody);
      return NextResponse.json(
        { error: "Missing required fields", details: errorMsg },
        { status: 400 }
      );
    }
    
    // Check if fighter exists
    const fighter = await db.fighter.findUnique({
      where: { id: fighterId }
    });
    
    if (!fighter) {
      console.log(`POST /api/predictions: Fighter not found with ID: ${fighterId} for userId: ${userId}.`);
      return NextResponse.json(
        { error: "Fighter not found", details: `Fighter with ID ${fighterId} does not exist.` },
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
  } catch (error: any) {
    console.error(`POST /api/predictions: Error creating prediction for userId ${userId || 'unknown'}, fighterId ${requestBody?.fighterId}.`, error);
    return NextResponse.json(
      { error: "Failed to create prediction in database.", details: error.message || "An unknown database error occurred." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  let userId: string | null = null;
  let predictionIdQueryParam: string | null = null;
  try {
    const authResult = auth();
    userId = authResult.userId;
    const { searchParams } = new URL(req.url);
    predictionIdQueryParam = searchParams.get("id");
    
    if (!userId) {
      console.warn("DELETE /api/predictions: Unauthorized access attempt.");
      return NextResponse.json({ error: "Unauthorized", details: "User authentication required." }, { status: 401 });
    }
    
    const user = await db.user.findUnique({
      where: { clerkId: userId }
    });
    
    if (!user) {
      console.warn(`DELETE /api/predictions: User not found in DB for clerkId: ${userId}`);
      return NextResponse.json({ error: "User not found", details: "Authenticated user not found in database." }, { status: 404 });
    }
    
    if (!predictionIdQueryParam) {
      console.warn(`DELETE /api/predictions: Prediction ID is missing in query params for userId: ${userId}.`);
      return NextResponse.json(
        { error: "Prediction ID is required", details: "Prediction ID must be provided as a query parameter 'id'." },
        { status: 400 }
      );
    }
    
    // Check if prediction exists and belongs to user
    const predictionToDelete = await db.prediction.findFirst({
      where: {
        id: predictionIdQueryParam,
        userId: user.id // Ensure the prediction belongs to the authenticated user
      }
    });
    
    if (!predictionToDelete) {
      console.log(`DELETE /api/predictions: Prediction not found with ID ${predictionIdQueryParam} or does not belong to userId: ${userId}.`);
      return NextResponse.json(
        { error: "Prediction not found or does not belong to user", details: `Prediction with ID ${predictionIdQueryParam} not found or you do not have permission to delete it.` },
        { status: 404 }
      );
    }
    
    // Delete prediction
    await db.prediction.delete({
      where: { id: predictionIdQueryParam }
    });
    
    return NextResponse.json({ success: true, message: `Prediction with ID ${predictionIdQueryParam} removed successfully.` });
  } catch (error: any) {
    // Check for Prisma P2025 (Record to delete not found) - though findFirst should prevent this if user check is also done
    if (error.code === 'P2025') {
        console.warn(`DELETE /api/predictions: Prediction not found for deletion. predictionId: ${predictionIdQueryParam}, userId: ${userId}.`, error);
        return NextResponse.json({ error: "Prediction not found", details: `Prediction with ID ${predictionIdQueryParam} not found.` }, { status: 404 });
    }
    console.error(`DELETE /api/predictions: Error deleting prediction ${predictionIdQueryParam || 'unknown'} for userId ${userId || 'unknown'}.`, error);
    return NextResponse.json(
      { error: "Failed to delete prediction from database.", details: error.message || "An unknown database error occurred." },
      { status: 500 }
    );
  }
}
