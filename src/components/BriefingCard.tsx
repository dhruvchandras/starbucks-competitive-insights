'use client';

import React, { useState } from 'react';
import { DailyBriefing } from '@/types/intelligence';
import { 
  Sparkles, 
  ExternalLink, 
  ShieldAlert, 
  TrendingUp, 
  Copy, 
  Check, 
  Clock, 
  Award
} from 'lucide-react';

interface BriefingCardProps {
  briefing: DailyBriefing;
  isLatest?: boolean;
}

export const BriefingCard: React.FC<BriefingCardProps> = ({ briefing, isLatest = false }) => {
  const [copiedMemo, setCopiedMemo] = useState(false);

  const getThreatColor = (level: string) => {
    switch (level) {
      case 'Critical Threat':
        return 'bg-red-500/10 text-red-400 border-red-500/30';
      case 'Moderate Pressure':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Strategic Opportunity':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Watch Item':
      default:
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
    }
  };

  const getCategoryLabel = (category: string) => {
    const map: Record<string, string> = {
      product_launch: 'Product Launch',
      product_failure: 'Product Teardown',
      restaurant_tech: 'Restaurant Tech & AI',
      policy_labor: 'Policies & Loyalty',
      ad_campaign: 'Ad Campaign & Viral',
      store_design: 'Store Design & Footprint',
      pricing_value: 'Pricing & Value Combos',
      qsr_move: 'QSR Breakfast Move'
    };
    return map[category] || category.replace('_', ' ').toUpperCase();
  };

  const copyAsMemo = () => {
    const text = `☕ *STARBUCKS USA COMPETITIVE INTELLIGENCE DISPATCH*
Issue: Vol. ${briefing.volumeNumber} • ${briefing.displayDate}
Headline: ${briefing.headline}

OVERVIEW:
${briefing.executiveSummary}

━━━━━━━━━━━━━━━━━━━━━━━━━━
TOP 3 STRATEGIC COMPETITIVE INSIGHTS:
${briefing.insights
  .map(
    (ins) => `
#${ins.rank} [${ins.threatLevel.toUpperCase()}] ${ins.competitor} — ${ins.title}
• Category: ${getCategoryLabel(ins.category)} | Impact Score: ${ins.impactScore}/100
• What Happened: ${ins.summary}
• 🚨 SBUX Impact: ${ins.starbucksImpact}
• 💡 Recommended Action: ${ins.recommendedAction}
• Source: ${ins.source.name} (${ins.source.url})
`
  )
  .join('\n')}
━━━━━━━━━━━━━━━━━━━━━━━━━━
KEY EXECUTIVE TAKEAWAY:
${briefing.keyTakeaway}
`;

    navigator.clipboard.writeText(text);
    setCopiedMemo(true);
    setTimeout(() => setCopiedMemo(false), 2500);
  };

  return (
    <article className={`rounded-3xl border transition-all duration-300 ${
      isLatest 
        ? 'bg-gradient-to-b from-[#15211b] via-[#101713] to-[#0c100e] border-emerald-600/40 shadow-2xl shadow-emerald-950/20' 
        : 'bg-[#101713] border-[#1e2a23] hover:border-[#2d4237]'
    }`}>
      {/* Blog Article Masthead */}
      <div className="p-6 sm:p-8 border-b border-[#1c2921]">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-serif font-bold tracking-wider uppercase bg-[#182a20] text-emerald-300 border border-emerald-700/50">
              Dispatch Vol. {briefing.volumeNumber}
            </span>
            {isLatest && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Latest Daily Issue
              </span>
            )}
            <span className="text-xs text-neutral-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {briefing.readTime}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-400 bg-[#16201a] px-2.5 py-1 rounded-lg border border-[#233329]">
              Scanned: <strong className="text-neutral-200">{briefing.scannedCompetitorCount} brands</strong> ({briefing.totalSourcesScanned} sources)
            </span>
            <button
              onClick={copyAsMemo}
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-[#18261e] hover:bg-[#203328] text-neutral-200 border border-[#2b3e32] transition-colors"
            >
              {copiedMemo ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-neutral-400" />}
              <span>{copiedMemo ? 'Copied Memo!' : 'Copy Memo'}</span>
            </button>
          </div>
        </div>

        {/* Date & Big Title */}
        <p className="text-xs font-medium text-emerald-400/90 tracking-wide uppercase mb-1">
          {briefing.displayDate}
        </p>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight leading-snug mb-4">
          {briefing.headline}
        </h2>

        {/* Narrative Executive Summary */}
        <div className="prose prose-invert max-w-none text-neutral-300 text-sm sm:text-base leading-relaxed bg-[#0b100d]/60 p-4 sm:p-5 rounded-2xl border border-[#1b2820]">
          <p>{briefing.executiveSummary}</p>
        </div>
      </div>

      {/* The 3 Most Interesting Strategic Insights */}
      <div className="p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base sm:text-lg font-serif font-bold text-white tracking-tight">
              Top 3 Strategic Insights For Starbucks USA
            </h3>
          </div>
          <span className="text-xs text-neutral-400">
            Curated by {briefing.generatedBy === 'gemini-ai' ? 'Gemini AI Agent' : 'Siren Heuristic Engine'}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {briefing.insights.map((insight) => (
            <div
              key={insight.id}
              className="group relative bg-[#0e1612] hover:bg-[#121c16] rounded-2xl p-5 sm:p-6 border border-[#202f26] hover:border-emerald-600/40 transition-all duration-200 shadow-sm"
            >
              {/* Insight Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-emerald-950 text-emerald-300 font-mono font-bold text-xs flex items-center justify-center border border-emerald-700/60">
                    0{insight.rank}
                  </span>
                  <span className="font-semibold text-white text-sm sm:text-base">
                    {insight.competitor}
                  </span>
                  <span className="text-neutral-500">•</span>
                  <span className="text-xs font-medium text-neutral-300 bg-[#16221b] px-2 py-0.5 rounded border border-[#24352b]">
                    {getCategoryLabel(insight.category)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${getThreatColor(insight.threatLevel)}`}>
                    {insight.threatLevel}
                  </span>
                  <span className="text-xs font-mono font-medium text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                    Score: {insight.impactScore}/100
                  </span>
                </div>
              </div>

              {/* Title */}
              <h4 className="text-base sm:text-lg font-semibold text-white mb-3 group-hover:text-emerald-300 transition-colors">
                {insight.title}
              </h4>

              {/* What Happened (Summary) */}
              <p className="text-sm text-neutral-300 leading-relaxed mb-4">
                {insight.summary}
              </p>

              {/* Strategic Teardown: Why SBUX Should Care & Counter Action */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {/* Starbucks Impact */}
                <div className="bg-[#152019] p-3.5 rounded-xl border border-[#25362c]">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-red-400 mb-1.5 uppercase tracking-wider">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>🚨 Strategic Impact on SBUX</span>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    {insight.starbucksImpact}
                  </p>
                </div>

                {/* Recommended Counter-Action */}
                <div className="bg-[#122319] p-3.5 rounded-xl border border-emerald-800/40">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 mb-1.5 uppercase tracking-wider">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>💡 Recommended Counter-Action</span>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    {insight.recommendedAction}
                  </p>
                </div>
              </div>

              {/* Source & Tags Footer */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[#1a261f] text-xs">
                <div className="flex flex-wrap items-center gap-1.5">
                  {insight.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[11px] text-neutral-400 bg-[#16211a] px-2 py-0.5 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <a
                  href={insight.source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
                >
                  <span>Source: {insight.source.name}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Executive Takeaway Banner */}
        <div className="bg-gradient-to-r from-emerald-950/70 via-[#10241a] to-emerald-950/70 border border-emerald-700/50 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
          <div className="p-2 rounded-xl bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 shrink-0">
            <Sparkles className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-300 mb-1">
              Executive Takeaway & Operational Priority
            </h5>
            <p className="text-sm text-neutral-200 font-medium leading-relaxed">
              {briefing.keyTakeaway}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};
