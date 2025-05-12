import { Particles } from "@/components/ui/particles";
import { Button } from "@/components/ui/button";
import { Info, Users, Trophy, TrendingUp, BarChart3 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "About UFC Predict | UFC Predict",
  description: "Learn about UFC Predict, the premier platform for UFC fight predictions, fighter statistics, and MMA analytics.",
};

export default function AboutPage() {
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-black to-red-950/30">
      <div className="absolute inset-0 z-0">
        <Particles
          className="absolute inset-0 z-0"
          quantity={300}
          color="#ff3333"
          ease={100}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            About <span className="text-red-500">UFC Predict</span>
          </h1>
          <div className="flex items-center justify-center mb-4">
            <Info className="h-6 w-6 text-red-500 mr-2" />
            <p className="text-gray-300">The premier platform for UFC analytics and predictions</p>
          </div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            UFC Predict is a cutting-edge platform dedicated to providing MMA fans, analysts, and bettors
            with comprehensive UFC statistics, data-driven fight predictions, and in-depth fighter analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-black/30 border border-red-500/20 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-white">Our <span className="text-red-500">Mission</span></h2>
            <p className="text-gray-300 mb-4">
              Our mission is to enhance the UFC viewing experience by providing fans with data-driven insights
              and analysis that goes beyond traditional fight coverage. We aim to:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Deliver accurate, data-driven fight predictions</li>
              <li>Provide comprehensive fighter statistics and analysis</li>
              <li>Create an engaged community of MMA enthusiasts</li>
              <li>Offer educational content about fighting techniques and strategies</li>
              <li>Make advanced MMA analytics accessible to everyone</li>
            </ul>
          </div>

          <div className="bg-black/30 border border-red-500/20 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-white">Our <span className="text-red-500">Story</span></h2>
            <p className="text-gray-300 mb-4">
              UFC Predict was founded in 2023 by a team of passionate MMA fans with backgrounds in data science,
              sports analytics, and web development. Frustrated by the lack of sophisticated analytical tools
              for MMA, we set out to create a platform that combines cutting-edge technology with deep
              fight sport knowledge.
            </p>
            <p className="text-gray-300">
              What started as a simple prediction model has evolved into a comprehensive platform serving
              thousands of UFC fans worldwide. Our team continues to refine our algorithms and expand our
              features to provide the most accurate and insightful UFC analysis available.
            </p>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center text-white">
            What <span className="text-red-500">We Offer</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-black/30 border border-red-500/20 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <TrendingUp className="h-8 w-8 text-red-500 mr-3" />
                <h3 className="text-xl font-bold text-white">Fight Predictions</h3>
              </div>
              <p className="text-gray-300">
                Our AI-powered prediction model analyzes thousands of data points to forecast fight outcomes
                with impressive accuracy. We consider fighter statistics, matchup dynamics, and historical
                performance to provide reliable predictions.
              </p>
              <div className="mt-4">
                <Link href="/predictions">
                  <Button variant="link" className="text-red-400 hover:text-red-300 p-0">
                    View Predictions →
                  </Button>
                </Link>
              </div>
            </div>

            <div className="bg-black/30 border border-red-500/20 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Users className="h-8 w-8 text-red-500 mr-3" />
                <h3 className="text-xl font-bold text-white">Fighter Database</h3>
              </div>
              <p className="text-gray-300">
                Access comprehensive profiles for every UFC fighter, including detailed statistics,
                fight history, performance metrics, and career highlights. Our database is continuously
                updated after each UFC event.
              </p>
              <div className="mt-4">
                <Link href="/fighters">
                  <Button variant="link" className="text-red-400 hover:text-red-300 p-0">
                    Browse Fighters →
                  </Button>
                </Link>
              </div>
            </div>

            <div className="bg-black/30 border border-red-500/20 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <BarChart3 className="h-8 w-8 text-red-500 mr-3" />
                <h3 className="text-xl font-bold text-white">Advanced Analytics</h3>
              </div>
              <p className="text-gray-300">
                Dive deep into the numbers with our advanced analytics tools. Compare fighters, analyze
                fighting styles, and discover insights that aren&apos;t visible to the casual observer.
              </p>
              <div className="mt-4">
                <Link href="/analysis">
                  <Button variant="link" className="text-red-400 hover:text-red-300 p-0">
                    Explore Analytics →
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-black/30 border border-red-500/20 rounded-lg p-6 mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center text-white">
            Our <span className="text-red-500">Team</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-2 border-red-500">
                <Image
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="John Davis"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-white">John Davis</h3>
              <p className="text-red-400">Founder & CEO</p>
              <p className="text-gray-400 text-sm mt-2">
                Former MMA analyst with 10+ years of experience in sports data science.
              </p>
            </div>

            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-2 border-red-500">
                <Image
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="Sarah Chen"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-white">Sarah Chen</h3>
              <p className="text-red-400">Lead Data Scientist</p>
              <p className="text-gray-400 text-sm mt-2">
                PhD in Statistical Learning with expertise in predictive modeling.
              </p>
            </div>

            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-2 border-red-500">
                <Image
                  src="https://randomuser.me/api/portraits/men/75.jpg"
                  alt="Marcus Johnson"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-white">Marcus Johnson</h3>
              <p className="text-red-400">MMA Content Director</p>
              <p className="text-gray-400 text-sm mt-2">
                Former UFC fighter and coach with deep technical knowledge of the sport.
              </p>
            </div>

            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-2 border-red-500">
                <Image
                  src="https://randomuser.me/api/portraits/women/68.jpg"
                  alt="Elena Rodriguez"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-white">Elena Rodriguez</h3>
              <p className="text-red-400">Head of Product</p>
              <p className="text-gray-400 text-sm mt-2">
                Product leader with experience at major sports analytics platforms.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-black/30 border border-red-500/20 rounded-lg p-6 mb-12">
          <h2 className="text-2xl font-bold mb-4 text-center text-white">
            Join the <span className="text-red-500">UFC Predict</span> Community
          </h2>
          <p className="text-gray-300 text-center mb-6">
            Whether you&apos;re a casual UFC fan, a serious analyst, or a bettor looking for an edge,
            UFC Predict has something for you. Join our growing community today.
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              Sign Up for Free
            </Button>
            <Button variant="outline" className="border-red-500/50 hover:bg-red-500/10 text-red-400 hover:text-red-300">
              Explore Premium Features
            </Button>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-400 text-sm">
            UFC Predict is not affiliated with UFC®, Dana White, or Zuffa LLC. UFC® is a registered trademark of Zuffa LLC.
          </p>
        </div>
      </div>
    </div>
  );
}
