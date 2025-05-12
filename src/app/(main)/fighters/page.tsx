"use client";

import React, { useState, useEffect } from 'react';
import { useUFC, Fighter } from '@/contexts/ufc-context';
import { Container } from '@/components';
import { LoadingState, ErrorState } from '@/components/ui/loading-state';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Search, Filter } from 'lucide-react';
import { FighterCard } from '@/components/fighters/fighter-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// UFC Weight Divisions
const WEIGHT_DIVISIONS = [
  'Flyweight',
  'Bantamweight',
  'Featherweight',
  'Lightweight',
  'Welterweight',
  'Middleweight',
  'Light Heavyweight',
  'Heavyweight',
  "Women's Strawweight",
  "Women's Flyweight",
  "Women's Bantamweight",
  "Women's Featherweight"
];

const FightersPage = () => {
  const { fighters, loadingFighters, errorFighters, refreshFighters } = useUFC();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDivision, setSelectedDivision] = useState<string>('');
  const [showChampionsOnly, setShowChampionsOnly] = useState(false);
  const [filteredFighters, setFilteredFighters] = useState<Fighter[]>([]);
  const [isFiltering, setIsFiltering] = useState(false);

  // Apply filters whenever the dependencies change
  useEffect(() => {
    if (!loadingFighters && fighters.length > 0) {
      setIsFiltering(true);
      
      // Apply filters
      let result = [...fighters];
      
      // Filter by search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        result = result.filter(fighter => 
          fighter.name.toLowerCase().includes(query) || 
          (fighter.nickname && fighter.nickname.toLowerCase().includes(query))
        );
      }
      
      // Filter by division
      if (selectedDivision) {
        result = result.filter(fighter => fighter.division === selectedDivision);
      }
      
      // Filter champions only
      if (showChampionsOnly) {
        result = result.filter(fighter => fighter.isChampion);
      }
      
      // Sort by ranking and champion status
      result.sort((a, b) => {
        // Champions first
        if (a.isChampion && !b.isChampion) return -1;
        if (!a.isChampion && b.isChampion) return 1;
        
        // Then by ranking
        if (a.ranking && b.ranking) return a.ranking - b.ranking;
        if (a.ranking && !b.ranking) return -1;
        if (!a.ranking && b.ranking) return 1;
        
        // Then alphabetically
        return a.name.localeCompare(b.name);
      });
      
      setFilteredFighters(result);
      setIsFiltering(false);
    }
  }, [fighters, searchQuery, selectedDivision, showChampionsOnly, loadingFighters]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedDivision('');
    setShowChampionsOnly(false);
  };

  if (loadingFighters) {
    return <LoadingState text="Loading fighters..." fullPage />;
  }

  if (errorFighters) {
    return <ErrorState error={errorFighters} fullPage onRetry={refreshFighters} />;
  }

  return (
    <Container className="py-8">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">UFC Fighters</h1>
          <p className="text-muted-foreground">
            Browse and search for UFC fighters across all weight divisions
          </p>
        </div>
        
        {/* Filters */}
        <div className="bg-black/70 border border-red-500/30 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="search" className="mb-2 block">Search</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by name or nickname"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="division" className="mb-2 block">Weight Division</Label>
              <Select value={selectedDivision} onValueChange={setSelectedDivision}>
                <SelectTrigger id="division">
                  <SelectValue placeholder="All Divisions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Divisions</SelectItem>
                  {WEIGHT_DIVISIONS.map((division) => (
                    <SelectItem key={division} value={division}>
                      {division}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex flex-col">
              <Label className="mb-2 block">Options</Label>
              <div className="flex items-center h-10">
                <Button
                  variant={showChampionsOnly ? "default" : "outline"}
                  onClick={() => setShowChampionsOnly(!showChampionsOnly)}
                  className={`mr-2 ${showChampionsOnly ? 'bg-red-600 hover:bg-red-700 text-white' : 'text-red-400 border-red-500/30 hover:bg-red-950/20'}`}
                >
                  Champions Only
                </Button>
                
                <Button
                  variant="ghost"
                  onClick={clearFilters}
                  className="text-muted-foreground"
                  disabled={!searchQuery && !selectedDivision && !showChampionsOnly}
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Results */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {filteredFighters.length} {filteredFighters.length === 1 ? 'Fighter' : 'Fighters'}
            </h2>
            <div className="flex space-x-2">
              {selectedDivision && (
                <Badge variant="outline" className="text-red-400 border-red-500/30">
                  {selectedDivision}
                </Badge>
              )}
              {showChampionsOnly && (
                <Badge variant="outline" className="text-red-400 border-red-500/30">
                  Champions Only
                </Badge>
              )}
            </div>
          </div>
          
          {isFiltering ? (
            <LoadingState text="Filtering fighters..." />
          ) : filteredFighters.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No fighters found matching your criteria</p>
              <Button
                variant="outline"
                onClick={clearFilters}
                className="mt-4 text-red-400 border-red-500/30 hover:bg-red-950/20"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredFighters.map((fighter) => (
                <FighterCard key={fighter.id} fighter={fighter} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default FightersPage;
