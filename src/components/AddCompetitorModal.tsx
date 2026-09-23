'use client';

import React, { useState } from 'react';
import { Competitor, CompetitorCategory } from '@/types/intelligence';
import { X, Plus, Building2, AlertTriangle } from 'lucide-react';

interface AddCompetitorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCompetitor: (competitor: Competitor) => void;
}

export const AddCompetitorModal: React.FC<AddCompetitorModalProps> = ({
  isOpen,
  onClose,
  onAddCompetitor
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<CompetitorCategory>('specialty_coffee');
  const [tier, setTier] = useState<'national' | 'regional'>('regional');
  const [threatLevel, setThreatLevel] = useState<'high' | 'medium' | 'low'>('medium');
  const [primaryMarket, setPrimaryMarket] = useState('');
  const [keywordsText, setKeywordsText] = useState('');
  const [website, setWebsite] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide a competitor brand name.');
      return;
    }

    const keywords = keywordsText
      .split(',')
      .map(k => k.trim())
      .filter(k => k.length > 0);

    if (keywords.length === 0) {
      keywords.push(name.trim(), `${name.trim()} coffee`, `${name.trim()} menu`);
    }

    const newCompetitor: Competitor = {
      id: `custom-${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Date.now()}`,
      name: name.trim(),
      category,
      tier,
      threatLevel,
      primaryMarket: primaryMarket.trim() || 'Regional / National US',
      keywords,
      website: website.trim() || undefined,
      description: description.trim() || `Custom monitored competitor in the US coffee/beverage landscape.`,
      isActive: true,
      isCustom: true
    };

    onAddCompetitor(newCompetitor);
    onClose();

    // Reset form
    setName('');
    setKeywordsText('');
    setPrimaryMarket('');
    setWebsite('');
    setDescription('');
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#121a16] border border-[#23352a] rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-white p-2 rounded-xl hover:bg-[#1c2921] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-serif font-bold text-white">Add New Competitor</h3>
            <p className="text-xs text-neutral-400">
              The agent will include this competitor in daily web sweeps and SBUX impact scoring.
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-950/60 border border-red-800 text-red-300 text-xs rounded-xl flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
              Brand Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Blue Bottle, Biggby Coffee, Foxtrot, 7-Eleven"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c1310] border border-[#24352b] text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as CompetitorCategory)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#0c1310] border border-[#24352b] text-white text-xs focus:outline-none focus:border-emerald-500"
              >
                <option value="specialty_coffee">Specialty Coffee</option>
                <option value="regional_coffee">Regional Coffee</option>
                <option value="national_qsr">National QSR</option>
                <option value="fast_casual">Fast Casual</option>
                <option value="beverage_spinoff">Beverage Spin-off</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                Scale Tier
              </label>
              <select
                value={tier}
                onChange={e => setTier(e.target.value as 'national' | 'regional')}
                className="w-full px-3 py-2.5 rounded-xl bg-[#0c1310] border border-[#24352b] text-white text-xs focus:outline-none focus:border-emerald-500"
              >
                <option value="regional">Regional Champion</option>
                <option value="national">National Footprint</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                Threat Level
              </label>
              <select
                value={threatLevel}
                onChange={e => setThreatLevel(e.target.value as 'high' | 'medium' | 'low')}
                className="w-full px-3 py-2.5 rounded-xl bg-[#0c1310] border border-[#24352b] text-white text-xs focus:outline-none focus:border-emerald-500"
              >
                <option value="high">High Threat</option>
                <option value="medium">Medium Threat</option>
                <option value="low">Low / Watch</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
              Primary Market / Territories
            </label>
            <input
              type="text"
              placeholder="e.g. Pacific Northwest, Texas & South, Mid-Atlantic Metro"
              value={primaryMarket}
              onChange={e => setPrimaryMarket(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c1310] border border-[#24352b] text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
              Custom Search Keywords (comma-separated)
            </label>
            <input
              type="text"
              placeholder="e.g. Biggby Coffee, Biggby drive thru, Biggby cold brew"
              value={keywordsText}
              onChange={e => setKeywordsText(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c1310] border border-[#24352b] text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-emerald-500"
            />
            <p className="text-[11px] text-neutral-500 mt-1">
              Leave blank to automatically use brand name + coffee / menu keywords.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
              Brief Competitive Notes
            </label>
            <textarea
              rows={2}
              placeholder="Why this competitor is relevant to Starbucks USA..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-[#0c1310] border border-[#24352b] text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#1f2d24]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-neutral-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 transition-all shadow-md shadow-emerald-950/40"
            >
              <Plus className="w-4 h-4" />
              <span>Add to Active Radar</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
