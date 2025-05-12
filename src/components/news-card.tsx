import React from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarRange, Clock, User, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface NewsCardProps {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  category: string;
  readTime: number;
  isFeatured?: boolean;
}

export const NewsCard: React.FC<NewsCardProps> = ({
  id,
  title,
  excerpt,
  image,
  date,
  author,
  category,
  readTime,
  isFeatured = false,
}) => {
  // Format date
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className={`bg-black/30 border ${isFeatured ? 'border-red-500/40' : 'border-red-500/20'} rounded-lg overflow-hidden hover:border-red-500/50 transition-colors`}>
      <div className="relative h-48 w-full">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
        {isFeatured && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-red-600 text-white border-none">
              Featured
            </Badge>
          </div>
        )}
        <div className="absolute top-2 left-2">
          <Badge variant="outline" className="bg-black/50 text-gray-300 border-red-500/30">
            {category}
          </Badge>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-white text-lg mb-2 line-clamp-2">{title}</h3>
        
        <p className="text-gray-300 text-sm mb-3 line-clamp-2">{excerpt}</p>
        
        <div className="flex items-center justify-between text-gray-400 text-xs mb-4">
          <div className="flex items-center">
            <User className="h-3 w-3 mr-1" />
            {author}
          </div>
          <div className="flex items-center">
            <CalendarRange className="h-3 w-3 mr-1" />
            {formattedDate}
          </div>
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {readTime} min read
          </div>
        </div>
        
        <Button asChild className={`w-full ${isFeatured ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-black/50 hover:bg-black/70 text-white border border-red-500/30'}`}>
          <Link href={`/news/${id}`}>
            Read Article
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
};
