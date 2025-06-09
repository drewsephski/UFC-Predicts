import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { Prisma } from "@prisma/client";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const eventId = params.id;
  try {
    if (!eventId) {
      // This case should ideally not be hit given the route structure [id]
      // but adding for robustness and explicit logging.
      console.warn("GET /api/events/[id]: Event ID is missing in request params.");
      return NextResponse.json({ error: 'Event ID is required in the path.' }, { status: 400 });
    }

    const event: Prisma.EventGetPayload<{
      include: {
        fights: {
          include: {
            redCorner: true;
            blueCorner: true;
          };
        };
      };
    }> | null = await db.event.findUnique({
      where: { id: eventId },
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
      console.log(`GET /api/events/${eventId}: Event not found in database.`);
      return NextResponse.json(
        { error: "Event not found", details: `No event found with ID ${eventId}` },
        { status: 404 }
      );
    }

    // Transform the data to match the expected format in the frontend
    const mainCard = event.fights.filter(fight => fight.isMainEvent || fight.isTitleFight).map(fight => ({
      ...fight,
      redCorner: fight.redCorner,
      blueCorner: fight.blueCorner,
      redCornerId: fight.redCornerId,
      blueCornerId: fight.blueCornerId,
      date: event.date.toISOString(),
    }));

    const prelimCard = event.fights.filter(fight => !fight.isMainEvent && !fight.isTitleFight).map(fight => ({
      ...fight,
      redCorner: fight.redCorner,
      blueCorner: fight.blueCorner,
      redCornerId: fight.redCornerId,
      blueCornerId: fight.blueCornerId,
      date: event.date.toISOString(),
    }));

    const formattedEvent = {
      ...event,
      mainCard,
      prelimCard
    };

    return NextResponse.json(formattedEvent);
  } catch (error: any) {
    console.error(`GET /api/events/${eventId}: Error fetching event.`, error);
    return NextResponse.json(
      { error: "Failed to fetch event from database.", details: error.message || "An unknown database error occurred." },
      { status: 500 }
    );
  }
}
