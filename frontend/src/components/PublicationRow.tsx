import React, { useState } from 'react';
import { Publication } from '../lib/types';

interface PublicationRowProps {
  publication: Publication;
}

export const PublicationRow: React.FC<PublicationRowProps> = ({ publication }) => {
  const [showCite, setShowCite] = useState(false);
  const [citeFormat, setCiteFormat] = useState<'BIBTEX' | 'APA' | 'IEEE'>('BIBTEX');
  const [copied, setCopied] = useState(false);
  const [showAbstract, setShowAbstract] = useState(false);

  // Bold "Musheer Ahmad" in authors list without colorful pill badges
  const renderAuthors = (authorsStr: string) => {
    const parts = authorsStr.split(/(Musheer Ahmad)/gi);
    return parts.map((part, i) => {
      if (part.toLowerCase() === 'musheer ahmad') {
        return <strong key={i} style={{ fontWeight: 600 }}>Musheer Ahmad</strong>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  // Standard BibTeX
  const bibtexText = publication.bibtex || `@article{ahmad${publication.year}_${publication.id},
  title={${publication.title}},
  author={${publication.authors}},
  journal={${publication.venue}},
  year={${publication.year}}${publication.volume_issue_pages ? `,\n  pages={${publication.volume_issue_pages}}` : ''}${publication.doi ? `,\n  doi={${publication.doi}}` : ''}
}`;

  // APA citation
  const apaText = `${publication.authors} (${publication.year}). ${publication.title}. ${publication.venue}${publication.volume_issue_pages ? `, ${publication.volume_issue_pages}` : ''}.${publication.doi ? ` https://doi.org/${publication.doi}` : ''}`;

  // IEEE citation
  const ieeeText = `${publication.authors}, "${publication.title}," ${publication.venue}${publication.volume_issue_pages ? `, ${publication.volume_issue_pages}` : ''}, ${publication.year}.${publication.doi ? ` doi: ${publication.doi}.` : ''}`;

  const currentCitation = citeFormat === 'BIBTEX' ? bibtexText : citeFormat === 'APA' ? apaText : ieeeText;

  const handleCopyCitation = () => {
    navigator.clipboard.writeText(currentCitation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadBib = () => {
    const blob = new Blob([bibtexText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ahmad${publication.year}_${publication.id}.bib`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <article className="pub-row">
      <div className="pub-row__year">
        {publication.year}
      </div>

      <div className="pub-row__body">
        <h3 className="pub-row__title">
          {publication.title}
        </h3>

        <div className="pub-row__authors">
          {renderAuthors(publication.authors)}
        </div>

        <div className="pub-row__venue">
          <span>{publication.venue}</span>
          {publication.volume_issue_pages && <span>, {publication.volume_issue_pages}</span>}
          
          <span className="pub-row__meta-badges">
            {publication.impact_factor_as_listed && (
              <span className="pub-badge" title="Journal Impact Factor as listed in CV">
                IF: {publication.impact_factor_as_listed}
              </span>
            )}
            {publication.index_tags && (
              <span className="pub-badge">
                {publication.index_tags}
              </span>
            )}
          </span>
        </div>

        {/* Action links separated by thin divider dots without ugly brackets */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginTop: '0.5rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
          }}
        >
          {publication.doi && (
            <>
              <a
                href={publication.doi.startsWith('http') ? publication.doi : `https://doi.org/${publication.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                DOI &rarr;
              </a>
              <span style={{ color: 'var(--border-hairline)' }}>&bull;</span>
            </>
          )}

          {publication.pdf_url && (
            <>
              <a
                href={publication.pdf_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                PDF
              </a>
              <span style={{ color: 'var(--border-hairline)' }}>&bull;</span>
            </>
          )}

          {publication.code_url && (
            <>
              <a
                href={publication.code_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                Code
              </a>
              <span style={{ color: 'var(--border-hairline)' }}>&bull;</span>
            </>
          )}

          {publication.abstract && (
            <>
              <button
                type="button"
                onClick={() => setShowAbstract(!showAbstract)}
                className="text-link"
                style={{ background: 'none', border: 'none', padding: 0, font: 'inherit', cursor: 'pointer' }}
              >
                {showAbstract ? 'Hide Abstract' : 'Abstract'}
              </button>
              <span style={{ color: 'var(--border-hairline)' }}>&bull;</span>
            </>
          )}

          <button
            type="button"
            onClick={() => setShowCite(!showCite)}
            className="text-link"
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              font: 'inherit',
              cursor: 'pointer',
              color: showCite ? 'var(--accent-green)' : undefined,
              fontWeight: showCite ? 600 : 400,
            }}
          >
            {showCite ? 'Close Cite' : 'Cite'}
          </button>
        </div>

        {/* Expandable Abstract Panel */}
        {showAbstract && publication.abstract && (
          <div
            style={{
              marginTop: '0.85rem',
              padding: '1rem',
              borderLeft: '2px solid var(--accent-green)',
              background: 'var(--bg-secondary)',
            }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
              Abstract
            </div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
              {publication.abstract}
            </p>
          </div>
        )}

        {/* Cite Panel with Format Tabs & Instant Copy / Download */}
        {showCite && (
          <div
            style={{
              marginTop: '0.85rem',
              padding: '1rem',
              border: '1px solid var(--border-hairline)',
              background: 'var(--bg-secondary)',
            }}
          >
            {/* Format Selector Tabs */}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.75rem', borderBottom: '1px solid var(--border-hairline)', paddingBottom: '0.5rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Format:
              </span>
              <button
                type="button"
                onClick={() => setCiteFormat('BIBTEX')}
                className={`attractor-tab-btn ${citeFormat === 'BIBTEX' ? 'active' : ''}`}
                style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}
              >
                BibTeX
              </button>
              <button
                type="button"
                onClick={() => setCiteFormat('APA')}
                className={`attractor-tab-btn ${citeFormat === 'APA' ? 'active' : ''}`}
                style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}
              >
                APA
              </button>
              <button
                type="button"
                onClick={() => setCiteFormat('IEEE')}
                className={`attractor-tab-btn ${citeFormat === 'IEEE' ? 'active' : ''}`}
                style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}
              >
                IEEE
              </button>
            </div>

            {/* Citation Text View */}
            <pre
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8125rem',
                lineHeight: 1.5,
                color: 'var(--text-primary)',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-all',
                margin: '0 0 0.85rem 0',
                padding: '0.5rem',
                background: 'transparent',
              }}
            >
              {currentCitation}
            </pre>

            {/* Copy & Download Actions */}
            <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
              <button
                type="button"
                onClick={handleCopyCitation}
                className="text-link"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  fontWeight: 500,
                }}
              >
                {copied ? 'Copied to clipboard \u2713' : 'Copy Citation \u2192'}
              </button>

              {citeFormat === 'BIBTEX' && (
                <button
                  type="button"
                  onClick={handleDownloadBib}
                  className="text-link"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                  }}
                >
                  Download .bib &darr;
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};
