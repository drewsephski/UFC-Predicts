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
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'Fighter ID is required' }, { status: 400 });
  }

  const apiKey = process.env.RAPIDAPI_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'API key is not configured' }, { status: 500 });
  }

  const url = `https://mmaapi.p.rapidapi.com/api/mma/fighter/${id}`;
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
      return NextResponse.json({ error: 'Failed to fetch fighter details', details: result }, { status: response.status });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching fighter details:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
