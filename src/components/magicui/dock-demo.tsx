"use client";

import React, { useState } from 'react';
import { FloatingDock } from './dock';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export function DockDemo() {
  const [showLabels, setShowLabels] = useState(false);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 mb-4">
          UFC Navigation Dock
        </h1>
        <p className="text-gray-400 max-w-md mx-auto">
          A floating navigation dock that provides quick access to key sections of the UFC application.
        </p>
      </div>
      
      <div className="flex items-center space-x-4 mb-8">
        <Switch 
          id="show-labels" 
          checked={showLabels} 
          onCheckedChange={setShowLabels} 
        />
        <Label htmlFor="show-labels">Show Labels</Label>
      </div>
      
      <div className="w-full max-w-2xl bg-black/50 border border-red-500/30 rounded-lg p-6">
        <div className="text-sm text-gray-400 mb-4">
          <p>The dock will appear at the bottom of the screen. It features:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Smooth magnification effect on hover</li>
            <li>Active state highlighting for current page</li>
            <li>Responsive design for all screen sizes</li>
            <li>Accessibility support for screen readers</li>
            <li>Subtle backdrop blur for better readability</li>
          </ul>
        </div>
        
        <div className="flex justify-center mt-6">
          <Button 
            variant="default" 
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={() => setShowLabels(!showLabels)}
          >
            Toggle Labels
          </Button>
        </div>
      </div>
      
      {/* The actual floating dock */}
      <FloatingDock showLabels={showLabels} />
    </div>
  );
}
