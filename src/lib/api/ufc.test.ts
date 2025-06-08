import {
  getFighters,
  getFighterById,
  getUpcomingEvents,
  getEventById,
} from './ufc'; // Keep named imports for direct testing if preferred, or remove if always using ufcApi
import * as ufcApi from './ufc'; // Import all exports for spying and direct calls
import { calculateFightProbabilities } from '@/lib/analysis/predictions';
import type { FightOutcomeProbabilities } from '@/lib/analysis/predictions';
import mockApiFighters from './mockApiFighters.json';
import mockApiEvents from './mockApiEvents.json';
import type { Fighter, Event, Fight } from '@/types/mma';

// Mock the calculateFightProbabilities function
jest.mock('@/lib/analysis/predictions', () => ({
  ...jest.requireActual('@/lib/analysis/predictions'), // Import and retain other exports
  calculateFightProbabilities: jest.fn(),
}));

// Cast mock data to ensure type safety during tests
const typedMockFighters = mockApiFighters as Fighter[];
const typedMockEvents = mockApiEvents as Event[];

describe('UFC API Service', () => {
  // Reset mocks before each test
  beforeEach(() => {
    (calculateFightProbabilities as jest.Mock).mockClear();
    // Restore any spied functions
    jest.restoreAllMocks();
  });

  describe('getFighters', () => {
    it('should return all fighters from mock data', async () => {
      const fighters = await ufcApi.getFighters();
      expect(fighters).toEqual(typedMockFighters);
      expect(fighters.length).toBe(typedMockFighters.length);
    });

    it('should include advanced_stats for each fighter', async () => {
      const fighters = await ufcApi.getFighters();
      fighters.forEach(fighter => {
        // Check if advanced_stats exists, it's optional so it might be an empty object or undefined
        // Based on current mock data, it should exist.
        expect(fighter).toHaveProperty('advanced_stats');
      });
      // Specifically check one fighter that is known to have stats
      const fighterWithStats = fighters.find(f => f.id === "fighter-001");
      expect(fighterWithStats?.advanced_stats?.significant_strikes_landed_per_minute).toBeDefined();
    });
  });

  describe('getFighterById', () => {
    it('should return a fighter with advanced_stats for a valid ID', async () => {
      const fighter = await ufcApi.getFighterById('fighter-001');
      expect(fighter).toBeDefined();
      expect(fighter?.id).toBe('fighter-001');
      expect(fighter?.name).toBe('Alex Pereira');
      expect(fighter).toHaveProperty('advanced_stats');
      expect(fighter?.advanced_stats?.striking_accuracy_percentage).toBeDefined();
    });

    it('should return undefined for an invalid ID', async () => {
      const fighter = await ufcApi.getFighterById('invalid-id');
      expect(fighter).toBeUndefined();
    });
  });

  describe('getUpcomingEvents', () => {
    it('should return only events with at least one UPCOMING or LIVE fight', async () => {
      const events = await ufcApi.getUpcomingEvents();
      // Based on current mockApiEvents.json:
      // event-001 has UPCOMING and LIVE fights.
      // event-002 has only FINISHED and CANCELLED fights.
      expect(events.length).toBe(1);
      expect(events[0].id).toBe('event-001');

      events.forEach(event => {
        const allFights = [...event.main_card, ...event.prelim_card];
        const hasUpcomingOrLive = allFights.some(fight => fight.status === 'UPCOMING' || fight.status === 'LIVE');
        expect(hasUpcomingOrLive).toBe(true);
      });
    });

    it('should return an empty array if all events are finished/cancelled (manual mock check)', async () => {
        // This test requires actually changing the mock data source or mocking simulateAPIDelay
        // For now, this implicitly tests against the current mock data setup.
        // If mockApiEvents.json was all finished, it should be empty.
        // Example: If event-001 was also all finished/cancelled, the result should be [].
        const currentEvents = await getUpcomingEvents();
        if (typedMockEvents.every(event =>
            [...event.main_card, ...event.prelim_card].every(f => f.status === 'FINISHED' || f.status === 'CANCELLED')
        )) {
            expect(currentEvents).toEqual([]);
        } else {
            // This branch will run with current data
        expect(currentEvents.length).toBeGreaterThan(0);
        }
    });
     // To test with empty mock data, we would need to mock the import of mockApiEvents.json
     // or simulateAPIDelay to return an empty array. This is a bit more involved.
  });

  describe('getEventById', () => {
    it('should return an event with fight details, statuses, and results for a valid ID', async () => {
      const event = await ufcApi.getEventById('event-001'); // Has mixed statuses
      expect(event).toBeDefined();
      expect(event?.id).toBe('event-001');
      expect(event?.main_card.length).toBeGreaterThan(0);
      const liveFight = event?.main_card.find(f => f.fight_id === 'fight-001-02');
      expect(liveFight?.status).toBe('LIVE');
      const finishedFight = event?.prelim_card.find(f => f.fight_id === 'fight-001-03');
      expect(finishedFight?.status).toBe('FINISHED');
      expect(finishedFight?.winner_id).toBe('fighter-007');
    });

    it('should return undefined for an invalid event ID', async () => {
      const event = await ufcApi.getEventById('invalid-event-id');
      expect(event).toBeUndefined();
    });
  });

  describe('getFightById', () => {
    it('should return a specific fight with its status and results for a valid ID', async () => {
      // fight-002-01 is FINISHED, in event-002
      const fight = await ufcApi.getFightById('fight-002-01');
      expect(fight).toBeDefined();
      expect(fight?.fight_id).toBe('fight-002-01');
      expect(fight?.status).toBe('FINISHED');
      expect(fight?.winner_id).toBe('fighter-003');
      expect(fight?.method).toBe('Submission (Guillotine Choke)');
      expect(fight?.event_id).toBe('event-002'); // check if event_id is populated
    });

    it('should return undefined for an invalid fight ID', async () => {
      const fight = await ufcApi.getFightById('invalid-fight-id');
      expect(fight).toBeUndefined();
    });
  });

  describe('getFightOutcomeProbabilities', () => {
    const mockProbs: FightOutcomeProbabilities = {
      redCorner: { fighterId: 'fighter-001', name: 'Alex Pereira', probability: 0.6, score: 60 },
      blueCorner: { fighterId: 'fighter-002', name: 'Jiří Procházka', probability: 0.4, score: 40 },
    };

    it('should return probabilities for a valid fightId with existing fighters', async () => {
      (calculateFightProbabilities as jest.Mock).mockReturnValueOnce(mockProbs);
      // fight-001-01 from event-001: Alex Pereira (fighter-001) vs Jiří Procházka (fighter-002)
      const getFightByIdSpy = jest.spyOn(ufcApi, 'getFightById');
      const getFighterByIdSpy = jest.spyOn(ufcApi, 'getFighterById');

      (calculateFightProbabilities as jest.Mock).mockReturnValueOnce(mockProbs);
      const result = await ufcApi.getFightOutcomeProbabilities('fight-001-01');

      expect(getFightByIdSpy).toHaveBeenCalledWith('fight-001-01');
      expect(getFighterByIdSpy).toHaveBeenCalledWith('fighter-001');
      expect(getFighterByIdSpy).toHaveBeenCalledWith('fighter-002');
      expect(calculateFightProbabilities).toHaveBeenCalledTimes(1);
      // Check if calculateFightProbabilities was called with Fighter objects
      const fighterAArg = (calculateFightProbabilities as jest.Mock).mock.calls[0][0] as Fighter;
      const fighterBArg = (calculateFightProbabilities as jest.Mock).mock.calls[0][1] as Fighter;
      expect(fighterAArg.id).toBe('fighter-001');
      expect(fighterBArg.id).toBe('fighter-002');
      expect(result).toEqual(mockProbs);
    });

    it('should throw an error if fightId does not exist', async () => {
      await expect(ufcApi.getFightOutcomeProbabilities('non-existent-fight-id')).rejects.toThrow();
    });

    it('should throw an error if red corner fighter does not exist', async () => {
      // Assuming fight 'fight-001-02' has fighter-005 (red) and fighter-006 (blue)
      // We need to ensure fighter-005 does not exist in mockApiFighters.json for this test
      // For now, we'll test a fight where we know one fighter ID is problematic if we were to alter the mock.
      // A better way is to mock getFighterById to return undefined for a specific ID.
      const originalGetFighterById = jest.requireActual('./ufc').getFighterById;
      const mockGetFighterById = jest.fn(originalGetFighterById);

      const getFighterByIdSpy = jest.spyOn(ufcApi, 'getFighterById');

      // Simulate red corner fighter (fighter-005 for fight 'fight-001-02') not found
      getFighterByIdSpy.mockImplementation(async (id: string) => {
        if (id === 'fighter-005') { // fighter-005 is red_corner_fighter_id for fight-001-02
          return undefined;
        }
        // For other IDs, call the original implementation or return a valid mock fighter
        const actualFighter = typedMockFighters.find(f => f.id === id);
        return actualFighter;
      });

      await expect(ufcApi.getFightOutcomeProbabilities('fight-001-02')).rejects.toThrow('Red corner fighter (ID: fighter-005) not found.');
    });

    it('should throw an error if blue corner fighter does not exist', async () => {
      const getFighterByIdSpy = jest.spyOn(ufcApi, 'getFighterById');

      // Simulate blue corner fighter (fighter-006 for fight 'fight-001-02') not found
      // Ensure red corner (fighter-005) IS found for this specific test.
      getFighterByIdSpy.mockImplementation(async (id: string) => {
        if (id === 'fighter-006') { // fighter-006 is blue_corner_fighter_id for fight-001-02
          return undefined;
        }
        if (id === 'fighter-005') { // Ensure red corner fighter-005 exists for this test case
            const fighter = typedMockFighters.find(f => f.id === 'fighter-005');
            return fighter || { id: 'fighter-005', name: 'Mocked Red', record: {wins:1,losses:0,draws:0,knockouts:0,submissions:0}} as Fighter;
        }
        const actualFighter = typedMockFighters.find(f => f.id === id);
        return actualFighter;
      });

      await expect(ufcApi.getFightOutcomeProbabilities('fight-001-02')).rejects.toThrow('Blue corner fighter (ID: fighter-006) not found.');
    });

    it('should throw an error if fight details are missing fighter IDs', async () => {
        const getFightByIdSpy = jest.spyOn(ufcApi, 'getFightById');

        // Simulate a fight object missing red_corner_fighter_id
        const mockFightMissingIds: Partial<Fight> = {
            fight_id: 'fight-test-missing-ids',
            // red_corner_fighter_id is missing
            blue_corner_fighter_id: 'fighter-002',
            weight_class: "Welterweight",
            status: "UPCOMING"
        };
        getFightByIdSpy.mockResolvedValueOnce(mockFightMissingIds as Fight);

        await expect(ufcApi.getFightOutcomeProbabilities('fight-test-missing-ids')).rejects.toThrow('Fighter IDs missing for fight fight-test-missing-ids.');
    });
  });
});
