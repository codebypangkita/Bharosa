import React, { useState } from 'react';
import {
  TrendingUp,
  ShieldCheck,
  AlertTriangle,
  Activity,
  PieChart,
  Sparkles,
  Users,
  FileText,
  Lock,
  CheckCircle,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { educationalLessons } from '../data/educationalContent';
import { LessonModal } from '../components/education/LessonModal';
import { QuizComponent } from '../components/education/QuizComponent';
import { Badge } from '../components/ui/Badge';
import { useLanguage } from '../context/LanguageContext';

const ICON_MAP = {
  TrendingUp,
  ShieldCheck,
  AlertTriangle,
  Activity,
  PieChart,
  Sparkles,
  Users,
  FileText,
  Lock,
  CheckCircle
};

export function LearnPage() {
  const { t, language } = useLanguage();
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('All');

  const categories = ['All', 'Market Fundamentals', 'Regulatory Safety', 'Fraud Prevention', 'Smart Investing', 'Payment Defense'];

  const filteredLessons = categoryFilter === 'All'
    ? educationalLessons
    : educationalLessons.filter(l => l.category === categoryFilter);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-20 space-y-16">
      {/* Page Heading */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 bg-[#F1E3D9] text-[#784331] px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase border border-[#E8D9D0]">
          <BookOpen className="w-3.5 h-3.5" />
          Investor Literacy Library
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#34251F]">
          {t('learnTitle')}
        </h1>
        <p className="text-sm text-[#806D63] leading-relaxed">
          {t('learnSubtitle')}
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`text-xs font-semibold px-4 py-2 rounded-full transition-all cursor-pointer ${
              categoryFilter === cat
                ? 'bg-[#784331] text-[#FFF9F5] shadow-xs'
                : 'bg-[#FFF9F5] text-[#806D63] border border-[#E8D9D0] hover:bg-[#F1E3D9]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 10 Concept Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLessons.map((lesson) => {
          const Icon = ICON_MAP[lesson.iconName] || BookOpen;
          const title = lesson.title[language] || lesson.title.en;
          const shortDesc = lesson.shortDesc[language] || lesson.shortDesc.en;

          return (
            <div
              key={lesson.id}
              onClick={() => setSelectedLesson(lesson)}
              className="bg-[#FFF9F5] border border-[#E8D9D0] rounded-[24px] p-6 shadow-soft hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#F1E3D9] text-[#784331] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6 stroke-[2]" />
                  </div>
                  <Badge variant="neutral" size="sm">
                    {lesson.category}
                  </Badge>
                </div>

                <div>
                  <h3 className="font-serif text-xl font-bold text-[#34251F] group-hover:text-[#784331] transition-colors">
                    {title}
                  </h3>
                  <p className="text-xs text-[#806D63] mt-1.5 leading-relaxed">
                    {shortDesc}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-[#E8D9D0]/60 flex items-center justify-between text-xs font-bold text-[#784331]">
                <span>Read Lesson & Analogy</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Quiz Section */}
      <div className="pt-8">
        <QuizComponent />
      </div>

      {/* Lesson Detail Modal */}
      <LessonModal
        lesson={selectedLesson}
        isOpen={Boolean(selectedLesson)}
        onClose={() => setSelectedLesson(null)}
      />
    </div>
  );
}
