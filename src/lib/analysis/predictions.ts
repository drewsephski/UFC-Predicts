import type { Fighter } from '@/types/mma';

/**
 * Holds the calculated probability and score for a single fighter in a matchup.
 */
interface FighterProbabilities {
  /** The unique identifier for the fighter. */
  fighterId: string;
  /** The name of the fighter. */
  name: string;
  /** The calculated win probability for this fighter (0 to 1). */
  probability: number;
  /** The calculated score for this fighter, used as a basis for probability. */
  score: number;
}

/**
 * Represents the calculated outcome probabilities for a fight, detailing each corner's chances.
 */
export interface FightOutcomeProbabilities {
  /** Probabilities and score for the fighter in the red corner. */
  redCorner: FighterProbabilities;
  /** Probabilities and score for the fighter in the blue corner. */
  blueCorner: FighterProbabilities;
}

/**
 * Calculates a score for a fighter based on their record.
 * Score = (Wins * 2) + (Knockouts * 1) - (Losses * 3).
 * Ensures a minimum score of 1.
 * @param fighter The fighter object.
 * @returns The calculated score.
 */
function calculateFighterScore(fighter: Fighter): number {
  const baseScore = (fighter.record.wins * 2) + (fighter.record.knockouts * 1) - (fighter.record.losses * 3);
  return Math.max(1, baseScore); // Ensure minimum score of 1
}

/**
 * Calculates the win probabilities for two fighters based on their scores.
 * @param fighterA Fighter A (Red Corner).
 * @param fighterB Fighter B (Blue Corner).
 * @returns An object containing fighter IDs, names, calculated scores, and win probabilities.
 */
export function calculateFightProbabilities(
  fighterA: Fighter,
  fighterB: Fighter
): FightOutcomeProbabilities {
  const scoreA = calculateFighterScore(fighterA);
  const scoreB = calculateFighterScore(fighterB);

  let probA: number;
  let probB: number;

  if (scoreA === 1 && scoreB === 1) {
    // If both scores are at the minimum, assign 50/50 probability
    probA = 0.5;
    probB = 0.5;
  } else {
    const totalScore = scoreA + scoreB;
    probA = scoreA / totalScore;
    probB = scoreB / totalScore;
  }

  // Ensure probabilities are well-formed in edge cases (though logic above should handle it)
  if (isNaN(probA) || isNaN(probB) || !isFinite(probA) || !isFinite(probB)) {
    console.warn(`Could not calculate probabilities reliably for ${fighterA.name} vs ${fighterB.name}. Defaulting to 50/50.`);
    probA = 0.5;
    probB = 0.5;
  }


  return {
    redCorner: {
      fighterId: fighterA.id,
      name: fighterA.name,
      score: scoreA,
      probability: probA,
    },
    blueCorner: {
      fighterId: fighterB.id,
      name: fighterB.name,
      score: scoreB,
      probability: probB,
    },
  };
}
