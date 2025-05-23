import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { BlurText } from "../ui/blur-text";
import { Button } from "../ui/button";
import Image from "next/image";
import Container from "../global/container";

interface HeroProps {
  onGetStarted?: () => void;
}

const Hero = ({ onGetStarted }: HeroProps) => {
    return (
        <div className="flex flex-col items-center text-center w-full max-w-5xl my-24 mx-auto z-40 relative">
            <Container delay={0.0}>
                <Link href="/events" className="pl-2 pr-1 py-1 rounded-full border border-red-500/30 hover:border-red-500/50 backdrop-blur-lg cursor-pointer flex items-center gap-2.5 select-none w-max mx-auto no-underline">
                    <div className="w-3.5 h-3.5 rounded-full bg-red-500/40 flex items-center justify-center relative">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/60 flex items-center justify-center animate-ping">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500/60 flex items-center justify-center animate-ping" />
                        </div>
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <span className="inline-flex items-center justify-center gap-2 animate-text-gradient animate-background-shine bg-gradient-to-r from-[#ff0000] via-[#ff4d4d] to-[#ff9999] bg-[200%_auto] bg-clip-text text-sm text-transparent">
                        UFC Fight Predictions
                        <span className="text-xs text-white px-1.5 py-0.5 rounded-full bg-gradient-to-b from-red-700 to-red-900 flex items-center justify-center">
                            Latest Events
                            <ArrowRightIcon className="w-3.5 h-3.5 ml-1 text-white/70" />
                        </span>
                    </span>
                </Link>
            </Container>
            <BlurText
                word={"UFC Fight Predictions &\n Analytics Platform"}
                className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl bg-gradient-to-br from-red-500 to-red-800 bg-clip-text text-transparent py-2 md:py-0 lg:!leading-snug font-bold racking-[-0.0125em] mt-6 font-heading"
            />
            <Container delay={0.1}>
                <p className="text-sm sm:text-base lg:text-lg mt-4 text-gray-300 max-w-2xl mx-auto">
                    Get data-driven UFC fight predictions and comprehensive fighter statistics. <span className="hidden sm:inline">UFC Predict is your ultimate companion for analyzing fights, tracking fighter performance, and making informed betting decisions.</span>
                </p>
            </Container>
            <Container delay={0.2}>
                <div className="flex items-center justify-center md:gap-x-6 mt-8">
                        <Button
                          asChild
                          size="lg"
                          className="bg-red-600 hover:bg-red-700 text-white"
                          onClick={onGetStarted}
                        >
                          <Link href="#features">
                            Get Started
                          </Link>
                        </Button>
                    <Button asChild size="lg" variant="outline" className="hidden md:flex border-red-500/50 hover:bg-red-500/10 text-red-500 hover:text-red-400">
                        <Link href="/compare">
                            Compare Fighters
                        </Link>
                    </Button>
                </div>
            </Container>
            <Container delay={0.3}>
                <div className="relative mx-auto max-w-7xl rounded-xl lg:rounded-[32px] border border-red-500/30 p-2 backdrop-blur-lg bg-neutral-900/70 md:p-4 mt-12">
                    <div className="absolute top-1/4 left-1/2 -z-10 gradient w-3/4 -translate-x-1/2 h-1/4 -translate-y-1/2 inset-0 blur-[10rem] bg-red-500/10" />

                    <div className="rounded-lg lg:rounded-[24px] border p-2 border-red-800/50 bg-black">
                        <Image
                            src="/images/ufc/ufc-octagon.svg"
                            alt="UFC Octagon with arena full of fans"
                            width={1920}
                            height={1080}
                            className="rounded-lg lg:rounded-[20px]"
                            priority
                        />
                    </div>
                </div>
            </Container>
        </div>
    )
};

export default Hero
