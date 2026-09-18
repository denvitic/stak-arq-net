import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { MediaPickerModal } from './MediaPickerModal';

interface ImagePickerInputProps {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  acceptedType?: 'image' | 'video' | 'all';
  helperText?: string;
  description?: string;
  placeholder?: string;
  required?: boolean;
}

export const ImagePickerInput: React.FC<ImagePickerInputProps> = ({
  label,
  value,
  onChange,
  acceptedType = 'image',
  helperText,
  description,
  placeholder = 'Nenhum ficheiro seleccionado',
  required = false,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const help = description || helperText;

  const isVideo =
    acceptedType === 'video' ||
    value.endsWith('.mp4') ||
    value.includes('/videos/') ||
    value.startsWith('data:video/');

  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label className="block text-xs font-semibold text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-2.5 rounded-xl border border-gray-200 bg-gray-50/60 hover:border-gray-300 transition-colors">
        {/* Media Thumbnail or Placeholder */}
        <div className="w-20 h-16 sm:w-24 sm:h-18 rounded-lg bg-gray-900 border border-gray-200 overflow-hidden shrink-0 relative flex items-center justify-center shadow-2xs">
          {value ? (
            isVideo ? (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gray-950 text-white">
                <Icon icon="solar:videocamera-record-bold" width="22" className="text-[#c6a87c]" />
                <span className="text-[8px] font-mono uppercase text-gray-400 mt-0.5">Vídeo</span>
              </div>
            ) : (
              <img
                src={value}
                alt="Preview"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            )
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-400">
              <Icon
                icon={acceptedType === 'video' ? 'solar:videocamera-linear' : 'solar:camera-linear'}
                width="20"
              />
              <span className="text-[9px] mt-0.5">Sem mídia</span>
            </div>
          )}

          {value && (
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity text-white cursor-pointer"
              title="Trocar mídia"
            >
              <Icon icon="solar:pen-new-square-linear" width="16" />
            </button>
          )}
        </div>

        {/* Input Details & Action Buttons */}
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-mono text-gray-500 truncate block bg-white px-2 py-1 rounded border border-gray-200 w-full" title={value || placeholder}>
              {value ? (value.startsWith('data:') ? 'Ficheiro Carregado do Dispositivo (Base64)' : value) : placeholder}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-gray-900 hover:bg-black text-white text-[11px] font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <Icon icon="solar:gallery-wide-bold" width="14" className="text-[#c6a87c]" />
              <span>Escolher da Biblioteca ou Upload</span>
            </button>

            {value && (
              <button
                type="button"
                onClick={() => onChange('')}
                className="px-2.5 py-1.5 rounded-lg border border-gray-200 hover:bg-red-50 hover:border-red-200 text-gray-500 hover:text-red-600 text-[11px] font-medium inline-flex items-center gap-1 transition-colors cursor-pointer"
                title="Remover imagem"
              >
                <Icon icon="solar:trash-bin-trash-linear" width="13" />
                <span>Limpar</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {help && <p className="text-[11px] text-gray-500">{help}</p>}

      {/* Media Picker Modal */}
      <MediaPickerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={(url) => onChange(url)}
        currentValue={value}
        acceptedType={acceptedType}
        title={label ? `Seleccionar Mídia: ${label}` : 'Biblioteca de Mídia'}
      />
    </div>
  );
};
