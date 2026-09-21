import React, { useState } from 'react';
import { BeforeAfterSlider, BeforeAfterItem } from './BeforeAfterSlider';
import { useCms } from '../context/CmsContext';
import { NavPage } from '../types';
import {
  Compass,
  ArrowRight,
} from 'lucide-react';

interface BeforeAfterSectionProps {
  onNavigate?: (page: NavPage) => void;
  onOpenProjectDetail?: (projectSlug: string) => void;
}

export const defaultTransformationCases: BeforeAfterItem[] = [
  {
    id: 'transform-talatona',
    title: 'Penthouse Terraza Talatona',
    subtitle: 'De Estrutura Tosca a Cobertura de Luxo Contemporânea',
    location: 'Condomínio Quinta dos Cedros, Talatona - Luanda',
    category: 'Design de Interiores & Remodelação Total',
    beforeImage: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1600&q=85',
    afterImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85',
    beforeLabel: 'Estado Inicial (Tosco & Demolição)',
    afterLabel: 'Entrega STAK (Interiores & Marcenaria)',
    description:
      'Substituição integral de alvenarias cegas por painéis em nogueira ripada e iluminação linear oculta em sanca de 2700K. Toda a climatização por condutas e infraestrutura de domótica foi camuflada no entreforro de gesso.',
    highlightStats: [
      { label: 'Área Intervencionada', value: '480 m²' },
      { label: 'Prazo de Estaleiro', value: '5 Meses' },
      { label: 'Valorização Imobiliária', value: '+45%' },
    ],
  },
  {
    id: 'transform-miramar',
    title: 'Moradia Horizon Miramar',
    subtitle: 'Estrutura de Betão em Estaleiro vs. Residência Concluída sobre o Mar',
    location: 'Encosta de Miramar, Luanda',
    category: 'Arquitectura Residencial Unifamiliar',
    beforeImage: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1600&q=85',
    afterImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    beforeLabel: 'Fase Construtiva (Estrutura e Armaduras)',
    afterLabel: 'Obra Licenciada e Entregue',
    description:
      'Cálculo de laje protendida com vãos contínuos de 11 metros sem pilares intermediários para integrar a sala à piscina com borda infinita. O betão foi tratado com hidrofugante contra o ar salino de Luanda.',
    highlightStats: [
      { label: 'Vão Livre Estrutural', value: '11 Metros' },
      { label: 'Compatibilização 3D', value: '100% Zero Erros' },
      { label: 'Inércia Térmica', value: 'Classe A+' },
    ],
  },
  {
    id: 'transform-corporate',
    title: 'Edifício Sede Baía Corporate',
    subtitle: 'Espaço em Ruína Comercial vs. Átrio Corporativo de Prestígio',
    location: 'Avenida 4 de Fevereiro (Marginal), Luanda',
    category: 'Sedes Comerciais & Átrios',
    beforeImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85',
    afterImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85',
    beforeLabel: 'Piso Térreo Desocupado',
    afterLabel: 'Hall Institucional de Alto Padrão',
    description:
      'Reconversão de um piso obsoleto num átrio monumental de pé-direito duplo. Aplicação de mármore branco e granito negro da Huíla com painéis acústicos micro-perfurados e controlo de acessos biométrico.',
    highlightStats: [
      { label: 'Área Útil', value: '6.400 m²' },
      { label: 'Atenuação Sonora', value: '44 dB' },
      { label: 'Aprovação Camarária', value: 'GPL Definitiva' },
    ],
  },
];

export const BeforeAfterSection: React.FC<BeforeAfterSectionProps> = ({
  onNavigate,
}) => {
  const { projects, pagesContent } = useCms();
  const [activeTab, setActiveTab] = useState(0);

  const beforeAfterSettings = pagesContent?.home?.sections?.beforeAfter;

  // Find projects that have a beforeImage configured and are toggled for before/after
  const dynamicProjectCases: BeforeAfterItem[] = projects
    .filter((p) => p.beforeImage && p.featuredInBeforeAfter === true)
    .map((p) => ({
      id: p.id,
      title: p.title,
      subtitle: p.subtitle,
      location: p.fichaTecnica?.localizacao || 'Luanda, Angola',
      category: p.categoryLabel || 'Arquitectura & Remodelação',
      beforeImage: p.beforeImage || '',
      afterImage: p.coverImage,
      beforeLabel: p.beforeLabel || 'Estado Inicial (Antes)',
      afterLabel: p.afterLabel || 'Conclusão STAK (Depois)',
      description: p.beforeDescription || p.description,
      highlightStats: [
        { label: 'Área', value: p.fichaTecnica?.area || '—' },
        { label: 'Ano', value: p.fichaTecnica?.ano || '2024' },
        { label: 'Estado', value: p.fichaTecnica?.estadoObra || 'Concluído' },
      ],
    }));

  const transformationCases =
    dynamicProjectCases.length > 0 ? dynamicProjectCases : defaultTransformationCases;

  const safeActiveIndex = activeTab >= transformationCases.length ? 0 : activeTab;
  const currentCase = transformationCases[safeActiveIndex];

  if (!currentCase) return null;

  return (
    <section className="py-24 sm:py-32 bg-[#08090b] border-t border-white/10 relative overflow-hidden">
      {/* Background blueprint elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#c6a87c_1px,transparent_1px)] [background-size:32px_32px]" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#c6a87c]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#c6a87c] tracking-[0.25em] uppercase mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>{beforeAfterSettings?.tag || 'Evidência de Execução / Antes & Depois'}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading leading-tight">
              {beforeAfterSettings?.title || 'A transformação real em obra.'}
            </h2>
            <p className="text-xs sm:text-sm text-[#9ca3af] font-light mt-3 leading-relaxed">
              {beforeAfterSettings?.description ||
                'Arraste a linha divisória vertical nas imagens para testemunhar a metamorfose: do tosco inicial de estaleiro à sofisticação dos acabamentos finais entregues pelo atelier STAK.'}
            </p>
          </div>

          {/* Project Switcher Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-[#111216] border border-white/10 shrink-0">
            {transformationCases.map((item, idx) => {
              const isActive = safeActiveIndex === idx;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(idx)}
                  className={`px-4 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#c6a87c] text-black font-bold shadow-md'
                      : 'text-[#9ca3af] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="opacity-60 mr-1.5">0{idx + 1}</span>
                  {item.title.split(' ')[0]} {item.title.split(' ')[1] || ''}
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Comparison Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Visual Comparison Slider */}
          <div className="lg:col-span-8 flex flex-col justify-center">
            <BeforeAfterSlider
              key={currentCase.id}
              beforeImage={currentCase.beforeImage}
              afterImage={currentCase.afterImage}
              beforeLabel={currentCase.beforeLabel}
              afterLabel={currentCase.afterLabel}
              aspectRatio="aspect-[16/10]"
              initialPosition={50}
            />
          </div>

          {/* Context, Technical Specs & Outcome */}
          <div className="lg:col-span-4 bg-[#111216] border border-white/10 rounded-xl p-6 sm:p-8 flex flex-col justify-between shadow-xl space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#c6a87c] uppercase tracking-wider px-2.5 py-1 rounded bg-[#c6a87c]/10 border border-[#c6a87c]/20">
                  {currentCase.category}
                </span>
                <span className="text-[10px] font-mono text-[#8c909c]">
                  0{safeActiveIndex + 1} / 0{transformationCases.length}
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-heading">
                  {currentCase.title}
                </h3>
                <div className="text-xs text-[#c6a87c] font-medium mt-1">
                  {currentCase.subtitle}
                </div>
                <div className="text-[11px] text-[#8c909c] font-mono mt-1">
                  {currentCase.location}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#9ca3af] font-light leading-relaxed border-t border-white/10 pt-4">
                {currentCase.description}
              </p>
            </div>

            {/* Highlighted Project Metrics */}
            {currentCase.highlightStats && (
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/10">
                {currentCase.highlightStats.map((stat, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-white/5 border border-white/5 text-center">
                    <div className="text-xs sm:text-sm font-bold text-white font-mono">
                      {stat.value}
                    </div>
                    <div className="text-[9px] font-mono text-[#8c909c] uppercase tracking-wider mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quick Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              {onNavigate && (
                <button
                  type="button"
                  onClick={() => onNavigate('contactos')}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#c6a87c] hover:bg-[#d8bb90] text-black font-bold text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
                >
                  <span>Avaliar o Meu Imóvel</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}

              {onNavigate && (
                <button
                  type="button"
                  onClick={() => onNavigate('projectos')}
                  className="px-4 py-3 bg-white/5 hover:bg-white/10 text-white font-medium text-xs rounded-sm border border-white/10 transition-colors cursor-pointer text-center"
                >
                  Ver Catálogo
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
