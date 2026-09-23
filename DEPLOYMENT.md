# Deployment Guide: Starbucks USA Competitive Intelligence Agent (Vercel + GitHub)

This guide walks you through deploying **SIREN INTEL** to Vercel via GitHub, with automated daily cron scanning at 07:00 AM EST and Slack webhook dispatches.

---

## Step 1: Push Code to GitHub

1. Open your terminal in this project directory:
   ```bash
   cd C:\Users\dhruv\.gemini\antigravity\scratch\starbucks-intel-agent
   ```

2. Create a new repository on [GitHub](https://github.com/new), named for example `starbucks-intel-agent` (public or private).

3. Link your local git repository and push:
   ```bash
   git add .
   git commit -m "feat: initial Starbucks competitive intelligence agent with blog feed & competitor radar"
   git remote add origin https://github.com/YOUR_USERNAME/starbucks-intel-agent.git
   git branch -M main
   git push -u origin main
   ```

---

## Step 2: Deploy to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New..." &rarr; "Project"**.
2. Select your newly created GitHub repository (`starbucks-intel-agent`) and click **"Import"**.
3. Under **Framework Preset**, Next.js will be automatically detected.
4. Under **Environment Variables**, optionally add:
   - `GEMINI_API_KEY`: *(Optional)* Your Google Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
   - `SLACK_WEBHOOK_URL`: *(Optional)* Your Slack/Discord incoming webhook URL.
   - `CRON_SECRET`: *(Optional)* A random secret string to secure the cron route.
5. Click **"Deploy"**.

---

## Step 3: Verify Automated Daily Scanning (Vercel Cron)

The project includes `vercel.json` with the following configuration:
```json
{
  "crons": [
    {
      "path": "/api/cron/scan",
      "schedule": "0 12 * * *"
    }
  ]
}
```

- **Cron Schedule**: `0 12 * * *` executes every day at **12:00 UTC (07:00 AM EST / 04:00 AM PST)**.
- **Verification**: In your Vercel Project Dashboard, navigate to the **"Cron Jobs"** tab. You will see `/api/cron/scan` listed as active and scheduled.
- **Manual Trigger**: You can trigger the cron endpoint at any time directly in your browser or via curl:
  ```bash
  curl https://your-project.vercel.app/api/cron/scan
  ```

---

## Step 4: Web Interface Usage

Once deployed, visit your live Vercel URL (e.g., `https://starbucks-intel-agent.vercel.app`):
- 📰 **Daily Intelligence Briefs**: Scroll down through daily publication-style dispatches, search and filter by category or competitor, and copy formatted Slack memos with 1 click.
- 🏢 **Competitors & Radar Tab**: Add regional coffee contenders or fast-casual breakfast challengers, customize keywords, and toggle active scanning on/off.
- ⚡ **Run Live Scan**: Click the "Run Live Scan" button anytime to execute an instant web sweep across all active competitors and generate a fresh daily brief.
