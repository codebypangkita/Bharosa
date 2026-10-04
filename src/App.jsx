import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { HistoryProvider } from './context/HistoryContext';
import { AnalysisProvider } from './context/AnalysisContext';
import { Header } from './components/layout/Header';
import { BottomNav } from './components/layout/BottomNav';
import { Footer } from './components/layout/Footer';

import { HomePage } from './pages/HomePage';
import { VerifyPage } from './pages/VerifyPage';
import { ResultsPage } from './pages/ResultsPage';
import { LearnPage } from './pages/LearnPage';
import { SafetyPage } from './pages/SafetyPage';
import { HistoryPage } from './pages/HistoryPage';
import { TrustPage } from './pages/TrustPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function AppContent() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F0EB] text-[#34251F]">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/verify" element={<VerifyPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/safety" element={<SafetyPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/trust" element={<TrustPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <HistoryProvider>
          <AnalysisProvider>
            <AppContent />
          </AnalysisProvider>
        </HistoryProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}
