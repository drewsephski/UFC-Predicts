"use client";

import { useState } from "react";
import type React from "react";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarRange, Clock, Trophy, PlusCircle } from "lucide-react";
import { PredictionForm } from "@/components/predictions/prediction-form";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface Fighter {
  id: string;
  name: string;
  image: string;
  record: string;
  winPercentage: number;
}

interface FightPredictionProps {
  id: string;
  eventName: string;
  eventDate: string;
  fighter1: Fighter;
  fighter2: Fighter;
  predictionConfidence: number;
  predictionWinner: string;
  predictionMethod: string;
  predictionRound: number;
  predictionReasoning: string;
}

export const FightPrediction: React.FC<FightPredictionProps> = ({
  id,
  eventName,
  eventDate,
  fighter1,
  fighter2,
  predictionConfidence,
  predictionWinner,
  predictionMethod,
  predictionRound,
  predictionReasoning,
}) => {
  const [activeFighter, setActiveFighter] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Format date
  const formattedDate = new Date(eventDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Determine which fighter is predicted to win
  const isPredictedWinner1 = predictionWinner === fighter1.name;
  const isPredictedWinner2 = predictionWinner === fighter2.name;

  const handleMakePrediction = (fighterId: string, fighterName: string) => {
    setActiveFighter(fighterId);
    setIsDialogOpen(true);
  };

  return (
    <div className="bg-black/30 border border-red-500/20 rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-red-900/50 to-black/50 p-3 flex justify-between items-center">
        <div className="flex items-center">
          <Badge variant="outline" className="bg-red-600 text-white border-none">
            {eventName}
          </Badge>
          <div className="flex items-center ml-3 text-gray-300 text-sm">
            <CalendarRange className="h-3 w-3 mr-1" />
            {formattedDate}
          </div>
        </div>
        <Badge variant="outline" className="bg-black/50 text-gray-300 border-red-500/30">
          <Trophy className="h-3 w-3 mr-1 text-red-500" />
          {predictionConfidence}% Confidence
        </Badge>
      </div>

      <div className="p-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className={`text-center ${isPredictedWinner1 ? 'order-1' : 'order-2 md:order-1'}`}>
            <div className="relative w-32 h-32 mx-auto mb-2">
              <Image
                src={fighter1.image}
                alt={fighter1.name}
                fill
                className="object-contain"
              />
              {isPredictedWinner1 && (
                <div className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
                  <Trophy className="h-4 w-4" />
                </div>
              )}
            </div>
            <h3 className={`font-bold text-lg ${isPredictedWinner1 ? 'text-red-500' : 'text-white'}`}>
              {fighter1.name}
            </h3>
            <p className="text-gray-400 text-sm">{fighter1.record}</p>
            <div className="mt-2">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-400">Win Rate</span>
                <span className={isPredictedWinner1 ? 'text-red-400' : 'text-gray-400'}>
                  {fighter1.winPercentage}%
                </span>
              </div>
              <Progress
                value={fighter1.winPercentage}
                className="h-1.5 bg-gray-800"
                indicatorClassName={isPredictedWinner1 ? 'bg-red-500' : 'bg-gray-500'}
              />
            </div>
          </div>

          <div className="my-4 md:my-0 order-1 md:order-2">
            <div className="bg-black/50 rounded-full w-12 h-12 flex items-center justify-center mx-auto border border-red-500/30">
              <span className="text-red-500 font-bold">VS</span>
            </div>
          </div>

          <div className={`text-center ${isPredictedWinner2 ? 'order-1 md:order-3' : 'order-3'}`}>
            <div className="relative w-32 h-32 mx-auto mb-2">
              <Image
                src={fighter2.image}
                alt={fighter2.name}
                fill
                className="object-contain"
              />
              {isPredictedWinner2 && (
                <div className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
                  <Trophy className="h-4 w-4" />
                </div>
              )}
            </div>
            <h3 className={`font-bold text-lg ${isPredictedWinner2 ? 'text-red-500' : 'text-white'}`}>
              {fighter2.name}
            </h3>
            <p className="text-gray-400 text-sm">{fighter2.record}</p>
            <div className="mt-2">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-400">Win Rate</span>
                <span className={isPredictedWinner2 ? 'text-red-400' : 'text-gray-400'}>
                  {fighter2.winPercentage}%
                </span>
              </div>
              <Progress
                value={fighter2.winPercentage}
                className="h-1.5 bg-gray-800"
                indicatorClassName={isPredictedWinner2 ? 'bg-red-500' : 'bg-gray-500'}
              />
            </div>
          </div>
        </div>

        <div className="bg-black/50 p-4 rounded-lg border border-red-500/10">
          <h4 className="font-bold text-white mb-2">Prediction</h4>
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="bg-black/70 p-2 rounded border border-red-500/10 text-center">
              <p className="text-xs text-gray-400">Winner</p>
              <p className="text-sm text-red-400 font-semibold">{predictionWinner}</p>
            </div>
            <div className="bg-black/70 p-2 rounded border border-red-500/10 text-center">
              <p className="text-xs text-gray-400">Method</p>
              <p className="text-sm text-white">{predictionMethod}</p>
            </div>
            <div className="bg-black/70 p-2 rounded border border-red-500/10 text-center">
              <p className="text-xs text-gray-400">Round</p>
              <div className="flex items-center justify-center">
                <Clock className="h-3 w-3 text-gray-400 mr-1" />
                <p className="text-sm text-white">{predictionRound}</p>
              </div>
            </div>
          </div>
          <p className="text-gray-300 text-sm">{predictionReasoning}</p>
        </div>

        <div className="mt-4 flex justify-between">
          <Button
            variant="outline"
            className="text-red-400 hover:text-red-300 border-red-500/30 hover:bg-red-950/20"
            onClick={() => handleMakePrediction(fighter1.id, fighter1.name)}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Predict {fighter1.name}
          </Button>

          <Button
            variant="outline"
            className="text-red-400 hover:text-red-300 border-red-500/30 hover:bg-red-950/20"
            onClick={() => handleMakePrediction(fighter2.id, fighter2.name)}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Predict {fighter2.name}
          </Button>

          <Button variant="link" className="text-red-400 hover:text-red-300 p-0">
            View Detailed Analysis →
          </Button>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-black/90 border-red-500/30 text-white max-w-md">
          {activeFighter === fighter1.id ? (
            <PredictionForm
              fighterId={fighter1.id}
              fighterName={fighter1.name}
              onSuccess={() => setIsDialogOpen(false)}
            />
          ) : activeFighter === fighter2.id ? (
            <PredictionForm
              fighterId={fighter2.id}
              fighterName={fighter2.name}
              onSuccess={() => setIsDialogOpen(false)}
            />
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
};
