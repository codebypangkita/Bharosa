import React, { useState, useRef } from 'react';
import { UploadCloud, X, RefreshCw, FileText, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { validateAndProcessImage } from '../../services/ocrService';
import { useLanguage } from '../../context/LanguageContext';

export function ScreenshotUpload({ onSubmit, isAnalyzing }) {
  const { t } = useLanguage();
  const fileInputRef = useRef(null);

  const [dragOver, setDragOver] = useState(false);
  const [fileData, setFileData] = useState(null);
  const [isProcessingOcr, setIsProcessingOcr] = useState(false);
  const [extractedText, setExtractedText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFile = async (file) => {
    if (!file) return;
    setErrorMessage('');
    setIsProcessingOcr(true);

    try {
      const data = await validateAndProcessImage(file);
      setFileData(data);
      setExtractedText(data.extractedText);
    } catch (err) {
      setErrorMessage(err.message || 'Failed to process image');
    } finally {
      setIsProcessingOcr(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleClear = () => {
    setFileData(null);
    setExtractedText('');
    setErrorMessage('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmitAnalysis = (e) => {
    e.preventDefault();
    if (!extractedText.trim()) {
      setErrorMessage('Please ensure there is extracted or transcribed text before analyzing.');
      return;
    }
    onSubmit({
      type: 'text',
      content: extractedText,
      platform: 'Screenshot'
    });
  };

  return (
    <div className="space-y-6">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={handleSelect}
        className="hidden"
        id="screenshot-file-input"
      />

      {/* Upload Dropzone */}
      {!fileData && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-[24px] p-8 text-center cursor-pointer transition-all duration-200 ${
            dragOver
              ? 'border-[#784331] bg-[#E9D1C3]/30 scale-[1.01]'
              : 'border-[#E8D9D0] bg-[#FFF9F5] hover:border-[#784331]/50 hover:bg-[#F1E3D9]/40'
          }`}
        >
          <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-[#F1E3D9] text-[#784331] flex items-center justify-center">
            <UploadCloud className="w-7 h-7 stroke-[2]" />
          </div>
          <h3 className="font-serif text-lg font-bold text-[#34251F] mb-1">
            {t('screenshotDropzone')}
          </h3>
          <p className="text-xs text-[#806D63]">
            {t('screenshotSupported')}
          </p>
        </div>
      )}

      {errorMessage && (
        <div className="p-3 bg-[#F7E4DF] border border-[#A84037]/30 text-[#A84037] text-xs rounded-xl font-medium">
          {errorMessage}
        </div>
      )}

      {/* OCR Processing State */}
      {isProcessingOcr && (
        <div className="p-6 bg-[#F1E3D9]/60 rounded-[20px] text-center space-y-2">
          <RefreshCw className="w-6 h-6 mx-auto text-[#784331] animate-spin" />
          <p className="text-sm font-semibold text-[#34251F]">
            Extracting text from screenshot...
          </p>
          <p className="text-xs text-[#806D63]">
            Simulated OCR engine running locally
          </p>
        </div>
      )}

      {/* Preview and Text Review Section */}
      {fileData && !isProcessingOcr && (
        <div className="space-y-5 animate-in fade-in duration-200">
          {/* File Card */}
          <div className="flex items-center justify-between p-3.5 bg-[#F1E3D9] rounded-2xl border border-[#E8D9D0]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-white shrink-0 border border-[#E8D9D0]">
                <img
                  src={fileData.previewUrl}
                  alt="Screenshot preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-[#34251F] truncate max-w-[200px] sm:max-w-xs">
                  {fileData.filename}
                </p>
                <p className="text-[11px] text-[#806D63]">
                  {fileData.sizeFormatted} • Image loaded
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                icon={RefreshCw}
              >
                {t('replaceImage')}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClear}
                icon={X}
              >
                {t('removeImage')}
              </Button>
            </div>
          </div>

          {/* OCR Notice */}
          <div className="p-3 bg-[#E5EEE2] border border-[#89A27D]/30 rounded-xl flex items-start gap-2.5 text-xs text-[#426C4D]">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Text Extraction Ready: </span>
              {fileData.ocrNotice}
            </div>
          </div>

          {/* Extracted Text Box for Review & Editing */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="extracted-ocr-text"
                className="block text-xs font-semibold text-[#34251F] flex items-center gap-1.5"
              >
                <FileText className="w-4 h-4 text-[#784331]" />
                {t('screenshotReview')}
              </label>
              <span className="text-[11px] text-[#806D63]">
                Editable before submission
              </span>
            </div>
            <textarea
              id="extracted-ocr-text"
              rows={4}
              value={extractedText}
              onChange={(e) => setExtractedText(e.target.value)}
              className="w-full p-4 rounded-[18px] bg-[#FFF9F5] border border-[#E8D9D0] text-[#34251F] focus:outline-none focus:ring-2 focus:ring-[#784331]/30 text-sm leading-relaxed"
            />
          </div>

          {/* Explicit Analysis Submission */}
          <Button
            onClick={handleSubmitAnalysis}
            disabled={isAnalyzing}
            size="lg"
            className="w-full sm:w-auto"
          >
            {t('analyzeBtn')}
          </Button>
        </div>
      )}
    </div>
  );
}
