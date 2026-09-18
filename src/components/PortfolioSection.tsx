import React, { useState, useMemo } from 'react';
import { useCms } from '../context/CmsContext';
import { Project, ProjectCategory } from '../types';
import { Search, MapPin, Maximize2, LayoutGrid, ListFilter, ArrowUpRight, Building2, Home, Sparkles, Trees, HardHat } from 'lucide-react';

interface PortfolioSectionProps {
  onSelectProject: (project: Project) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onSelectProject }) => {
  const { projects } = useCms();
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('todos');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'todos' as ProjectCategory, label: 'Todos os Projectos', icon: ListFilter },
    { id: 'residencial' as ProjectCategory, label: 'Residencial de Alto Padrão', icon: Home },
    { id: 'comercial' as ProjectCategory, label: 'Comercial & Corporativo', icon: Building2 },
    { id: 'interiores' as ProjectCategory, label: 'Design de Interiores', icon: Sparkles },
    { id: 'urbanismo' as ProjectCategory, label: 'Urbanismo & Masterplan', icon: Trees },
    { id: 'em-construcao' as ProjectCategory, label: 'Em Construção / Obra', icon: HardHat },
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        activeCategory === 'todos' || project.category === activeCategory;
      
      const q = searchQuery.toLowerCase();
      const matchesQuery =
        !q ||
        project.title.toLowerCase().includes(q) ||
        project.subtitle.toLowerCase().includes(q) ||
        project.fichaTecnica.localizacao.toLowerCase().includes(q) ||
        project.fichaTecnica.tipologia.toLowerCase().includes(q);

      return matchesCategory && matchesQuery;
    });
  }, [projects, activeCategory, searchQuery]);

  return (
    <section id="portfolio" className="py-24 sm:py-32 bg-[#090a0c] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#c6a87c] tracking-[0.25em] uppercase mb-3">
              <span>Portfólio de Obras</span>
              <span>/</span>
              <span>Galeria Arquitectónica</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading leading-tight">
              Projectos concebidos com rigor, distinção e perenidade.
            </h2>
          </div>

          <p className="text-sm text-[#9ca3af] max-w-md font-light">
            Explore a nossa selecção de obras e estudos em Angola. Cada intervenção é documentada com fotografia de alta
            resolução, fichas técnicas e conceito arquitectónico detalhado.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
          {/* Categories Pill List */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const count =
                cat.id === 'todos'
                  ? projects.length
                  : projects.filter((p) => p.category === cat.id).length;

              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-sm text-xs font-medium uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#c6a87c] text-black shadow-md font-semibold'
                      : 'bg-white/5 text-[#9ca3af] hover:text-white hover:bg-white/10 border border-white/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded ${
                      isActive ? 'bg-black/20 text-black font-bold' : 'bg-white/10 text-[#d1d5db]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-[#9ca3af] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar por obra, Luanda, tipologia..."
              className="w-full bg-white/5 border border-white/10 rounded-sm pl-10 pr-4 py-2.5 text-xs text-white placeholder-[#6b7280] focus:outline-none focus:border-[#c6a87c] transition-colors"
            />
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="py-20 text-center bg-white/5 rounded-lg border border-white/10">
            <p className="text-[#9ca3af] text-sm">Nenhum projecto encontrado para os filtros seleccionados.</p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('todos');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-[#c6a87c] text-black text-xs font-medium rounded-sm"
            >
              Ver todos os projectos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => (
              <article
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="group cursor-pointer bg-[#111216] border border-white/10 rounded-lg overflow-hidden flex flex-col justify-between hover:border-[#c6a87c]/60 transition-all duration-500 shadow-xl hover:-translate-y-1"
              >
                {/* Image Frame */}
                <div className="relative aspect-[16/10] overflow-hidden bg-black/60">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111216] via-transparent to-black/40 opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Top Status & Category Badges */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                    <span className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider bg-black/70 backdrop-blur-md text-[#c6a87c] border border-white/10 rounded-sm">
                      {project.categoryLabel}
                    </span>
                    <span className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider bg-white/15 backdrop-blur-md text-white border border-white/10 rounded-sm">
                      {project.fichaTecnica.estadoObra}
                    </span>
                  </div>

                  {/* Expand Icon on Hover */}
                  <div className="absolute bottom-3.5 right-3.5 w-9 h-9 rounded-full bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-4 h-4 text-[#c6a87c]" />
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white font-heading group-hover:text-[#c6a87c] transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-xs text-[#9ca3af] mt-1.5 line-clamp-2 font-light">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Technical Meta Footer */}
                  <div className="pt-5 mt-5 border-t border-white/10 flex items-center justify-between text-xs text-[#8c909c]">
                    <div className="flex items-center gap-1.5 truncate max-w-[60%]">
                      <MapPin className="w-3.5 h-3.5 text-[#c6a87c] shrink-0" />
                      <span className="truncate">{project.fichaTecnica.localizacao}</span>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-mono text-[11px] text-white/90">{project.fichaTecnica.area}</span>
                      <span className="text-[#c6a87c] flex items-center gap-0.5 text-[11px] font-medium group-hover:translate-x-0.5 transition-transform">
                        Ver Ficha
                        <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
