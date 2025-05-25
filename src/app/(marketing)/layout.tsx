"use client";

import { Navbar, Footer } from "@/components";
import { useEnhancedSmoothScroll } from "@/hooks";
import { BackToTop } from "@/components/ui/back-to-top";
import { FloatingDock } from "@/components/magicui/dock";
import { RouteTransition } from "@/components/ui/route-transition";
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

const MarketingLayout = ({ children }: Props) => {
    const pathname = usePathname();
    
    // Initialize enhanced smooth scrolling with custom options
    useEnhancedSmoothScroll({
        offset: 80,
        duration: 600,
        easing: 'easeInOutQuad',
        updateURL: true
    });

    // Prefetch main navigation routes on initial load
    useEffect(() => {
        const prefetchRoutes = [
            '/fighters',
            '/events',
            '/rankings',
            '/features/predictions',
            '/auth/signin',
            '/auth/signup'
        ];

        prefetchRoutes.forEach(route => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = route;
            document.head.appendChild(link);
        });

        // Clean up function
        return () => {
            // Cleanup if needed
        };
    }, []);

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className="relative min-h-screen flex flex-col">
            <div id="home" className="fixed inset-0 -z-10 bg-[linear-gradient(to_right,rgba(120,0,0,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,0,0,0.2)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] h-full mt-[63px]" />
            
            <Navbar />
            
            <main className="flex-1 z-40 relative">
                <RouteTransition>
                    {children}
                </RouteTransition>
            </main>
            
            <Footer />
            <BackToTop threshold={300} />
            <FloatingDock showLabels={false} />
        </div>
    );
};

export default MarketingLayout;
