# SIREN INTEL — Starbucks USA Competitive Intelligence Agent

An autonomous AI agent and executive intelligence dashboard designed to scan the web daily for competitive signals relevant to **Starbucks USA**, distill the **Top 3 Most Strategic Insights** across product launches, restaurant tech, policies, store design, and ad campaigns, and publish them in an executive blog-style feed with historical scrolling.

Deployable on **Vercel** with automated **Vercel Cron (07:00 AM EST)** and **GitHub** integration.

---

## Key Features

- 📰 **Blog-Style Daily Dispatches**:
  - Publication-style editorial layouts (McKinsey / Stratechery format) for each day's scan.
  - Curated **Top 3 Strategic Insights** with deep executive analysis:
    - *What Happened* (verified event details)
    - *🚨 Strategic Impact on Starbucks USA* (threat level, Siren Craft System overlap, daypart vulnerability)
    - *💡 Executive Counter-Action Playbook* (concrete tactical recommendations for leadership)
    - Verified source attribution & external link.
  - **Historical Continuous Scroll**: Seamlessly scroll down into previous days' dispatches with keyword search, topic pills, and competitor filters.
  - One-click **"Copy as Executive Slack Memo"**.

- 🏢 **Competitors & Radar Management Tab**:
  - Pre-configured with major national & regional competitors:
    - *Specialty & Drive-thru*: Dutch Bros Coffee, Blank Street Coffee, Peet's Coffee, Caribou Coffee, Blue Bottle, Gregorys Coffee.
    - *National QSR & Beverage*: Dunkin', McCafé & CosMc's, Wendy's Breakfast, Panera Bread, Taco Bell Morning, Tim Hortons US.
  - **Add Custom Competitors**: Dynamically add local coffee contenders or new fast-casual threats with custom search keywords and threat ratings.
  - Toggle tracking on/off per brand.

- 🤖 **Autonomous Multi-Source Ingestion & AI Synthesis**:
  - Live Google News RSS querying across coffee & QSR industry news (Nation's Restaurant News, QSR Magazine, Restaurant Business Online, Bloomberg, CNBC).
  - Works **out of the box with zero required API keys** using our built-in strategic heuristic scoring engine.
  - Supports **Google Gemini AI** (`GEMINI_API_KEY`) for deep qualitative synthesis and executive prompt evaluation.

- ⏰ **Automated Daily Runs (Vercel Cron)**:
  - Runs automatically every morning at 07:00 AM EST (`0 12 * * *`) via `/api/cron/scan`.
  - Supports automated Slack / Discord webhook notifications.

---

## Quick Start (Local Development)

1. Clone or navigate to the project:
   ```bash
   cd starbucks-intel-agent
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) Configure environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Add your `GEMINI_API_KEY` or `SLACK_WEBHOOK_URL` if desired.

4. Start the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Deploy to Vercel via GitHub

Follow the detailed guide in [DEPLOYMENT.md](DEPLOYMENT.md):
1. Create a repository on GitHub and push the code:
   ```bash
   git add .
   git commit -m "feat: initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/starbucks-intel-agent.git
   git push -u origin main
   ```
2. Import repository into [Vercel](https://vercel.com).
3. Add optional environment variables (`GEMINI_API_KEY`, `SLACK_WEBHOOK_URL`).
4. Click **Deploy**. Vercel will automatically configure the daily cron schedule defined in `vercel.json`.

---

## Project Structure

```
starbucks-intel-agent/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── agent/scan/route.ts   # Interactive live scan API
│   │   │   ├── cron/scan/route.ts    # Automated Vercel Cron endpoint (7 AM EST)
│   │   │   └── webhook/test/route.ts # Webhook testing API
│   │   ├── layout.tsx                # App layout & SEO metadata
│   │   ├── page.tsx                  # Main dashboard page
│   │   └── globals.css               # Starbucks Reserve executive styles
│   ├── components/
│   │   ├── Header.tsx                # App header, tab navigation & quick scan
│   │   ├── BlogFeed.tsx              # Continuous scroll blog feed & search
│   │   ├── BriefingCard.tsx          # Editorial daily briefing article & Top 3 insights
│   │   ├── CompetitorsManager.tsx    # Competitor radar & management tab
│   │   ├── AddCompetitorModal.tsx    # Add custom competitor modal form
│   │   ├── LiveScanModal.tsx         # Real-time scan telemetry terminal
│   │   └── SettingsModal.tsx         # Vercel deploy, API keys & webhook settings
│   ├── lib/
│   │   ├── agent/
│   │   │   ├── rss-scanner.ts        # Google News RSS ingestion & XML parser
│   │   │   ├── synthesizer.ts        # Gemini AI & heuristic strategic engine
│   │   │   └── webhook.ts            # Slack & Discord notification builder
│   │   └── constants/
│   │       ├── default-competitors.ts# Default national & regional competitor list
│   │       └── historical-briefings.ts# Seeded historical daily briefings
│   └── types/
│       └── intelligence.ts           # Core TypeScript data definitions
├── vercel.json                       # Vercel Cron schedule configuration
├── DEPLOYMENT.md                     # GitHub & Vercel deployment instructions
├── .env.example                      # Sample environment variables
└── README.md                         # Documentation
```
