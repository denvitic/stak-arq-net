/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, lazy, Suspense } from 'react';
import { CmsProvider, useCms } from './context/CmsContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AdminLogin } from './components/AdminLogin';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { CmsModal } from './components/CmsModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { HomePage } from './pages/HomePage';
import { AtelierPage } from './pages/AtelierPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ServicesPage } from './pages/ServicesPage';
import { ArticlesPage } from './pages/ArticlesPage';
import { ContactsPage } from './pages/ContactsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { SeoHeadManager } from './components/SeoHeadManager';
import { Project, NavPage } from './types';

// Lazy load the full administration dashboard to ensure optimal public website performance
const DashboardApp = lazy(() => import('./dashboard/src/App'));

function StakApp() {
  const { isDark, theme } = useTheme();
  const { atelierInfo, isHydrated } = useCms();
  const { isAuthenticated, user, signOut } = useAuth();

  // Check whether current URL (hash or pathname) or persistent state refers to the admin panel
  const checkIsAdminRoute = () => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    const pathname = window.location.pathname.toLowerCase();

    // 1. Direct hash matches
    if (hash === 'admin' || hash === 'dashboard' || hash === 'painel' || hash.startsWith('admin/')) {
      return true;
    }

    // 2. Direct pathname matches (e.g. if loaded at /admin, /dashboard, or subroutes from dashboard)
    const adminPathPrefixes = [
      '/admin',
      '/dashboard',
      '/painel',
      '/frontweb',
      '/media',
      '/projects',
      '/briefings',
      '/users',
      '/settings',
      '/atelier',
      '/faqs',
      '/menus',
      '/articles',
      '/services',
    ];
    if (adminPathPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(prefix + '/'))) {
      return true;
    }

    // 3. User session persistence: if admin was active and user is authenticated
    const savedActiveView = localStorage.getItem('stak_admin_active_view');
    const hasActiveSession =
      localStorage.getItem('stak_admin_demo_session') === 'true' ||
      !!localStorage.getItem('stak_admin_cached_user');

    if (savedActiveView === 'admin' && hasActiveSession) {
      // If user refreshed while on root URL without an explicit non-admin hash
      if (pathname === '/' && (hash === '' || hash === 'admin' || hash === 'dashboard')) {
        return true;
      }
    }

    return false;
  };

  // Navigation state initialized from URL or persistent session
  const [currentPage, setCurrentPage] = useState<NavPage>(() => {
    if (checkIsAdminRoute()) return 'admin';
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (hash === 'sobre-nos' || hash === 'atelier') return 'sobre-nos';
    if (hash === 'projectos' || hash === 'portfolio' || hash.startsWith('projectos/')) return 'projectos';
    if (hash === 'servicos' || hash === 'especialidades') return 'servicos';
    if (hash === 'artigos' || hash === 'publicacoes' || hash.startsWith('artigos/')) return 'artigos';
    if (hash === 'contactos' || hash === 'briefing') return 'contactos';
    if (hash === 'inicio' || hash === '') return 'inicio';
    return '404';
  });

  // Keep admin active view and hash synchronized
  useEffect(() => {
    if (currentPage === 'admin') {
      localStorage.setItem('stak_admin_active_view', 'admin');
      if (!window.location.hash || window.location.hash === '#inicio') {
        window.location.hash = 'admin';
      }
    } else {
      localStorage.removeItem('stak_admin_active_view');
    }
  }, [currentPage]);

  // Ensure HTML root classes are synchronized: Admin is ALWAYS light, Website follows user theme
  useEffect(() => {
    const root = document.documentElement;
    if (currentPage === 'admin') {
      root.classList.remove('dark');
      root.classList.add('light', 'admin-view');
      root.setAttribute('data-theme', 'light');
    } else {
      root.classList.remove('admin-view');
      root.classList.remove('dark', 'light');
      root.classList.add(theme);
      root.setAttribute('data-theme', theme);
    }
  }, [currentPage, theme]);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);

  // Sync route changes with browser URL hash
  const navigateTo = (page: NavPage) => {
    setCurrentPage(page);
    if (page === 'admin') {
      localStorage.setItem('stak_admin_active_view', 'admin');
      window.location.hash = 'admin';
    } else {
      localStorage.removeItem('stak_admin_active_view');
      window.location.hash = page;
      if (window.location.pathname !== '/') {
        window.history.pushState(null, '', `/#${page}`);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Listen to hash changes (back/forward buttons)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const pathname = window.location.pathname.toLowerCase();

      if (
        hash === 'admin' ||
        hash === 'dashboard' ||
        hash === 'painel' ||
        pathname === '/admin'
      ) {
        setCurrentPage('admin');
        localStorage.setItem('stak_admin_active_view', 'admin');
      } else if (hash === 'sobre-nos' || hash === 'atelier') {
        setCurrentPage('sobre-nos');
        localStorage.removeItem('stak_admin_active_view');
      } else if (hash === 'projectos' || hash === 'portfolio') {
        setCurrentPage('projectos');
        localStorage.removeItem('stak_admin_active_view');
      } else if (hash === 'servicos' || hash === 'especialidades') {
        setCurrentPage('servicos');
        localStorage.removeItem('stak_admin_active_view');
      } else if (hash === 'artigos' || hash === 'publicacoes') {
        setCurrentPage('artigos');
        localStorage.removeItem('stak_admin_active_view');
      } else if (hash === 'contactos' || hash === 'briefing') {
        setCurrentPage('contactos');
        localStorage.removeItem('stak_admin_active_view');
      } else if (hash === 'inicio' || hash === '') {
        if (localStorage.getItem('stak_admin_active_view') !== 'admin') {
          setCurrentPage('inicio');
        }
      } else {
        setCurrentPage('404');
        localStorage.removeItem('stak_admin_active_view');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleOpenBriefing = (serviceOrProjectTitle?: string) => {
    if (serviceOrProjectTitle) {
      setPreselectedService(serviceOrProjectTitle);
    }
    navigateTo('contactos');
  };

  const handleBackToWebsite = () => {
    localStorage.removeItem('stak_admin_active_view');
    navigateTo('inicio');
    if (window.location.pathname !== '/') {
      window.history.pushState(null, '', '/#inicio');
    }
  };

  const handleSignOut = async () => {
    localStorage.removeItem('stak_admin_active_view');
    await signOut();
    handleBackToWebsite();
  };

  if (currentPage === 'admin') {
    if (!isAuthenticated) {
      return <AdminLogin onBackToWebsite={handleBackToWebsite} />;
    }

    return (
      <div id="admin-root" className="stak-admin-panel min-h-screen bg-[#f8f9fa] text-gray-900 flex flex-col">
        {/* Top utility bar with session status and quick return */}
        <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between text-xs z-50 shadow-2xs">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#c6a87c]" />
            <span className="font-mono text-[#111827] font-bold tracking-wider uppercase text-[11px]">
              Painel Administrativo STAK
            </span>
            <span className="hidden sm:inline text-gray-300">|</span>
            <span className="hidden sm:inline text-gray-500 text-xs">Gestão de Conteúdos & Portfólio</span>
            <span className="hidden lg:inline text-gray-300">|</span>
            <span className="hidden lg:inline text-[11px] text-gray-400">
              Desenvolvido por{' '}
              <a
                href="https://www.denvitic.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-gray-600 hover:text-[#c6a87c] transition-colors"
              >
                Denvitic Tecnologias
              </a>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-md bg-gray-50 border border-gray-200 text-[11px] text-gray-700">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="font-medium text-gray-900">
                {user?.user_metadata?.full_name || user?.email || 'Administrador STAK'}
              </span>
            </div>

            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-gray-600 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer text-xs font-medium"
            >
              <span>Terminar Sessão</span>
            </button>

            <button
              type="button"
              onClick={handleBackToWebsite}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#111827] hover:bg-black text-white font-medium rounded-lg transition-colors cursor-pointer text-xs shadow-xs"
              style={{ color: '#ffffff' }}
            >
              <span style={{ color: '#ffffff' }}>← Voltar ao Website</span>
            </button>
          </div>
        </div>

        {/* Real Admin Dashboard */}
        <div className="flex-1 w-full">
          <Suspense
            fallback={
              <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
                <div className="w-8 h-8 border-2 border-[#c6a87c] border-t-transparent rounded-full animate-spin" />
                <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">
                  A carregar painel de gestão...
                </span>
              </div>
            }
          >
            <DashboardApp />
          </Suspense>
        </div>
      </div>
    );
  }

  return (
    <div
      id="stak-website"
      className="min-h-screen bg-[#090a0c] dark:bg-[#090a0c] light:bg-[#f8f7f5] text-[#e8e8ea] dark:text-[#e8e8ea] light:text-[#18191d] flex flex-col selection:bg-[#c6a87c] selection:text-black font-sans opacity-100"
    >
      {/* Dynamic SEO Meta, OpenGraph, Canonical & Schema.org JSON-LD */}
      <SeoHeadManager
        currentPage={currentPage}
        selectedProject={selectedProject}
      />

      {/* 1. Uncluttered, Focused Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        onOpenBriefing={() => handleOpenBriefing()}
      />

      {/* 2. Main Multi-Page Container */}
      <main className="flex-1">
        {currentPage === 'inicio' && (
          <HomePage
            onNavigate={navigateTo}
            onSelectProject={(proj) => setSelectedProject(proj)}
            onSelectServiceForBriefing={(title) => handleOpenBriefing(title)}
          />
        )}

        {currentPage === 'sobre-nos' && (
          <AtelierPage onNavigate={navigateTo} />
        )}

        {currentPage === 'projectos' && (
          <ProjectsPage
            onNavigate={navigateTo}
            onSelectProject={(proj) => setSelectedProject(proj)}
            onSelectServiceForBriefing={(title) => handleOpenBriefing(title)}
          />
        )}

        {currentPage === 'servicos' && (
          <ServicesPage
            onNavigate={navigateTo}
            onSelectServiceForBriefing={(title) => handleOpenBriefing(title)}
          />
        )}

        {currentPage === 'artigos' && (
          <ArticlesPage onNavigate={navigateTo} />
        )}

        {currentPage === 'contactos' && (
          <ContactsPage
            onNavigate={navigateTo}
            preselectedService={preselectedService}
          />
        )}

        {currentPage === '404' && (
          <NotFoundPage onNavigate={navigateTo} />
        )}
      </main>

      {/* 3. Footer with Complete Links & Inactive # Panel Access */}
      <Footer
        onNavigate={navigateTo}
        onOpenBriefing={() => handleOpenBriefing()}
      />

      {/* 4. High-Resolution Architectural Project Dossier Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onSelectForBriefing={(title) => {
          setSelectedProject(null);
          handleOpenBriefing(title);
        }}
      />

      {/* 5. Restricted Management CMS Modal */}
      <CmsModal />

      {/* 6. Dedicated Floating WhatsApp Action Button */}
      <FloatingWhatsApp />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CmsProvider>
          <StakApp />
        </CmsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

