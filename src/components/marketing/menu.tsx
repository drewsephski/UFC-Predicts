"use client";

import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import {
  CalendarRange,
  Award,
  Users,
  TrendingUp,
  Dumbbell,
  Swords,
  Trophy,
  Clock
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useCallback } from 'react';
import Icons from "../global/icons";
import { CustomLink } from "../ui/custom-link";

interface MenuItemProps {
    title: string;
    href: string;
    children: React.ReactNode;
    icon: React.ReactNode;
    prefetch?: boolean;
}

const Menu = () => {
    const pathname = usePathname();
    const isActive = useCallback((href: string) => pathname === href, [pathname]);

    // Prefetch menu items on hover
    const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLElement>) => {
        const target = e.currentTarget as HTMLElement;
        const link = target.getAttribute('data-href');
        if (link) {
            const prefetchLink = document.createElement('link');
            prefetchLink.rel = 'prefetch';
            prefetchLink.href = link;
            document.head.appendChild(prefetchLink);
        }
    }, []);

    return (
        <NavigationMenu>
            <NavigationMenuList className="gap-x-2 items-center justify-start pl-4">
                {/* About Menu */}
                <NavigationMenuItem 
                    onMouseEnter={handleMouseEnter}
                    data-href="/"
                >
                    <NavigationMenuTrigger 
                        className={cn(
                            "px-3 h-10 flex items-center transition-colors duration-200",
                            isActive('/') 
                                ? "text-foreground font-medium" 
                                : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        About
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="rounded-2xl overflow-hidden border border-border/50 bg-background/95 backdrop-blur-sm">
                        <ul className="grid rounded-2xl gap-2 p-4 md:w-[400px] lg:w-[500px] xl:w-[550px] lg:grid-cols-[.75fr_1fr]">
                            <li className="row-span-3">
                                <NavigationMenuLink asChild>
                                    <CustomLink
                                        href="/"
                                        className="flex flex-col justify-end w-full h-full p-4 no-underline rounded-lg outline-none select-none bg-gradient-to-tr from-accent/20 to-accent/10 hover:from-accent/30 hover:to-accent/20 transition-colors duration-200 focus:shadow-md"
                                        prefetch={false}
                                    >
                                        {Icons.icon && <Icons.icon className="w-6 h-6 text-foreground" />}
                                        <div className="my-2 text-lg font-medium text-foreground">
                                            UFC Predict
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            Data-driven fight predictions
                                        </p>
                                    </CustomLink>
                                </NavigationMenuLink>
                            </li>
                            <Item 
                                title="Fight Predictions" 
                                href="/features/predictions" 
                                icon={<TrendingUp className="w-5 h-5" />}
                                isActive={isActive('/features/predictions')}
                            >
                                Data-driven fight outcome predictions.
                            </Item>
                            <Item 
                                title="Fighter Stats" 
                                href="/features/fighter-stats" 
                                icon={<Dumbbell className="w-5 h-5" />}
                                isActive={isActive('/features/fighter-stats')}
                            >
                                Comprehensive fighter statistics and analysis.
                            </Item>
                            <Item 
                                title="Matchup Analysis" 
                                href="/features/matchup-analysis" 
                                icon={<Swords className="w-5 h-5" />}
                                isActive={isActive('/features/matchup-analysis')}
                            >
                                Head-to-head fighter comparison tools.
                            </Item>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Fighters Menu */}
                <NavigationMenuItem 
                    onMouseEnter={handleMouseEnter}
                    data-href="/fighters"
                >
                    <NavigationMenuTrigger 
                        className={cn(
                            "px-3 h-10 flex items-center transition-colors duration-200",
                            pathname.startsWith('/fighters')
                                ? "text-foreground font-medium" 
                                : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        Fighters
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="rounded-2xl overflow-hidden border border-border/50 bg-background/95 backdrop-blur-sm">
                        <ul className="grid w-[400px] gap-2 p-4 md:grid-cols-2">
                            <Item 
                                title="All Fighters" 
                                href="/fighters" 
                                icon={<Users className="w-5 h-5" />}
                                isActive={isActive('/fighters')}
                            >
                                Browse the complete UFC fighter roster.
                            </Item>
                            <Item 
                                title="Champions" 
                                href="/fighters/champions" 
                                icon={<Trophy className="w-5 h-5" />}
                                isActive={isActive('/fighters/champions')}
                            >
                                Current UFC champions across all divisions.
                            </Item>
                            <Item 
                                title="By Division" 
                                href="/fighters/divisions" 
                                icon={<Dumbbell className="w-5 h-5" />}
                                isActive={isActive('/fighters/divisions')}
                            >
                                Browse fighters by weight division.
                            </Item>
                            <Item 
                                title="Fighter Search" 
                                href="/fighters/search" 
                                icon={<Swords className="w-5 h-5" />}
                                isActive={isActive('/fighters/search')}
                            >
                                Search for specific UFC fighters.
                            </Item>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Rankings Menu */}
                <NavigationMenuItem 
                    onMouseEnter={handleMouseEnter}
                    data-href="/rankings"
                >
                    <NavigationMenuTrigger 
                        className={cn(
                            "px-3 h-10 flex items-center transition-colors duration-200",
                            pathname.startsWith('/rankings')
                                ? "text-foreground font-medium" 
                                : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        Rankings
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="rounded-2xl overflow-hidden border border-border/50 bg-background/95 backdrop-blur-sm">
                        <ul className="grid w-[400px] gap-2 p-4 md:grid-cols-2">
                            <Item 
                                title="Pound for Pound" 
                                href="/rankings/pound-for-pound" 
                                icon={<Award className="w-5 h-5" />}
                                isActive={isActive('/rankings/pound-for-pound')}
                            >
                                The best fighters across all divisions.
                            </Item>
                            <Item 
                                title="Weight Divisions" 
                                href="/rankings/divisions" 
                                icon={<Users className="w-5 h-5" />}
                                isActive={isActive('/rankings/divisions')}
                            >
                                Rankings for all UFC weight classes.
                            </Item>
                            <Item 
                                title="Contender Series" 
                                href="/rankings/contenders" 
                                icon={<TrendingUp className="w-5 h-5" />}
                                isActive={isActive('/rankings/contenders')}
                            >
                                Up and coming UFC prospects.
                            </Item>
                            <Item 
                                title="Historical Rankings" 
                                href="/rankings/historical" 
                                icon={<CalendarRange className="w-5 h-5" />}
                                isActive={isActive('/rankings/historical')}
                            >
                                Past UFC rankings and champions.
                            </Item>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Events Menu */}
                <NavigationMenuItem 
                    onMouseEnter={handleMouseEnter}
                    data-href="/events"
                >
                    <NavigationMenuTrigger 
                        className={cn(
                            "px-3 h-10 flex items-center transition-colors duration-200",
                            pathname.startsWith('/events')
                                ? "text-foreground font-medium" 
                                : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        Events
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="rounded-2xl overflow-hidden border border-border/50 bg-background/95 backdrop-blur-sm">
                        <ul className="grid w-[400px] gap-2 p-4 md:grid-cols-2">
                            <Item 
                                title="Upcoming Events" 
                                href="/events" 
                                icon={<Clock className="w-5 h-5" />}
                                isActive={isActive('/events')}
                            >
                                Schedule of upcoming UFC events.
                            </Item>
                            <Item 
                                title="Past Events" 
                                href="/events/past" 
                                icon={<CalendarRange className="w-5 h-5" />}
                                isActive={isActive('/events/past')}
                            >
                                Results from previous UFC events.
                            </Item>
                            <Item 
                                title="Pay-Per-View Events" 
                                href="/events/ppv" 
                                icon={<Trophy className="w-5 h-5" />}
                                isActive={isActive('/events/ppv')}
                            >
                                Major UFC pay-per-view events.
                            </Item>
                            <Item 
                                title="Fight Nights" 
                                href="/events/fight-nights" 
                                icon={<Swords className="w-5 h-5" />}
                                isActive={isActive('/events/fight-nights')}
                            >
                                UFC Fight Night events.
                            </Item>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
};

const Item = ({ 
    title, 
    href, 
    children, 
    icon, 
    isActive = false,
    prefetch = true,
    ...props 
}: MenuItemProps & { isActive?: boolean }) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <CustomLink
                    href={href}
                    prefetch={prefetch}
                    className={cn(
                        "grid grid-cols-[auto_1fr] select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-all duration-200",
                        isActive 
                            ? "bg-accent/30 text-foreground" 
                            : "hover:bg-accent/20 hover:text-foreground focus:bg-accent/20 focus:text-foreground"
                    )}
                    {...props}
                >
                    <div className="flex items-center justify-center p-1 w-8 h-8 rounded-md border border-border/50 mr-3 bg-background/50">
                        {icon}
                    </div>
                    <div className="flex-1">
                        <span className="text-sm font-medium leading-none">
                            {title}
                        </span>
                        <p className="text-xs mt-1 line-clamp-2 text-muted-foreground">
                            {children}
                        </p>
                    </div>
                </CustomLink>
            </NavigationMenuLink>
        </li>
    );
};

// Helper function to merge class names
function cn(...classes: (string | undefined)[]) {
    return classes.filter(Boolean).join(' ');
}

export default Menu;
