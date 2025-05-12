"use client"

import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import {
  CalendarRange,
  Award,
  Users,
  TrendingUp,
  Dumbbell,
  Swords,
  Trophy,
  // Renamed to avoid shadowing global Map
  Map as MapIcon,
  Clock
} from 'lucide-react';
import Link from 'next/link';
import type React from 'react';
import Icons from "../global/icons";

interface Props {
    title: string;
    href: string;
    children: React.ReactNode;
    icon: React.ReactNode;
}

const Menu = () => {
    return (
        <NavigationMenu>
            <NavigationMenuList className="gap-x-4 items-center justify-start pl-4">
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-muted-foreground hover:text-foreground px-3 h-10 flex items-center">
                        About
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid rounded-3xl gap-3 p-4 md:w-[400px] lg:w-[500px] xl:w-[550px] lg:grid-cols-[.75fr_1fr]">
                            <li className="row-span-3">
                                <NavigationMenuLink asChild>
                                    <Link
                                        href="/"
                                        className="flex flex-col justify-end w-full h-full p-4 no-underline rounded-lg outline-none select-none bg-gradient-to-tr from-accent to-accent/50 focus:shadow-md"
                                    >
                                        {Icons.icon && <Icons.icon className="w-6 h-6" />}
                                        <div className="my-2 text-lg font-normal">
                                            UFC Predict
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            Data-driven fight predictions
                                        </p>
                                    </Link>
                                </NavigationMenuLink>
                            </li>
                            <Item title="Fight Predictions" href="/features/predictions" icon={<TrendingUp className="w-5 h-5" />}>
                                Data-driven fight outcome predictions.
                            </Item>
                            <Item title="Fighter Stats" href="/features/fighter-stats" icon={<Dumbbell className="w-5 h-5" />}>
                                Comprehensive fighter statistics and analysis.
                            </Item>
                            <Item title="Matchup Analysis" href="/features/matchup-analysis" icon={<Swords className="w-5 h-5" />}>
                                Head-to-head fighter comparison tools.
                            </Item>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-muted-foreground hover:text-foreground px-3 h-10 flex items-center">
                        Fighters
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[400px] md:grid-cols-2 lg:w-[500px] xl:w-[500px]">
                            <Item title="All Fighters" href="/fighters" icon={<Users className="w-5 h-5" />}>
                                Browse the complete UFC fighter roster.
                            </Item>
                            <Item title="Champions" href="/fighters/champions" icon={<Trophy className="w-5 h-5" />}>
                                Current UFC champions across all divisions.
                            </Item>
                            <Item title="By Division" href="/fighters/divisions" icon={<Dumbbell className="w-5 h-5" />}>
                                Browse fighters by weight division.
                            </Item>
                            <Item title="Fighter Search" href="/fighters/search" icon={<Swords className="w-5 h-5" />}>
                                Search for specific UFC fighters.
                            </Item>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-muted-foreground hover:text-foreground px-3 h-10 flex items-center">
                    Rankings
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[400px] md:grid-cols-2 lg:w-[500px] xl:w-[500px]">
                            <Item title="Pound for Pound" href="/rankings/pound-for-pound" icon={<Award className="w-5 h-5" />}>
                                The best fighters across all divisions.
                            </Item>
                            <Item title="Weight Divisions" href="/rankings/divisions" icon={<Users className="w-5 h-5" />}>
                                Rankings for all UFC weight classes.
                            </Item>
                            <Item title="Contender Series" href="/rankings/contenders" icon={<TrendingUp className="w-5 h-5" />}>
                                Up and coming UFC prospects.
                            </Item>
                            <Item title="Historical Rankings" href="/rankings/historical" icon={<CalendarRange className="w-5 h-5" />}>
                                Past UFC rankings and champions.
                            </Item>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-muted-foreground hover:text-foreground px-3 h-10 flex items-center">
                        Events
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[400px] md:grid-cols-2 lg:w-[500px] xl:w-[500px]">
                            <Item title="Upcoming Events" href="/events" icon={<Clock className="w-5 h-5" />}>
                                Schedule of upcoming UFC events.
                            </Item>
                            <Item title="Past Events" href="/events/past" icon={<CalendarRange className="w-5 h-5" />}>
                                Results from previous UFC events.
                            </Item>
                            <Item title="Pay-Per-View Events" href="/events/ppv" icon={<Trophy className="w-5 h-5" />}>
                                Major UFC pay-per-view events.
                            </Item>
                            <Item title="Fight Nights" href="/events/fight-nights" icon={<Swords className="w-5 h-5" />}>
                                UFC Fight Night events.
                            </Item>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>


            </NavigationMenuList>
        </NavigationMenu>
    )
};

const Item = ({ title, href, children, icon, ...props }: Props) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <Link
                    passHref
                    href={href}
                    {...props}
                    className="grid grid-cols-[.15fr_1fr] select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-accent/50 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group"
                >
                    <div className="flex items-center mt-1 justify-center p-1 w-8 h-8 rounded-md border border-border/80">
                        {icon}
                    </div>
                    <div className="text-start ml-3">
                        <span className="text-sm group-hover:text-foreground font-normal leading-none">
                            {title}
                        </span>
                        <p className="text-sm mt-0.5 line-clamp-2 text-muted-foreground">
                            {children}
                        </p>
                    </div>
                </Link>
            </NavigationMenuLink>
        </li>
    )
};

Item.displayName = "Item";

export default Menu
