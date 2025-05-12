"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import LoadingIcon from "@/components/ui/loading-icon";
import { usePredictions } from "@/hooks";

interface PredictionFormProps {
  fighterId: string;
  fighterName: string;
  onSuccess?: () => void;
}

export const PredictionForm = ({ fighterId, fighterName, onSuccess }: PredictionFormProps) => {
  const { addPrediction } = usePredictions();
  const [prediction, setPrediction] = useState<string>("");
  const [confidence, setConfidence] = useState<number>(50);
  const [notes, setNotes] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const success = await addPrediction({
        fighterId,
        prediction,
        confidence: confidence / 100,
        notes
      });
      
      if (success) {
        toast.success("Prediction submitted successfully!");
        setPrediction("");
        setConfidence(50);
        setNotes("");
        
        if (onSuccess) onSuccess();
      } else {
        toast.error("Failed to submit prediction");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-black/50 p-4 rounded-lg border border-red-500/30">
      <h3 className="text-lg font-bold">Predict {fighterName}'s Fight Outcome</h3>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Prediction</label>
        <Input
          value={prediction}
          onChange={(e) => setPrediction(e.target.value)}
          placeholder="e.g., Win by KO, Lose by submission"
          required
          className="bg-black/70 border-red-500/30"
        />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Confidence ({confidence}%)</label>
        <Slider
          value={[confidence]}
          onValueChange={(values) => setConfidence(values[0])}
          min={0}
          max={100}
          step={1}
          className="py-4"
        />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Notes (Optional)</label>
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add any additional notes about your prediction..."
          className="bg-black/70 border-red-500/30 min-h-[100px]"
        />
      </div>
      
      <Button 
        type="submit" 
        disabled={isSubmitting || !prediction} 
        className="w-full bg-red-600 hover:bg-red-700 text-white"
      >
        {isSubmitting ? <LoadingIcon size="sm" className="mr-2" /> : null}
        Submit Prediction
      </Button>
    </form>
  );
};
