import type { Fighter, Fight } from '@/types/mma';

// Mock data - in a real app, you would fetch this from your API
export const mockFighters: Fighter[] = [
  {
    id: '1',
    name: 'Jon Jones',
    nickname: 'Bones',
    division: 'Heavyweight',
    ranking: 1,
    wins: 27,
    losses: 1,
    draws: 0,
    imageUrl: '/fighters/jon-jones.jpg',
    isChampion: true,
  },
  // Add more mock fighters as needed
];

export const mockUpcomingFights: Fight[] = [
  {
    id: '1',
    eventName: 'UFC 300',
    date: '2024-04-13',
    redCornerId: '1',
    blueCornerId: '2',
    redCornerName: 'Jon Jones',
    blueCornerName: 'Stipe Miocic',
    weightClass: 'Heavyweight',
    isTitleFight: true,
  },
  // Add more mock fights as needed
];

// Simulate API calls with delay
const simulateAPIDelay = <T>(data: T, delay = 500): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
};

export const getFighters = async (): Promise<Fighter[]> => {
  // In a real app, you would fetch from your API:
  // const response = await fetch('/api/fighters');
  // return response.json();
  return simulateAPIDelay(mockFighters);
};

export const getUpcomingFights = async (): Promise<Fight[]> => {
  // In a real app, you would fetch from your API:
  // const response = await fetch('/api/upcoming-fights');
  // return response.json();
  return simulateAPIDelay(mockUpcomingFights);
};

export const getFighterById = async (id: string): Promise<Fighter | undefined> => {
  const fighters = await getFighters();
  return fighters.find(fighter => fighter.id === id);
};

export const getFightsByFighterId = async (fighterId: string): Promise<Fight[]> => {
  const fights = await getUpcomingFights();
  return fights.filter(
    fight => fight.redCornerId === fighterId || fight.blueCornerId === fighterId
  );
};
