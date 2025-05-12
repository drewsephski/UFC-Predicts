"use client";

import React from 'react';
import type { Event } from '@/contexts/ufc-context';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/functions';

interface EventCardProps {
  event: Event;
  isPast?: boolean;
  className?: string;
}

export function EventCard({ event, isPast = false, className }: EventCardProps) {
  const eventDate = new Date(event.date);
  const isToday = new Date().toDateString() === eventDate.toDateString();
  
  // Format date: "Sat, Jan 1, 2022"
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  
  // Count main card and prelim fights
  const mainCardCount = event.mainCard?.length || 0;
  const prelimCardCount = event.prelimCard?.length || 0;
  const totalFights = mainCardCount + prelimCardCount;
  
  // Find main event
  const mainEvent = event.mainCard?.find(fight => fight.isMainEvent);
  
  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-md hover:shadow-red-500/10 hover:border-red-500/50 bg-black/70 border-red-500/30 h-full",
        className
      )}
    >
      <div className="relative pt-[56.25%] bg-gray-900">
        {event.poster ? (
          <Image
            src={event.poster}
            alt={event.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-red-950/50 to-black flex items-center justify-center p-4">
            <h3 className="text-xl font-bold text-center">{event.name}</h3>
          </div>
        )}
        
        {isToday && !isPast && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-red-600 text-white">
              Today
            </Badge>
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <h3 className="text-lg font-bold truncate">{event.name}</h3>
        
        <div className="mt-3 space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{formattedDate}</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{event.location}</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="w-4 h-4 mr-2" />
            <span>{totalFights} Fights</span>
          </div>
        </div>
        
        {mainEvent && (
          <div className="mt-4 pt-4 border-t border-red-500/10">
            <p className="text-xs text-muted-foreground mb-1">Main Event</p>
            <p className="font-medium">
              {mainEvent.redCorner?.name || 'TBA'} vs. {mainEvent.blueCorner?.name || 'TBA'}
            </p>
            <div className="flex items-center mt-1">
              <Badge variant="outline" className="text-red-400 border-red-500/30 text-xs">
                {mainEvent.weightClass}
              </Badge>
              {mainEvent.isTitleFight && (
                <Badge variant="outline" className="ml-2 text-yellow-400 border-yellow-500/30 text-xs">
                  Title Fight
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button
          variant="outline"
          className="w-full text-red-400 border-red-500/30 hover:bg-red-950/20"
          asChild
        >
          <Link href={`/events/${event.id}`}>
            {isPast ? 'View Results' : 'Event Details'}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
