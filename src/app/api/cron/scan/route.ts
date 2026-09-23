import { NextRequest, NextResponse } from 'next/server';
import { DEFAULT_COMPETITORS } from '@/lib/constants/default-competitors';
import { scanAllCompetitors } from '@/lib/agent/rss-scanner';
import { synthesizeIntelligence } from '@/lib/agent/synthesizer';
import { sendBriefingToWebhook } from '@/lib/agent/webhook';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

/**
 * Daily Vercel Cron trigger
 * Configured in vercel.json to run at 7:00 AM EST (12:00 UTC) every day
 */
export async function GET(req: NextRequest) {
  // Optional security check for Vercel Cron Secret
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = req.headers.get('authorization');

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    console.log('[CRON] Starting Daily Starbucks Competitive Intelligence Sweep...');

    // 1. Scan live competitors
    const { articles, scannedCount } = await scanAllCompetitors(DEFAULT_COMPETITORS);

    // 2. Synthesize with Gemini / Heuristic engine
    const briefing = await synthesizeIntelligence({
      geminiApiKey: process.env.GEMINI_API_KEY,
      articles,
      scannedCompetitorCount: scannedCount
    });

    console.log(`[CRON] Sweep complete. Generated Vol. ${briefing.volumeNumber} with ${briefing.insights.length} insights.`);

    // 3. Dispatch to Slack Webhook if configured
    let webhookResult = null;
    const webhookUrl = process.env.SLACK_WEBHOOK_URL;
    if (webhookUrl) {
      webhookResult = await sendBriefingToWebhook(webhookUrl, briefing);
      console.log('[CRON] Webhook dispatched:', webhookResult);
    }

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      volumeNumber: briefing.volumeNumber,
      headline: briefing.headline,
      insightsCount: briefing.insights.length,
      sourcesCount: articles.length,
      webhookResult
    });
  } catch (error: unknown) {
    console.error('[CRON] Daily scan failed:', error);
    const msg = error instanceof Error ? error.message : 'Daily Cron execution failed';
    return NextResponse.json(
      { success: false, error: msg },
      { status: 500 }
    );
  }
}
