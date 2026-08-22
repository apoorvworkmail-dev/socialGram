# Technical Approach Write-Up

## Overview & Architecture
To solve the challenge of analyzing social media content from multi-format documents, I engineered a full-stack solution using **React (Vite)**, **Node.js/Express**, and specialized document-parsing libraries.

## 1. Document Extraction & OCR Strategy
The application handles both digital PDFs and scanned image documents:
- **PDF Parsing:** Utilizes server-side `pdf-parse` to extract structural text while preserving formatting and line breaks.
- **Optical Character Recognition (OCR):** Integrates **Tesseract.js** (capable of dual execution via Node server or browser worker threads) to extract text from scanned documents/screenshots with real-time percentage progress tracking.

## 2. Engagement Analysis & NLP Pipeline
The core analytics engine evaluates posts across five quantitative dimensions:
1. **Engagement Scoring (0–100):** Weighted algorithm computing hook strength, CTA presence, readability grade, emoji balance, and length optimality.
2. **Hook & CTA Evaluator:** Identifies scroll-stopping opening lines and explicit calls to action.
3. **Sentiment & Tone Classifier:** Classifies tone (Professional, Urgent, Casual, Energetic).
4. **Hashtags & Emoji Optimizer:** Recommends targeted trending hashtags and emoji spacing.
5. **AI Variations & Multi-Platform Previews:** Generates optimized post styles and renders live previews for X (Twitter), LinkedIn, and Instagram.

## 3. Production Quality & UX
Built with responsive Tailwind CSS, skeleton loading states, defensive error handling, and 1-click test datasets.
