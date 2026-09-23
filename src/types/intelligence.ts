export type InsightCategory =
  | 'product_launch'
  | 'product_failure'
  | 'policy_labor'
  | 'restaurant_tech'
  | 'ad_campaign'
  | 'store_design'
  | 'pricing_value'
  | 'qsr_move';

export type ThreatLevel = 'Critical Threat' | 'Moderate Pressure' | 'Strategic Opportunity' | 'Watch Item';

export type CompetitorCategory =
  | 'specialty_coffee'
  | 'national_qsr'
  | 'regional_coffee'
  | 'fast_casual'
  | 'beverage_spinoff';

export interface Competitor {
  id: string;
  name: string;
  category: CompetitorCategory;
  tier: 'national' | 'regional';
  keywords: string[];
  website?: string;
  isActive: boolean;
  isCustom?: boolean;
  threatLevel: 'high' | 'medium' | 'low';
  description: string;
  primaryMarket: string;
}

export interface InsightItem {
  id: string;
  rank: 1 | 2 | 3;
  title: string;
  competitor: string;
  category: InsightCategory;
  date: string;
  summary: string;
  starbucksImpact: string;
  recommendedAction: string;
  threatLevel: ThreatLevel;
  impactScore: number; // 0 - 100
  tags: string[];
  source: {
    name: string;
    url: string;
    publishedAt: string;
  };
  metrics?: {
    estimatedMarketOverlap?: string;
    affectedDaypart?: string;
  };
}

export interface DailyBriefing {
  id: string;
  date: string; // YYYY-MM-DD
  displayDate: string;
  volumeNumber: number;
  headline: string;
  executiveSummary: string;
  insights: InsightItem[];
  scannedCompetitorCount: number;
  totalSourcesScanned: number;
  keyTakeaway: string;
  readTime: string;
  publishedAt: string;
  generatedBy: 'gemini-ai' | 'heuristic-engine';
}

export interface AgentScanProgress {
  step: 'idle' | 'fetching_news' | 'filtering_candidates' | 'synthesizing_sbux_impact' | 'finalizing_top3' | 'completed' | 'error';
  message: string;
  currentCompetitor?: string;
  sourcesFound?: number;
  progressPercent: number;
}
