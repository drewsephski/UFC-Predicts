/**
 * Live Events SSE (Server-Sent Events) API Route
 * 
 * This endpoint provides real-time updates for UFC events and fights using SSE.
 * Clients can subscribe to updates for all live events or filter by specific fight/event IDs.
 * 
 * Features:
 * - Real-time probability updates
 * - Fight statistics streaming
 * - Event status changes
 * - Efficient connection handling
 */

import { NextRequest } from 'next/server';
import { getLiveFightData } from '@/lib/services/ufc-data';
import { z } from 'zod';

// Configuration
const UPDATE_INTERVAL_MS = 5000; // 5 seconds between updates
const MAX_CONNECTIONS = 1000;    // Limit concurrent connections
const MAX_DURATION_MS = 7200000; // 2 hour max connection time

// Track active connections for cleanup
let activeConnections = 0;

// Validate query parameters
const querySchema = z.object({
  fightId: z.string().optional(),
  eventId: z.string().optional(),
  interval: z.string().transform(val => {
    const parsed = parseInt(val, 10);
    return isNaN(parsed) ? UPDATE_INTERVAL_MS : Math.max(1000, Math.min(30000, parsed));
  }).optional(),
});

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  // Parse and validate query parameters
  const { searchParams } = new URL(req.url);
  
  try {
    const { fightId, eventId, interval } = querySchema.parse({
      fightId: searchParams.get('fightId') ?? undefined,
      eventId: searchParams.get('eventId') ?? undefined,
      interval: searchParams.get('interval') ?? undefined,
    });

    // Check connection limit
    if (activeConnections >= MAX_CONNECTIONS) {
      return new Response(
        JSON.stringify({ error: 'Too many connections. Try again later.' }),
        {
          status: 503,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Prepare SSE response headers
    const headers = {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no', // Disable buffering for Nginx
    };

    // Create stream
    const stream = new ReadableStream({
      async start(controller) {
        activeConnections++;
        console.log(`SSE connection opened. Active connections: ${activeConnections}`);

        // Send initial message
        const initialMessage = {
          type: 'connected',
          message: 'Connected to UFC live updates',
          timestamp: new Date().toISOString(),
          filters: { fightId, eventId },
        };
        controller.enqueue(formatSSEMessage(initialMessage));

        // Track connection start time for max duration enforcement
        const startTime = Date.now();
        let lastDataTimestamp = startTime;
        let consecutiveErrors = 0;
        
        // Set up interval for periodic updates
        const intervalId = setInterval(async () => {
          try {
            // Check if max duration exceeded
            if (Date.now() - startTime > MAX_DURATION_MS) {
              const timeoutMessage = {
                type: 'timeout',
                message: 'Maximum connection duration reached. Please reconnect.',
                timestamp: new Date().toISOString(),
              };
              controller.enqueue(formatSSEMessage(timeoutMessage));
              clearInterval(intervalId);
              controller.close();
              activeConnections--;
              return;
            }

            // Fetch fight data based on filters
            const liveData = await getLiveFightData(fightId);
            
            // If we have event ID but not fight ID, filter fights by event
            let filteredData = liveData;
            if (eventId && !fightId && liveData?.fights) {
              filteredData = {
                ...liveData,
                fights: liveData.fights.filter(fight => fight.eventId === eventId),
              };
            }

            // Only send if we have data
            if (filteredData) {
              // Add metadata
              const enrichedData = {
                type: 'update',
                timestamp: new Date().toISOString(),
                data: filteredData,
              };
              
              // Send update
              controller.enqueue(formatSSEMessage(enrichedData));
              lastDataTimestamp = Date.now();
              consecutiveErrors = 0;
            } else {
              // Send heartbeat if no data to keep connection alive
              if (Date.now() - lastDataTimestamp > 30000) { // 30 seconds
                controller.enqueue(formatSSEMessage({ 
                  type: 'heartbeat',
                  timestamp: new Date().toISOString() 
                }));
              }
            }
          } catch (error) {
            console.error('Error in SSE stream:', error);
            consecutiveErrors++;
            
            // Send error to client
            controller.enqueue(formatSSEMessage({
              type: 'error',
              message: 'Error fetching live data',
              timestamp: new Date().toISOString(),
            }));
            
            // Close connection after repeated errors
            if (consecutiveErrors >= 5) {
              controller.enqueue(formatSSEMessage({
                type: 'terminated',
                message: 'Connection terminated due to repeated errors',
                timestamp: new Date().toISOString(),
              }));
              clearInterval(intervalId);
              controller.close();
              activeConnections--;
            }
          }
        }, interval || UPDATE_INTERVAL_MS);

        // Handle client disconnect
        req.signal.addEventListener('abort', () => {
          clearInterval(intervalId);
          activeConnections--;
          console.log(`SSE connection closed. Active connections: ${activeConnections}`);
        });
      }
    });

    // Return the stream response
    return new Response(stream, { headers });
  } catch (error) {
    console.error('Error setting up SSE connection:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Invalid request parameters',
        message: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

/**
 * Format data according to SSE protocol
 * @param data Any data to be sent to the client
 * @returns Formatted SSE message
 */
function formatSSEMessage(data: any): string {
  return `data: ${JSON.stringify(data)}\n\n`;
}
