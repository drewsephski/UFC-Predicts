import type { Fighter, Fight, Event, UpcomingFight } from '@/types/mma'; // Added Event and UpcomingFight
import mockApiFighters from './mockApiFighters.json';
import mockApiEvents from './mockApiEvents.json';

// Type assertion for imported JSON data
const typedMockFighters: Fighter[] = mockApiFighters as Fighter[];
const typedMockEvents: Event[] = mockApiEvents as Event[];

// Simulate API calls with delay
const simulateAPIDelay = <T>(data: T, delay = 500): Promise<T> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data) {
        resolve(data);
      } else {
        // Simulate an error case, e.g. resource not found
        reject(new Error('Mock API error: Resource not found or processing failed.'));
      }
    }, delay);
  });
};

export const getFighters = async (): Promise<Fighter[]> => {
  console.log('Fetching all fighters...');
  try {
    // In a real app, replace with: fetch('/api/fighters')
    const fighters = await simulateAPIDelay(typedMockFighters);
    console.log('Fighters fetched successfully.');
    return fighters;
  } catch (error) {
    console.error('Error fetching fighters:', error);
    throw error; // Re-throw the error so callers can handle it
  }
};

// Import calculateFightProbabilities and its return type
import { calculateFightProbabilities, type FightOutcomeProbabilities } from '../analysis/predictions';

export const getFightOutcomeProbabilities = async (fightId: string): Promise<FightOutcomeProbabilities | null> => {
  console.log(`Calculating outcome probabilities for fight ID: ${fightId}...`);
  try {
    const fight = await getFightById(fightId);
    if (!fight) {
      console.error(`Fight with ID ${fightId} not found.`);
      throw new Error(`Fight with ID ${fightId} not found.`);
    }

    if (!fight.red_corner_fighter_id || !fight.blue_corner_fighter_id) {
      console.error(`Fighter IDs missing for fight ${fightId}.`);
      throw new Error(`Fighter IDs missing for fight ${fightId}.`);
    }

    const fighterA = await getFighterById(fight.red_corner_fighter_id);
    if (!fighterA) {
      console.error(`Red corner fighter (ID: ${fight.red_corner_fighter_id}) not found for fight ${fightId}.`);
      throw new Error(`Red corner fighter (ID: ${fight.red_corner_fighter_id}) not found.`);
    }

    const fighterB = await getFighterById(fight.blue_corner_fighter_id);
    if (!fighterB) {
      console.error(`Blue corner fighter (ID: ${fight.blue_corner_fighter_id}) not found for fight ${fightId}.`);
      throw new Error(`Blue corner fighter (ID: ${fight.blue_corner_fighter_id}) not found.`);
    }

    const probabilities = calculateFightProbabilities(fighterA, fighterB);
    console.log(`Probabilities calculated for fight ${fightId}:`, probabilities);
    return probabilities;

  } catch (error) {
    console.error(`Error calculating fight outcome probabilities for fight ${fightId}:`, error);
    // Depending on desired error handling, you might return null or re-throw
    // For now, re-throwing to let the caller decide.
    throw error;
  }
};

export const getFighterById = async (id: string): Promise<Fighter | undefined> => {
  console.log(`Fetching fighter by ID: ${id}...`);
  try {
    // In a real app, replace with: fetch(`/api/fighters/${id}`)
    const fighters = await simulateAPIDelay(typedMockFighters);
    const fighter = fighters.find(f => f.id === id);
    if (fighter) {
      console.log(`Fighter ${id} fetched successfully.`);
    } else {
      console.warn(`Fighter with ID ${id} not found.`);
    }
    return fighter;
  } catch (error) {
    console.error(`Error fetching fighter ${id}:`, error);
    throw error;
  }
};

// getUpcomingEvents instead of getUpcomingFights, returning full Event objects
export const getUpcomingEvents = async (): Promise<Event[]> => {
  console.log('Fetching upcoming events...');
  try {
    const allEvents = await simulateAPIDelay(typedMockEvents);
    // Filter for events that are not fully completed or cancelled
    // An event is considered "upcoming" if at least one of its fights is 'UPCOMING' or 'LIVE'.
    // Or, more simply, if the event itself isn't exclusively 'FINISHED' or 'CANCELLED' for all its fights.
    // A more robust approach might involve checking the event date against the current date.
    const upcomingEvents = allEvents.filter(event => {
      const allFightsInEvent = [...event.main_card, ...event.prelim_card];
      // If there are no fights, it's not really an upcoming event with fights.
      if (allFightsInEvent.length === 0) return false;
      return allFightsInEvent.some(fight => fight.status === 'UPCOMING' || fight.status === 'LIVE');
    });
    console.log('Upcoming events fetched and filtered successfully.');
    return upcomingEvents;
  } catch (error) {
    console.error('Error fetching upcoming events:', error);
    throw error;
  }
};

export const getEventById = async (id: string): Promise<Event | undefined> => {
  console.log(`Fetching event by ID: ${id}...`);
  try {
    // In a real app, replace with: fetch(`/api/events/${id}`)
    const events = await simulateAPIDelay(typedMockEvents);
    const event = events.find(e => e.id === id);
    if (event) {
      console.log(`Event ${id} fetched successfully.`);
    } else {
      console.warn(`Event with ID ${id} not found.`);
    }
    return event;
  } catch (error) {
    console.error(`Error fetching event ${id}:`, error);
    throw error;
  }
};

// This function will get fight details.
// For now, it simulates finding a fight within the mock events.
// A more robust version would fetch from a `/fights/:id` endpoint.
export const getFightById = async (fightId: string): Promise<Fight | undefined> => {
  console.log(`Fetching fight by ID: ${fightId}...`);
  try {
    const events = await simulateAPIDelay(typedMockEvents);
    for (const event of events) {
      const fight =
        event.main_card.find(f => f.fight_id === fightId) ||
        event.prelim_card.find(f => f.fight_id === fightId);
      if (fight) {
        // In a real API, this fight object might be more detailed.
        // We can augment it here if needed, or assume the mock data is sufficient.
        console.log(`Fight ${fightId} fetched successfully.`);
        return { ...fight, event_id: event.id, date: event.date, location: event.location, venue: event.venue };
      }
    }
    console.warn(`Fight with ID ${fightId} not found in any event.`);
    return undefined;
  } catch (error) {
    console.error(`Error fetching fight ${fightId}:`, error);
    throw error;
  }
};

// Get fights for a specific fighter using their recent_fights array
export const getFightsByFighterId = async (fighterId: string): Promise<Fight[]> => {
  console.log(`Fetching fights for fighter ID: ${fighterId}...`);
  try {
    const fighter = await getFighterById(fighterId);
    if (!fighter || !fighter.recent_fights) {
      console.warn(`No recent fights found for fighter ID: ${fighterId}.`);
      return [];
    }
    // The recent_fights in Fighter is simpler. We need to transform/enrich them
    // to match the full Fight type, or decide if the simpler version is okay here.
    // For now, let's assume we want to return a list of Fight objects.
    // This might involve fetching full fight details for each recent_fight.id
    // For this iteration, we'll map them and add what info we have.
    const fights: Fight[] = await Promise.all(fighter.recent_fights.map(async (recentFight) => {
        // Try to find more details from the getFightById (which searches events)
        // This is a bit circular but simulates looking up full fight details
        const fullFightDetails = await getFightById(recentFight.fight_id);
        if (fullFightDetails) return fullFightDetails;

        // Fallback if not found in events (e.g. older fights not in current events)
        // We'd need a more comprehensive /fights/:id mock or endpoint for these
        return {
            fight_id: recentFight.fight_id,
            // We need to know opponent_id, not just name, for a full Fight object
            // This indicates a mismatch or need for more detailed mock data for recent_fights
            red_corner_fighter_id: fighterId, // Assuming the fighter is always red_corner here - BAD ASSUMPTION
            blue_corner_fighter_id: 'unknown', // We don't have opponent ID
            weight_class: 'Unknown', // This info isn't in recent_fights
            // ... other fields might be missing or need default values
            method: recentFight.method,
            round: recentFight.round,
            date: recentFight.date,
            winner_id: recentFight.result === 'win' ? fighterId : (recentFight.result === 'loss' ? 'opponent_id_placeholder' : null),
            // ^ This is also a placeholder, we need the actual opponent's ID.
        } as Fight; // Cast as Fight, acknowledging some fields might be incomplete
    }));
    console.log(`Fights for fighter ${fighterId} fetched successfully.`);
    return fights.filter(f => f); // Filter out any undefined if getFightById failed
  } catch (error) {
    console.error(`Error fetching fights for fighter ${fighterId}:`, error);
    throw error;
  }
};

// Example of a function that might be used by UI to display upcoming fights
// This would transform Event data into a simpler structure if needed.
export const getSimplifiedUpcomingFights = async (): Promise<UpcomingFight[]> => {
  console.log('Fetching and simplifying upcoming fights for UI...');
  try {
    const events = await getUpcomingEvents();
    const simplifiedFights: UpcomingFight[] = [];

    for (const event of events) {
      const allFights = [...event.main_card, ...event.prelim_card];
      for (const fight of allFights) {
        // To get fighter names, we'd ideally have them in the fight object
        // or fetch them. For now, we'll use IDs.
        // In a real app, you might enrich this data here.
        simplifiedFights.push({
          id: fight.fight_id,
          eventName: event.name,
          date: event.date,
          time: "TBD", // Event data doesn't have specific time for each fight
          fighters: {
            fighter1Id: fight.red_corner_fighter_id,
            fighter2Id: fight.blue_corner_fighter_id,
          },
          venue: event.venue,
          // imgSrc: event.imageUrl or a default one
        });
      }
    }
    console.log('Simplified upcoming fights processed.');
    return simplifiedFights;
  } catch (error) {
    console.error('Error processing simplified upcoming fights:', error);
    throw error;
  }
};
