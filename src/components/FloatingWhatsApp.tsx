import React, { useState } from 'react';
import { useCms } from '../context/CmsContext';
import { WhatsAppIcon } from './WhatsAppIcon';

export const FloatingWhatsApp: React.FC = () => {
  const { atelierInfo } = useCms();
  const [showTooltip, setShowTooltip] = useState(false);

  const cleanPhone = atelierInfo.whatsapp.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    'Olá atelier STAK Arquitectura, gostaria de solicitar informações e agendar uma reunião de briefing para um projecto.'
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Tooltip / Prompt bubble on desktop */}
      <div
        className={`hidden sm:flex items-center gap-2 bg-[#111216] border border-white/15 text-white px-4 py-2.5 rounded-full shadow-2xl text-xs font-medium transition-all duration-300 ${
          showTooltip ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none'
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
        <span className="text-[#e8e8ea]">Atendimento Directo • WhatsApp</span>
      </div>

      {/* Floating Action Button */}
      <a
        id="btn-floating-whatsapp"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-[0_8px_25px_rgba(37,211,102,0.4)] hover:shadow-[0_12px_32px_rgba(37,211,102,0.55)] transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#25D366]/30 cursor-pointer"
        aria-label="Falar com o Atelier STAK no WhatsApp"
      >
        {/* Pulsing ring effect */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none group-hover:opacity-0" />

        <WhatsAppIcon className="w-7 h-7 text-white fill-white relative z-10 transition-transform group-hover:scale-110" />

        {/* Status notification dot */}
        <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-white border-2 border-[#25D366] rounded-full" />
      </a>
    </div>
  );
};

