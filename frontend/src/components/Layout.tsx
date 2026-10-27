import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { NavigationItem, SiteSettings } from '../lib/types';
import {
  GoogleScholarLogo,
  ScopusLogo,
  OrcidLogo,
  ResearchGateLogo,
  UniversityLogo,
} from './ScholarlyLogos';
import {
  Mail,
  MapPin,
  Building2,
  ExternalLink,
  Menu,
  X,
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  settings?: SiteSettings | null;
  navigation?: NavigationItem[];
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  settings,
  navigation,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const location = useLocation();

  // Sticky header: hides on scroll down, reappears on scroll up
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 120 && currentScrollY > lastScrollY && !mobileMenuOpen) {
        setHeaderHidden(true);
      } else {
        setHeaderHidden(false);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const defaultNavLinks = [
    { title: 'Research', path: '/research' },
    { title: 'Publications', path: '/publications' },
    { title: 'Leadership & Service', path: '/service' },
    { title: 'Group', path: '/group' },
    { title: 'Teaching', path: '/teaching' },
    { title: 'News', path: '/news' },
    { title: 'Join', path: '/join' },
    { title: 'Contact', path: '/contact' },
  ];

  const navLinks = (navigation && navigation.length > 0)
    ? navigation.map((n) => ({ title: n.title, path: n.path }))
    : defaultNavLinks;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Accessibility Skip Link */}
      <a
        href="#main-content"
        style={{
          position: 'absolute',
          top: '-9999px',
          left: '1rem',
          background: 'var(--accent-sage-dark)',
          color: '#FFFFFF',
          padding: '0.5rem 1rem',
          zIndex: 100,
          textDecoration: 'none',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8125rem',
        }}
        onFocus={(e) => {
          e.currentTarget.style.top = '1rem';
        }}
        onBlur={(e) => {
          e.currentTarget.style.top = '-9999px';
        }}
      >
        Skip to main content
      </a>

      {/* Quiet Announcement Banner (Only rendered when activated by professor in CMS) */}
      {settings?.announcement_banner_active && settings?.announcement_banner_text && (
        <aside
          style={{
            background: 'var(--text-primary)',
            color: 'var(--bg-primary)',
            padding: '0.45rem 1.25rem',
            textAlign: 'center',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            letterSpacing: '0.02em',
            borderBottom: '1px solid var(--border-hairline)',
          }}
          aria-label="Academic Announcement"
        >
          {settings.announcement_banner_link ? (
            <a
              href={settings.announcement_banner_link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'inherit', textDecoration: 'underline' }}
            >
              {settings.announcement_banner_text} &rarr;
            </a>
          ) : (
            <span>{settings.announcement_banner_text}</span>
          )}
        </aside>
      )}

      {/* Sticky Editorial Header */}
      <header
        className={`site-header ${headerHidden ? 'site-header--hidden' : ''}`}
        role="banner"
      >
        <div className="container">
          <div className="site-header__inner">
            <Link to="/" className="site-header__brand">
              {settings?.professor_name || 'Dr. Musheer Ahmad'}
            </Link>

            {/* Desktop Navigation */}
            <nav className="site-header__nav" aria-label="Main Navigation">
              {navLinks.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `site-header__link ${isActive ? 'active' : ''}`
                  }
                >
                  {item.title}
                </NavLink>
              ))}

              {/* CV Secondary Link */}
              <NavLink
                to="/cv"
                className={({ isActive }) =>
                  `site-header__link ${isActive ? 'active' : ''}`
                }
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8125rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                CV
              </NavLink>
            </nav>

            {/* Mobile Menu Toggle (Professional icon button, strictly hidden on desktop) */}
            <button
              type="button"
              className="mobile-menu-toggle"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={15} /> : <Menu size={15} />}
              <span>{mobileMenuOpen ? 'Close' : 'Menu'}</span>
            </button>
          </div>

          {/* Mobile Text Menu */}
          {mobileMenuOpen && (
            <div className="mobile-menu" role="dialog" aria-modal="true">
              {navLinks.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className="site-header__link"
                  style={{ fontSize: '1.1rem', padding: '0.35rem 0' }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.title}
                </NavLink>
              ))}
              <NavLink
                to="/cv"
                className="site-header__link"
                style={{
                  fontSize: '1.1rem',
                  padding: '0.35rem 0',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.05em',
                }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Curriculum Vitae (CV)
              </NavLink>
            </div>
          )}
        </div>
      </header>

      {/* Main Page Content */}
      <main id="main-content" style={{ flex: 1 }}>
        {children}
      </main>

      {/* Editorial Footer */}
      <footer className="site-footer" role="contentinfo">
        <div className="container">
          <div className="site-footer__grid">
            {/* Identity & Institutional Affiliation */}
            <div>
              <div className="site-footer__heading">Institutional Affiliation</div>
              <p style={{ fontWeight: 500, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                {settings?.professor_name || 'Dr. Musheer Ahmad'}
              </p>
              <p style={{ marginBottom: '0.25rem' }}>
                {settings?.title || 'Associate Professor'}
              </p>
              <p style={{ marginBottom: '0.25rem' }}>
                {settings?.department || 'Department of Computer Engineering, Faculty of Engineering & Technology'}
              </p>
              <p style={{ marginBottom: '0.75rem' }}>
                {settings?.university || 'Jamia Millia Islamia (A Central University), New Delhi 110025, India'}
              </p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <Mail size={13} color="var(--accent-sage-dark)" />
                <span>Correspondence:</span>
                <a
                  href={`mailto:${settings?.email_primary || 'mahmad9@jmi.ac.in'}`}
                  className="text-link"
                >
                  {settings?.email_primary || 'mahmad9@jmi.ac.in'}
                </a>
              </p>
            </div>

            {/* Sitemap Navigation */}
            <div>
              <div className="site-footer__heading">Navigation</div>
              <ul className="site-footer__list">
                {navLinks.map((item) => (
                  <li key={item.path}>
                    <Link to={item.path} className="text-link text-link--muted">
                      {item.title}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link to="/cv" className="text-link text-link--muted">
                    Curriculum Vitae
                  </Link>
                </li>
              </ul>
            </div>

            {/* Verified Academic Profiles */}
            <div>
              <div className="site-footer__heading">Scholarly Profiles</div>
              <ul className="site-footer__list">
                {settings?.google_scholar_url && (
                  <li>
                    <a
                      href={settings.google_scholar_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link text-link--muted"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                      <GoogleScholarLogo size={14} color="#75A06A" />
                      <span>Google Scholar</span>
                    </a>
                  </li>
                )}
                {settings?.orcid_url && (
                  <li>
                    <a
                      href={settings.orcid_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link text-link--muted"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                      <OrcidLogo size={14} />
                      <span>ORCID iD</span>
                    </a>
                  </li>
                )}
                {settings?.scopus_url && (
                  <li>
                    <a
                      href={settings.scopus_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link text-link--muted"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                      <ScopusLogo size={14} color="#75A06A" />
                      <span>Scopus</span>
                    </a>
                  </li>
                )}
                {settings?.researchgate_url && (
                  <li>
                    <a
                      href={settings.researchgate_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link text-link--muted"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                      <ResearchGateLogo size={14} color="#75A06A" />
                      <span>ResearchGate</span>
                    </a>
                  </li>
                )}
                {settings?.linkedin_url && (
                  <li>
                    <a
                      href={settings.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link text-link--muted"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                      <ExternalLink size={13} color="var(--accent-sage-dark)" />
                      <span>LinkedIn</span>
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>

          <div
            style={{
              marginTop: '3.5rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid var(--border-hairline)',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-muted)',
              gap: '1rem',
            }}
          >
            <div>
              {settings?.footer_text || 'Department of Computer Engineering, Faculty of Engineering & Technology, Jamia Millia Islamia'}
            </div>
            <div>
              Editorial Academic System &bull; Dr. Musheer Ahmad
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
