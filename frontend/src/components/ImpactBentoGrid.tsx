import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  Quote,
  TrendingUp,
  Award,
  BookOpen,
  ShieldCheck,
  Users,
  Zap,
  ArrowUpRight,
  Calendar,
  Lock,
  Cpu,
  ShieldAlert,
  Brain,
  Layers,
  Sparkles,
} from 'lucide-react';

export const ImpactBentoGrid: React.FC = () => {
  const { data } = usePortfolio();
  const { impact_metrics, research_areas, news_items } = data;

  // Icon mapping helper
  const getIcon = (name: string, className = "w-5 h-5") => {
    switch (name?.toLowerCase()) {
      case 'quote':
        return <Quote className={className} />;
      case 'trendingup':
        return <TrendingUp className={className} />;
      case 'award':
        return <Award className={className} />;
      case 'bookopen':
        return <BookOpen className={className} />;
      case 'shieldcheck':
        return <ShieldCheck className={className} />;
      case 'users':
        return <Users className={className} />;
      case 'lock':
        return <Lock className={className} />;
      case 'cpu':
        return <Cpu className={className} />;
      case 'shieldalert':
        return <ShieldAlert className={className} />;
      case 'brain':
        return <Brain className={className} />;
      default:
        return <Zap className={className} />;
    }
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case 'PAPER':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800';
      case 'AWARD':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border-amber-300 dark:border-amber-800';
      case 'TALK':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 border-blue-300 dark:border-blue-800';
      case 'GRANT':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300 border-purple-300 dark:border-purple-800';
      case 'OPENING':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 border-rose-300 dark:border-rose-800';
      default:
        return 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700';
    }
  };

  return (
    <section id="impact" className="py-16 lg:py-24 bg-zinc-50/50 dark:bg-zinc-950/40 border-y border-zinc-200/60 dark:border-zinc-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 text-left">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 text-academic-cobalt dark:text-cyan-400 mb-2 border border-zinc-200 dark:border-zinc-700">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Scientific Rigor & Authority</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Research Impact & Lab Pulse
            </h2>
            <p className="mt-2 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl">
              Verified bibliometric achievements, core technological research pillars, and real-time milestones from the Cryptography & Multimedia Security Group.
            </p>
          </div>
          <a
            href="https://scholar.google.com/citations?user=cPbmjWoAAAAJ&hl=en"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-academic-cobalt dark:text-cyan-400 hover:underline shrink-0"
          >
            <span>Verified on Google Scholar</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* 12-Column Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-5 text-left">

          {/* ITEM 1: Citations & Hirsch Metrics (Large Bento Block, 8 cols) */}
          <div className="md:col-span-6 lg:col-span-8 bg-white dark:bg-academic-cardDark rounded-3xl p-6 sm:p-8 border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-academic-amber flex items-center justify-center font-bold">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-zinc-900 dark:text-white">
                    Bibliometric Authority Index
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Stanford / Elsevier Global Top 2% Scientist Metrics
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-semibold">
                Updated 2026
              </span>
            </div>

            {/* Metrics Subgrid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {impact_metrics.map((metric) => (
                <div
                  key={metric.id}
                  className="p-4 rounded-2xl bg-zinc-50/80 dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-800/80 hover:border-academic-amber/50 dark:hover:border-amber-400/30 transition-colors group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 truncate">
                      {metric.label}
                    </span>
                    <span className="text-zinc-400 group-hover:text-academic-amber transition-colors">
                      {getIcon(metric.icon_name, "w-4 h-4")}
                    </span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono text-zinc-900 dark:text-white tracking-tight">
                    {metric.value}
                  </div>
                  {metric.change_or_subtext && (
                    <div className="text-[11px] font-medium text-academic-cobalt dark:text-cyan-400 mt-1 truncate">
                      {metric.change_or_subtext}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ITEM 2: Live Lab Milestones & News Feed (4 cols) */}
          <div className="md:col-span-6 lg:col-span-4 bg-white dark:bg-academic-cardDark rounded-3xl p-6 sm:p-8 border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-academic-amber opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-academic-amber"></span>
                  </span>
                  <h3 className="font-bold text-base text-zinc-900 dark:text-white">
                    Lab News & Milestones
                  </h3>
                </div>
                <span className="text-[11px] font-semibold text-zinc-400">
                  Live Feed
                </span>
              </div>

              {/* News Items List */}
              <div className="space-y-4">
                {news_items.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-800 hover:bg-zinc-100/80 dark:hover:bg-zinc-800/60 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getCategoryBadgeColor(item.category)}`}>
                        {item.category_display || item.category}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {item.date}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100 line-clamp-2">
                      {item.title}
                    </div>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2">
                      {item.summary}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 mt-4">
              <a
                href="#news"
                className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-bold text-academic-cobalt dark:text-cyan-400 hover:underline"
              >
                <span>View All Lab Announcements</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* ITEM 3: Core Research Thrusts Preview (Full 12 cols across 4 responsive cards) */}
          <div id="research" className="lg:col-span-12 mt-4">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-2xl font-bold text-zinc-900 dark:text-white">
                  Core Research Pillars & Focus Areas
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Targeted scientific disciplines under Dr. Musheer Ahmad's supervision at JMI
                </p>
              </div>
              <a
                href="#publications"
                className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-academic-cobalt dark:text-cyan-400 hover:underline"
              >
                <span>Explore Papers by Area</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {research_areas.map((area) => (
                <div
                  key={area.id}
                  className="bg-white dark:bg-academic-cardDark rounded-2xl p-6 border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col justify-between group"
                >
                  <div>
                    {/* Pillar Icon & Accent Dot */}
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-xs"
                        style={{ backgroundColor: area.accent_color || '#2563EB' }}
                      >
                        {getIcon(area.icon_name, "w-5 h-5")}
                      </div>
                      <span className="text-[11px] font-mono font-bold text-zinc-400">
                        {area.publication_count ? `${area.publication_count}+ papers` : 'Pillar'}
                      </span>
                    </div>

                    <h4 className="font-bold text-base text-zinc-900 dark:text-white group-hover:text-academic-cobalt dark:group-hover:text-cyan-400 transition-colors mb-2">
                      {area.title}
                    </h4>

                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                      {area.short_description}
                    </p>
                  </div>

                  <div>
                    {/* Keywords pills */}
                    <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-wrap gap-1">
                      {area.keywords_csv.split(',').slice(0, 3).map((kw, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded text-[10px] font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
                        >
                          {kw.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
