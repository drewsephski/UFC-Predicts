import { Particles } from "@/components/ui/particles";
import { Button } from "@/components/ui/button";
import { MessageSquare, Users, Trophy, CalendarRange, Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "UFC Community | UFC Predict",
  description: "Join the UFC Predict community to discuss fights, share predictions, and connect with other MMA fans around the world.",
};

export default function CommunityPage() {
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
            UFC Predict <span className="text-red-500">Community</span>
          </h1>
          <div className="flex items-center justify-center mb-4">
            <Users className="h-6 w-6 text-red-500 mr-2" />
            <p className="text-gray-300">Connect with MMA fans and experts from around the world</p>
          </div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Join our thriving community of UFC fans to discuss fights, share predictions, 
            participate in contests, and connect with other MMA enthusiasts. Whether you&apos;re 
            a casual fan or a hardcore analyst, there&apos;s a place for you here.
          </p>
        </div>
        
        <Tabs defaultValue="discussions" className="w-full mb-16">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-black/50 border border-red-500/30">
              <TabsTrigger 
                value="discussions" 
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white text-gray-300"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Discussions
              </TabsTrigger>
              <TabsTrigger 
                value="predictions" 
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white text-gray-300"
              >
                <Trophy className="h-4 w-4 mr-2" />
                Prediction Contests
              </TabsTrigger>
              <TabsTrigger 
                value="events" 
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white text-gray-300"
              >
                <CalendarRange className="h-4 w-4 mr-2" />
                Community Events
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="discussions" className="mt-0">
            <div className="bg-black/30 border border-red-500/20 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-white mb-4">Popular Discussions</h3>
              
              <div className="space-y-4">
                <div className="bg-black/50 p-4 rounded-lg border border-red-500/10">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src="https://randomuser.me/api/portraits/men/42.jpg" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-white font-medium">UFC 300 Main Event Breakdown</p>
                        <p className="text-xs text-gray-400">Posted by FightFan84 • 2 hours ago</p>
                      </div>
                    </div>
                    <Badge className="bg-red-600">Hot Topic</Badge>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">
                    Let&apos;s break down the Pereira vs Hill matchup. I think Pereira&apos;s striking power will be too much, 
                    but Hill&apos;s speed could cause problems early. What do you all think?
                  </p>
                  <div className="flex items-center text-gray-400 text-xs">
                    <span className="mr-4">128 comments</span>
                    <span>42 likes</span>
                  </div>
                </div>
                
                <div className="bg-black/50 p-4 rounded-lg border border-red-500/10">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src="https://randomuser.me/api/portraits/women/33.jpg" />
                        <AvatarFallback>MC</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-white font-medium">Is Jon Jones the UFC GOAT?</p>
                        <p className="text-xs text-gray-400">Posted by MMAQueen • 1 day ago</p>
                      </div>
                    </div>
                    <Badge className="bg-gray-700">Debate</Badge>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">
                    With his recent heavyweight title win, is Jon Jones now definitively the greatest UFC fighter of all time? 
                    Or do GSP, Silva, or Khabib still have arguments?
                  </p>
                  <div className="flex items-center text-gray-400 text-xs">
                    <span className="mr-4">256 comments</span>
                    <span>98 likes</span>
                  </div>
                </div>
                
                <div className="bg-black/50 p-4 rounded-lg border border-red-500/10">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src="https://randomuser.me/api/portraits/men/22.jpg" />
                        <AvatarFallback>TS</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-white font-medium">Most Underrated Fighter Right Now?</p>
                        <p className="text-xs text-gray-400">Posted by StrikeForce • 3 days ago</p>
                      </div>
                    </div>
                    <Badge className="bg-gray-700">Discussion</Badge>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">
                    Who do you think is the most underrated fighter in the UFC right now? I&apos;ll start: Arman Tsarukyan 
                    is going to be a champion soon, mark my words.
                  </p>
                  <div className="flex items-center text-gray-400 text-xs">
                    <span className="mr-4">87 comments</span>
                    <span>31 likes</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center mt-6">
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                  View All Discussions
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="predictions" className="mt-0">
            <div className="bg-black/30 border border-red-500/20 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-white mb-4">Prediction Contests</h3>
              
              <div className="space-y-6">
                <div className="bg-black/50 p-4 rounded-lg border border-red-500/10">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-bold text-white">UFC 300 Prediction Contest</h4>
                    <Badge className="bg-green-600">Active</Badge>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">
                    Predict the winners, methods, and rounds for all main card fights at UFC 300. 
                    The top 3 predictors will win premium subscriptions and exclusive merchandise!
                  </p>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center text-gray-400 text-xs">
                      <span className="mr-4">342 participants</span>
                      <span>Ends April 12, 2024</span>
                    </div>
                    <Button className="bg-red-600 hover:bg-red-700 text-white text-sm">
                      Enter Contest
                    </Button>
                  </div>
                </div>
                
                <div className="bg-black/50 p-4 rounded-lg border border-red-500/10">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-bold text-white">April Fight Night Series</h4>
                    <Badge className="bg-green-600">Active</Badge>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">
                    Predict the outcomes of all UFC Fight Night main events in April. 
                    Monthly leaderboard with points system and prizes for consistent predictors!
                  </p>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center text-gray-400 text-xs">
                      <span className="mr-4">187 participants</span>
                      <span>Ends April 30, 2024</span>
                    </div>
                    <Button className="bg-red-600 hover:bg-red-700 text-white text-sm">
                      Enter Contest
                    </Button>
                  </div>
                </div>
                
                <div className="bg-black/50 p-4 rounded-lg border border-red-500/10">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-bold text-white">2024 Championship Predictions</h4>
                    <Badge className="bg-blue-600">Long-term</Badge>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">
                    Predict who will hold each UFC championship belt at the end of 2024. 
                    Long-term contest with major prizes for the most accurate predictions!
                  </p>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center text-gray-400 text-xs">
                      <span className="mr-4">512 participants</span>
                      <span>Ends December 31, 2024</span>
                    </div>
                    <Button className="bg-red-600 hover:bg-red-700 text-white text-sm">
                      Enter Contest
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="events" className="mt-0">
            <div className="bg-black/30 border border-red-500/20 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-white mb-4">Upcoming Community Events</h3>
              
              <div className="space-y-6">
                <div className="bg-black/50 p-4 rounded-lg border border-red-500/10">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-bold text-white">UFC 300 Live Watch Party</h4>
                    <Badge className="bg-purple-600">Virtual</Badge>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">
                    Join our virtual watch party for UFC 300! Live chat, real-time predictions, 
                    and commentary from our expert analysts throughout the event.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center text-gray-400 text-xs">
                      <CalendarRange className="h-3 w-3 mr-1" />
                      <span>April 13, 2024 • 7:00 PM ET</span>
                    </div>
                    <Button className="bg-red-600 hover:bg-red-700 text-white text-sm">
                      RSVP
                    </Button>
                  </div>
                </div>
                
                <div className="bg-black/50 p-4 rounded-lg border border-red-500/10">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-bold text-white">AMA with Former UFC Fighter</h4>
                    <Badge className="bg-yellow-600">Special</Badge>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">
                    Ask Me Anything session with former UFC middleweight contender Derek Brunson. 
                    Get insights from a veteran fighter with over 20 UFC fights!
                  </p>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center text-gray-400 text-xs">
                      <CalendarRange className="h-3 w-3 mr-1" />
                      <span>April 20, 2024 • 3:00 PM ET</span>
                    </div>
                    <Button className="bg-red-600 hover:bg-red-700 text-white text-sm">
                      Set Reminder
                    </Button>
                  </div>
                </div>
                
                <div className="bg-black/50 p-4 rounded-lg border border-red-500/10">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-bold text-white">UFC 301 Prediction Tournament</h4>
                    <Badge className="bg-green-600">Contest</Badge>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">
                    Live prediction tournament with real-time leaderboard during UFC 301. 
                    Make your picks before each fight and see how you stack up against the community!
                  </p>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center text-gray-400 text-xs">
                      <CalendarRange className="h-3 w-3 mr-1" />
                      <span>May 4, 2024 • 7:00 PM ET</span>
                    </div>
                    <Button className="bg-red-600 hover:bg-red-700 text-white text-sm">
                      Register
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-black/30 border border-red-500/20 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <MessageSquare className="h-6 w-6 text-red-500 mr-3" />
              <h2 className="text-2xl font-bold text-white">Join the Conversation</h2>
            </div>
            <p className="text-gray-300 mb-4">
              Connect with thousands of UFC fans in our active discussion forums. Share your thoughts, 
              ask questions, and engage in friendly debates about all things MMA.
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
              <li>Fight breakdowns and analysis</li>
              <li>Fighter career discussions</li>
              <li>Event predictions and reactions</li>
              <li>MMA news and rumors</li>
              <li>Technique and training talk</li>
            </ul>
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              Join the Forums
            </Button>
          </div>
          
          <div className="bg-black/30 border border-red-500/20 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Trophy className="h-6 w-6 text-red-500 mr-3" />
              <h2 className="text-2xl font-bold text-white">Prediction Leaderboards</h2>
            </div>
            <p className="text-gray-300 mb-4">
              Test your MMA knowledge against the community in our prediction contests. 
              Make your picks for upcoming fights and climb the leaderboards!
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
              <li>Monthly prediction contests</li>
              <li>Special event tournaments</li>
              <li>Long-term championship predictions</li>
              <li>Prizes for top predictors</li>
              <li>Detailed accuracy statistics</li>
            </ul>
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              View Leaderboards
            </Button>
          </div>
        </div>
        
        <div className="bg-black/30 border border-red-500/20 rounded-lg p-6 mb-12">
          <h2 className="text-2xl font-bold mb-4 text-center text-white">
            Community <span className="text-red-500">Guidelines</span>
          </h2>
          <p className="text-gray-300 text-center mb-6">
            Our community thrives on respectful discussion and shared passion for MMA. 
            Please follow these guidelines to keep our community welcoming for everyone.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-black/50 p-4 rounded-lg border border-red-500/10">
              <div className="flex items-center mb-2">
                <Heart className="h-5 w-5 text-red-500 mr-2" />
                <h3 className="text-lg font-bold text-white">Respect</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Treat all community members with respect, even when disagreeing. No personal attacks, 
                harassment, or discriminatory language.
              </p>
            </div>
            
            <div className="bg-black/50 p-4 rounded-lg border border-red-500/10">
              <div className="flex items-center mb-2">
                <MessageSquare className="h-5 w-5 text-red-500 mr-2" />
                <h3 className="text-lg font-bold text-white">Quality Content</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Contribute thoughtful, relevant content. Avoid spam, excessive self-promotion, 
                or low-effort posts that don&apos;t add to the discussion.
              </p>
            </div>
            
            <div className="bg-black/50 p-4 rounded-lg border border-red-500/10">
              <div className="flex items-center mb-2">
                <Users className="h-5 w-5 text-red-500 mr-2" />
                <h3 className="text-lg font-bold text-white">Inclusivity</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Our community welcomes fans of all experience levels. Be patient with newcomers 
                and avoid gatekeeping or elitism.
              </p>
            </div>
          </div>
          
          <div className="flex justify-center mt-6">
            <Button variant="outline" className="border-red-500/50 hover:bg-red-500/10 text-red-400 hover:text-red-300">
              Read Full Guidelines
            </Button>
          </div>
        </div>
        
        <div className="flex justify-center">
          <Button className="bg-red-600 hover:bg-red-700 text-white">
            <Users className="h-4 w-4 mr-2" />
            Join Our Community
          </Button>
        </div>
      </div>
    </div>
  );
}
