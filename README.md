<img src="https://github.com/user-attachments/assets/a1d7ced5-e6fc-41fd-9256-9d73a5f33597" alt="Luro Logo" width="50" height="50">


# 🔗 Luro - AI Powered Content Creation Platform(Landing Page)

<!-- <img src="https://github.com/user-attachments/assets/deab03fd-4234-44c3-a6ad-484c4a1a02a1" alt="Linkify Thubmnail"> -->
<img src="https://github.com/user-attachments/assets/0ff7129e-2f5d-48ae-913d-d4fd1507e613" alt="Luro Thumbnail" style="border-radius: 12px;" width="1280">


## 🌟 Introduction
Luro is an innovative social media marketing platform designed to help you streamline your social media management effortlessly. Built with Next.js, Tailwind CSS, Shadcn UI, Magic UI, Aceternity UI, Prisma, MongoDB, Clerk, React Hook Form, and TypeScript, Luro provides powerful analytics and user-friendly features to enhance your social media marketing experience.

## 🚀 Features

- Real-time performance tracking across platforms
- Engagement rate calculations and trends
- Audience growth and demographic insights
- Custom report generation
- ROI tracking and analysis

## 🔗 Live Preview

Check out the live demo of Luro here: [Live Preview](http://luro-ai.vercel.app)

## 🎥 Watch Demo on YouTube

Check out the tutorial to see how this social media marketing platform was built: [Watch the Tutorial](https://youtu.be/q8mOwYrpAHA?si=XpGy9VIKkaWJmfPL) 💻 

## 💻 Tech Stack

* Next.js
* Tailwind CSS
* Shadcn UI
* Magic UI
* Aceternity UI
* Prisma
* MongoDB
* Clerk
* Recharts
* Framer Motion

## 🛠️ Installation
To run Luro locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/Shreyas-29/luro-ai.git
    ```
2. Install dependencies:
    ```bash
    pnpm install
    ```
3. Set up environment variables in a `.env` file:
    ```
    # app
    NEXT_PUBLIC_APP_NAME=
    NEXT_PUBLIC_APP_DOMAIN=

    # database
    DATABASE_URL=

    # auth
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
    CLERK_SECRET_KEY=
    NEXT_PUBLIC_CLERK_SIGN_IN_URL="/signin"
    NEXT_PUBLIC_CLERK_SIGN_UP_URL="/signup"
    NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_URL="/"
    NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_URL="/"
    ```

4. Run the development server:
    ```bash
    pnpm run dev
    ```

## ☕ Buy Me a Coffee
If you enjoy using Luro, consider supporting my work!  
[Buy Me a Coffee ☕](https://buymeacoffee.com/shreyas29)

## 📜 License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 💬 Contact
If you have any questions or feedback, feel free to reach out via [GitHub Issues](https://github.com/Shreyas-29/luro-ai/issues).

---

Built with ❤️ by [Shreyas](https://shreyas-sihasane.vercel.app/)

<div align="center">
  <img src="public/images/ufc/ufc-logo.svg" alt="UFC Predicts Logo" width="100" height="100"> 
  <h1>UFC Predicts</h1>
</div>

UFC Predicts is an application designed to provide predictions and statistics for UFC (Ultimate Fighting Championship) fights and fighters. Leveraging data analysis, it aims to offer insights into potential fight outcomes, fighter performance metrics, and overall UFC event tracking.

## 🌟 Features

- **Fighter Profiles:** Detailed statistics and information for UFC fighters.
- **Event Tracking:** Information on upcoming and past UFC events.
- **Fight Predictions:** Data-driven predictions for fight outcomes.
- **Matchup Analysis:** Compare fighters head-to-head.
- **User Accounts:** Sign up to save favorite fighters and track your prediction accuracy.
- **Modern UI:** Built with a sleek red and black theme using Tailwind CSS and Shadcn UI.

## 💻 Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS, Shadcn UI, Magic UI
- **Database:** Prisma (with a database like PostgreSQL or MySQL - specify if known)
- **Authentication:** Clerk
- **Data Fetching/State Management:** React Hooks, SWR/React Query (specify if used)
- **Language:** TypeScript

## 🛠️ Getting Started

To run UFC Predicts locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/drewsephski/UFC-Predicts.git
    cd UFC-Predicts
    ```
2.  **Install dependencies:**
    ```bash
    npm install 
    # or pnpm install or yarn install
    ```
3.  **Set up environment variables:**
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
4.  **Initialize Prisma (if new setup or schema changes):**
    ```bash
    npx prisma generate
    npx prisma db push # Or prisma migrate dev for development migrations
    ```
5.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Deployment

This application is configured for deployment on a Node.js hosting environment (e.g., Vercel, Netlify, AWS Amplify, DigitalOcean App Platform) due to the use of Next.js features like Middleware and API Routes that require a server.

If attempting a static export for platforms like GitHub Pages, middleware would need to be disabled, and `next.config.mjs` would require `output: 'export'` and other relevant static export configurations.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an Issue.

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Built by [drewsephski](https://github.com/drewsephski)
