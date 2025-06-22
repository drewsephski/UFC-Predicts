/**
 * UFC Data Synchronization Cron Job
 * 
 * This API route refreshes all UFC data (fighters, events, rankings, news)
 * It can be triggered:
 * 1. Manually via API call with proper authentication
 * 2. Automatically via Vercel Cron (configured in vercel.json)
 * 
 * Example Vercel Cron configuration:
 * {
 *   "crons": [
 *     {
 *       "path": "/api/cron/sync-data",
 *       "schedule": "0 * * * *"  // Run hourly
 *     }
 *   ]
 * }
 */

import { NextRequest, NextResponse } from 'next/server';
import { refreshAllData, getAllFighters, getUpcomingEvents, getRankings, getNews } from '@/lib/services/ufc-data';
import { CacheNamespace, invalidateNamespace } from '@/lib/cache';

// Environment variables
const CRON_SECRET = process.env.CRON_SECRET || 'default-secret-change-me';
const IS_VERCEL_CRON = process.env.VERCEL_CRON === '1';

// Types for response
interface SyncStats {
  fightersCount: number;
  eventsCount: number;
  rankingDivisions: number;
  newsArticles: number;
  startTime: string;
  endTime: string;
  duration: number;
}

interface SyncResponse {
  success: boolean;
  message: string;
  stats?: SyncStats;
  errors?: string[];
}

/**
 * Validates the request is authorized to trigger data sync
 */
function isAuthorized(req: NextRequest): boolean {
  // Allow Vercel Cron jobs automatically
  if (IS_VERCEL_CRON) {
    return true;
  }
  
  // Check for authorization header or query param
  const authHeader = req.headers.get('authorization');
  const { searchParams } = new URL(req.url);
  const secretParam = searchParams.get('secret');
  
  // Validate against environment variable
  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    return token === CRON_SECRET;
  } else if (secretParam) {
    return secretParam === CRON_SECRET;
  }
  
  return false;
}

/**
 * Logs the sync process
 */
function logSync(message: string, isError = false): void {
  const timestamp = new Date().toISOString();
  const logMethod = isError ? console.error : console.log;
  logMethod(`[UFC-SYNC ${timestamp}] ${message}`);
}

/**
 * GET handler for the sync endpoint
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
  const startTime = new Date();
  const errors: string[] = [];
  
  // Verify authorization
  if (!isAuthorized(req)) {
    logSync('Unauthorized sync attempt', true);
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  logSync('Starting UFC data synchronization');
  
  try {
    // Refresh all data
    await refreshAllData();
    logSync('Data refresh completed successfully');
    
    // Collect statistics about what was updated
    const stats: SyncStats = {
      fightersCount: 0,
      eventsCount: 0,
      rankingDivisions: 0,
      newsArticles: 0,
      startTime: startTime.toISOString(),
      endTime: new Date().toISOString(),
      duration: 0
    };
    
    // Gather statistics in parallel
    try {
      const [fighters, events, rankings, news] = await Promise.all([
        getAllFighters(),
        getUpcomingEvents(),
        getRankings(),
        getNews(10)
      ]);
      
      stats.fightersCount = fighters.length;
      stats.eventsCount = events.length;
      stats.rankingDivisions = Object.keys(rankings).length;
      stats.newsArticles = news.length;
    } catch (statsError) {
      logSync(`Error gathering statistics: ${statsError instanceof Error ? statsError.message : String(statsError)}`, true);
      errors.push('Failed to gather complete statistics');
    }
    
    // Calculate duration
    const endTime = new Date();
    stats.endTime = endTime.toISOString();
    stats.duration = endTime.getTime() - startTime.getTime();
    
    // Prepare response
    const response: SyncResponse = {
      success: true,
      message: 'UFC data synchronized successfully',
      stats,
      ...(errors.length > 0 && { errors })
    };
    
    return NextResponse.json(response);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logSync(`Sync failed: ${errorMessage}`, true);
    
    return NextResponse.json(
      {
        success: false,
        message: 'UFC data synchronization failed',
        errors: [errorMessage]
      },
      { status: 500 }
    );
  }
}

/**
 * Force refresh specific data type via POST
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  // Verify authorization
  if (!isAuthorized(req)) {
    logSync('Unauthorized force refresh attempt', true);
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  try {
    // Get data type from request body
    const { dataType } = await req.json();
    
    if (!dataType) {
      return NextResponse.json(
        { success: false, message: 'Missing dataType parameter' },
        { status: 400 }
      );
    }
    
    // Map data type to cache namespace
    const namespaceMap: Record<string, CacheNamespace> = {
      fighters: CacheNamespace.FIGHTERS,
      fighter: CacheNamespace.FIGHTER,
      events: CacheNamespace.EVENTS,
      event: CacheNamespace.EVENT,
      rankings: CacheNamespace.RANKINGS,
      news: CacheNamespace.NEWS
    };
    
    const namespace = namespaceMap[dataType.toLowerCase()];
    
    if (!namespace) {
      return NextResponse.json(
        { success: false, message: 'Invalid dataType parameter' },
        { status: 400 }
      );
    }
    
    // Invalidate specific namespace
    logSync(`Force refreshing ${dataType} data`);
    await invalidateNamespace(namespace);
    
    // Refresh all data to ensure consistency
    await refreshAllData();
    
    return NextResponse.json({
      success: true,
      message: `${dataType} data force refreshed successfully`
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logSync(`Force refresh failed: ${errorMessage}`, true);
    
    return NextResponse.json(
      {
        success: false,
        message: 'Force refresh failed',
        errors: [errorMessage]
      },
      { status: 500 }
    );
  }
}
