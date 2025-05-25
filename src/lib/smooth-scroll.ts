/**
 * Smooth scroll utility functions for consistent scrolling behavior
 */

interface ScrollOptions {
  /** The element to scroll to */
  target: string | HTMLElement;
  /** Offset from the top of the target element (in pixels) */
  offset?: number;
  /** Duration of the scroll animation (in milliseconds) */
  duration?: number;
  /** Easing function for the scroll animation */
  easing?: (t: number) => number;
  /** Callback function when scroll completes */
  onComplete?: () => void;
}

/**
 * Default easing function (easeInOutQuad)
 * @param t - Progress (0 to 1)
 * @returns Eased progress
 */
const easeInOutQuad = (t: number): number => {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
};

/**
 * Smoothly scroll to a target element
 * @param options - Scroll options
 */
export const smoothScroll = ({
  target,
  offset = 0,
  duration = 800,
  easing = easeInOutQuad,
  onComplete,
}: ScrollOptions): void => {
  // Get the target element
  const targetElement = typeof target === 'string'
    ? document.querySelector(target) as HTMLElement
    : target;

  if (!targetElement) {
    console.warn(`Target element not found: ${target}`);
    return;
  }

  const start = window.pageYOffset;
  const targetY = window.scrollY + targetElement.getBoundingClientRect().top - offset;
  const distance = targetY - start;
  let startTime: number | null = null;

  // Animation frame function
  const animateScroll = (currentTime: number) => {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const easedProgress = easing(progress);

    window.scrollTo(0, start + distance * easedProgress);

    if (timeElapsed < duration) {
      window.requestAnimationFrame(animateScroll);
    } else if (onComplete) {
      onComplete();
    }
  };

  // Start the animation
  window.requestAnimationFrame(animateScroll);
};

/**
 * Scroll to the top of the page smoothly
 * @param options - Scroll options
 */
export const scrollToTop = ({
  duration = 600,
  easing = easeInOutQuad,
  onComplete,
}: Omit<ScrollOptions, 'target' | 'offset'> = {}) => {
  smoothScroll({
    target: document.documentElement,
    offset: 0,
    duration,
    easing,
    onComplete,
  });
};

/**
 * Scroll to a section by ID with smooth behavior
 * @param id - The ID of the section to scroll to
 * @param options - Additional scroll options
 */
export const scrollToSection = (
  id: string,
  options: Omit<ScrollOptions, 'target'> = {}
) => {
  const element = document.getElementById(id);
  if (element) {
    smoothScroll({
      target: element,
      offset: options.offset ?? 80, // Default offset for fixed header
      duration: options.duration,
      easing: options.easing,
      onComplete: options.onComplete,
    });
  }
};

/**
 * Initialize smooth scroll behavior for anchor links
 * @param container - The container element to search for anchor links (default: document)
 */
export const initSmoothScroll = (container: HTMLElement | Document = document) => {
  const handleClick = (e: Event) => {
    const target = e.target as HTMLElement;
    const link = target.closest('a[href^="#"]') as HTMLAnchorElement;
    
    if (link) {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      
      if (targetId && targetId !== '#') {
        smoothScroll({
          target: targetId,
          duration: 600,
          easing: easeInOutQuad,
          onComplete: () => {
            // Update URL without adding to history
            if (history.pushState) {
              history.pushState(null, '', targetId);
            } else {
              location.hash = targetId;
            }
          }
        });
      }
    }
  };

  container.addEventListener('click', (e) => handleClick(e as unknown as Event));
  
  // Return cleanup function
  return () => {
    container.removeEventListener('click', (e) => handleClick(e as unknown as Event));
  };
};

/**
 * Check if an element is in the viewport
 * @param element - The element to check
 * @param threshold - How much of the element needs to be visible (0-1)
 * @returns Boolean indicating if the element is in the viewport
 */
export const isInViewport = (
  element: HTMLElement | null,
  threshold: number = 0.1
): boolean => {
  if (!element) return false;

  const rect = element.getBoundingClientRect();
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  const viewportWidth = window.innerWidth || document.documentElement.clientWidth;

  // Calculate how much of the element is visible
  const verticalVisible =
    (Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0)) / rect.height;
  const horizontalVisible =
    (Math.min(rect.right, viewportWidth) - Math.max(rect.left, 0)) / rect.width;

  return verticalVisible >= threshold && horizontalVisible >= threshold;
};
