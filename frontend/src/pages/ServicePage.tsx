import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

const INSTITUTIONAL_RESPONSIBILITIES = [
  {
    title: 'Sub-Purchase Committee Member',
    body: 'FTK-Centre for Information Technology (CIT), Jamia Millia Islamia.',
    span: 'Current',
    details: 'Review and procurement governance for university-wide high-performance computing and enterprise networking infrastructure.',
  },
  {
    title: 'Member, Institutional Multidisciplinary Research Advisory Committee (IMRAC)',
    body: 'Regional Research Institute of Unani Medicine, New Delhi, Ministry of Ayush, Govt. of India.',
    span: 'Current',
    details: 'Advising on biomedical data analytics, digital security, and computational multidisciplinary healthcare research.',
  },
  {
    title: 'M.Tech Project Coordinator',
    body: 'Department of Computer Engineering, Jamia Millia Islamia.',
    span: 'Since 2019',
    details: 'Coordinating postgraduate research project allocation, evaluation panels, thesis defenses, and publications output.',
  },
  {
    title: 'CBCS Programme Advisor',
    body: 'Department of Computer Engineering under Choice Based Credit System (CBCS).',
    span: 'Since 2015',
    details: 'Academic counseling, elective course governance, and student progression across multidisciplinary engineering curricula.',
  },
  {
    title: 'Teacher Coordinator — B.Tech 2nd Year (3rd & 4th Semesters)',
    body: 'Department of Computer Engineering, JMI.',
    span: 'Tenured',
    details: 'Monitoring academic delivery, attendance compliance, student grievances, and semester examination prerequisites.',
  },
  {
    title: 'Departmental NAAC Accreditation Nodal Faculty Member',
    body: 'Jamia Millia Islamia (NAAC A++ Accredited University).',
    span: '2015',
    details: 'Prepared Departmental Evaluative Reports (RAR) and coordinated criteria documentation for central accreditation.',
  },
  {
    title: 'Member, Departmental Syllabus Committee',
    body: 'M.Tech Regular Course Formulation, Department of Computer Engineering, JMI.',
    span: '2015',
    details: 'Formulated subject syllabi and laboratory frameworks for the regular M.Tech postgraduate degree program.',
  },
  {
    title: 'Member, ICT Guidelines Compliance Committee',
    body: 'Jamia Millia Islamia Central Administration.',
    span: '2011',
    details: 'Constituted to oversee university ICT policy enforcement and secure institutional computing assets.',
  },
];

const EDITORIAL_LEADERSHIP = [
  {
    role: 'Editorial Board Member',
    journal: 'Scientific Reports',
    publisher: 'Springer Nature',
    indexing: 'SCIE-indexed • High Impact',
    details: 'Handling peer review workflows and manuscript recommendations in cyber-physical security, dynamical systems, and cryptography.',
  },
  {
    role: 'Editorial Board Member',
    journal: 'Discover Computing',
    publisher: 'Springer Nature',
    indexing: 'SCIE-indexed',
    details: 'Overseeing submissions in artificial intelligence, cybersecurity, and computer science systems.',
  },
  {
    role: 'Associate Editor',
    journal: 'International Journal of Information Security and Privacy (IJISP)',
    publisher: 'IGI Global',
    indexing: 'ESCI & SCOPUS indexed',
    details: 'Managing evaluation of papers on privacy-preserving frameworks, authentication algorithms, and multimedia security.',
  },
  {
    role: 'Associate Editor',
    journal: 'International Journal of Artificial Intelligence in Scientific Disciplines (IJAISD)',
    publisher: 'IGI Global',
    indexing: 'Peer-reviewed international journal',
    details: 'Evaluating applied AI models, neural architectures, and intelligent computing.',
  },
  {
    role: 'Lead Guest Editor',
    journal: 'Collection on "Post-quantum cybersecurity and cryptography" — Scientific Reports',
    publisher: 'Springer Nature [SCIE]',
    indexing: 'Submissions Open till 28th February, 2026',
    details: 'Curating research on quantum-resistant cryptographic algorithms, lattice-based ciphers, and post-quantum network security.',
  },
  {
    role: 'Guest Editor',
    journal: 'Special Issue on "Securing Critical Infrastructure in Next-Generation Networks: AI, Machine Learning and Cryptographic Approaches" — Discover Computing',
    publisher: 'Springer [SCIE]',
    indexing: 'Submissions Open till 30th September, 2025',
    details: 'Focusing on zero-trust architectures, Industrial IoT defense, and AI-enabled cryptographic primitives.',
  },
  {
    role: 'Guest Editor',
    journal: 'Special Issue on "Intelligent Informatics and Computing for Security" — International Journal of Rough Sets and Data Analysis',
    publisher: 'IGI Global [DBLP-indexed]',
    indexing: 'Completed collection',
    details: 'Covering rough set theory, heuristic search, and pattern classification for cybersecurity.',
  },
  {
    role: 'Book Editor',
    journal: 'AI Based Cybersecurity Management: Securing Digital Economy',
    publisher: 'CRC Press, Taylor & Francis',
    indexing: 'Under Production',
    details: 'Comprehensive scholarly book examining applied machine learning in cyber warfare, intrusion detection, and digital economy defense.',
  },
];

const CONFERENCE_LEADERSHIP = [
  {
    role: 'Session Chair',
    event: 'Systems and Application Security/Cryptosystems, Algorithms — SSCC 2018',
    venue: 'Bangalore, India • Proceedings in Springer CCIS vol. 969',
    details: 'Presided over oral presentations and paper discussions in advanced cryptology.',
  },
  {
    role: 'Special Session Organizer',
    event: 'Recent Advancements on Information Security — FICTA 2016',
    venue: 'Bhubaneswar, India • Proceedings in Springer AISC vol. 515',
    details: 'Organized and evaluated special track submissions in multimedia security and chaos-based algorithms.',
  },
  {
    role: 'Track Manager',
    event: 'Information Security Applications Track — IC3T 2016',
    venue: 'Proceedings in Springer AISC vol. 542',
    details: 'Coordinated technical evaluations and reviewer assignments across the security track.',
  },
  {
    role: 'Track Manager',
    event: 'Network Security, Wireless and Mobile Computing Track — INDIA 2016',
    venue: 'Proceedings in Springer AISC vol. 535',
    details: 'Managed review timelines and selection thresholds for mobile and wireless security papers.',
  },
  {
    role: 'Technical Program Committee (TPC) & Reviewer',
    event: 'Over 50 International Computing & Cybersecurity Conferences',
    venue: 'IEEE, Springer, ACM flagship conferences worldwide',
    details: 'Regularly evaluating technical manuscripts for quality, original contribution, and experimental reproducibility.',
  },
];

const REVIEWED_JOURNALS_LIST = [
  'IEEE Transactions on Information Forensics and Security (SCIE)',
  'IEEE Transactions on Pattern Analysis and Machine Intelligence (TPAMI, SCIE)',
  'IEEE Transactions on Cybernetics (SCIE)',
  'IEEE Transactions on Industrial Informatics (SCIE)',
  'IEEE Transactions on Circuits and Systems for Video Technology (TCSVT, SCIE)',
  'IEEE Transactions on Circuits and Systems I: Regular Papers (SCIE)',
  'IEEE Transactions on Neural Networks and Learning Systems (TNNLS, SCI)',
  'IEEE Transactions on Systems, Man and Cybernetics: Systems (SCI)',
  'IEEE Transactions on Image Processing (TIP, SCIE)',
  'IEEE Transactions on Intelligent Transportation Systems (TITS, SCIE)',
  'IEEE Transactions on Cognitive and Developmental Systems (SCIE)',
  'IEEE Transactions on Consumer Electronics (TCE, SCIE)',
  'IEEE Transactions on Network Science and Engineering (TNSE, SCIE)',
  'IEEE Transactions on Geoscience and Remote Sensing (SCIE)',
  'IEEE Transactions on Green Communications and Networking (SCIE)',
  'IEEE Transactions on Reliability (SCIE)',
  'IEEE Transactions on Industrial Cyber-Physical Systems (SCIE)',
  'IEEE Transactions on Cloud Computing (SCIE)',
  'IEEE Transactions on Mobile Computing (SCIE)',
  'IEEE Transactions on Parallel and Distributed Systems (TPDS, SCIE)',
  'IEEE Transactions on Nanobioscience (SCIE)',
  'IEEE Journal on Selected Areas in Communications (JSAC, SCI)',
  'IEEE Internet of Things Journal (SCIE)',
  'IEEE Journal of Biomedical and Health Informatics (SCIE)',
  'IEEE Signal Processing Letters (SCIE)',
  'IEEE Systems Journal (SCIE)',
  'IEEE MultiMedia (SCIE)',
  'IEEE Access (SCIE)',
  'ACM Transactions on Sensor Networks (SCIE)',
  'ACM Transactions on Privacy and Security (SCIE)',
  'Journal of Information Security and Applications (Elsevier, SCIE)',
  'Information Sciences (Elsevier, SCI)',
  'Signal Processing (Elsevier, SCIE)',
  'Chaos, Solitons & Fractals (Elsevier, SCI)',
  'Scientific Reports (Springer Nature, SCIE)',
  'Neural Computing and Applications (Springer, SCIE)',
  'Expert Systems with Applications (Elsevier, SCIE)',
  'Knowledge-Based Systems (Elsevier, SCIE)',
  'Computers in Biology and Medicine (Elsevier, SCI)',
  'Physica A: Statistical Mechanics and its Applications (Elsevier, SCI)',
  'Journal of King Saud University - CIS (Elsevier, SCIE)',
  'International Journal of Bifurcation and Chaos (World Scientific, SCIE)',
  'IET Information Security (SCIE)',
  'IET Image Processing (SCIE)',
  'Computers, Materials & Continua (Tech Science Press, SCIE)',
  'Sensors (MDPI, SCIE)',
  'Entropy (MDPI, SCIE)',
  'Symmetry (MDPI, SCIE)',
];

export const ServicePage: React.FC = () => {
  const [showAllJournals, setShowAllJournals] = useState(false);

  return (
    <>
      <Helmet>
        <title>Academic Leadership & Service — Dr. Musheer Ahmad | JMI</title>
        <meta
          name="description"
          content="Official institutional responsibilities, editorial board memberships, conference leadership, and journal refereeing service of Dr. Musheer Ahmad (Jamia Millia Islamia)."
        />
      </Helmet>

      <section className="editorial-section" style={{ paddingTop: 'clamp(3rem, 6vw, 5rem)' }}>
        <div className="container">
          <header className="section-header">
            <span className="section-eyebrow">Academic & Institutional Service</span>
            <h1 className="section-header__title">Leadership & Professional Governance</h1>
            <p className="section-header__desc">
              University administration, editorial board appointments, international conference leadership,
              and peer-review service across leading scientific bodies (as documented in official CV).
            </p>
          </header>

          {/* 1. Institutional Governance */}
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
              Institutional Responsibilities & Governance
            </h2>

            <div>
              {INSTITUTIONAL_RESPONSIBILITIES.map((item, idx) => (
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
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: 'var(--text-primary)', margin: 0, fontWeight: 500 }}>
                      {item.title}
                    </h3>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-green)', fontWeight: 600 }}>
                      {item.span}
                    </span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                    {item.body}
                  </div>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.55, margin: '0.2rem 0 0 0', maxWidth: '75ch' }}>
                    {item.details}
                  </p>
                </article>
              ))}
            </div>
          </div>

          {/* 2. Editorial Boards & Guest Collections */}
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
              Editorial Board Appointments & Guest Editorships
            </h2>

            <div>
              {EDITORIAL_LEADERSHIP.map((item, idx) => (
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
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: 'var(--text-primary)', margin: 0, fontWeight: 500 }}>
                      {item.role}: {item.journal}
                    </h3>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-green)', fontWeight: 600 }}>
                      {item.publisher}
                    </span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    [{item.indexing}]
                  </div>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.55, margin: '0.2rem 0 0 0', maxWidth: '75ch' }}>
                    {item.details}
                  </p>
                </article>
              ))}
            </div>
          </div>

          {/* 3. Conference Leadership */}
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
              Conference Leadership & Track Management
            </h2>

            <div>
              {CONFERENCE_LEADERSHIP.map((item, idx) => (
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
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: 'var(--text-primary)', margin: 0, fontWeight: 500 }}>
                      {item.role}
                    </h3>
                  </div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                    {item.event} — {item.venue}
                  </div>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.55, margin: '0.2rem 0 0 0', maxWidth: '75ch' }}>
                    {item.details}
                  </p>
                </article>
              ))}
            </div>
          </div>

          {/* 4. Journal Referee Service */}
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.5rem',
                color: 'var(--text-primary)',
                marginBottom: '0.75rem',
                paddingBottom: '0.65rem',
                borderBottom: '1px solid var(--border-hairline)',
                fontWeight: 500,
              }}
            >
              Peer Review Service for Scientific Journals (80+ Journals)
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Regularly refereeing manuscripts for premier IEEE Transactions, ACM Transactions, Elsevier, Springer Nature, Wiley, and MDPI journals in cryptography and computational intelligence.
            </p>

            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '0.6rem 2rem',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.8125rem',
                color: 'var(--text-secondary)',
              }}
            >
              {(showAllJournals ? REVIEWED_JOURNALS_LIST : REVIEWED_JOURNALS_LIST.slice(0, 18)).map((journal, idx) => (
                <li key={idx} style={{ padding: '0.25rem 0', borderBottom: '1px solid var(--border-hairline)' }}>
                  {journal}
                </li>
              ))}
            </ul>

            <div style={{ marginTop: '1.5rem' }}>
              <button
                type="button"
                onClick={() => setShowAllJournals(!showAllJournals)}
                className="btn-secondary"
              >
                {showAllJournals ? 'Show fewer journals ↑' : `View all ${REVIEWED_JOURNALS_LIST.length} reviewed journals ↓`}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
