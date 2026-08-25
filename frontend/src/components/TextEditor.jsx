import { useState } from 'react';
import { Edit3, Play, Trash2, Copy, Check } from 'lucide-react';

export default function TextEditor({
  text,
  setText,
  onAnalyze,
  isAnalyzing,
  extractionSource
}) {
  const [copied, setCopied] = useState(false);

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Edit3 className="w-5 h-5 text-purple-400" />
          <h2 className="text-lg font-semibold text-slate-100">
            Extracted Content & Editor
          </h2>
          {extractionSource && (
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-purple-950 border border-purple-800/60 text-purple-300">
              Source: {extractionSource}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {text && (
            <>
              <button
                onClick={handleCopy}
                className="p-1.5 text-slate-400 hover:text-slate-200 bg-slate-800/80 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1 text-xs"
                title="Copy to clipboard"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <button
                onClick={() => setText('')}
                className="p-1.5 text-slate-400 hover:text-red-400 bg-slate-800/80 hover:bg-red-950/40 rounded-lg transition-colors text-xs flex items-center gap-1"
                title="Clear text"
              >
                <Trash2 className="w-4 h-4" />
                <span>Clear</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Main Textarea */}
      <div className="relative flex-1 min-h-[220px]">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Extracted text from PDF or OCR image will appear here... Or type/paste your social media post draft directly!"
          className="w-full h-full min-h-[220px] p-4 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-sans text-sm resize-none leading-relaxed"
        />
      </div>

      {/* Editor Footer / Stats & Action */}
      <div className="mt-4 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-xs text-slate-400">
          <span>
            <strong className="text-slate-200">{charCount}</strong> characters
          </span>
          <span>•</span>
          <span>
            <strong className="text-slate-200">{wordCount}</strong> words
          </span>
          <span>•</span>
          <span>
            Est. reading time: <strong className="text-slate-200">{Math.max(1, Math.ceil(wordCount / 200))} min</strong>
          </span>
        </div>

        <button
          onClick={onAnalyze}
          disabled={!text.trim() || isAnalyzing}
          className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20"
        >
          {isAnalyzing ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Analyzing Post...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              <span>Analyze Engagement</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
