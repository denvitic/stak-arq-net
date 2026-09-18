import React, { useState } from 'react';
import { initialServices } from '../data/initialData';
import { ServiceItem } from '../types';
import { ArrowUpRight, CheckCircle2, ChevronRight, Layers, Sparkles } from 'lucide-react';

interface ServicesSectionProps {
  onSelectServiceForBriefing: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForBriefing,
}) => {
  const [selectedService, setSelectedService] = useState<ServiceItem>(initialServices[0]);

  return (
    <section id="servicos" className="py-24 sm:py-32 bg-[#0c0d0f] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#c6a87c] tracking-[0.25em] uppercase mb-3">
            <span>Áreas de Actuação</span>
            <span>/</span>
            <span>Especialidades</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading leading-tight mb-4">
            Cinco núcleos de intervenção de alto padrão.
          </h2>
          <p className="text-sm sm:text-base text-[#9ca3af] font-light">
            Da concepção do primeiro traço em Luanda até ao fecho de obra, a nossa estrutura multidisciplinar garante
            soluções técnicas e artísticas completas.
          </p>
        </div>

        {/* Interactive Master-Detail Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Services List / Tabs (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            {initialServices.map((service) => {
              const isActive = selectedService.id === service.id;
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setSelectedService(service)}
                  className={`w-full text-left p-5 rounded-lg border transition-all duration-300 flex items-center justify-between group cursor-pointer ${
                    isActive
                      ? 'bg-[#18191f] border-[#c6a87c] shadow-xl'
                      : 'bg-[#111215] border-white/5 hover:border-white/20 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`text-xs font-mono font-bold tracking-widest ${
                        isActive ? 'text-[#c6a87c]' : 'text-[#6b7280]'
                      }`}
                    >
                      {service.code}
                    </span>
                    <div>
                      <h3
                        className={`text-sm sm:text-base font-bold font-heading transition-colors ${
                          isActive ? 'text-white' : 'text-[#d1d5db] group-hover:text-white'
                        }`}
                      >
                        {service.title}
                      </h3>
                      <p className="text-xs text-[#8c909c] line-clamp-1 mt-0.5">
                        {service.tagline}
                      </p>
                    </div>
                  </div>

                  <ChevronRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isActive ? 'text-[#c6a87c] translate-x-1' : 'text-[#4b5563] group-hover:text-white'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Active Service In-Depth Card (7 cols) */}
          <div className="lg:col-span-7 bg-[#131418] border border-white/10 rounded-xl overflow-hidden shadow-2xl p-6 sm:p-8 flex flex-col justify-between min-h-[500px]">
            <div>
              {/* Image & Header */}
              <div className="relative aspect-[21/9] rounded-lg overflow-hidden mb-6 border border-white/10">
                <img
                  src={selectedService.image}
                  alt={selectedService.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#c6a87c] bg-black/60 px-3 py-1 rounded">
                    Núcleo {selectedService.code}
                  </span>
                  <span className="text-xs text-white/80 font-medium hidden sm:inline">
                    STAK Arquitectura & Design de Interiores
                  </span>
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading mb-3">
                {selectedService.title}
              </h3>
              <p className="text-sm text-[#c6a87c] font-serif italic mb-4">
                "{selectedService.tagline}"
              </p>

              <p className="text-sm text-[#b0b4c0] leading-relaxed font-light mb-6">
                {selectedService.description}
              </p>

              {/* Deliverables / O que inclui */}
              <div className="space-y-2.5 mb-8">
                <div className="text-xs font-mono uppercase tracking-wider text-[#9ca3af] mb-2">
                  Âmbito de Actuação & Entregáveis:
                </div>
                {selectedService.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-[#d1d5db]">
                    <CheckCircle2 className="w-4 h-4 text-[#c6a87c] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct CTA */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-[#8c909c]">
                Disponível para Luanda e províncias de Angola
              </span>

              <button
                type="button"
                onClick={() => onSelectServiceForBriefing(selectedService.title)}
                className="w-full sm:w-auto px-6 py-3 bg-[#c6a87c] hover:bg-[#d8bb90] text-black font-semibold text-xs uppercase tracking-wider rounded-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg group"
              >
                <span>{selectedService.ctaLabel}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
