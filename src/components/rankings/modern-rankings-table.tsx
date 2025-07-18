"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { RankedFighter } from "@/lib/ufc-fighters";
import { fetchFightersByDivision } from "@/lib/ufc-fighters";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUp, ArrowDown, Trophy, Medal, Star } from "lucide-react";
import { motion } from "framer-motion";

interface ModernRankingsTableProps {
  division: string;
  className?: string;
}

export const ModernRankingsTable = ({ division, className }: ModernRankingsTableProps) => {
  const [fighters, setFighters] = useState<RankedFighter[]>([]);
  const [champion, setChampion] = useState<RankedFighter | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFighters = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const divisionFighters = await fetchFightersByDivision(division);
        
        // Separate champion from ranked fighters
        const champ = divisionFighters.find(f => f.isChampion);
        const rankedFighters = divisionFighters.filter(f => !f.isChampion);
        
        setChampion(champ || null);
        setFighters(rankedFighters);
      } catch (err) {
        setError("Failed to load rankings");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadFighters();
  }, [division]);

  // Animation variants for Framer Motion
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

  // Function to render rank change indicator
  const renderRankChange = (fighter: RankedFighter) => {
    if (fighter.isNewlyRanked) {
      return (
        <Badge variant="outline" className="bg-blue-950/30 text-blue-400 border-blue-500/30 ml-2">
          NR
        </Badge>
      );
    }
    
    if (!fighter.rankChange) return null;
    
    if (fighter.rankChange > 0) {
      return (
        <span className="inline-flex items-center text-green-500 ml-2">
          <ArrowUp className="w-3 h-3 mr-1" />
          {fighter.rankChange}
        </span>
      );
    }
    
    if (fighter.rankChange < 0) {
      return (
        <span className="inline-flex items-center text-red-500 ml-2">
          <ArrowDown className="w-3 h-3 mr-1" />
          {Math.abs(fighter.rankChange)}
        </span>
      );
    }
    
    return null;
  };

  // Function to render fighter image with fallback
  const renderFighterImage = (fighter: RankedFighter) => {
    return (
      <div className="relative w-12 h-12 rounded-full overflow-hidden bg-black/40 border border-red-500/30 mr-3 flex-shrink-0">
        {fighter.imageUrl ? (
          <Image
            src={fighter.imageUrl}
            alt={fighter.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-red-950 to-black">
            <span className="text-lg font-bold text-red-500">
              {fighter.firstName?.[0] || fighter.name[0]}
            </span>
          </div>
        )}
      </div>
    );
  };

  // Loading state
  if (isLoading) {
    return (
      <Card className={`border border-red-500/20 bg-black/80 ${className}`}>
        <CardHeader className="border-b border-red-500/20 bg-gradient-to-r from-red-950/40 to-black/90">
          <CardTitle className="text-xl md:text-2xl text-white flex items-center">
            <Skeleton className="h-8 w-40 bg-red-950/30" />
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="p-4">
            <Skeleton className="h-24 w-full bg-red-950/20 mb-4" />
          </div>
          <Table>
            <TableHeader>
              <TableRow className="border-b border-red-500/20 bg-gradient-to-r from-red-950/30 to-black/90">
                <TableHead className="w-[80px] text-gray-400">Rank</TableHead>
                <TableHead className="text-gray-400">Fighter</TableHead>
                <TableHead className="text-gray-400 hidden md:table-cell">Record</TableHead>
                <TableHead className="text-right text-gray-400">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array(10).fill(0).map((_, i) => (
                <TableRow key={i} className="border-b border-red-500/10">
                  <TableCell>
                    <Skeleton className="h-6 w-6 bg-red-950/20" />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Skeleton className="h-10 w-10 rounded-full bg-red-950/20 mr-3" />
                      <Skeleton className="h-6 w-40 bg-red-950/20" />
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Skeleton className="h-6 w-20 bg-red-950/20" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-6 w-16 bg-red-950/20 ml-auto" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }

  // Error state
  if (error) {
    return (
      <Card className={`border border-red-500/20 bg-black/80 ${className}`}>
        <CardHeader className="border-b border-red-500/20 bg-gradient-to-r from-red-950/40 to-black/90">
          <CardTitle className="text-xl md:text-2xl text-white">
            {division} Rankings
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center text-red-500 py-8">
            <p>{error}</p>
            <button 
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`border border-red-500/20 bg-black/80 backdrop-blur-sm ${className}`}>
      <CardHeader className="border-b border-red-500/20 bg-gradient-to-r from-red-950/40 to-black/90">
        <CardTitle className="text-xl md:text-2xl text-white flex items-center">
          <Trophy className="w-5 h-5 mr-2 text-red-500" /> {division} Rankings
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {/* Champion Section */}
        {champion && (
          <motion.div 
            className="p-4 md:p-6 border-b border-red-500/20 bg-gradient-to-r from-red-950/30 to-black/90"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="relative flex-shrink-0">
                <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-yellow-500 shadow-lg shadow-yellow-500/20">
                  {champion.imageUrl ? (
                    <Image
                      src={champion.imageUrl}
                      alt={champion.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-red-800 to-black">
                      <span className="text-2xl font-bold text-yellow-500">
                        {champion.firstName?.[0] || champion.name[0]}
                      </span>
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-2 -right-2 bg-yellow-500 text-black p-1 rounded-full">
                  <Trophy className="w-4 h-4" />
                </div>
              </div>
              
              <div className="flex-grow">
                <div className="flex items-center">
                  <h3 className="text-xl md:text-2xl font-bold text-white">
                    {champion.name}
                  </h3>
                  <Badge className="ml-2 bg-yellow-500 text-black border-none">
                    Champion
                  </Badge>
                </div>
                
                {champion.nickname && (
                  <p className="text-yellow-400 text-sm md:text-base mt-1 flex items-center">
                    <Star className="w-3 h-3 mr-1" />
                    "{champion.nickname}"
                  </p>
                )}
                
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm md:text-base">
                  <Link 
                    href={champion.profileUrl} 
                    target="_blank" 
                    className="text-red-400 hover:text-red-300 transition-colors underline-offset-4 hover:underline"
                  >
                    Official Profile
                  </Link>
                </div>
              </div>
              
              <Link 
                href={`/fighters/${champion.id}`}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors text-sm md:text-base flex-shrink-0"
              >
                View Details
              </Link>
            </div>
          </motion.div>
        )}
        
        {/* Rankings Table */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Table>
            <TableHeader>
              <TableRow className="border-b border-red-500/20 bg-gradient-to-r from-red-950/30 to-black/90">
                <TableHead className="w-[80px] text-gray-200 font-bold">Rank</TableHead>
                <TableHead className="text-gray-200 font-bold">Fighter</TableHead>
                <TableHead className="text-gray-200 font-bold hidden md:table-cell">Record</TableHead>
                <TableHead className="text-right text-gray-200 font-bold">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fighters.map((fighter) => (
                <motion.tr
                  key={fighter.id}
                  variants={itemVariants}
                  className="border-b border-red-500/10 hover:bg-red-950/20 transition-colors"
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-red-800 to-black text-white">
                      {fighter.rank}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Link href={`/fighters/${fighter.id}`} className="flex items-center group">
                      {renderFighterImage(fighter)}
                      <div>
                        <div className="font-medium text-white group-hover:text-red-400 transition-colors">
                          {fighter.name}
                          {renderRankChange(fighter)}
                        </div>
                        {fighter.nickname && (
                          <div className="text-xs text-gray-400 mt-1">
                            "{fighter.nickname}"
                          </div>
                        )}
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Link 
                      href={fighter.profileUrl} 
                      target="_blank"
                      className="text-gray-400 hover:text-red-400 transition-colors text-sm"
                    >
                      Official UFC Profile
                    </Link>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link 
                      href={`/fighters/${fighter.id}`}
                      className="inline-flex items-center justify-center px-3 py-1 rounded bg-red-950/30 hover:bg-red-900/50 text-red-400 hover:text-red-300 text-sm transition-all"
                    >
                      View
                    </Link>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </motion.div>
        
        {fighters.length === 0 && !champion && (
          <div className="p-8 text-center text-gray-400">
            <p>No fighters found in this division.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ModernRankingsTable;
