import { RankingsTable } from "@/components";
import { Particles } from "@/components/ui/particles";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UFC_CHAMPIONS, UFC_WEIGHT_DIVISIONS } from "@/constants";
import { Users, Trophy } from "lucide-react";

export const metadata = {
  title: "UFC Weight Division Rankings | UFC Predict",
  description: "View current UFC rankings for all weight divisions, including champions and top contenders in each weight class.",
};

// Mock rankings data for each division
const DIVISION_RANKINGS = {
  "heavyweight": {
    division: "Heavyweight",
    champion: {
      id: "jon-jones",
      name: "Jon Jones",
      country: "United States",
      record: "27-1-0"
    },
    rankings: [
      {
        id: "tom-aspinall",
        name: "Tom Aspinall",
        country: "United Kingdom",
        record: "14-3-0"
      },
      {
        id: "stipe-miocic",
        name: "Stipe Miocic",
        country: "United States",
        record: "20-4-0"
      },
      {
        id: "ciryl-gane",
        name: "Ciryl Gane",
        country: "France",
        record: "11-2-0"
      },
      {
        id: "sergei-pavlovich",
        name: "Sergei Pavlovich",
        country: "Russia",
        record: "18-2-0"
      },
      {
        id: "alexander-volkov",
        name: "Alexander Volkov",
        country: "Russia",
        record: "37-10-0"
      }
    ]
  },
  "light-heavyweight": {
    division: "Light Heavyweight",
    champion: {
      id: "alex-pereira",
      name: "Alex Pereira",
      country: "Brazil",
      record: "9-2-0"
    },
    rankings: [
      {
        id: "jamahal-hill",
        name: "Jamahal Hill",
        country: "United States",
        record: "12-1-0"
      },
      {
        id: "jiri-prochazka",
        name: "Jiri Prochazka",
        country: "Czech Republic",
        record: "29-4-1"
      },
      {
        id: "magomed-ankalaev",
        name: "Magomed Ankalaev",
        country: "Russia",
        record: "18-1-1"
      },
      {
        id: "jan-blachowicz",
        name: "Jan Blachowicz",
        country: "Poland",
        record: "29-10-1"
      },
      {
        id: "nikita-krylov",
        name: "Nikita Krylov",
        country: "Ukraine",
        record: "30-9-0"
      }
    ]
  },
  "middleweight": {
    division: "Middleweight",
    champion: {
      id: "dricus-du-plessis",
      name: "Dricus Du Plessis",
      country: "South Africa",
      record: "21-2-0"
    },
    rankings: [
      {
        id: "israel-adesanya",
        name: "Israel Adesanya",
        country: "Nigeria",
        record: "24-3-0"
      },
      {
        id: "sean-strickland",
        name: "Sean Strickland",
        country: "United States",
        record: "28-6-0"
      },
      {
        id: "robert-whittaker",
        name: "Robert Whittaker",
        country: "Australia",
        record: "25-7-0"
      },
      {
        id: "jared-cannonier",
        name: "Jared Cannonier",
        country: "United States",
        record: "17-6-0"
      },
      {
        id: "marvin-vettori",
        name: "Marvin Vettori",
        country: "Italy",
        record: "19-6-1"
      }
    ]
  }
};

export default function DivisionsRankingsPage() {
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
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            UFC Weight Division <span className="text-red-500">Rankings</span>
          </h1>
          <div className="flex items-center justify-center mb-4">
            <Trophy className="h-6 w-6 text-red-500 mr-2" />
            <p className="text-gray-300">Current rankings for all UFC weight classes</p>
          </div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Browse the official UFC rankings for all weight divisions. Each division features a champion 
            and top-ranked contenders who are competing for a title shot. Rankings are updated after each UFC event.
          </p>
        </div>
        
        <Tabs defaultValue="heavyweight" className="w-full">
          <div className="flex justify-center mb-8 overflow-x-auto pb-2">
            <TabsList className="bg-black/50 border border-red-500/30 flex flex-nowrap">
              {UFC_WEIGHT_DIVISIONS.map((division) => (
                <TabsTrigger 
                  key={division.id}
                  value={division.id} 
                  className="data-[state=active]:bg-red-600 data-[state=active]:text-white text-gray-300 whitespace-nowrap"
                >
                  {division.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          {Object.keys(DIVISION_RANKINGS).map((divisionId) => (
            <TabsContent key={divisionId} value={divisionId} className="mt-0">
              <div className="bg-black/30 border border-red-500/20 rounded-lg p-6 mb-8">
                <RankingsTable 
                  division={DIVISION_RANKINGS[divisionId].division}
                  champion={DIVISION_RANKINGS[divisionId].champion}
                  rankings={DIVISION_RANKINGS[divisionId].rankings}
                />
              </div>
              
              <div className="bg-black/30 border border-red-500/20 rounded-lg p-6">
                {UFC_WEIGHT_DIVISIONS.find(div => div.id === divisionId) && (
                  <>
                    <h2 className="text-2xl font-bold mb-4 text-white">
                      About the <span className="text-red-500">{UFC_WEIGHT_DIVISIONS.find(div => div.id === divisionId)?.name} Division</span>
                    </h2>
                    <p className="text-gray-300 mb-4">
                      {UFC_WEIGHT_DIVISIONS.find(div => div.id === divisionId)?.description}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      <div className="bg-black/50 p-4 rounded-lg border border-red-500/10">
                        <h3 className="text-lg font-bold text-white mb-2">Weight Limit</h3>
                        <p className="text-gray-400">
                          {UFC_WEIGHT_DIVISIONS.find(div => div.id === divisionId)?.weightLimit}
                        </p>
                      </div>
                      <div className="bg-black/50 p-4 rounded-lg border border-red-500/10">
                        <h3 className="text-lg font-bold text-white mb-2">Current Champion</h3>
                        <p className="text-gray-400">
                          {DIVISION_RANKINGS[divisionId].champion.name} ({DIVISION_RANKINGS[divisionId].champion.country})
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </TabsContent>
          ))}
          
          {/* For divisions without mock data, show a placeholder */}
          {UFC_WEIGHT_DIVISIONS.filter(div => !Object.keys(DIVISION_RANKINGS).includes(div.id)).map((division) => (
            <TabsContent key={division.id} value={division.id} className="mt-0">
              <div className="bg-black/30 border border-red-500/20 rounded-lg p-6 mb-8 flex items-center justify-center h-64">
                <p className="text-gray-400 text-lg">Rankings data for {division.name} division coming soon</p>
              </div>
              
              <div className="bg-black/30 border border-red-500/20 rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4 text-white">
                  About the <span className="text-red-500">{division.name} Division</span>
                </h2>
                <p className="text-gray-300 mb-4">
                  {division.description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="bg-black/50 p-4 rounded-lg border border-red-500/10">
                    <h3 className="text-lg font-bold text-white mb-2">Weight Limit</h3>
                    <p className="text-gray-400">
                      {division.weightLimit}
                    </p>
                  </div>
                  <div className="bg-black/50 p-4 rounded-lg border border-red-500/10">
                    <h3 className="text-lg font-bold text-white mb-2">Current Champion</h3>
                    <p className="text-gray-400">
                      {UFC_CHAMPIONS.find(champ => champ.division === division.name)?.name || "Vacant"}
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="flex justify-center mt-12">
          <Button className="bg-red-600 hover:bg-red-700 text-white">
            <Users className="h-4 w-4 mr-2" />
            View All UFC Fighters
          </Button>
        </div>
      </div>
    </div>
  );
}
