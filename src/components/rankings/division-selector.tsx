"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  fetchAllDivisions, 
  getAllChampions, 
  getFightersByDivision,
  getAllFighters,
  RankedFighter 
} from "@/lib/ufc-fighters";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Trophy, Users, ChevronRight, Female, Male } from "lucide-react";

interface Division {
  name: string;
  champion?: RankedFighter;
  fighterCount: number;
  isWomens: boolean;
}

interface DivisionSelectorProps {
  onSelectDivision?: (division: string) => void;
  className?: string;
}

export const DivisionSelector = ({ onSelectDivision, className }: DivisionSelectorProps) => {
  const [divisions, setDivisions] = useState<Division[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDivisions = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Get all available divisions
        const divisionNames = await fetchAllDivisions();
        
        // Filter out pound-for-pound divisions
        const weightDivisions = divisionNames.filter(
          div => !div.includes("Pound-for-Pound")
        );
        
        // Get all champions
        const champions = await getAllChampions();
        
        // Create division objects with champion and fighter count
        const divisionData: Division[] = await Promise.all(
          weightDivisions.map(async (name) => {
            // Find champion for this division
            const champion = champions.find(c => c.division === name);
            
            // Get fighters for this division to count them
            const fighters = await getFightersByDivision(name);
            
            return {
              name,
              champion,
              fighterCount: fighters.length,
              isWomens: name.includes("Women")
            };
          })
        );
        
        // Sort divisions: Men's divisions first (by weight), then Women's divisions
        const sortedDivisions = divisionData.sort((a, b) => {
          // First separate men's and women's divisions
          if (a.isWomens !== b.isWomens) {
            return a.isWomens ? 1 : -1;
          }
          
          // Weight class ordering (approximate)
          const weightOrder: Record<string, number> = {
            "Flyweight": 1,
            "Bantamweight": 2,
            "Featherweight": 3,
            "Lightweight": 4,
            "Welterweight": 5,
            "Middleweight": 6,
            "Light Heavyweight": 7,
            "Heavyweight": 8,
            "Strawweight": 0
          };
          
          // Extract base weight class name (remove "Women's " prefix)
          const aWeight = a.name.replace("Women's ", "");
          const bWeight = b.name.replace("Women's ", "");
          
          return (weightOrder[aWeight] || 99) - (weightOrder[bWeight] || 99);
        });
        
        setDivisions(sortedDivisions);
      } catch (err) {
        console.error("Error loading divisions:", err);
        setError("Failed to load divisions");
      } finally {
        setIsLoading(false);
      }
    };

    loadDivisions();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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

  // Handle division selection
  const handleDivisionClick = (division: string) => {
    if (onSelectDivision) {
      onSelectDivision(division);
    }
  };

  // Render loading skeletons
  if (isLoading) {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
        {Array(8).fill(0).map((_, index) => (
          <Card key={index} className="overflow-hidden border border-red-500/30 bg-black/70">
            <div className="p-4">
              <Skeleton className="w-1/2 h-6 mb-3 bg-red-950/20" />
              <div className="flex items-center mb-4">
                <Skeleton className="w-12 h-12 rounded-full mr-3 bg-red-950/20" />
                <div className="space-y-2">
                  <Skeleton className="w-24 h-4 bg-red-950/20" />
                  <Skeleton className="w-16 h-3 bg-red-950/20" />
                </div>
              </div>
              <Skeleton className="w-full h-4 mb-2 bg-red-950/20" />
              <Skeleton className="w-3/4 h-4 bg-red-950/20" />
            </div>
            <div className="p-4 border-t border-red-500/20">
              <Skeleton className="w-full h-9 bg-red-950/20" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className={`p-8 text-center border border-red-500/30 rounded-lg bg-black/70 ${className}`}>
        <p className="text-red-500 text-lg mb-3">{error}</p>
        <Button 
          variant="destructive" 
          onClick={() => window.location.reload()}
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <motion.div 
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {divisions.map((division) => (
        <motion.div key={division.name} variants={itemVariants}>
          <Card className="overflow-hidden border border-red-500/30 bg-black/70 backdrop-blur-lg hover:bg-black/80 transition-colors h-full flex flex-col">
            <CardContent className="p-4 flex-grow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">{division.name}</h3>
                {division.isWomens ? (
                  <Badge variant="outline" className="bg-pink-950/30 text-pink-400 border-pink-500/30">
                    <Female className="w-3 h-3 mr-1" /> Women's
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-blue-950/30 text-blue-400 border-blue-500/30">
                    <Male className="w-3 h-3 mr-1" /> Men's
                  </Badge>
                )}
              </div>
              
              {division.champion ? (
                <div className="flex items-center mb-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-yellow-500 mr-3">
                    {division.champion.imageUrl ? (
                      <Image
                        src={division.champion.imageUrl}
                        alt={division.champion.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-red-800 to-black">
                        <span className="text-xl font-bold text-yellow-500">
                          {division.champion.firstName?.[0] || division.champion.name[0]}
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center">
                      <Trophy className="w-3 h-3 text-yellow-500 mr-1" />
                      <span className="text-yellow-500 text-sm font-medium">Champion</span>
                    </div>
                    <h4 className="text-white font-medium mt-1">{division.champion.name}</h4>
                  </div>
                </div>
              ) : (
                <div className="flex items-center mb-4 opacity-70">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center mr-3">
                    <Trophy className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <div className="text-gray-500 text-sm">No champion</div>
                    <div className="text-gray-400 mt-1">Vacant title</div>
                  </div>
                </div>
              )}
              
              <div className="flex items-center text-gray-400 text-sm">
                <Users className="w-4 h-4 mr-2" />
                <span>{division.fighterCount} ranked fighters</span>
              </div>
            </CardContent>
            
            <CardFooter className="p-4 pt-0 mt-auto">
              <Button
                className="w-full bg-gradient-to-r from-red-700 to-red-900 hover:from-red-600 hover:to-red-800 text-white border-none"
                onClick={() => handleDivisionClick(division.name)}
                asChild
              >
                <Link href={`/rankings/${encodeURIComponent(division.name)}`}>
                  View Rankings
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
      
      {/* P4P Rankings Cards */}
      <motion.div variants={itemVariants}>
        <Card className="overflow-hidden border border-red-500/30 bg-black/70 backdrop-blur-lg hover:bg-black/80 transition-colors h-full flex flex-col">
          <CardContent className="p-4 flex-grow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Men's Pound-for-Pound</h3>
              <Badge variant="outline" className="bg-purple-950/30 text-purple-400 border-purple-500/30">
                P4P
              </Badge>
            </div>
            
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-800 to-black flex items-center justify-center mr-3">
                <Trophy className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <div className="text-purple-400 text-sm">Best of the best</div>
                <div className="text-white mt-1">Top 15 male fighters</div>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="p-4 pt-0 mt-auto">
            <Button
              className="w-full bg-gradient-to-r from-purple-700 to-purple-900 hover:from-purple-600 hover:to-purple-800 text-white border-none"
              onClick={() => handleDivisionClick("Men's Pound-for-Pound")}
              asChild
            >
              <Link href="/rankings/pound-for-pound-men">
                View P4P Rankings
                <ChevronRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Card className="overflow-hidden border border-red-500/30 bg-black/70 backdrop-blur-lg hover:bg-black/80 transition-colors h-full flex flex-col">
          <CardContent className="p-4 flex-grow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Women's Pound-for-Pound</h3>
              <Badge variant="outline" className="bg-pink-950/30 text-pink-400 border-pink-500/30">
                P4P
              </Badge>
            </div>
            
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-800 to-black flex items-center justify-center mr-3">
                <Trophy className="w-6 h-6 text-pink-500" />
              </div>
              <div>
                <div className="text-pink-400 text-sm">Best of the best</div>
                <div className="text-white mt-1">Top 15 female fighters</div>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="p-4 pt-0 mt-auto">
            <Button
              className="w-full bg-gradient-to-r from-pink-700 to-pink-900 hover:from-pink-600 hover:to-pink-800 text-white border-none"
              onClick={() => handleDivisionClick("Women's Pound-for-Pound")}
              asChild
            >
              <Link href="/rankings/pound-for-pound-women">
                View P4P Rankings
                <ChevronRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default DivisionSelector;
