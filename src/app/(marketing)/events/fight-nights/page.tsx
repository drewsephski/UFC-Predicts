import { Particles } from "@/components/ui/particles";
import { Button } from "@/components/ui/button";
import { CalendarRange, Clock, MapPin, Swords, Users, Filter } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "UFC Fight Nights | UFC Predict",
  description: "Browse upcoming and past UFC Fight Night events. Get details on main card fights, predictions, and analysis for UFC Fight Night events.",
};

export default function FightNightsPage() {
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
            { label: "Fight Nights" }
          ]}
          className="mb-8"
        />
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            UFC <span className="text-red-500">Fight Night</span> Events
          </h1>
          <div className="flex items-center justify-center mb-4">
            <Swords className="h-6 w-6 text-red-500 mr-2" />
            <p className="text-gray-300">Weekly UFC events showcasing rising talent and contenders</p>
          </div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            UFC Fight Night events feature exciting matchups between established fighters and rising stars.
            These events often serve as a platform for fighters to earn title shots and build their reputation
            in the UFC.
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
              APEX Events
            </Button>
            <Button variant="outline" size="sm" className="border-red-500/30 text-white hover:bg-red-950/30">
              International
            </Button>
          </div>
        </div>

        {/* Upcoming Fight Nights */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-white">Upcoming <span className="text-red-500">Fight Nights</span></h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* UFC Fight Night: Cannonier vs. Imavov */}
            <div className="bg-black/30 border border-red-500/20 rounded-lg overflow-hidden group">
              <div className="relative h-48">
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
                <Image 
                  src="/images/events/ufc-fight-night-cannonier-imavov.jpg" 
                  alt="UFC Fight Night: Cannonier vs. Imavov" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <Badge className="absolute top-2 right-2 bg-red-500 text-white border-none z-20">
                  Upcoming
                </Badge>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-white mb-1">UFC Fight Night</h3>
                <p className="text-gray-400 text-sm mb-2">Cannonier vs. Imavov</p>
                <div className="flex items-center text-gray-400 text-sm mb-3">
                  <CalendarRange className="h-3.5 w-3.5 mr-1.5" />
                  <span className="mr-3">June 15, 2024</span>
                  <MapPin className="h-3.5 w-3.5 mr-1.5" />
                  <span>Las Vegas, NV</span>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <span className="text-white font-medium">Jared Cannonier</span>
                    </div>
                    <span className="text-white">vs</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="text-white">Nassourdine Imavov</span>
                    </div>
                    <Badge className="bg-red-500/20 text-red-300 border-red-500/30">
                      Middleweight
                    </Badge>
                  </div>
                </div>
                <Button asChild size="sm" className="w-full bg-red-600 hover:bg-red-700 text-white">
                  <Link href="/events/ufc-fight-night-cannonier-imavov">
                    View Details
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* UFC Fight Night: Moreno vs. Royval 2 */}
            <div className="bg-black/30 border border-red-500/20 rounded-lg overflow-hidden group">
              <div className="relative h-48">
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
                <Image 
                  src="/images/events/ufc-fight-night-moreno-royval.jpg" 
                  alt="UFC Fight Night: Moreno vs. Royval 2" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <Badge className="absolute top-2 right-2 bg-red-500 text-white border-none z-20">
                  Upcoming
                </Badge>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-white mb-1">UFC Fight Night</h3>
                <p className="text-gray-400 text-sm mb-2">Moreno vs. Royval 2</p>
                <div className="flex items-center text-gray-400 text-sm mb-3">
                  <CalendarRange className="h-3.5 w-3.5 mr-1.5" />
                  <span className="mr-3">July 20, 2024</span>
                  <MapPin className="h-3.5 w-3.5 mr-1.5" />
                  <span>Mexico City, Mexico</span>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <span className="text-white font-medium">Brandon Moreno</span>
                    </div>
                    <span className="text-white">vs</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="text-white">Brandon Royval</span>
                    </div>
                    <Badge className="bg-red-500/20 text-red-300 border-red-500/30">
                      Flyweight
                    </Badge>
                  </div>
                </div>
                <Button asChild size="sm" className="w-full bg-red-600 hover:bg-red-700 text-white">
                  <Link href="/events/ufc-fight-night-moreno-royval">
                    View Details
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Fight Nights */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-white">Recent <span className="text-red-500">Fight Nights</span></h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* UFC Fight Night: Blanchfield vs. Fiorot */}
            <div className="bg-black/30 border border-red-500/20 rounded-lg overflow-hidden group">
              <div className="relative h-48">
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
                <Image 
                  src="/images/events/ufc-fight-night-blanchfield-fiorot.jpg" 
                  alt="UFC Fight Night: Blanchfield vs. Fiorot" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <Badge className="absolute top-2 right-2 bg-blue-500 text-white border-none z-20">
                  Completed
                </Badge>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-white mb-1">UFC Fight Night</h3>
                <p className="text-gray-400 text-sm mb-2">Blanchfield vs. Fiorot</p>
                <div className="flex items-center text-gray-400 text-sm mb-3">
                  <CalendarRange className="h-3.5 w-3.5 mr-1.5" />
                  <span className="mr-3">March 30, 2024</span>
                  <MapPin className="h-3.5 w-3.5 mr-1.5" />
                  <span>Atlantic City, NJ</span>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <span className="text-white font-medium">Manon Fiorot</span>
                      <Badge className="ml-2 bg-green-600 text-white border-none">W</Badge>
                    </div>
                    <span className="text-white">Decision</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="text-gray-400">Erin Blanchfield</span>
                      <Badge className="ml-2 bg-red-600 text-white border-none">L</Badge>
                    </div>
                  </div>
                </div>
                <Button asChild size="sm" className="w-full bg-red-600 hover:bg-red-700 text-white">
                  <Link href="/events/ufc-fight-night-blanchfield-fiorot">
                    View Results
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* UFC Fight Night: Tuivasa vs. Nascimento */}
            <div className="bg-black/30 border border-red-500/20 rounded-lg overflow-hidden group">
              <div className="relative h-48">
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
                <Image 
                  src="/images/events/ufc-fight-night-tuivasa-nascimento.jpg" 
                  alt="UFC Fight Night: Tuivasa vs. Nascimento" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <Badge className="absolute top-2 right-2 bg-blue-500 text-white border-none z-20">
                  Completed
                </Badge>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-white mb-1">UFC Fight Night</h3>
                <p className="text-gray-400 text-sm mb-2">Tuivasa vs. Nascimento</p>
                <div className="flex items-center text-gray-400 text-sm mb-3">
                  <CalendarRange className="h-3.5 w-3.5 mr-1.5" />
                  <span className="mr-3">March 16, 2024</span>
                  <MapPin className="h-3.5 w-3.5 mr-1.5" />
                  <span>Las Vegas, NV</span>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <span className="text-white font-medium">Jailton Nascimento</span>
                      <Badge className="ml-2 bg-green-600 text-white border-none">W</Badge>
                    </div>
                    <span className="text-white">TKO R2</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="text-gray-400">Tai Tuivasa</span>
                      <Badge className="ml-2 bg-red-600 text-white border-none">L</Badge>
                    </div>
                  </div>
                </div>
                <Button asChild size="sm" className="w-full bg-red-600 hover:bg-red-700 text-white">
                  <Link href="/events/ufc-fight-night-tuivasa-nascimento">
                    View Results
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* UFC Fight Night: Hermansson vs. Pyfer */}
            <div className="bg-black/30 border border-red-500/20 rounded-lg overflow-hidden group">
              <div className="relative h-48">
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
                <Image 
                  src="/images/events/ufc-fight-night-hermansson-pyfer.jpg" 
                  alt="UFC Fight Night: Hermansson vs. Pyfer" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <Badge className="absolute top-2 right-2 bg-blue-500 text-white border-none z-20">
                  Completed
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
        </div>

        <div className="flex justify-center mb-12">
          <Button variant="outline" size="lg" className="border-red-500/50 text-red-400 hover:text-red-300 hover:bg-red-950/30">
            View All Fight Nights
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
              <Link href="/events/ppv">
                Pay-Per-View Events
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
