// UFC Weight Divisions
export const UFC_WEIGHT_DIVISIONS = [
    {
        id: "heavyweight",
        name: "Heavyweight",
        weightLimit: "265 lbs (120.2 kg)",
        description: "The UFC Heavyweight division is home to the most powerful fighters in the promotion. These athletes can weigh up to 265 pounds and are known for their devastating knockout power."
    },
    {
        id: "light-heavyweight",
        name: "Light Heavyweight",
        weightLimit: "205 lbs (93.0 kg)",
        description: "The Light Heavyweight division features a blend of power and athleticism. Fighters in this division weigh up to 205 pounds and often showcase a mix of striking and grappling skills."
    },
    {
        id: "middleweight",
        name: "Middleweight",
        weightLimit: "185 lbs (83.9 kg)",
        description: "The Middleweight division is known for its well-rounded fighters. At 185 pounds, these athletes typically display a balanced combination of striking power, speed, and technical grappling."
    },
    {
        id: "welterweight",
        name: "Welterweight",
        weightLimit: "170 lbs (77.1 kg)",
        description: "The UFC welterweight division is for fighters who weigh between 156-170 pounds (70.8-77.1 kg)."
    },
    {
        id: "lightweight",
        name: "Lightweight",
        weightLimit: "155 lbs (70.3 kg)",
        description: "The UFC lightweight division is for fighters who weigh between 146-155 pounds (66.2-70.3 kg)."
    },
    {
        id: "featherweight",
        name: "Featherweight",
        weightLimit: "145 lbs (65.8 kg)",
        description: "The UFC featherweight division is for fighters who weigh between 136-145 pounds (61.7-65.8 kg)."
    },
    {
        id: "bantamweight",
        name: "Bantamweight",
        weightLimit: "135 lbs (61.2 kg)",
        description: "The UFC bantamweight division is for fighters who weigh between 126-135 pounds (57.2-61.2 kg)."
    },
    {
        id: "flyweight",
        name: "Flyweight",
        weightLimit: "125 lbs (56.7 kg)",
        description: "The UFC flyweight division is for fighters who weigh between 116-125 pounds (52.6-56.7 kg)."
    },
    {
        id: "womens-featherweight",
        name: "Women's Featherweight",
        weightLimit: "145 lbs (65.8 kg)",
        description: "The UFC women's featherweight division is for fighters who weigh between 136-145 pounds (61.7-65.8 kg)."
    },
    {
        id: "womens-bantamweight",
        name: "Women's Bantamweight",
        weightLimit: "135 lbs (61.2 kg)",
        description: "The UFC women's bantamweight division is for fighters who weigh between 126-135 pounds (57.2-61.2 kg)."
    },
    {
        id: "womens-flyweight",
        name: "Women's Flyweight",
        weightLimit: "125 lbs (56.7 kg)",
        description: "The UFC women's flyweight division is for fighters who weigh between 116-125 pounds (52.6-56.7 kg)."
    },
    {
        id: "womens-strawweight",
        name: "Women's Strawweight",
        weightLimit: "115 lbs (52.2 kg)",
        description: "The UFC women's strawweight division is for fighters who weigh up to 115 pounds (52.2 kg)."
    }
];

// Mock UFC Events
export const UPCOMING_UFC_EVENTS = [
    {
        id: "ufc-300",
        name: "UFC 300",
        date: "2024-04-13T22:00:00Z",
        venue: "T-Mobile Arena",
        location: "Las Vegas, Nevada",
        image: "https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/image/ufc-fight-night/2023-12/PEREIRA_ALEX_BELT_11_11_VS_HILL_JAMAHAL_BELT_01_21.png?itok=Iy5r8To0",
        isPPV: true,
        mainCard: [
            {
                id: "ufc-300-main",
                fighter1: {
                    name: "Alex Pereira",
                    country: "Brazil"
                },
                fighter2: {
                    name: "Jamahal Hill",
                    country: "United States"
                },
                isTitleFight: true,
                weightClass: "Light Heavyweight"
            },
            {
                id: "ufc-300-co-main",
                fighter1: {
                    name: "Zhang Weili",
                    country: "China"
                },
                fighter2: {
                    name: "Yan Xiaonan",
                    country: "China"
                },
                isTitleFight: true,
                weightClass: "Women's Strawweight"
            },
            {
                id: "ufc-300-3",
                fighter1: {
                    name: "Max Holloway",
                    country: "United States"
                },
                fighter2: {
                    name: "Justin Gaethje",
                    country: "United States"
                },
                isTitleFight: true,
                weightClass: "BMF Title"
            },
            {
                id: "ufc-300-4",
                fighter1: {
                    name: "Charles Oliveira",
                    country: "Brazil"
                },
                fighter2: {
                    name: "Arman Tsarukyan",
                    country: "Armenia"
                },
                isTitleFight: false,
                weightClass: "Lightweight"
            },
            {
                id: "ufc-300-5",
                fighter1: {
                    name: "Bo Nickal",
                    country: "United States"
                },
                fighter2: {
                    name: "Cody Brundage",
                    country: "United States"
                },
                isTitleFight: false,
                weightClass: "Middleweight"
            }
        ]
    },
    {
        id: "ufc-fight-night-vegas",
        name: "UFC Fight Night",
        date: "2024-04-27T22:00:00Z",
        venue: "UFC APEX",
        location: "Las Vegas, Nevada",
        image: "https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/image/ufc-fight-night/2023-12/ALLEN_BRENDAN_06_10_VS_CURTIS_CHRIS_04_15.png?itok=Iy5r8To0",
        isPPV: false,
        mainCard: [
            {
                id: "ufc-fn-main",
                fighter1: {
                    name: "Brendan Allen",
                    country: "United States"
                },
                fighter2: {
                    name: "Chris Curtis",
                    country: "United States"
                },
                isTitleFight: false,
                weightClass: "Middleweight"
            },
            {
                id: "ufc-fn-2",
                fighter1: {
                    name: "Alexander Hernandez",
                    country: "United States"
                },
                fighter2: {
                    name: "Damon Jackson",
                    country: "United States"
                },
                isTitleFight: false,
                weightClass: "Lightweight"
            },
            {
                id: "ufc-fn-3",
                fighter1: {
                    name: "Edmen Shahbazyan",
                    country: "United States"
                },
                fighter2: {
                    name: "Gerald Meerschaert",
                    country: "United States"
                },
                isTitleFight: false,
                weightClass: "Middleweight"
            }
        ]
    },
    {
        id: "ufc-301",
        name: "UFC 301",
        date: "2024-05-04T22:00:00Z",
        venue: "Farmasi Arena",
        location: "Rio de Janeiro, Brazil",
        image: "https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/image/ufc-fight-night/2023-12/PANTOJA_ALEXANDRE_BELT_07_08_VS_ERCEG_STEVE_09_16.png?itok=Iy5r8To0",
        isPPV: true,
        mainCard: [
            {
                id: "ufc-301-main",
                fighter1: {
                    name: "Alexandre Pantoja",
                    country: "Brazil"
                },
                fighter2: {
                    name: "Steve Erceg",
                    country: "Australia"
                },
                isTitleFight: true,
                weightClass: "Flyweight"
            },
            {
                id: "ufc-301-2",
                fighter1: {
                    name: "José Aldo",
                    country: "Brazil"
                },
                fighter2: {
                    name: "Jonathan Martinez",
                    country: "United States"
                },
                isTitleFight: false,
                weightClass: "Bantamweight"
            },
            {
                id: "ufc-301-3",
                fighter1: {
                    name: "Michel Pereira",
                    country: "Brazil"
                },
                fighter2: {
                    name: "Ihor Potieria",
                    country: "Ukraine"
                },
                isTitleFight: false,
                weightClass: "Light Heavyweight"
            }
        ]
    }
];

// Mock UFC Champions
export const UFC_CHAMPIONS = [
    {
        division: "Heavyweight",
        name: "Jon Jones",
        country: "United States",
        record: "27-1-0",
        defenses: 0
    },
    {
        division: "Light Heavyweight",
        name: "Alex Pereira",
        country: "Brazil",
        record: "9-2-0",
        defenses: 1
    },
    {
        division: "Middleweight",
        name: "Dricus Du Plessis",
        country: "South Africa",
        record: "21-2-0",
        defenses: 0
    },
    {
        division: "Welterweight",
        name: "Leon Edwards",
        country: "United Kingdom",
        record: "21-3-0",
        defenses: 2
    },
    {
        division: "Lightweight",
        name: "Islam Makhachev",
        country: "Russia",
        record: "25-1-0",
        defenses: 2
    },
    {
        division: "Featherweight",
        name: "Ilia Topuria",
        country: "Spain",
        record: "15-0-0",
        defenses: 0
    },
    {
        division: "Bantamweight",
        name: "Sean O'Malley",
        country: "United States",
        record: "17-1-0",
        defenses: 1
    },
    {
        division: "Flyweight",
        name: "Alexandre Pantoja",
        country: "Brazil",
        record: "27-5-0",
        defenses: 2
    },
    {
        division: "Women's Bantamweight",
        name: "Raquel Pennington",
        country: "United States",
        record: "15-8-0",
        defenses: 0
    },
    {
        division: "Women's Flyweight",
        name: "Alexa Grasso",
        country: "Mexico",
        record: "16-3-1",
        defenses: 0
    },
    {
        division: "Women's Strawweight",
        name: "Zhang Weili",
        country: "China",
        record: "24-3-0",
        defenses: 2
    }
];
