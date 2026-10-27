import React, { useMemo } from 'react';
import { generateLorenzSvgPath } from '../lib/chaoticAttractorSvg';

interface FigureProps {
  figureNumber?: number | string;
  caption: string;
  className?: string;
}

export const Figure: React.FC<FigureProps> = ({
  figureNumber = '1',
  caption,
  className = '',
}) => {
  const pathD = useMemo(() => generateLorenzSvgPath(3600), []);

  return (
    <figure className={`editorial-figure ${className}`.trim()}>
      <div className="editorial-figure__canvas">
        <svg
          viewBox="0 0 660 300"
          width="100%"
          height="auto"
          role="img"
          aria-label={`Figure ${figureNumber}: Phase-space projection of the Lorenz chaotic attractor`}
          style={{ display: 'block', overflow: 'visible' }}
        >
          <path
            d={pathD}
            fill="none"
            stroke="var(--text-primary)"
            strokeWidth="0.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
          />
        </svg>
      </div>

      <figcaption className="editorial-figure__caption">
        <strong>Figure {figureNumber}:</strong>
        {caption}
      </figcaption>
    </figure>
  );
};
