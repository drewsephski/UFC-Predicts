"use client";

import React from 'react';
import type { Fighter } from '@/types/mma';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface FighterStatsProps {
  fighter: Fighter;
}

export function FighterStats({ fighter }: FighterStatsProps) {
  // Calculate win percentages
  const totalFights = (fighter.Wins || 0) + (fighter.Losses || 0) + (fighter.Draws || 0);
  const winPercentage = totalFights > 0 ? ((fighter.Wins || 0) / totalFights) * 100 : 0;
  const koPercentage = (fighter.Wins || 0) > 0 ? ((fighter.TechnicalKnockouts || 0) / (fighter.Wins || 0)) * 100 : 0;
  const subPercentage = (fighter.Wins || 0) > 0 ? ((fighter.Submissions || 0) / (fighter.Wins || 0)) * 100 : 0;
  const decisionPercentage = (fighter.Wins || 0) > 0 
    ? (((fighter.Wins || 0) - (fighter.TechnicalKnockouts || 0) - (fighter.Submissions || 0)) / (fighter.Wins || 0)) * 100 
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
                  <span className="text-sm font-medium">{(fighter.CareerStats?.KnockoutPercentage ?? 0).toFixed(1)}%</span>
                </div>
                <Progress value={koPercentage} className="h-2" indicatorClassName="bg-red-600" />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-muted-foreground">Submission</span>
                  <span className="text-sm font-medium">{(fighter.CareerStats?.SubmissionAverage ?? 0).toFixed(1)}</span>
                </div>
                <Progress value={(fighter.CareerStats?.SubmissionAverage ?? 0) * 10} className="h-2" indicatorClassName="bg-blue-600" />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-muted-foreground">Decision</span>
                  <span className="text-sm font-medium">{(fighter.CareerStats?.DecisionPercentage ?? 0).toFixed(1)}%</span>
                </div>
                <Progress value={(fighter.CareerStats?.DecisionPercentage ?? 0)} className="h-2" indicatorClassName="bg-yellow-600" />
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
                    {fighter.CareerStats?.SigStrikeAccuracy ? `${fighter.CareerStats.SigStrikeAccuracy.toFixed(1)}%` : 'N/A'}
                  </span>
                </div>
                <Progress 
                  value={fighter.CareerStats?.SigStrikeAccuracy || 0} 
                  className="h-2" 
                  indicatorClassName="bg-red-500" 
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-muted-foreground">Takedown Accuracy</span>
                  <span className="text-sm font-medium">
                    {fighter.CareerStats?.TakedownAverage ? `${fighter.CareerStats.TakedownAverage.toFixed(1)}` : 'N/A'}
                  </span>
                </div>
                <Progress 
                  value={(fighter.CareerStats?.TakedownAverage || 0) * 20}
                  className="h-2" 
                  indicatorClassName="bg-red-500" 
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-muted-foreground">Strikes Landed Per Min</span>
                  <span className="text-sm font-medium">
                    {fighter.CareerStats?.SigStrikesLandedPerMinute?.toFixed(1) || 'N/A'}
                  </span>
                </div>
                <Progress 
                  value={fighter.CareerStats?.SigStrikesLandedPerMinute ? (fighter.CareerStats.SigStrikesLandedPerMinute / 10) * 100 : 0}
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
                    {'N/A'}
                  </span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-muted-foreground">Takedown Average (per 15 min)</span>
                  <span className="text-sm font-medium">
                    {fighter.CareerStats?.TakedownAverage?.toFixed(1) || 'N/A'}
                  </span>
                </div>
                <Progress 
                  value={(fighter.CareerStats?.TakedownAverage || 0) * 20}
                  className="h-2" 
                  indicatorClassName="bg-red-500" 
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-muted-foreground">Submission Average (per 15 min)</span>
                  <span className="text-sm font-medium">
                    {fighter.CareerStats?.SubmissionAverage?.toFixed(1) || 'N/A'}
                  </span>
                </div>
                <Progress 
                  value={(fighter.CareerStats?.SubmissionAverage || 0) * 20}
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
