import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { 
  getAllDivisions, 
  getFightersByDivision, 
  RankedFighter 
} from "@/lib/ufc-fighters";
import ModernRankingsTable from "@/components/rankings/modern-rankings-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight, Home, Trophy, Users, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

// Generate metadata for the page
export async function generateMetadata(
  { params }: { params: { division: string } }
): Promise<Metadata> {
  // Decode the division parameter from the URL
  const division = decodeURIComponent(params.division);
  
  // Format division for title display
  const formattedDivision = division
    .replace(/-/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
  
  return {
    title: `${formattedDivision} Rankings | UFC Rankings`,
    description: `View the official UFC ${formattedDivision} rankings. See the champion, contenders, and top 15 ranked fighters in the ${formattedDivision} division.`,
    keywords: `UFC ${formattedDivision}, ${formattedDivision} rankings, UFC fighters, MMA rankings, UFC ${formattedDivision} champion`,
    openGraph: {
      title: `${formattedDivision} Rankings | UFC Rankings`,
      description: `View the official UFC ${formattedDivision} rankings. See the champion, contenders, and top 15 ranked fighters in the ${formattedDivision} division.`,
      images: [
        {
          url: "/images/thumbnail.png",
          width: 1200,
          height: 630,
          alt: `UFC ${formattedDivision} Rankings`,
        },
      ],
    },
  };
}

// Generate static paths for all divisions
export async function generateStaticParams() {
  const divisions = await getAllDivisions();
  
  return divisions.map(division => ({
    division: division.toLowerCase().replace(/\s+/g, '-'),
  }));
}

// Loading component for the rankings table
function RankingsTableSkeleton() {
  return (
    <Card className="border border-red-500/20 bg-black/80">
      <CardHeader className="border-b border-red-500/20 bg-gradient-to-r from-red-950/40 to-black/90">
        <Skeleton className="h-8 w-40 bg-red-950/30" />
      </CardHeader>
      <CardContent className="p-0">
        <div className="p-4">
          <Skeleton className="h-24 w-full bg-red-950/20 mb-4" />
        </div>
        <div className="space-y-2 p-4">
          {Array(10).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full bg-red-950/20" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Error component for invalid divisions
function InvalidDivision({ availableDivisions }: { availableDivisions: string[] }) {
  return (
    <Card className="border border-red-500/30 bg-black/80 backdrop-blur-sm">
      <CardHeader className="border-b border-red-500/20 bg-gradient-to-r from-red-950/40 to-black/90">
        <CardTitle className="text-xl md:text-2xl text-white flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2 text-red-500" /> Invalid Division
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="text-center">
          <p className="text-gray-300 mb-6">
            The requested division was not found. Please select from one of the available divisions:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-w-2xl mx-auto mb-6">
            {availableDivisions.map((div) => (
              <Link 
                key={div} 
                href={`/rankings/${div.toLowerCase().replace(/\s+/g, '-')}`}
                className="px-3 py-2 bg-red-950/30 hover:bg-red-900/40 text-white rounded-md transition-colors text-center"
              >
                {div}
              </Link>
            ))}
          </div>
          <Button asChild variant="outline" className="border-red-500/50 text-red-400 hover:text-red-300 hover:bg-red-950/30">
            <Link href="/rankings">
              Back to All Rankings
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Main page component
export default async function DivisionRankingsPage({ 
  params 
}: { 
  params: { division: string } 
}) {
  // Decode the division parameter from the URL
  const divisionParam = decodeURIComponent(params.division);
  
  // Format division for display (replace hyphens with spaces and capitalize)
  const formattedDivision = divisionParam
    .replace(/-/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
  
  // Get all available divisions for validation and error handling
  const availableDivisions = await getAllDivisions();
  
  // Check if this is a valid division
  const isValidDivision = availableDivisions.some(
    div => div.toLowerCase() === formattedDivision.toLowerCase()
  );
  
  // Find the exact division name with correct casing
  const exactDivision = isValidDivision 
    ? availableDivisions.find(
        div => div.toLowerCase() === formattedDivision.toLowerCase()
      )
    : null;
  
  // If division is not valid, show error component
  if (!isValidDivision || !exactDivision) {
    return (
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center text-sm text-gray-400 mb-6">
          <Link href="/" className="flex items-center hover:text-white transition-colors">
            <Home className="w-4 h-4 mr-1" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link href="/rankings" className="hover:text-white transition-colors">
            Rankings
          </Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-red-400">Invalid Division</span>
        </nav>
        
        <InvalidDivision availableDivisions={availableDivisions} />
      </main>
    );
  }
  
  // Get fighters for this division (for champion info)
  const fighters = await getFightersByDivision(exactDivision);
  const champion = fighters.find(f => f.isChampion);
  
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm text-gray-400 mb-6">
        <Link href="/" className="flex items-center hover:text-white transition-colors">
          <Home className="w-4 h-4 mr-1" />
          <span>Home</span>
        </Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <Link href="/rankings" className="hover:text-white transition-colors">
          Rankings
        </Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-red-400">{exactDivision}</span>
      </nav>
      
      {/* Division Info Card */}
      <Card className="border border-red-500/30 bg-black/80 backdrop-blur-sm mb-8">
        <CardHeader className="border-b border-red-500/20 bg-gradient-to-r from-red-950/40 to-black/90">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle className="text-2xl md:text-3xl text-white flex items-center">
              <Trophy className="w-6 h-6 mr-2 text-red-500" /> 
              {exactDivision} Division
            </CardTitle>
            
            <div className="flex items-center space-x-2">
              <div className="flex items-center bg-red-950/30 px-3 py-1.5 rounded-md text-sm text-gray-200">
                <Users className="w-4 h-4 mr-2 text-red-400" />
                <span>{fighters.length} Ranked Fighters</span>
              </div>
              
              {champion && (
                <div className="flex items-center bg-yellow-950/30 px-3 py-1.5 rounded-md text-sm text-yellow-200">
                  <Trophy className="w-4 h-4 mr-2 text-yellow-500" />
                  <span>Champion: {champion.name}</span>
                </div>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>
      
      {/* Rankings Table */}
      <Suspense fallback={<RankingsTableSkeleton />}>
        <ModernRankingsTable division={exactDivision} />
      </Suspense>
      
      {/* Navigation Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
        <Button asChild variant="outline" className="border-red-500/50 text-red-400 hover:text-red-300 hover:bg-red-950/30">
          <Link href="/rankings">
            Back to All Rankings
          </Link>
        </Button>
        
        <Button asChild className="bg-gradient-to-r from-red-700 to-red-900 hover:from-red-600 hover:to-red-800">
          <Link href={`/fighters?division=${encodeURIComponent(exactDivision)}`}>
            View All {exactDivision} Fighters
          </Link>
        </Button>
      </div>
    </main>
  );
}
