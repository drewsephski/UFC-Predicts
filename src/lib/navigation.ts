import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useTransition } from 'react';

type NavigationOptions = {
  scroll?: boolean;
  replace?: boolean;
  shallow?: boolean;
  prefetch?: boolean;
};

export function useNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const navigate = useCallback(
    (href: string, options: NavigationOptions = {}) => {
      const { scroll = true, replace = false, shallow = true, prefetch = true } = options;
      
      if (prefetch) {
        // Prefetch the route for better performance
        router.prefetch(href);
      }

      startTransition(() => {
        if (replace) {
          router.replace(href, { scroll });
        } else {
          router.push(href, { scroll });
        }
      });
    },
    [router]
  );

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  return {
    navigate,
    isPending,
    pathname,
    searchParams,
    createQueryString,
  };
}

export function prefetchRoute(href: string) {
  if (typeof window !== 'undefined') {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    document.head.appendChild(link);
  }
}
