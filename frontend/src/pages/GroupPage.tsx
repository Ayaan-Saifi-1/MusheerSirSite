import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchTeamMembers } from '../lib/api';
import { Button } from '../components/Button';

export const GroupPage: React.FC = () => {
  const { data: teamMembers } = useQuery({
    queryKey: ['teamMembers'],
    queryFn: fetchTeamMembers,
  });

  const hasPublicMembers = teamMembers && teamMembers.length > 0;

  return (
    <>
      <Helmet>
        <title>Research Group & Supervision — Dr. Musheer Ahmad | JMI</title>
        <meta
          name="description"
          content="Doctoral supervision and research investigators in chaos-based cryptography, S-box synthesis, and cyber-physical security under Dr. Musheer Ahmad at Jamia Millia Islamia."
        />
      </Helmet>

      <section className="editorial-section" style={{ paddingTop: 'clamp(3rem, 6vw, 5rem)' }}>
        <div className="container">
          <header className="section-header">
            <span className="section-eyebrow">Doctoral Lab & Academic Mentorship</span>
            <h1 className="section-header__title">Research Group & Supervision</h1>
            <p className="section-header__desc">
              Supervising doctoral candidates, Master&apos;s dissertation researchers, and undergraduate scholars
              at the Department of Computer Engineering, Jamia Millia Islamia. Research inquiries bridge
              non-linear dynamical systems, algebraic substitution-boxes, lightweight authentication protocols,
              and deep representation learning for cybersecurity.
            </p>
          </header>

          {/* Supervision Metrics Bar (Unboxed Hairline Strip) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '2rem',
              paddingBottom: '2.5rem',
              marginBottom: '4rem',
              borderBottom: '1px solid var(--border-hairline)',
            }}
          >
            <div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: 'var(--text-primary)', lineHeight: 1.1 }}>
                6
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--accent-green)', marginTop: '0.35rem' }}>
                Ph.D. Scholars Active
              </div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                Doctoral candidates under active supervision at JMI
              </div>
            </div>

            <div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: 'var(--text-primary)', lineHeight: 1.1 }}>
                2
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--accent-green)', marginTop: '0.35rem' }}>
                M.Tech Dissertations
              </div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                Ongoing postgraduate research dissertations
              </div>
            </div>

            <div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: 'var(--text-primary)', lineHeight: 1.1 }}>
                14 + 16
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--accent-green)', marginTop: '0.35rem' }}>
                M.Tech Supervised
              </div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                14 dissertations &amp; 16 projects successfully completed
              </div>
            </div>

            <div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: 'var(--text-primary)', lineHeight: 1.1 }}>
                40+
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--accent-green)', marginTop: '0.35rem' }}>
                B.Tech Capstones
              </div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                Major engineering projects completed (3 currently ongoing)
              </div>
            </div>
          </div>

          {/* Research Supervision Pillars */}
          <div style={{ marginBottom: '5rem' }}>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.75rem',
                color: 'var(--text-primary)',
                marginBottom: '1.5rem',
                fontWeight: 500,
              }}
            >
              Active Doctoral Investigation Areas
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
              <div style={{ borderTop: '1px solid var(--border-hairline)', paddingTop: '1.25rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-green)' }}>
                  DIRECTION 01
                </span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--text-primary)', margin: '0.5rem 0' }}>
                  High-Dimensional Chaotic &amp; Hyperchaotic Cryptosystems
                </h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Mathematical modeling of multi-dimensional hyperchaotic dynamical systems exhibiting multiple positive Lyapunov exponents,
                  memristive attractors, and fractional-order calculus. Investigation of pseudo-random keystream generators and formal cryptanalysis
                  of vulnerable published ciphers.
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--border-hairline)', paddingTop: '1.25rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-green)' }}>
                  DIRECTION 02
                </span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--text-primary)', margin: '0.5rem 0' }}>
                  Substitution-Box Synthesis &amp; Evolutionary Metaheuristics
                </h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Formulating bijective, highly nonlinear cryptographic S-boxes via finite field algebra, coset graphs of group theory,
                  and metaheuristic swarm optimization (Artificial Bee Colony, Firefly, Cuckoo Search) to achieve optimal nonlinearity
                  and resilience against linear and differential cryptanalysis.
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--border-hairline)', paddingTop: '1.25rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-green)' }}>
                  DIRECTION 03
                </span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--text-primary)', margin: '0.5rem 0' }}>
                  Lightweight Authentication Protocols for Cyber-Physical IoT
                </h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Constructing low-latency, tamper-resistant mutual authentication and key agreement frameworks leveraging
                  Physically Unclonable Functions (PUF) and Elliptic Curve Cryptography (ECC) for the Internet of Drones (IoD),
                  smart electricity grids, and wearable body sensor networks.
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--border-hairline)', paddingTop: '1.25rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-green)' }}>
                  DIRECTION 04
                </span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--text-primary)', margin: '0.5rem 0' }}>
                  Secure Medical Imagery &amp; Deep Learning Diagnostics
                </h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  High-throughput, diagnostic-preserving encryption algorithms for DICOM clinical records using compressive sensing
                  and orthogonal moments, alongside lightweight deep neural architectures (e.g., LW-DeepFakeNet) for real-time
                  digital manipulation detection and health sensor analytics.
                </p>
              </div>
            </div>
          </div>

          {/* Individual Scholars / Roster Section */}
          <div style={{ marginBottom: '5rem', borderTop: '1px solid var(--border-hairline)', paddingTop: '3rem' }}>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.75rem',
                color: 'var(--text-primary)',
                marginBottom: '1rem',
                fontWeight: 500,
              }}
            >
              Research Personnel &amp; Doctoral Scholars
            </h2>

            {hasPublicMembers ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {teamMembers.map((member) => (
                  <article
                    key={member.id}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '180px 1fr',
                      gap: '2rem',
                      paddingBottom: '2rem',
                      borderBottom: '1px solid var(--border-hairline)',
                    }}
                  >
                    <div>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-green)' }}>
                        {member.role_display || member.role}
                      </span>
                      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--text-primary)', margin: '0.25rem 0' }}>
                        {member.name}
                      </h3>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {member.start_year} &ndash; {member.end_year || 'Present'}
                      </span>
                    </div>

                    <div>
                      {member.research_topic && (
                        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                          <strong style={{ color: 'var(--text-primary)' }}>Topic: </strong>
                          {member.research_topic}
                        </p>
                      )}
                      {member.affiliation_or_placement && (
                        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                          {member.affiliation_or_placement}
                        </p>
                      )}
                      <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                        {member.scholar_url && (
                          <a href={member.scholar_url} target="_blank" rel="noopener noreferrer" className="text-link">
                            Google Scholar &rarr;
                          </a>
                        )}
                        {member.linkedin_url && (
                          <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-link">
                            LinkedIn &rarr;
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div style={{ padding: '2rem 0', maxWidth: '780px' }}>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.9375rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                    marginBottom: '1.25rem',
                  }}
                >
                  Doctoral candidate records and dissertation registries are maintained in accordance with the Department of Computer Engineering
                  academic governance at Jamia Millia Islamia. Individual scholar profiles, publications, and thesis abstracts are published
                  as dissertations reach formal university milestones.
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.9375rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                  }}
                >
                  Postgraduate and doctoral researchers in the lab are co-authors across Dr. Musheer Ahmad&apos;s 157 published papers
                  in IEEE, Springer, and Elsevier journals.
                </p>
              </div>
            )}
          </div>

          {/* Join Callout Band (Unboxed) */}
          <div
            style={{
              paddingTop: '2.5rem',
              borderTop: '1px solid var(--border-hairline)',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              gap: '2rem',
            }}
          >
            <div>
              <span className="section-eyebrow">Academic Opportunities</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--text-primary)', margin: '0.35rem 0' }}>
                Interested in Conducting Research?
              </h2>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', color: 'var(--text-secondary)', maxWidth: '580px', margin: 0 }}>
                Learn about prerequisites, doctoral eligibility criteria, and required application materials on our recruitment page.
              </p>
            </div>

            <div>
              <Link to="/join">
                <Button variant="primary">
                  Prospective Scholars &amp; Guidelines &rarr;
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
