import { NextResponse } from 'next/server';

/**
 * @swagger
 * /api/fighter/{id}:
 *   get:
 *     summary: Get fighter details by ID
 *     description: Retrieves detailed information about a specific MMA fighter.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the fighter to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with fighter details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object # Replace with actual fighter details schema
 *       400:
 *         description: Bad request (e.g., missing ID).
 *       404:
 *         description: Fighter not found.
 *       500:
 *         description: Internal server error.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const fighterId = params.id; // Use a more descriptive variable name

  if (!fighterId) {
    console.warn("GET /api/fighter/[id]: Fighter ID is missing in request params");
    return NextResponse.json({ error: 'Fighter ID is required' }, { status: 400 });
  }

  const apiKey = process.env.RAPIDAPI_KEY;

  if (!apiKey) {
    console.error("GET /api/fighter/[id]: RAPIDAPI_KEY is not configured.");
    return NextResponse.json({ error: 'API key is not configured server-side. Cannot fetch fighter details.' }, { status: 500 });
  }

  const url = `https://mmaapi.p.rapidapi.com/api/mma/fighter/${fighterId}`;
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
      console.error(`GET /api/fighter/${fighterId}: Failed to fetch fighter details from external API. Status: ${response.status}, Body: ${errorResult}`);
      return NextResponse.json({
        error: 'Failed to fetch fighter details from external provider.',
        details: `External API responded with status ${response.status}.`
      }, { status: response.status > 499 ? 502 : response.status }); // 502 Bad Gateway for server-side errors from upstream
    }

    const result = await response.json();
    return NextResponse.json(result);

  } catch (error: any) { // Explicitly type error
    console.error(`GET /api/fighter/${fighterId}: An unexpected error occurred.`, error);
    return NextResponse.json({
      error: 'Internal server error while fetching fighter details.',
      details: error.message || 'An unknown error occurred'
    }, { status: 500 });
  }
}
