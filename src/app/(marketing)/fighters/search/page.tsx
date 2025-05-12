"use client";

import { useState } from "react";
import { Particles } from "@/components/ui/particles";
import { Button } from "@/components/ui/button";
import { Search, Filter, Users, Dumbbell, Flag, Award } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";

export default function FighterSearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [division, setDivision] = useState("all");
  const [country, setCountry] = useState("all");
  const [status, setStatus] = useState("all");
  
  // Mock search results - in a real app, this would be fetched from an API
  const mockResults = [
    {
      id: "jon-jones",
      name: "Jon Jones",
      nickname: "Bones",
      division: "Heavyweight",
      record: "27-1-0",
      country: "USA",
      image: "/images/fighters/jon-jones.jpg"
    },
    {
      id: "israel-adesanya",
      name: "Israel Adesanya",
      nickname: "The Last Stylebender",
      division: "Middleweight",
      record: "24-3-0",
      country: "Nigeria",
      image: "/images/fighters/israel-adesanya.jpg"
    },
    {
      id: "alex-pereira",
      name: "Alex Pereira",
      nickname: "Poatan",
      division: "Light Heavyweight",
      record: "9-2-0",
      country: "Brazil",
      image: "/images/fighters/alex-pereira.jpg"
    }
  ];
  
  // Filter results based on search criteria
  const filteredResults = mockResults.filter(fighter => {
    const matchesSearch = searchQuery === "" || 
      fighter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fighter.nickname?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDivision = division === "all" || fighter.division.toLowerCase() === division.toLowerCase();
    const matchesCountry = country === "all" || fighter.country.toLowerCase() === country.toLowerCase();
    
    return matchesSearch && matchesDivision && matchesCountry;
  });

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-black to-red-950/30">
      <div className="absolute inset-0 z-0">
        <Particles
          className="absolute inset-0 z-0"
          quantity={300}
          color="#ff3333"
          ease={100}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-24">
        <Breadcrumb 
          items={[
            { label: "Home", href: "/" },
            { label: "Fighters", href: "/fighters" },
            { label: "Search" }
          ]}
          className="mb-8"
        />
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Fighter <span className="text-red-500">Search</span>
          </h1>
          <div className="flex items-center justify-center mb-4">
            <Search className="h-6 w-6 text-red-500 mr-2" />
            <p className="text-gray-300">Find UFC fighters by name, division, or country</p>
          </div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Use our advanced search tools to find specific UFC fighters. Search by name, filter by weight division,
            country, or status to discover fighters that match your criteria.
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-black/30 border border-red-500/20 rounded-lg p-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-4">
              <Label htmlFor="search" className="text-white mb-2 block">Fighter Name or Nickname</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input 
                  id="search"
                  type="text"
                  placeholder="Search fighters..."
                  className="pl-10 bg-black/50 border-red-500/30 text-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="division" className="text-white mb-2 block">Weight Division</Label>
              <Select value={division} onValueChange={setDivision}>
                <SelectTrigger id="division" className="bg-black/50 border-red-500/30 text-white">
                  <SelectValue placeholder="All Divisions" />
                </SelectTrigger>
                <SelectContent className="bg-black/90 border-red-500/30 text-white">
                  <SelectItem value="all">All Divisions</SelectItem>
                  <SelectItem value="heavyweight">Heavyweight</SelectItem>
                  <SelectItem value="light heavyweight">Light Heavyweight</SelectItem>
                  <SelectItem value="middleweight">Middleweight</SelectItem>
                  <SelectItem value="welterweight">Welterweight</SelectItem>
                  <SelectItem value="lightweight">Lightweight</SelectItem>
                  <SelectItem value="featherweight">Featherweight</SelectItem>
                  <SelectItem value="bantamweight">Bantamweight</SelectItem>
                  <SelectItem value="flyweight">Flyweight</SelectItem>
                  <SelectItem value="women's bantamweight">Women&apos;s Bantamweight</SelectItem>
                  <SelectItem value="women's flyweight">Women&apos;s Flyweight</SelectItem>
                  <SelectItem value="women's strawweight">Women&apos;s Strawweight</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="country" className="text-white mb-2 block">Country</Label>
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger id="country" className="bg-black/50 border-red-500/30 text-white">
                  <SelectValue placeholder="All Countries" />
                </SelectTrigger>
                <SelectContent className="bg-black/90 border-red-500/30 text-white">
                  <SelectItem value="all">All Countries</SelectItem>
                  <SelectItem value="usa">United States</SelectItem>
                  <SelectItem value="brazil">Brazil</SelectItem>
                  <SelectItem value="russia">Russia</SelectItem>
                  <SelectItem value="nigeria">Nigeria</SelectItem>
                  <SelectItem value="china">China</SelectItem>
                  <SelectItem value="canada">Canada</SelectItem>
                  <SelectItem value="mexico">Mexico</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="status" className="text-white mb-2 block">Fighter Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger id="status" className="bg-black/50 border-red-500/30 text-white">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent className="bg-black/90 border-red-500/30 text-white">
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="champion">Champion</SelectItem>
                  <SelectItem value="retired">Retired</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="md:col-span-4 flex justify-center">
              <Button className="bg-red-600 hover:bg-red-700 text-white px-8">
                <Search className="h-4 w-4 mr-2" />
                Search Fighters
              </Button>
            </div>
          </div>
        </div>

        {/* Search Results */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Search <span className="text-red-500">Results</span></h2>
          
          {filteredResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResults.map((fighter) => (
                <Card key={fighter.id} className="bg-black/30 border border-red-500/20 overflow-hidden group">
                  <div className="relative h-64">
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10" />
                    <Image 
                      src={fighter.image} 
                      alt={fighter.name} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-20">
                      {fighter.division}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-white">{fighter.name}</h3>
                    {fighter.nickname && (
                      <p className="text-red-400 text-sm mb-2">&quot;{fighter.nickname}&quot;</p>
                    )}
                    <div className="flex items-center text-gray-400 text-sm mb-3">
                      <span className="mr-3">{fighter.record}</span>
                      <span className="flex items-center">
                        <Flag className="h-3 w-3 mr-1" />
                        {fighter.country}
                      </span>
                    </div>
                    <Button asChild size="sm" className="w-full bg-red-600 hover:bg-red-700 text-white">
                      <Link href={`/fighters/${fighter.id}`}>
                        View Profile
                      </Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-black/30 border border-red-500/20 rounded-lg">
              <Users className="h-12 w-12 text-red-500/50 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No fighters found</h3>
              <p className="text-gray-400 max-w-md mx-auto">
                No fighters match your search criteria. Try adjusting your filters or search terms.
              </p>
            </div>
          )}
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6 text-white">Explore <span className="text-red-500">More</span></h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white">
              <Link href="/fighters">
                All Fighters
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-red-500/50 text-red-400 hover:text-red-300 hover:bg-red-950/30">
              <Link href="/fighters/champions">
                Current Champions
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
