import React, { useState, useEffect } from 'react';
import { useCms } from '../context/CmsContext';
import { WhatsAppIcon } from './WhatsAppIcon';
import {
  Send,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  Building2,
  FileCheck
} from 'lucide-react';

interface BriefingFormSectionProps {
  initialProjectType?: string;
}

export const BriefingFormSection: React.FC<BriefingFormSectionProps> = ({
  initialProjectType,
}) => {
  const { addBriefing, atelierInfo } = useCms();

  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    projectType: 'Moradia Unifamiliar Contemporânea',
    location: 'Luanda - Talatona',
    estimatedArea: '',
    budgetRange: 'Alto Padrão',
    timeline: 'Início nos próximos 3 meses',
    description: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [lastSubmissionId, setLastSubmissionId] = useState<string | null>(null);

  useEffect(() => {
    if (initialProjectType) {
      setFormData((prev) => ({ ...prev, projectType: initialProjectType }));
    }
  }, [initialProjectType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName || !formData.clientPhone) return;

    addBriefing({
      clientName: formData.clientName,
      clientEmail: formData.clientEmail,
      clientPhone: formData.clientPhone,
      projectType: formData.projectType,
      location: formData.location,
      estimatedArea: formData.estimatedArea || 'Não especificada',
      budgetRange: formData.budgetRange,
      timeline: formData.timeline,
      description: formData.description || 'Sem notas adicionais.',
    });

    setSubmitted(true);
    setLastSubmissionId('STK-' + Math.floor(1000 + Math.random() * 9000));
  };

  const cleanPhone = atelierInfo.whatsapp.replace(/\D/g, '');
  const whatsappMessage = `*SOLICITAÇÃO DE BRIEFING - STAK ARQUITECTURA*\n\n` +
    `*Cliente:* ${formData.clientName}\n` +
    `*Contacto:* ${formData.clientPhone}\n` +
    `*Tipo de Projecto:* ${formData.projectType}\n` +
    `*Localização:* ${formData.location}\n` +
    `*Área Estimada:* ${formData.estimatedArea || 'A definir'} m²\n` +
    `*Observações:* ${formData.description || 'Gostaria de agendar reunião técnica.'}`;

  const directWhatsAppUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section id="contactos" className="py-24 sm:py-32 bg-[#090a0c] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#c6a87c] tracking-[0.25em] uppercase mb-3">
            <span>Iniciar Projecto</span>
            <span>/</span>
            <span>Contactos & Briefing</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading leading-tight mb-4">
            Dê o primeiro passo para concretizar a sua obra.
          </h2>
          <p className="text-sm sm:text-base text-[#9ca3af] font-light">
            Preencha o formulário de briefing para que a nossa direcção técnica analise o seu programa funcional e apresente
            uma proposta de estudo prévio à medida.
          </p>
        </div>

        {/* 2-Columns: Briefing Form & Contact Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Briefing Form Column (7 cols) */}
          <div className="lg:col-span-7 bg-[#111216] border border-white/10 rounded-xl p-6 sm:p-10 shadow-2xl">
            {submitted ? (
              <div className="text-center py-10 space-y-6">
                <div className="w-16 h-16 rounded-full bg-[#c6a87c]/20 border border-[#c6a87c] flex items-center justify-center mx-auto text-[#c6a87c]">
                  <FileCheck className="w-8 h-8" />
                </div>

                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-[#c6a87c] mb-1">
                    Registo {lastSubmissionId}
                  </div>
                  <h3 className="text-2xl font-bold text-white font-heading">
                    Briefing Recebido com Sucesso!
                  </h3>
                  <p className="text-sm text-[#9ca3af] mt-2 max-w-md mx-auto leading-relaxed">
                    Obrigado, <strong className="text-white">{formData.clientName}</strong>. A nossa equipa entrará em contacto
                    em até 24 horas úteis para validar o programa e agendar a reunião de diagnóstico.
                  </p>
                </div>

                {/* WhatsApp Quick Link with preformatted message */}
                <div className="p-4 rounded-lg bg-white/5 border border-white/10 max-w-md mx-auto">
                  <p className="text-xs text-[#d1d5db] mb-3">
                    Prefere uma resposta imediata? Envie o resumo directamente ao arquitecto de plantão:
                  </p>
                  <a
                    href={directWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-sm bg-[#25D366] hover:bg-[#20ba59] text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    <span>Enviar Briefing via WhatsApp</span>
                  </a>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      clientName: '',
                      clientEmail: '',
                      clientPhone: '',
                      projectType: 'Moradia Unifamiliar Contemporânea',
                      location: 'Luanda - Talatona',
                      estimatedArea: '',
                      budgetRange: 'Alto Padrão',
                      timeline: 'Início nos próximos 3 meses',
                      description: '',
                    });
                  }}
                  className="text-xs text-[#c6a87c] hover:underline"
                >
                  Submeter outro briefing de projecto
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="border-b border-white/10 pb-4 mb-6">
                  <h3 className="text-xl font-bold text-white font-heading">
                    Ficha de Briefing de Projecto
                  </h3>
                  <p className="text-xs text-[#9ca3af] mt-1">
                    Forneça os detalhes preliminares do terreno e objectivos.
                  </p>
                </div>

                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#d1d5db] mb-2">
                      Nome Completo / Empresa *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Manuel Domingos ou Imobiliária XYZ"
                      value={formData.clientName}
                      onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                      className="w-full bg-[#18191f] border border-white/10 rounded-sm px-4 py-3 text-xs text-white placeholder-[#6b7280] focus:border-[#c6a87c] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#d1d5db] mb-2">
                      Telefone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+244 923 000 000"
                      value={formData.clientPhone}
                      onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                      className="w-full bg-[#18191f] border border-white/10 rounded-sm px-4 py-3 text-xs text-white placeholder-[#6b7280] focus:border-[#c6a87c] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Email & Project Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#d1d5db] mb-2">
                      E-mail para Envio da Proposta
                    </label>
                    <input
                      type="email"
                      placeholder="seu.email@exemplo.ao"
                      value={formData.clientEmail}
                      onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                      className="w-full bg-[#18191f] border border-white/10 rounded-sm px-4 py-3 text-xs text-white placeholder-[#6b7280] focus:border-[#c6a87c] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#d1d5db] mb-2">
                      Tipologia de Projecto
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full bg-[#18191f] border border-white/10 rounded-sm px-4 py-3 text-xs text-white focus:border-[#c6a87c] focus:outline-none"
                    >
                      <option value="Moradia Unifamiliar Contemporânea">Moradia Unifamiliar de Luxo</option>
                      <option value="Condomínio Residencial Fechado">Condomínio Residencial Fechado</option>
                      <option value="Edifício Corporativo / Escritórios">Edifício Corporativo / Escritórios</option>
                      <option value="Espaço Comercial / Retail / Showroom">Espaço Comercial / Retail / Showroom</option>
                      <option value="Design de Interiores & Marcenaria">Design de Interiores & Marcenaria</option>
                      <option value="Urbanismo & Masterplanning">Urbanismo & Masterplanning</option>
                      <option value="Fiscalização & Licenciamento de Obra">Fiscalização & Licenciamento de Obra</option>
                    </select>
                  </div>
                </div>

                {/* Location & Estimated Area */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#d1d5db] mb-2">
                      Localização do Imóvel / Terreno
                    </label>
                    <select
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full bg-[#18191f] border border-white/10 rounded-sm px-4 py-3 text-xs text-white focus:border-[#c6a87c] focus:outline-none"
                    >
                      <option value="Luanda - Talatona">Luanda - Talatona</option>
                      <option value="Luanda - Miramar">Luanda - Miramar</option>
                      <option value="Luanda - Ilha de Luanda">Luanda - Ilha do Cabo</option>
                      <option value="Luanda - Benfica / Luanda Sul">Luanda - Benfica / Luanda Sul</option>
                      <option value="Luanda - Cidade Alta / Centro">Luanda - Centro Histórico</option>
                      <option value="Luanda - Cidade do Kilamba">Luanda - Kilamba</option>
                      <option value="Benguela / Lobito">Benguela / Lobito</option>
                      <option value="Huíla / Lubango">Huíla / Lubango</option>
                      <option value="Outra Província de Angola">Outra Província de Angola</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#d1d5db] mb-2">
                      Área Estimada (m² de construção ou terreno)
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: 650 m²"
                      value={formData.estimatedArea}
                      onChange={(e) => setFormData({ ...formData, estimatedArea: e.target.value })}
                      className="w-full bg-[#18191f] border border-white/10 rounded-sm px-4 py-3 text-xs text-white placeholder-[#6b7280] focus:border-[#c6a87c] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <label className="block text-xs font-medium text-[#d1d5db] mb-2">
                    Previsão para Início do Projecto
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full bg-[#18191f] border border-white/10 rounded-sm px-4 py-3 text-xs text-white focus:border-[#c6a87c] focus:outline-none"
                  >
                    <option value="Imediato (Nas próximas semanas)">Imediato (Nas próximas semanas)</option>
                    <option value="Início nos próximos 3 meses">Início nos próximos 3 meses</option>
                    <option value="Fase de Estudo e Orçamentação (6 meses)">Fase de Estudo e Orçamentação (6 meses)</option>
                    <option value="Aquisição de Terreno em Curso">Aquisição de Terreno em Curso</option>
                  </select>
                </div>

                {/* Project Description / Notes */}
                <div>
                  <label className="block text-xs font-medium text-[#d1d5db] mb-2">
                    Descreva os seus objectivos e programa desejado
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Ex: Pretendo uma moradia moderna com 4 suítes, escritório, área gourmet externa com piscina e painéis solares integrados..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-[#18191f] border border-white/10 rounded-sm p-4 text-xs text-white placeholder-[#6b7280] focus:border-[#c6a87c] focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#c6a87c] hover:bg-[#d8bb90] text-black font-bold text-xs uppercase tracking-[0.18em] rounded-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-xl"
                >
                  <Send className="w-4 h-4" />
                  <span>Submeter Briefing & Solicitar Contacto</span>
                </button>
              </form>
            )}
          </div>

          {/* Contact Details & Atelier Location Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Channels Card */}
            <div className="bg-[#111216] border border-white/10 rounded-xl p-6 sm:p-8">
              <h3 className="text-xl font-bold text-white font-heading mb-6">
                Canais de Atendimento Directo
              </h3>

              <div className="space-y-6">
                {/* WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-md bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center text-[#25D366] shrink-0">
                    <WhatsAppIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-[#9ca3af] uppercase tracking-wider">
                      WhatsApp Institucional
                    </div>
                    <a
                      href={directWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-mono font-bold text-white hover:text-[#25D366] transition-colors flex items-center gap-1.5 mt-0.5"
                    >
                      <span>{atelierInfo.phone}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                    <p className="text-[11px] text-[#6b7280] mt-0.5">
                      Canal imediato para envio de plantas e consultas
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-[#c6a87c] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-[#9ca3af] uppercase tracking-wider">
                      Correio Electrónico
                    </div>
                    <a
                      href={`mailto:${atelierInfo.email}`}
                      className="text-sm font-medium text-white hover:text-[#c6a87c] transition-colors mt-0.5 block"
                    >
                      {atelierInfo.email}
                    </a>
                    <p className="text-[11px] text-[#6b7280] mt-0.5">
                      Para envio formal de concursos e dossiers técnicos
                    </p>
                  </div>
                </div>

                {/* Office Location */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-[#c6a87c] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-[#9ca3af] uppercase tracking-wider">
                      Sede do Atelier
                    </div>
                    <div className="text-sm text-white font-medium mt-0.5">
                      {atelierInfo.locationAddress}
                    </div>
                    <div className="text-xs text-[#c6a87c] mt-0.5 font-medium">
                      {atelierInfo.city}, {atelierInfo.country}
                    </div>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-[#c6a87c] shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-[#9ca3af] uppercase tracking-wider">
                      Horário de Funcionamento
                    </div>
                    <div className="text-xs text-white/90 mt-0.5">
                      {atelierInfo.workingHours}
                    </div>
                    <div className="text-[11px] text-[#6b7280] mt-0.5">
                      Reuniões presenciais sob agendamento prévio
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stylized Architectural Map of Luanda */}
            <div className="bg-[#111216] border border-white/10 rounded-xl overflow-hidden shadow-lg p-5">
              <div className="flex items-center justify-between mb-3 text-xs">
                <span className="font-mono text-[#c6a87c] uppercase tracking-wider">
                  Luanda • Coordenadas de Localização
                </span>
                <span className="text-[#9ca3af]">8° 48' S, 13° 14' E</span>
              </div>

              {/* Minimalist Vector Map Canvas representing Luanda Coastline & Downtown */}
              <div className="relative aspect-[16/9] rounded-lg bg-[#181920] border border-white/10 overflow-hidden flex items-center justify-center">
                {/* Coastal silhouette SVG */}
                <svg className="w-full h-full opacity-35" viewBox="0 0 400 200" fill="none">
                  {/* Ocean wave contour */}
                  <path
                    d="M 0 40 Q 100 10, 160 50 T 260 120 T 400 160 L 400 200 L 0 200 Z"
                    fill="#1e293b"
                  />
                  {/* Ilha de Luanda sandbar contour */}
                  <path
                    d="M 120 20 Q 220 50 300 90"
                    stroke="#c6a87c"
                    strokeWidth="4"
                    strokeDasharray="4 4"
                  />
                  {/* Grid lines */}
                  <line x1="0" y1="100" x2="400" y2="100" stroke="#334155" strokeWidth="0.5" />
                  <line x1="200" y1="0" x2="200" y2="200" stroke="#334155" strokeWidth="0.5" />
                </svg>

                {/* Studio Pin Indicator */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-[#c6a87c]/30 animate-ping absolute inset-0" />
                    <div className="w-8 h-8 rounded-full bg-[#c6a87c] text-black flex items-center justify-center font-bold text-xs relative shadow-lg">
                      <Building2 className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="bg-black/90 backdrop-blur-md px-3 py-1 rounded border border-[#c6a87c]/50 text-[10px] text-white font-mono mt-1.5 whitespace-nowrap shadow-xl">
                    STAK Atelier • Marginal de Luanda
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
