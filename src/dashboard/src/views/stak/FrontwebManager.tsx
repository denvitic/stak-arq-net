import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useCms } from '@/src/context/CmsContext';
import { SuccessModal } from '@/src/dashboard/src/components/SuccessModal';
import { ImagePickerInput } from '@/src/dashboard/src/components/ImagePickerInput';
import {
  SitePagesContent,
  HomePageContent,
  AtelierPageContent,
  ProjectsPageContent,
  ServicesPageContent,
  ArticlesPageContent,
  ContactsPageContent,
  MethodologyStep,
  FaqItem,
} from '@/src/types';
import { initialMethodology, initialFaqs } from '@/src/data/initialData';

interface PageCardMeta {
  key: keyof SitePagesContent;
  name: string;
  route: string;
  description: string;
  sectionsCount: number;
  badge: string;
  icon: string;
}

const PAGES_LIST: PageCardMeta[] = [
  {
    key: 'home',
    name: 'Página Inicial (Home)',
    route: '#home',
    description: 'Hero vídeo/slideshow, síntese do atelier, catálogo de obras, tectónica e CTA de briefing.',
    sectionsCount: 7,
    badge: 'Principal',
    icon: 'solar:home-smile-linear',
  },
  {
    key: 'atelier',
    name: 'O Atelier & Identidade',
    route: '#atelier',
    description: 'Manifesto arquitectónico, pilares, história/trajectória e equipa de liderança.',
    sectionsCount: 5,
    badge: 'Institucional',
    icon: 'solar:palette-round-linear',
  },
  {
    key: 'projects',
    name: 'Projectos & Portfólio',
    route: '#projectos',
    description: 'Hero com imagem de fundo, introdução ao catálogo e bloco de apelo à acção.',
    sectionsCount: 3,
    badge: 'Portfólio',
    icon: 'solar:buildings-3-linear',
  },
  {
    key: 'services',
    name: 'Serviços & Especialidades',
    route: '#servicos',
    description: 'Hero com especialidades em destaque, catálogo, metodologia, perguntas frequentes (FAQ) e CTA.',
    sectionsCount: 5,
    badge: 'Serviços',
    icon: 'solar:shield-check-linear',
  },
  {
    key: 'articles',
    name: 'Artigos & Publicações',
    route: '#artigos',
    description: 'Hero com fotografia de fundo, introdução editorial e formulário de newsletter.',
    sectionsCount: 3,
    badge: 'Publicações',
    icon: 'solar:document-text-linear',
  },
  {
    key: 'contacts',
    name: 'Contactos & Briefing',
    route: '#contactos',
    description: 'Hero, morada em Luanda, contactos telefónicos/WhatsApp e introdução ao briefing.',
    sectionsCount: 3,
    badge: 'Comunicação',
    icon: 'solar:phone-calling-linear',
  },
];

export default function FrontwebManager() {
  const { pagesContent, updatePageContent } = useCms();
  const [selectedPageKey, setSelectedPageKey] = useState<keyof SitePagesContent | null>(null);
  const [activeSectionTab, setActiveSectionTab] = useState<string>('hero');

  // Success Modal State
  const [successModal, setSuccessModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    url: string;
    pageLabel: string;
  }>({
    isOpen: false,
    title: '',
    message: '',
    url: '/',
    pageLabel: '',
  });

  // Local draft copies for each page
  const [homeDraft, setHomeDraft] = useState<HomePageContent>(() => pagesContent.home);
  const [atelierDraft, setAtelierDraft] = useState<AtelierPageContent>(() => pagesContent.atelier);
  const [projectsDraft, setProjectsDraft] = useState<ProjectsPageContent>(() => pagesContent.projects);
  const [servicesDraft, setServicesDraft] = useState<ServicesPageContent>(() => pagesContent.services);
  const [articlesDraft, setArticlesDraft] = useState<ArticlesPageContent>(() => pagesContent.articles);
  const [contactsDraft, setContactsDraft] = useState<ContactsPageContent>(() => pagesContent.contacts);

  // Sync draft when selected page changes
  const handleSelectPage = (key: keyof SitePagesContent) => {
    setSelectedPageKey(key);
    setActiveSectionTab('hero');
    if (key === 'home') setHomeDraft(pagesContent.home);
    if (key === 'atelier') setAtelierDraft(pagesContent.atelier);
    if (key === 'projects') setProjectsDraft(pagesContent.projects);
    if (key === 'services') setServicesDraft(pagesContent.services);
    if (key === 'articles') setArticlesDraft(pagesContent.articles);
    if (key === 'contacts') setContactsDraft(pagesContent.contacts);
  };

  const handleSavePage = (key: keyof SitePagesContent) => {
    let pageName = '';
    let pageUrl = '/';

    if (key === 'home') {
      updatePageContent('home', homeDraft);
      pageName = 'Página Inicial (Home)';
      pageUrl = '#home';
    } else if (key === 'atelier') {
      updatePageContent('atelier', atelierDraft);
      pageName = 'O Atelier & Identidade';
      pageUrl = '#atelier';
    } else if (key === 'projects') {
      updatePageContent('projects', projectsDraft);
      pageName = 'Projectos & Portfólio';
      pageUrl = '#projectos';
    } else if (key === 'services') {
      updatePageContent('services', servicesDraft);
      pageName = 'Serviços & Especialidades';
      pageUrl = '#servicos';
    } else if (key === 'articles') {
      updatePageContent('articles', articlesDraft);
      pageName = 'Artigos & Publicações';
      pageUrl = '#artigos';
    } else if (key === 'contacts') {
      updatePageContent('contacts', contactsDraft);
      pageName = 'Contactos & Briefing';
      pageUrl = '#contactos';
    }

    setSuccessModal({
      isOpen: true,
      title: 'Secções Guardadas com Sucesso!',
      message: `Todas as alterações na página "${pageName}" foram gravadas e já estão visíveis no website público.`,
      url: pageUrl,
      pageLabel: `Ver ${pageName} no Site`,
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-16">
      {/* Success Modal */}
      <SuccessModal
        isOpen={successModal.isOpen}
        onClose={() => setSuccessModal((prev) => ({ ...prev, isOpen: false }))}
        onContinue={() => setSuccessModal((prev) => ({ ...prev, isOpen: false }))}
        title={successModal.title}
        message={successModal.message}
        viewWebsiteUrl={successModal.url}
        viewWebsiteLabel={successModal.pageLabel}
      />

      {/* Main Container */}
      {!selectedPageKey ? (
        /* PAGE OVERVIEW LIST */
        <div className="space-y-6">
          {/* Header Banner */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-2xs p-6 sm:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono text-[#c6a87c] uppercase tracking-wider">
                  <span>Painel Administrativo</span>
                  <span>/</span>
                  <span className="text-gray-900 font-semibold">Front Web CMS</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-heading">
                  Gestão Integral de Páginas & Secções
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 max-w-2xl">
                  Personalize todos os textos, títulos, fotografias, vídeos, botões de apelo à acção (CTA) e respetivos links em todas as páginas públicas do website STAK.
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <a
                  href="#home"
                  className="px-4 py-2.5 bg-gray-900 hover:bg-black text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-sm transition-all"
                >
                  <Icon icon="solar:link-circle-linear" className="text-[#c6a87c]" width="16" />
                  <span>Visualizar Website Público</span>
                </a>
              </div>
            </div>
          </div>

          {/* Pages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PAGES_LIST.map((page) => (
              <div
                key={page.key}
                onClick={() => handleSelectPage(page.key)}
                className="group bg-white rounded-2xl border border-gray-200 shadow-2xs hover:shadow-md hover:border-[#c6a87c]/60 transition-all duration-200 p-6 flex flex-col justify-between cursor-pointer relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-[#c6a87c] group-hover:bg-[#c6a87c] group-hover:text-black transition-colors">
                      <Icon icon={page.icon} width="22" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-[#c6a87c]/10 text-[#c6a87c] border border-[#c6a87c]/20">
                      {page.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-gray-900 font-heading group-hover:text-[#c6a87c] transition-colors">
                    {page.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                    {page.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-gray-400">
                    {page.sectionsCount} secções editáveis
                  </span>
                  <span className="text-xs font-semibold text-[#c6a87c] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    <span>Gerir Secções</span>
                    <Icon icon="solar:arrow-right-linear" width="14" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* PAGE EDITOR VIEW */
        <div className="space-y-6">
          {/* Top Navigation Bar */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-2xs p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSelectedPageKey(null)}
                className="p-2 rounded-xl border border-gray-200 hover:bg-gray-100 text-gray-600 transition-colors cursor-pointer"
                title="Voltar à lista de páginas"
              >
                <Icon icon="solar:arrow-left-linear" width="20" />
              </button>

              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
                  <span onClick={() => setSelectedPageKey(null)} className="cursor-pointer hover:underline">
                    Frontweb
                  </span>
                  <span>/</span>
                  <span className="text-[#c6a87c] font-semibold capitalize">{selectedPageKey}</span>
                </div>
                <h2 className="text-lg font-bold text-gray-900 font-heading">
                  {PAGES_LIST.find((p) => p.key === selectedPageKey)?.name}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <a
                href={PAGES_LIST.find((p) => p.key === selectedPageKey)?.route || '#home'}
                className="px-3.5 py-2 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-medium flex items-center gap-1.5 transition-colors"
              >
                <Icon icon="solar:eye-linear" width="15" />
                <span>Ver no Site</span>
              </a>

              <button
                type="button"
                onClick={() => handleSavePage(selectedPageKey)}
                className="px-5 py-2 bg-[#c6a87c] hover:bg-[#b59567] text-black font-semibold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Icon icon="solar:diskette-bold" width="16" />
                <span>Guardar Todas as Secções</span>
              </button>
            </div>
          </div>

          {/* PAGE CONTENT ACCORDION / TABS */}
          {selectedPageKey === 'home' && (
            <HomePageEditor
              draft={homeDraft}
              onChange={setHomeDraft}
              activeSection={activeSectionTab}
              onSectionChange={setActiveSectionTab}
              onSave={() => handleSavePage('home')}
            />
          )}

          {selectedPageKey === 'atelier' && (
            <AtelierPageEditor
              draft={atelierDraft}
              onChange={setAtelierDraft}
              activeSection={activeSectionTab}
              onSectionChange={setActiveSectionTab}
              onSave={() => handleSavePage('atelier')}
            />
          )}

          {selectedPageKey === 'projects' && (
            <ProjectsPageEditor
              draft={projectsDraft}
              onChange={setProjectsDraft}
              activeSection={activeSectionTab}
              onSectionChange={setActiveSectionTab}
              onSave={() => handleSavePage('projects')}
            />
          )}

          {selectedPageKey === 'services' && (
            <ServicesPageEditor
              draft={servicesDraft}
              onChange={setServicesDraft}
              activeSection={activeSectionTab}
              onSectionChange={setActiveSectionTab}
              onSave={() => handleSavePage('services')}
            />
          )}

          {selectedPageKey === 'articles' && (
            <ArticlesPageEditor
              draft={articlesDraft}
              onChange={setArticlesDraft}
              activeSection={activeSectionTab}
              onSectionChange={setActiveSectionTab}
              onSave={() => handleSavePage('articles')}
            />
          )}

          {selectedPageKey === 'contacts' && (
            <ContactsPageEditor
              draft={contactsDraft}
              onChange={setContactsDraft}
              activeSection={activeSectionTab}
              onSectionChange={setActiveSectionTab}
              onSave={() => handleSavePage('contacts')}
            />
          )}
        </div>
      )}
    </div>
  );
}

/* =========================================================================
   1. HOME PAGE EDITOR
   ========================================================================= */
function HomePageEditor({
  draft,
  onChange,
  activeSection,
  onSectionChange,
  onSave,
}: {
  draft: HomePageContent;
  onChange: React.Dispatch<React.SetStateAction<HomePageContent>>;
  activeSection: string;
  onSectionChange: (sec: string) => void;
  onSave: () => void;
}) {
  const { projects, updateProject, toggleFeaturedProject } = useCms();
  const [editingSlideProjectId, setEditingSlideProjectId] = useState<string | null>(null);

  const heroProjects = projects.filter((p) => p.featured).slice(0, 4);
  const displayHeroProjects = heroProjects.length > 0 ? heroProjects : projects.slice(0, 4);
  const availableProjects = projects.filter((p) => !displayHeroProjects.some((hp) => hp.id === p.id));

  const handleMoveSlide = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= displayHeroProjects.length) return;
    
    // Create new order
    const updated = [...displayHeroProjects];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    // Apply updated order by syncing featured status and dates/ordering
    updated.forEach((proj, idx) => {
      updateProject({
        ...proj,
        featured: true,
      });
    });
  };

  const sections = [
    { id: 'hero', label: '1. Hero & Slideshow', icon: 'solar:videocamera-record-bold' },
    { id: 'synthesis', label: '2. Síntese do Atelier', icon: 'solar:compass-bold' },
    { id: 'featured', label: '3. Projectos Destaque', icon: 'solar:buildings-bold' },
    { id: 'materials', label: '4. Tectónica & Materiais', icon: 'solar:layers-bold' },
    { id: 'beforeAfter', label: '5. Antes & Depois', icon: 'solar:slider-minimalistic-horizontal-bold' },
    { id: 'testimonials', label: '6. Testemunhos', icon: 'solar:chat-round-like-bold' },
    { id: 'cta', label: '7. Bloco Final de Contacto (CTA)', icon: 'solar:phone-calling-bold' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Sidebar Sections navigation */}
      <div className="lg:col-span-3 space-y-1 bg-white p-3 rounded-2xl border border-gray-200 shadow-2xs h-fit">
        <div className="px-3 py-2 text-[11px] font-mono uppercase text-gray-400 tracking-wider">
          Secções da Página Inicial
        </div>
        {sections.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => onSectionChange(s.id)}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-all cursor-pointer ${
              activeSection === s.id
                ? 'bg-[#c6a87c] text-black shadow-xs'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Icon icon={s.icon} width="16" />
            <span className="truncate">{s.label}</span>
          </button>
        ))}
      </div>

      {/* Editor Main Canvas */}
      <div className="lg:col-span-9 bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-2xs space-y-6">
        {/* HERO SECTION */}
        {activeSection === 'hero' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#c6a87c]/15 text-[#c6a87c] uppercase tracking-wider">
                    Secção de Abertura
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 font-heading">
                  Hero Principal (Vídeo, Títulos & Slideshow Interactivo)
                </h3>
                <p className="text-xs text-gray-500">
                  Edite os títulos monumentais, botões de chamada à acção (CTA), vídeo de fundo geral e a ordem dos projectos em exibição no carrossel de slides.
                </p>
              </div>

              <label className="flex items-center gap-2 cursor-pointer bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200 self-start sm:self-auto shrink-0">
                <input
                  type="checkbox"
                  checked={draft.hero.enabled ?? true}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      hero: { ...prev.hero, enabled: e.target.checked },
                    }))
                  }
                  className="rounded text-[#c6a87c] focus:ring-[#c6a87c]"
                />
                <span className="text-xs font-semibold text-gray-700">Secção Activa</span>
              </label>
            </div>

            {/* 1. Gestão dos Slides da Hero */}
            <div className="p-5 rounded-2xl border border-gray-200 bg-gray-50/70 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <Icon icon="solar:slider-vertical-bold" className="text-[#c6a87c]" width="18" />
                    <h4 className="text-sm font-bold text-gray-900">
                      Projectos & Mídias dos Slides da Hero (Carrossel Interactivo)
                    </h4>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    O frontweb exibe até 4 projectos em destaque nos slides 01 a 04 com paginação, dados técnicos e vídeo/fotografia.
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-gray-600 bg-white px-2.5 py-1 rounded-lg border border-gray-200 shadow-2xs self-start">
                  {displayHeroProjects.length}/4 Slides Activos
                </span>
              </div>

              {/* Lista dos Slides Activos */}
              <div className="space-y-3">
                {displayHeroProjects.map((proj, idx) => (
                  <div
                    key={proj.id}
                    className="p-4 rounded-xl border border-gray-200 bg-white shadow-2xs space-y-3 transition-all hover:border-[#c6a87c]/50"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-lg bg-gray-900 text-[#c6a87c] flex flex-col items-center justify-center shrink-0 font-mono font-bold text-xs shadow-2xs">
                          <span>0{idx + 1}</span>
                        </div>

                        <div className="w-16 h-12 rounded-lg overflow-hidden border border-gray-200 bg-gray-100 shrink-0 relative group">
                          <img
                            src={proj.coverImage}
                            alt={proj.title}
                            className="w-full h-full object-cover"
                          />
                          {proj.videoUrl && (
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white">
                              <Icon icon="solar:play-circle-bold" width="16" />
                            </div>
                          )}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h5 className="text-xs font-bold text-gray-900 truncate">
                              {proj.title}
                            </h5>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                              {proj.category}
                            </span>
                            {proj.videoUrl ? (
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold flex items-center gap-1">
                                <Icon icon="solar:videocamera-record-bold" width="12" />
                                Vídeo MP4
                              </span>
                            ) : (
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold flex items-center gap-1">
                                <Icon icon="solar:camera-bold" width="12" />
                                Foto HD
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-gray-500 truncate mt-0.5">
                            {proj.fichaTecnica?.localizacao || 'Luanda'} • {proj.fichaTecnica?.tipologia || proj.categoryLabel} • {proj.fichaTecnica?.ano || '2024'} • {proj.fichaTecnica?.area || ''}
                          </p>
                        </div>
                      </div>

                      {/* Control Actions */}
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => handleMoveSlide(idx, 'up')}
                          title="Subir Slide (Mover para posição anterior)"
                          className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all"
                        >
                          <Icon icon="solar:arrow-up-linear" width="14" />
                        </button>
                        <button
                          type="button"
                          disabled={idx === displayHeroProjects.length - 1}
                          onClick={() => handleMoveSlide(idx, 'down')}
                          title="Descer Slide (Mover para próxima posição)"
                          className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all"
                        >
                          <Icon icon="solar:arrow-down-linear" width="14" />
                        </button>

                        <button
                          type="button"
                          onClick={() => setEditingSlideProjectId(editingSlideProjectId === proj.id ? null : proj.id)}
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all ${
                            editingSlideProjectId === proj.id
                              ? 'bg-gray-900 text-white'
                              : 'bg-[#c6a87c]/15 text-[#8f744e] hover:bg-[#c6a87c]/25'
                          }`}
                        >
                          <Icon icon="solar:pen-2-bold" width="13" />
                          <span>Mídia do Slide</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => toggleFeaturedProject(proj.id)}
                          title="Remover este projecto dos slides da Hero"
                          className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 cursor-pointer transition-all"
                        >
                          <Icon icon="solar:trash-bin-trash-bold" width="14" />
                        </button>
                      </div>
                    </div>

                    {/* Collapsible Slide Media Editor */}
                    {editingSlideProjectId === proj.id && (
                      <div className="pt-3 border-t border-gray-100 space-y-4 animate-fade-in bg-gray-50/70 p-4 rounded-xl border border-gray-200">
                        {/* Selector de Modo de Mídia para o Slide */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-lg border border-gray-200">
                          <div>
                            <span className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                              <Icon
                                icon={proj.videoUrl ? 'solar:videocamera-record-bold' : 'solar:gallery-bold'}
                                className={proj.videoUrl ? 'text-emerald-600' : 'text-[#c6a87c]'}
                                width="16"
                              />
                              Modo de Exibição deste Slide:
                            </span>
                            <p className="text-[11px] text-gray-500">
                              {proj.videoUrl
                                ? 'Actualmente exibe vídeo em loop contínuo sobre a fotografia de capa.'
                                : 'Actualmente exibe apenas fotografia estática em alta resolução (sem vídeo sobreposto).'}
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            {proj.videoUrl && (
                              <button
                                type="button"
                                onClick={() => updateProject({ ...proj, videoUrl: '' })}
                                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                                title="Remover vídeo e deixar apenas a fotografia"
                              >
                                <Icon icon="solar:trash-bin-trash-bold" width="13" />
                                <span>Remover Vídeo (Usar Apenas Foto)</span>
                              </button>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <ImagePickerInput
                            label="Fotografia de Capa do Slide (HD)"
                            description="Imagem de grande escala exibida no slide (ou como fundo se houver vídeo)"
                            value={proj.coverImage}
                            onChange={(url) => updateProject({ ...proj, coverImage: url })}
                            acceptedType="image"
                          />

                          <div className="space-y-2">
                            <ImagePickerInput
                              label="Vídeo do Slide (MP4 Opcional)"
                              description="Deixe em branco para usar APENAS a fotografia acima sem sobreposição de vídeo"
                              value={proj.videoUrl || ''}
                              onChange={(url) => updateProject({ ...proj, videoUrl: url })}
                              acceptedType="video"
                              placeholder="/videos/hero-interior.mp4"
                            />
                            {proj.videoUrl && (
                              <div className="flex items-center justify-between text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                                <span className="flex items-center gap-1 font-medium">
                                  <Icon icon="solar:check-circle-bold" width="13" />
                                  Vídeo activo neste slide
                                </span>
                                <button
                                  type="button"
                                  onClick={() => updateProject({ ...proj, videoUrl: '' })}
                                  className="text-xs text-rose-600 hover:text-rose-800 underline font-semibold cursor-pointer"
                                >
                                  Limpar vídeo
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Adicionar outro projecto ao slideshow */}
              {availableProjects.length > 0 && displayHeroProjects.length < 4 && (
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-gray-200">
                    <div>
                      <span className="text-xs font-semibold text-gray-800">
                        Adicionar projecto existente ao Slideshow do Hero:
                      </span>
                      <p className="text-[11px] text-gray-500">
                        Escolha entre os projectos do catálogo para incluir no carrossel de abertura.
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <select
                        id="selectHeroProject"
                        className="text-xs px-3 py-1.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#c6a87c] focus:outline-none"
                        defaultValue=""
                        onChange={(e) => {
                          if (e.target.value) {
                            toggleFeaturedProject(e.target.value);
                            e.target.value = '';
                          }
                        }}
                      >
                        <option value="" disabled>
                          -- Seleccionar Projecto --
                        </option>
                        {availableProjects.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.title} ({p.category})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Títulos, Badges & Tipografia Monumental */}
            <div className="p-5 rounded-2xl border border-gray-200 bg-white space-y-4">
              <div className="border-b border-gray-100 pb-3">
                <h4 className="text-sm font-bold text-gray-900 font-heading">
                  Textos Monumentais & Botões de Acção (CTA)
                </h4>
                <p className="text-xs text-gray-500">
                  Manchete de abertura, subtítulo descritivo e links de contacto.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-semibold text-gray-700">Etiqueta Superior (Badge Tag)</label>
                  <input
                    type="text"
                    value={draft.hero.badgeTag}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        hero: { ...prev.hero, badgeTag: e.target.value },
                      }))
                    }
                    className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">Título Linha 1</label>
                  <input
                    type="text"
                    value={draft.hero.titleLine1}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        hero: { ...prev.hero, titleLine1: e.target.value },
                      }))
                    }
                    className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">Linha 2 (Texto em Itálico)</label>
                  <input
                    type="text"
                    value={draft.hero.titleLine2Italic}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        hero: { ...prev.hero, titleLine2Italic: e.target.value },
                      }))
                    }
                    className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-semibold text-gray-700">Linha 2 (Destaque Cromático / Gradiente Dourado)</label>
                  <input
                    type="text"
                    value={draft.hero.titleLine2Gradient}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        hero: { ...prev.hero, titleLine2Gradient: e.target.value },
                      }))
                    }
                    className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-semibold text-gray-700">Descrição Conceitual</label>
                  <textarea
                    rows={3}
                    value={draft.hero.description}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        hero: { ...prev.hero, description: e.target.value },
                      }))
                    }
                    className="w-full text-xs p-3 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none"
                  />
                </div>

                {/* CTAs with links */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">Texto do Botão Primário (CTA)</label>
                  <input
                    type="text"
                    value={draft.hero.ctaPrimaryLabel}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        hero: { ...prev.hero, ctaPrimaryLabel: e.target.value },
                      }))
                    }
                    className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">Link do Botão Primário</label>
                  <input
                    type="text"
                    placeholder="#portfolio ou /projectos"
                    value={draft.hero.ctaPrimaryLink || ''}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        hero: { ...prev.hero, ctaPrimaryLink: e.target.value },
                      }))
                    }
                    className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">Texto do Botão Secundário</label>
                  <input
                    type="text"
                    value={draft.hero.ctaSecondaryLabel}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        hero: { ...prev.hero, ctaSecondaryLabel: e.target.value },
                      }))
                    }
                    className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">Link do Botão Secundário</label>
                  <input
                    type="text"
                    placeholder="#contactos ou #briefing"
                    value={draft.hero.ctaSecondaryLink || ''}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        hero: { ...prev.hero, ctaSecondaryLink: e.target.value },
                      }))
                    }
                    className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none font-mono"
                  />
                </div>

                {/* Hero Video Picker */}
                <div className="sm:col-span-2 pt-2 space-y-2">
                  <ImagePickerInput
                    label="Vídeo Geral de Fundo da Hero (MP4 de Reserva Opcional)"
                    acceptedType="video"
                    value={draft.hero.videoUrl}
                    onChange={(url) =>
                      onChange((prev) => ({
                        ...prev,
                        hero: { ...prev.hero, videoUrl: url },
                      }))
                    }
                    description="Vídeo cinematográfico geral caso um slide específico não tenha vídeo próprio. Deixe em branco se preferir exibir apenas fotografias."
                  />
                  {draft.hero.videoUrl && (
                    <div className="flex items-center justify-between text-[11px] text-amber-800 bg-amber-50 px-2.5 py-1.5 rounded-md border border-amber-200">
                      <span>Vídeo geral de reserva configurado: <strong className="font-mono text-[10px]">{draft.hero.videoUrl}</strong></span>
                      <button
                        type="button"
                        onClick={() =>
                          onChange((prev) => ({
                            ...prev,
                            hero: { ...prev.hero, videoUrl: '' },
                          }))
                        }
                        className="text-xs text-rose-600 hover:text-rose-800 underline font-semibold cursor-pointer"
                      >
                        Limpar vídeo geral
                      </button>
                    </div>
                  )}
                </div>

                {/* Hero Video Poster */}
                <div className="sm:col-span-2 pt-2">
                  <ImagePickerInput
                    label="Fotografia Poster de Pré-Carregamento Geral"
                    acceptedType="image"
                    value={draft.hero.videoPoster}
                    onChange={(url) =>
                      onChange((prev) => ({
                        ...prev,
                        hero: { ...prev.hero, videoPoster: url },
                      }))
                    }
                    description="Imagem exibida instantaneamente enquanto os vídeos são transmitidos."
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SYNTHESIS SECTION */}
        {activeSection === 'synthesis' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-gray-900 font-heading">
                  Síntese do Atelier (Curated Introduction)
                </h3>
                <p className="text-xs text-gray-500">
                  Secção apresentando a identidade e fundamentos conceituais do Atelier STAK.
                </p>
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={draft.sections.synthesis.enabled}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        synthesis: { ...prev.sections.synthesis, enabled: e.target.checked },
                      },
                    }))
                  }
                  className="rounded text-[#c6a87c] focus:ring-[#c6a87c]"
                />
                <span className="text-xs font-semibold text-gray-700">Secção Activa</span>
              </label>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Etiqueta / Tag</label>
                <input
                  type="text"
                  value={draft.sections.synthesis.tag}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        synthesis: { ...prev.sections.synthesis, tag: e.target.value },
                      },
                    }))
                  }
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Título Principal</label>
                <input
                  type="text"
                  value={draft.sections.synthesis.title}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        synthesis: { ...prev.sections.synthesis, title: e.target.value },
                      },
                    }))
                  }
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Descrição Textual</label>
                <textarea
                  rows={4}
                  value={draft.sections.synthesis.description}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        synthesis: { ...prev.sections.synthesis, description: e.target.value },
                      },
                    }))
                  }
                  className="w-full text-xs p-3 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">Destaque 1 - Título</label>
                  <input
                    type="text"
                    value={draft.sections.synthesis.feature1Title || 'Sustentabilidade Bioclimática'}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        sections: {
                          ...prev.sections,
                          synthesis: { ...prev.sections.synthesis, feature1Title: e.target.value },
                        },
                      }))
                    }
                    className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">Destaque 1 - Descrição</label>
                  <input
                    type="text"
                    value={draft.sections.synthesis.feature1Desc || 'Ventilação passiva e controlo solar térmico.'}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        sections: {
                          ...prev.sections,
                          synthesis: { ...prev.sections.synthesis, feature1Desc: e.target.value },
                        },
                      }))
                    }
                    className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">Destaque 2 - Título</label>
                  <input
                    type="text"
                    value={draft.sections.synthesis.feature2Title || 'Fiscalização & Conformidade'}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        sections: {
                          ...prev.sections,
                          synthesis: { ...prev.sections.synthesis, feature2Title: e.target.value },
                        },
                      }))
                    }
                    className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">Destaque 2 - Descrição</label>
                  <input
                    type="text"
                    value={draft.sections.synthesis.feature2Desc || 'Acompanhamento rigoroso de estaleiro.'}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        sections: {
                          ...prev.sections,
                          synthesis: { ...prev.sections.synthesis, feature2Desc: e.target.value },
                        },
                      }))
                    }
                    className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">Texto do Botão</label>
                  <input
                    type="text"
                    value={draft.sections.synthesis.buttonLabel}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        sections: {
                          ...prev.sections,
                          synthesis: { ...prev.sections.synthesis, buttonLabel: e.target.value },
                        },
                      }))
                    }
                    className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">Link do Botão</label>
                  <input
                    type="text"
                    placeholder="#atelier ou #sobre-nos"
                    value={draft.sections.synthesis.buttonLink || ''}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        sections: {
                          ...prev.sections,
                          synthesis: { ...prev.sections.synthesis, buttonLink: e.target.value },
                        },
                      }))
                    }
                    className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none font-mono"
                  />
                </div>
              </div>

              {/* Side Image */}
              <ImagePickerInput
                label="Fotografia em Destaque da Síntese"
                value={draft.sections.synthesis.image}
                onChange={(url) =>
                  onChange((prev) => ({
                    ...prev,
                    sections: {
                      ...prev.sections,
                      synthesis: { ...prev.sections.synthesis, image: url },
                    },
                  }))
                }
                helperText="Selecione da biblioteca ou carregue do seu dispositivo."
              />

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Legenda da Imagem</label>
                <input
                  type="text"
                  value={draft.sections.synthesis.imageCaption}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        synthesis: { ...prev.sections.synthesis, imageCaption: e.target.value },
                      },
                    }))
                  }
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* FEATURED PROJECTS SECTION */}
        {activeSection === 'featured' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-gray-900 font-heading">
                  Projectos em Destaque (Catálogo Seleccionado)
                </h3>
                <p className="text-xs text-gray-500">
                  Cabeçalho da secção onde os projectos marcados como "Destaque" são apresentados.
                </p>
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={draft.sections.featuredProjects.enabled}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        featuredProjects: { ...prev.sections.featuredProjects, enabled: e.target.checked },
                      },
                    }))
                  }
                  className="rounded text-[#c6a87c] focus:ring-[#c6a87c]"
                />
                <span className="text-xs font-semibold text-gray-700">Secção Activa</span>
              </label>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Etiqueta / Tag</label>
                <input
                  type="text"
                  value={draft.sections.featuredProjects.tag}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        featuredProjects: { ...prev.sections.featuredProjects, tag: e.target.value },
                      },
                    }))
                  }
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Título</label>
                <input
                  type="text"
                  value={draft.sections.featuredProjects.title}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        featuredProjects: { ...prev.sections.featuredProjects, title: e.target.value },
                      },
                    }))
                  }
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Descrição</label>
                <textarea
                  rows={3}
                  value={draft.sections.featuredProjects.description}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        featuredProjects: { ...prev.sections.featuredProjects, description: e.target.value },
                      },
                    }))
                  }
                  className="w-full text-xs p-3 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">Texto do Botão</label>
                  <input
                    type="text"
                    value={draft.sections.featuredProjects.buttonLabel}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        sections: {
                          ...prev.sections,
                          featuredProjects: { ...prev.sections.featuredProjects, buttonLabel: e.target.value },
                        },
                      }))
                    }
                    className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">Link do Botão</label>
                  <input
                    type="text"
                    placeholder="#projectos"
                    value={draft.sections.featuredProjects.buttonLink || ''}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        sections: {
                          ...prev.sections,
                          featuredProjects: { ...prev.sections.featuredProjects, buttonLink: e.target.value },
                        },
                      }))
                    }
                    className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MATERIALS & TECTONIC SECTION */}
        {activeSection === 'materials' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-gray-900 font-heading">
                  Materialidade & Rigor Tectónico
                </h3>
                <p className="text-xs text-gray-500">
                  Apresentação dos nobres materiais da arquitectura STAK (betão aparente, madeiras, pedras, vidro).
                </p>
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={draft.sections.materials.enabled}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        materials: { ...prev.sections.materials, enabled: e.target.checked },
                      },
                    }))
                  }
                  className="rounded text-[#c6a87c] focus:ring-[#c6a87c]"
                />
                <span className="text-xs font-semibold text-gray-700">Secção Activa</span>
              </label>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Etiqueta / Tag</label>
                <input
                  type="text"
                  value={draft.sections.materials.tag}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        materials: { ...prev.sections.materials, tag: e.target.value },
                      },
                    }))
                  }
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Título</label>
                <input
                  type="text"
                  value={draft.sections.materials.title}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        materials: { ...prev.sections.materials, title: e.target.value },
                      },
                    }))
                  }
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Descrição</label>
                <textarea
                  rows={3}
                  value={draft.sections.materials.description}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        materials: { ...prev.sections.materials, description: e.target.value },
                      },
                    }))
                  }
                  className="w-full text-xs p-3 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none"
                />
              </div>

              {/* Material Items list */}
              <div className="pt-4 border-t border-gray-100">
                <h4 className="text-xs font-bold text-gray-900 mb-3">Materiais em Exibição</h4>
                <div className="space-y-4">
                  {draft.sections.materials.items?.map((item, idx) => (
                    <div key={item.id} className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-800">Material {idx + 1}: {item.name}</span>
                        <span className="text-[10px] font-mono text-[#c6a87c]">{item.tag}</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-gray-600">Nome do Material</label>
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => {
                              const newItems = [...draft.sections.materials.items];
                              newItems[idx].name = e.target.value;
                              onChange((prev) => ({
                                ...prev,
                                sections: {
                                  ...prev.sections,
                                  materials: { ...prev.sections.materials, items: newItems },
                                },
                              }));
                            }}
                            className="w-full text-xs px-2.5 py-1.5 border border-gray-200 rounded-lg bg-white"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-gray-600">Subtítulo / Tag</label>
                          <input
                            type="text"
                            value={item.tag}
                            onChange={(e) => {
                              const newItems = [...draft.sections.materials.items];
                              newItems[idx].tag = e.target.value;
                              onChange((prev) => ({
                                ...prev,
                                sections: {
                                  ...prev.sections,
                                  materials: { ...prev.sections.materials, items: newItems },
                                },
                              }));
                            }}
                            className="w-full text-xs px-2.5 py-1.5 border border-gray-200 rounded-lg bg-white"
                          />
                        </div>
                      </div>

                      <ImagePickerInput
                        label="Imagem do Material"
                        value={item.image}
                        onChange={(url) => {
                          const newItems = [...draft.sections.materials.items];
                          newItems[idx].image = url;
                          onChange((prev) => ({
                            ...prev,
                            sections: {
                              ...prev.sections,
                              materials: { ...prev.sections.materials, items: newItems },
                            },
                          }));
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* BEFORE & AFTER SECTION */}
        {activeSection === 'beforeAfter' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-gray-900 font-heading">
                  Transformação Arquitectónica: Antes & Depois
                </h3>
                <p className="text-xs text-gray-500">
                  Slider interactivo comparando a fase de fundação/obra cinzenta e a obra concluída.
                </p>
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={draft.sections.beforeAfter.enabled}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        beforeAfter: { ...prev.sections.beforeAfter, enabled: e.target.checked },
                      },
                    }))
                  }
                  className="rounded text-[#c6a87c] focus:ring-[#c6a87c]"
                />
                <span className="text-xs font-semibold text-gray-700">Secção Activa</span>
              </label>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Etiqueta / Tag</label>
                <input
                  type="text"
                  value={draft.sections.beforeAfter.tag}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        beforeAfter: { ...prev.sections.beforeAfter, tag: e.target.value },
                      },
                    }))
                  }
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Título</label>
                <input
                  type="text"
                  value={draft.sections.beforeAfter.title}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        beforeAfter: { ...prev.sections.beforeAfter, title: e.target.value },
                      },
                    }))
                  }
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Descrição</label>
                <textarea
                  rows={3}
                  value={draft.sections.beforeAfter.description}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        beforeAfter: { ...prev.sections.beforeAfter, description: e.target.value },
                      },
                    }))
                  }
                  className="w-full text-xs p-3 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* TESTIMONIALS SECTION */}
        {activeSection === 'testimonials' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-gray-900 font-heading">
                  Testemunhos & Reconhecimento
                </h3>
                <p className="text-xs text-gray-500">
                  Avaliações de proprietários, directores de empresas e prémios do atelier.
                </p>
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={draft.sections.testimonials.enabled}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        testimonials: { ...prev.sections.testimonials, enabled: e.target.checked },
                      },
                    }))
                  }
                  className="rounded text-[#c6a87c] focus:ring-[#c6a87c]"
                />
                <span className="text-xs font-semibold text-gray-700">Secção Activa</span>
              </label>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Etiqueta / Tag</label>
                <input
                  type="text"
                  value={draft.sections.testimonials.tag}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        testimonials: { ...prev.sections.testimonials, tag: e.target.value },
                      },
                    }))
                  }
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Título</label>
                <input
                  type="text"
                  value={draft.sections.testimonials.title}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        testimonials: { ...prev.sections.testimonials, title: e.target.value },
                      },
                    }))
                  }
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Descrição</label>
                <textarea
                  rows={3}
                  value={draft.sections.testimonials.description}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        testimonials: { ...prev.sections.testimonials, description: e.target.value },
                      },
                    }))
                  }
                  className="w-full text-xs p-3 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none"
                />
              </div>

              {/* SUBSECÇÃO 1: TESTEMUNHOS DE CLIENTES */}
              <div className="pt-6 border-t border-gray-100 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 font-heading">
                      Depoimentos de Clientes & Parceiros
                    </h4>
                    <p className="text-xs text-gray-500">
                      Adicione, edite ou remova os testemunhos exibidos no website.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const currentItems = draft.sections.testimonials.items || [];
                      const newItem = {
                        id: `t-${Date.now()}`,
                        quote: 'A STAK demonstrou uma dedicação exemplar do conceito à entrega em estaleiro.',
                        author: 'Novo Cliente',
                        role: 'Proprietário Privado',
                        location: 'Luanda',
                        projectType: 'Moradia Unifamiliar Contemporânea',
                        rating: 5,
                      };
                      onChange((prev) => ({
                        ...prev,
                        sections: {
                          ...prev.sections,
                          testimonials: {
                            ...prev.sections.testimonials,
                            items: [...currentItems, newItem],
                          },
                        },
                      }));
                    }}
                    className="px-3.5 py-2 bg-[#c6a87c]/15 hover:bg-[#c6a87c]/25 text-[#917246] font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer w-fit"
                  >
                    <Icon icon="solar:add-circle-bold" width="16" />
                    <span>Adicionar Novo Testemunho</span>
                  </button>
                </div>

                {/* Lista dos Testemunhos */}
                <div className="space-y-4">
                  {(!draft.sections.testimonials.items || draft.sections.testimonials.items.length === 0) && (
                    <div className="p-4 rounded-xl border border-dashed border-gray-200 text-center text-xs text-gray-400">
                      Nenhum testemunho configurado. Clique no botão acima para adicionar um testemunho.
                    </div>
                  )}

                  {(draft.sections.testimonials.items || []).map((item, idx) => (
                    <div
                      key={item.id || idx}
                      className="p-4 sm:p-5 rounded-xl border border-gray-200 bg-gray-50/70 space-y-3 relative group"
                    >
                      <div className="flex items-center justify-between border-b border-gray-200/70 pb-2.5">
                        <span className="text-xs font-mono font-bold text-[#c6a87c]">
                          Testemunho #{idx + 1}: {item.author || 'Sem Nome'}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = (draft.sections.testimonials.items || []).filter((_, i) => i !== idx);
                            onChange((prev) => ({
                              ...prev,
                              sections: {
                                ...prev.sections,
                                testimonials: {
                                  ...prev.sections.testimonials,
                                  items: updated,
                                },
                              },
                            }));
                          }}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer flex items-center gap-1 text-xs"
                          title="Remover testemunho"
                        >
                          <Icon icon="solar:trash-bin-trash-bold" width="16" />
                          <span className="hidden sm:inline">Remover</span>
                        </button>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-gray-700">Citação / Depoimento</label>
                        <textarea
                          rows={2}
                          value={item.quote}
                          onChange={(e) => {
                            const updated = [...(draft.sections.testimonials.items || [])];
                            updated[idx] = { ...updated[idx], quote: e.target.value };
                            onChange((prev) => ({
                              ...prev,
                              sections: {
                                ...prev.sections,
                                testimonials: { ...prev.sections.testimonials, items: updated },
                              },
                            }));
                          }}
                          className="w-full text-xs p-2.5 border border-gray-200 rounded-xl bg-white focus:border-[#c6a87c] focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-gray-700">Autor / Nome</label>
                          <input
                            type="text"
                            value={item.author}
                            onChange={(e) => {
                              const updated = [...(draft.sections.testimonials.items || [])];
                              updated[idx] = { ...updated[idx], author: e.target.value };
                              onChange((prev) => ({
                                ...prev,
                                sections: {
                                  ...prev.sections,
                                  testimonials: { ...prev.sections.testimonials, items: updated },
                                },
                              }));
                            }}
                            className="w-full text-xs px-2.5 py-1.5 border border-gray-200 rounded-lg bg-white"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-gray-700">Cargo / Título</label>
                          <input
                            type="text"
                            value={item.role}
                            onChange={(e) => {
                              const updated = [...(draft.sections.testimonials.items || [])];
                              updated[idx] = { ...updated[idx], role: e.target.value };
                              onChange((prev) => ({
                                ...prev,
                                sections: {
                                  ...prev.sections,
                                  testimonials: { ...prev.sections.testimonials, items: updated },
                                },
                              }));
                            }}
                            className="w-full text-xs px-2.5 py-1.5 border border-gray-200 rounded-lg bg-white"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-gray-700">Localização</label>
                          <input
                            type="text"
                            value={item.location}
                            onChange={(e) => {
                              const updated = [...(draft.sections.testimonials.items || [])];
                              updated[idx] = { ...updated[idx], location: e.target.value };
                              onChange((prev) => ({
                                ...prev,
                                sections: {
                                  ...prev.sections,
                                  testimonials: { ...prev.sections.testimonials, items: updated },
                                },
                              }));
                            }}
                            className="w-full text-xs px-2.5 py-1.5 border border-gray-200 rounded-lg bg-white"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-gray-700">Tipo de Projecto</label>
                          <input
                            type="text"
                            value={item.projectType}
                            onChange={(e) => {
                              const updated = [...(draft.sections.testimonials.items || [])];
                              updated[idx] = { ...updated[idx], projectType: e.target.value };
                              onChange((prev) => ({
                                ...prev,
                                sections: {
                                  ...prev.sections,
                                  testimonials: { ...prev.sections.testimonials, items: updated },
                                },
                              }));
                            }}
                            className="w-full text-xs px-2.5 py-1.5 border border-gray-200 rounded-lg bg-white"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <label className="text-[11px] font-semibold text-gray-700">Classificação:</label>
                        <select
                          value={item.rating || 5}
                          onChange={(e) => {
                            const updated = [...(draft.sections.testimonials.items || [])];
                            updated[idx] = { ...updated[idx], rating: Number(e.target.value) };
                            onChange((prev) => ({
                              ...prev,
                              sections: {
                                ...prev.sections,
                                testimonials: { ...prev.sections.testimonials, items: updated },
                              },
                            }));
                          }}
                          className="text-xs px-2 py-1 border border-gray-200 rounded-md bg-white text-gray-700"
                        >
                          <option value={5}>5 Estrelas (Máxima)</option>
                          <option value={4}>4 Estrelas (Muito Bom)</option>
                          <option value={3}>3 Estrelas (Bom)</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SUBSECÇÃO 2: GARANTIAS TÉCNICAS & CONFORMIDADE (ex: 100% no GPL) */}
              <div className="pt-6 border-t border-gray-100 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 font-heading">
                      Garantias Técnicas & Conformidade (Cards Inferiores)
                    </h4>
                    <p className="text-xs text-gray-500">
                      Configure os cards como "100% Conformidade no GPL", medições ou fiscalização (adicionar, editar e remover).
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const currentAssurances = draft.sections.testimonials.assurances || [];
                      const newAssurance = {
                        id: `a-${Date.now()}`,
                        title: 'Nova Garantia Técnica',
                        description: 'Garantia de conformidade técnica e rigor construtivo.',
                        icon: 'Award',
                      };
                      onChange((prev) => ({
                        ...prev,
                        sections: {
                          ...prev.sections,
                          testimonials: {
                            ...prev.sections.testimonials,
                            assurances: [...currentAssurances, newAssurance],
                          },
                        },
                      }));
                    }}
                    className="px-3.5 py-2 bg-[#c6a87c]/15 hover:bg-[#c6a87c]/25 text-[#917246] font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer w-fit"
                  >
                    <Icon icon="solar:add-circle-bold" width="16" />
                    <span>Adicionar Card de Garantia</span>
                  </button>
                </div>

                {/* Lista das Garantias */}
                <div className="space-y-4">
                  {(!draft.sections.testimonials.assurances || draft.sections.testimonials.assurances.length === 0) && (
                    <div className="p-4 rounded-xl border border-dashed border-gray-200 text-center text-xs text-gray-400">
                      Nenhuma garantia técnica configurada. Clique no botão acima para adicionar.
                    </div>
                  )}

                  {(draft.sections.testimonials.assurances || []).map((ass, idx) => (
                    <div
                      key={ass.id || idx}
                      className="p-4 sm:p-5 rounded-xl border border-gray-200 bg-gray-50/70 space-y-3 relative group"
                    >
                      <div className="flex items-center justify-between border-b border-gray-200/70 pb-2.5">
                        <span className="text-xs font-mono font-bold text-[#c6a87c]">
                          Garantia #{idx + 1}: {ass.title || 'Sem Título'}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = (draft.sections.testimonials.assurances || []).filter((_, i) => i !== idx);
                            onChange((prev) => ({
                              ...prev,
                              sections: {
                                ...prev.sections,
                                testimonials: {
                                  ...prev.sections.testimonials,
                                  assurances: updated,
                                },
                              },
                            }));
                          }}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer flex items-center gap-1 text-xs"
                          title="Remover garantia"
                        >
                          <Icon icon="solar:trash-bin-trash-bold" width="16" />
                          <span className="hidden sm:inline">Remover</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-2 space-y-1">
                          <label className="text-[11px] font-semibold text-gray-700">Título da Garantia</label>
                          <input
                            type="text"
                            value={ass.title}
                            onChange={(e) => {
                              const updated = [...(draft.sections.testimonials.assurances || [])];
                              updated[idx] = { ...updated[idx], title: e.target.value };
                              onChange((prev) => ({
                                ...prev,
                                sections: {
                                  ...prev.sections,
                                  testimonials: { ...prev.sections.testimonials, assurances: updated },
                                },
                              }));
                            }}
                            className="w-full text-xs px-2.5 py-1.5 border border-gray-200 rounded-lg bg-white"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-gray-700">Ícone</label>
                          <select
                            value={ass.icon}
                            onChange={(e) => {
                              const updated = [...(draft.sections.testimonials.assurances || [])];
                              updated[idx] = { ...updated[idx], icon: e.target.value };
                              onChange((prev) => ({
                                ...prev,
                                sections: {
                                  ...prev.sections,
                                  testimonials: { ...prev.sections.testimonials, assurances: updated },
                                },
                              }));
                            }}
                            className="w-full text-xs px-2.5 py-1.5 border border-gray-200 rounded-lg bg-white text-gray-700"
                          >
                            <option value="Award">Certificado / Prémio (Award)</option>
                            <option value="ShieldCheck">Segurança / Blindagem (ShieldCheck)</option>
                            <option value="Building2">Construção / Estaleiro (Building2)</option>
                            <option value="CheckCircle">Verificação (CheckCircle)</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-gray-700">Descrição / Justificação</label>
                        <textarea
                          rows={2}
                          value={ass.description}
                          onChange={(e) => {
                            const updated = [...(draft.sections.testimonials.assurances || [])];
                            updated[idx] = { ...updated[idx], description: e.target.value };
                            onChange((prev) => ({
                              ...prev,
                              sections: {
                                ...prev.sections,
                                testimonials: { ...prev.sections.testimonials, assurances: updated },
                              },
                            }));
                          }}
                          className="w-full text-xs p-2.5 border border-gray-200 rounded-xl bg-white focus:border-[#c6a87c] focus:outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA FINAL SECTION */}
        {activeSection === 'cta' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-gray-900 font-heading">
                  Bloco Final de Apelo à Acção (CTA de Contacto)
                </h3>
                <p className="text-xs text-gray-500">
                  Banner no rodapé da página inicial convidando para o agendamento de diagnóstico e WhatsApp.
                </p>
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={draft.sections.cta.enabled}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        cta: { ...prev.sections.cta, enabled: e.target.checked },
                      },
                    }))
                  }
                  className="rounded text-[#c6a87c] focus:ring-[#c6a87c]"
                />
                <span className="text-xs font-semibold text-gray-700">Secção Activa</span>
              </label>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Etiqueta Superior</label>
                <input
                  type="text"
                  value={draft.sections.cta.tag}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        cta: { ...prev.sections.cta, tag: e.target.value },
                      },
                    }))
                  }
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Título</label>
                <input
                  type="text"
                  value={draft.sections.cta.title}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        cta: { ...prev.sections.cta, title: e.target.value },
                      },
                    }))
                  }
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Descrição</label>
                <textarea
                  rows={3}
                  value={draft.sections.cta.description}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        cta: { ...prev.sections.cta, description: e.target.value },
                      },
                    }))
                  }
                  className="w-full text-xs p-3 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">Texto Botão Primário</label>
                  <input
                    type="text"
                    value={draft.sections.cta.buttonLabel}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        sections: {
                          ...prev.sections,
                          cta: { ...prev.sections.cta, buttonLabel: e.target.value },
                        },
                      }))
                    }
                    className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">Link Botão Primário</label>
                  <input
                    type="text"
                    placeholder="#contactos ou #briefing"
                    value={draft.sections.cta.buttonLink || ''}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        sections: {
                          ...prev.sections,
                          cta: { ...prev.sections.cta, buttonLink: e.target.value },
                        },
                      }))
                    }
                    className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">Texto Botão Secundário</label>
                  <input
                    type="text"
                    value={draft.sections.cta.secondaryButtonLabel}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        sections: {
                          ...prev.sections,
                          cta: { ...prev.sections.cta, secondaryButtonLabel: e.target.value },
                        },
                      }))
                    }
                    className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">Link Botão Secundário</label>
                  <input
                    type="text"
                    placeholder="https://wa.me/244928058840"
                    value={draft.sections.cta.secondaryButtonLink || ''}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        sections: {
                          ...prev.sections,
                          cta: { ...prev.sections.cta, secondaryButtonLink: e.target.value },
                        },
                      }))
                    }
                    className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Save Bar */}
        <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
          <span className="text-[11px] text-gray-400">
            Dica: Ao gravar, a página do website sincroniza instantaneamente.
          </span>
          <button
            type="button"
            onClick={onSave}
            className="px-6 py-2.5 bg-[#c6a87c] hover:bg-[#b59567] text-black font-semibold text-xs rounded-xl shadow-xs flex items-center gap-2 cursor-pointer transition-all"
          >
            <Icon icon="solar:check-circle-bold" width="16" />
            <span>Guardar Alterações da Página</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   2. ATELIER PAGE EDITOR
   ========================================================================= */
function AtelierPageEditor({
  draft,
  onChange,
  activeSection,
  onSectionChange,
  onSave,
}: {
  draft: AtelierPageContent;
  onChange: React.Dispatch<React.SetStateAction<AtelierPageContent>>;
  activeSection: string;
  onSectionChange: (sec: string) => void;
  onSave: () => void;
}) {
  const sections = [
    { id: 'hero', label: '1. Hero & Imagem de Fundo', icon: 'solar:palette-round-bold' },
    { id: 'manifesto', label: '2. Manifesto Arquitectónico', icon: 'solar:compass-bold' },
    { id: 'history', label: '3. Origens & Evolução', icon: 'solar:clock-circle-bold' },
    { id: 'pillars', label: '4. Princípios Fundamentais (Cards)', icon: 'solar:layers-bold' },
    { id: 'methodology', label: '5. Como Trabalhamos (Metodologia)', icon: 'solar:tuning-square-bold' },
    { id: 'bioclimatic', label: '6. Resiliência & Conforto (Tropical)', icon: 'solar:leaf-bold' },
    { id: 'team', label: '7. Equipa de Liderança', icon: 'solar:users-group-two-rounded-bold' },
    { id: 'cta', label: '8. Atendimento Presencial (CTA)', icon: 'solar:phone-calling-bold' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-3 space-y-1 bg-white p-3 rounded-2xl border border-gray-200 shadow-2xs h-fit">
        <div className="px-3 py-2 text-[11px] font-mono uppercase text-gray-400 tracking-wider">
          Secções do Atelier
        </div>
        {sections.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => onSectionChange(s.id)}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-all cursor-pointer ${
              activeSection === s.id
                ? 'bg-[#c6a87c] text-black shadow-xs'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Icon icon={s.icon} width="16" />
            <span className="truncate">{s.label}</span>
          </button>
        ))}
      </div>

      <div className="lg:col-span-9 bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-2xs space-y-6">
        {/* 1. HERO */}
        {activeSection === 'hero' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-gray-900 font-heading">Hero do Atelier</h3>
                <p className="text-xs text-gray-500">Banner introdutório e imagem monumental da página de identidade.</p>
              </div>
              <label className="flex items-center gap-2 cursor-pointer bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200 shrink-0">
                <input
                  type="checkbox"
                  checked={draft.hero.enabled ?? true}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      hero: { ...prev.hero, enabled: e.target.checked },
                    }))
                  }
                  className="rounded text-[#c6a87c] focus:ring-[#c6a87c]"
                />
                <span className="text-xs font-semibold text-gray-700">Secção Activa</span>
              </label>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Etiqueta Superior</label>
                <input
                  type="text"
                  value={draft.hero.badge}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      hero: { ...prev.hero, badge: e.target.value },
                    }))
                  }
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Título Principal</label>
                <input
                  type="text"
                  value={draft.hero.title}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      hero: { ...prev.hero, title: e.target.value },
                    }))
                  }
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Descrição</label>
                <textarea
                  rows={3}
                  value={draft.hero.description}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      hero: { ...prev.hero, description: e.target.value },
                    }))
                  }
                  className="w-full text-xs p-3 border border-gray-200 rounded-xl"
                />
              </div>

              <ImagePickerInput
                label="Fotografia de Fundo do Hero (Atelier)"
                value={draft.hero.bgImage}
                onChange={(url) =>
                  onChange((prev) => ({
                    ...prev,
                    hero: { ...prev.hero, bgImage: url },
                  }))
                }
                helperText="Faça upload ou escolha da biblioteca."
              />
            </div>
          </div>
        )}

        {/* 2. MANIFESTO */}
        {activeSection === 'manifesto' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-gray-900 font-heading">Manifesto Arquitectónico</h3>
                <p className="text-xs text-gray-500">Declaração de princípios e filosofia construtiva da STAK.</p>
              </div>
              <label className="flex items-center gap-2 cursor-pointer bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200 shrink-0">
                <input
                  type="checkbox"
                  checked={draft.sections.manifesto?.enabled ?? true}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        manifesto: {
                          ...(prev.sections.manifesto || {
                            tag: 'Manifesto & Propósito',
                            title: 'Arquitectura que transcende o tempo em Luanda.',
                            content: '',
                            sideImage: '',
                            sideImageCaption: '',
                            quote: '',
                          }),
                          enabled: e.target.checked,
                        },
                      },
                    }))
                  }
                  className="rounded text-[#c6a87c] focus:ring-[#c6a87c]"
                />
                <span className="text-xs font-semibold text-gray-700">Secção Activa</span>
              </label>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Etiqueta / Tag</label>
                <input
                  type="text"
                  value={draft.sections.manifesto?.tag || 'Manifesto & Propósito'}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        manifesto: {
                          ...(prev.sections.manifesto || {
                            enabled: true,
                            title: '',
                            content: '',
                            sideImage: '',
                            sideImageCaption: '',
                            quote: '',
                          }),
                          tag: e.target.value,
                        },
                      },
                    }))
                  }
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Título</label>
                <input
                  type="text"
                  value={draft.sections.manifesto?.title || ''}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        manifesto: {
                          ...(prev.sections.manifesto || {
                            enabled: true,
                            tag: 'Manifesto',
                            content: '',
                            sideImage: '',
                            sideImageCaption: '',
                            quote: '',
                          }),
                          title: e.target.value,
                        },
                      },
                    }))
                  }
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Citação em Destaque</label>
                <input
                  type="text"
                  value={draft.sections.manifesto?.quote || ''}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        manifesto: {
                          ...(prev.sections.manifesto || {
                            enabled: true,
                            tag: 'Manifesto',
                            title: '',
                            content: '',
                            sideImage: '',
                            sideImageCaption: '',
                          }),
                          quote: e.target.value,
                        },
                      },
                    }))
                  }
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Texto Integral do Manifesto</label>
                <textarea
                  rows={5}
                  value={draft.sections.manifesto?.content || ''}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        manifesto: {
                          ...(prev.sections.manifesto || {
                            enabled: true,
                            tag: 'Manifesto',
                            title: '',
                            sideImage: '',
                            sideImageCaption: '',
                            quote: '',
                          }),
                          content: e.target.value,
                        },
                      },
                    }))
                  }
                  className="w-full text-xs p-3 border border-gray-200 rounded-xl"
                />
              </div>

              <ImagePickerInput
                label="Fotografia Lateral do Manifesto"
                value={draft.sections.manifesto?.sideImage || ''}
                onChange={(url) =>
                  onChange((prev) => ({
                    ...prev,
                    sections: {
                      ...prev.sections,
                      manifesto: {
                        ...(prev.sections.manifesto || {
                          enabled: true,
                          tag: 'Manifesto',
                          title: '',
                          content: '',
                          sideImageCaption: '',
                          quote: '',
                        }),
                        sideImage: url,
                      },
                    },
                  }))
                }
              />
            </div>
          </div>
        )}

        {/* 3. HISTORY: Origens & Evolução */}
        {activeSection === 'history' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-gray-900 font-heading">Origens & Evolução</h3>
                <p className="text-xs text-gray-500">Trajectória do atelier ao longo de mais de uma década em Angola.</p>
              </div>
              <label className="flex items-center gap-2 cursor-pointer bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200 shrink-0">
                <input
                  type="checkbox"
                  checked={draft.sections.history?.enabled ?? true}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        history: { ...prev.sections.history, enabled: e.target.checked },
                      },
                    }))
                  }
                  className="rounded text-[#c6a87c] focus:ring-[#c6a87c]"
                />
                <span className="text-xs font-semibold text-gray-700">Secção Activa</span>
              </label>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Etiqueta / Tag</label>
                <input
                  type="text"
                  value={draft.sections.history?.tag || 'Origens & Evolução'}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        history: { ...prev.sections.history, tag: e.target.value },
                      },
                    }))
                  }
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Título</label>
                <input
                  type="text"
                  value={draft.sections.history?.title || ''}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        history: { ...prev.sections.history, title: e.target.value },
                      },
                    }))
                  }
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Texto Histórico</label>
                <textarea
                  rows={4}
                  value={draft.sections.history?.content || ''}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        history: { ...prev.sections.history, content: e.target.value },
                      },
                    }))
                  }
                  className="w-full text-xs p-3 border border-gray-200 rounded-xl"
                />
              </div>

              <ImagePickerInput
                label="Fotografia Histórica do Atelier"
                value={draft.sections.history?.image || ''}
                onChange={(url) =>
                  onChange((prev) => ({
                    ...prev,
                    sections: {
                      ...prev.sections,
                      history: { ...prev.sections.history, image: url },
                    },
                  }))
                }
              />
            </div>
          </div>
        )}

        {/* 4. PILLARS: Princípios Fundamentais (Os 4 Cards) */}
        {activeSection === 'pillars' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-gray-900 font-heading">
                  Princípios Fundamentais (A Nossa Disciplina Projectual)
                </h3>
                <p className="text-xs text-gray-500">
                  Edite os títulos, descrições e os cards de disciplina (Sobriedade, Bioclimática, BIM, Património).
                </p>
              </div>
              <label className="flex items-center gap-2 cursor-pointer bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200 shrink-0">
                <input
                  type="checkbox"
                  checked={draft.sections.pillars?.enabled ?? true}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        pillars: { ...prev.sections.pillars, enabled: e.target.checked },
                      },
                    }))
                  }
                  className="rounded text-[#c6a87c] focus:ring-[#c6a87c]"
                />
                <span className="text-xs font-semibold text-gray-700">Secção Activa</span>
              </label>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Etiqueta / Tag</label>
                <input
                  type="text"
                  value={draft.sections.pillars?.tag || 'Princípios Fundamentais'}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        pillars: { ...prev.sections.pillars, tag: e.target.value },
                      },
                    }))
                  }
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Título</label>
                <input
                  type="text"
                  value={draft.sections.pillars?.title || ''}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        pillars: { ...prev.sections.pillars, title: e.target.value },
                      },
                    }))
                  }
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Descrição</label>
                <textarea
                  rows={2}
                  value={draft.sections.pillars?.description || ''}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        pillars: { ...prev.sections.pillars, description: e.target.value },
                      },
                    }))
                  }
                  className="w-full text-xs p-3 border border-gray-200 rounded-xl"
                />
              </div>
            </div>

            {/* Cards de Disciplina Projectual (CRUD) */}
            <div className="pt-4 border-t border-gray-100 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-gray-900 font-heading">
                    Cards de Disciplina Projectual
                  </h4>
                  <p className="text-xs text-gray-500">
                    Adicione, edite ou remova os cards exibidos nesta grelha.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const currentItems = draft.sections.pillars?.items || [];
                    const newItem = {
                      title: 'Novo Princípio Projectual',
                      desc: 'Descreva aqui o princípio arquitectónico e rigor construtivo.',
                    };
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        pillars: {
                          ...prev.sections.pillars,
                          items: [...currentItems, newItem],
                        },
                      },
                    }));
                  }}
                  className="px-3.5 py-2 bg-[#c6a87c]/15 hover:bg-[#c6a87c]/25 text-[#917246] font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Icon icon="solar:add-circle-bold" width="16" />
                  <span>Adicionar Card</span>
                </button>
              </div>

              <div className="space-y-3">
                {(!draft.sections.pillars?.items || draft.sections.pillars.items.length === 0) && (
                  <div className="p-4 rounded-xl border border-dashed border-gray-200 text-center text-xs text-gray-400">
                    Nenhum card configurado.
                  </div>
                )}

                {(draft.sections.pillars?.items || []).map((card, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-gray-200 bg-gray-50/70 space-y-2.5">
                    <div className="flex items-center justify-between border-b border-gray-200/70 pb-2">
                      <span className="text-xs font-mono font-bold text-[#c6a87c]">
                        Card #{idx + 1}: {card.title}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = (draft.sections.pillars?.items || []).filter((_, i) => i !== idx);
                          onChange((prev) => ({
                            ...prev,
                            sections: {
                              ...prev.sections,
                              pillars: {
                                ...prev.sections.pillars,
                                items: updated,
                              },
                            },
                          }));
                        }}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Remover card"
                      >
                        <Icon icon="solar:trash-bin-trash-bold" width="16" />
                      </button>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-gray-700">Título do Card</label>
                      <input
                        type="text"
                        value={card.title}
                        onChange={(e) => {
                          const updated = [...(draft.sections.pillars?.items || [])];
                          updated[idx] = { ...updated[idx], title: e.target.value };
                          onChange((prev) => ({
                            ...prev,
                            sections: {
                              ...prev.sections,
                              pillars: { ...prev.sections.pillars, items: updated },
                            },
                          }));
                        }}
                        className="w-full text-xs px-2.5 py-1.5 border border-gray-200 rounded-lg bg-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-gray-700">Descrição</label>
                      <textarea
                        rows={2}
                        value={card.desc}
                        onChange={(e) => {
                          const updated = [...(draft.sections.pillars?.items || [])];
                          updated[idx] = { ...updated[idx], desc: e.target.value };
                          onChange((prev) => ({
                            ...prev,
                            sections: {
                              ...prev.sections,
                              pillars: { ...prev.sections.pillars, items: updated },
                            },
                          }));
                        }}
                        className="w-full text-xs p-2.5 border border-gray-200 rounded-xl bg-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 5. METHODOLOGY: Como Trabalhamos */}
        {activeSection === 'methodology' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-gray-900 font-heading">
                  Como Trabalhamos (O Percurso Metodológico de Cada Projecto)
                </h3>
                <p className="text-xs text-gray-500">
                  Defina as fases transparentes de execução, prazos e entregáveis aprovados em acta.
                </p>
              </div>
              <label className="flex items-center gap-2 cursor-pointer bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200 shrink-0">
                <input
                  type="checkbox"
                  checked={draft.sections.methodology?.enabled ?? true}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        methodology: {
                          ...(prev.sections.methodology || {
                            tag: 'Como Trabalhamos',
                            title: 'O percurso metodológico de cada projecto.',
                            description: '',
                            steps: [],
                          }),
                          enabled: e.target.checked,
                        },
                      },
                    }))
                  }
                  className="rounded text-[#c6a87c] focus:ring-[#c6a87c]"
                />
                <span className="text-xs font-semibold text-gray-700">Secção Activa</span>
              </label>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Etiqueta / Tag</label>
                <input
                  type="text"
                  value={draft.sections.methodology?.tag || 'Como Trabalhamos'}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        methodology: {
                          ...(prev.sections.methodology || {
                            enabled: true,
                            title: '',
                            description: '',
                            steps: [],
                          }),
                          tag: e.target.value,
                        },
                      },
                    }))
                  }
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Título</label>
                <input
                  type="text"
                  value={draft.sections.methodology?.title || ''}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        methodology: {
                          ...(prev.sections.methodology || {
                            enabled: true,
                            tag: 'Como Trabalhamos',
                            description: '',
                            steps: [],
                          }),
                          title: e.target.value,
                        },
                      },
                    }))
                  }
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Descrição</label>
                <textarea
                  rows={2}
                  value={draft.sections.methodology?.description || ''}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        methodology: {
                          ...(prev.sections.methodology || {
                            enabled: true,
                            tag: 'Como Trabalhamos',
                            title: '',
                            steps: [],
                          }),
                          description: e.target.value,
                        },
                      },
                    }))
                  }
                  className="w-full text-xs p-3 border border-gray-200 rounded-xl"
                />
              </div>
            </div>

            {/* Etapas Metodológicas (CRUD) */}
            <div className="pt-4 border-t border-gray-100 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-gray-900 font-heading">
                    Etapas do Processo Metodológico
                  </h4>
                  <p className="text-xs text-gray-500">
                    Fases cronológicas apresentadas em cards (ex: 01 Diagnóstico, 02 Estudo Prévio, etc).
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const currentSteps = draft.sections.methodology?.steps || [];
                    const nextNum = (currentSteps.length + 1).toString().padStart(2, '0');
                    const newStep = {
                      step: nextNum,
                      title: `Etapa ${nextNum}`,
                      subtitle: 'Fase de Projecto',
                      desc: 'Descrição dos trabalhos executados e entregáveis previstos.',
                    };
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        methodology: {
                          ...(prev.sections.methodology || {
                            enabled: true,
                            tag: 'Como Trabalhamos',
                            title: 'O percurso metodológico de cada projecto.',
                            description: '',
                          }),
                          steps: [...currentSteps, newStep],
                        },
                      },
                    }));
                  }}
                  className="px-3.5 py-2 bg-[#c6a87c]/15 hover:bg-[#c6a87c]/25 text-[#917246] font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Icon icon="solar:add-circle-bold" width="16" />
                  <span>Adicionar Etapa</span>
                </button>
              </div>

              <div className="space-y-3">
                {(!draft.sections.methodology?.steps || draft.sections.methodology.steps.length === 0) && (
                  <div className="p-4 rounded-xl border border-dashed border-gray-200 text-center text-xs text-gray-400">
                    Nenhuma etapa configurada.
                  </div>
                )}

                {(draft.sections.methodology?.steps || []).map((step, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-gray-200 bg-gray-50/70 space-y-3">
                    <div className="flex items-center justify-between border-b border-gray-200/70 pb-2">
                      <span className="text-xs font-mono font-bold text-[#c6a87c]">
                        Etapa #{step.step || idx + 1}: {step.title}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = (draft.sections.methodology?.steps || []).filter((_, i) => i !== idx);
                          onChange((prev) => ({
                            ...prev,
                            sections: {
                              ...prev.sections,
                              methodology: {
                                ...(prev.sections.methodology || {
                                  enabled: true,
                                  tag: 'Como Trabalhamos',
                                  title: '',
                                  description: '',
                                }),
                                steps: updated,
                              },
                            },
                          }));
                        }}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Remover etapa"
                      >
                        <Icon icon="solar:trash-bin-trash-bold" width="16" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-gray-700">Número</label>
                        <input
                          type="text"
                          value={step.step || ''}
                          onChange={(e) => {
                            const updated = [...(draft.sections.methodology?.steps || [])];
                            updated[idx] = { ...updated[idx], step: e.target.value };
                            onChange((prev) => ({
                              ...prev,
                              sections: {
                                ...prev.sections,
                                methodology: {
                                  ...(prev.sections.methodology || {
                                    enabled: true,
                                    tag: 'Como Trabalhamos',
                                    title: '',
                                    description: '',
                                  }),
                                  steps: updated,
                                },
                              },
                            }));
                          }}
                          className="w-full text-xs px-2.5 py-1.5 border border-gray-200 rounded-lg bg-white font-mono"
                        />
                      </div>

                      <div className="sm:col-span-3 space-y-1">
                        <label className="text-[11px] font-semibold text-gray-700">Título da Etapa</label>
                        <input
                          type="text"
                          value={step.title}
                          onChange={(e) => {
                            const updated = [...(draft.sections.methodology?.steps || [])];
                            updated[idx] = { ...updated[idx], title: e.target.value };
                            onChange((prev) => ({
                              ...prev,
                              sections: {
                                ...prev.sections,
                                methodology: {
                                  ...(prev.sections.methodology || {
                                    enabled: true,
                                    tag: 'Como Trabalhamos',
                                    title: '',
                                    description: '',
                                  }),
                                  steps: updated,
                                },
                              },
                            }));
                          }}
                          className="w-full text-xs px-2.5 py-1.5 border border-gray-200 rounded-lg bg-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-gray-700">Subtítulo / Especialidade</label>
                      <input
                        type="text"
                        value={step.subtitle || ''}
                        onChange={(e) => {
                          const updated = [...(draft.sections.methodology?.steps || [])];
                          updated[idx] = { ...updated[idx], subtitle: e.target.value };
                          onChange((prev) => ({
                            ...prev,
                            sections: {
                              ...prev.sections,
                              methodology: {
                                ...(prev.sections.methodology || {
                                  enabled: true,
                                  tag: 'Como Trabalhamos',
                                  title: '',
                                  description: '',
                                }),
                                steps: updated,
                              },
                            },
                          }));
                        }}
                        className="w-full text-xs px-2.5 py-1.5 border border-gray-200 rounded-lg bg-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-gray-700">Descrição Detalhada</label>
                      <textarea
                        rows={2}
                        value={step.desc}
                        onChange={(e) => {
                          const updated = [...(draft.sections.methodology?.steps || [])];
                          updated[idx] = { ...updated[idx], desc: e.target.value };
                          onChange((prev) => ({
                            ...prev,
                            sections: {
                              ...prev.sections,
                              methodology: {
                                ...(prev.sections.methodology || {
                                  enabled: true,
                                  tag: 'Como Trabalhamos',
                                  title: '',
                                  description: '',
                                }),
                                steps: updated,
                              },
                            },
                          }));
                        }}
                        className="w-full text-xs p-2.5 border border-gray-200 rounded-xl bg-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 6. BIOCLIMATIC: Resiliência & Conforto / Arquitectura Tropical */}
        {activeSection === 'bioclimatic' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-gray-900 font-heading">
                  Resiliência & Conforto (Arquitectura Tropical Bioclimática)
                </h3>
                <p className="text-xs text-gray-500">
                  Apresentação de ventilação cruzada, sombreamento passivo e inércia térmica adaptada ao clima de Luanda.
                </p>
              </div>
              <label className="flex items-center gap-2 cursor-pointer bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200 shrink-0">
                <input
                  type="checkbox"
                  checked={draft.sections.bioclimatic?.enabled ?? true}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        bioclimatic: {
                          ...(prev.sections.bioclimatic || {
                            tag: 'Resiliência & Conforto / Arquitectura Tropical',
                            title: 'Construir em harmonia com a luz, o vento atlântico e o calor de Luanda.',
                            description: '',
                            image: '',
                            features: [],
                          }),
                          enabled: e.target.checked,
                        },
                      },
                    }))
                  }
                  className="rounded text-[#c6a87c] focus:ring-[#c6a87c]"
                />
                <span className="text-xs font-semibold text-gray-700">Secção Activa</span>
              </label>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Etiqueta / Tag</label>
                <input
                  type="text"
                  value={draft.sections.bioclimatic?.tag || 'Resiliência & Conforto / Arquitectura Tropical'}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        bioclimatic: {
                          ...(prev.sections.bioclimatic || {
                            enabled: true,
                            title: '',
                            description: '',
                            image: '',
                            features: [],
                          }),
                          tag: e.target.value,
                        },
                      },
                    }))
                  }
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Título</label>
                <input
                  type="text"
                  value={draft.sections.bioclimatic?.title || ''}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        bioclimatic: {
                          ...(prev.sections.bioclimatic || {
                            enabled: true,
                            tag: 'Resiliência & Conforto',
                            description: '',
                            image: '',
                            features: [],
                          }),
                          title: e.target.value,
                        },
                      },
                    }))
                  }
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Descrição</label>
                <textarea
                  rows={3}
                  value={draft.sections.bioclimatic?.description || ''}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        bioclimatic: {
                          ...(prev.sections.bioclimatic || {
                            enabled: true,
                            tag: 'Resiliência & Conforto',
                            title: '',
                            image: '',
                            features: [],
                          }),
                          description: e.target.value,
                        },
                      },
                    }))
                  }
                  className="w-full text-xs p-3 border border-gray-200 rounded-xl"
                />
              </div>

              <ImagePickerInput
                label="Fotografia de Demonstração Bioclimática"
                value={draft.sections.bioclimatic?.image || ''}
                onChange={(url) =>
                  onChange((prev) => ({
                    ...prev,
                    sections: {
                      ...prev.sections,
                      bioclimatic: {
                        ...(prev.sections.bioclimatic || {
                          enabled: true,
                          tag: 'Resiliência & Conforto',
                          title: '',
                          description: '',
                          features: [],
                        }),
                        image: url,
                      },
                    },
                  }))
                }
              />
            </div>

            {/* Características Bioclimáticas (CRUD) */}
            <div className="pt-4 border-t border-gray-100 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-gray-900 font-heading">
                    Pilares Técnicos Tropicais (Ventilação, Sombreamento, Inércia)
                  </h4>
                  <p className="text-xs text-gray-500">
                    Os 3 pilares de adaptação ao clima costeiro de Angola.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const currentFeats = draft.sections.bioclimatic?.features || [];
                    const newFeat = {
                      title: 'Novo Princípio Tropical',
                      desc: 'Descreva a solução arquitectónica passiva implementada.',
                    };
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        bioclimatic: {
                          ...(prev.sections.bioclimatic || {
                            enabled: true,
                            tag: 'Resiliência & Conforto',
                            title: '',
                            description: '',
                            image: '',
                          }),
                          features: [...currentFeats, newFeat],
                        },
                      },
                    }));
                  }}
                  className="px-3.5 py-2 bg-[#c6a87c]/15 hover:bg-[#c6a87c]/25 text-[#917246] font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Icon icon="solar:add-circle-bold" width="16" />
                  <span>Adicionar Pilar Tropical</span>
                </button>
              </div>

              <div className="space-y-3">
                {(!draft.sections.bioclimatic?.features || draft.sections.bioclimatic.features.length === 0) && (
                  <div className="p-4 rounded-xl border border-dashed border-gray-200 text-center text-xs text-gray-400">
                    Nenhum pilar tropical configurado.
                  </div>
                )}

                {(draft.sections.bioclimatic?.features || []).map((feat, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-gray-200 bg-gray-50/70 space-y-2.5">
                    <div className="flex items-center justify-between border-b border-gray-200/70 pb-2">
                      <span className="text-xs font-mono font-bold text-[#c6a87c]">
                        Pilar #{idx + 1}: {feat.title}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = (draft.sections.bioclimatic?.features || []).filter((_, i) => i !== idx);
                          onChange((prev) => ({
                            ...prev,
                            sections: {
                              ...prev.sections,
                              bioclimatic: {
                                ...(prev.sections.bioclimatic || {
                                  enabled: true,
                                  tag: 'Resiliência & Conforto',
                                  title: '',
                                  description: '',
                                  image: '',
                                }),
                                features: updated,
                              },
                            },
                          }));
                        }}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Remover pilar"
                      >
                        <Icon icon="solar:trash-bin-trash-bold" width="16" />
                      </button>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-gray-700">Título</label>
                      <input
                        type="text"
                        value={feat.title}
                        onChange={(e) => {
                          const updated = [...(draft.sections.bioclimatic?.features || [])];
                          updated[idx] = { ...updated[idx], title: e.target.value };
                          onChange((prev) => ({
                            ...prev,
                            sections: {
                              ...prev.sections,
                              bioclimatic: {
                                ...(prev.sections.bioclimatic || {
                                  enabled: true,
                                  tag: 'Resiliência & Conforto',
                                  title: '',
                                  description: '',
                                  image: '',
                                }),
                                features: updated,
                              },
                            },
                          }));
                        }}
                        className="w-full text-xs px-2.5 py-1.5 border border-gray-200 rounded-lg bg-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-gray-700">Descrição / Efeito</label>
                      <textarea
                        rows={2}
                        value={feat.desc}
                        onChange={(e) => {
                          const updated = [...(draft.sections.bioclimatic?.features || [])];
                          updated[idx] = { ...updated[idx], desc: e.target.value };
                          onChange((prev) => ({
                            ...prev,
                            sections: {
                              ...prev.sections,
                              bioclimatic: {
                                ...(prev.sections.bioclimatic || {
                                  enabled: true,
                                  tag: 'Resiliência & Conforto',
                                  title: '',
                                  description: '',
                                  image: '',
                                }),
                                features: updated,
                              },
                            },
                          }));
                        }}
                        className="w-full text-xs p-2.5 border border-gray-200 rounded-xl bg-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 7. TEAM */}
        {activeSection === 'team' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-gray-900 font-heading">Equipa de Liderança & Corpo Técnico</h3>
                <p className="text-xs text-gray-500">Membros da equipa residente e coordenadores de projecto.</p>
              </div>
              <label className="flex items-center gap-2 cursor-pointer bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200 shrink-0">
                <input
                  type="checkbox"
                  checked={draft.sections.team.enabled}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        team: { ...prev.sections.team, enabled: e.target.checked },
                      },
                    }))
                  }
                  className="rounded text-[#c6a87c]"
                />
                <span className="text-xs font-semibold text-gray-700">Secção Activa</span>
              </label>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Etiqueta / Tag</label>
                <input
                  type="text"
                  value={draft.sections.team.tag || 'Corpo Técnico'}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        team: { ...prev.sections.team, tag: e.target.value },
                      },
                    }))
                  }
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Título</label>
                <input
                  type="text"
                  value={draft.sections.team.title}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        team: { ...prev.sections.team, title: e.target.value },
                      },
                    }))
                  }
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Descrição</label>
                <textarea
                  rows={2}
                  value={draft.sections.team.description}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        team: { ...prev.sections.team, description: e.target.value },
                      },
                    }))
                  }
                  className="w-full text-xs p-3 border border-gray-200 rounded-xl"
                />
              </div>

              {/* Members (com Adicionar e Remover) */}
              <div className="space-y-4 pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-gray-800 font-heading">Membros da Equipa</h4>
                  <button
                    type="button"
                    onClick={() => {
                      const currentMembers = draft.sections.team.members || [];
                      const newMember = {
                        name: 'Novo Membro',
                        role: 'Arquitecto Coordenador',
                        bio: 'Profissional sénior com experiência sólida em projecto e obra.',
                        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
                      };
                      onChange((prev) => ({
                        ...prev,
                        sections: {
                          ...prev.sections,
                          team: {
                            ...prev.sections.team,
                            members: [...currentMembers, newMember],
                          },
                        },
                      }));
                    }}
                    className="px-3 py-1.5 bg-[#c6a87c]/15 hover:bg-[#c6a87c]/25 text-[#917246] font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Icon icon="solar:add-circle-bold" width="16" />
                    <span>Adicionar Membro</span>
                  </button>
                </div>

                {draft.sections.team.members?.map((member, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-gray-200 bg-gray-50/60 space-y-3">
                    <div className="flex items-center justify-between border-b border-gray-200/70 pb-2">
                      <span className="text-xs font-mono font-bold text-[#c6a87c]">
                        Membro #{idx + 1}: {member.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = (draft.sections.team.members || []).filter((_, i) => i !== idx);
                          onChange((prev) => ({
                            ...prev,
                            sections: {
                              ...prev.sections,
                              team: {
                                ...prev.sections.team,
                                members: updated,
                              },
                            },
                          }));
                        }}
                        className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Remover membro"
                      >
                        <Icon icon="solar:trash-bin-trash-bold" width="16" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-gray-600">Nome</label>
                        <input
                          type="text"
                          value={member.name}
                          onChange={(e) => {
                            const newM = [...draft.sections.team.members];
                            newM[idx] = { ...newM[idx], name: e.target.value };
                            onChange((prev) => ({
                              ...prev,
                              sections: {
                                ...prev.sections,
                                team: { ...prev.sections.team, members: newM },
                              },
                            }));
                          }}
                          className="w-full text-xs px-2.5 py-1.5 border border-gray-200 rounded-lg bg-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-gray-600">Cargo / Especialidade</label>
                        <input
                          type="text"
                          value={member.role}
                          onChange={(e) => {
                            const newM = [...draft.sections.team.members];
                            newM[idx] = { ...newM[idx], role: e.target.value };
                            onChange((prev) => ({
                              ...prev,
                              sections: {
                                ...prev.sections,
                                team: { ...prev.sections.team, members: newM },
                              },
                            }));
                          }}
                          className="w-full text-xs px-2.5 py-1.5 border border-gray-200 rounded-lg bg-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-gray-600">Biografia / Percurso Resumido</label>
                      <textarea
                        rows={2}
                        value={member.bio || ''}
                        onChange={(e) => {
                          const newM = [...draft.sections.team.members];
                          newM[idx] = { ...newM[idx], bio: e.target.value };
                          onChange((prev) => ({
                            ...prev,
                            sections: {
                              ...prev.sections,
                              team: { ...prev.sections.team, members: newM },
                            },
                          }));
                        }}
                        className="w-full text-xs p-2.5 border border-gray-200 rounded-xl bg-white"
                      />
                    </div>

                    <ImagePickerInput
                      label={`Foto de ${member.name}`}
                      value={member.image}
                      onChange={(url) => {
                        const newM = [...draft.sections.team.members];
                        newM[idx] = { ...newM[idx], image: url };
                        onChange((prev) => ({
                          ...prev,
                          sections: {
                            ...prev.sections,
                            team: { ...prev.sections.team, members: newM },
                          },
                        }));
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 8. CTA: Atendimento Técnico Presencial */}
        {activeSection === 'cta' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-gray-900 font-heading">
                  Atendimento Técnico Presencial (Bloco Final de Contacto)
                </h3>
                <p className="text-xs text-gray-500">Convite para reunião presencial no atelier na Marginal de Luanda.</p>
              </div>
              <label className="flex items-center gap-2 cursor-pointer bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200 shrink-0">
                <input
                  type="checkbox"
                  checked={draft.sections.cta?.enabled ?? true}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        cta: {
                          ...(prev.sections.cta || {
                            tag: 'Atendimento Técnico Presencial',
                            title: 'Gostaria de conhecer o nosso atelier na Marginal de Luanda?',
                            description: '',
                            buttonLabel: 'Agendar Reunião de Briefing',
                            buttonLink: '#contactos',
                            secondaryButtonLabel: 'Ver Portfólio de Projectos',
                            secondaryButtonLink: '#projectos',
                          }),
                          enabled: e.target.checked,
                        },
                      },
                    }))
                  }
                  className="rounded text-[#c6a87c] focus:ring-[#c6a87c]"
                />
                <span className="text-xs font-semibold text-gray-700">Secção Activa</span>
              </label>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Etiqueta / Tag</label>
                <input
                  type="text"
                  value={draft.sections.cta?.tag || 'Atendimento Técnico Presencial'}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        cta: {
                          ...(prev.sections.cta || {
                            enabled: true,
                            title: '',
                            description: '',
                            buttonLabel: '',
                          }),
                          tag: e.target.value,
                        },
                      },
                    }))
                  }
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Título</label>
                <input
                  type="text"
                  value={draft.sections.cta?.title || ''}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        cta: {
                          ...(prev.sections.cta || {
                            enabled: true,
                            tag: 'Atendimento Técnico Presencial',
                            description: '',
                            buttonLabel: '',
                          }),
                          title: e.target.value,
                        },
                      },
                    }))
                  }
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Descrição</label>
                <textarea
                  rows={3}
                  value={draft.sections.cta?.description || ''}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        cta: {
                          ...(prev.sections.cta || {
                            enabled: true,
                            tag: 'Atendimento Técnico Presencial',
                            title: '',
                            buttonLabel: '',
                          }),
                          description: e.target.value,
                        },
                      },
                    }))
                  }
                  className="w-full text-xs p-3 border border-gray-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">Texto do Botão Principal</label>
                  <input
                    type="text"
                    value={draft.sections.cta?.buttonLabel || ''}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        sections: {
                          ...prev.sections,
                          cta: {
                            ...(prev.sections.cta || {
                              enabled: true,
                              tag: '',
                              title: '',
                              description: '',
                            }),
                            buttonLabel: e.target.value,
                          },
                        },
                      }))
                    }
                    className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">Link do Botão Principal</label>
                  <input
                    type="text"
                    placeholder="#contactos"
                    value={draft.sections.cta?.buttonLink || ''}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        sections: {
                          ...prev.sections,
                          cta: {
                            ...(prev.sections.cta || {
                              enabled: true,
                              tag: '',
                              title: '',
                              description: '',
                              buttonLabel: '',
                            }),
                            buttonLink: e.target.value,
                          },
                        },
                      }))
                    }
                    className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">Texto do Botão Secundário</label>
                  <input
                    type="text"
                    value={draft.sections.cta?.secondaryButtonLabel || ''}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        sections: {
                          ...prev.sections,
                          cta: {
                            ...(prev.sections.cta || {
                              enabled: true,
                              tag: '',
                              title: '',
                              description: '',
                              buttonLabel: '',
                            }),
                            secondaryButtonLabel: e.target.value,
                          },
                        },
                      }))
                    }
                    className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">Link do Botão Secundário</label>
                  <input
                    type="text"
                    placeholder="#projectos"
                    value={draft.sections.cta?.secondaryButtonLink || ''}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        sections: {
                          ...prev.sections,
                          cta: {
                            ...(prev.sections.cta || {
                              enabled: true,
                              tag: '',
                              title: '',
                              description: '',
                              buttonLabel: '',
                            }),
                            secondaryButtonLink: e.target.value,
                          },
                        },
                      }))
                    }
                    className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Save Bar */}
        <div className="pt-6 border-t border-gray-100 flex items-center justify-end">
          <button
            type="button"
            onClick={onSave}
            className="px-6 py-2.5 bg-[#c6a87c] hover:bg-[#b59567] text-black font-semibold text-xs rounded-xl shadow-xs flex items-center gap-2 cursor-pointer transition-all"
          >
            <Icon icon="solar:check-circle-bold" width="16" />
            <span>Guardar Alterações do Atelier</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   3. PROJECTS PAGE EDITOR
   ========================================================================= */
function ProjectsPageEditor({
  draft,
  onChange,
  activeSection,
  onSectionChange,
  onSave,
}: {
  draft: ProjectsPageContent;
  onChange: React.Dispatch<React.SetStateAction<ProjectsPageContent>>;
  activeSection: string;
  onSectionChange: (sec: string) => void;
  onSave: () => void;
}) {
  const sections = [
    { id: 'hero', label: '1. Hero & Badges de Projectos', icon: 'solar:palette-round-bold' },
    { id: 'catalogIntro', label: '2. Introdução ao Catálogo', icon: 'solar:layers-bold' },
    { id: 'cta', label: '3. Bloco de Apelo (CTA)', icon: 'solar:phone-calling-bold' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Sidebar Sections Navigation */}
      <div className="lg:col-span-3 space-y-1 bg-white p-3 rounded-2xl border border-gray-200 shadow-2xs h-fit">
        <div className="px-3 py-2 text-[11px] font-mono uppercase text-gray-400 tracking-wider">
          Secções de Projectos
        </div>
        {sections.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => onSectionChange(s.id)}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-all cursor-pointer ${
              activeSection === s.id
                ? 'bg-[#c6a87c] text-black shadow-xs'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Icon icon={s.icon} width="16" />
            <span className="truncate">{s.label}</span>
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="lg:col-span-9 bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-2xs space-y-6">
        {/* 1. HERO */}
        {activeSection === 'hero' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-gray-900 font-heading">
                  Hero da Página de Projectos
                </h3>
                <p className="text-xs text-gray-500">
                  Cabeçalho monumental com fotografia de destaque e contadores arquitectónicos.
                </p>
              </div>
              <label className="flex items-center gap-2 cursor-pointer bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200 shrink-0">
                <input
                  type="checkbox"
                  checked={draft.hero.enabled ?? true}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      hero: { ...prev.hero, enabled: e.target.checked },
                    }))
                  }
                  className="rounded text-[#c6a87c] focus:ring-[#c6a87c]"
                />
                <span className="text-xs font-semibold text-gray-700">Secção Activa</span>
              </label>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Etiqueta Superior (Badge)</label>
                <input
                  type="text"
                  value={draft.hero.badge}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      hero: { ...prev.hero, badge: e.target.value },
                    }))
                  }
                  placeholder="Catálogo Geral de Obras"
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Título Principal</label>
                <input
                  type="text"
                  value={draft.hero.title}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      hero: { ...prev.hero, title: e.target.value },
                    }))
                  }
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Descrição</label>
                <textarea
                  rows={3}
                  value={draft.hero.description}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      hero: { ...prev.hero, description: e.target.value },
                    }))
                  }
                  className="w-full text-xs p-3 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none"
                />
              </div>

              <ImagePickerInput
                label="Fotografia de Fundo do Hero (Projectos)"
                value={draft.hero.bgImage}
                onChange={(url) =>
                  onChange((prev) => ({
                    ...prev,
                    hero: { ...prev.hero, bgImage: url },
                  }))
                }
                helperText="Fotografia de alta resolução que ilustra a mestria arquitectónica do atelier."
              />
            </div>
          </div>
        )}

        {/* 2. CATALOG INTRO */}
        {activeSection === 'catalogIntro' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-gray-900 font-heading">
                  Introdução ao Catálogo de Obras
                </h3>
                <p className="text-xs text-gray-500">
                  Secção de contexto antes do painel de filtros e grelha de projectos.
                </p>
              </div>
              <label className="flex items-center gap-2 cursor-pointer bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200 shrink-0">
                <input
                  type="checkbox"
                  checked={draft.sections.catalogIntro?.enabled ?? true}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        catalogIntro: {
                          ...(prev.sections.catalogIntro || {
                            tag: 'Filtragem por Tipologia',
                            title: 'Portfólio Seleccionado',
                            description: '',
                          }),
                          enabled: e.target.checked,
                        },
                      },
                    }))
                  }
                  className="rounded text-[#c6a87c] focus:ring-[#c6a87c]"
                />
                <span className="text-xs font-semibold text-gray-700">Secção Activa</span>
              </label>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Etiqueta Superior (Tag)</label>
                <input
                  type="text"
                  value={draft.sections.catalogIntro?.tag || ''}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        catalogIntro: {
                          ...(prev.sections.catalogIntro || {
                            enabled: true,
                            title: '',
                            description: '',
                          }),
                          tag: e.target.value,
                        },
                      },
                    }))
                  }
                  placeholder="Filtragem por Tipologia"
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Título da Secção</label>
                <input
                  type="text"
                  value={draft.sections.catalogIntro?.title || ''}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        catalogIntro: {
                          ...(prev.sections.catalogIntro || {
                            enabled: true,
                            tag: '',
                            description: '',
                          }),
                          title: e.target.value,
                        },
                      },
                    }))
                  }
                  placeholder="Portfólio Seleccionado"
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Descrição de Enquadramento</label>
                <textarea
                  rows={3}
                  value={draft.sections.catalogIntro?.description || ''}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        catalogIntro: {
                          ...(prev.sections.catalogIntro || {
                            enabled: true,
                            tag: '',
                            title: '',
                          }),
                          description: e.target.value,
                        },
                      },
                    }))
                  }
                  className="w-full text-xs p-3 border border-gray-200 rounded-xl"
                />
              </div>

              <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl flex items-start gap-3">
                <Icon icon="solar:info-circle-bold" className="text-[#c6a87c] shrink-0 mt-0.5" width="18" />
                <div className="text-xs text-gray-600 leading-relaxed">
                  <strong className="font-semibold text-gray-900 block mb-0.5">Gestão de Projectos Individuais:</strong>
                  Para criar novas obras, alterar plantas técnicas, fotografias de estaleiro ou equipas de engenharia, aceda à secção de <strong>Projectos</strong> no menu principal do painel.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. CTA */}
        {activeSection === 'cta' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-gray-900 font-heading">
                  Bloco de Apelo à Acção (CTA)
                </h3>
                <p className="text-xs text-gray-500">
                  Banner no rodapé do portfólio que convida para avaliação de terreno ou consultoria prévia.
                </p>
              </div>
              <label className="flex items-center gap-2 cursor-pointer bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200 shrink-0">
                <input
                  type="checkbox"
                  checked={draft.sections.cta.enabled ?? true}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        cta: { ...prev.sections.cta, enabled: e.target.checked },
                      },
                    }))
                  }
                  className="rounded text-[#c6a87c] focus:ring-[#c6a87c]"
                />
                <span className="text-xs font-semibold text-gray-700">Secção Activa</span>
              </label>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Etiqueta Superior (Tag)</label>
                <input
                  type="text"
                  value={draft.sections.cta.tag || ''}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        cta: { ...prev.sections.cta, tag: e.target.value },
                      },
                    }))
                  }
                  placeholder="Estudo de Viabilidade"
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Título do Bloco</label>
                <input
                  type="text"
                  value={draft.sections.cta.title}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        cta: { ...prev.sections.cta, title: e.target.value },
                      },
                    }))
                  }
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Descrição</label>
                <textarea
                  rows={2}
                  value={draft.sections.cta.description}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        cta: { ...prev.sections.cta, description: e.target.value },
                      },
                    }))
                  }
                  className="w-full text-xs p-3 border border-gray-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">Texto do Botão Principal</label>
                  <input
                    type="text"
                    value={draft.sections.cta.buttonLabel}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        sections: {
                          ...prev.sections,
                          cta: { ...prev.sections.cta, buttonLabel: e.target.value },
                        },
                      }))
                    }
                    className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">Link de Destino</label>
                  <input
                    type="text"
                    placeholder="#contactos"
                    value={draft.sections.cta.buttonLink || ''}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        sections: {
                          ...prev.sections,
                          cta: { ...prev.sections.cta, buttonLink: e.target.value },
                        },
                      }))
                    }
                    className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Save Bar */}
        <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
          <span className="text-[11px] text-gray-400">
            Dica: Ao guardar, o portfólio do website sincroniza instantaneamente.
          </span>
          <button
            type="button"
            onClick={onSave}
            className="px-6 py-2.5 bg-[#c6a87c] hover:bg-[#b59567] text-black font-semibold text-xs rounded-xl shadow-xs flex items-center gap-2 cursor-pointer transition-all"
          >
            <Icon icon="solar:check-circle-bold" width="16" />
            <span>Guardar Alterações da Página de Projectos</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   4. SERVICES PAGE EDITOR
   ========================================================================= */
function ServicesPageEditor({
  draft,
  onChange,
  activeSection,
  onSectionChange,
  onSave,
}: {
  draft: ServicesPageContent;
  onChange: React.Dispatch<React.SetStateAction<ServicesPageContent>>;
  activeSection: string;
  onSectionChange: (sec: string) => void;
  onSave: () => void;
}) {
  const sections = [
    { id: 'hero', label: '1. Hero & Badges de Destaque', icon: 'solar:palette-round-bold' },
    { id: 'servicesList', label: '2. Catálogo & Áreas de Actuação', icon: 'solar:layers-bold' },
    { id: 'methodology', label: '3. Metodologia de Fases (Processo)', icon: 'solar:tuning-square-bold' },
    { id: 'faq', label: '4. Perguntas Frequentes (FAQ)', icon: 'solar:question-circle-bold' },
    { id: 'cta', label: '5. Bloco de Diagnóstico (CTA)', icon: 'solar:phone-calling-bold' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Sidebar Sections Navigation */}
      <div className="lg:col-span-3 space-y-1 bg-white p-3 rounded-2xl border border-gray-200 shadow-2xs h-fit">
        <div className="px-3 py-2 text-[11px] font-mono uppercase text-gray-400 tracking-wider">
          Secções de Serviços
        </div>
        {sections.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => onSectionChange(s.id)}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-all cursor-pointer ${
              activeSection === s.id
                ? 'bg-[#c6a87c] text-black shadow-xs'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Icon icon={s.icon} width="16" />
            <span className="truncate">{s.label}</span>
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="lg:col-span-9 bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-2xs space-y-6">
        {/* 1. HERO */}
        {activeSection === 'hero' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-gray-900 font-heading">
                  Hero & Badges de Serviços
                </h3>
                <p className="text-xs text-gray-500">
                  Cabeçalho de grande escala com imagem de fundo, breadcrumbs e especialidades em destaque.
                </p>
              </div>
              <label className="flex items-center gap-2 cursor-pointer bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200 shrink-0">
                <input
                  type="checkbox"
                  checked={draft.hero.enabled ?? true}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      hero: { ...prev.hero, enabled: e.target.checked },
                    }))
                  }
                  className="rounded text-[#c6a87c] focus:ring-[#c6a87c]"
                />
                <span className="text-xs font-semibold text-gray-700">Secção Activa</span>
              </label>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Etiqueta Superior (Breadcrumb / Badge)</label>
                <input
                  type="text"
                  value={draft.hero.badge}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      hero: { ...prev.hero, badge: e.target.value },
                    }))
                  }
                  placeholder="Início / Serviços"
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Título Principal</label>
                <input
                  type="text"
                  value={draft.hero.title}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      hero: { ...prev.hero, title: e.target.value },
                    }))
                  }
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Descrição Detalhada</label>
                <textarea
                  rows={3}
                  value={draft.hero.description}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      hero: { ...prev.hero, description: e.target.value },
                    }))
                  }
                  className="w-full text-xs p-3 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none"
                />
              </div>

              <ImagePickerInput
                label="Fotografia de Fundo do Hero (Serviços)"
                value={draft.hero.bgImage}
                onChange={(url) =>
                  onChange((prev) => ({
                    ...prev,
                    hero: { ...prev.hero, bgImage: url },
                  }))
                }
                helperText="Imagem de alta resolução exibida no topo da página de serviços."
              />

              {/* Tag Pills / Especialidades em Destaque */}
              <div className="pt-4 border-t border-gray-100 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 uppercase font-mono tracking-wider">
                      Badges / Pílulas em Destaque no Hero
                    </h4>
                    <p className="text-[11px] text-gray-500">
                      Rótulos compactos exibidos na barra inferior do cabeçalho.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const currentPills = draft.hero.tagPills || [];
                      onChange((prev) => ({
                        ...prev,
                        hero: {
                          ...prev.hero,
                          tagPills: [...currentPills, 'Nova Especialidade'],
                        },
                      }));
                    }}
                    className="px-3 py-1.5 bg-[#c6a87c]/15 hover:bg-[#c6a87c]/25 text-[#917246] font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Icon icon="solar:add-circle-bold" width="14" />
                    <span>Adicionar Badge</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {(draft.hero.tagPills || []).map((pill, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={pill}
                        onChange={(e) => {
                          const updated = [...(draft.hero.tagPills || [])];
                          updated[idx] = e.target.value;
                          onChange((prev) => ({
                            ...prev,
                            hero: { ...prev.hero, tagPills: updated },
                          }));
                        }}
                        className="flex-1 text-xs px-3 py-2 border border-gray-200 rounded-xl bg-gray-50/50"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = (draft.hero.tagPills || []).filter((_, i) => i !== idx);
                          onChange((prev) => ({
                            ...prev,
                            hero: { ...prev.hero, tagPills: updated },
                          }));
                        }}
                        className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Remover Badge"
                      >
                        <Icon icon="solar:trash-bin-trash-linear" width="16" />
                      </button>
                    </div>
                  ))}
                  {(!draft.hero.tagPills || draft.hero.tagPills.length === 0) && (
                    <div className="p-3 text-center text-xs text-gray-400 border border-dashed border-gray-200 rounded-xl">
                      Nenhum badge configurado no hero.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. SERVICES LIST (CATÁLOGO) */}
        {activeSection === 'servicesList' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-gray-900 font-heading">
                  Catálogo & Áreas de Actuação
                </h3>
                <p className="text-xs text-gray-500">
                  Cabeçalho da apresentação detalhada de cada núcleo técnico e entregáveis.
                </p>
              </div>
              <label className="flex items-center gap-2 cursor-pointer bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200 shrink-0">
                <input
                  type="checkbox"
                  checked={draft.sections.servicesList?.enabled ?? true}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        servicesList: {
                          ...(prev.sections.servicesList || {
                            tag: 'Áreas de Actuação',
                            title: 'As Nossas Especialidades Técnicas',
                            description: '',
                          }),
                          enabled: e.target.checked,
                        },
                      },
                    }))
                  }
                  className="rounded text-[#c6a87c] focus:ring-[#c6a87c]"
                />
                <span className="text-xs font-semibold text-gray-700">Secção Activa</span>
              </label>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Etiqueta Superior (Tag)</label>
                <input
                  type="text"
                  value={draft.sections.servicesList?.tag || ''}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        servicesList: {
                          ...(prev.sections.servicesList || {
                            enabled: true,
                            title: '',
                            description: '',
                          }),
                          tag: e.target.value,
                        },
                      },
                    }))
                  }
                  placeholder="Áreas de Actuação"
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Título da Secção</label>
                <input
                  type="text"
                  value={draft.sections.servicesList?.title || ''}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        servicesList: {
                          ...(prev.sections.servicesList || {
                            enabled: true,
                            tag: '',
                            description: '',
                          }),
                          title: e.target.value,
                        },
                      },
                    }))
                  }
                  placeholder="As Nossas Especialidades Técnicas"
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Descrição de Enquadramento</label>
                <textarea
                  rows={3}
                  value={draft.sections.servicesList?.description || ''}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        servicesList: {
                          ...(prev.sections.servicesList || {
                            enabled: true,
                            tag: '',
                            title: '',
                          }),
                          description: e.target.value,
                        },
                      },
                    }))
                  }
                  className="w-full text-xs p-3 border border-gray-200 rounded-xl"
                />
              </div>

              {/* Informative notice */}
              <div className="p-4 bg-amber-50/70 border border-amber-200/70 rounded-xl flex items-start gap-3">
                <Icon icon="solar:info-circle-bold" className="text-amber-600 shrink-0 mt-0.5" width="18" />
                <div className="text-xs text-amber-900 leading-relaxed">
                  <strong className="font-semibold block mb-0.5">Especialidades Detalhadas (ESP-01 a ESP-05):</strong>
                  As fichas com fotografias de autor, listas de entregáveis técnicos e prazos típicos (Residencial, Comercial, Interiores, Urbanismo e Fiscalização de Obra) são renderizadas com suporte dinâmico no catálogo público.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. METHODOLOGY (PROCESS) */}
        {activeSection === 'methodology' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-gray-900 font-heading">
                  Metodologia & Fases de Projecto
                </h3>
                <p className="text-xs text-gray-500">
                  Matriz das etapas de entrega que orientam o cliente desde o estudo prévio até à fiscalização de estaleiro.
                </p>
              </div>
              <label className="flex items-center gap-2 cursor-pointer bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200 shrink-0">
                <input
                  type="checkbox"
                  checked={draft.sections.methodology?.enabled ?? true}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        methodology: {
                          ...(prev.sections.methodology || {
                            tag: 'Processo Construtivo',
                            title: 'Metodologia de Trabalho STAK',
                            description: '',
                            steps: initialMethodology,
                          }),
                          enabled: e.target.checked,
                        },
                      },
                    }))
                  }
                  className="rounded text-[#c6a87c] focus:ring-[#c6a87c]"
                />
                <span className="text-xs font-semibold text-gray-700">Secção Activa</span>
              </label>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">Etiqueta Superior (Tag)</label>
                  <input
                    type="text"
                    value={draft.sections.methodology?.tag || ''}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        sections: {
                          ...prev.sections,
                          methodology: {
                            ...(prev.sections.methodology || {
                              enabled: true,
                              title: '',
                              description: '',
                              steps: initialMethodology,
                            }),
                            tag: e.target.value,
                          },
                        },
                      }))
                    }
                    placeholder="Estrutura Contratual"
                    className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">Título da Secção</label>
                  <input
                    type="text"
                    value={draft.sections.methodology?.title || ''}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        sections: {
                          ...prev.sections,
                          methodology: {
                            ...(prev.sections.methodology || {
                              enabled: true,
                              tag: '',
                              description: '',
                              steps: initialMethodology,
                            }),
                            title: e.target.value,
                          },
                        },
                      }))
                    }
                    placeholder="As fases de entrega de um projecto STAK"
                    className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Descrição de Apoio</label>
                <textarea
                  rows={2}
                  value={draft.sections.methodology?.description || ''}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        methodology: {
                          ...(prev.sections.methodology || {
                            enabled: true,
                            tag: '',
                            title: '',
                            steps: initialMethodology,
                          }),
                          description: e.target.value,
                        },
                      },
                    }))
                  }
                  className="w-full text-xs p-3 border border-gray-200 rounded-xl"
                />
              </div>

              {/* Fases / Etapas CRUD */}
              <div className="pt-4 border-t border-gray-100 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 font-heading">
                      Fases Metodológicas de Trabalho ({draft.sections.methodology?.steps?.length || 0})
                    </h4>
                    <p className="text-xs text-gray-500">
                      Configure cada fase com o seu número, título e entregáveis chave.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {(!draft.sections.methodology?.steps || draft.sections.methodology.steps.length === 0) && (
                      <button
                        type="button"
                        onClick={() => {
                          onChange((prev) => ({
                            ...prev,
                            sections: {
                              ...prev.sections,
                              methodology: {
                                ...(prev.sections.methodology || {
                                  enabled: true,
                                  tag: 'Processo Construtivo',
                                  title: 'Metodologia de Trabalho STAK',
                                  description: '',
                                }),
                                steps: initialMethodology,
                              },
                            },
                          }));
                        }}
                        className="px-3 py-1.5 text-xs text-gray-600 hover:text-gray-900 border border-gray-200 rounded-xl transition-colors cursor-pointer"
                      >
                        Carregar Fases Predefinidas
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        const currentSteps = draft.sections.methodology?.steps || [];
                        const nextNum = currentSteps.length + 1;
                        const newStep: MethodologyStep = {
                          step: `Fase ${nextNum}`,
                          title: `Nova Etapa de Projecto`,
                          desc: 'Descrição detalhada dos estudos, desenhos técnicos e validações desta fase.',
                        };
                        onChange((prev) => ({
                          ...prev,
                          sections: {
                            ...prev.sections,
                            methodology: {
                              ...(prev.sections.methodology || {
                                enabled: true,
                                tag: 'Processo Construtivo',
                                title: 'Metodologia de Trabalho STAK',
                                description: '',
                              }),
                              steps: [...currentSteps, newStep],
                            },
                          },
                        }));
                      }}
                      className="px-3.5 py-2 bg-[#c6a87c]/15 hover:bg-[#c6a87c]/25 text-[#917246] font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Icon icon="solar:add-circle-bold" width="16" />
                      <span>Adicionar Fase</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  {(draft.sections.methodology?.steps || []).map((stepItem, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-gray-200 bg-gray-50/70 space-y-3">
                      <div className="flex items-center justify-between border-b border-gray-200/70 pb-2">
                        <span className="text-xs font-mono font-bold text-[#c6a87c] flex items-center gap-2">
                          <Icon icon="solar:round-transfer-diagonal-linear" width="14" />
                          <span>{stepItem.step || `Fase ${idx + 1}`}: {stepItem.title}</span>
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => {
                              const steps = [...(draft.sections.methodology?.steps || [])];
                              const temp = steps[idx];
                              steps[idx] = steps[idx - 1];
                              steps[idx - 1] = temp;
                              onChange((prev) => ({
                                ...prev,
                                sections: {
                                  ...prev.sections,
                                  methodology: {
                                    ...prev.sections.methodology,
                                    steps,
                                  },
                                },
                              }));
                            }}
                            className="p-1 rounded text-gray-500 hover:bg-gray-200 disabled:opacity-30 cursor-pointer"
                            title="Mover para cima"
                          >
                            <Icon icon="solar:arrow-up-linear" width="14" />
                          </button>
                          <button
                            type="button"
                            disabled={idx === (draft.sections.methodology?.steps?.length || 1) - 1}
                            onClick={() => {
                              const steps = [...(draft.sections.methodology?.steps || [])];
                              const temp = steps[idx];
                              steps[idx] = steps[idx + 1];
                              steps[idx + 1] = temp;
                              onChange((prev) => ({
                                ...prev,
                                sections: {
                                  ...prev.sections,
                                  methodology: {
                                    ...prev.sections.methodology,
                                    steps,
                                  },
                                },
                              }));
                            }}
                            className="p-1 rounded text-gray-500 hover:bg-gray-200 disabled:opacity-30 cursor-pointer"
                            title="Mover para baixo"
                          >
                            <Icon icon="solar:arrow-down-linear" width="14" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const steps = (draft.sections.methodology?.steps || []).filter((_, i) => i !== idx);
                              onChange((prev) => ({
                                ...prev,
                                sections: {
                                  ...prev.sections,
                                  methodology: {
                                    ...prev.sections.methodology,
                                    steps,
                                  },
                                },
                              }));
                            }}
                            className="p-1 text-rose-500 hover:bg-rose-50 rounded transition-colors cursor-pointer"
                            title="Eliminar Fase"
                          >
                            <Icon icon="solar:trash-bin-trash-linear" width="16" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-gray-600">Identificador da Fase</label>
                          <input
                            type="text"
                            value={stepItem.step}
                            onChange={(e) => {
                              const steps = [...(draft.sections.methodology?.steps || [])];
                              steps[idx] = { ...steps[idx], step: e.target.value };
                              onChange((prev) => ({
                                ...prev,
                                sections: {
                                  ...prev.sections,
                                  methodology: {
                                    ...prev.sections.methodology,
                                    steps,
                                  },
                                },
                              }));
                            }}
                            placeholder="Fase 1"
                            className="w-full text-xs px-2.5 py-1.5 border border-gray-200 rounded-lg bg-white font-mono"
                          />
                        </div>

                        <div className="sm:col-span-2 space-y-1">
                          <label className="text-[11px] font-semibold text-gray-600">Título da Fase</label>
                          <input
                            type="text"
                            value={stepItem.title}
                            onChange={(e) => {
                              const steps = [...(draft.sections.methodology?.steps || [])];
                              steps[idx] = { ...steps[idx], title: e.target.value };
                              onChange((prev) => ({
                                ...prev,
                                sections: {
                                  ...prev.sections,
                                  methodology: {
                                    ...prev.sections.methodology,
                                    steps,
                                  },
                                },
                              }));
                            }}
                            placeholder="Estudo Prévio & Concepção"
                            className="w-full text-xs px-2.5 py-1.5 border border-gray-200 rounded-lg bg-white font-medium"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-gray-600">Descrição / Entregáveis da Fase</label>
                        <textarea
                          rows={2}
                          value={stepItem.desc || stepItem.description || ''}
                          onChange={(e) => {
                            const steps = [...(draft.sections.methodology?.steps || [])];
                            steps[idx] = {
                              ...steps[idx],
                              desc: e.target.value,
                              description: e.target.value,
                            };
                            onChange((prev) => ({
                              ...prev,
                              sections: {
                                ...prev.sections,
                                methodology: {
                                  ...prev.sections.methodology,
                                  steps,
                                },
                              },
                            }));
                          }}
                          placeholder="Conceito arquitectónico, distribuição volumétrica e simulações 3D..."
                          className="w-full text-xs p-2.5 border border-gray-200 rounded-xl bg-white"
                        />
                      </div>
                    </div>
                  ))}

                  {(!draft.sections.methodology?.steps || draft.sections.methodology.steps.length === 0) && (
                    <div className="p-6 rounded-xl border border-dashed border-gray-200 text-center text-xs text-gray-400">
                      Nenhuma fase configurada. Clique em "Adicionar Fase" ou recarregue as fases padrão da STAK.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. FAQ (PERGUNTAS FREQUENTES) */}
        {activeSection === 'faq' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-gray-900 font-heading">
                  Perguntas Frequentes & Esclarecimentos Técnicos (FAQ)
                </h3>
                <p className="text-xs text-gray-500">
                  Esclareça dúvidas comuns sobre licenciamento municipal no GPL, orçamentação e fiscalização.
                </p>
              </div>
              <label className="flex items-center gap-2 cursor-pointer bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200 shrink-0">
                <input
                  type="checkbox"
                  checked={draft.sections.faq?.enabled ?? true}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        faq: {
                          ...(prev.sections.faq || {
                            tag: 'Esclarecimentos & FAQs',
                            title: 'Perguntas Frequentes sobre os Nossos Serviços',
                            description: '',
                            items: initialFaqs,
                          }),
                          enabled: e.target.checked,
                        },
                      },
                    }))
                  }
                  className="rounded text-[#c6a87c] focus:ring-[#c6a87c]"
                />
                <span className="text-xs font-semibold text-gray-700">Secção Activa</span>
              </label>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">Etiqueta Superior (Tag)</label>
                  <input
                    type="text"
                    value={draft.sections.faq?.tag || ''}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        sections: {
                          ...prev.sections,
                          faq: {
                            ...(prev.sections.faq || {
                              enabled: true,
                              title: '',
                              description: '',
                              items: initialFaqs,
                            }),
                            tag: e.target.value,
                          },
                        },
                      }))
                    }
                    placeholder="Dúvidas Técnicas & Processuais"
                    className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">Título da Secção</label>
                  <input
                    type="text"
                    value={draft.sections.faq?.title || ''}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        sections: {
                          ...prev.sections,
                          faq: {
                            ...(prev.sections.faq || {
                              enabled: true,
                              tag: '',
                              description: '',
                              items: initialFaqs,
                            }),
                            title: e.target.value,
                          },
                        },
                      }))
                    }
                    placeholder="Perguntas frequentes sobre os nossos serviços"
                    className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Descrição de Apoio</label>
                <textarea
                  rows={2}
                  value={draft.sections.faq?.description || ''}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        faq: {
                          ...(prev.sections.faq || {
                            enabled: true,
                            tag: '',
                            title: '',
                            items: initialFaqs,
                          }),
                          description: e.target.value,
                        },
                      },
                    }))
                  }
                  className="w-full text-xs p-3 border border-gray-200 rounded-xl"
                />
              </div>

              {/* FAQ Items CRUD */}
              <div className="pt-4 border-t border-gray-100 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 font-heading">
                      Lista de Perguntas & Respostas ({draft.sections.faq?.items?.length || 0})
                    </h4>
                    <p className="text-xs text-gray-500">
                      Adicione, edite ou reorganize o acordeão interactivo.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {(!draft.sections.faq?.items || draft.sections.faq.items.length === 0) && (
                      <button
                        type="button"
                        onClick={() => {
                          onChange((prev) => ({
                            ...prev,
                            sections: {
                              ...prev.sections,
                              faq: {
                                ...(prev.sections.faq || {
                                  enabled: true,
                                  tag: 'Esclarecimentos & FAQs',
                                  title: 'Perguntas Frequentes sobre os Nossos Serviços',
                                  description: '',
                                }),
                                items: initialFaqs,
                              },
                            },
                          }));
                        }}
                        className="px-3 py-1.5 text-xs text-gray-600 hover:text-gray-900 border border-gray-200 rounded-xl transition-colors cursor-pointer"
                      >
                        Carregar Perguntas Padrão
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        const currentItems = draft.sections.faq?.items || [];
                        const newItem: FaqItem = {
                          id: `faq-${Date.now()}`,
                          question: 'Nova Pergunta Frequente',
                          answer: 'Explicação e detalhes técnicos sobre o processo do atelier STAK.',
                        };
                        onChange((prev) => ({
                          ...prev,
                          sections: {
                            ...prev.sections,
                            faq: {
                              ...(prev.sections.faq || {
                                enabled: true,
                                tag: 'Esclarecimentos & FAQs',
                                title: 'Perguntas Frequentes sobre os Nossos Serviços',
                                description: '',
                              }),
                              items: [...currentItems, newItem],
                            },
                          },
                        }));
                      }}
                      className="px-3.5 py-2 bg-[#c6a87c]/15 hover:bg-[#c6a87c]/25 text-[#917246] font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Icon icon="solar:add-circle-bold" width="16" />
                      <span>Adicionar Pergunta</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  {(draft.sections.faq?.items || []).map((faqItem, idx) => (
                    <div key={faqItem.id || idx} className="p-4 rounded-xl border border-gray-200 bg-gray-50/70 space-y-3">
                      <div className="flex items-center justify-between border-b border-gray-200/70 pb-2">
                        <span className="text-xs font-mono font-bold text-[#c6a87c] truncate max-w-md">
                          #{idx + 1}: {faqItem.question || 'Sem título'}
                        </span>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => {
                              const items = [...(draft.sections.faq?.items || [])];
                              const temp = items[idx];
                              items[idx] = items[idx - 1];
                              items[idx - 1] = temp;
                              onChange((prev) => ({
                                ...prev,
                                sections: {
                                  ...prev.sections,
                                  faq: {
                                    ...prev.sections.faq,
                                    items,
                                  },
                                },
                              }));
                            }}
                            className="p-1 rounded text-gray-500 hover:bg-gray-200 disabled:opacity-30 cursor-pointer"
                            title="Mover para cima"
                          >
                            <Icon icon="solar:arrow-up-linear" width="14" />
                          </button>
                          <button
                            type="button"
                            disabled={idx === (draft.sections.faq?.items?.length || 1) - 1}
                            onClick={() => {
                              const items = [...(draft.sections.faq?.items || [])];
                              const temp = items[idx];
                              items[idx] = items[idx + 1];
                              items[idx + 1] = temp;
                              onChange((prev) => ({
                                ...prev,
                                sections: {
                                  ...prev.sections,
                                  faq: {
                                    ...prev.sections.faq,
                                    items,
                                  },
                                },
                              }));
                            }}
                            className="p-1 rounded text-gray-500 hover:bg-gray-200 disabled:opacity-30 cursor-pointer"
                            title="Mover para baixo"
                          >
                            <Icon icon="solar:arrow-down-linear" width="14" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const items = (draft.sections.faq?.items || []).filter((_, i) => i !== idx);
                              onChange((prev) => ({
                                ...prev,
                                sections: {
                                  ...prev.sections,
                                  faq: {
                                    ...prev.sections.faq,
                                    items,
                                  },
                                },
                              }));
                            }}
                            className="p-1 text-rose-500 hover:bg-rose-50 rounded transition-colors cursor-pointer"
                            title="Eliminar Pergunta"
                          >
                            <Icon icon="solar:trash-bin-trash-linear" width="16" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-gray-600">Pergunta Formulada</label>
                        <input
                          type="text"
                          value={faqItem.question}
                          onChange={(e) => {
                            const items = [...(draft.sections.faq?.items || [])];
                            items[idx] = { ...items[idx], question: e.target.value };
                            onChange((prev) => ({
                              ...prev,
                              sections: {
                                ...prev.sections,
                                faq: {
                                  ...prev.sections.faq,
                                  items,
                                },
                              },
                            }));
                          }}
                          placeholder="Ex: Como funciona a tramitação no GPL?"
                          className="w-full text-xs px-2.5 py-1.5 border border-gray-200 rounded-lg bg-white font-medium"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-gray-600">Resposta Detalhada</label>
                        <textarea
                          rows={3}
                          value={faqItem.answer}
                          onChange={(e) => {
                            const items = [...(draft.sections.faq?.items || [])];
                            items[idx] = { ...items[idx], answer: e.target.value };
                            onChange((prev) => ({
                              ...prev,
                              sections: {
                                ...prev.sections,
                                faq: {
                                  ...prev.sections.faq,
                                  items,
                                },
                              },
                            }));
                          }}
                          placeholder="A equipa da STAK assume toda a instrução processual..."
                          className="w-full text-xs p-2.5 border border-gray-200 rounded-xl bg-white"
                        />
                      </div>
                    </div>
                  ))}

                  {(!draft.sections.faq?.items || draft.sections.faq.items.length === 0) && (
                    <div className="p-6 rounded-xl border border-dashed border-gray-200 text-center text-xs text-gray-400">
                      Nenhuma pergunta frequente cadastrada. Clique em "Adicionar Pergunta" ou recarregue as perguntas padrão.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 5. CTA SECTION */}
        {activeSection === 'cta' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-gray-900 font-heading">
                  Bloco de Apelo à Acção (CTA de Diagnóstico)
                </h3>
                <p className="text-xs text-gray-500">
                  Banner no rodapé da página que convida o cliente a agendar consulta ou pedir proposta.
                </p>
              </div>
              <label className="flex items-center gap-2 cursor-pointer bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200 shrink-0">
                <input
                  type="checkbox"
                  checked={draft.sections.cta.enabled ?? true}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        cta: { ...prev.sections.cta, enabled: e.target.checked },
                      },
                    }))
                  }
                  className="rounded text-[#c6a87c] focus:ring-[#c6a87c]"
                />
                <span className="text-xs font-semibold text-gray-700">Secção Activa</span>
              </label>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Título do Bloco de Apelo</label>
                <input
                  type="text"
                  value={draft.sections.cta.title}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        cta: { ...prev.sections.cta, title: e.target.value },
                      },
                    }))
                  }
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Descrição do Bloco</label>
                <textarea
                  rows={2}
                  value={draft.sections.cta.description}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        cta: { ...prev.sections.cta, description: e.target.value },
                      },
                    }))
                  }
                  className="w-full text-xs p-3 border border-gray-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">Texto do Botão Principal</label>
                  <input
                    type="text"
                    value={draft.sections.cta.buttonLabel}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        sections: {
                          ...prev.sections,
                          cta: { ...prev.sections.cta, buttonLabel: e.target.value },
                        },
                      }))
                    }
                    className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">Link de Destino</label>
                  <input
                    type="text"
                    placeholder="#contactos"
                    value={draft.sections.cta.buttonLink || ''}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        sections: {
                          ...prev.sections,
                          cta: { ...prev.sections.cta, buttonLink: e.target.value },
                        },
                      }))
                    }
                    className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Save Bar */}
        <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
          <span className="text-[11px] text-gray-400">
            Dica: Ao guardar, a página de serviços do website sincroniza instantaneamente.
          </span>
          <button
            type="button"
            onClick={onSave}
            className="px-6 py-2.5 bg-[#c6a87c] hover:bg-[#b59567] text-black font-semibold text-xs rounded-xl shadow-xs flex items-center gap-2 cursor-pointer transition-all"
          >
            <Icon icon="solar:check-circle-bold" width="16" />
            <span>Guardar Alterações de Serviços</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   5. ARTICLES PAGE EDITOR
   ========================================================================= */
function ArticlesPageEditor({
  draft,
  onChange,
  activeSection,
  onSectionChange,
  onSave,
}: {
  draft: ArticlesPageContent;
  onChange: React.Dispatch<React.SetStateAction<ArticlesPageContent>>;
  activeSection: string;
  onSectionChange: (sec: string) => void;
  onSave: () => void;
}) {
  const sections = [
    { id: 'hero', label: '1. Hero & Badges Editoriais', icon: 'solar:palette-round-bold' },
    { id: 'editorialIntro', label: '2. Introdução Editorial', icon: 'solar:document-text-bold' },
    { id: 'newsletter', label: '3. Subscrição de Newsletter', icon: 'solar:letter-bold' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Sidebar Navigation */}
      <div className="lg:col-span-3 space-y-1 bg-white p-3 rounded-2xl border border-gray-200 shadow-2xs h-fit">
        <div className="px-3 py-2 text-[11px] font-mono uppercase text-gray-400 tracking-wider">
          Secções de Artigos
        </div>
        {sections.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => onSectionChange(s.id)}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-all cursor-pointer ${
              activeSection === s.id
                ? 'bg-[#c6a87c] text-black shadow-xs'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Icon icon={s.icon} width="16" />
            <span className="truncate">{s.label}</span>
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="lg:col-span-9 bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-2xs space-y-6">
        {/* 1. HERO */}
        {activeSection === 'hero' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-gray-900 font-heading">
                  Hero da Página de Artigos & Publicações
                </h3>
                <p className="text-xs text-gray-500">
                  Cabeçalho editorial com fotografia de fundo e destaques de investigação técnica.
                </p>
              </div>
              <label className="flex items-center gap-2 cursor-pointer bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200 shrink-0">
                <input
                  type="checkbox"
                  checked={draft.hero.enabled ?? true}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      hero: { ...prev.hero, enabled: e.target.checked },
                    }))
                  }
                  className="rounded text-[#c6a87c] focus:ring-[#c6a87c]"
                />
                <span className="text-xs font-semibold text-gray-700">Secção Activa</span>
              </label>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Etiqueta Superior (Badge)</label>
                <input
                  type="text"
                  value={draft.hero.badge}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      hero: { ...prev.hero, badge: e.target.value },
                    }))
                  }
                  placeholder="Publicações & Diário do Atelier"
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Título Principal</label>
                <input
                  type="text"
                  value={draft.hero.title}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      hero: { ...prev.hero, title: e.target.value },
                    }))
                  }
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Descrição</label>
                <textarea
                  rows={3}
                  value={draft.hero.description}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      hero: { ...prev.hero, description: e.target.value },
                    }))
                  }
                  className="w-full text-xs p-3 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none"
                />
              </div>

              <ImagePickerInput
                label="Fotografia de Fundo do Hero (Artigos)"
                value={draft.hero.bgImage}
                onChange={(url) =>
                  onChange((prev) => ({
                    ...prev,
                    hero: { ...prev.hero, bgImage: url },
                  }))
                }
                helperText="Imagem de textura ou estaleiro com tonalidade escura para o topo da revista."
              />
            </div>
          </div>
        )}

        {/* 2. EDITORIAL INTRO */}
        {activeSection === 'editorialIntro' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-gray-900 font-heading">
                  Introdução Editorial & Revista
                </h3>
                <p className="text-xs text-gray-500">
                  Enquadramento teórico antes da grelha de ensaios e artigos publicados.
                </p>
              </div>
              <label className="flex items-center gap-2 cursor-pointer bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200 shrink-0">
                <input
                  type="checkbox"
                  checked={draft.sections.editorialIntro?.enabled ?? true}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        editorialIntro: {
                          ...(prev.sections.editorialIntro || {
                            tag: 'Conhecimento Partilhado',
                            title: 'Artigos Recentes & Diários de Obra',
                            description: '',
                          }),
                          enabled: e.target.checked,
                        },
                      },
                    }))
                  }
                  className="rounded text-[#c6a87c] focus:ring-[#c6a87c]"
                />
                <span className="text-xs font-semibold text-gray-700">Secção Activa</span>
              </label>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Etiqueta Superior (Tag)</label>
                <input
                  type="text"
                  value={draft.sections.editorialIntro?.tag || ''}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        editorialIntro: {
                          ...(prev.sections.editorialIntro || {
                            enabled: true,
                            title: '',
                            description: '',
                          }),
                          tag: e.target.value,
                        },
                      },
                    }))
                  }
                  placeholder="Conhecimento Partilhado"
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Título da Secção</label>
                <input
                  type="text"
                  value={draft.sections.editorialIntro?.title || ''}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        editorialIntro: {
                          ...(prev.sections.editorialIntro || {
                            enabled: true,
                            tag: '',
                            description: '',
                          }),
                          title: e.target.value,
                        },
                      },
                    }))
                  }
                  placeholder="Artigos Recentes & Diários de Obra"
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Descrição de Enquadramento</label>
                <textarea
                  rows={3}
                  value={draft.sections.editorialIntro?.description || ''}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        editorialIntro: {
                          ...(prev.sections.editorialIntro || {
                            enabled: true,
                            tag: '',
                            title: '',
                          }),
                          description: e.target.value,
                        },
                      },
                    }))
                  }
                  className="w-full text-xs p-3 border border-gray-200 rounded-xl"
                />
              </div>

              <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl flex items-start gap-3">
                <Icon icon="solar:info-circle-bold" className="text-[#c6a87c] shrink-0 mt-0.5" width="18" />
                <div className="text-xs text-gray-600 leading-relaxed">
                  <strong className="font-semibold text-gray-900 block mb-0.5">Gestão de Publicações:</strong>
                  Para redigir novos artigos, editar ensaios existentes ou alterar fotografias de capa, aceda à secção de <strong>Artigos</strong> no menu principal do painel.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. NEWSLETTER */}
        {activeSection === 'newsletter' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-gray-900 font-heading">
                  Secção de Subscrição de Newsletter
                </h3>
                <p className="text-xs text-gray-500">
                  Formulário no rodapé para captura de e-mails de promotores e investidores.
                </p>
              </div>
              <label className="flex items-center gap-2 cursor-pointer bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200 shrink-0">
                <input
                  type="checkbox"
                  checked={draft.sections.newsletter.enabled ?? true}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        newsletter: { ...prev.sections.newsletter, enabled: e.target.checked },
                      },
                    }))
                  }
                  className="rounded text-[#c6a87c] focus:ring-[#c6a87c]"
                />
                <span className="text-xs font-semibold text-gray-700">Secção Activa</span>
              </label>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">Título do Boletim</label>
                  <input
                    type="text"
                    value={draft.sections.newsletter.title}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        sections: {
                          ...prev.sections,
                          newsletter: { ...prev.sections.newsletter, title: e.target.value },
                        },
                      }))
                    }
                    className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">Texto do Botão</label>
                  <input
                    type="text"
                    value={draft.sections.newsletter.buttonLabel}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        sections: {
                          ...prev.sections,
                          newsletter: { ...prev.sections.newsletter, buttonLabel: e.target.value },
                        },
                      }))
                    }
                    className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Descrição</label>
                <textarea
                  rows={2}
                  value={draft.sections.newsletter.description}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        newsletter: { ...prev.sections.newsletter, description: e.target.value },
                      },
                    }))
                  }
                  className="w-full text-xs p-3 border border-gray-200 rounded-xl"
                />
              </div>
            </div>
          </div>
        )}

        {/* Bottom Save Bar */}
        <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
          <span className="text-[11px] text-gray-400">
            Dica: Ao guardar, a página editorial do website sincroniza instantaneamente.
          </span>
          <button
            type="button"
            onClick={onSave}
            className="px-6 py-2.5 bg-[#c6a87c] hover:bg-[#b59567] text-black font-semibold text-xs rounded-xl shadow-xs flex items-center gap-2 cursor-pointer transition-all"
          >
            <Icon icon="solar:check-circle-bold" width="16" />
            <span>Guardar Alterações de Artigos</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   6. CONTACTS PAGE EDITOR
   ========================================================================= */
function ContactsPageEditor({
  draft,
  onChange,
  activeSection,
  onSectionChange,
  onSave,
}: {
  draft: ContactsPageContent;
  onChange: React.Dispatch<React.SetStateAction<ContactsPageContent>>;
  activeSection: string;
  onSectionChange: (sec: string) => void;
  onSave: () => void;
}) {
  const sections = [
    { id: 'hero', label: '1. Hero & Imagem de Fundo', icon: 'solar:palette-round-bold' },
    { id: 'info', label: '2. Gabinete de Luanda', icon: 'solar:buildings-3-bold' },
    { id: 'briefingIntro', label: '3. Ficha de Briefing', icon: 'solar:clipboard-list-bold' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Sidebar Navigation */}
      <div className="lg:col-span-3 space-y-1 bg-white p-3 rounded-2xl border border-gray-200 shadow-2xs h-fit">
        <div className="px-3 py-2 text-[11px] font-mono uppercase text-gray-400 tracking-wider">
          Secções de Contactos
        </div>
        {sections.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => onSectionChange(s.id)}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-all cursor-pointer ${
              activeSection === s.id
                ? 'bg-[#c6a87c] text-black shadow-xs'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Icon icon={s.icon} width="16" />
            <span className="truncate">{s.label}</span>
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="lg:col-span-9 bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-2xs space-y-6">
        {/* 1. HERO */}
        {activeSection === 'hero' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-gray-900 font-heading">
                  Hero da Página de Contactos
                </h3>
                <p className="text-xs text-gray-500">
                  Cabeçalho acolhedor com fotografia de fundo e garantias institucionais.
                </p>
              </div>
              <label className="flex items-center gap-2 cursor-pointer bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200 shrink-0">
                <input
                  type="checkbox"
                  checked={draft.hero.enabled ?? true}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      hero: { ...prev.hero, enabled: e.target.checked },
                    }))
                  }
                  className="rounded text-[#c6a87c] focus:ring-[#c6a87c]"
                />
                <span className="text-xs font-semibold text-gray-700">Secção Activa</span>
              </label>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Etiqueta Superior (Badge)</label>
                <input
                  type="text"
                  value={draft.hero.badge}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      hero: { ...prev.hero, badge: e.target.value },
                    }))
                  }
                  placeholder="Contactos & Ficha de Briefing"
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Título Principal</label>
                <input
                  type="text"
                  value={draft.hero.title}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      hero: { ...prev.hero, title: e.target.value },
                    }))
                  }
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Descrição</label>
                <textarea
                  rows={3}
                  value={draft.hero.description}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      hero: { ...prev.hero, description: e.target.value },
                    }))
                  }
                  className="w-full text-xs p-3 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none"
                />
              </div>

              <ImagePickerInput
                label="Fotografia de Fundo do Hero (Contactos)"
                value={draft.hero.bgImage}
                onChange={(url) =>
                  onChange((prev) => ({
                    ...prev,
                    hero: { ...prev.hero, bgImage: url },
                  }))
                }
                helperText="Imagem de recepção ou maquete física para transmitir proximidade e profissionalismo."
              />
            </div>
          </div>
        )}

        {/* 2. INFO GABINETE */}
        {activeSection === 'info' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-gray-900 font-heading">
                  Informações do Gabinete de Luanda
                </h3>
                <p className="text-xs text-gray-500">
                  Morada física, telefones, WhatsApp oficial, e-mail institucional e horário de recepção.
                </p>
              </div>
              <label className="flex items-center gap-2 cursor-pointer bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200 shrink-0">
                <input
                  type="checkbox"
                  checked={draft.sections.info.enabled ?? true}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        info: { ...prev.sections.info, enabled: e.target.checked },
                      },
                    }))
                  }
                  className="rounded text-[#c6a87c] focus:ring-[#c6a87c]"
                />
                <span className="text-xs font-semibold text-gray-700">Secção Activa</span>
              </label>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">Etiqueta Superior (Tag)</label>
                  <input
                    type="text"
                    value={draft.sections.info.tag || ''}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        sections: {
                          ...prev.sections,
                          info: { ...prev.sections.info, tag: e.target.value },
                        },
                      }))
                    }
                    placeholder="Atendimento & Localização"
                    className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">Título do Card</label>
                  <input
                    type="text"
                    value={draft.sections.info.title || ''}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        sections: {
                          ...prev.sections,
                          info: { ...prev.sections.info, title: e.target.value },
                        },
                      }))
                    }
                    placeholder="O Nosso Gabinete em Luanda"
                    className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Morada do Edifício / Sede</label>
                <input
                  type="text"
                  value={draft.sections.info.address}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        info: { ...prev.sections.info, address: e.target.value },
                      },
                    }))
                  }
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">Telefone Principal</label>
                  <input
                    type="text"
                    value={draft.sections.info.phone}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        sections: {
                          ...prev.sections,
                          info: { ...prev.sections.info, phone: e.target.value },
                        },
                      }))
                    }
                    className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">WhatsApp Comercial</label>
                  <input
                    type="text"
                    value={draft.sections.info.whatsapp}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        sections: {
                          ...prev.sections,
                          info: { ...prev.sections.info, whatsapp: e.target.value },
                        },
                      }))
                    }
                    className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">Email Geral</label>
                  <input
                    type="email"
                    value={draft.sections.info.email}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        sections: {
                          ...prev.sections,
                          info: { ...prev.sections.info, email: e.target.value },
                        },
                      }))
                    }
                    className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">Horário de Atendimento</label>
                  <input
                    type="text"
                    value={draft.sections.info.workingHours}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        sections: {
                          ...prev.sections,
                          info: { ...prev.sections.info, workingHours: e.target.value },
                        },
                      }))
                    }
                    className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">Aviso de Atendimento / Recepção</label>
                  <input
                    type="text"
                    value={draft.sections.info.receptionNotice || ''}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        sections: {
                          ...prev.sections,
                          info: { ...prev.sections.info, receptionNotice: e.target.value },
                        },
                      }))
                    }
                    placeholder="Reuniões presenciais sob agendamento prévio"
                    className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. BRIEFING INTRO */}
        {activeSection === 'briefingIntro' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-gray-900 font-heading">
                  Introdução à Ficha de Briefing
                </h3>
                <p className="text-xs text-gray-500">
                  Cabeçalho explicativo situado imediatamente acima do formulário técnico de submissão de obras.
                </p>
              </div>
              <label className="flex items-center gap-2 cursor-pointer bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200 shrink-0">
                <input
                  type="checkbox"
                  checked={draft.sections.briefingIntro?.enabled ?? true}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        briefingIntro: {
                          ...(prev.sections.briefingIntro || {
                            tag: 'Briefing Online',
                            title: 'Envie-nos os Dados do Seu Projecto',
                            description: '',
                          }),
                          enabled: e.target.checked,
                        },
                      },
                    }))
                  }
                  className="rounded text-[#c6a87c] focus:ring-[#c6a87c]"
                />
                <span className="text-xs font-semibold text-gray-700">Secção Activa</span>
              </label>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Etiqueta Superior (Tag)</label>
                <input
                  type="text"
                  value={draft.sections.briefingIntro?.tag || ''}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        briefingIntro: {
                          ...(prev.sections.briefingIntro || {
                            enabled: true,
                            title: '',
                            description: '',
                          }),
                          tag: e.target.value,
                        },
                      },
                    }))
                  }
                  placeholder="Formulário Oficial de Projecto"
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Título do Formulário</label>
                <input
                  type="text"
                  value={draft.sections.briefingIntro?.title || ''}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        briefingIntro: {
                          ...(prev.sections.briefingIntro || {
                            enabled: true,
                            tag: '',
                            description: '',
                          }),
                          title: e.target.value,
                        },
                      },
                    }))
                  }
                  placeholder="Ficha Técnica Preliminar de Briefing"
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Descrição Explicativa</label>
                <textarea
                  rows={3}
                  value={draft.sections.briefingIntro?.description || ''}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        briefingIntro: {
                          ...(prev.sections.briefingIntro || {
                            enabled: true,
                            tag: '',
                            title: '',
                          }),
                          description: e.target.value,
                        },
                      },
                    }))
                  }
                  className="w-full text-xs p-3 border border-gray-200 rounded-xl"
                />
              </div>

              <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl flex items-start gap-3">
                <Icon icon="solar:info-circle-bold" className="text-[#c6a87c] shrink-0 mt-0.5" width="18" />
                <div className="text-xs text-gray-600 leading-relaxed">
                  <strong className="font-semibold text-gray-900 block mb-0.5">Gestão dos Briefings Recebidos:</strong>
                  Quando os clientes submetem o formulário no website, os dados são registados na secção de <strong>Briefings</strong> do painel com alerta directo para o WhatsApp do atelier.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Save Bar */}
        <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
          <span className="text-[11px] text-gray-400">
            Dica: Ao guardar, as informações de contacto e briefing do website sincronizam instantaneamente.
          </span>
          <button
            type="button"
            onClick={onSave}
            className="px-6 py-2.5 bg-[#c6a87c] hover:bg-[#b59567] text-black font-semibold text-xs rounded-xl shadow-xs flex items-center gap-2 cursor-pointer transition-all"
          >
            <Icon icon="solar:check-circle-bold" width="16" />
            <span>Guardar Alterações de Contactos</span>
          </button>
        </div>
      </div>
    </div>
  );
}
