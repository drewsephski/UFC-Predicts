import Icons from "./global/icons";
import Images from "./global/images";
import Wrapper from "./global/wrapper";
import Container from "./global/container";
import Background from "./global/background";
import Providers from "./global/providers";

import SignInForm from "./auth/signin-form";
import SignUpForm from "./auth/signup-form";

import Hero from "./marketing/hero";
import Navbar from "./marketing/navbar";
import Companies from "./marketing/companies";
import Features from "./marketing/features";
import Connect from "./marketing/connect";
import Perks from "./marketing/perks";
import Pricing from "./marketing/pricing";
import Reviews from "./marketing/reviews";
import CTA from "./marketing/cta";
import Footer from "./marketing/footer";

// Import UFC components directly
import { FighterCard } from "./fighters/fighter-card";
import { FighterStats } from "./fighters/fighter-stats";
import { FighterFightHistory } from "./fighters/fighter-fight-history";
import { FighterPredictionForm } from "./fighters/fighter-prediction-form";
import { FightCard } from "./events/fight-card";
import { FightPredictionForm } from "./events/fight-prediction-form";
import { EventCard } from "./events/event-card";
import { LoadingState, ErrorState } from "./ui/loading-state";

// Import navigation components
import { Breadcrumb } from "./ui/breadcrumb";
import { PaginationNav } from "./ui/pagination-nav";
import { BackToTop } from "./ui/back-to-top";
import { HeaderDropdown } from "./ui/header-dropdown";

// Import sitemap components
import { Sitemap, SitemapCategory } from "./sitemap/sitemap";

// UFC specific components that were missing
export { FighterComparison } from "./ufc/fighter-comparison";
export { default as NewsCard } from "./ufc/news-card";
export { default as RankingsTable } from "./ufc/rankings-table";

export {
    // Global components
    Icons,
    Images,
    Wrapper,
    Container,
    Background,
    Providers,

    // Auth components
    SignInForm,
    SignUpForm,

    // Marketing components
    Hero,
    Navbar,
    Companies,
    Features,
    Connect,
    Perks,
    Pricing,
    Reviews,
    CTA,
    Footer,

    // UFC components
    FighterCard,
    FighterStats,
    FighterFightHistory,
    FighterPredictionForm,
    FightCard,
    FightPredictionForm,
    EventCard,
    LoadingState,
    ErrorState,

    // Navigation components
    Breadcrumb,
    PaginationNav,
    BackToTop,
    HeaderDropdown,

    // Sitemap components
    Sitemap,
    SitemapCategory,
};