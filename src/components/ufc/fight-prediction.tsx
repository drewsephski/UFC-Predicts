"use client";

import { cn } from "@/functions";
import { CalendarRange, Info, Percent, Swords, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../ui/tooltip";

interface FighterInfo {
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
    fighter1: FighterInfo;
    fighter2: FighterInfo;
    predictionConfidence: number;
    predictionWinner: string;
    predictionMethod?: string;
    predictionRound?: number;
    predictionReasoning?: string;
}

const FightPrediction = ({
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
}: FightPredictionProps) => {
    // Format date
    const fightDate = new Date(eventDate);
    const formattedDate = fightDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const winner = predictionWinner === fighter1.name ? fighter1 : fighter2;
    const loser = predictionWinner === fighter1.name ? fighter2 : fighter1;

    return (
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg border-border/50 bg-background/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-bold">{eventName}</CardTitle>
                </div>
                <CardDescription className="flex items-center text-sm">
                    <CalendarRange className="w-3 h-3 mr-1" />
                    {formattedDate}
                </CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
                    <div className="flex flex-col items-center text-center">
                        <div className="relative w-20 h-20 rounded-full overflow-hidden mb-2 border-2 border-blue-500">
                            <Image
                                src={fighter1.image}
                                alt={fighter1.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <h3 className="font-bold">{fighter1.name}</h3>
                        <p className="text-sm text-muted-foreground">{fighter1.record}</p>
                        <div className="flex items-center mt-1">
                            <span className="text-xs mr-1">Win Rate:</span>
                            <span className="text-xs font-bold">{fighter1.winPercentage}%</span>
                        </div>
                    </div>

                    <div className="flex flex-col items-center">
                        <Swords className="w-8 h-8 text-primary mb-2" />
                        <span className="text-xs text-muted-foreground">VS</span>
                    </div>

                    <div className="flex flex-col items-center text-center">
                        <div className="relative w-20 h-20 rounded-full overflow-hidden mb-2 border-2 border-red-500">
                            <Image
                                src={fighter2.image}
                                alt={fighter2.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <h3 className="font-bold">{fighter2.name}</h3>
                        <p className="text-sm text-muted-foreground">{fighter2.record}</p>
                        <div className="flex items-center mt-1">
                            <span className="text-xs mr-1">Win Rate:</span>
                            <span className="text-xs font-bold">{fighter2.winPercentage}%</span>
                        </div>
                    </div>
                </div>

                <div className="p-4 rounded-md bg-primary/10 border border-primary/30">
                    <h3 className="font-bold text-lg flex items-center mb-2">
                        <TrendingUp className="w-5 h-5 mr-2" />
                        Fight Prediction
                    </h3>
                    
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                            <span className="font-bold mr-1">Winner:</span>
                            <span>{predictionWinner}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="font-bold mr-1">Confidence:</span>
                            <span>{predictionConfidence}%</span>
                        </div>
                    </div>
                    
                    <Progress value={predictionConfidence} className="h-2 mb-4" />
                    
                    {(predictionMethod || predictionRound) && (
                        <div className="flex flex-wrap gap-x-4 gap-y-2 mb-2">
                            {predictionMethod && (
                                <div className="flex items-center">
                                    <span className="text-sm font-bold mr-1">Method:</span>
                                    <span className="text-sm">{predictionMethod}</span>
                                </div>
                            )}
                            {predictionRound && (
                                <div className="flex items-center">
                                    <span className="text-sm font-bold mr-1">Round:</span>
                                    <span className="text-sm">{predictionRound}</span>
                                </div>
                            )}
                        </div>
                    )}
                    
                    {predictionReasoning && (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="outline" size="sm" className="mt-2">
                                        <Info className="w-4 h-4 mr-1" />
                                        View Analysis
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent className="max-w-xs">
                                    <p className="text-sm">{predictionReasoning}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                </div>
            </CardContent>
            <CardFooter className="p-4 pt-2 flex justify-between">
                <Button asChild variant="outline" size="sm">
                    <Link href={`/fighters/${fighter1.id}`}>
                        {fighter1.name} Profile
                    </Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                    <Link href={`/fighters/${fighter2.id}`}>
                        {fighter2.name} Profile
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
};

export default FightPrediction;
