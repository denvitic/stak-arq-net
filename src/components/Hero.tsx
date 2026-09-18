import React, { useState, useEffect, useRef } from 'react';
import { useCms } from '../context/CmsContext';
import { Project } from '../types';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Maximize2,
  Sparkles,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Video as VideoIcon,
  Image as ImageIcon,
} from 'lucide-react';

interface HeroProps {
  onSelectProject: (project: Project) => void;
  onOpenBriefing: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectProject, onOpenBriefing }) => {
  const { projects, atelierInfo, pagesContent } = useCms();
  const heroData = pagesContent?.home?.hero;
  const heroProjects = projects.filter((p) => p.featured).slice(0, 4);
  const displayProjects = heroProjects.length > 0 ? heroProjects : projects.slice(0, 4);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const heroRef = useRef<HTMLElement | null>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  const activeProject = displayProjects[currentIndex] || displayProjects[0];
  const activeVideoUrl =
    activeProject?.videoUrl || (currentIndex === 0 ? (heroData?.videoUrl || atelierInfo.heroVideoUrl) : undefined);
  const hasActiveVideo = Boolean(activeVideoUrl);

  // Auto-advance slideshow timer (unified across all slides)
  useEffect(() => {
    if (isPaused || displayProjects.length <= 1) return;

    // 8.5s for video slides so the interior loop can be enjoyed, 6.5s for photography
    const slideDuration = hasActiveVideo ? 8500 : 6500;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayProjects.length);
    }, slideDuration);

    return () => clearInterval(interval);
  }, [isPaused, displayProjects.length, hasActiveVideo, currentIndex]);

  // Manage playback for active video vs non-active videos
  useEffect(() => {
    displayProjects.forEach((proj, idx) => {
      const vidEl = videoRefs.current[proj.id];
      if (!vidEl) return;

      if (idx === currentIndex) {
        vidEl.muted = isMuted;
        if (isPlaying) {
          vidEl.play().catch(() => {});
        } else {
          vidEl.pause();
        }
      } else {
        vidEl.pause();
        vidEl.currentTime = 0;
      }
    });
  }, [currentIndex, isPlaying, isMuted, displayProjects]);

  // Performance Optimization: IntersectionObserver & Page Visibility
  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const currentVid = activeProject ? videoRefs.current[activeProject.id] : null;
        if (!currentVid) return;

        if (!entry.isIntersecting) {
          currentVid.pause();
        } else if (isPlaying) {
          currentVid.play().catch(() => {});
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(heroEl);

    const handleVisibility = () => {
      const currentVid = activeProject ? videoRefs.current[activeProject.id] : null;
      if (!currentVid) return;

      if (document.hidden) {
        currentVid.pause();
      } else if (isPlaying) {
        currentVid.play().catch(() => {});
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [isPlaying, activeProject]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % displayProjects.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + displayProjects.length) % displayProjects.length);
  };

  const togglePlay = () => {
    const currentVid = activeProject ? videoRefs.current[activeProject.id] : null;
    if (currentVid) {
      if (currentVid.paused) {
        currentVid
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      } else {
        currentVid.pause();
        setIsPlaying(false);
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    const currentVid = activeProject ? videoRefs.current[activeProject.id] : null;
    if (currentVid) {
      currentVid.muted = newMuted;
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePrimaryClick = () => {
    if (heroData?.ctaPrimaryLink) {
      if (heroData.ctaPrimaryLink.startsWith('#')) {
        const targetId = heroData.ctaPrimaryLink.replace('#', '');
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      } else if (heroData.ctaPrimaryLink.startsWith('http') || heroData.ctaPrimaryLink.startsWith('/')) {
        window.location.href = heroData.ctaPrimaryLink;
        return;
      }
    }
    scrollToSection('portfolio');
  };

  const handleSecondaryClick = () => {
    if (heroData?.ctaSecondaryLink) {
      if (heroData.ctaSecondaryLink.startsWith('#')) {
        const targetId = heroData.ctaSecondaryLink.replace('#', '');
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      } else if (heroData.ctaSecondaryLink.startsWith('http') || heroData.ctaSecondaryLink.startsWith('/')) {
        window.location.href = heroData.ctaSecondaryLink;
        return;
      }
    }
    onOpenBriefing();
  };

  if (!activeProject) return null;

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-between bg-[#08090a] overflow-hidden pt-24 lg:pt-0"
    >
      {/* Background Media Container - Unified Layers */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {displayProjects.map((project, idx) => {
          const isCurrent = idx === currentIndex;
          const projVideoUrl =
            project.videoUrl || (idx === 0 ? atelierInfo.heroVideoUrl : undefined);

          return (
            <div
              key={project.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isCurrent ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
              }`}
            >
              {/* Foundation Image (always rendered for instant visual richness and smooth transition) */}
              <img
                src={project.coverImage}
                alt={project.title}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover object-center filter brightness-[0.62] contrast-[1.05] transition-transform duration-[8000ms] ${
                  isCurrent ? 'scale-100' : 'scale-105'
                }`}
              />

              {/* Interior House Video (Rendered when project has videoUrl) */}
              {projVideoUrl && (
                <video
                  ref={(el) => {
                    videoRefs.current[project.id] = el;
                  }}
                  autoPlay={isCurrent}
                  muted={isMuted}
                  loop
                  playsInline
                  preload={isCurrent ? 'auto' : 'metadata'}
                  poster={project.coverImage}
                  className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.60] contrast-[1.08]"
                >
                  <source src={projVideoUrl} type="video/mp4" />
                </video>
              )}
            </div>
          );
        })}

        {/* Architectural Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090a] via-[#08090a]/40 to-black/60 pointer-events-none z-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08090a]/90 via-[#08090a]/35 to-transparent pointer-events-none z-20" />

        {/* Architectural Subtle Grid Lines */}
        <div className="absolute inset-0 pointer-events-none opacity-15 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:4rem_4rem] z-20" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center py-16 lg:py-32">
        <div className="max-w-3xl">
          {/* Badge & Atelier Distinction */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#e5e7eb] mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#c6a87c] animate-pulse" />
            <span className="text-[11px] font-heading tracking-[0.25em] uppercase font-semibold text-[#f3f4f6]">
              {heroData?.badgeTag || 'Atelier de Arquitectura & Design de Interiores | Luanda, Angola'}
            </span>
          </div>

          {/* Bold Architectural Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08] mb-6 drop-shadow-sm font-heading">
            {heroData?.titleLine1 || 'O rigor da estrutura.'} <br />
            <span className="font-light italic text-[#e0e2ec]">
              {heroData?.titleLine2Italic || 'A nobreza do'}{' '}
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#e8e4df] to-[#c6a87c]">
              {heroData?.titleLine2Gradient || 'espaço habitado.'}
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#b8bcc8] max-w-2xl leading-relaxed mb-8 font-light">
            {heroData?.description ||
              'Desenvolvemos projectos residenciais de luxo, sedes corporativas de prestígio e interiores de autor. Soluções completas desde o estudo prévio ao licenciamento e fiscalização presencial de obra em Luanda.'}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              id="hero-btn-portfolio"
              type="button"
              onClick={handlePrimaryClick}
              className="px-7 py-3.5 bg-[#c6a87c] hover:bg-[#d8bb90] text-black font-semibold text-xs uppercase tracking-[0.16em] rounded-sm transition-all duration-300 shadow-xl flex items-center gap-2 cursor-pointer group"
            >
              <span>{heroData?.ctaPrimaryLabel || 'Explorar Obras & Projectos'}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              id="hero-btn-briefing"
              type="button"
              onClick={handleSecondaryClick}
              className="px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-medium text-xs uppercase tracking-[0.16em] rounded-sm border border-white/20 backdrop-blur-md transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#c6a87c]" />
              <span>{heroData?.ctaSecondaryLabel || 'Solicitar Estudo Prévio'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Featured Project Floating Card & Unified Navigation */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          {/* Active Project Highlight Capsule */}
          <div
            className="bg-[#111216]/85 backdrop-blur-xl border border-white/15 p-4 sm:p-5 rounded-lg max-w-xl shadow-2xl transition-all duration-300 cursor-pointer hover:border-[#c6a87c]/60 group"
            onClick={() => onSelectProject(activeProject)}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-[#c6a87c] font-mono tracking-wider uppercase mb-1">
                  <span>
                    Destaque {currentIndex + 1} de {displayProjects.length}
                  </span>
                  <span>•</span>
                  <span>{activeProject.categoryLabel}</span>
                  {hasActiveVideo && (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#c6a87c]/20 text-[#e6cfab] text-[10px] font-medium border border-[#c6a87c]/30">
                      <VideoIcon className="w-3 h-3" />
                      <span>Vídeo Interior</span>
                    </span>
                  )}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white font-heading group-hover:text-[#c6a87c] transition-colors">
                  {activeProject.title}
                </h3>
                <div className="flex items-center gap-4 text-xs text-[#9ca3af] mt-2">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#c6a87c]" />
                    {activeProject.fichaTecnica.localizacao}
                  </span>
                  <span>{activeProject.fichaTecnica.area}</span>
                  <span className="px-2 py-0.5 rounded bg-white/10 text-white text-[10px] font-medium">
                    {activeProject.fichaTecnica.estadoObra}
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="p-2.5 rounded-md bg-white/10 group-hover:bg-[#c6a87c] group-hover:text-black text-white transition-colors shrink-0"
                title="Abrir Ficha Técnica Completa"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Unified Navigation & Discreet Playback Controls */}
          <div
            className="flex flex-wrap items-center gap-3 shrink-0"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* If the current slide has video: Subtle Play/Pause & Audio mute controls */}
            {hasActiveVideo && (
              <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md border border-white/15 p-1 rounded-full">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="p-2 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title={isPlaying ? 'Pausar vídeo' : 'Reproduzir vídeo'}
                  aria-label={isPlaying ? 'Pausar vídeo' : 'Reproduzir vídeo'}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                </button>
                <button
                  type="button"
                  onClick={toggleMute}
                  className="p-2 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title={isMuted ? 'Activar som' : 'Silenciar'}
                  aria-label={isMuted ? 'Activar som' : 'Silenciar'}
                >
                  {isMuted ? (
                    <VolumeX className="w-3.5 h-3.5 text-white/70" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5 text-[#c6a87c]" />
                  )}
                </button>
              </div>
            )}

            {/* Carousel Slide Indicators & Arrows */}
            <div className="flex items-center gap-4 bg-black/60 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-full">
              <div className="flex items-center gap-2">
                {displayProjects.map((p, idx) => {
                  const isCurrent = idx === currentIndex;
                  const hasVideo = Boolean(p.videoUrl || (idx === 0 && atelierInfo.heroVideoUrl));

                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer flex items-center justify-center ${
                        isCurrent
                          ? 'w-9 bg-[#c6a87c]'
                          : 'w-2.5 bg-white/30 hover:bg-white/50'
                      }`}
                      aria-label={`Ir para projecto ${idx + 1}: ${p.title}`}
                      title={`${p.title} (${hasVideo ? 'Vídeo de Interior' : 'Fotografia'})`}
                    >
                      {isCurrent && hasVideo && (
                        <span className="w-1.5 h-1.5 rounded-full bg-black/80 animate-pulse" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-1 border-l border-white/15 pl-3">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
                  aria-label="Projecto anterior"
                  title="Anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
                  aria-label="Próximo projecto"
                  title="Seguinte"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Architectural Credentials / Stats Bar */}
      <div className="relative z-30 border-t border-white/10 bg-[#090a0c]/90 backdrop-blur-md py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center justify-center p-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                {atelierInfo.stats.yearsOfExperience}
              </span>
              <span className="text-[11px] uppercase tracking-[0.18em] text-[#9ca3af] mt-0.5">
                Anos no Mercado
              </span>
            </div>
            <div className="flex flex-col items-center justify-center p-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#c6a87c] font-heading">
                {atelierInfo.stats.completedProjects}
              </span>
              <span className="text-[11px] uppercase tracking-[0.18em] text-[#9ca3af] mt-0.5">
                Obras & Projectos
              </span>
            </div>
            <div className="flex flex-col items-center justify-center p-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                {atelierInfo.stats.designedArea}
              </span>
              <span className="text-[11px] uppercase tracking-[0.18em] text-[#9ca3af] mt-0.5">
                Área Projectada
              </span>
            </div>
            <div className="flex flex-col items-center justify-center p-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#c6a87c] font-heading">
                100%
              </span>
              <span className="text-[11px] uppercase tracking-[0.18em] text-[#9ca3af] mt-0.5">
                Rigor & Licenciamento
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

