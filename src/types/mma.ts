export interface CareerStats {
  FighterId?: number;
  FirstName?: string | null;
  LastName?: string | null;
  SigStrikesLandedPerMinute?: number | null;
  SigStrikeAccuracy?: number | null;
  TakedownAverage?: number | null;
  SubmissionAverage?: number | null;
  KnockoutPercentage?: number | null;
  TechnicalKnockoutPercentage?: number | null;
  DecisionPercentage?: number | null;
  // Add any other career stat fields you might need from the API
}

export interface Fighter {
  FighterId: number;
  FirstName: string | null;
  LastName: string | null;
  Nickname: string | null;
  WeightClass: string | null;
  BirthDate?: string | null; // Assuming ISO date string
  Height?: number | null;
  Weight?: number | null;
  Reach?: number | null;
  Wins?: number | null;
  Losses?: number | null;
  Draws?: number | null;
  NoContests?: number | null;
  TechnicalKnockouts?: number | null;
  TechnicalKnockoutLosses?: number | null;
  Submissions?: number | null;
  SubmissionLosses?: number | null;
  TitleWins?: number | null;
  TitleLosses?: number | null;
  TitleDraws?: number | null;
  CareerStats: CareerStats | null;
  // Add any other top-level fighter fields you might need
} 