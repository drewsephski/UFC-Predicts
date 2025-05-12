import { FighterCard } from "@/components";
import { Particles } from "@/components/ui/particles";
import { Button } from "@/components/ui/button";
import { TrendingUp, Star } from "lucide-react";

export const metadata = {
  title: "UFC Contender Series | UFC Predict",
  description: "Discover the top prospects from Dana White's Contender Series and rising UFC stars to watch in each division.",
};

// Mock contender data
const MOCK_CONTENDERS = [
  {
    id: "bo-nickal",
    name: "Bo Nickal",
    nickname: "",
    image: "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2023-12/NICKAL_BO_L_12_16.png?itok=P6J6DQpm",
    country: "United States",
    division: "Middleweight",
    record: "5-0-0",
    winsByKO: 2,
    winsBySub: 3,
    winsByDec: 0,
    isChampion: false
  },
  {
    id: "raul-rosas-jr",
    name: "Raul Rosas Jr.",
    nickname: "El Niño Problema",
    image: "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2023-12/ROSAS_RAUL_JR_L_12_09.png?itok=P6J6DQpm",
    country: "Mexico",
    division: "Bantamweight",
    record: "8-1-0",
    winsByKO: 1,
    winsBySub: 5,
    winsByDec: 2,
    isChampion: false
  },
  {
    id: "joe-pyfer",
    name: "Joe Pyfer",
    nickname: "Bodybagz",
    image: "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2023-10/PYFER_JOE_L_10_07.png?itok=P6J6DQpm",
    country: "United States",
    division: "Middleweight",
    record: "12-3-0",
    winsByKO: 8,
    winsBySub: 3,
    winsByDec: 1,
    isChampion: false
  },
  {
    id: "michael-morales",
    name: "Michael Morales",
    nickname: "",
    image: "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2023-07/MORALES_MICHAEL_L_07_29.png?itok=P6J6DQpm",
    country: "Ecuador",
    division: "Welterweight",
    record: "15-0-0",
    winsByKO: 10,
    winsBySub: 1,
    winsByDec: 4,
    isChampion: false
  },
  {
    id: "jack-della-maddalena",
    name: "Jack Della Maddalena",
    nickname: "",
    image: "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2023-07/DELLA%20MADDALENA_JACK_L_07_08.png?itok=P6J6DQpm",
    country: "Australia",
    division: "Welterweight",
    record: "16-2-0",
    winsByKO: 12,
    winsBySub: 1,
    winsByDec: 3,
    isChampion: false
  },
  {
    id: "muhammad-mokaev",
    name: "Muhammad Mokaev",
    nickname: "The Punisher",
    image: "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2023-03/MOKAEV_MUHAMMAD_L_03_18.png?itok=P6J6DQpm",
    country: "United Kingdom",
    division: "Flyweight",
    record: "11-0-0",
    winsByKO: 2,
    winsBySub: 6,
    winsByDec: 3,
    isChampion: false
  },
  {
    id: "shara-magomedov",
    name: "Shara Magomedov",
    nickname: "Bullet",
    image: "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2024-01/MAGOMEDOV_SHARA_L_01_20.png?itok=P6J6DQpm",
    country: "Russia",
    division: "Middleweight",
    record: "12-0-0",
    winsByKO: 9,
    winsBySub: 0,
    winsByDec: 3,
    isChampion: false
  },
  {
    id: "natalia-silva",
    name: "Natalia Silva",
    nickname: "",
    image: "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2023-06/SILVA_NATALIA_L_06_10.png?itok=P6J6DQpm",
    country: "Brazil",
    division: "Women's Flyweight",
    record: "16-5-1",
    winsByKO: 7,
    winsBySub: 4,
    winsByDec: 5,
    isChampion: false
  }
];

export default function ContendersRankingsPage() {
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
            UFC <span className="text-red-500">Contender Series</span>
          </h1>
          <div className="flex items-center justify-center mb-4">
            <TrendingUp className="h-6 w-6 text-red-500 mr-2" />
            <p className="text-gray-300">Rising stars and top prospects in the UFC</p>
          </div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Discover the most promising up-and-coming fighters in the UFC, including Dana White&apos;s Contender Series 
            standouts and undefeated prospects who are making waves in their divisions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {MOCK_CONTENDERS.map((contenderFighter) => {
            const recordParts = contenderFighter.record.split('-');
            const nameParts = contenderFighter.name.split(' ');
            const firstName = nameParts[0] || null;
            const lastName = nameParts.slice(1).join(' ') || null;

            const fighterDataForCard: import('@/types/mma').Fighter = {
              FighterId: Number.parseInt(contenderFighter.id.replace(/\D/g, ''), 10) || Date.now() + Math.random(), // Ensure a number, fallback for non-numeric IDs
              FirstName: firstName,
              LastName: lastName,
              Nickname: contenderFighter.nickname || null,
              WeightClass: contenderFighter.division,
              Wins: Number.parseInt(recordParts[0] || '0', 10),
              Losses: Number.parseInt(recordParts[1] || '0', 10),
              Draws: Number.parseInt(recordParts[2] || '0', 10),
              TechnicalKnockouts: contenderFighter.winsByKO,
              Submissions: contenderFighter.winsBySub,
              // --- Fill in other required/optional fields from src/types/mma.ts#Fighter ---
              BirthDate: null, 
              Height: null,
              Weight: null,
              Reach: null,
              NoContests: 0, // Default if not available
              TechnicalKnockoutLosses: null,
              SubmissionLosses: null,
              TitleWins: contenderFighter.isChampion ? 1 : 0,
              TitleLosses: null,
              TitleDraws: null,
              CareerStats: null, // Assuming CareerStats is complex and not in MOCK_CONTENDERS
            };

            return (
              <FighterCard
                fighter={fighterDataForCard}
                key={contenderFighter.id}
              />
            );
          })}
        </div>
        
        <div className="bg-black/30 border border-red-500/20 rounded-lg p-6 mb-12">
          <h2 className="text-2xl font-bold mb-4 text-white flex items-center">
            <Star className="h-5 w-5 text-red-500 mr-2" />
            About the <span className="text-red-500 ml-2">Contender Series</span>
          </h2>
          <p className="text-gray-300 mb-4">
            Dana White&apos;s Contender Series (DWCS) is a mixed martial arts competition that features upcoming talent. 
            Fighters compete in front of UFC President Dana White, with impressive performers earning UFC contracts.
          </p>
          <p className="text-gray-300 mb-4">
            The series has launched the careers of many successful UFC fighters, including:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
            <li>Sean O&apos;Malley (current UFC Bantamweight Champion)</li>
            <li>Alex Pereira (current UFC Light Heavyweight Champion)</li>
            <li>Jamahal Hill (former UFC Light Heavyweight Champion)</li>
            <li>Geoff Neal (UFC Welterweight contender)</li>
            <li>Maycee Barber (UFC Women&apos;s Flyweight contender)</li>
            <li>Kevin Holland (UFC Middleweight contender)</li>
          </ul>
          <p className="text-gray-300">
            The Contender Series focuses on finding fighters who not only win but do so in exciting fashion. 
            Dana White often emphasizes that he&apos;s looking for fighters who &quot;want to be here&quot; and who demonstrate 
            the potential to become UFC stars.
          </p>
        </div>
        
        <div className="bg-black/30 border border-red-500/20 rounded-lg p-6 mb-12">
          <h2 className="text-2xl font-bold mb-4 text-white">
            Prospects to <span className="text-red-500">Watch</span>
          </h2>
          <p className="text-gray-300 mb-4">
            Beyond the Contender Series, the UFC is constantly bringing in talented fighters from around the world. 
            Here are some key prospects to watch in each division:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-black/50 p-4 rounded-lg border border-red-500/10">
              <h3 className="text-lg font-bold text-white mb-2">Heavyweight</h3>
              <p className="text-gray-400 text-sm">
                Jailton Almeida, Alexandr Romanov, Marcin Tybura
              </p>
            </div>
            
            <div className="bg-black/50 p-4 rounded-lg border border-red-500/10">
              <h3 className="text-lg font-bold text-white mb-2">Light Heavyweight</h3>
              <p className="text-gray-400 text-sm">
                Azamat Murzakanov, Dustin Jacoby, Carlos Ulberg
              </p>
            </div>
            
            <div className="bg-black/50 p-4 rounded-lg border border-red-500/10">
              <h3 className="text-lg font-bold text-white mb-2">Middleweight</h3>
              <p className="text-gray-400 text-sm">
                Bo Nickal, Caio Borralho, Nassourdine Imavov
              </p>
            </div>
            
            <div className="bg-black/50 p-4 rounded-lg border border-red-500/10">
              <h3 className="text-lg font-bold text-white mb-2">Welterweight</h3>
              <p className="text-gray-400 text-sm">
                Ian Machado Garry, Shavkat Rakhmonov, Michael Morales
              </p>
            </div>
            
            <div className="bg-black/50 p-4 rounded-lg border border-red-500/10">
              <h3 className="text-lg font-bold text-white mb-2">Lightweight</h3>
              <p className="text-gray-400 text-sm">
                Paddy Pimblett, Terrance McKinney, Jalin Turner
              </p>
            </div>
            
            <div className="bg-black/50 p-4 rounded-lg border border-red-500/10">
              <h3 className="text-lg font-bold text-white mb-2">Featherweight</h3>
              <p className="text-gray-400 text-sm">
                Movsar Evloev, Bryce Mitchell, Lerone Murphy
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center">
          <Button className="bg-red-600 hover:bg-red-700 text-white">
            <TrendingUp className="h-4 w-4 mr-2" />
            View All Prospects
          </Button>
        </div>
      </div>
    </div>
  );
}
