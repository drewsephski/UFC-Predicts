"use client";

import type React from "react"
import { ClerkProvider } from "@clerk/nextjs"
import { ThemeProvider } from "next-themes"
import { UFCProvider } from "@/contexts/ufc-context"

interface Props {
    children: React.ReactNode;
}

const Providers = ({ children }: Props) => {
    return (
        <ClerkProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
            >
                <UFCProvider>
                    {children}
                </UFCProvider>
            </ThemeProvider>
        </ClerkProvider>
    );
};

export default Providers
