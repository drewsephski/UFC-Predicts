# UFC Predicts

UFC Predicts is an application designed to provide predictions and statistics for UFC (Ultimate Fighting Championship) fights and fighters. Leveraging data analysis, it aims to offer insights into potential fight outcomes, fighter performance metrics, and overall UFC event tracking.

## 🌟 Features

- **Fighter Profiles:** Detailed statistics and information for UFC fighters, refreshed hourly from SportsData.io and UFC.com.
- **Live Rankings:** Official UFC rankings scraped hourly and cached for instant access.
- **Event Tracking:** Upcoming & past UFC events automatically refreshed every hour.
- **Live Fight Centre:** Real-time win-probability, strike and grappling stats streamed via Server-Sent Events (SSE).
- **Fight Predictions:** Logistic-regression model produces probability distributions for each matchup.
- **Matchup Analysis:** Compare fighters head-to-head with interactive charts.
- **User Accounts:** Sign up with Clerk to save favourites and track your prediction accuracy.
- **Modern UI:** Tailwind CSS + Shadcn UI + Framer Motion for slick animations.
- **Offline Fallback:** Mock data kicks-in if external APIs are unavailable.

## 💻 Tech Stack

| Layer | Library |
|-------|---------|
| Framework | **Next.js 14 (App Router)** |
| Styling | Tailwind CSS • Shadcn UI • Magic UI |
| DB / ORM | MongoDB Atlas • Prisma |
| Auth | Clerk |
| Data-fetching | **SWR** + server Route Handlers |
| Real-time | Node **SSE** streams |
| Scraping | **Cheerio** (UFC.com), SportsData.io SDK |
| Caching | **Upstash Redis** (with LRU memory fallback) |
| Tooling | @next/bundle-analyzer • Vercel Analytics |
| Language | **TypeScript** |

To run UFC Predicts locally, follow these steps:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/drewsephski/UFC-Predicts.git
    cd UFC-Predicts
    ```

2. **Install dependencies:**

    ```bash
    npm install
    # or pnpm install or yarn install
    ```

3. **Set up environment variables:**
    Copy `.env.example` ➡️ `.env.local` and fill in the blanks. _Minimal keys for local dev_:

    ```env
    # Clerk Authentication
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
    CLERK_SECRET_KEY=
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/auth/signin
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/auth/signup
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/app
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/app

    # Prisma Database (Example for PostgreSQL)
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"

    # SportsData.io
    SPORTSDATA_API_KEY=

    # RapidAPI UFC Data (live stats fallback)
    RAPIDAPI_KEY=

    # Upstash Redis (edge caching)
    UPSTASH_REDIS_REST_URL=
    UPSTASH_REDIS_REST_TOKEN=

    # NextAuth.js (if used - though Clerk is listed above)
    # NEXTAUTH_URL=
    # NEXTAUTH_SECRET=
    ```

4. **Initialize Prisma (if new setup or schema changes):**

    ```bash
    npx prisma generate
    npx prisma db push # Or prisma migrate dev for development migrations
    ```

5. **Run the development server:**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Deployment

This project is configured to be deployed to both GitHub Pages and Netlify.

### Vercel

1. Import the repository in Vercel → “New Project”.
2. Add environment variables from `.env.local`.
3. Build Command `npm run build`, Output `out`.
4. **Cron Jobs:** `vercel.json` already schedules `/api/cron/sync-data` hourly.

### GitHub Pages

1. Ensure your repository is pushed to GitHub
2. The GitHub Actions workflow (`.github/workflows/gh-pages.yml`) will automatically deploy your site when you push to the `main` branch
3. Your site will be available at: `https://<your-github-username>.github.io/UFC-Predicts`

### Netlify

#### Automatic Deployment

1. Push your code to a GitHub repository
2. Log in to [Netlify](https://www.netlify.com/)
3. Click on "New site from Git"
4. Select your repository
5. Configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Click "Deploy site"

#### Manual Deployment

1. Install the Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```
2. Log in to Netlify:
## ⚡ Performance & Optimisations

- **Bundle-analysis:** `npm run analyze` surfaces heavy modules; dynamic imports applied to marketing pages.
- **Code-splitting:** Below-the-fold components load lazily via `next/dynamic` + IntersectionObserver.
- **Image-optimisation:** `next/image` serves AVIF/WebP with blurred placeholders.
- **Database Indexes:** Prisma generates compound indexes for common filters (division, event date).
- **Static / ISR:** Marketing pages are static; data-heavy pages use ISR backed by Redis.

## 🗄️ Caching

Upstash Redis stores JSON responses under keys like `ufc:fighters`, `ufc:events:upcoming`, etc.  
TTL defaults: fighters 24 h, events 1 h, live data 1 min.  
Automatic fallback to in-memory LRU cache if Redis isn’t configured.

## 🔔 Real-time Updates

`/api/live/events` exposes SSE:

```ts
const ev = new EventSource('/api/live/events?fightId=123');
ev.onmessage = e => console.log(JSON.parse(e.data));
```

Data refresh is handled by `/api/cron/sync-data` (hourly via Vercel Cron) which invalidates Redis keys and re-hydrates fresh data.

## 🚑 Troubleshooting

| Symptom | Fix |
|---------|-----|
| `503 Too many connections` from `/api/live/events` | Reduce clients or raise `MAX_CONNECTIONS` env. |
| Empty rankings | Ensure `DISABLE_WEB_SCRAPING=false` and check firewall blocks. |
| Stale data | `POST /api/cron/sync-data` with `Authorization: Bearer <CRON_SECRET>` to force refresh. |

   ```bash
   netlify login
   ```
3. Build your project:
   ```bash
   npm run build
   ```
4. Deploy to Netlify:
   ```bash
   netlify deploy --prod
   ```

### Using the Deployment Script

You can also use the provided deployment script to simplify the process:

1. Make the script executable:

   ```bash
   chmod +x scripts/deploy.sh
   ```

2. Run the script:

   ```bash
   ./scripts/deploy.sh
   ```

This will handle building your project and guiding you through the deployment process for both GitHub Pages and Netlify.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an Issue.

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Built by [drewsephski](https://github.com/drewsephski)
