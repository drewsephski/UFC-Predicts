import React from 'react';
import { Sitemap } from '@/components/sitemap/sitemap';
import { Particles } from '@/components/ui/particles';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { BackToTop } from '@/components/ui/back-to-top';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: "Sitemap | UFC Predict",
  description: "Complete navigation map of UFC Predict with links to all sections and pages.",
};

export default function SitemapPage() {
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
        <Breadcrumb 
          autoGenerate 
          pathLabels={{ 
            sitemap: "Sitemap" 
          }} 
          className="mb-8" 
        />
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            UFC Predict Sitemap
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Find everything you need with our complete site navigation. Browse all sections and pages of UFC Predict organized by category.
          </p>
        </div>
        
        <Sitemap />
        
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Can&apos;t find what you&apos;re looking for?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <Button asChild className="bg-red-600 hover:bg-red-700 text-white">
              <Link href="/search">
                Search UFC Predict
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-red-500/50 hover:bg-red-500/10 text-red-400 hover:text-red-300">
              <Link href="/contact">
                Contact Support
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      <BackToTop />
    </div>
  );
}
