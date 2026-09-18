import React from 'react';
import { useCms } from '../context/CmsContext';
import { NavPage } from '../types';
import {
  Compass,
  Layers,
  ShieldCheck,
  Sparkles,
  Users,
  Award,
  Clock,
  Building,
  CheckCircle2,
  ArrowRight,
  MapPin,
  FileText,
  Sun,
  Droplets,
  Wind
} from 'lucide-react';

interface AtelierPageProps {
  onNavigate: (page: NavPage) => void;
}

export const AtelierPage: React.FC<AtelierPageProps> = ({ onNavigate }) => {
  const { atelierInfo, pagesContent } = useCms();
  const atelierData = pagesContent?.atelier;

  const defaultPillars = [
    {
      title: 'Sobriedade & Clareza Geométrica',
      desc: 'Privilegiamos a volumetria pura, linhas horizontais expressivas e a eliminação de adornos supérfluos. A beleza arquitectónica brota da proporção e do jogo entre massa e vazio.',
    },
    {
      title: 'Arquitectura Bioclimática Tropical',
      desc: 'Em Luanda, a resposta climática é elementar. Projectamos protecções solares dinâmicas (brise-soleils), pés-direitos generosos e corredores de ventilação cruzada que reduzem o consumo energético.',
    },
    {
      title: 'Compatibilização & Rigor Construtivo',
      desc: 'A arquitectura só existe quando é construída com perfeição. Compatibilizamos minuciosamente a arquitectura com os projectos de engenharia de estruturas, redes de águas, AVAC e electricidade.',
    },
    {
      title: 'Curadoria de Materiais & Identidade',
      desc: 'Exploramos o contraste equilibrado entre betão aparente, pedras locais, madeiras nobres tratadas e amplos panos de vidro que captam a luminosidade angolana.',
    },
  ];

  const pillarsList =
    atelierData?.sections?.pillars?.items && atelierData.sections.pillars.items.length > 0
      ? atelierData.sections.pillars.items
      : defaultPillars;

  const defaultTeam = [
    {
      name: 'Manuel Stak',
      role: 'Sócio-Fundador & Director de Arquitectura',
      bio: 'Mais de 16 anos dedicados à concepção de moradias contemporâneas e edifícios corporativos em Angola e Portugal. Especialista em design bioclimático.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Eng.ª Paula Domingos',
      role: 'Directora de Engenharia & Compatibilização',
      bio: 'Especialista em cálculo estrutural em betão armado e fundações especiais para as condicionantes geológicas da costa de Luanda.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Arqt. David Mbanza',
      role: 'Coordenador de Interiores & Marcenaria',
      bio: 'Com vasta experiência em arquitectura de interiores e mobiliário por medida, alia a sobriedade contemporânea ao conforto táctil.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const team =
    atelierData?.sections?.team?.members && atelierData.sections.team.members.length > 0
      ? atelierData.sections.team.members
      : defaultTeam;

  const defaultMethodology = [
    {
      step: '01',
      title: 'Briefing, Programa & Análise do Terreno',
      subtitle: 'Compreensão do Usuário e Condicionantes',
      desc: 'Levantamento topográfico, estudo solar e eólico, análise de regulamentos do GPL (Governo Provincial de Luanda) e definição das aspirações funcionais da família ou empresa.',
    },
    {
      step: '02',
      title: 'Estudo Prévio & Simulações 3D Fotorrealistas',
      subtitle: 'A Materialização da Ideia',
      desc: 'Apresentação dos primeiros esboços, distribuição espacial em planta, maquetes virtuais tridimensionais e renders de alta definição com texturas e iluminação simulada.',
    },
    {
      step: '03',
      title: 'Projecto de Execução & Licenciamento Municipal',
      subtitle: 'Precisão Milimétrica & Conformidade Camarária',
      desc: 'Elaboração das peças desenhadas e escritas para estaleiro: plantas de cotas, cortes construtivos, detalhes de vãos, mapa de acabamentos e submissão formal para aprovação camarária.',
    },
    {
      step: '04',
      title: 'Direcção Técnica & Fiscalização de Obra',
      subtitle: 'Garantia de Fidelidade Construtiva',
      desc: 'Presença semanal ou permanente no canteiro de obras em Luanda ou províncias. Verificação de armaduras, traços de betão, assentamento de acabamentos e controlo rigoroso de prazos.',
    },
  ];

  const methodologySteps =
    atelierData?.sections?.methodology?.steps && atelierData.sections.methodology.steps.length > 0
      ? atelierData.sections.methodology.steps
      : defaultMethodology;

  const defaultBioclimaticFeatures = [
    {
      title: 'Protecção Solar',
      desc: 'Brises calculados para a latitude de Luanda (8°S) bloqueiam a radiação directa.',
    },
    {
      title: 'Ventilação Cruzada',
      desc: 'Pátios interiores e vãos opostos que canalizam a brisa marítima sudoeste.',
    },
    {
      title: 'Gestão de Água',
      desc: 'Aproveitamento de águas pluviais para rega paisagística e cisternas integradas.',
    },
  ];

  const bioclimaticFeatures =
    atelierData?.sections?.bioclimatic?.features && atelierData.sections.bioclimatic.features.length > 0
      ? atelierData.sections.bioclimatic.features
      : defaultBioclimaticFeatures;

  const iconsList = [Compass, Layers, ShieldCheck, Sparkles];

  return (
    <div className="min-h-screen bg-[#090a0c] text-[#e8e8ea] pb-20">
      {/* 1. Header & Breadcrumbs with Prestigious Architectural Studio Background Image */}
      {(atelierData?.hero?.enabled ?? true) && (
        <div className="page-hero-banner border-b border-white/10 relative min-h-[420px] sm:min-h-[480px] pt-28 sm:pt-36 pb-16 sm:pb-24 flex items-center overflow-hidden">
          {/* Background Image with Dark Vignette & Architectural Gradients */}
          <div className="absolute inset-0 z-0">
            <img
              src={atelierData?.hero?.bgImage || 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2000&q=85'}
              alt="Atelier STAK Arquitectura Interior"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter brightness-[0.38] contrast-110 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090a0c] via-[#090a0c]/75 to-black/60" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#090a0c] via-[#090a0c]/80 to-transparent" />
            {/* Subtle blueprint grid */}
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
              <span className="text-white">{atelierData?.hero?.badge?.replace('Início / ', '') || 'O Atelier'}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight font-heading max-w-4xl leading-tight mb-6">
              {atelierData?.hero?.title || 'A arquitectura como síntese de rigor, proporção e identidade espacial.'}
            </h1>

            <p className="text-sm sm:text-lg text-[#d1d5db] max-w-3xl font-light leading-relaxed">
              {atelierData?.hero?.description ||
                'Fundado em Luanda, o atelier STAK desenvolve intervenções que combinam a autenticidade dos materiais angolanos com as mais elevadas exigências de conforto contemporâneo e engenharia de detalhe.'}
            </p>

            {/* Quick Metrics Badges */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-8 pt-6 border-t border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-bold text-white font-mono">{atelierInfo.stats.yearsOfExperience}</span>
                <span className="text-[11px] text-[#9ca3af] uppercase tracking-wider font-mono">Anos em Angola</span>
              </div>
              <span className="text-white/20">•</span>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-bold text-[#c6a87c] font-mono">{atelierInfo.stats.completedProjects}</span>
                <span className="text-[11px] text-[#9ca3af] uppercase tracking-wider font-mono">Obras Concluídas</span>
              </div>
              <span className="text-white/20">•</span>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-bold text-white font-mono">100%</span>
                <span className="text-[11px] text-[#9ca3af] uppercase tracking-wider font-mono">Aprovação no GPL</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. História & Visão do Gabinete (Origens & Evolução) */}
      {(atelierData?.sections?.history?.enabled ?? true) && (
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="text-xs font-mono text-[#c6a87c] uppercase tracking-widest">
                {atelierData?.sections?.history?.tag || 'Origens & Evolução'}
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-white font-heading leading-tight">
                {atelierData?.sections?.history?.title || 'Mais de uma década a desenhar e erguer referências em Angola.'}
              </h2>
              <div className="space-y-4 text-sm text-[#9ca3af] leading-relaxed font-light whitespace-pre-line">
                <p>
                  {atelierData?.sections?.history?.content ||
                    'O atelier STAK Arquitectura & Designer de Interiores nasceu da necessidade premente de conferir um novo patamar de sofisticação e rigor técnico ao mercado de construção de alto padrão em Luanda.'}
                </p>
                <p>
                  Ao longo dos anos, expandimos a nossa actuação desde moradias unifamiliares exclusivas em bairros como Miramar,
                  Talatona e Ilha de Luanda, até projectos de grande escala que incluem sedes corporativas, empreendimentos
                  habitacionais fechados e planos de urbanismo.
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 grid grid-cols-3 gap-6">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold font-heading text-[#c6a87c]">
                    {atelierInfo.stats.yearsOfExperience}
                  </div>
                  <div className="text-[11px] text-[#8c909c] uppercase font-mono mt-1">Anos em Luanda</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold font-heading text-white">
                    {atelierInfo.stats.completedProjects}
                  </div>
                  <div className="text-[11px] text-[#8c909c] uppercase font-mono mt-1">Obras Executadas</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold font-heading text-white">
                    {atelierInfo.stats.designedArea}
                  </div>
                  <div className="text-[11px] text-[#8c909c] uppercase font-mono mt-1">Área Desenvolvida</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src={atelierData?.sections?.history?.image || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80'}
                  alt="Ambiente de Trabalho Atelier STAK"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[11px] font-mono text-[#c6a87c] uppercase tracking-wider block mb-1">
                    Espaço Criativo
                  </span>
                  <p className="text-white text-xs font-light">
                    Sede no centro de Luanda: onde equipas de arquitectura, maquetistas e engenheiros trabalham de forma coordenada.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. Princípios Fundamentais / A Nossa Disciplina Projectual (Os 4 Cards) */}
      {(atelierData?.sections?.pillars?.enabled ?? true) && (
        <section className="py-20 bg-[#0c0d10] border-t border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-16">
              <div className="text-xs font-mono text-[#c6a87c] uppercase tracking-widest mb-2">
                {atelierData?.sections?.pillars?.tag || 'Princípios Fundamentais'}
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-white font-heading">
                {atelierData?.sections?.pillars?.title || 'A nossa disciplina projectual.'}
              </h2>
              <p className="text-sm text-[#9ca3af] mt-2 font-light">
                {atelierData?.sections?.pillars?.description ||
                  'Quatro pilares inegociáveis que orientam cada linha traçada no atelier.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {pillarsList.map((pillar, idx) => {
                const IconComponent = iconsList[idx % iconsList.length] || Compass;
                return (
                  <div
                    key={idx}
                    className="p-8 rounded-xl bg-[#111216] border border-white/10 hover:border-[#c6a87c]/40 transition-all space-y-4"
                  >
                    <div className="w-12 h-12 rounded-lg bg-[#c6a87c]/10 border border-[#c6a87c]/30 flex items-center justify-center text-[#c6a87c]">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white font-heading">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed font-light">
                      {pillar.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 4. Como Trabalhamos / Percurso Metodológico */}
      {(atelierData?.sections?.methodology?.enabled ?? true) && (
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <div className="text-xs font-mono text-[#c6a87c] uppercase tracking-widest mb-2">
              {atelierData?.sections?.methodology?.tag || 'Como Trabalhamos'}
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white font-heading">
              {atelierData?.sections?.methodology?.title || 'O percurso metodológico de cada projecto.'}
            </h2>
            <p className="text-sm text-[#9ca3af] mt-2 font-light">
              {atelierData?.sections?.methodology?.description ||
                'Da primeira conversa à fiscalização de obra, dividimos o processo em etapas transparentes com prazos e entregáveis definidos.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {methodologySteps.map((step, idx) => (
              <div
                key={idx}
                className="p-6 rounded-lg bg-[#111216] border border-white/10 flex flex-col justify-between space-y-4 relative group hover:border-[#c6a87c]/50 transition-all"
              >
                <div>
                  <span className="font-mono text-2xl font-bold text-[#c6a87c]/50 group-hover:text-[#c6a87c] transition-colors">
                    {step.step || `0${idx + 1}`}
                  </span>
                  <h3 className="text-base font-bold text-white font-heading mt-2">
                    {step.title}
                  </h3>
                  {step.subtitle && (
                    <span className="text-[11px] font-mono text-[#c6a87c] block mt-1">
                      {step.subtitle}
                    </span>
                  )}
                  <p className="text-xs text-[#9ca3af] mt-3 font-light leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 text-[11px] text-[#8c909c] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#c6a87c]" />
                  <span>Entregável aprovado em acta</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. Resiliência & Conforto / Arquitectura Tropical Bioclimática */}
      {(atelierData?.sections?.bioclimatic?.enabled ?? true) && (
        <section className="py-24 bg-[#0e0f14] border-t border-white/5 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-[#c6a87c] tracking-[0.25em] uppercase">
                  <span>{atelierData?.sections?.bioclimatic?.tag || 'Resiliência & Conforto / Arquitectura Tropical'}</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-bold text-white font-heading leading-tight">
                  {atelierData?.sections?.bioclimatic?.title || 'Construir em harmonia com a luz, o vento atlântico e o calor de Luanda.'}
                </h2>
                <p className="text-sm text-[#9ca3af] leading-relaxed font-light">
                  {atelierData?.sections?.bioclimatic?.description ||
                    'A sustentabilidade na STAK não é um selo comercial: é inteligência geométrica aplicada. Em vez de depender exclusivamente de sistemas artificiais de ar condicionado, concebemos cada moradia e edifício corporativo como um organismo que respira.'}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  {bioclimaticFeatures.map((feat, idx) => {
                    const FeatIcon = [Sun, Wind, Droplets][idx % 3];
                    return (
                      <div key={idx} className="p-4 rounded-lg bg-white/5 border border-white/10">
                        <FeatIcon className="w-5 h-5 text-[#c6a87c] mb-2" />
                        <h4 className="text-xs font-bold text-white font-heading uppercase tracking-wider mb-1">
                          {feat.title}
                        </h4>
                        <p className="text-[11px] text-[#8c909c] leading-relaxed">
                          {feat.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="lg:col-span-6 relative">
                <div className="relative aspect-[16/11] rounded-2xl overflow-hidden border border-white/15 shadow-2xl">
                  <img
                    src={atelierData?.sections?.bioclimatic?.image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85'}
                    alt="Ventilação Bioclimática e Iluminação Zenital"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-lg bg-black/75 backdrop-blur-md border border-white/10 text-xs">
                    <div className="flex items-center justify-between text-[#c6a87c] font-mono text-[10px] uppercase tracking-wider mb-1">
                      <span>Princípio de Projecto</span>
                      <span>Lat 8.83° S • Long 13.23° E</span>
                    </div>
                    <h4 className="text-white font-bold text-sm font-heading">
                      Pátios de Luz & Sombreamento Dinâmico
                    </h4>
                    <p className="text-[#9ca3af] text-[11px] mt-0.5">
                      Redução de até 40% na carga térmica interior e maximização da iluminação natural indirecta.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 6. Equipa Multidisciplinar */}
      {(atelierData?.sections?.team?.enabled ?? true) && (
        <section className="py-20 bg-[#0c0d10] border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-16">
              <div className="text-xs font-mono text-[#c6a87c] uppercase tracking-widest mb-2">
                {atelierData?.sections?.team?.tag || 'Corpo Técnico'}
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-white font-heading">
                {atelierData?.sections?.team?.title || 'Arquitectos, engenheiros e coordenadores.'}
              </h2>
              <p className="text-sm text-[#9ca3af] mt-2 font-light">
                {atelierData?.sections?.team?.description ||
                  'Uma equipa multidisciplinar residente em Luanda, habituada a resolver os desafios de licenciamento e construção em Angola.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, idx) => (
                <div
                  key={idx}
                  className="bg-[#111216] border border-white/10 rounded-xl overflow-hidden hover:border-[#c6a87c]/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-[4/3] overflow-hidden bg-black/60">
                      <img
                        src={member.image}
                        alt={member.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover filter brightness-95"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-white font-heading">
                        {member.name}
                      </h3>
                      <div className="text-xs font-mono text-[#c6a87c] mt-0.5">
                        {member.role}
                      </div>
                      <p className="text-xs text-[#9ca3af] mt-3 font-light leading-relaxed">
                        {member.bio}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. Atendimento Técnico Presencial (CTA Final) */}
      {(atelierData?.sections?.cta?.enabled ?? true) && (
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-r from-[#111217] via-[#16171d] to-[#111217] border border-[#c6a87c]/30 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl space-y-3 text-center md:text-left">
              <span className="text-xs font-mono text-[#c6a87c] uppercase tracking-widest">
                {atelierData?.sections?.cta?.tag || 'Atendimento Técnico Presencial'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                {atelierData?.sections?.cta?.title || 'Gostaria de conhecer o nosso atelier na Marginal de Luanda?'}
              </h3>
              <p className="text-xs sm:text-sm text-[#9ca3af] font-light">
                {atelierData?.sections?.cta?.description ||
                  'Agende uma visita para conversarmos sobre o seu lote de terreno, consultar maquetes físicas e explorar materiais de acabamento.'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
              <button
                type="button"
                onClick={() => onNavigate('contactos')}
                className="w-full sm:w-auto px-8 py-4 bg-[#c6a87c] hover:bg-[#d8bb90] text-black font-bold text-xs uppercase tracking-wider rounded-sm transition-all cursor-pointer shadow-lg"
              >
                {atelierData?.sections?.cta?.buttonLabel || 'Agendar Reunião de Briefing'}
              </button>
              <button
                type="button"
                onClick={() => onNavigate('projectos')}
                className="w-full sm:w-auto px-6 py-4 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-all cursor-pointer"
              >
                {atelierData?.sections?.cta?.secondaryButtonLabel || 'Ver Portfólio de Projectos'}
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
