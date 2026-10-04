import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, Award } from 'lucide-react';
import { quizQuestions } from '../../data/educationalContent';
import { Button } from '../ui/Button';
import { useLanguage } from '../../context/LanguageContext';

export function QuizComponent() {
  const { language, t } = useLanguage();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);

  const currentQ = quizQuestions[currentIdx];
  const scenario = currentQ.scenario[language] || currentQ.scenario.en;

  const handleSelectOption = (idx) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    if (currentQ.options[idx].correct) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    setIsAnswered(false);
    setSelectedOption(null);
    if (currentIdx < quizQuestions.length - 1) {
      setCurrentIdx(i => i + 1);
    } else {
      setCurrentIdx(quizQuestions.length); // finished
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setScore(0);
    setIsAnswered(false);
  };

  // Completed State
  if (currentIdx >= quizQuestions.length) {
    return (
      <div className="bg-[#FFF9F5] border border-[#E8D9D0] rounded-[24px] p-8 text-center space-y-5 shadow-soft max-w-2xl mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-[#E5EEE2] text-[#426C4D] flex items-center justify-center mx-auto">
          <Award className="w-8 h-8" />
        </div>
        <div>
          <h3 className="font-serif text-2xl font-bold text-[#34251F]">
            Knowledge Check Complete!
          </h3>
          <p className="text-sm text-[#806D63] mt-1">
            You scored {score} out of {quizQuestions.length} correct in this practice session.
          </p>
        </div>
        <p className="text-xs text-[#806D63] max-w-md mx-auto leading-relaxed">
          Remember: Real-world investment scams count on urgency and unverified authority. Always pause, investigate, and never transfer money to personal UPI handles.
        </p>
        <div>
          <Button variant="secondary" onClick={handleReset} icon={RotateCcw}>
            Retake Quiz
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FFF9F5] border border-[#E8D9D0] rounded-[24px] p-6 sm:p-8 shadow-soft max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-[#E8D9D0]">
        <div className="flex items-center gap-2">
          <span className="p-1 rounded-lg bg-[#E9D1C3] text-[#784331]">
            <HelpCircle className="w-4 h-4" />
          </span>
          <h3 className="font-serif text-xl font-bold text-[#34251F]">
            {t('quizTitle')}
          </h3>
        </div>
        <span className="text-xs font-semibold text-[#806D63] bg-[#F1E3D9] px-3 py-1 rounded-full">
          Question {currentIdx + 1} of {quizQuestions.length}
        </span>
      </div>

      {/* Scenario */}
      <div className="p-5 rounded-2xl bg-[#F8F0EB] border border-[#E8D9D0]">
        <p className="text-sm sm:text-base font-medium text-[#34251F] leading-relaxed">
          {scenario}
        </p>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {currentQ.options.map((opt, idx) => {
          const optText = opt.text[language] || opt.text.en;
          let btnStyle = 'bg-[#FFF9F5] border-[#E8D9D0] text-[#34251F] hover:bg-[#F1E3D9]';

          if (isAnswered) {
            if (opt.correct) {
              btnStyle = 'bg-[#E5EEE2] border-[#89A27D] text-[#426C4D] font-semibold';
            } else if (selectedOption === idx) {
              btnStyle = 'bg-[#F7E4DF] border-[#A84037] text-[#A84037] font-semibold';
            } else {
              btnStyle = 'bg-[#FFF9F5] border-[#E8D9D0] text-[#806D63] opacity-60';
            }
          }

          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectOption(idx)}
              disabled={isAnswered}
              className={`w-full p-4 rounded-[18px] border text-left text-xs sm:text-sm transition-all duration-150 flex items-start gap-3 cursor-pointer disabled:cursor-default ${btnStyle}`}
            >
              <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="flex-1 leading-relaxed">{optText}</span>
              {isAnswered && opt.correct && (
                <CheckCircle2 className="w-5 h-5 text-[#426C4D] shrink-0" />
              )}
              {isAnswered && selectedOption === idx && !opt.correct && (
                <XCircle className="w-5 h-5 text-[#A84037] shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Feedback Panel */}
      {isAnswered && (
        <div className="p-4 rounded-2xl bg-[#F1E3D9] border border-[#E8D9D0] space-y-3 animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            {currentQ.options[selectedOption].correct ? (
              <span className="text-sm font-bold text-[#426C4D] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> That is correct!
              </span>
            ) : (
              <span className="text-sm font-bold text-[#A84037] flex items-center gap-1.5">
                <XCircle className="w-4 h-4" /> Caution needed here!
              </span>
            )}
          </div>
          <p className="text-xs text-[#34251F] leading-relaxed">
            {currentQ.options[selectedOption].explanation[language] || currentQ.options[selectedOption].explanation.en}
          </p>
          <div className="pt-2 text-right">
            <Button size="sm" onClick={handleNext}>
              {currentIdx === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Scenario'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
