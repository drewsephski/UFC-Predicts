"use client";

import React, { useState, useEffect } from 'react';
import { useUFC } from '@/contexts/ufc-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LoadingState, ErrorState } from '@/components/ui/loading-state';
import { Calendar, Clock, Trophy } from 'lucide-react';

// Local Fight type based on the current /api/fighters/:id/fights endpoint response
interface Fight {
  id: string;
  eventId: string;
  redCornerId: string;
  blueCornerId: string;
  weightClass: string;
  isMainEvent: boolean;
  isTitleFight: boolean;
  rounds: number;
  date: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  result?: {
    winnerId?: string;
    method?: string;
    round?: number;
    time?: string;
  };
  redCorner?: { name: string }; // Assuming only name is needed
  blueCorner?: { name: string }; // Assuming only name is needed
}

interface FighterFightHistoryProps {
  fighterId: string;
}

export function FighterFightHistory({ fighterId }: FighterFightHistoryProps) {
  const { pastEvents, loadingEvents, errorEvents, refreshEvents } = useUFC();
  const [fights, setFights] = useState<Fight[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFighterHistory = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/fighters/${fighterId}/fights`);
        if (!response.ok) throw new Error('Failed to fetch fighter history');

        const data = await response.json();
        setFights(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFighterHistory();
  }, [fighterId]);

  if (isLoading) {
    return <LoadingState text="Loading fight history..." />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={() => setIsLoading(true)} />;
  }

  if (fights.length === 0) {
    return (
      <Card className="bg-black/70 border-red-500/30">
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <p className="text-muted-foreground">No fight history available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {fights.map((fight) => {
        const isFighterRedCorner = fight.redCornerId === fighterId;
        const opponent = isFighterRedCorner ? fight.blueCorner : fight.redCorner;
        const isWinner = fight.result?.winnerId === fighterId;
        const isLoser = fight.result?.winnerId && fight.result.winnerId !== fighterId;

        return (
          <Card key={fight.id} className="bg-black/70 border-red-500/30 overflow-hidden">
            <div className={`h-1 w-full ${isWinner ? 'bg-green-500' : isLoser ? 'bg-red-500' : 'bg-gray-500'}`} />
            <CardContent className="pt-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">
                    vs. {opponent?.name || 'Unknown Opponent'}
                  </h3>
                  <div className="flex items-center mt-1 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(fight.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
                  {fight.isTitleFight && (
                    <Badge className="bg-yellow-500 text-black">
                      <Trophy className="w-3 h-3 mr-1" /> Title Fight
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-red-400 border-red-500/30">
                    {fight.weightClass}
                  </Badge>
                  {fight.isMainEvent && (
                    <Badge variant="outline" className="text-red-400 border-red-500/30">
                      Main Event
                    </Badge>
                  )}
                </div>
              </div>

              {fight.result && (
                <div className="mt-4 pt-4 border-t border-red-500/10">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <Badge className={`${isWinner ? 'bg-green-600' : isLoser ? 'bg-red-600' : 'bg-gray-600'}`}>
                        {isWinner ? 'Win' : isLoser ? 'Loss' : 'Draw/NC'}
                      </Badge>
                      {fight.result.method && (
                        <span className="ml-2 text-sm">
                          via {fight.result.method}
                        </span>
                      )}
                    </div>

                    {(fight.result.round || fight.result.time) && (
                      <div className="flex items-center mt-2 md:mt-0 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 mr-1" />
                        {fight.result.round && `Round ${fight.result.round}`}
                        {fight.result.round && fight.result.time && ' - '}
                        {fight.result.time}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
