"use client";

import { useFights } from "@/hooks";
import { useEffect, useState } from "react";
import { FightCard } from "./fight-card";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { CalendarRange, Filter, Search, SlidersHorizontal } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

interface FightGridProps {
  eventId?: string;
  upcoming?: boolean;
  completed?: boolean;
  limit?: number;
  showFilters?: boolean;
}

const FightGrid = ({
  eventId,
  upcoming = false,
  completed = false,
  limit,
  showFilters = true,
}: FightGridProps) => {
  const [weightClass, setWeightClass] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showOnlyMainEvents, setShowOnlyMainEvents] = useState<boolean>(false);
  const [showOnlyTitleFights, setShowOnlyTitleFights] = useState<boolean>(false);
  
  const { fights, isLoading, error } = useFights({
    eventId,
    upcoming,
    completed,
  });
  
  const [filteredFights, setFilteredFights] = useState(fights);
  
  useEffect(() => {
    if (fights) {
      let filtered = [...fights];
      
      // Filter by weight class
      if (weightClass) {
        filtered = filtered.filter(fight => 
          fight.weightClass.toLowerCase() === weightClass.toLowerCase()
        );
      }
      
      // Filter by search query (fighter names)
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(fight => 
          fight.redCorner.name.toLowerCase().includes(query) || 
          fight.blueCorner.name.toLowerCase().includes(query)
        );
      }
      
      // Filter by main events
      if (showOnlyMainEvents) {
        filtered = filtered.filter(fight => fight.isMainEvent);
      }
      
      // Filter by title fights
      if (showOnlyTitleFights) {
        filtered = filtered.filter(fight => fight.isTitleFight);
      }
      
      // Apply limit if provided
      if (limit && filtered.length > limit) {
        filtered = filtered.slice(0, limit);
      }
      
      setFilteredFights(filtered);
    }
  }, [fights, weightClass, searchQuery, showOnlyMainEvents, showOnlyTitleFights, limit]);
  
  const weightClasses = [
    "Flyweight",
    "Bantamweight",
    "Featherweight",
    "Lightweight",
    "Welterweight",
    "Middleweight",
    "Light Heavyweight",
    "Heavyweight",
    "Women's Strawweight",
    "Women's Flyweight",
    "Women's Bantamweight",
    "Women's Featherweight",
  ];
  
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton 
            key={index} 
            className="w-full h-[400px] rounded-xl bg-black/40 border border-red-500/20"
          />
        ))}
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-400">Error loading fights: {error}</p>
      </div>
    );
  }
  
  if (fights.length === 0) {
    return (
      <div className="text-center py-10">
        <CalendarRange className="w-12 h-12 text-red-500/50 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">No Fights Found</h3>
        <p className="text-gray-400">
          {upcoming ? "There are no upcoming fights scheduled at this time." : 
           completed ? "No completed fights match your criteria." : 
           "No fights match your search criteria."}
        </p>
      </div>
    );
  }
  
  return (
    <div className="w-full">
      {showFilters && (
        <div className="mb-6 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search fighters..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-black/50 border-red-500/30 text-white"
                icon={<Search className="w-4 h-4 text-red-400" />}
              />
            </div>
            <div className="w-full md:w-64">
              <Select value={weightClass} onValueChange={setWeightClass}>
                <SelectTrigger className="bg-black/50 border-red-500/30 text-white">
                  <SelectValue placeholder="Weight Class" />
                </SelectTrigger>
                <SelectContent className="bg-black border-red-500/30">
                  <SelectItem value="">All Weight Classes</SelectItem>
                  {weightClasses.map((wc) => (
                    <SelectItem key={wc} value={wc}>
                      {wc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button
              variant={showOnlyMainEvents ? "default" : "outline"}
              size="sm"
              onClick={() => setShowOnlyMainEvents(!showOnlyMainEvents)}
              className={showOnlyMainEvents 
                ? "bg-red-600 hover:bg-red-700 text-white" 
                : "border-red-500/30 text-gray-300 hover:text-white hover:bg-red-950/30"
              }
            >
              <Filter className="w-4 h-4 mr-2" />
              Main Events
            </Button>
            <Button
              variant={showOnlyTitleFights ? "default" : "outline"}
              size="sm"
              onClick={() => setShowOnlyTitleFights(!showOnlyTitleFights)}
              className={showOnlyTitleFights 
                ? "bg-red-600 hover:bg-red-700 text-white" 
                : "border-red-500/30 text-gray-300 hover:text-white hover:bg-red-950/30"
              }
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Title Fights
            </Button>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFights.map((fight) => (
          <FightCard
            key={fight.id}
            id={fight.id}
            eventId={fight.eventId}
            redCorner={fight.redCorner}
            blueCorner={fight.blueCorner}
            weightClass={fight.weightClass}
            rounds={fight.rounds}
            isMainEvent={fight.isMainEvent}
            isTitleFight={fight.isTitleFight}
            status={fight.status}
            event={fight.event}
          />
        ))}
      </div>
      
      {filteredFights.length === 0 && (
        <div className="text-center py-10">
          <Search className="w-12 h-12 text-red-500/50 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No Matches Found</h3>
          <p className="text-gray-400">
            Try adjusting your search criteria or filters.
          </p>
        </div>
      )}
    </div>
  );
};

export { FightGrid };
