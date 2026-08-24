import { Sparkles, FileText, Cpu } from 'lucide-react';

export default function Header({ serverStatus }) {
  return (
    <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg shadow-indigo-500/20">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Social Media Content Analyzer
            </h1>
            <p className="text-xs text-slate-400">
              PDF Parsing • Tesseract OCR • AI Engagement Optimizer
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <span className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300">
            <FileText className="w-3.5 h-3.5 text-indigo-400" />
            <span>PDF & Image OCR</span>
          </span>

          <span className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300">
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
            <span>NLP Analysis</span>
          </span>

          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-emerald-500/30 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-medium">{serverStatus ? 'API Connected' : 'Ready'}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
