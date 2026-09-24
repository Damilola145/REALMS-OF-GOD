import React from 'react';
import logoImg from '../assets/images/realms_of_god_logo.jpg';

interface BrandLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  variant?: 'full' | 'horizontal' | 'mark' | 'emblem';
  theme?: 'dark-on-light' | 'light-on-dark';
  className?: string;
  showTagline?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  variant = 'horizontal',
  theme = 'dark-on-light',
  className = '',
  showTagline = false,
}) => {
  const isDarkBg = theme === 'light-on-dark';

  // Sizing maps
  const imgSizes = {
    xs: 'w-7 h-7',
    sm: 'w-9 h-9',
    md: 'w-11 h-11',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
    hero: 'w-28 h-28 sm:w-36 sm:h-36',
  };

  const textSizes = {
    xs: { main: 'text-xs', sub: 'text-[9px]', min: 'text-[8px]' },
    sm: { main: 'text-sm', sub: 'text-[10px]', min: 'text-[9px]' },
    md: { main: 'text-base sm:text-lg', sub: 'text-xs', min: 'text-[10px]' },
    lg: { main: 'text-xl sm:text-2xl', sub: 'text-sm', min: 'text-xs' },
    xl: { main: 'text-2xl sm:text-3xl', sub: 'text-base', min: 'text-sm' },
    hero: { main: 'text-3xl sm:text-4xl', sub: 'text-lg', min: 'text-sm' },
  };

  if (variant === 'mark' || variant === 'emblem') {
    return (
      <div className={`relative shrink-0 flex items-center justify-center rounded-2xl overflow-hidden p-0.5 shadow-sm transition-transform duration-200 ${imgSizes[size]} ${className}`}>
        <img
          src={logoImg}
          alt="Realms of God Ministry Logo"
          className="w-full h-full object-contain drop-shadow-sm rounded-xl"
          loading="eager"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  if (variant === 'full') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <div className={`relative shrink-0 flex items-center justify-center rounded-3xl overflow-hidden p-1 shadow-md bg-white border border-[#E2E8F0] ${imgSizes[size]}`}>
          <img
            src={logoImg}
            alt="Realms of God Ministry"
            className="w-full h-full object-contain"
            loading="eager"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="mt-2.5">
          <div className="font-serif tracking-tight font-extrabold uppercase leading-none">
            <span className={isDarkBg ? 'text-white' : 'text-[#0B1E37]'}>REALMS </span>
            <span className="text-[#F6864C]">OF GOD</span>
          </div>
          <div className={`text-[10px] tracking-[0.25em] font-semibold uppercase mt-0.5 ${isDarkBg ? 'text-slate-300' : 'text-[#0B1E37]/80'}`}>
            M I N I S T R Y
          </div>
          {showTagline && (
            <p className={`text-xs mt-1 font-medium ${isDarkBg ? 'text-slate-400' : 'text-slate-600'}`}>
              Covenant Care for Frontline Pastors, Widows &amp; Orphans
            </p>
          )}
        </div>
      </div>
    );
  }

  // Default 'horizontal'
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`relative shrink-0 flex items-center justify-center rounded-xl overflow-hidden bg-white shadow-sm border border-[#E2E8F0]/80 p-0.5 ${imgSizes[size]}`}>
        <img
          src={logoImg}
          alt="Realms of God Ministry Emblem"
          className="w-full h-full object-contain"
          loading="eager"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="flex flex-col text-left leading-none">
        <div className="flex items-center gap-1.5 font-serif font-black tracking-tight uppercase">
          <span className={`transition-colors ${textSizes[size].main} ${isDarkBg ? 'text-white' : 'text-[#0B1E37]'}`}>
            REALMS
          </span>
          <span className={`text-[#F6864C] ${textSizes[size].main}`}>
            OF GOD
          </span>
        </div>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className={`h-px w-3 ${isDarkBg ? 'bg-slate-600' : 'bg-slate-300'}`} />
          <span className={`font-sans font-bold tracking-[0.22em] uppercase ${textSizes[size].min} ${isDarkBg ? 'text-slate-300' : 'text-[#0B1E37]/80'}`}>
            MINISTRY
          </span>
          <span className={`h-px w-3 ${isDarkBg ? 'bg-slate-600' : 'bg-slate-300'}`} />
        </div>
      </div>
    </div>
  );
};
