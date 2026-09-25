import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useCms } from '@/src/context/CmsContext';
import { Project, ProjectCategory } from '@/src/types';
import { ImagePickerInput } from '@/src/dashboard/src/components/ImagePickerInput';
import { MediaPickerModal } from '@/src/dashboard/src/components/MediaPickerModal';

interface CategoryOption {
  value: ProjectCategory;
  label: string;
}

const CATEGORY_OPTIONS: CategoryOption[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'residencial', label: 'Residencial' },
  { value: 'comercial', label: 'Comercial' },
  { value: 'interiores', label: 'Interiores' },
  { value: 'urbanismo', label: 'Urbanismo' },
  { value: 'em-construcao', label: 'Em Construção' },
];

export default function ProjectsManager() {
  const { projects, addProject, updateProject, deleteProject, toggleFeaturedProject, toggleBeforeAfterProject } = useCms();
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newImageInput, setNewImageInput] = useState('');
  const [isGalleryPickerOpen, setIsGalleryPickerOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<{ id: string; title: string } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Form State matching Project model
  const [formData, setFormData] = useState<Omit<Project, 'id' | 'slug'>>({
    title: '',
    subtitle: '',
    category: 'residencial',
    categoryLabel: 'Residencial',
    architecturalConcept: '',
    description: '',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    altText: '',
    galleryImages: [],
    featured: false,
    featuredInBeforeAfter: false,
    beforeImage: '',
    beforeLabel: 'Fase de Construção',
    afterLabel: 'Conclusão STAK',
    beforeDescription: '',
    fichaTecnica: {
      localizacao: 'Luanda, Angola',
      ano: new Date().getFullYear().toString(),
      area: '450 m²',
      tipologia: 'Moradia Unifamiliar',
      estadoObra: 'Concluído',
      cliente: 'Privado',
      especialidades: ['Arquitectura Contemporânea', 'Estruturas', 'Acabamentos'],
    },
  });

  const filteredProjects = projects.filter((p) => {
    const matchesCategory = selectedCategory === 'todos' || p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.fichaTecnica.localizacao.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenCreate = () => {
    setFormData({
      title: '',
      subtitle: '',
      category: 'residencial',
      categoryLabel: 'Residencial',
      architecturalConcept: '',
      description: '',
      coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      ],
      featured: false,
      featuredInBeforeAfter: false,
      beforeImage: '',
      beforeLabel: 'Fase Inicial de Estruturas',
      afterLabel: 'Conclusão STAK',
      beforeDescription: '',
      fichaTecnica: {
        localizacao: 'Talatona, Luanda • Angola',
        ano: new Date().getFullYear().toString(),
        area: '520 m²',
        tipologia: 'Moradia Contemporânea',
        estadoObra: 'Concluído',
        cliente: 'Privado',
        especialidades: ['Arquitectura', 'Paisagismo', 'Gestão de Obra'],
      },
    });
    setIsCreating(true);
    setEditingProject(null);
  };

  const handleOpenEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      subtitle: project.subtitle,
      category: project.category,
      categoryLabel: project.categoryLabel,
      architecturalConcept: project.architecturalConcept || '',
      description: project.description,
      coverImage: project.coverImage,
      altText: project.altText || '',
      galleryImages: [...(project.galleryImages || [])],
      featured: project.featured,
      featuredInBeforeAfter: Boolean(project.featuredInBeforeAfter),
      beforeImage: project.beforeImage || '',
      beforeLabel: project.beforeLabel || 'Fase de Construção',
      afterLabel: project.afterLabel || 'Conclusão STAK',
      beforeDescription: project.beforeDescription || '',
      videoUrl: project.videoUrl,
      videoPoster: project.videoPoster,
      highlightOrder: project.highlightOrder,
      fichaTecnica: {
        ...project.fichaTecnica,
        especialidades: [...(project.fichaTecnica?.especialidades || [])],
      },
    });
    setIsCreating(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    if (isCreating) {
      addProject(formData);
      showToast(`Projecto "${formData.title}" adicionado com sucesso!`);
    } else if (editingProject) {
      updateProject({
        ...editingProject,
        ...formData,
      });
      showToast(`Projecto "${formData.title}" actualizado com sucesso!`);
    }

    setIsCreating(false);
    setEditingProject(null);
  };

  const handleAddGalleryImage = () => {
    if (!newImageInput.trim()) return;
    setFormData({
      ...formData,
      galleryImages: [...formData.galleryImages, newImageInput.trim()],
    });
    setNewImageInput('');
  };

  const handleRemoveGalleryImage = (indexToRemove: number) => {
    setFormData({
      ...formData,
      galleryImages: formData.galleryImages.filter((_, i) => i !== indexToRemove),
    });
  };

  const handleConfirmDelete = () => {
    if (!projectToDelete) return;
    const title = projectToDelete.title;
    deleteProject(projectToDelete.id);
    showToast(`Projecto "${title}" eliminado com sucesso.`);
    setProjectToDelete(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-[#111827] text-white rounded-xl shadow-2xl border border-emerald-500/50 animate-fade-in">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold text-[#c6a87c] tracking-widest uppercase">
              Portfólio de Arquitectura
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight font-serif">
            Gestão de Projectos & Obras
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Crie novos projectos, actualize imagens de alta definição, comparativos antes/depois e fichas técnicas.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#111827] hover:bg-black text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-xs shrink-0"
        >
          <Icon icon="solar:add-circle-linear" width="18" />
          <span>+ Novo Projecto</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {CATEGORY_OPTIONS.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat.value
                  ? 'bg-[#111827] text-white shadow-2xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-black'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Icon
            icon="solar:magnifer-linear"
            width="16"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Pesquisar projecto..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#c6a87c] focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-2xs hover:border-gray-400 transition-all flex flex-col group"
          >
            {/* Project Image & Overlays */}
            <div className="relative aspect-16/10 bg-gray-100 overflow-hidden">
              <img
                src={project.coverImage}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80';
                }}
              />

              {/* Status and Category Badges */}
              <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                <span className="bg-black/75 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded">
                  {project.categoryLabel || project.category}
                </span>
                <span className="bg-white/90 backdrop-blur-xs text-gray-800 text-[10px] font-medium px-2 py-0.5 rounded">
                  {project.fichaTecnica?.estadoObra || 'Concluído'}
                </span>
              </div>

              {/* Featured Toggle Button */}
              <button
                type="button"
                onClick={() => toggleFeaturedProject(project.id)}
                className={`absolute top-2.5 right-2.5 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs ${
                  project.featured
                    ? 'bg-[#c6a87c] text-white'
                    : 'bg-black/60 text-gray-200 hover:bg-black'
                }`}
                title="Alternar Destaque no Website"
              >
                {project.featured ? '★ Destaque' : '☆ Promover'}
              </button>

              {/* Before/After Toggle Check Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (!project.beforeImage && !project.featuredInBeforeAfter) {
                    showToast('Nota: Certifique-se de adicionar uma foto de "Antes" ao projecto.');
                  }
                  toggleBeforeAfterProject(project.id);
                  showToast(
                    !project.featuredInBeforeAfter
                      ? `"${project.title}" adicionado à secção Antes & Depois da Página Inicial!`
                      : `"${project.title}" removido do Antes & Depois.`
                  );
                }}
                className={`absolute bottom-2.5 left-2.5 px-2 py-1 rounded text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm flex items-center gap-1.5 ${
                  project.featuredInBeforeAfter
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                    : 'bg-black/75 text-gray-300 hover:bg-black hover:text-white'
                }`}
                title={project.featuredInBeforeAfter ? 'Activo na secção Antes & Depois da Página Inicial (Clique para desactivar)' : 'Clique para exibir na secção Antes & Depois da Página Inicial'}
              >
                <Icon
                  icon={project.featuredInBeforeAfter ? 'solar:check-circle-bold' : 'solar:circle-linear'}
                  width="13"
                />
                <span>{project.featuredInBeforeAfter ? 'Antes/Depois Activo' : 'Antes/Depois'}</span>
              </button>

              {/* Image Count Indicator */}
              <span className="absolute bottom-2.5 right-2.5 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded flex items-center gap-1">
                <Icon icon="solar:gallery-linear" width="12" />
                {(project.galleryImages?.length || 0) + 1} fotos
              </span>
            </div>

            {/* Project Details */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="font-bold text-base text-gray-900 group-hover:text-[#c6a87c] transition-colors line-clamp-1">
                  {project.title}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{project.subtitle}</p>

                <p className="text-xs text-gray-600 line-clamp-2 mt-2 leading-relaxed">
                  {project.architecturalConcept || project.description}
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <span className="truncate max-w-[150px]">{project.fichaTecnica?.localizacao}</span>
                <span className="font-mono font-medium text-gray-700">{project.fichaTecnica?.area}</span>
              </div>

              {/* Actions Toolbar */}
              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(project)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  <Icon icon="solar:pen-linear" width="14" />
                  <span>Editar Projecto</span>
                </button>

                <button
                  type="button"
                  onClick={() => setProjectToDelete({ id: project.id, title: project.title })}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                  title="Eliminar Projecto"
                >
                  <Icon icon="solar:trash-bin-trash-linear" width="16" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
          <Icon icon="solar:buildings-3-linear" width="48" className="mx-auto text-gray-300 mb-3" />
          <h3 className="text-sm font-bold text-gray-800">Nenhum projecto encontrado</h3>
          <p className="text-xs text-gray-500 mt-1">Tente ajustar os filtros ou adicione um novo projecto.</p>
        </div>
      )}

      {/* Create / Edit Project Modal */}
      {(isCreating || editingProject) && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-gray-200 overflow-hidden my-8 animate-scale-up">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#c6a87c] tracking-widest uppercase">
                  {isCreating ? 'Novo Registo' : 'Actualização'}
                </span>
                <h2 className="text-lg font-bold text-gray-900 font-serif">
                  {isCreating ? 'Adicionar Novo Projecto' : `Editar: ${editingProject?.title}`}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsCreating(false);
                  setEditingProject(null);
                }}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
              >
                <Icon icon="solar:close-circle-linear" width="22" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSave} className="p-6 space-y-6 max-h-[78vh] overflow-y-auto">
              {/* Row 1: Title & Subtitle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Título do Projecto *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Residência Talatona"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#c6a87c] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Subtítulo / Tipologia
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Moradia Unifamiliar de Luxo"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#c6a87c] focus:outline-none"
                  />
                </div>
              </div>

              {/* Row 2: Category, Status, Year, Area */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Categoria</label>
                  <select
                    value={formData.category}
                    onChange={(e) => {
                      const cat = e.target.value as Project['category'];
                      const matched = CATEGORY_OPTIONS.find((c) => c.value === cat);
                      setFormData({
                        ...formData,
                        category: cat,
                        categoryLabel: matched ? matched.label : 'Residencial',
                      });
                    }}
                    className="w-full px-2.5 py-2 border border-gray-300 rounded-lg text-xs bg-white focus:ring-1 focus:ring-[#c6a87c] focus:outline-none"
                  >
                    <option value="residencial">Residencial</option>
                    <option value="comercial">Comercial</option>
                    <option value="interiores">Interiores</option>
                    <option value="urbanismo">Urbanismo</option>
                    <option value="em-construcao">Em Construção</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Estado</label>
                  <select
                    value={formData.fichaTecnica.estadoObra}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        fichaTecnica: {
                          ...formData.fichaTecnica,
                          estadoObra: e.target.value as any,
                        },
                      })
                    }
                    className="w-full px-2.5 py-2 border border-gray-300 rounded-lg text-xs bg-white focus:ring-1 focus:ring-[#c6a87c] focus:outline-none"
                  >
                    <option value="Concluído">Concluído</option>
                    <option value="Em Execução">Em Execução</option>
                    <option value="Estudo Prévio">Estudo Prévio</option>
                    <option value="Licenciamento Aprovado">Licenciamento Aprovado</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Ano</label>
                  <input
                    type="text"
                    placeholder="Ex: 2024"
                    value={formData.fichaTecnica.ano}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        fichaTecnica: { ...formData.fichaTecnica, ano: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#c6a87c] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Área Total</label>
                  <input
                    type="text"
                    placeholder="Ex: 580 m²"
                    value={formData.fichaTecnica.area}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        fichaTecnica: { ...formData.fichaTecnica, area: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#c6a87c] focus:outline-none"
                  />
                </div>
              </div>

              {/* Row 3: Location & Featured */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Localização (Cidade, Província / País)
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Talatona, Luanda • Angola"
                    value={formData.fichaTecnica.localizacao}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        fichaTecnica: { ...formData.fichaTecnica, localizacao: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#c6a87c] focus:outline-none"
                  />
                </div>

                <div className="pt-4">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="w-4 h-4 text-[#c6a87c] rounded border-gray-300 focus:ring-[#c6a87c]"
                    />
                    <span className="text-xs font-semibold text-gray-800">
                      ★ Destacar na Homepage
                    </span>
                  </label>
                </div>
              </div>

              {/* Concept & Description */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Conceito Arquitectónico
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Filosofia de desenho, luz natural, ventilação cruzada..."
                    value={formData.architecturalConcept}
                    onChange={(e) => setFormData({ ...formData, architecturalConcept: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#c6a87c] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Descrição Completa do Projecto
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Detalhes dos materiais, programa habitacional e desafios superados..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#c6a87c] focus:outline-none"
                  />
                </div>
              </div>

              {/* Cover Image */}
              <div className="border border-gray-200 rounded-xl p-4 bg-gray-50/50 space-y-3">
                <ImagePickerInput
                  label="Fotografia de Capa Principal *"
                  description="Imagem em alta resolução que representa o projecto na grelha e no cabeçalho"
                  value={formData.coverImage}
                  onChange={(url) => setFormData({ ...formData, coverImage: url })}
                  altText={formData.altText || ''}
                  onAltChange={(alt) => setFormData({ ...formData, altText: alt })}
                  altPlaceholder="ex: Vista frontal da Moradia Miramar com brises e iluminação arquitectónica"
                  acceptedType="image"
                  placeholder="https://..."
                />
              </div>

              {/* Video and Cinematic Media (Optional) */}
              <div className="border border-gray-200 rounded-xl p-4 bg-gray-50/50 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                      Vídeo Cinematográfico do Projecto (Opcional)
                    </h4>
                    <p className="text-[11px] text-gray-500">
                      Adicione um tour em vídeo (MP4) e a sua imagem poster de suporte
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <ImagePickerInput
                    label="Ficheiro de Vídeo (MP4)"
                    description="Vídeo para reprodução na Hero ou na página de detalhe"
                    value={formData.videoUrl || ''}
                    onChange={(url) => setFormData({ ...formData, videoUrl: url })}
                    acceptedType="video"
                    placeholder="/videos/exemplo.mp4"
                  />

                  <ImagePickerInput
                    label="Poster de Pré-carregamento do Vídeo"
                    description="Imagem estática exibida antes de iniciar o vídeo"
                    value={formData.videoPoster || ''}
                    onChange={(url) => setFormData({ ...formData, videoPoster: url })}
                    acceptedType="image"
                    placeholder="https://..."
                  />
                </div>
              </div>

              {/* Before and After Section */}
              <div className="border border-gray-200 rounded-xl p-4 bg-gray-50/50 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                      Comparativo Antes & Depois (Opcional)
                    </h4>
                    <span className="text-[10px] text-gray-500">
                      Permite aos visitantes deslizarem interactivamente entre a fase de obra e o resultado final
                    </span>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer select-none bg-white px-3 py-1.5 rounded-lg border border-gray-200 hover:border-[#c6a87c] transition-colors">
                    <input
                      type="checkbox"
                      checked={Boolean(formData.featuredInBeforeAfter)}
                      onChange={(e) => setFormData({ ...formData, featuredInBeforeAfter: e.target.checked })}
                      className="w-4 h-4 text-[#c6a87c] rounded border-gray-300 focus:ring-[#c6a87c] cursor-pointer"
                    />
                    <span className="text-[11px] font-semibold text-gray-800">
                      Exibir na Página Inicial (Antes & Depois)
                    </span>
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <ImagePickerInput
                    label="Fotografia da Fase de Obra / Antes"
                    description="Fotografia da estrutura, ruína ou terreno antes da intervenção"
                    value={formData.beforeImage || ''}
                    onChange={(url) => setFormData({ ...formData, beforeImage: url })}
                    acceptedType="image"
                    placeholder="https://..."
                  />

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Rótulo da Fase Inicial (Antes)
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: Estado Inicial (Tosco & Demolição)"
                        value={formData.beforeLabel || ''}
                        onChange={(e) => setFormData({ ...formData, beforeLabel: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#c6a87c] focus:outline-none bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Rótulo da Fase Concluída (Depois)
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: Entrega STAK (Interiores & Marcenaria)"
                        value={formData.afterLabel || ''}
                        onChange={(e) => setFormData({ ...formData, afterLabel: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#c6a87c] focus:outline-none bg-white"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Descrição da Transformação / Solução Técnica
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Substituição integral de alvenarias cegas por painéis em nogueira ripada e iluminação linear..."
                    value={formData.beforeDescription || ''}
                    onChange={(e) => setFormData({ ...formData, beforeDescription: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#c6a87c] focus:outline-none bg-white"
                  />
                </div>
              </div>

              {/* Gallery Images */}
              <div className="border border-gray-200 rounded-xl p-4 bg-gray-50/50 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                      Galeria de Fotografias Adicionais ({formData.galleryImages.length})
                    </h4>
                    <p className="text-[11px] text-gray-500">
                      Fotografias de detalhe, ângulos interiores, maquetes e acabamentos
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsGalleryPickerOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#c6a87c] hover:bg-[#b5966a] text-black text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-2xs shrink-0 self-start sm:self-auto"
                  >
                    <Icon icon="solar:gallery-add-bold" width="16" />
                    <span>Escolher da Biblioteca ou Upload</span>
                  </button>
                </div>

                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="Ou cole directamente a URL de uma imagem..."
                    value={newImageInput}
                    onChange={(e) => setNewImageInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddGalleryImage();
                      }
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#c6a87c] focus:outline-none bg-white font-mono"
                  />
                  <button
                    type="button"
                    onClick={handleAddGalleryImage}
                    className="px-3.5 py-2 bg-gray-900 text-white rounded-lg text-xs font-semibold hover:bg-black transition-colors cursor-pointer shrink-0"
                  >
                    + Adicionar URL
                  </button>
                </div>

                {formData.galleryImages.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    {formData.galleryImages.map((img, idx) => (
                      <div
                        key={idx}
                        className="relative aspect-4/3 rounded-lg overflow-hidden border border-gray-300 group shadow-2xs"
                      >
                        <img
                          src={img}
                          alt={`Galeria ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveGalleryImage(idx)}
                          className="absolute top-1 right-1 p-1 bg-black/75 hover:bg-red-600 text-white rounded transition-colors cursor-pointer opacity-90 group-hover:opacity-100"
                          title="Remover fotografia"
                        >
                          <Icon icon="solar:trash-bin-trash-linear" width="14" />
                        </button>
                        <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/60 text-white text-[9px] font-mono">
                          #{idx + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 rounded-lg border border-dashed border-gray-300 text-center text-xs text-gray-400">
                    Nenhuma fotografia adicional na galeria deste projecto. Clique em "Escolher da Biblioteca ou Upload" para adicionar imagens.
                  </div>
                )}
              </div>

              {/* Gallery Media Modal */}
              <MediaPickerModal
                isOpen={isGalleryPickerOpen}
                onClose={() => setIsGalleryPickerOpen(false)}
                onSelect={(url) => {
                  setFormData((prev) => ({
                    ...prev,
                    galleryImages: [...prev.galleryImages, url],
                  }));
                  setIsGalleryPickerOpen(false);
                  showToast('Imagem adicionada à galeria do projecto!');
                }}
                acceptedType="image"
                title="Adicionar Fotografia à Galeria"
              />

              {/* Actions Bottom Bar */}
              <div className="pt-4 border-t border-gray-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreating(false);
                    setEditingProject(null);
                  }}
                  className="px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#111827] hover:bg-black text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-xs"
                  style={{ color: '#ffffff' }}
                >
                  <span style={{ color: '#ffffff' }}>
                    {isCreating ? 'Guardar Projecto' : 'Actualizar Projecto'}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* In-App Delete Confirmation Modal (NO window.confirm!) */}
      {projectToDelete && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200 animate-fade-in space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Icon icon="solar:trash-bin-trash-bold" width="24" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-gray-900">
                Eliminar Projecto?
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Tem a certeza que deseja eliminar o projecto <strong>"{projectToDelete.title}"</strong>? Esta acção é irreversível e remove o projecto do website.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setProjectToDelete(null)}
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
