"use client";

import { useFighters } from "@/hooks";
import { useEffect, useState } from "react";
import { FighterCard } from "./fighter-card";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { UFC_WEIGHT_DIVISIONS } from "@/constants";
import LoadingIcon from "../ui/loading-icon";
import { useDebounce } from "@uidotdev/usehooks";

interface FighterGridProps {
  initialDivision?: string;
  favorites?: {
    id: string;
    fighterId: string;
  }[];
}

export const FighterGrid = ({ initialDivision, favorites }: FighterGridProps) => {
  const [division, setDivision] = useState<string | undefined>(initialDivision);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);

  const { fighters, isLoading, error } = useFighters({ division });

  const [filteredFighters, setFilteredFighters] = useState(fighters);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (fighters) {
      setIsSearching(true);
      const query = (debouncedSearchQuery || "").toLowerCase();
      setFilteredFighters(
        fighters.filter(fighter =>
          fighter.name.toLowerCase().includes(query) ||
          fighter.nickname?.toLowerCase().includes(query)
        )
      );
      setIsSearching(false);
    }
  }, [fighters, debouncedSearchQuery]);

  const handleDivisionChange = (value: string) => {
    setDivision(value === "all" ? undefined : value);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative w-full">
          <Input
            placeholder="Search fighters..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-black/50 border-red-500/30 text-white pl-10 w-full"
            aria-label="Search fighters"
            type="search"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          {searchQuery && (
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>

        <Select
          value={division || "all"}
          onValueChange={handleDivisionChange}
        >
          <SelectTrigger className="w-full md:w-[200px] bg-black/50 border-red-500/30 text-white">
            <SelectValue placeholder="Select division" />
          </SelectTrigger>
          <SelectContent className="bg-black border border-red-500/30">
            <SelectItem value="all">All Divisions</SelectItem>
            {UFC_WEIGHT_DIVISIONS.map((div) => (
              <SelectItem key={div.id} value={div.id}>
                {div.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isLoading || isSearching ? (
        <div className="flex items-center justify-center h-64">
          <LoadingIcon size="lg" />
          {isSearching && <p className="ml-3 text-gray-400">Searching...</p>}
        </div>
      ) : error ? (
        <div className="text-center text-red-500 p-8">
          <p>Error loading fighters: {error}</p>
        </div>
      ) : filteredFighters.length === 0 ? (
        <div className="text-center text-gray-400 p-8">
          <p>No fighters found. Try adjusting your search or filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {filteredFighters.map((fighter) => {
            const recordParts = (fighter.record || "0-0-0").split('-').map(p => Number.parseInt(p, 10) || 0);
            const firstName = fighter.name.split(' ')[0] || null;
            const lastName = fighter.name.split(' ').slice(1).join(' ') || "";

            return (
              <FighterCard
                key={fighter.id}
                fighter={{
                  FighterId: Number.parseInt(fighter.id, 10),
                  FirstName: firstName,
                  LastName: lastName,
                  Nickname: fighter.nickname || null,
                  WeightClass: fighter.division,
                  Wins: recordParts[0],
                  Losses: recordParts[1],
                  Draws: recordParts[2],
                  BirthDate: null,
                  Height: null,
                  Weight: null,
                  Reach: null,
                  NoContests: null,
                  TechnicalKnockouts: null,
                  TechnicalKnockoutLosses: null,
                  Submissions: null,
                  SubmissionLosses: null,
                  TitleWins: fighter.isChampion ? 1 : 0,
                  TitleLosses: null,
                  TitleDraws: null,
                  CareerStats: null
                }}
                favoriteId={favorites?.find(fav => fav.fighterId === fighter.id)?.id}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
