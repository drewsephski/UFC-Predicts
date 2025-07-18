/**
 * UFC Rankings API Route
 * 
 * A streamlined API endpoint that serves UFC fighter rankings data from the static database.
 * This is the single source of truth for all fighter data in the application.
 * 
 * Supported query parameters:
 * - all=true: Get all fighters
 * - division=<name>: Filter by division (e.g., "Lightweight", "Women's Strawweight")
 * - id=<fighter-id>: Get a specific fighter by ID
 * - search=<query>: Search fighters by name
 * - champions=true: Get champions only
 * - p4p=<mens|womens|all>: Get pound-for-pound rankings
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import fightersDb, { 
  getAllFighters, 
  getFightersByDivision, 
  getFighterById, 
  searchFighters,
  getAllChampions,
  getAllDivisions
} from '@/data/ufc-fighters-db';

// Cache control constants
const CACHE_MAX_AGE = 60 * 60; // 1 hour

// Schema for validating query parameters
const querySchema = z.object({
  all: z.string().optional().transform(val => val === 'true'),
  division: z.string().optional(),
  id: z.string().optional(),
  search: z.string().optional(),
  champions: z.string().optional().transform(val => val === 'true'),
  p4p: z.enum(['mens', 'womens', 'all']).optional(),
});

export async function GET(req: NextRequest) {
  try {
    // Parse URL and query parameters
    const { searchParams } = new URL(req.url);
    
    // Validate query parameters
    const result = querySchema.safeParse({
      all: searchParams.get('all'),
      division: searchParams.get('division'),
      id: searchParams.get('id'),
      search: searchParams.get('search'),
      champions: searchParams.get('champions'),
      p4p: searchParams.get('p4p'),
    });
    
    if (!result.success) {
      return NextResponse.json(
        { 
          error: 'Invalid query parameters', 
          details: result.error.format() 
        },
        { status: 400 }
      );
    }
    
    const { all, division, id, search, champions, p4p } = result.data;
    
    // Handle specific fighter request by ID
    if (id) {
      const fighter = getFighterById(id);
      if (!fighter) {
        return NextResponse.json(
          { error: 'Fighter not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(fighter, {
        headers: {
          'Cache-Control': `public, max-age=${CACHE_MAX_AGE}`,
        }
      });
    }
    
    // Handle search query
    if (search) {
      const results = searchFighters(search);
      return NextResponse.json(results, {
        headers: {
          'Cache-Control': `public, max-age=${CACHE_MAX_AGE}`,
        }
      });
    }
    
    // Handle champions only request
    if (champions) {
      const allChampions = getAllChampions();
      return NextResponse.json(allChampions, {
        headers: {
          'Cache-Control': `public, max-age=${CACHE_MAX_AGE}`,
        }
      });
    }
    
    // Handle pound-for-pound rankings
    if (p4p) {
      const p4pRankings = {
        lastUpdated: fightersDb.lastUpdated
      };
      
      if (p4p === 'mens' || p4p === 'all') {
        Object.assign(p4pRankings, { mens: fightersDb.rankings.pound4pound.mens });
      }
      
      if (p4p === 'womens' || p4p === 'all') {
        Object.assign(p4pRankings, { womens: fightersDb.rankings.pound4pound.womens });
      }
      
      return NextResponse.json(p4pRankings, {
        headers: {
          'Cache-Control': `public, max-age=${CACHE_MAX_AGE}`,
        }
      });
    }
    
    // Handle division filter
    if (division) {
      const divisionFighters = getFightersByDivision(division);
      if (divisionFighters.length === 0) {
        // Check if the division exists
        const availableDivisions = getAllDivisions();
        if (!availableDivisions.includes(division)) {
          return NextResponse.json(
            { 
              error: 'Division not found',
              availableDivisions
            },
            { status: 404 }
          );
        }
      }
      
      return NextResponse.json({
        division,
        fighters: divisionFighters,
        lastUpdated: fightersDb.lastUpdated
      }, {
        headers: {
          'Cache-Control': `public, max-age=${CACHE_MAX_AGE}`,
        }
      });
    }
    
    // Handle all fighters request or default response
    if (all) {
      const allFighters = getAllFighters();
      return NextResponse.json({
        fighters: allFighters,
        count: allFighters.length,
        lastUpdated: fightersDb.lastUpdated
      }, {
        headers: {
          'Cache-Control': `public, max-age=${CACHE_MAX_AGE}`,
        }
      });
    }
    
    // Default: return available endpoints and basic info
    return NextResponse.json({
      info: {
        title: "UFC Rankings API",
        description: "Official UFC rankings data from UFC.com/rankings",
        lastUpdated: fightersDb.lastUpdated
      },
      availableEndpoints: {
        allFighters: "/api/ufc-rankings?all=true",
        byDivision: "/api/ufc-rankings?division={divisionName}",
        byFighterId: "/api/ufc-rankings?id={fighterId}",
        search: "/api/ufc-rankings?search={query}",
        champions: "/api/ufc-rankings?champions=true",
        poundForPound: "/api/ufc-rankings?p4p=mens|womens|all"
      },
      availableDivisions: getAllDivisions(),
      totalFighters: getAllFighters().length,
      totalChampions: getAllChampions().length
    }, {
      headers: {
        'Cache-Control': `public, max-age=${CACHE_MAX_AGE}`,
      }
    });
  } catch (error) {
    console.error('Error in UFC rankings API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Enable CORS for this endpoint
export const config = {
  runtime: 'edge',
  regions: ['auto'],
};
