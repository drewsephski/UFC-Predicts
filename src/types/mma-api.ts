/**
 * @fileoverview TypeScript types for the MMA API.
 * These types should be updated to accurately reflect the actual structure of the API responses.
 */

/**
 * Represents the basic statistics for a fighter.
 */
export interface FighterStats {
  wins: number;
  losses: number;
  draws: number;
  knockouts: number;
  submissions: number;
  /** Average strikes landed per fight or per round, if available. */
  avgStrikesLanded?: number;
  /** Average significant strikes landed per minute. */
  sigStrikesLandedPerMin?: number;
  /** Significant striking accuracy percentage. */
  sigStrikeAccuracy?: number;
  /** Average significant strikes absorbed per minute. */
  sigStrikesAbsorbedPerMin?: number;
  /** Significant strike defense percentage (e.g., vs. opponent's accuracy). */
  sigStrikeDefense?: number;
  /** Average takedowns landed per 15 minutes. */
  avgTakedownsLandedPer15Min?: number;
  /** Takedown accuracy percentage. */
  takedownAccuracy?: number;
  /** Takedown defense percentage. */
  takedownDefense?: number;
  /** Average submissions attempted per 15 minutes. */
  avgSubmissionsAttemptedPer15Min?: number;
  /** Win percentage, if directly available from API. Otherwise calculated. */
  winPercentage?: number;
  /** Reach in inches or cm. */
  reach?: number;
  /** Height in inches or cm. */
  height?: number;
  /** Weight class. */
  weightClass?: string;
  // Allow for additional properties not explicitly defined, useful during API integration.
  [key: string]: any;
}

/**
 * Represents a single fight in a fighter's record or event card.
 * Ensures clear indication of win/loss/draw for calculations.
 */
export interface Fight {
  fightId: string; // Unique identifier for the fight
  opponentName?: string; // Name of the opponent
  opponentId?: string; // ID of the opponent
  result: 'win' | 'loss' | 'draw' | 'no_contest'; // Clear result for win percentage calculation
  method: string; // e.g., "KO/TKO", "Submission", "Decision - Unanimous"
  round: number;
  time: string; // e.g., "3:45"
  eventDate: string; // ISO 8601 date string
  eventName?: string;
  // Add any other relevant fight details
  [key: string]: any; // For any additional properties not explicitly defined
}

/**
 * Represents the detailed profile of a fighter.
 */
export interface FighterProfile {
  fighterId: string;
  firstName: string;
  lastName: string;
  nickname?: string;
  nationality?: string;
  birthDate?: string; // ISO 8601 date string
  height?: number; // in cm or inches
  weight?: number; // in kg or lbs
  reach?: number; // in cm or inches
  stance?: 'orthodox' | 'southpaw' | 'switch';
  team?: string;
  stats: FighterStats;
  fightHistory?: Fight[]; // Array of past fights, crucial for form and win percentage
  // Add any other relevant fighter profile fields
  [key: string]: any; // For any additional properties not explicitly defined
}

/**
 * Represents the details of an MMA event.
 */
export interface EventDetails {
  eventId: string;
  name: string;
  date: string; // ISO 8601 date string
  venue: string;
  city?: string;
  country?: string;
  mainCard: Fight[];
  prelims?: Fight[];
  // Add any other relevant event details
  [key: string]: any; // For any additional properties not explicitly defined
}

/**
 * Represents a single live event occurring during a fight.
 */
export interface LiveFightEvent {
  eventId: string; // Unique identifier for the live event
  timestamp: string; // ISO 8601 timestamp of when the event occurred
  description: string; // Textual description of the event
  type: // Type of event, e.g., strike, takedown, submission attempt
  | 'significant_strike'
  | 'takedown_attempt'
  | 'takedown_successful'
  | 'submission_attempt'
  | 'knockdown'
  | 'foul'
  | 'round_start'
  | 'round_end'
  | 'fight_start'
  | 'fight_end'
  | 'fighter_status_change' // e.g., cut, tired
  | 'custom_event'; // For any other specific types
  fighterId?: string; // ID of the fighter primarily involved
  details?: Record<string, any>; // Additional structured details about the event (e.g., strike_type, target_area)
  round?: number;
  timeInRound?: string; // e.g., "0:30"
  // Add any other relevant live event fields
  [key: string]: any; // For any additional properties not explicitly defined
}

/**
 * Represents a generic data point for use in charts.
 */
export interface ChartDataPoint {
  /** The label for the data point (e.g., date, category). */
  label: string;
  /** The numerical value of the data point. */
  value: number;
  /** Optional timestamp, if the label is time-based and needs precise sorting or representation. */
  timestamp?: string;
  /** Optional series name, if multiple series are plotted on the same chart without complex dataset structures. */
  series?: string;
}

/**
 * Represents the data structure for a chart, potentially with multiple datasets.
 * This structure is common for libraries like Chart.js.
 */
export interface StatChartData {
  /** Labels for the x-axis of the chart. */
  labels: string[];
  /** Array of datasets to be plotted on the chart. */
  datasets: {
    /** Label for the dataset (e.g., 'Fighter A Wins', 'Strikes Landed'). */
    label: string;
    /** Array of numerical data points for this dataset. */
    data: number[];
    /** Optional: background color for bar charts or fill color for line charts. */
    backgroundColor?: string | string[];
    /** Optional: border color for lines or bars. */
    borderColor?: string | string[];
    /** Optional: border width for lines or bars. */
    borderWidth?: number;
    // Allow other chart.js specific properties
    [key: string]: any;
  }[];
}

/**
 * Represents the input props for a LiveWinProbability component.
 * Contains live statistics for both corners of a fight.
 */
export interface LiveWinProbabilityProps {
  fightId: string; // To potentially fetch more details or context if needed
  /** Live statistics for the red corner fighter. */
  redCornerStats: {
    significantStrikesLanded: number;
    takedownsSuccessful: number;
    octagonControlTime?: number; // in seconds, if available
    // Add other relevant live stats
    [key: string]: any;
  };
  /** Live statistics for the blue corner fighter. */
  blueCornerStats: {
    significantStrikesLanded: number;
    takedownsSuccessful: number;
    octagonControlTime?: number; // in seconds, if available
    // Add other relevant live stats
    [key: string]: any;
  };
  currentRound: number;
  timeInRound: string; // e.g., "2:30"
}

/**
 * Represents the calculated live win probability for both fighters.
 */
export interface LiveProbability {
  /** Calculated win probability for the red corner fighter (0.0 to 1.0). */
  pRed: number;
  /** Calculated win probability for the blue corner fighter (0.0 to 1.0). */
  pBlue: number;
  /** Optional: textual summary or confidence level of the prediction. */
  summary?: string;
}


/**
 * Represents the overall response structure for the fighter details API endpoint.
 * Assumes the API returns an object directly matching FighterProfile.
 */
export type FighterDetailResponse = FighterProfile;

/**
 * Represents the overall response structure for the event details API endpoint.
 * Assumes the API returns an object directly matching EventDetails.
 */
export type EventDetailResponse = EventDetails;

/**
 * Represents the overall response structure for the live fight stats API endpoint.
 * Assumes the API returns an array of LiveFightEvent or a structured object.
 * For now, keeping it as LiveFightEvent[] as previously, but might need adjustment
 * if the `/api/live` endpoint returns a more complex object containing events.
 */
export type LiveFightStatsResponse = LiveFightEvent[];


// It's crucial to update these types based on the actual API responses
// from mmaapi.p.rapidapi.com to ensure type safety and correctness.
// The [key: string]: any; allows for flexibility during development but should be
// refined as the API structure becomes clear.
