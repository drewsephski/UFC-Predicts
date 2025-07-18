"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  fetchAllFighters, 
  fetchFightersByDivision, 
  fetchAvailableDivisions,
  RankedFighter 
} from "@/lib/ufc-fighters";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUp, ArrowDown, Trophy, Search, X, Star, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDebounce } from "@uidotdev/usehooks";

interface ModernFighterGridProps {
  initialDivision?: string;
  favorites?: {
    id: string;
    fighterId: string;
  }[];
  onToggleFavorite?: (fighterId: string, isFavorite: boolean) => Promise<boolean>;
}

export const ModernFighterGrid = ({ 
  initialDivision, 
  favorites = [],
  onToggleFavorite
}: ModernFighterGridProps) => {
  // State variables
  const [fighters, setFighters] = useState<RankedFighter[]>([]);
  const [divisions, setDivisions] = useState<string[]>([]);
  const [selectedDivision, setSelectedDivision] = useState<string | undefined>(initialDivision);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites2, setFavorites] = useState<Record<string, boolean>>(
    favorites.reduce((acc, fav) => ({ ...acc, [fav.fighterId]: true }), {})
  );

  // Load available divisions
  useEffect(() => {
    const loadDivisions = async () => {
      try {
        const availableDivisions = await fetchAvailableDivisions();
        setDivisions(availableDivisions);
      } catch (err) {
        console.error("Failed to load divisions:", err);
      }
    };

    loadDivisions();
  }, []);

  // Load fighters based on selected division
  useEffect(() => {
    const loadFighters = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        let fighterData: RankedFighter[];
        
        if (selectedDivision) {
          fighterData = await fetchFightersByDivision(selectedDivision);
        } else {
          fighterData = await fetchAllFighters();
        }
        
        setFighters(fighterData);
      } catch (err) {
        setError("Failed to load fighters");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadFighters();
  }, [selectedDivision]);

  // Filter fighters based on search query
  const filteredFighters = useMemo(() => {
    if (!debouncedSearchQuery.trim()) return fighters;
    
    const query = debouncedSearchQuery.toLowerCase();
    return fighters.filter(fighter => 
      fighter.name.toLowerCase().includes(query) ||
      fighter.firstName?.toLowerCase().includes(query) ||
      fighter.lastName?.toLowerCase().includes(query) ||
      fighter.nickname?.toLowerCase().includes(query) ||
      fighter.division.toLowerCase().includes(query)
    );
  }, [fighters, debouncedSearchQuery]);

  // Handle division change
  const handleDivisionChange = (value: string) => {
    setSelectedDivision(value === "all" ? undefined : value);
  };

  // Handle favorite toggle
  const handleToggleFavorite = async (fighterId: string) => {
    if (!onToggleFavorite) return;
    
    const currentIsFavorite = favorites2[fighterId] || false;
    const success = await onToggleFavorite(fighterId, !currentIsFavorite);
    
    if (success) {
      setFavorites(prev => ({
        ...prev,
        [fighterId]: !currentIsFavorite
      }));
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  // Render fighter card
  const renderFighterCard = (fighter: RankedFighter) => {
    const isFavorite = favorites2[fighter.id] || false;
    
    return (
      <motion.div
        key={fighter.id}
        variants={itemVariants}
        layout
      >
        <Card className="overflow-hidden border border-red-500/30 bg-black/70 backdrop-blur-lg hover:bg-black/80 transition-colors h-full flex flex-col">
          <CardHeader className="p-0 relative">
            <div className="relative w-full h-48 bg-gradient-to-b from-red-950/50 to-black/90">
              {fighter.imageUrl ? (
                <Image
                  src={fighter.imageUrl}
                  alt={fighter.name}
                  fill
                  className="object-contain object-center"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-red-500">
                    {fighter.firstName?.[0] || fighter.name[0]}
                  </span>
                </div>
              )}

              {/* Championship badge */}
              {fighter.isChampion && (
                <div className="absolute top-2 left-2 bg-yellow-600 text-white px-2 py-1 rounded-md flex items-center gap-1 text-xs font-medium">
                  <Trophy className="w-3 h-3" />
                  Champion
                </div>
              )}

              {/* Rank badge */}
              {!fighter.isChampion && fighter.rank > 0 && (
                <div className="absolute top-2 left-2">
                  <Badge variant="outline" className="bg-black/80 text-red-400 border-red-500/30">
                    Rank: #{fighter.rank}
                    {fighter.rankChange && fighter.rankChange > 0 && (
                      <span className="ml-1 text-green-500">
                        <ArrowUp className="inline w-3 h-3" />
                        {fighter.rankChange}
                      </span>
                    )}
                    {fighter.rankChange && fighter.rankChange < 0 && (
                      <span className="ml-1 text-red-500">
                        <ArrowDown className="inline w-3 h-3" />
                        {Math.abs(fighter.rankChange)}
                      </span>
                    )}
                    {fighter.isNewlyRanked && (
                      <span className="ml-1 text-blue-400">NR</span>
                    )}
                  </Badge>
                </div>
              )}

              {/* Favorite button */}
              {onToggleFavorite && (
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-2 right-2 text-white hover:bg-red-950/50 hover:text-red-400"
                  onClick={() => handleToggleFavorite(fighter.id)}
                  aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                </Button>
              )}
            </div>
          </CardHeader>

          <CardContent className="p-4 flex-grow">
            <Link href={`/fighters/${fighter.id}`} className="block">
              <h3 className="text-lg font-bold text-white truncate">{fighter.name}</h3>

              {fighter.nickname && (
                <p className="text-sm text-red-400 flex items-center gap-1 mt-1">
                  <Star className="w-3 h-3" />
                  &ldquo;{fighter.nickname}&rdquo;
                </p>
              )}

              <div className="mt-3 space-y-1">
                <p className="text-sm text-gray-300">
                  <span className="text-gray-500">Division:</span> {fighter.division}
                </p>
                {fighter.profileUrl && (
                  <a 
                    href={fighter.profileUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-sm text-red-400 hover:text-red-300 transition-colors"
                  >
                    Official UFC Profile
                  </a>
                )}
              </div>
            </Link>
          </CardContent>

          <CardFooter className="p-4 pt-0 mt-auto">
            <Button
              size="sm"
              variant="outline"
              className="w-full border-red-500/50 hover:bg-red-500/10 text-red-400 hover:text-red-300"
              asChild
            >
              <Link href={`/fighters/${fighter.id}`}>
                View Profile
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    );
  };

  // Render loading skeletons
  const renderSkeletons = () => {
    return Array(12).fill(0).map((_, index) => (
      <div key={index} className="h-[400px]">
        <Card className="overflow-hidden border border-red-500/30 bg-black/70 h-full">
          <CardHeader className="p-0">
            <Skeleton className="w-full h-48 bg-red-950/20" />
          </CardHeader>
          <CardContent className="p-4">
            <Skeleton className="w-3/4 h-6 mb-2 bg-red-950/20" />
            <Skeleton className="w-1/2 h-4 mb-4 bg-red-950/20" />
            <Skeleton className="w-full h-4 mb-2 bg-red-950/20" />
            <Skeleton className="w-2/3 h-4 bg-red-950/20" />
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Skeleton className="w-full h-9 bg-red-950/20" />
          </CardFooter>
        </Card>
      </div>
    ));
  };

  return (
    <div className="w-full">
      {/* Search and filter controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative w-full">
          <Input
            placeholder="Search fighters by name, nickname, or division..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-black/50 border-red-500/30 text-white pl-10 w-full"
            aria-label="Search fighters"
            type="search"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Search className="w-4 h-4" />
          </div>
          {searchQuery && (
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <Select
          value={selectedDivision || "all"}
          onValueChange={handleDivisionChange}
        >
          <SelectTrigger className="w-full md:w-[250px] bg-black/50 border-red-500/30 text-white">
            <SelectValue placeholder="Select division" />
          </SelectTrigger>
          <SelectContent className="bg-black border border-red-500/30">
            <SelectItem value="all">All Divisions</SelectItem>
            {divisions.map((div) => (
              <SelectItem key={div} value={div}>
                {div}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Results count */}
      {!isLoading && !error && (
        <div className="mb-4 text-gray-400">
          Showing {filteredFighters.length} {filteredFighters.length === 1 ? 'fighter' : 'fighters'}
          {selectedDivision && ` in ${selectedDivision}`}
          {debouncedSearchQuery && ` matching "${debouncedSearchQuery}"`}
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="text-center text-red-500 p-8 border border-red-500/30 rounded-md bg-red-950/20 mb-6">
          <p className="text-lg font-semibold mb-2">Error loading fighters</p>
          <p>{error}</p>
          <Button 
            variant="destructive" 
            className="mt-4"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      )}

      {/* Fighter grid */}
      <AnimatePresence mode="wait">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {renderSkeletons()}
          </div>
        ) : filteredFighters.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center text-gray-400 p-8 border border-red-500/30 rounded-md bg-black/50"
          >
            <p className="text-lg mb-2">No fighters found</p>
            <p>Try adjusting your search or filter criteria</p>
          </motion.div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredFighters.map(renderFighterCard)}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ModernFighterGrid;
