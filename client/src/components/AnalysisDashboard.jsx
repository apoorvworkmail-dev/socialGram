import React, { useState } from 'react';
import {
  TrendingUp,
  Award,
  BookOpen,
  Anchor,
  Megaphone,
  Smile,
  Hash,
  Sparkles,
  CheckCircle,
  Copy,
  Check,
  RefreshCw,
  Zap,
  ArrowRight
} from 'lucide-react';

export default function AnalysisDashboard({ data, onApplyVariation, onAddHashtag }) {
  const [activeTab, setActiveTab] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState(null);

  if (!data) return null;

  const {
    engagementScore = 0,
    readability = {},
    hook = {},
    cta = {},
    sentiment = {},
    hashtags = {},
    suggestions = [],
    variations = [],
    metrics = {}
  } = data;

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-emerald-400 border-emerald-500/50 bg-emerald-500/10';
    if (score >= 60) return 'text-amber-400 border-amber-500/50 bg-amber-500/10';
    return 'text-red-400 border-red-500/50 bg-red-500/10';
  };

  const getScoreBadge = (score) => {
    if (score >= 80) return { label: 'High Potential', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' };
    if (score >= 60) return { label: 'Moderate Reach', color: 'bg-amber-500/20 text-amber-300 border-amber-500/40' };
    return { label: 'Needs Optimization', color: 'bg-red-500/20 text-red-300 border-red-500/40' };
  };

  const badge = getScoreBadge(engagementScore);

  const handleCopyVariation = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Engagement Score & Core Breakdown */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Main Score Radial / Gauge */}
          <div className="flex items-center gap-6">
            <div className="relative flex items-center justify-center">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="52"
                  className="stroke-slate-800"
                  strokeWidth="10"
                  fill="transparent"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="52"
                  className={`${
                    engagementScore >= 80
                      ? 'stroke-emerald-400'
                      : engagementScore >= 60
                      ? 'stroke-amber-400'
                      : 'stroke-red-400'
                  } transition-all duration-1000 ease-out`}
                  strokeWidth="10"
                  strokeDasharray={326}
                  strokeDashoffset={326 - (326 * engagementScore) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-black text-white font-mono">{engagementScore}</span>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Score</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-bold text-slate-100">Engagement Score</h2>
                <span className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${badge.color}`}>
                  {badge.label}
                </span>
              </div>
              <p className="text-xs text-slate-400 max-w-md">
                Calculated based on opening hook, call-to-action strength, readability index, emoji density, and structural formatting.
              </p>

              {/* Quick stats inline */}
              <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-slate-300">
                <span className="bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800">
                  Tone: <strong className="text-purple-300">{sentiment.tone}</strong>
                </span>
                <span className="bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800">
                  Readability: <strong className="text-indigo-300">{readability.label} ({readability.score}/100)</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-auto">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex flex-col justify-between">
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <Anchor className="w-3.5 h-3.5 text-indigo-400" /> Hook Quality
              </span>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-lg font-bold text-white font-mono">{hook.score}%</span>
                <span className="text-[10px] text-slate-400">
                  {hook.score >= 80 ? 'Strong' : 'Moderate'}
                </span>
              </div>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex flex-col justify-between">
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <Megaphone className="w-3.5 h-3.5 text-purple-400" /> Call to Action
              </span>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-lg font-bold text-white font-mono">{cta.score}%</span>
                <span className="text-[10px] text-slate-400">
                  {cta.hasCTA ? 'Present' : 'Missing'}
                </span>
              </div>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex flex-col justify-between">
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <Smile className="w-3.5 h-3.5 text-pink-400" /> Emojis
              </span>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-lg font-bold text-white font-mono">{metrics.emojiCount}</span>
                <span className="text-[10px] text-slate-400">
                  {metrics.emojiCount >= 1 && metrics.emojiCount <= 6 ? 'Balanced' : 'Check'}
                </span>
              </div>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex flex-col justify-between">
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <Hash className="w-3.5 h-3.5 text-emerald-400" /> Hashtags
              </span>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-lg font-bold text-white font-mono">{hashtags.existingCount}</span>
                <span className="text-[10px] text-slate-400">
                  {hashtags.existingCount > 0 ? 'Optimal' : 'None'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Actionable Recommendations */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col">
          <h3 className="text-md font-semibold text-slate-100 flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-amber-400" />
            Actionable Optimization Tips
          </h3>

          <div className="space-y-3 flex-1">
            {suggestions.map((item, idx) => (
              <div
                key={idx}
                className="p-3 bg-slate-950/70 border border-slate-800/80 rounded-xl flex items-start gap-3 text-xs text-slate-300"
              >
                <div className="p-1 bg-amber-500/10 rounded text-amber-400 mt-0.5">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
                <span className="leading-relaxed">{item}</span>
              </div>
            ))}
          </div>

          {/* Hashtags Optimizer */}
          <div className="mt-6 pt-4 border-t border-slate-800">
            <h4 className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-2">
              <Hash className="w-3.5 h-3.5 text-emerald-400" />
              Recommended Trending Hashtags
            </h4>
            <div className="flex flex-wrap gap-2">
              {hashtags.recommended && hashtags.recommended.length > 0 ? (
                hashtags.recommended.map((tag, idx) => (
                  <button
                    key={idx}
                    onClick={() => onAddHashtag && onAddHashtag(tag)}
                    className="text-xs px-2.5 py-1 bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-800/60 text-emerald-300 rounded-lg transition-colors flex items-center gap-1 group"
                    title="Click to insert into post"
                  >
                    <span>{tag}</span>
                    <span className="text-[10px] text-emerald-500 group-hover:text-white">+</span>
                  </button>
                ))
              ) : (
                <span className="text-xs text-slate-400">Hashtags already optimal!</span>
              )}
            </div>
          </div>
        </div>

        {/* AI Re-written Variations */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-md font-semibold text-slate-100 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              AI-Optimized Variations
            </h3>
            <span className="text-[11px] text-slate-400">1-click apply</span>
          </div>

          {/* Variation Tabs */}
          <div className="flex gap-2 border-b border-slate-800 pb-2 mb-4 overflow-x-auto">
            {variations.map((varItem, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`text-xs px-3 py-1.5 rounded-lg transition-all font-medium whitespace-nowrap ${
                  activeTab === idx
                    ? 'bg-indigo-600 text-white shadow'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {varItem.title}
              </button>
            ))}
          </div>

          {/* Selected Variation Display */}
          {variations[activeTab] && (
            <div className="flex-1 flex flex-col justify-between">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-200 whitespace-pre-wrap font-sans leading-relaxed max-h-56 overflow-y-auto">
                {variations[activeTab].text}
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                <button
                  onClick={() => handleCopyVariation(variations[activeTab].text, activeTab)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs flex items-center gap-1.5 transition-colors"
                >
                  {copiedIndex === activeTab ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy Text
                    </>
                  )}
                </button>

                <button
                  onClick={() => onApplyVariation && onApplyVariation(variations[activeTab].text)}
                  className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg text-xs flex items-center gap-1.5 shadow transition-all"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Apply to Editor</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
