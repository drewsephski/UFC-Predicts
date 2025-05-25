import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import type { Fighter } from '@/types/mma';

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

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const division = searchParams.get("division");
    
    const apiKey = process.env.SPORTSDATA_API_KEY;

    if (!apiKey) {
        // Return mock data if API key is not configured
        console.warn("SportsData API key is not configured. Using mock fighter data.");
        let filteredFighters = mockFighters;
        if (id) {
            filteredFighters = filteredFighters.filter(f => f.FighterId === Number.parseInt(id, 10));
        }
        if (division) {
            filteredFighters = filteredFighters.filter(f => f.WeightClass === division);
        }
        return NextResponse.json(filteredFighters);
    }

    const apiUrl = `https://api.sportsdata.io/v3/mma/stats/json/Fighters?key=${apiKey}`;

    if (id) {
        // If fetching a specific fighter by ID, we might need a different API endpoint or filter the results after fetching all data
        // Assuming for now the main endpoint returns all fighters and we filter client-side in the API route.
        // A more efficient approach would be to use an API endpoint that supports fetching by ID if available.
    } else if (division) {
        // For filtering by division, you might need to adjust the API call if SportsData.io supports it,
        // otherwise filter the results after fetching all fighters.
    }

    const response = await fetch(apiUrl, { next: { revalidate: 3600 } }); // Cache for 1 hour

    if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error fetching fighters: ${response.status} ${response.statusText} - ${errorText}`);
        // Fallback to mock data on API error
        console.warn("Failed to fetch from SportsData API. Using mock fighter data as fallback.");
        let filteredFighters = mockFighters;
        if (id) {
            filteredFighters = filteredFighters.filter(f => f.FighterId === Number.parseInt(id, 10));
        }
        if (division) {
            filteredFighters = filteredFighters.filter(f => f.WeightClass === division);
        }
        return NextResponse.json(filteredFighters);
    }

    const data: Fighter[] = await response.json();

    // Apply filtering based on id or division if needed after fetching all data
    let filteredData = data;
    if (id) {
        filteredData = filteredData.filter(fighter => fighter.FighterId === Number.parseInt(id, 10));
    }
    if (division) {
        filteredData = filteredData.filter(fighter => fighter.WeightClass === division);
    }

    return NextResponse.json(filteredData);

  } catch (error) {
    console.error("Error in fighters API route:", error);
    // Fallback to mock data on catch error
    console.warn("An error occurred in the API route. Using mock fighter data as fallback.");
    let filteredFighters = mockFighters;
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const division = searchParams.get("division");
    if (id) {
        filteredFighters = filteredFighters.filter(f => f.FighterId === Number.parseInt(id, 10));
    }
    if (division) {
        filteredFighters = filteredFighters.filter(f => f.WeightClass === division);
    }
    return NextResponse.json(filteredFighters);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    
    // Check if user is authenticated
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    // Get fighter data from request body
    const data = await req.json();
    
    // Create new fighter
    const fighter = await db.fighter.create({
      data
    });
    
    return NextResponse.json(fighter, { status: 201 });
  } catch (error) {
    console.error("Error creating fighter:", error);
    return NextResponse.json(
      { error: "Failed to create fighter" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { userId } = auth();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    
    // Check if user is authenticated
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    // Check if fighter ID is provided
    if (!id) {
      return NextResponse.json(
        { error: "Fighter ID is required" },
        { status: 400 }
      );
    }
    
    // Get fighter data from request body
    const data = await req.json();
    
    // Update fighter
    const fighter = await db.fighter.update({
      where: { id },
      data
    });
    
    return NextResponse.json(fighter);
  } catch (error) {
    console.error("Error updating fighter:", error);
    return NextResponse.json(
      { error: "Failed to update fighter" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { userId } = auth();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    
    // Check if user is authenticated
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    // Check if fighter ID is provided
    if (!id) {
      return NextResponse.json(
        { error: "Fighter ID is required" },
        { status: 400 }
      );
    }
    
    // Delete fighter
    await db.fighter.delete({
      where: { id }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting fighter:", error);
    return NextResponse.json(
      { error: "Failed to delete fighter" },
      { status: 500 }
    );
  }
}
