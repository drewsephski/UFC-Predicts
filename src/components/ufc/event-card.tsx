"use client";

import { cn } from "@/functions";
import { CalendarRange, MapPin, Swords } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

interface EventCardProps {
    id: string;
    name: string;
    date: string;
    venue: string;
    location: string;
    mainEvent: {
        title: string;
        fighter1: string;
        fighter2: string;
    };
    coMainEvent?: {
        title: string;
        fighter1: string;
        fighter2: string;
    };
    isPPV?: boolean;
}

const EventCard = ({
    id,
    name,
    date,
    venue,
    location,
    mainEvent,
    coMainEvent,
    isPPV = false,
}: EventCardProps) => {
    // Format date
    const eventDate = new Date(date);
    const formattedDate = eventDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <Card className={cn(
            "overflow-hidden transition-all duration-300 hover:shadow-lg border-red-500/30 bg-gradient-to-b from-black to-red-950/30 backdrop-blur-sm",
            isPPV && "border-red-500/70 shadow-md shadow-red-500/20"
        )}>
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-bold text-white">{name}</CardTitle>
                    {isPPV && (
                        <span className="px-3 py-1 text-xs font-bold text-white bg-gradient-to-r from-red-600 to-red-800 rounded-full shadow-sm">
                            PPV
                        </span>
                    )}
                </div>
                <CardDescription className="flex items-center text-sm text-gray-300 mt-2">
                    <CalendarRange className="w-3 h-3 mr-1 text-red-400" />
                    {formattedDate}
                </CardDescription>
                <CardDescription className="flex items-center text-sm text-gray-300 mt-1">
                    <MapPin className="w-3 h-3 mr-1 text-red-400" />
                    {venue}, {location}
                </CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
                <div className="space-y-4">
                    <div className="p-4 rounded-md bg-gradient-to-b from-red-950/40 to-black border border-red-500/30">
                        <div className="text-xs font-bold text-red-400 mb-2 uppercase tracking-wider">MAIN EVENT</div>
                        <div className="text-sm font-medium mb-3 text-white border-b border-red-500/20 pb-2">{mainEvent.title}</div>
                        <div className="flex items-center justify-between">
                            <div className="font-bold text-white">{mainEvent.fighter1}</div>
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-red-800 to-red-900">
                                <Swords className="w-4 h-4 text-white" />
                            </div>
                            <div className="font-bold text-white">{mainEvent.fighter2}</div>
                        </div>
                    </div>

                    {coMainEvent && (
                        <div className="p-4 rounded-md bg-gradient-to-b from-red-950/30 to-black border border-red-500/20">
                            <div className="text-xs font-bold text-red-400 mb-2 uppercase tracking-wider">CO-MAIN EVENT</div>
                            <div className="text-sm font-medium mb-3 text-white border-b border-red-500/20 pb-2">{coMainEvent.title}</div>
                            <div className="flex items-center justify-between">
                                <div className="font-bold text-white">{coMainEvent.fighter1}</div>
                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-red-800 to-red-900">
                                    <Swords className="w-4 h-4 text-white" />
                                </div>
                                <div className="font-bold text-white">{coMainEvent.fighter2}</div>
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
            <CardFooter className="p-4 pt-2 flex justify-between">
                <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="w-full border-red-500/50 hover:bg-red-500/10 text-red-400 hover:text-red-300"
                >
                    <Link href={`/events/${id}`}>
                        View Full Fight Card
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
};

export default EventCard;
