import React from 'react';
import { Link } from 'react-router-dom';

interface TextLinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  muted?: boolean;
  className?: string;
  onClick?: () => void;
}

export const TextLink: React.FC<TextLinkProps> = ({
  href,
  children,
  external = false,
  muted = false,
  className = '',
  onClick,
}) => {
  const isExternal = external || href.startsWith('http') || href.startsWith('mailto:');
  const classes = `text-link ${muted ? 'text-link--muted' : ''} ${className}`.trim();

  if (isExternal) {
    return (
      <a
        href={href}
        className={classes}
        target={href.startsWith('mailto:') ? undefined : '_blank'}
        rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <Link to={href} className={classes} onClick={onClick}>
      {children}
    </Link>
  );
};
