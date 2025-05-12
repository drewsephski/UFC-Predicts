"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trophy, Dumbbell, Info } from 'lucide-react';
import Link from 'next/link';
import { FighterModal } from './fighter-modal';

interface FighterCardProps {
  id: string;
  name: string;
  nickname?: string;
  image: string;
  country: string;
  division: string;
  record: string;
  winsByKO: number;
  winsBySub: number;
  winsByDec: number;
  isChampion: boolean;
}

export const FighterCard: React.FC<FighterCardProps> = ({
  id,
  name,
  nickname,
  image,
  country,
  division,
  record,
  winsByKO,
  winsBySub,
  winsByDec,
  isChampion,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Calculate total wins
  const totalWins = winsByKO + winsBySub + winsByDec;

  // Calculate percentages
  const koPercentage = totalWins > 0 ? Math.round((winsByKO / totalWins) * 100) : 0;
  const subPercentage = totalWins > 0 ? Math.round((winsBySub / totalWins) * 100) : 0;
  const decPercentage = totalWins > 0 ? Math.round((winsByDec / totalWins) * 100) : 0;

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="bg-black/30 border border-red-500/20 rounded-lg overflow-hidden hover:border-red-500/50 transition-colors">
        <div className="relative h-48 w-full bg-gradient-to-b from-black/0 to-black/90">
          <Image
            src={image}
            alt={name}
            fill
            className="object-contain object-top"
          />
          <div className="absolute bottom-0 left-0 p-3 w-full">
            <h3 className="font-bold text-white text-lg truncate">{name}</h3>
            {nickname && (
              <p className="text-red-400 text-sm truncate">&quot;{nickname}&quot;</p>
            )}
          </div>
          {isChampion && (
            <div className="absolute top-2 right-2">
              <Badge className="bg-red-600 text-white border-none flex items-center">
                <Trophy className="h-3 w-3 mr-1" />
                Champion
              </Badge>
            </div>
          )}
        </div>

        <div className="p-3">
          <div className="flex justify-between items-center mb-3">
            <Badge variant="outline" className="bg-black/50 text-gray-300 border-red-500/30">
              {division}
            </Badge>
            <span className="text-gray-400 text-sm">{record}</span>
          </div>

          <div className="text-sm text-gray-400 mb-3">
            <p>{country}</p>
          </div>

          <div className="bg-black/50 p-2 rounded-lg border border-red-500/10 mb-3">
            <p className="text-xs text-gray-400 mb-1">Win Method Breakdown</p>
            <div className="flex justify-between text-xs">
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <svg className="h-3 w-3 text-red-500 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" role="img" aria-label="KO icon">
                    <path d="M4 17l6-3" />
                    <path d="M14 13l6-3" />
                    <path d="M8 13v7" />
                    <path d="M18 10v7" />
                    <path d="M12 10v10" />
                    <path d="M2 10v10" />
                    <path d="M2 10a2 2 0 1 1 4 0" />
                    <path d="M22 10a2 2 0 1 0-4 0" />
                    <path d="M8 13a2 2 0 1 1 4 0" />
                    <path d="M18 10a2 2 0 1 0-4 0" />
                  </svg>
                  <span className="text-white">{winsByKO}</span>
                </div>
                <p className="text-gray-400">KO/TKO</p>
                <p className="text-red-400">{koPercentage}%</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <svg className="h-3 w-3 text-red-500 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" role="img" aria-label="Submission icon">
                    <path d="M9 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    <path d="M17 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    <path d="M12 14a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    <path d="M14 17a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    <path d="M10 17a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  </svg>
                  <span className="text-white">{winsBySub}</span>
                </div>
                <p className="text-gray-400">Submission</p>
                <p className="text-red-400">{subPercentage}%</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <svg className="h-3 w-3 text-red-500 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" role="img" aria-label="Decision icon">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                  <span className="text-white">{winsByDec}</span>
                </div>
                <p className="text-gray-400">Decision</p>
                <p className="text-red-400">{decPercentage}%</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={handleOpenModal}
              className="bg-black hover:bg-red-950/70 text-white border border-red-500/30"
            >
              <Info className="h-4 w-4 mr-2" />
              Details
            </Button>

            <Button asChild className="bg-red-600 hover:bg-red-700 text-white">
              <Link href={`/fighters/${id}`}>
                <Dumbbell className="h-4 w-4 mr-2" />
                Profile
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Fighter Modal */}
      <FighterModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        id={id}
        name={name}
        nickname={nickname}
        image={image}
        country={country}
        division={division}
        record={record}
        winsByKO={winsByKO}
        winsBySub={winsBySub}
        winsByDec={winsByDec}
        isChampion={isChampion}
      />
    </>
  );
};
