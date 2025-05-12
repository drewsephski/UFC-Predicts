import { Particles } from "@/components/ui/particles";
import { Button } from "@/components/ui/button";
import { BarChart3, PieChart, LineChart, TrendingUp, Target, Dumbbell } from "lucide-react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

export const metadata = {
  title: "UFC Statistics | UFC Predict",
  description: "Explore comprehensive UFC statistics including fighter records, event data, and historical performance metrics across all divisions.",
};

export default function StatisticsPage() {
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
            UFC <span className="text-red-500">Statistics</span>
          </h1>
          <div className="flex items-center justify-center mb-4">
            <BarChart3 className="h-6 w-6 text-red-500 mr-2" />
            <p className="text-gray-300">Comprehensive data and metrics for all UFC fighters and events</p>
          </div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Explore our extensive database of UFC statistics, including fighter records, event data, 
            and historical performance metrics. Dive deep into the numbers behind the fights to gain 
            insights and understand trends across all divisions.
          </p>
        </div>
        
        <Tabs defaultValue="fighters" className="w-full mb-16">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-black/50 border border-red-500/30">
              <TabsTrigger 
                value="fighters" 
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white text-gray-300"
              >
                <Dumbbell className="h-4 w-4 mr-2" />
                Fighter Stats
              </TabsTrigger>
              <TabsTrigger 
                value="events" 
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white text-gray-300"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Event Stats
              </TabsTrigger>
              <TabsTrigger 
                value="historical" 
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white text-gray-300"
              >
                <LineChart className="h-4 w-4 mr-2" />
                Historical Data
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="fighters" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-black/30 border border-red-500/20 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">Top Striking Accuracy (Minimum 5 Fights)</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-white">Petr Yan</span>
                      <span className="text-red-400">58.2%</span>
                    </div>
                    <Progress value={58.2} className="h-2 bg-gray-800" indicatorClassName="bg-red-500" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-white">Max Holloway</span>
                      <span className="text-red-400">55.7%</span>
                    </div>
                    <Progress value={55.7} className="h-2 bg-gray-800" indicatorClassName="bg-red-500" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-white">Cory Sandhagen</span>
                      <span className="text-red-400">54.1%</span>
                    </div>
                    <Progress value={54.1} className="h-2 bg-gray-800" indicatorClassName="bg-red-500" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-white">Conor McGregor</span>
                      <span className="text-red-400">53.8%</span>
                    </div>
                    <Progress value={53.8} className="h-2 bg-gray-800" indicatorClassName="bg-red-500" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-white">Dustin Poirier</span>
                      <span className="text-red-400">52.4%</span>
                    </div>
                    <Progress value={52.4} className="h-2 bg-gray-800" indicatorClassName="bg-red-500" />
                  </div>
                </div>
              </div>
              
              <div className="bg-black/30 border border-red-500/20 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">Top Takedown Accuracy (Minimum 5 Fights)</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-white">Khabib Nurmagomedov</span>
                      <span className="text-red-400">67.9%</span>
                    </div>
                    <Progress value={67.9} className="h-2 bg-gray-800" indicatorClassName="bg-red-500" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-white">Georges St-Pierre</span>
                      <span className="text-red-400">65.3%</span>
                    </div>
                    <Progress value={65.3} className="h-2 bg-gray-800" indicatorClassName="bg-red-500" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-white">Islam Makhachev</span>
                      <span className="text-red-400">64.8%</span>
                    </div>
                    <Progress value={64.8} className="h-2 bg-gray-800" indicatorClassName="bg-red-500" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-white">Kamaru Usman</span>
                      <span className="text-red-400">62.1%</span>
                    </div>
                    <Progress value={62.1} className="h-2 bg-gray-800" indicatorClassName="bg-red-500" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-white">Colby Covington</span>
                      <span className="text-red-400">59.6%</span>
                    </div>
                    <Progress value={59.6} className="h-2 bg-gray-800" indicatorClassName="bg-red-500" />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="events" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-black/30 border border-red-500/20 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">Finish Rate by Event Type</h3>
                <div className="relative h-64 w-full bg-black/50 rounded-lg flex items-center justify-center">
                  <PieChart className="h-16 w-16 text-red-500" />
                  <div className="absolute bottom-0 left-0 p-4 w-full">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                        <span className="text-sm text-gray-300">PPV Events: 62%</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-300 rounded-full mr-2"></div>
                        <span className="text-sm text-gray-300">Fight Nights: 58%</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-700 rounded-full mr-2"></div>
                        <span className="text-sm text-gray-300">Title Fights: 47%</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-900 rounded-full mr-2"></div>
                        <span className="text-sm text-gray-300">Main Events: 65%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-black/30 border border-red-500/20 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">Fight Outcomes (Last 100 Events)</h3>
                <div className="relative h-64 w-full bg-black/50 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-16 w-16 text-red-500" />
                  <div className="absolute bottom-0 left-0 p-4 w-full">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                        <span className="text-sm text-gray-300">KO/TKO: 29%</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-300 rounded-full mr-2"></div>
                        <span className="text-sm text-gray-300">Submission: 23%</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-700 rounded-full mr-2"></div>
                        <span className="text-sm text-gray-300">Decision: 45%</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-900 rounded-full mr-2"></div>
                        <span className="text-sm text-gray-300">Other: 3%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="historical" className="mt-0">
            <div className="bg-black/30 border border-red-500/20 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">UFC Records</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Most UFC Wins</h4>
                  <ul className="space-y-2">
                    <li className="flex justify-between text-gray-300">
                      <span>Donald Cerrone</span>
                      <span className="text-red-400">23</span>
                    </li>
                    <li className="flex justify-between text-gray-300">
                      <span>Jim Miller</span>
                      <span className="text-red-400">22</span>
                    </li>
                    <li className="flex justify-between text-gray-300">
                      <span>Andrei Arlovski</span>
                      <span className="text-red-400">21</span>
                    </li>
                    <li className="flex justify-between text-gray-300">
                      <span>Demian Maia</span>
                      <span className="text-red-400">21</span>
                    </li>
                    <li className="flex justify-between text-gray-300">
                      <span>Jon Jones</span>
                      <span className="text-red-400">20</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Most Title Defenses</h4>
                  <ul className="space-y-2">
                    <li className="flex justify-between text-gray-300">
                      <span>Demetrious Johnson</span>
                      <span className="text-red-400">11</span>
                    </li>
                    <li className="flex justify-between text-gray-300">
                      <span>Jon Jones</span>
                      <span className="text-red-400">11</span>
                    </li>
                    <li className="flex justify-between text-gray-300">
                      <span>Anderson Silva</span>
                      <span className="text-red-400">10</span>
                    </li>
                    <li className="flex justify-between text-gray-300">
                      <span>Georges St-Pierre</span>
                      <span className="text-red-400">9</span>
                    </li>
                    <li className="flex justify-between text-gray-300">
                      <span>Jose Aldo</span>
                      <span className="text-red-400">7</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Fastest KO</h4>
                  <ul className="space-y-2">
                    <li className="flex justify-between text-gray-300">
                      <span>Jorge Masvidal vs Ben Askren</span>
                      <span className="text-red-400">5 sec</span>
                    </li>
                    <li className="flex justify-between text-gray-300">
                      <span>Duane Ludwig vs Jonathan Goulet</span>
                      <span className="text-red-400">6 sec</span>
                    </li>
                    <li className="flex justify-between text-gray-300">
                      <span>Todd Duffee vs Tim Hague</span>
                      <span className="text-red-400">7 sec</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Fastest Submission</h4>
                  <ul className="space-y-2">
                    <li className="flex justify-between text-gray-300">
                      <span>Oleg Taktarov vs Anthony Macias</span>
                      <span className="text-red-400">9 sec</span>
                    </li>
                    <li className="flex justify-between text-gray-300">
                      <span>Ronda Rousey vs Cat Zingano</span>
                      <span className="text-red-400">14 sec</span>
                    </li>
                    <li className="flex justify-between text-gray-300">
                      <span>Deron Winn vs Tom Lawlor</span>
                      <span className="text-red-400">18 sec</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-black/30 border border-red-500/20 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Target className="h-6 w-6 text-red-500 mr-3" />
              <h2 className="text-2xl font-bold text-white">Fighter Comparison Tool</h2>
            </div>
            <p className="text-gray-300 mb-4">
              Compare any two UFC fighters head-to-head across all statistical categories.
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
              <li>Side-by-side statistical comparison</li>
              <li>Career trajectory visualization</li>
              <li>Common opponent analysis</li>
              <li>Style matchup assessment</li>
            </ul>
            <Link href="/compare">
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                Compare Fighters
              </Button>
            </Link>
          </div>
          
          <div className="bg-black/30 border border-red-500/20 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <LineChart className="h-6 w-6 text-red-500 mr-3" />
              <h2 className="text-2xl font-bold text-white">Division Statistics</h2>
            </div>
            <p className="text-gray-300 mb-4">
              Explore statistical trends and patterns across different UFC weight divisions.
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
              <li>Finish rates by division</li>
              <li>Average fight duration</li>
              <li>Striking and grappling tendencies</li>
              <li>Champion performance metrics</li>
            </ul>
            <Link href="/rankings/divisions">
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                View Division Stats
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="bg-black/30 border border-red-500/20 rounded-lg p-6 mb-12">
          <h2 className="text-2xl font-bold mb-4 text-center text-white">
            Premium <span className="text-red-500">Statistics Features</span>
          </h2>
          <p className="text-gray-300 text-center mb-6">
            Upgrade to our premium plan to access advanced statistical tools and exclusive data.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-black/50 p-4 rounded-lg border border-red-500/10">
              <h3 className="text-lg font-bold text-white mb-2">Advanced Metrics</h3>
              <p className="text-gray-400 text-sm">
                Access proprietary metrics like Striking Efficiency Index, Grappling Dominance Score, and more.
              </p>
            </div>
            
            <div className="bg-black/50 p-4 rounded-lg border border-red-500/10">
              <h3 className="text-lg font-bold text-white mb-2">Custom Data Exports</h3>
              <p className="text-gray-400 text-sm">
                Export any statistical data to CSV or Excel for your own analysis and research.
              </p>
            </div>
            
            <div className="bg-black/50 p-4 rounded-lg border border-red-500/10">
              <h3 className="text-lg font-bold text-white mb-2">Interactive Dashboards</h3>
              <p className="text-gray-400 text-sm">
                Create custom statistical dashboards with interactive visualizations and real-time updates.
              </p>
            </div>
          </div>
          
          <div className="flex justify-center mt-6">
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              Upgrade to Premium
            </Button>
          </div>
        </div>
        
        <div className="flex justify-center space-x-4">
          <Link href="/fighters">
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              Browse Fighter Database
            </Button>
          </Link>
          <Link href="/analysis">
            <Button variant="outline" className="border-red-500/50 hover:bg-red-500/10 text-red-400 hover:text-red-300">
              View Fight Analysis
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
