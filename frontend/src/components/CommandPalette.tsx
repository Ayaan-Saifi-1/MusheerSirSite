import React, { useState, useEffect, useMemo, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Publication, ResearchArea } from '../types/portfolio';
import {
  Search,
  X,
  BookOpen,
  Layers,
  Banknote,
  School,
  GraduationCap,
  Copy,
  Check,
  ExternalLink,
  Sun,
  Moon,
  ArrowRight,
  Sparkles,
  Command,
} from 'lucide-react';

export const CommandPalette: React.FC = () => {
  const {
    searchOpen,
    setSearchOpen,
    data,
    theme,
    toggleTheme,
    setSelectedResearchAreaFilter,
    setActiveCitationPub,
  } = usePortfolio();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    }
  }, [searchOpen]);

  // Grouped search items
  const searchResults = useMemo(() => {
    const q = query.toLowerCase().trim();

    // 1. Quick Actions
    const quickActions = [
      {
        id: 'action-theme',
        category: 'Quick Actions',
        title: `Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`,
        subtitle: `Currently active: ${theme} theme`,
        icon: theme === 'light' ? Moon : Sun,
        action: () => toggleTheme(),
      },
      {
        id: 'action-openings',
        category: 'Quick Actions',
        title: 'Explore PhD & Postdoc Openings',
        subtitle: 'View eligibility and apply directly to the lab',
        icon: GraduationCap,
        action: () => {
          setSearchOpen(false);
          const el = document.getElementById('openings');
          el?.scrollIntoView({ behavior: 'smooth' });
        },
      },
      {
        id: 'action-scholar',
        category: 'Quick Actions',
        title: 'Open Verified Google Scholar Profile',
        subtitle: '6,850+ citations, h-index: 45',
        icon: ExternalLink,
        action: () => {
          window.open(data.site_config.google_scholar_url, '_blank');
          setSearchOpen(false);
        },
      },
      {
        id: 'action-cms',
        category: 'Quick Actions',
        title: 'Open Django Unfold CMS Admin Portal',
        subtitle: 'Manage papers, BibTeX auto-import, and site settings',
        icon: Command,
        action: () => {
          window.open('http://127.0.0.1:8000/cms-admin/', '_blank');
          setSearchOpen(false);
        },
      },
    ];

    if (!q) {
      return quickActions;
    }

    // Filtered Publications
    const pubs = data.publications
      .filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.authors.toLowerCase().includes(q) ||
        p.venue_name.toLowerCase().includes(q) ||
        p.doi?.toLowerCase().includes(q)
      )
      .slice(0, 5)
      .map(p => ({
        id: `pub-${p.id}`,
        category: 'Publications',
        title: p.title,
        subtitle: `${p.year} • ${p.venue_name} • ${p.quartile}`,
        badge: p.impact_factor ? `IF: ${p.impact_factor}` : p.quartile,
        icon: BookOpen,
        pubData: p,
        action: () => {
          setSearchOpen(false);
          const el = document.getElementById('publications');
          el?.scrollIntoView({ behavior: 'smooth' });
        },
      }));

    // Filtered Research Thrusts
    const areas = data.research_areas
      .filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.short_description.toLowerCase().includes(q) ||
        a.keywords_csv.toLowerCase().includes(q)
      )
      .slice(0, 3)
      .map(a => ({
        id: `area-${a.id}`,
        category: 'Research Thrusts',
        title: a.title,
        subtitle: a.short_description.slice(0, 90) + '...',
        badge: 'Pillar',
        icon: Layers,
        action: () => {
          setSearchOpen(false);
          setSelectedResearchAreaFilter(a.slug);
          const el = document.getElementById('research');
          el?.scrollIntoView({ behavior: 'smooth' });
        },
      }));

    // Filtered Sponsored Projects
    const projects = data.projects
      .filter(pr =>
        pr.title.toLowerCase().includes(q) ||
        pr.funding_agency.toLowerCase().includes(q)
      )
      .slice(0, 2)
      .map(pr => ({
        id: `proj-${pr.id}`,
        category: 'Sponsored Grants',
        title: pr.title,
        subtitle: `${pr.funding_agency} • ${pr.grant_amount}`,
        badge: pr.status,
        icon: Banknote,
        action: () => {
          setSearchOpen(false);
          const el = document.getElementById('grants');
          el?.scrollIntoView({ behavior: 'smooth' });
        },
      }));

    const matchedActions = quickActions.filter(a =>
      a.title.toLowerCase().includes(q) || a.subtitle.toLowerCase().includes(q)
    );

    return [...pubs, ...areas, ...projects, ...matchedActions];
  }, [query, data, theme, toggleTheme, setSearchOpen, setSelectedResearchAreaFilter]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % searchResults.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + searchResults.length) % searchResults.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (searchResults[selectedIndex]) {
        searchResults[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      setSearchOpen(false);
    }
  };

  const handleCopyBibtexFromPalette = (pub: Publication, e: React.MouseEvent) => {
    e.stopPropagation();
    const bib = pub.bibtex_raw || `@article{ahmad${pub.year},\n  title={${pub.title}},\n  author={${pub.authors}},\n  journal={${pub.venue_name}},\n  year={${pub.year}}\n}`;
    navigator.clipboard.writeText(bib);
    setCopiedId(pub.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!searchOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
      onClick={() => setSearchOpen(false)}
    >
      <div
        className="w-full max-w-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl overflow-hidden text-left"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-5 py-4 border-b border-zinc-100 dark:border-zinc-800 gap-3">
          <Search className="w-5 h-5 text-zinc-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a paper title, author, chaotic map, grant, or action..."
            className="w-full bg-transparent text-sm focus:outline-none dark:text-zinc-100 placeholder:text-zinc-400"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-500 rounded border border-zinc-200 dark:border-zinc-700">
            ESC
          </kbd>
        </div>

        {/* Results Body */}
        <div className="p-3 max-h-[420px] overflow-y-auto space-y-1">
          {searchResults.length > 0 ? (
            searchResults.map((item, idx) => {
              const isSelected = selectedIndex === idx;
              const IconComp = item.icon;
              const pub = (item as any).pubData as Publication | undefined;

              return (
                <div
                  key={item.id}
                  onClick={() => item.action()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-2xs'
                      : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                  }`}
                >
                  <div className="flex items-center gap-3.5 overflow-hidden">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-academic-cobalt text-white'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                      }`}
                    >
                      <IconComp className="w-4 h-4" />
                    </div>

                    <div className="truncate">
                      <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400 text-[10px]">
                        {item.category}
                      </div>
                      <div className="text-sm font-bold truncate">
                        {item.title}
                      </div>
                      <div className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                        {item.subtitle}
                      </div>
                    </div>
                  </div>

                  {/* Actions & Badges on the right */}
                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    {pub && (
                      <button
                        onClick={(e) => handleCopyBibtexFromPalette(pub, e)}
                        className="p-1.5 rounded-lg bg-zinc-200/60 dark:bg-zinc-700/60 hover:bg-zinc-300 text-zinc-700 dark:text-zinc-200 text-xs flex items-center gap-1 font-semibold"
                        title="Copy BibTeX directly"
                      >
                        {copiedId === pub.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                        <span className="hidden sm:inline">BibTeX</span>
                      </button>
                    )}

                    {(item as any).badge && (
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300">
                        {(item as any).badge}
                      </span>
                    )}

                    <ArrowRight className="w-3.5 h-3.5 opacity-40" />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center text-zinc-500 dark:text-zinc-400 text-xs">
              No matching scholarly records or actions found for "{query}".
            </div>
          )}
        </div>

        {/* Command Palette Footer */}
        <div className="px-5 py-2.5 bg-zinc-50 dark:bg-zinc-950/60 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
          </div>
          <div className="flex items-center gap-1 font-mono">
            <span>Dr. Musheer Ahmad Lab Command Palette</span>
          </div>
        </div>

      </div>
    </div>
  );
};
