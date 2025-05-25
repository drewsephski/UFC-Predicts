"use client";

import { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import { smoothScroll as smoothScrollUtil } from '@/lib/smooth-scroll';

export type EasingFunction = 'linear' | 'easeInQuad' | 'easeOutQuad' | 'easeInOutQuad' | 'easeInCubic' | 'easeOutCubic' | 'easeInOutCubic';

interface SmoothScrollOptions {
  /** Offset from the top of the target element (in pixels) */
  offset?: number;
  /** Duration of the scroll animation (in milliseconds) */
  duration?: number;
  /** Easing function for the scroll animation */
  easing?: EasingFunction;
  /** Whether to update the URL hash when scrolling */
  updateURL?: boolean;
  /** Whether to add smooth scrolling to all anchor links */
  initAnchorLinks?: boolean;
  /** Callback when scroll starts */
  onScrollStart?: () => void;
  /** Callback when scroll completes */
  onScrollComplete?: () => void;
}

/**
 * Enhanced smooth scrolling hook with configurable options
 *
 * @param options - Configuration options for smooth scrolling
 * @returns An object with scrolling functions and state
 */
export const useEnhancedSmoothScroll = (options: SmoothScrollOptions = {}) => {
  const {
    offset = 80, // Default offset for fixed headers
    duration = 600,
    easing = 'easeInOutQuad',
    updateURL = true,
    initAnchorLinks = true,
    onScrollStart,
    onScrollComplete,
  } = options;

  const [isScrolling, setIsScrolling] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sectionElementsRef = useRef<Map<string, HTMLElement>>(new Map());
  const lastScrollTarget = useRef<string | null>(null);

  // Easing functions map
  const easingFunctions = useMemo(() => ({
    linear: (t: number) => t,
    easeInQuad: (t: number) => t * t,
    easeOutQuad: (t: number) => t * (2 - t),
    easeInOutQuad: (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    easeInCubic: (t: number) => t * t * t,
    easeOutCubic: (t: number) => (--t) * t * t + 1,
    easeInOutCubic: (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  }), []);

  // Function to scroll to an element by its ID
  const scrollToElement = useCallback((elementId: string) => {
    const element = document.getElementById(elementId);

    if (!element) {
      console.warn(`Element with ID "${elementId}" not found.`);
      return;
    }

    // Update the last scroll target
    lastScrollTarget.current = elementId;

    // Call the scroll start callback
    onScrollStart?.();
    setIsScrolling(true);

    // Get the easing function
    const ease = easingFunctions[easing] || easingFunctions.easeInOutQuad;

    // Use the smooth scroll utility
    smoothScrollUtil({
      target: element,
      offset,
      duration,
      easing: ease,
      onComplete: () => {
        setIsScrolling(false);
        onScrollComplete?.();
      },
    });
  }, [duration, easing, easingFunctions, offset, onScrollStart, onScrollComplete]);

  // Cleanup function
  useEffect(() => {
    const timeout = scrollTimeoutRef.current;
    const observer = observerRef.current;

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  // Initialize intersection observer for section tracking
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      if (isScrolling) return; // Don't update active section during programmatic scrolls

      for (const entry of entries) {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (id) {
            setActiveSection(id);

            if (updateURL) {
              // Update URL without triggering scroll
              const url = new URL(window.location.href);
              url.hash = `#${id}`;
              window.history.replaceState({}, '', url.toString());
            }
            break;
          }
        }
      }
    };

    // Create observer with configurable threshold
    observerRef.current = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: `-${offset}px 0px -${window.innerHeight - offset - 100}px`,
      threshold: 0.1,
    });

    // Observe all sections with IDs
    sectionElementsRef.current.forEach((element) => {
      observerRef.current?.observe(element);
    });

    // Handle initial hash if present
    const handleInitialHash = () => {
      const hash = window.location.hash.substring(1);
      if (hash) {
        // Small delay to ensure the page is fully loaded
        setTimeout(() => {
          scrollToElement(hash);
        }, 100);
      }
    };

    // Run after a short delay to ensure all elements are mounted
    const timeoutId = setTimeout(handleInitialHash, 100);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      clearTimeout(timeoutId);
    };
  }, [offset, scrollToElement, updateURL, isScrolling]);

  // Initialize anchor links
  useEffect(() => {
    if (!initAnchorLinks || typeof document === 'undefined') return;

    const handleClick = (e: Event) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement;

      if (anchor && anchor.getAttribute('href') !== '#') {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');

        if (targetId) {
          scrollToElement(targetId.replace('#', ''));
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [initAnchorLinks, scrollToElement]);

  // Register sections to observe
  const registerSection = useCallback((element: HTMLElement | null, id?: string) => {
    if (!element) return;

    const elementId = id || element.id;
    if (!elementId) return;

    sectionElementsRef.current.set(elementId, element);

    // Observe the element if observer is available
    if (observerRef.current) {
      observerRef.current.observe(element);
    }

    return () => {
      sectionElementsRef.current.delete(elementId);
      if (observerRef.current) {
        observerRef.current.unobserve(element);
      }
    };
  }, []);

  // Function to scroll to a section by ID
  const scrollToSection = useCallback((sectionId: string, options: Partial<SmoothScrollOptions> = {}) => {
    const {
      offset: customOffset = offset,
      duration: customDuration = duration,
      easing: customEasing = easing,
    } = options;

    const element = document.getElementById(sectionId);
    if (!element) {
      console.warn(`Section with ID "${sectionId}" not found.`);
      return;
    }

    // Update the last scroll target
    lastScrollTarget.current = sectionId;
    onScrollStart?.();
    setIsScrolling(true);

    const ease = typeof customEasing === 'string'
      ? (easingFunctions[customEasing] || easingFunctions.easeInOutQuad)
      : customEasing;

    smoothScrollUtil({
      target: element,
      offset: customOffset,
      duration: customDuration,
      easing: ease,
      onComplete: () => {
        setIsScrolling(false);
        onScrollComplete?.();
      },
    });
  }, [duration, easing, easingFunctions, offset, onScrollComplete, onScrollStart]);

  return {
    isScrolling,
    activeSection,
    scrollToElement,
    scrollToSection,
    registerSection,
    lastScrollTarget: lastScrollTarget.current
  };
};
