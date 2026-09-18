import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useCms } from '@/src/context/CmsContext';
import { AtelierPageContent, AtelierInfo } from '@/src/types';
import { ImagePickerInput } from '@/src/dashboard/src/components/ImagePickerInput';

export default function AtelierManager() {
  const { pagesContent, updatePageContent, atelierInfo, updateAtelierInfo } = useCms();
  const [activeTab, setActiveTab] = useState<'sections' | 'identity'>('sections');
  const [isSaved, setIsSaved] = useState(false);

  // Default values safe check for Atelier Page Content
  const atelierContent: AtelierPageContent = pagesContent.atelier || {
    hero: {
      enabled: true,
      badge: 'O Atelier & Identidade',
      title: 'A arquitectura como síntese de rigor, proporção e identidade espacial.',
      description:
        'Fundado em Luanda, o atelier STAK desenvolve intervenções que combinam a autenticidade dos materiais angolanos com as mais elevadas exigências de conforto contemporâneo e engenharia de detalhe.',
      bgImage:
        'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2000&q=85',
    },
    sections: {
      history: {
        enabled: true,
        tag: 'Origens & Evolução',
        title: 'Mais de uma década a desenhar e erguer referências em Angola.',
        content:
          'O atelier STAK Arquitectura & Designer de Interiores nasceu da necessidade premente de conferir um novo patamar de sofisticação e rigor técnico ao mercado de construção de alto padrão em Luanda.\n\nAo longo dos anos, expandimos a nossa actuação desde moradias unifamiliares exclusivas em bairros como Miramar, Talatona e Ilha de Luanda, até projectos de grande escala que incluem sedes corporativas, empreendimentos habitacionais fechados e planos de urbanismo.',
        image:
          'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      },
      pillars: {
        enabled: true,
        tag: 'Princípios Fundamentais',
        title: 'A nossa disciplina projectual.',
        description: 'Quatro pilares inegociáveis que orientam cada linha traçada no atelier.',
        items: [
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
        ],
      },
      methodology: {
        enabled: true,
        tag: 'Como Trabalhamos',
        title: 'O percurso metodológico de cada projecto.',
        description:
          'Da primeira conversa à fiscalização de obra, dividimos o processo em etapas transparentes com prazos e entregáveis definidos.',
        steps: [
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
        ],
      },
      bioclimatic: {
        enabled: true,
        tag: 'Resiliência & Conforto / Arquitectura Tropical',
        title: 'Construir em harmonia com a luz, o vento atlântico e o calor de Luanda.',
        description:
          'A sustentabilidade na STAK não é um selo comercial: é inteligência geométrica aplicada. Em vez de depender exclusivamente de sistemas artificiais de ar condicionado, concebemos cada moradia e edifício corporativo como um organismo que respira.',
        image:
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
        features: [
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
        ],
      },
      team: {
        enabled: true,
        tag: 'Corpo Técnico',
        title: 'Arquitectos, engenheiros e coordenadores.',
        description:
          'Uma equipa multidisciplinar residente em Luanda, habituada a resolver os desafios de licenciamento e construção em Angola.',
        members: [
          {
            name: 'Manuel Stak',
            role: 'Sócio-Fundador & Director de Arquitectura',
            bio: 'Mais de 16 anos dedicados à concepção de moradias contemporâneas e edifícios corporativos em Angola e Portugal. Especialista em design bioclimático.',
            image:
              'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
          },
          {
            name: 'Eng.ª Paula Domingos',
            role: 'Directora de Engenharia & Compatibilização',
            bio: 'Especialista em cálculo estrutural em betão armado e fundações especiais para as condicionantes geológicas da costa de Luanda.',
            image:
              'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
          },
          {
            name: 'Arqt. David Mbanza',
            role: 'Coordenador de Interiores & Marcenaria',
            bio: 'Com vasta experiência em arquitectura de interiores e mobiliário por medida, alia a sobriedade contemporânea ao conforto táctil.',
            image:
              'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
          },
        ],
      },
      cta: {
        enabled: true,
        tag: 'Atendimento Técnico Presencial',
        title: 'Gostaria de conhecer o nosso atelier na Marginal de Luanda?',
        description:
          'Agende uma visita para conversarmos sobre o seu lote de terreno, consultar maquetes físicas e explorar materiais de acabamento.',
        buttonLabel: 'Agendar Reunião de Briefing',
        buttonLink: 'contactos',
        secondaryButtonLabel: 'Ver Portfólio de Projectos',
        secondaryButtonLink: 'projectos',
      },
    },
  };

  const [formAtelier, setFormAtelier] = useState<AtelierPageContent>(atelierContent);
  const [formInfo, setFormInfo] = useState<AtelierInfo>({ ...atelierInfo });

  const handleSaveAll = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    updatePageContent('atelier', formAtelier);
    updateAtelierInfo(formInfo);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  // Section toggle helper
  const toggleSection = (sectionKey: keyof typeof formAtelier.sections) => {
    const currentVal = formAtelier.sections[sectionKey]?.enabled ?? true;
    setFormAtelier({
      ...formAtelier,
      sections: {
        ...formAtelier.sections,
        [sectionKey]: {
          ...formAtelier.sections[sectionKey],
          enabled: !currentVal,
        },
      },
    });
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold text-[#c6a87c] tracking-widest uppercase">
              Página do Atelier & Sobre Nós
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight font-serif">
            Gestão de Secções de "O Atelier"
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Configure todas as secções da página institucional: Origens, Princípios Fundamentais, Metodologia, Arquitectura Tropical, Equipa e Atendimento.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {isSaved && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-800 text-xs font-semibold rounded-lg border border-emerald-200 animate-fade-in">
              <Icon icon="solar:check-circle-linear" width="16" />
              <span>Guardado!</span>
            </div>
          )}
          <button
            type="button"
            onClick={() => handleSaveAll()}
            className="px-5 py-2.5 bg-[#111827] hover:bg-black text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer shadow-sm flex items-center gap-2"
            style={{ color: '#ffffff' }}
          >
            <Icon icon="solar:check-read-linear" width="16" style={{ color: '#ffffff' }} />
            <span style={{ color: '#ffffff' }}>Guardar Alterações</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-white rounded-t-xl px-4 pt-3 gap-6">
        <button
          type="button"
          onClick={() => setActiveTab('sections')}
          className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 cursor-pointer flex items-center gap-2 ${
            activeTab === 'sections'
              ? 'border-[#c6a87c] text-gray-900'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <Icon icon="solar:layers-minimalistic-linear" width="16" />
          <span>Secções da Página (O Atelier)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('identity')}
          className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 cursor-pointer flex items-center gap-2 ${
            activeTab === 'identity'
              ? 'border-[#c6a87c] text-gray-900'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <Icon icon="solar:videocamera-record-linear" width="16" />
          <span>Mídia Hero & Manifesto Global</span>
        </button>
      </div>

      {/* TAB 1: SECTIONS OF O ATELIER */}
      {activeTab === 'sections' && (
        <div className="space-y-8">
          {/* 1. HERO HEADER */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#c6a87c]"></span>
                  Hero Banner da Página (Abertura)
                </h2>
                <p className="text-xs text-gray-500">
                  Cabeçalho de abertura com título, descrição e imagem de fundo
                </p>
              </div>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formAtelier.hero?.enabled ?? true}
                  onChange={(e) =>
                    setFormAtelier({
                      ...formAtelier,
                      hero: { ...formAtelier.hero, enabled: e.target.checked },
                    })
                  }
                  className="w-4 h-4 text-[#c6a87c] rounded focus:ring-[#c6a87c]"
                />
                <span className="text-xs font-medium text-gray-700">Secção Activa</span>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Badge / Breadcrumb
                </label>
                <input
                  type="text"
                  value={formAtelier.hero?.badge || ''}
                  onChange={(e) =>
                    setFormAtelier({
                      ...formAtelier,
                      hero: { ...formAtelier.hero, badge: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#c6a87c] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Título Principal da Hero
                </label>
                <input
                  type="text"
                  value={formAtelier.hero?.title || ''}
                  onChange={(e) =>
                    setFormAtelier({
                      ...formAtelier,
                      hero: { ...formAtelier.hero, title: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#c6a87c] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Descrição do Banner
              </label>
              <textarea
                rows={2}
                value={formAtelier.hero?.description || ''}
                onChange={(e) =>
                  setFormAtelier({
                    ...formAtelier,
                    hero: { ...formAtelier.hero, description: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#c6a87c] focus:outline-none leading-relaxed"
              />
            </div>

            <ImagePickerInput
              label="Fotografia de Fundo da Hero (Banner)"
              description="Imagem arquitectónica de fundo com gradiente escuro e textura de grelha"
              value={formAtelier.hero?.bgImage || ''}
              onChange={(url) =>
                setFormAtelier({
                  ...formAtelier,
                  hero: { ...formAtelier.hero, bgImage: url },
                })
              }
            />
          </div>

          {/* 2. ORIGENS & EVOLUÇÃO (HISTÓRIA) */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#c6a87c]"></span>
                  Secção .1 - Origens & Evolução (Trajectória)
                </h2>
                <p className="text-xs text-gray-500">
                  História da fundação do atelier, trajectória de actuação e fotografia do espaço
                </p>
              </div>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formAtelier.sections.history?.enabled ?? true}
                  onChange={() => toggleSection('history')}
                  className="w-4 h-4 text-[#c6a87c] rounded focus:ring-[#c6a87c]"
                />
                <span className="text-xs font-medium text-gray-700">Secção Activa</span>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Tag da Secção
                </label>
                <input
                  type="text"
                  value={formAtelier.sections.history?.tag || ''}
                  onChange={(e) =>
                    setFormAtelier({
                      ...formAtelier,
                      sections: {
                        ...formAtelier.sections,
                        history: { ...formAtelier.sections.history, tag: e.target.value },
                      },
                    })
                  }
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#c6a87c] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Título da Secção
                </label>
                <input
                  type="text"
                  value={formAtelier.sections.history?.title || ''}
                  onChange={(e) =>
                    setFormAtelier({
                      ...formAtelier,
                      sections: {
                        ...formAtelier.sections,
                        history: { ...formAtelier.sections.history, title: e.target.value },
                      },
                    })
                  }
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#c6a87c] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Texto Narrativo / História (Suporta parágrafos)
              </label>
              <textarea
                rows={4}
                value={formAtelier.sections.history?.content || ''}
                onChange={(e) =>
                  setFormAtelier({
                    ...formAtelier,
                    sections: {
                      ...formAtelier.sections,
                      history: { ...formAtelier.sections.history, content: e.target.value },
                    },
                  })
                }
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#c6a87c] focus:outline-none leading-relaxed"
              />
            </div>

            <ImagePickerInput
              label="Fotografia do Atelier / Espaço Criativo"
              description="Fotografia da sede ou ambiente de projecto em Luanda"
              value={formAtelier.sections.history?.image || ''}
              onChange={(url) =>
                setFormAtelier({
                  ...formAtelier,
                  sections: {
                    ...formAtelier.sections,
                    history: { ...formAtelier.sections.history, image: url },
                  },
                })
              }
            />
          </div>

          {/* 3. PRINCÍPIOS FUNDAMENTAIS (OS 4 CARDS) */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#c6a87c]"></span>
                  Secção .2 - Princípios Fundamentais (Os Cards de Disciplina Projectual)
                </h2>
                <p className="text-xs text-gray-500">
                  Edite os pilares fundamentais como Sobriedade & Clareza Geométrica, Arquitectura Bioclimática, Compatibilização e Curadoria
                </p>
              </div>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formAtelier.sections.pillars?.enabled ?? true}
                  onChange={() => toggleSection('pillars')}
                  className="w-4 h-4 text-[#c6a87c] rounded focus:ring-[#c6a87c]"
                />
                <span className="text-xs font-medium text-gray-700">Secção Activa</span>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Tag da Secção
                </label>
                <input
                  type="text"
                  value={formAtelier.sections.pillars?.tag || ''}
                  onChange={(e) =>
                    setFormAtelier({
                      ...formAtelier,
                      sections: {
                        ...formAtelier.sections,
                        pillars: { ...formAtelier.sections.pillars, tag: e.target.value },
                      },
                    })
                  }
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#c6a87c] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Título da Secção
                </label>
                <input
                  type="text"
                  value={formAtelier.sections.pillars?.title || ''}
                  onChange={(e) =>
                    setFormAtelier({
                      ...formAtelier,
                      sections: {
                        ...formAtelier.sections,
                        pillars: { ...formAtelier.sections.pillars, title: e.target.value },
                      },
                    })
                  }
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#c6a87c] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Subtítulo / Descrição Geral
              </label>
              <input
                type="text"
                value={formAtelier.sections.pillars?.description || ''}
                onChange={(e) =>
                  setFormAtelier({
                    ...formAtelier,
                    sections: {
                      ...formAtelier.sections,
                      pillars: { ...formAtelier.sections.pillars, description: e.target.value },
                    },
                  })
                }
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#c6a87c] focus:outline-none"
              />
            </div>

            {/* Cards List */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-700">
                  Cards de Princípios ({formAtelier.sections.pillars?.items?.length || 0})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const current = formAtelier.sections.pillars?.items || [];
                    setFormAtelier({
                      ...formAtelier,
                      sections: {
                        ...formAtelier.sections,
                        pillars: {
                          ...formAtelier.sections.pillars,
                          items: [
                            ...current,
                            { title: 'Novo Princípio Projectual', desc: 'Descrição detalhada do princípio...' },
                          ],
                        },
                      },
                    });
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  <Icon icon="solar:add-circle-linear" width="14" />
                  <span>Adicionar Card</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formAtelier.sections.pillars?.items?.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-3 relative group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-[#c6a87c]">
                        Card #{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = formAtelier.sections.pillars.items.filter((_, i) => i !== idx);
                          setFormAtelier({
                            ...formAtelier,
                            sections: {
                              ...formAtelier.sections,
                              pillars: {
                                ...formAtelier.sections.pillars,
                                items: updated,
                              },
                            },
                          });
                        }}
                        className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                        title="Remover este card"
                      >
                        <Icon icon="solar:trash-bin-trash-linear" width="16" />
                      </button>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-gray-700 mb-0.5">
                        Título do Card
                      </label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => {
                          const updated = [...formAtelier.sections.pillars.items];
                          updated[idx] = { ...updated[idx], title: e.target.value };
                          setFormAtelier({
                            ...formAtelier,
                            sections: {
                              ...formAtelier.sections,
                              pillars: { ...formAtelier.sections.pillars, items: updated },
                            },
                          });
                        }}
                        className="w-full px-2.5 py-1.5 bg-white border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#c6a87c] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-gray-700 mb-0.5">
                        Texto Explicativo
                      </label>
                      <textarea
                        rows={3}
                        value={item.desc}
                        onChange={(e) => {
                          const updated = [...formAtelier.sections.pillars.items];
                          updated[idx] = { ...updated[idx], desc: e.target.value };
                          setFormAtelier({
                            ...formAtelier,
                            sections: {
                              ...formAtelier.sections,
                              pillars: { ...formAtelier.sections.pillars, items: updated },
                            },
                          });
                        }}
                        className="w-full px-2.5 py-1.5 bg-white border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#c6a87c] focus:outline-none leading-relaxed"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 4. COMO TRABALHAMOS (PERCURSO METODOLÓGICO) */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#c6a87c]"></span>
                  Secção .3 - Como Trabalhamos (O Percurso Metodológico)
                </h2>
                <p className="text-xs text-gray-500">
                  Etapas do processo projectual: Briefing, Estudo Prévio 3D, Projecto de Execução e Fiscalização
                </p>
              </div>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formAtelier.sections.methodology?.enabled ?? true}
                  onChange={() => toggleSection('methodology')}
                  className="w-4 h-4 text-[#c6a87c] rounded focus:ring-[#c6a87c]"
                />
                <span className="text-xs font-medium text-gray-700">Secção Activa</span>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Tag da Secção
                </label>
                <input
                  type="text"
                  value={formAtelier.sections.methodology?.tag || ''}
                  onChange={(e) =>
                    setFormAtelier({
                      ...formAtelier,
                      sections: {
                        ...formAtelier.sections,
                        methodology: { ...formAtelier.sections.methodology, tag: e.target.value },
                      },
                    })
                  }
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#c6a87c] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Título da Secção
                </label>
                <input
                  type="text"
                  value={formAtelier.sections.methodology?.title || ''}
                  onChange={(e) =>
                    setFormAtelier({
                      ...formAtelier,
                      sections: {
                        ...formAtelier.sections,
                        methodology: { ...formAtelier.sections.methodology, title: e.target.value },
                      },
                    })
                  }
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#c6a87c] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Descrição Geral
              </label>
              <input
                type="text"
                value={formAtelier.sections.methodology?.description || ''}
                onChange={(e) =>
                  setFormAtelier({
                    ...formAtelier,
                    sections: {
                      ...formAtelier.sections,
                      methodology: { ...formAtelier.sections.methodology, description: e.target.value },
                    },
                  })
                }
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#c6a87c] focus:outline-none"
              />
            </div>

            {/* Methodology Steps */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-700">
                  Fases do Projecto ({formAtelier.sections.methodology?.steps?.length || 0})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const current = formAtelier.sections.methodology?.steps || [];
                    const nextNum = (current.length + 1).toString().padStart(2, '0');
                    setFormAtelier({
                      ...formAtelier,
                      sections: {
                        ...formAtelier.sections,
                        methodology: {
                          ...formAtelier.sections.methodology,
                          steps: [
                            ...current,
                            {
                              step: nextNum,
                              title: 'Nova Fase de Projecto',
                              subtitle: 'Subtítulo da Etapa',
                              desc: 'Descrição detalhada dos entregáveis e procedimentos desta fase...',
                            },
                          ],
                        },
                      },
                    });
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  <Icon icon="solar:add-circle-linear" width="14" />
                  <span>Adicionar Fase</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formAtelier.sections.methodology?.steps?.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-3 relative"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold px-2 py-0.5 bg-[#c6a87c]/20 text-[#9a733e] rounded">
                          Passo {step.step || idx + 1}
                        </span>
                        <input
                          type="text"
                          value={step.step || ''}
                          onChange={(e) => {
                            const updated = [...formAtelier.sections.methodology.steps];
                            updated[idx] = { ...updated[idx], step: e.target.value };
                            setFormAtelier({
                              ...formAtelier,
                              sections: {
                                ...formAtelier.sections,
                                methodology: { ...formAtelier.sections.methodology, steps: updated },
                              },
                            });
                          }}
                          placeholder="01"
                          className="w-14 px-2 py-1 bg-white border border-gray-300 rounded text-xs font-mono"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = formAtelier.sections.methodology.steps.filter((_, i) => i !== idx);
                          setFormAtelier({
                            ...formAtelier,
                            sections: {
                              ...formAtelier.sections,
                              methodology: { ...formAtelier.sections.methodology, steps: updated },
                            },
                          });
                        }}
                        className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                      >
                        <Icon icon="solar:trash-bin-trash-linear" width="16" />
                      </button>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-gray-700 mb-0.5">
                        Título da Etapa
                      </label>
                      <input
                        type="text"
                        value={step.title}
                        onChange={(e) => {
                          const updated = [...formAtelier.sections.methodology.steps];
                          updated[idx] = { ...updated[idx], title: e.target.value };
                          setFormAtelier({
                            ...formAtelier,
                            sections: {
                              ...formAtelier.sections,
                              methodology: { ...formAtelier.sections.methodology, steps: updated },
                            },
                          });
                        }}
                        className="w-full px-2.5 py-1.5 bg-white border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#c6a87c] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-gray-700 mb-0.5">
                        Subtítulo / Âmbito
                      </label>
                      <input
                        type="text"
                        value={step.subtitle || ''}
                        onChange={(e) => {
                          const updated = [...formAtelier.sections.methodology.steps];
                          updated[idx] = { ...updated[idx], subtitle: e.target.value };
                          setFormAtelier({
                            ...formAtelier,
                            sections: {
                              ...formAtelier.sections,
                              methodology: { ...formAtelier.sections.methodology, steps: updated },
                            },
                          });
                        }}
                        className="w-full px-2.5 py-1.5 bg-white border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#c6a87c] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-gray-700 mb-0.5">
                        Descrição do Processo
                      </label>
                      <textarea
                        rows={3}
                        value={step.desc}
                        onChange={(e) => {
                          const updated = [...formAtelier.sections.methodology.steps];
                          updated[idx] = { ...updated[idx], desc: e.target.value };
                          setFormAtelier({
                            ...formAtelier,
                            sections: {
                              ...formAtelier.sections,
                              methodology: { ...formAtelier.sections.methodology, steps: updated },
                            },
                          });
                        }}
                        className="w-full px-2.5 py-1.5 bg-white border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#c6a87c] focus:outline-none leading-relaxed"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 5. RESILIÊNCIA & CONFORTO (ARQUITECTURA TROPICAL) */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#c6a87c]"></span>
                  Secção .4 - Resiliência & Conforto (Arquitectura Tropical Bioclimática)
                </h2>
                <p className="text-xs text-gray-500">
                  Soluções passivas para o clima de Luanda: brise-soleils, ventilação cruzada e eficiência energética
                </p>
              </div>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formAtelier.sections.bioclimatic?.enabled ?? true}
                  onChange={() => toggleSection('bioclimatic')}
                  className="w-4 h-4 text-[#c6a87c] rounded focus:ring-[#c6a87c]"
                />
                <span className="text-xs font-medium text-gray-700">Secção Activa</span>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Tag da Secção
                </label>
                <input
                  type="text"
                  value={formAtelier.sections.bioclimatic?.tag || ''}
                  onChange={(e) =>
                    setFormAtelier({
                      ...formAtelier,
                      sections: {
                        ...formAtelier.sections,
                        bioclimatic: { ...formAtelier.sections.bioclimatic, tag: e.target.value },
                      },
                    })
                  }
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#c6a87c] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Título da Secção
                </label>
                <input
                  type="text"
                  value={formAtelier.sections.bioclimatic?.title || ''}
                  onChange={(e) =>
                    setFormAtelier({
                      ...formAtelier,
                      sections: {
                        ...formAtelier.sections,
                        bioclimatic: { ...formAtelier.sections.bioclimatic, title: e.target.value },
                      },
                    })
                  }
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#c6a87c] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Descrição do Conceito Bioclimático
              </label>
              <textarea
                rows={3}
                value={formAtelier.sections.bioclimatic?.description || ''}
                onChange={(e) =>
                  setFormAtelier({
                    ...formAtelier,
                    sections: {
                      ...formAtelier.sections,
                      bioclimatic: { ...formAtelier.sections.bioclimatic, description: e.target.value },
                    },
                  })
                }
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#c6a87c] focus:outline-none leading-relaxed"
              />
            </div>

            <ImagePickerInput
              label="Fotografia do Princípio Bioclimático"
              description="Imagem ilustrativa de fachada com sombreamento ou pátios de ventilação"
              value={formAtelier.sections.bioclimatic?.image || ''}
              onChange={(url) =>
                setFormAtelier({
                  ...formAtelier,
                  sections: {
                    ...formAtelier.sections,
                    bioclimatic: { ...formAtelier.sections.bioclimatic, image: url },
                  },
                })
              }
            />

            {/* Features (Protecção Solar, Ventilação, Gestão de Água) */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-700">
                  Pilares de Conforto Bioclimático ({formAtelier.sections.bioclimatic?.features?.length || 0})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const current = formAtelier.sections.bioclimatic?.features || [];
                    setFormAtelier({
                      ...formAtelier,
                      sections: {
                        ...formAtelier.sections,
                        bioclimatic: {
                          ...formAtelier.sections.bioclimatic,
                          features: [
                            ...current,
                            { title: 'Novo Pilar Bioclimático', desc: 'Explicação técnica...' },
                          ],
                        },
                      },
                    });
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  <Icon icon="solar:add-circle-linear" width="14" />
                  <span>Adicionar Pilar</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {formAtelier.sections.bioclimatic?.features?.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 space-y-2 relative"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-900">Pilar #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = formAtelier.sections.bioclimatic.features.filter((_, i) => i !== idx);
                          setFormAtelier({
                            ...formAtelier,
                            sections: {
                              ...formAtelier.sections,
                              bioclimatic: { ...formAtelier.sections.bioclimatic, features: updated },
                            },
                          });
                        }}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Icon icon="solar:trash-bin-trash-linear" width="14" />
                      </button>
                    </div>

                    <div>
                      <input
                        type="text"
                        value={feat.title}
                        onChange={(e) => {
                          const updated = [...formAtelier.sections.bioclimatic.features];
                          updated[idx] = { ...updated[idx], title: e.target.value };
                          setFormAtelier({
                            ...formAtelier,
                            sections: {
                              ...formAtelier.sections,
                              bioclimatic: { ...formAtelier.sections.bioclimatic, features: updated },
                            },
                          });
                        }}
                        placeholder="Título"
                        className="w-full px-2 py-1 bg-white border border-gray-300 rounded text-xs font-semibold"
                      />
                    </div>

                    <div>
                      <textarea
                        rows={2}
                        value={feat.desc}
                        onChange={(e) => {
                          const updated = [...formAtelier.sections.bioclimatic.features];
                          updated[idx] = { ...updated[idx], desc: e.target.value };
                          setFormAtelier({
                            ...formAtelier,
                            sections: {
                              ...formAtelier.sections,
                              bioclimatic: { ...formAtelier.sections.bioclimatic, features: updated },
                            },
                          });
                        }}
                        placeholder="Descrição técnica..."
                        className="w-full px-2 py-1 bg-white border border-gray-300 rounded text-xs leading-relaxed"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 6. CORPO TÉCNICO / EQUIPA MULTIDISCIPLINAR */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#c6a87c]"></span>
                  Secção .5 - Corpo Técnico & Equipa Multidisciplinar
                </h2>
                <p className="text-xs text-gray-500">
                  Arquitectos, directores de projecto, engenheiros de estruturas e coordenadores
                </p>
              </div>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formAtelier.sections.team?.enabled ?? true}
                  onChange={() => toggleSection('team')}
                  className="w-4 h-4 text-[#c6a87c] rounded focus:ring-[#c6a87c]"
                />
                <span className="text-xs font-medium text-gray-700">Secção Activa</span>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Tag da Secção
                </label>
                <input
                  type="text"
                  value={formAtelier.sections.team?.tag || ''}
                  onChange={(e) =>
                    setFormAtelier({
                      ...formAtelier,
                      sections: {
                        ...formAtelier.sections,
                        team: { ...formAtelier.sections.team, tag: e.target.value },
                      },
                    })
                  }
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#c6a87c] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Título da Secção
                </label>
                <input
                  type="text"
                  value={formAtelier.sections.team?.title || ''}
                  onChange={(e) =>
                    setFormAtelier({
                      ...formAtelier,
                      sections: {
                        ...formAtelier.sections,
                        team: { ...formAtelier.sections.team, title: e.target.value },
                      },
                    })
                  }
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#c6a87c] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Descrição Geral
              </label>
              <input
                type="text"
                value={formAtelier.sections.team?.description || ''}
                onChange={(e) =>
                  setFormAtelier({
                    ...formAtelier,
                    sections: {
                      ...formAtelier.sections,
                      team: { ...formAtelier.sections.team, description: e.target.value },
                    },
                  })
                }
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#c6a87c] focus:outline-none"
              />
            </div>

            {/* Team Members List */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-700">
                  Membros da Equipa ({formAtelier.sections.team?.members?.length || 0})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const current = formAtelier.sections.team?.members || [];
                    setFormAtelier({
                      ...formAtelier,
                      sections: {
                        ...formAtelier.sections,
                        team: {
                          ...formAtelier.sections.team,
                          members: [
                            ...current,
                            {
                              name: 'Novo Membro',
                              role: 'Cargo / Especialidade',
                              bio: 'Biografia e qualificações profissionais...',
                              image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
                            },
                          ],
                        },
                      },
                    });
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  <Icon icon="solar:add-circle-linear" width="14" />
                  <span>Adicionar Membro</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {formAtelier.sections.team?.members?.map((member, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-3 relative"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-900">Membro #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = formAtelier.sections.team.members.filter((_, i) => i !== idx);
                          setFormAtelier({
                            ...formAtelier,
                            sections: {
                              ...formAtelier.sections,
                              team: { ...formAtelier.sections.team, members: updated },
                            },
                          });
                        }}
                        className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                      >
                        <Icon icon="solar:trash-bin-trash-linear" width="16" />
                      </button>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-gray-700 mb-0.5">
                        Nome Completo
                      </label>
                      <input
                        type="text"
                        value={member.name}
                        onChange={(e) => {
                          const updated = [...formAtelier.sections.team.members];
                          updated[idx] = { ...updated[idx], name: e.target.value };
                          setFormAtelier({
                            ...formAtelier,
                            sections: {
                              ...formAtelier.sections,
                              team: { ...formAtelier.sections.team, members: updated },
                            },
                          });
                        }}
                        className="w-full px-2.5 py-1.5 bg-white border border-gray-300 rounded-lg text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-gray-700 mb-0.5">
                        Cargo / Título Profissional
                      </label>
                      <input
                        type="text"
                        value={member.role}
                        onChange={(e) => {
                          const updated = [...formAtelier.sections.team.members];
                          updated[idx] = { ...updated[idx], role: e.target.value };
                          setFormAtelier({
                            ...formAtelier,
                            sections: {
                              ...formAtelier.sections,
                              team: { ...formAtelier.sections.team, members: updated },
                            },
                          });
                        }}
                        className="w-full px-2.5 py-1.5 bg-white border border-gray-300 rounded-lg text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-gray-700 mb-0.5">
                        Biografia
                      </label>
                      <textarea
                        rows={3}
                        value={member.bio}
                        onChange={(e) => {
                          const updated = [...formAtelier.sections.team.members];
                          updated[idx] = { ...updated[idx], bio: e.target.value };
                          setFormAtelier({
                            ...formAtelier,
                            sections: {
                              ...formAtelier.sections,
                              team: { ...formAtelier.sections.team, members: updated },
                            },
                          });
                        }}
                        className="w-full px-2.5 py-1.5 bg-white border border-gray-300 rounded-lg text-xs leading-relaxed"
                      />
                    </div>

                    <ImagePickerInput
                      label="Fotografia do Perfil"
                      description="Retrato profissional de rosto ou meio-corpo"
                      value={member.image || ''}
                      onChange={(url) => {
                        const updated = [...formAtelier.sections.team.members];
                        updated[idx] = { ...updated[idx], image: url };
                        setFormAtelier({
                          ...formAtelier,
                          sections: {
                            ...formAtelier.sections,
                            team: { ...formAtelier.sections.team, members: updated },
                          },
                        });
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 7. ATENDIMENTO TÉCNICO PRESENCIAL (CTA FINAL) */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#c6a87c]"></span>
                  Secção .6 - Atendimento Técnico Presencial (CTA de Agendamento)
                </h2>
                <p className="text-xs text-gray-500">
                  Chamada para acção convidando para visita presencial ao atelier na Marginal de Luanda
                </p>
              </div>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formAtelier.sections.cta?.enabled ?? true}
                  onChange={() => toggleSection('cta')}
                  className="w-4 h-4 text-[#c6a87c] rounded focus:ring-[#c6a87c]"
                />
                <span className="text-xs font-medium text-gray-700">Secção Activa</span>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Tag da Secção
                </label>
                <input
                  type="text"
                  value={formAtelier.sections.cta?.tag || ''}
                  onChange={(e) =>
                    setFormAtelier({
                      ...formAtelier,
                      sections: {
                        ...formAtelier.sections,
                        cta: { ...formAtelier.sections.cta, tag: e.target.value },
                      },
                    })
                  }
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#c6a87c] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Título do CTA
                </label>
                <input
                  type="text"
                  value={formAtelier.sections.cta?.title || ''}
                  onChange={(e) =>
                    setFormAtelier({
                      ...formAtelier,
                      sections: {
                        ...formAtelier.sections,
                        cta: { ...formAtelier.sections.cta, title: e.target.value },
                      },
                    })
                  }
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#c6a87c] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Descrição do Convite
              </label>
              <textarea
                rows={2}
                value={formAtelier.sections.cta?.description || ''}
                onChange={(e) =>
                  setFormAtelier({
                    ...formAtelier,
                    sections: {
                      ...formAtelier.sections,
                      cta: { ...formAtelier.sections.cta, description: e.target.value },
                    },
                  })
                }
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#c6a87c] focus:outline-none leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Texto do Botão Principal (Dourado)
                </label>
                <input
                  type="text"
                  value={formAtelier.sections.cta?.buttonLabel || ''}
                  onChange={(e) =>
                    setFormAtelier({
                      ...formAtelier,
                      sections: {
                        ...formAtelier.sections,
                        cta: { ...formAtelier.sections.cta, buttonLabel: e.target.value },
                      },
                    })
                  }
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#c6a87c] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Texto do Botão Secundário
                </label>
                <input
                  type="text"
                  value={formAtelier.sections.cta?.secondaryButtonLabel || ''}
                  onChange={(e) =>
                    setFormAtelier({
                      ...formAtelier,
                      sections: {
                        ...formAtelier.sections,
                        cta: { ...formAtelier.sections.cta, secondaryButtonLabel: e.target.value },
                      },
                    })
                  }
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#c6a87c] focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: IDENTITY & HERO MEDIA */}
      {activeTab === 'identity' && (
        <div className="space-y-8">
          {/* Mídia da Hero (Vídeo ou Slideshow) */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs space-y-4">
            <div className="border-b border-gray-100 pb-3">
              <h2 className="text-base font-bold text-gray-900">
                Mídia Principal da Homepage (Hero)
              </h2>
              <p className="text-xs text-gray-500">
                Defina se a secção de destaque da homepage exibe um vídeo cinematográfico em loop ou um carrossel de fotografias
              </p>
            </div>

            <div className="flex items-center gap-4 pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="radio"
                  name="heroMediaType"
                  value="video"
                  checked={formInfo.heroMediaType === 'video'}
                  onChange={() => setFormInfo({ ...formInfo, heroMediaType: 'video' })}
                  className="text-[#c6a87c] focus:ring-[#c6a87c]"
                />
                <span className="text-xs font-semibold text-gray-800">
                  Vídeo de Arquitectura (MP4)
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="radio"
                  name="heroMediaType"
                  value="slideshow"
                  checked={formInfo.heroMediaType === 'slideshow'}
                  onChange={() => setFormInfo({ ...formInfo, heroMediaType: 'slideshow' })}
                  className="text-[#c6a87c] focus:ring-[#c6a87c]"
                />
                <span className="text-xs font-semibold text-gray-800">
                  Carrossel de Imagens em Alta Resolução
                </span>
              </label>
            </div>

            {formInfo.heroMediaType === 'video' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <ImagePickerInput
                  label="Ficheiro de Vídeo da Hero (MP4)"
                  description="Vídeo cinematográfico que roda em loop contínuo"
                  value={formInfo.heroVideoUrl || ''}
                  onChange={(url) => setFormInfo({ ...formInfo, heroVideoUrl: url })}
                  acceptedType="video"
                  placeholder="/videos/hero-interior.mp4"
                />

                <ImagePickerInput
                  label="Poster do Vídeo da Hero"
                  description="Imagem de pré-carregamento exibida antes do vídeo carregar"
                  value={formInfo.heroVideoPoster || ''}
                  onChange={(url) => setFormInfo({ ...formInfo, heroVideoPoster: url })}
                  acceptedType="image"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>
            ) : (
              <div className="pt-2">
                <ImagePickerInput
                  label="Fotografia de Capa Principal da Hero"
                  description="Imagem panorâmica de grande escala para a abertura da página"
                  value={formInfo.heroVideoPoster || ''}
                  onChange={(url) => setFormInfo({ ...formInfo, heroVideoPoster: url })}
                  acceptedType="image"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>
            )}
          </div>

          {/* Textos Institucionais & Manifesto */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs space-y-4">
            <div className="border-b border-gray-100 pb-3">
              <h2 className="text-base font-bold text-gray-900">
                Manifesto & Tagline do Atelier
              </h2>
              <p className="text-xs text-gray-500">
                Slogans e posicionamento institucional global
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Slogan Principal do Atelier (Brand Tagline)
                </label>
                <input
                  type="text"
                  value={formInfo.brandTagline}
                  onChange={(e) => setFormInfo({ ...formInfo, brandTagline: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#c6a87c] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Manifesto de Arquitectura
                </label>
                <textarea
                  rows={2}
                  value={formInfo.manifesto}
                  onChange={(e) => setFormInfo({ ...formInfo, manifesto: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#c6a87c] focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Save Button Bar at Bottom */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={() => handleSaveAll()}
          className="px-8 py-3 bg-[#111827] hover:bg-black text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer shadow-sm flex items-center gap-2"
          style={{ color: '#ffffff' }}
        >
          <Icon icon="solar:check-read-linear" width="18" style={{ color: '#ffffff' }} />
          <span style={{ color: '#ffffff' }}>Guardar Todas as Alterações da Página</span>
        </button>
      </div>
    </div>
  );
}
