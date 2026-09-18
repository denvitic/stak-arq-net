import React, { useState, useMemo } from 'react';
import { useCms } from '../context/CmsContext';
import { Project, ProjectCategory, NavPage } from '../types';
import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  ListFilter,
  MapPin,
  Calendar,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Building2,
  X,
  FileSpreadsheet,
  CheckCircle2,
  FileText,
  Cpu
} from 'lucide-react';

interface ProjectsPageProps {
  onNavigate: (page: NavPage) => void;
  onSelectProject: (project: Project) => void;
  onSelectServiceForBriefing: (serviceTitle: string) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  onNavigate,
  onSelectProject,
  onSelectServiceForBriefing,
}) => {
  const { projects, pagesContent, atelierInfo } = useCms();
  const projectsData = pagesContent?.projects;

  // Filters state
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('todos');
  const [selectedStatus, setSelectedStatus] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'dossier'>('grid');

  const categories: { id: ProjectCategory; label: string }[] = [
    { id: 'todos', label: 'Todos os Projectos' },
    { id: 'residencial', label: 'Residencial de Luxo' },
    { id: 'comercial', label: 'Comercial & Corporativo' },
    { id: 'interiores', label: 'Design de Interiores' },
    { id: 'urbanismo', label: 'Urbanismo & Masterplan' },
    { id: 'em-construcao', label: 'Em Construção' },
  ];

  const statuses = [
    { id: 'todos', label: 'Todos os Estados' },
    { id: 'Concluído', label: 'Concluídos' },
    { id: 'Em Execução', label: 'Em Execução de Obra' },
    { id: 'Estudo Prévio', label: 'Estudo Prévio / Conceito' },
    { id: 'Licenciamento Aprovado', label: 'Licenciamento Aprovado' },
  ];

  // Filter logic
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Category filter
      const matchesCategory =
        selectedCategory === 'todos' || project.category === selectedCategory;

      // Status filter
      const matchesStatus =
        selectedStatus === 'todos' || project.fichaTecnica.estadoObra === selectedStatus;

      // Search query filter
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        project.title.toLowerCase().includes(q) ||
        project.subtitle.toLowerCase().includes(q) ||
        project.fichaTecnica.localizacao.toLowerCase().includes(q) ||
        project.fichaTecnica.tipologia.toLowerCase().includes(q) ||
        project.fichaTecnica.ano.includes(q);

      return matchesCategory && matchesStatus && matchesQuery;
    });
  }, [projects, selectedCategory, selectedStatus, searchQuery]);

  return (
    <div className="min-h-screen bg-[#090a0c] text-[#e8e8ea] pb-20">
      {/* 1. Monumental Architectural Header with Featured Image */}
      <div className="page-hero-banner border-b border-white/10 relative min-h-[420px] sm:min-h-[480px] pt-28 sm:pt-36 pb-16 sm:pb-24 flex items-center overflow-hidden">
        {/* Background Image with Dark Vignette & Architectural Gradients */}
        <div className="absolute inset-0 z-0">
          <img
            src={projectsData?.hero?.bgImage || 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=85'}
            alt="Catálogo de Obras STAK Arquitectura"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover filter brightness-[0.35] contrast-110 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090a0c] via-[#090a0c]/75 to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#090a0c] via-[#090a0c]/80 to-transparent" />
          {/* Blueprint grid */}
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#c6a87c_1px,transparent_1px)] [background-size:24px_24px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10 w-full">
          <div className="flex items-center gap-2 text-xs font-mono text-[#c6a87c] uppercase tracking-[0.25em] mb-4">
            <button
              type="button"
              onClick={() => onNavigate('inicio')}
              className="hover:underline cursor-pointer"
            >
              Início
            </button>
            <span>/</span>
            <span className="text-white">{projectsData?.hero?.badge || 'Catálogo Geral de Obras'}</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight font-heading leading-tight mb-4">
                {projectsData?.hero?.title || 'Obras, projectos em execução e estudos prévios.'}
              </h1>
              <p className="text-sm sm:text-lg text-[#d1d5db] font-light leading-relaxed">
                {projectsData?.hero?.description ||
                  'Cada projecto resulta de uma investigação profunda sobre a orientação solar, a ventilação costeira de Luanda e a nobreza dos materiais. Explore a colecção completa com especificações técnicas detalhadas.'}
              </p>
            </div>

            {/* Metrics Chips */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/15 text-center min-w-[120px] shadow-xl">
                <div className="text-2xl sm:text-3xl font-bold text-[#c6a87c] font-heading">{projects.length}</div>
                <div className="text-[10px] font-mono uppercase text-[#9ca3af]">Obras no Catálogo</div>
              </div>
              <div className="p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/15 text-center min-w-[120px] shadow-xl">
                <div className="text-2xl sm:text-3xl font-bold text-white font-heading">100%</div>
                <div className="text-[10px] font-mono uppercase text-[#9ca3af]">Compatibilizadas</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Comprehensive Filter & Search Bar */}
      <section className="relative bg-[#0c0d11] border-b border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          {/* Top row: Search input & Status select & View Mode */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#8c909c] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Pesquisar por obra, localização (Talatona, Miramar, etc.) ou tipologia..."
                className="w-full bg-[#14151a] border border-white/10 rounded-sm pl-10 pr-9 py-2.5 text-xs text-white placeholder-[#6b7280] focus:border-[#c6a87c] focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8c909c] hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Status Select & View Toggle */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-[#8c909c] font-mono uppercase hidden sm:inline">Estado:</span>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="bg-[#14151a] border border-white/10 rounded-sm px-3 py-2 text-xs text-white focus:border-[#c6a87c] focus:outline-none"
                >
                  {statuses.map((st) => (
                    <option key={st.id} value={st.id}>
                      {st.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* View Mode Toggle Buttons */}
              <div className="flex items-center rounded border border-white/10 bg-[#14151a] p-0.5">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded text-xs transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-[#c6a87c] text-black font-semibold'
                      : 'text-[#8c909c] hover:text-white'
                  }`}
                  title="Modo Grelha Arquitectónica"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('dossier')}
                  className={`p-1.5 rounded text-xs transition-colors ${
                    viewMode === 'dossier'
                      ? 'bg-[#c6a87c] text-black font-semibold'
                      : 'text-[#8c909c] hover:text-white'
                  }`}
                  title="Modo Dossier Técnico"
                >
                  <ListFilter className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom row: Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              const count =
                cat.id === 'todos'
                  ? projects.length
                  : projects.filter((p) => p.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap uppercase tracking-wider text-[11px] font-medium transition-all cursor-pointer flex items-center gap-2 ${
                    isSelected
                      ? 'bg-[#c6a87c] text-black font-bold shadow-md'
                      : 'bg-[#14151a] border border-white/10 text-[#9ca3af] hover:text-white hover:border-white/20'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isSelected ? 'bg-black/30 text-black' : 'bg-white/10 text-white/70'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Projects Display Section */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Results indicator */}
        <div className="flex items-center justify-between text-xs text-[#8c909c] mb-8 pb-3 border-b border-white/10">
          <div>
            A apresentar <span className="text-white font-mono font-bold">{filteredProjects.length}</span> projectos de alto padrão
          </div>
          {(searchQuery || selectedCategory !== 'todos' || selectedStatus !== 'todos') && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('todos');
                setSelectedStatus('todos');
                setSearchQuery('');
              }}
              className="text-[#c6a87c] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Limpar todos os filtros</span>
            </button>
          )}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-24 bg-[#111216] border border-white/10 rounded-xl space-y-4">
            <Building2 className="w-12 h-12 text-[#8c909c] mx-auto opacity-50" />
            <h3 className="text-xl font-bold text-white font-heading">
              Nenhum projecto encontrado
            </h3>
            <p className="text-xs text-[#9ca3af] max-w-md mx-auto">
              Não existem obras que correspondam aos filtros seleccionados. Tente ajustar os termos de pesquisa ou remover a categoria.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('todos');
                setSelectedStatus('todos');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 bg-[#c6a87c] text-black text-xs font-semibold uppercase tracking-wider rounded-sm"
            >
              Restabelecer Filtros
            </button>
          </div>
        )}

        {/* VIEW MODE 1: Architectural Grid */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="group cursor-pointer bg-[#111216] border border-white/10 rounded-xl overflow-hidden hover:border-[#c6a87c]/60 transition-all duration-300 shadow-xl flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  <div className="relative aspect-[16/11] overflow-hidden bg-black/60">
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                    {/* Floating Badges */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-sm bg-black/80 backdrop-blur-md text-[#c6a87c] text-[10px] font-mono uppercase tracking-wider border border-white/10">
                        {project.categoryLabel}
                      </span>
                      <span className="px-2 py-1 rounded-sm bg-black/70 backdrop-blur-md text-white/90 text-[10px] font-mono border border-white/10">
                        {project.fichaTecnica.estadoObra}
                      </span>
                    </div>

                    <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-xs text-white">
                      <span className="flex items-center gap-1 font-mono text-[11px] text-[#c6a87c]">
                        <MapPin className="w-3.5 h-3.5" />
                        {project.fichaTecnica.localizacao}
                      </span>
                      <span className="font-mono text-[11px] bg-black/70 px-2 py-0.5 rounded border border-white/10">
                        {project.fichaTecnica.area}
                      </span>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-6 space-y-2.5">
                    <h3 className="text-xl font-bold text-white font-heading group-hover:text-[#c6a87c] transition-colors leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-xs text-[#9ca3af] line-clamp-2 font-light leading-relaxed">
                      {project.subtitle}
                    </p>

                    <div className="pt-2 text-[11px] text-[#8c909c] flex items-center gap-2">
                      <span className="font-medium text-white/80">{project.fichaTecnica.tipologia}</span>
                      <span>•</span>
                      <span className="font-mono">{project.fichaTecnica.ano}</span>
                    </div>
                  </div>
                </div>

                {/* Footer of Card */}
                <div className="px-6 pb-6 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="text-[#8c909c] text-[11px]">
                    {project.galleryImages.length + 1} Fotografias & Plantas
                  </span>
                  <span className="text-[#c6a87c] font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Abrir Dossier
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW MODE 2: Dossier / Technical Table Mode */}
        {viewMode === 'dossier' && (
          <div className="space-y-4">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="group cursor-pointer bg-[#111216] border border-white/10 rounded-xl p-5 hover:border-[#c6a87c]/60 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:bg-[#15161c]"
              >
                <div className="flex items-start sm:items-center gap-5">
                  <div className="w-28 h-20 sm:w-36 sm:h-24 rounded-lg overflow-hidden bg-black shrink-0 border border-white/10 relative">
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase text-[#c6a87c] px-2 py-0.5 rounded bg-[#c6a87c]/10 border border-[#c6a87c]/30">
                        {project.categoryLabel}
                      </span>
                      <span className="text-[10px] font-mono text-[#9ca3af]">
                        {project.fichaTecnica.ano}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-white font-heading group-hover:text-[#c6a87c] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-[#9ca3af] line-clamp-1 max-w-xl font-light">
                      {project.subtitle}
                    </p>
                  </div>
                </div>

                {/* Technical Specs Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs pt-4 lg:pt-0 border-t lg:border-t-0 border-white/10 shrink-0">
                  <div>
                    <div className="text-[#8c909c] text-[10px] uppercase font-mono">Localização</div>
                    <div className="text-white font-medium truncate max-w-[120px]">
                      {project.fichaTecnica.localizacao}
                    </div>
                  </div>
                  <div>
                    <div className="text-[#8c909c] text-[10px] uppercase font-mono">Área Bruta</div>
                    <div className="text-[#c6a87c] font-mono font-bold">{project.fichaTecnica.area}</div>
                  </div>
                  <div>
                    <div className="text-[#8c909c] text-[10px] uppercase font-mono">Tipologia</div>
                    <div className="text-white truncate max-w-[130px]">{project.fichaTecnica.tipologia}</div>
                  </div>
                  <div>
                    <div className="text-[#8c909c] text-[10px] uppercase font-mono">Estado</div>
                    <div className="text-emerald-400 font-medium">{project.fichaTecnica.estadoObra}</div>
                  </div>
                </div>

                {/* Action button */}
                <div className="shrink-0 flex items-center justify-end">
                  <span className="px-4 py-2 rounded bg-white/5 group-hover:bg-[#c6a87c] group-hover:text-black text-white text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5">
                    <span>Dossier</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. Especificações de Entrega: O que inclui o Dossier Técnico STAK */}
      <section className="py-20 bg-[#0c0d11] border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <div className="text-xs font-mono text-[#c6a87c] uppercase tracking-widest mb-2">
              Padronização & Transparência
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white font-heading">
              O que os nossos clientes recebem em cada empreendimento.
            </h2>
            <p className="text-sm text-[#9ca3af] mt-2 font-light">
              Eliminamos surpresas em obra. Todos os projectos do catálogo são acompanhados por um conjunto exaustivo de documentação executiva e digital.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl bg-[#111216] border border-white/10 hover:border-[#c6a87c]/40 transition-all space-y-4">
              <div className="p-3 rounded-lg bg-[#c6a87c]/10 text-[#c6a87c] w-fit border border-[#c6a87c]/20">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-heading">
                  Peças Desenhadas 1:50 e 1:20
                </h3>
                <p className="text-xs text-[#9ca3af] mt-2 leading-relaxed font-light">
                  Plantas cotadas, alçados, cortes axonométricos e pormenorização executiva de caixilharias, cantarias e impermeabilizações.
                </p>
              </div>
              <div className="pt-3 border-t border-white/5 text-[11px] font-mono text-[#c6a87c] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Pronto para Concurso</span>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-[#111216] border border-white/10 hover:border-[#c6a87c]/40 transition-all space-y-4">
              <div className="p-3 rounded-lg bg-[#c6a87c]/10 text-[#c6a87c] w-fit border border-[#c6a87c]/20">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-heading">
                  Mapa de Quantidades & Medições
                </h3>
                <p className="text-xs text-[#9ca3af] mt-2 leading-relaxed font-light">
                  Listagem rigorosa de metros cúbicos de betão, toneladas de aço, revestimentos e metros lineares de tubagens para orçamentação precisa.
                </p>
              </div>
              <div className="pt-3 border-t border-white/5 text-[11px] font-mono text-[#c6a87c] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Controlo de Custos Real</span>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-[#111216] border border-white/10 hover:border-[#c6a87c]/40 transition-all space-y-4">
              <div className="p-3 rounded-lg bg-[#c6a87c]/10 text-[#c6a87c] w-fit border border-[#c6a87c]/20">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-heading">
                  Compatibilização BIM 3D
                </h3>
                <p className="text-xs text-[#9ca3af] mt-2 leading-relaxed font-light">
                  Deteção antecipada de conflitos entre vigas de betão, redes de esgotos, condutas de AVAC e eletricidade antes de chegar à laje.
                </p>
              </div>
              <div className="pt-3 border-t border-white/5 text-[11px] font-mono text-[#c6a87c] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Zero Erros em Estaleiro</span>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-[#111216] border border-white/10 hover:border-[#c6a87c]/40 transition-all space-y-4">
              <div className="p-3 rounded-lg bg-[#c6a87c]/10 text-[#c6a87c] w-fit border border-[#c6a87c]/20">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-heading">
                  Processo Camarário GPL
                </h3>
                <p className="text-xs text-[#9ca3af] mt-2 leading-relaxed font-light">
                  Memória descritiva e justificativa assinada por arquitectos e engenheiros habilitados pela OAA e OEA em Angola.
                </p>
              </div>
              <div className="pt-3 border-t border-white/5 text-[11px] font-mono text-[#c6a87c] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>100% Homologável</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Bottom Advisory & Briefing Banner */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-2xl bg-[#111216] border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl space-y-2 text-center lg:text-left">
            <span className="text-xs font-mono text-[#c6a87c] uppercase tracking-widest">
              {projectsData?.sections?.cta?.tag || 'Consultoria & Estudo de Viabilidade'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              {projectsData?.sections?.cta?.title || 'Tem um terreno ou imóvel para intervir em Angola?'}
            </h3>
            <p className="text-xs sm:text-sm text-[#9ca3af] font-light">
              {projectsData?.sections?.cta?.description ||
                'A direcção técnica da STAK realiza estudos prévios de ocupação de solo, cálculo de áreas e análise de regulamentos urbanísticos camarários.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <button
              type="button"
              onClick={() => {
                const link = projectsData?.sections?.cta?.buttonLink;
                if (link) {
                  if (link.startsWith('#')) {
                    const page = link.replace('#', '');
                    if (['home', 'atelier', 'projectos', 'servicos', 'artigos', 'contactos', 'sobre-nos'].includes(page)) {
                      onNavigate(page as any);
                      return;
                    }
                  } else if (link.startsWith('http') || link.startsWith('/')) {
                    window.location.href = link;
                    return;
                  }
                }
                onNavigate('contactos');
              }}
              className="w-full sm:w-auto px-8 py-4 bg-[#c6a87c] hover:bg-[#d8bb90] text-black font-bold text-xs uppercase tracking-wider rounded-sm transition-all cursor-pointer shadow-lg"
            >
              {projectsData?.sections?.cta?.buttonLabel || 'Submeter Briefing de Obra'}
            </button>
            <a
              href={`https://wa.me/${(atelierInfo.phone || '244928058840').replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-4 bg-white/5 hover:bg-white/15 text-white border border-white/10 text-xs font-semibold uppercase tracking-wider rounded-sm transition-all text-center"
            >
              Tirar Dúvidas no WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
