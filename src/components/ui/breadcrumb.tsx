"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/functions';

interface BreadcrumbProps {
  className?: string;
  homeLabel?: string;
  homeIcon?: boolean;
  separator?: React.ReactNode;
  items?: {
    label: string;
    href?: string;
  }[];
  /**
   * If true, will automatically generate breadcrumbs based on the current path
   */
  autoGenerate?: boolean;
  /**
   * Custom labels for auto-generated paths
   */
  pathLabels?: Record<string, string>;
}

export function Breadcrumb({
  className,
  homeLabel = "Home",
  homeIcon = true,
  separator = <ChevronRight className="h-4 w-4 text-muted-foreground" />,
  items = [],
  autoGenerate = false,
  pathLabels = {},
}: BreadcrumbProps) {
  const pathname = usePathname();
  
  // Generate breadcrumb items from the current path
  const breadcrumbItems = React.useMemo(() => {
    if (!autoGenerate) return items;
    
    const paths = pathname.split('/').filter(Boolean);
    let currentPath = '';
    
    return paths.map((path, index) => {
      currentPath += `/${path}`;
      
      // Use custom label if provided, otherwise capitalize the path
      const label = pathLabels[path] || 
        path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
      
      return {
        label,
        href: index === paths.length - 1 ? undefined : currentPath,
      };
    });
  }, [pathname, autoGenerate, items, pathLabels]);
  
  // Combine home item with the rest
  const allItems = React.useMemo(() => {
    const homeItem = {
      label: homeLabel,
      href: '/',
    };
    
    return [homeItem, ...breadcrumbItems];
  }, [homeLabel, breadcrumbItems]);

  if (allItems.length <= 1) return null;

  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center text-sm", className)}>
      <ol className="flex items-center space-x-2">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;
          
          return (
            <li key={index} className="flex items-center">
              {index > 0 && <span className="mx-2">{separator}</span>}
              
              {isLast ? (
                <span className="font-medium text-foreground" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href || '#'}
                  className={cn(
                    "text-muted-foreground hover:text-foreground transition-colors",
                    index === 0 && "flex items-center"
                  )}
                >
                  {index === 0 && homeIcon && (
                    <Home className="h-4 w-4 mr-1" />
                  )}
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
