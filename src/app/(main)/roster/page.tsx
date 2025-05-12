import { FighterCard } from '@/components/fighters/fighter-card';
import type { Fighter } from '@/types/mma'; // Import as type only

async function fetchFighters(): Promise<Fighter[]> {
  try {
    const response = await fetch('https://api.sportsdata.io/v3/mma/stats/json/Fighters?key=7fe7fb099e6a482e8c83febaa699e36d', {
      next: { revalidate: 3600 } // Revalidate data every hour
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error: ${response.status} ${response.statusText}`, errorText);
      throw new Error(`Failed to fetch fighters. Status: ${response.status}`);
    }
    const data: Fighter[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching fighters:", error);
    if (error instanceof Error) {
        throw error;
    }
    throw new Error("An unknown error occurred while fetching fighters.");
  }
}

export default async function RosterPage() {
  let fighters: Fighter[] = [];
  let fetchError: string | null = null;

  try {
    fighters = await fetchFighters();
  } catch (error) {
    console.error("Failed to load fighters for RosterPage:", error);
    fetchError = error instanceof Error ? error.message : "An unexpected error occurred.";
    fighters = []; // Ensure fighters is an empty array on error
  }

  if (fetchError) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-8 text-red-500">Error Loading Roster</h1>
        <p className="text-gray-600 dark:text-gray-400">{fetchError}</p>
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-300">
          Please try again later. If the problem persists, contact support.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">MMA Fighter Roster</h1>
      {fighters && fighters.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {fighters.map((fighter) => (
            <FighterCard key={fighter.FighterId} fighter={fighter} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400">No fighters found or available at the moment.</p>
      )}
    </div>
  );
} 
