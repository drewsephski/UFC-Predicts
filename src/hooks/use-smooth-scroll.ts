"use client";

import { useCallback, useEffect } from 'react';

/**
 * A custom hook that provides smooth scrolling functionality for in-page navigation
 *
 * @param offset - Optional vertical offset in pixels (useful for fixed headers)
 * @returns A function that can be used to scroll to an element by its ID
 */
export const useSmoothScroll = (offset: number = 0) => {
  // Function to handle smooth scrolling to an element
  const scrollToElement = useCallback((elementId: string) => {
    const element = document.getElementById(elementId);

    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, [offset]);

  // Handle clicks on anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');

      if (anchor && anchor.hash && anchor.pathname === window.location.pathname) {
        e.preventDefault();
        const id = anchor.hash.substring(1);
        scrollToElement(id);

        // Update URL without scrolling
        window.history.pushState({}, '', anchor.hash);
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

  return scrollToElement;
};
