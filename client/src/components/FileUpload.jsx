import React, { useState, useRef } from 'react';
import { Upload, FileUp, Image, FileText, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { createWorker } from 'tesseract.js';
import { uploadDocument } from '../services/api';

export default function FileUpload({ onTextExtracted, isProcessing, setIsProcessing }) {
  const [dragActive, setDragActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [currentFile, setCurrentFile] = useState(null);
  const [clientOCR, setClientOCR] = useState(false);
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = async (file) => {
    setErrorMessage('');
    setCurrentFile(file);

    // Validate size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage('File size exceeds 10MB limit. Please upload a smaller file.');
      return;
    }

    const isPdf = file.type === 'application/pdf' || file.name.endsWith('.pdf');
    const isImage = file.type.startsWith('image/');

    if (!isPdf && !isImage) {
      setErrorMessage('Unsupported file format. Please upload a PDF or an Image file (PNG, JPG, WEBP).');
      return;
    }

    setIsProcessing(true);
    setProgress(10);

    try {
      if (clientOCR && isImage) {
        // Run OCR in Browser Client via Tesseract.js
        setStatusMessage('Initializing Browser Tesseract OCR Engine...');
        setProgress(25);

        const worker = await createWorker('eng', 1, {
          logger: (m) => {
            if (m.status === 'recognizing text') {
              const p = Math.round(m.progress * 100);
              setProgress(30 + Math.round(p * 0.65));
              setStatusMessage(`OCR Recognition: ${p}%`);
            }
          }
        });

        setStatusMessage('Extracting text from image...');
        const ret = await worker.recognize(file);
        const text = ret.data.text ? ret.data.text.trim() : '';
        await worker.terminate();

        setProgress(100);
        setStatusMessage('Extraction Complete!');
        onTextExtracted(text, file.name, 'Browser Tesseract.js OCR');
      } else {
        // Process via Backend API with automatic client-side OCR fallback
        setStatusMessage(isPdf ? 'Parsing PDF Document...' : 'Running Server OCR Extraction...');
        setProgress(30);

        try {
          const resData = await uploadDocument(file, (uploadPercent) => {
            setProgress(30 + Math.round(uploadPercent * 0.4));
          });

          setProgress(100);
          if (resData && resData.success) {
            setStatusMessage('Extraction Successful!');
            onTextExtracted(
              resData.text,
              resData.fileName,
              resData.extractionType
            );
          } else {
            throw new Error(resData?.error || 'Extraction failed');
          }
        } catch (apiErr) {
          // If server upload fails (e.g. standalone Vercel client without backend connected), run client-side OCR
          if (isImage) {
            setStatusMessage('Server unreachable. Running Client Browser OCR fallback...');
            const worker = await createWorker('eng');
            const ret = await worker.recognize(file);
            const text = ret.data.text ? ret.data.text.trim() : '';
            await worker.terminate();
            setProgress(100);
            setStatusMessage('Extraction Complete!');
            onTextExtracted(text, file.name, 'Browser Client OCR');
          } else {
            throw apiErr;
          }
        }
      }
    } catch (err) {
      console.error('Extraction error:', err);
      setErrorMessage(err.response?.data?.error || err.message || 'Failed to process document.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
            <Upload className="w-5 h-5 text-indigo-400" />
            Upload Document or Image
          </h2>
          <p className="text-xs text-slate-400">
            Upload PDFs (parsed maintaining layout) or scanned post images for OCR text extraction.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
          <span className="text-xs text-slate-400">Mode:</span>
          <button
            onClick={() => setClientOCR(!clientOCR)}
            className={`text-xs px-2 py-0.5 rounded font-medium transition-colors ${
              clientOCR
                ? 'bg-purple-600 text-white'
                : 'bg-indigo-600 text-white'
            }`}
          >
            {clientOCR ? 'Browser OCR' : 'Server API (Recommended)'}
          </button>
        </div>
      </div>

      <div
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
          dragActive
            ? 'border-indigo-500 bg-indigo-500/10 scale-[0.99]'
            : 'border-slate-700 hover:border-slate-500 bg-slate-950/50 hover:bg-slate-950/80'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept=".pdf,.png,.jpg,.jpeg,.webp"
          onChange={handleChange}
          disabled={isProcessing}
        />

        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="p-4 bg-indigo-500/10 rounded-full border border-indigo-500/20 text-indigo-400">
            {isProcessing ? (
              <Loader2 className="w-8 h-8 animate-spin" />
            ) : (
              <FileUp className="w-8 h-8" />
            )}
          </div>

          <div>
            <p className="text-sm font-medium text-slate-200">
              {isProcessing ? (
                statusMessage || 'Processing document...'
              ) : (
                <>
                  <span className="text-indigo-400 underline decoration-indigo-400/50 underline-offset-4">
                    Click to upload
                  </span>{' '}
                  or drag and drop your file here
                </>
              )}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              PDF, PNG, JPG, JPEG, WEBP (Max 10MB)
            </p>
          </div>

          {!isProcessing && (
            <div className="flex items-center gap-4 text-xs text-slate-400 pt-2">
              <span className="flex items-center gap-1">
                <FileText className="w-4 h-4 text-emerald-400" /> PDF Parsing
              </span>
              <span className="flex items-center gap-1">
                <Image className="w-4 h-4 text-purple-400" /> Tesseract OCR
              </span>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        {isProcessing && (
          <div className="mt-6 w-full max-w-xs mx-auto space-y-1.5">
            <div className="flex justify-between text-xs text-slate-300">
              <span>{statusMessage}</span>
              <span className="font-mono">{progress}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Selected File Details */}
      {currentFile && !isProcessing && !errorMessage && (
        <div className="mt-4 p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center gap-2 truncate">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span className="font-medium text-slate-200 truncate">{currentFile.name}</span>
            <span className="text-slate-400">({(currentFile.size / 1024).toFixed(1)} KB)</span>
          </div>
          <button
            onClick={() => {
              setCurrentFile(null);
              setErrorMessage('');
            }}
            className="text-slate-400 hover:text-white"
          >
            Clear
          </button>
        </div>
      )}

      {/* Error Alert */}
      {errorMessage && (
        <div className="mt-4 p-3 bg-red-950/60 border border-red-800/80 rounded-xl flex items-center gap-3 text-xs text-red-300">
          <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
}
