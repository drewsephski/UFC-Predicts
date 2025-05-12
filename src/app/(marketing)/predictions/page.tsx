import { FightPredictionForm as FightPrediction } from "@/components";
import { Particles } from "@/components/ui/particles";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UPCOMING_UFC_EVENTS } from "@/constants";
import { CalendarRange, TrendingUp } from "lucide-react";

export const metadata = {
  title: "UFC Fight Predictions | UFC Predict",
  description: "Get data-driven predictions for upcoming UFC fights based on fighter statistics, historical performance, and matchup analysis.",
};

// Mock prediction data
const MOCK_PREDICTIONS = [
  {
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
    predictionReasoning: "Pereira's striking power and recent momentum give him the edge, though Hill's speed could pose problems."
  },
  {
    id: "ufc-300-co-main",
    eventName: "UFC 300",
    eventDate: "2024-04-13",
    fighter1: {
      id: "zhang-weili",
      name: "Zhang Weili",
      image: "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2023-08/ZHANG_WEILI_L_BELT_08_19.png?itok=_QbQBcbP",
      record: "24-3-0",
      winPercentage: 89
    },
    fighter2: {
      id: "yan-xiaonan",
      name: "Yan Xiaonan",
      image: "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2023-05/XIAONAN_YAN_L_05_13.png?itok=Ub0SPtRs",
      record: "18-3-0",
      winPercentage: 86
    },
    predictionConfidence: 75,
    predictionWinner: "Zhang Weili",
    predictionMethod: "Decision",
    predictionRound: 5,
    predictionReasoning: "Zhang's well-rounded skillset and championship experience should lead to a competitive but clear decision victory."
  },
  {
    id: "ufc-301-main",
    eventName: "UFC 301",
    eventDate: "2024-05-04",
    fighter1: {
      id: "alexandre-pantoja",
      name: "Alexandre Pantoja",
      image: "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2023-07/PANTOJA_ALEXANDRE_L_BELT_07_08.png?itok=Iy5r8To0",
      record: "27-5-0",
      winPercentage: 84
    },
    fighter2: {
      id: "steve-erceg",
      name: "Steve Erceg",
      image: "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2023-09/ERCEG_STEVE_L_09_16.png?itok=Iy5r8To0",
      record: "12-1-0",
      winPercentage: 92
    },
    predictionConfidence: 70,
    predictionWinner: "Alexandre Pantoja",
    predictionMethod: "Submission",
    predictionRound: 3,
    predictionReasoning: "Pantoja's grappling advantage and championship experience should lead to a submission victory in the middle rounds."
  },
  {
    id: "ufc-fight-night-main",
    eventName: "UFC Fight Night",
    eventDate: "2024-04-27",
    fighter1: {
      id: "brendan-allen",
      name: "Brendan Allen",
      image: "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2023-06/ALLEN_BRENDAN_L_06_10.png?itok=Iy5r8To0",
      record: "23-5-0",
      winPercentage: 82
    },
    fighter2: {
      id: "chris-curtis",
      name: "Chris Curtis",
      image: "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2023-04/CURTIS_CHRIS_L_04_15.png?itok=Iy5r8To0",
      record: "30-10-0",
      winPercentage: 75
    },
    predictionConfidence: 55,
    predictionWinner: "Brendan Allen",
    predictionMethod: "Decision",
    predictionRound: 5,
    predictionReasoning: "Very close matchup with Allen's grappling giving him a slight edge in what should be a competitive striking battle."
  }
];

export default function PredictionsPage() {
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
            UFC Fight <span className="text-red-500">Predictions</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Get data-driven predictions for upcoming UFC fights based on fighter statistics, 
            historical performance, and matchup analysis. Our AI-powered model analyzes 
            thousands of data points to provide accurate fight predictions.
          </p>
        </div>
        
        <Tabs defaultValue="upcoming" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-black/50 border border-red-500/30">
              <TabsTrigger 
                value="upcoming" 
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white text-gray-300"
              >
                <CalendarRange className="h-4 w-4 mr-2" />
                Upcoming Fights
              </TabsTrigger>
              <TabsTrigger 
                value="trending" 
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white text-gray-300"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Trending Predictions
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="upcoming" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {MOCK_PREDICTIONS.map((prediction) => (
                <FightPrediction
                  key={prediction.id}
                  {...prediction}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="trending" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Show the same predictions but in different order for demo purposes */}
              {[...MOCK_PREDICTIONS].reverse().map((prediction) => (
                <FightPrediction
                  key={prediction.id}
                  {...prediction}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-16 bg-black/30 border border-red-500/20 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-white">How Our <span className="text-red-500">Prediction Model</span> Works</h2>
          <p className="text-gray-300 mb-4">
            Our UFC fight prediction model uses advanced machine learning algorithms to analyze fighter data and predict fight outcomes. 
            The model considers various factors including:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
            <li>Fighter&apos;s recent performance and win/loss streaks</li>
            <li>Striking accuracy, volume, and defensive statistics</li>
            <li>Takedown efficiency and submission skills</li>
            <li>Physical attributes (reach, height, age)</li>
            <li>Fighting style matchups and historical performance against similar opponents</li>
            <li>Training camp information and fighter condition</li>
          </ul>
          <p className="text-gray-300">
            While our model provides data-driven predictions, MMA is unpredictable by nature. 
            Our predictions should be used as one tool among many when analyzing fights.
          </p>
        </div>
        
        <div className="flex justify-center mt-12">
          <Button className="bg-red-600 hover:bg-red-700 text-white">
            View All Predictions
          </Button>
        </div>
      </div>
    </div>
  );
}
