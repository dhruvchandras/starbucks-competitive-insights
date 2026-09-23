'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { DailyBriefing, Competitor } from '@/types/intelligence';
import { Radar, CheckCircle2, AlertCircle, X, Terminal, ArrowRight } from 'lucide-react';

interface LiveScanModalProps {
  isOpen: boolean;
  onClose: () => void;
  competitors: Competitor[];
  onScanComplete: (newBriefing: DailyBriefing) => void;
  geminiApiKey?: string;
  webhookUrl?: string;
}

export const LiveScanModal: React.FC<LiveScanModalProps> = ({
  isOpen,
  onClose,
  competitors,
  onScanComplete,
  geminiApiKey,
  webhookUrl
}) => {
  const [step, setStep] = useState<number>(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [completedBriefing, setCompletedBriefing] = useState<DailyBriefing | null>(null);

  const activeCompetitors = competitors.filter(c => c.isActive);

  const addLog = (msg: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const startScan = useCallback(async () => {
    setIsScanning(true);
    setError(null);
    setCompletedBriefing(null);
    setLogs([]);
    setStep(1);

    addLog(`Initiating autonomous web sweep across ${activeCompetitors.length} active competitors...`);

    try {
      // Step 1
      setTimeout(() => {
        addLog(`Querying Google News RSS feeds for ${activeCompetitors.slice(0, 5).map(c => c.name).join(', ')}...`);
        setStep(2);
      }, 1000);

      // Step 2
      setTimeout(() => {
        addLog(`Aggregating news across Coffee & QSR verticals (product launches, drive-thru tech, loyalty)...`);
        setStep(3);
      }, 2500);

      // Perform actual fetch to backend API
      const response = await fetch('/api/agent/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          competitors: activeCompetitors,
          geminiApiKey: geminiApiKey || undefined,
          webhookUrl: webhookUrl || undefined
        })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to scan competitor intelligence');
      }

      setStep(4);
      addLog(`Synthesized Top 3 Consequential Insights: "${data.briefing.headline}"`);
      addLog(`Evaluated Starbucks USA threat profile & counter-move playbook.`);

      if (data.webhookResult?.success) {
        addLog(`⚡ Dispatched notification to configured team webhook.`);
      }

      setStep(5);
      setCompletedBriefing(data.briefing);
      setIsScanning(false);
    } catch (err: unknown) {
      console.error('Scan error:', err);
      const msg = err instanceof Error ? err.message : 'An unexpected error occurred during scan.';
      setError(msg);
      setIsScanning(false);
      addLog(`❌ Error: ${msg}`);
    }
  }, [activeCompetitors, geminiApiKey, webhookUrl]);

  useEffect(() => {
    if (isOpen && !isScanning && !completedBriefing) {
      startScan();
    }
  }, [isOpen, isScanning, completedBriefing, startScan]);

  const handleFinish = () => {
    if (completedBriefing) {
      onScanComplete(completedBriefing);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#101713] border border-[#25362c] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-white p-2 rounded-xl hover:bg-[#1a261f] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-11 h-11 rounded-2xl bg-emerald-950 border border-emerald-700/60 flex items-center justify-center text-emerald-400">
            <Radar className={`w-6 h-6 ${isScanning ? 'animate-spin' : ''}`} />
          </div>
          <div>
            <h3 className="text-xl font-serif font-bold text-white">
              Autonomous Intelligence Scanner
            </h3>
            <p className="text-xs text-neutral-400">
              Scanning live web streams for Starbucks USA competitive threats
            </p>
          </div>
        </div>

        {/* Step Progression Bar */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          {[
            { num: 1, label: 'RSS News Ingestion' },
            { num: 2, label: 'Signal Extraction' },
            { num: 3, label: 'SBUX Threat Teardown' },
            { num: 4, label: 'Dispatch Published' }
          ].map(s => (
            <div key={s.num} className="space-y-1">
              <div
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  step >= s.num
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                    : 'bg-[#1c2921]'
                }`}
              />
              <p
                className={`text-[10px] font-medium truncate ${
                  step >= s.num ? 'text-emerald-300' : 'text-neutral-500'
                }`}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Live Terminal Output */}
        <div className="bg-[#090e0b] border border-[#1b2720] rounded-2xl p-4 font-mono text-xs text-neutral-300 h-52 overflow-y-auto space-y-1.5 mb-6">
          <div className="flex items-center gap-2 text-neutral-500 text-[11px] pb-1 border-b border-[#16201a]">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span>Agent Telemetry Stream</span>
          </div>
          {logs.map((log, i) => (
            <div key={i} className="leading-relaxed">
              <span className="text-emerald-400 mr-1.5">›</span>
              {log}
            </div>
          ))}
          {isScanning && (
            <div className="flex items-center gap-2 text-emerald-400 animate-pulse pt-1">
              <span className="inline-block w-1.5 h-3 bg-emerald-400"></span>
              <span>Processing competitor signals...</span>
            </div>
          )}
        </div>

        {error && (
          <div className="mb-4 p-3.5 bg-red-950/60 border border-red-800 text-red-300 text-xs rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {completedBriefing && (
          <div className="mb-6 p-4 bg-emerald-950/50 border border-emerald-700/60 rounded-2xl flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                New Daily Briefing Synthesized!
              </h5>
              <p className="text-sm font-semibold text-white mt-0.5 line-clamp-1">
                {completedBriefing.headline}
              </p>
              <p className="text-xs text-neutral-300 mt-1">
                Curated 3 strategic insights ready for leadership review.
              </p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-[#1a261f]">
          <span className="text-xs text-neutral-400">
            {isScanning ? 'Scan in progress...' : completedBriefing ? 'Scan completed' : 'Ready'}
          </span>

          <div className="flex items-center gap-3">
            {!completedBriefing && (
              <button
                type="button"
                onClick={onClose}
                disabled={isScanning}
                className="px-4 py-2 text-xs font-medium text-neutral-400 hover:text-white disabled:opacity-40"
              >
                Cancel
              </button>
            )}

            {completedBriefing ? (
              <button
                onClick={handleFinish}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-md shadow-emerald-950/40"
              >
                <span>View in Blog Feed</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={startScan}
                disabled={isScanning}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-600 disabled:opacity-50"
              >
                <span>Re-run Sweep</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
