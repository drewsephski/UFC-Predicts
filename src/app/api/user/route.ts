import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      console.warn("GET /api/user: Unauthorized access attempt.");
      return NextResponse.json({ error: "Unauthorized", details: "User authentication required." }, { status: 401 });
    }
    
    const user = await db.user.findUnique({
      where: { clerkId: userId },
      include: {
        fightPicks: {
          include: { fighter: true },
          orderBy: { createdAt: 'desc' }
        },
        favorites: {
          include: { fighter: true }
        }
      }
    });
    
    if (!user) {
      console.warn(`GET /api/user: User not found in DB for clerkId: ${userId}`);
      return NextResponse.json({ error: "User not found", details: "Authenticated user not found in database." }, { status: 404 });
    }
    
    // Calculate prediction stats
    const totalFightPicks = user.fightPicks.length;
    const correctFightPicks = user.fightPicks.filter(p => p.isCorrect).length;
    const accuracy = totalFightPicks > 0 ? (correctFightPicks / totalFightPicks) * 100 : 0;
    
    return NextResponse.json({
      id: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      fightPicks: user.fightPicks,
      favorites: user.favorites,
      stats: {
        totalFightPicks,
        correctFightPicks,
        accuracy: Math.round(accuracy * 10) / 10, // Round to 1 decimal place
      }
    });
  } catch (error: any) {
    const { userId } = auth(); // For logging
    console.error(`GET /api/user: Error fetching user profile for userId ${userId || 'unknown'}.`, error);
    return NextResponse.json(
      { error: "Failed to fetch user profile from database.", details: error.message || "An unknown database error occurred." },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  let userId: string | null = null;
  let requestBody: any = {};
  try {
    const authResult = auth();
    userId = authResult.userId;
    
    if (!userId) {
      console.warn("PATCH /api/user: Unauthorized access attempt.");
      return NextResponse.json({ error: "Unauthorized", details: "User authentication required." }, { status: 401 });
    }
    
    const user = await db.user.findUnique({
      where: { clerkId: userId }
    });
    
    if (!user) {
      console.warn(`PATCH /api/user: User not found in DB for clerkId: ${userId}`);
      return NextResponse.json({ error: "User not found", details: "Authenticated user not found in database." }, { status: 404 });
    }
    
    try {
      requestBody = await req.json();
    } catch (parseError: any) {
      console.warn(`PATCH /api/user: Invalid JSON in request body for userId: ${userId}.`, parseError);
      return NextResponse.json({ error: "Invalid request body", details: "Request body must be valid JSON." }, { status: 400 });
    }
    
    // Update user profile - only allow updating specific fields
    const { name, avatar } = requestBody;
    const updateData: { name?: string; avatar?: string } = {};
    if (name !== undefined) updateData.name = name;
    if (avatar !== undefined) updateData.avatar = avatar;

    if (Object.keys(updateData).length === 0) {
        console.log(`PATCH /api/user: No valid fields provided for update by userId: ${userId}. Body:`, requestBody);
        return NextResponse.json({ error: "No updatable fields provided.", details: "Please provide 'name' or 'avatar' to update." }, { status: 400 });
    }

    const updatedUser = await db.user.update({
      where: { id: user.id },
      data: updateData
    });
    
    console.log(`PATCH /api/user: User profile updated successfully for userId ${userId}.`);
    return NextResponse.json({
      id: updatedUser.id,
      email: updatedUser.email,
      name: updatedUser.name,
      avatar: updatedUser.avatar
    });
  } catch (error: any) {
    console.error(`PATCH /api/user: Error updating user profile for userId ${userId || 'unknown'}. Body:`, requestBody, error);
    return NextResponse.json(
      { error: "Failed to update user profile in database.", details: error.message || "An unknown database error occurred." },
      { status: 500 }
    );
  }
}
