import { FighterComparison } from "@/components";
import { Particles } from "@/components/ui/particles";

export const metadata = {
  title: "Compare UFC Fighters | UFC Predict",
  description: "Compare UFC fighters head-to-head with detailed statistical analysis and fight predictions.",
};

// Mock fighter data for comparison
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
    isChampion: true,
    stats: {
      strikingAccuracy: 58,
      takedownAccuracy: 47,
      strikesLandedPerMin: 4.3,
      strikesAbsorbedPerMin: 2.1,
      takedownAvg: 1.9,
      submissionAvg: 0.5,
      knockoutPercentage: 37,
      winPercentage: 96
    }
  },
  {
    id: "alex-pereira",
    name: "Alex Pereira",
    nickname: "Poatan",
    image: "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2023-11/PEREIRA_ALEX_L_BELT_11_11.png?itok=bCMdxAYs",
    country: "Brazil",
    age: 36,
    height: "6'4\"",
    weight: "205 lbs",
    reach: "79\"",
    stance: "Orthodox",
    record: "9-2-0",
    division: "Light Heavyweight",
    isChampion: true,
    stats: {
      strikingAccuracy: 62,
      takedownAccuracy: 33,
      strikesLandedPerMin: 5.1,
      strikesAbsorbedPerMin: 3.8,
      takedownAvg: 0.3,
      submissionAvg: 0.0,
      knockoutPercentage: 78,
      winPercentage: 82
    }
  },
  {
    id: "islam-makhachev",
    name: "Islam Makhachev",
    nickname: "",
    image: "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2023-10/MAKHACHEV_ISLAM_L_BELT_10_21.png?itok=Yk8QySGj",
    country: "Russia",
    age: 32,
    height: "5'10\"",
    weight: "155 lbs",
    reach: "70.5\"",
    stance: "Southpaw",
    record: "25-1-0",
    division: "Lightweight",
    isChampion: true,
    stats: {
      strikingAccuracy: 53,
      takedownAccuracy: 68,
      strikesLandedPerMin: 2.5,
      strikesAbsorbedPerMin: 0.8,
      takedownAvg: 3.4,
      submissionAvg: 1.1,
      knockoutPercentage: 16,
      winPercentage: 96
    }
  },
  {
    id: "leon-edwards",
    name: "Leon Edwards",
    nickname: "Rocky",
    image: "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2023-03/EDWARDS_LEON_L_BELT_03_18.png?itok=P58mPwGW",
    country: "United Kingdom",
    age: 32,
    height: "6'0\"",
    weight: "170 lbs",
    reach: "74\"",
    stance: "Southpaw",
    record: "21-3-0",
    division: "Welterweight",
    isChampion: true,
    stats: {
      strikingAccuracy: 50,
      takedownAccuracy: 35,
      strikesLandedPerMin: 2.6,
      strikesAbsorbedPerMin: 2.0,
      takedownAvg: 1.5,
      submissionAvg: 0.3,
      knockoutPercentage: 33,
      winPercentage: 88
    }
  },
  {
    id: "sean-omalley",
    name: "Sean O'Malley",
    nickname: "Sugar",
    image: "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2023-08/OMALLEY_SEAN_L_BELT_08_19.png?itok=ZBQQnGDl",
    country: "United States",
    age: 29,
    height: "5'11\"",
    weight: "135 lbs",
    reach: "72\"",
    stance: "Switch",
    record: "17-1-0",
    division: "Bantamweight",
    isChampion: true,
    stats: {
      strikingAccuracy: 62,
      takedownAccuracy: 25,
      strikesLandedPerMin: 6.4,
      strikesAbsorbedPerMin: 3.5,
      takedownAvg: 0.2,
      submissionAvg: 0.4,
      knockoutPercentage: 71,
      winPercentage: 94
    }
  },
  {
    id: "dustin-poirier",
    name: "Dustin Poirier",
    nickname: "The Diamond",
    image: "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2023-07/POIRIER_DUSTIN_L_07-29.png?itok=EsXPQV1D",
    country: "United States",
    age: 35,
    height: "5'9\"",
    weight: "155 lbs",
    reach: "72\"",
    stance: "Southpaw",
    record: "29-8-0",
    division: "Lightweight",
    ranking: 3,
    stats: {
      strikingAccuracy: 53,
      takedownAccuracy: 41,
      strikesLandedPerMin: 5.7,
      strikesAbsorbedPerMin: 4.2,
      takedownAvg: 1.5,
      submissionAvg: 1.3,
      knockoutPercentage: 48,
      winPercentage: 78
    }
  },
  {
    id: "max-holloway",
    name: "Max Holloway",
    nickname: "Blessed",
    image: "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2023-08/HOLLOWAY_MAX_L_08_26.png?itok=3UEayjOl",
    country: "United States",
    age: 32,
    height: "5'11\"",
    weight: "145 lbs",
    reach: "69\"",
    stance: "Orthodox",
    record: "25-7-0",
    division: "Featherweight",
    ranking: 1,
    stats: {
      strikingAccuracy: 47,
      takedownAccuracy: 56,
      strikesLandedPerMin: 7.2,
      strikesAbsorbedPerMin: 4.5,
      takedownAvg: 0.9,
      submissionAvg: 0.3,
      knockoutPercentage: 48,
      winPercentage: 78
    }
  },
  {
    id: "zhang-weili",
    name: "Zhang Weili",
    nickname: "Magnum",
    image: "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2023-08/ZHANG_WEILI_L_BELT_08_19.png?itok=Hf0OdOK2",
    country: "China",
    age: 34,
    height: "5'4\"",
    weight: "115 lbs",
    reach: "63\"",
    stance: "Orthodox",
    record: "24-3-0",
    division: "Women's Strawweight",
    isChampion: true,
    stats: {
      strikingAccuracy: 45,
      takedownAccuracy: 42,
      strikesLandedPerMin: 5.9,
      strikesAbsorbedPerMin: 4.1,
      takedownAvg: 1.8,
      submissionAvg: 0.7,
      knockoutPercentage: 46,
      winPercentage: 89
    }
  }
];

export default function CompareFightersPage() {
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
            Compare <span className="text-red-500">Fighters</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Compare any two UFC fighters head-to-head with detailed statistical analysis. 
            See how fighters match up across various metrics and get data-driven fight predictions.
          </p>
        </div>
        
        <div className="bg-black/30 border border-red-500/20 rounded-lg p-6">
          <FighterComparison fighters={MOCK_FIGHTERS} />
        </div>
        
        <div className="mt-12 bg-black/30 border border-red-500/20 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-white">How Our <span className="text-red-500">Comparison Tool</span> Works</h2>
          <p className="text-gray-300 mb-4">
            Our fighter comparison tool uses advanced statistical analysis to provide insights into potential matchups between UFC fighters. 
            The tool considers various factors including:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
            <li>Striking accuracy and volume</li>
            <li>Takedown efficiency and defense</li>
            <li>Submission attempts and success rate</li>
            <li>Fight IQ and adaptability</li>
            <li>Physical attributes (reach, height, etc.)</li>
            <li>Historical performance against similar opponents</li>
          </ul>
          <p className="text-gray-300">
            While our predictions are based on comprehensive data analysis, MMA is an unpredictable sport where anything can happen. 
            Our tool provides insights to enhance your understanding of potential matchups, but should be used as one of many factors 
            in your own analysis.
          </p>
        </div>
      </div>
    </div>
  );
}
