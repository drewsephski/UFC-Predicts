"use client";

import { cn } from "@/functions";
import { CalendarRange, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

interface NewsCardProps {
    id: string;
    title: string;
    excerpt: string;
    image: string;
    date: string;
    readTime: number;
    category: string;
    author: {
        name: string;
        avatar?: string;
    };
    featured?: boolean;
}

const NewsCard = ({
    id,
    title,
    excerpt,
    image,
    date,
    readTime,
    category,
    author,
    featured = false,
}: NewsCardProps) => {
    // Format date
    const articleDate = new Date(date);
    const formattedDate = articleDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <Card className={cn(
            "overflow-hidden transition-all duration-300 hover:shadow-lg border-red-500/30 bg-gradient-to-b from-black to-red-950/30 backdrop-blur-sm h-full flex flex-col",
            featured && "border-red-500/70 shadow-md shadow-red-500/20"
        )}>
            <div className="relative w-full h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                />
                {featured && (
                    <div className="absolute top-2 right-2 z-20">
                        <Badge className="bg-gradient-to-r from-red-600 to-red-800 text-white font-bold border-0 shadow-md">
                            Featured
                        </Badge>
                    </div>
                )}
                <div className="absolute top-2 left-2 z-20">
                    <Badge variant="outline" className="font-bold border-red-500/50 text-white bg-black/70">
                        {category}
                    </Badge>
                </div>
            </div>
            <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold line-clamp-2 text-white">{title}</CardTitle>
                <div className="flex items-center justify-between text-sm text-gray-300 mt-2">
                    <CardDescription className="flex items-center text-gray-300">
                        <CalendarRange className="w-3 h-3 mr-1 text-red-400" />
                        {formattedDate}
                    </CardDescription>
                    <CardDescription className="flex items-center text-gray-300">
                        <Clock className="w-3 h-3 mr-1 text-red-400" />
                        {readTime} min read
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent className="pb-2 flex-grow">
                <p className="text-sm text-gray-300 line-clamp-3 border-t border-red-500/20 pt-3">
                    {excerpt}
                </p>
            </CardContent>
            <CardFooter className="p-4 pt-2 flex justify-between items-center border-t border-red-500/20">
                <div className="flex items-center">
                    {author.avatar ? (
                        <div className="relative w-6 h-6 rounded-full overflow-hidden mr-2 border border-red-500/50">
                            <Image
                                src={author.avatar}
                                alt={author.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                    ) : (
                        <div className="w-6 h-6 rounded-full bg-red-950 border border-red-500/50 flex items-center justify-center mr-2">
                            <span className="text-xs font-bold text-white">{author.name.charAt(0)}</span>
                        </div>
                    )}
                    <span className="text-sm text-gray-300">{author.name}</span>
                </div>
                <Button asChild variant="link" size="sm" className="p-0 h-auto text-red-400 hover:text-red-300">
                    <Link href={`/news/${id}`}>
                        Read More
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
};

export default NewsCard;
