"use client";

import type React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Trophy,
  Flag,
  Dumbbell,
  Shield,
  Award,
  Swords,
  Star,
  ArrowUpRight,
  Users,
  BarChart3,
  TrendingUp,
  Calendar
} from 'lucide-react';
import Link from 'next/link';
import { MODAL_VARIANTS } from '@/constants/animation';
import { Breadcrumb } from '@/components/ui/breadcrumb';

interface FighterModalProps {
  isOpen: boolean;
  onCloseAction: () => void;
  id: string;
  name: string;
  nickname?: string;
  image: string;
  country: string;
  division: string;
  record: string;
  winsByKO: number;
  winsBySub: number;
  winsByDec: number;
  isChampion: boolean;
}

export const FighterModal: React.FC<FighterModalProps> = ({
  isOpen,
  onCloseAction,
  id,
  name,
  nickname,
  image,
  country,
  division,
  record,
  winsByKO,
  winsBySub,
  winsByDec,
  isChampion,
}) => {
  // Calculate total wins and percentages
  const totalWins = winsByKO + winsBySub + winsByDec;
  const koPercentage = totalWins > 0 ? (winsByKO / totalWins) * 100 : 0;
  const subPercentage = totalWins > 0 ? (winsBySub / totalWins) * 100 : 0;
  const decPercentage = totalWins > 0 ? ((winsByDec) / totalWins) * 100 : 0;

  // Determine fighter's strengths based on win percentages
  const strengths = [];
  const weaknesses = [];

  if (koPercentage >= 50) {
    strengths.push('Striking power');
    strengths.push('Stand-up game');
  } else if (koPercentage < 25 && totalWins > 5) {
    weaknesses.push('Knockout power');
  }

  if (subPercentage >= 50) {
    strengths.push('Submission skills');
    strengths.push('Ground game');
  } else if (subPercentage < 25 && totalWins > 5) {
    weaknesses.push('Submission offense');
  }

  if (decPercentage >= 50) {
    strengths.push('Cardio endurance');
    strengths.push('Fight IQ');
    strengths.push('Technical precision');
  }

  // If we don't have enough strengths, add some generic ones
  if (strengths.length < 2) {
    if (!strengths.includes('Technical precision')) {
      strengths.push('Technical precision');
    }
    if (!strengths.includes('Fight IQ') && isChampion) {
      strengths.push('Fight IQ');
    }
    if (!strengths.includes('Octagon control')) {
      strengths.push('Octagon control');
    }
  }

  // If we don't have enough weaknesses, add some generic ones
  if (weaknesses.length < 2) {
    if (!weaknesses.includes('Defensive vulnerabilities')) {
      weaknesses.push('Defensive vulnerabilities');
    }
    if (!weaknesses.includes('Grappling defense') && koPercentage > 70) {
      weaknesses.push('Grappling defense');
    }
    if (!weaknesses.includes('Pace management')) {
      weaknesses.push('Pace management');
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onCloseAction()}>
      <DialogContent className="bg-black/90 border-red-500/30 text-white max-w-3xl max-h-[90vh] overflow-y-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={MODAL_VARIANTS}
          className="relative"
        >
          <DialogHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DialogTitle className="text-2xl font-bold">{name}</DialogTitle>
                {isChampion && (
                  <Badge className="bg-red-600 text-white border-none flex items-center">
                    <Trophy className="h-3 w-3 mr-1" />
                    Champion
                  </Badge>
                )}
              </div>
            </div>
            {nickname && (
              <DialogDescription className="text-red-400 flex items-center gap-1 mt-1">
                <Star className="w-4 h-4" />
                &quot;{nickname}&quot;
              </DialogDescription>
            )}
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
            {/* Fighter Image and Basic Info */}
            <div className="md:col-span-1">
              <div className="relative h-64 w-full rounded-lg overflow-hidden border border-red-500/30 mb-4">
                <Image
                  src={image}
                  alt={name}
                  fill
                  className="object-contain object-top"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Flag className="w-4 h-4 text-red-400" />
                  <span className="text-gray-300">{country}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Dumbbell className="w-4 h-4 text-red-400" />
                  <span className="text-gray-300">{division}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Swords className="w-4 h-4 text-red-400" />
                  <span className="text-gray-300">{record}</span>
                </div>
              </div>
            </div>

            {/* Fighter Details */}
            <div className="md:col-span-2 space-y-6">
              {/* Win Method Breakdown */}
              <Card className="bg-black/70 border-red-500/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Win Method Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-muted-foreground">KO/TKO</span>
                        <span className="text-sm font-medium">{koPercentage.toFixed(1)}% ({winsByKO})</span>
                      </div>
                      <Progress value={koPercentage} className="h-2" indicatorClassName="bg-red-600" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-muted-foreground">Submission</span>
                        <span className="text-sm font-medium">{subPercentage.toFixed(1)}% ({winsBySub})</span>
                      </div>
                      <Progress value={subPercentage} className="h-2" indicatorClassName="bg-blue-600" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-muted-foreground">Decision</span>
                        <span className="text-sm font-medium">{decPercentage.toFixed(1)}% ({winsByDec})</span>
                      </div>
                      <Progress value={decPercentage} className="h-2" indicatorClassName="bg-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Strengths and Weaknesses */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-black/70 border-red-500/30">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Award className="w-4 h-4 text-green-500" />
                      Strengths
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-1">
                      {strengths.map((strength) => (
                        <li key={`strength-${strength}`} className="text-gray-300">{strength}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-black/70 border-red-500/30">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Shield className="w-4 h-4 text-red-500" />
                      Weaknesses
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-1">
                      {weaknesses.map((weakness) => (
                        <li key={`weakness-${weakness}`} className="text-gray-300">{weakness}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Navigation breadcrumb */}
          <div className="mt-6 mb-2">
            <Breadcrumb
              items={[
                { label: "Fighters", href: "/fighters" },
                { label: division, href: `/fighters?division=${division.toLowerCase().replace(/\s+/g, '-')}` },
                { label: name, href: `/fighters/${id}` }
              ]}
              className="text-xs"
            />
          </div>

          {/* Related links */}
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
            <Button
              variant="outline"
              size="sm"
              asChild
              className="border-red-500/30 hover:bg-red-950/30 justify-start"
            >
              <Link href={`/fighters?division=${division.toLowerCase().replace(/\s+/g, '-')}`}>
                <Users className="h-3.5 w-3.5 mr-1.5 text-red-400" />
                <span className="text-xs">{division} Division</span>
              </Link>
            </Button>

            <Button
              variant="outline"
              size="sm"
              asChild
              className="border-red-500/30 hover:bg-red-950/30 justify-start"
            >
              <Link href={`/statistics/fighters?id=${id}`}>
                <BarChart3 className="h-3.5 w-3.5 mr-1.5 text-red-400" />
                <span className="text-xs">Fighter Stats</span>
              </Link>
            </Button>

            <Button
              variant="outline"
              size="sm"
              asChild
              className="border-red-500/30 hover:bg-red-950/30 justify-start"
            >
              <Link href={`/predictions?fighter=${id}`}>
                <TrendingUp className="h-3.5 w-3.5 mr-1.5 text-red-400" />
                <span className="text-xs">Predictions</span>
              </Link>
            </Button>

            <Button
              variant="outline"
              size="sm"
              asChild
              className="border-red-500/30 hover:bg-red-950/30 justify-start"
            >
              <Link href={`/events?fighter=${id}`}>
                <Calendar className="h-3.5 w-3.5 mr-1.5 text-red-400" />
                <span className="text-xs">Upcoming Fights</span>
              </Link>
            </Button>
          </div>

          <DialogFooter className="mt-6 flex justify-between items-center">
            <Button variant="outline" onClick={onCloseAction} className="border-red-500/30 hover:bg-red-950/30">
              Close
            </Button>
            <Button asChild className="bg-red-600 hover:bg-red-700 text-white">
              <Link href={`/fighters/${id}`}>
                <span>Full Profile</span>
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </DialogFooter>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};
