export interface RawArticle {
  title: string;
  link: string;
  source: string;
  pubDate: string;
  snippet: string;
  competitor: string;
}

/**
 * Thoroughly clean HTML tags, entities, and excessive whitespace from RSS text
 */
function cleanHtmlAndEntities(text: string): string {
  if (!text) return '';
  return text
    // 1. Decode common XML / HTML entities
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    // 2. Strip all HTML tags
    .replace(/<[^>]*>/g, '')
    // 3. Clean up any remaining entities
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    // 4. Normalize whitespace
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
      let rawTitle = cleanHtmlAndEntities(titleMatch[1]);
      let sourceName = sourceMatch ? cleanHtmlAndEntities(sourceMatch[1]) : '';

      // Always strip trailing " - Source Name" or " | Source Name" from rawTitle
      if (rawTitle.includes(' - ')) {
        const lastDashIdx = rawTitle.lastIndexOf(' - ');
        const possibleSource = rawTitle.slice(lastDashIdx + 3).trim();
        if (!sourceName) {
          sourceName = possibleSource;
        }
        rawTitle = rawTitle.slice(0, lastDashIdx).trim();
      } else if (rawTitle.includes(' | ')) {
        const lastPipeIdx = rawTitle.lastIndexOf(' | ');
        const possibleSource = rawTitle.slice(lastPipeIdx + 3).trim();
        if (!sourceName) {
          sourceName = possibleSource;
        }
        rawTitle = rawTitle.slice(0, lastPipeIdx).trim();
      }

      if (!sourceName) sourceName = 'Industry Press';

      // Clean snippet and ensure it doesn't just duplicate the title/source or have raw HTML remnants
      let cleanSnippet = descMatch ? cleanHtmlAndEntities(descMatch[1]) : '';
      const snippetLower = cleanSnippet.toLowerCase();
      const titleLower = rawTitle.toLowerCase();
      if (
        snippetLower === titleLower ||
        snippetLower.startsWith(titleLower) ||
        snippetLower.length < 25 ||
        snippetLower.includes('http') ||
        snippetLower.includes('<a')
      ) {
        cleanSnippet = '';
      }

      articles.push({
        title: rawTitle,
        link: linkMatch[1].trim(),
        source: sourceName,
        pubDate: pubDateMatch ? pubDateMatch[1].trim() : new Date().toISOString(),
        snippet: cleanSnippet,
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
