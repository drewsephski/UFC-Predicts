import type React from 'react';
import { Trophy, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface RankedFighter {
  id: string;
  name: string;
  country: string;
  record: string;
}

interface RankingsTableProps {
  division: string;
  champion: RankedFighter;
  rankings: RankedFighter[];
}

export const RankingsTable: React.FC<RankingsTableProps> = ({
  division,
  champion,
  rankings,
}) => {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4 text-white">
        {division} <span className="text-red-500">Rankings</span>
      </h3>
      
      {/* Champion Row */}
      <div className="bg-gradient-to-r from-red-900/30 to-black/30 p-4 rounded-lg border border-red-500/30 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-red-600 rounded-full w-10 h-10 flex items-center justify-center mr-4">
              <Trophy className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="flex items-center">
                <h4 className="font-bold text-white">{champion.name}</h4>
                <Badge variant="outline" className="ml-2 bg-red-600 text-white border-none">
                  Champion
                </Badge>
              </div>
              <div className="flex items-center text-sm text-gray-400">
                <span>{champion.country}</span>
                <span className="mx-2">•</span>
                <span>{champion.record}</span>
              </div>
            </div>
          </div>
          <Button asChild variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-red-950/30">
            <Link href={`/fighters/${champion.id}`}>
              <ChevronRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
      
      {/* Contenders List */}
      <div className="space-y-2">
        {rankings.map((fighter, index) => (
          <div 
            key={fighter.id}
            className="bg-black/30 p-3 rounded-lg border border-red-500/10 hover:bg-black/50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-black/70 rounded-full w-8 h-8 flex items-center justify-center mr-3 border border-red-500/30">
                  <span className="text-sm font-medium text-red-400">{index + 1}</span>
                </div>
                <div>
                  <h4 className="font-medium text-white">{fighter.name}</h4>
                  <div className="flex items-center text-xs text-gray-400">
                    <span>{fighter.country}</span>
                    <span className="mx-2">•</span>
                    <span>{fighter.record}</span>
                  </div>
                </div>
              </div>
              <Button asChild variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-red-950/30">
                <Link href={`/fighters/${fighter.id}`}>
                  <ChevronRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 flex justify-center">
        <Button variant="outline" className="border-red-500/50 hover:bg-red-500/10 text-red-400 hover:text-red-300">
          View All {division} Fighters
        </Button>
      </div>
    </div>
  );
};
