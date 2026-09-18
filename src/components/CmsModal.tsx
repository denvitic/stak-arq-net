import React, { useState } from 'react';
import { useCms } from '../context/CmsContext';
import { Project, ProjectCategory } from '../types';
import {
  X,
  Plus,
  Trash2,
  Edit,
  Star,
  CheckCircle2,
  FolderKanban,
  FileText,
  Inbox,
  Building,
  RotateCcw,
  ExternalLink,
  Sparkles,
  Layers,
  MapPin
} from 'lucide-react';

export const CmsModal: React.FC = () => {
  const {
    projects,
    briefings,
    articles,
    atelierInfo,
    isCmsOpen,
    setIsCmsOpen,
    activeCmsTab,
    setActiveCmsTab,
    addProject,
    updateProject,
    deleteProject,
    toggleFeaturedProject,
    updateBriefingStatus,
    deleteBriefing,
    updateAtelierInfo,
    resetToDefaults,
  } = useCms();

  const [isAddingProject, setIsAddingProject] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  // New Project Form State
  const [projectForm, setProjectForm] = useState({
    title: '',
    subtitle: '',
    category: 'residencial' as Project['category'],
    categoryLabel: 'Arquitectura Residencial',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    videoUrl: '',
    galleryImages: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
    ],
    description: '',
    architecturalConcept: '',
    localizacao: 'Luanda, Angola',
    ano: '2024',
    area: '550 m²',
    tipologia: 'Moradia Unifamiliar V4',
    estadoObra: 'Concluído' as Project['fichaTecnica']['estadoObra'],
    cliente: 'Cliente Privado',
    especialidades: 'Arquitectura, Estruturas, Luminotecnia, Paisagismo',
    featured: true,
  });

  // Atelier Edit Info State
  const [atelierForm, setAtelierForm] = useState(atelierInfo);

  if (!isCmsOpen) return null;

  const handleCategoryChange = (cat: Project['category']) => {
    const labels: Record<Project['category'], string> = {
      residencial: 'Arquitectura Residencial',
      comercial: 'Comercial & Corporativo',
      interiores: 'Design de Interiores',
      urbanismo: 'Urbanismo & Masterplanning',
      'em-construcao': 'Em Construção',
    };
    setProjectForm({
      ...projectForm,
      category: cat,
      categoryLabel: labels[cat],
    });
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.title) return;

    const specs = projectForm.especialidades
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingProjectId) {
      const existing = projects.find((p) => p.id === editingProjectId);
      if (existing) {
        updateProject({
          ...existing,
          title: projectForm.title,
          subtitle: projectForm.subtitle,
          category: projectForm.category,
          categoryLabel: projectForm.categoryLabel,
          coverImage: projectForm.coverImage,
          videoUrl: projectForm.videoUrl.trim() || undefined,
          galleryImages: projectForm.galleryImages,
          description: projectForm.description,
          architecturalConcept: projectForm.architecturalConcept,
          featured: projectForm.featured,
          fichaTecnica: {
            localizacao: projectForm.localizacao,
            ano: projectForm.ano,
            area: projectForm.area,
            tipologia: projectForm.tipologia,
            estadoObra: projectForm.estadoObra,
            cliente: projectForm.cliente,
            especialidades: specs.length > 0 ? specs : ['Arquitectura', 'Estruturas'],
          },
        });
      }
      setEditingProjectId(null);
    } else {
      addProject({
        title: projectForm.title,
        subtitle: projectForm.subtitle,
        category: projectForm.category,
        categoryLabel: projectForm.categoryLabel,
        coverImage: projectForm.coverImage,
        videoUrl: projectForm.videoUrl.trim() || undefined,
        galleryImages: projectForm.galleryImages,
        description: projectForm.description,
        architecturalConcept: projectForm.architecturalConcept,
        featured: projectForm.featured,
        fichaTecnica: {
          localizacao: projectForm.localizacao,
          ano: projectForm.ano,
          area: projectForm.area,
          tipologia: projectForm.tipologia,
          estadoObra: projectForm.estadoObra,
          cliente: projectForm.cliente,
          especialidades: specs.length > 0 ? specs : ['Arquitectura', 'Estruturas'],
        },
      });
    }

    setIsAddingProject(false);
    // Reset form
    setProjectForm({
      title: '',
      subtitle: '',
      category: 'residencial',
      categoryLabel: 'Arquitectura Residencial',
      coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
      videoUrl: '',
      galleryImages: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
      ],
      description: '',
      architecturalConcept: '',
      localizacao: 'Luanda, Angola',
      ano: '2024',
      area: '550 m²',
      tipologia: 'Moradia Unifamiliar V4',
      estadoObra: 'Concluído',
      cliente: 'Cliente Privado',
      especialidades: 'Arquitectura, Estruturas, Luminotecnia',
      featured: true,
    });
  };

  const startEditProject = (proj: Project) => {
    setEditingProjectId(proj.id);
    setProjectForm({
      title: proj.title,
      subtitle: proj.subtitle,
      category: proj.category,
      categoryLabel: proj.categoryLabel,
      coverImage: proj.coverImage,
      videoUrl: proj.videoUrl || '',
      galleryImages: proj.galleryImages,
      description: proj.description,
      architecturalConcept: proj.architecturalConcept,
      localizacao: proj.fichaTecnica.localizacao,
      ano: proj.fichaTecnica.ano,
      area: proj.fichaTecnica.area,
      tipologia: proj.fichaTecnica.tipologia,
      estadoObra: proj.fichaTecnica.estadoObra,
      cliente: proj.fichaTecnica.cliente,
      especialidades: proj.fichaTecnica.especialidades.join(', '),
      featured: proj.featured,
    });
    setIsAddingProject(true);
  };

  const handleSaveAtelier = (e: React.FormEvent) => {
    e.preventDefault();
    updateAtelierInfo(atelierForm);
    alert('Informações institucionais actualizadas com sucesso!');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in">
      <div
        className="w-full max-w-6xl bg-[#0f1013] border border-[#c6a87c]/40 rounded-xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-6 py-4 bg-[#14151a] border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-[#c6a87c]/20 border border-[#c6a87c]/50 flex items-center justify-center text-[#c6a87c]">
              <FolderKanban className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white font-heading">
                  Painel de Gestão de Conteúdos (CMS)
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#c6a87c]/20 text-[#c6a87c] border border-[#c6a87c]/30">
                  Modo Editor Activo
                </span>
              </div>
              <p className="text-xs text-[#9ca3af]">
                Stak Arquitectura & Designer de Interiores • Gestão em Tempo Real
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={resetToDefaults}
              className="text-xs text-[#9ca3af] hover:text-white flex items-center gap-1 px-3 py-1.5 rounded bg-white/5 border border-white/10"
              title="Restaurar dados originais de demonstração"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Restaurar Padrões</span>
            </button>

            <button
              type="button"
              onClick={() => setIsCmsOpen(false)}
              className="p-2 rounded-md bg-white/5 hover:bg-white/15 text-white"
              aria-label="Fechar painel CMS"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 border-b border-white/10 bg-[#121317] flex items-center gap-4 overflow-x-auto shrink-0">
          <button
            type="button"
            onClick={() => {
              setActiveCmsTab('projects');
              setIsAddingProject(false);
            }}
            className={`py-3 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeCmsTab === 'projects'
                ? 'border-[#c6a87c] text-white'
                : 'border-transparent text-[#9ca3af] hover:text-white'
            }`}
          >
            <FolderKanban className="w-4 h-4 text-[#c6a87c]" />
            <span>Gestão de Projectos ({projects.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCmsTab('briefings')}
            className={`py-3 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeCmsTab === 'briefings'
                ? 'border-[#c6a87c] text-white'
                : 'border-transparent text-[#9ca3af] hover:text-white'
            }`}
          >
            <Inbox className="w-4 h-4 text-[#c6a87c]" />
            <span>Briefings Recebidos ({briefings.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCmsTab('atelier')}
            className={`py-3 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeCmsTab === 'atelier'
                ? 'border-[#c6a87c] text-white'
                : 'border-transparent text-[#9ca3af] hover:text-white'
            }`}
          >
            <Building className="w-4 h-4 text-[#c6a87c]" />
            <span>Dados do Atelier & Contactos</span>
          </button>
        </div>

        {/* Modal Scrollable Workspace */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: PROJECTS */}
          {activeCmsTab === 'projects' && (
            <div>
              {/* Top Action Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-white font-heading">
                    {isAddingProject
                      ? editingProjectId
                        ? 'Editar Ficha do Projecto'
                        : 'Adicionar Novo Projecto ao Portfólio'
                      : 'Obras e Projectos Registados'}
                  </h3>
                  <p className="text-xs text-[#9ca3af]">
                    Qualquer inserção, alteração ou exclusão é reflectida instantaneamente no website.
                  </p>
                </div>

                {!isAddingProject ? (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingProjectId(null);
                      setIsAddingProject(true);
                    }}
                    className="px-4 py-2.5 bg-[#c6a87c] hover:bg-[#d8bb90] text-black font-semibold text-xs uppercase tracking-wider rounded-sm flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Novo Projecto</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingProject(false);
                      setEditingProjectId(null);
                    }}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs rounded-sm"
                  >
                    Voltar à Lista
                  </button>
                )}
              </div>

              {/* Add / Edit Project Form */}
              {isAddingProject ? (
                <form onSubmit={handleSaveProject} className="space-y-5 bg-[#14151a] p-6 rounded-lg border border-white/10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-[#d1d5db] mb-1.5 font-medium">
                        Título do Projecto *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Moradia Miramar Palace"
                        value={projectForm.title}
                        onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                        className="w-full bg-[#1b1d24] border border-white/10 rounded px-3 py-2 text-xs text-white focus:border-[#c6a87c] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-[#d1d5db] mb-1.5 font-medium">
                        Subtítulo / Descrição Curta
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: Residência unifamiliar contemporânea em betão e vidro"
                        value={projectForm.subtitle}
                        onChange={(e) => setProjectForm({ ...projectForm, subtitle: e.target.value })}
                        className="w-full bg-[#1b1d24] border border-white/10 rounded px-3 py-2 text-xs text-white focus:border-[#c6a87c] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs text-[#d1d5db] mb-1.5 font-medium">
                        Categoria
                      </label>
                      <select
                        value={projectForm.category}
                        onChange={(e) => handleCategoryChange(e.target.value as Project['category'])}
                        className="w-full bg-[#1b1d24] border border-white/10 rounded px-3 py-2 text-xs text-white focus:border-[#c6a87c] focus:outline-none"
                      >
                        <option value="residencial">Residencial de Alto Padrão</option>
                        <option value="comercial">Comercial & Corporativo</option>
                        <option value="interiores">Design de Interiores</option>
                        <option value="urbanismo">Urbanismo & Masterplan</option>
                        <option value="em-construcao">Em Construção</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs text-[#d1d5db] mb-1.5 font-medium">
                        Localização (Luanda / Angola)
                      </label>
                      <input
                        type="text"
                        value={projectForm.localizacao}
                        onChange={(e) => setProjectForm({ ...projectForm, localizacao: e.target.value })}
                        className="w-full bg-[#1b1d24] border border-white/10 rounded px-3 py-2 text-xs text-white focus:border-[#c6a87c] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-[#d1d5db] mb-1.5 font-medium">
                        Área de Construção (m²)
                      </label>
                      <input
                        type="text"
                        value={projectForm.area}
                        onChange={(e) => setProjectForm({ ...projectForm, area: e.target.value })}
                        className="w-full bg-[#1b1d24] border border-white/10 rounded px-3 py-2 text-xs text-white focus:border-[#c6a87c] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs text-[#d1d5db] mb-1.5 font-medium">
                        Ano
                      </label>
                      <input
                        type="text"
                        value={projectForm.ano}
                        onChange={(e) => setProjectForm({ ...projectForm, ano: e.target.value })}
                        className="w-full bg-[#1b1d24] border border-white/10 rounded px-3 py-2 text-xs text-white focus:border-[#c6a87c] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-[#d1d5db] mb-1.5 font-medium">
                        Estado da Obra
                      </label>
                      <select
                        value={projectForm.estadoObra}
                        onChange={(e) => setProjectForm({ ...projectForm, estadoObra: e.target.value as any })}
                        className="w-full bg-[#1b1d24] border border-white/10 rounded px-3 py-2 text-xs text-white focus:border-[#c6a87c] focus:outline-none"
                      >
                        <option value="Concluído">Concluído</option>
                        <option value="Em Execução">Em Execução</option>
                        <option value="Estudo Prévio">Estudo Prévio</option>
                        <option value="Licenciamento Aprovado">Licenciamento Aprovado</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs text-[#d1d5db] mb-1.5 font-medium">
                        Cliente / Promotor
                      </label>
                      <input
                        type="text"
                        value={projectForm.cliente}
                        onChange={(e) => setProjectForm({ ...projectForm, cliente: e.target.value })}
                        className="w-full bg-[#1b1d24] border border-white/10 rounded px-3 py-2 text-xs text-white focus:border-[#c6a87c] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Image URL & presets */}
                  <div>
                    <label className="block text-xs text-[#d1d5db] mb-1.5 font-medium">
                      URL da Fotografia / Render de Capa
                    </label>
                    <input
                      type="url"
                      required
                      value={projectForm.coverImage}
                      onChange={(e) => setProjectForm({ ...projectForm, coverImage: e.target.value })}
                      className="w-full bg-[#1b1d24] border border-white/10 rounded px-3 py-2 text-xs text-white focus:border-[#c6a87c] focus:outline-none font-mono"
                    />

                    {/* Quick photo presets */}
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[10px] text-[#9ca3af]">Sugestões de fotos de arquitectura:</span>
                      <button
                        type="button"
                        onClick={() =>
                          setProjectForm({
                            ...projectForm,
                            coverImage:
                              'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
                          })
                        }
                        className="text-[10px] text-[#c6a87c] hover:underline"
                      >
                        Vila Moderna
                      </button>
                      <span>•</span>
                      <button
                        type="button"
                        onClick={() =>
                          setProjectForm({
                            ...projectForm,
                            coverImage:
                              'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85',
                          })
                        }
                        className="text-[10px] text-[#c6a87c] hover:underline"
                      >
                        Edifício Corporativo
                      </button>
                      <span>•</span>
                      <button
                        type="button"
                        onClick={() =>
                          setProjectForm({
                            ...projectForm,
                            coverImage:
                              'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85',
                          })
                        }
                        className="text-[10px] text-[#c6a87c] hover:underline"
                      >
                        Interior de Luxo
                      </button>
                    </div>
                  </div>

                  {/* Interior Video URL (Optional) */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs text-[#d1d5db] font-medium">
                        Vídeo de Interior da Habitação (Opcional - MP4)
                      </label>
                      <span className="text-[10px] text-[#c6a87c]">Focado em interiores • Sem rostos</span>
                    </div>
                    <input
                      type="text"
                      value={projectForm.videoUrl}
                      onChange={(e) => setProjectForm({ ...projectForm, videoUrl: e.target.value })}
                      placeholder="Ex: /videos/hero-interior-living.mp4"
                      className="w-full bg-[#1b1d24] border border-white/10 rounded px-3 py-2 text-xs text-white focus:border-[#c6a87c] focus:outline-none font-mono"
                    />
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-[10px] text-[#9ca3af]">Vídeos optimizados disponíveis:</span>
                      <button
                        type="button"
                        onClick={() =>
                          setProjectForm({ ...projectForm, videoUrl: '/videos/hero-interior-living.mp4' })
                        }
                        className="text-[10px] text-[#c6a87c] hover:underline"
                      >
                        Sala Estar
                      </button>
                      <span>•</span>
                      <button
                        type="button"
                        onClick={() =>
                          setProjectForm({ ...projectForm, videoUrl: '/videos/hero-interior-kitchen.mp4' })
                        }
                        className="text-[10px] text-[#c6a87c] hover:underline"
                      >
                        Cozinha Integrada
                      </button>
                      <span>•</span>
                      <button
                        type="button"
                        onClick={() =>
                          setProjectForm({ ...projectForm, videoUrl: '/videos/hero-interior-dining.mp4' })
                        }
                        className="text-[10px] text-[#c6a87c] hover:underline"
                      >
                        Sala Jantar
                      </button>
                      <span>•</span>
                      <button
                        type="button"
                        onClick={() => setProjectForm({ ...projectForm, videoUrl: '' })}
                        className="text-[10px] text-[#9ca3af] hover:underline"
                      >
                        Limpar (Apenas Foto)
                      </button>
                    </div>
                  </div>

                  {/* Description & Concept */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-[#d1d5db] mb-1.5 font-medium">
                        Memória Descritiva
                      </label>
                      <textarea
                        rows={3}
                        value={projectForm.description}
                        onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                        className="w-full bg-[#1b1d24] border border-white/10 rounded p-2.5 text-xs text-white focus:border-[#c6a87c] focus:outline-none resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-[#d1d5db] mb-1.5 font-medium">
                        Conceito Arquitectónico & Espacial
                      </label>
                      <textarea
                        rows={3}
                        value={projectForm.architecturalConcept}
                        onChange={(e) => setProjectForm({ ...projectForm, architecturalConcept: e.target.value })}
                        className="w-full bg-[#1b1d24] border border-white/10 rounded p-2.5 text-xs text-white focus:border-[#c6a87c] focus:outline-none resize-none"
                      />
                    </div>
                  </div>

                  {/* Featured checkbox */}
                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="feat-check"
                      checked={projectForm.featured}
                      onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                      className="accent-[#c6a87c] w-4 h-4 rounded"
                    />
                    <label htmlFor="feat-check" className="text-xs text-white font-medium cursor-pointer">
                      Destacar este projecto no Hero (Carrossel Principal da Página Inicial)
                    </label>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsAddingProject(false)}
                      className="px-4 py-2 text-xs text-[#9ca3af] hover:text-white"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#c6a87c] hover:bg-[#d8bb90] text-black font-semibold text-xs uppercase tracking-wider rounded-sm shadow-md"
                    >
                      {editingProjectId ? 'Salvar Alterações' : 'Publicar Projecto'}
                    </button>
                  </div>
                </form>
              ) : (
                /* Projects List Table / Cards */
                <div className="space-y-3">
                  {projects.map((proj) => (
                    <div
                      key={proj.id}
                      className="p-4 rounded-lg bg-[#14151a] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-white/20 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-14 rounded overflow-hidden bg-black shrink-0 border border-white/10">
                          <img
                            src={proj.coverImage}
                            alt={proj.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-white font-heading">
                              {proj.title}
                            </h4>
                            {proj.featured && (
                              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#c6a87c]/20 text-[#c6a87c] border border-[#c6a87c]/40">
                                Destaque Hero
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-[#9ca3af] flex items-center gap-3 mt-1">
                            <span>{proj.categoryLabel}</span>
                            <span>•</span>
                            <span>{proj.fichaTecnica.localizacao}</span>
                            <span>•</span>
                            <span className="font-mono text-white/80">{proj.fichaTecnica.area}</span>
                          </div>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => toggleFeaturedProject(proj.id)}
                          className={`p-2 rounded border transition-colors ${
                            proj.featured
                              ? 'bg-[#c6a87c]/20 text-[#c6a87c] border-[#c6a87c]/40'
                              : 'bg-white/5 text-[#9ca3af] border-white/10 hover:text-white'
                          }`}
                          title="Alternar destaque no Hero"
                        >
                          <Star className="w-4 h-4 fill-current" />
                        </button>

                        <button
                          type="button"
                          onClick={() => startEditProject(proj)}
                          className="p-2 rounded bg-white/5 hover:bg-white/15 text-white border border-white/10"
                          title="Editar Ficha Técnica"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Tem a certeza que deseja eliminar o projecto "${proj.title}"?`)) {
                              deleteProject(proj.id);
                            }
                          }}
                          className="p-2 rounded bg-red-500/10 hover:bg-red-500/25 text-red-400 border border-red-500/20"
                          title="Remover Projecto"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: BRIEFINGS */}
          {activeCmsTab === 'briefings' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-white font-heading">
                  Pedidos de Briefing e Orçamentos Recebidos
                </h3>
                <p className="text-xs text-[#9ca3af]">
                  Leads captadas através dos formulários institucionais do website.
                </p>
              </div>

              {briefings.length === 0 ? (
                <div className="p-8 text-center text-[#9ca3af] bg-[#14151a] rounded-lg">
                  Nenhum pedido de briefing registado ainda.
                </div>
              ) : (
                <div className="space-y-3">
                  {briefings.map((brief) => (
                    <div
                      key={brief.id}
                      className="p-5 rounded-lg bg-[#14151a] border border-white/10 flex flex-col md:flex-row justify-between gap-4"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h4 className="text-sm font-bold text-white font-heading">
                            {brief.clientName}
                          </h4>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                              brief.status === 'Reunião Agendada'
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : brief.status === 'Em Análise'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                            }`}
                          >
                            {brief.status}
                          </span>
                          <span className="text-[11px] font-mono text-[#6b7280]">
                            {brief.createdAt}
                          </span>
                        </div>

                        <div className="text-xs text-[#9ca3af] grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                          <div>
                            <span className="text-white/60">Tipologia:</span> {brief.projectType}
                          </div>
                          <div>
                            <span className="text-white/60">Localização:</span> {brief.location}
                          </div>
                          <div>
                            <span className="text-white/60">Contacto:</span>{' '}
                            <span className="text-white font-mono">{brief.clientPhone}</span>
                          </div>
                        </div>

                        <p className="text-xs text-[#c0c4d0] bg-black/40 p-3 rounded border border-white/5 font-light">
                          "{brief.description}"
                        </p>
                      </div>

                      {/* Status select & Delete */}
                      <div className="flex md:flex-col items-end justify-between gap-2 shrink-0">
                        <select
                          value={brief.status}
                          onChange={(e) => updateBriefingStatus(brief.id, e.target.value as any)}
                          className="bg-[#1b1d24] border border-white/10 rounded px-2.5 py-1.5 text-xs text-white focus:border-[#c6a87c] focus:outline-none"
                        >
                          <option value="Pendente">Pendente</option>
                          <option value="Em Análise">Em Análise</option>
                          <option value="Reunião Agendada">Reunião Agendada</option>
                          <option value="Contactado">Contactado</option>
                        </select>

                        <button
                          type="button"
                          onClick={() => deleteBriefing(brief.id)}
                          className="p-1.5 text-xs text-red-400 hover:text-red-300"
                          title="Eliminar Lead"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ATELIER INFO */}
          {activeCmsTab === 'atelier' && (
            <form onSubmit={handleSaveAtelier} className="space-y-5 bg-[#14151a] p-6 rounded-lg border border-white/10">
              <div>
                <h3 className="text-lg font-bold text-white font-heading">
                  Informações Institucionais do Atelier
                </h3>
                <p className="text-xs text-[#9ca3af]">
                  Dados de contacto, morada física em Luanda e métricas em destaque.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#d1d5db] mb-1 font-medium">Nome do Atelier</label>
                  <input
                    type="text"
                    value={atelierForm.name}
                    onChange={(e) => setAtelierForm({ ...atelierForm, name: e.target.value })}
                    className="w-full bg-[#1b1d24] border border-white/10 rounded px-3 py-2 text-xs text-white focus:border-[#c6a87c]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#d1d5db] mb-1 font-medium">Slogan / Tagline</label>
                  <input
                    type="text"
                    value={atelierForm.brandTagline}
                    onChange={(e) => setAtelierForm({ ...atelierForm, brandTagline: e.target.value })}
                    className="w-full bg-[#1b1d24] border border-white/10 rounded px-3 py-2 text-xs text-white focus:border-[#c6a87c]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-[#d1d5db] mb-1 font-medium">Telefone / WhatsApp</label>
                  <input
                    type="text"
                    value={atelierForm.phone}
                    onChange={(e) => setAtelierForm({ ...atelierForm, phone: e.target.value, whatsapp: e.target.value })}
                    className="w-full bg-[#1b1d24] border border-white/10 rounded px-3 py-2 text-xs text-white focus:border-[#c6a87c]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#d1d5db] mb-1 font-medium">E-mail Corporativo</label>
                  <input
                    type="email"
                    value={atelierForm.email}
                    onChange={(e) => setAtelierForm({ ...atelierForm, email: e.target.value })}
                    className="w-full bg-[#1b1d24] border border-white/10 rounded px-3 py-2 text-xs text-white focus:border-[#c6a87c]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#d1d5db] mb-1 font-medium">Instagram</label>
                  <input
                    type="text"
                    value={atelierForm.instagram}
                    onChange={(e) => setAtelierForm({ ...atelierForm, instagram: e.target.value })}
                    className="w-full bg-[#1b1d24] border border-white/10 rounded px-3 py-2 text-xs text-white focus:border-[#c6a87c]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#d1d5db] mb-1 font-medium">Morada Física em Luanda</label>
                <input
                  type="text"
                  value={atelierForm.locationAddress}
                  onChange={(e) => setAtelierForm({ ...atelierForm, locationAddress: e.target.value })}
                  className="w-full bg-[#1b1d24] border border-white/10 rounded px-3 py-2 text-xs text-white focus:border-[#c6a87c]"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                <div>
                  <label className="block text-[11px] text-[#9ca3af] mb-1">Anos de Experiência</label>
                  <input
                    type="text"
                    value={atelierForm.stats.yearsOfExperience}
                    onChange={(e) =>
                      setAtelierForm({
                        ...atelierForm,
                        stats: { ...atelierForm.stats, yearsOfExperience: e.target.value },
                      })
                    }
                    className="w-full bg-[#1b1d24] border border-white/10 rounded px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-[#9ca3af] mb-1">Projectos Concluídos</label>
                  <input
                    type="text"
                    value={atelierForm.stats.completedProjects}
                    onChange={(e) =>
                      setAtelierForm({
                        ...atelierForm,
                        stats: { ...atelierForm.stats, completedProjects: e.target.value },
                      })
                    }
                    className="w-full bg-[#1b1d24] border border-white/10 rounded px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-[#9ca3af] mb-1">Área Projectada</label>
                  <input
                    type="text"
                    value={atelierForm.stats.designedArea}
                    onChange={(e) =>
                      setAtelierForm({
                        ...atelierForm,
                        stats: { ...atelierForm.stats, designedArea: e.target.value },
                      })
                    }
                    className="w-full bg-[#1b1d24] border border-white/10 rounded px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-[#9ca3af] mb-1">Prémios / Distinções</label>
                  <input
                    type="text"
                    value={atelierForm.stats.architecturalAwards}
                    onChange={(e) =>
                      setAtelierForm({
                        ...atelierForm,
                        stats: { ...atelierForm.stats, architecturalAwards: e.target.value },
                      })
                    }
                    className="w-full bg-[#1b1d24] border border-white/10 rounded px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              {/* Hero Section Media Configuration */}
              <div className="pt-4 border-t border-white/10 space-y-4">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#c6a87c] mb-1">
                    Hero Section • Apresentação Unificada
                  </h4>
                  <p className="text-[11px] text-[#9ca3af]">
                    O carrossel da Hero exibe os projectos em destaque de forma unificada. Os projectos com vídeos de interiores (sem pessoas) ganham vida automaticamente na transição de slides, sem necessidade de alternância de modos.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] text-[#9ca3af] mb-1">
                      Vídeo Principal de Interiores (MP4 optimizado)
                    </label>
                    <input
                      type="text"
                      value={atelierForm.heroVideoUrl || ''}
                      onChange={(e) =>
                        setAtelierForm({
                          ...atelierForm,
                          heroVideoUrl: e.target.value,
                        })
                      }
                      placeholder="/videos/hero-interior-living.mp4"
                      className="w-full bg-[#1b1d24] border border-white/10 rounded px-3 py-2 text-xs text-white font-mono"
                    />
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        type="button"
                        onClick={() =>
                          setAtelierForm({ ...atelierForm, heroVideoUrl: '/videos/hero-interior-living.mp4' })
                        }
                        className="text-[10px] text-[#c6a87c] hover:underline"
                      >
                        Sala Estar
                      </button>
                      <span>•</span>
                      <button
                        type="button"
                        onClick={() =>
                          setAtelierForm({ ...atelierForm, heroVideoUrl: '/videos/hero-interior-kitchen.mp4' })
                        }
                        className="text-[10px] text-[#c6a87c] hover:underline"
                      >
                        Cozinha
                      </button>
                      <span>•</span>
                      <button
                        type="button"
                        onClick={() =>
                          setAtelierForm({ ...atelierForm, heroVideoUrl: '/videos/hero-interior-dining.mp4' })
                        }
                        className="text-[10px] text-[#c6a87c] hover:underline"
                      >
                        Sala Jantar
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#9ca3af] mb-1">Legenda / Destaque do Vídeo</label>
                    <input
                      type="text"
                      value={atelierForm.heroVideoTitle || ''}
                      onChange={(e) =>
                        setAtelierForm({
                          ...atelierForm,
                          heroVideoTitle: e.target.value,
                        })
                      }
                      placeholder="Ex: Ambientes de Luxo & Interiores Nobres"
                      className="w-full bg-[#1b1d24] border border-white/10 rounded px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-[#9ca3af] mb-1">
                    Imagem de Capa (Poster de Fallback / Carregamento Instantâneo)
                  </label>
                  <input
                    type="url"
                    value={atelierForm.heroVideoPoster || ''}
                    onChange={(e) =>
                      setAtelierForm({
                        ...atelierForm,
                        heroVideoPoster: e.target.value,
                      })
                    }
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-[#1b1d24] border border-white/10 rounded px-3 py-2 text-xs text-white font-mono"
                  />
                  <p className="text-[10px] text-[#6b7280] mt-1">
                    Exibida instantaneamente antes do vídeo carregar ou em dispositivos com poupança de dados.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#c6a87c] hover:bg-[#d8bb90] text-black font-semibold text-xs uppercase tracking-wider rounded-sm shadow-md cursor-pointer"
                >
                  Salvar Dados do Atelier
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
