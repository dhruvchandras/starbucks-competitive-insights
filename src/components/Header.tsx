'use client';

import React from 'react';
import { Newspaper, Building2, SlidersHorizontal, Radar, Clock, Globe } from 'lucide-react';

interface HeaderProps {
  activeTab: 'blog' | 'competitors';
  setActiveTab: (tab: 'blog' | 'competitors') => void;
  onOpenScanModal: () => void;
  onOpenSettingsModal: () => void;
  isScanning: boolean;
  totalCompetitors: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenScanModal,
  onOpenSettingsModal,
  isScanning,
  totalCompetitors
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0f1412]/90 backdrop-blur-md border-b border-[#22312a]">
      {/* Top Banner: Cron & Status info */}
      <div className="bg-[#16221c] border-b border-[#1f2f26] px-4 py-1.5 text-xs text-emerald-400/90 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-emerald-300 font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Automated Daily Agent Active
          </span>
          <span className="hidden sm:inline text-emerald-600">•</span>
          <span className="hidden sm:flex items-center gap-1 text-neutral-400">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            Runs Daily at 07:00 AM EST via Vercel Cron
          </span>
          <span className="hidden md:inline text-emerald-600">•</span>
          <span className="hidden md:flex items-center gap-1 text-neutral-400">
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            {totalCompetitors} National & Regional Competitors Scanned
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[11px] bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 px-2 py-0.5 rounded-full font-mono">
            Vercel Serverless Ready
          </span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Brand Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-[#004f34] flex items-center justify-center shadow-lg shadow-emerald-900/30 border border-emerald-500/30">
              <span className="text-xl font-black text-white font-serif">S</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight text-white font-serif">
                  SIREN INTEL
                </h1>
                <span className="text-[10px] uppercase tracking-wider font-semibold bg-emerald-500/15 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">
                  Starbucks USA
                </span>
              </div>
              <p className="text-xs text-neutral-400 hidden sm:block">
                Autonomous Competitive Landscape Scanner • Coffee & QSR
              </p>
            </div>
          </div>

          {/* Center Tabs */}
          <nav className="flex items-center bg-[#18231d] p-1 rounded-xl border border-[#27382f]">
            <button
              onClick={() => setActiveTab('blog')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'blog'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/40'
                  : 'text-neutral-400 hover:text-white hover:bg-[#202f27]'
              }`}
            >
              <Newspaper className="w-4 h-4" />
              <span>Daily Briefs Feed</span>
            </button>

            <button
              onClick={() => setActiveTab('competitors')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'competitors'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/40'
                  : 'text-neutral-400 hover:text-white hover:bg-[#202f27]'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Competitors & Radar</span>
              <span className="text-xs px-1.5 py-0.2 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-700/50">
                {totalCompetitors}
              </span>
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenScanModal}
              disabled={isScanning}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 transition-all shadow-md shadow-emerald-900/40 active:scale-95 disabled:opacity-50"
            >
              <Radar className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Run Live Scan</span>
              <span className="sm:hidden">Scan</span>
            </button>

            <button
              onClick={onOpenSettingsModal}
              title="Settings & Integrations"
              className="p-2.5 rounded-xl text-neutral-400 hover:text-white bg-[#18231d] hover:bg-[#223129] border border-[#27382f] transition-all"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
