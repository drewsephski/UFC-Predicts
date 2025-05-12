import { FighterComparison } from "@/components";
import { Particles } from "@/components/ui/particles";
import { Button } from "@/components/ui/button";
import { Swords, Scale, BarChart3, PieChart } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Matchup Analysis | UFC Predict",
  description: "Compare UFC fighters head-to-head with our detailed matchup analysis tool. Analyze statistics, fighting styles, and get data-driven predictions.",
};

// Mock fighter data for comparison example
const MOCK_FIGHTERS = [
  {
    id: "jon-jones",
    name: "Jon Jones",
    nickname: "Bones",
    image: "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2023-03/JONES_JON_L_BELT_03_04.png?itok=P6J6DQpm",
    country: "United States",
    age: 36,
    height: "6'4\"",
    weight: "248 lbs",
    reach: "84.5\"",
    stance: "Orthodox",
    record: "27-1-0",
    division: "Heavyweight",
    ranking: 1,
    isChampion: true,
    stats: {
      strikingAccuracy: 58,
      takedownAccuracy: 47,
      strikesLandedPerMin: 4.3,
      strikesAbsorbedPerMin: 2.1,
      takedownAvg: 1.9,
      submissionAvg: 0.9,
      knockoutPercentage: 37,
      winPercentage: 96
    }
  },
  {
    id: "stipe-miocic",
    name: "Stipe Miocic",
    nickname: "",
    image: "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2021-03/MIOCIC_STIPE_L_03-27.png?itok=P6J6DQpm",
    country: "United States",
    age: 41,
    height: "6'4\"",
    weight: "245 lbs",
    reach: "80\"",
    stance: "Orthodox",
    record: "20-4-0",
    division: "Heavyweight",
    ranking: 2,
    isChampion: false,
    stats: {
      strikingAccuracy: 52,
      takedownAccuracy: 36,
      strikesLandedPerMin: 4.9,
      strikesAbsorbedPerMin: 3.7,
      takedownAvg: 2.1,
      submissionAvg: 0.1,
      knockoutPercentage: 75,
      winPercentage: 83
    }
  }
];

export default function MatchupAnalysisFeaturePage() {
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
            Head-to-Head <span className="text-red-500">Matchup Analysis</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Compare any two UFC fighters with our detailed matchup analysis tool. 
            Analyze statistics, fighting styles, and get data-driven predictions 
            for hypothetical or upcoming matchups.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-black/30 border border-red-500/20 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Swords className="h-6 w-6 text-red-500 mr-3" />
              <h2 className="text-2xl font-bold text-white">Style Matchup Analysis</h2>
            </div>
            <p className="text-gray-300 mb-4">
              Our system analyzes fighting style compatibility to identify advantages and disadvantages.
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Striker vs. Grappler dynamics</li>
              <li>Pressure fighter vs. Counter striker analysis</li>
              <li>Orthodox vs. Southpaw stance advantages</li>
              <li>Range and reach impact assessment</li>
              <li>Pace and cardio comparison</li>
            </ul>
          </div>
          
          <div className="bg-black/30 border border-red-500/20 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Scale className="h-6 w-6 text-red-500 mr-3" />
              <h2 className="text-2xl font-bold text-white">Statistical Comparison</h2>
            </div>
            <p className="text-gray-300 mb-4">
              Side-by-side statistical comparison of fighters across all key performance metrics.
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Striking and grappling efficiency</li>
              <li>Defensive capabilities and vulnerabilities</li>
              <li>Round-by-round performance trends</li>
              <li>Common opponent analysis</li>
              <li>Win method probability breakdown</li>
            </ul>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center text-white">
            Example <span className="text-red-500">Matchup Analysis</span>
          </h2>
          
          <div className="bg-black/30 border border-red-500/20 rounded-lg p-6">
            <FighterComparison fighters={MOCK_FIGHTERS} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-black/30 border border-red-500/20 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <BarChart3 className="h-6 w-6 text-red-500 mr-3" />
              <h2 className="text-2xl font-bold text-white">Advanced Visualization</h2>
            </div>
            <p className="text-gray-300 mb-4">
              Interactive charts and graphs to visualize fighter comparisons across multiple dimensions.
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Radar charts for overall skill comparison</li>
              <li>Heat maps for strike landing locations</li>
              <li>Timeline analysis of career progression</li>
              <li>Performance consistency graphs</li>
              <li>Custom comparison metrics</li>
            </ul>
          </div>
          
          <div className="bg-black/30 border border-red-500/20 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <PieChart className="h-6 w-6 text-red-500 mr-3" />
              <h2 className="text-2xl font-bold text-white">Outcome Prediction</h2>
            </div>
            <p className="text-gray-300 mb-4">
              Data-driven predictions for hypothetical or upcoming matchups.
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Win probability percentage</li>
              <li>Method of victory breakdown</li>
              <li>Round-by-round win likelihood</li>
              <li>Path to victory analysis for each fighter</li>
              <li>Key factors influencing the prediction</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-black/30 border border-red-500/20 rounded-lg p-6 mb-12">
          <h2 className="text-2xl font-bold mb-4 text-center text-white">
            Premium <span className="text-red-500">Matchup Features</span>
          </h2>
          <p className="text-gray-300 mb-6 text-center">
            Upgrade to our premium plan to unlock advanced matchup analysis features:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-black/50 p-4 rounded-lg border border-red-500/10">
              <h3 className="text-lg font-bold text-white mb-2">Video Analysis</h3>
              <p className="text-gray-400 text-sm">
                AI-powered video breakdown of fighting techniques and tendencies for each fighter.
              </p>
            </div>
            
            <div className="bg-black/50 p-4 rounded-lg border border-red-500/10">
              <h3 className="text-lg font-bold text-white mb-2">Expert Commentary</h3>
              <p className="text-gray-400 text-sm">
                Access insights from MMA coaches and analysts on specific matchups.
              </p>
            </div>
            
            <div className="bg-black/50 p-4 rounded-lg border border-red-500/10">
              <h3 className="text-lg font-bold text-white mb-2">Betting Insights</h3>
              <p className="text-gray-400 text-sm">
                Prop bet recommendations and value analysis based on matchup statistics.
              </p>
            </div>
          </div>
          
          <div className="flex justify-center mt-6">
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              Upgrade to Premium
            </Button>
          </div>
        </div>
        
        <div className="flex justify-center">
          <Link href="/compare">
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              <Swords className="h-4 w-4 mr-2" />
              Compare Fighters Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
