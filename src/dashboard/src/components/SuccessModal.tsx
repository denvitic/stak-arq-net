import React from 'react';
import { Icon } from '@iconify/react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  onContinue?: () => void;
  viewWebsiteUrl?: string;
  viewWebsiteLabel?: string;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  title = 'Alterações Guardadas com Sucesso!',
  message = 'O conteúdo foi actualizado e já está reflectido no website público do Atelier STAK.',
  onContinue,
  viewWebsiteUrl = '/',
  viewWebsiteLabel = 'Visualizar no Website',
}) => {
  if (!isOpen) return null;

  const handleViewWebsite = () => {
    window.location.href = viewWebsiteUrl;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-gray-100 transform transition-all animate-scaleUp">
        {/* Header decoration bar */}
        <div className="h-2 w-full bg-gradient-to-r from-[#c6a87c] via-[#dfc499] to-[#c6a87c]" />

        <div className="p-7 text-center">
          {/* Animated Icon badge */}
          <div className="mx-auto w-16 h-16 rounded-full bg-emerald-50 border-4 border-emerald-100 flex items-center justify-center text-emerald-600 mb-5 shadow-sm">
            <Icon icon="solar:check-circle-bold" width="36" height="36" className="animate-bounce" />
          </div>

          <h3 className="text-xl font-bold text-gray-900 font-heading">
            {title}
          </h3>

          <p className="text-sm text-gray-500 mt-2 leading-relaxed max-w-xs mx-auto">
            {message}
          </p>

          <div className="mt-7 flex flex-col gap-2.5">
            {/* View on website button */}
            <button
              type="button"
              onClick={handleViewWebsite}
              className="w-full py-3 px-4 rounded-xl bg-gray-950 hover:bg-black text-white font-medium text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg cursor-pointer"
            >
              <Icon icon="solar:link-circle-linear" width="18" className="text-[#c6a87c]" />
              <span>{viewWebsiteLabel}</span>
              <Icon icon="solar:arrow-right-up-linear" width="16" />
            </button>

            <div className="flex gap-2.5 mt-1">
              {onContinue && (
                <button
                  type="button"
                  onClick={onContinue}
                  className="flex-1 py-2.5 px-3 rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-medium text-xs transition-colors cursor-pointer"
                >
                  Continuar a Editar
                </button>
              )}

              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 px-3 rounded-xl bg-[#c6a87c] hover:bg-[#b59567] text-black font-semibold text-xs transition-colors cursor-pointer shadow-sm"
              >
                Concluir
              </button>
            </div>
          </div>
        </div>

        {/* Footer tip */}
        <div className="bg-gray-50/80 px-6 py-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Sincronização Activa
          </span>
          <span>Atelier STAK CMS</span>
        </div>
      </div>
    </div>
  );
};
