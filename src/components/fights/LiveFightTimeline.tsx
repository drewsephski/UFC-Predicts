'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { cn } from '@/functions/cn'; // Assuming cn function is in src/functions/cn.ts

// Define TypeScript types for live fight event data - replace with actual types from mma-api.ts later
interface FightEvent {
  id: string;
  timestamp: string; // ISO 8601 timestamp
  description: string;
  type: 'significant_strike' | 'takedown' | 'submission_attempt' | 'knockdown' | 'round_end' | 'fight_end' | 'custom';
  fighter?: string; // Name or ID of the fighter involved
  details?: Record<string, any>; // Additional details for the event
}

interface LiveFightTimelineProps {
  fightId: string;
  pollInterval?: number; // in milliseconds
  className?: string;
}

/**
 * LiveFightTimeline component.
 * Polls for live fight events and displays them in an animated timeline.
 *
 * @param {LiveFightTimelineProps} props - The properties for the component.
 * @param {string} props.fightId - The ID of the fight to poll.
 * @param {number} [props.pollInterval=5000] - The interval for polling live data (in ms).
 * @param {string} [props.className] - Optional CSS classes for styling.
 * @returns {JSX.Element} The rendered live fight timeline.
 */
const LiveFightTimeline: React.FC<LiveFightTimelineProps> = ({
  fightId,
  pollInterval = 5000,
  className,
}) => {
  const [events, setEvents] = useState<FightEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isPolling, setIsPolling] = useState<boolean>(true);

  const fetchLiveEvents = useCallback(async () => {
    if (!isPolling) return;
    // Do not set loading to true on every poll, only on initial load
    // setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/live?fightId=${fightId}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to fetch live fight data: ${response.statusText}`);
      }
      const newEvents = await response.json();
      // Assuming newEvents is an array of FightEvent
      // This logic assumes the API returns all events or new events since last poll.
      // If it returns all events, you might want to filter duplicates or only add new ones.
      // For simplicity, we're replacing events, but a more robust solution might append unique events.
      setEvents((prevEvents) => {
        // Example: simple append, or more complex merge/filter logic
        // This assumes newEvents are always fresh and should replace or be merged
        if (Array.isArray(newEvents) && newEvents.length > 0) {
            // A more robust approach would be to merge based on event IDs if they are unique and sorted
            const existingEventIds = new Set(prevEvents.map(e => e.id));
            const trulyNewEvents = newEvents.filter(e => !existingEventIds.has(e.id));
            return [...prevEvents, ...trulyNewEvents].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
        }
        return prevEvents; // Or newEvents if the API only returns the latest state
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred during polling');
      setIsPolling(false); // Stop polling on error
    } finally {
      setLoading(false); // Set loading to false after the first fetch attempt
    }
  }, [fightId, isPolling]);

  useEffect(() => {
    setLoading(true); // Initial load
    fetchLiveEvents(); // Initial fetch

    if (pollInterval > 0 && isPolling) {
      const intervalId = setInterval(fetchLiveEvents, pollInterval);
      return () => clearInterval(intervalId);
    }
  }, [fetchLiveEvents, pollInterval, isPolling]);

  if (loading && events.length === 0) { // Show loading skeleton only if no events are loaded yet
    return (
      <div className={cn('p-4 border rounded-lg shadow-md animate-pulse bg-gray-800', className)}>
        <div className="h-6 bg-gray-700 rounded w-1/2 mb-4"></div>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center space-x-3 mb-3">
            <div className="h-10 w-10 bg-gray-700 rounded-full"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-700 rounded w-3/4"></div>
              <div className="h-3 bg-gray-700 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn('p-4 border border-red-500 rounded-lg shadow-md bg-red-100 text-red-700', className)}>
        <p className="font-semibold">Error polling live data:</p>
        <p>{error}</p>
        <button
          onClick={() => { setIsPolling(true); setLoading(true); fetchLiveEvents(); }}
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Retry
        </button>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className={cn('p-4 border rounded-lg shadow-md text-center', className)}>
        <p className="text-gray-500 dark:text-gray-400">No live fight events available for fight ID: {fightId}.</p>
        <p className="text-sm text-gray-400 dark:text-gray-500">Waiting for events...</p>
      </div>
    );
  }

  return (
    <div className={cn('p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg', className)}>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Live Fight Timeline - ID: {fightId}
      </h2>
      <div className="space-y-6 border-l-2 border-blue-500 dark:border-blue-400 pl-6 relative">
        {events.map((event, index) => (
          <div key={event.id || index} className="relative group animate-fadeIn">
            {/* Dot on the timeline */}
            <div className="absolute -left-[calc(1.5rem_+_1px)] top-1 w-4 h-4 bg-blue-500 dark:bg-blue-400 rounded-full border-4 border-white dark:border-gray-900 group-hover:scale-125 transition-transform"></div>

            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                {new Date(event.timestamp).toLocaleTimeString()}
              </p>
              <p className="font-semibold text-gray-700 dark:text-gray-200">{event.description}</p>
              <p className="text-sm text-blue-600 dark:text-blue-300 capitalize">Type: {event.type.replace('_', ' ')}</p>
              {event.fighter && (
                <p className="text-sm text-gray-600 dark:text-gray-300">Fighter: {event.fighter}</p>
              )}
              {/* Render other event details if needed */}
            </div>
          </div>
        ))}
      </div>
      {isPolling && (
         <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-6 animate-pulse">
            Polling for live updates...
        </p>
      )}
      {!isPolling && !error && (
         <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-6">
            Polling paused.
        </p>
      )}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
       <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-6">
        Note: Displayed data structure is assumed. Actual data from API may vary.
      </p>
    </div>
  );
};

export default LiveFightTimeline;
