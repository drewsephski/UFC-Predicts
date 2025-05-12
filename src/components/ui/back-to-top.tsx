"use client";

import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/functions';
import { motion, AnimatePresence } from 'framer-motion';

interface BackToTopProps {
  /**
   * Scroll threshold in pixels to show the button
   */
  threshold?: number;
  /**
   * Position of the button
   */
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center';
  /**
   * Custom class name
   */
  className?: string;
  /**
   * Smooth scroll duration in ms
   */
  scrollDuration?: number;
}

export function BackToTop({
  threshold = 300,
  position = 'bottom-right',
  className,
  scrollDuration = 500,
}: BackToTopProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Position classes
  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'bottom-center': 'bottom-6 left-1/2 transform -translate-x-1/2',
  };

  // Check scroll position to show/hide button
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > threshold);
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  // Scroll to top with animation
  const scrollToTop = () => {
    const startPosition = window.pageYOffset;
    const startTime = performance.now();

    const animateScroll = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / scrollDuration, 1);
      
      // Easing function (easeOutQuad)
      const easeProgress = 1 - (1 - progress) * (1 - progress);
      
      window.scrollTo(0, startPosition * (1 - easeProgress));
      
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className={cn(
            'fixed z-50',
            positionClasses[position],
            className
          )}
        >
          <Button
            size="icon"
            variant="default"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="bg-red-600 hover:bg-red-700 text-white shadow-md h-10 w-10 rounded-full"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
