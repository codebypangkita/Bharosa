import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  History,
  Trash2,
  ExternalLink,
  Calendar,
  AlertCircle,
  FileQuestion
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useHistory } from '../context/HistoryContext';
import { useAnalysis } from '../context/AnalysisContext';
import { useLanguage } from '../context/LanguageContext';

export function HistoryPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { reports, deleteReport, clearHistory } = useHistory();
  const { setCurrentReport } = useAnalysis();

  const handleOpenReport = (entry) => {
    setCurrentReport(entry.fullReport);
    navigate('/results');
  };

  const getBadgeVariant = (cat) => {
    switch (cat) {
      case 'multiple_warning_signs':
        return 'danger';
      case 'some_warning_signs':
        return 'warning';
      default:
        return 'sage';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-20 space-y-8">
      {/* Page Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8D9D0]">
        <div>
          <span className="inline-flex items-center gap-1.5 bg-[#F1E3D9] text-[#784331] px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase border border-[#E8D9D0]">
            <History className="w-3.5 h-3.5" />
            Session History
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#34251F] mt-2">
            {t('historyTitle')}
          </h1>
          <p className="text-xs text-[#806D63] mt-1">
            {t('historySubtitle')}
          </p>
        </div>

        {reports.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearHistory}
            icon={Trash2}
          >
            {t('clearAllHistory')}
          </Button>
        )}
      </div>

      {/* Transparent Session Storage Notice */}
      <div className="p-4 bg-[#F1E3D9]/60 border border-[#E8D9D0] rounded-2xl text-xs text-[#806D63] leading-relaxed flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-[#784331] shrink-0 mt-0.5" />
        <div>
          <strong className="text-[#34251F]">Demo Storage Guarantee: </strong>
          {t('historyDemoNotice')}
        </div>
      </div>

      {/* Reports List */}
      {reports.length === 0 ? (
        <div className="bg-[#FFF9F5] border border-[#E8D9D0] rounded-[28px] p-12 text-center space-y-4 shadow-soft">
          <div className="w-16 h-16 rounded-2xl bg-[#F1E3D9] text-[#784331] flex items-center justify-center mx-auto">
            <FileQuestion className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-[#34251F]">
              {t('historyEmptyTitle')}
            </h3>
            <p className="text-xs text-[#806D63] max-w-sm mx-auto mt-1">
              {t('historyEmptyDesc')}
            </p>
          </div>
          <Button onClick={() => navigate('/verify')} size="md">
            Start a Verification
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {reports.map((report) => (
            <div
              key={report.id}
              className="bg-[#FFF9F5] border border-[#E8D9D0] rounded-[22px] p-5 sm:p-6 shadow-soft hover:shadow-card-hover transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-2 max-w-xl">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant={getBadgeVariant(report.category)} size="sm">
                    {report.categoryLabel || 'Evaluated'}
                  </Badge>
                  <span className="text-xs text-[#806D63] flex items-center gap-1 font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    {report.date}
                  </span>
                  <span className="text-xs text-[#806D63]">
                    • Platform: <strong>{report.sourcePlatform}</strong>
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-medium text-[#34251F] font-mono leading-relaxed line-clamp-2">
                  "{report.snippet}"
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleOpenReport(report)}
                  icon={ExternalLink}
                >
                  {t('viewReport')}
                </Button>

                <button
                  type="button"
                  onClick={() => deleteReport(report.id)}
                  aria-label="Delete report"
                  className="p-2 text-[#806D63] hover:text-[#A84037] hover:bg-[#F7E4DF] rounded-full transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
