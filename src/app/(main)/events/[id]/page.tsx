"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useUFC, Event } from '@/contexts/ufc-context';
import { Container } from '@/components';
import { LoadingState, ErrorState } from '@/components/ui/loading-state';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Share2, Trophy } from 'lucide-react';
import Image from 'next/image';
import { FightCard } from '@/components/events/fight-card';
import { toast } from 'sonner';

const EventDetailPage = () => {
  const params = useParams();
  const eventId = params.id as string;
  
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`/api/events/${eventId}`);
        if (!response.ok) throw new Error('Failed to fetch event details');
        
        const data = await response.json();
        setEvent(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchEventDetails();
  }, [eventId]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event?.name || 'UFC Event',
        text: `Check out this UFC event: ${event?.name}`,
        url: window.location.href,
      })
      .catch(() => {
        // Copy to clipboard as fallback
        navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard');
      });
    } else {
      // Copy to clipboard as fallback
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard');
    }
  };

  if (isLoading) {
    return <LoadingState text="Loading event details..." fullPage />;
  }

  if (error) {
    return <ErrorState error={error} fullPage />;
  }

  if (!event) {
    return <ErrorState error="Event not found" fullPage />;
  }

  const eventDate = new Date(event.date);
  const isPastEvent = eventDate < new Date();
  
  // Format date: "Saturday, January 1, 2022"
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  
  // Format time: "10:00 PM ET"
  const formattedTime = eventDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short'
  });

  return (
    <Container className="py-8">
      <div className="flex flex-col space-y-8">
        {/* Event Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Event Poster */}
          <div className="lg:col-span-1">
            <div className="relative aspect-[2/3] rounded-lg overflow-hidden border border-red-500/30">
              {event.poster ? (
                <Image
                  src={event.poster}
                  alt={event.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-b from-red-950/50 to-black flex items-center justify-center p-4">
                  <h2 className="text-2xl font-bold text-center">{event.name}</h2>
                </div>
              )}
            </div>
          </div>
          
          {/* Event Details */}
          <div className="lg:col-span-2">
            <Card className="bg-black/70 border-red-500/30 h-full">
              <CardHeader>
                <CardTitle className="text-2xl md:text-3xl">{event.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-3 text-red-500" />
                    <span>{formattedDate}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-3 text-red-500" />
                    <span>{formattedTime}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-3 text-red-500" />
                    <span>{event.location}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant="outline" 
                    className="text-red-400 border-red-500/30 hover:bg-red-950/20"
                    onClick={handleShare}
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Event Info</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Main Card</p>
                      <p className="font-medium">{event.mainCard.length} Fights</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Prelims</p>
                      <p className="font-medium">{event.prelimCard.length} Fights</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Fight Cards */}
        <Tabs defaultValue="main-card" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="main-card">Main Card</TabsTrigger>
            <TabsTrigger value="prelims">Prelims</TabsTrigger>
          </TabsList>
          
          <TabsContent value="main-card" className="space-y-6">
            {event.mainCard.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No main card fights announced yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {event.mainCard
                  .sort((a, b) => (a.isMainEvent ? -1 : b.isMainEvent ? 1 : 0))
                  .map((fight) => (
                    <FightCard 
                      key={fight.id} 
                      fight={fight} 
                      isPast={isPastEvent} 
                    />
                  ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="prelims" className="space-y-6">
            {event.prelimCard.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No preliminary fights announced yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {event.prelimCard.map((fight) => (
                  <FightCard 
                    key={fight.id} 
                    fight={fight} 
                    isPast={isPastEvent} 
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Container>
  );
};

export default EventDetailPage;
