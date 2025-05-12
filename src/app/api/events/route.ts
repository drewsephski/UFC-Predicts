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
        venue: true,
        mainCard: {
          include: {
            fighter1: true,
            fighter2: true
          }
        },
        prelimCard: {
          include: {
            fighter1: true,
            fighter2: true
          }
        }
      }
    });
    
    return NextResponse.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}
