import { Particles } from "@/components/ui/particles";
import { Button } from "@/components/ui/button";
import { Dumbbell, Users, Scale, Filter } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata = {
  title: "UFC Weight Divisions | UFC Predict",
  description: "Browse UFC fighters by weight division. Explore all UFC weight classes from Heavyweight to Flyweight and Women&apos;s divisions.",
};

export default function DivisionsPage() {
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
            { label: "Divisions" }
          ]}
          className="mb-8"
        />
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            UFC Weight <span className="text-red-500">Divisions</span>
          </h1>
          <div className="flex items-center justify-center mb-4">
            <Scale className="h-6 w-6 text-red-500 mr-2" />
            <p className="text-gray-300">Browse fighters by weight class</p>
          </div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            The UFC organizes fighters into specific weight divisions to ensure fair competition.
            Explore all UFC weight classes and discover the top fighters in each division.
          </p>
        </div>

        <Tabs defaultValue="mens" className="w-full mb-12">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="mens" className="text-lg py-3">Men&apos;s Divisions</TabsTrigger>
            <TabsTrigger value="womens" className="text-lg py-3">Women&apos;s Divisions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="mens">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Heavyweight Division */}
              <div className="bg-black/30 border border-red-500/20 rounded-lg overflow-hidden group">
                <div className="relative h-48">
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10" />
                  <Image 
                    src="/images/divisions/heavyweight.jpg" 
                    alt="UFC Heavyweight Division" 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-white mb-1">Heavyweight</h3>
                  <p className="text-gray-400 text-sm mb-3">265 lbs (120.2 kg)</p>
                  <p className="text-gray-300 mb-4 text-sm">
                    The heaviest weight class in the UFC, featuring the most powerful fighters in the promotion.
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-400">Champion</p>
                      <p className="text-white font-medium">Jon Jones</p>
                    </div>
                    <Button asChild size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                      <Link href="/fighters?division=heavyweight">
                        View Fighters
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Light Heavyweight Division */}
              <div className="bg-black/30 border border-red-500/20 rounded-lg overflow-hidden group">
                <div className="relative h-48">
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10" />
                  <Image 
                    src="/images/divisions/light-heavyweight.jpg" 
                    alt="UFC Light Heavyweight Division" 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-white mb-1">Light Heavyweight</h3>
                  <p className="text-gray-400 text-sm mb-3">205 lbs (93.0 kg)</p>
                  <p className="text-gray-300 mb-4 text-sm">
                    A division known for explosive knockouts and athletic fighters with significant power.
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-400">Champion</p>
                      <p className="text-white font-medium">Alex Pereira</p>
                    </div>
                    <Button asChild size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                      <Link href="/fighters?division=light-heavyweight">
                        View Fighters
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Middleweight Division */}
              <div className="bg-black/30 border border-red-500/20 rounded-lg overflow-hidden group">
                <div className="relative h-48">
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10" />
                  <Image 
                    src="/images/divisions/middleweight.jpg" 
                    alt="UFC Middleweight Division" 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-white mb-1">Middleweight</h3>
                  <p className="text-gray-400 text-sm mb-3">185 lbs (83.9 kg)</p>
                  <p className="text-gray-300 mb-4 text-sm">
                    A balanced division featuring fighters with a mix of power, speed, and technical skill.
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-400">Champion</p>
                      <p className="text-white font-medium">Dricus Du Plessis</p>
                    </div>
                    <Button asChild size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                      <Link href="/fighters?division=middleweight">
                        View Fighters
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Welterweight Division */}
              <div className="bg-black/30 border border-red-500/20 rounded-lg overflow-hidden group">
                <div className="relative h-48">
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10" />
                  <Image 
                    src="/images/divisions/welterweight.jpg" 
                    alt="UFC Welterweight Division" 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-white mb-1">Welterweight</h3>
                  <p className="text-gray-400 text-sm mb-3">170 lbs (77.1 kg)</p>
                  <p className="text-gray-300 mb-4 text-sm">
                    One of the most competitive divisions with a mix of striking and grappling specialists.
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-400">Champion</p>
                      <p className="text-white font-medium">Belal Muhammad</p>
                    </div>
                    <Button asChild size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                      <Link href="/fighters?division=welterweight">
                        View Fighters
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Lightweight Division */}
              <div className="bg-black/30 border border-red-500/20 rounded-lg overflow-hidden group">
                <div className="relative h-48">
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10" />
                  <Image 
                    src="/images/divisions/lightweight.jpg" 
                    alt="UFC Lightweight Division" 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-white mb-1">Lightweight</h3>
                  <p className="text-gray-400 text-sm mb-3">155 lbs (70.3 kg)</p>
                  <p className="text-gray-300 mb-4 text-sm">
                    Often considered the deepest division, featuring fast-paced, technical fighters.
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-400">Champion</p>
                      <p className="text-white font-medium">Islam Makhachev</p>
                    </div>
                    <Button asChild size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                      <Link href="/fighters?division=lightweight">
                        View Fighters
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Featherweight Division */}
              <div className="bg-black/30 border border-red-500/20 rounded-lg overflow-hidden group">
                <div className="relative h-48">
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10" />
                  <Image 
                    src="/images/divisions/featherweight.jpg" 
                    alt="UFC Featherweight Division" 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-white mb-1">Featherweight</h3>
                  <p className="text-gray-400 text-sm mb-3">145 lbs (65.8 kg)</p>
                  <p className="text-gray-300 mb-4 text-sm">
                    Known for speed and technical striking, with some of the most exciting fighters.
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-400">Champion</p>
                      <p className="text-white font-medium">Ilia Topuria</p>
                    </div>
                    <Button asChild size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                      <Link href="/fighters?division=featherweight">
                        View Fighters
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="womens">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Women's Bantamweight Division */}
              <div className="bg-black/30 border border-red-500/20 rounded-lg overflow-hidden group">
                <div className="relative h-48">
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10" />
                  <Image 
                    src="/images/divisions/womens-bantamweight.jpg" 
                    alt="UFC Women&apos;s Bantamweight Division" 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-white mb-1">Women&apos;s Bantamweight</h3>
                  <p className="text-gray-400 text-sm mb-3">135 lbs (61.2 kg)</p>
                  <p className="text-gray-300 mb-4 text-sm">
                    The division that rose to prominence with Ronda Rousey, featuring well-rounded fighters.
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-400">Champion</p>
                      <p className="text-white font-medium">Raquel Pennington</p>
                    </div>
                    <Button asChild size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                      <Link href="/fighters?division=womens-bantamweight">
                        View Fighters
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Women's Flyweight Division */}
              <div className="bg-black/30 border border-red-500/20 rounded-lg overflow-hidden group">
                <div className="relative h-48">
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10" />
                  <Image 
                    src="/images/divisions/womens-flyweight.jpg" 
                    alt="UFC Women&apos;s Flyweight Division" 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-white mb-1">Women&apos;s Flyweight</h3>
                  <p className="text-gray-400 text-sm mb-3">125 lbs (56.7 kg)</p>
                  <p className="text-gray-300 mb-4 text-sm">
                    A relatively new division that has quickly become competitive with technical fighters.
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-400">Champion</p>
                      <p className="text-white font-medium">Alexa Grasso</p>
                    </div>
                    <Button asChild size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                      <Link href="/fighters?division=womens-flyweight">
                        View Fighters
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Women's Strawweight Division */}
              <div className="bg-black/30 border border-red-500/20 rounded-lg overflow-hidden group">
                <div className="relative h-48">
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10" />
                  <Image 
                    src="/images/divisions/womens-strawweight.jpg" 
                    alt="UFC Women&apos;s Strawweight Division" 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-white mb-1">Women&apos;s Strawweight</h3>
                  <p className="text-gray-400 text-sm mb-3">115 lbs (52.2 kg)</p>
                  <p className="text-gray-300 mb-4 text-sm">
                    The lightest women&apos;s division, known for fast-paced action and technical striking.
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-400">Champion</p>
                      <p className="text-white font-medium">Zhang Weili</p>
                    </div>
                    <Button asChild size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                      <Link href="/fighters?division=womens-strawweight">
                        View Fighters
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

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
