import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    const event = await db.event.findUnique({
      where: { id },
      include: {
        venue: true,
        mainCard: {
          include: {
            fighter1: true,
            fighter2: true
          },
          orderBy: {
            order: 'asc'
          }
        },
        prelimCard: {
          include: {
            fighter1: true,
            fighter2: true
          },
          orderBy: {
            order: 'asc'
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
    
    return NextResponse.json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    return NextResponse.json(
      { error: "Failed to fetch event" },
      { status: 500 }
    );
  }
}
