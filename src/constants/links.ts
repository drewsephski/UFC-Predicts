
import { ClockIcon, MessageSquare, CreditCardIcon, SettingsIcon, ChartPieIcon, NewspaperIcon, LineChartIcon, Award, Dumbbell, Swords, TrendingUp, Trophy } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type Link = {
    href: string;
    label: string;
    icon: LucideIcon;
}

export const SIDEBAR_LINKS: Link[] = [
    {
        href: "/dashboard",
        label: "Dashboard",
        icon: ChartPieIcon,
    },
    {
        href: "/dashboard/fighters",
        label: "Fighters",
        icon: Dumbbell
    },
    {
        href: "/dashboard/events",
        label: "Events",
        icon: ClockIcon
    },
    {
        href: "/dashboard/predictions",
        label: "Predictions",
        icon: TrendingUp
    },
    {
        href: "/dashboard/rankings",
        label: "Rankings",
        icon: Trophy
    },
    {
        href: "/dashboard/compare",
        label: "Compare Fighters",
        icon: Swords
    },
    {
        href: "/dashboard/news",
        label: "News",
        icon: NewspaperIcon
    },
    {
        href: "/dashboard/pound-for-pound",
        label: "Pound for Pound",
        icon: Award
    },
    {
        href: "/dashboard/analytics",
        label: "Fight Analytics",
        icon: LineChartIcon
    },
    {
        href: "/dashboard/comments",
        label: "Community",
        icon: MessageSquare
    },
    {
        href: "/dashboard/billing",
        label: "Billing",
        icon: CreditCardIcon
    },
    {
        href: "/dashboard/settings",
        label: "Settings",
        icon: SettingsIcon
    }
];

export const FOOTER_LINKS = [
    {
        title: "UFC Predict",
        links: [
            { name: "Home", href: "/" },
            { name: "Features", href: "/" },
            { name: "Pricing", href: "/" },
            { name: "Contact", href: "/" },
            { name: "About Us", href: "/about" },
        ],
    },
    {
        title: "UFC Content",
        links: [
            { name: "Fighters", href: "/fighters" },
            { name: "Events", href: "/events" },
            { name: "Rankings", href: "/rankings" },
            { name: "News", href: "/news" },
            { name: "Predictions", href: "/predictions" },
        ],
    },
    {
        title: "Resources",
        links: [
            { name: "Fight Analysis", href: "/analysis" },
            { name: "Statistics", href: "/statistics" },
            { name: "Community", href: "/community" },
            { name: "FAQ", href: "/faq" },
        ],
    },
    {
        title: "Legal",
        links: [
            { name: "Privacy Policy", href: "/privacy" },
            { name: "Terms of Service", href: "/terms" },
            { name: "Cookies Policy", href: "/cookies" },
            { name: "Disclaimer", href: "/disclaimer" },
        ],
    },
];
