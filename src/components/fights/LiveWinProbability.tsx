'use client';

import React, { useEffect, useMemo, useRef } from 'react';
import { cn } from '@/functions/cn';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { LiveWinProbabilityProps, LiveProbability } from '@/types/mma-api'; // Ensure this path and types are correct
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar } from 'react-chartjs-2'; // Using Bar for a horizontal stacked bar as a meter

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

// Logistic Regression Parameters (placeholders from user feedback)
// These weights would ideally be derived from a trained model
const A_STRIKE_WEIGHT = 0.05; // Adjusted for typical ranges, e.g. if deltaStrikes is 10, z changes by 0.5
const B_TAKEDOWN_WEIGHT = 0.2;  // Adjusted for typical ranges, e.g. if deltaTakedowns is 2, z changes by 0.4

/**
 * Calculates live win probability based on strike and takedown differentials.
 * p = sigmoid(a * deltaStrikes + b * deltaTakedowns)
 * @param deltaStrikes Cumulative strike difference (Red - Blue).
 * @param deltaTakedowns Cumulative takedown difference (Red - Blue).
 * @returns Probability for Red fighter (0 to 1).
 */
function calculateRedWinProbability(deltaStrikes: number, deltaTakedowns: number): number {
  const z_live = A_STRIKE_WEIGHT * deltaStrikes + B_TAKEDOWN_WEIGHT * deltaTakedowns;
  const probabilityRed = 1 / (1 + Math.exp(-z_live));
  return probabilityRed;
}

/**
 * LiveWinProbability component.
 * Displays a real-time win probability meter based on live fight statistics.
 * Uses a horizontal stacked bar chart from Chart.js to represent the meter.
 *
 * @param {LiveWinProbabilityProps} props - The properties for the component.
 * @returns {JSX.Element} The rendered live win probability meter.
 */
const LiveWinProbability: React.FC<LiveWinProbabilityProps> = ({ liveStats, className }) => {
  const chartRef = useRef<ChartJS<'bar', number[], string>>(null);

  const { pRed, pBlue } = useMemo(() => {
    if (!liveStats || !liveStats.redCorner || !liveStats.blueCorner) { // Added null check for corners
        return { pRed: 0.5, pBlue: 0.5 }; // Default to 50/50 if no stats
    }

    const deltaStrikesLive = liveStats.redCorner.significantStrikesLanded - liveStats.blueCorner.significantStrikesLanded;
    const deltaTakedownsLive = liveStats.redCorner.takedownsSuccessful - liveStats.blueCorner.takedownsSuccessful;

    const calculatedPRed = calculateRedWinProbability(deltaStrikesLive, deltaTakedownsLive);
    return {
      pRed: parseFloat(calculatedPRed.toFixed(3)),
      pBlue: parseFloat((1 - calculatedPRed).toFixed(3)),
    };
  }, [liveStats]);

  const data = {
    labels: ['Win Probability'], // Single category for the stacked bar
    datasets: [
      {
        label: liveStats?.redCorner?.name || 'Red Corner',
        data: [pRed * 100], // Convert to percentage
        backgroundColor: 'hsl(var(--destructive))', // Reddish color from ShadCN palette
        borderColor: 'hsl(var(--destructive-foreground))',
        borderWidth: 1,
        barPercentage: 1.0,
        categoryPercentage: 1.0,
      },
      {
        label: liveStats?.blueCorner?.name || 'Blue Corner',
        data: [pBlue * 100], // Convert to percentage
        backgroundColor: 'hsl(var(--primary))', // Bluish color from ShadCN palette
        borderColor: 'hsl(var(--primary-foreground))',
        borderWidth: 1,
        barPercentage: 1.0,
        categoryPercentage: 1.0,
      },
    ],
  };

  const options: any = { // Chart.js options can be complex, using 'any' for flexibility here
    indexAxis: 'y', // Makes the bar horizontal
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 800, // Animation duration in ms
      easing: 'easeInOutQuart',
    },
    scales: {
      x: {
        stacked: true,
        min: 0,
        max: 100, // Represents 100%
        ticks: {
          callback: function (value: any) {
            return value + '%'; // Display ticks as percentages
          },
          color: 'hsl(var(--muted-foreground))',
        },
        grid: {
          display: false, // Hide x-axis grid lines
        },
        border: {
            display: false, // Hide x-axis border line
        }
      },
      y: {
        stacked: true,
        display: false, // Hide y-axis labels/ticks as it's just one category
        grid: {
          display: false, // Hide y-axis grid lines
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: 'hsl(var(--foreground))',
          font: {
            size: 14,
          }
        }
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context: any) {
            return `${context.dataset.label}: ${context.raw.toFixed(1)}%`;
          },
        },
      },
      title: {
        display: false, // Title is handled by CardTitle
      },
    },
  };

  // Force chart update when pRed or pBlue changes.
  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.update();
    }
  }, [pRed, pBlue]);


  if (!liveStats || !liveStats.redCorner || !liveStats.blueCorner) {
    return (
      <Card className={cn('w-full', className)}>
        <CardHeader>
          <CardTitle>Live Win Probability</CardTitle>
        </CardHeader>
        <CardContent className="h-32 md:h-28 flex items-center justify-center"> {/* Ensured consistent height */}
          <p className="text-center text-gray-500 dark:text-gray-400">Waiting for live stats...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn('w-full shadow-lg', className)}>
      <CardHeader className="text-center pb-2 pt-4"> {/* Adjusted padding */}
        <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white">
          Live Win Probability
        </CardTitle>
      </CardHeader>
      <CardContent className="relative h-28 md:h-24"> {/* Adjusted height for content */}
        <Bar ref={chartRef} options={options} data={data} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex flex-col items-center">
            <p className="font-bold text-lg" style={{ color: 'hsl(var(--destructive))' }}>
                {`${(pRed * 100).toFixed(0)}%`}
            </p>
            <p className="text-xs text-muted-foreground mx-1">vs</p>
            <p className="font-bold text-lg" style={{ color: 'hsl(var(--primary))' }}>
                {`${(pBlue * 100).toFixed(0)}%`}
            </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveWinProbability;

/**
 * Example Usage (conceptual, would be in a page or another component):
 *
 * // Assuming LiveWinProbabilityProps is imported and defines 'liveStats' structure
 * // For example, from src/types/mma-api.ts:
 * // export interface LiveWinProbabilityProps {
 * //   liveStats: {
 * //     redCorner: { name?: string; significantStrikesLanded: number; takedownsSuccessful: number; };
 * //     blueCorner: { name?: string; significantStrikesLanded: number; takedownsSuccessful: number; };
 * //   };
 * //   className?: string;
 * // }
 *
 * const [currentLiveStats, setCurrentLiveStats] = useState<LiveWinProbabilityProps['liveStats']>({
 *   redCorner: { name: 'Fighter Red', significantStrikesLanded: 0, takedownsSuccessful: 0 },
 *   blueCorner: { name: 'Fighter Blue', significantStrikesLanded: 0, takedownsSuccessful: 0 },
 * });
 *
 * // Somewhere in your app, you'd update currentLiveStats based on real-time data from /api/live
 * // For example, polling inside LiveFightTimeline and passing parts of the data down.
 *
 * <LiveWinProbability liveStats={currentLiveStats} />
 *
 */
