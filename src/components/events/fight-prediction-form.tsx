"use client";

import type React from 'react';
import { useState } from 'react';
import type { Fight } from '@/contexts/ufc-context';
import { useUFC } from '@/contexts/ufc-context';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { LoadingState } from '@/components/ui/loading-state';
import { useAuth } from '@clerk/nextjs';

interface FightPredictionFormProps {
  fight: Fight;
}

export function FightPredictionForm({ fight }: FightPredictionFormProps) {
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const { makePrediction, loadingPredictions } = useUFC();
  
  const [selectedFighter, setSelectedFighter] = useState<string>('');
  const [method, setMethod] = useState<string>('decision');
  const [round, setRound] = useState<number | undefined>(undefined);
  const [confidence, setConfidence] = useState<number>(70);
  const [notes, setNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const redCorner = fight.redCorner;
  const blueCorner = fight.blueCorner;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isSignedIn) {
      toast.error('You must be signed in to make predictions');
      router.push('/auth/signin');
      return;
    }
    
    if (!selectedFighter) {
      toast.error('Please select a fighter');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const predictionData = {
        fightId: fight.id,
        predictedWinnerId: selectedFighter,
        method,
        round: method === 'decision' ? undefined : round,
        confidence,
        notes: notes.trim() || undefined,
      };
      
      const result = await makePrediction(predictionData);
      
      if (result) {
        toast.success('Prediction saved successfully!');
        setSelectedFighter('');
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
      <div className="text-center py-4">
        <p className="text-muted-foreground mb-4">Sign in to make predictions</p>
        <Button 
          onClick={() => router.push('/auth/signin')}
          className="bg-red-600 hover:bg-red-700 text-white"
        >
          Sign In to Continue
        </Button>
      </div>
    );
  }

  if (isSubmitting || loadingPredictions) {
    return <LoadingState text="Saving prediction..." />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label className="text-lg font-medium mb-3 block">Who will win?</Label>
          <RadioGroup value={selectedFighter} onValueChange={setSelectedFighter} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`border ${selectedFighter === redCorner?.id ? 'border-red-500' : 'border-red-500/30'} rounded-lg p-4 cursor-pointer`}>
              <RadioGroupItem 
                value={redCorner?.id || ''} 
                id={`fighter-${redCorner?.id}`} 
                className="sr-only"
                disabled={!redCorner}
              />
              <Label 
                htmlFor={`fighter-${redCorner?.id}`}
                className={`flex items-center cursor-pointer ${!redCorner ? 'opacity-50' : ''}`}
              >
                <div className="w-4 h-4 rounded-full border border-red-500 mr-3 flex items-center justify-center">
                  {selectedFighter === redCorner?.id && (
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                  )}
                </div>
                <span>{redCorner?.name || 'TBA'}</span>
              </Label>
            </div>
            
            <div className={`border ${selectedFighter === blueCorner?.id ? 'border-blue-500' : 'border-red-500/30'} rounded-lg p-4 cursor-pointer`}>
              <RadioGroupItem 
                value={blueCorner?.id || ''} 
                id={`fighter-${blueCorner?.id}`} 
                className="sr-only"
                disabled={!blueCorner}
              />
              <Label 
                htmlFor={`fighter-${blueCorner?.id}`}
                className={`flex items-center cursor-pointer ${!blueCorner ? 'opacity-50' : ''}`}
              >
                <div className="w-4 h-4 rounded-full border border-blue-500 mr-3 flex items-center justify-center">
                  {selectedFighter === blueCorner?.id && (
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                  )}
                </div>
                <span>{blueCorner?.name || 'TBA'}</span>
              </Label>
            </div>
          </RadioGroup>
        </div>
        
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
              onValueChange={(value) => setRound(Number.parseInt(value))}
            >
              <SelectTrigger id="round">
                <SelectValue placeholder="Select round" />
              </SelectTrigger>
              <SelectContent>
                {[...Array(fight.rounds)].map((_, i) => (
                  <SelectItem key={`round-${i + 1}`} value={(i + 1).toString()}>
                    Round {i + 1}
                  </SelectItem>
                ))}
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
            onValueChange={(newValues: number[]) => {
              const firstValue = newValues[0];
              if (typeof firstValue === 'number') {
                setConfidence(firstValue);
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
            className="min-h-[80px]"
          />
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-red-600 hover:bg-red-700 text-white"
        disabled={!selectedFighter || (method !== 'decision' && !round)}
      >
        Submit Prediction
      </Button>
    </form>
  );
}
