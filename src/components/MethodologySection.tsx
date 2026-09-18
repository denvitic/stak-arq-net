import React, { useState } from 'react';
import { initialMethodology } from '../data/initialData';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export const MethodologySection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="metodologia" className="py-24 sm:py-32 bg-[#090a0c] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#c6a87c] tracking-[0.25em] uppercase mb-3">
            <span>Metodologia & Rigor</span>
            <span>/</span>
            <span>Processo Criativo</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading leading-tight mb-4">
            Quatro etapas transparentes da ideia à chave na mão.
          </h2>
          <p className="text-sm sm:text-base text-[#9ca3af] font-light">
            Desenvolvemos um fluxo de trabalho estruturado para que cada cliente acompanhe a evolução conceitual, legal e
            construtiva do seu investimento com total tranquilidade.
          </p>
        </div>

        {/* 4 Phases Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {initialMethodology.map((item, idx) => {
            const isCurrent = activeStep === idx;
            return (
              <div
                key={item.step}
                onClick={() => setActiveStep(idx)}
                className={`p-6 rounded-lg border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                  isCurrent
                    ? 'bg-[#14151a] border-[#c6a87c] shadow-2xl ring-1 ring-[#c6a87c]/20'
                    : 'bg-[#0e0f13] border-white/10 hover:border-white/20'
                }`}
              >
                <div>
                  {/* Step number badge */}
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className={`text-3xl font-extrabold font-heading ${
                        isCurrent ? 'text-[#c6a87c]' : 'text-[#4b5563]'
                      }`}
                    >
                      {item.step}
                    </span>
                    <span
                      className={`text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded ${
                        isCurrent ? 'bg-[#c6a87c]/20 text-[#c6a87c]' : 'bg-white/5 text-[#9ca3af]'
                      }`}
                    >
                      Fase {idx + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white font-heading mb-1.5">
                    {item.title}
                  </h3>
                  <div className="text-xs text-[#c6a87c] font-medium mb-4">
                    {item.subtitle}
                  </div>
                  <p className="text-xs text-[#9ca3af] leading-relaxed font-light mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Details list */}
                <div className="pt-4 border-t border-white/10 space-y-2">
                  {item.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2 text-[11px] text-[#c0c4d0]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#c6a87c] shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Process Guarantee Callout */}
        <div className="mt-12 p-6 rounded-lg bg-gradient-to-r from-[#14151a] via-[#1a1c24] to-[#14151a] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#c6a87c]">
              Garantia de Conformidade
            </div>
            <p className="text-sm text-white font-medium mt-1">
              Todos os projectos são elaborados segundo o Regulamento Geral das Edificações Urbanas (RGEU) e normas técnicas angolanas.
            </p>
          </div>
          <a
            href="#contactos"
            className="shrink-0 text-xs font-bold uppercase tracking-wider text-black bg-[#c6a87c] hover:bg-[#d8bb90] px-5 py-2.5 rounded-sm transition-colors flex items-center gap-1.5"
          >
            <span>Iniciar Processo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
