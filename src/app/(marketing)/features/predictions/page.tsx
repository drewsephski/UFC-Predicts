import FightPrediction from "@/components/ufc/fight-prediction";
import { Particles } from "@/components/ui/particles";
import { Button } from "@/components/ui/button";
import { TrendingUp, Brain, BarChart3, Award } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Fight Predictions | UFC Predict",
  description: "Learn about our data-driven UFC fight prediction system that analyzes fighter statistics and historical data to predict fight outcomes.",
};

// Mock prediction data for example
const EXAMPLE_PREDICTION = {
  id: "ufc-300-main",
  eventName: "UFC 300",
  eventDate: "2024-04-13",
  fighter1: {
    id: "alex-pereira",
    name: "Alex Pereira",
    image: "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2023-11/PEREIRA_ALEX_L_BELT_11_11.png?itok=bCMdxAYs",
    record: "9-2-0",
    winPercentage: 82
  },
  fighter2: {
    id: "jamahal-hill",
    name: "Jamahal Hill",
    image: "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2023-01/HILL_JAMAHAL_L_BELT_01_21.png?itok=xTAyVMWF",
    record: "12-1-0",
    winPercentage: 92
  },
  predictionConfidence: 65,
  predictionWinner: "Alex Pereira",
  predictionMethod: "KO/TKO",
  predictionRound: 2,
  predictionReasoning: "Pereira&apos;s striking power and recent momentum give him the edge, though Hill&apos;s speed could pose problems."
};

export default function PredictionsFeaturePage() {
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
            Data-Driven <span className="text-red-500">Fight Predictions</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Our advanced prediction system analyzes thousands of data points to provide 
            accurate fight predictions for upcoming UFC events. Gain insights that can 
            help you make more informed decisions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-black/30 border border-red-500/20 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Brain className="h-6 w-6 text-red-500 mr-3" />
              <h2 className="text-2xl font-bold text-white">Advanced AI Analysis</h2>
            </div>
            <p className="text-gray-300 mb-4">
              Our prediction system uses machine learning algorithms trained on historical UFC fight data 
              to identify patterns and predict outcomes with impressive accuracy.
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Analyzes over 100 fighter metrics per matchup</li>
              <li>Considers fighting style compatibility</li>
              <li>Accounts for recent performance trends</li>
              <li>Updates in real-time as new data becomes available</li>
            </ul>
          </div>
          
          <div className="bg-black/30 border border-red-500/20 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <BarChart3 className="h-6 w-6 text-red-500 mr-3" />
              <h2 className="text-2xl font-bold text-white">Comprehensive Statistics</h2>
            </div>
            <p className="text-gray-300 mb-4">
              Our system goes beyond basic win/loss records to analyze the nuanced aspects of each fighter&apos;s performance.
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Striking accuracy and defensive metrics</li>
              <li>Grappling efficiency and submission defense</li>
              <li>Cardio and performance over time</li>
              <li>Historical performance against similar opponents</li>
            </ul>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center text-white">
            Example <span className="text-red-500">Prediction</span>
          </h2>
          <div className="max-w-2xl mx-auto">
            <FightPrediction {...EXAMPLE_PREDICTION} />
          </div>
        </div>
        
        <div className="bg-black/30 border border-red-500/20 rounded-lg p-6 mb-12">
          <div className="flex items-center mb-4">
            <Award className="h-6 w-6 text-red-500 mr-3" />
            <h2 className="text-2xl font-bold text-white">Premium Prediction Features</h2>
          </div>
          <p className="text-gray-300 mb-4">
            Upgrade to our premium plan to unlock advanced prediction features:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
            <li>Detailed round-by-round predictions</li>
            <li>Prop bet recommendations with confidence ratings</li>
            <li>Early access to predictions for upcoming events</li>
            <li>Historical prediction accuracy tracking</li>
            <li>Custom alerts for high-confidence predictions</li>
          </ul>
          <div className="flex justify-center mt-6">
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              Upgrade to Premium
            </Button>
          </div>
        </div>
        
        <div className="flex justify-center">
          <Link href="/predictions">
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              <TrendingUp className="h-4 w-4 mr-2" />
              View Current Predictions
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
