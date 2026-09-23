'use client';

import React, { useState, useMemo } from 'react';
import { Competitor, CompetitorCategory } from '@/types/intelligence';
import { AddCompetitorModal } from './AddCompetitorModal';
import { 
  Building2, 
  Plus, 
  Search, 
  Globe, 
  CheckCircle2, 
  XCircle, 
  Trash2, 
  ExternalLink,
  RefreshCw
} from 'lucide-react';

interface CompetitorsManagerProps {
  competitors: Competitor[];
  onToggleCompetitor: (id: string) => void;
  onAddCompetitor: (competitor: Competitor) => void;
  onDeleteCompetitor: (id: string) => void;
  onResetToDefaults: () => void;
}

export const CompetitorsManager: React.FC<CompetitorsManagerProps> = ({
  competitors,
  onToggleCompetitor,
  onAddCompetitor,
  onDeleteCompetitor,
  onResetToDefaults
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTier, setSelectedTier] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const stats = useMemo(() => {
    const total = competitors.length;
    const active = competitors.filter(c => c.isActive).length;
    const national = competitors.filter(c => c.tier === 'national').length;
    const regional = competitors.filter(c => c.tier === 'regional').length;
    const custom = competitors.filter(c => c.isCustom).length;
    return { total, active, national, regional, custom };
  }, [competitors]);

  const filteredCompetitors = useMemo(() => {
    return competitors.filter(c => {
      const matchesSearch =
        !searchQuery ||
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.primaryMarket.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTier = selectedTier === 'all' || c.tier === selectedTier;
      const matchesCategory = selectedCategory === 'all' || c.category === selectedCategory;

      return matchesSearch && matchesTier && matchesCategory;
    });
  }, [competitors, searchQuery, selectedTier, selectedCategory]);

  const getCategoryLabel = (cat: CompetitorCategory) => {
    const map: Record<CompetitorCategory, string> = {
      specialty_coffee: 'Specialty Coffee',
      regional_coffee: 'Regional Coffee',
      national_qsr: 'National QSR',
      fast_casual: 'Fast Casual',
      beverage_spinoff: 'Beverage Spin-off'
    };
    return map[cat] || cat;
  };

  const getThreatBadge = (level: string) => {
    switch (level) {
      case 'high':
        return 'bg-red-500/10 text-red-400 border-red-500/30';
      case 'medium':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      default:
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner & Stats */}
      <div className="bg-gradient-to-r from-[#14231b] via-[#101b15] to-[#122019] rounded-3xl p-6 sm:p-8 border border-emerald-800/40 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-700/50 mb-3">
              <Building2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Surveillance Matrix & Brand Radar</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight mb-2">
              National & Regional Competitors
            </h2>
            <p className="text-neutral-300 text-sm max-w-2xl leading-relaxed">
              Configure which coffee chains, beverage spin-offs, and QSR brands the agent monitors during daily news sweeps. Add custom regional contenders to customize coverage.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 transition-all shadow-lg shadow-emerald-950/50"
            >
              <Plus className="w-4 h-4" />
              <span>Add Competitor</span>
            </button>

            <button
              onClick={onResetToDefaults}
              title="Reset to default brand roster"
              className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-medium text-neutral-400 hover:text-white bg-[#0e1612] hover:bg-[#16221c] border border-[#23352a] transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Defaults</span>
            </button>
          </div>
        </div>

        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-[#1d2d23]">
          <div className="bg-[#0b100d]/80 p-3.5 rounded-2xl border border-[#1c2a21]">
            <p className="text-[11px] uppercase tracking-wider font-semibold text-neutral-400">Total Tracked</p>
            <p className="text-2xl font-bold font-serif text-white mt-0.5">{stats.total}</p>
          </div>
          <div className="bg-[#0b100d]/80 p-3.5 rounded-2xl border border-[#1c2a21]">
            <p className="text-[11px] uppercase tracking-wider font-semibold text-emerald-400">Active Scanners</p>
            <p className="text-2xl font-bold font-serif text-emerald-300 mt-0.5">{stats.active}</p>
          </div>
          <div className="bg-[#0b100d]/80 p-3.5 rounded-2xl border border-[#1c2a21]">
            <p className="text-[11px] uppercase tracking-wider font-semibold text-neutral-400">National vs Regional</p>
            <p className="text-lg font-bold font-serif text-neutral-200 mt-1">
              {stats.national} <span className="text-xs font-normal text-neutral-500">Nat</span> / {stats.regional} <span className="text-xs font-normal text-neutral-500">Reg</span>
            </p>
          </div>
          <div className="bg-[#0b100d]/80 p-3.5 rounded-2xl border border-[#1c2a21]">
            <p className="text-[11px] uppercase tracking-wider font-semibold text-neutral-400">User Custom Brands</p>
            <p className="text-2xl font-bold font-serif text-teal-300 mt-0.5">{stats.custom}</p>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter by name, region, or keywords..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0c1310] border border-[#24352b] text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex gap-2">
          <select
            value={selectedTier}
            onChange={e => setSelectedTier(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl bg-[#0c1310] border border-[#24352b] text-white text-xs focus:outline-none focus:border-emerald-500"
          >
            <option value="all">All Tiers</option>
            <option value="national">National Footprint</option>
            <option value="regional">Regional Players</option>
          </select>

          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl bg-[#0c1310] border border-[#24352b] text-white text-xs focus:outline-none focus:border-emerald-500"
          >
            <option value="all">All Categories</option>
            <option value="specialty_coffee">Specialty Coffee</option>
            <option value="regional_coffee">Regional Coffee</option>
            <option value="national_qsr">National QSR</option>
            <option value="fast_casual">Fast Casual</option>
            <option value="beverage_spinoff">Beverage Spin-off</option>
          </select>
        </div>
      </div>

      {/* Competitors Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCompetitors.map(competitor => (
          <div
            key={competitor.id}
            className={`rounded-2xl p-5 border transition-all duration-200 flex flex-col justify-between ${
              competitor.isActive
                ? 'bg-[#101713] border-[#223328] hover:border-emerald-600/40 shadow-sm'
                : 'bg-[#0d1210]/60 border-[#1a251f] opacity-60'
            }`}
          >
            <div>
              {/* Header row */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#18261e] border border-[#2a3e32] flex items-center justify-center font-serif font-bold text-emerald-300">
                    {competitor.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-bold text-white tracking-tight">
                        {competitor.name}
                      </h4>
                      {competitor.isCustom && (
                        <span className="text-[10px] bg-teal-950/80 text-teal-300 border border-teal-700/50 px-1.5 py-0.2 rounded">
                          Custom
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-400">
                      {getCategoryLabel(competitor.category)}
                    </p>
                  </div>
                </div>

                {/* Active Toggle Switch */}
                <button
                  onClick={() => onToggleCompetitor(competitor.id)}
                  title={competitor.isActive ? 'Disable scanner for this competitor' : 'Enable scanner'}
                  className={`p-1.5 rounded-lg border transition-colors ${
                    competitor.isActive
                      ? 'bg-emerald-950/80 text-emerald-400 border-emerald-700/50 hover:bg-emerald-900/80'
                      : 'bg-neutral-900 text-neutral-500 border-neutral-800 hover:text-neutral-400'
                  }`}
                >
                  {competitor.isActive ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <XCircle className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Badges Row */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-[11px] font-medium bg-[#16221b] text-neutral-300 px-2 py-0.5 rounded border border-[#24352a]">
                  {competitor.tier === 'national' ? '🇺🇸 National Footprint' : '📍 Regional Footprint'}
                </span>

                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${getThreatBadge(competitor.threatLevel)}`}>
                  {competitor.threatLevel.toUpperCase()} THREAT
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-neutral-300 leading-relaxed mb-4">
                {competitor.description}
              </p>

              {/* Territory */}
              <div className="text-[11px] text-neutral-400 mb-3 flex items-center gap-1.5">
                <Globe className="w-3 h-3 text-emerald-400 shrink-0" />
                <span className="truncate">{competitor.primaryMarket}</span>
              </div>

              {/* Keywords Tag cloud */}
              <div className="flex flex-wrap items-center gap-1 mb-4">
                {competitor.keywords.slice(0, 3).map((kw, i) => (
                  <span
                    key={i}
                    className="text-[10px] text-neutral-400 bg-[#0d1411] px-2 py-0.5 rounded border border-[#1f2d24]"
                  >
                    {kw}
                  </span>
                ))}
                {competitor.keywords.length > 3 && (
                  <span className="text-[10px] text-neutral-500">
                    +{competitor.keywords.length - 3} more
                  </span>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-[#1a261f] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                {competitor.website && (
                  <a
                    href={competitor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 hover:text-emerald-400 flex items-center gap-1 transition-colors text-[11px]"
                  >
                    <span>Website</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              {competitor.isCustom && (
                <button
                  onClick={() => onDeleteCompetitor(competitor.id)}
                  title="Remove custom competitor"
                  className="text-neutral-500 hover:text-red-400 p-1 rounded transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Competitor Modal */}
      <AddCompetitorModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddCompetitor={onAddCompetitor}
      />
    </div>
  );
};
