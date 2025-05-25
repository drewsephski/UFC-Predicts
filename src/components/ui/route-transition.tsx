'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/functions';

interface RouteTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export function RouteTransition({ children, className }: RouteTransitionProps) {
  const [isChanging, setIsChanging] = useState(false);
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [animationKey, setAnimationKey] = useState(0);

  // Handle route changes
  useEffect(() => {
    const handleStart = () => {
      setIsChanging(true);
    };

    const handleComplete = () => {
      // Small delay to ensure the new content is loaded
      setTimeout(() => {
        setDisplayChildren(children);
        setAnimationKey((prev) => prev + 1);
        setIsChanging(false);
      }, 100);
    };

    // Set up event listeners
    window.addEventListener('routeChangeStart', handleStart);
    window.addEventListener('routeChangeComplete', handleComplete);

    // Initial load
    handleComplete();

    return () => {
      window.removeEventListener('routeChangeStart', handleStart);
      window.removeEventListener('routeChangeComplete', handleComplete);
    };
  }, [children]);

  return (
    <div className={cn('relative min-h-[200px]', className)}>
      {/* Loading indicator */}
      <AnimatePresence>
        {isChanging && (
          <motion.div
            key="loading-bar"
            className="fixed top-0 left-0 right-0 h-1 bg-red-500 z-[9999]"
            initial={{ width: '0%' }}
            animate={{ width: '90%' }}
            exit={{ width: '100%', opacity: 0 }}
            transition={{
              duration: 2.5,
              ease: 'easeInOut',
            }}
          />
        )}
      </AnimatePresence>

      {/* Page content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname || 'initial'}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            duration: 0.3,
            ease: 'easeInOut',
          }}
          className="w-full h-full"
        >
          {displayChildren}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// Custom event dispatchers for route changes
declare global {
  interface WindowEventMap {
    routeChangeStart: CustomEvent;
    routeChangeComplete: CustomEvent;
  }
}

// This component should be used in _app.tsx or layout.tsx
export function RouteChangeHandler() {
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  useEffect(() => {
    if (prevPathname !== pathname) {
      // Dispatch route change start event
      window.dispatchEvent(new CustomEvent('routeChangeStart'));
      
      // Simulate loading time
      const timer = setTimeout(() => {
        window.dispatchEvent(new CustomEvent('routeChangeComplete'));
      }, 100);
      
      setPrevPathname(pathname);
      
      return () => clearTimeout(timer);
    }
  }, [pathname, prevPathname]);

  return null;
}
