import { NextResponse } from 'next/server';
import type { FighterProfile, Fight } from '@/types/mma-api'; // Assuming types are in mma-api.ts

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const RAPIDAPI_HOST = 'mmaapi.p.rapidapi.com'; // Or your specific host if different

// Logistic Regression Weights (placeholders, to be trained later)
const w0 = 0; // bias
const w1 = 0.4; // recent win % differential
const w2 = 0.8; // strike differential (e.g., avg sig strikes landed per min)
const w3 = 1.2; // takedown differential (e.g., avg takedowns landed per 15 min)

const NUMBER_OF_FIGHTS_FOR_RECENT_WIN_PCT = 5;

interface ApiError {
  message: string;
  status?: number;
  details?: any;
}

/**
 * Fetches fighter details from the MMA API.
 * @param fighterId The ID of the fighter.
 * @returns A Promise resolving to FighterProfile or null if an error occurs.
 */
async function fetchFighterDetails(fighterId: string): Promise<FighterProfile | null> {
  if (!RAPIDAPI_KEY) {
    console.error('API key is not configured');
    return null;
  }
  const url = `https://mmaapi.p.rapidapi.com/api/mma/fighter/${fighterId}`; // Adjust if your path is different
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': RAPIDAPI_KEY,
      'x-rapidapi-host': RAPIDAPI_HOST,
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorData = await response.json();
      console.error(`Failed to fetch fighter ${fighterId}: ${response.status}`, errorData);
      return null;
    }
    return await response.json() as FighterProfile;
  } catch (error) {
    console.error(`Error fetching fighter ${fighterId}:`, error);
    return null;
  }
}

/**
 * Fetches event details to get competitor IDs.
 * For this example, we'll assume the event details contain direct fighter IDs.
 * In a real scenario, the structure might be more complex (e.g., `competitors` array).
 * @param eventId The ID of the event (fightId is used as eventId here).
 * @returns A Promise resolving to an object with fighterAId and fighterBId or null.
 */
async function fetchEventCompetitorIds(eventId: string): Promise<{ fighterAId: string; fighterBId: string } | null> {
  if (!RAPIDAPI_KEY) {
    console.error('API key is not configured for event fetch');
    return null;
  }
  // This URL is hypothetical. Replace with the actual MMA API endpoint for event details
  // that provides competitor IDs for a given fight/event.
  // The user suggested /api/event/[id] or /live for this.
  // Let's assume /api/event/${eventId} returns { fighters: [{id: 'id1'}, {id: 'id2'}] } or similar
  const url = `https://mmaapi.p.rapidapi.com/api/mma/event/${eventId}`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': RAPIDAPI_KEY,
      'x-rapidapi-host': RAPIDAPI_HOST,
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorData = await response.json();
      console.error(`Failed to fetch event ${eventId}: ${response.status}`, errorData);
      return null;
    }
    const eventData = await response.json();
    // Adapt this based on the actual structure of your event API response
    // Example: if eventData.fighters is an array of { id: string, role: 'fighter1' | 'fighter2' }
    // Or if it's eventData.competitors.home.id and eventData.competitors.away.id
    // For now, assuming a simple structure:
    if (eventData.fighters && eventData.fighters.length >= 2) {
      return { fighterAId: eventData.fighters[0].id, fighterBId: eventData.fighters[1].id };
    } else if (eventData.mainCard && eventData.mainCard.length > 0 && eventData.mainCard[0].fighterAId && eventData.mainCard[0].fighterBId) {
      // Alternative: Assuming fightId corresponds to a fight within an event's mainCard or prelims
      // This requires knowing which fight in the card corresponds to the fightId
      // This part is highly speculative and depends on how fightId relates to event structure
      // For this example, let's assume if the top-level fighters array isn't there,
      // and the fightId is for the *first* fight in the main card for simplicity.
      // A robust solution needs a way to map fightId to the correct pair of fighters in the eventData.
      // This is a common challenge with such APIs if fightId isn't a direct lookup for a pairing.
      // The prompt implies fightId is the ID of the "fight" itself. If an event has many fights,
      // the event endpoint might return an array of fights, each with competitor IDs.
      // Let's assume eventData itself might be an array of fights if the ID is specific enough,
      // or it's an object with a `fights` array.
      // This part is a placeholder for actual API structure discovery.
      // A common pattern: eventData.fights.find(f => f.id === eventId) then get its competitors.
      // For now, sticking to the simpler `eventData.fighters` or a direct `fighterAId, fighterBId` on the event object.
      // The provided example from the user was `eventData.fighters[0].id`
      console.warn(`'eventData.fighters' not found or insufficient. Check API response structure for event ${eventId}. Attempting fallback...`);
      // This fallback is too speculative. Better to rely on a clear structure.
      // If eventData *is* the fight object itself:
      if (eventData.fighterAId && eventData.fighterBId) {
        return { fighterAId: eventData.fighterAId, fighterBId: eventData.fighterBId };
      }
      console.error('Could not extract fighter IDs from event data structure:', eventData);
      return null;
    } else {
      console.error('Could not extract fighter IDs from event data:', eventData);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching event ${eventId}:`, error);
    return null;
  }
}


/**
 * Calculates recent win percentage for a fighter.
 * @param fightHistory Array of past fights for the fighter.
 * @param N Number of recent fights to consider.
 * @returns Recent win percentage (0 to 1).
 */
function calculateRecentWinPct(fightHistory: Fight[] | undefined, N: number): number {
  if (!fightHistory || fightHistory.length === 0) return 0;
  // Ensure fights are sorted by date descending if not already
  const sortedHistory = [...fightHistory].sort((a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime());
  const recentFights = sortedHistory.slice(0, N);
  if (recentFights.length === 0) return 0; // Handle case where N > fightHistory.length
  const wins = recentFights.filter(fight => fight.result === 'win').length;
  return wins / recentFights.length;
}

/**
 * GET handler for the prediction API.
 * @param request The incoming NextRequest.
 * @param params The route parameters, containing fightId.
 * @returns A NextResponse with the prediction or an error.
 */
export async function GET(
  request: Request,
  { params }: { params: { fightId: string } },
) {
  const { fightId } = params;

  if (!fightId) {
    return NextResponse.json({ error: 'Fight ID is required' }, { status: 400 });
  }

  if (!RAPIDAPI_KEY) {
    return NextResponse.json({ error: 'API key is not configured server-side' }, { status: 500 });
  }

  // 1. Fetch event to get competitor IDs
  const competitorIds = await fetchEventCompetitorIds(fightId);
  if (!competitorIds) {
    return NextResponse.json({ error: `Could not fetch competitor IDs for fight ${fightId}. Verify the event API endpoint and response structure.` }, { status: 500 });
  }
  const { fighterAId, fighterBId } = competitorIds;

  // 2. Fetch stats for each fighter
  const [fighterAProfile, fighterBProfile] = await Promise.all([
    fetchFighterDetails(fighterAId),
    fetchFighterDetails(fighterBId),
  ]);

  if (!fighterAProfile || !fighterBProfile) {
    const errors: string[] = [];
    if (!fighterAProfile) errors.push(`Failed to fetch details for fighter ${fighterAId}`);
    if (!fighterBProfile) errors.push(`Failed to fetch details for fighter ${fighterBId}`);
    return NextResponse.json({ error: 'Failed to fetch fighter details for one or both fighters', details: errors }, { status: 500 });
  }

  // 3. Feature Calculation
  const recentWinPctA = calculateRecentWinPct(fighterAProfile.fightHistory, NUMBER_OF_FIGHTS_FOR_RECENT_WIN_PCT);
  const recentWinPctB = calculateRecentWinPct(fighterBProfile.fightHistory, NUMBER_OF_FIGHTS_FOR_RECENT_WIN_PCT);

  // Use appropriate stats fields from your FighterStats type in mma-api.ts
  // These are examples, adjust to your actual type fields for averages
  const avgStrikesA = fighterAProfile.stats?.sigStrikesLandedPerMin ?? fighterAProfile.stats?.avgStrikesLanded ?? 0;
  const avgStrikesB = fighterBProfile.stats?.sigStrikesLandedPerMin ?? fighterBProfile.stats?.avgStrikesLanded ?? 0;
  const avgTakedownsA = fighterAProfile.stats?.avgTakedownsLandedPer15Min ?? fighterAProfile.stats?.avgTakedownsLanded ?? 0;
  const avgTakedownsB = fighterBProfile.stats?.avgTakedownsLandedPer15Min ?? fighterBProfile.stats?.avgTakedownsLanded ?? 0;


  // Differentials
  const X1_recentWinPctDiff = recentWinPctA - recentWinPctB;
  const deltaStrikes = avgStrikesA - avgStrikesB;
  const deltaTakedowns = avgTakedownsA - avgTakedownsB;

  // 4. Apply Logistic Regression
  const z = w0 + w1 * X1_recentWinPctDiff + w2 * deltaStrikes + w3 * deltaTakedowns;
  const pA = 1 / (1 + Math.exp(-z));
  const pB = 1 - pA;

  // 5. Return Response
  return NextResponse.json({
    fightId,
    fighterAId: fighterAProfile.fighterId, // Return actual IDs used, helpful for client
    fighterBId: fighterBProfile.fighterId,
    fighterAName: `${fighterAProfile.firstName} ${fighterAProfile.lastName}`,
    fighterBName: `${fighterBProfile.firstName} ${fighterBProfile.lastName}`,
    prediction: {
      [fighterAProfile.fighterId]: parseFloat(pA.toFixed(4)), // Probability for fighter A
      [fighterBProfile.fighterId]: parseFloat(pB.toFixed(4)), // Probability for fighter B
      fighterA: parseFloat(pA.toFixed(4)), // Generic key for fighter A
      fighterB: parseFloat(pB.toFixed(4)), // Generic key for fighter B
    },
    debug_features: { // Optional: for debugging, remove in production
        recentWinPctA: parseFloat(recentWinPctA.toFixed(3)),
        recentWinPctB: parseFloat(recentWinPctB.toFixed(3)),
        avgStrikesA: parseFloat(avgStrikesA.toFixed(2)),
        avgStrikesB: parseFloat(avgStrikesB.toFixed(2)),
        avgTakedownsA: parseFloat(avgTakedownsA.toFixed(2)),
        avgTakedownsB: parseFloat(avgTakedownsB.toFixed(2)),
        X1_recentWinPctDiff: parseFloat(X1_recentWinPctDiff.toFixed(3)),
        deltaStrikes: parseFloat(deltaStrikes.toFixed(2)),
        deltaTakedowns: parseFloat(deltaTakedowns.toFixed(2)),
        z_value: parseFloat(z.toFixed(4)),
    }
  });
}
