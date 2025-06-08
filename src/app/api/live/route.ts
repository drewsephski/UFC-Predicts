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

  if (!apiKey) {
    return NextResponse.json({ error: 'API key is not configured' }, { status: 500 });
  }

  // The MMA API documentation doesn't specify a dedicated endpoint for live stats.
  // Assuming a generic endpoint or one that might require a fightId.
  // This URL might need adjustment based on the actual API capabilities.
  const baseUrl = 'https://mmaapi.p.rapidapi.com/api/mma/live';
  const url = fightId ? `${baseUrl}?fightId=${fightId}` : baseUrl;

  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': 'mmaapi.p.rapidapi.com',
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch live fight stats', details: result }, { status: response.status });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching live fight stats:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
