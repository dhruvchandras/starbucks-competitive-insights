import { GoogleGenerativeAI } from '@google/generative-ai';
import { DailyBriefing, InsightCategory, InsightItem, ThreatLevel } from '@/types/intelligence';
import { RawArticle } from './rss-scanner';

interface SynthesizerOptions {
  geminiApiKey?: string;
  articles: RawArticle[];
  scannedCompetitorCount: number;
}

/**
 * Fallback heuristic strategic synthesizer when Gemini API key is not supplied
 */
function synthesizeWithHeuristics(
  articles: RawArticle[],
  scannedCount: number
): DailyBriefing {
  const today = new Date();
  const dateStr = today.toISOString().split('T')[0];
  const displayDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Categorize & score articles based on Starbucks strategic pressure keywords
  const scored = articles.map(art => {
    const text = `${art.title} ${art.snippet}`.toLowerCase();
    let score = 50;
    let category: InsightCategory = 'product_launch';
    let threatLevel: ThreatLevel = 'Moderate Pressure';

    if (text.includes('tech') || text.includes('ai') || text.includes('robot') || text.includes('automate') || text.includes('drive-thru') || text.includes('speed')) {
      category = 'restaurant_tech';
      score += 35;
      threatLevel = 'Critical Threat';
    } else if (text.includes('cold foam') || text.includes('energy') || text.includes('protein') || text.includes('boba') || text.includes('matcha') || text.includes('refresher') || text.includes('flavor')) {
      category = 'product_launch';
      score += 30;
      threatLevel = 'Critical Threat';
    } else if (text.includes('value') || text.includes('deal') || text.includes('$') || text.includes('discount') || text.includes('combo') || text.includes('price')) {
      category = 'pricing_value';
      score += 28;
      threatLevel = 'Moderate Pressure';
    } else if (text.includes('store') || text.includes('layout') || text.includes('cabin') || text.includes('kiosk') || text.includes('footprint') || text.includes('seating')) {
      category = 'store_design';
      score += 25;
      threatLevel = 'Watch Item';
    } else if (text.includes('reward') || text.includes('loyalty') || text.includes('app') || text.includes('member') || text.includes('wage') || text.includes('tip')) {
      category = 'policy_labor';
      score += 25;
      threatLevel = 'Strategic Opportunity';
    } else if (text.includes('ad') || text.includes('campaign') || text.includes('viral') || text.includes('tiktok') || text.includes('commercial')) {
      category = 'ad_campaign';
      score += 20;
      threatLevel = 'Moderate Pressure';
    }

    return { ...art, score, category, threatLevel };
  });

  // Sort by score descending and pick 3 across diverse competitors
  scored.sort((a, b) => b.score - a.score);

  const selectedArticles: typeof scored = [];
  const chosenCompetitors = new Set<string>();

  for (const item of scored) {
    if (!chosenCompetitors.has(item.competitor) && selectedArticles.length < 3) {
      selectedArticles.push(item);
      chosenCompetitors.add(item.competitor);
    }
  }

  // If we couldn't get 3 distinct competitors, take top remaining
  for (const item of scored) {
    if (selectedArticles.length >= 3) break;
    if (!selectedArticles.some(s => s.title === item.title)) {
      selectedArticles.push(item);
    }
  }

/**
 * Format a clean, human-readable executive summary without HTML remnants or repetitive URLs
 */
function buildInsightSummary(
  art: { title: string; competitor: string; category: InsightCategory; source: string; snippet?: string }
): string {
  // Clean snippet of any HTML tags or entities
  const cleanSnippet = (art.snippet || '')
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // If the snippet contains a raw link or is empty or simply matches the title, generate an editorial summary
  if (!cleanSnippet || cleanSnippet.includes('http') || cleanSnippet.toLowerCase() === art.title.toLowerCase()) {
    const cleanTitle = art.title.replace(/[\.\:\-\s]+$/, '');
    if (art.category === 'restaurant_tech') {
      return `${art.competitor} is accelerating store-level and drive-thru technology investments as detailed in recent reporting by ${art.source} ("${cleanTitle}"). The development highlights intensified competition around drive-thru throughput and digital queue efficiency.`;
    }
    if (art.category === 'product_launch') {
      return `${art.competitor} has introduced or expanded high-profile beverage and menu innovations reported by ${art.source} ("${cleanTitle}"). The launch directly contests peak morning and afternoon cold drink dayparts.`;
    }
    if (art.category === 'store_design') {
      return `${art.competitor} is advancing new retail footprints and high-velocity store formats reported by ${art.source} ("${cleanTitle}"). The concept emphasizes drive-thru accessibility, reduced capital expenditure, and streamlined order pickup.`;
    }
    if (art.category === 'pricing_value') {
      return `${art.competitor} is escalating value-tier competition reported by ${art.source} ("${cleanTitle}"). The move pressures morning food-and-beverage basket sizes and targets price-sensitive breakfast commuters.`;
    }
    if (art.category === 'policy_labor') {
      return `${art.competitor} is restructuring operational or loyalty reward rules reported by ${art.source} ("${cleanTitle}"). The changes directly impact customer retention frequency and frontline service dynamics.`;
    }
    return `${art.competitor} is advancing a key market initiative reported by ${art.source} ("${cleanTitle}"). This development represents an active maneuver to capture local beverage market share.`;
  }

  return cleanSnippet;
}

/**
 * Generate an executive lede headline without awkward mid-word truncation
 */
function generateExecutiveHeadline(insights: InsightItem[]): string {
  if (!insights || insights.length === 0) {
    return 'Daily Intelligence Dispatch: Competitor Moves Across US Coffee & QSR Verticals';
  }

  const primary = insights[0];
  const cleanTitle = primary.title.trim().replace(/[\.\:\-\s]+$/, '');
  const compFirstWord = primary.competitor.split(' ')[0].toLowerCase();
  const titleLower = cleanTitle.toLowerCase();

  let lead = cleanTitle;
  if (!titleLower.includes(compFirstWord)) {
    lead = `${primary.competitor}: ${cleanTitle}`;
  }

  // If there is a secondary competitor insight, craft an executive multi-brand dispatch title
  if (insights.length > 1 && insights[1].competitor !== primary.competitor) {
    const secondary = insights[1];
    const secTitle = secondary.title.trim().replace(/[\.\:\-\s]+$/, '');
    const secCompFirst = secondary.competitor.split(' ')[0].toLowerCase();
    const secPart = secTitle.toLowerCase().includes(secCompFirst)
      ? secTitle
      : `${secondary.competitor} Advances Competitive Push`;

    if (lead.length + secPart.length <= 135) {
      return `${lead} While ${secPart}`;
    }
  }

  // If headline is exceptionally long, truncate strictly at a clean word boundary
  if (lead.length > 130) {
    const cut = lead.slice(0, 125);
    const lastSpace = cut.lastIndexOf(' ');
    return `${lastSpace > 0 ? cut.slice(0, lastSpace) : cut}...`;
  }

  return lead;
}

  // Construct insights with tailored strategic analysis
  const insights: InsightItem[] = selectedArticles.map((art, idx) => {
    const rank = (idx + 1) as 1 | 2 | 3;
    const impactScore = Math.min(96, Math.max(75, 95 - idx * 6));

    let starbucksImpact = `Direct pressure on Starbucks USA's core beverage and service dayparts. ${art.competitor} is capitalizing on consumer demand for speed and customization, challenging Starbucks' current store workflows and average ticket size.`;
    let recommendedAction = `Review local trade area pricing and promotion cadence. Accelerate Siren Craft System throughput initiatives to maintain speed of service superiority over ${art.competitor}.`;

    if (art.category === 'restaurant_tech') {
      starbucksImpact = `${art.competitor}'s investment in automated ordering and drive-thru tech directly attacks Starbucks' suburban morning drive-thru throughput. Customers prioritizing rapid order-to-handout times will divert if Starbucks wait times exceed 3 minutes.`;
      recommendedAction = `Fast-track drive-thru digital line-busting mobile tablets and evaluate outside hand-off lanes in top-volume drive-thru stores.`;
    } else if (art.category === 'product_launch') {
      starbucksImpact = `Cold handcrafted drinks represent over 75% of Starbucks US beverage revenue. ${art.competitor}'s latest menu expansion offers consumers a direct substitute at potentially lower price points or with viral novelty appeal.`;
      recommendedAction = `Amplify promotional spotlight on Starbucks signature cold foam innovations through targeted Starbucks Rewards personalized offers and social creator partnerships.`;
    } else if (art.category === 'pricing_value') {
      starbucksImpact = `Accelerating value bundling by ${art.competitor} puts pressure on Starbucks food-plus-beverage morning basket size ($10+ average ticket), threatening price-sensitive breakfast commuters.`;
      recommendedAction = `Expand the $5/$6 Starbucks Pairing Menu promotions during morning weekday commuting hours to safeguard breakfast daypart transaction volume.`;
    } else if (art.category === 'store_design') {
      starbucksImpact = `Compact and drive-thru-only layouts allow ${art.competitor} to expand into micro-markets with lower initial capital expenditure and leaner store staffing.`;
      recommendedAction = `Evaluate modular, pickup-first store designs in high-traffic urban transit hubs and suburban highway exits where full cafe real estate is constrained.`;
    }

    const summary = buildInsightSummary(art);

    return {
      id: `ins-live-${Date.now()}-${rank}`,
      rank,
      title: art.title,
      competitor: art.competitor,
      category: art.category,
      date: dateStr,
      summary,
      starbucksImpact,
      recommendedAction,
      threatLevel: art.threatLevel,
      impactScore,
      tags: [art.competitor, art.category.replace('_', ' ').toUpperCase(), 'Competitive Sweep', 'USA Market'],
      source: {
        name: art.source,
        url: art.link,
        publishedAt: art.pubDate
      },
      metrics: {
        affectedDaypart: idx === 0 ? 'Morning Peak (6:30 - 9:30 AM)' : 'Afternoon Cold (1:00 - 4:30 PM)',
        estimatedMarketOverlap: 'National Metro & Suburban Corridors'
      }
    };
  });

  const headline = generateExecutiveHeadline(insights);

  return {
    id: `briefing-${dateStr}-${Date.now()}`,
    date: dateStr,
    displayDate,
    volumeNumber: Math.floor((today.getTime() - new Date('2026-01-01').getTime()) / (1000 * 60 * 60 * 24)),
    headline,
    executiveSummary: `Today’s automated intelligence scan reviewed ${articles.length} news signals across ${scannedCount} national and regional competitors. Competitive activity is predominantly concentrated in drive-thru velocity, functional cold beverage additions, and aggressive value meal promotions designed to pressure Starbucks' morning and afternoon daypart dominance.`,
    insights,
    scannedCompetitorCount: scannedCount,
    totalSourcesScanned: articles.length,
    keyTakeaway: insights[0]
      ? `Highest priority alert: ${insights[0].competitor}'s latest initiative requires immediate operational monitoring across overlapping trade areas.`
      : 'Sustain focus on Siren Craft System execution and morning food pairing value to preserve customer retention.',
    readTime: '4 min read',
    publishedAt: new Date().toISOString(),
    generatedBy: 'heuristic-engine'
  };
}

/**
 * Synthesize raw news articles into the Top 3 Strategic Insights for Starbucks USA
 */
export async function synthesizeIntelligence({
  geminiApiKey,
  articles,
  scannedCompetitorCount
}: SynthesizerOptions): Promise<DailyBriefing> {
  const apiKey = geminiApiKey || process.env.GEMINI_API_KEY;

  // If no API key or no articles, use the robust heuristic engine
  if (!apiKey || articles.length === 0) {
    return synthesizeWithHeuristics(articles, scannedCompetitorCount);
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const articlesSample = articles.slice(0, 25).map((a, i) => ({
      index: i + 1,
      competitor: a.competitor,
      title: a.title,
      snippet: a.snippet,
      source: a.source,
      link: a.link,
      date: a.pubDate
    }));

    const prompt = `
You are the Chief Intelligence Officer & VP of Strategy for Starbucks USA.
Your responsibility is to analyze competitor movements across national and regional coffee brands (Dutch Bros, Dunkin', McCafé/CosMc's, Blank Street, Peet's, Panera, Wendy's, Caribou, etc.) and distill the raw news into the TOP 3 MOST STRATEGIC INSIGHTS relevant to Starbucks USA leadership.

Here are the scanned web news articles from the past 24-48 hours:
${JSON.stringify(articlesSample, null, 2)}

Instructions:
1. Select the 3 most consequential, strategic competitor moves. Look across different categories:
   - product_launch (e.g. cold foam, energy drinks, protein beverages, seasonal items)
   - product_failure (discontinued items, backlash, supply issues)
   - restaurant_tech (AI drive-thrus, mobile ordering, automated espresso, line busting)
   - policy_labor (loyalty changes, pricing shifts, tipping/wage policies)
   - ad_campaign (viral TikTok drinks, celebrity collabs, value combos)
   - store_design (drive-thru only kiosks, pickup lockers, cafe downsizing)
   - pricing_value (value bundles, breakfast deals)
   - qsr_move (fast-food chains encroaching on coffee)
2. For each of the Top 3:
   - Rank 1 to 3
   - Title: Crisp, executive headline
   - Competitor: Brand name
   - Category: One of the categories above
   - Summary: 2-3 sentences explaining what happened
   - StarbucksImpact: 2-3 sentences explaining EXACTLY why this matters for Starbucks USA (threat level, impact on cold drinks, Siren Craft System, drive-thru wait times, or loyalty share)
   - RecommendedAction: 1-2 actionable, concrete counter-moves for Starbucks leadership
   - ThreatLevel: One of "Critical Threat", "Moderate Pressure", "Strategic Opportunity", "Watch Item"
   - ImpactScore: Integer from 70 to 98
   - Tags: 3-4 keywords
   - Source: { name, url, publishedAt } from the matching article
3. Create an overarching Executive Headline, a 3-sentence Executive Summary, and a 1-sentence Key Takeaway.

OUTPUT MUST BE VALID JSON ONLY with this exact schema:
{
  "headline": string,
  "executiveSummary": string,
  "keyTakeaway": string,
  "insights": [
    {
      "rank": 1,
      "title": string,
      "competitor": string,
      "category": string,
      "summary": string,
      "starbucksImpact": string,
      "recommendedAction": string,
      "threatLevel": string,
      "impactScore": number,
      "tags": [string],
      "source": { "name": string, "url": string, "publishedAt": string }
    },
    ... (total 3 items)
  ]
}
`;

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.3
      }
    });

    const responseText = result.response.text();
    const parsed = JSON.parse(responseText);

    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];
    const displayDate = today.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    interface GeminiInsightOutput {
      title?: string;
      competitor?: string;
      category?: string;
      summary?: string;
      starbucksImpact?: string;
      recommendedAction?: string;
      threatLevel?: string;
      impactScore?: number;
      tags?: string[];
      source?: {
        name: string;
        url: string;
        publishedAt: string;
      };
    }

    const insights: InsightItem[] = (parsed.insights || []).map((ins: GeminiInsightOutput, idx: number) => ({
      id: `ins-gemini-${Date.now()}-${idx + 1}`,
      rank: (idx + 1) as 1 | 2 | 3,
      title: ins.title || 'Strategic Competitor Move',
      competitor: ins.competitor || 'Industry Competitor',
      category: (ins.category as InsightCategory) || 'product_launch',
      date: dateStr,
      summary: ins.summary || '',
      starbucksImpact: ins.starbucksImpact || '',
      recommendedAction: ins.recommendedAction || '',
      threatLevel: (ins.threatLevel as ThreatLevel) || 'Moderate Pressure',
      impactScore: Number(ins.impactScore) || 85,
      tags: ins.tags || ['Competitor Intelligence'],
      source: ins.source || {
        name: 'Industry Press',
        url: 'https://news.google.com',
        publishedAt: dateStr
      }
    }));

    return {
      id: `briefing-${dateStr}-${Date.now()}`,
      date: dateStr,
      displayDate,
      volumeNumber: Math.floor((today.getTime() - new Date('2026-01-01').getTime()) / (1000 * 60 * 60 * 24)),
      headline: parsed.headline || 'Starbucks USA Daily Competitive Intelligence Briefing',
      executiveSummary: parsed.executiveSummary || 'Synthesis of top competitor movements affecting Starbucks USA market positioning.',
      insights: insights.slice(0, 3),
      scannedCompetitorCount,
      totalSourcesScanned: articles.length,
      keyTakeaway: parsed.keyTakeaway || 'Focus on drive-thru throughput and beverage innovation to counter competitor inroads.',
      readTime: '4 min read',
      publishedAt: new Date().toISOString(),
      generatedBy: 'gemini-ai'
    };
  } catch (error) {
    console.error('Gemini synthesis failed, falling back to heuristic engine:', error);
    return synthesizeWithHeuristics(articles, scannedCompetitorCount);
  }
}
