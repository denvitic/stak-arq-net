import React, { useState, useEffect } from 'react';
import { useCms } from '../context/CmsContext';
import { NavPage } from '../types';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Calendar,
  Building,
  ArrowUpRight,
  ShieldCheck,
  HelpCircle,
  Instagram,
  Lock,
  Award
} from 'lucide-react';

interface ContactsPageProps {
  onNavigate: (page: NavPage) => void;
  preselectedService?: string;
}

export const ContactsPage: React.FC<ContactsPageProps> = ({
  onNavigate,
  preselectedService,
}) => {
  const { atelierInfo, addBriefing, pagesContent } = useCms();
  const contactsData = pagesContent?.contacts;
  const servicesData = pagesContent?.services;

  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    projectType: preselectedService || 'Moradia Residencial Unifamiliar',
    location: 'Luanda (Talatona / Miramar / Ilha)',
    estimatedArea: '300 m² a 600 m²',
    budgetRange: 'Segmento Alto Padrão',
    timeline: 'Início em 1 a 3 meses',
    description: '',
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, projectType: preselectedService }));
    }
  }, [preselectedService]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName || !formData.clientPhone) return;

    addBriefing({
      clientName: formData.clientName,
      clientEmail: formData.clientEmail,
      clientPhone: formData.clientPhone,
      projectType: formData.projectType,
      location: formData.location,
      estimatedArea: formData.estimatedArea,
      budgetRange: formData.budgetRange,
      timeline: formData.timeline,
      description: formData.description,
    });

    setSubmitted(true);
  };

  const cleanPhone = atelierInfo.whatsapp.replace(/\D/g, '');
  const whatsappBriefingUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `*Solicitação de Briefing Técnico - STAK Arquitectura*\n\n` +
      `*Nome:* ${formData.clientName || 'Cliente'}\n` +
      `*Telefone:* ${formData.clientPhone || 'Não informado'}\n` +
      `*Tipo de Obra:* ${formData.projectType}\n` +
      `*Localização:* ${formData.location}\n` +
      `*Área Estimada:* ${formData.estimatedArea}\n` +
      `*Descrição:* ${formData.description || 'Gostaria de agendar uma reunião técnica presencial.'}`
  )}`;

  const rawFaqs =
    servicesData?.sections?.faq?.items && servicesData.sections.faq.items.length > 0
      ? servicesData.sections.faq.items
      : [
          {
            q: 'Como funciona a primeira reunião no atelier STAK?',
            a: 'A primeira reunião serve para ouvir as aspirações do cliente, analisar a documentação topográfica ou predial do terreno e compreender as restrições regulamentares de Luanda. É uma reunião de diagnóstico sem custos.',
          },
          {
            q: 'O atelier STAK trata do licenciamento camarário no GPL?',
            a: 'Sim. Todos os nossos projectos de arquitectura são desenvolvidos de acordo com as normas municipais de Luanda e instruímos todo o processo de aprovação camarária e pedidos de viabilidade.',
          },
          {
            q: 'Fazem acompanhamento e fiscalização de obra presencial?',
            a: 'Sim. A direcção técnica de estaleiro é um dos nossos maiores pontos fortes. Não entregamos apenas pranchas de desenho: asseguramos visitas regulares ou permanentes para controlo milimétrico de armaduras, betão e acabamentos.',
          },
          {
            q: 'Desenvolvem projectos fora de Luanda?',
            a: 'Sim, realizamos obras e estudos em várias províncias de Angola (Huíla, Benguela, Cuanza Sul, Cabinda) e no exterior sob consulta prévia.',
          },
        ];

  const faqs = rawFaqs.map((f: any) => ({
    q: f.question || f.q || '',
    a: f.answer || f.a || '',
  }));

  return (
    <div className="min-h-screen bg-[#090a0c] text-[#e8e8ea] pb-20">
      {/* 1. Header with Featured Background Image */}
      {(contactsData?.hero?.enabled ?? true) && (
      <div className="page-hero-banner border-b border-white/10 relative min-h-[420px] sm:min-h-[480px] pt-28 sm:pt-36 pb-16 sm:pb-24 flex items-center overflow-hidden">
        {/* Background Image with Dark Vignette & Gradients */}
        <div className="absolute inset-0 z-0">
          <img
            src={contactsData?.hero?.bgImage || 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2000&q=85'}
            alt="Atendimento no Atelier STAK Arquitectura"
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
            <span className="text-white">{contactsData?.hero?.badge || 'Contactos & Ficha de Briefing'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight font-heading max-w-4xl leading-tight mb-6">
            {contactsData?.hero?.title || 'Inicie o diálogo com a direcção do atelier STAK.'}
          </h1>

          <p className="text-sm sm:text-lg text-[#d1d5db] max-w-3xl font-light leading-relaxed">
            {contactsData?.hero?.description ||
              'Seja para a concepção de uma moradia contemporânea, sede corporativa ou intervenção de interiores de alto padrão, estamos disponíveis para analisar o seu terreno e programa funcional.'}
          </p>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-8 pt-6 border-t border-white/10 text-xs font-mono">
            <span className="text-[#c6a87c]">Resposta Técnica em 48h</span>
            <span className="text-white/20">•</span>
            <span className="text-white">Reuniões Presenciais na Marginal de Luanda</span>
            <span className="text-white/20">•</span>
            <span className="text-[#9ca3af]">Total Sigilo & Confidencialidade</span>
          </div>
        </div>
      </div>
      )}

      {/* 2. Main Content Grid: Form + Direct Contact Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Interactive Briefing Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#111216] border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-8">
            <div>
              <span className="text-xs font-mono text-[#c6a87c] uppercase tracking-widest block mb-1">
                {contactsData?.sections?.briefingIntro?.tag || 'Formulário Oficial de Projecto'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading">
                {contactsData?.sections?.briefingIntro?.title || 'Ficha Técnica Preliminar de Briefing'}
              </h2>
              <p className="text-xs sm:text-sm text-[#9ca3af] mt-1 font-light">
                {contactsData?.sections?.briefingIntro?.description ||
                  'Preencha os dados abaixo para estruturarmos uma proposta metodológica e estimativa de cronograma.'}
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-xl font-bold text-white font-heading">
                  Briefing Recebido com Sucesso
                </h3>
                <p className="text-xs sm:text-sm text-[#d1d5db] leading-relaxed">
                  Obrigado, <strong className="text-white">{formData.clientName}</strong>. A nossa direcção técnica irá analisar as condicionantes do seu projecto e entrará em contacto dentro de 24 horas úteis.
                </p>
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href={whatsappBriefingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-[#25D366] text-black font-bold text-xs uppercase tracking-wider rounded-sm flex items-center gap-2"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    <span>Acelerar pelo WhatsApp</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider rounded-sm"
                  >
                    Novo Envio
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#8c909c] uppercase tracking-wider">
                      Nome Completo / Empresa *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.clientName}
                      onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                      placeholder="Ex: Dr. António Silva"
                      className="w-full bg-[#14151a] border border-white/10 rounded-sm px-4 py-3 text-xs text-white placeholder-[#6b7280] focus:border-[#c6a87c] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#8c909c] uppercase tracking-wider">
                      Telefone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.clientPhone}
                      onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                      placeholder="Ex: +244 928 000 000"
                      className="w-full bg-[#14151a] border border-white/10 rounded-sm px-4 py-3 text-xs text-white placeholder-[#6b7280] focus:border-[#c6a87c] focus:outline-none font-mono"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#8c909c] uppercase tracking-wider">
                    E-mail Institucional ou Pessoal
                  </label>
                  <input
                    type="email"
                    value={formData.clientEmail}
                    onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                    placeholder="Ex: contacto@cliente.ao"
                    className="w-full bg-[#14151a] border border-white/10 rounded-sm px-4 py-3 text-xs text-white placeholder-[#6b7280] focus:border-[#c6a87c] focus:outline-none"
                  />
                </div>

                {/* Project Type & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#8c909c] uppercase tracking-wider">
                      Tipo de Projecto *
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full bg-[#14151a] border border-white/10 rounded-sm px-4 py-3 text-xs text-white focus:border-[#c6a87c] focus:outline-none"
                    >
                      <option value="Moradia Residencial Unifamiliar">Moradia Residencial Unifamiliar</option>
                      <option value="Condomínio Residencial Fechado">Condomínio Residencial Fechado</option>
                      <option value="Edifício Comercial / Escritórios">Edifício Comercial / Escritórios</option>
                      <option value="Design de Interiores & Decoração">Design de Interiores & Decoração</option>
                      <option value="Loteamento Urbano & Masterplan">Loteamento Urbano & Masterplan</option>
                      <option value="Fiscalização & Direcção de Obra">Fiscalização & Direcção de Obra</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#8c909c] uppercase tracking-wider">
                      Localização Prevista do Terreno *
                    </label>
                    <select
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full bg-[#14151a] border border-white/10 rounded-sm px-4 py-3 text-xs text-white focus:border-[#c6a87c] focus:outline-none"
                    >
                      <option value="Luanda (Talatona / Cidade Financeira)">Luanda (Talatona / Cidade Financeira)</option>
                      <option value="Luanda (Miramar / Alvalade / Maianga)">Luanda (Miramar / Alvalade / Maianga)</option>
                      <option value="Luanda (Ilha de Luanda / Marginal)">Luanda (Ilha de Luanda / Marginal)</option>
                      <option value="Luanda (Benfica / Mussulo / Morro Bento)">Luanda (Benfica / Mussulo / Morro Bento)</option>
                      <option value="Luanda (Camama / Kilamba / Viana)">Luanda (Camama / Kilamba / Viana)</option>
                      <option value="Outra Província (Benguela / Huíla / etc.)">Outra Província (Benguela / Huíla / etc.)</option>
                      <option value="Exterior de Angola">Exterior de Angola</option>
                    </select>
                  </div>
                </div>

                {/* Estimated Area & Timeline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#8c909c] uppercase tracking-wider">
                      Área Estimada de Construção
                    </label>
                    <select
                      value={formData.estimatedArea}
                      onChange={(e) => setFormData({ ...formData, estimatedArea: e.target.value })}
                      className="w-full bg-[#14151a] border border-white/10 rounded-sm px-4 py-3 text-xs text-white focus:border-[#c6a87c] focus:outline-none"
                    >
                      <option value="Até 250 m²">Até 250 m²</option>
                      <option value="250 m² a 500 m²">250 m² a 500 m²</option>
                      <option value="500 m² a 1.000 m²">500 m² a 1.000 m²</option>
                      <option value="Mais de 1.000 m²">Mais de 1.000 m²</option>
                      <option value="Masterplan / Terreno Inteiro">Masterplan / Terreno Inteiro</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#8c909c] uppercase tracking-wider">
                      Previsão de Início
                    </label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full bg-[#14151a] border border-white/10 rounded-sm px-4 py-3 text-xs text-white focus:border-[#c6a87c] focus:outline-none"
                    >
                      <option value="Imediato (em 30 dias)">Imediato (em 30 dias)</option>
                      <option value="Em 1 a 3 meses">Em 1 a 3 meses</option>
                      <option value="Em 3 a 6 meses">Em 3 a 6 meses</option>
                      <option value="Fase de planeamento a longo prazo">Fase de planeamento a longo prazo</option>
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#8c909c] uppercase tracking-wider">
                    Descrição do Programa & Necessidades Específicas
                  </label>
                  <textarea
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Descreva detalhes como: número de suites, piscinas, escritórios, estilo arquitetónico pretendido ou se já possui topografia..."
                    className="w-full bg-[#14151a] border border-white/10 rounded-sm px-4 py-3 text-xs text-white placeholder-[#6b7280] focus:border-[#c6a87c] focus:outline-none"
                  />
                </div>

                {/* Buttons */}
                <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-4 bg-[#c6a87c] hover:bg-[#d8bb90] text-black font-bold text-xs uppercase tracking-wider rounded-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  >
                    <span>Submeter Briefing ao Atelier</span>
                    <Send className="w-4 h-4" />
                  </button>

                  <a
                    href={whatsappBriefingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-4 bg-white/5 hover:bg-white/15 text-white border border-white/10 text-xs font-semibold uppercase tracking-wider rounded-sm transition-all flex items-center justify-center gap-2"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                    <span>Enviar via WhatsApp Directo</span>
                  </a>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Atelier Contact Information & Map (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Sede Contact Info */}
            {(contactsData?.sections?.info?.enabled !== false) && (
            <div className="bg-[#111216] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
              <span className="text-xs font-mono text-[#c6a87c] uppercase tracking-widest block">
                {contactsData?.sections?.info?.tag || 'Atelier Central'}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-heading">
                {contactsData?.sections?.info?.title || 'Sede em Luanda, Angola'}
              </h3>

              <div className="space-y-4 text-xs text-[#d1d5db]">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#c6a87c] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Localização do Atelier</div>
                    <div className="text-[#9ca3af]">{contactsData?.sections?.info?.address || atelierInfo.locationAddress}</div>
                    <div className="text-[#9ca3af]">{atelierInfo.city} - {atelierInfo.country}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#25D366] shrink-0 mt-0.5">
                    <WhatsAppIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Atendimento WhatsApp & Voz</div>
                    <div className="font-mono text-white mt-0.5">{contactsData?.sections?.info?.phone || atelierInfo.phone}</div>
                    <div className="text-[#8c909c] text-[11px]">Canal directo da direcção técnica</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#c6a87c] shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Correspondência Electrónica</div>
                    <div className="text-[#9ca3af]">{contactsData?.sections?.info?.email || atelierInfo.email}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#c6a87c] shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Horário de Atendimento</div>
                    <div className="text-[#9ca3af]">{contactsData?.sections?.info?.workingHours || atelierInfo.workingHours}</div>
                    <div className="text-[#8c909c] text-[11px]">{contactsData?.sections?.info?.receptionNotice || 'Reuniões presenciais sob agendamento'}</div>
                  </div>
                </div>
              </div>
            </div>
            )}

            {/* Stylized Architectural Map Card */}
            <div className="bg-[#111216] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
              <div className="relative aspect-[16/9] bg-[#171820] flex items-center justify-center overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1000&q=80"
                  alt="Luanda Map Concept"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-35 filter grayscale contrast-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111216] via-transparent to-transparent" />

                <div className="absolute text-center p-4">
                  <div className="w-10 h-10 rounded-full bg-[#c6a87c] text-black flex items-center justify-center mx-auto shadow-lg mb-2 animate-bounce">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="text-white font-bold font-heading text-sm">
                    STAK Arquitectura Sede
                  </div>
                  <div className="text-[#c6a87c] text-xs font-mono">
                    Marginal de Luanda, Angola
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-white/10 text-center">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent('Avenida 4 de Fevereiro, Marginal de Luanda, Angola')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#c6a87c] hover:underline inline-flex items-center gap-1 font-medium"
                >
                  <span>Abrir coordenadas no Google Maps</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Protocolo de Atendimento Presencial & Confidencialidade */}
      <section className="py-14 bg-[#0a0b0e] border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-[#12141a] via-[#161822] to-[#12141a] border border-[#c6a87c]/30 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-[#c6a87c]/10 text-[#c6a87c] shrink-0 border border-[#c6a87c]/20">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white font-heading">
                  Sigilo & Acordo de Confidencialidade (NDA)
                </h4>
                <p className="text-xs text-[#9ca3af] mt-1 font-light leading-relaxed">
                  Protecção jurídica integral de património, plantas de segurança e dados orçamentais de clientes privados e institucionais.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-[#c6a87c]/10 text-[#c6a87c] shrink-0 border border-[#c6a87c]/20">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white font-heading">
                  Sala de Decisão Técnica na Marginal
                </h4>
                <p className="text-xs text-[#9ca3af] mt-1 font-light leading-relaxed">
                  Apresentações em ecrã de grande formato com navegação 3D em tempo real e mostruário físico de mármores e madeiras.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-[#c6a87c]/10 text-[#c6a87c] shrink-0 border border-[#c6a87c]/20">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white font-heading">
                  Parecer Prévio em 48 Horas
                </h4>
                <p className="text-xs text-[#9ca3af] mt-1 font-light leading-relaxed">
                  Após recepção do croquis de localização ou planta topográfica, emitimos nota preliminar de viabilidade construtiva.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Perguntas Frequentes (FAQ) */}
      {(servicesData?.sections?.faq?.enabled ?? true) && (
        <section className="py-20 bg-[#0c0d10] border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-12">
              <div className="text-xs font-mono text-[#c6a87c] uppercase tracking-widest mb-2 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4" />
                <span>Esclarecimentos Frequentes</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-white font-heading">
                Perguntas frequentes sobre contratação de projectos.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-xl bg-[#111216] border border-white/10 space-y-2.5"
                >
                  <h3 className="text-base font-bold text-white font-heading flex items-start gap-2">
                    <span className="text-[#c6a87c] font-mono">0{idx + 1}.</span>
                    <span>{faq.q}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed font-light pl-6">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
