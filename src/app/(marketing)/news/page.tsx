import { NewsCard } from "@/components";
import { Particles } from "@/components/ui/particles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter } from "lucide-react";

export const metadata = {
  title: "UFC News | UFC Predict",
  description: "Stay up to date with the latest UFC news, fighter interviews, and event coverage.",
};

// Mock news data
const MOCK_NEWS = [
  {
    id: "ufc-300-recap",
    title: "UFC 300 Recap: Pereira KOs Hill in Epic Main Event",
    excerpt: "Alex Pereira delivered another highlight-reel knockout, finishing Jamahal Hill in the first round to retain his light heavyweight title at the historic UFC 300 event.",
    image: "https://cdn.vox-cdn.com/thumbor/Yk_x6WdWUNZA3fUOQJlH1iwghQA=/0x0:4633x3089/1200x800/filters:focal(1947x1175:2687x1915)/cdn.vox-cdn.com/uploads/chorus_image/image/73069423/1942897273.0.jpg",
    date: "2024-04-14",
    readTime: 5,
    category: "Event Recap",
    author: {
      name: "Mike Johnson",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    featured: true
  },
  {
    id: "mcgregor-chandler-update",
    title: "McGregor vs. Chandler: Fight Update and New Timeline",
    excerpt: "The long-awaited showdown between Conor McGregor and Michael Chandler has a new target date. Get the latest on this highly anticipated matchup.",
    image: "https://cdn.vox-cdn.com/thumbor/E98d9iiC_oCJCkCGjK_sOk0z-jg=/0x0:4928x3280/1200x800/filters:focal(2070x1246:2858x2034)/cdn.vox-cdn.com/uploads/chorus_image/image/72110677/1248183891.0.jpg",
    date: "2024-04-10",
    readTime: 4,
    category: "Fight News",
    author: {
      name: "Sarah Thompson",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    }
  },
  {
    id: "jones-miocic-preview",
    title: "Jon Jones vs. Stipe Miocic: The Ultimate Heavyweight Showdown",
    excerpt: "Breaking down the upcoming heavyweight title fight between Jon Jones and Stipe Miocic. Can the greatest light heavyweight of all time defeat the most accomplished heavyweight champion?",
    image: "https://cdn.vox-cdn.com/thumbor/QQQAKXDxHZEQSQjA_V4aDQO5VAg=/0x0:4928x3280/1200x800/filters:focal(2070x1246:2858x2034)/cdn.vox-cdn.com/uploads/chorus_image/image/72654015/1473707731.0.jpg",
    date: "2024-04-08",
    readTime: 6,
    category: "Fight Preview",
    author: {
      name: "David Wilson",
      avatar: "https://randomuser.me/api/portraits/men/62.jpg"
    }
  },
  {
    id: "zhang-yan-rematch",
    title: "Zhang Weili Dominates Yan Xiaonan to Retain Strawweight Title",
    excerpt: "Zhang Weili put on a masterclass performance against fellow Chinese fighter Yan Xiaonan at UFC 300, showcasing her complete skillset in a unanimous decision victory.",
    image: "https://cdn.vox-cdn.com/thumbor/Yk_x6WdWUNZA3fUOQJlH1iwghQA=/0x0:4633x3089/1200x800/filters:focal(1947x1175:2687x1915)/cdn.vox-cdn.com/uploads/chorus_image/image/73069423/1942897273.0.jpg",
    date: "2024-04-14",
    readTime: 4,
    category: "Event Recap",
    author: {
      name: "Lisa Chen",
      avatar: "https://randomuser.me/api/portraits/women/26.jpg"
    }
  },
  {
    id: "poirier-retirement",
    title: "Dustin Poirier Hints at Retirement After UFC 300 Victory",
    excerpt: "Following his spectacular knockout win over Benoit Saint Denis at UFC 299, Dustin Poirier suggests his next fight could be his last. Is 'The Diamond' ready to hang up the gloves?",
    image: "https://cdn.vox-cdn.com/thumbor/E98d9iiC_oCJCkCGjK_sOk0z-jg=/0x0:4928x3280/1200x800/filters:focal(2070x1246:2858x2034)/cdn.vox-cdn.com/uploads/chorus_image/image/72110677/1248183891.0.jpg",
    date: "2024-03-12",
    readTime: 3,
    category: "Fighter News",
    author: {
      name: "James Rodriguez",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg"
    }
  },
  {
    id: "ufc-301-announcement",
    title: "UFC 301 Fight Card Finalized: Pantoja vs. Erceg Headlines in Brazil",
    excerpt: "The complete fight card for UFC 301 in Rio de Janeiro has been announced, featuring flyweight champion Alexandre Pantoja defending his title against Steve Erceg in the main event.",
    image: "https://cdn.vox-cdn.com/thumbor/QQQAKXDxHZEQSQjA_V4aDQO5VAg=/0x0:4928x3280/1200x800/filters:focal(2070x1246:2858x2034)/cdn.vox-cdn.com/uploads/chorus_image/image/72654015/1473707731.0.jpg",
    date: "2024-04-05",
    readTime: 4,
    category: "Event News",
    author: {
      name: "Carlos Silva",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg"
    }
  }
];

export default function NewsPage() {
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
            UFC <span className="text-red-500">News</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Stay up to date with the latest UFC news, fighter interviews, event coverage, and analysis. 
            Get insights from our team of MMA experts on everything happening in the world of UFC.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search news articles..." 
              className="pl-10 bg-black/50 border-red-500/30 text-white placeholder:text-gray-400 focus-visible:ring-red-500"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-red-500/30 text-red-400 hover:bg-red-950/30 hover:text-red-300">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-black/50 border border-red-500/30">
              <TabsTrigger 
                value="all" 
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white text-gray-300"
              >
                All News
              </TabsTrigger>
              <TabsTrigger 
                value="event-recap" 
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white text-gray-300"
              >
                Event Recaps
              </TabsTrigger>
              <TabsTrigger 
                value="fighter-news" 
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white text-gray-300"
              >
                Fighter News
              </TabsTrigger>
              <TabsTrigger 
                value="fight-preview" 
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white text-gray-300"
              >
                Fight Previews
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MOCK_NEWS.map((article) => (
                <NewsCard
                  key={article.id}
                  {...article}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="event-recap" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MOCK_NEWS
                .filter(article => article.category === "Event Recap")
                .map((article) => (
                  <NewsCard
                    key={article.id}
                    {...article}
                  />
                ))
              }
            </div>
          </TabsContent>
          
          <TabsContent value="fighter-news" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MOCK_NEWS
                .filter(article => article.category === "Fighter News")
                .map((article) => (
                  <NewsCard
                    key={article.id}
                    {...article}
                  />
                ))
              }
            </div>
          </TabsContent>
          
          <TabsContent value="fight-preview" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MOCK_NEWS
                .filter(article => article.category === "Fight Preview")
                .map((article) => (
                  <NewsCard
                    key={article.id}
                    {...article}
                  />
                ))
              }
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-center mt-12">
          <Button className="bg-red-600 hover:bg-red-700 text-white">
            Load More News
          </Button>
        </div>
      </div>
    </div>
  );
}
