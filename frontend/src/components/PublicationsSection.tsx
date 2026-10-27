import React, { useState, useMemo } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Publication } from '../types/portfolio';
import {
  BookOpen,
  Search,
  Filter,
  Download,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Quote,
  Star,
  Sparkles,
  FileText,
  Code,
  Check,
  X,
  Layers,
} from 'lucide-react';

export const PublicationsSection: React.FC = () => {
  const { data, selectedResearchAreaFilter, setSelectedResearchAreaFilter, setActiveCitationPub } = usePortfolio();
  const { publications, site_config, research_areas } = data;

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [featuredOnly, setFeaturedOnly] = useState<boolean>(false);
  const [selectedYear, setSelectedYear] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'NEWEST' | 'CITATIONS' | 'IMPACT_FACTOR'>('NEWEST');
  const [expandedAbstracts, setExpandedAbstracts] = useState<Record<number, boolean>>({});

  // Toggle abstract accordion
  const toggleAbstract = (id: number) => {
    setExpandedAbstracts(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Extract unique available years from dataset
  const availableYears = useMemo(() => {
    const years = Array.from(new Set(publications.map(p => p.year))).sort((a, b) => b - a);
    return years;
  }, [publications]);

  // Active topic filter name
  const activeTopic = useMemo(() => {
    if (!selectedResearchAreaFilter) return null;
    return research_areas.find(a => a.slug === selectedResearchAreaFilter);
  }, [selectedResearchAreaFilter, research_areas]);

  // Main Multi-Facet Filtered & Sorted Publications
  const filteredPublications = useMemo(() => {
    let result = publications.filter(pub => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = pub.title.toLowerCase().includes(q);
        const matchesAuthors = pub.authors.toLowerCase().includes(q);
        const matchesVenue = pub.venue_name.toLowerCase().includes(q);
        const matchesDoi = pub.doi?.toLowerCase().includes(q);
        const matchesAbstract = pub.abstract?.toLowerCase().includes(q);
        if (!matchesTitle && !matchesAuthors && !matchesVenue && !matchesDoi && !matchesAbstract) {
          return false;
        }
      }

      // 2. Publication Type
      if (selectedType === 'Q1') {
        if (pub.quartile !== 'Q1') return false;
      } else if (selectedType === 'IEEE_ACM') {
        const v = pub.venue_name.toLowerCase();
        if (!v.includes('ieee') && !v.includes('acm')) return false;
      } else if (selectedType === 'CONFERENCES') {
        if (pub.publication_type !== 'CONFERENCE') return false;
      } else if (selectedType === 'BOOK_CHAPTERS') {
        if (pub.publication_type !== 'BOOK_CHAPTER' && pub.publication_type !== 'BOOK') return false;
      }

      // 3. Featured Toggle
      if (featuredOnly && !pub.is_featured) {
        return false;
      }

      // 4. Year Filter
      if (selectedYear !== 'ALL') {
        if (selectedYear === 'OLDER') {
          if (pub.year > 2022) return false;
        } else {
          if (pub.year !== parseInt(selectedYear)) return false;
        }
      }

      // 5. Research Area / Topic Filter
      if (selectedResearchAreaFilter) {
        const area = research_areas.find(a => a.slug === selectedResearchAreaFilter);
        if (area) {
          if (pub.research_area !== area.id && !pub.research_area_title?.toLowerCase().includes(area.title.toLowerCase().slice(0, 10))) {
            return false;
          }
        }
      }

      return true;
    });

    // Sorting
    return result.sort((a, b) => {
      if (sortBy === 'NEWEST') {
        return b.year - a.year || b.id - a.id;
      } else if (sortBy === 'CITATIONS') {
        return b.citation_count - a.citation_count;
      } else if (sortBy === 'IMPACT_FACTOR') {
        const ifA = parseFloat(a.impact_factor || '0');
        const ifB = parseFloat(b.impact_factor || '0');
        return ifB - ifA;
      }
      return 0;
    });
  }, [
    publications,
    searchQuery,
    selectedType,
    featuredOnly,
    selectedYear,
    sortBy,
    selectedResearchAreaFilter,
    research_areas,
  ]);

  // Export filtered papers to a single .bib file
  const handleExportBibtex = () => {
    const bibStrings = filteredPublications.map(p => {
      if (p.bibtex_raw && p.bibtex_raw.trim()) return p.bibtex_raw.trim();
      const key = `ahmad${p.year}${p.title.slice(0, 10).replace(/[^a-zA-Z0-9]/g, '').toLowerCase()}`;
      return `@article{${key},
  title = {${p.title}},
  author = {${p.authors}},
  journal = {${p.venue_name}},
  year = {${p.year}},
  volume = {${p.volume_issue_pages || ''}},
  doi = {${p.doi || ''}}
}`;
    });

    const fileContent = `% BibTeX Export from Dr. Musheer Ahmad Research Lab
% Jamia Millia Islamia • Total Papers: ${filteredPublications.length}
% Exported on ${new Date().toISOString()}

${bibStrings.join('\n\n')}`;

    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dr_musheer_ahmad_publications_${filteredPublications.length}.bib`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Smart Author List Auto-Highlighter
  const renderHighlightedAuthors = (authorsStr: string) => {
    const parts = authorsStr.split(/(Musheer Ahmad|M\. Ahmad)/g);
    return (
      <span>
        {parts.map((part, i) =>
          part === 'Musheer Ahmad' || part === 'M. Ahmad' ? (
            <span
              key={i}
              className="font-bold text-zinc-950 dark:text-white px-1 py-0.5 rounded bg-amber-100/70 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200"
            >
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </span>
    );
  };

  return (
    <section id="publications" className="py-16 lg:py-24 bg-white dark:bg-academic-midnight text-left border-b border-zinc-200/60 dark:border-zinc-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 mb-2 border border-amber-200 dark:border-amber-800/60">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Flagship Publications Engine</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Peer-Reviewed Publications
            </h2>
            <p className="mt-2 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-3xl">
              Discover Dr. Musheer Ahmad's peer-reviewed journals, IEEE/ACM Transactions, Elsevier non-linear ciphers, and conference proceedings.
            </p>
          </div>

          {/* Export BibTeX Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleExportBibtex}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-bold transition-all border border-zinc-200 dark:border-zinc-700 shadow-2xs"
            >
              <Download className="w-4 h-4 text-academic-amber" />
              <span>Export Filtered BibTeX (.bib)</span>
            </button>
          </div>
        </div>

        {/* TOP BIBLIOMETRIC SUMMARY BAR */}
        <div className="mb-6 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200/80 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-zinc-700 dark:text-zinc-300">
              Showing <strong className="font-bold text-zinc-950 dark:text-white">{filteredPublications.length}</strong> of {publications.length} Selected Articles
            </span>
            {activeTopic && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 font-medium">
                <span>Topic: {activeTopic.title}</span>
                <button
                  onClick={() => setSelectedResearchAreaFilter(null)}
                  className="hover:text-red-500"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 text-zinc-500 dark:text-zinc-400 font-medium">
            <span>Verify Citations:</span>
            <a
              href={site_config.google_scholar_url}
              target="_blank"
              rel="noreferrer"
              className="text-academic-cobalt dark:text-cyan-400 font-bold hover:underline inline-flex items-center gap-1"
            >
              Google Scholar <ExternalLink className="w-3 h-3" />
            </a>
            <span>•</span>
            <a
              href={site_config.scopus_url}
              target="_blank"
              rel="noreferrer"
              className="hover:text-zinc-800 dark:hover:text-white inline-flex items-center gap-1"
            >
              Scopus <ExternalLink className="w-3 h-3" />
            </a>
            <span>•</span>
            <a
              href={site_config.orcid_url}
              target="_blank"
              rel="noreferrer"
              className="text-emerald-600 font-bold hover:underline inline-flex items-center gap-1"
            >
              ORCID <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* MULTI-DIMENSIONAL FILTER CONTROLS */}
        <div className="mb-8 space-y-4">
          
          {/* Row 1: Search Input + Sort Dropdown */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full flex-grow">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Instant search across titles, co-authors, journals, DOIs, and abstracts..."
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-academic-cobalt"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
              <span className="text-xs font-semibold text-zinc-500">Sort:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="text-xs px-3 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 font-semibold focus:outline-none"
              >
                <option value="NEWEST">Newest First</option>
                <option value="CITATIONS">Most Cited First</option>
                <option value="IMPACT_FACTOR">Highest Impact Factor</option>
              </select>
            </div>
          </div>

          {/* Row 2: Publication Type Tabs + Featured Flag Toggle */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: 'ALL', label: 'All Venues' },
                { id: 'Q1', label: 'SCI Q1 Journals' },
                { id: 'IEEE_ACM', label: 'IEEE & ACM' },
                { id: 'CONFERENCES', label: 'Conferences' },
                { id: 'BOOK_CHAPTERS', label: 'Book Chapters' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedType(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedType === tab.id
                      ? 'bg-academic-obsidian text-white dark:bg-white dark:text-zinc-900 shadow-2xs'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Star Featured Toggle */}
            <button
              onClick={() => setFeaturedOnly(!featuredOnly)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                featuredOnly
                  ? 'bg-amber-50 dark:bg-amber-950/80 border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-200'
                  : 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400'
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${featuredOnly ? 'fill-amber-400 text-amber-500' : 'text-zinc-400'}`} />
              <span>Flagship Papers Only</span>
            </button>
          </div>

          {/* Row 3: Year Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] font-mono uppercase font-bold text-zinc-400 mr-1">
              Year:
            </span>
            <button
              onClick={() => setSelectedYear('ALL')}
              className={`px-2.5 py-1 rounded-md text-xs font-mono font-semibold transition-all ${
                selectedYear === 'ALL'
                  ? 'bg-academic-cobalt text-white shadow-2xs'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200'
              }`}
            >
              All
            </button>
            {availableYears.map(yr => (
              <button
                key={yr}
                onClick={() => setSelectedYear(yr.toString())}
                className={`px-2.5 py-1 rounded-md text-xs font-mono font-semibold transition-all ${
                  selectedYear === yr.toString()
                    ? 'bg-academic-cobalt text-white shadow-2xs'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200'
                }`}
              >
                {yr}
              </button>
            ))}
            <button
              onClick={() => setSelectedYear('OLDER')}
              className={`px-2.5 py-1 rounded-md text-xs font-mono font-semibold transition-all ${
                selectedYear === 'OLDER'
                  ? 'bg-academic-cobalt text-white shadow-2xs'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200'
              }`}
            >
              ≤ 2022
            </button>
          </div>

        </div>

        {/* PUBLICATIONS CARDS LIST */}
        {filteredPublications.length > 0 ? (
          <div className="space-y-5">
            {filteredPublications.map(pub => {
              const isExpanded = !!expandedAbstracts[pub.id];

              return (
                <article
                  key={pub.id}
                  className="bg-white dark:bg-academic-cardDark rounded-2xl p-6 border border-zinc-200/90 dark:border-zinc-800 shadow-xs hover:border-academic-cobalt/40 dark:hover:border-cyan-400/40 hover:shadow-md transition-all text-left"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    
                    {/* Main Paper Content */}
                    <div className="space-y-2.5 max-w-4xl">
                      
                      {/* High-Trust Metadata Header */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700">
                          {pub.year}
                        </span>

                        {pub.quartile === 'Q1' && (
                          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                            SCI Q1
                          </span>
                        )}

                        {pub.impact_factor && (
                          <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60">
                            IF: {pub.impact_factor}
                          </span>
                        )}

                        {pub.is_featured && (
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-purple-50 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border border-purple-200 dark:border-purple-800 flex items-center gap-1">
                            <Star className="w-3 h-3 fill-purple-500 text-purple-600" />
                            Flagship Paper
                          </span>
                        )}

                        {pub.citation_count > 0 && (
                          <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                            <Quote className="w-3 h-3 text-academic-amber" />
                            {pub.citation_count} citations
                          </span>
                        )}
                      </div>

                      {/* Paper Title */}
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-zinc-950 dark:text-white leading-snug">
                        {pub.doi ? (
                          <a
                            href={`https://doi.org/${pub.doi}`}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-academic-cobalt dark:hover:text-cyan-400 transition-colors"
                          >
                            {pub.title}
                          </a>
                        ) : (
                          pub.title
                        )}
                      </h3>

                      {/* Authors List with Musheer Ahmad Highlight */}
                      <div className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                        {renderHighlightedAuthors(pub.authors)}
                      </div>

                      {/* Venue, Volume, and Research Area */}
                      <div className="flex flex-wrap items-center gap-2 text-xs text-academic-cobalt dark:text-cyan-400 font-semibold italic">
                        <span>{pub.venue_name}</span>
                        {pub.volume_issue_pages && <span>• {pub.volume_issue_pages}</span>}
                        {pub.research_area_title && (
                          <span className="not-italic text-[11px] font-normal text-zinc-500 dark:text-zinc-400">
                            [{pub.research_area_title}]
                          </span>
                        )}
                      </div>

                      {/* Accordion Abstract Block */}
                      {pub.abstract && isExpanded && (
                        <div className="pt-2 animate-in fade-in duration-200">
                          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans">
                            <strong className="block font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                              Abstract:
                            </strong>
                            {pub.abstract}
                          </div>
                        </div>
                      )}

                    </div>

                    {/* Right Action Bar */}
                    <div className="flex lg:flex-col items-center lg:items-end gap-2 shrink-0 pt-2 lg:pt-0">
                      
                      {/* Cite Studio Trigger */}
                      <button
                        onClick={() => setActiveCitationPub(pub)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-xs font-bold text-zinc-800 dark:text-zinc-200 transition-colors border border-zinc-200 dark:border-zinc-700"
                        title="Open Citation Studio (BibTeX / APA / IEEE)"
                      >
                        <Quote className="w-3.5 h-3.5 text-academic-amber" />
                        <span>Cite Paper</span>
                      </button>

                      {/* DOI Link */}
                      {pub.doi && (
                        <a
                          href={`https://doi.org/${pub.doi}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-xs font-semibold text-zinc-700 dark:text-zinc-300 transition-colors"
                        >
                          <span>DOI</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}

                      {/* PDF / Preprint link */}
                      {(pub.pdf_upload || pub.pdf_url) && (
                        <a
                          href={pub.pdf_upload || pub.pdf_url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-xs font-semibold text-zinc-700 dark:text-zinc-300 transition-colors"
                        >
                          <FileText className="w-3 h-3 text-red-500" />
                          <span>PDF</span>
                        </a>
                      )}

                      {/* Code / Repository link */}
                      {pub.code_url && (
                        <a
                          href={pub.code_url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-xs font-semibold text-zinc-700 dark:text-zinc-300 transition-colors"
                        >
                          <Code className="w-3 h-3 text-emerald-500" />
                          <span>Code</span>
                        </a>
                      )}

                      {/* Abstract Toggle Accordion Button */}
                      {pub.abstract && (
                        <button
                          onClick={() => toggleAbstract(pub.id)}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-zinc-500 hover:text-academic-cobalt dark:hover:text-cyan-400 mt-1"
                        >
                          <span>{isExpanded ? 'Hide Abstract' : 'Abstract'}</span>
                          {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                        </button>
                      )}

                    </div>

                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="py-16 text-center bg-zinc-50 dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800">
            <BookOpen className="w-8 h-8 text-zinc-400 mx-auto mb-2" />
            <h3 className="font-bold text-base text-zinc-800 dark:text-zinc-200">
              No publications match the current filters
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Try adjusting your search query, year pills, or publication venue filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedType('ALL');
                setFeaturedOnly(false);
                setSelectedYear('ALL');
                setSelectedResearchAreaFilter(null);
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-academic-cobalt text-white text-xs font-bold"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
