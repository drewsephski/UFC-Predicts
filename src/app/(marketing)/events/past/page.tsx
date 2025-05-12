import { Particles } from "@/components/ui/particles";
import { Button } from "@/components/ui/button";
import { CalendarRange, Clock, MapPin, Trophy, Users, Filter } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Past UFC Events | UFC Predict",
  description: "Browse results and statistics from previous UFC events. Explore fight outcomes, performance metrics, and fighter statistics from past UFC cards.",
};

export default function PastEventsPage() {
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
            { label: "Events", href: "/events" },
            { label: "Past Events" }
          ]}
          className="mb-8"
        />
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Past UFC <span className="text-red-500">Events</span>
          </h1>
          <div className="flex items-center justify-center mb-4">
            <CalendarRange className="h-6 w-6 text-red-500 mr-2" />
            <p className="text-gray-300">Results and statistics from previous UFC events</p>
          </div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Browse through the archive of past UFC events. View fight results, performance statistics,
            and detailed breakdowns of previous UFC cards from around the world.
          </p>
        </div>

        <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="border-red-500/30 text-white hover:bg-red-950/30">
              <Filter className="h-4 w-4 mr-2 text-red-400" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="border-red-500/30 text-white hover:bg-red-950/30">
              2024
            </Button>
            <Button variant="outline" size="sm" className="border-red-500/30 text-white hover:bg-red-950/30">
              2023
            </Button>
            <Button variant="outline" size="sm" className="border-red-500/30 text-white hover:bg-red-950/30">
              2022
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="border-red-500/30 text-white hover:bg-red-950/30">
              PPV Events
            </Button>
            <Button variant="outline" size="sm" className="border-red-500/30 text-white hover:bg-red-950/30">
              Fight Nights
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full mb-12">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="all" className="text-lg py-3">All Events</TabsTrigger>
            <TabsTrigger value="ppv" className="text-lg py-3">PPV</TabsTrigger>
            <TabsTrigger value="fight-night" className="text-lg py-3">Fight Night</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* UFC 300 */}
              <div className="bg-black/30 border border-red-500/20 rounded-lg overflow-hidden group">
                <div className="relative h-48">
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10" />
                  <Image 
                    src="/images/events/ufc-300.jpg" 
                    alt="UFC 300" 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <Badge className="absolute top-2 right-2 bg-red-500 text-white border-none z-20">
                    PPV
                  </Badge>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-white mb-1">UFC 300</h3>
                  <div className="flex items-center text-gray-400 text-sm mb-3">
                    <CalendarRange className="h-3.5 w-3.5 mr-1.5" />
                    <span className="mr-3">April 13, 2024</span>
                    <MapPin className="h-3.5 w-3.5 mr-1.5" />
                    <span>Las Vegas, NV</span>
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <span className="text-white font-medium">Alex Pereira</span>
                        <Badge className="ml-2 bg-green-600 text-white border-none">W</Badge>
                      </div>
                      <span className="text-white">KO R1</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="text-gray-400">Jamahal Hill</span>
                        <Badge className="ml-2 bg-red-600 text-white border-none">L</Badge>
                      </div>
                    </div>
                  </div>
                  <Button asChild size="sm" className="w-full bg-red-600 hover:bg-red-700 text-white">
                    <Link href="/events/ufc-300">
                      View Results
                    </Link>
                  </Button>
                </div>
              </div>
              
              {/* UFC 299 */}
              <div className="bg-black/30 border border-red-500/20 rounded-lg overflow-hidden group">
                <div className="relative h-48">
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10" />
                  <Image 
                    src="/images/events/ufc-299.jpg" 
                    alt="UFC 299" 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <Badge className="absolute top-2 right-2 bg-red-500 text-white border-none z-20">
                    PPV
                  </Badge>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-white mb-1">UFC 299</h3>
                  <div className="flex items-center text-gray-400 text-sm mb-3">
                    <CalendarRange className="h-3.5 w-3.5 mr-1.5" />
                    <span className="mr-3">March 9, 2024</span>
                    <MapPin className="h-3.5 w-3.5 mr-1.5" />
                    <span>Miami, FL</span>
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <span className="text-white font-medium">Sean O&apos;Malley</span>
                        <Badge className="ml-2 bg-green-600 text-white border-none">W</Badge>
                      </div>
                      <span className="text-white">Decision</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="text-gray-400">Marlon Vera</span>
                        <Badge className="ml-2 bg-red-600 text-white border-none">L</Badge>
                      </div>
                    </div>
                  </div>
                  <Button asChild size="sm" className="w-full bg-red-600 hover:bg-red-700 text-white">
                    <Link href="/events/ufc-299">
                      View Results
                    </Link>
                  </Button>
                </div>
              </div>
              
              {/* UFC 298 */}
              <div className="bg-black/30 border border-red-500/20 rounded-lg overflow-hidden group">
                <div className="relative h-48">
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10" />
                  <Image 
                    src="/images/events/ufc-298.jpg" 
                    alt="UFC 298" 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <Badge className="absolute top-2 right-2 bg-red-500 text-white border-none z-20">
                    PPV
                  </Badge>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-white mb-1">UFC 298</h3>
                  <div className="flex items-center text-gray-400 text-sm mb-3">
                    <CalendarRange className="h-3.5 w-3.5 mr-1.5" />
                    <span className="mr-3">February 17, 2024</span>
                    <MapPin className="h-3.5 w-3.5 mr-1.5" />
                    <span>Anaheim, CA</span>
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <span className="text-white font-medium">Ilia Topuria</span>
                        <Badge className="ml-2 bg-green-600 text-white border-none">W</Badge>
                      </div>
                      <span className="text-white">KO R2</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="text-gray-400">Alexander Volkanovski</span>
                        <Badge className="ml-2 bg-red-600 text-white border-none">L</Badge>
                      </div>
                    </div>
                  </div>
                  <Button asChild size="sm" className="w-full bg-red-600 hover:bg-red-700 text-white">
                    <Link href="/events/ufc-298">
                      View Results
                    </Link>
                  </Button>
                </div>
              </div>
              
              {/* UFC Fight Night: Hermansson vs. Pyfer */}
              <div className="bg-black/30 border border-red-500/20 rounded-lg overflow-hidden group">
                <div className="relative h-48">
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10" />
                  <Image 
                    src="/images/events/ufc-fight-night-hermansson-pyfer.jpg" 
                    alt="UFC Fight Night: Hermansson vs. Pyfer" 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <Badge className="absolute top-2 right-2 bg-blue-500 text-white border-none z-20">
                    Fight Night
                  </Badge>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-white mb-1">UFC Fight Night</h3>
                  <p className="text-gray-400 text-sm mb-2">Hermansson vs. Pyfer</p>
                  <div className="flex items-center text-gray-400 text-sm mb-3">
                    <CalendarRange className="h-3.5 w-3.5 mr-1.5" />
                    <span className="mr-3">February 10, 2024</span>
                    <MapPin className="h-3.5 w-3.5 mr-1.5" />
                    <span>Las Vegas, NV</span>
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <span className="text-white font-medium">Joe Pyfer</span>
                        <Badge className="ml-2 bg-green-600 text-white border-none">W</Badge>
                      </div>
                      <span className="text-white">Decision</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="text-gray-400">Jack Hermansson</span>
                        <Badge className="ml-2 bg-red-600 text-white border-none">L</Badge>
                      </div>
                    </div>
                  </div>
                  <Button asChild size="sm" className="w-full bg-red-600 hover:bg-red-700 text-white">
                    <Link href="/events/ufc-fight-night-hermansson-pyfer">
                      View Results
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="ppv">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* PPV events would be listed here */}
              {/* For brevity, I'm not duplicating the content */}
            </div>
          </TabsContent>
          
          <TabsContent value="fight-night">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Fight Night events would be listed here */}
              {/* For brevity, I'm not duplicating the content */}
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-center mb-12">
          <Button variant="outline" size="lg" className="border-red-500/50 text-red-400 hover:text-red-300 hover:bg-red-950/30">
            Load More Events
          </Button>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6 text-white">Explore <span className="text-red-500">More</span></h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white">
              <Link href="/events">
                Upcoming Events
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-red-500/50 text-red-400 hover:text-red-300 hover:bg-red-950/30">
              <Link href="/predictions">
                Fight Predictions
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
