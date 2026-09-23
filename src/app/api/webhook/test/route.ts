import { NextRequest, NextResponse } from 'next/server';
import { sendBriefingToWebhook } from '@/lib/agent/webhook';
import { HISTORICAL_BRIEFINGS } from '@/lib/constants/historical-briefings';

export async function POST(req: NextRequest) {
  try {
    const { webhookUrl } = await req.json();
    if (!webhookUrl) {
      return NextResponse.json({ success: false, error: 'webhookUrl is required' }, { status: 400 });
    }

    const sampleBriefing = HISTORICAL_BRIEFINGS[0];
    const result = await sendBriefingToWebhook(webhookUrl, sampleBriefing);

    return NextResponse.json(result);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Webhook test failed';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
