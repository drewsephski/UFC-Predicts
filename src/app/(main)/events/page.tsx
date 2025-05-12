"use client";

import React, { useState } from 'react';
import { useUFC } from '@/contexts/ufc-context';
import { Container } from '@/components';
import { LoadingState, ErrorState } from '@/components/ui/loading-state';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EventCard } from '@/components/events/event-card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const EventsPage = () => {
  const { 
    upcomingEvents, 
    pastEvents, 
    loadingEvents, 
    errorEvents, 
    refreshEvents 
  } = useUFC();
  
  const [upcomingSearchQuery, setUpcomingSearchQuery] = useState('');
  const [pastSearchQuery, setPastSearchQuery] = useState('');

  // Filter events based on search query
  const filteredUpcomingEvents = upcomingEvents.filter(event => 
    event.name.toLowerCase().includes(upcomingSearchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(upcomingSearchQuery.toLowerCase())
  );
  
  const filteredPastEvents = pastEvents.filter(event => 
    event.name.toLowerCase().includes(pastSearchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(pastSearchQuery.toLowerCase())
  );

  if (loadingEvents) {
    return <LoadingState text="Loading events..." fullPage />;
  }

  if (errorEvents) {
    return <ErrorState error={errorEvents} fullPage onRetry={refreshEvents} />;
  }

  return (
    <Container className="py-8">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">UFC Events</h1>
          <p className="text-muted-foreground">
            Browse upcoming and past UFC events
          </p>
        </div>
        
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-6">
            <div className="relative max-w-md">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search upcoming events..."
                value={upcomingSearchQuery}
                onChange={(e) => setUpcomingSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            
            {filteredUpcomingEvents.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  {upcomingSearchQuery 
                    ? 'No upcoming events found matching your search' 
                    : 'No upcoming events scheduled at this time'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUpcomingEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="past" className="space-y-6">
            <div className="relative max-w-md">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search past events..."
                value={pastSearchQuery}
                onChange={(e) => setPastSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            
            {filteredPastEvents.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  {pastSearchQuery 
                    ? 'No past events found matching your search' 
                    : 'No past events available'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPastEvents.map((event) => (
                  <EventCard key={event.id} event={event} isPast />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Container>
  );
};

export default EventsPage;
