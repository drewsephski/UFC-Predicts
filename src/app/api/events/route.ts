import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const upcoming = searchParams.get("upcoming") === "true";
    const past = searchParams.get("past") === "true";

    let whereClause = {};

    if (upcoming) {
      whereClause = {
        date: {
          gte: new Date()
        }
      };
    } else if (past) {
      whereClause = {
        date: {
          lt: new Date()
        }
      };
    }

    const events = await db.event.findMany({
      where: whereClause,
      orderBy: {
        date: upcoming ? 'asc' : 'desc'
      },
      include: {
        fights: {
          include: {
            redCorner: true,
            blueCorner: true
          }
        }
      }
    });

    // Transform the data to match the expected format in the frontend
    const formattedEvents = events.map(event => {
      const mainCard = event.fights.filter(fight => fight.isMainEvent || fight.isTitleFight).map(fight => ({
        ...fight,
        fighter1: fight.redCorner,
        fighter2: fight.blueCorner
      }));

      const prelimCard = event.fights.filter(fight => !fight.isMainEvent && !fight.isTitleFight).map(fight => ({
        ...fight,
        fighter1: fight.redCorner,
        fighter2: fight.blueCorner
      }));

      return {
        ...event,
        mainCard,
        prelimCard
      };
    });

    return NextResponse.json(formattedEvents);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}
