/**
 * Represents a fighter in the MMA promotion.
 */
export interface Fighter {
  id: string;
  name: string;
  nickname: string;
  birth_date: string;
  nationality: string;
  height_cm: number;
  weight_kg: number;
  reach_cm: number;
  style: string;
  trains_at: string;
  /** Basic fight record for the fighter. */
  record: {
    wins: number;
    losses: number;
    draws: number;
    /** Number of wins achieved by knockout. */
    knockouts: number;
    /** Number of wins achieved by submission. */
    submissions: number;
  };
  /** A list of recent fights the fighter has participated in. */
  recent_fights: {
    fight_id: string;
    opponent: string; // Name of the opponent
    result: "win" | "loss" | "draw" | "no_contest";
    method: string; // Method of victory or loss
    round: number;
    date: string;
  }[];
  /** Fighter's rankings in different weight classes. Key is weight class, value is rank or "Champion". */
  rankings?: {
    [weight_class: string]: string | number;
  };
  image_url?: string;
  /** Optional object containing advanced performance statistics for the fighter. */
  advanced_stats?: {
    /** Average significant strikes landed per minute. */
    significant_strikes_landed_per_minute?: number;
    /** Percentage of significant strikes landed (0-100). */
    striking_accuracy_percentage?: number;
    /** Average takedowns landed per 15 minutes. */
    takedown_average_per_15_minutes?: number;
    /** Percentage of takedowns defended (0-100). */
    takedown_defense_percentage?: number;
    /** Average submissions attempted per 15 minutes. */
    submission_average_per_15_minutes?: number;
  };
}

/**
 * Represents a single fight between two fighters, usually as part of an Event.
 */
export interface Fight {
  fight_id: string;
  red_corner_fighter_id: string;
  blue_corner_fighter_id: string;
  weight_class: string;
  is_title_fight?: boolean;

  // --- Fight context (may be redundant if always accessed via Event) ---
  /** ID of the event this fight belongs to. Useful if fight data can be fetched independently. */
  event_id?: string;
  /** Date of the fight. Often inherited from the Event. */
  date?: string;
  /** Location of the fight. Often inherited from the Event. */
  location?: string;
  /** Venue of the fight. Often inherited from the Event. */
  venue?: string;

  // --- Post-fight details ---
  /** Current status of the fight. */
  status?: 'UPCOMING' | 'LIVE' | 'FINISHED' | 'CANCELLED';
  /** ID of the winning fighter. Null if draw, no contest, or fight is ongoing/upcoming. */
  winner_id?: string | null;
  /** Method of victory (e.g., "KO/TKO", "Submission (Rear Naked Choke)", "Unanimous Decision"). */
  method?: string;
  /** The round in which the fight ended. */
  round?: number;
  /** The time in the round when the fight concluded (e.g., "2:30"). */
  time?: string;
  /** Additional textual details or notes about the fight's outcome or significant events. */
  details?: string;
}

/**
 * Represents a UFC event, containing multiple fights.
 */
export interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  venue: string;
  /** Array of Fight objects representing the main card of the event. */
  main_card: Fight[];
  /** Array of Fight objects representing the preliminary card of the event. */
  prelim_card: Fight[];
}

// Keeping existing simpler types for now, might remove later if not needed
/** Simplified fighter data structure, potentially for list views or summaries. */
export interface SimpleFighter {
  id: string;
  name: string;
  nickname: string;
  division: string;
  /** Current status, e.g., "Champion", "Ranked", "Unranked". */
  status: string;
  /** Fighter's record, typically in W-L-D format (e.g., "25-3-0"). */
  record: string;
  imgSrc?: string;
}

/** Simplified structure for displaying upcoming fights, often a denormalized view. */
export interface UpcomingFight {
  id: string;
  eventName: string;
  date: string;
  /** Time of the fight, if available. */
  time: string;
  fighters: {
    fighter1Id: string;
    fighter2Id: string;
  };
  venue: string;
  imgSrc?: string;
}