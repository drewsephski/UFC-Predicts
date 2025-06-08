'use client';

import React from 'react';
import { cn } from '@/functions/cn';
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, ResponsiveContainer, LineChart, Line } from 'recharts'; // Assuming recharts is used by ui/chart.tsx or can be used directly
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Assuming these ShadCN UI components exist
import type { StatChartData, ChartDataPoint } from '@/types/mma-api'; // Using types defined in the previous step

// Example of what StatChartData might look like for Recharts if ui/chart.tsx is a simple wrapper
// This matches the { labels: string[]; datasets: { label: string; data: number[]; }[] } structure
// For a simpler direct use of Recharts with an array of ChartDataPoint:
export interface SimpleStatChartProps {
  data: ChartDataPoint[]; // e.g., [{label: 'Wins', value: 10}, {label: 'Losses', value: 2}]
  chartType?: 'bar' | 'line';
  title?: string;
  className?: string;
  valueKey?: string; // key for the value in data objects, defaults to 'value'
  nameKey?: string; // key for the name/label in data objects, defaults to 'label'
}

/**
 * StatChart component.
 * Displays fighter statistics using a bar or line chart.
 * This version directly uses Recharts components for clarity and control.
 *
 * @param {SimpleStatChartProps} props - The properties for the component.
 * @returns {JSX.Element} The rendered statistics chart.
 */
const StatChart: React.FC<SimpleStatChartProps> = ({
  data,
  chartType = 'bar',
  title = 'Fighter Stats',
  className,
  valueKey = 'value',
  nameKey = 'label',
}) => {
  if (!data || data.length === 0) {
    return (
      <Card className={cn('w-full', className)}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">No data available for this chart.</p>
        </CardContent>
      </Card>
    );
  }

  // Transform data if needed, Recharts expects an array of objects
  // where each object represents a point or a bar.
  // The `data` prop is assumed to be in this format: [{label: 'Jan', value: 30}, {label: 'Feb', value: 40}]

  return (
    <Card className={cn('w-full shadow-lg', className)}>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          {chartType === 'bar' ? (
            <BarChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}> {/* Adjusted left margin */}
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
              <XAxis dataKey={nameKey} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
              <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  borderColor: 'hsl(var(--border))',
                  color: 'hsl(var(--foreground))',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '14px' }} />
              <Bar dataKey={valueKey} fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={30} />
            </BarChart>
          ) : (
            <LineChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}> {/* Adjusted left margin */}
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
              <XAxis dataKey={nameKey} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
              <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  borderColor: 'hsl(var(--border))',
                  color: 'hsl(var(--foreground))',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '14px' }} />
              <Line type="monotone" dataKey={valueKey} stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          )}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default StatChart;

/**
 * Example Usage (conceptual, would be in a page or another component):
 *
 * const historicalPerformance: ChartDataPoint[] = [
 *   { label: 'Fight 1', value: 150 }, // e.g., performance score or strikes landed
 *   { label: 'Fight 2', value: 180 },
 *   { label: 'Fight 3', value: 120 },
 *   { label: 'Fight 4', value: 200 },
 * ];
 *
 * const winLossData: ChartDataPoint[] = [
 *   { label: 'Wins', value: 12 },
 *   { label: 'Losses', value: 3 },
 *   { label: 'Draws', value: 1 },
 * ];
 *
 * <StatChart data={historicalPerformance} chartType="line" title="Performance Over Last 4 Fights" />
 * <StatChart data={winLossData} chartType="bar" title="Career Summary" />
 *
 */
