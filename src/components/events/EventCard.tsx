'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/functions/cn'; // Assuming cn function is in src/functions/cn.ts

// Define TypeScript types for the event data - replace with actual types from mma-api.ts later
interface Fight {
  id: string;
  participants: string[]; // Names of participants
  method: string; // Method of win/fight
  time: string; // Time of fight
  round: number;
}

interface EventData {
  name: string;
  date: string;
  venue: string;
  fights: Fight[];
}

interface EventCardProps {
  id: string;
  className?: string;
}

/**
 * EventCard component.
 * Fetches and displays details of an MMA event, including its fight card.
 *
 * @param {EventCardProps} props - The properties for the component.
 * @param {string} props.id - The ID of the event.
 * @param {string} [props.className] - Optional CSS classes for styling.
 * @returns {JSX.Element} The rendered event card.
 */
const EventCard: React.FC<EventCardProps> = ({ id, className }) => {
  const [eventData, setEventData] = useState<EventData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEventData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/event/${id}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `Failed to fetch event data: ${response.statusText}`);
        }
        const data = await response.json();
        // Assuming the API returns event data in a specific structure
        // You'll need to adjust this based on the actual API response from mma-api.ts
        setEventData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEventData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className={cn('p-4 border rounded-lg shadow-md animate-pulse bg-gray-800', className)}>
        <div className="h-8 bg-gray-700 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-700 rounded w-1/3 mb-6"></div>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-10 bg-gray-700 rounded"></div>
          ))}
        </div>
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

  if (!eventData) {
    return (
      <div className={cn('p-4 border rounded-lg shadow-md', className)}>
        <p>No event data available.</p>
      </div>
    );
  }

  return (
    <div className={cn('p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl', className)}>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">{eventData.name}</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400">{new Date(eventData.date).toLocaleDateString()}</p>
        <p className="text-md text-gray-500 dark:text-gray-500">{eventData.venue}</p>
      </div>

      <div>
        <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Fight Card</h3>
        {eventData.fights && eventData.fights.length > 0 ? (
          <ul className="space-y-4">
            {eventData.fights.map((fight) => (
              <li key={fight.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                  {fight.participants.join(' vs ')}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Method: {fight.method}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Time: {fight.time} - Round: {fight.round}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No fights scheduled for this event yet.</p>
        )}
      </div>
       <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-6">
        Note: Displayed data structure is assumed. Actual data from API may vary.
      </p>
    </div>
  );
};

export default EventCard;
