import React from 'react';
import { useCms } from '../context/CmsContext';
import { Compass, Layers, ShieldCheck, SunDim, Award, Users2, CheckCircle2 } from 'lucide-react';

export const AtelierSection: React.FC = () => {
  const { atelierInfo } = useCms();

  const pillars = [
    {
      icon: Compass,
      title: 'Sobriedade Espacial',
      desc: 'Eliminamos o supérfluo para evidenciar a pureza das linhas, a proporção áurea e o diálogo generoso entre cheios e vazios.',
    },
    {
      icon: SunDim,
      title: 'Arquitectura Bioclimática',
      desc: 'Estudo profundo de insolação, ventilação cruzada e brise-soleils, criando ambientes frescos e eficientes para o clima tropical de Luanda.',
    },
    {
      icon: ShieldCheck,
      title: 'Rigor Construtivo & Fiscalização',
      desc: 'Do estudo prévio à execução no terreno, asseguramos compatibilização milimétrica de engenharias e cumprimento dos cadernos de encargos.',
    },
    {
      icon: Layers,
      title: 'Curadoria de Materiais Nobres',
      desc: 'Madeiras nobres com tratamentos marítimos, betão aparente, pedras naturais e caixilharia de alto isolamento termoacústico.',
    },
  ];

  const team = [
    {
      name: 'Arq. Sérgio K.',
      role: 'Sócio Fundador & Arquitecto Principal',
      credentials: 'Mestrado em Arquitectura e Urbanismo, 15+ anos de prática em projectos de luxo em Luanda e Portugal.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Dra. Tatiana Mendes',
      role: 'Directora de Design de Interiores',
      credentials: 'Especialista em iluminação cénica e marcenaria de autor para residências e espaços corporativos VIP.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Eng. Carlos Van-Dúnem',
      role: 'Coordenador de Fiscalização & Estruturas',
      credentials: 'Mais de 100.000 m² de obras fiscalizadas com garantia de rigor técnico e conformidade com normas angolanas.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <section id="atelier" className="py-24 sm:py-32 bg-[#0c0d0f] border-t border-white/5 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-[#c6a87c]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#c6a87c] tracking-[0.25em] uppercase mb-3">
            <span>O Atelier</span>
            <span>/</span>
            <span>Quem Somos</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading leading-tight mb-6">
            Uma assinatura arquitectónica que transcende o tempo.
          </h2>
          <p className="text-base sm:text-lg text-[#a2a6b2] leading-relaxed font-light">
            A <strong className="text-white font-medium">STAK Arquitectura & Designer de Interiores</strong> é um gabinete
            sediado em Luanda que combina erudição técnica, sensibilidade artística e rigor construtivo para conceber
            espaços memoráveis, sustentáveis e funcionais em Angola.
          </p>
        </div>

        {/* Two-column Story & Architectural Manifesto */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-6 relative">
            <div className="aspect-[4/3] rounded-lg overflow-hidden border border-white/10 shadow-2xl relative group">
              <img
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80"
                alt="Atelier STAK Ambiente e Concepção"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter brightness-[0.85] transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#c6a87c]">
                  Filosofia de Concepção
                </span>
                <p className="text-sm sm:text-base text-white font-serif italic mt-1 leading-snug">
                  "A boa arquitectura não se impõe ao lugar: ela revela a melhor versão do sítio onde é edificada."
                </p>
              </div>
            </div>
            {/* Stamp Badge */}
            <div className="absolute -bottom-6 -right-6 hidden sm:flex items-center gap-3 bg-[#16171b] border border-[#c6a87c]/40 p-4 rounded-lg shadow-2xl">
              <Award className="w-8 h-8 text-[#c6a87c]" />
              <div>
                <div className="text-xs font-bold text-white uppercase tracking-wider font-heading">
                  Excelência em Angola
                </div>
                <div className="text-[10px] text-[#9ca3af]">Selo Denvitic de Qualidade</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            <h3 className="text-2xl font-bold text-white font-heading">
              Do esboço prévio à fiscalização presencial da última pedra.
            </h3>
            
            <p className="text-sm sm:text-base text-[#9ca3af] leading-relaxed font-light">
              Entendemos que um projecto em Luanda requer uma resposta personalizada aos desafios climáticos, às
              especificidades dos terrenos e aos trâmites administrativos de licenciamento camarário.
            </p>

            <p className="text-sm sm:text-base text-[#9ca3af] leading-relaxed font-light">
              Não somos apenas desenhadores de plantas: somos parceiros estratégicos de promotores imobiliários, investidores
              corporativos e famílias exigentes que valorizam segurança jurídica, cronogramas cumpridos e património de
              alto valor venal.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#c6a87c] shrink-0 mt-1" />
                <span className="text-xs text-[#d1d5db]">Coordenação integral de todas as engenharias</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#c6a87c] shrink-0 mt-1" />
                <span className="text-xs text-[#d1d5db]">Renders 3D fotorrealistas em ultra-definição</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#c6a87c] shrink-0 mt-1" />
                <span className="text-xs text-[#d1d5db]">Acompanhamento e fiscalização rigorosa no terreno</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#c6a87c] shrink-0 mt-1" />
                <span className="text-xs text-[#d1d5db]">Controlo de custos e medições discriminadas</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Architectural Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="bg-[#121317] border border-white/5 p-6 rounded-lg hover:border-[#c6a87c]/40 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-md bg-[#1d1f25] border border-white/10 flex items-center justify-center text-[#c6a87c] mb-5 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-white font-heading mb-2">
                  {pillar.title}
                </h4>
                <p className="text-xs text-[#9ca3af] leading-relaxed font-light">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Technical Leadership Team */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
            <div>
              <div className="text-xs font-mono text-[#c6a87c] tracking-widest uppercase mb-1">
                Liderança Técnica
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading">
                A equipa por detrás de cada traço.
              </h3>
            </div>
            <div className="text-xs text-[#9ca3af] mt-2 sm:mt-0 flex items-center gap-1.5">
              <Users2 className="w-4 h-4 text-[#c6a87c]" />
              <span>Gabinete multidisciplinar de arquitectura e engenharia</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-[#111216] border border-white/10 rounded-lg overflow-hidden group hover:border-[#c6a87c]/50 transition-all duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden bg-black/40">
                  <img
                    src={member.image}
                    alt={member.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top filter grayscale contrast-110 transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                  />
                </div>
                <div className="p-5">
                  <h4 className="text-lg font-bold text-white font-heading">{member.name}</h4>
                  <div className="text-xs text-[#c6a87c] font-medium tracking-wide mb-2.5">{member.role}</div>
                  <p className="text-xs text-[#9ca3af] leading-relaxed font-light">{member.credentials}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
