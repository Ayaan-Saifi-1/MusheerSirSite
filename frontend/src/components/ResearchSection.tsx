import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ResearchArea, Publication } from '../types/portfolio';
import {
  Lock,
  Cpu,
  ShieldAlert,
  Brain,
  Layers,
  ArrowRight,
  BookOpen,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  ExternalLink,
  Quote,
} from 'lucide-react';

export const ResearchSection: React.FC = () => {
  const { data, setSelectedResearchAreaFilter, setActiveCitationPub } = usePortfolio();
  const { research_areas, publications } = data;

  const [selectedArea, setSelectedArea] = useState<ResearchArea>(
    research_areas[0] || {
      id: 1,
      title: 'Chaos-Based Cryptography & S-Box Synthesis',
      slug: 'chaos-cryptography',
      short_description: '',
      detailed_methodology: '',
      icon_name: 'Lock',
      accent_color: '#2563EB',
      keywords_csv: '',
      display_order: 1,
      is_active: true,
    }
  );

  const getIcon = (name: string, className = "w-5 h-5") => {
    switch (name?.toLowerCase()) {
      case 'lock':
        return <Lock className={className} />;
      case 'cpu':
        return <Cpu className={className} />;
      case 'shieldalert':
        return <ShieldAlert className={className} />;
      case 'brain':
        return <Brain className={className} />;
      default:
        return <Layers className={className} />;
    }
  };

  // Find representative publications for the selected thrust
  const areaPublications = publications.filter(
    p => p.research_area === selectedArea.id || p.research_area_title?.toLowerCase().includes(selectedArea.title.toLowerCase().slice(0, 10))
  );

  const handleFilterToPublications = (slug: string) => {
    setSelectedResearchAreaFilter(slug);
    const pubElem = document.getElementById('publications');
    if (pubElem) {
      pubElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="research" className="py-16 lg:py-24 bg-white dark:bg-academic-midnight text-left border-b border-zinc-200/60 dark:border-zinc-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 mb-2 border border-blue-200 dark:border-blue-800/60">
            <Layers className="w-3.5 h-3.5" />
            <span>Research Pillars & Methodologies</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Core Research Thrusts & Foundations
          </h2>
          <p className="mt-2 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-3xl">
            Under Dr. Musheer Ahmad's supervision, the Cryptography & Multimedia Security Lab at Jamia Millia Islamia investigates foundational mathematical problems and applied hardware architectures.
          </p>
        </div>

        {/* 2-Column Deep-Dive Interactive Split View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Interactive Pillar Selector Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2">
              Select Research Domain
            </div>

            {research_areas.map((area) => {
              const isSelected = selectedArea.id === area.id;
              const pubCount = publications.filter(
                p => p.research_area === area.id || p.research_area_title?.toLowerCase().includes(area.title.toLowerCase().slice(0, 10))
              ).length;

              return (
                <div
                  key={area.id}
                  onClick={() => setSelectedArea(area)}
                  className={`p-5 rounded-2xl cursor-pointer transition-all border text-left ${
                    isSelected
                      ? 'bg-zinc-50 dark:bg-zinc-800/90 border-academic-cobalt dark:border-cyan-400 shadow-md translate-x-1'
                      : 'bg-white dark:bg-academic-cardDark border-zinc-200/80 dark:border-zinc-800/80 hover:bg-zinc-50/60 dark:hover:bg-zinc-800/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-xs"
                        style={{ backgroundColor: area.accent_color || '#2563EB' }}
                      >
                        {getIcon(area.icon_name, "w-4 h-4")}
                      </div>
                      <span className="font-mono text-xs font-bold text-zinc-500 dark:text-zinc-400">
                        Pillar 0{area.display_order}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-700/60 text-zinc-600 dark:text-zinc-300 font-semibold">
                      {pubCount > 0 ? `${pubCount} papers` : 'Core Thrust'}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-zinc-900 dark:text-white mb-1.5 flex items-center justify-between">
                    <span>{area.title}</span>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        isSelected ? 'rotate-90 text-academic-cobalt dark:text-cyan-400' : 'text-zinc-400'
                      }`}
                    />
                  </h3>

                  <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                    {area.short_description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* RIGHT: Expandable Deep-Dive Showcase (7 cols) */}
          <div className="lg:col-span-7 bg-zinc-50/80 dark:bg-academic-cardDark rounded-3xl p-6 sm:p-8 border border-zinc-200/90 dark:border-zinc-800 shadow-sm space-y-6">
            
            {/* Header of selected pillar */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: selectedArea.accent_color || '#2563EB' }}
                  />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
                    Detailed Methodology & Scope
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-zinc-900 dark:text-white">
                  {selectedArea.title}
                </h3>
              </div>

              <button
                onClick={() => handleFilterToPublications(selectedArea.slug)}
                className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-academic-cobalt hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors"
                title="Filter All Publications by this Topic"
              >
                <span>Filter Papers ↓</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Overview / Problem Statement */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Problem Statement & Research Objective
              </h4>
              <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                {selectedArea.short_description}
              </p>
            </div>

            {/* Technical Methodology */}
            {selectedArea.detailed_methodology && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Mathematical & Algorithmic Approach
                </h4>
                <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans">
                  {selectedArea.detailed_methodology}
                </div>
              </div>
            )}

            {/* Keyword Pills */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Key Primitives & Research Descriptors
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedArea.keywords_csv.split(',').map((kw, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 shadow-2xs"
                  >
                    {kw.trim()}
                  </span>
                ))}
              </div>
            </div>

            {/* Representative Publications in this Thrust */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Representative Publications in this Thrust ({areaPublications.length})
                </h4>
                <button
                  onClick={() => handleFilterToPublications(selectedArea.slug)}
                  className="text-xs font-semibold text-academic-cobalt dark:text-cyan-400 hover:underline"
                >
                  View full list in Publications Explorer &rarr;
                </button>
              </div>

              {areaPublications.length > 0 ? (
                <div className="space-y-2.5">
                  {areaPublications.slice(0, 3).map((pub) => (
                    <div
                      key={pub.id}
                      className="p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800 hover:border-academic-cobalt/50 dark:hover:border-cyan-400/50 transition-colors"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                          {pub.year} • {pub.quartile}
                        </span>
                        {pub.impact_factor && (
                          <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 font-bold">
                            IF: {pub.impact_factor}
                          </span>
                        )}
                      </div>
                      <div className="text-xs font-bold text-zinc-900 dark:text-white line-clamp-2">
                        {pub.title}
                      </div>
                      <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 flex items-center justify-between">
                        <span className="italic">{pub.venue_name}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveCitationPub(pub);
                          }}
                          className="font-medium text-academic-cobalt dark:text-cyan-400 hover:underline"
                        >
                          Cite (BibTeX)
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-zinc-400 italic">
                  Explore full catalogue in the Publications section below.
                </p>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
