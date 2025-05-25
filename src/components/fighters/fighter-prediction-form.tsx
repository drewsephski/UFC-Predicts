"use client";

import type React from 'react';
import { useState } from 'react';
import { useUFC, type Fighter, type Fight } from '@/contexts/ufc-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { LoadingState } from '@/components/ui/loading-state';
import { useAuth } from '@clerk/nextjs';

interface FighterPredictionFormProps {
  fighter: Fighter;
  upcomingFight: Fight | null;
}

export function FighterPredictionForm({ fighter, upcomingFight }: FighterPredictionFormProps) {
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const { makePrediction, loadingPredictions } = useUFC();
  
  const [method, setMethod] = useState<string>('decision');
  const [round, setRound] = useState<number | undefined>(undefined);
  const [confidence, setConfidence] = useState<number>(70);
  const [notes, setNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isSignedIn) {
      toast.error('You must be signed in to make predictions');
      router.push('/auth/signin');
      return;
    }
    
    if (!upcomingFight) {
      toast.error('No upcoming fight found for this fighter');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const predictionData = {
        fightId: upcomingFight.id,
        predictedWinnerId: fighter.id,
        method,
        round: method === 'decision' ? undefined : round,
        confidence,
        notes: notes.trim() || undefined,
      };
      
      const result = await makePrediction(predictionData);
      
      if (result) {
        toast.success('Prediction saved successfully!');
        setMethod('decision');
        setRound(undefined);
        setConfidence(70);
        setNotes('');
      } else {
        toast.error('Failed to save prediction');
      }
    } catch (error) {
      toast.error('An error occurred while saving your prediction');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isSignedIn) {
    return (
      <Card className="bg-black/70 border-red-500/30">
        <CardHeader>
          <CardTitle>Make a Prediction</CardTitle>
          <CardDescription>
            Sign in to predict the outcome of {fighter.name}&apos;s next fight
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={() => router.push('/auth/signin')}
            className="w-full bg-red-600 hover:bg-red-700 text-white"
          >
            Sign In to Continue
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!upcomingFight) {
    return (
      <Card className="bg-black/70 border-red-500/30">
        <CardHeader>
          <CardTitle>No Upcoming Fight</CardTitle>
          <CardDescription>
            {fighter.name} doesn&apos;t have any scheduled fights at the moment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Check back later for updates on {fighter.name}&apos;s next fight.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (isSubmitting || loadingPredictions) {
    return <LoadingState text="Saving prediction..." />;
  }

  const opponent = upcomingFight.redCornerId === fighter.id 
    ? upcomingFight.blueCorner 
    : upcomingFight.redCorner;

  return (
    <Card className="bg-black/70 border-red-500/30">
      <CardHeader>
        <CardTitle>Predict {fighter.name}&apos;s Next Fight</CardTitle>
        <CardDescription>
          vs. {opponent?.name || 'Opponent'} on {new Date(upcomingFight.date).toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="method">Victory Method</Label>
            <Select value={method} onValueChange={setMethod}>
              <SelectTrigger id="method">
                <SelectValue placeholder="Select method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="decision">Decision</SelectItem>
                <SelectItem value="knockout">Knockout</SelectItem>
                <SelectItem value="technical_knockout">Technical Knockout</SelectItem>
                <SelectItem value="submission">Submission</SelectItem>
                <SelectItem value="disqualification">Disqualification</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {method !== 'decision' && (
            <div className="space-y-2">
              <Label htmlFor="round">Round</Label>
              <Select 
                value={round?.toString() || ''} 
                onValueChange={(value) => setRound(value ? Number.parseInt(value) : undefined)}
              >
                <SelectTrigger id="round">
                  <SelectValue placeholder="Select round" />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(upcomingFight.rounds)].map((_, i) => {
                    const roundValue = (i + 1).toString();
                    if (roundValue === '') return null;
                    return (
                      <SelectItem key={`round-${i + 1}`} value={roundValue}>
                        Round {i + 1}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          )}
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="confidence">Confidence ({confidence}%)</Label>
            </div>
            <Slider
              id="confidence"
              min={1}
              max={100}
              step={1}
              value={[confidence]}
              onValueChange={(values) => {
                const newValue = values[0];
                if (newValue !== undefined) {
                  setConfidence(newValue);
                }
              }}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Low</span>
              <span>Medium</span>
              <span>High</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add any additional thoughts about your prediction..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-red-600 hover:bg-red-700 text-white"
          >
            Submit Prediction
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
