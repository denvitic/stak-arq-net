import React, { useState, useMemo } from 'react';
import { useCms } from '../context/CmsContext';
import { NavPage } from '../types';
import {
  Home,
  Building,
  Sparkles,
  Map,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  FileCheck,
  Layers,
  ArrowUpRight,
  HelpCircle,
  ChevronDown
} from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: NavPage) => void;
  onSelectServiceForBriefing: (serviceTitle: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onNavigate,
  onSelectServiceForBriefing,
}) => {
  const { services, pagesContent } = useCms();
  const servicesData = pagesContent?.services;

  const defaultSpecialties = [
    {
      code: 'ESP-01',
      title: 'Arquitectura Residencial Contemporânea',
      tagline: 'Moradias unifamiliares de luxo, condomínios privados e habitação de autor.',
      description:
        'Desenvolvemos residências únicas adaptadas ao perfil, dinâmica familiar e rotina de cada cliente. A nossa abordagem integra a arquitectura com a envolvente natural, promovendo a ventilação passiva, privacidade em lotes urbanos e amplas transições entre o interior climatizado e os jardins exteriores.',
      deliverables: [
        'Levantamento do terreno e análise solar/eólica de Luanda',
        'Estudo prévio com modelação 3D hiper-realista e passeios virtuais',
        'Projecto de execução completo (alvenarias, vãos, revestimentos)',
        'Compatibilização com especialidades de estabilidade e instalações',
        'Dossier para aprovação no Governo Provincial / Administrações Municipais',
      ],
      typicalDuration: '8 a 14 semanas',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    },
    {
      code: 'ESP-02',
      title: 'Comercial, Corporativo & Hotelaria',
      tagline: 'Sedes empresariais, edifícios de escritórios e hospitalidade de prestígio.',
      description:
        'Espaços corporativos desenhados para elevar a identidade das marcas e optimizar fluxos operacionais e produtividade. Criamos soluções que equilibram impacto visual imponente, eficiência energética, flexibilidade de layout e conformidade com normas de segurança contra incêndios e evacuação.',
      deliverables: [
        'Programa funcional detalhado e estudo de densidade de postos',
        'Layouts corporativos flexíveis e modulares (open-space & salas executivas)',
        'Projecto de fachadas ventiladas, brises e eficiência energética',
        'Compatibilização AVAC (Ar condicionado central e renovação de ar)',
        'Caderno de encargos para concurso de empreiteiros',
      ],
      typicalDuration: '12 a 20 semanas',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    },
    {
      code: 'ESP-03',
      title: 'Design de Interiores & Marcenaria de Autor',
      tagline: 'Detalhamento milimétrico, curadoria de materiais nobres e iluminação cénica.',
      description:
        'Acreditamos que o interior é a continuação indissociável da arquitectura. Desenhamos cada pormenor construtivo: marcenaria à medida em madeiras nobres tratadas, paginação de rochas ornamentais, desenho de sancas de iluminação indirecta e selecção criteriosa de mobiliário e peças de arte.',
      deliverables: [
        'Plantas de paginação de pavimentos e tectos falsos',
        'Projecto luminotécnico com definição de temperatura de cor (Kelvin)',
        'Caderno de marcenaria de detalhe com cortes em escala 1:10 e 1:5',
        'Mapa de acabamentos com referências de tintas, tecidos e revestimentos',
        'Acompanhamento de fabrico em carpintarias e instalação no local',
      ],
      typicalDuration: '6 a 10 semanas',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    },
    {
      code: 'ESP-04',
      title: 'Urbanismo, Masterplanning & Loteamentos',
      tagline: 'Ordenamento do território, condomínios fechados e espaços públicos.',
      description:
        'Desenvolvemos planos directores e loteamentos de grande escala com foco na sustentabilidade comunitária. Estruturamos malhas viárias fluidas, circuitos pedonais arborizados, integração com redes de drenagem pluvial e definição de índices de ocupação do solo de acordo com a legislação angolana.',
      deliverables: [
        'Plano de loteamento com demarcação precisa de lotes e áreas de cedência',
        'Projecto de traçado de arruamentos, estacionamentos e acessos',
        'Estudo paisagístico de zonas verdes, praças e equipamentos sociais',
        'Regulamento interno de construção e harmonia arquitectónica',
        'Memórias descritivas urbanísticas para instrução processual',
      ],
      typicalDuration: '14 a 24 semanas',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    },
    {
      code: 'ESP-05',
      title: 'Fiscalização de Obra & Licenciamento Municipal',
      tagline: 'Direcção técnica em estaleiro, controlo de qualidade e aprovações no GPL.',
      description:
        'Garantimos que o que foi desenhado seja executado sem desvios de qualidade, prazo ou custo. Realizamos vistorias periódicas ao estaleiro, verificação de ensaios de betão e aço, conferência de cotas e instruímos todo o processo burocrático de licenciamento nas administrações municipais de Luanda.',
      deliverables: [
        'Vistorias técnicas com emissão de autos de fiscalização detalhados',
        'Aprovação de amostras de materiais e verificação de fichas técnicas',
        'Controlo de cronograma financeiro e autos de medição da construtora',
        'Resolução ágil de dúvidas de estaleiro e alterações pontuais',
        'Instrução e acompanhamento de Licença de Construção e Habitabilidade',
      ],
      typicalDuration: 'Conforme cronograma de obra',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  const specialties = useMemo(() => {
    const list = services && services.length > 0 ? services : defaultSpecialties;
    return [...list].sort((a, b) => (a.code || '').localeCompare(b.code || '', undefined, { numeric: true }));
  }, [services, defaultSpecialties]);

  const handleStartBriefing = (title: string) => {
    onSelectServiceForBriefing(title);
    onNavigate('contactos');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const rawFaqs = servicesData?.sections?.faq?.items && servicesData.sections.faq.items.length > 0
    ? servicesData.sections.faq.items
    : [
        {
          id: 'faq-1',
          question: 'Como funciona a tramitação e aprovação de projectos no Governo Provincial de Luanda (GPL)?',
          answer: 'A equipa da STAK assume toda a instrução processual do projecto camarário: memória descritiva, termo de responsabilidade de técnicos habilitados pela Ordem dos Arquitectos de Angola (OAA) e Ordem dos Engenheiros de Angola (OEA), plantas de localização e peças desenhadas regulamentares. Acompanhamos o processo até à emissão da Licença de Construção definitiva.',
        },
        {
          id: 'faq-2',
          question: 'É possível contratar apenas a Fiscalização de Obra para um projecto feito por terceiros?',
          answer: 'Sim. Efectuamos uma auditoria prévia ao projecto existente para identificar eventuais incompatibilidades geométricas ou orçamentais. A partir daí, alocamos um engenheiro/arquitecto fiscal residente para vistorias semanais, emissão de autos de medição e garantia de que o empreiteiro cumpre as normas técnicas angolanas.',
        },
        {
          id: 'faq-3',
          question: 'Como é calculado o orçamento e o mapa de quantidades?',
          answer: 'Com base no projecto de execução 3D/BIM, extraímos medições exactas de betão armado, cofragens, aço, revestimentos, caixilharias e instalações técnicas (hidráulica, eletricidade, AVAC). O cliente recebe um caderno de encargos discriminado para lançar consultas a empreiteiros em pé de igualdade e sem surpresas adicionais.',
        },
        {
          id: 'faq-4',
          question: 'Como funciona a primeira reunião de diagnóstico no atelier STAK?',
          answer: 'A primeira reunião serve para ouvir as aspirações do cliente, analisar a documentação topográfica ou predial do terreno e compreender as restrições regulamentares de Luanda. É uma reunião de diagnóstico sem custos.',
        },
        {
          id: 'faq-5',
          question: 'Fazem acompanhamento e fiscalização de obra presencial?',
          answer: 'Sim. A direcção técnica de estaleiro é um dos nossos maiores pontos fortes. Não entregamos apenas pranchas de desenho: asseguramos visitas regulares ou permanentes para controlo milimétrico de armaduras, betão e acabamentos.',
        },
        {
          id: 'faq-6',
          question: 'Desenvolvem projectos fora de Luanda ou em outras províncias?',
          answer: 'Sim. Embora a nossa sede esteja em Luanda, temos no nosso histórico intervenções e consultorias desenvolvidas em Benguela, Huíla (Lubango), Namibe e Cabinda, coordenando a logística técnica através de vistorias planeadas e modelos digitais colaborativos.',
        },
      ];

  const faqs = rawFaqs.map((f: any) => ({
    q: f.question || f.q || '',
    a: f.answer || f.a || '',
  }));

  const defaultMethodologySteps = [
    {
      step: 'Fase 1',
      title: 'Estudo Prévio',
      desc: 'Conceito arquitectónico, distribuição volumétrica, simulações 3D fotorrealistas e estimativa inicial de áreas.',
    },
    {
      step: 'Fase 2',
      title: 'Anteprojecto & Licenciamento',
      desc: 'Instrução do processo camarário no GPL, conformidade com o PDU e regulamentos de ocupação de solo.',
    },
    {
      step: 'Fase 3',
      title: 'Projecto de Execução',
      desc: 'Plantas executivas cotadas ao milímetro, cadernos de pormenores construtivos, mapa de vãos e acabamentos.',
    },
    {
      step: 'Fase 4',
      title: 'Fiscalização de Obra',
      desc: 'Acompanhamento no estaleiro, verificação de betão e armaduras, aprovação de medições e garantia de fidelidade.',
    },
  ];

  const methodologySteps = useMemo(() => {
    const rawSteps =
      servicesData?.sections?.methodology?.steps && servicesData.sections.methodology.steps.length > 0
        ? servicesData.sections.methodology.steps
        : defaultMethodologySteps;

    return [...rawSteps]
      .map((s: any, idx: number) => ({
        step: s.step || s.number || `Fase ${idx + 1}`,
        title: s.title || '',
        desc: s.desc || s.description || '',
      }))
      .sort((a, b) => (a.step || '').localeCompare(b.step || '', undefined, { numeric: true }));
  }, [servicesData?.sections?.methodology?.steps]);

  return (
    <div className="services-page-container min-h-screen bg-[#090a0c] text-[#e8e8ea] pb-20">
      {/* 1. Header & Breadcrumbs with Featured Hero Background Image */}
      {(servicesData?.hero?.enabled ?? true) && (
        <div className="page-hero-banner border-b border-white/10 relative min-h-[420px] sm:min-h-[480px] pt-28 sm:pt-36 pb-16 sm:pb-24 flex items-center overflow-hidden">
          {/* Background Image with Dark Vignette & Gradients */}
          <div className="absolute inset-0 z-0">
            <img
              src={servicesData?.hero?.bgImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85'}
              alt="Serviços e Especialidades STAK Arquitectura"
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
              <span className="text-white">{servicesData?.hero?.badge || 'Especialidades do Atelier'}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight font-heading max-w-4xl leading-tight mb-6">
              {servicesData?.hero?.title || 'Especialidades arquitectónicas & consultoria integral.'}
            </h1>

            <p className="text-sm sm:text-lg text-[#d1d5db] max-w-3xl font-light leading-relaxed">
              {servicesData?.hero?.description ||
                'Desde o estudo de viabilidade e simulação tridimensional até à entrega da chave e aprovação municipal, oferecemos disciplinas coordenadas que salvaguardam o seu investimento em Angola.'}
            </p>

            {/* Quick Specialties Badges */}
            <div className="flex flex-wrap gap-2.5 mt-8 pt-6 border-t border-white/10">
              {(servicesData?.hero?.tagPills && servicesData.hero.tagPills.length > 0
                ? servicesData.hero.tagPills
                : ['Arquitectura Residencial', 'Edifícios Comerciais', 'Design de Interiores', 'Urbanismo', 'Fiscalização de Obra']
              ).map((specName) => (
                <span
                  key={specName}
                  className="px-3 py-1 rounded-sm bg-white/5 border border-white/10 text-xs text-white/90 font-mono"
                >
                  {specName}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. Detailed Specialties Presentation */}
      {(servicesData?.sections?.servicesList?.enabled ?? true) && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
          {specialties.map((spec, index) => {
            const isReversed = index % 2 === 1;
            return (
              <section
                key={spec.code}
                id={spec.code.toLowerCase()}
                className="specialty-card p-8 sm:p-12 rounded-2xl bg-[#111216] border border-white/10 hover:border-[#c6a87c]/40 transition-all shadow-md"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Text Content (7 cols) */}
                  <div className={`lg:col-span-7 space-y-6 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-1 rounded bg-[#c6a87c]/10 text-[#c6a87c] font-mono text-xs font-bold border border-[#c6a87c]/30">
                        {spec.code}
                      </span>
                      <span className="text-xs font-mono text-[#8c909c] flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#c6a87c]" />
                        Prazo típico: {spec.typicalDuration}
                      </span>
                    </div>

                    <h2 className="specialty-title text-2xl sm:text-4xl font-bold text-white font-heading leading-tight">
                      {spec.title}
                    </h2>

                    <p className="text-xs sm:text-sm font-medium text-[#c6a87c] font-heading">
                      {spec.tagline}
                    </p>

                    <p className="specialty-description text-xs sm:text-sm text-[#9ca3af] leading-relaxed font-light">
                      {spec.description}
                    </p>

                    {/* Deliverables Box */}
                    <div className="specialty-deliverables-box p-5 rounded-xl bg-black/40 border border-white/5 space-y-3">
                      <div className="deliverable-title text-xs font-mono text-white uppercase tracking-wider font-semibold flex items-center gap-2">
                        <FileCheck className="w-4 h-4 text-[#c6a87c]" />
                        <span>Entregáveis Técnicos Incluídos no Dossier</span>
                      </div>
                      <ul className="space-y-2 text-xs text-[#9ca3af]">
                        {spec.deliverables.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#c6a87c] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Actions */}
                    <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                      <button
                        type="button"
                        onClick={() => handleStartBriefing(spec.title)}
                        className="px-6 py-3.5 bg-[#c6a87c] hover:bg-[#d8bb90] text-black font-bold text-xs uppercase tracking-wider rounded-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                      >
                        <span>Solicitar Proposta para este Núcleo</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onNavigate('projectos')}
                        className="px-5 py-3.5 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Ver Obras Desta Categoria</span>
                      </button>
                    </div>
                  </div>

                  {/* Photography (5 cols) */}
                  <div className={`lg:col-span-5 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="aspect-[4/3] rounded-xl overflow-hidden border border-white/10 shadow-2xl relative bg-[#18191e]">
                      <img
                        src={spec.image || 'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?auto=format&fit=crop&w=1200&q=80'}
                        alt={spec.title}
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          // Resilient fallback if the image link fails or is blocked
                          const target = e.currentTarget;
                          if (target.src !== 'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?auto=format&fit=crop&w=1200&q=80') {
                            target.src = 'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?auto=format&fit=crop&w=1200&q=80';
                          }
                        }}
                        className="w-full h-full object-cover filter brightness-90 hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="text-[10px] font-mono text-[#c6a87c] uppercase tracking-wider block">
                          Padrão de Execução STAK
                        </span>
                        <span className="text-white text-xs font-medium">
                          Rigor de traço e compatibilização em Luanda
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      )}

      {/* 3. Matriz Comparativa de Fases de Projecto / Metodologia */}
      {(servicesData?.sections?.methodology?.enabled ?? true) && (
        <section className="services-methodology-section py-20 bg-[#0c0d10] border-t border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <div className="text-xs font-mono text-[#c6a87c] uppercase tracking-widest mb-2">
                {servicesData?.sections?.methodology?.tag || 'Estrutura Contratual'}
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-white font-heading">
                {servicesData?.sections?.methodology?.title || 'As fases de entrega de um projecto STAK.'}
              </h2>
              <p className="text-sm text-[#9ca3af] mt-2 font-light">
                {servicesData?.sections?.methodology?.description ||
                  'Trabalhamos com marcos de validação transparentes para que o cliente tenha controlo absoluto do investimento antes de iniciar a obra.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {methodologySteps.map((stepItem: any, idx: number) => (
                <div key={idx} className="methodology-step-card p-6 rounded-xl bg-[#111216] border border-white/10 space-y-3">
                  <span className="text-xs font-mono text-[#c6a87c] font-bold">{stepItem.step}</span>
                  <h3 className="text-base font-bold text-white font-heading">{stepItem.title}</h3>
                  <p className="text-xs text-[#9ca3af] leading-relaxed font-light">
                    {stepItem.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. Perguntas Frequentes & Esclarecimentos Técnicos */}
      {(servicesData?.sections?.faq?.enabled ?? true) && (
        <section className="services-faq-section py-24 bg-[#090a0c] border-t border-white/5 relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#c6a87c] uppercase tracking-widest mb-2">
                <HelpCircle className="w-4 h-4" />
                <span>{servicesData?.sections?.faq?.tag || 'Dúvidas Técnicas & Processuais'}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-white font-heading">
                {servicesData?.sections?.faq?.title || 'Perguntas frequentes sobre os nossos serviços.'}
              </h2>
              <p className="text-xs sm:text-sm text-[#9ca3af] mt-2 font-light">
                {servicesData?.sections?.faq?.description ||
                  'Respostas transparentes sobre metodologia de licenciamento, orçamentação e fiscalização em Angola.'}
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="services-faq-item rounded-xl border border-white/10 bg-[#111216] overflow-hidden transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/5 transition-colors"
                    >
                      <span className="text-sm sm:text-base font-bold text-white font-heading">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#c6a87c] shrink-0 transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="faq-answer px-6 pb-6 text-xs sm:text-sm text-[#9ca3af] font-light leading-relaxed border-t border-white/5 pt-4">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 5. Bottom CTA */}
      {(servicesData?.sections?.cta?.enabled ?? true) && (
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="services-cta-banner p-8 sm:p-12 rounded-2xl bg-gradient-to-r from-[#111217] via-[#16171d] to-[#111217] border border-[#c6a87c]/30 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl space-y-3 text-center lg:text-left">
              <span className="text-xs font-mono text-[#c6a87c] uppercase tracking-widest">
                {servicesData?.sections?.cta?.title ? 'Consultoria & Diagnóstico' : 'Iniciar o Seu Projecto'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                {servicesData?.sections?.cta?.title || 'Precisa de uma proposta técnica e comercial detalhada?'}
              </h3>
              <p className="text-xs sm:text-sm text-[#9ca3af] font-light">
                {servicesData?.sections?.cta?.description ||
                  'Envie-nos os dados preliminares do seu terreno ou espaço e formularemos um plano de trabalho completo em 48 horas.'}
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                const link = servicesData?.sections?.cta?.buttonLink;
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
              className="px-8 py-4 bg-[#c6a87c] hover:bg-[#d8bb90] text-black font-bold text-xs uppercase tracking-wider rounded-sm transition-all cursor-pointer shadow-lg shrink-0"
            >
              {servicesData?.sections?.cta?.buttonLabel || 'Submeter Ficha de Briefing'}
            </button>
          </div>
        </section>
      )}
    </div>
  );
};
