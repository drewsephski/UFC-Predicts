import { Particles } from "@/components/ui/particles";
import { Button } from "@/components/ui/button";
import { Dumbbell, Users, Scale, Filter } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import division images
const divisionImages = {
  heavyweight: "https://dmxg5wxfqgb4u.cloudfront.net/2023-09/HEAVYWEIGHT_DIVISION_RANKINGS_09_26_23.png",
  lightHeavyweight: "https://dmxg5wxfqgb4u.cloudfront.net/2023-09/LIGHT_HEAVYWEIGHT_DIVISION_RANKINGS_09_26_23.png",
  middleweight: "https://dmxg5wxfqgb4u.cloudfront.net/2023-09/MIDDLEWEIGHT_DIVISION_RANKINGS_09_26_23.png",
  welterweight: "https://dmxg5wxfqgb4u.cloudfront.net/2023-09/WELTERWEIGHT_DIVISION_RANKINGS_09_26_23.png",
  lightweight: "https://dmxg5wxfqgb4u.cloudfront.net/2023-09/LIGHTWEIGHT_DIVISION_RANKINGS_09_26_23.png",
  featherweight: "https://dmxg5wxfqgb4u.cloudfront.net/2023-09/FEATHERWEIGHT_DIVISION_RANKINGS_09_26_23.png",
  bantamweight: "https://dmxg5wxfqgb4u.cloudfront.net/2023-09/BANTAMWEIGHT_DIVISION_RANKINGS_09_26_23.png",
  flyweight: "https://dmxg5wxfqgb4u.cloudfront.net/2023-09/FLYWEIGHT_DIVISION_RANKINGS_09_26_23.png",
  wFeatherweight: "https://dmxg5wxfqgb4u.cloudfront.net/2023-09/WOMENS_FEATHERWEIGHT_DIVISION_RANKINGS_09_26_23.png",
  wBantamweight: "https://dmxg5wxfqgb4u.cloudfront.net/2023-09/WOMENS_BANTAMWEIGHT_DIVISION_RANKINGS_09_26_23.png",
  wFlyweight: "https://dmxg5wxfqgb4u.cloudfront.net/2023-09/WOMENS_FLYWEIGHT_DIVISION_RANKINGS_09_26_23.png",
  strawweight: "https://dmxg5wxfqgb4u.cloudfront.net/2023-09/STRAWWEIGHT_DIVISION_RANKINGS_09_26_23.png",
};

export const metadata = {
  title: "UFC Weight Divisions | UFC Predict",
  description: "Browse UFC fighters by weight division. Explore all UFC weight classes from Heavyweight to Flyweight and Women's divisions.",
};

const DivisionCard = ({
  image,
  title,
  weight,
  description,
  champion,
  division
}: {
  image: string;
  title: string;
  weight: string;
  description: string;
  champion: string;
  division: string;
}) => (
  <div className="bg-black/30 border border-red-500/20 rounded-lg overflow-hidden group h-full flex flex-col">
    <div className="relative h-48 flex-shrink-0">
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10" />
      <Image
        src={image}
        alt={`UFC ${title} Division`}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority
      />
    </div>
    <div className="p-4 flex flex-col flex-grow">
      <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
      <p className="text-gray-400 text-sm mb-3">{weight}</p>
      <p className="text-gray-300 mb-4 text-sm flex-grow">{description}</p>
      <div className="flex items-center justify-between mt-auto">
        <div>
          <p className="text-xs text-gray-400">Champion</p>
          <p className="text-white font-medium">{champion}</p>
        </div>
        <Button asChild size="sm" className="bg-red-600 hover:bg-red-700 text-white">
          <Link href={`/fighters?division=${division}`}>
            View Fighters
          </Link>
        </Button>
      </div>
    </div>
  </div>
);

export default function DivisionsPage() {
  const mensDivisions = [
    {
      id: 'heavyweight',
      title: 'Heavyweight',
      weight: '265 lbs (120.2 kg)',
      description: 'The heaviest weight class in the UFC, featuring the most powerful fighters in the promotion.',
      champion: 'Jon Jones'
    },
    {
      id: 'lightHeavyweight',
      title: 'Light Heavyweight',
      weight: '205 lbs (93.0 kg)',
      description: 'A division known for explosive knockouts and athletic fighters with significant power.',
      champion: 'Alex Pereira'
    },
    {
      id: 'middleweight',
      title: 'Middleweight',
      weight: '185 lbs (83.9 kg)',
      description: 'A balanced division featuring fighters with a mix of power, speed, and technical skill.',
      champion: 'Dricus Du Plessis'
    },
    {
      id: 'welterweight',
      title: 'Welterweight',
      weight: '170 lbs (77.1 kg)',
      description: 'One of the most competitive divisions with a mix of striking and grappling specialists.',
      champion: 'Leon Edwards'
    },
    {
      id: 'lightweight',
      title: 'Lightweight',
      weight: '155 lbs (70.3 kg)',
      description: 'Often considered the deepest division, featuring fast-paced, technical fighters.',
      champion: 'Islam Makhachev'
    },
    {
      id: 'featherweight',
      title: 'Featherweight',
      weight: '145 lbs (65.8 kg)',
      description: 'A division known for its speed, cardio, and exciting matchups.',
      champion: 'Ilia Topuria'
    },
    {
      id: 'bantamweight',
      title: 'Bantamweight',
      weight: '135 lbs (61.2 kg)',
      description: 'Featuring some of the fastest and most technical strikers in the UFC.',
      champion: 'Sean O\'Malley'
    },
    {
      id: 'flyweight',
      title: 'Flyweight',
      weight: '125 lbs (56.7 kg)',
      description: 'The lightest men\'s division, known for its incredible speed and technical battles.',
      champion: 'Alexandre Pantoja'
    }
  ];

  const womensDivisions = [
    {
      id: 'wFeatherweight',
      title: 'Featherweight',
      weight: '145 lbs (65.8 kg)',
      description: 'The heaviest women\'s division, featuring powerful strikers and grapplers.',
      champion: 'Vacant'
    },
    {
      id: 'wBantamweight',
      title: 'Bantamweight',
      weight: '135 lbs (61.2 kg)',
      description: 'A division with a mix of technical strikers and submission specialists.',
      champion: 'Raquel Pennington'
    },
    {
      id: 'wFlyweight',
      title: 'Flyweight',
      weight: '125 lbs (56.7 kg)',
      description: 'A growing division with well-rounded fighters and exciting matchups.',
      champion: 'Alexa Grasso'
    },
    {
      id: 'strawweight',
      title: 'Strawweight',
      weight: '115 lbs (52.2 kg)',
      description: 'The lightest women\'s division, featuring fast-paced, technical fighters.',
      champion: 'Zhang Weili'
    }
  ];

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-black to-red-950/30">
      <div className="absolute inset-0 z-0">
        <Particles
          className="absolute inset-0 z-0"
          quantity={300}
          color="#ff3333"
          ease={100}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-24">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Fighters", href: "/fighters" },
            { label: "Divisions" }
          ]}
          className="mb-8"
        />

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            UFC Weight <span className="text-red-500">Divisions</span>
          </h1>
          <div className="flex items-center justify-center mb-4">
            <Scale className="h-6 w-6 text-red-500 mr-2" />
            <p className="text-gray-300">Browse fighters by weight class</p>
          </div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            The UFC organizes fighters into specific weight divisions to ensure fair competition.
            Explore all UFC weight classes and discover the top fighters in each division.
          </p>
        </div>

        <Tabs defaultValue="mens" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 max-w-md mx-auto">
            <TabsTrigger value="mens" className="text-lg py-3">Men&apos;s Divisions</TabsTrigger>
            <TabsTrigger value="womens" className="text-lg py-3">Women&apos;s Divisions</TabsTrigger>
          </TabsList>

          <TabsContent value="mens">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {mensDivisions.map((division) => (
                <DivisionCard
                  key={division.id}
                  image={divisionImages[division.id as keyof typeof divisionImages]}
                  title={division.title}
                  weight={division.weight}
                  description={division.description}
                  champion={division.champion}
                  division={division.id}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="womens">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {womensDivisions.map((division) => (
                <DivisionCard
                  key={division.id}
                  image={divisionImages[division.id as keyof typeof divisionImages]}
                  title={`Women&apos;s ${division.title}`}
                  weight={division.weight}
                  description={division.description}
                  champion={division.champion}
                  division={division.id}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}