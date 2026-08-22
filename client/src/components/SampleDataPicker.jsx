import React from 'react';
import { Sparkles, FileText, Image, AlertCircle } from 'lucide-react';

export default function SampleDataPicker({ onSelectSample }) {
  const samplePosts = [
    {
      id: 1,
      title: '🚀 Tech & AI Launch Post (High Engagement)',
      badge: 'PDF / Post',
      color: 'border-indigo-500/40 bg-indigo-500/10 text-indigo-300',
      text: `🚀 Artificial Intelligence is officially changing how we build software!\n\nHere are 3 game-changing AI workflows every developer should adopt today:\n\n1️⃣ Automated Code Reviews with LLMs\n2️⃣ AI-Driven OCR for Document Processing\n3️⃣ Real-time Sentiment & Engagement Analytics\n\nWhich of these tools are you currently using in production?\n\nComment below with your favorite AI tool! 👇\n\n#ArtificialIntelligence #SoftwareEngineering #TechTrends #Productivity`
    },
    {
      id: 2,
      title: '📄 Scanned Document Draft (OCR Scenario)',
      badge: 'Scanned OCR',
      color: 'border-purple-500/40 bg-purple-500/10 text-purple-300',
      text: `INTERNAL SOCIAL MEDIA DRAFT - AUG 2025\n\nStop wasting hours creating content that gets zero engagement.\n\nThe secret to viral reach isn't posting 10x a day. It's optimizing three critical components:\n- Hook: Stop the scroll in the first 2 seconds\n- Value: Deliver actionable takeaways without fluff\n- Call To Action: Tell your reader exactly what to do next\n\nWant our free template guide? Repost this and reply "GUIDE" below!\n\n#GrowthHacking #ContentStrategy #MarketingTips`
    },
    {
      id: 3,
      title: '✏️ Unoptimized Raw Draft (Needs Tuning)',
      badge: 'Needs Work',
      color: 'border-amber-500/40 bg-amber-500/10 text-amber-300',
      text: `we launched our new product today check it out on our website we spent months working on it hope everyone likes it thanks.`
    }
  ];

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-xl">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-purple-400" />
          Test with 1-Click Public Samples
        </span>
        <span className="text-[11px] text-slate-500">Instant Evaluation</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {samplePosts.map((sample) => (
          <button
            key={sample.id}
            onClick={() => onSelectSample(sample.text, sample.title, sample.badge)}
            className="p-3 bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 rounded-xl text-left transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className={`text-[10px] px-2 py-0.5 rounded-md border font-medium ${sample.color}`}>
                  {sample.badge}
                </span>
              </div>
              <p className="text-xs font-medium text-slate-200 group-hover:text-indigo-300 transition-colors line-clamp-2">
                {sample.title}
              </p>
            </div>
            <span className="text-[10px] text-indigo-400 font-medium mt-2 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
              Load into Editor →
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
