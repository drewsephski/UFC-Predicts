"use client";

import { useState, useEffect, useCallback } from 'react';

interface Venue {
  id: string;
  name: string;
  city: string;
  state?: string;
  country: string;
}

interface Fighter {
  id: string;
  name: string;
  nickname?: string;
  division: string;
  record: string;
  country?: string;
  isChampion: boolean;
  imageUrl?: string;
}

interface Fight {
  id: string;
  eventId: string;
  fighter1Id: string;
  fighter1: Fighter;
  fighter2Id: string;
  fighter2: Fighter;
  weightClass: string;
  isMainEvent: boolean;
  isTitleFight: boolean;
  order: number;
}

interface Event {
  id: string;
  name: string;
  date: string;
  venueId: string;
  venue: Venue;
  mainCard: Fight[];
  prelimCard: Fight[];
}

interface UseEventsOptions {
  upcoming?: boolean;
  past?: boolean;
}

export const useEvents = (options?: UseEventsOptions) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      let url = '/api/events';
      const params = new URLSearchParams();

      if (options?.upcoming) {
        params.append('upcoming', 'true');
      } else if (options?.past) {
        params.append('past', 'true');
      }

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }

      const data = await response.json();
      setEvents(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [options?.upcoming, options?.past]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return {
    events,
    isLoading,
    error,
    refreshEvents: fetchEvents
  };
};

export const useEvent = (id: string) => {
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEvent = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/events/${id}`);

      if (!response.ok) {
        throw new Error('Failed to fetch event');
      }

      const data = await response.json();
      setEvent(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchEvent();
    }
  }, [id, fetchEvent]);

  return {
    event,
    isLoading,
    error,
    refreshEvent: fetchEvent
  };
};
