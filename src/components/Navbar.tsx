import React, { useState, useEffect } from 'react';
import { LogoStak } from './LogoStak';
import { ThemeToggle } from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';
import { useCms } from '../context/CmsContext';
import { NavPage } from '../types';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  currentPage: NavPage;
  onNavigate: (page: NavPage) => void;
  onOpenBriefing: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenBriefing,
}) => {
  const { isDark } = useTheme();
  const { pagesContent } = useCms();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const headerNav = pagesContent.navigation?.header || {
    items: [
      { id: '1', label: 'Início', page: 'inicio', enabled: true },
      { id: '2', label: 'O Atelier', page: 'sobre-nos', enabled: true },
      { id: '3', label: 'Projectos', page: 'projectos', enabled: true },
      { id: '4', label: 'Especialidades', page: 'servicos', enabled: true },
      { id: '5', label: 'Contactos', page: 'contactos', enabled: true },
    ],
    ctaLabel: 'Solicitar Estudo',
    ctaPage: 'contactos',
    showThemeToggle: true,
  };

  const navItems = headerNav.items.filter((item) => item.enabled ?? true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: NavPage, url?: string) => {
    if (url && url.startsWith('http')) {
      window.open(url, '_blank');
      return;
    }
    onNavigate(page);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? isDark
              ? 'bg-[#090a0c]/95 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl'
              : 'bg-[#f8f7f5]/95 backdrop-blur-md border-b border-[#e4ded5] py-3 shadow-md'
            : 'bg-gradient-to-b from-black/80 via-black/35 to-transparent py-4 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Official STAK Logo */}
            <button
              type="button"
              onClick={() => handleNavClick('inicio')}
              className="flex items-center group transition-transform duration-300 hover:opacity-95 text-left cursor-pointer"
              aria-label="STAK Arquitectura Página Inicial"
            >
              <LogoStak
                variant={isScrolled && !isDark ? 'light' : 'dark'}
                size={isScrolled ? 'sm' : 'md'}
              />
            </button>

            {/* Clean Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8" aria-label="Navegação Principal">
              {navItems.map((item) => {
                const isActive = currentPage === item.page;

                let textColor = '';
                if (!isScrolled) {
                  textColor = isActive
                    ? 'text-[#c6a87c] font-bold'
                    : 'text-white/85 hover:text-white font-medium';
                } else if (isDark) {
                  textColor = isActive
                    ? 'text-[#c6a87c] font-bold'
                    : 'text-[#a2a6b0] hover:text-white font-medium';
                } else {
                  textColor = isActive
                    ? 'text-[#9a733e] font-bold'
                    : 'text-[#4b5563] hover:text-[#111216] font-medium';
                }

                return (
                  <button
                    key={item.id || item.page}
                    type="button"
                    onClick={() => handleNavClick(item.page, item.url)}
                    className={`text-xs tracking-[0.2em] uppercase transition-all relative py-1 cursor-pointer ${textColor}`}
                  >
                    {item.label}
                    {isActive && (
                      <span
                        className={`absolute bottom-0 left-0 w-full h-[1.5px] ${
                          !isScrolled || isDark ? 'bg-[#c6a87c]' : 'bg-[#9a733e]'
                        }`}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Header Right Action */}
            <div className="hidden lg:flex items-center gap-3">
              {headerNav.showThemeToggle !== false && <ThemeToggle />}

              <button
                id="btn-nav-briefing"
                type="button"
                onClick={() => {
                  onNavigate((headerNav.ctaPage as NavPage) || 'contactos');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-2 px-5 py-2 text-xs font-semibold tracking-wider uppercase text-black bg-[#c6a87c] hover:bg-[#d8bb90] transition-all duration-300 rounded-sm shadow-md cursor-pointer"
              >
                <span>{headerNav.ctaLabel || 'Solicitar Estudo'}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mobile / Tablet Controls */}
            <div className="flex items-center gap-2 lg:hidden">
              {headerNav.showThemeToggle !== false && <ThemeToggle />}
              <button
                id="btn-mobile-toggle"
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded-md focus:outline-none cursor-pointer transition-colors ${
                  !isScrolled
                    ? 'text-white bg-white/10 border border-white/20 hover:bg-white/20'
                    : isDark
                    ? 'text-white bg-white/5 border border-white/10 hover:bg-white/10'
                    : 'text-[#121316] bg-[#eae5dc] border border-[#d8d1c3] hover:bg-[#ded7c7]'
                }`}
                aria-label="Abrir Menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div
          className={`fixed inset-0 z-40 backdrop-blur-xl lg:hidden pt-24 px-6 flex flex-col justify-between pb-8 animate-in fade-in ${
            isDark ? 'bg-[#090a0c]/98 text-white' : 'bg-[#f8f7f5]/98 text-[#121316]'
          }`}
        >
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.id || item.page}
                  type="button"
                  onClick={() => handleNavClick(item.page, item.url)}
                  className={`text-left text-lg uppercase tracking-[0.2em] font-heading pb-3 border-b transition-colors cursor-pointer ${
                    isDark ? 'border-white/5' : 'border-[#e4ded5]'
                  } ${
                    isActive
                      ? isDark
                        ? 'text-[#c6a87c] font-bold'
                        : 'text-[#9a733e] font-bold'
                      : isDark
                      ? 'text-[#d1d5db] hover:text-white'
                      : 'text-[#4b5563] hover:text-[#121316]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div
            className={`pt-6 border-t flex flex-col gap-3 ${
              isDark ? 'border-white/10' : 'border-[#e4ded5]'
            }`}
          >
            <button
              type="button"
              onClick={() => {
                onNavigate((headerNav.ctaPage as NavPage) || 'contactos');
                setIsMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full py-3.5 bg-[#c6a87c] hover:bg-[#d8bb90] text-black font-bold text-xs uppercase tracking-wider rounded-sm text-center shadow-lg"
            >
              {headerNav.ctaLabel || 'Solicitar Estudo'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
