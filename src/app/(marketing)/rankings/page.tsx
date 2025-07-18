import { Metadata } from "next";
import { Suspense } from "react";
import DivisionSelector from "@/components/rankings/division-selector";
import ModernRankingsTable from "@/components/rankings/modern-rankings-table";
import ModernFighterGrid from "@/components/fighters/modern-fighter-grid";
import { fetchAvailableDivisions } from "@/lib/ufc-fighters";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Trophy, Users, Medal, Search, Grid3X3, List } from "lucide-react";

export const metadata: Metadata = {
  title: "UFC Rankings | Official Fighter Rankings",
  description: "View the official UFC rankings by division. See the latest rankings for all UFC weight classes and pound-for-pound lists.",
  keywords: "UFC rankings, UFC fighters, MMA rankings, UFC pound-for-pound, UFC champions",
  openGraph: {
    title: "UFC Rankings | Official Fighter Rankings",
    description: "View the official UFC rankings by division. See the latest rankings for all UFC weight classes and pound-for-pound lists.",
    images: [
      {
        url: "/images/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "UFC Rankings",
      },
    ],
  },
};

// Loading component for divisions
function DivisionSelectorSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array(8).fill(0).map((_, i) => (
        <Card key={i} className="border border-red-500/30 bg-black/70">
          <CardHeader className="pb-2">
            <Skeleton className="h-6 w-24 bg-red-950/20" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-4">
              <Skeleton className="h-16 w-16 rounded-full mr-3 bg-red-950/20" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-20 bg-red-950/20" />
                <Skeleton className="h-5 w-32 bg-red-950/20" />
              </div>
            </div>
            <Skeleton className="h-9 w-full bg-red-950/20" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default async function RankingsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Get the division from URL parameters or default to undefined
  const divisionParam = searchParams.division as string | undefined;
  const viewParam = searchParams.view as string | undefined;

  // Fetch available divisions for the metadata
  const divisions = await fetchAvailableDivisions();
  
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="relative mb-12 overflow-hidden rounded-xl border border-red-500/30 bg-black/80 backdrop-blur-lg p-6 md:p-10">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/40 to-black/90 z-0" />
        <div className="absolute inset-0 bg-[url('/images/ufc/ufc-octagon.svg')] bg-no-repeat bg-center bg-contain opacity-5 z-0" />
        
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 flex items-center">
            <Trophy className="w-8 h-8 md:w-10 md:h-10 text-red-500 mr-3" />
            UFC Rankings
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mb-6">
            Explore the official UFC rankings across all weight divisions. View champions, contenders, and pound-for-pound lists updated directly from UFC.com.
          </p>
          
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center bg-red-950/30 px-3 py-2 rounded-md text-sm text-gray-200">
              <Medal className="w-4 h-4 mr-2 text-yellow-500" />
              <span>{divisions.length} Weight Divisions</span>
            </div>
            <div className="flex items-center bg-red-950/30 px-3 py-2 rounded-md text-sm text-gray-200">
              <Trophy className="w-4 h-4 mr-2 text-yellow-500" />
              <span>Current Champions</span>
            </div>
            <div className="flex items-center bg-red-950/30 px-3 py-2 rounded-md text-sm text-gray-200">
              <Users className="w-4 h-4 mr-2 text-red-400" />
              <span>Top 15 Rankings</span>
            </div>
            <div className="flex items-center bg-red-950/30 px-3 py-2 rounded-md text-sm text-gray-200">
              <Search className="w-4 h-4 mr-2 text-blue-400" />
              <span>Search & Filter</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs for different views */}
      <Tabs defaultValue={divisionParam ? "rankings" : "divisions"} className="mb-8">
        <TabsList className="grid grid-cols-3 mb-8 bg-black/50 border border-red-500/30">
          <TabsTrigger value="divisions" className="data-[state=active]:bg-red-950/50">
            <Medal className="w-4 h-4 mr-2" />
            Divisions
          </TabsTrigger>
          <TabsTrigger value="rankings" className="data-[state=active]:bg-red-950/50">
            <List className="w-4 h-4 mr-2" />
            Rankings
          </TabsTrigger>
          <TabsTrigger value="grid" className="data-[state=active]:bg-red-950/50">
            <Grid3X3 className="w-4 h-4 mr-2" />
            Fighter Grid
          </TabsTrigger>
        </TabsList>

        {/* Divisions View */}
        <TabsContent value="divisions" className="mt-0">
          <Card className="border border-red-500/20 bg-black/80 backdrop-blur-sm">
            <CardHeader className="border-b border-red-500/20 bg-gradient-to-r from-red-950/40 to-black/90">
              <CardTitle className="text-xl md:text-2xl text-white flex items-center">
                <Medal className="w-5 h-5 mr-2 text-red-500" /> UFC Weight Divisions
              </CardTitle>
              <CardDescription className="text-gray-400">
                Select a division to view its rankings and fighters
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <Suspense fallback={<DivisionSelectorSkeleton />}>
                <DivisionSelector />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Rankings Table View */}
        <TabsContent value="rankings" className="mt-0">
          {divisionParam ? (
            <Suspense fallback={
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
            }>
              <ModernRankingsTable division={divisionParam} />
            </Suspense>
          ) : (
            <div className="text-center p-10 border border-red-500/20 rounded-lg bg-black/80">
              <h3 className="text-xl text-white mb-4">Select a Division</h3>
              <p className="text-gray-400 mb-6">
                Please select a weight division to view its rankings
              </p>
              <Suspense fallback={<DivisionSelectorSkeleton />}>
                <DivisionSelector />
              </Suspense>
            </div>
          )}
        </TabsContent>

        {/* Fighter Grid View */}
        <TabsContent value="grid" className="mt-0">
          <Card className="border border-red-500/20 bg-black/80 backdrop-blur-sm">
            <CardHeader className="border-b border-red-500/20 bg-gradient-to-r from-red-950/40 to-black/90">
              <CardTitle className="text-xl md:text-2xl text-white flex items-center">
                <Users className="w-5 h-5 mr-2 text-red-500" /> 
                {divisionParam ? `${divisionParam} Fighters` : "All UFC Fighters"}
              </CardTitle>
              <CardDescription className="text-gray-400">
                Search and filter UFC fighters by name, division, or ranking
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <Suspense fallback={
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {Array(12).fill(0).map((_, i) => (
                    <Card key={i} className="overflow-hidden border border-red-500/30 bg-black/70 h-[400px]">
                      <div className="h-48 bg-red-950/20" />
                      <div className="p-4">
                        <Skeleton className="h-6 w-3/4 mb-2 bg-red-950/20" />
                        <Skeleton className="h-4 w-1/2 mb-4 bg-red-950/20" />
                        <Skeleton className="h-4 w-full mb-2 bg-red-950/20" />
                        <Skeleton className="h-4 w-2/3 mb-6 bg-red-950/20" />
                        <Skeleton className="h-9 w-full bg-red-950/20" />
                      </div>
                    </Card>
                  ))}
                </div>
              }>
                <ModernFighterGrid initialDivision={divisionParam} />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
