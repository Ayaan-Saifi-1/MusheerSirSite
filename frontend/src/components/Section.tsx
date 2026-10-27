import React from 'react';

interface SectionProps {
  label?: string;
  title?: string;
  description?: string;
  children: React.ReactNode;
  surface?: boolean;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}

export const Section: React.FC<SectionProps> = ({
  label,
  title,
  description,
  children,
  surface = false,
  className = '',
  id,
  style,
}) => {
  return (
    <section
      id={id}
      style={style}
      className={`editorial-section ${surface ? 'editorial-section--surface' : ''} ${className}`.trim()}
    >
      <div className="container">
        {(label || title || description) && (
          <header className="section-header">
            {label && <span className="section-eyebrow">{label}</span>}
            {title && <h2 className="section-header__title">{title}</h2>}
            {description && <p className="section-header__desc">{description}</p>}
          </header>
        )}
        <div className="section-body">
          {children}
        </div>
      </div>
    </section>
  );
};
