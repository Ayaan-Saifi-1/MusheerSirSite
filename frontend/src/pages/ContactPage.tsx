import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SiteSettings } from '../lib/types';

interface ContactPageProps {
  settings?: SiteSettings;
}

export const ContactPage: React.FC<ContactPageProps> = ({ settings }) => {
  return (
    <>
      <Helmet>
        <title>Contact Coordinates &amp; Campus Location — Dr. Musheer Ahmad | JMI</title>
        <meta
          name="description"
          content="Academic office coordinates, official email, telephone, and verified scholarly directories for Dr. Musheer Ahmad at Jamia Millia Islamia, New Delhi."
        />
      </Helmet>

      <section className="editorial-section" style={{ paddingTop: 'clamp(3rem, 6vw, 5rem)' }}>
        <div className="container">
          <header className="section-header">
            <span className="section-eyebrow">Institutional Coordinates &amp; Reach</span>
            <h1 className="section-header__title">Contact Coordinates</h1>
            <p className="section-header__desc">
              Academic office location, official correspondence channels, and verified scholarly profiles
              for Dr. Musheer Ahmad at the Department of Computer Engineering, Jamia Millia Islamia.
            </p>
          </header>

          {/* 3-Column Unboxed Contact Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '3.5rem',
              paddingBottom: '3.5rem',
              marginBottom: '4.5rem',
              borderBottom: '1px solid var(--border-hairline)',
            }}
          >
            {/* Column 1: Academic Location */}
            <div>
              <span className="section-eyebrow">Academic Department</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--text-primary)', margin: '0.35rem 0 1rem 0', fontWeight: 500 }}>
                Department of Computer Engineering
              </h2>
              <address
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.9375rem',
                  fontStyle: 'normal',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.65,
                }}
              >
                Faculty of Engineering and Technology<br />
                Jamia Millia Islamia (A Central University)<br />
                Jamia Nagar, New Delhi &ndash; 110025, India
              </address>

              <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-hairline)' }}>
                <span className="section-eyebrow">Administrative Office</span>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'var(--text-secondary)', margin: '0.35rem 0 0 0', lineHeight: 1.5 }}>
                  Assistant Controller of Examinations<br />
                  Office of the Controller of Examinations<br />
                  Jamia Millia Islamia, New Delhi
                </p>
              </div>
            </div>

            {/* Column 2: Electronic Mail & Phone */}
            <div>
              <span className="section-eyebrow">Direct Correspondence</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--text-primary)', margin: '0.35rem 0 1rem 0', fontWeight: 500 }}>
                Electronic Mail &amp; Telephone
              </h2>

              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-green)', textTransform: 'uppercase' }}>
                  Official Institutional Email
                </div>
                <a
                  href={`mailto:${settings?.email_primary || 'mahmad9@jmi.ac.in'}`}
                  className="text-link"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9375rem', fontWeight: 500 }}
                >
                  {settings?.email_primary || 'mahmad9@jmi.ac.in'}
                </a>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  For university business, prospective student inquiries, and official academic correspondence.
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-green)', textTransform: 'uppercase' }}>
                  Alternative / Editorial Email
                </div>
                <a
                  href={`mailto:${settings?.email_secondary || 'musheer.cse@gmail.com'}`}
                  className="text-link"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9375rem' }}
                >
                  {settings?.email_secondary || 'musheer.cse@gmail.com'}
                </a>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  For journal editorial roles, conference keynotes, and international research collaborations.
                </div>
              </div>

              <div style={{ paddingTop: '1.25rem', borderTop: '1px solid var(--border-hairline)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-green)', textTransform: 'uppercase' }}>
                  Office Telephone
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9375rem', color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                  {settings?.office_phone || '+91 11 2698 0281'}
                </div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  Department EPABX Extension: 3148
                </div>
              </div>
            </div>

            {/* Column 3: Transit & Visiting Guidelines */}
            <div>
              <span className="section-eyebrow">Campus Transit</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--text-primary)', margin: '0.35rem 0 1rem 0', fontWeight: 500 }}>
                Transit &amp; Visiting
              </h2>

              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: '0 0 1rem 0' }}>
                The Faculty of Engineering &amp; Technology is located on the main university campus in Jamia Nagar, South Delhi.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <div>
                  <strong style={{ color: 'var(--text-primary)' }}>Delhi Metro: </strong>
                  Jamia Millia Islamia Station (Magenta Line), Gate No. 2 exit.
                </div>
                <div>
                  <strong style={{ color: 'var(--text-primary)' }}>Campus Entry: </strong>
                  Gate No. 7, approximately 300 meters walking distance from the metro station.
                </div>
                <div>
                  <strong style={{ color: 'var(--text-primary)' }}>Meeting Protocol: </strong>
                  Prior appointment by email with at least 48 hours notice is required for in-person consultations.
                </div>
              </div>
            </div>
          </div>

          {/* Verified Scholarly Profiles Strip (Pure Typographic Index) */}
          <div>
            <span className="section-eyebrow">Scholarly Directories &amp; Bibliographic Indices</span>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.65rem',
                color: 'var(--text-primary)',
                margin: '0.35rem 0 1.5rem 0',
                fontWeight: 500,
              }}
            >
              Verified External Research Profiles
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.9375rem',
                color: 'var(--text-secondary)',
                marginBottom: '2rem',
                maxWidth: '720px',
              }}
            >
              All researcher identifiers below are verified against Dr. Musheer Ahmad&apos;s Curriculum Vitae (June 2025)
              and official university records.
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.5rem 3rem',
              }}
            >
              <div style={{ borderTop: '1px solid var(--border-hairline)', paddingTop: '1rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-green)' }}>
                  GOOGLE SCHOLAR
                </span>
                <div style={{ marginTop: '0.25rem' }}>
                  <a
                    href={settings?.google_scholar_url || 'https://scholar.google.com/citations?user=cPbmjWoAAAAJ'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link"
                    style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', fontWeight: 500 }}
                  >
                    User: cPbmjWoAAAAJ &rarr;
                  </a>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  5,296 citations &bull; h-index 42
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-hairline)', paddingTop: '1rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-green)' }}>
                  SCOPUS AUTHOR ID
                </span>
                <div style={{ marginTop: '0.25rem' }}>
                  <a
                    href={settings?.scopus_url || 'https://www.scopus.com/authid/detail.uri?authorId=56339090200'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link"
                    style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', fontWeight: 500 }}
                  >
                    ID: 56339090200 &rarr;
                  </a>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  151 indexed documents &bull; h-index 36
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-hairline)', paddingTop: '1rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-green)' }}>
                  WEB OF SCIENCE RESEARCHERID
                </span>
                <div style={{ marginTop: '0.25rem' }}>
                  <a
                    href={settings?.web_of_science_url || 'https://www.webofscience.com/wos/author/record/H-9587-2018'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link"
                    style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', fontWeight: 500 }}
                  >
                    ID: H-9587-2018 &rarr;
                  </a>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  124 indexed articles &bull; 87 SCIE
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-hairline)', paddingTop: '1rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-green)' }}>
                  DBLP BIBLIOGRAPHY
                </span>
                <div style={{ marginTop: '0.25rem' }}>
                  <a
                    href={settings?.dblp_url || 'https://dblp.org/pid/89/8467-2.html'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link"
                    style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', fontWeight: 500 }}
                  >
                    PID: 89/8467-2 &rarr;
                  </a>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  Computer Science Bibliography
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-hairline)', paddingTop: '1rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-green)' }}>
                  RESEARCHGATE
                </span>
                <div style={{ marginTop: '0.25rem' }}>
                  <a
                    href={settings?.researchgate_url || 'https://www.researchgate.net/profile/Musheer-Ahmad-3'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link"
                    style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', fontWeight: 500 }}
                  >
                    Profile: Musheer-Ahmad-3 &rarr;
                  </a>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  Full-text preprint exchange &amp; stats
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-hairline)', paddingTop: '1rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-green)' }}>
                  JAMIA MILLIA ISLAMIA
                </span>
                <div style={{ marginTop: '0.25rem' }}>
                  <a
                    href={settings?.jmi_profile_url || 'https://www.jmi.ac.in/ACADEMICS/Departments/Department-Of-Computer-Engineering/People/Faculty-Members/3148/Musheer_Ahmad'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link"
                    style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', fontWeight: 500 }}
                  >
                    Official Faculty Page &rarr;
                  </a>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  Faculty Member ID: 3148
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
