'use client';

import { Companies, Connect, Container, CTA, Features, Hero, Perks, Pricing, Reviews, Wrapper } from "@/components";
import Background from "@/components/global/background";
import { Spotlight } from "@/components/ui/spotlight";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useCallback } from "react";
import { useEnhancedSmoothScroll } from "@/hooks";

const HomePage = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Enhanced smooth scrolling
  const { scrollToElement, registerSection } = useEnhancedSmoothScroll({
    offset: 80,
    duration: 1000,
    easing: "easeOutCubic",
  });

  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Register sections for intersection observer
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
      registerSection(section as HTMLElement);
    });
  }, [registerSection]);

  // Scroll to top on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, []);

  // Handle smooth scroll to section
  const handleGetStarted = useCallback(() => {
    scrollToElement('features');
  }, [scrollToElement]);

  return (
    <Background ref={containerRef}>
      <Wrapper className="py-20 relative overflow-hidden">
        {/* Animated background elements */}
        <motion.div 
          className="absolute inset-0 -z-10 opacity-10 pointer-events-none"
          style={{ y: y1 }}
        >
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
          <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
        </motion.div>

        <Container className="relative">
          <motion.div 
            className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full filter blur-3xl pointer-events-none"
            style={{ y: y2 }}
          />
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="rgba(255, 255, 255, 0.5)"
          />
          <section id="home" className="scroll-mt-20">
            <Hero onGetStarted={handleGetStarted} />
          </section>
        </Container>

        <Container className="py-8 lg:py-20">
          <section id="companies" className="scroll-mt-20">
            <Companies />
          </section>
        </Container>

        <section id="connect" className="scroll-mt-20">
          <Connect />
        </section>

        <section id="features" className="relative py-20 scroll-mt-20">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/50 to-background" />
          <Features />
        </section>

        <section id="perks" className="relative py-20 scroll-mt-20">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/50 via-background to-background/50" />
          <Perks />
        </section>

        <section id="pricing" className="relative py-20 scroll-mt-20">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/50 to-background" />
          <Pricing />
        </section>

        <section id="reviews" className="relative py-20 scroll-mt-20">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/50 via-background to-background/50" />
          <Reviews />
        </section>

        <section id="cta" className="relative scroll-mt-20">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/50 to-background" />
          <CTA />
        </section>

        {/* Scroll progress indicator */}
        <motion.div 
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500 origin-left z-50 pointer-events-none"
          style={{ scaleX: scrollYProgress }}
        />
      </Wrapper>
    </Background>
  );
};

export default HomePage;
