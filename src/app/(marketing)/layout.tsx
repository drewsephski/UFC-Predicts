"use client";

import { Navbar, Footer } from "@/components";
import { useEnhancedSmoothScroll } from "@/hooks";
import { BackToTop } from "@/components/ui/back-to-top";
import { FloatingDock } from "@/components/magicui/dock";
import type { ReactNode } from 'react';

interface Props {
    children: ReactNode
}

const MarketingLayout = ({ children }: Props) => {
    // Initialize enhanced smooth scrolling with custom options
    useEnhancedSmoothScroll({
        offset: 80,
        duration: 600,
        easing: 'easeInOutQuad',
        updateURL: true
    });

    return (
        <>
            <div id="home" className="absolute inset-0 bg-[linear-gradient(to_right,rgba(120,0,0,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,0,0,0.2)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] h-full mt-[63px" />
            <Navbar />
            <main className="mx-auto w-full z-40 relative">
                {children}
            </main>
            <Footer />
            <BackToTop threshold={300} />
            <FloatingDock showLabels={false} />
        </>
    );
};

export default MarketingLayout
