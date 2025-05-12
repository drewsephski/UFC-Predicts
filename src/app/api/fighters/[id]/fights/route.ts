import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const fighterId = params.id;
    
    // Verify fighter exists
    const fighter = await db.fighter.findUnique({
      where: { id: fighterId }
    });
    
    if (!fighter) {
      return NextResponse.json(
        { error: "Fighter not found" },
        { status: 404 }
      );
    }
    
    // Get all fights where this fighter was in either corner
    const fights = await db.fight.findMany({
      where: {
        OR: [
          { redCornerId: fighterId },
          { blueCornerId: fighterId }
        ],
        status: 'completed'
      },
      include: {
        redCorner: true,
        blueCorner: true,
        event: {
          select: {
            id: true,
            name: true,
            date: true,
            location: true
          }
        }
      },
    });
    
    return NextResponse.json(fights);
  } catch (error) {
    console.error("Error fetching fighter fights:", error);
    return NextResponse.json(
      { error: "Failed to fetch fighter fights" },
      { status: 500 }
    );
  }
}
