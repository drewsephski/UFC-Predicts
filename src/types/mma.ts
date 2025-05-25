export interface CareerStats {
  FighterId?: number;
  sigStrikesLandedPerMinute?: number | null;
  sigStrikeAccuracy?: number | null;
  takedownAverage?: number | null;
  submissionAverage?: number | null;
  knockoutPercentage?: number | null;
  technicalKnockoutPercentage?: number | null;
  submissionPercentage?: number | null;
  decisionPercentage?: number | null;
  careerSapm?: number | null; // Add Strikes Absorbed Per Minute
  takedownDefense?: number | null; // Add Takedown Defense Percentage
  strikingDefense?: number | null; // Add Striking Defense Percentage
  // Add any other career stat fields you might need from the API
}

export interface Fighter {
  id: string;
  name: string;
  nickname?: string | null;
  division: string;
  ranking?: number | null;
  isChampion?: boolean;
  country?: string | null;
  birthDate?: string | null;
  age?: number | null;
  height?: string | null;
  weight?: string | null;
  reach?: string | null;
  wins: number;
  losses: number;
  draws: number;
  noContests?: number | null;
  technicalKnockouts?: number | null;
  technicalKnockoutLosses?: number | null;
  submissions?: number | null;
  submissionLosses?: number | null;
  titleWins?: number | null;
  titleLosses?: number | null;
  titleDraws?: number | null;
  record?: string;
  careerStats?: CareerStats | null;
  imageUrl?: string | null;
}

export interface Fight {
  id: string;
  eventName: string;
  date: string;
  redCornerId: string;
  blueCornerId: string;
  redCornerName: string;
  blueCornerName: string;
  weightClass: string;
  isTitleFight: boolean;
  result: {
    winnerId: string | null;
    method: string | null;
    round: number | null;
    time: string | null;
  } | null;
  // Add any other fight-specific fields here
}