import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ChaoticAttractorCanvas } from './ChaoticAttractorCanvas';
import {
  Award,
  BookOpen,
  ArrowRight,
  Download,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Mail,
  MapPin,
  Sparkles,
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { data } = usePortfolio();
  const { site_config, impact_metrics, research_areas } = data;

  const hIndex = impact_metrics.find(m => m.label.toLowerCase().includes('h-index'))?.value || "45";
  const citations = impact_metrics.find(m => m.label.toLowerCase().includes('citation'))?.value || "6,850+";

  return (
    <section id="overview" className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
      {/* Subtle Dot Grid Background */}
      <div className="absolute inset-0 bg-dot-grid opacity-60 pointer-events-none" />

      {/* Ambient Gradient Glows */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-academic-amber/10 dark:bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-academic-cobalt/10 dark:bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Editorial Authority & Academic Executive Bio */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Top Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-300 text-xs font-semibold shadow-xs">
                <Award className="w-3.5 h-3.5 text-academic-amber shrink-0" />
                <span>{site_config.top_2_percent_badge_text}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/60 text-blue-900 dark:text-blue-300 text-xs font-semibold shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-academic-cobalt shrink-0" />
                <span>Jamia Millia Islamia Verified</span>
              </div>
            </div>

            {/* Main Display Headline */}
            <div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-950 dark:text-white leading-[1.08]">
                {site_config.professor_name}
              </h1>
              <p className="mt-2 text-base sm:text-lg font-medium text-academic-cobalt dark:text-cyan-400">
                {site_config.designation} • {site_config.department}
              </p>
              {site_config.secondary_roles && (
                <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mt-1 uppercase tracking-wider">
                  {site_config.secondary_roles}
                </p>
              )}
            </div>

            {/* Tagline & Short Bio */}
            <div className="space-y-3">
              <p className="text-base sm:text-lg font-semibold text-zinc-800 dark:text-zinc-200 italic border-l-2 border-academic-amber pl-3">
                "{site_config.hero_tagline}"
              </p>
              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {site_config.short_bio}
              </p>
            </div>

            {/* Research Pillar Quick Tags */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2">
                Primary Research Thrusts
              </div>
              <div className="flex flex-wrap gap-2">
                {research_areas.slice(0, 4).map((area) => (
                  <a
                    key={area.id}
                    href="#research"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800/90 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 border border-zinc-200/80 dark:border-zinc-700/60 transition-all hover:scale-[1.02]"
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: area.accent_color || '#2563EB' }}
                    />
                    <span>{area.title}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#openings"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-academic-obsidian text-white dark:bg-white dark:text-zinc-950 font-bold text-sm shadow-md hover:bg-academic-cobalt dark:hover:bg-zinc-200 transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                <span>Join Research Group</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#publications"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 font-semibold text-sm text-zinc-800 dark:text-zinc-100 hover:border-academic-cobalt dark:hover:border-cyan-400 transition-all shadow-xs hover:-translate-y-0.5"
              >
                <BookOpen className="w-4 h-4 text-academic-amber" />
                <span>Explore 150+ Publications</span>
              </a>

              <a
                href={site_config.cv_external_url || "#"}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:text-academic-cobalt dark:hover:text-white transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Curriculum Vitae</span>
              </a>
            </div>

            {/* Academic Profiles & Contact Links */}
            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-medium text-zinc-600 dark:text-zinc-400">
              <a
                href={site_config.google_scholar_url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-academic-cobalt dark:hover:text-cyan-400 transition-colors"
              >
                <span className="font-bold text-zinc-900 dark:text-white">Scholar</span>
                <span className="text-[11px] text-zinc-500">({citations} cit.)</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
              <span className="text-zinc-300 dark:text-zinc-700">•</span>
              <a
                href={site_config.orcid_url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-academic-cobalt dark:hover:text-cyan-400 transition-colors"
              >
                <span className="text-emerald-600 font-bold">ORCID</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
              <span className="text-zinc-300 dark:text-zinc-700">•</span>
              <a
                href={site_config.scopus_url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-academic-cobalt dark:hover:text-cyan-400 transition-colors"
              >
                <span>Scopus</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
              <span className="text-zinc-300 dark:text-zinc-700">•</span>
              <a
                href={`mailto:${site_config.email_primary}`}
                className="flex items-center gap-1.5 hover:text-academic-cobalt dark:hover:text-cyan-400 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{site_config.email_primary}</span>
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: Editorial Portrait Frame + Chaotic Attractor + Floating Cards */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* The Main Portrait Container */}
            <div className="relative w-full max-w-[380px] aspect-[4/5] rounded-3xl overflow-hidden border-2 border-zinc-200/90 dark:border-zinc-800 shadow-2xl bg-white dark:bg-academic-cardDark group">
              
              {/* Professor Portrait Photo */}
              <img
                src={site_config.profile_image_url}
                alt={site_config.professor_name}
                className="w-full h-full object-cover object-center filter grayscale-[15%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                onError={(e) => {
                  // Fallback high-res academic avatar
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80";
                }}
              />

              {/* Bottom Subtle Gradient for Text Contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-academic-obsidian/90 via-transparent to-transparent pointer-events-none" />

              {/* Live Chaotic Attractor Canvas Overlay in top-right corner of card */}
              <div className="absolute top-3 right-3 w-28 h-28 rounded-2xl bg-academic-obsidian/75 backdrop-blur-md border border-zinc-700/60 p-1.5 shadow-lg flex flex-col items-center justify-between pointer-events-none">
                <ChaoticAttractorCanvas className="w-full h-20" />
                <span className="text-[9px] font-mono font-bold text-cyan-300 tracking-wider uppercase">
                  Hyperchaotic Map
                </span>
              </div>

              {/* Card Footer inside image */}
              <div className="absolute bottom-4 left-4 right-4 text-left pointer-events-none">
                <div className="text-white font-serif text-lg font-bold">
                  {site_config.professor_name}
                </div>
                <div className="text-xs text-zinc-300 flex items-center gap-1.5 mt-0.5">
                  <MapPin className="w-3 h-3 text-academic-amber shrink-0" />
                  <span>JMI New Delhi, India</span>
                </div>
              </div>
            </div>

            {/* Floating Glassmorphic Credential Card 1 (Bottom Left) */}
            <div className="absolute -bottom-6 -left-4 sm:-left-8 glass-card p-4 rounded-2xl shadow-xl max-w-[210px] text-left border border-white/60 dark:border-zinc-700/80 animate-float-slow">
              <div className="flex items-center gap-2 mb-1">
                <span className="p-1 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </span>
                <span className="text-[11px] font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                  Open Positions
                </span>
              </div>
              <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                {site_config.is_accepting_phd ? "Admitting Ph.D. & Postdoc Scholars (2026)" : "Lab at Full Capacity"}
              </p>
            </div>

            {/* Floating Glassmorphic Credential Card 2 (Top Left / Mid) */}
            <div className="absolute top-12 -left-6 sm:-left-10 glass-card px-4 py-3 rounded-2xl shadow-xl text-left border border-white/60 dark:border-zinc-700/80">
              <div className="text-[10px] font-mono uppercase font-bold text-zinc-500 dark:text-zinc-400">
                Bibliometric Record
              </div>
              <div className="text-base font-bold font-mono text-zinc-900 dark:text-white mt-0.5">
                h-index: <span className="text-academic-cobalt dark:text-cyan-400">{hIndex}</span> • i10: <span className="text-academic-amber">120</span>
              </div>
              <div className="text-[10px] text-zinc-500 dark:text-zinc-400">
                Google Scholar Verified
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
