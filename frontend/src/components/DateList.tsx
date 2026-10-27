import React from 'react';
import { NewsItem } from '../lib/types';

interface DateListProps {
  items: NewsItem[];
}

export const DateList: React.FC<DateListProps> = ({ items }) => {
  return (
    <div className="date-list">
      {items.map((item) => (
        <article key={item.id} className="date-list__item">
          <time dateTime={item.date} className="date-list__date">
            {item.date}
          </time>

          <div className="date-list__body">
            <h3 className="date-list__title">
              {item.link ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link"
                >
                  {item.title}
                </a>
              ) : (
                item.title
              )}
            </h3>

            {item.body && (
              <p
                style={{
                  fontSize: 'var(--font-body-sm)',
                  color: 'var(--text-secondary)',
                  marginTop: '0.35rem',
                  lineHeight: 1.55,
                }}
              >
                {item.body}
              </p>
            )}
          </div>
        </article>
      ))}
    </div>
  );
};
