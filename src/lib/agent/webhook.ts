import { DailyBriefing } from '@/types/intelligence';

export async function sendBriefingToWebhook(
  webhookUrl: string,
  briefing: DailyBriefing
): Promise<{ success: boolean; message: string }> {
  if (!webhookUrl || !webhookUrl.startsWith('http')) {
    return { success: false, message: 'Invalid webhook URL provided' };
  }

  try {
    const isSlack = webhookUrl.includes('slack.com');
    const isDiscord = webhookUrl.includes('discord.com');

    let payload: Record<string, unknown>;

    if (isSlack) {
      payload = {
        text: `☕ *Starbucks USA Daily Competitive Intelligence — Vol. ${briefing.volumeNumber}*\n*${briefing.headline}*`,
        blocks: [
          {
            type: 'header',
            text: {
              type: 'plain_text',
              text: `☕ Starbucks USA Competitive Intel: Vol. ${briefing.volumeNumber}`,
              emoji: true
            }
          },
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `*Date:* ${briefing.displayDate}\n*Headline:* ${briefing.headline}\n\n_${briefing.executiveSummary}_`
            }
          },
          { type: 'divider' },
          ...briefing.insights.flatMap(ins => [
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: `*#${ins.rank} [${ins.threatLevel.toUpperCase()}] ${ins.competitor}* — ${ins.title}\n*Category:* ${ins.category} | *Impact Score:* ${ins.impactScore}/100\n\n*What Happened:* ${ins.summary}\n\n*🚨 Starbucks USA Impact:* ${ins.starbucksImpact}\n\n*💡 Recommended Action:* ${ins.recommendedAction}\n\n<${ins.source.url}|Source: ${ins.source.name}>`
              }
            },
            { type: 'divider' }
          ]),
          {
            type: 'context',
            elements: [
              {
                type: 'mrkdwn',
                text: `Key Takeaway: *${briefing.keyTakeaway}* | Scanned ${briefing.scannedCompetitorCount} competitors & ${briefing.totalSourcesScanned} sources.`
              }
            ]
          }
        ]
      };
    } else if (isDiscord) {
      payload = {
        content: `**☕ Starbucks USA Daily Competitive Intelligence — Vol. ${briefing.volumeNumber}**\n${briefing.headline}`,
        embeds: briefing.insights.map(ins => ({
          title: `#${ins.rank} ${ins.competitor}: ${ins.title}`,
          url: ins.source.url,
          color: ins.threatLevel === 'Critical Threat' ? 0xdc2626 : ins.threatLevel === 'Moderate Pressure' ? 0xeab308 : 0x059669,
          fields: [
            { name: 'Category', value: ins.category, inline: true },
            { name: 'Threat Level', value: ins.threatLevel, inline: true },
            { name: 'Impact Score', value: `${ins.impactScore}/100`, inline: true },
            { name: 'Summary', value: ins.summary },
            { name: '🚨 Starbucks USA Impact', value: ins.starbucksImpact },
            { name: '💡 Recommended Counter-Action', value: ins.recommendedAction }
          ],
          footer: { text: `Source: ${ins.source.name} • ${ins.date}` }
        }))
      };
    } else {
      // Generic JSON webhook
      payload = {
        event: 'starbucks_competitive_briefing',
        briefing
      };
    }

    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      return { success: false, message: `Webhook responded with status ${res.status}` };
    }

    return { success: true, message: 'Briefing successfully dispatched to webhook' };
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Failed to dispatch webhook';
    return { success: false, message: msg };
  }
}
