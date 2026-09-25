import React from 'react';
import { Icon } from '@iconify/react';
import { NavPage } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';

interface NotFoundPageProps {
  onNavigate: (page: NavPage) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-[85vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-20 relative overflow-hidden bg-[#090a0c] text-white">
      {/* Subtle architectural background geometry */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-radial from-[#c6a87c]/15 to-transparent blur-3xl" />
        <div className="w-full h-full bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="max-w-2xl w-full mx-auto text-center relative z-10 space-y-6">
        {/* Breadcrumb trail */}
        <div className="flex justify-center">
          <Breadcrumbs
            items={[
              { label: 'Início', onClick: () => onNavigate('inicio') },
              { label: 'Erro 404', isCurrent: true },
            ]}
          />
        </div>

        {/* 404 Monogram / Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#c6a87c]/30 bg-[#c6a87c]/10 text-[#c6a87c] text-xs font-mono tracking-widest uppercase">
          <Icon icon="solar:compass-square-bold" width="16" />
          <span>Coordenada Indisponível</span>
        </div>

        {/* Semantic H1 heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight font-heading text-white">
          404 <span className="text-[#c6a87c] font-light">/</span> Não Encontrado
        </h1>

        <p className="text-sm sm:text-base text-gray-400 max-w-lg mx-auto leading-relaxed">
          O traço arquitectónico ou endereço que procura não existe, foi relocalizado ou encontra-se temporariamente fora do nosso mapa de navegação.
        </p>

        {/* Action Navigation Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('inicio')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#c6a87c] hover:bg-[#b59567] text-black font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#c6a87c]/10"
          >
            <Icon icon="solar:home-2-bold" width="16" />
            <span>Voltar à Página Inicial</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('projectos')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-white/20 hover:border-[#c6a87c] hover:text-[#c6a87c] text-white font-medium text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer bg-white/5 backdrop-blur-sm"
          >
            <Icon icon="solar:buildings-bold" width="16" />
            <span>Explorar Projectos</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('contactos')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-white/10 hover:bg-white/10 text-gray-300 font-medium text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Icon icon="solar:letter-bold" width="16" />
            <span>Contactar Atelier</span>
          </button>
        </div>
      </div>
    </div>
  );
};
