import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useCms } from '@/src/context/CmsContext';
import { SiteNavigationContent, NavPage, NavigationLinkItem } from '@/src/types';

export default function MenusManager() {
  const { pagesContent, updatePageContent } = useCms();
  const currentNav = pagesContent.navigation || {
    header: {
      items: [
        { id: 'nav-1', label: 'Início', page: 'inicio', enabled: true },
        { id: 'nav-2', label: 'O Atelier', page: 'sobre-nos', enabled: true },
        { id: 'nav-3', label: 'Projectos', page: 'projectos', enabled: true },
        { id: 'nav-4', label: 'Especialidades', page: 'servicos', enabled: true },
        { id: 'nav-5', label: 'Artigos', page: 'artigos', enabled: true },
        { id: 'nav-6', label: 'Contactos', page: 'contactos', enabled: true },
      ],
      ctaLabel: 'Agendar Briefing',
      ctaPage: 'contactos',
      showThemeToggle: true,
    },
    footer: {
      manifesto:
        'Gabinete de arquitectura de autor e design de ambientes de alto padrão em Luanda. Distinção estética, sustentabilidade bioclimática e rigor de execução.',
      socialLinks: {
        instagram: '@stak_arquitectura',
        whatsapp: '+244 928 058 840',
        linkedin: 'https://linkedin.com/company/stak-arquitectura',
        facebook: 'https://facebook.com/stakarquitectura',
      },
      navLinks: [
        { label: 'Página Inicial', page: 'inicio' },
        { label: 'O Atelier (Sobre Nós)', page: 'sobre-nos' },
        { label: 'Projectos & Obras', page: 'projectos' },
        { label: 'Especialidades', page: 'servicos' },
        { label: 'Publicações & Notícias', page: 'artigos' },
        { label: 'Contactos & Briefing', page: 'contactos' },
      ],
      copyrightNotice: '© STAK Arquitectura & Design de Interiores. Todos os direitos reservados. Luanda, Angola.',
      showRestrictedArea: true,
    },
  };

  const [navState, setNavState] = useState<SiteNavigationContent>(() => JSON.parse(JSON.stringify(currentNav)));
  const [activeTab, setActiveTab] = useState<'header' | 'footer'>('header');
  const [isSaved, setIsSaved] = useState(false);

  // Modal State for Header Link
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<NavigationLinkItem | null>(null);
  const [linkFormLabel, setLinkFormLabel] = useState('');
  const [linkFormPage, setLinkFormPage] = useState<NavPage>('inicio');
  const [linkFormUrl, setLinkFormUrl] = useState('');
  const [linkFormEnabled, setLinkFormEnabled] = useState(true);

  // Footer new nav link state
  const [footerLinkLabel, setFooterLinkLabel] = useState('');
  const [footerLinkPage, setFooterLinkPage] = useState<NavPage>('inicio');

  const pageOptions: { value: NavPage; label: string }[] = [
    { value: 'inicio', label: 'Página Inicial (Início)' },
    { value: 'sobre-nos', label: 'O Atelier (Sobre Nós)' },
    { value: 'projectos', label: 'Projectos & Obras' },
    { value: 'servicos', label: 'Especialidades & Serviços' },
    { value: 'artigos', label: 'Artigos & Notícias' },
    { value: 'contactos', label: 'Contactos & Briefing' },
  ];

  const handleOpenNewLink = () => {
    setEditingLink(null);
    setLinkFormLabel('');
    setLinkFormPage('inicio');
    setLinkFormUrl('');
    setLinkFormEnabled(true);
    setIsModalOpen(true);
  };

  const handleOpenEditLink = (link: NavigationLinkItem) => {
    setEditingLink(link);
    setLinkFormLabel(link.label);
    setLinkFormPage(link.page);
    setLinkFormUrl(link.url || '');
    setLinkFormEnabled(link.enabled);
    setIsModalOpen(true);
  };

  const handleSaveLinkModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkFormLabel.trim()) return;

    if (editingLink) {
      setNavState((prev) => ({
        ...prev,
        header: {
          ...prev.header,
          items: prev.header.items.map((item) =>
            item.id === editingLink.id
              ? {
                  ...item,
                  label: linkFormLabel,
                  page: linkFormPage,
                  url: linkFormUrl || undefined,
                  enabled: linkFormEnabled,
                }
              : item
          ),
        },
      }));
    } else {
      const newItem: NavigationLinkItem = {
        id: 'nav-' + Date.now(),
        label: linkFormLabel,
        page: linkFormPage,
        url: linkFormUrl || undefined,
        enabled: linkFormEnabled,
      };
      setNavState((prev) => ({
        ...prev,
        header: {
          ...prev.header,
          items: [...prev.header.items, newItem],
        },
      }));
    }

    setIsModalOpen(false);
  };

  const handleDeleteHeaderLink = (id: string) => {
    setNavState((prev) => ({
      ...prev,
      header: {
        ...prev.header,
        items: prev.header.items.filter((item) => item.id !== id),
      },
    }));
  };

  const handleMoveHeaderLink = (index: number, direction: 'up' | 'down') => {
    const items = [...navState.header.items];
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= items.length) return;
    const temp = items[index];
    items[index] = items[target];
    items[target] = temp;
    setNavState((prev) => ({
      ...prev,
      header: { ...prev.header, items },
    }));
  };

  const handleAddFooterLink = () => {
    if (!footerLinkLabel.trim()) return;
    setNavState((prev) => ({
      ...prev,
      footer: {
        ...prev.footer,
        navLinks: [...prev.footer.navLinks, { label: footerLinkLabel, page: footerLinkPage }],
      },
    }));
    setFooterLinkLabel('');
  };

  const handleRemoveFooterLink = (index: number) => {
    setNavState((prev) => ({
      ...prev,
      footer: {
        ...prev.footer,
        navLinks: prev.footer.navLinks.filter((_, idx) => idx !== index),
      },
    }));
  };

  const handleSaveAll = () => {
    updatePageContent('navigation', navState);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl pb-16">
      {/* Header Bar */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono font-bold text-[#c6a87c] tracking-widest uppercase">
              Navegação do Website
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight font-serif">
            Gestão do Menu & Rodapé (Header & Footer)
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Adicione novos links ao menu superior, reordene botões, personalize o apelo de contacto e ajuste o rodapé.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {isSaved && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-800 text-xs font-semibold rounded-lg border border-emerald-200 animate-fade-in">
              <Icon icon="solar:check-circle-bold" width="16" />
              <span>Menu guardado!</span>
            </div>
          )}

          <button
            type="button"
            onClick={handleSaveAll}
            className="px-5 py-2.5 bg-[#c6a87c] hover:bg-[#b59567] text-black font-semibold text-xs rounded-xl flex items-center gap-2 cursor-pointer transition-all shadow-xs"
          >
            <Icon icon="solar:check-read-linear" width="16" />
            <span>Guardar Menus & Rodapé</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('header')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'header'
              ? 'bg-[#c6a87c] text-black font-bold shadow-xs'
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          <Icon icon="solar:compass-bold" width="16" />
          <span>Menu Superior (Cabeçalho / Header)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('footer')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'footer'
              ? 'bg-[#c6a87c] text-black font-bold shadow-xs'
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          <Icon icon="solar:align-bottom-bold" width="16" />
          <span>Rodapé Completo (Footer)</span>
        </button>
      </div>

      {/* TAB 1: HEADER */}
      {activeTab === 'header' && (
        <div className="space-y-6">
          {/* Header Action Button Settings */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs space-y-4">
            <h2 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3">
              Botão de Destaque do Cabeçalho (CTA)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Texto do Botão CTA</label>
                <input
                  type="text"
                  value={navState.header.ctaLabel}
                  onChange={(e) =>
                    setNavState((prev) => ({
                      ...prev,
                      header: { ...prev.header, ctaLabel: e.target.value },
                    }))
                  }
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl"
                  placeholder="Ex: Agendar Briefing"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Página de Destino</label>
                <select
                  value={navState.header.ctaPage}
                  onChange={(e) =>
                    setNavState((prev) => ({
                      ...prev,
                      header: { ...prev.header, ctaPage: e.target.value as NavPage },
                    }))
                  }
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl"
                >
                  {pageOptions.map((p) => (
                    <option key={p.value} value={p.value}>{p.label}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center pt-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={navState.header.showThemeToggle}
                    onChange={(e) =>
                      setNavState((prev) => ({
                        ...prev,
                        header: { ...prev.header, showThemeToggle: e.target.checked },
                      }))
                    }
                    className="rounded text-[#c6a87c] focus:ring-[#c6a87c]"
                  />
                  <span className="text-xs font-semibold text-gray-700">
                    Exibir Botão de Tema (Modo Claro/Escuro)
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Links List */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h2 className="text-sm font-bold text-gray-900">
                  Itens de Navegação Principal
                </h2>
                <p className="text-xs text-gray-500">
                  Arraste ou use as setas para reordenar os links exibidos na barra superior.
                </p>
              </div>

              <button
                type="button"
                onClick={handleOpenNewLink}
                className="px-3.5 py-1.5 bg-black hover:bg-gray-800 text-white font-medium text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Icon icon="solar:add-circle-bold" width="16" />
                <span>Adicionar Link</span>
              </button>
            </div>

            <div className="space-y-2">
              {navState.header.items.map((link, index) => (
                <div
                  key={link.id}
                  className={`p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                    link.enabled
                      ? 'bg-gray-50/80 border-gray-200'
                      : 'bg-gray-100/50 border-gray-200 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-gray-400 w-5">#{index + 1}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-900">{link.label}</span>
                        {!link.enabled && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 bg-gray-200 text-gray-600 rounded">
                            Oculto
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] font-mono text-[#c6a87c]">
                        → {link.url || `Página: ${link.page}`}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleMoveHeaderLink(index, 'up')}
                      disabled={index === 0}
                      className="p-1.5 text-gray-400 hover:text-gray-700 disabled:opacity-30 rounded-lg hover:bg-gray-200 cursor-pointer"
                      title="Mover para cima"
                    >
                      <Icon icon="solar:arrow-up-linear" width="16" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMoveHeaderLink(index, 'down')}
                      disabled={index === navState.header.items.length - 1}
                      className="p-1.5 text-gray-400 hover:text-gray-700 disabled:opacity-30 rounded-lg hover:bg-gray-200 cursor-pointer"
                      title="Mover para baixo"
                    >
                      <Icon icon="solar:arrow-down-linear" width="16" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleOpenEditLink(link)}
                      className="p-1.5 text-gray-600 hover:text-[#c6a87c] rounded-lg hover:bg-gray-200 cursor-pointer"
                      title="Editar"
                    >
                      <Icon icon="solar:pen-linear" width="16" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteHeaderLink(link.id)}
                      className="p-1.5 text-red-400 hover:text-red-600 rounded-lg hover:bg-red-50 cursor-pointer"
                      title="Eliminar"
                    >
                      <Icon icon="solar:trash-bin-trash-linear" width="16" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: FOOTER */}
      {activeTab === 'footer' && (
        <div className="space-y-6">
          {/* Brand Manifesto in Footer */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs space-y-4">
            <h2 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3">
              Texto Institucional & Manifesto do Rodapé
            </h2>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700">Descrição sob o Logótipo</label>
              <textarea
                rows={3}
                value={navState.footer.manifesto}
                onChange={(e) =>
                  setNavState((prev) => ({
                    ...prev,
                    footer: { ...prev.footer, manifesto: e.target.value },
                  }))
                }
                className="w-full text-xs p-3 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none leading-relaxed"
              />
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs space-y-4">
            <h2 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3">
              Canais & Redes Sociais no Rodapé
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Instagram (@utilizador)</label>
                <input
                  type="text"
                  value={navState.footer.socialLinks.instagram}
                  onChange={(e) =>
                    setNavState((prev) => ({
                      ...prev,
                      footer: {
                        ...prev.footer,
                        socialLinks: { ...prev.footer.socialLinks, instagram: e.target.value },
                      },
                    }))
                  }
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">WhatsApp (Número Completo)</label>
                <input
                  type="text"
                  value={navState.footer.socialLinks.whatsapp}
                  onChange={(e) =>
                    setNavState((prev) => ({
                      ...prev,
                      footer: {
                        ...prev.footer,
                        socialLinks: { ...prev.footer.socialLinks, whatsapp: e.target.value },
                      },
                    }))
                  }
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">LinkedIn (URL)</label>
                <input
                  type="text"
                  value={navState.footer.socialLinks.linkedin}
                  onChange={(e) =>
                    setNavState((prev) => ({
                      ...prev,
                      footer: {
                        ...prev.footer,
                        socialLinks: { ...prev.footer.socialLinks, linkedin: e.target.value },
                      },
                    }))
                  }
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Facebook (URL)</label>
                <input
                  type="text"
                  value={navState.footer.socialLinks.facebook}
                  onChange={(e) =>
                    setNavState((prev) => ({
                      ...prev,
                      footer: {
                        ...prev.footer,
                        socialLinks: { ...prev.footer.socialLinks, facebook: e.target.value },
                      },
                    }))
                  }
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl font-mono"
                />
              </div>
            </div>
          </div>

          {/* Footer Navigation Column Links */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs space-y-4">
            <h2 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3">
              Links da Coluna de Navegação no Rodapé
            </h2>

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Nome do link no rodapé..."
                value={footerLinkLabel}
                onChange={(e) => setFooterLinkLabel(e.target.value)}
                className="flex-1 text-xs px-3 py-2 border border-gray-200 rounded-xl"
              />
              <select
                value={footerLinkPage}
                onChange={(e) => setFooterLinkPage(e.target.value as NavPage)}
                className="text-xs px-3 py-2 border border-gray-200 rounded-xl"
              >
                {pageOptions.map((p) => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={handleAddFooterLink}
                className="px-4 py-2 bg-black text-white text-xs font-semibold rounded-xl cursor-pointer"
              >
                Adicionar
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
              {navState.footer.navLinks.map((link, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between"
                >
                  <div>
                    <span className="text-xs font-bold text-gray-900">{link.label}</span>
                    <span className="text-[10px] text-gray-500 block font-mono">→ {link.page}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveFooterLink(idx)}
                    className="p-1 text-red-400 hover:text-red-600 rounded-lg"
                  >
                    <Icon icon="solar:trash-bin-trash-linear" width="14" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Copyright & Restricted Area */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs space-y-4">
            <h2 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3">
              Direitos de Autor & Acesso Restrito
            </h2>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700">Texto de Copyright no Rodapé</label>
              <input
                type="text"
                value={navState.footer.copyrightNotice}
                onChange={(e) =>
                  setNavState((prev) => ({
                    ...prev,
                    footer: { ...prev.footer, copyrightNotice: e.target.value },
                  }))
                }
                className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl"
              />
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={navState.footer.showRestrictedArea}
                  onChange={(e) =>
                    setNavState((prev) => ({
                      ...prev,
                      footer: { ...prev.footer, showRestrictedArea: e.target.checked },
                    }))
                  }
                  className="rounded text-[#c6a87c] focus:ring-[#c6a87c]"
                />
                <span className="text-xs font-semibold text-gray-700">
                  Exibir link "Área Restrita" (com ícone de cadeado para acesso ao Painel CMS)
                </span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Modal Add / Edit Header Link */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl border border-gray-200 shadow-2xl overflow-hidden animate-scale-up">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <h3 className="text-sm font-bold text-gray-900 font-heading">
                {editingLink ? 'Editar Link de Navegação' : 'Novo Link de Navegação'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-700 rounded-lg"
              >
                <Icon icon="solar:close-circle-linear" width="20" />
              </button>
            </div>

            <form onSubmit={handleSaveLinkModal} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Texto do Link (Etiqueta)</label>
                <input
                  type="text"
                  required
                  value={linkFormLabel}
                  onChange={(e) => setLinkFormLabel(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none"
                  placeholder="Ex: O Atelier"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Página Interna do Website</label>
                <select
                  value={linkFormPage}
                  onChange={(e) => setLinkFormPage(e.target.value as NavPage)}
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none"
                >
                  {pageOptions.map((p) => (
                    <option key={p.value} value={p.value}>{p.label}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">
                  URL Personalizado / Âncora (Opcional)
                </label>
                <input
                  type="text"
                  value={linkFormUrl}
                  onChange={(e) => setLinkFormUrl(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none font-mono"
                  placeholder="Ex: #projectos ou https://..."
                />
              </div>

              <div className="pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={linkFormEnabled}
                    onChange={(e) => setLinkFormEnabled(e.target.checked)}
                    className="rounded text-[#c6a87c] focus:ring-[#c6a87c]"
                  />
                  <span className="text-xs font-semibold text-gray-700">Link Visível no Menu</span>
                </label>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-xl cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#c6a87c] hover:bg-[#b59567] text-black font-semibold text-xs rounded-xl cursor-pointer"
                >
                  Guardar Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
