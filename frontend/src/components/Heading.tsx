import React from 'react';

type HeadingLevel = 'display' | 'h1' | 'h2' | 'h3';

interface HeadingProps {
  level?: HeadingLevel;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p';
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Heading: React.FC<HeadingProps> = ({
  level = 'h2',
  as,
  children,
  className = '',
  style,
}) => {
  const Component = as || (level === 'display' ? 'h1' : level);
  const classMap: Record<HeadingLevel, string> = {
    display: 'heading-display',
    h1: 'heading-1',
    h2: 'heading-2',
    h3: 'heading-3',
  };

  return (
    <Component className={`${classMap[level]} ${className}`.trim()} style={style}>
      {children}
    </Component>
  );
};
