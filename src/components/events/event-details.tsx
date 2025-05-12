"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, MapPinIcon, ClockIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import LoadingIcon from "@/components/ui/loading-icon";
import { FightCard } from "./fight-card";
import { useEvent } from "@/hooks";

interface EventDetailsProps {
  eventId: string;
}

export const EventDetails = ({ eventId }: EventDetailsProps) => {
  const { event, isLoading, error } = useEvent(eventId);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingIcon size="lg" />
      </div>
    );
  }
  
  if (error || !event) {
    return (
      <div className="text-center text-red-500 p-8">
        <p>Error loading event details: {error || "Event not found"}</p>
      </div>
    );
  }
  
  const eventDate = new Date(event.date);
  
  return (
    <div className="space-y-8">
      <Card className="bg-black/70 border-red-500/30 overflow-hidden">
        <div className="relative h-40 bg-gradient-to-r from-red-900 to-black">
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white text-center px-4">
              {event.name}
            </h1>
          </div>
        </div>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center">
              <CalendarIcon className="w-5 h-5 mr-2 text-red-500" />
              <span>{format(eventDate, "MMMM d, yyyy")}</span>
            </div>
            <div className="flex items-center">
              <ClockIcon className="w-5 h-5 mr-2 text-red-500" />
              <span>{format(eventDate, "h:mm a")}</span>
            </div>
            <div className="flex items-center">
              <MapPinIcon className="w-5 h-5 mr-2 text-red-500" />
              <span>{event.venue.name}, {event.venue.city}, {event.venue.country}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Badge className="mr-2 bg-red-600">Main Card</Badge>
          </h2>
          <div className="space-y-4">
            {event.mainCard.map((fight) => (
              <FightCard key={fight.id} fight={fight} />
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Badge className="mr-2 bg-gray-700">Preliminary Card</Badge>
          </h2>
          <div className="space-y-4">
            {event.prelimCard.map((fight) => (
              <FightCard key={fight.id} fight={fight} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
