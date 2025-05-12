"use client";

import MobileSidebar from "@/components/dashboard/mobile-sidebar";
import Icons from "@/components/global/icons";
import { HelpCircleIcon, SearchIcon, UserIcon, ZapIcon } from "lucide-react";
import Link from "next/link";
import Container from "../global/container";
import { Button } from "../ui/button";

const DashboardNavbar = () => {

    return (
        <header id="dashboard-navbar" className="fixed top-0 inset-x-0 w-full h-16 bg-black/80 backdrop-blur-md border-b border-red-500/30 px-4 z-50">
            <Container className="flex items-center justify-between size-full">
                <div className="flex items-center">
                    <Link href="/app" className="flex items-center gap-x-1.5">
                        {Icons.icon && <Icons.icon className="w-6 text-red-500" />}
                        <span className="text-lg font-bold text-white whitespace-nowrap">
                            UFC<span className="text-red-500">Predict</span>
                        </span>
                    </Link>
                </div>

                {/* Center navigation for desktop */}
                <div className="hidden md:flex items-center gap-x-0.5 absolute left-1/2 transform -translate-x-1/2">
                    <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="text-gray-300 hover:text-white hover:bg-red-950/20"
                    >
                        <Link href="/app/fighters">
                            Fighters
                        </Link>
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="text-gray-300 hover:text-white hover:bg-red-950/20"
                    >
                        <Link href="/app/predictions">
                            Predictions
                        </Link>
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="text-gray-300 hover:text-white hover:bg-red-950/20"
                    >
                        <Link href="/app/rankings">
                            Rankings
                        </Link>
                    </Button>

                </div>

                <div className="flex items-center gap-x-1.5">
                    <Button
                        size="icon"
                        variant="ghost"
                        className="text-gray-300 hover:text-white hover:bg-red-950/20"
                    >
                        <SearchIcon className="size-5" />
                    </Button>
                    <Button
                        size="sm"
                        variant="outline"
                        asChild
                        className="border-red-500/50 hover:bg-red-500/10 text-red-400 hover:text-red-300"
                    >
                        <Link href="/pricing">
                            <ZapIcon className="size-4 mr-1.5 text-red-500" />
                            Premium
                        </Link>
                    </Button>
                    <Button
                        asChild
                        size="icon"
                        variant="ghost"
                        className="hidden lg:flex text-gray-300 hover:text-white hover:bg-red-950/20"
                    >
                        <Link href="/app/profile">
                            <UserIcon className="size-5" />
                        </Link>
                    </Button>
                    <Button
                        asChild
                        size="icon"
                        variant="ghost"
                        className="hidden lg:flex text-gray-300 hover:text-white hover:bg-red-950/20"
                    >
                        <Link href="/help">
                            <HelpCircleIcon className="size-5" />
                        </Link>
                    </Button>
                    <MobileSidebar />
                </div>
            </Container>
        </header>
    )
};

export default DashboardNavbar
