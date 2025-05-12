import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { Prisma } from "@prisma/client"; // Assuming this import is still needed for the type assertion
import type { Fight, Event } from '@/contexts/ufc-context';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    const event = await db.event.findUnique({
      where: { id },
      include: {
        fights: {
          include: {
            redCorner: true,
            blueCorner: true
          },
          orderBy: {
            isMainEvent: 'desc'
          }
        }
      }
    });

    if (!event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    // Transform the data to match the expected format in the frontend
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

    const formattedEvent = {
      ...event,
      mainCard,
      prelimCard
    };

    return NextResponse.json(formattedEvent);
  } catch (error) {
    console.error("Error fetching event:", error);
    return NextResponse.json(
      { error: "Failed to fetch event" },
      { status: 500 }
    );
  }
}
