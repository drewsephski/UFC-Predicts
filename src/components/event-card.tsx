import React from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarRange, MapPin, Clock, Ticket } from 'lucide-react';
import Link from 'next/link';

interface Fight {
  id: string;
  fighter1: {
    name: string;
    country: string;
  };
  fighter2: {
    name: string;
    country: string;
  };
  isTitleFight: boolean;
  weightClass: string;
}

interface EventCardProps {
  id: string;
  name: string;
  date: string;
  venue: string;
  location: string;
  image: string;
  mainCard: Fight[];
  isPPV: boolean;
}

export const EventCard: React.FC<EventCardProps> = ({
  id,
  name,
  date,
  venue,
  location,
  image,
  mainCard,
  isPPV,
}) => {
  // Format date
  const eventDate = new Date(date);
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  // Format time
  const formattedTime = eventDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <div className="bg-black/30 border border-red-500/20 rounded-lg overflow-hidden hover:border-red-500/50 transition-colors">
      <div className="relative h-48 w-full">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-3 w-full">
          <h3 className="font-bold text-white text-lg">{name}</h3>
          <div className="flex items-center text-gray-300 text-sm">
            <CalendarRange className="h-3 w-3 mr-1" />
            {formattedDate}
            <span className="mx-2">•</span>
            <Clock className="h-3 w-3 mr-1" />
            {formattedTime}
          </div>
        </div>
        {isPPV && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-red-600 text-white border-none">
              PPV
            </Badge>
          </div>
        )}
      </div>
      
      <div className="p-3">
        <div className="flex items-center text-gray-400 text-sm mb-3">
          <MapPin className="h-3 w-3 mr-1" />
          {venue}, {location}
        </div>
        
        <div className="bg-black/50 p-2 rounded-lg border border-red-500/10 mb-3">
          <p className="text-xs text-gray-400 mb-2">Main Card</p>
          <div className="space-y-2">
            {mainCard.slice(0, 3).map((fight) => (
              <div key={fight.id} className="flex justify-between items-center">
                <div className="text-sm">
                  <span className="text-white">{fight.fighter1.name}</span>
                  <span className="text-red-500 mx-1">vs</span>
                  <span className="text-white">{fight.fighter2.name}</span>
                </div>
                {fight.isTitleFight && (
                  <Badge variant="outline" className="text-xs bg-black/70 text-gray-300 border-red-500/30">
                    Title
                  </Badge>
                )}
              </div>
            ))}
            {mainCard.length > 3 && (
              <p className="text-xs text-gray-400 text-center">+ {mainCard.length - 3} more fights</p>
            )}
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button asChild className="flex-1 bg-red-600 hover:bg-red-700 text-white">
            <Link href={`/events/${id}`}>
              View Details
            </Link>
          </Button>
          <Button variant="outline" size="icon" className="border-red-500/50 hover:bg-red-500/10 text-red-400 hover:text-red-300">
            <Ticket className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
