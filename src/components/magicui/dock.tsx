"use client";

import { cva, type VariantProps } from "class-variance-authority";
import {
  motion,
  MotionProps,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import React, { PropsWithChildren, useRef, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/functions";
import {
  Dumbbell,
  CalendarRange,
  TrendingUp,
  Trophy,
  Swords,
  BarChart3,
  Home,
  Users,
  MessageSquare,
  Menu,
  LucideIcon
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface DockProps extends VariantProps<typeof dockVariants> {
  className?: string;
  iconSize?: number;
  iconMagnification?: number;
  iconDistance?: number;
  direction?: "top" | "middle" | "bottom";
  children?: React.ReactNode;
  showLabels?: boolean;
}

const DEFAULT_SIZE = 40;
const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 140;

const dockVariants = cva(
  "fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center gap-1 sm:gap-2 p-2 backdrop-blur-md bg-black/80 border-t border-red-500/30 transition-all duration-300",
);

// Navigation items for the dock
export const DOCK_ITEMS = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/fighters", icon: Dumbbell, label: "Fighters" },
  { href: "/events", icon: CalendarRange, label: "Events" },
  { href: "/predictions", icon: TrendingUp, label: "Predictions" },
  { href: "/rankings", icon: Trophy, label: "Rankings" },
  { href: "/compare", icon: Swords, label: "Compare" },
  { href: "/statistics", icon: BarChart3, label: "Stats" },
  { href: "/community", icon: MessageSquare, label: "Community" },
];

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      className,
      children,
      iconSize = DEFAULT_SIZE,
      iconMagnification = DEFAULT_MAGNIFICATION,
      iconDistance = DEFAULT_DISTANCE,
      direction = "middle",
      showLabels = false,
      ...props
    },
    ref,
  ) => {
    const mouseX = useMotionValue(Infinity);
    const pathname = usePathname();
    const [isMobile, setIsMobile] = useState(false);

    // Check if we're on mobile for responsive adjustments
    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 640);
      };

      checkMobile();
      window.addEventListener('resize', checkMobile);

      return () => {
        window.removeEventListener('resize', checkMobile);
      };
    }, []);

    // Adjust icon size for mobile
    const responsiveIconSize = isMobile ? 32 : iconSize;
    const responsiveMagnification = isMobile ? 44 : iconMagnification;

    return (
      <TooltipProvider>
        <motion.div
          ref={ref}
          onMouseMove={(e) => mouseX.set(e.pageX)}
          onMouseLeave={() => mouseX.set(Infinity)}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          {...props}
          className={cn(dockVariants({ className }), {
            "items-start": direction === "top",
            "items-center": direction === "middle",
            "items-end": direction === "bottom",
            "h-16": !showLabels,
            "h-20": showLabels,
          })}
        >
          {DOCK_ITEMS.map((item) => (
            <DockIcon
              key={item.label}
              mouseX={mouseX}
              size={responsiveIconSize}
              magnification={responsiveMagnification}
              distance={iconDistance}
              isActive={pathname === item.href}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex flex-col items-center justify-center transition-colors duration-200",
                      pathname === item.href
                        ? "text-red-500"
                        : "text-gray-400 hover:text-white"
                    )}
                    aria-label={item.label}
                    aria-current={pathname === item.href ? "page" : undefined}
                  >
                    <item.icon className="size-5" />
                    {showLabels && (
                      <span className="text-xs mt-1 font-medium">{item.label}</span>
                    )}
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-black border-red-500/50 text-white">
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}

          {/* Mobile menu button for additional options */}
          {isMobile && (
            <DockIcon
              mouseX={mouseX}
              size={responsiveIconSize}
              magnification={responsiveMagnification}
              distance={iconDistance}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-white flex flex-col items-center justify-center"
                    aria-label="More options"
                  >
                    <Menu className="size-5" />
                    {showLabels && (
                      <span className="text-xs mt-1 font-medium">More</span>
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-black border-red-500/50 text-white">
                  <p>More options</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          )}

          {children}
        </motion.div>
      </TooltipProvider>
    );
  },
);

Dock.displayName = "Dock";

export interface DockIconProps
  extends Omit<MotionProps & React.HTMLAttributes<HTMLDivElement>, "children"> {
  size?: number;
  magnification?: number;
  distance?: number;
  mouseX?: MotionValue<number>;
  className?: string;
  children?: React.ReactNode;
  props?: PropsWithChildren;
  isActive?: boolean;
}

const DockIcon = ({
  size = DEFAULT_SIZE,
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  mouseX,
  className,
  children,
  isActive,
  ...props
}: DockIconProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const padding = Math.max(4, size * 0.1);
  const defaultMouseX = useMotionValue(Infinity);

  const distanceCalc = useTransform(mouseX ?? defaultMouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const sizeTransform = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [size, magnification, size],
  );

  const scaleSize = useSpring(sizeTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      ref={ref}
      style={{ width: scaleSize, height: scaleSize, padding }}
      className={cn(
        "flex aspect-square cursor-pointer items-center justify-center rounded-full transition-colors duration-200",
        isActive ? "bg-red-950/40 hover:bg-red-950/60" : "hover:bg-gray-800/40",
        className,
      )}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

DockIcon.displayName = "DockIcon";

// Floating Dock component that can be used directly
export const FloatingDock = ({ showLabels = false }: { showLabels?: boolean }) => {
  return (
    <Dock
      showLabels={showLabels}
      className="pb-safe" // For iOS safe area
    />
  );
};

export { Dock, DockIcon, dockVariants };
