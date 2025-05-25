'use client';

import { useState } from 'react';
import Image, { ImageProps, StaticImageData } from 'next/image';
import { cn } from '@/lib/utils';

type SafeImageSource = string | StaticImageData;

interface ImageWithFallbackProps extends Omit<ImageProps, 'src' | 'onError'> {
  src?: string | null;
  fallback?: string;
  className?: string;
  imgClassName?: string;
  containerClassName?: string;
}

export function ImageWithFallback({
  src,
  alt,
  fallback = '/images/placeholder-user.jpg',
  className,
  imgClassName,
  containerClassName,
  ...props
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState<string | StaticImageData | undefined>(
    src || fallback
  );
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    if (imgSrc !== fallback) {
      setImgSrc(fallback);
    }
  };

  if (!imgSrc) {
    return (
      <div className={cn('bg-muted flex items-center justify-center', containerClassName, className)}>
        <div className="h-full w-full bg-muted-foreground/20" />
      </div>
    );
  }

  return (
    <div className={cn('relative overflow-hidden', containerClassName)}>
      <Image
        {...props}
        src={imgSrc}
        alt={alt || 'Image'}
        className={cn(
          'object-cover transition-opacity duration-200',
          isLoading ? 'opacity-0' : 'opacity-100',
          imgClassName,
          className
        )}
        onError={handleError}
        onLoadingComplete={() => setIsLoading(false)}
      />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <div className="h-1/2 w-1/2 animate-pulse rounded-full bg-muted-foreground/20" />
        </div>
      )}
    </div>
  );
}
