import { Particles } from "@/components/ui/particles";
import { Button } from "@/components/ui/button";
import { HelpCircle, Search, MessageSquare } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata = {
  title: "Frequently Asked Questions | UFC Predict",
  description: "Find answers to common questions about UFC Predict, our prediction system, membership plans, and more.",
};

export default function FAQPage() {
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
            Frequently Asked <span className="text-red-500">Questions</span>
          </h1>
          <div className="flex items-center justify-center mb-4">
            <HelpCircle className="h-6 w-6 text-red-500 mr-2" />
            <p className="text-gray-300">Find answers to common questions about UFC Predict</p>
          </div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Browse our comprehensive FAQ section to find answers to common questions about 
            UFC Predict, our prediction system, membership plans, and more. If you can&apos;t 
            find what you&apos;re looking for, feel free to contact our support team.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search FAQ..." 
              className="pl-10 bg-black/50 border-red-500/30 text-white placeholder:text-gray-400 focus-visible:ring-red-500"
            />
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-b border-red-500/20">
              <AccordionTrigger className="text-white hover:text-red-400 py-4">
                What is UFC Predict?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                UFC Predict is a comprehensive platform for UFC fans, analysts, and bettors. We provide 
                data-driven fight predictions, detailed fighter statistics, matchup analysis, and a 
                community forum for MMA enthusiasts. Our platform uses advanced analytics and machine 
                learning to offer insights into upcoming UFC fights and fighter performance.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="border-b border-red-500/20">
              <AccordionTrigger className="text-white hover:text-red-400 py-4">
                How accurate are your fight predictions?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                Our prediction model has maintained an average accuracy of 67-72% for main card fights 
                over the past two years. However, MMA is inherently unpredictable, and upsets happen 
                frequently. Our predictions should be used as one tool among many when analyzing fights, 
                not as guaranteed outcomes. We continuously refine our models to improve accuracy.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="border-b border-red-500/20">
              <AccordionTrigger className="text-white hover:text-red-400 py-4">
                What factors does your prediction model consider?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                Our prediction model analyzes numerous factors, including:
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Fighter&apos;s recent performance and win/loss streaks</li>
                  <li>Striking accuracy, volume, and defensive statistics</li>
                  <li>Takedown efficiency and submission skills</li>
                  <li>Physical attributes (reach, height, age)</li>
                  <li>Fighting style matchups and historical performance against similar opponents</li>
                  <li>Training camp information and fighter condition</li>
                  <li>Historical data from thousands of past UFC fights</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4" className="border-b border-red-500/20">
              <AccordionTrigger className="text-white hover:text-red-400 py-4">
                Is UFC Predict affiliated with the UFC?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                No, UFC Predict is not affiliated with UFC®, Dana White, or Zuffa LLC. UFC® is a 
                registered trademark of Zuffa LLC. We are an independent platform providing analysis 
                and predictions for UFC events. Our content and predictions are based on publicly 
                available data and our proprietary analytical models.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5" className="border-b border-red-500/20">
              <AccordionTrigger className="text-white hover:text-red-400 py-4">
                What&apos;s included in the free membership?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                Free membership includes:
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Basic fight predictions for main events</li>
                  <li>Limited access to fighter statistics</li>
                  <li>Read-only access to community discussions</li>
                  <li>Basic historical fight data</li>
                  <li>Limited participation in prediction contests</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-6" className="border-b border-red-500/20">
              <AccordionTrigger className="text-white hover:text-red-400 py-4">
                What additional features do premium members get?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                Premium membership includes:
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Detailed predictions for all fights with confidence ratings</li>
                  <li>Advanced statistical analysis and proprietary metrics</li>
                  <li>Full access to fighter comparison tools</li>
                  <li>Exclusive video breakdowns from MMA analysts</li>
                  <li>Advanced filters and custom dashboards</li>
                  <li>Priority access to AMAs and special events</li>
                  <li>Ad-free experience across the platform</li>
                  <li>Data export capabilities for personal analysis</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-7" className="border-b border-red-500/20">
              <AccordionTrigger className="text-white hover:text-red-400 py-4">
                How often are predictions updated?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                Initial predictions are typically published 7-10 days before an event. These are 
                updated 48 hours before the event to account for any late changes in fighter condition, 
                weight cut information, or other relevant factors. For major events, we may provide 
                final updates on the day of the event if significant new information becomes available.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-8" className="border-b border-red-500/20">
              <AccordionTrigger className="text-white hover:text-red-400 py-4">
                How do I participate in prediction contests?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                To participate in prediction contests:
                <ol className="list-decimal list-inside mt-2 space-y-1">
                  <li>Create an account or log in to your existing account</li>
                  <li>Navigate to the &quot;Community&quot; section and select &quot;Prediction Contests&quot;</li>
                  <li>Choose an active contest and click &quot;Enter Contest&quot;</li>
                  <li>Submit your predictions before the specified deadline</li>
                  <li>Track your performance on the leaderboard during and after the event</li>
                </ol>
                Some contests are open to all users, while others may be exclusive to premium members.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-9" className="border-b border-red-500/20">
              <AccordionTrigger className="text-white hover:text-red-400 py-4">
                How do I cancel my premium subscription?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                To cancel your premium subscription:
                <ol className="list-decimal list-inside mt-2 space-y-1">
                  <li>Log in to your account</li>
                  <li>Go to &quot;Account Settings&quot;</li>
                  <li>Select &quot;Subscription&quot;</li>
                  <li>Click &quot;Cancel Subscription&quot;</li>
                  <li>Follow the prompts to confirm cancellation</li>
                </ol>
                Your premium access will continue until the end of your current billing period. 
                You can reactivate your subscription at any time.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-10" className="border-b border-red-500/20">
              <AccordionTrigger className="text-white hover:text-red-400 py-4">
                Where does your fighter data come from?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                Our fighter data comes from multiple sources, including:
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Official UFC statistics</li>
                  <li>Public fight records and databases</li>
                  <li>Manual data collection by our team of analysts</li>
                  <li>Historical fight footage analysis</li>
                  <li>Verified news sources for recent information</li>
                </ul>
                We update our database after each UFC event to ensure the most current information 
                is available for analysis and predictions.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        
        <div className="bg-black/30 border border-red-500/20 rounded-lg p-6 mb-12 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center text-white">
            Didn&apos;t Find Your <span className="text-red-500">Answer?</span>
          </h2>
          <p className="text-gray-300 text-center mb-6">
            If you couldn&apos;t find the answer to your question, our support team is here to help. 
            Contact us and we&apos;ll get back to you as soon as possible.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              <MessageSquare className="h-4 w-4 mr-2" />
              Contact Support
            </Button>
            <Link href="/community">
              <Button variant="outline" className="border-red-500/50 hover:bg-red-500/10 text-red-400 hover:text-red-300">
                Ask the Community
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-bold mb-4 text-white">Popular Topics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="#" className="bg-black/50 p-3 rounded-lg border border-red-500/10 text-center hover:bg-red-950/30 transition">
              <span className="text-gray-300 text-sm">Predictions</span>
            </Link>
            <Link href="#" className="bg-black/50 p-3 rounded-lg border border-red-500/10 text-center hover:bg-red-950/30 transition">
              <span className="text-gray-300 text-sm">Membership</span>
            </Link>
            <Link href="#" className="bg-black/50 p-3 rounded-lg border border-red-500/10 text-center hover:bg-red-950/30 transition">
              <span className="text-gray-300 text-sm">Billing</span>
            </Link>
            <Link href="#" className="bg-black/50 p-3 rounded-lg border border-red-500/10 text-center hover:bg-red-950/30 transition">
              <span className="text-gray-300 text-sm">Community</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
