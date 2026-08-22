# 📱 Social Media Content Analyzer

A full-stack web application that extracts text from uploaded PDF documents and scanned images (via Tesseract OCR), analyzes social media posts, calculates engagement potential scores, and offers actionable optimization suggestions with AI-rewritten variations and multi-platform live previews.

---

## 🌟 Key Features

### 1. 📄 Document Upload & Text Extraction
- **Drag-and-Drop / File Browser**: Supports PDF files (`.pdf`) and image formats (`.png`, `.jpg`, `.jpeg`, `.webp`).
- **PDF Parsing**: Server-side parsing preserving text formatting, paragraph structure, and line spacing.
- **Tesseract OCR (Optical Character Recognition)**: High-accuracy text extraction from scanned document images and post screenshots with live progress percentage indicators.
- **Dual Execution Engine**: Supports both Server API OCR and browser client-side Tesseract workers.

### 2. 📊 Social Media Engagement Analyzer
- **Engagement Score (0–100)**: Quantitative engagement rating based on hook quality, Call to Action (CTA), readability grade, emoji balance, and hashtag optimization.
- **Readability Index**: Flesch Reading Ease score, word count, character count, and estimated reading time.
- **Hook & CTA Evaluator**: Evaluates scroll-stopping opening lines and explicit engagement prompts.
- **Tone & Sentiment Detection**: Identifies post tone (*Energetic*, *Professional*, *Informative*, *Urgent*, *Casual*).
- **Hashtags & Emoji Optimizer**: Analyzes existing hashtag usage and recommends top trending topic tags.
- **AI-Optimized Variations**: Generates 3 alternative high-converting post styles (*🔥 Viral Hook*, *💼 Executive Professional*, *📖 Storytelling*).

### 3. 👁️ Multi-Platform Live Previews
- Real-time rendering previews for **X (Twitter)** (with 280-char limit counter & warning), **LinkedIn** (with fold preview), and **Instagram** caption layout.

### 4. ⚡ Instant Evaluation Mode
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
│   │   ├── App.jsx
│   │   └── index.css
│   └── package.json
├── server/                 # Express Backend API
│   ├── routes/
│   │   ├── upload.js       # PDF & Tesseract OCR route
│   │   └── analyze.js      # Metric scoring & NLP route
│   ├── index.js            # Express server entry point
│   └── package.json
├── APPROACH.md             # 200-word Technical Approach Write-Up
└── README.md
```

---

## 🚀 Quick Start & Setup Instructions

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### 1. Install Dependencies

**Install Backend Dependencies:**
```bash
cd server
npm install
```

**Install Frontend Dependencies:**
```bash
cd ../client
npm install
```

---

### 2. Run the Application

**Start the Backend API Server:**
```bash
cd server
npm run dev
```
*(Server will start on `http://localhost:5000`)*

**Start the Frontend React Client:**
```bash
cd client
npm run dev
```
*(Frontend will open on `http://localhost:3000`)*

---

## 🧪 Testing & Verification

1. Open `http://localhost:3000` in your web browser.
2. **1-Click Sample Test**: Click on any of the sample cards at the top (e.g. *🚀 Tech & AI Launch Post* or *📄 Scanned Document Draft*) to load sample data and test engagement scoring immediately.
3. **Upload PDF Document**: Drag & drop any PDF file to test structural text extraction.
4. **Upload Scanned Image / Screenshot**: Upload a `.png` or `.jpg` scanned post to watch the real-time Tesseract OCR progress bar.
5. **View Engagement Dashboard**: Explore engagement score breakdowns, readability grade, sentiment, hook analysis, recommended hashtags, and AI variations.
6. **Platform Previews**: Switch tabs between **X (Twitter)**, **LinkedIn**, and **Instagram** to test live rendering.

---

## 📄 Approach Summary

See [APPROACH.md](file:///c:/Users/apoorv%20mishra/Desktop/SoicalGram/APPROACH.md) for the concise **200-word technical approach write-up** detailing problem-solving, OCR pipeline design, and evaluation metrics.
