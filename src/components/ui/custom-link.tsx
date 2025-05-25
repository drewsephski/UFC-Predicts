'use client';

import { cn } from '@/functions';
import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { forwardRef, useEffect, useState } from 'react';

export interface CustomLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  prefetch?: boolean;
  scroll?: boolean;
  onNavStart?: () => void;
  onNavEnd?: () => void;
}

const CustomLink = forwardRef<HTMLAnchorElement, CustomLinkProps>(
  (
    {
      href,
      children,
      className,
      activeClassName = '',
      prefetch = true,
      scroll = true,
      onNavStart,
      onNavEnd,
      ...props
    },
    ref
  ) => {
    const pathname = usePathname();
    const [isNavigating, setIsNavigating] = useState(false);
    const isActive = pathname === href;

    // Handle navigation start/end events
    useEffect(() => {
      if (isNavigating && onNavEnd) {
        onNavEnd();
        setIsNavigating(false);
      }
    }, [isNavigating, onNavEnd]);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (onNavStart) {
        onNavStart();
      }
      
      // Only set navigating if it's a client-side navigation
      if (href.toString().startsWith('/')) {
        setIsNavigating(true);
      }

      // Let the default handler take over
    };

    return (
      <Link
        ref={ref}
        href={href}
        className={cn(
          'transition-colors duration-200',
          isActive && activeClassName,
          className
        )}
        prefetch={prefetch}
        scroll={scroll}
        onClick={handleClick}
        aria-current={isActive ? 'page' : undefined}
        {...props}
      >
        {children}
      </Link>
    );
  }
);

CustomLink.displayName = 'CustomLink';

export { CustomLink };
