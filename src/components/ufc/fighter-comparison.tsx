"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Progress } from "../ui/progress";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { TrendingUp } from "lucide-react";

interface FighterData {
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
    ranking?: number;
    isChampion?: boolean;
    stats: {
        strikingAccuracy: number;
        takedownAccuracy: number;
        strikesLandedPerMin: number;
        strikesAbsorbedPerMin: number;
        takedownAvg: number;
        submissionAvg: number;
        knockoutPercentage: number;
        winPercentage: number;
    };
}

interface FighterComparisonProps {
    fighters: FighterData[];
    preSelectedFighters?: [string, string];
}

export const FighterComparison = ({ fighters, preSelectedFighters }: FighterComparisonProps) => {
    const [fighter1Id, setFighter1Id] = useState<string>(preSelectedFighters?.[0] || "");
    const [fighter2Id, setFighter2Id] = useState<string>(preSelectedFighters?.[1] || "");

    const fighter1 = fighters.find(f => f.id === fighter1Id);
    const fighter2 = fighters.find(f => f.id === fighter2Id);

    const getComparisonStats = () => {
        if (!fighter1 || !fighter2) return [];

        return [
            {
                name: "Striking Accuracy",
                fighter1: { value: fighter1.stats.strikingAccuracy, color: "bg-blue-500" },
                fighter2: { value: fighter2.stats.strikingAccuracy, color: "bg-red-500" },
                unit: "%"
            },
            {
                name: "Takedown Accuracy",
                fighter1: { value: fighter1.stats.takedownAccuracy, color: "bg-blue-500" },
                fighter2: { value: fighter2.stats.takedownAccuracy, color: "bg-red-500" },
                unit: "%"
            },
            {
                name: "Strikes Landed Per Min",
                fighter1: { value: fighter1.stats.strikesLandedPerMin, color: "bg-blue-500" },
                fighter2: { value: fighter2.stats.strikesLandedPerMin, color: "bg-red-500" },
                unit: ""
            },
            {
                name: "Strikes Absorbed Per Min",
                fighter1: { value: fighter1.stats.strikesAbsorbedPerMin, color: "bg-blue-500" },
                fighter2: { value: fighter2.stats.strikesAbsorbedPerMin, color: "bg-red-500" },
                unit: ""
            },
            {
                name: "Takedown Avg (per 15 min)",
                fighter1: { value: fighter1.stats.takedownAvg, color: "bg-blue-500" },
                fighter2: { value: fighter2.stats.takedownAvg, color: "bg-red-500" },
                unit: ""
            },
            {
                name: "Submission Avg (per 15 min)",
                fighter1: { value: fighter1.stats.submissionAvg, color: "bg-blue-500" },
                fighter2: { value: fighter2.stats.submissionAvg, color: "bg-red-500" },
                unit: ""
            },
            {
                name: "KO Percentage",
                fighter1: { value: fighter1.stats.knockoutPercentage, color: "bg-blue-500" },
                fighter2: { value: fighter2.stats.knockoutPercentage, color: "bg-red-500" },
                unit: "%"
            },
            {
                name: "Win Percentage",
                fighter1: { value: fighter1.stats.winPercentage, color: "bg-blue-500" },
                fighter2: { value: fighter2.stats.winPercentage, color: "bg-red-500" },
                unit: "%"
            }
        ];
    };

    const comparisonStats = getComparisonStats();

    const getPrediction = () => {
        if (!fighter1 || !fighter2) return null;
        
        // Simple prediction algorithm based on stats comparison
        let fighter1Points = 0;
        let fighter2Points = 0;
        
        for (const stat of comparisonStats) {
            // For strikes absorbed, lower is better
            if (stat.name === "Strikes Absorbed Per Min") {
                if (stat.fighter1.value < stat.fighter2.value) {
                    fighter1Points++;
                } else if (stat.fighter2.value < stat.fighter1.value) {
                    fighter2Points++;
                }
            } else {
                // For all other stats, higher is better
                if (stat.fighter1.value > stat.fighter2.value) {
                    fighter1Points++;
                } else if (stat.fighter2.value > stat.fighter1.value) {
                    fighter2Points++;
                }
            }
        }
        
        const winnerName = fighter1Points > fighter2Points ? fighter1.name : fighter2.name;
        const winnerPoints = fighter1Points > fighter2Points ? fighter1Points : fighter2Points;
        const loserPoints = fighter1Points > fighter2Points ? fighter2Points : fighter1Points;
        const confidence = Math.round((winnerPoints / (winnerPoints + loserPoints)) * 100);
        
        return {
            winner: winnerName,
            confidence: confidence
        };
    };

    const prediction = getPrediction();

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Fighter Comparison</CardTitle>
                <CardDescription>Compare stats between two UFC fighters</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label htmlFor="fighter1-select" className="text-sm font-medium mb-2 block">Fighter 1</label>
                        <Select value={fighter1Id} onValueChange={setFighter1Id}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a fighter" />
                            </SelectTrigger>
                            <SelectContent>
                                {fighters.map(fighter => (
                                    <SelectItem key={fighter.id} value={fighter.id}>
                                        {fighter.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        
                        {fighter1 && (
                            <div className="mt-4 p-4 rounded-md bg-background/80 border border-border/50">
                                <div className="flex items-center gap-4">
                                    <div className="relative w-16 h-16 overflow-hidden rounded-full">
                                        <Image
                                            src={fighter1.image}
                                            alt={fighter1.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">{fighter1.name}</h3>
                                        {fighter1.nickname && (
                                            <p className="text-sm italic">&quot;{fighter1.nickname}&quot;</p>
                                        )}
                                        <div className="flex items-center gap-2 mt-1">
                                            <Badge variant="outline">{fighter1.division}</Badge>
                                            {fighter1.isChampion && (
                                                <Badge className="bg-yellow-500 text-black">Champion</Badge>
                                            )}
                                            {!fighter1.isChampion && fighter1.ranking && (
                                                <Badge variant="secondary">Rank #{fighter1.ranking}</Badge>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
                                    <div>
                                        <span className="text-muted-foreground">Record:</span> {fighter1.record}
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Age:</span> {fighter1.age}
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Height:</span> {fighter1.height}
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Weight:</span> {fighter1.weight}
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Reach:</span> {fighter1.reach}
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Stance:</span> {fighter1.stance}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    <div>
                        <label htmlFor="fighter2-select" className="text-sm font-medium mb-2 block">Fighter 2</label>
                        <Select value={fighter2Id} onValueChange={setFighter2Id}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a fighter" />
                            </SelectTrigger>
                            <SelectContent>
                                {fighters.map(fighter => (
                                    <SelectItem key={fighter.id} value={fighter.id}>
                                        {fighter.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        
                        {fighter2 && (
                            <div className="mt-4 p-4 rounded-md bg-background/80 border border-border/50">
                                <div className="flex items-center gap-4">
                                    <div className="relative w-16 h-16 overflow-hidden rounded-full">
                                        <Image
                                            src={fighter2.image}
                                            alt={fighter2.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">{fighter2.name}</h3>
                                        {fighter2.nickname && (
                                            <p className="text-sm italic">&quot;{fighter2.nickname}&quot;</p>
                                        )}
                                        <div className="flex items-center gap-2 mt-1">
                                            <Badge variant="outline">{fighter2.division}</Badge>
                                            {fighter2.isChampion && (
                                                <Badge className="bg-yellow-500 text-black">Champion</Badge>
                                            )}
                                            {!fighter2.isChampion && fighter2.ranking && (
                                                <Badge variant="secondary">Rank #{fighter2.ranking}</Badge>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
                                    <div>
                                        <span className="text-muted-foreground">Record:</span> {fighter2.record}
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Age:</span> {fighter2.age}
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Height:</span> {fighter2.height}
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Weight:</span> {fighter2.weight}
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Reach:</span> {fighter2.reach}
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Stance:</span> {fighter2.stance}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                
                {fighter1 && fighter2 && (
                    <>
                        <h3 className="font-bold text-lg mb-4">Stats Comparison</h3>
                        <div className="space-y-6">
                            {comparisonStats.map((stat) => (
                                <div key={`${stat.name}-${stat.fighter1.value}-${stat.fighter2.value}`} className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>{stat.name}</span>
                                        <div className="flex gap-4">
                                            <span className="text-blue-500">{stat.fighter1.value}{stat.unit}</span>
                                            <span className="text-red-500">{stat.fighter2.value}{stat.unit}</span>
                                        </div>
                                    </div>
                                    <div className="flex h-2 w-full overflow-hidden rounded-full bg-secondary">
                                        <div 
                                            className="bg-blue-500 transition-all duration-500"
                                            style={{ 
                                                width: `${(stat.fighter1.value / (stat.fighter1.value + stat.fighter2.value)) * 100}%` 
                                            }}
                                        />
                                        <div 
                                            className="bg-red-500 transition-all duration-500"
                                            style={{ 
                                                width: `${(stat.fighter2.value / (stat.fighter1.value + stat.fighter2.value)) * 100}%` 
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        {prediction && (
                            <div className="mt-8 p-4 rounded-md bg-primary/10 border border-primary/30">
                                <h3 className="font-bold text-lg flex items-center">
                                    <TrendingUp className="w-5 h-5 mr-2" />
                                    Fight Prediction
                                </h3>
                                <p className="mt-2">
                                    Based on statistical analysis, <strong>{prediction.winner}</strong> has a {prediction.confidence}% chance of winning this matchup.
                                </p>
                                <div className="mt-2">
                                    <Progress value={prediction.confidence} className="h-2" />
                                </div>
                                <p className="text-xs text-muted-foreground mt-4">
                                    Note: This prediction is based solely on statistical comparison and does not account for many other factors that influence fight outcomes.
                                </p>
                            </div>
                        )}
                    </>
                )}
            </CardContent>
        </Card>
    );
};

export default FighterComparison;
