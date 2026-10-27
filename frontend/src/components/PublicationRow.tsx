import React, { useState } from 'react';
import { ExternalLink, FileDown, Code, ChevronDown, ChevronUp, Quote, Copy, Check, Download } from 'lucide-react';
import { Publication } from '../lib/types';

interface PublicationRowProps {
  publication: Publication;
}

export const PublicationRow: React.FC<PublicationRowProps> = ({ publication }) => {
  const [showCite, setShowCite] = useState(false);
  const [citeFormat, setCiteFormat] = useState<'BIBTEX' | 'APA' | 'IEEE'>('BIBTEX');
  const [copied, setCopied] = useState(false);
  const [showAbstract, setShowAbstract] = useState(false);

  // Sanitize Impact Factor string to remove any duplicate "IF:" or "IF: IF:"
  const cleanIF = publication.impact_factor_as_listed
    ? publication.impact_factor_as_listed.replace(/^(?:IF\s*:\s*)+/gi, '').trim()
    : '';

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

        {/* Venue with completely unboxed typography for IF and Indexing */}
        <div className="pub-row__venue">
          <span>{publication.venue}</span>
          {publication.volume_issue_pages && <span>, {publication.volume_issue_pages}</span>}
          
          {(cleanIF || publication.index_tags) && (
            <span className="pub-row__meta-badges">
              {cleanIF && (
                <span className="pub-badge pub-badge--if" title="Journal Impact Factor as listed in CV">
                  IF: {cleanIF}
                </span>
              )}
              {cleanIF && publication.index_tags && (
                <span className="pub-badge-divider" aria-hidden="true">&bull;</span>
              )}
              {publication.index_tags && (
                <span className="pub-badge pub-badge--scopus">
                  {publication.index_tags}
                </span>
              )}
            </span>
          )}
        </div>

        {/* Action links with clean professional Lucide icons (No emojis) */}
        <div className="pub-row__actions">
          {publication.doi && (
            <a
              href={publication.doi.startsWith('http') ? publication.doi : `https://doi.org/${publication.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="pub-action-btn"
              title="Open DOI external publication page"
            >
              <ExternalLink size={12} aria-hidden="true" />
              <span>DOI</span>
            </a>
          )}

          {publication.pdf_url && (
            <a
              href={publication.pdf_url}
              target="_blank"
              rel="noopener noreferrer"
              className="pub-action-btn"
              title="Download official PDF preprint"
            >
              <FileDown size={12} aria-hidden="true" />
              <span>PDF</span>
            </a>
          )}

          {publication.code_url && (
            <a
              href={publication.code_url}
              target="_blank"
              rel="noopener noreferrer"
              className="pub-action-btn"
              title="View source code repository"
            >
              <Code size={12} aria-hidden="true" />
              <span>Code</span>
            </a>
          )}

          {publication.abstract && (
            <button
              type="button"
              onClick={() => setShowAbstract(!showAbstract)}
              className="pub-action-btn"
            >
              {showAbstract ? <ChevronUp size={12} aria-hidden="true" /> : <ChevronDown size={12} aria-hidden="true" />}
              <span>{showAbstract ? 'Hide Abstract' : 'Abstract'}</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setShowCite(!showCite)}
            className="pub-action-btn"
            style={{ color: showCite ? 'var(--palette-c1-charcoal)' : undefined, fontWeight: showCite ? 600 : 400 }}
          >
            <Quote size={12} aria-hidden="true" />
            <span>{showCite ? 'Close Cite' : 'Cite'}</span>
          </button>
        </div>

        {/* Expandable Abstract Panel */}
        {showAbstract && publication.abstract && (
          <div
            style={{
              marginTop: '0.85rem',
              padding: '1.15rem',
              border: '1px solid var(--border-hairline)',
              background: 'rgba(31, 31, 31, 0.02)',
              borderRadius: 'var(--radius-card)',
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
              padding: '1.15rem',
              border: '1px solid var(--border-hairline)',
              background: 'var(--bg-secondary)',
              borderRadius: '14px',
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

            {/* Copy & Download Actions with professional icons */}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <button
                type="button"
                onClick={handleCopyCitation}
                className="pub-action-btn"
                style={{ fontWeight: 500 }}
              >
                {copied ? <Check size={13} style={{ color: 'var(--accent-sage-dark)' }} /> : <Copy size={13} />}
                <span>{copied ? 'Copied to clipboard' : 'Copy Citation'}</span>
              </button>

              {citeFormat === 'BIBTEX' && (
                <button
                  type="button"
                  onClick={handleDownloadBib}
                  className="pub-action-btn"
                >
                  <Download size={13} />
                  <span>Download .bib</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};
