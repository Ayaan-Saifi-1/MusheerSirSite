import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  Sun,
  Moon,
  Search,
  ExternalLink,
  Menu,
  X,
  Shield,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { data, theme, toggleTheme, setSearchOpen, isBackendOnline } = usePortfolio();
  const { site_config } = data;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Overview', href: '#overview' },
    { name: 'Research Pillars', href: '#research' },
    { name: 'Impact Bento', href: '#impact' },
    { name: 'Publications', href: '#publications' },
    { name: 'Sponsored Grants', href: '#grants' },
    { name: 'Lab Team', href: '#team' },
    { name: 'Teaching', href: '#teaching' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* 1. Top Recruitment Banner */}
      {site_config?.recruitment_banner_active && (
        <div className="w-full bg-academic-obsidian text-academic-alabaster dark:bg-zinc-950 dark:border-b dark:border-zinc-800 text-xs py-2 px-4 transition-colors">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-center sm:text-left">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-medium tracking-wide">
                {site_config.recruitment_banner_text}
              </span>
            </div>
            <a
              href="#openings"
              className="inline-flex items-center gap-1.5 font-bold text-academic-amber dark:text-amber-400 hover:text-white transition-colors shrink-0"
            >
              <span>Explore Open Positions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}

      {/* 2. Main Glassmorphic Sticky Navbar */}
      <nav
        className={`w-full glass-nav border-b transition-all duration-300 ${
          scrolled
            ? 'border-zinc-200/80 dark:border-zinc-800/80 shadow-md py-3'
            : 'border-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Monogram / Crest */}
          <a href="#overview" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-academic-obsidian dark:bg-zinc-800 border border-zinc-700/50 flex items-center justify-center text-white font-serif text-lg font-bold shadow-sm group-hover:scale-105 transition-transform">
              <span className="text-academic-amber">M</span>A
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50 group-hover:text-academic-cobalt dark:group-hover:text-cyan-400 transition-colors">
                  {site_config?.professor_name || "Dr. Musheer Ahmad"}
                </span>
                <span className="hidden md:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                  Top 2%
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate max-w-[240px] sm:max-w-none">
                Associate Professor • Jamia Millia Islamia
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:text-academic-cobalt dark:hover:text-cyan-400 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right Action Icons & Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Backend Status indicator */}
            <div
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700/60"
              title={isBackendOnline ? "Connected live to Django REST API" : "Serving instant fallback seed data"}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isBackendOnline ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                }`}
              />
              <span>{isBackendOnline ? 'CMS Live' : 'Seed Preview'}</span>
            </div>

            {/* Quick Search Button (Cmd+K) */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 text-xs transition-colors border border-zinc-200 dark:border-zinc-700/60"
              aria-label="Search"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden md:inline font-medium">Search</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded shadow-2xs">
                ⌘K
              </kbd>
            </button>

            {/* Light / Dark Theme Switcher */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors border border-zinc-200 dark:border-zinc-700/60"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4 text-zinc-700" />
              ) : (
                <Sun className="w-4 h-4 text-amber-400" />
              )}
            </button>

            {/* Direct CMS Admin Link */}
            <a
              href="http://127.0.0.1:8000/cms-admin/"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-academic-obsidian text-white dark:bg-zinc-100 dark:text-zinc-900 text-xs font-bold hover:bg-academic-cobalt dark:hover:bg-white transition-all shadow-sm"
            >
              <span>Admin CMS</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              aria-label="Open Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-4 space-y-2 animate-in slide-in-from-top duration-200">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
              <a
                href="http://127.0.0.1:8000/cms-admin/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-academic-obsidian text-white text-xs font-semibold"
              >
                <span>Professor CMS Dashboard</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
