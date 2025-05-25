'use client';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { BarChart3, Calendar, Flag, Ruler, Scale, Trophy, User } from 'lucide-react';

import { getFighters, getUpcomingFights } from '@/lib/api/ufc';
import type { Fighter } from '@/types/mma';
import type { Fight } from '@/contexts/ufc-context';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Container } from '@/components';
import { LoadingState, ErrorState } from '@/components/ui/loading-state';
import { useUFC } from '@/contexts/ufc-context';
import { useParams, useRouter } from 'next/navigation';
import { FighterPredictionForm } from '@/components/fighters/fighter-prediction-form';
import { FighterStats } from '@/components/fighters/fighter-stats';
import { FighterFightHistory } from '@/components/fighters/fighter-fight-history';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { PaginationNav } from '@/components/ui/pagination-nav';

// Types
type PageProps = {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

// Generate static params for static generation
export async function generateStaticParams() {
  // In a real app, you might fetch all fighter IDs here
  // For now, we'll rely on on-demand generation
  return [];
}

// Get navigation fighters (previous/next in the same division)
function getNavigationFighters(fighters: Fighter[], currentFighter: Fighter) {
  const divisionFighters = fighters
    .filter((f: Fighter) => f.division === currentFighter.division)
    .sort((a: Fighter, b: Fighter) => (a.ranking || 0) - (b.ranking || 0) || a.name.localeCompare(b.name));

  const currentIndex = divisionFighters.findIndex((f: Fighter) => f.id === currentFighter.id);

  return {
    prev: divisionFighters[currentIndex - 1] || null,
    next: divisionFighters[currentIndex + 1] || null,
  };
}

// Format record string
const formatRecord = (wins: number, losses: number, draws: number): string => {
  return `${wins}-${losses}${draws > 0 ? `-${draws}` : ''}`;
};

// Format height from inches to feet and inches
const formatHeight = (heightInInches: number | null): string => {
  if (!heightInInches) return 'N/A';
  const feet = Math.floor(heightInInches / 12);
  const inches = heightInInches % 12;
  return `${feet}'${inches}"`;
};

// Format weight from pounds to weight class
const formatWeight = (weightInPounds: number | null): string => {
  if (!weightInPounds) return 'N/A';
  return `${weightInPounds} lbs`;
};

export default function FighterDetailPage({ params }: PageProps) {
  const router = useRouter();
  const fighterId = params.id as string; // Type assertion for TypeScript

  // Handle case where fighterId is an array (shouldn't happen with proper routing)
  const normalizedFighterId = Array.isArray(fighterId) ? fighterId[0] : fighterId;

  const {
    fighters,
    loadingFighters,
    errorFighters,
    refreshFighters,
    upcomingFights,
    loadingFights,
    errorFights
  } = useUFC();

  const [fighter, setFighter] = useState<Fighter | null>(null);
  const [upcomingFight, setUpcomingFight] = useState<Fight | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [prevFighter, setPrevFighter] = useState<Fighter | null>(null);
  const [nextFighter, setNextFighter] = useState<Fighter | null>(null);

  useEffect(() => {
    if (!loadingFighters && fighters.length > 0) {
      const foundFighter = fighters.find(f => f.id.toString() === normalizedFighterId);

      // If fighter not found, redirect to 404 or fighters list
      if (!foundFighter) {
        router.replace('/fighters');
        return;
      }

      if (foundFighter) {
        setFighter(foundFighter);

        // Find previous and next fighters in the same division for navigation
        const divisionFighters = fighters
          .filter(f => f.division === foundFighter.division)
          .sort((a, b) => {
            // Sort by ranking if available, otherwise by name
            if (a.ranking && b.ranking) return a.ranking - b.ranking;
            if (a.ranking) return -1;
            if (b.ranking) return 1;
            return a.name.localeCompare(b.name);
          });

        const currentIndex = divisionFighters.findIndex(f => f.id.toString() === fighterId);

        if (currentIndex > 0) {
          setPrevFighter(divisionFighters[currentIndex - 1] || null);
        }

        if (currentIndex < divisionFighters.length - 1) {
          setNextFighter(divisionFighters[currentIndex + 1] || null);
        }
      } else {
        setError('Fighter not found');
      }
    }

    if (errorFighters) {
      setError(errorFighters);
    }

    if (!loadingFighters && !loadingFights) {
      setIsLoading(false);
    }
  }, [fighterId, fighters, loadingFighters, errorFighters, loadingFights, normalizedFighterId, router]);

  useEffect(() => {
    if (!loadingFights && upcomingFights.length > 0 && fighter) {
      // Find if this fighter has an upcoming fight
      const nextFight = upcomingFights.find(
 fight => fight.redCornerId.toString() === fighter.id.toString() ||
 fight.blueCornerId.toString() === fighter.id.toString()
      );

      if (nextFight) {
        setUpcomingFight(nextFight);
      }
    }
  }, [fighter, upcomingFights, loadingFights]);

  if (isLoading) {
    return <LoadingState text="Loading fighter details..." fullPage />;
  }

  if (error) {
    return <ErrorState error={error} fullPage onRetry={refreshFighters} />;
  }

  if (!fighter) {
    return <ErrorState error="Fighter not found" fullPage />;
  }

  return (
    <Container className="py-8">
      {/* Breadcrumb navigation */}
      <div className="mb-6">
        <Breadcrumb
          items={[
            { label: "Fighters", href: "/fighters" },
            { label: fighter.division, href: `/fighters?division=${fighter.division.toLowerCase().replace(/\s+/g, '-')}` },
            { label: fighter.name }
          ]}
        />
      </div>

      {/* Previous/Next fighter navigation */}
      <div className="mb-6">
        <PaginationNav
          previous={prevFighter ? {
            href: `/fighters/${prevFighter.id}`,
            label: "Fighter",
            title: prevFighter.name
          } : undefined}
          next={nextFighter ? {
            href: `/fighters/${nextFighter.id}`,
            label: "Fighter",
            title: nextFighter.name
          } : undefined}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Fighter Profile Card */}
        <Card className="lg:col-span-1 bg-black/70 border-red-500/30">
          <CardHeader className="relative pb-0">
            {fighter.isChampion && (
              <div className="absolute top-2 right-2">
                <Badge className="bg-yellow-500 text-black font-bold">
                  <Trophy className="w-3 h-3 mr-1" /> Champion
                </Badge>
              </div>
            )}
            <div className="flex flex-col items-center">
              <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-red-500/30 mb-4">
                {fighter.imageUrl ? (
                  <Image
                    src={fighter.imageUrl}
                    alt={fighter.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                    <User className="w-24 h-24 text-gray-600" />
                  </div>
                )}
              </div>
              <CardTitle className="text-2xl font-bold text-center">{fighter.name}</CardTitle>
              {fighter.nickname && (
                <CardDescription className="text-center mt-1">&ldquo;{fighter.nickname}&rdquo;</CardDescription>
              )}
              <div className="flex items-center justify-center mt-2 space-x-2">
                <Badge variant="outline" className="text-red-400 border-red-500/30">
                  {fighter.division}
                </Badge>
                {fighter.ranking && (
                  <Badge variant="outline" className="text-red-400 border-red-500/30">
                    Rank #{fighter.ranking}
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-500">{fighter.wins}</p>
                <p className="text-xs text-muted-foreground">Wins</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-red-500">{fighter.losses}</p>
                <p className="text-xs text-muted-foreground">Losses</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-500">{fighter.draws}</p>
                <p className="text-xs text-muted-foreground">Draws</p>
              </div>
            </div>

            <div className="space-y-3">
              {fighter.country && (
                <div className="flex items-center">
                  <Flag className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span>{fighter.country}</span>
                </div>
              )}
              {fighter.age && (
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span>{fighter.age} years old</span>
                </div>
              )}
              {fighter.height && (
                <div className="flex items-center">
                  <Ruler className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span>Height: {fighter.height}</span>
                </div>
              )}
              {fighter.weight && (
                <div className="flex items-center">
                  <Scale className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span>Weight: {fighter.weight}</span>
                </div>
              )}
              {fighter.reach && (
                <div className="flex items-center">
                  <BarChart3 className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span>Reach: {fighter.reach}</span>
                </div>
              )}
            </div>

            {upcomingFight && (
              <div className="mt-6 p-4 bg-red-950/20 rounded-lg">
                <h3 className="font-semibold mb-2">Upcoming Fight</h3>
                <p className="text-sm text-muted-foreground mb-1">
                  {new Date(upcomingFight.date).toLocaleDateString('en-US', {
 year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <p className="text-sm mb-3">
                  vs. {
 upcomingFight.redCornerId.toString() === fighter.id.toString()
 ? upcomingFight.blueCorner?.name || 'Opponent'
                      : upcomingFight.redCorner?.name || 'Opponent'
                  }
                </p>
                <Button variant="outline" className="w-full text-red-400 border-red-500/30 hover:bg-red-950/30">
                  View Fight Details
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Fighter Details Tabs */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="stats" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="stats">Stats</TabsTrigger>
              <TabsTrigger value="history">Fight History</TabsTrigger>
              <TabsTrigger value="predict">Make Prediction</TabsTrigger>
            </TabsList>

            <TabsContent value="stats" className="mt-4">
              <FighterStats fighter={fighter} />
            </TabsContent>

            <TabsContent value="history" className="mt-4">
 <FighterFightHistory fighterId={fighterId as string} />
            </TabsContent>

            <TabsContent value="predict" className="mt-4">
              <FighterPredictionForm fighter={fighter} upcomingFight={upcomingFight} />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-black/70 border-red-500/30 hover:border-red-500/50 transition-colors">
          <CardHeader>
            <CardTitle className="text-lg">Compare Fighters</CardTitle>
            <CardDescription>
              See how {fighter.name} stacks up against other fighters
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full bg-red-600 hover:bg-red-700 text-white">
              <Link href={`/compare?fighter1=${fighter.id}`}>
                Compare {fighter.name} with Others
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-black/70 border-red-500/30 hover:border-red-500/50 transition-colors">
          <CardHeader>
            <CardTitle className="text-lg">Explore {fighter.division}</CardTitle>
            <CardDescription>
              View all fighters in the {fighter.division} division
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full bg-red-600 hover:bg-red-700 text-white">
              <Link href={`/fighters?division=${fighter.division.toLowerCase().replace(/\s+/g, '-')}`}>
                Browse {fighter.division} Division
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Previous/Next fighter navigation (bottom) */}
      <div className="mt-8">
        <PaginationNav
          previous={prevFighter ? {
            href: `/fighters/${prevFighter.id}`,
            label: "Fighter",
            title: prevFighter.name
          } : undefined}
          next={nextFighter ? {
            href: `/fighters/${nextFighter.id}`,
            label: "Fighter",
            title: nextFighter.name
          } : undefined}
        />
      </div>
    </Container>
  );
};

