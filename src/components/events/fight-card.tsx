"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, ChevronDown, ChevronUp, Clock } from "lucide-react";
import { cn } from "@/functions";
import type { Fight } from "@/contexts/ufc-context";
import { FightPredictionForm } from "./fight-prediction-form";

interface FightCardProps {
  fight: Fight;
  isPast?: boolean;
  className?: string;
}

export const FightCard = ({ fight, isPast = false, className }: FightCardProps) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const redCorner = fight.redCorner;
  const blueCorner = fight.blueCorner;

  // Determine winner if fight is completed
  const hasResult = fight.status === 'completed' && fight.result?.winnerId;
  const redCornerWon = hasResult && fight.result?.winnerId === redCorner?.id;
  const blueCornerWon = hasResult && fight.result?.winnerId === blueCorner?.id;

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-300 bg-black/70 border-red-500/30",
        className
      )}
    >
      <CardContent className="p-0">
        {/* Fight header with weight class and badges */}
        <div className="bg-red-950/30 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-medium">{fight.weightClass}</span>
            {fight.isMainEvent && (
              <Badge className="bg-red-600 text-white">
                Main Event
              </Badge>
            )}
            {fight.isTitleFight && (
              <Badge className="bg-yellow-500 text-black">
                <Trophy className="w-3 h-3 mr-1" /> Title Fight
              </Badge>
            )}
          </div>
          <div className="text-sm text-muted-foreground">
            {fight.rounds} Rounds
          </div>
        </div>

        {/* Fighters */}
        <div className="p-4 grid grid-cols-1 md:grid-cols-7 gap-4">
          {/* Red Corner */}
          <div className={cn(
            "md:col-span-3 flex items-center space-x-3",
            redCornerWon && "opacity-100",
            blueCornerWon && "opacity-70"
          )}>
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-red-500">
              {redCorner?.imageUrl ? (
                <Image
                  src={redCorner.imageUrl}
                  alt={redCorner.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                  <span className="text-lg font-bold text-red-500">
                    {redCorner?.name?.charAt(0) || '?'}
                  </span>
                </div>
              )}
            </div>
            <div>
              <Link href={redCorner ? `/fighters/${redCorner.id}` : '#'} className="hover:underline">
                <h3 className="font-bold">{redCorner?.name || 'TBA'}</h3>
              </Link>
              {redCorner && (
                <p className="text-sm text-muted-foreground">{redCorner.record}</p>
              )}
              {redCornerWon && (
                <Badge variant="outline" className="mt-1 bg-green-950/30 text-green-400 border-green-500/30">
                  Winner
                </Badge>
              )}
            </div>
          </div>

          {/* VS */}
          <div className="md:col-span-1 flex items-center justify-center">
            <div className="text-lg font-bold text-red-500">VS</div>
          </div>

          {/* Blue Corner */}
          <div className={cn(
            "md:col-span-3 flex items-center space-x-3",
            blueCornerWon && "opacity-100",
            redCornerWon && "opacity-70"
          )}>
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500">
              {blueCorner?.imageUrl ? (
                <Image
                  src={blueCorner.imageUrl}
                  alt={blueCorner.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                  <span className="text-lg font-bold text-blue-500">
                    {blueCorner?.name?.charAt(0) || '?'}
                  </span>
                </div>
              )}
            </div>
            <div>
              <Link href={blueCorner ? `/fighters/${blueCorner.id}` : '#'} className="hover:underline">
                <h3 className="font-bold">{blueCorner?.name || 'TBA'}</h3>
              </Link>
              {blueCorner && (
                <p className="text-sm text-muted-foreground">{blueCorner.record}</p>
              )}
              {blueCornerWon && (
                <Badge variant="outline" className="mt-1 bg-green-950/30 text-green-400 border-green-500/30">
                  Winner
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Fight result (if completed) */}
        {fight.status === 'completed' && fight.result && (
          <div className="px-4 py-3 border-t border-red-500/10 bg-gray-950/30">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm text-muted-foreground mr-2">Result:</span>
                <span className="font-medium">
                  {fight.result.method}
                  {fight.result.round && `, Round ${fight.result.round}`}
                  {fight.result.time && ` (${fight.result.time})`}
                </span>
              </div>
              {(fight.result.round || fight.result.time) && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 mr-1" />
                  {fight.result.round && `R${fight.result.round}`}
                  {fight.result.time && ` ${fight.result.time}`}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Expand/collapse button */}
        <div className="px-4 py-2 border-t border-red-500/10 flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
            onClick={toggleExpanded}
          >
            {expanded ? (
              <>
                <ChevronUp className="w-4 h-4 mr-1" />
                Hide Details
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 mr-1" />
                {isPast ? 'Show Details' : 'Make Prediction'}
              </>
            )}
          </Button>
        </div>

        {/* Expanded content */}
        {expanded && (
          <div className="px-4 py-4 border-t border-red-500/10">
            {isPast ? (
              <div className="space-y-4">
                <h3 className="font-semibold">Fight Details</h3>
                {/* Add fight details here */}
                <p className="text-muted-foreground">
                  Detailed fight statistics and analysis will be available here.
                </p>
              </div>
            ) : (
              <FightPredictionForm fight={fight} />
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
