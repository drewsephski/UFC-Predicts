"use client";

import React from 'react';
import { FighterCard } from '@/components/fighter-card';
import { Container } from '@/components';

export default function TestFighterModalPage() {
  // Sample fighter data
  const fighters = [
    {
      id: "1",
      name: "Jon Jones",
      nickname: "Bones",
      image: "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2023-03/JONES_JON_L_BELT_03_04.png?itok=P6J6DQpm",
      country: "United States",
      division: "Heavyweight",
      record: "27-1-0",
      winsByKO: 10,
      winsBySub: 7,
      winsByDec: 10,
      isChampion: true,
    },
    {
      id: "2",
      name: "Alex Pereira",
      nickname: "Poatan",
      image: "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2023-11/PEREIRA_ALEX_L_BELT_11_11.png?itok=m6o_DhZ-",
      country: "Brazil",
      division: "Light Heavyweight",
      record: "9-2-0",
      winsByKO: 7,
      winsBySub: 0,
      winsByDec: 2,
      isChampion: true,
    },
    {
      id: "3",
      name: "Islam Makhachev",
      nickname: "The Dagestani",
      image: "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2023-10/MAKHACHEV_ISLAM_L_BELT_10_21.png?itok=m6o_DhZ-",
      country: "Russia",
      division: "Lightweight",
      record: "25-1-0",
      winsByKO: 4,
      winsBySub: 11,
      winsByDec: 10,
      isChampion: true,
    },
  ];

  return (
    <div className="py-12">
      <Container>
        <h1 className="text-3xl font-bold text-white mb-8">Fighter Modal Test</h1>
        <p className="text-gray-300 mb-8">Click on the &ldquo;Details&rdquo; button to open the fighter modal.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fighters.map((fighter) => (
            <FighterCard
              key={fighter.id}
              id={fighter.id}
              name={fighter.name}
              nickname={fighter.nickname}
              image={fighter.image}
              country={fighter.country}
              division={fighter.division}
              record={fighter.record}
              winsByKO={fighter.winsByKO}
              winsBySub={fighter.winsBySub}
              winsByDec={fighter.winsByDec}
              isChampion={fighter.isChampion}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}
