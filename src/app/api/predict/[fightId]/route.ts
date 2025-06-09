import { NextResponse } from 'next/server';
import type { FighterProfile, Fight } from '@/types/mma-api'; // Assuming types are in mma-api.ts

// Cache configuration
const predictionCache = new Map<string, { predictionData: any; timestamp: number }>();
const REVALIDATE_PREDICTION_AFTER_SECONDS = 3600; // Revalidate every hour

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
 * @returns A Promise resolving to an object containing FighterProfile or an error object.
 */
async function fetchFighterDetails(fighterId: string): Promise<{ data: FighterProfile | null; error: ApiError | null }> {
  if (!RAPIDAPI_KEY) {
    const msg = `fetchFighterDetails: RAPIDAPI_KEY not configured. Cannot fetch fighter ${fighterId}.`;
    console.error(msg);
    return { data: null, error: { message: "API key not configured server-side.", status: 500, details: msg } };
  }
  const url = `https://mmaapi.p.rapidapi.com/api/mma/fighter/${fighterId}`;
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
      const errorText = await response.text();
      const msg = `fetchFighterDetails: Failed to fetch fighter ${fighterId}. Status: ${response.status}. Body: ${errorText}`;
      console.error(msg);
      return { data: null, error: { message: `External API error fetching fighter ${fighterId}.`, status: response.status >= 500 ? 502 : response.status, details: errorText } };
    }
    const data = await response.json() as FighterProfile;
    return { data, error: null };
  } catch (error: any) {
    const msg = `fetchFighterDetails: Exception fetching fighter ${fighterId}.`;
    console.error(msg, error);
    return { data: null, error: { message: "Internal server error during API call to fetch fighter details.", status: 500, details: error.message } };
  }
}

/**
 * Fetches event details to get competitor IDs.
 * For this example, we'll assume the event details contain direct fighter IDs.
 * In a real scenario, the structure might be more complex (e.g., `competitors` array).
 * @param eventId The ID of the event (fightId is used as eventId here).
 * @returns A Promise resolving to an object containing competitor IDs or an error object.
 */
async function fetchEventCompetitorIds(eventId: string): Promise<{ data: { fighterAId: string; fighterBId: string } | null; error: ApiError | null }> {
  if (!RAPIDAPI_KEY) {
    const msg = `fetchEventCompetitorIds: RAPIDAPI_KEY not configured. Cannot fetch event ${eventId}.`;
    console.error(msg);
    return { data: null, error: { message: "API key not configured server-side.", status: 500, details: msg } };
  }
  const url = `https://mmaapi.p.rapidapi.com/api/mma/event/${eventId}`; // Hypothetical URL
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
      const errorText = await response.text();
      const msg = `fetchEventCompetitorIds: Failed to fetch event ${eventId}. Status: ${response.status}. Body: ${errorText}`;
      console.error(msg);
      return { data: null, error: { message: `External API error fetching event ${eventId}.`, status: response.status >= 500 ? 502 : response.status, details: errorText } };
    }
    const eventData = await response.json();

    // Adapt this based on the actual structure of your event API response
    if (eventData.fighters && eventData.fighters.length >= 2) {
      return { data: { fighterAId: eventData.fighters[0].id, fighterBId: eventData.fighters[1].id }, error: null };
    } else if (eventData.fighterAId && eventData.fighterBId) { // If eventData *is* the fight object itself
        return { data: { fighterAId: eventData.fighterAId, fighterBId: eventData.fighterBId }, error: null };
    } else {
      const msg = `fetchEventCompetitorIds: Could not extract fighter IDs from event data structure for event ${eventId}.`;
      console.error(msg, eventData);
      return { data: null, error: { message: "Could not parse competitor IDs from external API response.", status: 500, details: msg } };
    }
  } catch (error: any) {
    const msg = `fetchEventCompetitorIds: Exception fetching event ${eventId}.`;
    console.error(msg, error);
    return { data: null, error: { message: "Internal server error during API call to fetch event competitor IDs.", status: 500, details: error.message } };
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
    console.warn(`GET /api/predict/[fightId]: Fight ID is missing in request params.`);
    return NextResponse.json({ error: 'Fight ID is required in the path.' }, { status: 400 });
  }

  if (!RAPIDAPI_KEY) {
    console.error(`GET /api/predict/${fightId}: RAPIDAPI_KEY is not configured server-side.`);
    return NextResponse.json({ error: 'API key is not configured server-side. Cannot make prediction.' }, { status: 500 });
  }

  const currentTime = Date.now();
  const cachedEntry = predictionCache.get(fightId);

  // Stale-while-revalidate caching logic
  // 1. If cache exists and is fresh, serve from cache.
  if (cachedEntry && (currentTime - cachedEntry.timestamp < REVALIDATE_PREDICTION_AFTER_SECONDS * 1000)) {
    console.log(`GET /api/predict/${fightId}: Cache hit (fresh).`);
    return NextResponse.json(cachedEntry.predictionData);
  }

  // 2. If cache exists but is stale, serve stale data and revalidate in background.
  if (cachedEntry) {
    console.log(`GET /api/predict/${fightId}: Cache hit (stale). Serving stale data and revalidating in background.`);
    // Don't await this call, let it run in the background
    generatePrediction(fightId) // fightId is already validated to be present
      .then(predictionResult => { // generatePrediction now returns { data, error }
        if (predictionResult.data) {
          predictionCache.set(fightId, { predictionData: predictionResult.data, timestamp: Date.now() });
          console.log(`GET /api/predict/${fightId}: Cache updated after background revalidation.`);
        } else if (predictionResult.error) {
          console.error(`GET /api/predict/${fightId}: Background revalidation failed. Error: ${predictionResult.error.message}`, predictionResult.error.details || '');
        }
      })
      .catch(error => { // Should ideally not be reached if generatePrediction catches its own errors
        console.error(`GET /api/predict/${fightId}: Unexpected error during background revalidation promise chain.`, error);
      });
    return NextResponse.json(cachedEntry.predictionData); // Serve stale data
  }

  // 3. If no cache, fetch data, cache it, and serve.
  console.log(`GET /api/predict/${fightId}: Cache miss. Fetching new prediction.`);
  const predictionResult = await generatePrediction(fightId);

  if (predictionResult.error) {
    // If fetching new data results in an error (e.g., API failure), return that error
    console.error(`GET /api/predict/${fightId}: Failed to generate prediction. Error: ${predictionResult.error.message}`, predictionResult.error.details || '');
    return NextResponse.json(
        { error: predictionResult.error.message, details: predictionResult.error.details },
        { status: predictionResult.error.status || 500 }
    );
  }

  if (!predictionResult.data) {
      // This case should ideally be covered by predictionResult.error, but as a safeguard:
      console.error(`GET /api/predict/${fightId}: Prediction generation returned no data and no error.`);
      return NextResponse.json({ error: "Failed to generate prediction due to an unknown issue.", details: "No data was returned from the prediction function." }, { status: 500 });
  }

  // Cache the newly fetched data
  predictionCache.set(fightId, { predictionData: predictionResult.data, timestamp: Date.now() });
  console.log(`GET /api/predict/${fightId}: Prediction fetched and cached.`);
  return NextResponse.json(predictionResult.data);
}

/**
 * Generates a fight prediction.
 * This function encapsulates the original logic for fetching data and calculating the prediction.
 * It's used for both initial cache misses and background revalidations.
 * @param fightId The ID of the fight.
 * @returns A Promise resolving to an object containing prediction data or an error object.
 */
async function generatePrediction(fightId: string): Promise<{ data: any | null; error: ApiError | null }> {
  // 1. Fetch event to get competitor IDs
  const competitorIdsResult = await fetchEventCompetitorIds(fightId);
  if (competitorIdsResult.error || !competitorIdsResult.data) {
    console.error(`generatePrediction (fightId: ${fightId}): Failed to fetch competitor IDs.`, competitorIdsResult.error);
    return { data: null, error: competitorIdsResult.error || { message: "Unknown error fetching competitor IDs.", status: 500 } };
  }
  const { fighterAId, fighterBId } = competitorIdsResult.data;

  // 2. Fetch stats for each fighter
  const [fighterAResult, fighterBResult] = await Promise.all([
    fetchFighterDetails(fighterAId),
    fetchFighterDetails(fighterBId),
  ]);

  const errors: string[] = [];
  if (fighterAResult.error || !fighterAResult.data) {
    errors.push(`Failed to fetch details for fighter ${fighterAId}: ${fighterAResult.error?.message || 'Unknown error'}`);
    console.error(`generatePrediction (fightId: ${fightId}): Fighter A fetch failed.`, fighterAResult.error);
  }
  if (fighterBResult.error || !fighterBResult.data) {
    errors.push(`Failed to fetch details for fighter ${fighterBId}: ${fighterBResult.error?.message || 'Unknown error'}`);
    console.error(`generatePrediction (fightId: ${fightId}): Fighter B fetch failed.`, fighterBResult.error);
  }

  if (errors.length > 0 || !fighterAResult.data || !fighterBResult.data) {
    // Determine combined status - prefer 502 if any upstream was 502, else 500, or specific status if only one error
    let combinedStatus = 500;
    if (fighterAResult.error?.status === 502 || fighterBResult.error?.status === 502) combinedStatus = 502;
    else if (fighterAResult.error) combinedStatus = fighterAResult.error.status || 500;
    else if (fighterBResult.error) combinedStatus = fighterBResult.error.status || 500;

    return { data: null, error: { message: 'Failed to fetch fighter details for one or both fighters.', details: errors.join('; '), status: combinedStatus } };
  }

  const fighterAProfile = fighterAResult.data;
  const fighterBProfile = fighterBResult.data;

  // 3. Feature Calculation
  const recentWinPctA = calculateRecentWinPct(fighterAProfile.fightHistory, NUMBER_OF_FIGHTS_FOR_RECENT_WIN_PCT);
  const recentWinPctB = calculateRecentWinPct(fighterBProfile.fightHistory, NUMBER_OF_FIGHTS_FOR_RECENT_WIN_PCT);

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

  // 5. Prepare Response Data
  const predictionData = {
    fightId,
    fighterAId: fighterAProfile.fighterId,
    fighterBId: fighterBProfile.fighterId,
    fighterAName: `${fighterAProfile.firstName} ${fighterAProfile.lastName}`,
    fighterBName: `${fighterBProfile.firstName} ${fighterBProfile.lastName}`,
    prediction: {
      [fighterAProfile.fighterId]: parseFloat(pA.toFixed(4)),
      [fighterBProfile.fighterId]: parseFloat(pB.toFixed(4)),
      fighterA: parseFloat(pA.toFixed(4)),
      fighterB: parseFloat(pB.toFixed(4)),
    },
    debug_features: { // Optional: for debugging
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
  };
  return { data: predictionData, error: null };
}
