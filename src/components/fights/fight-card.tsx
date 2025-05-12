"use client";

import { cn } from "@/functions";
import { CalendarRange, Clock, Swords, Trophy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";
import { format } from "date-fns";
import { motion } from "framer-motion";

interface Fighter {
  id: string;
  name: string;
  nickname?: string;
  record: string;
  imageUrl?: string;
  isChampion: boolean;
}

interface Event {
  id: string;
  name: string;
  date: string;
  location?: string;
  venue?: string;
}

interface FightCardProps {
  id: string;
  eventId: string;
  redCorner: Fighter;
  blueCorner: Fighter;
  weightClass: string;
  rounds: number;
  isMainEvent: boolean;
  isTitleFight: boolean;
  status: string;
  event?: Event;
  className?: string;
  compact?: boolean;
}

const FightCard = ({
  id,
  eventId,
  redCorner,
  blueCorner,
  weightClass,
  rounds,
  isMainEvent,
  isTitleFight,
  status,
  event,
  className,
  compact = false,
}: FightCardProps) => {
  const formattedDate = event?.date ? format(new Date(event.date), "MMM d, yyyy") : null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("w-full", className)}
    >
      <Card className="overflow-hidden border border-red-500/30 bg-black/70 backdrop-blur-sm">
        {!compact && (
          <CardHeader className="p-3 bg-gradient-to-r from-red-950/50 to-black/50 border-b border-red-500/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CalendarRange className="w-4 h-4 text-red-400" />
                <span className="text-sm font-medium text-gray-200">
                  {event?.name || "UFC Event"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {formattedDate && (
                  <span className="text-xs text-gray-300">
                    {formattedDate}
                  </span>
                )}
                {status === "scheduled" && (
                  <Badge variant="outline" className="text-xs bg-green-950/30 text-green-400 border-green-500/30">
                    Upcoming
                  </Badge>
                )}
                {status === "completed" && (
                  <Badge variant="outline" className="text-xs bg-blue-950/30 text-blue-400 border-blue-500/30">
                    Completed
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
        )}
        
        <CardContent className={cn(
          "p-4",
          compact ? "pt-3" : "pt-4"
        )}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Red Corner Fighter */}
            <div className="flex flex-col items-center text-center w-full md:w-2/5">
              <div className="relative w-24 h-24 md:w-32 md:h-32 mb-2 rounded-full overflow-hidden bg-gradient-to-br from-red-950 to-red-900 border-2 border-red-500/50">
                {redCorner.imageUrl ? (
                  <Image
                    src={redCorner.imageUrl}
                    alt={redCorner.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-red-300">
                    No Image
                  </div>
                )}
                {redCorner.isChampion && (
                  <div className="absolute -top-1 -right-1 bg-yellow-500 rounded-full p-1">
                    <Trophy className="w-4 h-4 text-black" />
                  </div>
                )}
              </div>
              <h3 className="text-lg font-bold text-white">
                {redCorner.name}
              </h3>
              {redCorner.nickname && (
                <p className="text-sm text-gray-400 italic">
                  &quot;{redCorner.nickname}&quot;
                </p>
              )}
              <p className="text-sm text-gray-300 mt-1">
                {redCorner.record}
              </p>
            </div>
            
            {/* Fight Info */}
            <div className="flex flex-col items-center justify-center w-full md:w-1/5">
              <div className="bg-gradient-to-b from-red-950/50 to-black/50 p-3 rounded-lg border border-red-500/30 flex flex-col items-center">
                <Swords className="w-6 h-6 text-red-400 mb-2" />
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-200">
                    {weightClass}
                  </p>
                  <div className="flex items-center gap-1 mt-1 justify-center">
                    <Clock className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-400">
                      {rounds} Rounds
                    </span>
                  </div>
                  {isTitleFight && (
                    <Badge className="mt-2 bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                      Title Fight
                    </Badge>
                  )}
                  {isMainEvent && !isTitleFight && (
                    <Badge className="mt-2 bg-red-500/20 text-red-300 border-red-500/30">
                      Main Event
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            
            {/* Blue Corner Fighter */}
            <div className="flex flex-col items-center text-center w-full md:w-2/5">
              <div className="relative w-24 h-24 md:w-32 md:h-32 mb-2 rounded-full overflow-hidden bg-gradient-to-br from-blue-950 to-blue-900 border-2 border-blue-500/50">
                {blueCorner.imageUrl ? (
                  <Image
                    src={blueCorner.imageUrl}
                    alt={blueCorner.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-blue-300">
                    No Image
                  </div>
                )}
                {blueCorner.isChampion && (
                  <div className="absolute -top-1 -right-1 bg-yellow-500 rounded-full p-1">
                    <Trophy className="w-4 h-4 text-black" />
                  </div>
                )}
              </div>
              <h3 className="text-lg font-bold text-white">
                {blueCorner.name}
              </h3>
              {blueCorner.nickname && (
                <p className="text-sm text-gray-400 italic">
                  &quot;{blueCorner.nickname}&quot;
                </p>
              )}
              <p className="text-sm text-gray-300 mt-1">
                {blueCorner.record}
              </p>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="p-3 bg-gradient-to-r from-black/50 to-red-950/50 border-t border-red-500/30 flex justify-center">
          <Button
            asChild
            variant="outline"
            className="border-red-500/50 hover:bg-red-500/10 text-red-400 hover:text-red-300"
          >
            <Link href={`/fights/${id}`}>
              View Fight Details
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export { FightCard };
export type { FightCardProps };
