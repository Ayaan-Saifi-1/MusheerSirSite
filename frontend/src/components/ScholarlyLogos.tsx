import React from 'react';

interface LogoProps {
  size?: number;
  className?: string;
  color?: string;
}

export const GoogleScholarLogo: React.FC<LogoProps> = ({ size = 16, className = '', color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M12 2L1 8.5L12 15L21.5 9.38889V16.5H23V8.5L12 2Z"
      fill={color}
    />
    <path
      d="M5 12.35V16.85C5 19.45 8.13 21.5 12 21.5C15.87 21.5 19 19.45 19 16.85V12.35L12 16.5L5 12.35Z"
      fill={color}
      opacity="0.85"
    />
  </svg>
);

export const ScopusLogo: React.FC<LogoProps> = ({ size = 16, className = '', color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
    <path
      d="M15.5 8.5C14.8 7.8 13.6 7.5 12.2 7.5C10 7.5 8.5 8.7 8.5 10.3C8.5 13.8 15.5 12 15.5 15.2C15.5 16.5 14.1 17.5 12 17.5C10.2 17.5 9 16.8 8.2 16"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const OrcidLogo: React.FC<LogoProps> = ({ size = 16, className = '', color = '#A6CE39' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 256 256"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M128,0A128,128,0,1,0,256,128,128,128,0,0,0,128,0ZM86.35,186.26H60.42V69.74H86.35ZM73.38,58.73a15,15,0,1,1,15-15A15,15,0,0,1,73.38,58.73ZM196.46,129.5c0,35.25-20.33,56.76-52.68,56.76h-34V69.74h36.75C177.37,69.74,196.46,92.51,196.46,129.5Zm-60.75-38.3v76.57h9.57c21.82,0,33.06-14.77,33.06-38.3s-11.24-38.27-33.06-38.27Z"
      fill={color}
    />
  </svg>
);

export const ResearchGateLogo: React.FC<LogoProps> = ({ size = 16, className = '', color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <rect x="2" y="3" width="20" height="18" rx="2" stroke={color} strokeWidth="1.8" />
    <path
      d="M6 16V8H9.5C11 8 12 9 12 10.3C12 11.4 11.2 12.2 10.2 12.4L12.5 16H10.5L8.5 12.8H7.5V16H6ZM7.5 11.2H9.2C10 11.2 10.5 10.8 10.5 10.2C10.5 9.6 10 9.3 9.2 9.3H7.5V11.2Z"
      fill={color}
    />
    <path
      d="M17.5 12H15V14H16.8V15.5C16.3 15.8 15.6 16 14.8 16C13.2 16 12.2 14.8 12.2 13.2C12.2 11.6 13.3 10.4 14.8 10.4C15.6 10.4 16.3 10.7 16.8 11.1L17.8 9.9C17 9.1 16 8.7 14.8 8.7C12.2 8.7 10.5 10.6 10.5 13.2C10.5 15.8 12.3 17.7 14.8 17.7C16.1 17.7 17.2 17.2 18 16.4V12H17.5Z"
      fill={color}
    />
  </svg>
);

export const DblpLogo: React.FC<LogoProps> = ({ size = 16, className = '', color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M4 19.5V4.5C4 3.7 4.7 3 5.5 3H18.5C19.3 3 20 3.7 20 4.5V19.5C20 20.3 19.3 21 18.5 21H5.5C4.7 21 4 20.3 4 19.5Z"
      stroke={color}
      strokeWidth="1.8"
    />
    <path d="M4 7H20" stroke={color} strokeWidth="1.5" />
    <path d="M8 11H16" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M8 14H14" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M8 17H12" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const WebOfScienceLogo: React.FC<LogoProps> = ({ size = 16, className = '', color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.8" />
    <path d="M7 12H17" stroke={color} strokeWidth="1.5" />
    <path d="M12 7V17" stroke={color} strokeWidth="1.5" />
    <circle cx="12" cy="12" r="3" fill={color} />
  </svg>
);

export const UniversityLogo: React.FC<LogoProps> = ({ size = 16, className = '', color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 3L2 8L12 13L22 8L12 3Z" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M5 10.5V17.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <path d="M9 12V18" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <path d="M15 12V18" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <path d="M19 10.5V17.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <path d="M3 18.5H21" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <path d="M2 21H22" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);
