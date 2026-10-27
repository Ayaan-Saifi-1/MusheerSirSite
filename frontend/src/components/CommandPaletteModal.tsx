import React, { useState, useMemo } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Search, X, BookOpen, Layers, Award, School, ExternalLink, ShieldCheck } from 'lucide-react';

export const CommandPaletteModal: React.FC = () => {
  const { searchOpen, setSearchOpen, data } = usePortfolio();
  const [query, setQuery] = useState('');

  const filteredResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();

    const pubs = data.publications
      .filter(p => p.title.toLowerCase().includes(q) || p.authors.toLowerCase().includes(q) || p.venue_name.toLowerCase().includes(q))
      .map(p => ({
        type: 'Publication',
        title: p.title,
        subtitle: `${p.year} • ${p.venue_name}`,
        link: p.doi ? `https://doi.org/${p.doi}` : '#publications',
        badge: p.quartile,
      }));

    const areas = data.research_areas
      .filter(a => a.title.toLowerCase().includes(q) || a.keywords_csv.toLowerCase().includes(q))
      .map(a => ({
        type: 'Research Pillar',
        title: a.title,
        subtitle: a.keywords_csv.split(',').slice(0, 3).join(', '),
        link: '#research',
        badge: 'Thrust',
      }));

    const courses = data.courses
      .filter(c => c.title.toLowerCase().includes(q) || c.code.toLowerCase().includes(q))
      .map(c => ({
        type: 'Course',
        title: `${c.code}: ${c.title}`,
        subtitle: `${c.level_display || c.level} • ${c.semester}`,
        link: '#teaching',
        badge: 'Academics',
      }));

    const news = data.news_items
      .filter(n => n.title.toLowerCase().includes(q) || n.summary.toLowerCase().includes(q))
      .map(n => ({
        type: 'Announcement',
        title: n.title,
        subtitle: n.date,
        link: '#news',
        badge: n.category,
      }));

    return [...pubs, ...areas, ...courses, ...news].slice(0, 8);
  }, [query, data]);

  if (!searchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-academic-obsidian/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-white dark:bg-academic-cardDark border border-academic-borderLight dark:border-academic-borderDark rounded-2xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header / Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-zinc-100 dark:border-zinc-800 gap-3">
          <Search className="w-5 h-5 text-academic-slate dark:text-zinc-400" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search papers, chaotic maps, S-boxes, patents, grants... (ESC to close)"
            className="w-full bg-transparent text-sm focus:outline-none dark:text-zinc-100 placeholder:text-zinc-400"
            autoFocus
          />
          <button
            onClick={() => setSearchOpen(false)}
            className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Body */}
        <div className="p-3 max-h-96 overflow-y-auto">
          {query.trim() === '' ? (
            <div className="py-6 px-4 text-center">
              <p className="text-xs uppercase tracking-wider font-semibold text-zinc-400 mb-3">
                Quick Shortcuts
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <a
                  href="#publications"
                  onClick={() => setSearchOpen(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-academic-cobalt hover:text-white transition-colors"
                >
                  Browse Publications
                </a>
                <a
                  href="#research"
                  onClick={() => setSearchOpen(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-academic-cobalt hover:text-white transition-colors"
                >
                  Research Pillars
                </a>
                <a
                  href="#openings"
                  onClick={() => setSearchOpen(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-academic-cobalt hover:text-white transition-colors"
                >
                  PhD Openings
                </a>
                <a
                  href="http://127.0.0.1:8000/cms-admin/"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 hover:bg-amber-600 hover:text-white transition-colors flex items-center gap-1"
                >
                  CMS Admin Portal <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ) : filteredResults.length > 0 ? (
            <div className="space-y-1">
              {filteredResults.map((item, idx) => (
                <a
                  key={idx}
                  href={item.link}
                  target={item.link.startsWith('http') ? '_blank' : '_self'}
                  rel="noreferrer"
                  onClick={() => setSearchOpen(false)}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors group"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0 text-academic-cobalt dark:text-cyan-400">
                      {item.type === 'Publication' && <BookOpen className="w-4 h-4" />}
                      {item.type === 'Research Pillar' && <Layers className="w-4 h-4" />}
                      {item.type === 'Course' && <School className="w-4 h-4" />}
                      {item.type === 'Announcement' && <Award className="w-4 h-4" />}
                    </div>
                    <div className="truncate">
                      <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate group-hover:text-academic-cobalt dark:group-hover:text-cyan-400">
                        {item.title}
                      </div>
                      <div className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                        {item.subtitle}
                      </div>
                    </div>
                  </div>
                  <span className="shrink-0 ml-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300">
                    {item.badge}
                  </span>
                </a>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
              No matching publications or records found for "{query}".
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400">
          <span>Navigate with arrows or mouse</span>
          <span className="font-mono">ESC to dismiss</span>
        </div>
      </div>
    </div>
  );
};
