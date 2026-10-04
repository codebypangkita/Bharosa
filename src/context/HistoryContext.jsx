import React, { createContext, useContext, useState, useEffect } from 'react';
import { demoCases } from '../data/demoCases';

const HistoryContext = createContext();

export function HistoryProvider({ children }) {
  const [reports, setReports] = useState(() => {
    try {
      const stored = localStorage.getItem('bharosa_history');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // fallback
    }
    // Seed with 1 initial sample demo report so history is immediately inspectable
    const demo = demoCases[0];
    return [
      {
        id: 'report-demo-1',
        title: 'VIP Stock Advisory Group Check',
        date: new Date(Date.now() - 3600000 * 2).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        }),
        timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
        sourcePlatform: demo.sourcePlatform,
        category: demo.category,
        categoryLabel: 'Multiple Warning Signs Found',
        snippet: 'SEBI approved analyst. Guaranteed 30% monthly returns...',
        fullReport: {
          id: 'report-demo-1',
          mode: 'demo',
          badgeLabel: 'DEMO ANALYSIS — NOT LIVE REGULATORY VERIFICATION',
          category: demo.category,
          categoryLabel: 'Multiple Warning Signs Found',
          summary: demo.summary.en,
          originalText: demo.text,
          sourcePlatform: demo.sourcePlatform,
          highlights: demo.highlights,
          claims: demo.claims,
          signals: demo.signals,
          evidenceMatrix: demo.evidenceMatrix,
          actions: [
            'Do not send money under pressure.',
            'Verify entity identity independently on the official SEBI directory (sebi.gov.in).'
          ],
          limitations: [
            'Demonstration scenario based on fictional investment solicitation.'
          ],
          timestamp: new Date(Date.now() - 3600000 * 2).toISOString()
        }
      }
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('bharosa_history', JSON.stringify(reports));
    } catch {
      // ignore
    }
  }, [reports]);

  const saveReport = (report) => {
    const newEntry = {
      id: report.id || `report-${Date.now()}`,
      title: `${report.sourcePlatform || 'Message'} Verification`,
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }),
      timestamp: new Date().toISOString(),
      sourcePlatform: report.sourcePlatform || 'Message',
      category: report.category,
      categoryLabel: report.categoryLabel,
      snippet: (report.originalText || '').slice(0, 75) + '...',
      fullReport: report
    };

    setReports(prev => [newEntry, ...prev.filter(r => r.id !== newEntry.id)]);
  };

  const deleteReport = (id) => {
    setReports(prev => prev.filter(r => r.id !== id));
  };

  const clearHistory = () => {
    setReports([]);
  };

  return (
    <HistoryContext.Provider value={{ reports, saveReport, deleteReport, clearHistory }}>
      {children}
    </HistoryContext.Provider>
  );
}

export function useHistory() {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error('useHistory must be used within a HistoryProvider');
  }
  return context;
}
