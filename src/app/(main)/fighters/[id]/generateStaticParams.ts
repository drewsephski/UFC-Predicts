import { getFighters } from '@/lib/api/ufc';

// This function runs at build time to generate static paths
export async function generateStaticParams() {
  try {
    const fighters = await getFighters();
    return fighters.map((fighter) => ({
      id: fighter.id.toString(),
    }));
  } catch (error) {
    console.error('Error generating static params for fighters:', error);
    return [];
  }
}
