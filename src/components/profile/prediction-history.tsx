"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, CheckCircle, XCircle, ChevronDown, ChevronUp } from "lucide-react";
import { usePredictions } from "@/hooks";
import { toast } from "sonner";
import LoadingIcon from "@/components/ui/loading-icon";

interface Fighter {
  id: string;
  name: string;
  nickname?: string;
  division: string;
  record: string;
  country?: string;
  isChampion: boolean;
  imageUrl?: string;
}

interface Prediction {
  id: string;
  fighterId: string;
  userId: string;
  prediction: string;
  confidence: number;
  notes?: string;
  isCorrect?: boolean;
  createdAt: string;
  updatedAt: string;
  fighter: Fighter;
}

interface PredictionHistoryProps {
  predictions: Prediction[];
  onDelete?: () => void;
}

export const PredictionHistory = ({ predictions, onDelete }: PredictionHistoryProps) => {
  const { deletePrediction } = usePredictions();
  const [expandedPrediction, setExpandedPrediction] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedPrediction(expandedPrediction === id ? null : id);
  };

  const handleDelete = async (id: string) => {
    setIsDeleting(id);
    try {
      const success = await deletePrediction(id);
      if (success) {
        toast.success("Prediction deleted successfully");
        if (onDelete) onDelete();
      } else {
        toast.error("Failed to delete prediction");
      }
    } catch (error) {
      toast.error("An error occurred while deleting prediction");
    } finally {
      setIsDeleting(null);
    }
  };

  if (predictions.length === 0) {
    return (
      <Card className="bg-black/70 border-red-500/30">
        <CardContent className="p-6 text-center">
          <p className="text-gray-400">You haven&apos;t made any predictions yet.</p>
          <Button className="mt-4 bg-red-600 hover:bg-red-700" asChild>
            <Link href="/fighters">Find Fighters</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {predictions.map((prediction) => (
        <Card key={prediction.id} className="bg-black/70 border-red-500/30 overflow-hidden">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-base font-medium flex items-center">
              <div className="relative w-8 h-8 mr-2 rounded-full overflow-hidden bg-gray-800">
                {prediction.fighter.imageUrl ? (
                  <Image
                    src={prediction.fighter.imageUrl}
                    alt={prediction.fighter.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-red-500">
                      {prediction.fighter.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              {prediction.fighter.name}
              {prediction.fighter.isChampion && (
                <Badge className="ml-2 bg-yellow-600 text-xs">Champion</Badge>
              )}
            </CardTitle>
            <div className="flex items-center gap-2">
              {prediction.isCorrect !== undefined && (
                prediction.isCorrect ? (
                  <Badge className="bg-green-600 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Correct
                  </Badge>
                ) : (
                  <Badge className="bg-red-600 flex items-center gap-1">
                    <XCircle className="w-3 h-3" />
                    Incorrect
                  </Badge>
                )
              )}
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => toggleExpand(prediction.id)}
              >
                {expandedPrediction === prediction.id ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardHeader>

          <CardContent className="pb-3">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>
                {format(new Date(prediction.createdAt), "MMM d, yyyy")}
              </span>
              <span>
                {Math.round(prediction.confidence * 100)}% Confidence
              </span>
            </div>

            <p className="text-white">{prediction.prediction}</p>

            {expandedPrediction === prediction.id && (
              <div className="mt-4 pt-4 border-t border-red-500/10">
                {prediction.notes && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-300 mb-1">Notes</h4>
                    <p className="text-sm text-gray-400">{prediction.notes}</p>
                  </div>
                )}

                <div className="flex justify-end">
                  <Button
                    variant="destructive"
                    size="sm"
                    className="bg-red-900 hover:bg-red-800 text-white"
                    onClick={() => handleDelete(prediction.id)}
                    disabled={isDeleting === prediction.id}
                  >
                    {isDeleting === prediction.id ? (
                      <LoadingIcon size="sm" className="mr-2" />
                    ) : (
                      <Trash2 className="h-4 w-4 mr-2" />
                    )}
                    Delete
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
