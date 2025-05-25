"use client";

import { cn } from "@/functions";
import { useClerk } from "@clerk/nextjs";
import { ArrowRightIcon, XIcon } from "lucide-react";
import { usePathname } from 'next/navigation';
import { useEffect, useState, useCallback } from "react";
import Icons from "../global/icons";
import Wrapper from "../global/wrapper";
import { Button } from "../ui/button";
import { CustomLink } from "../ui/custom-link";
import Menu from "./menu";
import MobileMenu from "./mobile-menu";
import { useEnhancedSmoothScroll } from "@/hooks";

const Navbar = () => {
  const { user } = useClerk();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Initialize enhanced smooth scrolling for navbar links
  const { scrollToElement } = useEnhancedSmoothScroll({
    offset: 80,
    duration: 600,
    easing: "easeOutQuad",
  });

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle body overflow when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prefetch dashboard route on hover
  const prefetchDashboard = useCallback(() => {
    if (user) {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = '/app';
      document.head.appendChild(link);
    }
  }, [user]);

  return (
    <div className="relative w-full h-full">
      <div className={cn(
        "z-[99] fixed pointer-events-none inset-x-0 h-[88px] bg-[rgba(10,10,10,0.8)] backdrop-blur-sm [mask:linear-gradient(to_bottom,#000_20%,transparent_calc(100%-20%))]",
        isScrolled ? 'opacity-100' : 'opacity-0 transition-opacity duration-300'
      )} />

      <header
        className={cn(
          "fixed top-4 inset-x-0 mx-auto max-w-6xl px-2 md:px-12 z-[100] transform transition-all duration-300",
          isOpen ? "h-[calc(100%-24px)]" : "h-12",
          isScrolled ? 'top-2' : 'top-4',
          isScrolled ? 'scale-[0.98]' : 'scale-100'
        )}
      >
        <Wrapper 
          className={cn(
            "backdrop-blur-lg rounded-xl lg:rounded-2xl border border-red-500/30 bg-black/70 md:px-2 flex items-center justify-center transition-all duration-300",
            isScrolled ? 'border-opacity-50' : 'border-opacity-30',
            isScrolled ? 'shadow-lg' : 'shadow-md'
          )}
        >
          <div className="flex items-center justify-between w-full sticky mt-[7px] lg:mt-auto mb-auto inset-x-0">
            {/* Logo */}
            <div className="flex items-center pl-1 lg:w-[20%]">
              <CustomLink
                href="/"
                className="text-lg font-bold text-white flex items-center gap-x-1 group"
                onMouseEnter={() => {
                  // Prefetch home page content on hover
                  const link = document.createElement('link');
                  link.rel = 'prefetch';
                  link.href = '/';
                  document.head.appendChild(link);
                }}
              >
                {Icons.icon && <Icons.icon className="w-auto h-5 text-red-500 transition-transform duration-300 group-hover:scale-110" />}
                <span className="font-extrabold tracking-tight whitespace-nowrap">
                  UFC<span className="text-red-500">Predict</span>
                </span>
              </CustomLink>
            </div>

            {/* Desktop Navigation */}
            <div className="items-center hidden lg:flex justify-start lg:w-[70%]">
              <Menu />
            </div>

            {/* Action Buttons */}
            <div className="items-center flex gap-x-2 lg:w-[10%] justify-end">
              {user ? (
                <Button
                  size="sm"
                  asChild
                  className="hidden sm:flex bg-red-600 hover:bg-red-700 text-white border-0 transition-all duration-200 hover:scale-[1.03] active:scale-95"
                  onMouseEnter={prefetchDashboard}
                >
                  <CustomLink href="/app">Dashboard</CustomLink>
                </Button>
              ) : (
                <>
                  <Button
                    size="sm"
                    variant="outline"
                    asChild
                    className="hover:translate-y-0 hover:scale-100 border-red-500/50 hover:bg-red-500/10 text-red-400 hover:text-red-300 transition-all duration-200 active:scale-95"
                  >
                    <CustomLink href="/auth/signin">Login</CustomLink>
                  </Button>
                  <Button
                    size="sm"
                    asChild
                    className="hidden sm:flex bg-red-600 hover:bg-red-700 text-white border-0 transition-all duration-200 hover:scale-[1.03] active:scale-95"
                  >
                    <CustomLink href="/auth/signup">
                      Join UFC Predict
                      <ArrowRightIcon className="w-4 h-4 ml-2 hidden lg:block transition-transform group-hover:translate-x-1" />
                    </CustomLink>
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    asChild
                    className="hidden lg:flex text-gray-300 hover:text-white hover:bg-red-950/20 transition-colors duration-200"
                  >
                    <CustomLink href="/auth/signup">Get Started</CustomLink>
                  </Button>
                </>
              )}
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsOpen((prev) => !prev)}
                className="lg:hidden p-2 w-8 h-8 text-gray-300 hover:text-white hover:bg-red-950/20 transition-colors duration-200"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
              >
                {isOpen ? (
                  <XIcon className="w-4 h-4 text-red-400 transition-transform duration-300" />
                ) : (
                  Icons.menu && <Icons.menu className="w-3.5 h-3.5 text-red-400 transition-transform duration-300" />
                )}
              </Button>
            </div>
          </div>
          <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
        </Wrapper>
      </header>
    </div>
  );
};

export default Navbar;
