# UFC Predicts

UFC Predicts is an application designed to provide predictions and statistics for UFC (Ultimate Fighting Championship) fights and fighters. Leveraging data analysis, it aims to offer insights into potential fight outcomes, fighter performance metrics, and overall UFC event tracking.

## 🌟 Application Features

- **Fighter Profiles:** Detailed statistics and information for UFC fighters.
- **Event Tracking:** Information on upcoming and past UFC events.
- **Fight Predictions:** Data-driven predictions for fight outcomes.
- **Matchup Analysis:** Compare fighters head-to-head.
- **User Accounts:** Sign up to save favorite fighters and track your prediction accuracy.
- **Modern UI:** Built with a sleek red and black theme using Tailwind CSS and Shadcn UI.

## 📊 Data Layer & API Features

This project simulates a backend API for Mixed Martial Arts statistics, currently powered by local mock JSON data (`src/lib/api/mockApiFighters.json`, `src/lib/api/mockApiEvents.json`). The API functions are designed as if interacting with a more complex, hypothetical "MMAStatsAPI". Key data features implemented include:

### Detailed Fighter Statistics
The `Fighter` data model includes an `advanced_stats` field, providing more granular performance metrics such as:
- Significant Strikes Landed Per Minute
- Striking Accuracy Percentage
- Takedown Average Per 15 Minutes
- Takedown Defense Percentage
- Submission Average Per 15 Minutes

These statistics allow for deeper analysis of a fighter's capabilities and style.

### Fight Outcome Probabilities
The system includes logic to generate rudimentary fight outcome probabilities.
- The `calculateFightProbabilities(fighterA, fighterB)` function in `src/lib/analysis/predictions.ts` calculates a score for each fighter based on their wins, knockouts, and losses.
- These scores are then used to derive win probabilities for each fighter in a matchup.
- The `getFightOutcomeProbabilities(fightId)` API function orchestrates fetching fighter data and returning these probabilities.

### Enhanced Event Tracking
Event and fight data have been enhanced to provide more comprehensive tracking:
- **Fight Statuses:** Individual fights within an event can have statuses like `UPCOMING`, `LIVE`, `FINISHED`, or `CANCELLED`.
- **Post-Fight Results:** For `FINISHED` fights, the data includes:
    - `winner_id`: The ID of the winning fighter.
    - `method`: The method of victory (e.g., 'KO/TKO', 'Submission (Rear Naked Choke)', 'Unanimous Decision').
    - `round`: The round the fight ended.
    - `time`: The time in the round when the fight concluded.
This allows for a more dynamic and informative display of event details and historical results.

## 💻 Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS, Shadcn UI, Magic UI
- **Database:** Prisma (with a database like PostgreSQL or MySQL - specify if known)
- **Authentication:** Clerk
- **Data Fetching/State Management:** React Hooks, SWR/React Query (specify if used)
- **Language:** TypeScript

## 🛠️ Getting Started

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
    Create a `.env` file in the root of the project and add the necessary environment variables. Refer to `.env.example` if available, or ensure you have:

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

    # SportsDataIO API Key (if used for fetching data)
    # SPORTSDATA_IO_API_KEY=

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
