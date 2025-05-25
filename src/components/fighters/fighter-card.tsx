
"use client";

import { useFavorites } from "@/hooks";
import { Heart, Star, Trophy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import LoadingIcon from "../ui/loading-icon";
import { toast } from "sonner";
import type { Fighter } from "@/types/mma";
import { Badge } from "../ui/badge";
import { cn } from "@/functions";

interface FighterCardProps {
  fighter: Fighter;
  className?: string;
  favoriteId?: string;
}

export const FighterCard = ({
  fighter,
  className,
  favoriteId,
}: FighterCardProps) => {
  const { addFavorite, removeFavorite, isLoading } = useFavorites();
  const [isFavorite, setIsFavorite] = useState<boolean>(!!favoriteId);
  const [localFavoriteId, setLocalFavoriteId] = useState<string | undefined>(favoriteId);

  const handleFavoriteToggle = async () => {
    if (isLoading) return;

    if (isFavorite && localFavoriteId) {
      const success = await removeFavorite(localFavoriteId);
      if (success) {
        setIsFavorite(false);
        setLocalFavoriteId(undefined);
        toast.success(`${fighter.firstName} ${fighter.lastName} removed from favorites`);
      } else {
        toast.error("Failed to remove from favorites");
      }
    } else {
      const result = await addFavorite(fighter.FighterId.toString());
      if (result) {
        setIsFavorite(true);
        // Note: In a real app, we would get the new favorite ID from the result
        // For simplicity, we're just setting it to true here
        setLocalFavoriteId("temp-id");
        toast.success(`${fighter.firstName} ${fighter.lastName} added to favorites`);
      } else {
        toast.error("Failed to add to favorites");
      }
    }
  };

  const { FirstName, LastName, Nickname, WeightClass, Wins, Losses, Draws } = fighter;

  const displayName = Nickname ? `${FirstName} "${Nickname}" ${LastName}` : `${FirstName} ${LastName}`;

  return (
    <Card
      className={cn(
        "overflow-hidden border border-red-500/30 bg-black/70 backdrop-blur-lg hover:bg-black/80 transition-colors active:scale-[0.98] touch-action-manipulation",
        className
      )}
    >
      <CardHeader className="p-0 relative">
        <div className="relative w-full h-48 bg-gradient-to-b from-red-950/50 to-black/90">
          {fighter.Height ? (
            <Image
              src={`/images/fighters/${fighter.FighterId}.jpg`}
              alt={`${fighter.FirstName} ${fighter.LastName}`}
              fill
              className="object-contain object-center"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-red-500">{fighter.FirstName?.charAt(0)}</span>
            </div>
          )}

          {fighter.TitleWins && fighter.TitleWins > 0 && (
            <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded-md flex items-center gap-1 text-xs font-medium">
              <Trophy className="w-3 h-3" />
              Champion
            </div>
          )}

          {fighter.Wins && fighter.Wins > 0 && !(fighter.TitleWins && fighter.TitleWins > 0) && (
            <div className="absolute top-2 left-2">
              <Badge variant="outline" className="bg-black/80 text-red-400 border-red-500/30">
                Wins: {fighter.Wins}
              </Badge>
            </div>
          )}

          <Button
            size="icon"
            variant="ghost"
            className="absolute top-2 right-2 text-white hover:bg-red-950/50 hover:text-red-400 touch-action-manipulation"
            onClick={handleFavoriteToggle}
            disabled={isLoading}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`} />
            {isLoading && <span className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full"><LoadingIcon size="sm" /></span>}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <Link href={`/fighters/${fighter.FighterId}`} className="block">
          <h3 className="text-lg font-bold text-white truncate">{displayName || "Unnamed Fighter"}</h3>

          {fighter.Nickname && (
            <p className="text-sm text-red-400 flex items-center gap-1 mt-1">
              <Star className="w-3 h-3" />
              &ldquo;{fighter.Nickname}&rdquo;
            </p>
          )}

          <div className="mt-3 space-y-1">
            <p className="text-sm text-gray-300">
              <span className="text-gray-500">Division:</span> {WeightClass || "N/A"}
            </p>
            <p className="text-sm text-gray-300">
              <span className="text-gray-500">Record:</span> {Wins ?? 0} - {Losses ?? 0} - {Draws ?? 0}
            </p>
            {fighter.BirthDate && (
              <p className="text-sm text-gray-300">
                <span className="text-gray-500">Country:</span> {fighter.BirthDate}
              </p>
            )}
          </div>
        </Link>

        {fighter.CareerStats && (
          <div className="mt-3 border-t border-gray-700 pt-3">
            <h3 className="mb-2 text-sm font-semibold text-gray-200 md:text-base">Key Stats</h3>
            <ul className="space-y-1 text-xs text-gray-400 md:text-sm">
              <li className="flex justify-between">
                <span>Sig. Str/Min:</span>
                <span className="font-medium text-gray-300">{fighter.CareerStats.SigStrikesLandedPerMinute?.toFixed(2) ?? "N/A"}</span>
              </li>
              <li className="flex justify-between">
                <span>TD Avg (15m):</span>
                <span className="font-medium text-gray-300">{fighter.CareerStats.TakedownAverage?.toFixed(2) ?? "N/A"}</span>
              </li>
              <li className="flex justify-between">
                <span>KO %:</span>
                <span className="font-medium text-gray-300">{fighter.CareerStats.KnockoutPercentage?.toFixed(1) ?? "N/A"}%</span>
              </li>
              {fighter.CareerStats.SigStrikeAccuracy !== undefined && fighter.CareerStats.SigStrikeAccuracy !== null && (
                <li className="flex justify-between">
                  <span>Sig. Str. Acc:</span>
                  <span className="font-medium text-gray-300">{fighter.CareerStats.SigStrikeAccuracy?.toFixed(1)}%</span>
                </li>
              )}
            </ul>
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button
          size="sm"
          variant="outline"
          className="w-full border-red-500/50 hover:bg-red-500/10 text-red-400 hover:text-red-300"
          asChild
        >
          <Link href={`/fighters/${fighter.FighterId}`}>
            View Profile
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
