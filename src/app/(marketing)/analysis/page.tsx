import { Particles } from "@/components/ui/particles";
import { Button } from "@/components/ui/button";
import { BarChart3, LineChart, PieChart, AreaChart, Layers, Brain } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "UFC Fight Analysis | UFC Predict",
  description: "Access in-depth UFC fight analysis, including striking patterns, grappling efficiency, and strategic breakdowns of past and upcoming fights.",
};

export default function AnalysisPage() {
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
            UFC Fight <span className="text-red-500">Analysis</span>
          </h1>
          <div className="flex items-center justify-center mb-4">
            <BarChart3 className="h-6 w-6 text-red-500 mr-2" />
            <p className="text-gray-300">In-depth analysis of UFC fights and fighter performance</p>
          </div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Dive deep into UFC fights with our comprehensive analysis tools. Explore striking patterns, 
            grappling efficiency, fight strategies, and more to gain insights into past performances 
            and upcoming matchups.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-black/30 border border-red-500/20 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <LineChart className="h-6 w-6 text-red-500 mr-3" />
              <h2 className="text-2xl font-bold text-white">Performance Metrics</h2>
            </div>
            <p className="text-gray-300 mb-4">
              Track and analyze fighter performance across multiple metrics and dimensions.
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Striking accuracy and volume trends</li>
              <li>Takedown success rate over time</li>
              <li>Submission attempts and defense</li>
              <li>Round-by-round performance analysis</li>
              <li>Fight pace and cardio assessment</li>
              <li>Damage absorption and recovery patterns</li>
            </ul>
          </div>
          
          <div className="bg-black/30 border border-red-500/20 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <PieChart className="h-6 w-6 text-red-500 mr-3" />
              <h2 className="text-2xl font-bold text-white">Strategic Breakdowns</h2>
            </div>
            <p className="text-gray-300 mb-4">
              Understand the strategic elements that determine fight outcomes.
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Game plan analysis and execution</li>
              <li>Fighting style matchup dynamics</li>
              <li>Cage control and positioning impact</li>
              <li>Timing and counter-striking patterns</li>
              <li>Defensive tendencies and vulnerabilities</li>
              <li>Corner advice and mid-fight adjustments</li>
            </ul>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center text-white">
            Featured <span className="text-red-500">Analysis</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-black/30 border border-red-500/20 rounded-lg overflow-hidden">
              <div className="relative h-48 w-full">
                <Image
                  src="https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/image/ufc-fight-night/2023-12/PEREIRA_ALEX_BELT_11_11_VS_HILL_JAMAHAL_BELT_01_21.png?itok=Iy5r8To0"
                  alt="UFC 300: Pereira vs Hill Analysis"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-white text-lg font-bold">UFC 300: Pereira vs Hill</h3>
                  <p className="text-gray-300 text-sm">Technical Breakdown</p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-300 text-sm mb-4">
                  An in-depth analysis of the striking patterns, distance management, and power dynamics 
                  between Alex Pereira and Jamahal Hill ahead of their championship clash.
                </p>
                <Button variant="link" className="text-red-400 hover:text-red-300 p-0">
                  Read Analysis →
                </Button>
              </div>
            </div>
            
            <div className="bg-black/30 border border-red-500/20 rounded-lg overflow-hidden">
              <div className="relative h-48 w-full">
                <Image
                  src="https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/image/ufc-fight-night/2023-12/ZHANG_WEILI_BELT_08_19_VS_XIAONAN_YAN_05_13.png?itok=Iy5r8To0"
                  alt="UFC 300: Zhang vs Yan Analysis"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-white text-lg font-bold">UFC 300: Zhang vs Yan</h3>
                  <p className="text-gray-300 text-sm">Grappling Analysis</p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-300 text-sm mb-4">
                  Examining the grappling exchanges, takedown defense, and ground control that will likely 
                  determine the outcome of this all-Chinese championship bout.
                </p>
                <Button variant="link" className="text-red-400 hover:text-red-300 p-0">
                  Read Analysis →
                </Button>
              </div>
            </div>
            
            <div className="bg-black/30 border border-red-500/20 rounded-lg overflow-hidden">
              <div className="relative h-48 w-full">
                <Image
                  src="https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/image/ufc-fight-night/2023-12/PANTOJA_ALEXANDRE_BELT_07_08_VS_ERCEG_STEVE_09_16.png?itok=Iy5r8To0"
                  alt="UFC 301: Pantoja vs Erceg Analysis"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-white text-lg font-bold">UFC 301: Pantoja vs Erceg</h3>
                  <p className="text-gray-300 text-sm">Fight IQ Breakdown</p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-300 text-sm mb-4">
                  Breaking down the tactical chess match between the champion&apos;s experience and the challenger&apos;s 
                  unorthodox approach in this flyweight title fight.
                </p>
                <Button variant="link" className="text-red-400 hover:text-red-300 p-0">
                  Read Analysis →
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-black/30 border border-red-500/20 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <AreaChart className="h-6 w-6 text-red-500 mr-3" />
              <h2 className="text-2xl font-bold text-white">Historical Fight Analysis</h2>
            </div>
            <p className="text-gray-300 mb-4">
              Revisit and analyze past UFC fights with our comprehensive database of fight metrics and video breakdowns.
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
              <li>Complete UFC fight library with detailed statistics</li>
              <li>Significant moments and turning points highlighted</li>
              <li>Expert commentary and technical breakdowns</li>
              <li>Fighter evolution and style development tracking</li>
            </ul>
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              Browse Fight Library
            </Button>
          </div>
          
          <div className="bg-black/30 border border-red-500/20 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Brain className="h-6 w-6 text-red-500 mr-3" />
              <h2 className="text-2xl font-bold text-white">AI-Powered Insights</h2>
            </div>
            <p className="text-gray-300 mb-4">
              Our advanced AI system analyzes thousands of data points to provide unique insights that might be missed by the human eye.
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
              <li>Pattern recognition across fighting styles</li>
              <li>Predictive modeling for fighter matchups</li>
              <li>Subtle technique effectiveness measurement</li>
              <li>Fatigue and momentum shift detection</li>
            </ul>
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              Try AI Analysis
            </Button>
          </div>
        </div>
        
        <div className="bg-black/30 border border-red-500/20 rounded-lg p-6 mb-12">
          <h2 className="text-2xl font-bold mb-4 text-center text-white">
            Premium <span className="text-red-500">Analysis Features</span>
          </h2>
          <p className="text-gray-300 text-center mb-6">
            Upgrade to our premium plan to access advanced analysis tools and exclusive content.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-black/50 p-4 rounded-lg border border-red-500/10">
              <div className="flex items-center mb-2">
                <Layers className="h-5 w-5 text-red-500 mr-2" />
                <h3 className="text-lg font-bold text-white">Frame-by-Frame Analysis</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Detailed frame-by-frame breakdown of critical fight moments with expert commentary.
              </p>
            </div>
            
            <div className="bg-black/50 p-4 rounded-lg border border-red-500/10">
              <div className="flex items-center mb-2">
                <BarChart3 className="h-5 w-5 text-red-500 mr-2" />
                <h3 className="text-lg font-bold text-white">Custom Analytics Dashboard</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Build your own analytics dashboard to track the metrics that matter most to you.
              </p>
            </div>
            
            <div className="bg-black/50 p-4 rounded-lg border border-red-500/10">
              <div className="flex items-center mb-2">
                <Brain className="h-5 w-5 text-red-500 mr-2" />
                <h3 className="text-lg font-bold text-white">Expert Video Breakdowns</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Access exclusive video content from MMA coaches and analysts breaking down fights.
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
          <Link href="/predictions">
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              View Fight Predictions
            </Button>
          </Link>
          <Link href="/statistics">
            <Button variant="outline" className="border-red-500/50 hover:bg-red-500/10 text-red-400 hover:text-red-300">
              Explore UFC Statistics
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
