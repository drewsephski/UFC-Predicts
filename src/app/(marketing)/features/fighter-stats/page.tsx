import { Particles } from "@/components/ui/particles";
import { Button } from "@/components/ui/button";
import { Dumbbell, Target, Shield, Clock, BarChart3 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Fighter Stats | UFC Predict",
  description: "Access comprehensive UFC fighter statistics including striking, grappling, and performance metrics for all active UFC fighters.",
};

export default function FighterStatsFeaturePage() {
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
            Comprehensive <span className="text-red-500">Fighter Statistics</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Access detailed statistics for all UFC fighters, including striking accuracy, 
            grappling efficiency, fight history, and performance metrics. Gain insights 
            into fighter strengths, weaknesses, and tendencies.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-black/30 border border-red-500/20 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Target className="h-6 w-6 text-red-500 mr-3" />
              <h2 className="text-2xl font-bold text-white">Striking Analytics</h2>
            </div>
            <p className="text-gray-300 mb-4">
              Detailed striking statistics for every UFC fighter, broken down by technique and position.
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Strikes landed per minute</li>
              <li>Striking accuracy percentage</li>
              <li>Strikes absorbed per minute</li>
              <li>Striking defense percentage</li>
              <li>Knockdown ratio and KO percentage</li>
              <li>Head/body/leg strike distribution</li>
            </ul>
          </div>
          
          <div className="bg-black/30 border border-red-500/20 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Dumbbell className="h-6 w-6 text-red-500 mr-3" />
              <h2 className="text-2xl font-bold text-white">Grappling Metrics</h2>
            </div>
            <p className="text-gray-300 mb-4">
              Comprehensive grappling statistics to understand a fighter&apos;s ground game and wrestling abilities.
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Takedown accuracy and defense</li>
              <li>Average takedowns per 15 minutes</li>
              <li>Submission attempts and success rate</li>
              <li>Ground control time percentage</li>
              <li>Reversals and sweeps</li>
              <li>Ground strike efficiency</li>
            </ul>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-black/30 border border-red-500/20 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Clock className="h-6 w-6 text-red-500 mr-3" />
              <h2 className="text-2xl font-bold text-white">Fight History & Trends</h2>
            </div>
            <p className="text-gray-300 mb-4">
              Detailed fight history with performance trends and pattern analysis.
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Complete professional fight record</li>
              <li>Performance trends over time</li>
              <li>Win/loss methods breakdown</li>
              <li>Round-by-round performance analysis</li>
              <li>Fight of the Night and Performance bonuses</li>
            </ul>
          </div>
          
          <div className="bg-black/30 border border-red-500/20 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Shield className="h-6 w-6 text-red-500 mr-3" />
              <h2 className="text-2xl font-bold text-white">Physical Attributes</h2>
            </div>
            <p className="text-gray-300 mb-4">
              Physical measurements and attributes that impact fighting style and matchups.
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Height, reach, and weight metrics</li>
              <li>Age and experience factors</li>
              <li>Stance analysis (orthodox/southpaw)</li>
              <li>Reach advantage/disadvantage history</li>
              <li>Weight class movement history</li>
            </ul>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center text-white">
            Fighter Stats <span className="text-red-500">Visualization</span>
          </h2>
          
          <div className="relative w-full h-[400px] bg-black/30 border border-red-500/20 rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-16 w-16 text-red-500 mx-auto mb-4" />
                <p className="text-white text-lg font-bold">Interactive Fighter Statistics Dashboard</p>
                <p className="text-gray-400 text-sm mt-2">Premium feature preview</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
          </div>
        </div>
        
        <div className="bg-black/30 border border-red-500/20 rounded-lg p-6 mb-12">
          <h2 className="text-2xl font-bold mb-4 text-center text-white">
            Premium <span className="text-red-500">Stats Features</span>
          </h2>
          <p className="text-gray-300 mb-6 text-center">
            Upgrade to our premium plan to unlock advanced statistical features:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-black/50 p-4 rounded-lg border border-red-500/10">
              <h3 className="text-lg font-bold text-white mb-2">Advanced Metrics</h3>
              <p className="text-gray-400 text-sm">
                Access proprietary metrics like Striking Efficiency Index, Grappling Dominance Score, and more.
              </p>
            </div>
            
            <div className="bg-black/50 p-4 rounded-lg border border-red-500/10">
              <h3 className="text-lg font-bold text-white mb-2">Interactive Dashboards</h3>
              <p className="text-gray-400 text-sm">
                Customize your own statistical dashboards with drag-and-drop visualization tools.
              </p>
            </div>
            
            <div className="bg-black/50 p-4 rounded-lg border border-red-500/10">
              <h3 className="text-lg font-bold text-white mb-2">Matchup Analysis</h3>
              <p className="text-gray-400 text-sm">
                Compare any two fighters with side-by-side statistical breakdowns and matchup predictions.
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
          <Link href="/fighters">
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              <Dumbbell className="h-4 w-4 mr-2" />
              Browse Fighter Database
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
