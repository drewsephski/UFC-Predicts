"use client";

import React from 'react';
import { Fighter } from '@/contexts/ufc-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface FighterStatsProps {
  fighter: Fighter;
}

export function FighterStats({ fighter }: FighterStatsProps) {
  // Calculate win percentages
  const totalFights = fighter.wins + fighter.losses + fighter.draws;
  const winPercentage = totalFights > 0 ? (fighter.wins / totalFights) * 100 : 0;
  const koPercentage = fighter.wins > 0 ? (fighter.knockouts / fighter.wins) * 100 : 0;
  const subPercentage = fighter.wins > 0 ? (fighter.submissions / fighter.wins) * 100 : 0;
  const decisionPercentage = fighter.wins > 0 
    ? ((fighter.wins - fighter.knockouts - fighter.submissions) / fighter.wins) * 100 
    : 0;

  return (
    <div className="space-y-6">
      <Card className="bg-black/70 border-red-500/30">
        <CardHeader>
          <CardTitle className="text-xl">Career Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-muted-foreground">Win Rate</span>
                <span className="text-sm font-medium">{winPercentage.toFixed(1)}%</span>
              </div>
              <Progress value={winPercentage} className="h-2" indicatorClassName="bg-red-500" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-muted-foreground">KO/TKO</span>
                  <span className="text-sm font-medium">{koPercentage.toFixed(1)}%</span>
                </div>
                <Progress value={koPercentage} className="h-2" indicatorClassName="bg-red-600" />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-muted-foreground">Submission</span>
                  <span className="text-sm font-medium">{subPercentage.toFixed(1)}%</span>
                </div>
                <Progress value={subPercentage} className="h-2" indicatorClassName="bg-blue-600" />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-muted-foreground">Decision</span>
                  <span className="text-sm font-medium">{decisionPercentage.toFixed(1)}%</span>
                </div>
                <Progress value={decisionPercentage} className="h-2" indicatorClassName="bg-yellow-600" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-black/70 border-red-500/30">
        <CardHeader>
          <CardTitle className="text-xl">Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-muted-foreground">Striking Accuracy</span>
                  <span className="text-sm font-medium">
                    {fighter.strikingAccuracy ? `${fighter.strikingAccuracy.toFixed(1)}%` : 'N/A'}
                  </span>
                </div>
                <Progress 
                  value={fighter.strikingAccuracy || 0} 
                  className="h-2" 
                  indicatorClassName="bg-red-500" 
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-muted-foreground">Takedown Accuracy</span>
                  <span className="text-sm font-medium">
                    {fighter.takedownAccuracy ? `${fighter.takedownAccuracy.toFixed(1)}%` : 'N/A'}
                  </span>
                </div>
                <Progress 
                  value={fighter.takedownAccuracy || 0} 
                  className="h-2" 
                  indicatorClassName="bg-red-500" 
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-muted-foreground">Strikes Landed Per Min</span>
                  <span className="text-sm font-medium">
                    {fighter.strikesLandedPerMin?.toFixed(1) || 'N/A'}
                  </span>
                </div>
                <Progress 
                  value={fighter.strikesLandedPerMin ? (fighter.strikesLandedPerMin / 8) * 100 : 0} 
                  className="h-2" 
                  indicatorClassName="bg-red-500" 
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-muted-foreground">Strikes Absorbed Per Min</span>
                  <span className="text-sm font-medium">
                    {fighter.strikesAbsorbedPerMin?.toFixed(1) || 'N/A'}
                  </span>
                </div>
                <Progress 
                  value={fighter.strikesAbsorbedPerMin ? (fighter.strikesAbsorbedPerMin / 8) * 100 : 0} 
                  className="h-2" 
                  indicatorClassName="bg-red-500" 
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-muted-foreground">Takedowns Per 15 Min</span>
                  <span className="text-sm font-medium">
                    {fighter.avgTakedownsPer15Min?.toFixed(1) || 'N/A'}
                  </span>
                </div>
                <Progress 
                  value={fighter.avgTakedownsPer15Min ? (fighter.avgTakedownsPer15Min / 5) * 100 : 0} 
                  className="h-2" 
                  indicatorClassName="bg-red-500" 
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-muted-foreground">Submissions Per 15 Min</span>
                  <span className="text-sm font-medium">
                    {fighter.avgSubmissionsPer15Min?.toFixed(1) || 'N/A'}
                  </span>
                </div>
                <Progress 
                  value={fighter.avgSubmissionsPer15Min ? (fighter.avgSubmissionsPer15Min / 3) * 100 : 0} 
                  className="h-2" 
                  indicatorClassName="bg-red-500" 
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
