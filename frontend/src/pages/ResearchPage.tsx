import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '../components/Button';
import { Attractor3D } from '../components/Attractor3D';

const RESEARCH_PILLARS = [
  {
    num: '01',
    title: 'Chaos-Based Cryptography & Dynamical Systems',
    summary: 'Investigating multi-dimensional continuous and discrete hyperchaotic attractors for non-linear cipher primitives.',
    details: (
      <>
        <p>
          Our investigations focus on the mathematical formulation of continuous and discrete hyperchaotic dynamical systems exhibiting multiple positive Lyapunov exponents ($\lambda &gt; 0$), phase-space ergodicity, and acute sensitivity to initial conditions. We study 2D, 3D, 4D, and 6D hyperchaotic maps, memristive neural networks, and fractional-order cellular neural models.
        </p>
        <p>
          These systems generate high-entropy pseudo-random keystreams resistant to phase-space reconstruction and linear prediction attacks. Additionally, we conduct formal cryptanalysis on published ciphers to diagnose security vulnerabilities arising from finite precision degradation, periodicity leakage, and chosen-ciphertext vulnerabilities.
        </p>
      </>
    ),
    keywords: ['4D/6D Hyperchaos', 'Memristive Attractors', 'Fractional-Order Calculus', 'Cryptanalysis', 'Keystream Generation'],
  },
  {
    num: '02',
    title: 'Substitution-Box (S-Box) Algebraic Synthesis & Optimization',
    summary: 'Formulating bijective, highly nonlinear cryptographic S-boxes using algebraic group theory and swarm intelligence.',
    details: (
      <>
        <p>
          The Substitution-Box (S-box) is the sole nonlinear component in modern symmetric block ciphers, providing Shannon&apos;s principle of confusion. We develop algebraic synthesis techniques utilizing finite rings, coset graphs, and double $GF(2^7)$ structures to construct optimal bijective mapping tables.
        </p>
        <p>
          To surpass the limitations of pure algebraic structures against algebraic attacks, we integrate metaheuristic optimization algorithms—including artificial bee colony (ABC), firefly algorithms, cuckoo search, and genetic algorithms—yielding S-boxes with optimal nonlinearity ($NL &gt; 106$), strict avalanche criterion (SAC $\approx 0.50$), and low differential uniformity.
        </p>
      </>
    ),
    keywords: ['Group Theory', 'Finite Rings', 'Firefly Algorithm', 'ABC Optimization', 'DPA-Resistant S-Boxes', 'Differential Uniformity'],
  },
  {
    num: '03',
    title: 'Cybersecurity & Authentication Protocols for IoT and Smart Grids',
    summary: 'Designing robust, lightweight key agreement and verification frameworks for critical cyber-physical infrastructures.',
    details: (
      <>
        <p>
          The rapid proliferation of edge sensors, unmanned aerial vehicles (UAVs), and smart grid nodes necessitates ultralightweight authentication mechanisms that resist hardware tampering, replay attacks, and man-in-the-middle impersonation.
        </p>
        <p>
          Our lab has developed cost-effective authentication protocols leveraging Physically Unclonable Functions (PUF) and Elliptic Curve Cryptography (ECC) for Internet of Drones (IoD) communications (IEEE Internet of Things Journal), anonymous authentication for smart grids (JISA), and resource-efficient authenticated data sharing for wearable body area networks (IEEE TNSE).
        </p>
      </>
    ),
    keywords: ['PUF Hardware Security', 'Elliptic Curve Cryptography', 'Internet of Drones (IoD)', 'Smart Grids', 'LEAF-IIoT'],
  },
  {
    num: '04',
    title: 'Secure Multimedia & Medical Image Encryption',
    summary: 'Developing diagnostic-integrity-preserving cryptosystems for high-resolution clinical DICOM imagery and video.',
    details: (
      <>
        <p>
          Medical telemedicine and defense surveillance streams demand rapid, lossless encryption algorithms that withstand aggressive differential and statistical attacks. We design multi-tiered cryptosystems combining compressive sensing, fractional-order Meixner polynomials, and quaternion Hahn moments.
        </p>
        <p>
          These schemes achieve simultaneous data compression and visual confidentiality while enabling local zero-watermarking and tamper localization for clinical diagnostics, color stereo photography, and secure satellite communications.
        </p>
      </>
    ),
    keywords: ['DICOM Healthcare Security', 'Quaternion Moments', 'Compressive Sensing', 'Stereo Image Encryption', 'Reversible Watermarking'],
  },
  {
    num: '05',
    title: 'Applied Deep Learning for Security & Diagnostics',
    summary: 'Engineering lightweight deep learning architectures for multimodal biometric threat detection and medical informatics.',
    details: (
      <>
        <p>
          Integrating deep representation learning with digital security, we formulate compact neural architectures optimized for real-time edge deployment. Notable contributions include LW-DeepFakeNet—a time-distributed CNN-LSTM model for real-time DeepFake facial manipulation detection.
        </p>
        <p>
          In healthcare intelligence, we develop multi-CNN models for intelligent driver drowsiness detection (IEEE TITS), automated PCOS prediction using SMOTE class balancing (Diagnostics), and deep transfer learning for Parkinson&apos;s disease diagnosis from non-invasive multivariate sensor readings (IEEE Access).
        </p>
      </>
    ),
    keywords: ['LW-DeepFakeNet', 'CNN-LSTM Architectures', 'Driver Drowsiness Detection', 'Parkinson Diagnosis', 'Sensor Informatics'],
  },
  {
    num: '06',
    title: 'Metaheuristic Optimization & Complex Network Analysis',
    summary: 'Formulating advanced search metaheuristics and topological analysis for critical network infrastructures.',
    details: (
      <>
        <p>
          Complex systems require adaptive optimization algorithms for high-dimensional feature selection and vulnerability assessment. We have engineered the Modified Hunger Games Search Optimizer (MHGSO) utilizing opposition-based learning for optimal feature subset discovery.
        </p>
        <p>
          In transport security, we apply complex network topology and modified weighted sum Grey Relational Analysis to identify critical edges and cascading bottleneck vulnerabilities in global air route networks (IEEE Transactions on Intelligent Transportation Systems).
        </p>
      </>
    ),
    keywords: ['Hunger Games Search', 'Opposition-Based Learning', 'Complex Networks', 'Grey Relational Analysis', 'Feature Selection'],
  },
];

export const ResearchPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Research Inquiry & Core Pillars — Dr. Musheer Ahmad | JMI</title>
        <meta
          name="description"
          content="Academic research areas of Dr. Musheer Ahmad: chaos-based cryptography, S-box algebraic synthesis, IoT authentication protocols, medical image encryption, and deep learning for security."
        />
      </Helmet>

      <section className="editorial-section" style={{ paddingTop: 'clamp(3rem, 6vw, 5rem)' }}>
        <div className="container">
          <header className="section-header">
            <span className="section-eyebrow">Scholarly Inquiry & Methodology</span>
            <h1 className="section-header__title">Research Pillars & Theoretical Methodology</h1>
            <p className="section-header__desc">
              Rigorous mathematical modeling of non-linear dynamical systems, algebraic S-box synthesis,
              lightweight authentication for cyber-physical systems, and applied deep learning in security and health informatics.
            </p>
          </header>

          {/* Interactive Phase Space Attractor Figure */}
          <div style={{ marginBottom: '4rem' }}>
            <Attractor3D />
          </div>

          {/* Detailed Research Pillars List (Unboxed Editorial Typography) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4.5rem' }}>
            {RESEARCH_PILLARS.map((pillar) => (
              <article key={pillar.num} style={{ borderTop: '1px solid var(--border-hairline)', paddingTop: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '0.75rem' }}>
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: 'var(--accent-green)', fontStyle: 'italic', lineHeight: 1 }}>
                    {pillar.num}
                  </span>
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.65rem', color: 'var(--text-primary)', margin: 0, fontWeight: 500 }}>
                    {pillar.title}
                  </h2>
                </div>

                <div className="text-prose" style={{ marginTop: '1rem', fontSize: '1rem', lineHeight: 1.7, maxWidth: '78ch' }}>
                  {pillar.details}
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Focus Areas:</span>
                  {pillar.keywords.map((kw, idx) => (
                    <span key={idx} style={{ color: 'var(--accent-green)' }}>
                      #{kw}{idx < pillar.keywords.length - 1 ? ' •' : ''}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--border-hairline)', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <Button variant="primary" href="/publications">
              Explore 157 Published Works &rarr;
            </Button>
            <Button variant="secondary" href="/join">
              Research Supervision Opportunities &rarr;
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};
