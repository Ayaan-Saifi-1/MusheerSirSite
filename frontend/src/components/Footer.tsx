import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ShieldCheck, Mail, MapPin, ExternalLink, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const { data } = usePortfolio();
  const { site_config } = data;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 pt-16 pb-12 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-zinc-100 dark:border-zinc-800">
          
          {/* Col 1: Bio & Affiliation (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-academic-obsidian dark:bg-zinc-800 text-white font-serif text-base font-bold flex items-center justify-center">
                <span className="text-academic-amber">M</span>A
              </div>
              <span className="font-serif text-xl font-bold text-zinc-900 dark:text-white">
                {site_config.professor_name}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-sm">
              Associate Professor, Department of Computer Engineering, Faculty of Engineering & Technology, Jamia Millia Islamia, New Delhi.
            </p>
            <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
              <MapPin className="w-3.5 h-3.5 text-academic-amber shrink-0" />
              <span>{site_config.office_room || site_config.location}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
              <Mail className="w-3.5 h-3.5 text-academic-cobalt dark:text-cyan-400 shrink-0" />
              <a href={`mailto:${site_config.email_primary}`} className="hover:underline">
                {site_config.email_primary}
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-zinc-500 dark:text-zinc-400">
              <li><a href="#overview" className="hover:text-academic-cobalt dark:hover:text-cyan-400 transition-colors">Overview & Profile</a></li>
              <li><a href="#research" className="hover:text-academic-cobalt dark:hover:text-cyan-400 transition-colors">Research Pillars</a></li>
              <li><a href="#impact" className="hover:text-academic-cobalt dark:hover:text-cyan-400 transition-colors">Impact & Citations</a></li>
              <li><a href="#publications" className="hover:text-academic-cobalt dark:hover:text-cyan-400 transition-colors">Peer-Reviewed Publications</a></li>
              <li><a href="#grants" className="hover:text-academic-cobalt dark:hover:text-cyan-400 transition-colors">Sponsored Grants</a></li>
              <li><a href="#openings" className="hover:text-academic-cobalt dark:hover:text-cyan-400 transition-colors">PhD & Intern Openings</a></li>
            </ul>
          </div>

          {/* Col 3: Academic Profiles & CMS (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
              Scholarly Verification & CMS
            </h4>
            <div className="flex flex-wrap gap-2 pt-1">
              <a
                href={site_config.google_scholar_url}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-xs font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5"
              >
                <span>Google Scholar</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href={site_config.scopus_url}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-xs font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5"
              >
                <span>Scopus Profile</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href={site_config.orcid_url}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-xs font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5"
              >
                <span>ORCID</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="http://127.0.0.1:8000/cms-admin/"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/60 text-xs font-bold text-amber-800 dark:text-amber-300 hover:bg-amber-600 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <span>Django Unfold CMS Admin</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <p className="text-[11px] text-zinc-400 dark:text-zinc-500 pt-2">
              Protected CMS dashboard enables Dr. Musheer Ahmad to edit all metrics, papers, and openings without code changes.
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-400">
          <div>
            &copy; {new Date().getFullYear()} Dr. Musheer Ahmad. Department of Computer Engineering, Jamia Millia Islamia.
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-academic-cobalt dark:hover:text-cyan-400 transition-colors font-medium"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
