import React from 'react';
import { DockDemo } from '@/components/magicui/dock-demo';
import { Particles } from '@/components/ui/particles';

export const metadata = {
  title: "Navigation Dock Demo | UFC Predict",
  description: "Demo of the floating navigation dock component for UFC Predict",
};

export default function DockDemoPage() {
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-black to-red-950/30">
      <div className="absolute inset-0 z-0">
        <Particles
          className="absolute inset-0 z-0"
          quantity={300}
          color="#ff3333"
          ease={100}
        />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-12">
        <DockDemo />
        
        {/* Add some content to demonstrate scrolling */}
        <div className="mt-20 space-y-12">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={`section-${i + 1}-${Date.now()}`} className="bg-black/70 border border-red-500/30 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-4">
                Section {i + 1}
              </h2>
              <p className="text-gray-300">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget
                aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.
                Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam
                nisl nunc quis nisl.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
