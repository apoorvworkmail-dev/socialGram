import React, { useState } from 'react';
import { Eye, AlertTriangle, CheckCircle2, MessageSquare, Share2, Heart, Bookmark, Send } from 'lucide-react';

export default function PlatformPreview({ text }) {
  const [platform, setPlatform] = useState('twitter');

  const charCount = text ? text.length : 0;
  const twitterLimit = 280;
  const isOverTwitterLimit = charCount > twitterLimit;

  // Truncate text for LinkedIn read-more preview
  const linkedInFoldLimit = 140;
  const isLinkedInTruncated = text && text.length > linkedInFoldLimit;

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
            <Eye className="w-5 h-5 text-indigo-400" />
            Multi-Platform Post Preview
          </h2>
          <p className="text-xs text-slate-400">
            Real-time visual preview across major social channels with character limit validation.
          </p>
        </div>

        {/* Platform Selector */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setPlatform('twitter')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
              platform === 'twitter'
                ? 'bg-sky-500 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="font-black text-sm">𝕏</span>
            <span>X / Twitter</span>
          </button>

          <button
            onClick={() => setPlatform('linkedin')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
              platform === 'linkedin'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="font-bold text-xs">in</span>
            <span>LinkedIn</span>
          </button>

          <button
            onClick={() => setPlatform('instagram')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
              platform === 'instagram'
                ? 'bg-pink-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Instagram</span>
          </button>
        </div>
      </div>

      {/* Platform Mock Container */}
      <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 max-w-xl mx-auto">
        {/* TWITTER PREVIEW */}
        {platform === 'twitter' && (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                ME
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-bold text-white">Social Media Manager</span>
                  <span className="text-slate-400">@social_pro</span>
                  <span className="text-slate-400">· 1m</span>
                </div>
                <div className="mt-2 text-sm text-slate-200 whitespace-pre-wrap leading-relaxed">
                  {text || <span className="text-slate-400 italic">Post content will render here...</span>}
                </div>

                {/* Twitter Stats Footer */}
                <div className="mt-4 pt-3 border-t border-slate-900 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5" /> 12</span>
                  <span className="flex items-center gap-1"><Share2 className="w-3.5 h-3.5" /> 48</span>
                  <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5 text-pink-500" /> 215</span>
                  <span className="text-[11px]">📊 2.4K views</span>
                </div>
              </div>
            </div>

            {/* Twitter Character Limit Warning */}
            <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-900">
              <div className="flex items-center gap-1.5">
                {isOverTwitterLimit ? (
                  <>
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                    <span className="text-red-400 font-medium">Exceeds X (Twitter) limit by {charCount - twitterLimit} chars</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-slate-400">Fits within 280 character limit</span>
                  </>
                )}
              </div>
              <span className={`font-mono ${isOverTwitterLimit ? 'text-red-400 font-bold' : 'text-slate-400'}`}>
                {charCount} / {twitterLimit}
              </span>
            </div>
          </div>
        )}

        {/* LINKEDIN PREVIEW */}
        {platform === 'linkedin' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-700 flex items-center justify-center text-white font-bold text-sm">
                SM
              </div>
              <div>
                <div className="font-bold text-sm text-white">Content Strategist</div>
                <div className="text-[11px] text-slate-400">Helping brands scale organic reach • 1h</div>
              </div>
            </div>

            <div className="text-sm text-slate-200 whitespace-pre-wrap leading-relaxed">
              {text ? (
                <>
                  {isLinkedInTruncated ? (
                    <>
                      {text.substring(0, linkedInFoldLimit)}...
                      <span className="text-blue-400 font-semibold cursor-pointer ml-1">...see more</span>
                    </>
                  ) : (
                    text
                  )}
                </>
              ) : (
                <span className="text-slate-400 italic">Post content will render here...</span>
              )}
            </div>

            <div className="pt-3 border-t border-slate-900 flex items-center justify-between text-xs text-slate-400">
              <span>👍 142 • 💬 28 comments</span>
              <span className="text-blue-400 font-medium">+ Follow</span>
            </div>
          </div>
        )}

        {/* INSTAGRAM PREVIEW */}
        {platform === 'instagram' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-900 pb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[2px]">
                  <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-[10px] font-bold text-white">
                    IG
                  </div>
                </div>
                <span className="font-semibold text-xs text-white">brand_official</span>
              </div>
              <span className="text-slate-400 text-xs">•••</span>
            </div>

            <div className="bg-slate-900 rounded-lg h-44 flex items-center justify-center text-xs text-slate-500 border border-slate-800">
              [ Media Attachment / Carousel Preview ]
            </div>

            <div className="space-y-1.5 text-xs text-slate-200">
              <div className="flex items-center justify-between text-sm mb-2 text-slate-300">
                <div className="flex items-center gap-3">
                  <Heart className="w-4 h-4 text-pink-500 fill-current" />
                  <MessageSquare className="w-4 h-4" />
                  <Send className="w-4 h-4" />
                </div>
                <Bookmark className="w-4 h-4" />
              </div>
              <p>
                <strong className="text-white mr-1.5">brand_official</strong>
                {text || <span className="text-slate-400 italic">Caption content will render here...</span>}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
