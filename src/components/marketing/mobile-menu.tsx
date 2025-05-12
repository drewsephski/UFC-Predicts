"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/functions";
import { useClickOutside } from "@/hooks";
import { motion } from "framer-motion";
import { Award, Dumbbell, FileText, HelpCircle, Shield, Swords, TrendingUp, Trophy, Users } from "lucide-react";
import Link from "next/link";
import type React from 'react';

interface Props {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileMenu = ({ isOpen, setIsOpen }: Props) => {

    const ref = useClickOutside(() => setIsOpen(false));

    const variants = {
        open: { opacity: 1, y: 20 },
        closed: { opacity: 0, y: 0 },
    };

    return (
        <div
            ref={ref}
            className={cn(
                "absolute top-12 inset-x-0 size-full p-4 z-20 bg-inherit flex flex-1",
                isOpen ? "flex" : "hidden"
            )}
        >
            <motion.div
                initial="closed"
                animate={isOpen ? "open" : "closed"}
                variants={variants}
                transition={{
                    type: "spring",
                    bounce: 0.15,
                    duration: 0.5,
                }}
                className="size-full flex flex-col justify-start"
            >

                <ul className="flex flex-col items-start flex-1 w-full space-y-4">
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-about" className="border-transparent">
                            <AccordionTrigger className="px-4 py-3 text-lg hover:text-muted-foreground font-normal">
                                <span className="flex items-center">
                                    <Shield className="w-4 h-4 mr-2" />
                                    About
                                </span>
                            </AccordionTrigger>
                            <AccordionContent onClick={() => setIsOpen(false)} className="flex flex-col items-start gap-2 mt-1">
                                <li
                                    onClick={() => setIsOpen(false)}
                                    onKeyDown={(e) => e.key === 'Enter' && setIsOpen(false)}
                                    className="w-full px-4 py-3 text-lg font-normal transition transform rounded-md cursor-pointer text-foreground/80 hover:text-muted-foreground text-start active:scale-95 hover:bg-muted/20 active:opacity-80"
                                >
                                    <Link href="/features/predictions" className="flex items-center w-full text-start">
                                        <TrendingUp className="w-4 h-4 mr-2" />
                                        Fight Predictions
                                    </Link>
                                </li>
                                <li
                                    onClick={() => setIsOpen(false)}
                                    onKeyDown={(e) => e.key === 'Enter' && setIsOpen(false)}
                                    className="w-full px-4 py-3 text-lg font-normal transition transform rounded-md cursor-pointer text-foreground/80 hover:text-muted-foreground text-start active:scale-95 hover:bg-muted/20 active:opacity-80"
                                >
                                    <Link href="/features/fighter-stats" className="flex items-center w-full text-start">
                                        <Dumbbell className="w-4 h-4 mr-2" />
                                        Fighter Statistics
                                    </Link>
                                </li>
                                <li
                                    onClick={() => setIsOpen(false)}
                                    onKeyDown={(e) => e.key === 'Enter' && setIsOpen(false)}
                                    className="w-full px-4 py-3 text-lg font-normal transition transform rounded-md cursor-pointer text-foreground/80 hover:text-muted-foreground text-start active:scale-95 hover:bg-muted/20 active:opacity-80"
                                >
                                    <Link href="/features/matchup-analysis" className="flex items-center w-full text-start">
                                        <Swords className="w-4 h-4 mr-2" />
                                        Matchup Analysis
                                    </Link>
                                </li>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>


                    <li
                        onClick={() => setIsOpen(false)}
                        onKeyDown={(e) => e.key === 'Enter' && setIsOpen(false)}
                        className="w-full px-4 py-3 text-lg hover:text-muted-foreground font-normal transition transform rounded-md cursor-pointer text-foreground text-start active:scale-95 hover:bg-muted/20 active:opacity-80"
                    >
                        <Link href="/fighters" className="flex items-center w-full text-start">
                            <Users className="w-4 h-4 mr-2" />
                            Fighters
                        </Link>
                    </li>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-rankings" className="border-transparent">
                            <AccordionTrigger className="px-4 py-3 text-lg hover:text-muted-foreground font-normal">
                                <span className="flex items-center">
                                    <Trophy className="w-4 h-4 mr-2" />
                                    Rankings
                                </span>
                            </AccordionTrigger>
                            <AccordionContent onClick={() => setIsOpen(false)} className="flex flex-col items-start gap-2 mt-1">
                                <li
                                    onClick={() => setIsOpen(false)}
                                    onKeyDown={(e) => e.key === 'Enter' && setIsOpen(false)}
                                    className="w-full px-4 py-3 text-lg font-normal transition transform rounded-md cursor-pointer text-foreground/80 hover:text-muted-foreground text-start active:scale-95 hover:bg-muted/20 active:opacity-80"
                                >
                                    <Link href="/rankings/pound-for-pound" className="flex items-center w-full text-start">
                                        <Award className="w-4 h-4 mr-2" />
                                        Pound for Pound
                                    </Link>
                                </li>
                                <li
                                    onClick={() => setIsOpen(false)}
                                    onKeyDown={(e) => e.key === 'Enter' && setIsOpen(false)}
                                    className="w-full px-4 py-3 text-lg font-normal transition transform rounded-md cursor-pointer text-foreground/80 hover:text-muted-foreground text-start active:scale-95 hover:bg-muted/20 active:opacity-80"
                                >
                                    <Link href="/rankings/divisions" className="flex items-center w-full text-start">
                                        <Users className="w-4 h-4 mr-2" />
                                        Weight Divisions
                                    </Link>
                                </li>
                                <li
                                    onClick={() => setIsOpen(false)}
                                    onKeyDown={(e) => e.key === 'Enter' && setIsOpen(false)}
                                    className="w-full px-4 py-3 text-lg font-normal transition transform rounded-md cursor-pointer text-foreground/80 hover:text-muted-foreground text-start active:scale-95 hover:bg-muted/20 active:opacity-80"
                                >
                                    <Link href="/rankings/historical" className="flex items-center w-full text-start">
                                        <FileText className="w-4 h-4 mr-2" />
                                        Historical Rankings
                                    </Link>
                                </li>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    <li
                        onClick={() => setIsOpen(false)}
                        onKeyDown={(e) => e.key === 'Enter' && setIsOpen(false)}
                        className="w-full px-4 py-3 text-lg hover:text-muted-foreground font-normal transition transform rounded-md cursor-pointer text-foreground text-start active:scale-95 hover:bg-muted/20 active:opacity-80"
                    >
                        <Link href="/compare" className="flex items-center w-full text-start">
                            <Swords className="w-4 h-4 mr-2" />
                            Compare Fighters
                        </Link>
                    </li>

                    <li
                        onClick={() => setIsOpen(false)}
                        onKeyDown={(e) => e.key === 'Enter' && setIsOpen(false)}
                        className="w-full px-4 py-3 text-lg hover:text-muted-foreground font-normal transition transform rounded-md cursor-pointer text-foreground text-start active:scale-95 hover:bg-muted/20 active:opacity-80"
                    >
                        <Link href="/faq" className="flex items-center w-full text-start">
                            <HelpCircle className="w-4 h-4 mr-2" />
                            FAQ
                        </Link>
                    </li>
                </ul>
            </motion.div>
        </div>
    )
};

export default MobileMenu
