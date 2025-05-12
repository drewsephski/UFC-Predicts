"use client";

import { cn } from "@/functions";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Dumbbell, Flag, TrendingUp, Trophy, User } from "lucide-react";

interface FighterCardProps {
    id: string;
    name: string;
    nickname?: string;
    image: string;
    country: string;
    countryFlag?: string;
    division: string;
    record: string;
    winsByKO: number;
    winsBySub: number;
    winsByDec: number;
    isChampion?: boolean;
    ranking?: number;
}

const FighterCard = ({
    id,
    name,
    nickname,
    image,
    country,
    countryFlag,
    division,
    record,
    winsByKO,
    winsBySub,
    winsByDec,
    isChampion = false,
    ranking,
}: FighterCardProps) => {
    return (
        <Card className={cn(
            "overflow-hidden transition-all duration-300 hover:shadow-lg border-red-500/30 bg-gradient-to-b from-black to-red-950/30 backdrop-blur-sm",
            isChampion && "border-red-500/70 shadow-md shadow-red-500/20"
        )}>
            <CardHeader className="p-0 relative">
                <div className="relative w-full h-64 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-cover object-top transition-transform duration-500 hover:scale-105"
                    />
                    {isChampion && (
                        <div className="absolute top-2 right-2 z-20">
                            <Badge className="bg-gradient-to-r from-red-600 to-red-800 text-white font-bold border-0 shadow-md">
                                <Trophy className="w-3 h-3 mr-1" />
                                Champion
                            </Badge>
                        </div>
                    )}
                    {!isChampion && ranking && (
                        <div className="absolute top-2 right-2 z-20">
                            <Badge variant="outline" className="font-bold border-red-500/50 text-white bg-black/70">
                                <TrendingUp className="w-3 h-3 mr-1 text-red-500" />
                                Rank #{ranking}
                            </Badge>
                        </div>
                    )}
                </div>
            </CardHeader>
            <CardContent className="p-4">
                <div className="flex flex-col space-y-3">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-xl font-bold text-white">{name}</CardTitle>
                            {nickname && (
                                <CardDescription className="text-sm italic text-red-400">&quot;{nickname}&quot;</CardDescription>
                            )}
                        </div>
                        <div className="flex items-center text-sm text-gray-300">
                            <Flag className="w-3 h-3 mr-1 text-red-400" />
                            {country}
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-2 border-b border-red-500/20 pb-2">
                        <div className="flex items-center text-sm text-gray-300">
                            <Dumbbell className="w-3 h-3 mr-1 text-red-400" />
                            {division}
                        </div>
                        <div className="font-bold text-white">{record}</div>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mt-2">
                        <div className="flex flex-col items-center justify-center p-2 rounded-md bg-gradient-to-b from-red-950/40 to-black border border-red-500/20">
                            <span className="text-lg font-bold text-white">{winsByKO}</span>
                            <span className="text-xs text-red-400">KO/TKO</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-2 rounded-md bg-gradient-to-b from-red-950/40 to-black border border-red-500/20">
                            <span className="text-lg font-bold text-white">{winsBySub}</span>
                            <span className="text-xs text-red-400">SUB</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-2 rounded-md bg-gradient-to-b from-red-950/40 to-black border border-red-500/20">
                            <span className="text-lg font-bold text-white">{winsByDec}</span>
                            <span className="text-xs text-red-400">DEC</span>
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between">
                <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="w-full border-red-500/50 hover:bg-red-500/10 text-red-400 hover:text-red-300"
                >
                    <Link href={`/fighters/${id}`}>
                        <User className="w-4 h-4 mr-2" />
                        View Fighter Profile
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
};

export default FighterCard;
