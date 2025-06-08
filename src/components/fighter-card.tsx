"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trophy, Dumbbell, Info } from 'lucide-react';
import Link from 'next/link';
import { FighterModal } from './fighter-modal';
import { CardBase } from '@/components/ui/card-base';

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

  const totalWins = winsByKO + winsBySub + winsByDec;
  const koPercentage = totalWins > 0 ? Math.round((winsByKO / totalWins) * 100) : 0;
  const subPercentage = totalWins > 0 ? Math.round((winsBySub / totalWins) * 100) : 0;
  const decPercentage = totalWins > 0 ? Math.round((winsByDec / totalWins) * 100) : 0;

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const imageContentWithOverlayTitle = (
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
  );

  return (
    <>
      <CardBase
        imageSlot={imageContentWithOverlayTitle}
      >
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
                <span className="font-bold text-red-500 mr-1 h-3 w-3 inline-flex items-center justify-center">KO</span>
                <span className="text-white">{winsByKO}</span>
              </div>
              <p className="text-gray-400">KO/TKO</p>
              <p className="text-red-400">{koPercentage}%</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <span className="font-bold text-red-500 mr-1 h-3 w-3 inline-flex items-center justify-center">SUB</span>
                <span className="text-white">{winsBySub}</span>
              </div>
              <p className="text-gray-400">Submission</p>
              <p className="text-red-400">{subPercentage}%</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <span className="font-bold text-red-500 mr-1 h-3 w-3 inline-flex items-center justify-center">DEC</span>
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
      </CardBase>

      <FighterModal
        isOpen={isModalOpen}
        onCloseAction={handleCloseModal}
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
