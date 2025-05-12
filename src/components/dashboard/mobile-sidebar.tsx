"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { SIDEBAR_LINKS } from "@/constants/links";
import { useClerk } from "@clerk/nextjs";
import { LogOutIcon, MenuIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileSidebar = () => {

    const { signOut } = useClerk();

    const pathname = usePathname();

    const handleLogout = async () => {
        await signOut();
    };

    return (
        <div className="flex lg:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="flex lg:hidden"
                    >
                        <MenuIcon className="size-5" />
                    </Button>
                </SheetTrigger>
                <SheetContent className="w-screen max-w-full bg-gradient-to-b from-black to-red-950/30 border-l border-red-500/30">
                    <div className="flex flex-col w-full mt-10 py-3 h-full">
                        <div className="flex items-center justify-center mb-6">
                            <span className="text-xl font-bold text-white">
                                UFC <span className="text-red-500">Predict</span>
                            </span>
                        </div>
                        <Button
                            variant="outline"
                            className="w-full justify-start gap-2 px-2 border-red-500/50 bg-black/50 hover:bg-red-950/30 text-gray-300"
                        >
                            <SearchIcon className="size-4 text-red-400" />
                            <span className="text-sm">
                                Search UFC Content...
                            </span>
                        </Button>
                        <ul className="w-full space-y-2 py-5">
                            {SIDEBAR_LINKS.map((link) => {

                                const isActive = pathname === link.href;

                                return (
                                    <li key={link.href} className="w-full">
                                        <Link
                                            href={link.href}
                                            className={buttonVariants({
                                                variant: "ghost",
                                                className: isActive
                                                    ? "bg-red-950/40 text-red-400 border-l-2 border-red-500 w-full !justify-start"
                                                    : "text-gray-300 hover:text-white hover:bg-red-950/20 w-full !justify-start",
                                            })}
                                        >
                                            <link.icon strokeWidth={2} className={`size-[18px] mr-1.5 ${isActive ? 'text-red-400' : 'text-gray-400'}`} />
                                            {link.label}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>

                        <div className="flex flex-col w-full mt-auto pb-4">
                            <Button
                                size="sm"
                                variant="ghost"
                                className="w-full justify-start gap-2 px-4 text-gray-300 hover:text-white hover:bg-red-950/20 border-t border-red-500/20"
                                onClick={handleLogout}
                            >
                                <LogOutIcon className="size-4 mr-1.5 text-red-400" />
                                Logout
                            </Button>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
};

export default MobileSidebar
