export interface RawArticle {
  title: string;
  link: string;
  source: string;
  pubDate: string;
  snippet: string;
  competitor: string;
}

/**
 * Clean HTML entities and tags from RSS feed text
 */
function cleanText(text: string): string {
  return text
    .replace(/<[^>]*>?/gm, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Simple, fast XML parser for Google News RSS feeds
 */
function parseGoogleNewsRss(xmlText: string, competitorName: string): RawArticle[] {
  const articles: RawArticle[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let match: RegExpExecArray | null;

  while ((match = itemRegex.exec(xmlText)) !== null) {
    const itemContent = match[1];

    const titleMatch = /<title>([\s\S]*?)<\/title>/i.exec(itemContent);
    const linkMatch = /<link>([\s\S]*?)<\/link>/i.exec(itemContent);
    const pubDateMatch = /<pubDate>([\s\S]*?)<\/pubDate>/i.exec(itemContent);
    const descMatch = /<description>([\s\S]*?)<\/description>/i.exec(itemContent);
    const sourceMatch = /<source[^>]*>([\s\S]*?)<\/source>/i.exec(itemContent);

    if (titleMatch && linkMatch) {
      let rawTitle = cleanText(titleMatch[1]);
      let sourceName = sourceMatch ? cleanText(sourceMatch[1]) : '';

      // Google News title usually ends with "- Source Name"
      if (!sourceName && rawTitle.includes(' - ')) {
        const parts = rawTitle.split(' - ');
        sourceName = parts.pop()?.trim() || 'Industry Source';
        rawTitle = parts.join(' - ').trim();
      }

      articles.push({
        title: rawTitle,
        link: linkMatch[1].trim(),
        source: sourceName || 'Industry Press',
        pubDate: pubDateMatch ? pubDateMatch[1].trim() : new Date().toISOString(),
        snippet: descMatch ? cleanText(descMatch[1]) : '',
        competitor: competitorName
      });
    }

    if (articles.length >= 8) break; // keep top 8 most recent per query to prevent overload
  }

  return articles;
}

/**
 * Scan web news via Google News RSS for a single competitor or search query
 */
export async function scanCompetitorNews(competitorName: string, customKeywords?: string[]): Promise<RawArticle[]> {
  try {
    const queryTerms = customKeywords && customKeywords.length > 0 
      ? customKeywords.slice(0, 3).join(' OR ')
      : `${competitorName} coffee OR restaurant OR menu OR tech`;

    const encodedQuery = encodeURIComponent(queryTerms);
    const url = `https://news.google.com/rss/search?q=${encodedQuery}&hl=en-US&gl=US&ceid=US:en`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000); // 6 sec timeout per competitor

    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
        Accept: 'application/rss+xml, application/xml, text/xml, */*'
      }
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      console.warn(`Failed to fetch RSS for ${competitorName}: ${res.statusText}`);
      return [];
    }

    const xml = await res.text();
    return parseGoogleNewsRss(xml, competitorName);
  } catch (error) {
    console.error(`Error scanning news for ${competitorName}:`, error);
    return [];
  }
}

/**
 * Aggregate news across a list of active competitors
 */
export async function scanAllCompetitors(
  competitors: Array<{ name: string; keywords?: string[]; isActive: boolean }>
): Promise<{ articles: RawArticle[]; scannedCount: number }> {
  const activeCompetitors = competitors.filter(c => c.isActive);
  const scanPromises = activeCompetitors.map(c => scanCompetitorNews(c.name, c.keywords));

  const results = await Promise.allSettled(scanPromises);
  const allArticles: RawArticle[] = [];

  for (const res of results) {
    if (res.status === 'fulfilled' && Array.isArray(res.value)) {
      allArticles.push(...res.value);
    }
  }

  // Deduplicate by title similarity
  const seenTitles = new Set<string>();
  const uniqueArticles = allArticles.filter(article => {
    const simplified = article.title.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 40);
    if (seenTitles.has(simplified)) return false;
    seenTitles.add(simplified);
    return true;
  });

  return {
    articles: uniqueArticles,
    scannedCount: activeCompetitors.length
  };
}
