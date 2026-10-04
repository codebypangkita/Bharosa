import React, { createContext, useContext, useState } from 'react';
import { performAnalysis } from '../services/analysisService';
import { useHistory } from './HistoryContext';
import { useLanguage } from './LanguageContext';

const AnalysisContext = createContext();

export function AnalysisProvider({ children }) {
  const [currentReport, setCurrentReport] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progressStatus, setProgressStatus] = useState('');
  const [progressPercent, setProgressPercent] = useState(0);

  const { saveReport } = useHistory();
  const { language } = useLanguage();

  const runAnalysis = async ({ type, content, platform }) => {
    setIsAnalyzing(true);
    setProgressStatus('Starting analysis...');
    setProgressPercent(10);

    try {
      const result = await performAnalysis({
        type,
        content,
        platform,
        language,
        onProgress: (status, percent) => {
          setProgressStatus(status);
          setProgressPercent(percent);
        }
      });

      setCurrentReport(result);
      saveReport(result);
      setIsAnalyzing(false);
      return result;
    } catch (err) {
      console.error('Analysis error:', err);
      setIsAnalyzing(false);
      throw err;
    }
  };

  return (
    <AnalysisContext.Provider
      value={{
        currentReport,
        setCurrentReport,
        isAnalyzing,
        progressStatus,
        progressPercent,
        runAnalysis
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysis() {
  const context = useContext(AnalysisContext);
  if (!context) {
    throw new Error('useAnalysis must be used within an AnalysisProvider');
  }
  return context;
}
