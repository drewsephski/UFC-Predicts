"use client";

import { cn } from "@/functions";
import { useClerk } from "@clerk/nextjs";
import { ArrowRightIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Icons from "../global/icons";
import Wrapper from "../global/wrapper";
import { Button } from "../ui/button";
import Menu from "./menu";
import MobileMenu from "./mobile-menu";
import { useEnhancedSmoothScroll } from "@/hooks";

const Navbar = () => {
  const { user } = useClerk();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Initialize enhanced smooth scrolling for navbar links
  const { scrollToElement } = useEnhancedSmoothScroll({
    offset: 80,
    duration: 600,
    easing: "easeOutQuad",
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="relative w-full h-full">
      <div className="z-[99] fixed pointer-events-none inset-x-0 h-[88px] bg-[rgba(10,10,10,0.8)] backdrop-blur-sm [mask:linear-gradient(to_bottom,#000_20%,transparent_calc(100%-20%))]" />

      <header
        className={cn(
          "fixed top-4 inset-x-0 mx-auto max-w-6xl px-2 md:px-12 z-[100] transform transition-all",
          isOpen ? "h-[calc(100%-24px)]" : "h-12"
        )}
      >
        <Wrapper className="backdrop-blur-lg rounded-xl lg:rounded-2xl border border-red-500/30 bg-black/70 md:px-2 flex items-center justify-center">
          <div className="flex items-center justify-between w-full sticky mt-[7px] lg:mt-auto mb-auto inset-x-0">
            {/* Logo - Now takes less space and is more compact */}
            <div className="flex items-center pl-1 lg:w-[20%]">
              <Link
                href="/"
                className="text-lg font-bold text-white flex items-center gap-x-1"
              >
                {Icons.icon && <Icons.icon className="w-auto h-5 text-red-500" />}
                <span className="font-extrabold tracking-tight whitespace-nowrap">
                  UFC<span className="text-red-500">Predict</span>
                </span>
              </Link>
            </div>

            {/* Navigation - Now left-aligned with equal spacing */}
            <div className="items-center hidden lg:flex justify-start lg:w-[70%]">
              <Menu />
            </div>

            {/* Action buttons - More compact layout */}
            <div className="items-center flex gap-x-2 lg:w-[10%] justify-end">
              {user ? (
                <Button
                  size="sm"
                  asChild
                  className="hidden sm:flex bg-red-600 hover:bg-red-700 text-white border-0"
                >
                  <Link href="/app">Dashboard</Link>
                </Button>
              ) : (
                <>
                  <Button
                    size="sm"
                    variant="outline"
                    asChild
                    className="hover:translate-y-0 hover:scale-100 border-red-500/50 hover:bg-red-500/10 text-red-400 hover:text-red-300"
                  >
                    <Link href="/auth/signin">Login</Link>
                  </Button>
                  <Button
                    size="sm"
                    asChild
                    className="hidden sm:flex bg-red-600 hover:bg-red-700 text-white border-0"
                  >
                    <Link href="/auth/signup">
                      Join UFC Predict
                      <ArrowRightIcon className="w-4 h-4 ml-2 hidden lg:block" />
                    </Link>
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    asChild
                    className="hidden lg:flex text-gray-300 hover:text-white hover:bg-red-950/20"
                    onClick={() => scrollToElement("signup")}
                  >
                    <Link href="/auth/signup">Get Started</Link>
                  </Button>
                </>
              )}
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsOpen((prev) => !prev)}
                className="lg:hidden p-2 w-8 h-8 text-gray-300 hover:text-white hover:bg-red-950/20"
              >
                {isOpen ? (
                  <XIcon className="w-4 h-4 duration-300 text-red-400" />
                ) : (
                  Icons.menu && <Icons.menu className="w-3.5 h-3.5 duration-300 text-red-400" />
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
