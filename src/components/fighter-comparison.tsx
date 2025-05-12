import React from 'react';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dumbbell, Target, Shield, Swords } from 'lucide-react';

interface FighterStats {
  strikingAccuracy: number;
  takedownAccuracy: number;
  strikesLandedPerMin: number;
  strikesAbsorbedPerMin: number;
  takedownAvg: number;
  submissionAvg: number;
  knockoutPercentage: number;
  winPercentage: number;
}

interface Fighter {
  id: string;
  name: string;
  nickname?: string;
  image: string;
  country: string;
  age: number;
  height: string;
  weight: string;
  reach: string;
  stance: string;
  record: string;
  division: string;
  ranking: number;
  isChampion: boolean;
  stats: FighterStats;
}

interface FighterComparisonProps {
  fighters: Fighter[];
}

export const FighterComparison: React.FC<FighterComparisonProps> = ({ fighters }) => {
  if (fighters.length !== 2) {
    return <div className="text-red-500">Error: FighterComparison requires exactly 2 fighters</div>;
  }

  const [fighter1, fighter2] = fighters;

  // Helper function to determine which value is better
  const getBetterValue = (value1: number, value2: number, higherIsBetter = true) => {
    if (value1 === value2) return 'equal';
    return higherIsBetter ? (value1 > value2 ? 'fighter1' : 'fighter2') : (value1 < value2 ? 'fighter1' : 'fighter2');
  };

  // Calculate advantage for each stat
  const advantages = {
    strikingAccuracy: getBetterValue(fighter1.stats.strikingAccuracy, fighter2.stats.strikingAccuracy),
    takedownAccuracy: getBetterValue(fighter1.stats.takedownAccuracy, fighter2.stats.takedownAccuracy),
    strikesLandedPerMin: getBetterValue(fighter1.stats.strikesLandedPerMin, fighter2.stats.strikesLandedPerMin),
    strikesAbsorbedPerMin: getBetterValue(fighter1.stats.strikesAbsorbedPerMin, fighter2.stats.strikesAbsorbedPerMin, false),
    takedownAvg: getBetterValue(fighter1.stats.takedownAvg, fighter2.stats.takedownAvg),
    submissionAvg: getBetterValue(fighter1.stats.submissionAvg, fighter2.stats.submissionAvg),
    knockoutPercentage: getBetterValue(fighter1.stats.knockoutPercentage, fighter2.stats.knockoutPercentage),
    winPercentage: getBetterValue(fighter1.stats.winPercentage, fighter2.stats.winPercentage),
  };

  return (
    <div className="bg-black/30 border border-red-500/20 rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-red-900/50 to-black/50 p-3 flex justify-between items-center">
        <h3 className="text-white font-bold flex items-center">
          <Swords className="h-4 w-4 mr-2 text-red-500" />
          Fighter Comparison
        </h3>
        <Badge variant="outline" className="bg-black/50 text-gray-300 border-red-500/30">
          {fighter1.division}
        </Badge>
      </div>

      <div className="p-4">
        {/* Fighter Headers */}
        <div className="flex justify-between mb-6">
          <div className="text-center flex-1">
            <div className="relative w-32 h-32 mx-auto mb-2">
              <Image
                src={fighter1.image}
                alt={fighter1.name}
                fill
                className="object-contain"
              />
              {fighter1.isChampion && (
                <div className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
                  <span className="text-xs font-bold">C</span>
                </div>
              )}
            </div>
            <h3 className="font-bold text-lg text-white">
              {fighter1.name}
            </h3>
            {fighter1.nickname && (
              <p className="text-red-400 text-sm">"{fighter1.nickname}"</p>
            )}
            <p className="text-gray-400 text-sm">{fighter1.record}</p>
            <p className="text-gray-400 text-xs mt-1">{fighter1.country}</p>
          </div>

          <div className="text-center flex-1">
            <div className="relative w-32 h-32 mx-auto mb-2">
              <Image
                src={fighter2.image}
                alt={fighter2.name}
                fill
                className="object-contain"
              />
              {fighter2.isChampion && (
                <div className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
                  <span className="text-xs font-bold">C</span>
                </div>
              )}
            </div>
            <h3 className="font-bold text-lg text-white">
              {fighter2.name}
            </h3>
            {fighter2.nickname && (
              <p className="text-red-400 text-sm">"{fighter2.nickname}"</p>
            )}
            <p className="text-gray-400 text-sm">{fighter2.record}</p>
            <p className="text-gray-400 text-xs mt-1">{fighter2.country}</p>
          </div>
        </div>

        {/* Physical Attributes */}
        <div className="mb-6">
          <h4 className="font-bold text-white mb-3 flex items-center">
            <Dumbbell className="h-4 w-4 mr-2 text-red-500" />
            Physical Attributes
          </h4>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-black/50 p-3 rounded-lg border border-red-500/10">
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center">
                  <p className="text-xs text-gray-400">Age</p>
                  <p className="text-sm text-white">{fighter1.age}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-400">Height</p>
                  <p className="text-sm text-white">{fighter1.height}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-400">Weight</p>
                  <p className="text-sm text-white">{fighter1.weight}</p>
                </div>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <div className="text-center">
                  <p className="text-xs text-gray-400">Reach</p>
                  <p className="text-sm text-white">{fighter1.reach}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-400">Stance</p>
                  <p className="text-sm text-white">{fighter1.stance}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-black/50 p-3 rounded-lg border border-red-500/10">
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center">
                  <p className="text-xs text-gray-400">Age</p>
                  <p className="text-sm text-white">{fighter2.age}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-400">Height</p>
                  <p className="text-sm text-white">{fighter2.height}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-400">Weight</p>
                  <p className="text-sm text-white">{fighter2.weight}</p>
                </div>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <div className="text-center">
                  <p className="text-xs text-gray-400">Reach</p>
                  <p className="text-sm text-white">{fighter2.reach}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-400">Stance</p>
                  <p className="text-sm text-white">{fighter2.stance}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Striking Stats */}
        <div className="mb-6">
          <h4 className="font-bold text-white mb-3 flex items-center">
            <Target className="h-4 w-4 mr-2 text-red-500" />
            Striking Statistics
          </h4>
          
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2 items-center">
              <div className="text-right">
                <p className={`text-sm font-medium ${advantages.strikingAccuracy === 'fighter1' ? 'text-red-400' : 'text-white'}`}>
                  {fighter1.stats.strikingAccuracy}%
                </p>
              </div>
              <div className="text-center text-xs text-gray-400">
                Striking Accuracy
              </div>
              <div className="text-left">
                <p className={`text-sm font-medium ${advantages.strikingAccuracy === 'fighter2' ? 'text-red-400' : 'text-white'}`}>
                  {fighter2.stats.strikingAccuracy}%
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-2 items-center">
              <div className="text-right">
                <p className={`text-sm font-medium ${advantages.strikesLandedPerMin === 'fighter1' ? 'text-red-400' : 'text-white'}`}>
                  {fighter1.stats.strikesLandedPerMin}
                </p>
              </div>
              <div className="text-center text-xs text-gray-400">
                Strikes Landed/Min
              </div>
              <div className="text-left">
                <p className={`text-sm font-medium ${advantages.strikesLandedPerMin === 'fighter2' ? 'text-red-400' : 'text-white'}`}>
                  {fighter2.stats.strikesLandedPerMin}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-2 items-center">
              <div className="text-right">
                <p className={`text-sm font-medium ${advantages.strikesAbsorbedPerMin === 'fighter1' ? 'text-red-400' : 'text-white'}`}>
                  {fighter1.stats.strikesAbsorbedPerMin}
                </p>
              </div>
              <div className="text-center text-xs text-gray-400">
                Strikes Absorbed/Min
              </div>
              <div className="text-left">
                <p className={`text-sm font-medium ${advantages.strikesAbsorbedPerMin === 'fighter2' ? 'text-red-400' : 'text-white'}`}>
                  {fighter2.stats.strikesAbsorbedPerMin}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-2 items-center">
              <div className="text-right">
                <p className={`text-sm font-medium ${advantages.knockoutPercentage === 'fighter1' ? 'text-red-400' : 'text-white'}`}>
                  {fighter1.stats.knockoutPercentage}%
                </p>
              </div>
              <div className="text-center text-xs text-gray-400">
                KO Percentage
              </div>
              <div className="text-left">
                <p className={`text-sm font-medium ${advantages.knockoutPercentage === 'fighter2' ? 'text-red-400' : 'text-white'}`}>
                  {fighter2.stats.knockoutPercentage}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Grappling Stats */}
        <div className="mb-6">
          <h4 className="font-bold text-white mb-3 flex items-center">
            <Shield className="h-4 w-4 mr-2 text-red-500" />
            Grappling Statistics
          </h4>
          
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2 items-center">
              <div className="text-right">
                <p className={`text-sm font-medium ${advantages.takedownAccuracy === 'fighter1' ? 'text-red-400' : 'text-white'}`}>
                  {fighter1.stats.takedownAccuracy}%
                </p>
              </div>
              <div className="text-center text-xs text-gray-400">
                Takedown Accuracy
              </div>
              <div className="text-left">
                <p className={`text-sm font-medium ${advantages.takedownAccuracy === 'fighter2' ? 'text-red-400' : 'text-white'}`}>
                  {fighter2.stats.takedownAccuracy}%
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-2 items-center">
              <div className="text-right">
                <p className={`text-sm font-medium ${advantages.takedownAvg === 'fighter1' ? 'text-red-400' : 'text-white'}`}>
                  {fighter1.stats.takedownAvg}
                </p>
              </div>
              <div className="text-center text-xs text-gray-400">
                Takedowns/15 Min
              </div>
              <div className="text-left">
                <p className={`text-sm font-medium ${advantages.takedownAvg === 'fighter2' ? 'text-red-400' : 'text-white'}`}>
                  {fighter2.stats.takedownAvg}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-2 items-center">
              <div className="text-right">
                <p className={`text-sm font-medium ${advantages.submissionAvg === 'fighter1' ? 'text-red-400' : 'text-white'}`}>
                  {fighter1.stats.submissionAvg}
                </p>
              </div>
              <div className="text-center text-xs text-gray-400">
                Submission Attempts/15 Min
              </div>
              <div className="text-left">
                <p className={`text-sm font-medium ${advantages.submissionAvg === 'fighter2' ? 'text-red-400' : 'text-white'}`}>
                  {fighter2.stats.submissionAvg}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-center">
          <Button className="bg-red-600 hover:bg-red-700 text-white">
            View Full Matchup Analysis
          </Button>
        </div>
      </div>
    </div>
  );
};
