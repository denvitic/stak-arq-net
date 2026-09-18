import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useCms } from '@/src/context/CmsContext';
import { ServiceItem } from '@/src/types';
import { ImagePickerInput } from '@/src/dashboard/src/components/ImagePickerInput';

export default function ServicesManager() {
  const { services, addService, updateService, deleteService, pagesContent, updatePageContent } = useCms();
  const [activeTab, setActiveTab] = useState<'items' | 'hero'>('items');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State for Service Item
  const [formData, setFormData] = useState<Omit<ServiceItem, 'id'>>({
    code: 'ESP-0' + (services.length + 1),
    title: '',
    tagline: '',
    description: '',
    deliverables: [],
    ctaLabel: 'Solicitar Proposta para este Núcleo',
    ctaAction: 'briefing-geral',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    typicalDuration: '8 a 14 semanas',
  });

  const [deliverableInput, setDeliverableInput] = useState('');

  // Hero form state
  const currentServicesHero = pagesContent?.services?.hero || {
    badge: 'Especialidades do Atelier',
    title: 'Especialidades arquitectónicas & consultoria integral.',
    description:
      'Desde o estudo de viabilidade e simulação tridimensional até à entrega da chave e aprovação municipal, oferecemos disciplinas coordenadas que salvaguardam o seu investimento em Angola.',
    bgImage:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85',
    tagPills: [
      'Arquitectura Residencial',
      'Edifícios Comerciais',
      'Design de Interiores',
      'Urbanismo',
      'Fiscalização de Obra',
    ],
  };

  const [heroForm, setHeroForm] = useState(currentServicesHero);
  const [newPillInput, setNewPillInput] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleOpenCreate = () => {
    setFormData({
      code: `ESP-0${services.length + 1}`,
      title: '',
      tagline: '',
      description: '',
      deliverables: [
        'Estudo prévio e modelação 3D fotorrealista',
        'Projecto de execução detalhado com mapa de acabamentos',
        'Compatibilização de especialidades e acompanhamento camarário',
      ],
      ctaLabel: 'Solicitar Proposta para este Núcleo',
      ctaAction: 'briefing-geral',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      typicalDuration: '8 a 14 semanas',
    });
    setDeliverableInput('');
    setIsCreating(true);
    setEditingService(null);
  };

  const handleOpenEdit = (service: ServiceItem) => {
    setEditingService(service);
    setFormData({
      code: service.code || 'ESP',
      title: service.title,
      tagline: service.tagline || '',
      description: service.description || '',
      deliverables: [...(service.deliverables || [])],
      ctaLabel: service.ctaLabel || 'Solicitar Proposta',
      ctaAction: service.ctaAction || 'briefing-geral',
      image: service.image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      typicalDuration: service.typicalDuration || '8 a 14 semanas',
    });
    setDeliverableInput('');
    setIsCreating(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    if (isCreating) {
      addService(formData);
      showToast(`Especialidade "${formData.title}" criada com sucesso!`);
    } else if (editingService) {
      updateService({
        ...editingService,
        ...formData,
      });
      showToast(`Especialidade "${formData.title}" actualizada com sucesso!`);
    }

    setIsCreating(false);
    setEditingService(null);
  };

  const handleAddDeliverable = () => {
    if (!deliverableInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      deliverables: [...prev.deliverables, deliverableInput.trim()],
    }));
    setDeliverableInput('');
  };

  const handleRemoveDeliverable = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      deliverables: prev.deliverables.filter((_, i) => i !== index),
    }));
  };

  const handleConfirmDelete = () => {
    if (!deleteConfirmId) return;
    const target = services.find((s) => s.id === deleteConfirmId);
    deleteService(deleteConfirmId);
    showToast(`Especialidade "${target?.title || 'seleccionada'}" removida com sucesso.`);
    setDeleteConfirmId(null);
  };

  // Hero Pill Management
  const handleAddPill = () => {
    if (!newPillInput.trim()) return;
    const currentPills = heroForm.tagPills || [];
    if (!currentPills.includes(newPillInput.trim())) {
      setHeroForm({
        ...heroForm,
        tagPills: [...currentPills, newPillInput.trim()],
      });
    }
    setNewPillInput('');
  };

  const handleRemovePill = (pillToRemove: string) => {
    setHeroForm({
      ...heroForm,
      tagPills: (heroForm.tagPills || []).filter((p) => p !== pillToRemove),
    });
  };

  const handleSaveHero = (e: React.FormEvent) => {
    e.preventDefault();
    const currentServices = pagesContent?.services;
    const defaultSections = {
      methodology: {
        enabled: true,
        tag: 'Metodologia de Intervenção',
        title: 'Processo Rigoroso de Concepção e Execução',
        description: 'Acompanhamento passo a passo do estudo preliminar à entrega de obra.',
        steps: [],
      },
      servicesList: {
        enabled: true,
        tag: 'Portfólio de Especialidades',
        title: 'Disciplinas Arquitectónicas & Consultoria',
        description: 'Conheça em detalhe os nossos serviços.',
      },
      cta: {
        enabled: true,
        title: 'Inicie o Seu Projecto com Rigor Técnico',
        description: 'Fale com os nossos arquitectos e engenheiros residentes em Luanda.',
        buttonLabel: 'Submeter Ficha de Briefing',
        buttonLink: 'briefing',
      },
    };

    updatePageContent('services', {
      hero: heroForm,
      sections: currentServices?.sections || defaultSections,
    });
    showToast('Hero e Tag Pills da Página de Serviços guardadas com sucesso!');
  };

  const filteredServices = services.filter((s) => {
    const q = searchQuery.toLowerCase();
    return (
      s.title.toLowerCase().includes(q) ||
      (s.code && s.code.toLowerCase().includes(q)) ||
      (s.tagline && s.tagline.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl">
      {/* Top Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold text-[#c6a87c] tracking-widest uppercase">
              Especialidades & Disciplinas
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight font-serif">
            Gestão de Serviços & Tag Pills da Hero
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Adicione e personalize as disciplinas técnicas de arquitectura, marcenaria, urbanismo e os destaques visuais do cabeçalho.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleOpenCreate}
            className="px-4 py-2 bg-[#111827] hover:bg-black text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer shadow-sm flex items-center gap-2"
            style={{ color: '#ffffff' }}
          >
            <Icon icon="solar:add-circle-linear" width="16" style={{ color: '#ffffff' }} />
            <span style={{ color: '#ffffff' }}>Nova Especialidade</span>
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl flex items-center gap-2 animate-fade-in">
          <Icon icon="solar:check-circle-linear" width="18" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-200 bg-white rounded-t-xl px-4 pt-3 gap-6">
        <button
          type="button"
          onClick={() => setActiveTab('items')}
          className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 cursor-pointer flex items-center gap-2 ${
            activeTab === 'items'
              ? 'border-[#c6a87c] text-gray-900'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <Icon icon="solar:widget-2-linear" width="16" />
          <span>Lista de Especialidades ({services.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('hero')}
          className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 cursor-pointer flex items-center gap-2 ${
            activeTab === 'hero'
              ? 'border-[#c6a87c] text-gray-900'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <Icon icon="solar:tag-horizontal-linear" width="16" />
          <span>Hero Banner & Tag Pills da Página</span>
        </button>
      </div>

      {/* TAB 1: LIST OF SERVICES */}
      {activeTab === 'items' && (
        <div className="space-y-6">
          {/* Search bar */}
          <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-200">
            <Icon icon="solar:magnifer-linear" width="18" className="text-gray-400" />
            <input
              type="text"
              placeholder="Pesquisar por título, código ou âmbito..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs text-gray-800 bg-transparent focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-xs text-gray-400 hover:text-gray-600"
              >
                Limpar
              </button>
            )}
          </div>

          {/* Grid of services */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl border border-gray-200 p-5 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-[#c6a87c]/10 text-[#c6a87c] font-mono text-[11px] font-bold border border-[#c6a87c]/30">
                        {service.code || 'ESP'}
                      </span>
                      <span className="text-xs text-gray-400 font-mono">
                        {service.typicalDuration || 'Duração sob consulta'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(service)}
                        className="p-1.5 hover:bg-gray-100 text-gray-600 hover:text-gray-900 rounded-lg transition-colors cursor-pointer"
                        title="Editar Especialidade"
                      >
                        <Icon icon="solar:pen-linear" width="16" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteConfirmId(service.id)}
                        className="p-1.5 hover:bg-red-50 text-red-500 hover:text-red-700 rounded-lg transition-colors cursor-pointer"
                        title="Eliminar Especialidade"
                      >
                        <Icon icon="solar:trash-bin-trash-linear" width="16" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-gray-900 line-clamp-1">{service.title}</h3>
                    {service.tagline && (
                      <p className="text-xs text-gray-500 line-clamp-2 mt-0.5">{service.tagline}</p>
                    )}
                  </div>

                  <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Deliverables summary */}
                  {service.deliverables && service.deliverables.length > 0 && (
                    <div className="pt-2 border-t border-gray-100">
                      <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider block mb-1">
                        Entregáveis ({service.deliverables.length}):
                      </span>
                      <ul className="space-y-1">
                        {service.deliverables.slice(0, 2).map((d, i) => (
                          <li key={i} className="text-xs text-gray-600 flex items-center gap-1.5 line-clamp-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#c6a87c]" />
                            {d}
                          </li>
                        ))}
                        {service.deliverables.length > 2 && (
                          <li className="text-[11px] text-gray-400 font-mono">
                            +{service.deliverables.length - 2} entregáveis detalhados...
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[11px] text-gray-400 truncate max-w-[200px]">
                    CTA: {service.ctaLabel || 'Solicitar Proposta'}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(service)}
                    className="text-xs font-semibold text-[#c6a87c] hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <span>Editar Detalhes</span>
                    <Icon icon="solar:arrow-right-linear" width="12" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
              <p className="text-xs text-gray-500">Nenhuma especialidade encontrada com os termos pesquisados.</p>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: HERO BANNER & TAG PILLS MANAGER */}
      {activeTab === 'hero' && (
        <form onSubmit={handleSaveHero} className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs space-y-5">
            <div className="border-b border-gray-100 pb-3">
              <h2 className="text-base font-bold text-gray-900">
                Cabeçalho Hero & Tag Pills da Página de Serviços
              </h2>
              <p className="text-xs text-gray-500">
                Configure os textos principais, imagem de fundo panorâmica e os pills de categorias que aparecem na abertura da página
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Badge / Breadcrumb
                </label>
                <input
                  type="text"
                  value={heroForm.badge}
                  onChange={(e) => setHeroForm({ ...heroForm, badge: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#c6a87c] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Título Principal da Página
                </label>
                <input
                  type="text"
                  value={heroForm.title}
                  onChange={(e) => setHeroForm({ ...heroForm, title: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#c6a87c] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Descrição do Banner
              </label>
              <textarea
                rows={3}
                value={heroForm.description}
                onChange={(e) => setHeroForm({ ...heroForm, description: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#c6a87c] focus:outline-none leading-relaxed"
              />
            </div>

            <ImagePickerInput
              label="Fotografia Panorâmica de Fundo (Hero)"
              description="Imagem de fundo da página de serviços com sobreposição escura"
              value={heroForm.bgImage || ''}
              onChange={(url) => setHeroForm({ ...heroForm, bgImage: url })}
            />

            {/* Tag Pills List Editor */}
            <div className="pt-4 border-t border-gray-100 space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-1">
                  Tag Pills / Chips de Especialidades
                </label>
                <p className="text-xs text-gray-500">
                  Etiquetas de navegação rápida que aparecem logo abaixo do texto de introdução
                </p>
              </div>

              {/* Add Pill Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ex: Arquitectura Sustentável, Consultoria Técnica..."
                  value={newPillInput}
                  onChange={(e) => setNewPillInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddPill();
                    }
                  }}
                  className="w-full max-w-md px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#c6a87c] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddPill}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Icon icon="solar:add-circle-linear" width="16" />
                  <span>Adicionar Tag Pill</span>
                </button>
              </div>

              {/* Display Pills */}
              <div className="flex flex-wrap gap-2 pt-2">
                {(heroForm.tagPills || []).map((pill, idx) => (
                  <div
                    key={idx}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-900 text-white text-xs font-mono border border-gray-800"
                  >
                    <span>{pill}</span>
                    <button
                      type="button"
                      onClick={() => handleRemovePill(pill)}
                      className="text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
                      title="Remover esta pill"
                    >
                      <Icon icon="solar:close-circle-bold" width="14" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#111827] hover:bg-black text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer shadow-sm flex items-center gap-2"
                style={{ color: '#ffffff' }}
              >
                <Icon icon="solar:check-read-linear" width="16" style={{ color: '#ffffff' }} />
                <span style={{ color: '#ffffff' }}>Guardar Alterações da Hero</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Modal: Create or Edit Service Item */}
      {(isCreating || editingService) && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-gray-200 animate-fade-in space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  {isCreating ? 'Nova Especialidade Técnica' : `Editar: ${editingService?.title}`}
                </h3>
                <p className="text-xs text-gray-500">
                  Preencha os campos para reflectir os entregáveis e metodologia no site
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsCreating(false);
                  setEditingService(null);
                }}
                className="text-gray-400 hover:text-gray-600 cursor-pointer p-1"
              >
                <Icon icon="solar:close-circle-linear" width="22" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Código do Núcleo
                  </label>
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    placeholder="ESP-01"
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs font-mono focus:ring-1 focus:ring-[#c6a87c] focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Título da Especialidade *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Ex: Arquitectura Residencial Contemporânea"
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#c6a87c] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Tagline / Subtítulo Resumido
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  placeholder="Ex: Moradias unifamiliares de luxo e habitação de autor."
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#c6a87c] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Descrição Completa da Disciplina
                </label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Explique detalhadamente como o atelier aborda este serviço..."
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#c6a87c] focus:outline-none leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Duração Típica de Desenvolvimento
                  </label>
                  <input
                    type="text"
                    value={formData.typicalDuration}
                    onChange={(e) => setFormData({ ...formData, typicalDuration: e.target.value })}
                    placeholder="8 a 14 semanas"
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#c6a87c] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Texto do Botão CTA
                  </label>
                  <input
                    type="text"
                    value={formData.ctaLabel}
                    onChange={(e) => setFormData({ ...formData, ctaLabel: e.target.value })}
                    placeholder="Solicitar Proposta para este Núcleo"
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#c6a87c] focus:outline-none"
                  />
                </div>
              </div>

              <ImagePickerInput
                label="Fotografia Representativa da Disciplina"
                description="Imagem de projecto que ilustra esta especialidade arquitectónica"
                value={formData.image || ''}
                onChange={(url) => setFormData({ ...formData, image: url })}
              />

              {/* Deliverables List */}
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <label className="block text-xs font-semibold text-gray-700">
                  Entregáveis & Etapas Incluídas ({formData.deliverables.length})
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={deliverableInput}
                    onChange={(e) => setDeliverableInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddDeliverable();
                      }
                    }}
                    placeholder="Ex: Projecto de execução completo..."
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#c6a87c] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddDeliverable}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    Adicionar
                  </button>
                </div>

                <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                  {formData.deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-800"
                    >
                      <span>{item}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveDeliverable(idx)}
                        className="text-red-500 hover:text-red-700 p-0.5 cursor-pointer"
                      >
                        <Icon icon="solar:trash-bin-trash-linear" width="14" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreating(false);
                    setEditingService(null);
                  }}
                  className="px-4 py-2 border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="px-6 py-2 bg-[#111827] hover:bg-black text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-xs"
                >
                  {isCreating ? 'Criar Especialidade' : 'Guardar Alterações'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200 animate-fade-in space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Icon icon="solar:trash-bin-trash-bold" width="24" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-gray-900">
                Eliminar Especialidade?
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Tem a certeza que deseja eliminar esta especialidade? Esta ação remove o item do website de imediato.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="w-1/2 py-2.5 border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={handleConfirmDelete}
                className="w-1/2 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-xs"
              >
                Sim, Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
