import { calculateFightProbabilities } from './predictions';
import type { Fighter } from '@/types/mma';

// Mock Fighter type structure for testing purposes
const mockFighter = (id: string, name: string, wins: number, losses: number, knockouts: number): Fighter => ({
  id,
  name,
  nickname: '',
  birth_date: '1990-01-01',
  nationality: 'Unknown',
  height_cm: 180,
  weight_kg: 70,
  reach_cm: 180,
  style: 'MMA',
  trains_at: 'Mock Gym',
  record: {
    wins,
    losses,
    draws: 0,
    knockouts,
    submissions: 0,
  },
  recent_fights: [],
  // rankings and image_url are optional and not needed for this test
});

describe('calculateFightProbabilities', () => {
  const fighter1 = mockFighter('fighter1', 'Dominant Dave', 10, 1, 5); // Score: (10*2) + 5 - (1*3) = 20 + 5 - 3 = 22
  const fighter2 = mockFighter('fighter2', 'Underdog Mike', 5, 5, 1);   // Score: (5*2) + 1 - (5*3) = 10 + 1 - 15 = -4 => 1 (min)

  it('should calculate probabilities for two fighters with positive scores', () => {
    // Fighter A: 10W, 1L, 5KO => Score = 20 + 5 - 3 = 22
    // Fighter B: 8W, 2L, 4KO => Score = 16 + 4 - 6 = 14
    const fighterA = mockFighter('fA', 'Fighter A', 10, 1, 5); // Score 22
    const fighterB = mockFighter('fB', 'Fighter B', 8, 2, 4);   // Score 14
    const totalScore = 22 + 14; // 36
    const probA = 22 / totalScore; // 0.6111...
    const probB = 14 / totalScore; // 0.3888...

    const result = calculateFightProbabilities(fighterA, fighterB);
    expect(result.redCorner.fighterId).toBe('fA');
    expect(result.blueCorner.fighterId).toBe('fB');
    expect(result.redCorner.score).toBe(22);
    expect(result.blueCorner.score).toBe(14);
    expect(result.redCorner.probability).toBeCloseTo(probA);
    expect(result.blueCorner.probability).toBeCloseTo(probB);
    expect(result.redCorner.probability + result.blueCorner.probability).toBeCloseTo(1);
  });

  it('should handle minimum score adjustment and calculate probabilities', () => {
    // fighter1 score = 22
    // fighter2 score = -4, adjusted to 1
    const result = calculateFightProbabilities(fighter1, fighter2);
    const totalScore = 22 + 1; // 23
    const prob1 = 22 / totalScore; // approx 0.9565
    const prob2 = 1 / totalScore;  // approx 0.0435

    expect(result.redCorner.score).toBe(22);
    expect(result.blueCorner.score).toBe(1);
    expect(result.redCorner.probability).toBeCloseTo(prob1);
    expect(result.blueCorner.probability).toBeCloseTo(prob2);
    expect(result.redCorner.probability + result.blueCorner.probability).toBeCloseTo(1);
  });

  it('should result in 50/50 probability if both fighters have scores adjusted to minimum', () => {
    const fighterMinA = mockFighter('minA', 'Min Score A', 1, 5, 0); // Score: 2 + 0 - 15 = -13 => 1
    const fighterMinB = mockFighter('minB', 'Min Score B', 0, 2, 0); // Score: 0 + 0 - 6 = -6 => 1

    const result = calculateFightProbabilities(fighterMinA, fighterMinB);
    expect(result.redCorner.score).toBe(1);
    expect(result.blueCorner.score).toBe(1);
    expect(result.redCorner.probability).toBe(0.5);
    expect(result.blueCorner.probability).toBe(0.5);
  });

  it('should handle one fighter being significantly stronger', () => {
    const superFighter = mockFighter('super', 'Super Fighter', 20, 0, 15); // Score: (20*2) + 15 - 0 = 40 + 15 = 55
    const rookieFighter = mockFighter('rookie', 'Rookie Rick', 1, 1, 0); // Score: (1*2) + 0 - (1*3) = 2 - 3 = -1 => 1
    const totalScore = 55 + 1; // 56
    const probSuper = 55 / totalScore;
    const probRookie = 1 / totalScore;

    const result = calculateFightProbabilities(superFighter, rookieFighter);
    expect(result.redCorner.score).toBe(55);
    expect(result.blueCorner.score).toBe(1);
    expect(result.redCorner.probability).toBeCloseTo(probSuper);
    expect(result.blueCorner.probability).toBeCloseTo(probRookie);
    expect(result.redCorner.probability + result.blueCorner.probability).toBeCloseTo(1);
  });

  it('should always produce probabilities between 0 and 1', () => {
    const results = [
      calculateFightProbabilities(fighter1, fighter2),
      calculateFightProbabilities(mockFighter('fA', 'A', 0, 10, 0), mockFighter('fB', 'B', 0, 10, 0)), // both min scores
      calculateFightProbabilities(mockFighter('fC', 'C', 10, 0, 10), mockFighter('fD', 'D', 0, 0, 0)) // one good, one min (0 losses still leads to 1)
    ];

    results.forEach(result => {
      expect(result.redCorner.probability).toBeGreaterThanOrEqual(0);
      expect(result.redCorner.probability).toBeLessThanOrEqual(1);
      expect(result.blueCorner.probability).toBeGreaterThanOrEqual(0);
      expect(result.blueCorner.probability).toBeLessThanOrEqual(1);
    });
  });

  it('should ensure probabilities sum to 1', () => {
     const results = [
      calculateFightProbabilities(fighter1, fighter2),
      calculateFightProbabilities(mockFighter('fA', 'A', 0, 10, 0), mockFighter('fB', 'B', 0, 10, 0)),
      calculateFightProbabilities(mockFighter('fC', 'C', 10, 0, 10), mockFighter('fD', 'D', 0, 0, 0))
    ];
    results.forEach(result => {
      expect(result.redCorner.probability + result.blueCorner.probability).toBeCloseTo(1.0);
    });
  });
});
