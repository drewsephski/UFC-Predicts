// src/app/api/predict/[fightId]/route.test.ts

import { GET } from './route'; // Adjust path if your test file is in a __tests__ subdirectory
import { NextRequest } from 'next/server';
import type { FighterProfile, Fight, FighterStats, EventDetails } from '@/types/mma-api';

// Mock environment variables
const OLD_ENV = process.env;

// Mock fetch
global.fetch = jest.fn();

// --- Mock Data ---
// Adjust these mocks to perfectly match your types from mma-api.ts, especially non-optional fields.

const mockBaseStats: Required<FighterStats> = {
  wins: 0, losses: 0, draws: 0, knockouts: 0, submissions: 0,
  avgStrikesLanded: 0,
  // avgStrikesAttempted: 0, // Assuming this was an example, and not in current FighterStats
  // avgTakedownsSuccessful: 0, // Assuming this was an example
  // avgTakedownsAttempted: 0, // Assuming this was an example
  sigStrikesLandedPerMin: 0,
  // sigStrikesAttemptedPerMin: 0, // Assuming this was an example
  takedownAccuracy: 0,
  sigStrikeAccuracy: 0,
  // knockdownRatio: 0, // Assuming this was an example
  // avgFightTime: '00:00', // Assuming this was an example
  reach: 0,
  height: 0,
  weightClass: 'N/A',
  avgTakedownsLandedPer15Min: 0,
  sigStrikesAbsorbedPerMin: 0,
  sigStrikeDefense: 0,
  avgSubmissionsAttemptedPer15Min: 0,
  winPercentage:0,
  // Ensure all non-optional fields from FighterStats are covered by providing defaults.
  // Add any other specific fields your types or logic might rely on.
  // For fields not explicitly in FighterStats but used in mockBaseStats previously,
  // they are removed if not in the core FighterStats definition used by the app.
  // If they are in an `[key: string]: any;` part, they can be added ad-hoc if needed by a test.
};

const mockFighterAStats: FighterStats = {
  ...mockBaseStats,
  wins: 10, losses: 2, knockouts: 5,
  avgStrikesLanded: 50, sigStrikesLandedPerMin: 5.0,
  // avgTakedownsLanded: 2, // This specific field is not in FighterStats, using Per15Min
  avgTakedownsLandedPer15Min: 1.5,
};

const mockFighterAProfile: FighterProfile = {
  fighterId: 'fighterA',
  firstName: 'Fighter',
  lastName: 'A',
  nickname: 'The Alpha',
  stats: mockFighterAStats,
  fightHistory: [{ fightId: 'f1', result: 'win', opponentName: 'Opponent X', method: 'KO', round: 1, time: '1:00', eventDate: '2023-01-01', eventName: 'Event Alpha' }] as Fight[],
  // Optional fields from FighterProfile can be omitted if not needed for a specific test
  nationality: 'USA',
  birthDate: '1990-01-01',
  height: 180,
  weight: 70,
  reach: 185,
  stance: 'orthodox',
  team: 'Alpha Team',
};

const mockFighterBStats: FighterStats = {
  ...mockBaseStats,
  wins: 8, losses: 4, knockouts: 3,
  avgStrikesLanded: 40, sigStrikesLandedPerMin: 4.0,
  // avgTakedownsLanded: 3, // Using Per15Min
  avgTakedownsLandedPer15Min: 2.0,
};

const mockFighterBProfile: FighterProfile = {
  fighterId: 'fighterB',
  firstName: 'Fighter',
  lastName: 'B',
  nickname: 'The Beta',
  stats: mockFighterBStats,
  fightHistory: [{ fightId: 'f2', result: 'loss', opponentName: 'Opponent Y', method: 'Decision', round: 3, time: '5:00', eventDate: '2023-02-01', eventName: 'Event Beta' }] as Fight[],
  nationality: 'Canada',
  birthDate: '1992-02-02',
  height: 178,
  weight: 70,
  reach: 183,
  stance: 'southpaw',
  team: 'Beta Team',
};

// This mock is for the conceptual EventDetails type.
// The actual structure mocked for fetchEventCompetitorIds will be simpler and more direct.
const mockEventDetailsType: EventDetails = {
  eventId: 'event123',
  name: 'Test Event',
  date: '2023-12-12',
  venue: 'Test Venue',
  mainCard: [] as Fight[],
  // `fighters` is not part of EventDetails, but fetchEventCompetitorIds mock will use a structure like:
  // { fighters: [{ id: 'fighterA' }, { id: 'fighterB' }] }
};


describe('/api/predict/[fightId]', () => {
  beforeEach(() => {
    jest.resetModules(); // Resets module registry - needed if route.ts has top-level side effects or env var caching
    process.env = { ...OLD_ENV }; // Reset environment variables
    (fetch as jest.Mock).mockClear(); // Clear fetch mock history
    // Explicitly delete RAPIDAPI_KEY to ensure tests for missing key are clean
    delete process.env.RAPIDAPI_KEY;
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore original environment variables
  });

  it('should return a successful prediction', async () => {
    process.env.RAPIDAPI_KEY = 'test-api-key';
    (fetch as jest.Mock)
      .mockResolvedValueOnce({ // Mock for fetchEventCompetitorIds
        ok: true,
        // This is the expected structure for the *event fetch* to get competitor IDs
        json: async () => ({ fighters: [{ id: 'fighterA' }, { id: 'fighterB' }] }),
      })
      .mockResolvedValueOnce({ // Mock for fighterAProfile
        ok: true,
        json: async () => mockFighterAProfile,
      })
      .mockResolvedValueOnce({ // Mock for fighterBProfile
        ok: true,
        json: async () => mockFighterBProfile,
      });

    const req = new NextRequest('http://localhost/api/predict/test-fight-id');
    const response = await GET(req, { params: { fightId: 'test-fight-id' } });
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.prediction).toHaveProperty('fighterA'); // Using generic keys from latest route code
    expect(body.prediction).toHaveProperty('fighterB');
    expect(body.prediction.fighterA + body.prediction.fighterB).toBeCloseTo(1.0, 2);
    expect(body.fighterAId).toBe('fighterA');
    expect(body.fighterBId).toBe('fighterB');
  });

  it('should return 500 if API key is not configured', async () => {
    // RAPIDAPI_KEY is deleted in beforeEach
    const req = new NextRequest('http://localhost/api/predict/test-fight-id');
    const response = await GET(req, { params: { fightId: 'test-fight-id' } });
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body.error).toBe('API key is not configured server-side');
  });

  it('should return 500 if event details fetch fails', async () => {
    process.env.RAPIDAPI_KEY = 'test-api-key';
    (fetch as jest.Mock).mockResolvedValueOnce({ // fetchEventCompetitorIds fails
      ok: false,
      status: 500,
      json: async () => ({ message: 'API error for event' }),
    });

    const req = new NextRequest('http://localhost/api/predict/test-fight-id');
    const response = await GET(req, { params: { fightId: 'test-fight-id' } });
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body.error).toContain('Could not fetch competitor IDs');
  });

  it('should return 500 if fighter A details fetch fails', async () => {
    process.env.RAPIDAPI_KEY = 'test-api-key';
    (fetch as jest.Mock)
      .mockResolvedValueOnce({ // fetchEventCompetitorIds succeeds
        ok: true,
        json: async () => ({ fighters: [{ id: 'fighterA' }, { id: 'fighterB' }] }),
      })
      .mockResolvedValueOnce({ // fighterAProfile fetch fails
        ok: false,
        status: 404,
        json: async () => ({ message: 'Fighter A not found' }),
      })
      .mockResolvedValueOnce({ // fighterBProfile fetch (might still be called or skipped by Promise.all)
        ok: true,
        json: async () => mockFighterBProfile,
      });

    const req = new NextRequest('http://localhost/api/predict/test-fight-id');
    const response = await GET(req, { params: { fightId: 'test-fight-id' } });
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body.error).toContain('Failed to fetch fighter details');
    expect(body.details).toEqual(expect.arrayContaining([expect.stringContaining('Failed to fetch details for fighter fighterA')]));
  });

  it('should handle no fight history for a fighter', async () => {
    process.env.RAPIDAPI_KEY = 'test-api-key';
    const fighterANoHistory = { ...mockFighterAProfile, fightHistory: [] };
    (fetch as jest.Mock)
      .mockResolvedValueOnce({ ok: true, json: async () => ({ fighters: [{ id: 'fighterA' }, { id: 'fighterB' }] }) })
      .mockResolvedValueOnce({ ok: true, json: async () => fighterANoHistory })
      .mockResolvedValueOnce({ ok: true, json: async () => mockFighterBProfile });

    const req = new NextRequest('http://localhost/api/predict/test-fight-id');
    const response = await GET(req, { params: { fightId: 'test-fight-id' } });
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.debug_features.recentWinPctA).toBe(0);
    expect(body.prediction.fighterA + body.prediction.fighterB).toBeCloseTo(1.0, 2);
  });

  it('should handle missing average stats for a fighter', async () => {
    process.env.RAPIDAPI_KEY = 'test-api-key';
    // Create a stats object where optional numeric stats are explicitly undefined
    const minimalStats: FighterStats = {
      ...mockBaseStats, // Use mockBaseStats to ensure all non-optional fields are present
      wins: 5, losses: 1, draws: 0, knockouts: 1, submissions: 0,
      // Explicitly set potentially undefined (optional) stats to undefined
      sigStrikesLandedPerMin: undefined,
      avgTakedownsLandedPer15Min: undefined,
      // any other optional number fields used in calculation
    };
    const fighterAMissingAvgStats: FighterProfile = {
      ...mockFighterAProfile,
      stats: minimalStats,
    };

     (fetch as jest.Mock)
      .mockResolvedValueOnce({ ok: true, json: async () => ({ fighters: [{ id: 'fighterA' }, { id: 'fighterB' }] }) })
      .mockResolvedValueOnce({ ok: true, json: async () => fighterAMissingAvgStats })
      .mockResolvedValueOnce({ ok: true, json: async () => mockFighterBProfile });

    const req = new NextRequest('http://localhost/api/predict/test-fight-id');
    const response = await GET(req, { params: { fightId: 'test-fight-id' } });
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.debug_features.avgStrikesA).toBe(0);
    expect(body.debug_features.avgTakedownsA).toBe(0);
    expect(body.prediction.fighterA + body.prediction.fighterB).toBeCloseTo(1.0, 2);
  });

});
