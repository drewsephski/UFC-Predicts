import { Particles } from "@/components/ui/particles";
import { Button } from "@/components/ui/button";
import { Trophy, Dumbbell, Award, Medal, Crown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const metadata = {
  title: "UFC Champions | UFC Predict",
  description: "Meet the current UFC champions across all weight divisions. Get detailed profiles, stats, and analysis of the best fighters in the world.",
};

export default function ChampionsPage() {
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
            { label: "Champions" }
          ]}
          className="mb-8"
        />
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            UFC <span className="text-red-500">Champions</span>
          </h1>
          <div className="flex items-center justify-center mb-4">
            <Trophy className="h-6 w-6 text-red-500 mr-2" />
            <p className="text-gray-300">The elite fighters who reign supreme</p>
          </div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Meet the current UFC champions across all weight divisions. These fighters represent the pinnacle
            of mixed martial arts, having defeated the best competitors in their respective weight classes.
          </p>
        </div>

        {/* Men's Champions */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-white text-center">Men's <span className="text-red-500">Champions</span></h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Heavyweight Champion */}
            <div className="bg-black/30 border border-red-500/20 rounded-lg overflow-hidden group">
              <div className="relative h-64">
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
                <Image 
                  src="/images/champions/heavyweight.jpg" 
                  alt="UFC Heavyweight Champion" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-20">
                  Heavyweight
                </div>
              </div>
              <div className="p-4 relative">
                <div className="absolute -top-8 left-4 bg-black/80 border border-red-500 rounded-full p-2 z-20">
                  <Trophy className="h-6 w-6 text-yellow-500" />
                </div>
                <h3 className="text-xl font-bold text-white mt-2">Jon Jones</h3>
                <div className="flex items-center text-gray-400 text-sm mb-3">
                  <span className="mr-3">27-1-0</span>
                  <span>USA</span>
                </div>
                <Button asChild size="sm" className="w-full bg-red-600 hover:bg-red-700 text-white">
                  <Link href="/fighters/jon-jones">
                    View Profile
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Light Heavyweight Champion */}
            <div className="bg-black/30 border border-red-500/20 rounded-lg overflow-hidden group">
              <div className="relative h-64">
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
                <Image 
                  src="/images/champions/light-heavyweight.jpg" 
                  alt="UFC Light Heavyweight Champion" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-20">
                  Light Heavyweight
                </div>
              </div>
              <div className="p-4 relative">
                <div className="absolute -top-8 left-4 bg-black/80 border border-red-500 rounded-full p-2 z-20">
                  <Trophy className="h-6 w-6 text-yellow-500" />
                </div>
                <h3 className="text-xl font-bold text-white mt-2">Alex Pereira</h3>
                <div className="flex items-center text-gray-400 text-sm mb-3">
                  <span className="mr-3">9-2-0</span>
                  <span>Brazil</span>
                </div>
                <Button asChild size="sm" className="w-full bg-red-600 hover:bg-red-700 text-white">
                  <Link href="/fighters/alex-pereira">
                    View Profile
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Middleweight Champion */}
            <div className="bg-black/30 border border-red-500/20 rounded-lg overflow-hidden group">
              <div className="relative h-64">
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
                <Image 
                  src="/images/champions/middleweight.jpg" 
                  alt="UFC Middleweight Champion" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-20">
                  Middleweight
                </div>
              </div>
              <div className="p-4 relative">
                <div className="absolute -top-8 left-4 bg-black/80 border border-red-500 rounded-full p-2 z-20">
                  <Trophy className="h-6 w-6 text-yellow-500" />
                </div>
                <h3 className="text-xl font-bold text-white mt-2">Dricus Du Plessis</h3>
                <div className="flex items-center text-gray-400 text-sm mb-3">
                  <span className="mr-3">21-2-0</span>
                  <span>South Africa</span>
                </div>
                <Button asChild size="sm" className="w-full bg-red-600 hover:bg-red-700 text-white">
                  <Link href="/fighters/dricus-du-plessis">
                    View Profile
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Welterweight Champion */}
            <div className="bg-black/30 border border-red-500/20 rounded-lg overflow-hidden group">
              <div className="relative h-64">
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
                <Image 
                  src="/images/champions/welterweight.jpg" 
                  alt="UFC Welterweight Champion" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-20">
                  Welterweight
                </div>
              </div>
              <div className="p-4 relative">
                <div className="absolute -top-8 left-4 bg-black/80 border border-red-500 rounded-full p-2 z-20">
                  <Trophy className="h-6 w-6 text-yellow-500" />
                </div>
                <h3 className="text-xl font-bold text-white mt-2">Belal Muhammad</h3>
                <div className="flex items-center text-gray-400 text-sm mb-3">
                  <span className="mr-3">23-3-0</span>
                  <span>USA</span>
                </div>
                <Button asChild size="sm" className="w-full bg-red-600 hover:bg-red-700 text-white">
                  <Link href="/fighters/belal-muhammad">
                    View Profile
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Women's Champions */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-white text-center">Women's <span className="text-red-500">Champions</span></h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Women's Bantamweight Champion */}
            <div className="bg-black/30 border border-red-500/20 rounded-lg overflow-hidden group">
              <div className="relative h-64">
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
                <Image 
                  src="/images/champions/womens-bantamweight.jpg" 
                  alt="UFC Women's Bantamweight Champion" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-20">
                  Women's Bantamweight
                </div>
              </div>
              <div className="p-4 relative">
                <div className="absolute -top-8 left-4 bg-black/80 border border-red-500 rounded-full p-2 z-20">
                  <Trophy className="h-6 w-6 text-yellow-500" />
                </div>
                <h3 className="text-xl font-bold text-white mt-2">Raquel Pennington</h3>
                <div className="flex items-center text-gray-400 text-sm mb-3">
                  <span className="mr-3">15-8-0</span>
                  <span>USA</span>
                </div>
                <Button asChild size="sm" className="w-full bg-red-600 hover:bg-red-700 text-white">
                  <Link href="/fighters/raquel-pennington">
                    View Profile
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Women's Flyweight Champion */}
            <div className="bg-black/30 border border-red-500/20 rounded-lg overflow-hidden group">
              <div className="relative h-64">
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
                <Image 
                  src="/images/champions/womens-flyweight.jpg" 
                  alt="UFC Women's Flyweight Champion" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-20">
                  Women's Flyweight
                </div>
              </div>
              <div className="p-4 relative">
                <div className="absolute -top-8 left-4 bg-black/80 border border-red-500 rounded-full p-2 z-20">
                  <Trophy className="h-6 w-6 text-yellow-500" />
                </div>
                <h3 className="text-xl font-bold text-white mt-2">Alexa Grasso</h3>
                <div className="flex items-center text-gray-400 text-sm mb-3">
                  <span className="mr-3">16-3-1</span>
                  <span>Mexico</span>
                </div>
                <Button asChild size="sm" className="w-full bg-red-600 hover:bg-red-700 text-white">
                  <Link href="/fighters/alexa-grasso">
                    View Profile
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Women's Strawweight Champion */}
            <div className="bg-black/30 border border-red-500/20 rounded-lg overflow-hidden group">
              <div className="relative h-64">
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
                <Image 
                  src="/images/champions/womens-strawweight.jpg" 
                  alt="UFC Women's Strawweight Champion" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-20">
                  Women's Strawweight
                </div>
              </div>
              <div className="p-4 relative">
                <div className="absolute -top-8 left-4 bg-black/80 border border-red-500 rounded-full p-2 z-20">
                  <Trophy className="h-6 w-6 text-yellow-500" />
                </div>
                <h3 className="text-xl font-bold text-white mt-2">Zhang Weili</h3>
                <div className="flex items-center text-gray-400 text-sm mb-3">
                  <span className="mr-3">24-3-0</span>
                  <span>China</span>
                </div>
                <Button asChild size="sm" className="w-full bg-red-600 hover:bg-red-700 text-white">
                  <Link href="/fighters/zhang-weili">
                    View Profile
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6 text-white">Explore More <span className="text-red-500">Fighters</span></h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white">
              <Link href="/fighters">
                All Fighters
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-red-500/50 text-red-400 hover:text-red-300 hover:bg-red-950/30">
              <Link href="/rankings/pound-for-pound">
                Pound for Pound Rankings
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
