'use client';

import React, { useState, useEffect } from 'react';
import { Competitor, DailyBriefing } from '@/types/intelligence';
import { DEFAULT_COMPETITORS } from '@/lib/constants/default-competitors';
import { HISTORICAL_BRIEFINGS } from '@/lib/constants/historical-briefings';
import { Header } from '@/components/Header';
import { BlogFeed } from '@/components/BlogFeed';
import { CompetitorsManager } from '@/components/CompetitorsManager';
import { LiveScanModal } from '@/components/LiveScanModal';
import { SettingsModal } from '@/components/SettingsModal';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'blog' | 'competitors'>('blog');
  const [briefings, setBriefings] = useState<DailyBriefing[]>(HISTORICAL_BRIEFINGS);
  const [competitors, setCompetitors] = useState<Competitor[]>(DEFAULT_COMPETITORS);
  const [geminiApiKey, setGeminiApiKey] = useState<string>('');
  const [webhookUrl, setWebhookUrl] = useState<string>('');
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  // Load persisted state from localStorage on client mount
  useEffect(() => {
    try {
      const savedBriefings = localStorage.getItem('sbux_intel_briefings');
      if (savedBriefings) {
        const parsed = JSON.parse(savedBriefings);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setBriefings(parsed);
        }
      }

      const savedCompetitors = localStorage.getItem('sbux_intel_competitors');
      if (savedCompetitors) {
        const parsed = JSON.parse(savedCompetitors);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCompetitors(parsed);
        }
      }

      const savedApiKey = localStorage.getItem('sbux_gemini_api_key');
      if (savedApiKey) setGeminiApiKey(savedApiKey);

      const savedWebhook = localStorage.getItem('sbux_webhook_url');
      if (savedWebhook) setWebhookUrl(savedWebhook);
    } catch (e) {
      console.warn('Failed to load local storage state:', e);
    }
  }, []);

  const handleScanComplete = (newBriefing: DailyBriefing) => {
    setBriefings(prev => {
      const updated = [newBriefing, ...prev.filter(b => b.id !== newBriefing.id)];
      localStorage.setItem('sbux_intel_briefings', JSON.stringify(updated));
      return updated;
    });
    setActiveTab('blog');
  };

  const handleToggleCompetitor = (id: string) => {
    setCompetitors(prev => {
      const updated = prev.map(c => (c.id === id ? { ...c, isActive: !c.isActive } : c));
      localStorage.setItem('sbux_intel_competitors', JSON.stringify(updated));
      return updated;
    });
  };

  const handleAddCompetitor = (newComp: Competitor) => {
    setCompetitors(prev => {
      const updated = [newComp, ...prev];
      localStorage.setItem('sbux_intel_competitors', JSON.stringify(updated));
      return updated;
    });
  };

  const handleDeleteCompetitor = (id: string) => {
    setCompetitors(prev => {
      const updated = prev.filter(c => c.id !== id);
      localStorage.setItem('sbux_intel_competitors', JSON.stringify(updated));
      return updated;
    });
  };

  const handleResetToDefaults = () => {
    if (window.confirm('Reset competitor roster to default national & regional competitors?')) {
      setCompetitors(DEFAULT_COMPETITORS);
      localStorage.removeItem('sbux_intel_competitors');
    }
  };

  return (
    <div className="min-h-screen bg-[#0c100e] text-[#ededed] flex flex-col selection:bg-emerald-600 selection:text-white">
      {/* Sticky Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenScanModal={() => setIsScanModalOpen(true)}
        onOpenSettingsModal={() => setIsSettingsModalOpen(true)}
        isScanning={false}
        totalCompetitors={competitors.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {activeTab === 'blog' && (
          <BlogFeed
            briefings={briefings}
            onOpenScanModal={() => setIsScanModalOpen(true)}
          />
        )}

        {activeTab === 'competitors' && (
          <CompetitorsManager
            competitors={competitors}
            onToggleCompetitor={handleToggleCompetitor}
            onAddCompetitor={handleAddCompetitor}
            onDeleteCompetitor={handleDeleteCompetitor}
            onResetToDefaults={handleResetToDefaults}
          />
        )}
      </main>

      {/* Modals */}
      <LiveScanModal
        isOpen={isScanModalOpen}
        onClose={() => setIsScanModalOpen(false)}
        competitors={competitors}
        onScanComplete={handleScanComplete}
        geminiApiKey={geminiApiKey}
        webhookUrl={webhookUrl}
      />

      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        geminiApiKey={geminiApiKey}
        setGeminiApiKey={setGeminiApiKey}
        webhookUrl={webhookUrl}
        setWebhookUrl={setWebhookUrl}
      />

      {/* Footer */}
      <footer className="border-t border-[#1c2921] bg-[#090d0b] py-8 text-neutral-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-900/60 border border-emerald-700/50 flex items-center justify-center text-emerald-400 font-serif font-bold text-xs">
              S
            </div>
            <span className="font-semibold text-neutral-200">SIREN INTEL</span>
            <span>• Starbucks USA Strategic Intelligence Agent</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-neutral-500">
            <span>Daily Vercel Cron: 07:00 AM EST</span>
            <span>•</span>
            <span>Multi-Source Ingestion & Gemini AI</span>
            <span>•</span>
            <button
              onClick={() => setIsSettingsModalOpen(true)}
              className="text-emerald-400 hover:underline"
            >
              Vercel Deployment Guide
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
