"use client";

import { useCallback, useEffect, useMemo, useState } from 'react';

interface SmoothScrollOptions {
  offset?: number;
  duration?: number;
  easing?: 'linear' | 'easeInQuad' | 'easeOutQuad' | 'easeInOutQuad';
  updateURL?: boolean;
}

/**
 * Enhanced smooth scrolling hook with configurable options
 *
 * @param options - Configuration options for smooth scrolling
 * @returns An object with scrolling functions and state
 */
export const useEnhancedSmoothScroll = (options: SmoothScrollOptions = {}) => {
  const {
    offset = 0,
    duration = 800,
    easing = 'easeInOutQuad',
    updateURL = true,
  } = options;

  const [isScrolling, setIsScrolling] = useState(false);
  const [lastScrollTarget, setLastScrollTarget] = useState<string | null>(null);

  // Easing functions
  const easingFunctions = useMemo(() => ({
    // No acceleration
    linear: (t: number) => t,

    // Accelerating from zero velocity
    easeInQuad: (t: number) => t * t,

    // Decelerating to zero velocity
    easeOutQuad: (t: number) => t * (2 - t),

    // Acceleration until halfway, then deceleration
    easeInOutQuad: (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  }), []);

  // Function to scroll to an element by its ID
  const scrollToElement = useCallback((elementId: string) => {
    const element = document.getElementById(elementId);

    if (!element) {
      console.warn(`Element with ID "${elementId}" not found.`);
      return;
    }

    setIsScrolling(true);
    setLastScrollTarget(elementId);

    const startPosition = window.scrollY;
    const targetPosition = element.getBoundingClientRect().top + window.scrollY - offset;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    const animateScroll = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easedProgress = easingFunctions[easing](progress);

      window.scrollTo(0, startPosition + distance * easedProgress);

      if (timeElapsed < duration) {
        requestAnimationFrame(animateScroll);
      } else {
        // Update URL if option is enabled
        if (updateURL) {
          window.history.pushState({}, '', `#${elementId}`);
        }

        setIsScrolling(false);
      }
    };

    requestAnimationFrame(animateScroll);
  }, [offset, duration, easing, updateURL, easingFunctions]);

  // Function to scroll to a specific position
  const scrollToPosition = useCallback((targetY: number) => {
    setIsScrolling(true);

    const startPosition = window.scrollY;
    const distance = targetY - startPosition;
    let startTime: number | null = null;

    const animateScroll = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easedProgress = easingFunctions[easing](progress);

      window.scrollTo(0, startPosition + distance * easedProgress);

      if (timeElapsed < duration) {
        requestAnimationFrame(animateScroll);
      } else {
        setIsScrolling(false);
      }
    };

    requestAnimationFrame(animateScroll);
  }, [duration, easing, easingFunctions]);

  // Handle clicks on anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');

      if (anchor?.hash && anchor?.pathname === window.location.pathname) {
        e.preventDefault();
        const id = anchor.hash.substring(1);
        scrollToElement(id);
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, [scrollToElement]);

  // Handle initial load with hash in URL
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      // Small delay to ensure the page is fully loaded
      setTimeout(() => {
        scrollToElement(id);
      }, 100);
    }
  }, [scrollToElement]);

  return {
    scrollToElement,
    scrollToPosition,
    isScrolling,
    lastScrollTarget
  };
};
