import React from 'react';
import { Helmet } from 'react-helmet-async';

const COURSES_TAUGHT = [
  {
    code: 'CEN-401',
    title: 'Analysis and Design of Algorithms',
    level: 'B.Tech (Computer Engineering) / B.E.',
    description: 'Asymptotic notation, divide-and-conquer recurrences, greedy paradigms, dynamic programming, graph traversals, network flows, and NP-completeness.',
  },
  {
    code: 'MCEN-101',
    title: 'Algorithm Design',
    level: 'M.Tech (Computer Engineering & Computational Mathematics)',
    description: 'Advanced randomized algorithms, amortized complexity analysis, approximation bounds, string matching, and algebraic computational geometry.',
  },
  {
    code: 'CEN-302',
    title: 'Discrete Mathematics',
    level: 'B.Tech (Computer Engineering)',
    description: 'Propositional & predicate calculus, set theory, combinatorics, modular arithmetic, group theory, finite fields, and algebraic structures for computer science.',
  },
  {
    code: 'CEN-503',
    title: 'Microprocessor Theory and Applications',
    level: 'B.Tech (Computer Engineering)',
    description: 'Instruction set architectures, 8086/x86 microprocessor hardware interfaces, assembly language programming, interrupt handling, and bus protocols.',
  },
  {
    code: 'CEN-704',
    title: 'Soft Computing & Soft Computing Techniques',
    level: 'M.Tech & B.Tech Elective Course',
    description: 'Fuzzy logic systems, artificial neural architectures, genetic algorithms, swarm optimization (firefly, cuckoo search, ABC), and neuro-fuzzy synthesis.',
  },
];

const CURRICULUM_DESIGN = [
  {
    category: 'New Course Syllabi Designed at JMI',
    items: [
      'Quantum Cryptography — Formulated advanced syllabus covering quantum key distribution (BB84, E91), no-cloning theorem, and post-quantum transitions.',
      'Digital Forensics — Designed comprehensive syllabus for evidence acquisition, file system forensics, steganalysis, and anti-forensic analysis.',
      'Multimedia Systems & Technology — Formulated syllabus covering video coding standards, perceptual hashing, and secure streaming architecture.',
      'Artificial Neural Networks — Designed curriculum encompassing feedforward, recurrent, CNN-LSTM architectures, and backpropagation optimization.',
    ],
  },
  {
    category: 'Postgraduate M.Tech Syllabi Designed at JMI',
    items: [
      'Algorithm Design (Advanced M.Tech core curriculum)',
      'Soft Computing (M.Tech computer engineering curriculum)',
      'Multimedia Technology (M.Tech elective framework)',
      'Digital Image Processing (M.Tech theoretical & laboratory formulation)',
    ],
  },
  {
    category: 'Curriculum Revisions & Elective Introductions',
    items: [
      'Introduced new B.Tech Elective course "Soft Computing Techniques" and designed its complete course syllabus at JMI.',
      'Revised and modernized the syllabus of "Analysis and Design of Algorithms" and "Discrete Mathematics" at JMI.',
      'Revised syllabus of "Microprocessor Theory & Applications" at Department of Computer Engineering, AMU, Aligarh.',
    ],
  },
];

export const TeachingPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Teaching, Curriculum Design & Supervision — Dr. Musheer Ahmad | JMI</title>
        <meta
          name="description"
          content="Over 18 years of academic teaching in algorithms, discrete mathematics, and cryptography. Curriculum design and doctoral supervision track record of Dr. Musheer Ahmad at Jamia Millia Islamia."
        />
      </Helmet>

      <section className="editorial-section" style={{ paddingTop: 'clamp(3rem, 6vw, 5rem)' }}>
        <div className="container">
          <header className="section-header">
            <span className="section-eyebrow">Academic Pedagogy</span>
            <h1 className="section-header__title">Teaching & Curriculum Leadership</h1>
            <p className="section-header__desc">
              Over 18 years of university teaching experience across Jamia Millia Islamia and Aligarh Muslim University,
              designing core curricula in algorithms, cryptography, quantum security, and supervising postgraduate research.
            </p>
          </header>

          {/* Experience & Supervision Metrics (Unboxed 3-Column Strip) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '2.5rem',
              paddingBottom: '2.5rem',
              marginBottom: '3rem',
              borderBottom: '1px solid var(--border-hairline)',
            }}
          >
            <div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: 'var(--text-primary)', lineHeight: 1 }}>
                18 Years
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent-green)', fontWeight: 600, marginTop: '0.35rem' }}>
                Teaching Experience
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                Associate Professor at JMI; Former Lecturer at AMU Aligarh (2006–2010)
              </div>
            </div>

            <div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: 'var(--text-primary)', lineHeight: 1 }}>
                6 Scholars
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent-green)', fontWeight: 600, marginTop: '0.35rem' }}>
                Doctoral Supervision
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                Actively guiding 6 Ph.D. researchers in nonlinear cryptology & authentication
              </div>
            </div>

            <div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: 'var(--text-primary)', lineHeight: 1 }}>
                70+ Theses
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent-green)', fontWeight: 600, marginTop: '0.35rem' }}>
                Completed Dissertations
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                14 M.Tech dissertations, 16 M.Tech projects, and 40+ B.Tech engineering projects
              </div>
            </div>
          </div>

          {/* Courses Taught */}
          <div style={{ marginBottom: '4rem' }}>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.5rem',
                color: 'var(--text-primary)',
                marginBottom: '1rem',
                paddingBottom: '0.65rem',
                borderBottom: '1px solid var(--border-hairline)',
                fontWeight: 500,
              }}
            >
              Core Courses Taught
            </h2>

            <div>
              {COURSES_TAUGHT.map((course, idx) => (
                <article
                  key={idx}
                  style={{
                    padding: '1.35rem 0',
                    borderBottom: '1px solid var(--border-hairline)',
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: '0.35rem',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--text-primary)', margin: 0, fontWeight: 500 }}>
                      {course.title}
                    </h3>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-green)', fontWeight: 600 }}>
                      {course.code}
                    </span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                    Level: {course.level}
                  </div>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.55, margin: '0.2rem 0 0 0', maxWidth: '75ch' }}>
                    {course.description}
                  </p>
                </article>
              ))}
            </div>
          </div>

          {/* Curriculum Design Leadership */}
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.5rem',
                color: 'var(--text-primary)',
                marginBottom: '1rem',
                paddingBottom: '0.65rem',
                borderBottom: '1px solid var(--border-hairline)',
                fontWeight: 500,
              }}
            >
              Curricula & Syllabi Designed for University Programs
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              {CURRICULUM_DESIGN.map((group, gIdx) => (
                <div key={gIdx}>
                  <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', color: 'var(--text-primary)', fontWeight: 600, marginBottom: '0.75rem' }}>
                    {group.category}
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    {group.items.map((item, iIdx) => (
                      <li
                        key={iIdx}
                        style={{
                          fontSize: '0.9375rem',
                          color: 'var(--text-secondary)',
                          lineHeight: 1.55,
                          paddingLeft: '1.25rem',
                          position: 'relative',
                        }}
                      >
                        <span style={{ position: 'absolute', left: 0, color: 'var(--accent-green)' }}>—</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
