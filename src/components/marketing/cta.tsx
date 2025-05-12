import Link from "next/link";
import Container from "../global/container";
import { Button } from "../ui/button";
import { Particles } from "../ui/particles";
import RetroGrid from "../ui/retro-grid";

const CTA = () => {
    return (
        <div id="cta" className="flex flex-col items-center justify-center py-12 md:py-16 lg:py-24 w-full relative">
            <Container>
                <div className="flex flex-col items-center justify-center text-center w-full px-4 md:px-0 mx-auto h-[500px] border border-red-500/30 rounded-3xl overflow-hidden relative">
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-12 bg-red-700 blur-[10rem]" />
                    <div className="flex flex-col items-center justify-center w-full z-20">
                        <h2 className="text-4xl md:text-6xl font-heading heading font-bold !leading-tight mt-6 text-red-500">
                            Become a UFC <br className="hidden md:block" /> Prediction Master
                        </h2>
                        <p className="text-base md:text-lg text-center text-gray-300 max-w-xl mx-auto mt-6">
                            Ready to elevate your UFC experience? Sign up now to access advanced fight predictions, fighter statistics, and expert analysis for all UFC events. <span className="hidden sm:inline">UFC Predict is your ultimate companion for analyzing fights, tracking fighter performance, and making informed betting decisions.</span>
                        </p>
                        <div className="flex flex-col md:flex-row items-center justify-center w-full gap-6 mt-6">
                            <Button asChild size="lg" className="w-full md:w-max bg-red-600 hover:bg-red-700 text-white">
                                <Link href="/auth/signup">
                                    Start Predicting
                                </Link>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="w-full md:w-max border-red-500/50 hover:bg-red-500/10 text-red-500 hover:text-red-400">
                                <Link href="/features">
                                    Learn More
                                </Link>
                            </Button>
                        </div>
                    </div>
                    <RetroGrid />
                    <Particles
                        refresh
                        ease={80}
                        color="#ff3333"
                        quantity={100}
                        className="size-full absolute inset-0"
                    />
                </div>
            </Container>
        </div>
    );
};

export default CTA;
