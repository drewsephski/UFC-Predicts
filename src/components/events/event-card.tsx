"use client";

import React from 'react';
import type { Event } from '@/contexts/ufc-context';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/functions';
import { CardBase } from '@/components/ui/card-base'; // Import CardBase

interface EventCardProps {
  event: Event;
  isPast?: boolean;
  className?: string;
}

export function EventCard({ event, isPast = false, className }: EventCardProps) {
  const eventDate = new Date(event.date);
  const isToday = new Date().toDateString() === eventDate.toDateString();
  
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  
  const mainCardCount = event.mainCard?.length || 0;
  const prelimCardCount = event.prelimCard?.length || 0;
  const totalFights = mainCardCount + prelimCardCount;
  
  const mainEvent = event.mainCard?.find(fight => fight.isMainEvent);

  const imageContent = (
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
           {/* Intentionally empty or with a generic placeholder, as title is in titleSlot */}
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
  );

  const titleContent = (
    <h3 className="text-lg font-bold truncate">{event.name}</h3>
  );

  return (
    <CardBase
      className={cn(
        "bg-black/70 border-red-500/30 h-full",
        className
      )}
      imageSlot={imageContent}
      titleSlot={titleContent}
    >
      {/* Original CardContent children */}
      <div className="mt-3 space-y-2"> {/* This div was part of original CardContent after the h3 title */}
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
      
      {/* Original CardFooter content */}
      <div className="mt-4 pt-4"> {/* Wrapper to help space the button like a footer */}
        <Button
          variant="outline"
          className="w-full text-red-400 border-red-500/30 hover:bg-red-950/20"
          asChild
        >
          <Link href={`/events/${event.id}`}>
            {isPast ? 'View Results' : 'Event Details'}
          </Link>
        </Button>
      </div>
    </CardBase>
  );
}
