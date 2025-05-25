import React from 'react';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BarChart3Icon,
  CheckCircle2,
  Clock,
  MessageSquareIcon,
  Share2Icon,
  UsersIcon,
  XCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import { ANALYTICS_DATA, RECENT_SALES } from '@/constants/dashboard';
import { getSafeImageUrl } from '@/lib/utils/images';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';
import { cn } from '@/functions';
import type { ChartConfig } from '@/components/ui/chart';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Container } from '@/components';

const chartConfig = {
    reach: {
        label: "Total Reach",
        color: "hsl(var(--chart-1))",
    },
    engagement: {
        label: "Engagement",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

export default function Page() {
    return (
        <div className="p-4 w-full">
            <div className="flex flex-col w-full">

                {/* Dashboard Cards */}
                <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Container>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
                                <UsersIcon className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">2.4M</div>
                                <p className="text-xs text-muted-foreground">
                                    +20.1% from last month
                                    <ArrowUpIcon className="ml-1 h-4 w-4 text-green-500 inline" />
                                </p>
                            </CardContent>
                        </Card>
                    </Container>
                    <Container delay={0.1}>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
                                <Share2Icon className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">4.3%</div>
                                <p className="text-xs text-muted-foreground">
                                    +1.2% from last month
                                    <ArrowUpIcon className="ml-1 h-4 w-4 text-green-500 inline" />
                                </p>
                            </CardContent>
                        </Card>
                    </Container>
                    <Container delay={0.2}>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
                                <BarChart3Icon className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">12</div>
                                <p className="text-xs text-muted-foreground">
                                    -2 from last month
                                    <ArrowDownIcon className="ml-1 h-4 w-4 text-red-500 inline" />
                                </p>
                            </CardContent>
                        </Card>
                    </Container>
                    <Container delay={0.3}>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
                                <MessageSquareIcon className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">842</div>
                                <p className="text-xs text-muted-foreground">
                                    +48 from last month
                                    <ArrowUpIcon className="ml-1 h-4 w-4 text-green-500 inline" />
                                </p>
                            </CardContent>
                        </Card>
                    </Container>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 mt-8">
                    {/* Chart */}
                    <Container delay={0.2} className="col-span-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Performance Overview</CardTitle>
                            </CardHeader>
                            <CardContent className="py-2 w-full">
                                <ChartContainer config={chartConfig}>
                                    <AreaChart
                                        accessibilityLayer
                                        data={ANALYTICS_DATA}
                                        margin={{
                                            left: 12,
                                            right: 12,
                                        }}
                                    >
                                        <CartesianGrid vertical={false} />
                                        <XAxis
                                            dataKey="name"
                                            tickLine={false}
                                            axisLine={false}
                                            tickMargin={8}
                                            tickFormatter={(value) => value.slice(0, 3)}
                                        />
                                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                                        <defs>
                                            <linearGradient id="fillReach" x1="0" y1="0" x2="0" y2="1">
                                                <stop
                                                    offset="5%"
                                                    stopColor="hsl(var(--chart-1))"
                                                    stopOpacity={0.8}
                                                />
                                                <stop
                                                    offset="95%"
                                                    stopColor="hsl(var(--chart-1))"
                                                    stopOpacity={0.1}
                                                />
                                            </linearGradient>
                                            <linearGradient id="fillEngagement" x1="0" y1="0" x2="0" y2="1">
                                                <stop
                                                    offset="5%"
                                                    stopColor="hsl(var(--chart-2))"
                                                    stopOpacity={0.8}
                                                />
                                                <stop
                                                    offset="95%"
                                                    stopColor="hsl(var(--chart-2))"
                                                    stopOpacity={0.1}
                                                />
                                            </linearGradient>
                                        </defs>
                                        <Area
                                            dataKey="engagement"
                                            type="natural"
                                            fill="url(#fillEngagement)"
                                            fillOpacity={0.4}
                                            stroke="hsl(var(--chart-2))"
                                            stackId="a"
                                        />
                                        <Area
                                            dataKey="reach"
                                            type="natural"
                                            fill="url(#fillReach)"
                                            fillOpacity={0.4}
                                            stroke="hsl(var(--chart-1))"
                                            stackId="a"
                                        />
                                    </AreaChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                    </Container>

                    {/* Recent Sales */}
                    <Container delay={0.3} className="col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Sales</CardTitle>
                                <p className="text-sm text-muted-foreground">
                                    You made 265 sales this month.
                                </p>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-8">
                                    {RECENT_SALES.map((sale) => {
                                        const StatusIcon = {
                                            completed: CheckCircle2,
                                            pending: Clock,
                                            failed: XCircle,
                                        }[sale.status];
                                        
                                        const statusColor = {
                                            completed: 'text-green-500',
                                            pending: 'text-amber-500',
                                            failed: 'text-destructive',
                                        }[sale.status];

                                        return (
                                            <div key={sale.id} className="flex items-center hover:bg-muted/50 p-2 rounded-lg transition-colors">
                                                <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
                                                    <ImageWithFallback
                                                        src={sale.avatarUrl || undefined}
                                                        alt={sale.name}
                                                        width={40}
                                                        height={40}
                                                        className="rounded-full object-cover"
                                                        fallback={getSafeImageUrl(sale.avatarUrl, 'user')}
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between">
                                                        <p className="text-sm font-medium leading-none truncate">
                                                            {sale.name}
                                                        </p>
                                                        <div className="ml-2 flex items-center">
                                                            <StatusIcon className={cn('h-3.5 w-3.5 mr-1', statusColor)} />
                                                            <span className={cn('text-xs font-medium', statusColor)}>
                                                                {sale.status.charAt(0).toUpperCase() + sale.status.slice(1)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground truncate">
                                                        {sale.email}
                                                    </p>
                                                </div>
                                                <div className="ml-4 font-medium whitespace-nowrap">
                                                    {sale.amount}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    </Container>
                </div>
            </div>
        </div>
    )
}

// Define the Fighter type (no longer exported)
interface Fighter {
  id: string;
  name: string;
  nickname?: string;
  division: string;
  record: string;
  country?: string;
  age?: number;
  height?: string;
  weight?: string;
  reach?: string;
  stance?: string;
  isChampion: boolean;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

// fetchFighters function (no longer exported)
async function fetchFighters(): Promise<Fighter[]> {
  try {
    const response = await fetch('https://api.sportsdata.io/v3/mma/stats/json/Fighters?key=7fe7fb099e6a482e8c83febaa699e36d', {
      // cache: 'no-store', // If you want fresh data on every request during development
      next: { revalidate: 3600 } // Revalidate data every hour, as per API call interval
    });
    if (!response.ok) {
      // Log more details for server-side debugging
      const errorText = await response.text();
      console.error(`API Error: ${response.status} ${response.statusText}`, errorText);
      throw new Error(`Failed to fetch fighters. Status: ${response.status}`);
    }
    const data: Fighter[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching fighters:", error);
    return []; // Return empty array or handle error as appropriate
  }
}
