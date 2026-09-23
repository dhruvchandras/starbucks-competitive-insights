'use client';

import React, { useState } from 'react';
import { X, Key, Bell, Clock, GitBranch, ExternalLink, Check, AlertCircle, Send } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  geminiApiKey: string;
  setGeminiApiKey: (key: string) => void;
  webhookUrl: string;
  setWebhookUrl: (url: string) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  geminiApiKey,
  setGeminiApiKey,
  webhookUrl,
  setWebhookUrl
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'vercel' | 'api' | 'webhooks'>('vercel');
  const [testingWebhook, setTestingWebhook] = useState(false);
  const [webhookStatus, setWebhookStatus] = useState<{ success?: boolean; message?: string } | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    localStorage.setItem('sbux_gemini_api_key', geminiApiKey);
    localStorage.setItem('sbux_webhook_url', webhookUrl);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleTestWebhook = async () => {
    if (!webhookUrl) return;
    setTestingWebhook(true);
    setWebhookStatus(null);
    try {
      const res = await fetch('/api/webhook/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ webhookUrl })
      });
      const data = await res.json();
      setWebhookStatus(data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Webhook test failed';
      setWebhookStatus({ success: false, message: msg });
    } finally {
      setTestingWebhook(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#111915] border border-[#23352a] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-white p-2 rounded-xl hover:bg-[#1c2921] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-serif font-bold text-white mb-1">
          Settings & Vercel Automation
        </h3>
        <p className="text-xs text-neutral-400 mb-6">
          Configure daily cron automations, Google Gemini AI synthesis, and Slack notifications.
        </p>

        {/* Sub Navigation */}
        <div className="flex items-center gap-2 border-b border-[#213127] pb-3 mb-5">
          <button
            onClick={() => setActiveSubTab('vercel')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeSubTab === 'vercel'
                ? 'bg-emerald-600 text-white'
                : 'text-neutral-400 hover:text-white hover:bg-[#1a261f]'
            }`}
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span>Vercel & GitHub Deploy</span>
          </button>

          <button
            onClick={() => setActiveSubTab('api')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeSubTab === 'api'
                ? 'bg-emerald-600 text-white'
                : 'text-neutral-400 hover:text-white hover:bg-[#1a261f]'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span>AI Engine (Gemini)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('webhooks')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeSubTab === 'webhooks'
                ? 'bg-emerald-600 text-white'
                : 'text-neutral-400 hover:text-white hover:bg-[#1a261f]'
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            <span>Team Alerts (Slack / Discord)</span>
          </button>
        </div>

        {/* Tab 1: Vercel & GitHub Deployment */}
        {activeSubTab === 'vercel' && (
          <div className="space-y-4 text-xs">
            <div className="bg-[#0b100d] border border-[#1d2a21] rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  Scheduled Daily Cron Job
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono">
                  Daily @ 07:00 AM EST (12:00 UTC)
                </span>
              </div>
              <p className="text-neutral-300 leading-relaxed">
                When deployed to Vercel, the included <code className="text-emerald-400">vercel.json</code> automatically executes <code className="text-emerald-400">/api/cron/scan</code> every morning, scans active competitors, and pushes briefings to your webhook.
              </p>
            </div>

            <div className="bg-[#0b100d] border border-[#1d2a21] rounded-2xl p-4 space-y-2.5">
              <span className="font-semibold text-white flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-neutral-300" />
                How to Deploy via GitHub to Vercel
              </span>
              <ol className="list-decimal list-inside space-y-1.5 text-neutral-300 leading-relaxed">
                <li>Create a new repository on GitHub (e.g. <code className="text-white">starbucks-intel-agent</code>).</li>
                <li>Push this repository using git:
                  <div className="mt-1 bg-black p-2 rounded-lg font-mono text-[11px] text-emerald-400 overflow-x-auto">
                    git remote add origin https://github.com/YOUR_USERNAME/starbucks-intel-agent.git<br/>
                    git branch -M main<br/>
                    git push -u origin main
                  </div>
                </li>
                <li>Log in to <strong className="text-white">Vercel.com</strong> and click <strong>&quot;Add New Project&quot;</strong> &rarr; Import your GitHub repo.</li>
                <li>Add Environment Variables in Vercel Settings:
                  <ul className="list-disc list-inside ml-3 mt-1 text-neutral-400">
                    <li><code className="text-emerald-300">GEMINI_API_KEY</code> (optional, falls back to built-in heuristic)</li>
                    <li><code className="text-emerald-300">SLACK_WEBHOOK_URL</code> (optional, for auto-publishing)</li>
                    <li><code className="text-emerald-300">CRON_SECRET</code> (optional, to secure cron route)</li>
                  </ul>
                </li>
                <li>Click <strong>Deploy</strong>. That&apos;s it! Daily scans are 100% automated.</li>
              </ol>
            </div>
          </div>
        )}

        {/* Tab 2: Gemini API Key */}
        {activeSubTab === 'api' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                Google Gemini API Key
              </label>
              <input
                type="password"
                placeholder="AIzaSy..."
                value={geminiApiKey}
                onChange={e => setGeminiApiKey(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c1310] border border-[#24352b] text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-emerald-500"
              />
              <p className="text-[11px] text-neutral-400 mt-1.5 leading-relaxed">
                Keys can also be configured directly via the <code className="text-emerald-300">GEMINI_API_KEY</code> environment variable on Vercel. If no key is set, the agent uses our built-in strategic heuristic model.
              </p>
            </div>

            <div className="p-3.5 bg-[#0b100d] border border-[#1e2c22] rounded-xl text-xs text-neutral-300 flex items-center justify-between">
              <span>Need a free Google Gemini API Key?</span>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1"
              >
                <span>Google AI Studio</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}

        {/* Tab 3: Webhooks */}
        {activeSubTab === 'webhooks' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                Slack or Discord Incoming Webhook URL
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="https://hooks.slack.com/services/..."
                  value={webhookUrl}
                  onChange={e => setWebhookUrl(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#0c1310] border border-[#24352b] text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="button"
                  onClick={handleTestWebhook}
                  disabled={!webhookUrl || testingWebhook}
                  className="px-4 py-2.5 rounded-xl bg-[#1b2820] hover:bg-[#25392d] text-emerald-400 text-xs font-semibold border border-emerald-800/40 disabled:opacity-40 flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{testingWebhook ? 'Testing...' : 'Test'}</span>
                </button>
              </div>
              <p className="text-[11px] text-neutral-400 mt-1.5">
                Every morning at 07:00 AM EST, the Top 3 strategic insights will be automatically posted to this channel.
              </p>
            </div>

            {webhookStatus && (
              <div
                className={`p-3 rounded-xl text-xs flex items-center gap-2 border ${
                  webhookStatus.success
                    ? 'bg-emerald-950/60 border-emerald-800 text-emerald-300'
                    : 'bg-red-950/60 border-red-800 text-red-300'
                }`}
              >
                {webhookStatus.success ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                <span>{webhookStatus.message}</span>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-5 mt-6 border-t border-[#1e2d24]">
          <span className="text-xs text-emerald-400 font-medium">
            {savedSuccess ? 'Settings saved!' : ''}
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-neutral-400 hover:text-white"
            >
              Close
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-950/40"
            >
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
