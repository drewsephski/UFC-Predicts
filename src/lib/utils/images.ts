/**
 * Get a safe image URL with fallback
 * @param url The original image URL
 * @param type The type of fallback image to use
 * @returns A safe URL string
 */
export function getSafeImageUrl(
  url?: string | null,
  type: 'user' | 'fighter' | 'event' = 'user'
): string {
  if (!url) {
    // Return different placeholder based on type
    switch (type) {
      case 'fighter':
        return '/images/placeholder-fighter.svg';
      case 'event':
        return '/images/placeholder-event.svg';
      case 'user':
      default:
        return '/images/placeholder-user.svg';
    }
  }

  try {
    // Check if the URL is valid
    new URL(url);
    return url;
  } catch {
    // If URL is invalid, return fallback
    return `/images/placeholder-${type}.svg`;
  }
}

/**
 * Check if an image exists at the given URL
 * @param url The URL to check
 * @returns A promise that resolves to a boolean indicating if the image exists
 */
export async function checkImageExists(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    return false;
  }
}

/**
 * Get optimized image URL (useful for external image optimization)
 * @param url Original image URL
 * @param options Image optimization options
 * @returns Optimized image URL
 */
export function getOptimizedImageUrl(
  url: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'jpg' | 'png';
  } = {}
): string {
  if (!url) return '';
  
  const { width, height, quality = 80, format = 'webp' } = options;
  const params = new URLSearchParams();
  
  if (width) params.set('w', width.toString());
  if (height) params.set('h', height.toString());
  if (quality) params.set('q', quality.toString());
  if (format) params.set('fm', format);
  
  // If using an image optimization service, you would add the base URL here
  // For now, just return the original URL
  return url;
}
