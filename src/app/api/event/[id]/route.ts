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

  if (!id) {
    return NextResponse.json({ error: 'Event ID is required' }, { status: 400 });
  }

  const apiKey = process.env.RAPIDAPI_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'API key is not configured' }, { status: 500 });
  }

  const url = `https://mmaapi.p.rapidapi.com/api/mma/event/${id}`;
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
      return NextResponse.json({ error: 'Failed to fetch event details', details: result }, { status: response.status });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching event details:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
