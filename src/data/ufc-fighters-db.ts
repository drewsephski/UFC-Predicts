/**
 * UFC Fighters Database
 * 
 * This file contains a static database of UFC fighters parsed from the official UFC.com/rankings page.
 * It provides structured access to all ranked fighters, champions, and division information.
 * 
 * The data is organized by divisions and includes:
 * - All UFC champions
 * - All ranked fighters (1-15) in each division
 * - Men's and Women's Pound-for-Pound rankings
 * - Fighter metadata (profile URLs, divisions, etc.)
 */

// =====================================================================
// Types
// =====================================================================

/**
 * Represents a UFC fighter with ranking information
 */
export interface RankedFighter {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  nickname?: string;
  profileUrl: string;
  imageUrl?: string;
  division: string;
  isChampion: boolean;
  rank: number;
  rankChange?: number | null;
  isNewlyRanked?: boolean;
}

/**
 * Represents a complete set of UFC rankings
 */
export interface UFCRankings {
  lastUpdated: string;
  divisions: {
    [division: string]: {
      name: string;
      champion?: RankedFighter;
      fighters: RankedFighter[];
    }
  };
  pound4pound: {
    mens: RankedFighter[];
    womens: RankedFighter[];
  };
}

// =====================================================================
// Helper Functions
// =====================================================================

/**
 * Creates a unique ID from a fighter's name
 */
function createFighterId(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Extracts first name, last name, and nickname from a fighter's full name
 */
function extractNameComponents(fullName: string): { firstName: string, lastName: string, nickname?: string } {
  // Handle nickname in parentheses, e.g., "Jon (Bones) Jones"
  const nicknameMatch = fullName.match(/^(.*?)\s+\((.*?)\)\s+(.*)$/);
  if (nicknameMatch) {
    const [_, firstName, nickname, lastName] = nicknameMatch;
    return { firstName, lastName, nickname };
  }

  // Simple case: split on last space
  const nameParts = fullName.trim().split(' ');
  if (nameParts.length === 1) {
    return { firstName: nameParts[0], lastName: '' };
  }
  
  const lastName = nameParts.pop() || '';
  const firstName = nameParts.join(' ');
  
  return { firstName, lastName };
}

/**
 * Parses a rank change string to extract numeric change
 */
function parseRankChange(changeText?: string): { change: number | null, isNewlyRanked: boolean } {
  if (!changeText) return { change: null, isNewlyRanked: false };
  
  // Check for "NR" (Newly Ranked)
  if (changeText.trim() === "NR") {
    return { change: null, isNewlyRanked: true };
  }
  
  // Parse rank increase/decrease
  const match = changeText.match(/increased by (\d+)|decreased by (\d+)/i);
  if (!match) return { change: null, isNewlyRanked: false };
  
  const increase = match[1];
  const decrease = match[2];
  
  if (increase) return { change: parseInt(increase, 10), isNewlyRanked: false };
  if (decrease) return { change: -parseInt(decrease, 10), isNewlyRanked: false };
  
  return { change: null, isNewlyRanked: false };
}

/**
 * Creates a fighter object from parsed data
 */
function createFighter(
  name: string,
  profileUrl: string,
  division: string,
  rank: number,
  isChampion: boolean = false,
  changeText?: string,
  imageUrl?: string
): RankedFighter {
  const { firstName, lastName, nickname } = extractNameComponents(name);
  const { change: rankChange, isNewlyRanked } = parseRankChange(changeText);
  
  return {
    id: createFighterId(name),
    name,
    firstName,
    lastName,
    nickname,
    profileUrl,
    imageUrl,
    division,
    isChampion,
    rank,
    rankChange,
    isNewlyRanked
  };
}

// =====================================================================
// Parse UFC Rankings Data
// =====================================================================

/**
 * Manually parsed UFC fighters database from the UFC rankings page
 */
export const ufcFightersDb: UFCRankings = {
  lastUpdated: "2025-07-15T00:00:00.000Z", // From "Last updated: Tuesday, Jul. 15"
  divisions: {
    "Flyweight": {
      name: "Flyweight",
      champion: createFighter(
        "Alexandre Pantoja",
        "https://www.ufc.com/athlete/alexandre-pantoja",
        "Flyweight",
        0,
        true,
        undefined,
        "https://ufc.com/images/styles/athlete_profile_listing_medium_1x/s3/2025-06/PANTOJA_ALEXANDRE_BELT_06-28.png?itok=rbkVgiUn"
      ),
      fighters: [
        createFighter("Joshua Van", "https://www.ufc.com/athlete/joshua-van", "Flyweight", 1),
        createFighter("Brandon Moreno", "https://www.ufc.com/athlete/brandon-moreno", "Flyweight", 2),
        createFighter("Brandon Royval", "https://www.ufc.com/athlete/brandon-royval", "Flyweight", 3),
        createFighter("Amir Albazi", "https://www.ufc.com/athlete/amir-albazi", "Flyweight", 4),
        createFighter("Kai Kara-France", "https://www.ufc.com/athlete/kai-kara-france", "Flyweight", 5),
        createFighter("Tatsuro Taira", "https://www.ufc.com/athlete/tatsuro-taira", "Flyweight", 6),
        createFighter("Manel Kape", "https://www.ufc.com/athlete/manel-kape", "Flyweight", 7),
        createFighter("Alex Perez", "https://www.ufc.com/athlete/alex-perez", "Flyweight", 8),
        createFighter("Asu Almabayev", "https://www.ufc.com/athlete/assu-almabayev", "Flyweight", 9),
        createFighter("Steve Erceg", "https://www.ufc.com/athlete/steve-erceg", "Flyweight", 10),
        createFighter("Tim Elliott", "https://www.ufc.com/athlete/tim-elliott", "Flyweight", 11),
        createFighter("Tagir Ulanbekov", "https://www.ufc.com/athlete/tagir-ulanbekov", "Flyweight", 12),
        createFighter("Ramazan Temirov", "https://www.ufc.com/athlete/ramazan-temirov", "Flyweight", 13),
        createFighter("Bruno Silva", "https://www.ufc.com/athlete/bruno-silva", "Flyweight", 14),
        createFighter("Kai Asakura", "https://www.ufc.com/athlete/kai-asakura", "Flyweight", 15)
      ]
    },
    "Bantamweight": {
      name: "Bantamweight",
      champion: createFighter(
        "Merab Dvalishvili",
        "https://www.ufc.com/athlete/merab-dvalishvili",
        "Bantamweight",
        0,
        true,
        undefined,
        "https://ufc.com/images/styles/athlete_profile_listing_medium_1x/s3/2025-06/DVALISHVILI_MERAB_BELT_06-07.png?itok=EOTPtof9"
      ),
      fighters: [
        createFighter("Sean O'Malley", "https://www.ufc.com/athlete/sean-omalley", "Bantamweight", 1),
        createFighter("Umar Nurmagomedov", "https://www.ufc.com/athlete/umar-nurmagomedov", "Bantamweight", 2),
        createFighter("Petr Yan", "https://www.ufc.com/athlete/petr-yan", "Bantamweight", 3),
        createFighter("Cory Sandhagen", "https://www.ufc.com/athlete/cory-sandhagen", "Bantamweight", 4),
        createFighter("Song Yadong", "https://www.ufc.com/athlete/yadong-song", "Bantamweight", 5),
        createFighter("Deiveson Figueiredo", "https://www.ufc.com/athlete/deiveson-figueiredo", "Bantamweight", 6),
        createFighter("Marlon Vera", "https://www.ufc.com/athlete/marlon-vera", "Bantamweight", 7),
        createFighter("Mario Bautista", "https://www.ufc.com/athlete/mario-bautista", "Bantamweight", 8),
        createFighter("Rob Font", "https://www.ufc.com/athlete/rob-font", "Bantamweight", 8),
        createFighter("Henry Cejudo", "https://www.ufc.com/athlete/henry-cejudo", "Bantamweight", 10),
        createFighter("Aiemann Zahabi", "https://www.ufc.com/athlete/aiemann-zahabi", "Bantamweight", 11),
        createFighter("Kyler Phillips", "https://www.ufc.com/athlete/kyler-phillips", "Bantamweight", 12),
        createFighter("Marcus McGhee", "https://www.ufc.com/athlete/marcus-mcghee", "Bantamweight", 13),
        createFighter("Montel Jackson", "https://www.ufc.com/athlete/montel-jackson", "Bantamweight", 14),
        createFighter("Vinicius Oliveira", "https://www.ufc.com/athlete/vinicius-oliveira", "Bantamweight", 15)
      ]
    },
    "Featherweight": {
      name: "Featherweight",
      champion: createFighter(
        "Ilia Topuria",
        "https://www.ufc.com/athlete/ilia-topuria",
        "Featherweight",
        0,
        true,
        undefined,
        "https://ufc.com/images/styles/athlete_profile_listing_medium_1x/s3/2025-06/TOPURIA_ILIA_BELT_10-26.png?itok=tLZyea-W"
      ),
      fighters: [
        createFighter("Movsar Evloev", "https://www.ufc.com/athlete/movsar-evloev", "Featherweight", 1, false, "Rank increased by 1"),
        createFighter("Diego Lopes", "https://www.ufc.com/athlete/diego-lopes", "Featherweight", 2, false, "Rank increased by 1"),
        createFighter("Yair Rodriguez", "https://www.ufc.com/athlete/yair-rodriguez", "Featherweight", 3, false, "Rank increased by 1"),
        createFighter("Arnold Allen", "https://www.ufc.com/athlete/arnold-allen", "Featherweight", 4, false, "Rank increased by 1"),
        createFighter("Brian Ortega", "https://www.ufc.com/athlete/brian-ortega", "Featherweight", 4, false, "Rank increased by 1"),
        createFighter("Lerone Murphy", "https://www.ufc.com/athlete/lerone-murphy", "Featherweight", 6, false, "Rank increased by 1"),
        createFighter("Aljamain Sterling", "https://www.ufc.com/athlete/aljamain-sterling", "Featherweight", 7, false, "Rank increased by 1"),
        createFighter("Josh Emmett", "https://www.ufc.com/athlete/josh-emmett", "Featherweight", 8, false, "Rank increased by 1"),
        createFighter("Youssef Zalal", "https://www.ufc.com/athlete/youssef-zalal", "Featherweight", 9, false, "Rank increased by 2"),
        createFighter("Jean Silva", "https://www.ufc.com/athlete/jean-silva", "Featherweight", 10),
        createFighter("Dan Ige", "https://www.ufc.com/athlete/dan-ige", "Featherweight", 11, false, "Rank increased by 1"),
        createFighter("Steve Garcia", "https://www.ufc.com/athlete/steve-garcia", "Featherweight", 11, false, "NR"),
        createFighter("David Onama", "https://www.ufc.com/athlete/david-onama", "Featherweight", 13),
        createFighter("Giga Chikadze", "https://www.ufc.com/athlete/giga-chikadze", "Featherweight", 14, false, "Rank increased by 1"),
        createFighter("Bryce Mitchell", "https://www.ufc.com/athlete/bryce-mitchell", "Featherweight", 15, false, "NR"),
        createFighter("Calvin Kattar", "https://www.ufc.com/athlete/calvin-kattar", "Featherweight", 15, false, "Rank decreased by 1")
      ]
    },
    "Lightweight": {
      name: "Lightweight",
      champion: createFighter(
        "Ilia Topuria",
        "https://www.ufc.com/athlete/ilia-topuria",
        "Lightweight",
        0,
        true,
        undefined,
        "https://ufc.com/images/styles/athlete_profile_listing_medium_1x/s3/2025-06/TOPURIA_ILIA_BELT_10-26.png?itok=tLZyea-W"
      ),
      fighters: [
        createFighter("Islam Makhachev", "https://www.ufc.com/athlete/islam-makhachev", "Lightweight", 1),
        createFighter("Arman Tsarukyan", "https://www.ufc.com/athlete/arman-tsarukyan", "Lightweight", 2),
        createFighter("Charles Oliveira", "https://www.ufc.com/athlete/charles-oliveira", "Lightweight", 3),
        createFighter("Justin Gaethje", "https://www.ufc.com/athlete/justin-gaethje", "Lightweight", 4),
        createFighter("Max Holloway", "https://www.ufc.com/athlete/max-holloway", "Lightweight", 5),
        createFighter("Dustin Poirier", "https://www.ufc.com/athlete/dustin-poirier", "Lightweight", 6),
        createFighter("Dan Hooker", "https://www.ufc.com/athlete/dan-hooker", "Lightweight", 7),
        createFighter("Mateusz Gamrot", "https://www.ufc.com/athlete/mateusz-gamrot", "Lightweight", 8),
        createFighter("Beneil Dariush", "https://www.ufc.com/athlete/beneil-dariush", "Lightweight", 9),
        createFighter("Paddy Pimblett", "https://www.ufc.com/athlete/paddy-pimblett", "Lightweight", 10),
        createFighter("Rafael Fiziev", "https://www.ufc.com/athlete/rafael-fiziev", "Lightweight", 11),
        createFighter("Renato Moicano", "https://www.ufc.com/athlete/renato-moicano", "Lightweight", 12),
        createFighter("Michael Chandler", "https://www.ufc.com/athlete/michael-chandler", "Lightweight", 13),
        createFighter("Benoît Saint Denis", "https://www.ufc.com/athlete/benoit-saint-denis", "Lightweight", 14),
        createFighter("Grant Dawson", "https://www.ufc.com/athlete/grant-dawson", "Lightweight", 15)
      ]
    },
    "Welterweight": {
      name: "Welterweight",
      champion: createFighter(
        "Jack Della Maddalena",
        "https://www.ufc.com/athlete/jack-della-maddalena",
        "Welterweight",
        0,
        true,
        undefined,
        "https://ufc.com/images/styles/athlete_profile_listing_medium_1x/s3/2025-05/DELLA_MADDALENA_JACK_BELT_05-10.png?itok=JnAMqgi6"
      ),
      fighters: [
        createFighter("Belal Muhammad", "https://www.ufc.com/athlete/belal-muhammad", "Welterweight", 1),
        createFighter("Sean Brady", "https://www.ufc.com/athlete/sean-brady", "Welterweight", 2),
        createFighter("Shavkat Rakhmonov", "https://www.ufc.com/athlete/shavkat-rakhmonov", "Welterweight", 3),
        createFighter("Leon Edwards", "https://www.ufc.com/athlete/leon-edwards", "Welterweight", 4),
        createFighter("Kamaru Usman", "https://www.ufc.com/athlete/kamaru-usman", "Welterweight", 5),
        createFighter("Ian Machado Garry", "https://www.ufc.com/athlete/ian-garry", "Welterweight", 6),
        createFighter("Michael Morales", "https://www.ufc.com/athlete/michael-morales", "Welterweight", 7),
        createFighter("Joaquin Buckley", "https://www.ufc.com/athlete/joaquin-buckley", "Welterweight", 8, false, "Rank decreased by 1"),
        createFighter("Colby Covington", "https://www.ufc.com/athlete/colby-covington", "Welterweight", 9),
        createFighter("Gilbert Burns", "https://www.ufc.com/athlete/gilbert-burns", "Welterweight", 10),
        createFighter("Geoff Neal", "https://www.ufc.com/athlete/geoff-neal", "Welterweight", 11),
        createFighter("Carlos Prates", "https://www.ufc.com/athlete/carlos-prates", "Welterweight", 12, false, "Rank increased by 1"),
        createFighter("Kevin Holland", "https://www.ufc.com/athlete/kevin-holland", "Welterweight", 13, false, "Rank increased by 1"),
        createFighter("Gabriel Bonfim", "https://www.ufc.com/athlete/gabriel-bonfim", "Welterweight", 14, false, "NR"),
        createFighter("Michael Page", "https://www.ufc.com/athlete/michael-page", "Welterweight", 15)
      ]
    },
    "Middleweight": {
      name: "Middleweight",
      champion: createFighter(
        "Dricus Du Plessis",
        "https://www.ufc.com/athlete/dricus-du-plessis",
        "Middleweight",
        0,
        true,
        undefined,
        "https://ufc.com/images/styles/athlete_profile_listing_medium_1x/s3/2025-02/DU_PLESSIS_DRICUS_BELT_02-08.png?itok=vksdtJzz"
      ),
      fighters: [
        createFighter("Nassourdine Imavov", "https://www.ufc.com/athlete/nassourdine-imavov", "Middleweight", 1),
        createFighter("Sean Strickland", "https://www.ufc.com/athlete/sean-strickland", "Middleweight", 2),
        createFighter("Khamzat Chimaev", "https://www.ufc.com/athlete/khamzat-chimaev", "Middleweight", 3),
        createFighter("Israel Adesanya", "https://www.ufc.com/athlete/israel-adesanya", "Middleweight", 4),
        createFighter("Robert Whittaker", "https://www.ufc.com/athlete/robert-whittaker", "Middleweight", 5),
        createFighter("Caio Borralho", "https://www.ufc.com/athlete/caio-borralho", "Middleweight", 6),
        createFighter("Jared Cannonier", "https://www.ufc.com/athlete/jared-cannonier", "Middleweight", 7),
        createFighter("Roman Dolidze", "https://www.ufc.com/athlete/roman-dolidze", "Middleweight", 8),
        createFighter("Anthony Hernandez", "https://www.ufc.com/athlete/anthony-hernandez", "Middleweight", 9),
        createFighter("Marvin Vettori", "https://www.ufc.com/athlete/marvin-vettori", "Middleweight", 10),
        createFighter("Brendan Allen", "https://www.ufc.com/athlete/brendan-allen", "Middleweight", 11),
        createFighter("Reinier de Ridder", "https://www.ufc.com/athlete/reinier-de-ridder", "Middleweight", 12),
        createFighter("Paulo Costa", "https://www.ufc.com/athlete/paulo-costa", "Middleweight", 13),
        createFighter("Roman Kopylov", "https://www.ufc.com/athlete/roman-kopylov", "Middleweight", 14),
        createFighter("Abus Magomedov", "https://www.ufc.com/athlete/abus-magomedov", "Middleweight", 15)
      ]
    },
    "Light Heavyweight": {
      name: "Light Heavyweight",
      champion: createFighter(
        "Magomed Ankalaev",
        "https://www.ufc.com/athlete/magomed-ankalaev",
        "Light Heavyweight",
        0,
        true,
        undefined,
        "https://ufc.com/images/styles/athlete_profile_listing_medium_1x/s3/2025-03/ANKALAEV_MAGOMED_BELTMOCK.png?itok=9W8FkGxc"
      ),
      fighters: [
        createFighter("Alex Pereira", "https://www.ufc.com/athlete/alex-pereira", "Light Heavyweight", 1),
        createFighter("Jiří Procházka", "https://www.ufc.com/athlete/jiri-prochazka", "Light Heavyweight", 2),
        createFighter("Carlos Ulberg", "https://www.ufc.com/athlete/carlos-ulberg", "Light Heavyweight", 3),
        createFighter("Khalil Rountree Jr.", "https://www.ufc.com/athlete/khalil-rountree-jr", "Light Heavyweight", 4),
        createFighter("Jan Błachowicz", "https://www.ufc.com/athlete/jan-blachowicz", "Light Heavyweight", 5),
        createFighter("Jamahal Hill", "https://www.ufc.com/athlete/jamahal-hill", "Light Heavyweight", 6),
        createFighter("Aleksandar Rakić", "https://www.ufc.com/athlete/aleksandar-rakic", "Light Heavyweight", 7),
        createFighter("Dominick Reyes", "https://www.ufc.com/athlete/dominick-reyes", "Light Heavyweight", 8),
        createFighter("Volkan Oezdemir", "https://www.ufc.com/athlete/volkan-oezdemir", "Light Heavyweight", 9),
        createFighter("Nikita Krylov", "https://www.ufc.com/athlete/nikita-krylov", "Light Heavyweight", 10),
        createFighter("Azamat Murzakanov", "https://www.ufc.com/athlete/azamat-murzakanov", "Light Heavyweight", 11),
        createFighter("Johnny Walker", "https://www.ufc.com/athlete/johnny-walker", "Light Heavyweight", 12),
        createFighter("Bogdan Guskov", "https://www.ufc.com/athlete/bogdan-guskov", "Light Heavyweight", 13),
        createFighter("Zhang Mingyang", "https://www.ufc.com/athlete/zhang-mingyang", "Light Heavyweight", 14),
        createFighter("Alonzo Menifield", "https://www.ufc.com/athlete/alonzo-menifield", "Light Heavyweight", 15)
      ]
    },
    "Heavyweight": {
      name: "Heavyweight",
      champion: createFighter(
        "Tom Aspinall",
        "https://www.ufc.com/athlete/tom-aspinall",
        "Heavyweight",
        0,
        true,
        undefined,
        "https://ufc.com/images/styles/athlete_profile_listing_medium_1x/s3/2025-01/5/ASPINALL_TOM_BELT_07-27.png?itok=Su9ra8Tp"
      ),
      fighters: [
        createFighter("Ciryl Gane", "https://www.ufc.com/athlete/ciryl-gane", "Heavyweight", 1),
        createFighter("Alexander Volkov", "https://www.ufc.com/athlete/alexander-volkov", "Heavyweight", 2),
        createFighter("Sergei Pavlovich", "https://www.ufc.com/athlete/sergei-pavlovich", "Heavyweight", 3),
        createFighter("Curtis Blaydes", "https://www.ufc.com/athlete/curtis-blaydes", "Heavyweight", 4),
        createFighter("Jailton Almeida", "https://www.ufc.com/athlete/jailton-almeida", "Heavyweight", 5),
        createFighter("Waldo Cortes Acosta", "https://www.ufc.com/athlete/waldo-cortes-acosta", "Heavyweight", 6),
        createFighter("Marcin Tybura", "https://www.ufc.com/athlete/marcin-tybura", "Heavyweight", 7),
        createFighter("Serghei Spivac", "https://www.ufc.com/athlete/serghei-spivac", "Heavyweight", 8),
        createFighter("Derrick Lewis", "https://www.ufc.com/athlete/derrick-lewis", "Heavyweight", 9),
        createFighter("Tai Tuivasa", "https://www.ufc.com/athlete/tai-tuivasa", "Heavyweight", 10),
        createFighter("Shamil Gaziev", "https://www.ufc.com/athlete/shamil-gaziev", "Heavyweight", 11),
        createFighter("Mick Parkin", "https://www.ufc.com/athlete/mick-parkin", "Heavyweight", 12),
        createFighter("Martin Buday", "https://www.ufc.com/athlete/martin-buday", "Heavyweight", 13, false, "Rank increased by 1"),
        createFighter("Tallison Teixeira", "https://www.ufc.com/athlete/tallison-teixeira", "Heavyweight", 14, false, "Rank decreased by 1"),
        createFighter("Rizvan Kuniev", "https://www.ufc.com/athlete/rizvan-kuniev", "Heavyweight", 15)
      ]
    },
    "Women's Strawweight": {
      name: "Women's Strawweight",
      champion: createFighter(
        "Zhang Weili",
        "https://www.ufc.com/athlete/weili-zhang",
        "Women's Strawweight",
        0,
        true,
        undefined,
        "https://ufc.com/images/styles/athlete_profile_listing_medium_1x/s3/2025-02/ZHANG_WEILI_BELT_02-08.png?itok=A7eNSzVQ"
      ),
      fighters: [
        createFighter("Virna Jandiroba", "https://www.ufc.com/athlete/virna-jandiroba", "Women's Strawweight", 1),
        createFighter("Tatiana Suarez", "https://www.ufc.com/athlete/tatiana-suarez", "Women's Strawweight", 2),
        createFighter("Yan Xiaonan", "https://www.ufc.com/athlete/xiaonan-yan", "Women's Strawweight", 3),
        createFighter("Amanda Lemos", "https://www.ufc.com/athlete/amanda-lemos", "Women's Strawweight", 4),
        createFighter("Jéssica Andrade", "https://www.ufc.com/athlete/jessica-andrade", "Women's Strawweight", 5),
        createFighter("Mackenzie Dern", "https://www.ufc.com/athlete/mackenzie-dern", "Women's Strawweight", 6),
        createFighter("Amanda Ribas", "https://www.ufc.com/athlete/amanda-ribas", "Women's Strawweight", 7),
        createFighter("Iasmin Lucindo", "https://www.ufc.com/athlete/iasmin-lucindo", "Women's Strawweight", 8),
        createFighter("Gillian Robertson", "https://www.ufc.com/athlete/gillian-robertson", "Women's Strawweight", 9),
        createFighter("Tabatha Ricci", "https://www.ufc.com/athlete/tabatha-ricci", "Women's Strawweight", 10),
        createFighter("Loopy Godinez", "https://www.ufc.com/athlete/loopy-godinez", "Women's Strawweight", 11),
        createFighter("Angela Hill", "https://www.ufc.com/athlete/angela-hill", "Women's Strawweight", 12),
        createFighter("Tecia Pennington", "https://www.ufc.com/athlete/tecia-pennington", "Women's Strawweight", 13),
        createFighter("Loma Lookboonmee", "https://www.ufc.com/athlete/loma-lookboonmee", "Women's Strawweight", 14),
        createFighter("Denise Gomes", "https://www.ufc.com/athlete/denise-gomes", "Women's Strawweight", 15)
      ]
    },
    "Women's Flyweight": {
      name: "Women's Flyweight",
      champion: createFighter(
        "Valentina Shevchenko",
        "https://www.ufc.com/athlete/valentina-shevchenko",
        "Women's Flyweight",
        0,
        true,
        undefined,
        "https://ufc.com/images/styles/athlete_profile_listing_medium_1x/s3/2025-05/SHEVCHENKO_VALENTINA_BELT_05-10.png?itok=ma9YeL_i"
      ),
      fighters: [
        createFighter("Natalia Silva", "https://www.ufc.com/athlete/natalia-silva", "Women's Flyweight", 1),
        createFighter("Manon Fiorot", "https://www.ufc.com/athlete/manon-fiorot", "Women's Flyweight", 2),
        createFighter("Alexa Grasso", "https://www.ufc.com/athlete/alexa-grasso", "Women's Flyweight", 3),
        createFighter("Erin Blanchfield", "https://www.ufc.com/athlete/erin-blanchfield", "Women's Flyweight", 4),
        createFighter("Jasmine Jasudavicius", "https://www.ufc.com/athlete/jasmine-jasudavicius", "Women's Flyweight", 5),
        createFighter("Maycee Barber", "https://www.ufc.com/athlete/maycee-barber", "Women's Flyweight", 6),
        createFighter("Rose Namajunas", "https://www.ufc.com/athlete/rose-namajunas", "Women's Flyweight", 7),
        createFighter("Tracy Cortez", "https://www.ufc.com/athlete/tracy-cortez", "Women's Flyweight", 8),
        createFighter("Jéssica Andrade", "https://www.ufc.com/athlete/jessica-andrade", "Women's Flyweight", 9),
        createFighter("Miranda Maverick", "https://www.ufc.com/athlete/miranda-maverick", "Women's Flyweight", 10, false, "Rank increased by 1"),
        createFighter("Karine Silva", "https://www.ufc.com/athlete/karine-silva", "Women's Flyweight", 11, false, "Rank increased by 1"),
        createFighter("Casey O'Neill", "https://www.ufc.com/athlete/casey-oneill", "Women's Flyweight", 12, false, "Rank increased by 1"),
        createFighter("Wang Cong", "https://www.ufc.com/athlete/wang-cong", "Women's Flyweight", 13, false, "Rank increased by 1"),
        createFighter("JJ Aldrich", "https://www.ufc.com/athlete/jj-aldrich", "Women's Flyweight", 14, false, "Rank increased by 1"),
        createFighter("Eduarda Moura", "https://www.ufc.com/athlete/eduarda-moura", "Women's Flyweight", 15, false, "NR")
      ]
    },
    "Women's Bantamweight": {
      name: "Women's Bantamweight",
      champion: createFighter(
        "Kayla Harrison",
        "https://www.ufc.com/athlete/kayla-harrison",
        "Women's Bantamweight",
        0,
        true,
        undefined,
        "https://ufc.com/images/styles/athlete_profile_listing_medium_1x/s3/2025-06/HARRISON_KAYLA_BELTMOCK.png?itok=zpDHy_Ou"
      ),
      fighters: [
        createFighter("Julianna Peña", "https://www.ufc.com/athlete/julianna-pena", "Women's Bantamweight", 1),
        createFighter("Raquel Pennington", "https://www.ufc.com/athlete/raquel-pennington", "Women's Bantamweight", 2),
        createFighter("Ketlen Vieira", "https://www.ufc.com/athlete/ketlen-vieira", "Women's Bantamweight", 3),
        createFighter("Norma Dumont", "https://www.ufc.com/athlete/norma-dumont", "Women's Bantamweight", 4),
        createFighter("Macy Chiasson", "https://www.ufc.com/athlete/macy-chiasson", "Women's Bantamweight", 5),
        createFighter("Irene Aldana", "https://www.ufc.com/athlete/irene-aldana", "Women's Bantamweight", 6),
        createFighter("Ailin Perez", "https://www.ufc.com/athlete/ailin-perez", "Women's Bantamweight", 7),
        createFighter("Mayra Bueno Silva", "https://www.ufc.com/athlete/mayra-bueno-silva", "Women's Bantamweight", 8),
        createFighter("Yana Santos", "https://www.ufc.com/athlete/yana-santos", "Women's Bantamweight", 9),
        createFighter("Karol Rosa", "https://www.ufc.com/athlete/karol-rosa", "Women's Bantamweight", 10),
        createFighter("Jacqueline Cavalcanti", "https://www.ufc.com/athlete/jacqueline-cavalcanti", "Women's Bantamweight", 11),
        createFighter("Nora Cornolle", "https://www.ufc.com/athlete/nora-cornolle", "Women's Bantamweight", 12),
        createFighter("Miesha Tate", "https://www.ufc.com/athlete/miesha-tate", "Women's Bantamweight", 13),
        createFighter("Joselyne Edwards", "https://www.ufc.com/athlete/joselyne-edwards", "Women's Bantamweight", 14),
        createFighter("Daria Zhelezniakova", "https://www.ufc.com/athlete/daria-zheleznyakova", "Women's Bantamweight", 15)
      ]
    }
  },
  pound4pound: {
    mens: [
      createFighter("Ilia Topuria", "https://www.ufc.com/athlete/ilia-topuria", "Men's Pound-for-Pound", 1),
      createFighter("Islam Makhachev", "https://www.ufc.com/athlete/islam-makhachev", "Men's Pound-for-Pound", 2),
      createFighter("Merab Dvalishvili", "https://www.ufc.com/athlete/merab-dvalishvili", "Men's Pound-for-Pound", 3),
      createFighter("Alexandre Pantoja", "https://www.ufc.com/athlete/alexandre-pantoja", "Men's Pound-for-Pound", 4, false, "Rank increased by 1"),
      createFighter("Dricus Du Plessis", "https://www.ufc.com/athlete/dricus-du-plessis", "Men's Pound-for-Pound", 4),
      createFighter("Alexander Volkanovski", "https://www.ufc.com/athlete/alexander-volkanovski", "Men's Pound-for-Pound", 6),
      createFighter("Magomed Ankalaev", "https://www.ufc.com/athlete/magomed-ankalaev", "Men's Pound-for-Pound", 7),
      createFighter("Jack Della Maddalena", "https://www.ufc.com/athlete/jack-della-maddalena", "Men's Pound-for-Pound", 8),
      createFighter("Tom Aspinall", "https://www.ufc.com/athlete/tom-aspinall", "Men's Pound-for-Pound", 9),
      createFighter("Alex Pereira", "https://www.ufc.com/athlete/alex-pereira", "Men's Pound-for-Pound", 10),
      createFighter("Max Holloway", "https://www.ufc.com/athlete/max-holloway", "Men's Pound-for-Pound", 11),
      createFighter("Belal Muhammad", "https://www.ufc.com/athlete/belal-muhammad", "Men's Pound-for-Pound", 12),
      createFighter("Arman Tsarukyan", "https://www.ufc.com/athlete/arman-tsarukyan", "Men's Pound-for-Pound", 13),
      createFighter("Khamzat Chimaev", "https://www.ufc.com/athlete/khamzat-chimaev", "Men's Pound-for-Pound", 14),
      createFighter("Charles Oliveira", "https://www.ufc.com/athlete/charles-oliveira", "Men's Pound-for-Pound", 15)
    ],
    womens: [
      createFighter("Valentina Shevchenko", "https://www.ufc.com/athlete/valentina-shevchenko", "Women's Pound-for-Pound", 1),
      createFighter("Zhang Weili", "https://www.ufc.com/athlete/weili-zhang", "Women's Pound-for-Pound", 2),
      createFighter("Kayla Harrison", "https://www.ufc.com/athlete/kayla-harrison", "Women's Pound-for-Pound", 3),
      createFighter("Manon Fiorot", "https://www.ufc.com/athlete/manon-fiorot", "Women's Pound-for-Pound", 4),
      createFighter("Julianna Peña", "https://www.ufc.com/athlete/julianna-pena", "Women's Pound-for-Pound", 5),
      createFighter("Natalia Silva", "https://www.ufc.com/athlete/natalia-silva", "Women's Pound-for-Pound", 6),
      createFighter("Alexa Grasso", "https://www.ufc.com/athlete/alexa-grasso", "Women's Pound-for-Pound", 7),
      createFighter("Erin Blanchfield", "https://www.ufc.com/athlete/erin-blanchfield", "Women's Pound-for-Pound", 8),
      createFighter("Virna Jandiroba", "https://www.ufc.com/athlete/virna-jandiroba", "Women's Pound-for-Pound", 9),
      createFighter("Raquel Pennington", "https://www.ufc.com/athlete/raquel-pennington", "Women's Pound-for-Pound", 10),
      createFighter("Tatiana Suarez", "https://www.ufc.com/athlete/tatiana-suarez", "Women's Pound-for-Pound", 11),
      createFighter("Rose Namajunas", "https://www.ufc.com/athlete/rose-namajunas", "Women's Pound-for-Pound", 12),
      createFighter("Yan Xiaonan", "https://www.ufc.com/athlete/xiaonan-yan", "Women's Pound-for-Pound", 13),
      createFighter("Amanda Lemos", "https://www.ufc.com/athlete/amanda-lemos", "Women's Pound-for-Pound", 14),
      createFighter("Maycee Barber", "https://www.ufc.com/athlete/maycee-barber", "Women's Pound-for-Pound", 15)
    ]
  }
};

// =====================================================================
// Helper Functions for Working with the Database
// =====================================================================

/**
 * Gets all fighters from the database
 */
export function getAllFighters(): RankedFighter[] {
  const allFighters: RankedFighter[] = [
    ...ufcFightersDb.pound4pound.mens,
    ...ufcFightersDb.pound4pound.womens
  ];
  
  // Add champions and ranked fighters from each division
  Object.values(ufcFightersDb.divisions).forEach(division => {
    if (division.champion) {
      allFighters.push(division.champion);
    }
    allFighters.push(...division.fighters);
  });
  
  return allFighters;
}

/**
 * Gets fighters by division
 */
export function getFightersByDivision(division: string): RankedFighter[] {
  // Handle pound-for-pound divisions
  if (division === "Men's Pound-for-Pound") {
    return ufcFightersDb.pound4pound.mens;
  }
  if (division === "Women's Pound-for-Pound") {
    return ufcFightersDb.pound4pound.womens;
  }
  
  // Handle weight divisions
  const divisionData = ufcFightersDb.divisions[division];
  if (!divisionData) return [];
  
  const fighters = [...divisionData.fighters];
  if (divisionData.champion) {
    fighters.unshift(divisionData.champion);
  }
  
  return fighters;
}

/**
 * Gets a fighter by ID
 */
export function getFighterById(id: string): RankedFighter | undefined {
  return getAllFighters().find(fighter => fighter.id === id);
}

/**
 * Gets a fighter by name (case insensitive)
 */
export function getFighterByName(name: string): RankedFighter | undefined {
  return getAllFighters().find(
    fighter => fighter.name.toLowerCase() === name.toLowerCase()
  );
}

/**
 * Gets all available divisions
 */
export function getAllDivisions(): string[] {
  return [
    "Men's Pound-for-Pound",
    "Women's Pound-for-Pound",
    ...Object.keys(ufcFightersDb.divisions)
  ];
}

/**
 * Gets all champions
 */
export function getAllChampions(): RankedFighter[] {
  return Object.values(ufcFightersDb.divisions)
    .map(division => division.champion)
    .filter((champion): champion is RankedFighter => !!champion);
}

/**
 * Searches fighters by name
 */
export function searchFighters(query: string): RankedFighter[] {
  const lowerQuery = query.toLowerCase();
  return getAllFighters().filter(fighter => 
    fighter.name.toLowerCase().includes(lowerQuery) ||
    fighter.firstName?.toLowerCase().includes(lowerQuery) ||
    fighter.lastName?.toLowerCase().includes(lowerQuery) ||
    fighter.nickname?.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Default export for the module
 */
export default {
  rankings: ufcFightersDb,
  getAllFighters,
  getFightersByDivision,
  getFighterById,
  getFighterByName,
  getAllDivisions,
  getAllChampions,
  searchFighters,
  lastUpdated: ufcFightersDb.lastUpdated
};
