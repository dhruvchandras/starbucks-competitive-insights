'use client';

import React, { useState, useMemo } from 'react';
import { DailyBriefing } from '@/types/intelligence';
import { BriefingCard } from './BriefingCard';
import { Search, Filter, Calendar, Sparkles, AlertCircle, ArrowDown } from 'lucide-react';

interface BlogFeedProps {
  briefings: DailyBriefing[];
  onOpenScanModal: () => void;
}

export const BlogFeed: React.FC<BlogFeedProps> = ({ briefings, onOpenScanModal }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCompetitor, setSelectedCompetitor] = useState<string>('all');

  // Extract unique competitors from all briefings
  const allCompetitorNames = useMemo(() => {
    const set = new Set<string>();
    briefings.forEach(b => b.insights.forEach(ins => set.add(ins.competitor)));
    return Array.from(set).sort();
  }, [briefings]);

  // Categories list
  const categories: Array<{ id: string; label: string }> = [
    { id: 'all', label: 'All Verticals' },
    { id: 'restaurant_tech', label: 'Restaurant Tech & AI' },
    { id: 'product_launch', label: 'Product Innovations' },
    { id: 'pricing_value', label: 'Pricing & Value' },
    { id: 'store_design', label: 'Store Footprint & Layout' },
    { id: 'policy_labor', label: 'Policies & Loyalty' },
    { id: 'ad_campaign', label: 'Ad Campaigns & Viral' }
  ];

  // Filter briefings based on search, category, and competitor
  const filteredBriefings = useMemo(() => {
    return briefings.filter(briefing => {
      // Matches query in headline, summary, or any of the 3 insights
      const matchesSearch =
        !searchQuery ||
        briefing.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        briefing.executiveSummary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        briefing.insights.some(
          ins =>
            ins.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            ins.competitor.toLowerCase().includes(searchQuery.toLowerCase()) ||
            ins.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
            ins.starbucksImpact.toLowerCase().includes(searchQuery.toLowerCase())
        );

      // Matches category
      const matchesCategory =
        selectedCategory === 'all' ||
        briefing.insights.some(ins => ins.category === selectedCategory);

      // Matches competitor
      const matchesCompetitor =
        selectedCompetitor === 'all' ||
        briefing.insights.some(ins => ins.competitor === selectedCompetitor);

      return matchesSearch && matchesCategory && matchesCompetitor;
    });
  }, [briefings, searchQuery, selectedCategory, selectedCompetitor]);

  return (
    <div className="space-y-8">
      {/* Blog Feed Intro Banner */}
      <div className="bg-gradient-to-r from-[#14231b] via-[#101b15] to-[#122019] rounded-3xl p-6 sm:p-8 border border-emerald-800/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-700/50 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Executive Daily Intel Log</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight mb-3">
            Competitive Moves & Strategic Counter-Playbook
          </h2>
          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-6">
            Autonomous daily web sweeps monitoring national coffee leaders, regional challengers, and QSR breakfast giants. Scroll down to explore chronological dispatches and strategic teardowns.
          </p>

          {/* Search & Filters Row */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search insights, cold foam, drive-thru, Dutch Bros, McCafé..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0c1310] border border-[#24352b] text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              {/* Competitor Dropdown */}
              <div className="sm:w-60">
                <select
                  value={selectedCompetitor}
                  onChange={e => setSelectedCompetitor(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c1310] border border-[#24352b] text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                >
                  <option value="all">All Competitors ({allCompetitorNames.length})</option>
                  {allCompetitorNames.map(name => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs text-neutral-400 flex items-center gap-1 mr-1">
                <Filter className="w-3 h-3 text-emerald-400" />
                Topic:
              </span>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`text-xs px-3 py-1.5 rounded-lg transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                      : 'bg-[#0f1713] text-neutral-400 hover:text-white hover:bg-[#18251e] border border-[#223128]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Dispatches Timeline / Historical Continuous Scroll */}
      <div className="space-y-10">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-semibold tracking-wider uppercase text-neutral-400">
              Chronological Intelligence Dispatches ({filteredBriefings.length})
            </h3>
          </div>
          <span className="text-xs text-neutral-500">
            Scroll down to review previous issues
          </span>
        </div>

        {filteredBriefings.length === 0 ? (
          <div className="bg-[#101713] border border-[#223128] rounded-3xl p-12 text-center max-w-md mx-auto">
            <AlertCircle className="w-10 h-10 text-neutral-500 mx-auto mb-3" />
            <h4 className="text-base font-bold text-white mb-1">No matching insights found</h4>
            <p className="text-xs text-neutral-400 mb-4">
              Try adjusting your search terms or resetting the category filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedCompetitor('all');
              }}
              className="text-xs px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl font-medium transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredBriefings.map((briefing, idx) => (
            <BriefingCard
              key={briefing.id}
              briefing={briefing}
              isLatest={idx === 0 && selectedCategory === 'all' && selectedCompetitor === 'all' && !searchQuery}
            />
          ))
        )}

        {/* Scroll footer indicating continuous history */}
        {filteredBriefings.length > 0 && (
          <div className="py-8 text-center border-t border-[#1b2720]">
            <p className="text-xs text-neutral-500 mb-2">
              End of indexed dispatches • Daily scan runs automatically each morning at 7:00 AM EST
            </p>
            <button
              onClick={onOpenScanModal}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <span>Trigger on-demand sweep now</span>
              <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
