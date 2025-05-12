"use client";

import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/functions';

interface LoadingStateProps {
  text?: string;
  fullPage?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function LoadingState({
  text = 'Loading...',
  fullPage = false,
  className,
  size = 'md',
}: LoadingStateProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-10 w-10',
  };

  const containerClasses = fullPage
    ? 'fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50'
    : 'flex flex-col items-center justify-center p-8';

  return (
    <div className={cn(containerClasses, className)}>
      <div className="flex flex-col items-center justify-center space-y-4">
        <Loader2 className={cn("animate-spin text-red-500", sizeClasses[size])} />
        {text && <p className="text-muted-foreground text-sm">{text}</p>}
      </div>
    </div>
  );
}

interface ErrorStateProps {
  error: string | null;
  fullPage?: boolean;
  className?: string;
  onRetry?: () => void;
}

export function ErrorState({
  error,
  fullPage = false,
  className,
  onRetry,
}: ErrorStateProps) {
  if (!error) return null;

  const containerClasses = fullPage
    ? 'fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50'
    : 'flex flex-col items-center justify-center p-8';

  return (
    <div className={cn(containerClasses, className)}>
      <div className="flex flex-col items-center justify-center space-y-4 max-w-md text-center">
        <div className="h-16 w-16 rounded-full bg-red-500/10 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-8 w-8 text-red-500"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-foreground">Something went wrong</h3>
        <p className="text-muted-foreground">{error}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}
