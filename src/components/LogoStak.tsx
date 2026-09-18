import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useCms } from '../context/CmsContext';

interface LogoStakProps {
  variant?: 'transparent' | 'dark' | 'light' | 'auto';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
  alt?: string;
}

export const LogoStak: React.FC<LogoStakProps> = ({
  variant = 'auto',
  size = 'md',
  className = '',
  alt = 'STAK Arquitectura & Design de Interiores',
}) => {
  const { isDark } = useTheme();
  const { atelierInfo } = useCms();
  const [srcIndex, setSrcIndex] = useState(0);

  // Exact theme mapping:
  // Dark mode (principal): White logo
  // Light mode: Black logo
  const isLightMode = variant === 'light' || (variant === 'auto' && !isDark);

  useEffect(() => {
    setSrcIndex(0);
  }, [isDark, variant, atelierInfo.logoLight, atelierInfo.logoDark]);

  // Generous, prominent heights for high-definition legibility
  const heightClass =
    size === 'xs'
      ? 'h-8 sm:h-9'
      : size === 'sm'
      ? 'h-10 sm:h-11 md:h-12'
      : size === 'md'
      ? 'h-12 sm:h-14 md:h-16'
      : 'h-16 sm:h-20';

  const customLightLogo = atelierInfo?.logoLight;
  const customDarkLogo = atelierInfo?.logoDark;

  const lightSources = [
    ...(customLightLogo ? [customLightLogo] : []),
    '/img/Stak-Logo-Original-PNG-BLACK.png',
    '/img/Stak Logo Original PNG BLACK.png',
  ];

  const darkSources = [
    ...(customDarkLogo ? [customDarkLogo] : []),
    '/img/Stak-Logo-Original-PNG.png',
    '/img/Stak Logo Original PNG.png',
    '/img/stak-logo-original.png',
    '/img/stak-logo.png',
  ];

  const sources = isLightMode ? lightSources : darkSources;
  const currentSrc = sources[Math.min(srcIndex, sources.length - 1)];

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src={currentSrc}
        alt={alt}
        className={`${heightClass} w-auto max-w-[280px] sm:max-w-[340px] object-contain transition-all duration-300 drop-shadow-sm`}
        onError={() => {
          if (srcIndex < sources.length - 1) {
            setSrcIndex((prev) => prev + 1);
          }
        }}
        loading="eager"
      />
    </div>
  );
};
