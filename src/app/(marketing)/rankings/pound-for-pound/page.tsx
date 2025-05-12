import { RankingsTable } from "@/components";
import { Particles } from "@/components/ui/particles";
import { Button } from "@/components/ui/button";
import { Award, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const metadata = {
  title: "UFC Pound for Pound Rankings | UFC Predict",
  description: "View the current UFC pound-for-pound rankings featuring the best fighters across all weight divisions.",
};

// Mock pound-for-pound rankings data
const P4P_RANKINGS = {
  division: "Pound for Pound",
  champion: {
    id: "jon-jones",
    name: "Jon Jones",
    country: "United States",
    record: "27-1-0"
  },
  rankings: [
    {
      id: "islam-makhachev",
      name: "Islam Makhachev",
      country: "Russia",
      record: "25-1-0"
    },
    {
      id: "alex-pereira",
      name: "Alex Pereira",
      country: "Brazil",
      record: "9-2-0"
    },
    {
      id: "leon-edwards",
      name: "Leon Edwards",
      country: "United Kingdom",
      record: "21-3-0"
    },
    {
      id: "ilia-topuria",
      name: "Ilia Topuria",
      country: "Spain",
      record: "15-0-0"
    },
    {
      id: "sean-omalley",
      name: "Sean O'Malley",
      country: "United States",
      record: "17-1-0"
    },
    {
      id: "dricus-du-plessis",
      name: "Dricus Du Plessis",
      country: "South Africa",
      record: "21-2-0"
    },
    {
      id: "alexandre-pantoja",
      name: "Alexandre Pantoja",
      country: "Brazil",
      record: "27-5-0"
    },
    {
      id: "max-holloway",
      name: "Max Holloway",
      country: "United States",
      record: "25-7-0"
    },
    {
      id: "belal-muhammad",
      name: "Belal Muhammad",
      country: "United States",
      record: "23-3-0"
    },
    {
      id: "tom-aspinall",
      name: "Tom Aspinall",
      country: "United Kingdom",
      record: "14-3-0"
    },
    {
      id: "charles-oliveira",
      name: "Charles Oliveira",
      country: "Brazil",
      record: "34-9-0"
    },
    {
      id: "dustin-poirier",
      name: "Dustin Poirier",
      country: "United States",
      record: "29-8-0"
    },
    {
      id: "zhang-weili",
      name: "Zhang Weili",
      country: "China",
      record: "24-3-0"
    },
    {
      id: "alexander-volkanovski",
      name: "Alexander Volkanovski",
      country: "Australia",
      record: "26-3-0"
    },
    {
      id: "merab-dvalishvili",
      name: "Merab Dvalishvili",
      country: "Georgia",
      record: "16-4-0"
    }
  ]
};

export default function PoundForPoundRankingsPage() {
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
            UFC Pound for Pound <span className="text-red-500">Rankings</span>
          </h1>
          <div className="flex items-center justify-center mb-4">
            <Award className="h-6 w-6 text-red-500 mr-2" />
            <p className="text-gray-300">The best fighters across all weight divisions</p>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 ml-2">
                    <Info className="h-4 w-4 text-gray-400" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>Pound-for-pound rankings represent the best UFC fighters regardless of weight class, based on skill, accomplishments, and recent performances.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            The pound-for-pound rankings represent the very best fighters in the UFC regardless of weight class. 
            These rankings consider overall skill, championship accomplishments, quality of competition, and recent performances.
          </p>
        </div>
        
        <div className="bg-black/30 border border-red-500/20 rounded-lg p-6 mb-12">
          <RankingsTable 
            division={P4P_RANKINGS.division}
            champion={P4P_RANKINGS.champion}
            rankings={P4P_RANKINGS.rankings}
          />
        </div>
        
        <div className="bg-black/30 border border-red-500/20 rounded-lg p-6 mb-12">
          <h2 className="text-2xl font-bold mb-4 text-white">
            About the <span className="text-red-500">Pound-for-Pound Rankings</span>
          </h2>
          <p className="text-gray-300 mb-4">
            The UFC pound-for-pound rankings represent a hypothetical comparison of fighters across different weight classes. 
            These rankings aim to answer the question: &quot;If all fighters were the same size, who would be the best?&quot;
          </p>
          <p className="text-gray-300 mb-4">
            Factors that influence pound-for-pound rankings include:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
            <li>Championship status and title defenses</li>
            <li>Quality of opposition faced</li>
            <li>Dominance in victories</li>
            <li>Technical skill and fighting IQ</li>
            <li>Recent performances and activity</li>
            <li>Overall career accomplishments</li>
          </ul>
          <p className="text-gray-300">
            The pound-for-pound rankings are updated after each UFC event and can change based on fighter performances, 
            title changes, and other factors. These rankings are subjective and often spark debate among fans and analysts.
          </p>
        </div>
        
        <div className="flex justify-center space-x-4">
          <Button className="bg-red-600 hover:bg-red-700 text-white">
            View Men&apos;s P4P History
          </Button>
          <Button className="bg-red-600 hover:bg-red-700 text-white">
            View Women&apos;s P4P Rankings
          </Button>
        </div>
      </div>
    </div>
  );
}
