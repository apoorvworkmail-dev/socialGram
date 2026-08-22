import express from 'express';
import multer from 'multer';
import pdfParse from 'pdf-parse';
import { createWorker } from 'tesseract.js';

const router = express.Router();

// Memory storage for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

/**
 * POST /api/upload
 * Accepts single file (PDF or Image) and returns extracted text + metadata
 */
router.post('/', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { originalname, mimetype, buffer } = req.file;
    let extractedText = '';
    let extractionType = '';
    let confidence = null;

    if (mimetype === 'application/pdf' || originalname.endsWith('.pdf')) {
      extractionType = 'PDF Parsing';
      const pdfData = await pdfParse(buffer);
      extractedText = pdfData.text || '';
      
      // Clean up excess vertical whitespace while keeping paragraphs
      extractedText = extractedText
        .replace(/\r\n/g, '\n')
        .replace(/\n{3,}/g, '\n\n')
        .trim();

      if (!extractedText) {
        // Fallback: If PDF was a scanned document, note it for OCR
        return res.status(200).json({
          success: true,
          fileName: originalname,
          fileType: mimetype,
          extractionType: 'PDF OCR (Scanned PDF)',
          text: 'PDF contained no selectable text. Try converting pages to image for full OCR extraction.',
          confidence: 0
        });
      }
    } else if (mimetype.startsWith('image/')) {
      extractionType = 'Tesseract OCR Engine';
      const worker = await createWorker('eng');
      const ret = await worker.recognize(buffer);
      extractedText = ret.data.text ? ret.data.text.trim() : '';
      confidence = Math.round(ret.data.confidence || 0);
      await worker.terminate();
    } else {
      return res.status(400).json({ error: 'Unsupported file format. Please upload PDF or image files (PNG, JPG, WEBP).' });
    }

    res.json({
      success: true,
      fileName: originalname,
      fileType: mimetype,
      extractionType,
      text: extractedText,
      confidence,
      wordCount: extractedText.split(/\s+/).filter(Boolean).length
    });
  } catch (error) {
    console.error('File extraction error:', error);
    res.status(500).json({
      error: 'Failed to extract text from file',
      details: error.message
    });
  }
});

export default router;
