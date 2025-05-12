"use client";

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/functions';
import { LucideIcon } from 'lucide-react';

interface SitemapCategoryProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  links: {
    title: string;
    href: string;
    description?: string;
  }[];
  className?: string;
}

export function SitemapCategory({
  title,
  description,
  icon: Icon,
  links,
  className,
}: SitemapCategoryProps) {
  return (
    <Card className={cn("bg-black/70 border-red-500/30", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {Icon && <Icon className="h-5 w-5 text-red-500" />}
          {title}
        </CardTitle>
        {description && (
          <CardDescription>{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {links.map((link, index) => (
            <li key={index}>
              <Link 
                href={link.href}
                className="text-gray-300 hover:text-red-400 transition-colors flex flex-col"
              >
                <span className="font-medium">{link.title}</span>
                {link.description && (
                  <span className="text-xs text-muted-foreground">{link.description}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

interface SitemapProps {
  className?: string;
}

export function Sitemap({ className }: SitemapProps) {
  return (
    <div className={cn("grid gap-6 md:grid-cols-2 lg:grid-cols-3", className)}>
      {sitemapData.map((category, index) => (
        <SitemapCategory
          key={index}
          title={category.title}
          description={category.description}
          icon={category.icon}
          links={category.links}
        />
      ))}
    </div>
  );
}

// Import all the icons we need
import { 
  Users, 
  Dumbbell, 
  Calendar, 
  Award, 
  TrendingUp, 
  BarChart3, 
  MessageSquare,
  Swords,
  Trophy,
  Info,
  HelpCircle,
  Settings,
  User
} from 'lucide-react';

// Sitemap data structure
const sitemapData: SitemapCategoryProps[] = [
  {
    title: "Fighters",
    description: "Explore UFC fighter profiles and statistics",
    icon: Dumbbell,
    links: [
      { title: "All Fighters", href: "/fighters", description: "Browse the complete UFC fighter roster" },
      { title: "Champions", href: "/fighters/champions", description: "Current UFC champions across all divisions" },
      { title: "Rankings", href: "/rankings", description: "Official UFC rankings by division" },
      { title: "Pound for Pound", href: "/rankings/pound-for-pound", description: "Top pound-for-pound fighters" },
    ]
  },
  {
    title: "Events",
    description: "UFC events schedule and results",
    icon: Calendar,
    links: [
      { title: "Upcoming Events", href: "/events", description: "Schedule of upcoming UFC events" },
      { title: "Past Events", href: "/events/past", description: "Results from previous UFC events" },
      { title: "Pay-Per-View Events", href: "/events/ppv", description: "Major UFC pay-per-view events" },
      { title: "Fight Nights", href: "/events/fight-nights", description: "UFC Fight Night events" },
    ]
  },
  {
    title: "Predictions",
    description: "Fight predictions and analysis",
    icon: TrendingUp,
    links: [
      { title: "Latest Predictions", href: "/predictions", description: "Predictions for upcoming fights" },
      { title: "Make Predictions", href: "/predictions/create", description: "Create your own fight predictions" },
      { title: "Prediction Leaderboard", href: "/predictions/leaderboard", description: "Top community predictors" },
      { title: "Prediction History", href: "/predictions/history", description: "Your prediction history" },
    ]
  },
  {
    title: "Statistics",
    description: "Comprehensive UFC statistics",
    icon: BarChart3,
    links: [
      { title: "Fighter Statistics", href: "/statistics/fighters", description: "Detailed fighter performance metrics" },
      { title: "Event Statistics", href: "/statistics/events", description: "Statistics from UFC events" },
      { title: "Fight Analytics", href: "/statistics/fights", description: "In-depth fight analysis" },
      { title: "Historical Records", href: "/statistics/records", description: "UFC records and milestones" },
    ]
  },
  {
    title: "Community",
    description: "Connect with other UFC fans",
    icon: MessageSquare,
    links: [
      { title: "Discussion Forum", href: "/community", description: "Discuss UFC with other fans" },
      { title: "Fight Predictions", href: "/community/predictions", description: "Community fight predictions" },
      { title: "Fighter Debates", href: "/community/debates", description: "Debate fighter matchups" },
      { title: "Event Discussions", href: "/community/events", description: "Discuss upcoming and past events" },
    ]
  },
  {
    title: "User",
    description: "User account and settings",
    icon: User,
    links: [
      { title: "Profile", href: "/app/profile", description: "View and edit your profile" },
      { title: "My Predictions", href: "/app/predictions", description: "Your prediction history" },
      { title: "Favorites", href: "/app/favorites", description: "Your favorite fighters" },
      { title: "Settings", href: "/app/settings", description: "Account settings" },
    ]
  },
  {
    title: "Tools",
    description: "UFC analysis tools",
    icon: Swords,
    links: [
      { title: "Fighter Comparison", href: "/compare", description: "Compare fighters head-to-head" },
      { title: "Fight Predictor", href: "/tools/predictor", description: "AI-powered fight outcome predictor" },
      { title: "Division Explorer", href: "/tools/divisions", description: "Explore UFC weight divisions" },
      { title: "Fight Finder", href: "/tools/fight-finder", description: "Find specific UFC fights" },
    ]
  },
  {
    title: "About",
    description: "About UFC Predict",
    icon: Info,
    links: [
      { title: "About Us", href: "/about", description: "Learn about UFC Predict" },
      { title: "How It Works", href: "/about/how-it-works", description: "How our predictions work" },
      { title: "FAQ", href: "/faq", description: "Frequently asked questions" },
      { title: "Contact Us", href: "/contact", description: "Get in touch with us" },
    ]
  },
  {
    title: "Resources",
    description: "UFC resources and information",
    icon: HelpCircle,
    links: [
      { title: "UFC Rules", href: "/resources/rules", description: "Official UFC rules" },
      { title: "Weight Classes", href: "/resources/weight-classes", description: "UFC weight divisions explained" },
      { title: "Terminology", href: "/resources/terminology", description: "UFC and MMA terminology" },
      { title: "Sitemap", href: "/sitemap", description: "Full site navigation" },
    ]
  },
];
