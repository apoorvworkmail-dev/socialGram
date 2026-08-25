import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import uploadRouter from './routes/upload.js';
import analyzeRouter from './routes/analyze.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Root API Discovery
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Social Media Content Analyzer API',
    version: '1.0.0',
    endpoints: {
      health: 'GET /api/health',
      upload: 'POST /api/upload',
      analyze: 'POST /api/analyze',
      samples: 'GET /api/samples'
    }
  });
});

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Social Media Content Analyzer API', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/upload', uploadRouter);
app.use('/api/analyze', analyzeRouter);

// Sample Posts API for 1-click testing
app.get('/api/samples', (req, res) => {
  res.json({
    samples: [
      {
        id: 1,
        title: 'Tech & AI Announcement (High Engagement)',
        category: 'Technology',
        text: `🚀 Artificial Intelligence is officially changing how we build software!\n\nHere are 3 game-changing AI workflows every developer should adopt today:\n\n1️⃣ Automated Code Reviews with LLMs\n2️⃣ AI-Driven OCR for Document Processing\n3️⃣ Real-time Sentiment & Engagement Analytics\n\nWhich of these tools are you currently using in production?\n\nComment below with your favorite AI tool! 👇\n\n#ArtificialIntelligence #SoftwareEngineering #TechTrends #Productivity`
      },
      {
        id: 2,
        title: 'Scanned Post Draft (Scanned PDF/OCR Scenario)',
        category: 'Scanned / OCR Sample',
        text: `INTERNAL SOCIAL MEDIA DRAFT - AUG 2025\n\nStop wasting hours creating content that gets zero engagement.\n\nThe secret to viral reach isn't posting 10x a day. It's optimizing three critical components:\n- Hook: Stop the scroll in the first 2 seconds\n- Value: Deliver actionable takeaways without fluff\n- Call To Action: Tell your reader exactly what to do next\n\nWant our free template guide? Repost this and reply "GUIDE" below!\n\n#GrowthHacking #ContentStrategy #MarketingTips`
      },
      {
        id: 3,
        title: 'Unoptimized Draft (Needs Improvement)',
        category: 'Raw Draft',
        text: `we launched our new product today check it out on our website we spent months working on it hope everyone likes it thanks.`
      }
    ]
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

const server = app.listen(PORT, () => {
  console.log(`✅ Social Media Analyzer Backend running on http://localhost:${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    const ALT_PORT = Number(PORT) + 1;
    console.warn(`⚠️ Port ${PORT} is in use, starting backend fallback on http://localhost:${ALT_PORT}`);
    app.listen(ALT_PORT, () => {
      console.log(`✅ Social Media Analyzer Backend running on http://localhost:${ALT_PORT}`);
    });
  } else {
    console.error('Server error:', err);
  }
});
