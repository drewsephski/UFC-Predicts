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
      return NextResponse.json({ error: "User not found" }, { status: 404 });
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
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch user profile" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
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
    
    const data = await req.json();
    
    // Update user profile
    const updatedUser = await db.user.update({
      where: { id: user.id },
      data: {
        name: data.name,
        avatar: data.avatar
      }
    });
    
    return NextResponse.json({
      id: updatedUser.id,
      email: updatedUser.email,
      name: updatedUser.name,
      avatar: updatedUser.avatar
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    return NextResponse.json(
      { error: "Failed to update user profile" },
      { status: 500 }
    );
  }
}
