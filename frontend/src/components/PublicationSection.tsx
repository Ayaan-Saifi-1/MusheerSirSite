import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Publication } from '../types/portfolio';
import {
  BookOpen,
  Copy,
  Check,
  ExternalLink,
  FileText,
  Code,
  Award,
  Sparkles,
  Quote,
  X,
} from 'lucide-react';

export const PublicationSection: React.FC = () => {
  const { data } = usePortfolio();
  const { publications } = data;
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [activeBibtex, setActiveBibtex] = useState<Publication | null>(null);
  const [filterType, setFilterType] = useState<string>('ALL');

  const filteredPublications = publications.filter(p => {
    if (filterType === 'ALL') return true;
    if (filterType === 'Q1') return p.quartile === 'Q1';
    if (filterType === 'FEATURED') return p.is_featured;
    return true;
  });

  const handleCopyBibtex = (pub: Publication) => {
    if (!pub.bibtex_raw) return;
    navigator.clipboard.writeText(pub.bibtex_raw);
    setCopiedId(pub.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Highlights 'Musheer Ahmad' or 'M. Ahmad' in author strings
  const renderAuthors = (authors: string) => {
    const parts = authors.split(/(Musheer Ahmad|M\. Ahmad)/g);
    return (
      <span>
        {parts.map((part, i) =>
          part === 'Musheer Ahmad' || part === 'M. Ahmad' ? (
            <strong key={i} className="text-zinc-950 dark:text-white underline decoration-academic-amber decoration-2 underline-offset-2">
              {part}
            </strong>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </span>
    );
  };

  return (
    <section id="publications" className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 mb-2 border border-amber-200 dark:border-amber-800/60">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Peer-Reviewed Scholarly Contributions</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Selected Publications
            </h2>
            <p className="mt-2 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl">
              High-impact research across IEEE Transactions, Elsevier Chaos, Solitons & Fractals, and leading cryptology venues.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 p-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 self-start md:self-auto">
            {['ALL', 'Q1', 'FEATURED'].map((f) => (
              <button
                key={f}
                onClick={() => setFilterType(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filterType === f
                    ? 'bg-white dark:bg-zinc-900 text-zinc-950 dark:text-white shadow-xs'
                    : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
                }`}
              >
                {f === 'ALL' ? 'All Papers' : f === 'Q1' ? 'SCI Q1 Only' : 'Featured'}
              </button>
            ))}
          </div>
        </div>

        {/* Publications List */}
        <div className="space-y-4">
          {filteredPublications.map((pub) => (
            <article
              key={pub.id}
              className="bg-white dark:bg-academic-cardDark rounded-2xl p-6 border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs hover:shadow-md transition-all hover:border-academic-cobalt/40 dark:hover:border-cyan-400/30"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                
                <div className="space-y-2 max-w-4xl">
                  {/* Badges Bar */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                      {pub.year}
                    </span>
                    {pub.quartile === 'Q1' && (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                        SCI Q1
                      </span>
                    )}
                    {pub.impact_factor && (
                      <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60">
                        IF: {pub.impact_factor}
                      </span>
                    )}
                    {pub.citation_count > 0 && (
                      <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                        <Quote className="w-3 h-3 text-academic-amber" />
                        {pub.citation_count} citations
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-zinc-950 dark:text-white leading-snug">
                    {pub.title}
                  </h3>

                  {/* Authors */}
                  <div className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                    {renderAuthors(pub.authors)}
                  </div>

                  {/* Venue */}
                  <div className="text-xs font-semibold text-academic-cobalt dark:text-cyan-400 italic">
                    {pub.venue_name} {pub.volume_issue_pages && `• ${pub.volume_issue_pages}`}
                  </div>

                  {/* Abstract Snippet */}
                  {pub.abstract && (
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed pt-1">
                      {pub.abstract}
                    </p>
                  )}
                </div>

                {/* Right Action Buttons */}
                <div className="flex lg:flex-col items-center lg:items-end gap-2 shrink-0 pt-2 lg:pt-0">
                  {pub.doi && (
                    <a
                      href={`https://doi.org/${pub.doi}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-xs font-semibold text-zinc-700 dark:text-zinc-200 transition-colors"
                    >
                      <span>DOI Link</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}

                  {pub.bibtex_raw && (
                    <button
                      onClick={() => handleCopyBibtex(pub)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-xs font-semibold text-zinc-700 dark:text-zinc-200 transition-colors"
                      title="Copy BibTeX Citation"
                    >
                      {copiedId === pub.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-500" />
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-zinc-400" />
                          <span>BibTeX</span>
                        </>
                      )}
                    </button>
                  )}

                  {pub.bibtex_raw && (
                    <button
                      onClick={() => setActiveBibtex(pub)}
                      className="text-[11px] font-medium text-zinc-500 hover:text-academic-cobalt dark:hover:text-cyan-400 underline"
                    >
                      View Citation
                    </button>
                  )}
                </div>

              </div>
            </article>
          ))}
        </div>

        {/* Bottom Scholar Link */}
        <div className="mt-8 text-center">
          <a
            href={data.site_config.google_scholar_url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-xs font-bold text-zinc-800 dark:text-zinc-200 transition-colors border border-zinc-200 dark:border-zinc-700"
          >
            <span>View Full 150+ Publications Bibliography on Google Scholar</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>

      {/* BibTeX View Modal */}
      {activeBibtex && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-2xl text-left">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800 mb-4">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-academic-cobalt dark:text-cyan-400" />
                <h3 className="font-bold text-base text-zinc-900 dark:text-white">
                  BibTeX Citation
                </h3>
              </div>
              <button
                onClick={() => setActiveBibtex(null)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <pre className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 font-mono text-xs overflow-x-auto text-zinc-800 dark:text-zinc-200 select-all mb-4">
              {activeBibtex.bibtex_raw}
            </pre>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => handleCopyBibtex(activeBibtex)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-academic-obsidian text-white dark:bg-white dark:text-zinc-900 text-xs font-bold hover:bg-academic-cobalt transition-colors"
              >
                {copiedId === activeBibtex.id ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy BibTeX</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
