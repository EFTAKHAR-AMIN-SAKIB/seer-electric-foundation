import React from 'react';

interface SeerLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const SeerLogo: React.FC<SeerLogoProps> = ({ className = '', size = 'md' }) => {
  const iconSizes = {
    sm: 'w-5 h-5',
    md: 'w-7 h-7',
    lg: 'w-9 h-9'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  return (
    <div className={`flex items-center gap-2.5 font-bold tracking-tight select-none ${className}`}>
      {/* Official Electric Foundation Seer Aperture Diamond Glyph */}
      <div className={`relative flex items-center justify-center shrink-0 ${iconSizes[size]}`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-text-primary">
          {/* Authentic Electric Foundation Interlocking Aperture Ribbon */}
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16 2.4L29.6 16L16 29.6L2.4 16L16 2.4ZM16 7.6L7.6 16L16 24.4L24.4 16L16 7.6Z"
            fill="currentColor"
          />
          {/* Dynamic diagonal electric lightning aperture bridge */}
          <path
            d="M12.5 19.5L19.5 12.5"
            stroke="var(--ef-violet)"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <circle cx="16" cy="16" r="2.2" fill="var(--signal-yes)" />
        </svg>
      </div>

      {/* Official EF Lowercase Wordmark */}
      <span className={`font-extrabold tracking-tight text-text-primary lowercase ${textSizes[size]}`}>
        seer
      </span>
    </div>
  );
};