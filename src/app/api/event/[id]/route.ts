import { NextResponse } from 'next/server';

/**
 * @swagger
 * /api/event/{id}:
 *   get:
 *     summary: Get event details by ID
 *     description: Retrieves detailed information about a specific MMA event.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the event to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with event details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object # Replace with actual event details schema
 *       400:
 *         description: Bad request (e.g., missing ID).
 *       404:
 *         description: Event not found.
 *       500:
 *         description: Internal server error.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  const eventId = id; // Use a more descriptive variable name

  if (!eventId) {
    console.warn("GET /api/event/[id]: Event ID is missing in request params");
    return NextResponse.json({ error: 'Event ID is required' }, { status: 400 });
  }

  const apiKey = process.env.RAPIDAPI_KEY;

  if (!apiKey) {
    console.error("GET /api/event/[id]: RAPIDAPI_KEY is not configured.");
    return NextResponse.json({ error: 'API key is not configured server-side. Cannot fetch event details.' }, { status: 500 });
  }

  const url = `https://mmaapi.p.rapidapi.com/api/mma/event/${eventId}`;
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
      console.error(`GET /api/event/${eventId}: Failed to fetch event details from external API. Status: ${response.status}, Body: ${errorResult}`);
      return NextResponse.json({
        error: 'Failed to fetch event details from external provider.',
        details: `External API responded with status ${response.status}.`
      }, { status: response.status > 499 ? 502 : response.status }); // 502 Bad Gateway for server-side errors from upstream
    }

    const result = await response.json();
    return NextResponse.json(result);

  } catch (error: any) { // Explicitly type error
    console.error(`GET /api/event/${eventId}: An unexpected error occurred.`, error);
    return NextResponse.json({
      error: 'Internal server error while fetching event details.',
      details: error.message || 'An unknown error occurred'
    }, { status: 500 });
  }
}
