"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, CheckCircle, TrendingUp, User } from "lucide-react";

interface ProfileStatsProps {
  totalPredictions: number;
  correctPredictions: number;
  accuracy: number;
  favoritesCount: number;
}

export const ProfileStats = ({
  totalPredictions,
  correctPredictions,
  accuracy,
  favoritesCount
}: ProfileStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="bg-black/70 border-red-500/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <TrendingUp className="w-4 h-4 mr-2 text-red-500" />
            Total Predictions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{totalPredictions}</p>
        </CardContent>
      </Card>
      
      <Card className="bg-black/70 border-red-500/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
            Correct Predictions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{correctPredictions}</p>
        </CardContent>
      </Card>
      
      <Card className="bg-black/70 border-red-500/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <Award className="w-4 h-4 mr-2 text-yellow-500" />
            Accuracy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{accuracy}%</p>
        </CardContent>
      </Card>
      
      <Card className="bg-black/70 border-red-500/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <User className="w-4 h-4 mr-2 text-blue-500" />
            Favorite Fighters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{favoritesCount}</p>
        </CardContent>
      </Card>
    </div>
  );
};
