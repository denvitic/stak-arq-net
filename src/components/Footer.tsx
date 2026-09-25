import React from 'react';
import { LogoStak } from './LogoStak';
import { useCms } from '../context/CmsContext';
import { NavPage } from '../types';
import { ArrowUp, Mail, MapPin, Lock, Instagram, Linkedin, Facebook } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

interface FooterProps {
  onNavigate: (page: NavPage) => void;
  onOpenBriefing: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBriefing }) => {
  const { atelierInfo, pagesContent } = useCms();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLink = (page: NavPage) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();
  const cleanPhone = atelierInfo.whatsapp.replace(/\D/g, '');
  const cleanInstagram = (pagesContent.navigation?.footer?.socialLinks?.instagram || atelierInfo.instagram).replace(/^@/, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    'Olá atelier STAK Arquitectura, gostaria de solicitar informações e agendar uma reunião de briefing para um projecto.'
  )}`;

  const footerNav = pagesContent.navigation?.footer || {
    manifesto:
      'Gabinete de arquitectura de autor e design de ambientes de alto padrão em Luanda. Distinção estética, sustentabilidade bioclimática e rigor de execução do estudo prévio à fiscalização de obra.',
    socialLinks: {
      instagram: atelierInfo.instagram,
      whatsapp: atelierInfo.whatsapp,
      linkedin: atelierInfo.linkedin,
      facebook: atelierInfo.facebook,
    },
    navLinks: [
      { label: 'Página Inicial', page: 'inicio' as NavPage },
      { label: 'O Atelier (Sobre Nós)', page: 'sobre-nos' as NavPage },
      { label: 'Projectos & Obras', page: 'projectos' as NavPage },
      { label: 'Especialidades', page: 'servicos' as NavPage },
      { label: 'Publicações & Notícias', page: 'artigos' as NavPage },
      { label: 'Contactos & Briefing', page: 'contactos' as NavPage },
    ],
    copyrightNotice: `© ${currentYear} ${atelierInfo.name}. Todos os direitos reservados.`,
    showRestrictedArea: true,
  };

  return (
    <footer className="bg-[#060708] border-t border-white/10 text-white pt-20 pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Col 1: Logo, Manifesto & Social Media (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <button
              type="button"
              onClick={() => handleLink('inicio')}
              className="text-left cursor-pointer"
            >
              <LogoStak variant="auto" size="md" />
            </button>
            <p className="text-xs text-[#9ca3af] leading-relaxed font-light max-w-sm">
              {footerNav.manifesto ||
                'Gabinete de arquitectura de autor e design de ambientes de alto padrão em Luanda. Distinção estética, sustentabilidade bioclimática e rigor de execução do estudo prévio à fiscalização de obra.'}
            </p>

            {/* Social Media Channels */}
            <div className="space-y-3 pt-1">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#c6a87c] block">
                Redes Sociais & Canais
              </span>
              <div className="flex items-center gap-2.5">
                {/* Instagram */}
                <a
                  href={`https://instagram.com/${cleanInstagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram da STAK Arquitectura"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] border border-white/10 hover:border-transparent flex items-center justify-center text-[#9ca3af] hover:text-white transition-all duration-300 group shadow-sm"
                  title={`Instagram: ${footerNav.socialLinks?.instagram || atelierInfo.instagram}`}
                >
                  <Instagram className="w-4 h-4 transition-transform group-hover:scale-110" />
                </a>

                {/* WhatsApp */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp da STAK Arquitectura"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#25D366] border border-white/10 hover:border-transparent flex items-center justify-center text-[#9ca3af] hover:text-white transition-all duration-300 group shadow-sm"
                  title={`WhatsApp: ${footerNav.socialLinks?.whatsapp || atelierInfo.phone}`}
                >
                  <WhatsAppIcon className="w-4 h-4 transition-transform group-hover:scale-110" />
                </a>

                {/* LinkedIn */}
                <a
                  href={footerNav.socialLinks?.linkedin || atelierInfo.linkedin || 'https://www.linkedin.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn da STAK Arquitectura"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#0A66C2] border border-white/10 hover:border-transparent flex items-center justify-center text-[#9ca3af] hover:text-white transition-all duration-300 group shadow-sm"
                  title="LinkedIn Institucional"
                >
                  <Linkedin className="w-4 h-4 transition-transform group-hover:scale-110" />
                </a>

                {/* Facebook */}
                <a
                  href={footerNav.socialLinks?.facebook || atelierInfo.facebook || 'https://www.facebook.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook da STAK Arquitectura"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#1877F2] border border-white/10 hover:border-transparent flex items-center justify-center text-[#9ca3af] hover:text-white transition-all duration-300 group shadow-sm"
                  title="Facebook Oficial"
                >
                  <Facebook className="w-4 h-4 transition-transform group-hover:scale-110" />
                </a>
              </div>
            </div>

            {footerNav.showRestrictedArea !== false && (
              <div className="pt-2">
                <button
                  type="button"
                  id="footer-area-restrita-btn"
                  onClick={() => onNavigate('admin')}
                  className="inline-flex items-center gap-1.5 text-xs text-[#9ca3af] hover:text-[#c6a87c] transition-colors py-1 cursor-pointer group"
                  title="Acesso ao Painel Administrativo do Atelier"
                >
                  <Lock className="w-3.5 h-3.5 text-[#c6a87c] group-hover:scale-110 transition-transform" />
                  <span className="font-medium">Área Restrita</span>
                </button>
              </div>
            )}
          </div>

          {/* Col 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-[#c6a87c]">
              Navegação Principal
            </h4>
            <ul className="space-y-2.5 text-xs text-[#9ca3af]">
              {footerNav.navLinks?.map((navItem, idx) => (
                <li key={idx}>
                  <button
                    type="button"
                    onClick={() => handleLink(navItem.page)}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {navItem.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Sectors / Specialties (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-[#c6a87c]">
              Núcleos
            </h4>
            <ul className="space-y-2.5 text-xs text-[#9ca3af]">
              <li>
                <button
                  type="button"
                  onClick={() => handleLink('servicos')}
                  className="text-left hover:text-white transition-colors cursor-pointer"
                >
                  Residencial de Luxo
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLink('servicos')}
                  className="text-left hover:text-white transition-colors cursor-pointer"
                >
                  Sedes Corporativas
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLink('servicos')}
                  className="text-left hover:text-white transition-colors cursor-pointer"
                >
                  Design de Interiores
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLink('servicos')}
                  className="text-left hover:text-white transition-colors cursor-pointer"
                >
                  Fiscalização de Obra
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contacts & Luanda Location (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-[#c6a87c]">
              Sede em Luanda
            </h4>
            <div className="space-y-3 text-xs text-[#9ca3af]">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#c6a87c] shrink-0 mt-0.5" />
                <span>{atelierInfo.locationAddress}, {atelierInfo.city} - {atelierInfo.country}</span>
              </div>
              <div className="flex items-center gap-2">
                <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-white hover:text-[#25D366] transition-colors cursor-pointer"
                  title="Contactar via WhatsApp"
                >
                  {atelierInfo.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#c6a87c] shrink-0" />
                <span>{atelierInfo.email}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => handleLink('contactos')}
                className="w-full py-2.5 bg-[#c6a87c] hover:bg-[#d8bb90] text-black font-semibold text-xs uppercase tracking-wider rounded-sm transition-all cursor-pointer shadow-md"
              >
                Solicitar Estudo Prévio
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Denvitic Partner Credit */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#6b7280]">
          <div>
            {footerNav.copyrightNotice || `© ${currentYear} ${atelierInfo.name}. Todos os direitos reservados.`}
          </div>

          {/* Denvitic Technology Partnership Credit */}
          <div className="flex items-center gap-1.5 text-[11px] text-[#9ca3af]">
            <span>Engenharia & Arquitectura Digital por</span>
            <a
              href="https://www.denvitic.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#e5e7eb] font-semibold hover:text-[#c6a87c] transition-colors"
            >
              Denvitic Tecnologias
            </a>
            <span className="hidden sm:inline text-[#4b5563]">• Luanda, Angola</span>
          </div>

          {/* Back to top */}
          <button
            type="button"
            onClick={scrollToTop}
            className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-white/80 transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Voltar ao topo"
          >
            <span className="text-[10px] uppercase font-mono tracking-wider">Topo</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
