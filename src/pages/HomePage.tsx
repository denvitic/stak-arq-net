import React, { useState, useMemo } from 'react';
import { useCms } from '../context/CmsContext';
import { Project, NavPage } from '../types';
import { Hero } from '../components/Hero';
import { BeforeAfterSection } from '../components/BeforeAfterSection';
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Compass,
  Layers,
  Sparkles,
  MapPin,
  Building2,
  Calendar,
  Eye,
  CheckCircle2,
  Quote,
  Star,
  Maximize2,
  Award
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: NavPage) => void;
  onSelectProject: (project: Project) => void;
  onSelectServiceForBriefing: (serviceTitle: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectProject,
  onSelectServiceForBriefing,
}) => {
  const { projects, services, atelierInfo, pagesContent } = useCms();
  const homeSec = pagesContent?.home?.sections;

  // Sorted specialties (01 to 06)
  const sortedServices = useMemo(() => {
    return [...(services || [])].sort((a, b) =>
      (a.code || '').localeCompare(b.code || '', undefined, { numeric: true })
    );
  }, [services]);

  // Materiality active showcase
  const [activeMaterial, setActiveMaterial] = useState(0);

  const defaultMaterials = [
    {
      id: 'betao',
      name: 'Betão Aparente Estrutural',
      tag: 'Tectónica & Massa Térmica',
      description:
        'Trabalhado com cofragem ripada de madeira nobre que imprime veios naturais na sua superfície. Garante inércia térmica indispensável para regular as temperaturas no clima costeiro de Luanda, dispensando revestimentos efémeros.',
      properties: ['Elevada Inércia Térmica', 'Resistência ao Ar Marítimo', 'Estética Brutalista Nobre'],
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'madeira',
      name: 'Madeiras Nobres Tropicais',
      tag: 'Conforto Táctil & Protecção Solar',
      description:
        'Iroko, Teca e Pau-Rosa seleccionados e tratados com óleos naturais repelentes de humidade. Aplicados em pérgolas, brise-soleils dinâmicos, painéis de ripado e decks que conectam as áreas sociais aos jardins e piscinas.',
      properties: ['Origem Certificada', 'Tratamento UV & Fungicida', 'Regulação Térmica Passiva'],
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'rochas',
      name: 'Rochas Ornamentais & Mármores de Angola',
      tag: 'Autenticidade Geológica',
      description:
        'Valorização do património mineral angolano. Mármores claros do Namibe e granitos negros da Huíla paginados com precisão milimétrica em ilhas de cozinha, banhos suite e planos de água.',
      properties: ['Extracção Sustentável', 'Polimento Mate ou Flamejado', 'Durabilidade Perpétua'],
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'vidro',
      name: 'Vidros de Alta Eficiência & Brises',
      tag: 'Luminosidade & Eficiência Energética',
      description:
        'Panos de vidro duplo com corte térmico e factor solar optimizado. Permitem banhar os interiores com a extraordinária luz natural de Luanda enquanto barram mais de 72% da radiação térmica directa.',
      properties: ['Controlo Solar Low-E', 'Atenuação Acústica 42dB', 'Pérdida de Calor Minimizada'],
      image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  const materials = homeSec?.materials?.items && homeSec.materials.items.length > 0
    ? homeSec.materials.items
    : defaultMaterials;

  const defaultTestimonials = [
    {
      id: 't-1',
      quote:
        'O rigor e o bom gosto do atelier STAK superaram todas as nossas expectativas. Conseguiram transformar um lote desafiante em Talatona numa moradia com ventilação natural irrepreensível e uma privacidade ímpar.',
      author: 'Dr. Carlos & Dra. Sofia Morais',
      role: 'Proprietários da Moradia Miramar Contemporary',
      location: 'Talatona, Luanda',
      projectType: 'Habitação Unifamiliar de Luxo',
      rating: 5,
    },
    {
      id: 't-2',
      quote:
        'A clareza técnica e a compatibilização 3D das especialidades foram determinantes para cumprirmos o orçamento e prazos da nossa sede corporativa. Em Angola, encontrar este nível de acompanhamento de estaleiro é raro.',
      author: 'Eng.º Mário Fernandes',
      role: 'Director de Património do Grupo Aliança',
      location: 'Baía de Luanda',
      projectType: 'Sede Corporativa & Retail',
      rating: 5,
    },
    {
      id: 't-3',
      quote:
        'Desde o primeiro esboço até à selecção da marcenaria e iluminação, a equipa da STAK demonstrou paixão pelo detalhe. A casa tem uma alma serena e acolhedora que nos encanta todos os dias.',
      author: 'Família Varela Bastos',
      role: 'Clientes Residenciais',
      location: 'Condomínio Belas Clube, Luanda Sul',
      projectType: 'Design de Interiores & Arquitectura',
      rating: 5,
    },
  ];

  const defaultAssurances = [
    {
      id: 'a-1',
      title: '100% Conformidade no GPL',
      description: 'Projectos concebidos rigorosamente sob o regulamento geral de edificações urbanas de Luanda.',
      icon: 'Award',
    },
    {
      id: 'a-2',
      title: 'Orçamento & Mapa de Quantidades',
      description: 'Sem derrapagens financeiras: medições rigorosas de betão, aço e acabamentos antes de abrir concurso.',
      icon: 'ShieldCheck',
    },
    {
      id: 'a-3',
      title: 'Acompanhamento Técnico em Obra',
      description: 'Vistorias técnicas periódicas de estaleiro para garantir que o que foi desenhado é o que é edificado.',
      icon: 'Building2',
    },
  ];

  const testimonials = Array.isArray(homeSec?.testimonials?.items)
    ? homeSec.testimonials.items
    : defaultTestimonials;

  const assurances = Array.isArray(homeSec?.testimonials?.assurances)
    ? homeSec.testimonials.assurances
    : defaultAssurances;

  // Signature featured projects for home showcase
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#090a0c] text-[#e8e8ea]">
      {/* 1. Cinematic Hero Section */}
      {(pagesContent?.home?.hero?.enabled ?? true) && (
        <Hero
          onSelectProject={onSelectProject}
          onOpenBriefing={() => onNavigate('contactos')}
        />
      )}

      {/* 2. O Atelier em Síntese (Curated Introduction) */}
      {(homeSec?.synthesis?.enabled ?? true) && (
        <section className="py-24 sm:py-32 bg-[#0c0d10] border-t border-white/5 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left Column: Conceptual Text */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-[#c6a87c] tracking-[0.25em] uppercase">
                  <span>{homeSec?.synthesis?.tag || 'Identidade & Rigor / O Atelier'}</span>
                </div>

                <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading leading-tight">
                  {homeSec?.synthesis?.title || 'Espaços desenhados para perdurar. Precisão geométrica aliada à alma de Luanda.'}
                </h2>

                <p className="text-sm sm:text-base text-[#9ca3af] leading-relaxed font-light whitespace-pre-line">
                  {homeSec?.synthesis?.description ||
                    'A STAK Arquitectura & Designer de Interiores é um gabinete independente sediado em Luanda, fundado na convicção de que a arquitectura deve transcender a forma passageira. Procuramos uma relação profunda com a luz natural de Angola, a eficiência térmica e o rigor de execução.'}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#c6a87c] uppercase tracking-wider mb-1">
                      <Compass className="w-4 h-4" />
                      <span>{homeSec?.synthesis?.feature1Title || 'Sustentabilidade Bioclimática'}</span>
                    </div>
                    <p className="text-xs text-[#8c909c] leading-relaxed">
                      {homeSec?.synthesis?.feature1Desc ||
                        'Ventilação cruzada, brises de sombreamento e isolamento térmico estudados para o clima tropical costeiro.'}
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#c6a87c] uppercase tracking-wider mb-1">
                      <ShieldCheck className="w-4 h-4" />
                      <span>{homeSec?.synthesis?.feature2Title || 'Fiscalização & Conformidade'}</span>
                    </div>
                    <p className="text-xs text-[#8c909c] leading-relaxed">
                      {homeSec?.synthesis?.feature2Desc ||
                        'Acompanhamento de estaleiro e controlo de qualidade que asseguram que a obra física coincide com o projecto.'}
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => onNavigate('sobre-nos')}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-all cursor-pointer"
                  >
                    <span>{homeSec?.synthesis?.buttonLabel || 'Conhecer o Atelier & Filosofia'}</span>
                    <ArrowRight className="w-4 h-4 text-[#c6a87c]" />
                  </button>
                </div>
              </div>

              {/* Right Column: Architectural Photography Collage */}
              <div className="lg:col-span-5 relative">
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden border border-white/15 shadow-2xl">
                  <img
                    src={homeSec?.synthesis?.image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85'}
                    alt="Arquitectura Contemporânea STAK"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-lg bg-black/75 backdrop-blur-md border border-white/10 text-xs">
                    <span className="text-[#c6a87c] font-mono text-[10px] uppercase tracking-wider block mb-1">
                      Projecto de Referência
                    </span>
                    <h4 className="text-white font-bold text-sm font-heading">
                      {homeSec?.synthesis?.imageCaption || 'Moradia Miramar Contemporary'}
                    </h4>
                    <p className="text-[#9ca3af] text-[11px] mt-0.5">
                      Betão estrutural aparente, pérgolas de madeira nobre e ventilação passiva natural.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. Obras de Referência (Signature Projects Preview) */}
      {(homeSec?.featuredProjects?.enabled ?? true) && (
        <section className="py-24 sm:py-32 bg-[#090a0c] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header with Navigation Action */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-[#c6a87c] tracking-[0.25em] uppercase mb-3">
                  <span>{homeSec?.featuredProjects?.tag || 'Catálogo Seleccionado / Obras Emblemáticas'}</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading leading-tight">
                  {homeSec?.featuredProjects?.title || 'Projectos que moldam a nova paisagem de Luanda.'}
                </h2>
                {homeSec?.featuredProjects?.description && (
                  <p className="text-sm text-[#9ca3af] mt-2 font-light">
                    {homeSec.featuredProjects.description}
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <button
                  type="button"
                  onClick={() => onNavigate('projectos')}
                  className="px-6 py-3.5 bg-[#c6a87c] hover:bg-[#d8bb90] text-black font-semibold text-xs uppercase tracking-wider rounded-sm transition-all flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <span>{homeSec?.featuredProjects?.buttonLabel || `Ver Todos os Projectos (${projects.length})`}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          {/* Featured Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="group cursor-pointer bg-[#111216] border border-white/10 rounded-xl overflow-hidden hover:border-[#c6a87c]/60 transition-all duration-300 shadow-xl flex flex-col justify-between hover:-translate-y-1"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-black/60">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-sm bg-black/80 backdrop-blur-md text-[#c6a87c] text-[10px] font-mono uppercase tracking-wider border border-white/10">
                      {project.categoryLabel}
                    </span>
                    <span className="px-2.5 py-1 rounded-sm bg-black/60 backdrop-blur-md text-white/90 text-[10px] font-mono border border-white/10">
                      {project.fichaTecnica.estadoObra}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/90">
                    <span className="flex items-center gap-1.5 font-mono text-[11px] text-[#c6a87c]">
                      <MapPin className="w-3.5 h-3.5" />
                      {project.fichaTecnica.localizacao}
                    </span>
                    <span className="font-mono text-[11px] bg-black/60 px-2 py-0.5 rounded">
                      {project.fichaTecnica.area}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-3">
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-heading group-hover:text-[#c6a87c] transition-colors leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#9ca3af] line-clamp-2 font-light leading-relaxed">
                    {project.subtitle}
                  </p>
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="text-[#8c909c] font-mono text-[11px]">Ano: {project.fichaTecnica.ano}</span>
                    <span className="text-[#c6a87c] font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Ver Dossier Técnico
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Banner linking to full catalog */}
          <div className="mt-12 p-6 sm:p-8 rounded-xl bg-[#121318] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-bold text-white font-heading">
                Explore o portfólio completo por tipologia e localização
              </h3>
              <p className="text-xs text-[#9ca3af] mt-1">
                Filtre por moradias, sedes corporativas, interiores de luxo e planos urbanísticos desenvolvidos pelo atelier.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('projectos')}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-wider rounded-sm transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              <span>Aceder à Página de Projectos</span>
              <ArrowRight className="w-4 h-4 text-[#c6a87c]" />
            </button>
          </div>
        </div>
      </section>
      )}

      {/* 4. Transformação Arquitectónica: Antes & Depois (Interactive Slider) */}
      {(homeSec?.beforeAfter?.enabled ?? true) && (
        <BeforeAfterSection onNavigate={onNavigate} />
      )}

      {/* 5. Materialidade & Rigor Tectónico (New Distinctive Section) */}
      {(homeSec?.materials?.enabled ?? true) && (
        <section className="py-24 sm:py-32 bg-[#0a0b0e] border-t border-white/5 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-[#c6a87c] tracking-[0.25em] uppercase mb-3">
                  <span>{homeSec?.materials?.tag || 'Tectónica & Autenticidade'}</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading leading-tight">
                  {homeSec?.materials?.title || 'A verdade dos materiais sob a luz de Luanda.'}
                </h2>
              </div>
              <p className="max-w-md text-xs sm:text-sm text-[#9ca3af] font-light leading-relaxed">
                {homeSec?.materials?.description ||
                  'Não aplicamos artifícios cenográficos. Cada matéria-prima é seleccionada pela sua autenticidade táctil, durabilidade extrema contra o salitre e desempenho térmico em clima tropical.'}
              </p>
            </div>

          {/* Interactive Materiality Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Material Selector List */}
            <div className="lg:col-span-5 space-y-3 flex flex-col justify-between">
              {materials.map((mat, idx) => {
                const isActive = activeMaterial === idx;
                return (
                  <div
                    key={mat.id}
                    onClick={() => setActiveMaterial(idx)}
                    className={`p-5 rounded-xl border transition-all cursor-pointer text-left ${
                      isActive
                        ? 'bg-[#15171e] border-[#c6a87c]/60 shadow-xl'
                        : 'bg-[#0e0f13] border-white/5 hover:border-white/15 hover:bg-[#121318]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-mono text-[#c6a87c] uppercase tracking-wider">
                        0{idx + 1} • {mat.tag}
                      </span>
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-[#c6a87c] animate-pulse" />
                      )}
                    </div>
                    <h3 className={`text-base sm:text-lg font-bold font-heading transition-colors ${
                      isActive ? 'text-white' : 'text-[#d1d5db]'
                    }`}>
                      {mat.name}
                    </h3>
                    <p className="text-xs text-[#8c909c] mt-1.5 line-clamp-2 leading-relaxed">
                      {mat.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Material Focus & Architectural Detail Card */}
            <div className="lg:col-span-7 bg-[#111216] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
              <div className="relative aspect-[16/10] overflow-hidden bg-black">
                <img
                  src={materials[activeMaterial].image}
                  alt={materials[activeMaterial].name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter brightness-90 transition-all duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111216] via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-sm bg-black/80 backdrop-blur-md text-[#c6a87c] text-[10px] font-mono uppercase tracking-wider border border-white/10">
                    Amostra Tectónica
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-mono text-[#c6a87c] uppercase tracking-widest mb-1">
                    {materials[activeMaterial].tag}
                  </div>
                  <h4 className="text-2xl font-bold text-white font-heading">
                    {materials[activeMaterial].name}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#9ca3af] mt-2.5 leading-relaxed font-light">
                    {materials[activeMaterial].description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <div className="text-[10px] font-mono text-[#8c909c] uppercase tracking-wider mb-2">
                    Propriedades Técnicas de Estaleiro:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {materials[activeMaterial].properties.map((prop) => (
                      <span
                        key={prop}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-white/5 border border-white/10 text-[11px] text-white/90 font-mono"
                      >
                        <CheckCircle2 className="w-3 h-3 text-[#c6a87c]" />
                        {prop}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* 5. Os 5 Núcleos de Especialidade do Atelier */}
      {(homeSec?.specialties?.enabled ?? true) && (
        <section className="py-24 sm:py-32 bg-[#0c0d10] border-t border-white/5 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-16">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#c6a87c] tracking-[0.25em] uppercase mb-3">
                <span>{homeSec?.specialties?.tag || 'Disciplinas Técnicas / Especialidades'}</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading leading-tight mb-4">
                {homeSec?.specialties?.title || 'Do esboço conceptual à entrega da chave.'}
              </h2>
              <p className="text-sm sm:text-base text-[#9ca3af] font-light">
                {homeSec?.specialties?.description ||
                  'Oferecemos uma resposta integrada onde a arquitectura, a engenharia de estruturas, o design de interiores e o licenciamento camarário caminham juntos.'}
              </p>
            </div>

          {/* 6 Disciplinas de Especialidade STAK */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(sortedServices.length > 0 ? sortedServices : [
              {
                id: 'serv-1',
                code: '01',
                title: 'Projectos de Arquitectura',
                tagline: 'Habitação Unifamiliar, Colectiva e Sedes Corporativas',
                description: 'Desenvolvimento integral do conceito espacial com modelação 3D BIM.',
              },
              {
                id: 'serv-2',
                code: '02',
                title: 'Design de Interiores & Decoração',
                tagline: 'Arquitectura de Detalhe e Ambientes Exclusivos',
                description: 'Marcenaria de autor, luminotécnica cénica e curadoria de materiais.',
              },
              {
                id: 'serv-3',
                code: '03',
                title: 'Licenciamento Municipal e Aprovação GPL',
                tagline: 'Legalização Completa e Gestão Urbanística',
                description: 'Tramitação burocrática e aprovação em todas as administrações de Luanda.',
              },
              {
                id: 'serv-4',
                code: '04',
                title: 'Fiscalização e Direcção de Obra',
                tagline: 'Rigor Construtivo e Controlo de Custos',
                description: 'Acompanhamento permanente no estaleiro com auditoria de execução.',
              },
              {
                id: 'serv-5',
                code: '05',
                title: 'Engenharia & Especialidades Integradas',
                tagline: 'Cálculo Estrutural, Redes e AVAC',
                description: 'Dimensionamento de estabilidade, redes hidráulicas e climatização.',
              },
              {
                id: 'serv-6',
                code: '06',
                title: 'Consultoria e Avaliação de Terrenos',
                tagline: 'Viabilidade Urbanística e Rentabilidade',
                description: 'Estudos topográficos e análise prévia de risco e potencial de ocupação.',
              },
            ]).map((s) => (
              <div
                key={s.id || s.code}
                className="p-6 rounded-lg bg-[#111216] border border-white/10 hover:border-[#c6a87c]/40 transition-all flex flex-col justify-between space-y-4 group"
              >
                <div>
                  <span className="font-mono text-xs text-[#c6a87c] block mb-3 font-semibold">
                    {s.code || '01'}
                  </span>
                  <h3 className="text-base font-bold text-white font-heading group-hover:text-[#c6a87c] transition-colors leading-snug">
                    {s.title}
                  </h3>
                  <p className="text-xs text-[#9ca3af] mt-2 font-light leading-relaxed">
                    {s.tagline || s.description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigate('servicos')}
                  className="text-xs text-[#c6a87c] hover:text-[#d8bb90] font-medium flex items-center gap-1 cursor-pointer pt-2"
                >
                  <span>Saber Mais</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => onNavigate('servicos')}
              className="px-6 py-3 bg-white/5 hover:bg-white/15 border border-white/10 text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-all cursor-pointer"
            >
              Ver Detalhes Completos de Todas as Especialidades
            </button>
          </div>
        </div>
      </section>
      )}

      {/* 6. Reconhecimento, Testemunhos & Garantias de Execução */}
      {(homeSec?.testimonials?.enabled ?? true) && (
        <section className="py-24 sm:py-32 bg-[#090a0c] border-t border-white/5 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mb-16">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#c6a87c] tracking-[0.25em] uppercase mb-3">
                <span>{homeSec?.testimonials?.tag || 'Confiança & Solidez / Experiência Comprovada'}</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading leading-tight mb-4">
                {homeSec?.testimonials?.title || 'A voz de quem confiou o seu investimento à STAK.'}
              </h2>
              <p className="text-sm sm:text-base text-[#9ca3af] font-light">
                {homeSec?.testimonials?.description ||
                  'Construir em Luanda exige mais do que imaginação visual: exige certeza orçamental, domínio das exigências camarárias e presença firme em estaleiro.'}
              </p>
            </div>

          {/* Testimonials 3-Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {testimonials.map((item, idx) => (
              <div
                key={item.id || idx}
                className="p-8 rounded-xl bg-[#111216] border border-white/10 hover:border-[#c6a87c]/50 transition-all flex flex-col justify-between space-y-6 shadow-xl relative group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Quote className="w-8 h-8 text-[#c6a87c]/40 group-hover:text-[#c6a87c] transition-colors" />
                    <div className="flex items-center gap-1">
                      {[...Array(item.rating || 5)].map((_, r) => (
                        <Star key={r} className="w-3.5 h-3.5 fill-[#c6a87c] text-[#c6a87c]" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-[#d1d5db] font-light leading-relaxed italic">
                    "{item.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <h4 className="text-sm font-bold text-white font-heading">
                    {item.author}
                  </h4>
                  <div className="text-[11px] text-[#c6a87c] font-medium mt-0.5">
                    {item.role}
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-[#8c909c] font-mono mt-2">
                    <span>{item.location}</span>
                    <span className="text-[#8c909c]">•</span>
                    <span>{item.projectType}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Structural Assurances Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-8 rounded-2xl bg-gradient-to-r from-[#12141a] via-[#161820] to-[#12141a] border border-white/10">
            {assurances.map((ass) => (
              <div key={ass.id} className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-[#c6a87c]/10 text-[#c6a87c] shrink-0 border border-[#c6a87c]/20">
                  {ass.icon === 'Building2' ? (
                    <Building2 className="w-5 h-5" />
                  ) : ass.icon === 'ShieldCheck' ? (
                    <ShieldCheck className="w-5 h-5" />
                  ) : (
                    <Award className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white font-heading">
                    {ass.title}
                  </h4>
                  <p className="text-xs text-[#9ca3af] mt-1 font-light leading-relaxed">
                    {ass.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* 7. Iniciar Projecto CTA Strip */}
      {(homeSec?.cta?.enabled ?? true) && (
        <section className="py-20 bg-gradient-to-r from-[#111217] via-[#16171d] to-[#111217] border-t border-white/10 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
              <div className="max-w-2xl space-y-2">
                <div className="text-xs font-mono text-[#c6a87c] uppercase tracking-widest">
                  {homeSec?.cta?.tag || 'Pronto para construir o seu espaço?'}
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading">
                  {homeSec?.cta?.title || 'Agende uma reunião técnica de diagnóstico no atelier.'}
                </h2>
                <p className="text-xs sm:text-sm text-[#9ca3af] font-light">
                  {homeSec?.cta?.description ||
                    'Analisamos as condicionantes do seu terreno em Luanda e estruturamos o programa preliminar sem compromisso.'}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    const link = homeSec?.cta?.buttonLink;
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
                  className="w-full sm:w-auto px-8 py-4 bg-[#c6a87c] hover:bg-[#d8bb90] text-black font-bold text-xs uppercase tracking-wider rounded-sm transition-all cursor-pointer shadow-xl"
                >
                  {homeSec?.cta?.buttonLabel || 'Preencher Ficha de Briefing'}
                </button>
                <a
                  href={homeSec?.cta?.secondaryButtonLink || `https://wa.me/${(atelierInfo.phone || '244928058840').replace(/[^0-9]/g, '')}`}
                  target={homeSec?.cta?.secondaryButtonLink?.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-4 bg-white/5 hover:bg-white/15 text-white border border-white/10 text-xs font-semibold uppercase tracking-wider rounded-sm transition-all text-center"
                >
                  {homeSec?.cta?.secondaryButtonLabel || 'Falar pelo WhatsApp'}
                </a>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
