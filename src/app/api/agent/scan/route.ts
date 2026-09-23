import { NextRequest, NextResponse } from 'next/server';
import { DEFAULT_COMPETITORS } from '@/lib/constants/default-competitors';
import { scanAllCompetitors } from '@/lib/agent/rss-scanner';
import { synthesizeIntelligence } from '@/lib/agent/synthesizer';
import { sendBriefingToWebhook } from '@/lib/agent/webhook';
import { Competitor } from '@/types/intelligence';

export const dynamic = 'force-dynamic';
export const maxDuration = 60; // Allow up to 60s for Vercel functions

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const competitors: Competitor[] = body.competitors || DEFAULT_COMPETITORS;
    const geminiApiKey: string | undefined = body.geminiApiKey || process.env.GEMINI_API_KEY;
    const webhookUrl: string | undefined = body.webhookUrl || process.env.SLACK_WEBHOOK_URL;

    // 1. Scan live RSS feeds
    const { articles, scannedCount } = await scanAllCompetitors(competitors);

    // 2. Synthesize Top 3 Insights
    const briefing = await synthesizeIntelligence({
      geminiApiKey,
      articles,
      scannedCompetitorCount: scannedCount
    });

    // 3. Optional webhook notification
    let webhookResult = null;
    if (webhookUrl) {
      webhookResult = await sendBriefingToWebhook(webhookUrl, briefing);
    }

    return NextResponse.json({
      success: true,
      briefing,
      articlesFoundCount: articles.length,
      webhookResult
    });
  } catch (error: unknown) {
    console.error('Scan API failed:', error);
    const msg = error instanceof Error ? error.message : 'Agent scan failed';
    return NextResponse.json(
      { success: false, error: msg },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  return POST(req);
}
