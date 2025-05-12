import { RankingsTable } from "@/components";
import { Particles } from "@/components/ui/particles";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UFC_CHAMPIONS, UFC_WEIGHT_DIVISIONS } from "@/constants";
import { Award, Dumbbell } from "lucide-react";

export const metadata = {
  title: "UFC Rankings | UFC Predict",
  description: "View current UFC rankings across all weight divisions, including pound-for-pound lists and championship information.",
};

// Mock rankings data
const MOCK_RANKINGS = {
  "heavyweight": [
    { id: "ciryl-gane", name: "Ciryl Gane", country: "France", record: "11-2-0" },
    { id: "sergei-pavlovich", name: "Sergei Pavlovich", country: "Russia", record: "18-2-0" },
    { id: "stipe-miocic", name: "Stipe Miocic", country: "United States", record: "20-4-0" },
    { id: "tom-aspinall", name: "Tom Aspinall", country: "United Kingdom", record: "14-3-0" },
    { id: "curtis-blaydes", name: "Curtis Blaydes", country: "United States", record: "17-4-0" },
    { id: "alexander-volkov", name: "Alexander Volkov", country: "Russia", record: "36-10-0" },
    { id: "jailton-almeida", name: "Jailton Almeida", country: "Brazil", record: "19-2-0" },
    { id: "tai-tuivasa", name: "Tai Tuivasa", country: "Australia", record: "14-6-0" },
    { id: "derrick-lewis", name: "Derrick Lewis", country: "United States", record: "27-11-0" },
    { id: "marcin-tybura", name: "Marcin Tybura", country: "Poland", record: "24-8-0" }
  ],
  "light-heavyweight": [
    { id: "jamahal-hill", name: "Jamahal Hill", country: "United States", record: "12-1-0" },
    { id: "jiri-prochazka", name: "Jiri Prochazka", country: "Czech Republic", record: "29-4-1" },
    { id: "magomed-ankalaev", name: "Magomed Ankalaev", country: "Russia", record: "18-1-1" },
    { id: "jan-blachowicz", name: "Jan Blachowicz", country: "Poland", record: "29-10-1" },
    { id: "nikita-krylov", name: "Nikita Krylov", country: "Ukraine", record: "30-9-0" },
    { id: "aleksandar-rakic", name: "Aleksandar Rakic", country: "Austria", record: "14-3-0" },
    { id: "johnny-walker", name: "Johnny Walker", country: "Brazil", record: "21-7-0" },
    { id: "volkan-oezdemir", name: "Volkan Oezdemir", country: "Switzerland", record: "19-7-0" },
    { id: "anthony-smith", name: "Anthony Smith", country: "United States", record: "37-18-0" },
    { id: "ryan-spann", name: "Ryan Spann", country: "United States", record: "21-9-0" }
  ],
  "pound-for-pound": [
    { id: "islam-makhachev", name: "Islam Makhachev", country: "Russia", record: "25-1-0" },
    { id: "jon-jones", name: "Jon Jones", country: "United States", record: "27-1-0" },
    { id: "alex-pereira", name: "Alex Pereira", country: "Brazil", record: "9-2-0" },
    { id: "leon-edwards", name: "Leon Edwards", country: "United Kingdom", record: "21-3-0" },
    { id: "ilia-topuria", name: "Ilia Topuria", country: "Spain", record: "15-0-0" },
    { id: "sean-omalley", name: "Sean O'Malley", country: "United States", record: "17-1-0" },
    { id: "alexandre-pantoja", name: "Alexandre Pantoja", country: "Brazil", record: "27-5-0" },
    { id: "dricus-du-plessis", name: "Dricus Du Plessis", country: "South Africa", record: "21-2-0" },
    { id: "max-holloway", name: "Max Holloway", country: "United States", record: "25-7-0" },
    { id: "belal-muhammad", name: "Belal Muhammad", country: "United States", record: "23-3-0" }
  ]
};

export default function RankingsPage() {
  // Find champions for each division
  const getChampion = (divisionId: string) => {
    const champion = UFC_CHAMPIONS.find(champ => 
      champ.division.toLowerCase() === divisionId.replace(/-/g, ' ') ||
      champ.division.toLowerCase() === divisionId.replace(/-/g, ' ').replace("womens-", "women's ")
    );
    
    if (champion) {
      return {
        id: champion.name.toLowerCase().replace(/\s+/g, '-'),
        name: champion.name,
        country: champion.country,
        record: champion.record
      };
    }
    
    return {
      id: "vacant",
      name: "Vacant",
      country: "N/A",
      record: "N/A"
    };
  };

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
            UFC <span className="text-red-500">Rankings</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            View the official UFC rankings across all weight divisions. 
            See who&apos;s at the top of each division and track the pound-for-pound best fighters in the world.
          </p>
        </div>
        
        <Tabs defaultValue="pound-for-pound" className="w-full">
          <div className="flex justify-center mb-8 overflow-x-auto pb-2">
            <TabsList className="bg-black/50 border border-red-500/30">
              <TabsTrigger 
                value="pound-for-pound" 
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white text-gray-300"
              >
                <Award className="h-4 w-4 mr-2" />
                Pound for Pound
              </TabsTrigger>
              <TabsTrigger 
                value="mens" 
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white text-gray-300"
              >
                <Dumbbell className="h-4 w-4 mr-2" />
                Men&apos;s Divisions
              </TabsTrigger>
              <TabsTrigger 
                value="womens" 
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white text-gray-300"
              >
                <Dumbbell className="h-4 w-4 mr-2" />
                Women&apos;s Divisions
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="pound-for-pound" className="mt-0">
            <div className="bg-black/30 border border-red-500/20 rounded-lg p-6">
              <RankingsTable
                division="Pound for Pound"
                champion={getChampion("pound-for-pound")}
                rankings={MOCK_RANKINGS["pound-for-pound"]}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="mens" className="mt-0">
            <div className="space-y-12">
              {UFC_WEIGHT_DIVISIONS
                .filter(division => !division.id.includes("womens"))
                .map(division => (
                  <div key={division.id} className="bg-black/30 border border-red-500/20 rounded-lg p-6">
                    <RankingsTable
                      division={division.name}
                      champion={getChampion(division.id)}
                      rankings={MOCK_RANKINGS[division.id as keyof typeof MOCK_RANKINGS] || 
                        Array(10).fill(0).map((_, i) => ({
                          id: `fighter-${i}`,
                          name: `Fighter ${i+1}`,
                          country: "Unknown",
                          record: "0-0-0"
                        }))}
                    />
                  </div>
                ))
              }
            </div>
          </TabsContent>
          
          <TabsContent value="womens" className="mt-0">
            <div className="space-y-12">
              {UFC_WEIGHT_DIVISIONS
                .filter(division => division.id.includes("womens"))
                .map(division => (
                  <div key={division.id} className="bg-black/30 border border-red-500/20 rounded-lg p-6">
                    <RankingsTable
                      division={division.name}
                      champion={getChampion(division.id)}
                      rankings={MOCK_RANKINGS[division.id as keyof typeof MOCK_RANKINGS] || 
                        Array(10).fill(0).map((_, i) => ({
                          id: `fighter-${i}`,
                          name: `Fighter ${i+1}`,
                          country: "Unknown",
                          record: "0-0-0"
                        }))}
                    />
                  </div>
                ))
              }
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
