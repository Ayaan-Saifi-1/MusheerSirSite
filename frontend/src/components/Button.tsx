import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  external?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  href,
  onClick,
  children,
  className = '',
  type = 'button',
  external = false,
}) => {
  const baseClass = variant === 'primary' ? 'btn-primary' : 'btn-secondary';
  const classes = `${baseClass} ${className}`.trim();

  if (href) {
    if (external || href.startsWith('http') || href.startsWith('mailto:')) {
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
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  );
};
