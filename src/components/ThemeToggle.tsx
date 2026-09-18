import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  variant?: 'compact' | 'full';
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = 'compact',
  className = '',
}) => {
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      id="theme-toggle-btn"
      onClick={toggleTheme}
      className={`relative inline-flex items-center justify-center transition-all duration-300 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#c6a87c]/50 ${
        variant === 'full'
          ? 'px-3.5 py-1.5 gap-2 bg-[#f0ede6] dark:bg-white/10 hover:bg-[#e4ded5] dark:hover:bg-white/15 border border-[#d8d2c6] dark:border-white/15 text-xs font-mono tracking-wider uppercase shadow-sm'
          : 'w-9 h-9 bg-[#f0ede6] dark:bg-white/10 hover:bg-[#e4ded5] dark:hover:bg-white/15 border border-[#d8d2c6] dark:border-white/15 shadow-sm'
      } ${className}`}
      aria-label={isDark ? 'Mudar para Modo Claro (Light)' : 'Mudar para Modo Escuro (Dark)'}
      title={isDark ? 'Ativar Modo Claro (Light)' : 'Ativar Modo Escuro (Dark)'}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {/* Sun Icon (Visible in Light mode) */}
        <Sun
          className={`w-4 h-4 text-[#9a733e] transition-all duration-300 absolute ${
            isDark
              ? 'opacity-0 rotate-90 scale-50 pointer-events-none'
              : 'opacity-100 rotate-0 scale-100'
          }`}
        />
        {/* Moon Icon (Visible in Dark mode) */}
        <Moon
          className={`w-4 h-4 text-[#c6a87c] transition-all duration-300 absolute ${
            isDark
              ? 'opacity-100 rotate-0 scale-100'
              : 'opacity-0 -rotate-90 scale-50 pointer-events-none'
          }`}
        />
      </div>

      {variant === 'full' && (
        <span className="text-[11px] font-semibold tracking-wider text-[#1a1c20] dark:text-[#d1d5db]">
          {isDark ? 'Modo Dark' : 'Modo Light'}
        </span>
      )}
    </button>
  );
};
