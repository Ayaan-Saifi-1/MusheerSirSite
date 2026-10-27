import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  Code,
  FileText,
  Copy,
  Check,
  Download,
  X,
  BookOpen,
  ExternalLink,
} from 'lucide-react';

export const CitationModal: React.FC = () => {
  const { activeCitationPub, setActiveCitationPub } = usePortfolio();
  const [activeTab, setActiveTab] = useState<'BIBTEX' | 'APA' | 'IEEE'>('BIBTEX');
  const [copied, setCopied] = useState(false);

  if (!activeCitationPub) return null;

  const pub = activeCitationPub;

  // Generate fallback BibTeX if not present
  const getBibtexContent = () => {
    if (pub.bibtex_raw && pub.bibtex_raw.trim()) {
      return pub.bibtex_raw.trim();
    }
    const key = `ahmad${pub.year}${pub.title.slice(0, 10).replace(/[^a-zA-Z0-9]/g, '').toLowerCase()}`;
    return `@article{${key},
  title = {${pub.title}},
  author = {${pub.authors}},
  journal = {${pub.venue_name}},
  year = {${pub.year}},
  volume = {${pub.volume_issue_pages || ''}},
  doi = {${pub.doi || ''}}
}`;
  };

  // Generate APA Formatted Citation
  const getApaCitation = () => {
    return `${pub.authors} (${pub.year}). ${pub.title}. ${pub.venue_name}, ${pub.volume_issue_pages ? pub.volume_issue_pages + '. ' : ''}${pub.doi ? 'https://doi.org/' + pub.doi : ''}`;
  };

  // Generate IEEE Formatted Citation
  const getIeeeCitation = () => {
    return `${pub.authors}, "${pub.title}," ${pub.venue_name}, ${pub.volume_issue_pages ? pub.volume_issue_pages + ', ' : ''}${pub.year}${pub.doi ? ', doi: ' + pub.doi : ''}.`;
  };

  const currentContent = activeTab === 'BIBTEX'
    ? getBibtexContent()
    : activeTab === 'APA'
    ? getApaCitation()
    : getIeeeCitation();

  const handleCopy = () => {
    navigator.clipboard.writeText(currentContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadBib = () => {
    const bibContent = getBibtexContent();
    const blob = new Blob([bibContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ahmad_${pub.year}_${pub.id}.bib`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={() => setActiveCitationPub(null)}
    >
      <div
        className="w-full max-w-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-left"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800 mb-5">
          <div className="space-y-1 max-w-[85%]">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-academic-amber uppercase">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Citation Studio</span>
            </div>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-zinc-950 dark:text-white leading-snug">
              {pub.title}
            </h3>
          </div>
          <button
            onClick={() => setActiveCitationPub(null)}
            className="p-1.5 rounded-xl text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => setActiveTab('BIBTEX')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'BIBTEX'
                ? 'bg-academic-obsidian text-white dark:bg-white dark:text-zinc-900 shadow-xs'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>BibTeX</span>
          </button>

          <button
            onClick={() => setActiveTab('APA')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'APA'
                ? 'bg-academic-obsidian text-white dark:bg-white dark:text-zinc-900 shadow-xs'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>APA Format</span>
          </button>

          <button
            onClick={() => setActiveTab('IEEE')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'IEEE'
                ? 'bg-academic-obsidian text-white dark:bg-white dark:text-zinc-900 shadow-xs'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>IEEE Format</span>
          </button>
        </div>

        {/* Content Box */}
        <div className="relative mb-6">
          <pre className="p-4 sm:p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 font-mono text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 overflow-x-auto select-all whitespace-pre-wrap leading-relaxed">
            {currentContent}
          </pre>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">
            {activeTab === 'BIBTEX' ? 'Formatted for LaTeX / Overleaf' : 'Ready to paste into Word or Google Docs'}
          </div>

          <div className="flex items-center gap-2">
            {activeTab === 'BIBTEX' && (
              <button
                onClick={handleDownloadBib}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-bold transition-colors border border-zinc-200 dark:border-zinc-700"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .bib</span>
              </button>
            )}

            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-academic-cobalt hover:bg-blue-700 text-white text-xs font-bold shadow-md transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Citation</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
