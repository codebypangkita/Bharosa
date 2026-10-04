import React from 'react';
import { ExternalLink, AlertTriangle, HelpCircle, CheckCircle2, BookOpen } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { useLanguage } from '../../context/LanguageContext';

export function LessonModal({ lesson, isOpen, onClose }) {
  const { language } = useLanguage();

  if (!lesson) return null;

  const title = lesson.title[language] || lesson.title.en;
  const whatItMeans = lesson.whatItMeans[language] || lesson.whatItMeans.en;
  const analogy = lesson.analogy[language] || lesson.analogy.en;
  const fictionalExample = lesson.fictionalExample[language] || lesson.fictionalExample.en;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="max-w-2xl">
      <div className="space-y-6 text-sm text-[#34251F]">
        <div className="flex items-center gap-2">
          <Badge variant="terracotta" size="sm">
            {lesson.category}
          </Badge>
          <span className="text-xs text-[#806D63]">
            Investor Literacy Module
          </span>
        </div>

        {/* Section 1: What it means */}
        <div className="space-y-1.5">
          <h4 className="font-serif text-lg font-bold text-[#784331] flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-[#784331]" />
            1. What It Means
          </h4>
          <p className="text-[#34251F] leading-relaxed bg-[#F8F0EB] p-4 rounded-2xl border border-[#E8D9D0]">
            {whatItMeans}
          </p>
        </div>

        {/* Section 2: Everyday Analogy */}
        <div className="space-y-1.5">
          <h4 className="font-serif text-lg font-bold text-[#536D4D] flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#536D4D]" />
            2. Simple Everyday Analogy
          </h4>
          <div className="p-4 rounded-2xl bg-[#E5EEE2] border border-[#89A27D]/30 text-[#34251F] leading-relaxed">
            {analogy}
          </div>
        </div>

        {/* Section 3: Fictional Example */}
        <div className="space-y-1.5">
          <h4 className="font-serif text-lg font-bold text-[#A56B25] flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-[#A56B25]" />
            3. Common Pitch You Might Hear
          </h4>
          <div className="p-3.5 rounded-2xl bg-[#F5EBD6] border border-[#A56B25]/20 font-mono text-xs text-[#34251F]">
            {fictionalExample}
          </div>
        </div>

        {/* Section 4: Warning Signs */}
        <div className="space-y-2">
          <h4 className="font-serif text-lg font-bold text-[#A84037]">
            4. Common Warning Signs
          </h4>
          <ul className="space-y-2 text-xs text-[#806D63]">
            {lesson.warningSigns.map((ws, i) => (
              <li key={i} className="flex items-start gap-2 bg-[#F8F0EB] p-2.5 rounded-xl border border-[#E8D9D0]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A84037] mt-1.5 shrink-0" />
                <span>{ws}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Section 5: Questions to ask */}
        <div className="space-y-2">
          <h4 className="font-serif text-lg font-bold text-[#34251F]">
            5. Questions to Ask Before Trusting
          </h4>
          <ul className="space-y-2 text-xs text-[#34251F]">
            {lesson.questionsToAsk.map((q, i) => (
              <li key={i} className="flex items-start gap-2 bg-[#F1E3D9]/60 p-2.5 rounded-xl border border-[#E8D9D0]">
                <HelpCircle className="w-4 h-4 text-[#784331] shrink-0 mt-0.5" />
                <span className="font-medium">{q}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Section 6: Official Reading */}
        {lesson.officialSource && (
          <div className="pt-4 border-t border-[#E8D9D0] flex items-center justify-between text-xs">
            <span className="text-[#806D63]">
              Official source: <strong className="text-[#34251F]">{lesson.officialSource.name}</strong>
            </span>
            <a
              href={lesson.officialSource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#784331] font-bold hover:underline"
            >
              <span>Learn on Official Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}
      </div>
    </Modal>
  );
}
