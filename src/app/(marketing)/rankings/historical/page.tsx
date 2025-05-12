import { RankingsTable } from "@/components";
import { Particles } from "@/components/ui/particles";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarRange, Trophy, History } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const metadata = {
  title: "UFC Historical Rankings | UFC Predict",
  description: "Explore the history of UFC rankings and champions across all weight divisions throughout the years.",
};

// Mock historical champions data
const HISTORICAL_CHAMPIONS = {
  "heavyweight": [
    {
      year: "2023",
      champion: {
        id: "jon-jones",
        name: "Jon Jones",
        country: "United States",
        record: "27-1-0"
      },
      rankings: [
        {
          id: "ciryl-gane",
          name: "Ciryl Gane",
          country: "France",
          record: "11-2-0"
        },
        {
          id: "stipe-miocic",
          name: "Stipe Miocic",
          country: "United States",
          record: "20-4-0"
        },
        {
          id: "sergei-pavlovich",
          name: "Sergei Pavlovich",
          country: "Russia",
          record: "18-2-0"
        },
        {
          id: "tom-aspinall",
          name: "Tom Aspinall",
          country: "United Kingdom",
          record: "14-3-0"
        },
        {
          id: "curtis-blaydes",
          name: "Curtis Blaydes",
          country: "United States",
          record: "17-4-0"
        }
      ]
    },
    {
      year: "2022",
      champion: {
        id: "francis-ngannou",
        name: "Francis Ngannou",
        country: "Cameroon",
        record: "17-3-0"
      },
      rankings: [
        {
          id: "ciryl-gane",
          name: "Ciryl Gane",
          country: "France",
          record: "11-1-0"
        },
        {
          id: "stipe-miocic",
          name: "Stipe Miocic",
          country: "United States",
          record: "20-4-0"
        },
        {
          id: "tai-tuivasa",
          name: "Tai Tuivasa",
          country: "Australia",
          record: "14-5-0"
        },
        {
          id: "curtis-blaydes",
          name: "Curtis Blaydes",
          country: "United States",
          record: "16-3-0"
        },
        {
          id: "derrick-lewis",
          name: "Derrick Lewis",
          country: "United States",
          record: "26-10-0"
        }
      ]
    },
    {
      year: "2021",
      champion: {
        id: "francis-ngannou",
        name: "Francis Ngannou",
        country: "Cameroon",
        record: "16-3-0"
      },
      rankings: [
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
          record: "10-0-0"
        },
        {
          id: "derrick-lewis",
          name: "Derrick Lewis",
          country: "United States",
          record: "25-8-0"
        },
        {
          id: "curtis-blaydes",
          name: "Curtis Blaydes",
          country: "United States",
          record: "15-3-0"
        },
        {
          id: "alexander-volkov",
          name: "Alexander Volkov",
          country: "Russia",
          record: "34-9-0"
        }
      ]
    }
  ],
  "lightweight": [
    {
      year: "2023",
      champion: {
        id: "islam-makhachev",
        name: "Islam Makhachev",
        country: "Russia",
        record: "25-1-0"
      },
      rankings: [
        {
          id: "charles-oliveira",
          name: "Charles Oliveira",
          country: "Brazil",
          record: "33-9-0"
        },
        {
          id: "dustin-poirier",
          name: "Dustin Poirier",
          country: "United States",
          record: "29-8-0"
        },
        {
          id: "justin-gaethje",
          name: "Justin Gaethje",
          country: "United States",
          record: "24-4-0"
        },
        {
          id: "beneil-dariush",
          name: "Beneil Dariush",
          country: "United States",
          record: "22-5-1"
        },
        {
          id: "michael-chandler",
          name: "Michael Chandler",
          country: "United States",
          record: "23-8-0"
        }
      ]
    },
    {
      year: "2022",
      champion: {
        id: "islam-makhachev",
        name: "Islam Makhachev",
        country: "Russia",
        record: "23-1-0"
      },
      rankings: [
        {
          id: "charles-oliveira",
          name: "Charles Oliveira",
          country: "Brazil",
          record: "33-9-0"
        },
        {
          id: "dustin-poirier",
          name: "Dustin Poirier",
          country: "United States",
          record: "29-7-0"
        },
        {
          id: "justin-gaethje",
          name: "Justin Gaethje",
          country: "United States",
          record: "23-4-0"
        },
        {
          id: "beneil-dariush",
          name: "Beneil Dariush",
          country: "United States",
          record: "21-4-1"
        },
        {
          id: "michael-chandler",
          name: "Michael Chandler",
          country: "United States",
          record: "23-7-0"
        }
      ]
    }
  ]
};

export default function HistoricalRankingsPage() {
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
            UFC Historical <span className="text-red-500">Rankings</span>
          </h1>
          <div className="flex items-center justify-center mb-4">
            <History className="h-6 w-6 text-red-500 mr-2" />
            <p className="text-gray-300">Past UFC rankings and champions through the years</p>
          </div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Explore the history of UFC rankings and champions across all weight divisions. 
            See how the landscape of each division has evolved over time and track the 
            rise and fall of UFC&apos;s greatest fighters.
          </p>
        </div>
        
        <Tabs defaultValue="champions" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-black/50 border border-red-500/30">
              <TabsTrigger 
                value="champions" 
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white text-gray-300"
              >
                <Trophy className="h-4 w-4 mr-2" />
                Historical Champions
              </TabsTrigger>
              <TabsTrigger 
                value="rankings" 
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white text-gray-300"
              >
                <CalendarRange className="h-4 w-4 mr-2" />
                Historical Rankings
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="champions" className="mt-0">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1">
                <Select defaultValue="heavyweight">
                  <SelectTrigger className="w-full bg-black/50 border-red-500/30 text-white focus:ring-red-500">
                    <SelectValue placeholder="Select Division" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-red-500/30">
                    <SelectItem value="heavyweight" className="text-white">Heavyweight</SelectItem>
                    <SelectItem value="light-heavyweight" className="text-white">Light Heavyweight</SelectItem>
                    <SelectItem value="middleweight" className="text-white">Middleweight</SelectItem>
                    <SelectItem value="welterweight" className="text-white">Welterweight</SelectItem>
                    <SelectItem value="lightweight" className="text-white">Lightweight</SelectItem>
                    <SelectItem value="featherweight" className="text-white">Featherweight</SelectItem>
                    <SelectItem value="bantamweight" className="text-white">Bantamweight</SelectItem>
                    <SelectItem value="flyweight" className="text-white">Flyweight</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select defaultValue="2023">
                  <SelectTrigger className="w-[180px] bg-black/50 border-red-500/30 text-white focus:ring-red-500">
                    <SelectValue placeholder="Select Year" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-red-500/30">
                    <SelectItem value="2023" className="text-white">2023</SelectItem>
                    <SelectItem value="2022" className="text-white">2022</SelectItem>
                    <SelectItem value="2021" className="text-white">2021</SelectItem>
                    <SelectItem value="2020" className="text-white">2020</SelectItem>
                    <SelectItem value="2019" className="text-white">2019</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="bg-black/30 border border-red-500/20 rounded-lg p-6 mb-8">
              <RankingsTable 
                division="Heavyweight (2023)"
                champion={HISTORICAL_CHAMPIONS.heavyweight[0].champion}
                rankings={HISTORICAL_CHAMPIONS.heavyweight[0].rankings}
              />
            </div>
            
            <div className="bg-black/30 border border-red-500/20 rounded-lg p-6 mb-12">
              <h2 className="text-2xl font-bold mb-4 text-white">
                Heavyweight Championship <span className="text-red-500">Timeline</span>
              </h2>
              
              <div className="relative">
                <div className="absolute left-4 h-full w-0.5 bg-red-500/30"></div>
                
                <div className="relative pl-10 pb-10">
                  <div className="absolute left-0 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div className="bg-black/50 p-4 rounded-lg border border-red-500/10">
                    <h3 className="text-lg font-bold text-white">Jon Jones (2023-Present)</h3>
                    <p className="text-gray-400 text-sm mt-1">
                      Won the vacant title against Ciryl Gane at UFC 285 via first-round submission.
                    </p>
                  </div>
                </div>
                
                <div className="relative pl-10 pb-10">
                  <div className="absolute left-0 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div className="bg-black/50 p-4 rounded-lg border border-red-500/10">
                    <h3 className="text-lg font-bold text-white">Francis Ngannou (2021-2023)</h3>
                    <p className="text-gray-400 text-sm mt-1">
                      Defeated Stipe Miocic at UFC 260 via second-round knockout. Defended once against Ciryl Gane at UFC 270. Vacated the title after leaving the UFC.
                    </p>
                  </div>
                </div>
                
                <div className="relative pl-10 pb-10">
                  <div className="absolute left-0 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div className="bg-black/50 p-4 rounded-lg border border-red-500/10">
                    <h3 className="text-lg font-bold text-white">Stipe Miocic (2019-2021)</h3>
                    <p className="text-gray-400 text-sm mt-1">
                      Regained the title from Daniel Cormier at UFC 241. Defended once in the trilogy fight against Cormier at UFC 252.
                    </p>
                  </div>
                </div>
                
                <div className="relative pl-10">
                  <div className="absolute left-0 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">4</span>
                  </div>
                  <div className="bg-black/50 p-4 rounded-lg border border-red-500/10">
                    <h3 className="text-lg font-bold text-white">Daniel Cormier (2018-2019)</h3>
                    <p className="text-gray-400 text-sm mt-1">
                      Knocked out Stipe Miocic at UFC 226 to become a two-division champion. Defended once against Derrick Lewis at UFC 230.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="rankings" className="mt-0">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1">
                <Select defaultValue="heavyweight">
                  <SelectTrigger className="w-full bg-black/50 border-red-500/30 text-white focus:ring-red-500">
                    <SelectValue placeholder="Select Division" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-red-500/30">
                    <SelectItem value="heavyweight" className="text-white">Heavyweight</SelectItem>
                    <SelectItem value="light-heavyweight" className="text-white">Light Heavyweight</SelectItem>
                    <SelectItem value="middleweight" className="text-white">Middleweight</SelectItem>
                    <SelectItem value="welterweight" className="text-white">Welterweight</SelectItem>
                    <SelectItem value="lightweight" className="text-white">Lightweight</SelectItem>
                    <SelectItem value="featherweight" className="text-white">Featherweight</SelectItem>
                    <SelectItem value="bantamweight" className="text-white">Bantamweight</SelectItem>
                    <SelectItem value="flyweight" className="text-white">Flyweight</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select defaultValue="2023">
                  <SelectTrigger className="w-[180px] bg-black/50 border-red-500/30 text-white focus:ring-red-500">
                    <SelectValue placeholder="Select Year" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-red-500/30">
                    <SelectItem value="2023" className="text-white">2023</SelectItem>
                    <SelectItem value="2022" className="text-white">2022</SelectItem>
                    <SelectItem value="2021" className="text-white">2021</SelectItem>
                    <SelectItem value="2020" className="text-white">2020</SelectItem>
                    <SelectItem value="2019" className="text-white">2019</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="bg-black/30 border border-red-500/20 rounded-lg p-6 mb-8">
              <RankingsTable 
                division="Heavyweight (End of 2023)"
                champion={HISTORICAL_CHAMPIONS.heavyweight[0].champion}
                rankings={HISTORICAL_CHAMPIONS.heavyweight[0].rankings}
              />
            </div>
            
            <div className="bg-black/30 border border-red-500/20 rounded-lg p-6 mb-12">
              <h2 className="text-2xl font-bold mb-4 text-white">
                Notable <span className="text-red-500">Rankings Changes</span> in 2023
              </h2>
              
              <div className="space-y-4">
                <div className="bg-black/50 p-4 rounded-lg border border-red-500/10">
                  <h3 className="text-lg font-bold text-white">Jon Jones Enters at #1</h3>
                  <p className="text-gray-400 text-sm mt-1">
                    After moving up from Light Heavyweight and winning the vacant Heavyweight title, Jon Jones immediately claimed the #1 spot in the division.
                  </p>
                </div>
                
                <div className="bg-black/50 p-4 rounded-lg border border-red-500/10">
                  <h3 className="text-lg font-bold text-white">Tom Aspinall&apos;s Rise</h3>
                  <p className="text-gray-400 text-sm mt-1">
                    Tom Aspinall climbed from #5 to #2 in the rankings after winning the interim Heavyweight title against Sergei Pavlovich at UFC 295.
                  </p>
                </div>
                
                <div className="bg-black/50 p-4 rounded-lg border border-red-500/10">
                  <h3 className="text-lg font-bold text-white">Francis Ngannou Removed</h3>
                  <p className="text-gray-400 text-sm mt-1">
                    Former champion Francis Ngannou was removed from the rankings after leaving the UFC to pursue boxing and signing with the PFL.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-center">
          <Button className="bg-red-600 hover:bg-red-700 text-white">
            <History className="h-4 w-4 mr-2" />
            View All Historical Data
          </Button>
        </div>
      </div>
    </div>
  );
}
