import React from 'react';
import { Helmet } from 'react-helmet-async';
import { HomePagePayload } from '../lib/types';
import { Section } from '../components/Section';
import { Heading } from '../components/Heading';
import { Button } from '../components/Button';
import { TextLink } from '../components/TextLink';
import { PublicationRow } from '../components/PublicationRow';
import { DateList } from '../components/DateList';
import { Attractor3D } from '../components/Attractor3D';
import {
  GoogleScholarLogo,
  ScopusLogo,
  ResearchGateLogo,
  DblpLogo,
  WebOfScienceLogo,
  UniversityLogo,
} from '../components/ScholarlyLogos';
import {
  FileText,
  TrendingUp,
  Quote,
  Award,
  GraduationCap,
  BookOpen,
  Users,
  Activity,
  Cpu,
  ShieldCheck,
  Lock,
  Binary,
  Terminal,
  ExternalLink,
  ArrowRight,
  MapPin,
  Mail,
  Building2,
} from 'lucide-react';

interface HomePageProps {
  data: HomePagePayload;
}

export const HomePage: React.FC<HomePageProps> = ({ data }) => {
  const {
    settings,
    home,
    research_themes,
    selected_publications,
    honors,
    editorial_roles,
    latest_news,
  } = data;

  const portraitSrc = settings.portrait
    ? settings.portrait.startsWith('http')
      ? settings.portrait
      : `http://127.0.0.1:8000${settings.portrait}`
    : '/portraits/dr_musheer_ahmad.png';

  const cvHref = settings.cv_file
    ? settings.cv_file.startsWith('http')
      ? settings.cv_file
      : `http://127.0.0.1:8000${settings.cv_file}`
    : settings.cv_url || '/cv';

  return (
    <>
      <Helmet>
        <title>{home.seo_title || `${settings.professor_name} — Associate Professor | JMI`}</title>
        <meta
          name="description"
          content={home.seo_description || 'Academic research portfolio of Dr. Musheer Ahmad, Jamia Millia Islamia.'}
        />
        <link rel="canonical" href={window.location.origin} />
      </Helmet>

      {/* Hero Section — 12-Column Balanced Editorial Split (7 / 5) */}
      <section className="editorial-section" style={{ paddingTop: 'clamp(3rem, 6vw, 5.5rem)' }}>
        <div className="container">
          <div className="hero-grid">
            {/* 7 Columns: Identity, Appointment, Statement & Action Coordinates */}
            <div className="hero-text-col">
              <div className="hero-eyebrow">
                <span>{settings.department}</span>
                <span>/</span>
                <span>{settings.university}</span>
              </div>

              <h1 className="hero-title">
                {settings.professor_name}
              </h1>

              <div className="hero-appointment">
                {settings.title} of Computer Engineering
              </div>

              {settings.secondary_roles && (
                <div className="hero-subroles">
                  {settings.secondary_roles}
                </div>
              )}

              <p className="hero-statement">
                {home.hero_statement}
              </p>

              {home.intro_body && (
                <p className="hero-intro">
                  {home.intro_body}
                </p>
              )}

              <div className="hero-actions">
                <Button variant="primary" href="/publications">
                  View Publications ({settings.total_papers || 157})
                </Button>
                <Button variant="secondary" href={cvHref} external>
                  Curriculum Vitae (PDF) &rarr;
                </Button>
              </div>

              {/* Verified Scholar Indexes — Professional Vector Marks */}
              <div className="hero-profiles">
                {settings.google_scholar_url && (
                  <a
                    href={settings.google_scholar_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-profile-chip"
                    title="Google Scholar Citation Index"
                  >
                    <GoogleScholarLogo size={14} color="#75A06A" />
                    <span>Google Scholar</span>
                  </a>
                )}
                {settings.scopus_url && (
                  <a
                    href={settings.scopus_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-profile-chip"
                    title="Scopus Author Profile"
                  >
                    <ScopusLogo size={14} color="#75A06A" />
                    <span>Scopus</span>
                  </a>
                )}
                {settings.researchgate_url && (
                  <a
                    href={settings.researchgate_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-profile-chip"
                    title="ResearchGate Scientific Network"
                  >
                    <ResearchGateLogo size={14} color="#75A06A" />
                    <span>ResearchGate</span>
                  </a>
                )}
                {settings.dblp_url && (
                  <a
                    href={settings.dblp_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-profile-chip"
                    title="DBLP Computer Science Bibliography"
                  >
                    <DblpLogo size={14} color="#75A06A" />
                    <span>DBLP</span>
                  </a>
                )}
                {settings.wos_url && (
                  <a
                    href={settings.wos_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-profile-chip"
                    title="Web of Science ResearcherID"
                  >
                    <WebOfScienceLogo size={14} color="#75A06A" />
                    <span>Web of Science</span>
                  </a>
                )}
                {settings.jmi_profile_url && (
                  <a
                    href={settings.jmi_profile_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-profile-chip"
                    title="Official Jamia Millia Islamia Faculty Directory"
                  >
                    <UniversityLogo size={14} color="#75A06A" />
                    <span>JMI Profile</span>
                  </a>
                )}
              </div>
            </div>

            {/* 5 Columns: Official Faculty Portrait */}
            <div className="hero-portrait-col">
              <div className="hero-portrait-wrap">
                <img
                  src={portraitSrc}
                  alt={settings.portrait_alt || settings.professor_name}
                  className="hero-portrait-img"
                  loading="eager"
                />
                <div className="hero-portrait-meta">
                  <div className="hero-portrait-name">
                    {settings.professor_name}
                  </div>
                  <div className="hero-portrait-affil">
                    Associate Professor • Dept. of Computer Engineering, JMI
                  </div>
                  {settings.office_room && (
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--text-secondary)' }}>
                      Office: {settings.office_room} • {settings.email_primary}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Credential Strip — 4 Full Width Columns */}
          <div className="credential-strip">
            <div className="credential-cell">
              <div className="credential-number" style={{ color: 'var(--palette-c1-charcoal)' }}>
                {settings.total_papers || 157}
              </div>
              <div className="credential-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
                <FileText size={13} strokeWidth={2.2} />
                <span>Peer-Reviewed Papers</span>
              </div>
              <div className="credential-sub">
                58 Journals (SCI/SCIE/Scopus), 57 Conferences
              </div>
            </div>

            <div className="credential-cell">
              <div className="credential-number" style={{ color: 'var(--accent-sage-dark)' }}>
                {settings.h_index || 42}
              </div>
              <div className="credential-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
                <TrendingUp size={13} strokeWidth={2.2} />
                <span>h-Index</span>
              </div>
              <div className="credential-sub">
                Google Scholar: <strong>{settings.h_index || 42}</strong> • Scopus: <strong>{settings.h_index_scopus || 36}</strong>
              </div>
            </div>

            <div className="credential-cell">
              <div className="credential-number" style={{ color: 'var(--palette-c1-charcoal)' }}>
                {(settings.citations_count || 5296).toLocaleString()}
              </div>
              <div className="credential-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
                <Quote size={13} strokeWidth={2.2} />
                <span>Citations</span>
              </div>
              <div className="credential-sub">
                Google Scholar: <strong>{(settings.citations_count || 5296).toLocaleString()}</strong> • Scopus: <strong>{(settings.citations_scopus || 3878).toLocaleString()}</strong>
              </div>
            </div>

            <div className="credential-cell">
              <div className="credential-number" style={{ color: 'var(--accent-sage-dark)' }}>
                Top 2%
              </div>
              <div className="credential-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
                <Award size={13} strokeWidth={2.2} />
                <span>World's Top 2% Scientist</span>
              </div>
              <div className="credential-sub">
                Stanford University & Elsevier (Career-long & Single-year)
              </div>
            </div>
          </div>

          <div className="credential-footer-note">
            * All bibliometric metrics verified against official university curriculum vitae (as of {settings.citations_as_of || 'June 2025'}).
          </div>

          {/* Academic Profile & Career Pillars (from official CV) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2.5rem',
              paddingTop: '2.5rem',
              marginTop: '1.5rem',
              borderTop: '1px solid var(--border-hairline)',
              fontFamily: 'var(--font-sans)',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent-sage-dark)', fontWeight: 600, marginBottom: '0.85rem' }}>
                <GraduationCap size={15} strokeWidth={2.2} />
                <span>Academic Qualifications</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <div style={{ borderLeft: '2px solid var(--accent-sage)', padding: '0.45rem 0.75rem', background: 'rgba(31,31,31,0.018)', borderRadius: '0 8px 8px 0' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)' }}>Ph.D. in Computer Engineering</div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Jamia Millia Islamia, New Delhi</div>
                </div>
                <div style={{ borderLeft: '2px solid var(--border-hairline)', padding: '0.45rem 0.75rem', background: 'rgba(31,31,31,0.012)', borderRadius: '0 8px 8px 0' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)' }}>M.Tech. in Computer Sc. &amp; Engg. (2008)</div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Z.H. College of Engg. &amp; Tech., AMU Aligarh</div>
                </div>
                <div style={{ borderLeft: '2px solid var(--border-hairline)', padding: '0.45rem 0.75rem', background: 'rgba(31,31,31,0.012)', borderRadius: '0 8px 8px 0' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)' }}>B.Tech. in Computer Engineering (2004)</div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Z.H. College of Engg. &amp; Tech., AMU Aligarh</div>
                </div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent-sage-dark)', fontWeight: 600, marginBottom: '0.85rem' }}>
                <BookOpen size={15} strokeWidth={2.2} />
                <span>Teaching Career &amp; Leadership</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <div style={{ borderLeft: '2px solid var(--accent-sage)', padding: '0.45rem 0.75rem', background: 'rgba(31,31,31,0.018)', borderRadius: '0 8px 8px 0' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)' }}>Associate Professor (18 Years Pedagogy)</div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Dept. of Computer Engineering, JMI</div>
                </div>
                <div style={{ borderLeft: '2px solid var(--border-hairline)', padding: '0.45rem 0.75rem', background: 'rgba(31,31,31,0.012)', borderRadius: '0 8px 8px 0' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)' }}>Lecturer / Guest Faculty (2006–2010)</div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Dept. of Computer Engineering, AMU Aligarh</div>
                </div>
                <div style={{ borderLeft: '2px solid var(--border-hairline)', padding: '0.45rem 0.75rem', background: 'rgba(31,31,31,0.012)', borderRadius: '0 8px 8px 0' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)' }}>Project &amp; Programme Leadership</div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>M.Tech Project Coord. (2019–) &bull; CBCS Advisor (2015–)</div>
                </div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent-sage-dark)', fontWeight: 600, marginBottom: '0.85rem' }}>
                <Users size={15} strokeWidth={2.2} />
                <span>Research Supervision</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <div style={{ borderLeft: '2px solid var(--accent-sage)', padding: '0.45rem 0.75rem', background: 'rgba(31,31,31,0.018)', borderRadius: '0 8px 8px 0' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)' }}>6 Ph.D. Scholars Active</div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Under active doctoral supervision in cryptology</div>
                </div>
                <div style={{ borderLeft: '2px solid var(--border-hairline)', padding: '0.45rem 0.75rem', background: 'rgba(31,31,31,0.012)', borderRadius: '0 8px 8px 0' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)' }}>30 M.Tech Theses &amp; Projects</div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>14 dissertations + 16 major projects completed</div>
                </div>
                <div style={{ borderLeft: '2px solid var(--border-hairline)', padding: '0.45rem 0.75rem', background: 'rgba(31,31,31,0.012)', borderRadius: '0 8px 8px 0' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)' }}>40+ B.Tech Engineering Capstones</div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>40+ completed; 2 M.Tech &amp; 3 B.Tech ongoing</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Figure 1: Interactive Contained 3D Chaotic Attractor */}
      <section className="editorial-section">
        <div className="container">
          <header className="section-header">
            <span className="section-eyebrow">Dynamical Systems Foundation</span>
            <h2 className="section-header__title">Nonlinear Chaos in Cryptographic Engineering</h2>
            <p className="section-header__desc">
              Continuous and discrete chaotic flows generate deterministic yet non-periodic phase trajectories
              with acute sensitivity to initial conditions (&lambda; &gt; 0), providing high entropy for cipher keystreams and substitution boxes.
            </p>
          </header>

          <Attractor3D />
        </div>
      </section>

      {/* Research Themes — 2x2 Grid Spanning Full Container */}
      {research_themes && research_themes.length > 0 && (
        <Section
          label="01 / Research Inquiry"
          title="Core Research Pillars"
          description="Theoretical foundations and algorithmic contributions across nonlinear cryptography, multimedia security, and lightweight cyber systems."
          id="research"
        >
          <div className="themes-grid">
            {research_themes.map((theme, index) => {
              const themeIcons = [
                <Lock key="lock" size={20} strokeWidth={1.8} />,
                <Binary key="bin" size={20} strokeWidth={1.8} />,
                <ShieldCheck key="shield" size={20} strokeWidth={1.8} />,
                <Activity key="act" size={20} strokeWidth={1.8} />,
              ];
              const selectedIcon = themeIcons[index % themeIcons.length];

              return (
                <article key={theme.id} className="theme-card">
                  <div className="theme-card-top">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                      <div className="theme-num">
                        0{index + 1}
                      </div>
                      <div style={{ color: 'var(--accent-sage-dark)', opacity: 0.9 }}>
                        {selectedIcon}
                      </div>
                    </div>
                    <h3 className="theme-title">
                      {theme.title}
                    </h3>
                    <p className="theme-summary">
                      {theme.summary}
                    </p>
                  </div>

                  <div className="theme-footer">
                    <span className="theme-count">
                      {theme.paper_count ? `${theme.paper_count} Published Works` : 'Peer-Reviewed Research'}
                    </span>
                    <TextLink href={`/research#${theme.slug}`}>
                      Explore theme &rarr;
                    </TextLink>
                  </div>
                </article>
              );
            })}
          </div>
        </Section>
      )}

      {/* Selected Publications — Full Container Width */}
      {selected_publications && selected_publications.length > 0 && (
        <Section
          label="02 / Selected Works"
          title="Featured Publications"
          description="Representative peer-reviewed papers in high-impact journals (IEEE, Springer, Elsevier) on chaos cryptology, S-box synthesis, and secure multimedia."
          id="publications"
        >
          <div className="pub-list">
            {selected_publications.map((pub) => (
              <PublicationRow key={pub.id} publication={pub} />
            ))}
          </div>

          <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <Button variant="primary" href="/publications">
              View All Publications ({settings.total_papers || 157}) &rarr;
            </Button>
            {settings.cv_file && (
              <Button variant="secondary" href={cvHref} external>
                Complete List in CV &rarr;
              </Button>
            )}
          </div>
        </Section>
      )}

      {/* Recognition Section — Honors & Editorial Roles Split */}
      <Section
        label="03 / Professional Distinction"
        title="Honors, Awards & Editorial Boards"
        description="International scientific recognitions, institutional awards, and editorial leadership across peer-reviewed journals."
        id="honors"
      >
        <div className="recognition-grid">
          {/* Left: Honors & Awards */}
          <div>
            <h3 className="recognition-subheading" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Award size={18} strokeWidth={2} color="var(--accent-sage-dark)" />
              <span>Honors &amp; Scientific Distinctions</span>
            </h3>
            <ul className="recognition-list">
              {honors && honors.length > 0 ? (
                honors.map((honor) => (
                  <li key={honor.id} className="recognition-item">
                    <div className="recognition-year">
                      {honor.year}
                    </div>
                    <div>
                      <div className="recognition-title">
                        {honor.title}
                      </div>
                      <div className="recognition-org">
                        {honor.issuing_organization}
                        {honor.citation && ` — ${honor.citation}`}
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <li className="recognition-item">
                  <div className="recognition-year">2024</div>
                  <div>
                    <div className="recognition-title">World's Top 2% Scientist</div>
                    <div className="recognition-org">Stanford University & Elsevier</div>
                  </div>
                </li>
              )}
            </ul>
          </div>

          {/* Right: Editorial Roles */}
          <div>
            <h3 className="recognition-subheading" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BookOpen size={18} strokeWidth={2} color="var(--accent-sage-dark)" />
              <span>Editorial Board Appointments</span>
            </h3>
            <ul className="recognition-list">
              {editorial_roles && editorial_roles.length > 0 ? (
                editorial_roles.map((role) => (
                  <li key={role.id} className="recognition-item">
                    <div className="recognition-year">
                      {role.years_active || 'Current'}
                    </div>
                    <div>
                      <div className="recognition-title">
                        {role.journal_name}
                      </div>
                      <div className="recognition-org">
                        {role.role_title} {role.publisher && `(${role.publisher})`}
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <li className="recognition-item">
                  <div className="recognition-year">Current</div>
                  <div>
                    <div className="recognition-title">Springer Nature & IGI Global</div>
                    <div className="recognition-org">Editorial Board Member & Guest Editor</div>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </Section>

      {/* Prospective Students Recruitment — Unboxed Editorial Split */}
      {settings.is_accepting_students && (
        <section className="editorial-section" id="join">
          <div className="container">
            <header className="section-header">
              <span className="section-eyebrow">Research Supervision</span>
              <h2 className="section-header__title">
                {settings.student_callout_heading || 'Prospective Researchers & Students'}
              </h2>
            </header>

            <div className="recruitment-grid">
              <div>
                <p className="text-prose" style={{ fontSize: '1.05rem', lineHeight: 1.65, marginTop: 0 }}>
                  {settings.student_callout_text || home.callout_text}
                </p>
                <div style={{ marginTop: '2rem' }}>
                  <Button variant="primary" href="/join">
                    Application Guidelines &rarr;
                  </Button>
                </div>
              </div>

              <div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
                  Candidate Prerequisites
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                    <div style={{ marginTop: '0.15rem', padding: '0.45rem', borderRadius: 'var(--radius-pill)', background: 'rgba(117, 160, 106, 0.12)', color: 'var(--accent-sage-dark)', flexShrink: 0 }}>
                      <Binary size={16} strokeWidth={2.2} />
                    </div>
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                        Mathematical Foundations
                      </strong>
                      <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                        Rigorous understanding of discrete mathematics, linear algebra, modular arithmetic, and continuous/discrete dynamical systems.
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                    <div style={{ marginTop: '0.15rem', padding: '0.45rem', borderRadius: 'var(--radius-pill)', background: 'rgba(117, 160, 106, 0.12)', color: 'var(--accent-sage-dark)', flexShrink: 0 }}>
                      <Terminal size={16} strokeWidth={2.2} />
                    </div>
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                        Implementation Rigor
                      </strong>
                      <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                        Strong computational proficiency in Python, C/C++, or MATLAB with demonstrated experience implementing algorithms from scratch.
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                    <div style={{ marginTop: '0.15rem', padding: '0.45rem', borderRadius: 'var(--radius-pill)', background: 'rgba(117, 160, 106, 0.12)', color: 'var(--accent-sage-dark)', flexShrink: 0 }}>
                      <Award size={16} strokeWidth={2.2} />
                    </div>
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                        Scholarly Motivation
                      </strong>
                      <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                        Genuine dedication to publishing high-quality, reproducible papers in top-tier SCI/SCIE-indexed journals.
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                    <div style={{ marginTop: '0.15rem', padding: '0.45rem', borderRadius: 'var(--radius-pill)', background: 'rgba(117, 160, 106, 0.12)', color: 'var(--accent-sage-dark)', flexShrink: 0 }}>
                      <FileText size={16} strokeWidth={2.2} />
                    </div>
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                        Application Package
                      </strong>
                      <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                        Send an email containing your updated CV, academic transcripts, and a concise note indicating which of Dr. Ahmad's papers you have read and propose to build upon.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Latest News & Announcements */}
      {latest_news && latest_news.length > 0 && (
        <Section
          label="04 / Recent Milestones"
          title="Announcements & News"
          id="news"
        >
          <DateList items={latest_news} />

          <div style={{ marginTop: '2rem' }}>
            <Button variant="secondary" href="/news">
              All announcements &rarr;
            </Button>
          </div>
        </Section>
      )}
    </>
  );
};
