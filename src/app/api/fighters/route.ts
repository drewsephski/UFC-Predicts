import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import type { Fighter } from '@/types/mma';

// Cache variables
let cachedFighters: Fighter[] | null = null;
let lastFetchTime: number | null = null;
const REVALIDATE_AFTER_SECONDS = 3600; // Revalidate every hour

// Mock data (replace with more comprehensive data as needed)
const mockFighters: Fighter[] = [
  {
    FighterId: 1,
    FirstName: "Conor",
    LastName: "McGregor",
    Nickname: "The Notorious",
    WeightClass: "Lightweight",
    Wins: 22,
    Losses: 6,
    Draws: 0,
    NoContests: 0,
    TechnicalKnockouts: 19,
    Submissions: 1,
    Height: 69, // 5'9" in inches
    Weight: 155,
    Reach: 74, // 74" in inches
    TitleWins: 2,
    TitleLosses: 0,
    CareerStats: {
      FighterId: 101,
      SigStrikesLandedPerMinute: 5.5,
      SigStrikeAccuracy: 0.5,
      TakedownAverage: 1.0,
      SubmissionAverage: 0.2,
      KnockoutPercentage: 0.8,
      DecisionPercentage: 0.15,
    },
    image_url: "/images/fighter-placeholder.png", // Placeholder image
  },
  {
    FighterId: 2,
    FirstName: "Khabib",
    LastName: "Nurmagomedov",
    Nickname: "The Eagle",
    WeightClass: "Lightweight",
    Wins: 29,
    Losses: 0,
    Draws: 0,
    NoContests: 0,
    TechnicalKnockouts: 8,
    Submissions: 11,
    Height: 70, // 5'10" in inches
    Weight: 155,
    Reach: 70, // 70" in inches
    TitleWins: 1,
    TitleLosses: 0,
    CareerStats: {
      FighterId: 102,
      SigStrikesLandedPerMinute: 2.5,
      SigStrikeAccuracy: 0.55,
      TakedownAverage: 5.0,
      SubmissionAverage: 1.0,
      KnockoutPercentage: 0.25,
      DecisionPercentage: 0.37,
    },
    image_url: "/images/fighter-placeholder.png", // Placeholder image
  },
  {
    FighterId: 3,
    FirstName: "Israel",
    LastName: "Adesanya",
    Nickname: "The Last Stylebender",
    WeightClass: "Middleweight",
    Wins: 24,
    Losses: 3,
    Draws: 0,
    NoContests: 0,
    TechnicalKnockouts: 16,
    Submissions: 0,
    Height: 76, // 6'4" in inches
    Weight: 185,
    Reach: 80, // 80" in inches
    TitleWins: 2,
    TitleLosses: 1,
    CareerStats: {
      FighterId: 103,
      SigStrikesLandedPerMinute: 3.99,
      SigStrikeAccuracy: 0.5,
      TakedownAverage: 0.0,
      SubmissionAverage: 0.0,
      KnockoutPercentage: 0.67,
      DecisionPercentage: 0.33,
    },
    image_url: "/images/fighter-placeholder.png", // Placeholder image
  },
  {
    FighterId: 4,
    FirstName: "Valentina",
    LastName: "Shevchenko",
    Nickname: "Bullet",
    WeightClass: "Women's Flyweight",
    Wins: 26,
    Losses: 4,
    Draws: 1,
    NoContests: 0,
    TechnicalKnockouts: 8,
    Submissions: 7,
    Height: 65, // 5'5" in inches
    Weight: 125,
    Reach: 67, // 67" in inches
    TitleWins: 7,
    TitleLosses: 1,
    CareerStats: {
      FighterId: 104,
      SigStrikesLandedPerMinute: 3.14,
      SigStrikeAccuracy: 0.54,
      TakedownAverage: 2.64,
      SubmissionAverage: 0.2,
      KnockoutPercentage: 0.31,
      DecisionPercentage: 0.42,
    },
    image_url: "/images/fighter-placeholder.png", // Placeholder image
  },
  {
    FighterId: 5,
    FirstName: "Kamaru",
    LastName: "Usman",
    Nickname: "The Nigerian Nightmare",
    WeightClass: "Welterweight",
    Wins: 20,
    Losses: 4,
    Draws: 0,
    NoContests: 0,
    TechnicalKnockouts: 9,
    Submissions: 1,
    Height: 72, // 6'0" in inches
    Weight: 170,
    Reach: 76, // 76" in inches
    TitleWins: 5,
    TitleLosses: 1,
    CareerStats: {
      FighterId: 105,
      SigStrikesLandedPerMinute: 4.66,
      SigStrikeAccuracy: 0.52,
      TakedownAverage: 3.00,
      SubmissionAverage: 0.0,
      KnockoutPercentage: 0.45,
      DecisionPercentage: 0.5,
    },
    image_url: "/images/fighter-placeholder.png", // Placeholder image
  },
  {
    FighterId: 6,
    FirstName: "Amanda",
    LastName: "Nunes",
    Nickname: "The Lioness",
    WeightClass: "Women's Bantamweight",
    Wins: 23,
    Losses: 5,
    Draws: 0,
    NoContests: 0,
    TechnicalKnockouts: 13,
    Submissions: 4,
    Height: 68, // 5'8" in inches
    Weight: 135,
    Reach: 69, // 69" in inches
    TitleWins: 7,
    TitleLosses: 2,
    CareerStats: {
      FighterId: 106,
      SigStrikesLandedPerMinute: 5.48,
      SigStrikeAccuracy: 0.51,
      TakedownAverage: 2.51,
      SubmissionAverage: 0.5,
      KnockoutPercentage: 0.57,
      DecisionPercentage: 0.26,
    },
    image_url: "/images/fighter-placeholder.png", // Placeholder image
  },
  {
    FighterId: 7,
    FirstName: "Alex",
    LastName: "Pereira",
    Nickname: "Poatan",
    WeightClass: "Light Heavyweight",
    Wins: 10,
    Losses: 2,
    Draws: 0,
    NoContests: 0,
    TechnicalKnockouts: 8,
    Submissions: 0,
    Height: 76, // 6'4" in inches
    Weight: 205,
    Reach: 79, // 79" in inches
    TitleWins: 2,
    TitleLosses: 0,
    CareerStats: {
      FighterId: 107,
      SigStrikesLandedPerMinute: 5.11,
      SigStrikeAccuracy: 0.52,
      TakedownAverage: 0.0,
      SubmissionAverage: 0.0,
      KnockoutPercentage: 0.8,
      DecisionPercentage: 0.2,
    },
    image_url: "/images/fighter-placeholder.png", // Placeholder image
  },
  {
    FighterId: 8,
    FirstName: "Charles",
    LastName: "Oliveira",
    Nickname: "do Bronx",
    WeightClass: "Lightweight",
    Wins: 34,
    Losses: 10,
    Draws: 0,
    NoContests: 1,
    TechnicalKnockouts: 10,
    Submissions: 23,
    Height: 70, // 5'10" in inches
    Weight: 155,
    Reach: 74, // 74" in inches
    TitleWins: 1,
    TitleLosses: 1,
    CareerStats: {
      FighterId: 108,
      SigStrikesLandedPerMinute: 3.55,
      SigStrikeAccuracy: 0.52,
      TakedownAverage: 2.8,
      SubmissionAverage: 2.8,
      KnockoutPercentage: 0.29,
      DecisionPercentage: 0.0,
    },
    image_url: "/images/fighter-placeholder.png", // Placeholder image
  },
  {
    FighterId: 9,
    FirstName: "Ciryl",
    LastName: "Gane",
    Nickname: "Bon Gamin",
    WeightClass: "Heavyweight",
    Wins: 12,
    Losses: 2,
    Draws: 0,
    NoContests: 0,
    TechnicalKnockouts: 5,
    Submissions: 2,
    Height: 76, // 6'4" in inches
    Weight: 245,
    Reach: 81, // 81" in inches
    TitleWins: 0,
    TitleLosses: 2,
    CareerStats: {
      FighterId: 109,
      SigStrikesLandedPerMinute: 5.07,
      SigStrikeAccuracy: 0.58,
      TakedownAverage: 0.67,
      SubmissionAverage: 0.25,
      KnockoutPercentage: 0.42,
      DecisionPercentage: 0.42,
    },
    image_url: "/images/fighter-placeholder.png", // Placeholder image
  },
  {
    FighterId: 10,
    FirstName: "Sean",
    LastName: "O'Malley",
    Nickname: "Sugar",
    WeightClass: "Bantamweight",
    Wins: 18,
    Losses: 1,
    Draws: 1,
    NoContests: 0,
    TechnicalKnockouts: 12,
    Submissions: 1,
    Height: 71, // 5'11" in inches
    Weight: 135,
    Reach: 72, // 72" in inches
    TitleWins: 1,
    TitleLosses: 0,
    CareerStats: {
      FighterId: 110,
      SigStrikesLandedPerMinute: 7.25,
      SigStrikeAccuracy: 0.55,
      TakedownAverage: 0.0,
      SubmissionAverage: 0.09,
      KnockoutPercentage: 0.67,
      DecisionPercentage: 0.06,
    },
    image_url: "/images/fighter-placeholder.png", // Placeholder image
  },
  {
    FighterId: 11,
    FirstName: "Islam",
    LastName: "Makhachev",
    Nickname: null,
    WeightClass: "Lightweight",
    Wins: 25,
    Losses: 1,
    Draws: 0,
    NoContests: 0,
    TechnicalKnockouts: 5,
    Submissions: 11,
    Height: 70,
    Weight: 155,
    Reach: 70,
    TitleWins: 3,
    TitleLosses: 0,
    CareerStats: {
      FighterId: 111,
      SigStrikesLandedPerMinute: 2.25,
      SigStrikeAccuracy: 0.5,
      TakedownAverage: 3.5,
      SubmissionAverage: 1.1,
      KnockoutPercentage: 0.2,
      DecisionPercentage: 0.32,
    },
    image_url: "/images/fighter-placeholder.png", // Placeholder image
  },
  {
    FighterId: 12,
    FirstName: "Jon",
    LastName: "Jones",
    Nickname: "Bones",
    WeightClass: "Heavyweight",
    Wins: 28,
    Losses: 1,
    Draws: 0,
    NoContests: 1,
    TechnicalKnockouts: 11,
    Submissions: 6,
    Height: 76,
    Weight: 240,
    Reach: 84,
    TitleWins: 11,
    TitleLosses: 0,
    CareerStats: {
      FighterId: 112,
      SigStrikesLandedPerMinute: 4.34,
      SigStrikeAccuracy: 0.57,
      TakedownAverage: 2.16,
      SubmissionAverage: 0.4,
      KnockoutPercentage: 0.39,
      DecisionPercentage: 0.39,
    },
    image_url: "/images/fighter-placeholder.png", // Placeholder image
  },
  {
    FighterId: 13,
    FirstName: "Sean",
    LastName: "Strickland",
    Nickname: "Tarzan",
    WeightClass: "Middleweight",
    Wins: 29,
    Losses: 6,
    Draws: 0,
    NoContests: 0,
    TechnicalKnockouts: 11,
    Submissions: 4,
    Height: 73,
    Weight: 185,
    Reach: 76,
    TitleWins: 1,
    TitleLosses: 1,
    CareerStats: {
      FighterId: 113,
      SigStrikesLandedPerMinute: 5.85,
      SigStrikeAccuracy: 0.41,
      TakedownAverage: 1.00,
      SubmissionAverage: 0.3,
      KnockoutPercentage: 0.38,
      DecisionPercentage: 0.45,
    },
    image_url: "/images/fighter-placeholder.png", // Placeholder image
  },
  {
    FighterId: 14,
    FirstName: "Leon",
    LastName: "Edwards",
    Nickname: "Rocky",
    WeightClass: "Welterweight",
    Wins: 22,
    Losses: 3,
    Draws: 0,
    NoContests: 1,
    TechnicalKnockouts: 7,
    Submissions: 3,
    Height: 73,
    Weight: 170,
    Reach: 74,
    TitleWins: 2,
    TitleLosses: 0,
    CareerStats: {
      FighterId: 114,
      SigStrikesLandedPerMinute: 3.47,
      SigStrikeAccuracy: 0.49,
      TakedownAverage: 1.48,
      SubmissionAverage: 0.3,
      KnockoutPercentage: 0.32,
      DecisionPercentage: 0.36,
    },
    image_url: "/images/fighter-placeholder.png", // Placeholder image
  },
  {
    FighterId: 15,
    FirstName: "Dustin",
    LastName: "Poirier",
    Nickname: "The Diamond",
    WeightClass: "Lightweight",
    Wins: 30,
    Losses: 9,
    Draws: 0,
    NoContests: 1,
    TechnicalKnockouts: 15,
    Submissions: 8,
    Height: 69,
    Weight: 155,
    Reach: 72,
    TitleWins: 0,
    TitleLosses: 2,
    CareerStats: {
      FighterId: 115,
      SigStrikesLandedPerMinute: 5.52,
      SigStrikeAccuracy: 0.5,
      TakedownAverage: 1.41,
      SubmissionAverage: 0.3,
      KnockoutPercentage: 0.5,
      DecisionPercentage: 0.27,
    },
    image_url: "/images/fighter-placeholder.png", // Placeholder image
  },
];

// Helper function to filter fighters
function filterFighters(fighters: Fighter[], id: string | null, division: string | null): Fighter[] {
    let result = fighters;
    if (id) {
        result = result.filter(f => f.FighterId === Number.parseInt(id, 10));
    }
    if (division) {
        result = result.filter(f => f.WeightClass === division);
    }
    return result;
}

// Function to fetch fighters from the API
// Returns an object with data or error, to provide more context to the caller
async function fetchFightersFromAPI(apiKey: string): Promise<{ data: Fighter[] | null; error: { message: string; status: number; details?: string } | null }> {
    const apiUrl = `https://api.sportsdata.io/v3/mma/stats/json/Fighters?key=${apiKey}`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            const errorText = await response.text();
            const errorMessage = `External API Error: Failed to fetch fighters. Status: ${response.status} ${response.statusText}.`;
            console.error(`fetchFightersFromAPI: ${errorMessage} Body: ${errorText}`);
            // For external API errors, use 502 if it's a server-side error from them, otherwise their status.
            const status = response.status >= 500 ? 502 : response.status;
            return { data: null, error: { message: "Failed to fetch fighters from external provider.", status: status, details: errorText } };
        }
        const data: Fighter[] = await response.json();
        cachedFighters = data; // Update cache
        lastFetchTime = Date.now(); // Update fetch time
        console.log("fetchFightersFromAPI: Fighters data fetched and cached successfully.");
        return { data, error: null };
    } catch (error: any) {
        console.error("fetchFightersFromAPI: Exception occurred.", error);
        return { data: null, error: { message: "Internal server error during API call to fetch fighters.", status: 500, details: error.message } };
    }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const division = searchParams.get("division");
  const queryParamsLog = `id=${id}, division=${division}`; // For logging

  const apiKey = process.env.SPORTSDATA_API_KEY;

  // Stale-while-revalidate caching strategy
  // 1. Check if we have cached data and it's not older than REVALIDATE_AFTER_SECONDS.
  // 2. If fresh enough, serve from cache.
  // 3. If data is stale (older than REVALIDATE_AFTER_SECONDS), serve stale data and trigger a revalidation in the background.
  // 4. If no cached data, fetch from API, cache it, and serve.
  // 5. If API fetch fails (either initial or revalidation), continue serving stale data if available.

  const currentTime = Date.now();

  if (cachedFighters && lastFetchTime && (currentTime - lastFetchTime < REVALIDATE_AFTER_SECONDS * 1000)) {
    // Cache is fresh, serve from cache
    console.log(`GET /api/fighters?${queryParamsLog}: Serving fresh data from cache.`);
    return NextResponse.json(filterFighters(cachedFighters, id, division));
  }

  if (cachedFighters && lastFetchTime) {
    // Cache is stale, serve stale data and revalidate in background
    console.log(`GET /api/fighters?${queryParamsLog}: Serving stale data from cache and revalidating in background.`);
    // Don't await this, let it run in the background
    if (apiKey) {
        fetchFightersFromAPI(apiKey)
            .then(result => {
                if (result.error) {
                    console.error(`GET /api/fighters?${queryParamsLog}: Background revalidation failed. Error: ${result.error.message}`, result.error.details ? result.error.details : '');
                } else {
                    console.log(`GET /api/fighters?${queryParamsLog}: Background revalidation successful.`);
                }
            })
            .catch(err => { // Should not happen if fetchFightersFromAPI always returns an object
                console.error(`GET /api/fighters?${queryParamsLog}: Unexpected error during background revalidation fetch.`, err);
            });
    } else {
        console.warn(`GET /api/fighters?${queryParamsLog}: SportsData API key is not configured. Cannot revalidate fighter data in background.`);
    }
    return NextResponse.json(filterFighters(cachedFighters, id, division));
  }

  // No cached data or cache is too old and initial fetch is needed
  console.log(`GET /api/fighters?${queryParamsLog}: No cached data or cache is significantly old. Fetching from API.`);
  if (!apiKey) {
    console.error(`GET /api/fighters?${queryParamsLog}: SportsData API key is not configured. Cannot fetch new data.`);
    // Fallback to mock data if API key is not configured and no cache exists
    // This was the original behavior, but returning an error might be more consistent.
    // For now, keeping mock data fallback but with an error log.
    // Consider returning: return NextResponse.json({ error: "API key not configured server-side.", details: "Cannot fetch fighter data." }, { status: 500 });
    console.warn(`GET /api/fighters?${queryParamsLog}: API key missing. Serving mock data as fallback.`);
    return NextResponse.json(filterFighters(mockFighters, id, division));
  }

  const fetchResult = await fetchFightersFromAPI(apiKey);

  if (fetchResult.data) {
    // API fetch successful
    console.log(`GET /api/fighters?${queryParamsLog}: API fetch successful.`);
    return NextResponse.json(filterFighters(fetchResult.data, id, division));
  } else if (fetchResult.error) {
    // API fetch failed, and no prior cache to serve as stale
    console.error(`GET /api/fighters?${queryParamsLog}: API fetch failed. Error: ${fetchResult.error.message}`, fetchResult.error.details ? fetchResult.error.details : '');
    // Fallback to mock data on API error as per original logic.
    // Consider returning the error: return NextResponse.json(fetchResult.error, { status: fetchResult.error.status });
    console.warn(`GET /api/fighters?${queryParamsLog}: API fetch failed. Serving mock data as fallback.`);
    return NextResponse.json(filterFighters(mockFighters, id, division));
  } else {
    // Should not happen: fetchResult has no data and no error
    console.error(`GET /api/fighters?${queryParamsLog}: fetchFightersFromAPI returned an unexpected state (no data, no error).`);
    return NextResponse.json({ error: "An unexpected error occurred while fetching fighter data.", details: "API helper function returned an invalid state." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  let userId: string | null = null;
  try {
    const authResult = auth();
    userId = authResult.userId;
    
    if (!userId) {
      console.warn("POST /api/fighters: Unauthorized access attempt.");
      return NextResponse.json({ error: "Unauthorized", details: "User authentication required." }, { status: 401 });
    }

    let data;
    try {
      data = await req.json();
    } catch (parseError: any) {
      console.warn(`POST /api/fighters: Invalid JSON in request body for userId: ${userId}.`, parseError);
      return NextResponse.json({ error: "Invalid request body", details: "Request body must be valid JSON." }, { status: 400 });
    }
    
    // TODO: Add validation for fighter data (e.g., using Zod)
    
    const fighter = await db.fighter.create({
      data // Assumes data is a valid Prisma.FighterCreateInput
    });
    
    console.log(`POST /api/fighters: Fighter created successfully by userId ${userId}, fighterId ${fighter.id}`);
    return NextResponse.json(fighter, { status: 201 });
  } catch (error: any) {
    console.error(`POST /api/fighters: Error creating fighter for userId ${userId || 'unknown'}.`, error);
    // Check for Prisma-specific errors if needed, e.g., unique constraint violation
    return NextResponse.json({ error: "Failed to create fighter in database.", details: error.message || "An unknown database error occurred." }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  let userId: string | null = null;
  let fighterIdToUpdate: string | null = null;
  try {
    const authResult = auth();
    userId = authResult.userId;
    const { searchParams } = new URL(req.url);
    fighterIdToUpdate = searchParams.get("id");
    
    if (!userId) {
      console.warn(`PUT /api/fighters: Unauthorized access attempt for fighterId ${fighterIdToUpdate || 'unknown'}.`);
      return NextResponse.json({ error: "Unauthorized", details: "User authentication required." }, { status: 401 });
    }
    
    if (!fighterIdToUpdate) {
      console.warn(`PUT /api/fighters: Fighter ID is missing in query params for userId: ${userId}.`);
      return NextResponse.json({ error: "Fighter ID is required in query parameters.", details: "Provide 'id' in query params." }, { status: 400 });
    }
    
    let data;
    try {
      data = await req.json();
    } catch (parseError: any) {
      console.warn(`PUT /api/fighters: Invalid JSON in request body for userId: ${userId}, fighterId: ${fighterIdToUpdate}.`, parseError);
      return NextResponse.json({ error: "Invalid request body", details: "Request body must be valid JSON." }, { status: 400 });
    }

    // TODO: Add validation for fighter data
    
    const fighter = await db.fighter.update({
      where: { id: fighterIdToUpdate },
      data // Assumes data is a valid Prisma.FighterUpdateInput
    });
    
    console.log(`PUT /api/fighters: Fighter ${fighterIdToUpdate} updated successfully by userId ${userId}.`);
    return NextResponse.json(fighter);
  } catch (error: any) {
    // Check for Prisma P2025 (Record to update not found)
    if (error.code === 'P2025') {
        console.warn(`PUT /api/fighters: Fighter not found for update. fighterId: ${fighterIdToUpdate}, userId: ${userId}.`, error);
        return NextResponse.json({ error: "Fighter not found", details: `Fighter with ID ${fighterIdToUpdate} not found.` }, { status: 404 });
    }
    console.error(`PUT /api/fighters: Error updating fighter ${fighterIdToUpdate || 'unknown'} for userId ${userId || 'unknown'}.`, error);
    return NextResponse.json({ error: "Failed to update fighter in database.", details: error.message || "An unknown database error occurred." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  let userId: string | null = null;
  let fighterIdToDelete: string | null = null;
  try {
    const authResult = auth();
    userId = authResult.userId;
    const { searchParams } = new URL(req.url);
    fighterIdToDelete = searchParams.get("id");
    
    if (!userId) {
      console.warn(`DELETE /api/fighters: Unauthorized access attempt for fighterId ${fighterIdToDelete || 'unknown'}.`);
      return NextResponse.json({ error: "Unauthorized", details: "User authentication required." }, { status: 401 });
    }
    
    if (!fighterIdToDelete) {
      console.warn(`DELETE /api/fighters: Fighter ID is missing in query params for userId: ${userId}.`);
      return NextResponse.json({ error: "Fighter ID is required in query parameters.", details: "Provide 'id' in query params." }, { status: 400 });
    }
    
    await db.fighter.delete({
      where: { id: fighterIdToDelete }
    });
    
    console.log(`DELETE /api/fighters: Fighter ${fighterIdToDelete} deleted successfully by userId ${userId}.`);
    return NextResponse.json({ success: true, message: `Fighter with ID ${fighterIdToDelete} deleted successfully.` });
  } catch (error: any) {
     // Check for Prisma P2025 (Record to delete not found)
    if (error.code === 'P2025') {
        console.warn(`DELETE /api/fighters: Fighter not found for deletion. fighterId: ${fighterIdToDelete}, userId: ${userId}.`, error);
        return NextResponse.json({ error: "Fighter not found", details: `Fighter with ID ${fighterIdToDelete} not found.` }, { status: 404 });
    }
    console.error(`DELETE /api/fighters: Error deleting fighter ${fighterIdToDelete || 'unknown'} for userId ${userId || 'unknown'}.`, error);
    return NextResponse.json({ error: "Failed to delete fighter from database.", details: error.message || "An unknown database error occurred." }, { status: 500 });
  }
}
