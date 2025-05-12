"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/functions';

interface PaginationNavProps {
  /**
   * Previous item details
   */
  previous?: {
    href: string;
    label: string;
    title?: string;
  };
  /**
   * Next item details
   */
  next?: {
    href: string;
    label: string;
    title?: string;
  };
  /**
   * Custom class name
   */
  className?: string;
  /**
   * Variant for the navigation style
   */
  variant?: 'default' | 'simple' | 'compact';
}

export function PaginationNav({
  previous,
  next,
  className,
  variant = 'default',
}: PaginationNavProps) {
  if (!previous && !next) return null;

  // Render different variants
  if (variant === 'simple') {
    return (
      <div className={cn("flex justify-between items-center w-full", className)}>
        {previous ? (
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="text-gray-300 hover:text-white hover:bg-red-950/20"
          >
            <Link href={previous.href}>
              <ChevronLeft className="h-4 w-4 mr-1" />
              {previous.label}
            </Link>
          </Button>
        ) : (
          <div />
        )}
        
        {next ? (
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="text-gray-300 hover:text-white hover:bg-red-950/20"
          >
            <Link href={next.href}>
              {next.label}
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        ) : (
          <div />
        )}
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={cn("flex gap-2", className)}>
        {previous && (
          <Button
            variant="outline"
            size="icon"
            asChild
            className="border-red-500/30 hover:bg-red-950/30"
            aria-label={`Previous: ${previous.label}`}
          >
            <Link href={previous.href}>
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </Button>
        )}
        
        {next && (
          <Button
            variant="outline"
            size="icon"
            asChild
            className="border-red-500/30 hover:bg-red-950/30"
            aria-label={`Next: ${next.label}`}
          >
            <Link href={next.href}>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        )}
      </div>
    );
  }

  // Default variant
  return (
    <div className={cn("flex justify-between items-center w-full gap-4", className)}>
      {previous ? (
        <div className="flex-1">
          <Button
            variant="outline"
            asChild
            className="w-full justify-start border-red-500/30 hover:bg-red-950/30 text-left"
          >
            <Link href={previous.href} className="flex flex-col items-start">
              <span className="flex items-center text-xs text-muted-foreground mb-1">
                <ChevronLeft className="h-3 w-3 mr-1" />
                Previous {previous.label}
              </span>
              {previous.title && (
                <span className="font-medium truncate max-w-[200px]">{previous.title}</span>
              )}
            </Link>
          </Button>
        </div>
      ) : (
        <div className="flex-1" />
      )}
      
      {next ? (
        <div className="flex-1">
          <Button
            variant="outline"
            asChild
            className="w-full justify-end border-red-500/30 hover:bg-red-950/30 text-right"
          >
            <Link href={next.href} className="flex flex-col items-end">
              <span className="flex items-center text-xs text-muted-foreground mb-1">
                Next {next.label}
                <ChevronRight className="h-3 w-3 ml-1" />
              </span>
              {next.title && (
                <span className="font-medium truncate max-w-[200px]">{next.title}</span>
              )}
            </Link>
          </Button>
        </div>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  );
}
