import express from 'express';

const router = express.Router();

// Helper: Calculate Flesch Reading Ease score
function calculateReadability(text) {
  const words = text.split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  if (wordCount === 0) return { score: 100, label: 'Very Easy' };

  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length || 1;
  const syllableCount = words.reduce((acc, word) => acc + countSyllables(word), 0);

  // Flesch Reading Ease formula
  let score = 206.835 - (1.015 * (wordCount / sentences)) - (84.6 * (syllableCount / wordCount));
  score = Math.max(0, Math.min(100, Math.round(score)));

  let label = 'Fairly Easy';
  if (score >= 80) label = 'Very Easy';
  else if (score >= 60) label = 'Standard / Clear';
  else if (score >= 40) label = 'Fairly Complex';
  else label = 'Hard to Read';

  return { score, label, wordCount, sentenceCount: sentences, syllableCount };
}

function countSyllables(word) {
  word = word.toLowerCase().replace(/(?:[^laeiouy]|ed|es|e)$/ig, '');
  word = word.replace(/^y/ig, '');
  const matches = word.match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 1;
}

// Helper: Hook Analysis
function analyzeHook(text) {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const firstLine = lines[0] || text;

  let score = 60;
  let feedback = 'Decent opening, but could be punchier.';

  const isQuestion = firstLine.includes('?');
  const hasNumbers = /\d+/.test(firstLine);
  const hasPowerWords = /(how to|secret|stop|never|always|best|top|ultimate|why|guide|warning|don't|free|boost|master)/i.test(firstLine);
  const isShortAndPunchy = firstLine.length > 10 && firstLine.length <= 90;

  if (isQuestion || hasPowerWords || hasNumbers) score += 20;
  if (isShortAndPunchy) score += 20;

  score = Math.min(100, score);

  if (score >= 85) feedback = 'Strong, attention-grabbing opening hook!';
  else if (score >= 70) feedback = 'Good start. Consider adding a power word, number, or question to boost scroll-stopping power.';
  else feedback = 'Hook is weak or missing. Start with a bold question, surprising statistic, or strong pain point.';

  return {
    firstLine: firstLine.length > 100 ? firstLine.substring(0, 100) + '...' : firstLine,
    score,
    feedback
  };
}

// Helper: CTA Analysis
function analyzeCTA(text) {
  const ctaRegex = /(comment|share|repost|retweet|click|link|subscribe|follow|let me know|what do you think|save this|drop a|tag a friend|check out|read more)/i;
  const hasCTA = ctaRegex.test(text);

  const questionMarkCount = (text.match(/\?/g) || []).length;
  const hasClosingQuestion = text.trim().endsWith('?');

  let score = 40;
  let suggestion = 'Add an explicit Call To Action (e.g., "What are your thoughts? Drop a comment below!").';

  if (hasCTA || hasClosingQuestion) {
    score = 90;
    suggestion = 'Great Call to Action included! Helps drive comments and engagement.';
  } else if (questionMarkCount > 0) {
    score = 70;
    suggestion = 'You have a question in your post. Move or highlight it near the end as your main CTA.';
  }

  return { hasCTA: hasCTA || hasClosingQuestion, score, suggestion };
}

// Helper: Sentiment & Tone
function detectSentimentAndTone(text) {
  const positiveWords = /(great|amazing|awesome|success|growth|excited|best|love|win|innovative|transform|future|proven|power|effective)/gi;
  const urgentWords = /(now|today|limited|hurry|don't miss|alert|important|warning|stop|crucial)/gi;
  const casualWords = /(hey|folks|y'all|haha|btw|tbh|lol|cool|check this out)/gi;

  const posMatches = (text.match(positiveWords) || []).length;
  const urgMatches = (text.match(urgentWords) || []).length;
  const casMatches = (text.match(casualWords) || []).length;

  let tone = 'Informative / Professional';
  if (urgMatches > 1) tone = 'Urgent / Persuasive';
  else if (casMatches > 1) tone = 'Casual & Conversational';
  else if (posMatches > 2) tone = 'Energetic & Inspiring';

  let sentiment = 'Neutral / Balanced';
  if (posMatches > 2) sentiment = 'Positive & Uplifting';
  else if (text.includes('problem') || text.includes('mistake') || text.includes('fail')) sentiment = 'Constructive / Problem-Solving';

  return { tone, sentiment };
}

// Helper: Topic Detection & Hashtag Recommendations
function recommendHashtags(text) {
  const existingHashtags = (text.match(/#[a-zA-Z0-9_]+/g) || []);
  
  const keywords = [
    { pattern: /(tech|ai|software|code|developer|engineering|data)/i, tags: ['#TechTrends', '#AI', '#CodingLife', '#SoftwareEngineering', '#Innovation'] },
    { pattern: /(marketing|growth|content|social media|brand|strategy)/i, tags: ['#ContentMarketing', '#GrowthHacking', '#SocialMediaStrategy', '#DigitalMarketing', '#Branding'] },
    { pattern: /(business|startup|entrepreneur|leadership|career|productivity)/i, tags: ['#Leadership', '#Startups', '#ProductivityHacks', '#Entrepreneurship', '#CareerAdvice'] },
    { pattern: /(design|ui|ux|creative|art)/i, tags: ['#UIDesign', '#UXDesign', '#CreativeDesign', '#WebDesign', '#ProductDesign'] }
  ];

  let recommended = ['#EngagementBoost', '#SocialMediaTips', '#ViralContent'];
  for (const item of keywords) {
    if (item.pattern.test(text)) {
      recommended = [...item.tags, ...recommended];
      break;
    }
  }

  // Deduplicate and filter out tags already in text
  const uniqueRecs = Array.from(new Set(recommended))
    .filter(tag => !existingHashtags.map(t => t.toLowerCase()).includes(tag.toLowerCase()))
    .slice(0, 5);

  return {
    existingCount: existingHashtags.length,
    existing: existingHashtags,
    recommended: uniqueRecs
  };
}

// Helper: AI / Rule-based Post Optimizer (Generates 3 style variations)
function generateOptimizedVariations(text) {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const firstLine = lines[0] || text;
  const bodyText = lines.slice(1).join('\n') || text;

  // 1. Viral & Punchy Style
  const viralStyle = `🚀 ${firstLine.replace(/^[^\w]+/, '').toUpperCase()}\n\n` +
    `Here is what most people miss:\n\n` +
    bodyText.split('. ').slice(0, 3).map(sentence => `👉 ${sentence.trim()}`).join('\n') + `\n\n` +
    `💡 Pro Tip: Small habits lead to massive results.\n\n` +
    `👇 What's your take on this? Drop a comment below!\n\n` +
    `#GrowthMindset #ViralContent #SuccessTips`;

  // 2. Professional / Executive Style
  const professionalStyle = `📌 Key Takeaways on ${firstLine.substring(0, 40)}...\n\n` +
    `As organizations evolve, staying ahead requires strategic alignment. Here are the core insights:\n\n` +
    `• ${firstLine}\n` +
    (lines[1] ? `• ${lines[1]}\n` : '') +
    (lines[2] ? `• ${lines[2]}\n` : '') +
    `\nSummary: Prioritizing clarity and continuous improvement yields long-term impact.\n\n` +
    `Retweet/Share with your network if you found this valuable.`;

  // 3. Storytelling & Conversational Style
  const storyStyle = `I used to struggle with this until I realized one key thing... 💡\n\n` +
    `"${firstLine}"\n\n` +
    `Here is the exact framework:\n` +
    `1️⃣ Identify the friction point.\n` +
    `2️⃣ Streamline your workflow.\n` +
    `3️⃣ Focus on high-leverage outcomes.\n\n` +
    `Save this post for later 🔖 and share it with someone who needs to read this today!`;

  return [
    { title: '🔥 Viral & High-Hook', text: viralStyle },
    { title: '💼 Professional & Executive', text: professionalStyle },
    { title: '📖 Engaging Storytelling', text: storyStyle }
  ];
}

/**
 * POST /api/analyze
 * Accepts post text and optional platform selection, returns complete engagement score & breakdown
 */
router.post('/', (req, res) => {
  try {
    const { text = '' } = req.body;

    if (!text || text.trim().length === 0) {
      return res.status(400).json({ error: 'Text content is required for analysis' });
    }

    const cleanText = text.trim();
    const readability = calculateReadability(cleanText);
    const hook = analyzeHook(cleanText);
    const cta = analyzeCTA(cleanText);
    const sentiment = detectSentimentAndTone(cleanText);
    const hashtags = recommendHashtags(cleanText);

    // Emojis count
    const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu;
    const emojiCount = (cleanText.match(emojiRegex) || []).length;

    // Calculate Overall Engagement Score (0-100)
    let score = 50;

    // Hook contribution (max 25 pts)
    score += (hook.score / 100) * 25;

    // CTA contribution (max 20 pts)
    score += (cta.score / 100) * 20;

    // Readability contribution (max 20 pts)
    if (readability.score >= 50 && readability.score <= 85) score += 20;
    else score += 10;

    // Formatting & Length optimality (max 20 pts)
    const charCount = cleanText.length;
    if (charCount >= 100 && charCount <= 1200) score += 15;
    else if (charCount > 0) score += 8;

    if (emojiCount >= 1 && emojiCount <= 6) score += 5; // Balanced emojis boost score

    // Hashtags contribution (max 10 pts)
    if (hashtags.existingCount >= 2 && hashtags.existingCount <= 7) score += 10;
    else if (hashtags.existingCount > 0) score += 5;

    score = Math.min(100, Math.round(score));

    // Suggestions list
    const suggestions = [];
    if (hook.score < 75) suggestions.push(hook.feedback);
    if (!cta.hasCTA) suggestions.push(cta.suggestion);
    if (emojiCount === 0) suggestions.push('Add 2-3 relevant emojis to make the post visually engaging.');
    else if (emojiCount > 10) suggestions.push('Reduce emoji frequency to keep the post clean and readable.');
    if (hashtags.existingCount === 0) suggestions.push('Add 3-5 targeted hashtags to improve searchability and organic reach.');
    if (readability.score < 50) suggestions.push('Break long sentences into bullet points or shorter paragraphs to improve readability.');
    if (charCount < 80) suggestions.push('Expand your content to provide deeper value or context for readers.');

    if (suggestions.length === 0) {
      suggestions.push('Excellent post structure! Keep maintaining high visual spacing and strong call-to-actions.');
    }

    const variations = generateOptimizedVariations(cleanText);

    res.json({
      success: true,
      engagementScore: score,
      metrics: {
        characterCount: charCount,
        wordCount: readability.wordCount,
        sentenceCount: readability.sentenceCount,
        readingTimeMinutes: Math.ceil(readability.wordCount / 200),
        emojiCount,
        hashtagCount: hashtags.existingCount
      },
      readability,
      hook,
      cta,
      sentiment,
      hashtags,
      suggestions,
      variations
    });
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ error: 'Failed to analyze content', details: error.message });
  }
});

export default router;
