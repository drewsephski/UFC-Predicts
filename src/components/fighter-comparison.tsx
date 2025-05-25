import type React from "react";
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dumbbell, Target, Shield, Swords } from 'lucide-react';
import type { Fighter, CareerStats } from '@/types/mma'; // Import types from mma.ts
import { calculateAge } from "@/functions/date-helpers"; // Assuming a helper function exists or needs to be created
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';

interface FighterComparisonProps {
  fighters: Fighter[];
}

export const FighterComparison: React.FC<FighterComparisonProps> = ({ fighters }) => {
  // Ensure exactly 2 fighters are provided before proceeding
  if (!fighters || fighters.length !== 2) {
    return (
      <div className="text-red-500 text-center p-4">
        Please select exactly 2 fighters to compare.
      </div>
    );
  }

  const [fighter1, fighter2] = fighters as [Fighter, Fighter]; // Type assertion after length check

  // Add weight class check
  if (fighter1.WeightClass !== fighter2.WeightClass) {
    return (
      <div className="text-yellow-500 text-center p-4">
        Fighters are in different weight classes ({fighter1.WeightClass} vs {fighter2.WeightClass}). Comparison stats may not be directly comparable.
      </div>
    );
  }

  // Helper function to determine which value is better (handles null/undefined stats)
  const getBetterValue = (value1?: number | null, value2?: number | null, higherIsBetter = true) => {
    if (value1 == null && value2 == null) return 'equal';
    if (value1 == null) return higherIsBetter ? 'fighter2' : 'fighter1';
    if (value2 == null) return higherIsBetter ? 'fighter1' : 'fighter2';

    if (value1 === value2) return 'equal';
    return higherIsBetter ? (value1 > value2 ? 'fighter1' : 'fighter2') : (value1 < value2 ? 'fighter1' : 'fighter2');
  };

   // Helper function to calculate win percentage
   const calculateWinPercentage = (wins?: number | null, losses?: number | null, draws?: number | null) => {
    const totalFights = (wins || 0) + (losses || 0) + (draws || 0);
    if (totalFights === 0) return null;
    return ((wins || 0) / totalFights);
  };

  // Calculate advantage for each stat using CareerStats
  const advantages = {
    sigStrikesLandedPerMinute: getBetterValue(fighter1.CareerStats?.SigStrikesLandedPerMinute, fighter2.CareerStats?.SigStrikesLandedPerMinute),
    sigStrikeAccuracy: getBetterValue(fighter1.CareerStats?.SigStrikeAccuracy, fighter2.CareerStats?.SigStrikeAccuracy),
    takedownAverage: getBetterValue(fighter1.CareerStats?.TakedownAverage, fighter2.CareerStats?.TakedownAverage),
    submissionAverage: getBetterValue(fighter1.CareerStats?.SubmissionAverage, fighter2.CareerStats?.SubmissionAverage),
    knockoutPercentage: getBetterValue(fighter1.CareerStats?.KnockoutPercentage, fighter2.CareerStats?.KnockoutPercentage),
    strikesAbsorbedPerMin: getBetterValue(fighter1.CareerStats?.CareerSapm, fighter2.CareerStats?.CareerSapm, false), // Lower is better for absorbed strikes
    technicalKnockoutPercentage: getBetterValue(fighter1.CareerStats?.TechnicalKnockoutPercentage, fighter2.CareerStats?.TechnicalKnockoutPercentage),
    decisionPercentage: getBetterValue(fighter1.CareerStats?.DecisionPercentage, fighter2.CareerStats?.DecisionPercentage),
    winPercentage: getBetterValue(calculateWinPercentage(fighter1.Wins, fighter1.Losses, fighter1.Draws), calculateWinPercentage(fighter2.Wins, fighter2.Losses, fighter2.Draws)),
    takedownDefense: getBetterValue(fighter1.CareerStats?.TakedownDefense, fighter2.CareerStats?.TakedownDefense),
    strikingDefense: getBetterValue(fighter1.CareerStats?.StrikingDefense, fighter2.CareerStats?.StrikingDefense),
  };

  // Calculate age
  const fighter1Age = fighter1.BirthDate ? calculateAge(fighter1.BirthDate) : 'N/A';
  const fighter2Age = fighter2.BirthDate ? calculateAge(fighter2.BirthDate) : 'N/A';

  // Prepare data for charts
  const strikingChartData = [
    { name: 'Striking Accuracy', [fighter1.LastName || 'Fighter 1']: fighter1.CareerStats?.SigStrikeAccuracy ? fighter1.CareerStats.SigStrikeAccuracy * 100 : 0, [fighter2.LastName || 'Fighter 2']: fighter2.CareerStats?.SigStrikeAccuracy ? fighter2.CareerStats.SigStrikeAccuracy * 100 : 0 },
    { name: 'Strikes Landed/Min', [fighter1.LastName || 'Fighter 1']: fighter1.CareerStats?.SigStrikesLandedPerMinute || 0, [fighter2.LastName || 'Fighter 2']: fighter2.CareerStats?.SigStrikesLandedPerMinute || 0 },
    { name: 'Strikes Absorbed/Min', [fighter1.LastName || 'Fighter 1']: fighter1.CareerStats?.CareerSapm || 0, [fighter2.LastName || 'Fighter 2']: fighter2.CareerStats?.CareerSapm || 0 },
    { name: 'Striking Defense', [fighter1.LastName || 'Fighter 1']: fighter1.CareerStats?.StrikingDefense ? fighter1.CareerStats.StrikingDefense * 100 : 0, [fighter2.LastName || 'Fighter 2']: fighter2.CareerStats?.StrikingDefense ? fighter2.CareerStats.StrikingDefense * 100 : 0 },
    { name: 'KO Percentage', [fighter1.LastName || 'Fighter 1']: fighter1.CareerStats?.KnockoutPercentage ? fighter1.CareerStats.KnockoutPercentage * 100 : 0, [fighter2.LastName || 'Fighter 2']: fighter2.CareerStats?.KnockoutPercentage ? fighter2.CareerStats.KnockoutPercentage * 100 : 0 },
    { name: 'TKO Percentage', [fighter1.LastName || 'Fighter 1']: fighter1.CareerStats?.TechnicalKnockoutPercentage ? fighter1.CareerStats.TechnicalKnockoutPercentage * 100 : 0, [fighter2.LastName || 'Fighter 2']: fighter2.CareerStats?.TechnicalKnockoutPercentage ? fighter2.CareerStats.TechnicalKnockoutPercentage * 100 : 0 },
  ];

   const grapplingChartData = [
    { name: 'Takedowns/15 Min', [fighter1.LastName || 'Fighter 1']: fighter1.CareerStats?.TakedownAverage || 0, [fighter2.LastName || 'Fighter 2']: fighter2.CareerStats?.TakedownAverage || 0 },
    { name: 'Submission Attempts/15 Min', [fighter1.LastName || 'Fighter 1']: fighter1.CareerStats?.SubmissionAverage || 0, [fighter2.LastName || 'Fighter 2']: fighter2.CareerStats?.SubmissionAverage || 0 },
     { name: 'Takedown Defense', [fighter1.LastName || 'Fighter 1']: fighter1.CareerStats?.TakedownDefense ? fighter1.CareerStats.TakedownDefense * 100 : 0, [fighter2.LastName || 'Fighter 2']: fighter2.CareerStats?.TakedownDefense ? fighter2.CareerStats.TakedownDefense * 100 : 0 },
  ];

  const fighter1WinPercentage = calculateWinPercentage(fighter1.Wins, fighter1.Losses, fighter1.Draws) || 0;
  const fighter2WinPercentage = calculateWinPercentage(fighter2.Wins, fighter2.Losses, fighter2.Draws) || 0;

  const recordChartData = [
    { name: 'Wins', [fighter1.LastName || 'Fighter 1']: fighter1.Wins || 0, [fighter2.LastName || 'Fighter 2']: fighter2.Wins || 0 },
    { name: 'Losses', [fighter1.LastName || 'Fighter 1']: fighter1.Losses || 0, [fighter2.LastName || 'Fighter 2']: fighter2.Losses || 0 },
    { name: 'Draws', [fighter1.LastName || 'Fighter 1']: fighter1.Draws || 0, [fighter2.LastName || 'Fighter 2']: fighter2.Draws || 0 },
    { name: 'Title Wins', [fighter1.LastName || 'Fighter 1']: fighter1.TitleWins || 0, [fighter2.LastName || 'Fighter 2']: fighter2.TitleWins || 0 },
    { name: 'Win Percentage', [fighter1.LastName || 'Fighter 1']: fighter1WinPercentage * 100, [fighter2.LastName || 'Fighter 2']: fighter2WinPercentage * 100 },
  ];

  const fighter1WinPercentageFormatted = fighter1WinPercentage != null ? `${(fighter1WinPercentage * 100).toFixed(1)}%` : 'N/A';
  const fighter2WinPercentageFormatted = fighter2WinPercentage != null ? `${(fighter2WinPercentage * 100).toFixed(1)}%` : 'N/A';

  return (
    <TooltipProvider>
      <div className="bg-black/30 border border-red-500/20 rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-red-900/50 to-black/50 p-3 flex justify-between items-center">
          <h3 className="text-white font-bold flex items-center">
            <Swords className="h-4 w-4 mr-2 text-red-500" />
            Fighter Comparison
          </h3>
          <Badge variant="outline" className="bg-black/50 text-gray-300 border-red-500/30">
            {fighter1.WeightClass}
          </Badge>
        </div>

        <div className="p-4">
          {/* Fighter Headers */}
          <div className="flex justify-between mb-6">
            <div className="text-center flex-1">
              <div className="relative w-32 h-32 mx-auto mb-2">
                <Image
                  src={fighter1.image_url || '/images/fighter-placeholder.png'}
                  alt={`${fighter1.FirstName} ${fighter1.LastName}`}
                  fill
                  className="object-contain"
                />
                {fighter1.TitleWins !== undefined && fighter1.TitleWins !== null && fighter1.TitleWins > 0 && (
                  <div className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
                    <span className="text-xs font-bold">C</span>
                  </div>
                )}
              </div>
              <h3 className="font-bold text-lg text-white">
                {fighter1.FirstName} {fighter1.LastName}
              </h3>
              {fighter1.Nickname && (
                <p className="text-red-400 text-sm">&quot;{fighter1.Nickname}&quot;</p>
              )}
              <p className="text-gray-400 text-sm">Record: {fighter1.Wins || 0}-{fighter1.Losses || 0}-{fighter1.Draws || 0}</p>
              {/* Add Country if available in Fighter type */}
            </div>

            <div className="text-center flex-1">
              <div className="relative w-32 h-32 mx-auto mb-2">
                <Image
                  src={fighter2.image_url || '/images/fighter-placeholder.png'}
                  alt={`${fighter2.FirstName} ${fighter2.LastName}`}
                  fill
                  className="object-contain"
                />
                {fighter2.TitleWins !== undefined && fighter2.TitleWins !== null && fighter2.TitleWins > 0 && (
                  <div className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
                    <span className="text-xs font-bold">C</span>
                  </div>
                )}
              </div>
              <h3 className="font-bold text-lg text-white">
                {fighter2.FirstName} {fighter2.LastName}
              </h3>
              {fighter2.Nickname && (
                <p className="text-red-400 text-sm">&quot;{fighter2.Nickname}&quot;</p>
              )}
              <p className="text-gray-400 text-sm">Record: {fighter2.Wins || 0}-{fighter2.Losses || 0}-{fighter2.Draws || 0}</p>
              {/* Add Country if available in Fighter type */}
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
                    <Tooltip>
                      <TooltipTrigger className="text-xs text-gray-400">Age</TooltipTrigger>
                      <TooltipContent>Fighter&apos;s age based on birth date.</TooltipContent>
                    </Tooltip>
                    <p className="text-sm text-white">{fighter1Age}</p>
                  </div>
                  <div className="text-center">
                    <Tooltip>
                      <TooltipTrigger className="text-xs text-gray-400">Height</TooltipTrigger>
                      <TooltipContent>Fighter&apos;s height in feet and inches.</TooltipContent>
                    </Tooltip>
                    <p className="text-sm text-white">{fighter1.Height ? `${Math.floor(fighter1.Height / 12)}'${fighter1.Height % 12}"` : 'N/A'}</p>
                  </div>
                  <div className="text-center">
                    <Tooltip>
                      <TooltipTrigger className="text-xs text-gray-400">Weight</TooltipTrigger>
                      <TooltipContent>Fighter&apos;s weight in pounds.</TooltipContent>
                    </Tooltip>
                    <p className="text-sm text-white">{fighter1.Weight ? `${fighter1.Weight} lbs` : 'N/A'}</p>
                  </div>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <div className="text-center">
                    <Tooltip>
                      <TooltipTrigger className="text-xs text-gray-400">Reach</TooltipTrigger>
                      <TooltipContent>Fighter&apos;s reach in inches.</TooltipContent>
                    </Tooltip>
                    <p className="text-sm text-white">{fighter1.Reach ? `${fighter1.Reach}"` : 'N/A'}</p>
                  </div>
                  <div className="text-center">
                    <Tooltip>
                      <TooltipTrigger className="text-xs text-gray-400">Stance</TooltipTrigger>
                      <TooltipContent>Fighter&apos;s fighting stance (e.g., Orthodox, Southpaw).</TooltipContent>
                    </Tooltip>
                    <p className="text-sm text-white">N/A</p>
                  </div>
                </div>
              </div>

              <div className="bg-black/50 p-3 rounded-lg border border-red-500/10">
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center">
                     <Tooltip>
                      <TooltipTrigger className="text-xs text-gray-400">Age</TooltipTrigger>
                      <TooltipContent>Fighter&apos;s age based on birth date.</TooltipContent>
                    </Tooltip>
                    <p className="text-sm text-white">{fighter2Age}</p>
                  </div>
                  <div className="text-center">
                     <Tooltip>
                      <TooltipTrigger className="text-xs text-gray-400">Height</TooltipTrigger>
                      <TooltipContent>Fighter&apos;s height in feet and inches.</TooltipContent>
                    </Tooltip>
                    <p className="text-sm text-white">{fighter2.Height ? `${Math.floor(fighter2.Height / 12)}'${fighter2.Height % 12}"` : 'N/A'}</p>
                  </div>
                  <div className="text-center">
                     <Tooltip>
                      <TooltipTrigger className="text-xs text-gray-400">Weight</TooltipTrigger>
                      <TooltipContent>Fighter&apos;s weight in pounds.</TooltipContent>
                    </Tooltip>
                    <p className="text-sm text-white">{fighter2.Weight ? `${fighter2.Weight} lbs` : 'N/A'}</p>
                  </div>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <div className="text-center">
                     <Tooltip>
                      <TooltipTrigger className="text-xs text-gray-400">Reach</TooltipTrigger>
                      <TooltipContent>Fighter&apos;s reach in inches.</TooltipContent>
                    </Tooltip>
                    <p className="text-sm text-white">{fighter2.Reach ? `${fighter2.Reach}"` : 'N/A'}</p>
                  </div>
                  <div className="text-center">
                     <Tooltip>
                      <TooltipTrigger className="text-xs text-gray-400">Stance</TooltipTrigger>
                      <TooltipContent>Fighter&apos;s fighting stance (e.g., Orthodox, Southpaw).</TooltipContent>
                    </Tooltip>
                    <p className="text-sm text-white">N/A</p>
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

             {/* Striking Stats Chart */}
             <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={strikingChartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
                <XAxis dataKey="name" stroke="#e5e7eb" />
                <YAxis stroke="#e5e7eb" />
                <RechartsTooltip formatter={(value, name, props) => {
                  if (typeof value === 'number') {
                    const dataKey = props.dataKey;
                    // Check if the data key corresponds to a percentage value
                    if (dataKey === (fighter1.LastName || 'Fighter 1') || dataKey === (fighter2.LastName || 'Fighter 2')) {
                       const dataPoint = props.payload[0]?.payload;
                       if (dataPoint?.name === 'Striking Accuracy' || dataPoint?.name === 'Striking Defense' || dataPoint?.name === 'KO Percentage' || dataPoint?.name === 'TKO Percentage') {
                           return `${value.toFixed(1)}%`;
                       }
                    }
                     return value.toFixed(2);
                  }
                   return value;
                }} />
                <Legend />
                <Bar dataKey={fighter1.LastName || 'Fighter 1'} fill="#ef4444" />
                <Bar dataKey={fighter2.LastName || 'Fighter 2'} fill="#8b0000" />
              </BarChart>
            </ResponsiveContainer>

            <div className="space-y-3 mt-4">
              <div className="grid grid-cols-3 gap-2 items-center">
                <div className="text-right">
                  <p className={`text-sm font-medium ${advantages.sigStrikeAccuracy === 'fighter1' ? 'text-red-400' : 'text-white'}`}>
                    {fighter1.CareerStats?.SigStrikeAccuracy != null ? `${(fighter1.CareerStats.SigStrikeAccuracy * 100).toFixed(1)}%` : 'N/A'}
                  </p>
                </div>
                <div className="text-center text-xs text-gray-400">
                   <Tooltip>
                      <TooltipTrigger>Striking Accuracy</TooltipTrigger>
                      <TooltipContent>Percentage of significant strikes landed.</TooltipContent>
                    </Tooltip>
                </div>
                <div className="text-left">
                  <p className={`text-sm font-medium ${advantages.sigStrikeAccuracy === 'fighter2' ? 'text-red-400' : 'text-white'}`}>
                    {fighter2.CareerStats?.SigStrikeAccuracy != null ? `${(fighter2.CareerStats.SigStrikeAccuracy * 100).toFixed(1)}%` : 'N/A'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 items-center">
                <div className="text-right">
                  <p className={`text-sm font-medium ${advantages.sigStrikesLandedPerMinute === 'fighter1' ? 'text-red-400' : 'text-white'}`}>
                    {fighter1.CareerStats?.SigStrikesLandedPerMinute != null ? fighter1.CareerStats.SigStrikesLandedPerMinute.toFixed(2) : 'N/A'}
                  </p>
                </div>
                <div className="text-center text-xs text-gray-400">
                   <Tooltip>
                      <TooltipTrigger>Strikes Landed/Min</TooltipTrigger>
                      <TooltipContent>Average number of significant strikes landed per minute.</TooltipContent>
                    </Tooltip>
                </div>
                <div className="text-left">
                  <p className={`text-sm font-medium ${advantages.sigStrikesLandedPerMinute === 'fighter2' ? 'text-red-400' : 'text-white'}`}>
                    {fighter2.CareerStats?.SigStrikesLandedPerMinute != null ? fighter2.CareerStats.SigStrikesLandedPerMinute.toFixed(2) : 'N/A'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 items-center">
                <div className="text-right">
                  <p className={`text-sm font-medium ${advantages.strikesAbsorbedPerMin === 'fighter1' ? 'text-red-400' : 'text-white'}`}>
                    {fighter1.CareerStats?.CareerSapm != null ? fighter1.CareerStats.CareerSapm.toFixed(2) : 'N/A'}
                  </p>
                </div>
                <div className="text-center text-xs text-gray-400">
                    <Tooltip>
                      <TooltipTrigger>Strikes Absorbed/Min</TooltipTrigger>
                      <TooltipContent>Average number of significant strikes absorbed per minute.</TooltipContent>
                    </Tooltip>
                </div>
                <div className="text-left">
                  <p className={`text-sm font-medium ${advantages.strikesAbsorbedPerMin === 'fighter2' ? 'text-red-400' : 'text-white'}`}>
                    {fighter2.CareerStats?.CareerSapm != null ? fighter2.CareerStats.CareerSapm.toFixed(2) : 'N/A'}
                  </p>
                </div>
              </div>

               {/* Striking Defense */}
              <div className="grid grid-cols-3 gap-2 items-center">
                <div className="text-right">
                  {/* Calculate and store advantage for Striking Defense */}
                   {(() => {
                    const strikingDefenseAdvantage = advantages.strikingDefense;
                    return (
                      <p className={`text-sm font-medium ${strikingDefenseAdvantage === 'fighter1' ? 'text-red-400' : strikingDefenseAdvantage === 'fighter2' ? 'text-red-400' : 'text-white'}` as string}>
                    {fighter1.CareerStats?.StrikingDefense != null ? `${(fighter1.CareerStats.StrikingDefense * 100).toFixed(1)}%` : 'N/A'}
                  </p>
                    );
                   })()}
                </div>
                <div className="text-center text-xs text-gray-400">
                   <Tooltip>
                      <TooltipTrigger>Striking Defense</TooltipTrigger>
                      <TooltipContent>Percentage of strikes avoided.</TooltipContent>
                    </Tooltip>
                </div>
                <div className="text-left">
                   {/* Calculate and store advantage for Striking Defense */}
                   {(() => {
                    const strikingDefenseAdvantage = advantages.strikingDefense;
                    return (
                      <p className={`text-sm font-medium ${strikingDefenseAdvantage === 'fighter2' ? 'text-red-400' : strikingDefenseAdvantage === 'fighter1' ? 'text-red-400' : 'text-white'}` as string}>
                    {fighter2.CareerStats?.StrikingDefense != null ? `${(fighter2.CareerStats.StrikingDefense * 100).toFixed(1)}%` : 'N/A'}
                  </p>
                    );
                   })()}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 items-center">
                <div className="text-right">
                  <p className={`text-sm font-medium ${advantages.knockoutPercentage === 'fighter1' ? 'text-red-400' : 'text-white'}`}>
                    {fighter1.CareerStats?.KnockoutPercentage != null ? `${(fighter1.CareerStats.KnockoutPercentage * 100).toFixed(1)}%` : 'N/A'}
                  </p>
                </div>
                <div className="text-center text-xs text-gray-400">
                    <Tooltip>
                      <TooltipTrigger>KO Percentage</TooltipTrigger>
                      <TooltipContent>Percentage of wins by knockout.</TooltipContent>
                    </Tooltip>
                </div>
                <div className="text-left">
                  <p className={`text-sm font-medium ${advantages.knockoutPercentage === 'fighter2' ? 'text-red-400' : 'text-white'}`}>
                    {fighter2.CareerStats?.KnockoutPercentage != null ? `${(fighter2.CareerStats.KnockoutPercentage * 100).toFixed(1)}%` : 'N/A'}
                  </p>
                </div>
              </div>

               <div className="grid grid-cols-3 gap-2 items-center">
                <div className="text-right">
                  <p className={`text-sm font-medium ${advantages.technicalKnockoutPercentage === 'fighter1' ? 'text-red-400' : 'text-white'}`}>
                    {fighter1.CareerStats?.TechnicalKnockoutPercentage != null ? `${(fighter1.CareerStats.TechnicalKnockoutPercentage * 100).toFixed(1)}%` : 'N/A'}
                  </p>
                </div>
                <div className="text-center text-xs text-gray-400">
                    <Tooltip>
                      <TooltipTrigger>TKO Percentage</TooltipTrigger>
                      <TooltipContent>Percentage of wins by technical knockout.</TooltipContent>
                    </Tooltip>
                </div>
                <div className="text-left">
                  <p className={`text-sm font-medium ${advantages.technicalKnockoutPercentage === 'fighter2' ? 'text-red-400' : 'text-white'}`}>
                    {fighter2.CareerStats?.TechnicalKnockoutPercentage != null ? `${(fighter2.CareerStats.TechnicalKnockoutPercentage * 100).toFixed(1)}%` : 'N/A'}
                  </p>
                </div>
              </div>

               <div className="grid grid-cols-3 gap-2 items-center">
                <div className="text-right">
                  <p className={`text-sm font-medium ${advantages.decisionPercentage === 'fighter1' ? 'text-red-400' : 'text-white'}`}>
                    {fighter1.CareerStats?.DecisionPercentage != null ? `${(fighter1.CareerStats.DecisionPercentage * 100).toFixed(1)}%` : 'N/A'}
                  </p>
                </div>
                <div className="text-center text-xs text-gray-400">
                     <Tooltip>
                      <TooltipTrigger>Decision Percentage</TooltipTrigger>
                      <TooltipContent>Percentage of fights that went to decision.</TooltipContent>
                    </Tooltip>
                </div>
                <div className="text-left">
                  <p className={`text-sm font-medium ${advantages.decisionPercentage === 'fighter2' ? 'text-red-400' : 'text-white'}`}>
                    {fighter2.CareerStats?.DecisionPercentage != null ? `${(fighter2.CareerStats.DecisionPercentage * 100).toFixed(1)}%` : 'N/A'}
                  </p>
                </div>
              </div>

               {/* Win Percentage */}
               <div className="grid grid-cols-3 gap-2 items-center">
                <div className="text-right">
                   {/* Calculate and store advantage for Win Percentage */}
                   <p className={`text-sm font-medium ${advantages.winPercentage === 'fighter1' ? 'text-red-400' : advantages.winPercentage === 'fighter2' ? 'text-red-400' : 'text-white'}`}>
                    {fighter1WinPercentageFormatted}
                  </p>
                </div>
                <div className="text-center text-xs text-gray-400">
                     <Tooltip>
                      <TooltipTrigger>Win Percentage</TooltipTrigger>
                      <TooltipContent>Percentage of total fights won.</TooltipContent>
                    </Tooltip>
                </div>
                <div className="text-left">
                   {/* Calculate and store advantage for Win Percentage */}
                   <p className={`text-sm font-medium ${advantages.winPercentage === 'fighter2' ? 'text-red-400' : advantages.winPercentage === 'fighter1' ? 'text-red-400' : 'text-white'}`}>
                    {fighter2WinPercentageFormatted}
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

             {/* Grappling Stats Chart */}
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={grapplingChartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
                <XAxis dataKey="name" stroke="#e5e7eb" />
                <YAxis stroke="#e5e7eb" />
                <RechartsTooltip formatter={(value, name, props) => {
                   if (typeof value === 'number') {
                     const dataKey = props.dataKey;
                     // Check if the data key corresponds to a percentage value
                     if (dataKey === (fighter1.LastName || 'Fighter 1') || dataKey === (fighter2.LastName || 'Fighter 2')) {
                       const dataPoint = props.payload[0]?.payload;
                        if (dataPoint?.name === 'Takedown Defense') {
                           return `${value.toFixed(1)}%`;
                       }
                    }
                    return value.toFixed(2);
                   }
                   return value;
                }} />
                <Legend />
                <Bar dataKey={fighter1.LastName || 'Fighter 1'} fill="#ef4444" />
                <Bar dataKey={fighter2.LastName || 'Fighter 2'} fill="#8b0000" />
              </BarChart>
            </ResponsiveContainer>

            <div className="space-y-3 mt-4">
              <div className="grid grid-cols-3 gap-2 items-center">
                <div className="text-right">
                  <p className={`text-sm font-medium ${advantages.takedownAverage === 'fighter1' ? 'text-red-400' : 'text-white'}`}>
                    {fighter1.CareerStats?.TakedownAverage != null ? fighter1.CareerStats.TakedownAverage.toFixed(2) : 'N/A'}
                  </p>
                </div>
                <div className="text-center text-xs text-gray-400">
                     <Tooltip>
                      <TooltipTrigger>Takedowns/15 Min</TooltipTrigger>
                      <TooltipContent>Average number of takedowns landed per 15 minutes.</TooltipContent>
                    </Tooltip>
                </div>
                <div className="text-left">
                  <p className={`text-sm font-medium ${advantages.takedownAverage === 'fighter2' ? 'text-red-400' : 'text-white'}`}>
                    {fighter2.CareerStats?.TakedownAverage != null ? fighter2.CareerStats.TakedownAverage.toFixed(2) : 'N/A'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 items-center">
                <div className="text-right">
                  <p className={`text-sm font-medium ${advantages.submissionAverage === 'fighter1' ? 'text-red-400' : 'text-white'}`}>
                    {fighter1.CareerStats?.SubmissionAverage != null ? fighter1.CareerStats.SubmissionAverage.toFixed(2) : 'N/A'}
                  </p>
                </div>
                <div className="text-center text-xs text-gray-400">
                     <Tooltip>
                      <TooltipTrigger>Submission Attempts/15 Min</TooltipTrigger>
                      <TooltipContent>Average number of submission attempts per 15 minutes.</TooltipContent>
                    </Tooltip>
                </div>
                <div className="text-left">
                  <p className={`text-sm font-medium ${advantages.submissionAverage === 'fighter2' ? 'text-red-400' : 'text-white'}`}>
                    {fighter2.CareerStats?.SubmissionAverage != null ? fighter2.CareerStats.SubmissionAverage.toFixed(2) : 'N/A'}
                  </p>
                </div>
              </div>

              {/* Takedown Defense */}
              <div className="grid grid-cols-3 gap-2 items-center">
                <div className="text-right">
                  {/* Calculate and store advantage for Takedown Defense */}
                  {(() => {
                    const tdDefenseAdvantage = advantages.takedownDefense;
                    return (
                      <p className={`text-sm font-medium ${tdDefenseAdvantage === 'fighter1' ? 'text-red-400' : tdDefenseAdvantage === 'fighter2' ? 'text-red-400' : 'text-white'}`}>
                    {fighter1.CareerStats?.TakedownDefense != null ? `${(fighter1.CareerStats.TakedownDefense * 100).toFixed(1)}%` : 'N/A'}
                  </p>
                    );
                  })()}
                </div>
                <div className="text-center text-xs text-gray-400">
                    <Tooltip>
                      <TooltipTrigger>Takedown Defense</TooltipTrigger>
                      <TooltipContent>Percentage of opponent&apos;s takedown attempts avoided.</TooltipContent>
                    </Tooltip>
                </div>
                <div className="text-left">
                  {/* Calculate and store advantage for Takedown Defense */}
                   {(() => {
                    const tdDefenseAdvantage = advantages.takedownDefense;
                    return (
                      <p className={`text-sm font-medium ${tdDefenseAdvantage === 'fighter2' ? 'text-red-400' : tdDefenseAdvantage === 'fighter1' ? 'text-red-400' : 'text-white'}`}>
                    {fighter2.CareerStats?.TakedownDefense != null ? `${(fighter2.CareerStats.TakedownDefense * 100).toFixed(1)}%` : 'N/A'}
                  </p>
                    );
                   })()}
                </div>
              </div>
            </div>
          </div>

          {/* General Stats - Wins, Losses, KOs, Submissions */}
           <div className="mb-6">
            <h4 className="font-bold text-white mb-3 flex items-center">
              <Shield className="h-4 w-4 mr-2 text-red-500" />
              Fight Record Breakdown
            </h4>

            {/* Record Stats Chart */}
             <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={recordChartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
                <XAxis dataKey="name" stroke="#e5e7eb" />
                <YAxis stroke="#e5e7eb" />
                 {/* Custom Tooltip for different data types if needed, or use a generic one */}
                <RechartsTooltip formatter={(value, name, props) => {
                  if (typeof value === 'number') {
                    const dataKey = props.dataKey;
                      if (dataKey === (fighter1.LastName || 'Fighter 1') || dataKey === (fighter2.LastName || 'Fighter 2')) {
                        const dataPoint = props.payload[0]?.payload;
                         if (dataPoint?.name === 'Win Percentage') {
                            return `${value.toFixed(1)}%`;
                        }
                     }
                    return value;
                  }
                  return value;
                }} />
                <Legend />
                <Bar dataKey={fighter1.LastName || 'Fighter 1'} fill="#ef4444" />
                <Bar dataKey={fighter2.LastName || 'Fighter 2'} fill="#8b0000" />
              </BarChart>
            </ResponsiveContainer>

            <div className="space-y-3 mt-4">
              {/* Wins */}
              <div className="grid grid-cols-3 gap-2 items-center">
                <div className="text-right">
                   {/* Calculate and store advantage for Wins */}
                   {(() => {
                     const winAdvantage = getBetterValue(fighter1.Wins, fighter2.Wins) as string;
                     return (
                       <p className={`text-sm font-medium ${winAdvantage === 'fighter1' ? 'text-red-400' : winAdvantage === 'fighter2' ? 'text-red-400' : 'text-white'}`}>
                          {fighter1.Wins != null ? fighter1.Wins : 'N/A'}
                       </p>
                     );
                   })()}
                </div>
                <div className="text-center text-xs text-gray-400">
                     <Tooltip>
                      <TooltipTrigger>Wins</TooltipTrigger>
                      <TooltipContent>Total professional wins.</TooltipContent>
                    </Tooltip>
                </div>
                <div className="text-left">
                   {/* Calculate and store advantage for Wins */}
                   {(() => {
                     const winAdvantage = getBetterValue(fighter1.Wins, fighter2.Wins) as string;
                     return (
                       <p className={`text-sm font-medium ${winAdvantage === 'fighter2' ? 'text-red-400' : winAdvantage === 'fighter1' ? 'text-red-400' : 'text-white'}`}>
                         {fighter2.Wins != null ? fighter2.Wins : 'N/A'}
                       </p>
                     );
                   })()}
                </div>
              </div>
              {/* Losses */}
              <div className="grid grid-cols-3 gap-2 items-center">
                <div className="text-right">
                   {/* Calculate and store advantage for Losses */}
                   {(() => {
                     const lossAdvantage = getBetterValue(fighter1.Losses, fighter2.Losses, false) as string;
                     return (
                        <p className={`text-sm font-medium ${lossAdvantage === 'fighter1' ? 'text-red-400' : lossAdvantage === 'fighter2' ? 'text-red-400' : 'text-white'}`}>
                          {fighter1.Losses != null ? fighter1.Losses : 'N/A'}
                        </p>
                     );
                   })()}
                </div>
                <div className="text-center text-xs text-gray-400">
                     <Tooltip>
                      <TooltipTrigger>Losses</TooltipTrigger>
                      <TooltipContent>Total professional losses.</TooltipContent>
                    </Tooltip>
                </div>
                <div className="text-left">
                   {/* Calculate and store advantage for Losses */}
                   {(() => {
                     const lossAdvantage = getBetterValue(fighter1.Losses, fighter2.Losses, false) as string;
                     return (
                       <p className={`text-sm font-medium ${lossAdvantage === 'fighter2' ? 'text-red-400' : lossAdvantage === 'fighter1' ? 'text-red-400' : 'text-white'}`}>
                         {fighter2.Losses != null ? fighter2.Losses : 'N/A'}
                       </p>
                     );
                   })()}
                </div>
              </div>
               {/* Draws */}
              <div className="grid grid-cols-3 gap-2 items-center">
                <div className="text-right">
                   {/* Calculate and store advantage for Draws */}
                   {(() => {
                     const drawAdvantage = getBetterValue(fighter1.Draws, fighter2.Draws) as string;
                     return (
                       <p className={`text-sm font-medium ${drawAdvantage === 'fighter1' ? 'text-red-400' : drawAdvantage === 'fighter2' ? 'text-red-400' : 'text-white'}`}>
                         {fighter1.Draws != null ? fighter1.Draws : 'N/A'}
                       </p>
                     );
                   })()}
                </div>
                <div className="text-center text-xs text-gray-400">
                     <Tooltip>
                      <TooltipTrigger>Draws</TooltipTrigger>
                      <TooltipContent>Total professional draws.</TooltipContent>
                    </Tooltip>
                </div>
                <div className="text-left">
                   {/* Calculate and store advantage for Draws */}
                   {(() => {
                     const drawAdvantage = getBetterValue(fighter1.Draws, fighter2.Draws) as string;
                     return (
                       <p className={`text-sm font-medium ${drawAdvantage === 'fighter2' ? 'text-red-400' : drawAdvantage === 'fighter1' ? 'text-red-400' : 'text-white'}`}>
                         {fighter2.Draws != null ? fighter2.Draws : 'N/A'}
                       </p>
                     );
                   })()}
                </div>
              </div>
              {/* Technical Knockouts */}
              <div className="grid grid-cols-3 gap-2 items-center">
                <div className="text-right">
                   {/* Calculate and store advantage for Technical Knockouts */}
                   {(() => {
                     const tkoAdvantage = getBetterValue(fighter1.TechnicalKnockouts, fighter2.TechnicalKnockouts) as string;
                     return (
                       <p className={`text-sm font-medium ${tkoAdvantage === 'fighter1' ? 'text-red-400' : tkoAdvantage === 'fighter2' ? 'text-red-400' : 'text-white'}`}>
                         {fighter1.TechnicalKnockouts != null ? fighter1.TechnicalKnockouts : 'N/A'}
                       </p>
                     );
                   })()}
                </div>
                <div className="text-center text-xs text-gray-400">
                     <Tooltip>
                      <TooltipTrigger>Technical Knockouts</TooltipTrigger>
                      <TooltipContent>Number of wins by technical knockout.</TooltipContent>
                    </Tooltip>
                </div>
                <div className="text-left">
                   {/* Calculate and store advantage for Technical Knockouts */}
                   {(() => {
                     const tkoAdvantage = getBetterValue(fighter1.TechnicalKnockouts, fighter2.TechnicalKnockouts) as string;
                     return (
                       <p className={`text-sm font-medium ${tkoAdvantage === 'fighter2' ? 'text-red-400' : tkoAdvantage === 'fighter1' ? 'text-red-400' : 'text-white'}`}>
                         {fighter2.TechnicalKnockouts != null ? fighter2.TechnicalKnockouts : 'N/A'}
                       </p>
                     );
                   })()}
                </div>
              </div>
               {/* Submissions */}
              <div className="grid grid-cols-3 gap-2 items-center">
                <div className="text-right">
                   {/* Calculate and store advantage for Submissions */}
                   {(() => {
                     const subAdvantage = getBetterValue(fighter1.Submissions, fighter2.Submissions) as string;
                     return (
                       <p className={`text-sm font-medium ${subAdvantage === 'fighter1' ? 'text-red-400' : subAdvantage === 'fighter2' ? 'text-red-400' : 'text-white'}`}>
                         {fighter1.Submissions != null ? fighter1.Submissions : 'N/A'}
                       </p>
                     );
                   })()}
                </div>
                <div className="text-center text-xs text-gray-400">
                    <Tooltip>
                      <TooltipTrigger>Submissions</TooltipTrigger>
                      <TooltipContent>Number of wins by submission.</TooltipContent>
                    </Tooltip>
                </div>
                <div className="text-left">
                   {/* Calculate and store advantage for Submissions */}
                   {(() => {
                     const subAdvantage = getBetterValue(fighter1.Submissions, fighter2.Submissions) as string;
                     return (
                       <p className={`text-sm font-medium ${subAdvantage === 'fighter2' ? 'text-red-400' : subAdvantage === 'fighter1' ? 'text-red-400' : 'text-white'}`}>
                         {fighter2.Submissions != null ? fighter2.Submissions : 'N/A'}
                       </p>
                     );
                   })()}
                </div>
              </div>
               {/* Title Wins */}
              <div className="grid grid-cols-3 gap-2 items-center">
                <div className="text-right">
                   {/* Calculate and store advantage for Title Wins */}
                   {(() => {
                     const titleWinAdvantage = getBetterValue(fighter1.TitleWins, fighter2.TitleWins) as string;
                     return (
                       <p className={`text-sm font-medium ${titleWinAdvantage === 'fighter1' ? 'text-red-400' : titleWinAdvantage === 'fighter2' ? 'text-red-400' : 'text-white'}`}>
                         {fighter1.TitleWins != null ? fighter1.TitleWins : 'N/A'}
                       </p>
                     );
                   })()}
                </div>
                <div className="text-center text-xs text-gray-400">
                     <Tooltip>
                      <TooltipTrigger>Title Wins</TooltipTrigger>
                      <TooltipContent>Number of championship wins.</TooltipContent>
                    </Tooltip>
                </div>
                <div className="text-left">
                   {/* Calculate and store advantage for Title Wins */}
                   {(() => {
                     const titleWinAdvantage = getBetterValue(fighter1.TitleWins, fighter2.TitleWins) as string;
                     return (
                       <p className={`text-sm font-medium ${titleWinAdvantage === 'fighter2' ? 'text-red-400' : titleWinAdvantage === 'fighter1' ? 'text-red-400' : 'text-white'}`}>
                         {fighter2.TitleWins != null ? fighter2.TitleWins : 'N/A'}
                       </p>
                     );
                   })()}
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
    </TooltipProvider>
  );
};
