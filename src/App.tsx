/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
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
import { Project, NavPage } from './types';
import DashboardApp from './dashboard/src/App';

function StakApp() {
  const { isDark, theme } = useTheme();
  const { atelierInfo } = useCms();
  const { isAuthenticated, user, signOut } = useAuth();

  // Dynamic SEO Metatags & Favicon Synchronization
  useEffect(() => {
    const seo = atelierInfo?.seoMeta;
    if (seo?.metaTitle) {
      document.title = seo.metaTitle;
    } else if (atelierInfo?.name) {
      document.title = `${atelierInfo.name} | Arquitectura & Design de Interiores`;
    }

    if (seo?.metaDescription) {
      let descMeta = document.querySelector('meta[name="description"]');
      if (!descMeta) {
        descMeta = document.createElement('meta');
        descMeta.setAttribute('name', 'description');
        document.head.appendChild(descMeta);
      }
      descMeta.setAttribute('content', seo.metaDescription);

      let ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', seo.metaDescription);
    }

    if (seo?.metaKeywords) {
      let kwMeta = document.querySelector('meta[name="keywords"]');
      if (!kwMeta) {
        kwMeta = document.createElement('meta');
        kwMeta.setAttribute('name', 'keywords');
        document.head.appendChild(kwMeta);
      }
      kwMeta.setAttribute('content', seo.metaKeywords);
    }

    if (seo?.ogImage) {
      let ogImg = document.querySelector('meta[property="og:image"]');
      if (!ogImg) {
        ogImg = document.createElement('meta');
        ogImg.setAttribute('property', 'og:image');
        document.head.appendChild(ogImg);
      }
      ogImg.setAttribute('content', seo.ogImage);
    }

    if (atelierInfo?.favicon) {
      let fav = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
      if (!fav) {
        fav = document.createElement('link');
        fav.rel = 'icon';
        document.head.appendChild(fav);
      }
      fav.href = atelierInfo.favicon;
    }
  }, [atelierInfo]);

  // Navigation state initialized from URL hash or default to 'inicio'
  const [currentPage, setCurrentPage] = useState<NavPage>(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'admin' || hash === 'dashboard' || hash === 'painel') return 'admin';
    if (hash === 'sobre-nos' || hash === 'atelier') return 'sobre-nos';
    if (hash === 'projectos' || hash === 'portfolio') return 'projectos';
    if (hash === 'servicos' || hash === 'especialidades') return 'servicos';
    if (hash === 'artigos' || hash === 'publicacoes') return 'artigos';
    if (hash === 'contactos' || hash === 'briefing') return 'contactos';
    return 'inicio';
  });

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
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Listen to hash changes (back/forward buttons)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'admin' || hash === 'dashboard' || hash === 'painel') {
        setCurrentPage('admin');
      } else if (hash === 'sobre-nos' || hash === 'atelier') {
        setCurrentPage('sobre-nos');
      } else if (hash === 'projectos' || hash === 'portfolio') {
        setCurrentPage('projectos');
      } else if (hash === 'servicos' || hash === 'especialidades') {
        setCurrentPage('servicos');
      } else if (hash === 'artigos' || hash === 'publicacoes') {
        setCurrentPage('artigos');
      } else if (hash === 'contactos' || hash === 'briefing') {
        setCurrentPage('contactos');
      } else {
        setCurrentPage('inicio');
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

  if (currentPage === 'admin') {
    if (!isAuthenticated) {
      return <AdminLogin onBackToWebsite={() => navigateTo('inicio')} />;
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
              onClick={() => signOut()}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-gray-600 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer text-xs font-medium"
            >
              <span>Terminar Sessão</span>
            </button>

            <button
              type="button"
              onClick={() => navigateTo('inicio')}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#111827] hover:bg-black text-white font-medium rounded-lg transition-colors cursor-pointer text-xs shadow-xs"
              style={{ color: '#ffffff' }}
            >
              <span style={{ color: '#ffffff' }}>← Voltar ao Website</span>
            </button>
          </div>
        </div>

        {/* Real Admin Dashboard */}
        <div className="flex-1 w-full">
          <DashboardApp />
        </div>
      </div>
    );
  }

  return (
    <div id="stak-website" className="min-h-screen bg-[#090a0c] dark:bg-[#090a0c] light:bg-[#f8f7f5] text-[#e8e8ea] dark:text-[#e8e8ea] light:text-[#18191d] flex flex-col selection:bg-[#c6a87c] selection:text-black font-sans transition-colors duration-300">
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

