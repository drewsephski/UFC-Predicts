'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/functions/cn'; // Assuming cn function is in src/functions/cn.ts

// Define TypeScript types for the fighter data - replace with actual types from mma-api.ts later
interface FighterStats {
  wins: number;
  losses: number;
  draws: number;
  knockouts: number;
  submissions: number;
}

interface FighterRecord {
  // Define structure for fight records if available
  [key: string]: any;
}

interface FighterProfileProps {
  id: string;
  className?: string;
}

/**
 * FighterProfile component.
 * Fetches and displays MMA fighter statistics and record.
 *
 * @param {FighterProfileProps} props - The properties for the component.
 * @param {string} props.id - The ID of the fighter.
 * @param {string} [props.className] - Optional CSS classes for styling.
 * @returns {JSX.Element} The rendered fighter profile.
 */
const FighterProfile: React.FC<FighterProfileProps> = ({ id, className }) => {
  const [fighterData, setFighterData] = useState<FighterStats | null>(null);
  const [fighterRecord, setFighterRecord] = useState<FighterRecord | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFighterData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/fighter/${id}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `Failed to fetch fighter data: ${response.statusText}`);
        }
        const data = await response.json();
        // Assuming the API returns stats and record in a specific structure
        // You'll need to adjust this based on the actual API response from mma-api.ts
        setFighterData(data.stats || { wins: data.wins, losses: data.losses, draws: data.draws, knockouts: data.ko, submissions: data.submissions });
        setFighterRecord(data.record || null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchFighterData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className={cn('p-4 border rounded-lg shadow-md animate-pulse bg-gray-800', className)}>
        <div className="h-8 bg-gray-700 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-700 rounded w-1/3"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn('p-4 border border-red-500 rounded-lg shadow-md bg-red-100 text-red-700', className)}>
        <p className="font-semibold">Error:</p>
        <p>{error}</p>
      </div>
    );
  }

  if (!fighterData) {
    return (
      <div className={cn('p-4 border rounded-lg shadow-md', className)}>
        <p>No fighter data available.</p>
      </div>
    );
  }

  return (
    <div className={cn('p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl', className)}>
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
        Fighter Profile - ID: {id}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">Statistics</h3>
          <p className="text-gray-600 dark:text-gray-400">Wins: <span className="font-medium text-green-500">{fighterData.wins}</span></p>
          <p className="text-gray-600 dark:text-gray-400">Losses: <span className="font-medium text-red-500">{fighterData.losses}</span></p>
          <p className="text-gray-600 dark:text-gray-400">Draws: <span className="font-medium text-yellow-500">{fighterData.draws}</span></p>
          <p className="text-gray-600 dark:text-gray-400">Knockouts: <span className="font-medium">{fighterData.knockouts}</span></p>
          <p className="text-gray-600 dark:text-gray-400">Submissions: <span className="font-medium">{fighterData.submissions}</span></p>
        </div>
        {fighterRecord && (
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">Record</h3>
            {/* Render fighter record details here - this is a placeholder */}
            <pre className="text-sm text-gray-600 dark:text-gray-400 overflow-auto max-h-60">
              {JSON.stringify(fighterRecord, null, 2)}
            </pre>
          </div>
        )}
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
        Note: Displayed data structure is assumed. Actual data from API may vary.
      </p>
    </div>
  );
};

export default FighterProfile;
