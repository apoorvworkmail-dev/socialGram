# 📱 Social Media Content Analyzer

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://social-gram-kappa.vercel.app/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/apoorvworkmail-dev/socialGram)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green?style=for-the-badge&logo=nodedotjs)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev)

> 🚀 **Live Hosted Application**: **[https://social-gram-kappa.vercel.app/](https://social-gram-kappa.vercel.app/)**

A production-ready full-stack web application that extracts text from uploaded PDF documents and scanned images (via Tesseract OCR), analyzes social media posts, calculates engagement potential scores, and offers actionable optimization suggestions with AI-rewritten variations, best posting time recommendations, and multi-platform live previews.

---

## 🌐 Live Deployment

- **Frontend Application (Vercel)**: **[https://social-gram-kappa.vercel.app/](https://social-gram-kappa.vercel.app/)**
- **GitHub Repository**: **[https://github.com/apoorvworkmail-dev/socialGram](https://github.com/apoorvworkmail-dev/socialGram)**

---

## 🌟 Key Features

### 1. 📄 Document Upload & Text Extraction
- **Drag-and-Drop / File Browser**: Supports PDF files (`.pdf`) and image formats (`.png`, `.jpg`, `.jpeg`, `.webp`).
- **PDF Parsing**: Server-side parsing preserving text formatting, paragraph structure, and line spacing.
- **Tesseract OCR (Optical Character Recognition)**: High-accuracy text extraction from scanned document images and post screenshots with live progress percentage indicators.
- **Dual Execution Engine**: Supports both Server API OCR and browser client-side Tesseract workers with automatic fallback.

### 2. 📊 Social Media Engagement Analyzer
- **Engagement Score (0–100)**: Quantitative engagement rating based on hook quality, Call to Action (CTA), readability grade, emoji balance, and hashtag optimization.
- **Readability Index**: Flesch Reading Ease score, word count, character count, and estimated reading time.
- **Hook & CTA Evaluator**: Evaluates scroll-stopping opening lines and explicit engagement prompts.
- **Tone & Sentiment Detection**: Identifies post tone (*Energetic*, *Professional*, *Informative*, *Urgent*, *Casual*).
- **Emotional Resonance Spectrum**: Measures intensity across *Curiosity*, *Confidence*, *Urgency*, and *Engagement Potential*.
- **Best Posting Time & Audience Predictor**: Calculates optimal posting windows (e.g., *Tuesday 9:00 AM – 11:00 AM*) and platform distribution fit.
- **Hashtags & Emoji Optimizer**: Analyzes existing hashtag usage and recommends top high-reach topic tags with 1-click addition.
- **AI-Optimized Variations**: Generates 4 alternative high-converting post styles (*🔥 Viral Hook*, *💼 Executive Professional*, *📖 Storytelling*, *⚡ Minimalist Punchy*).

### 3. 👁️ Multi-Platform Live Previews
- Real-time rendering previews for **X (Twitter)** (with 280-char limit counter & warning), **LinkedIn** (with fold preview), and **Instagram** caption layout.

### 4. 📥 1-Click Audit Report Downloader
- Export a full Markdown (`.md`) content audit report containing scores, metric breakdowns, recommendations, best posting times, and AI variations.

### 5. ⚡ Instant Evaluation Mode
- Includes 1-click sample loaders featuring tech announcements, scanned OCR post drafts, and raw unoptimized posts for quick testing without uploading personal files.

---

## 🏗️ Architecture & Technology Stack

- **Frontend**: React 19, Vite, Tailwind CSS v4, Lucide React Icons, Axios, Tesseract.js
- **Backend**: Node.js, Express, Multer, `pdf-parse`, `tesseract.js`, Cors, Dotenv

```
SoicalGram/
├── client/                 # React Frontend (Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── FileUpload.jsx
│   │   │   ├── TextEditor.jsx
│   │   │   ├── AnalysisDashboard.jsx
│   │   │   ├── PlatformPreview.jsx
│   │   │   └── SampleDataPicker.jsx
│   │   ├── services/
│   │   │   └── api.js      # Centralized API service
│   │   ├── App.jsx
│   │   └── index.css
│   └── package.json
├── server/                 # Express Backend API
│   ├── routes/
│   │   ├── upload.js       # PDF & Tesseract OCR route
│   │   └── analyze.js      # Metric scoring & NLP route
│   ├── index.js            # Express server entry point
│   └── package.json
├── package.json            # Root unified runner (concurrently)
├── APPROACH.md             # 200-word Technical Approach Write-Up
└── README.md
```

---

## 🚀 Quick Start & Setup Instructions

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### 1-Click Install & Run Locally

```bash
# Install root dependencies
npm install

# Run both Frontend (port 3000) and Backend (port 5000) concurrently
npm run dev
```

*Frontend will open on `http://localhost:3000`*
*Backend will run on `http://localhost:5000` (Health Check: `http://localhost:5000/api/health`)*

---

## 🧪 Testing & Verification

1. Open **[https://social-gram-kappa.vercel.app/](https://social-gram-kappa.vercel.app/)** in your web browser.
2. **1-Click Sample Test**: Click on any of the sample cards at the top to load sample data and test engagement scoring immediately.
3. **Upload PDF Document**: Drag & drop any PDF file to test structural text extraction.
4. **Upload Scanned Image / Screenshot**: Upload a `.png` or `.jpg` scanned post to watch the real-time Tesseract OCR progress bar.
5. **View Engagement Dashboard**: Explore engagement score breakdowns, readability grade, sentiment, emotional resonance, best posting times, and AI variations.
6. **Platform Previews**: Switch tabs between **X (Twitter)**, **LinkedIn**, and **Instagram** to test live rendering.
7. **Download Report**: Click **"Download Audit Report (.md)"** to export the analysis.

---

## 📄 Approach Summary

See [APPROACH.md](file:///c:/Users/apoorv%20mishra/Desktop/SoicalGram/APPROACH.md) for the concise **200-word technical approach write-up** detailing problem-solving, OCR pipeline design, and evaluation metrics.
