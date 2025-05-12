"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Particles } from "@/components/ui/particles";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to sign-up page immediately
    router.push("/auth/signup");

    // Show toast notification
    const toastTimeout = setTimeout(() => {
      // This would be handled by the toast system, but we're simulating it with a redirect
      console.log("Page not found. Redirecting to signup...");
    }, 100);

    return () => clearTimeout(toastTimeout);
  }, [router]);

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-b from-black to-red-950/30">
      <div className="absolute inset-0 z-0">
        <Particles
          className="absolute inset-0 z-0"
          quantity={300}
          color="#ff3333"
          ease={100}
        />
      </div>

      <div className="relative z-10 text-center px-4">
        <h1 className="text-6xl md:text-8xl font-bold mb-4 text-white">
          4<span className="text-red-500">0</span>4
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
          Page Not <span className="text-red-500">Found</span>
        </h2>
        <p className="text-gray-300 max-w-md mx-auto mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          You&apos;ll be redirected to sign up for UFC Predict in a few seconds...
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <Button asChild className="bg-red-600 hover:bg-red-700 text-white">
            <Link href="/auth/signup">
              Sign Up Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-red-500/50 hover:bg-red-500/10 text-red-400 hover:text-red-300">
            <Link href="/">
              Return Home
            </Link>
          </Button>
        </div>

        <div className="w-64 h-1 mx-auto bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-red-500 animate-progress-bar" />
        </div>

        <div className="mt-8 bg-black/30 border border-red-500/20 rounded-lg p-4 max-w-md mx-auto">
          <h3 className="text-lg font-bold mb-2 text-white">
            Join <span className="text-red-500">UFC Predict</span> Today
          </h3>
          <p className="text-gray-300 text-sm">
            Get access to exclusive UFC content, including fight predictions, fighter statistics,
            matchup analysis, and more!
          </p>
        </div>
      </div>
    </div>
  );
}
