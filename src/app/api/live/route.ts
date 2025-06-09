import { NextResponse } from 'next/server';

/**
 * @swagger
 * /api/live:
 *   get:
 *     summary: Get live fight stats
 *     description: Retrieves live statistics for ongoing MMA fights.
 *     parameters:
 *       - in: query
 *         name: fightId
 *         required: false
 *         description: The ID of a specific fight to get live stats for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with live fight stats.
 *         content:
 *           application/json:
 *             schema:
 *               type: object # Replace with actual live stats schema
 *       400:
 *         description: Bad request.
 *       500:
 *         description: Internal server error.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const fightId = searchParams.get('fightId');

  const apiKey = process.env.RAPIDAPI_KEY;
  const queryParamsLog = `fightId=${fightId || 'all'}`;


  if (!apiKey) {
    console.error(`GET /api/live?${queryParamsLog}: RAPIDAPI_KEY is not configured.`);
    return NextResponse.json({ error: 'API key is not configured server-side. Cannot fetch live stats.' }, { status: 500 });
  }

  // The MMA API documentation doesn't specify a dedicated endpoint for live stats.
  // Assuming a generic endpoint or one that might require a fightId.
  // This URL might need adjustment based on the actual API capabilities.
  const baseUrl = 'https://mmaapi.p.rapidapi.com/api/mma/live';
  const url = fightId ? `${baseUrl}?fightId=${fightId}` : baseUrl; // Note: API might not support fightId query for this general endpoint

  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': 'mmaapi.p.rapidapi.com',
    },
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorResult = await response.text(); // Use text() to avoid JSON parse error if response is not JSON
      console.error(`GET /api/live?${queryParamsLog}: Failed to fetch live stats from external API. Status: ${response.status}, Body: ${errorResult}`);
      return NextResponse.json({
        error: 'Failed to fetch live fight stats from external provider.',
        details: `External API responded with status ${response.status}.`
      }, { status: response.status > 499 ? 502 : response.status }); // 502 Bad Gateway for server-side errors from upstream
    }

    const result = await response.json();
    return NextResponse.json(result);

  } catch (error: any) { // Explicitly type error
    console.error(`GET /api/live?${queryParamsLog}: An unexpected error occurred.`, error);
    return NextResponse.json({
      error: 'Internal server error while fetching live fight stats.',
      details: error.message || 'An unknown error occurred'
    }, { status: 500 });
  }
}
