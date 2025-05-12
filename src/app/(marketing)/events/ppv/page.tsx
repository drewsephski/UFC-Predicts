import { Particles } from "@/components/ui/particles";
import { Button } from "@/components/ui/button";
import { CalendarRange, Clock, MapPin, Trophy, Users, Filter, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "UFC Pay-Per-View Events | UFC Predict",
  description: "Browse upcoming and past UFC Pay-Per-View events. Get details on main card fights, predictions, and analysis for the biggest UFC events.",
};

export default function PPVEventsPage() {
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
            { label: "Pay-Per-View" }
          ]}
          className="mb-8"
        />
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            UFC <span className="text-red-500">Pay-Per-View</span> Events
          </h1>
          <div className="flex items-center justify-center mb-4">
            <Trophy className="h-6 w-6 text-red-500 mr-2" />
            <p className="text-gray-300">The biggest and most prestigious UFC events</p>
          </div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            UFC Pay-Per-View events feature the most anticipated matchups, championship bouts, and
            superstar fighters. Browse upcoming and past PPV events, get fight details, and access
            exclusive predictions and analysis.
          </p>
        </div>

        <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="border-red-500/30 text-white hover:bg-red-950/30">
              <Filter className="h-4 w-4 mr-2 text-red-400" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="border-red-500/30 text-white hover:bg-red-950/30">
              Upcoming
            </Button>
            <Button variant="outline" size="sm" className="border-red-500/30 text-white hover:bg-red-950/30">
              2024
            </Button>
            <Button variant="outline" size="sm" className="border-red-500/30 text-white hover:bg-red-950/30">
              2023
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="border-red-500/30 text-white hover:bg-red-950/30">
              Title Fights
            </Button>
            <Button variant="outline" size="sm" className="border-red-500/30 text-white hover:bg-red-950/30">
              Main Events
            </Button>
          </div>
        </div>

        {/* Upcoming PPV Events */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-white">Upcoming <span className="text-red-500">PPV</span> Events</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* UFC 302 */}
            <div className="bg-black/30 border border-red-500/20 rounded-lg overflow-hidden group">
              <div className="relative h-48">
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
                <Image 
                  src="/images/events/ufc-302.jpg" 
                  alt="UFC 302" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <Badge className="absolute top-2 right-2 bg-red-500 text-white border-none z-20">
                  Upcoming
                </Badge>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-white mb-1">UFC 302</h3>
                <div className="flex items-center text-gray-400 text-sm mb-3">
                  <CalendarRange className="h-3.5 w-3.5 mr-1.5" />
                  <span className="mr-3">June 1, 2024</span>
                  <MapPin className="h-3.5 w-3.5 mr-1.5" />
                  <span>Newark, NJ</span>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <span className="text-white font-medium">Islam Makhachev</span>
                      <Badge className="ml-2 bg-yellow-500 text-black border-none">C</Badge>
                    </div>
                    <span className="text-white">vs</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="text-white">Dustin Poirier</span>
                    </div>
                    <Badge className="bg-red-500/20 text-red-300 border-red-500/30">
                      Lightweight Title
                    </Badge>
                  </div>
                </div>
                <Button asChild size="sm" className="w-full bg-red-600 hover:bg-red-700 text-white">
                  <Link href="/events/ufc-302">
                    View Details
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* UFC 303 */}
            <div className="bg-black/30 border border-red-500/20 rounded-lg overflow-hidden group">
              <div className="relative h-48">
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
                <Image 
                  src="/images/events/ufc-303.jpg" 
                  alt="UFC 303" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <Badge className="absolute top-2 right-2 bg-red-500 text-white border-none z-20">
                  Upcoming
                </Badge>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-white mb-1">UFC 303</h3>
                <div className="flex items-center text-gray-400 text-sm mb-3">
                  <CalendarRange className="h-3.5 w-3.5 mr-1.5" />
                  <span className="mr-3">June 29, 2024</span>
                  <MapPin className="h-3.5 w-3.5 mr-1.5" />
                  <span>Las Vegas, NV</span>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <span className="text-white font-medium">Conor McGregor</span>
                    </div>
                    <span className="text-white">vs</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="text-white">Michael Chandler</span>
                    </div>
                    <Badge className="bg-red-500/20 text-red-300 border-red-500/30">
                      Welterweight
                    </Badge>
                  </div>
                </div>
                <Button asChild size="sm" className="w-full bg-red-600 hover:bg-red-700 text-white">
                  <Link href="/events/ufc-303">
                    View Details
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent PPV Events */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-white">Recent <span className="text-red-500">PPV</span> Events</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* UFC 301 */}
            <div className="bg-black/30 border border-red-500/20 rounded-lg overflow-hidden group">
              <div className="relative h-48">
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
                <Image 
                  src="/images/events/ufc-301.jpg" 
                  alt="UFC 301" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <Badge className="absolute top-2 right-2 bg-blue-500 text-white border-none z-20">
                  Completed
                </Badge>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-white mb-1">UFC 301</h3>
                <div className="flex items-center text-gray-400 text-sm mb-3">
                  <CalendarRange className="h-3.5 w-3.5 mr-1.5" />
                  <span className="mr-3">May 4, 2024</span>
                  <MapPin className="h-3.5 w-3.5 mr-1.5" />
                  <span>Rio de Janeiro, Brazil</span>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <span className="text-white font-medium">Alexandre Pantoja</span>
                      <Badge className="ml-2 bg-green-600 text-white border-none">W</Badge>
                    </div>
                    <span className="text-white">Decision</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="text-gray-400">Steve Erceg</span>
                      <Badge className="ml-2 bg-red-600 text-white border-none">L</Badge>
                    </div>
                  </div>
                </div>
                <Button asChild size="sm" className="w-full bg-red-600 hover:bg-red-700 text-white">
                  <Link href="/events/ufc-301">
                    View Results
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* UFC 300 */}
            <div className="bg-black/30 border border-red-500/20 rounded-lg overflow-hidden group">
              <div className="relative h-48">
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
                <Image 
                  src="/images/events/ufc-300.jpg" 
                  alt="UFC 300" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 flex gap-1 z-20">
                  <Badge className="bg-blue-500 text-white border-none">
                    Completed
                  </Badge>
                  <Badge className="bg-yellow-500 text-black border-none">
                    <Star className="h-3 w-3 mr-1" fill="currentColor" />
                    Milestone
                  </Badge>
                </div>
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
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
                <Image 
                  src="/images/events/ufc-299.jpg" 
                  alt="UFC 299" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <Badge className="absolute top-2 right-2 bg-blue-500 text-white border-none z-20">
                  Completed
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
                      <span className="text-white font-medium">Sean O'Malley</span>
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
          </div>
        </div>

        <div className="flex justify-center mb-12">
          <Button variant="outline" size="lg" className="border-red-500/50 text-red-400 hover:text-red-300 hover:bg-red-950/30">
            View All PPV Events
          </Button>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6 text-white">Explore <span className="text-red-500">More</span> Events</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white">
              <Link href="/events">
                All Events
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-red-500/50 text-red-400 hover:text-red-300 hover:bg-red-950/30">
              <Link href="/events/fight-nights">
                Fight Nights
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
