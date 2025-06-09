import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const fighterId = params.id;
  try {
    if (!fighterId) {
      // This case should ideally not be hit given the route structure [id]
      console.warn("GET /api/fighters/[id]/fights: Fighter ID is missing in request params.");
      return NextResponse.json({ error: 'Fighter ID is required in the path.' }, { status: 400 });
    }
    
    // Verify fighter exists
    const fighter = await db.fighter.findUnique({
      where: { id: fighterId }
    });
    
    if (!fighter) {
      console.log(`GET /api/fighters/${fighterId}/fights: Fighter not found in database.`);
      return NextResponse.json(
        { error: "Fighter not found", details: `No fighter found with ID ${fighterId}` },
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
  } catch (error: any) {
    console.error(`GET /api/fighters/${fighterId}/fights: Error fetching fights for fighter.`, error);
    return NextResponse.json(
      {
        error: "Failed to fetch fighter fights from database.",
        details: error.message || "An unknown database error occurred."
      },
      { status: 500 }
    );
  }
}
