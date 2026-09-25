import React, { useState } from 'react';
import { Project } from '../types';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { X, MapPin, Calendar, Square, Tag, Layers, ArrowUpRight, ChevronLeft, ChevronRight, Check, Share2, Sparkles, Image as ImageIcon, MoveHorizontal } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onSelectForBriefing: (projectTitle: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onSelectForBriefing,
}) => {
  if (!project) return null;

  const images = project.galleryImages && project.galleryImages.length > 0 
    ? project.galleryImages 
    : [project.coverImage];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'gallery' | 'before-after'>('gallery');

  const beforeImg = project.beforeImage || 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=85';
  const beforeLbl = project.beforeLabel || 'Fase de Tosco / Estaleiro';

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-5xl bg-[#111215] border border-white/15 rounded-xl shadow-2xl overflow-hidden my-auto max-h-[95vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0d0e11] shrink-0">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#c6a87c] uppercase tracking-wider">
              <span>{project.categoryLabel}</span>
              <span>•</span>
              <span>Ficha Técnica & Dossier</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-heading mt-0.5">
              {project.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="p-2 rounded-md bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
              title="Copiar ligação do projecto"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-md bg-white/5 hover:bg-white/15 text-white/80 hover:text-white transition-colors cursor-pointer"
              aria-label="Fechar janela"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Scrollable */}
        <div className="overflow-y-auto p-6 space-y-8 flex-1">
          {/* View Mode Switcher Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-2">
            <div className="flex items-center gap-2 p-1 rounded-lg bg-[#0d0e12] border border-white/10">
              <button
                type="button"
                onClick={() => setViewMode('gallery')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  viewMode === 'gallery'
                    ? 'bg-[#c6a87c] text-black font-bold shadow-md'
                    : 'text-[#9ca3af] hover:text-white'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Galeria Fotográfica ({images.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('before-after')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  viewMode === 'before-after'
                    ? 'bg-[#c6a87c] text-black font-bold shadow-md'
                    : 'text-[#9ca3af] hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Comparar Antes & Depois</span>
              </button>
            </div>

            <div className="text-[11px] font-mono text-[#8c909c] hidden sm:block">
              {viewMode === 'before-after' ? 'Arraste a linha para comparar' : 'Navegue pelas fotografias de alta resolução'}
            </div>
          </div>

          {/* Conditional Media View */}
          {viewMode === 'before-after' ? (
            <div className="space-y-3">
              <BeforeAfterSlider
                beforeImage={beforeImg}
                afterImage={project.coverImage}
                beforeLabel={beforeLbl}
                afterLabel="Entrega STAK (Obra Concluída)"
                aspectRatio="aspect-[16/9]"
                initialPosition={50}
              />
              <div className="p-3 rounded-lg bg-white/5 border border-white/5 text-xs text-[#9ca3af] font-light flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <MoveHorizontal className="w-4 h-4 text-[#c6a87c]" />
                  <span>Metamorfose construtiva: Comparação directa entre o estado de intervenção inicial e os acabamentos finais.</span>
                </span>
              </div>
            </div>
          ) : (
            <>
              {/* Main Gallery Lightbox Preview */}
              <div className="relative rounded-lg overflow-hidden bg-black/60 aspect-[16/9] border border-white/10 group">
                <img
                  src={images[activeImageIndex]}
                  alt={
                    activeImageIndex === 0 && project.altText
                      ? project.altText
                      : `${project.title} – Fotografia de Arquitectura ${activeImageIndex + 1}`
                  }
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-all duration-300"
                />

                {/* Navigation arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={handlePrevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer"
                      aria-label="Imagem anterior"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer"
                      aria-label="Próxima imagem"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Counter badge */}
                <div className="absolute bottom-3 right-3 px-3 py-1 bg-black/80 backdrop-blur-md rounded-full text-xs font-mono text-white/80 border border-white/10">
                  {activeImageIndex + 1} / {images.length}
                </div>
              </div>

              {/* Thumbnails row */}
              {images.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-24 h-16 rounded-md overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                        activeImageIndex === idx
                          ? 'border-[#c6a87c] ring-2 ring-[#c6a87c]/30'
                          : 'border-white/10 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Miniatura ${idx + 1}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Grid of Concept & Ficha Técnica */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4 border-t border-white/10">
            {/* Concept & Description (8 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white font-heading mb-2">
                  Memória Descritiva & Conceito
                </h3>
                <p className="text-sm text-[#b0b4c0] leading-relaxed font-light">
                  {project.description}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-[#c6a87c] font-heading uppercase tracking-wider mb-2">
                  Solução Arquitectónica & Espacial
                </h4>
                <p className="text-sm text-[#9ca3af] leading-relaxed font-light">
                  {project.architecturalConcept}
                </p>
              </div>

              {/* Specialties involved */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#9ca3af] mb-3 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#c6a87c]" />
                  Especialidades & Coordenação de Engenharia
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.fichaTecnica.especialidades.map((spec) => (
                    <span
                      key={spec}
                      className="px-3 py-1 rounded-sm bg-white/5 border border-white/10 text-xs text-[#d1d5db]"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Ficha Técnica Card (5 cols) */}
            <div className="lg:col-span-5 bg-[#17181d] border border-white/10 rounded-lg p-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#c6a87c] border-b border-white/10 pb-2">
                  Dados Técnicos do Projecto
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[#9ca3af] flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#c6a87c]" />
                      Localização:
                    </span>
                    <span className="text-white font-medium text-right">
                      {project.fichaTecnica.localizacao}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[#9ca3af] flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#c6a87c]" />
                      Ano:
                    </span>
                    <span className="text-white font-mono">{project.fichaTecnica.ano}</span>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[#9ca3af] flex items-center gap-1.5">
                      <Square className="w-3.5 h-3.5 text-[#c6a87c]" />
                      Área Bruta:
                    </span>
                    <span className="text-white font-mono">{project.fichaTecnica.area}</span>
                  </div>

                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[#9ca3af] flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-[#c6a87c]" />
                      Tipologia:
                    </span>
                    <span className="text-white font-medium text-right">
                      {project.fichaTecnica.tipologia}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[#9ca3af]">Estado da Obra:</span>
                    <span className="px-2.5 py-0.5 rounded bg-[#c6a87c]/20 text-[#c6a87c] border border-[#c6a87c]/30 font-semibold text-[11px]">
                      {project.fichaTecnica.estadoObra}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[#9ca3af]">Cliente / Promoção:</span>
                    <span className="text-white/80">{project.fichaTecnica.cliente}</span>
                  </div>
                </div>
              </div>

              {/* Direct Briefing CTA */}
              <div className="pt-6 mt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onSelectForBriefing(project.title);
                  }}
                  className="w-full py-3 bg-[#c6a87c] hover:bg-[#d8bb90] text-black font-semibold text-xs uppercase tracking-wider rounded-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <span>Solicitar Estudo Semelhante</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
