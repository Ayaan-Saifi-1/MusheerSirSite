import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { Award, BookOpen, Building2, Layers, ExternalLink, Calendar } from 'lucide-react';
import { fetchNewsItems } from '../lib/api';

interface StaticNewsEntry {
  id: string;
  date: string;
  category: 'AWARDS' | 'EDITORIAL' | 'INSTITUTIONAL';
  categoryLabel: string;
  title: string;
  details: string;
  linkText?: string;
  linkUrl?: string;
  isPinned?: boolean;
}

const VERIFIED_NEWS: StaticNewsEntry[] = [
  {
    id: 'cf-sr-2026',
    date: 'Submission Deadline: 28 February 2026',
    category: 'EDITORIAL',
    categoryLabel: 'Call for Papers / Guest Editor',
    title: 'Call for Papers: Scientific Reports Special Collection on "Post-quantum Cybersecurity and Cryptography"',
    details: 'Serving as Guest Editor for Scientific Reports (Springer Nature, SCIE-indexed, IF: 3.8). The collection solicits original research on quantum-resistant primitives, chaos-assisted post-quantum algorithms, lightweight hardware implementations, and cryptanalysis of emerging standards.',
    linkText: 'Collection Details (Springer Nature)',
    linkUrl: 'https://www.nature.com/srep/',
    isPinned: true,
  },
  {
    id: 'cf-dc-2025',
    date: 'Submission Deadline: 30 September 2025',
    category: 'EDITORIAL',
    categoryLabel: 'Call for Papers / Guest Editor',
    title: 'Call for Papers: Discover Computing Special Issue on "Securing Critical Infrastructure in Next-Generation Networks"',
    details: 'Serving as Guest Editor for Discover Computing (Springer). Welcoming contributions addressing cyber-physical security in smart grids, UAV/drone authentication, IoT edge encryption, and resilient cryptographic telemetry.',
    linkText: 'Special Issue Submission Portal',
    linkUrl: 'https://link.springer.com/journal/10791',
    isPinned: true,
  },
  {
    id: 'award-ed-contrib-2025',
    date: 'January 2025',
    category: 'AWARDS',
    categoryLabel: 'Editorial Honor',
    title: 'Editorial Contribution Award 2025 Conferred by Scientific Reports (Springer Nature)',
    details: 'Conferred by Springer Nature and the editorial leadership of Scientific Reports in recognition of outstanding editorial dedication, academic rigor in peer review, and stewardship of cryptographic scholarship.',
  },
  {
    id: 'fet-award-2024',
    date: '5 November 2024',
    category: 'AWARDS',
    categoryLabel: 'University Award',
    title: 'FET Research Publication Award 2024 Conferred at Jamia Millia Islamia',
    details: 'Presented by Vice Chancellor Prof. Mazhar Asif, Registrar Prof. Md. Mehtab Alam Rizvi, and Dean FET Prof. Mini Shaji Thomas at the Faculty of Engineering and Technology in recognition of exemplary scholarly publication impact.',
  },
  {
    id: 'stanford-top2-2024',
    date: 'September 2024',
    category: 'AWARDS',
    categoryLabel: 'International Ranking',
    title: 'Named to Stanford University / Elsevier World’s Top 2% Scientists (Career-Long & Single-Year)',
    details: 'Ranked in the prestigious global Top 2% Scientists list published by Stanford University and Elsevier BV. Recognized across career-long impact (2024) and single-year impact (2022, 2023, 2024) based on Scopus citations, h-index, and co-authorship-adjusted metrics.',
  },
  {
    id: 'crc-book-2024',
    date: '2024 – 2025',
    category: 'EDITORIAL',
    categoryLabel: 'Edited Book',
    title: 'Edited Book Under Production with CRC Press: "AI Based Cybersecurity Management"',
    details: 'Serving as Volume Editor for "AI Based Cybersecurity Management: Securing Digital Economy", currently under active production with CRC Press (Taylor & Francis Group).',
  },
  {
    id: 'jamia-achievers-2023',
    date: '29 October 2023',
    category: 'AWARDS',
    categoryLabel: 'University Award',
    title: 'Conferred Jamia Achievers Award on University Foundation Day',
    details: 'Awarded by Jamia Millia Islamia on its 103rd Foundation Day celebration for outstanding scientific publications, research citations, and academic contributions to the university.',
  },
  {
    id: 'admin-ace-jmi',
    date: 'Ongoing Appointment',
    category: 'INSTITUTIONAL',
    categoryLabel: 'Governance',
    title: 'Administrative Leadership: Assistant Controller of Examinations, JMI',
    details: 'Appointed Assistant Controller of Examinations in the Office of the Controller of Examinations, Jamia Millia Islamia, overseeing university evaluation policies, semester examinations, and confidential results governance.',
  },
];

export const NewsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'ALL' | 'AWARDS' | 'EDITORIAL' | 'INSTITUTIONAL'>('ALL');

  const { data: apiNews } = useQuery({
    queryKey: ['newsItems'],
    queryFn: fetchNewsItems,
  });

  const filteredNews = useMemo(() => {
    if (activeCategory === 'ALL') {
      return VERIFIED_NEWS;
    }
    return VERIFIED_NEWS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <>
      <Helmet>
        <title>News & Academic Dispatches — Dr. Musheer Ahmad | JMI</title>
        <meta
          name="description"
          content="Academic news, editorial appointments, research honors, and calls for papers for Dr. Musheer Ahmad, Department of Computer Engineering, Jamia Millia Islamia."
        />
      </Helmet>

      <section className="editorial-section" style={{ paddingTop: 'clamp(3rem, 6vw, 5rem)' }}>
        <div className="container">
          <header className="section-header">
            <span className="section-eyebrow">Academic Dispatches &amp; Milestones</span>
            <h1 className="section-header__title">News &amp; Announcements</h1>
            <p className="section-header__desc">
              Chronological record of research honors, guest editorships, special issue calls for papers,
              and institutional appointments from Dr. Musheer Ahmad&apos;s academic portfolio at Jamia Millia Islamia.
            </p>
          </header>

          {/* Category Filter Tabs (Unboxed Plain Text Buttons with subtle icons) */}
          <div
            style={{
              display: 'flex',
              gap: '1.25rem',
              flexWrap: 'wrap',
              paddingBottom: '1.5rem',
              marginBottom: '3rem',
              borderBottom: '1px solid var(--border-hairline)',
            }}
          >
            <button
              type="button"
              onClick={() => setActiveCategory('ALL')}
              className={`attractor-tab-btn ${activeCategory === 'ALL' ? 'active' : ''}`}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}
            >
              <Layers size={14} />
              All Dispatches ({VERIFIED_NEWS.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('AWARDS')}
              className={`attractor-tab-btn ${activeCategory === 'AWARDS' ? 'active' : ''}`}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}
            >
              <Award size={14} />
              Awards &amp; Recognition ({VERIFIED_NEWS.filter((n) => n.category === 'AWARDS').length})
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('EDITORIAL')}
              className={`attractor-tab-btn ${activeCategory === 'EDITORIAL' ? 'active' : ''}`}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}
            >
              <BookOpen size={14} />
              Calls for Papers &amp; Editorial ({VERIFIED_NEWS.filter((n) => n.category === 'EDITORIAL').length})
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('INSTITUTIONAL')}
              className={`attractor-tab-btn ${activeCategory === 'INSTITUTIONAL' ? 'active' : ''}`}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}
            >
              <Building2 size={14} />
              Institutional Roles ({VERIFIED_NEWS.filter((n) => n.category === 'INSTITUTIONAL').length})
            </button>
          </div>

          {/* Dynamic API News Items (if professor added any in CMS) */}
          {apiNews && apiNews.length > 0 && (
            <div style={{ marginBottom: '3rem' }}>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.5rem',
                  color: 'var(--text-primary)',
                  marginBottom: '1.5rem',
                  fontWeight: 500,
                }}
              >
                Recent Updates from CMS
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {apiNews.map((item) => (
                  <article
                    key={item.id}
                    style={{
                      borderTop: '1px solid var(--border-hairline)',
                      paddingTop: '1.5rem',
                      display: 'grid',
                      gridTemplateColumns: '180px 1fr',
                      gap: '2rem',
                    }}
                  >
                    <div>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-sage-dark)', fontWeight: 600 }}>
                        {item.category}
                      </span>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                        {item.date}
                      </div>
                    </div>
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--text-primary)', margin: '0 0 0.5rem 0', fontWeight: 500 }}>
                        {item.title}
                      </h3>
                      {item.body && (
                        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                          {item.body}
                        </p>
                      )}
                      {item.link && (
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                          Reference Link <ExternalLink size={13} />
                        </a>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* Verified News List (Pure Typographic Rows with Left Sage Accents) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {filteredNews.map((news) => {
              const CategoryIcon =
                news.category === 'AWARDS'
                  ? Award
                  : news.category === 'EDITORIAL'
                  ? BookOpen
                  : Building2;

              return (
                <article
                  key={news.id}
                  style={{
                    borderTop: '1px solid var(--border-hairline)',
                    paddingTop: '1.75rem',
                    paddingBottom: '0.75rem',
                    display: 'grid',
                    gridTemplateColumns: 'minmax(200px, 240px) 1fr',
                    gap: '2.5rem',
                    transition: 'border-color var(--transition-fast)',
                  }}
                >
                  {/* Date & Tag Column */}
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.45rem',
                        marginBottom: '0.4rem',
                      }}
                    >
                      <CategoryIcon size={14} color="var(--accent-sage-dark)" />
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.6875rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          color: 'var(--accent-sage-dark)',
                          fontWeight: 600,
                        }}
                      >
                        {news.categoryLabel}
                      </span>
                    </div>

                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.8125rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.45,
                      }}
                    >
                      {news.date}
                    </div>

                    {news.isPinned && (
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          marginTop: '0.65rem',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.6875rem',
                          color: 'var(--palette-c1-charcoal)',
                          background: 'var(--accent-matcha-tint)',
                          padding: '0.2rem 0.65rem',
                          borderRadius: 'var(--radius-pill)',
                          border: '1px solid rgba(117, 160, 106, 0.35)',
                          letterSpacing: '0.03em',
                        }}
                      >
                        Active Call
                      </span>
                    )}
                  </div>

                  {/* Content Column */}
                  <div>
                    <h2
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.35rem',
                        color: 'var(--text-primary)',
                        margin: '0 0 0.75rem 0',
                        fontWeight: 500,
                        lineHeight: 1.35,
                      }}
                    >
                      {news.title}
                    </h2>

                    <p
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.9375rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.65,
                        marginBottom: news.linkUrl ? '0.75rem' : 0,
                      }}
                    >
                      {news.details}
                    </p>

                    {news.linkUrl && (
                      <div style={{ marginTop: '0.75rem' }}>
                        <a
                          href={news.linkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-link"
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.8125rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                          }}
                        >
                          {news.linkText || 'View External Link'} <ExternalLink size={13} />
                        </a>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};
