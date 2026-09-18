import React, { useState, useRef } from 'react';
import { Icon } from '@iconify/react';
import { useCms } from '@/src/context/CmsContext';
import { MediaItem } from '@/src/types';

interface MediaPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string, item?: MediaItem) => void;
  currentValue?: string;
  acceptedType?: 'image' | 'video' | 'all';
  title?: string;
}

export const MediaPickerModal: React.FC<MediaPickerModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  currentValue = '',
  acceptedType = 'all',
  title = 'Biblioteca de Mídia & Upload',
}) => {
  const { mediaLibrary, uploadMediaFile } = useCms();
  const [activeTab, setActiveTab] = useState<'library' | 'upload' | 'url'>('library');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<'all' | 'image' | 'video'>(
    acceptedType === 'video' ? 'video' : acceptedType === 'image' ? 'image' : 'all'
  );
  const [selectedUrl, setSelectedUrl] = useState(currentValue);
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [manualUrl, setManualUrl] = useState(currentValue);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploadedPreview, setUploadedPreview] = useState<{ url: string; name: string; type: string } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Filter media library items
  const filteredItems = mediaLibrary.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType =
      selectedTypeFilter === 'all'
        ? acceptedType === 'all' || item.type === acceptedType
        : item.type === selectedTypeFilter;
    return matchesSearch && matchesType;
  });

  const handleFileChange = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    setUploadError(null);
    setIsUploading(true);

    try {
      // Validate type if required
      if (acceptedType === 'video' && !file.type.startsWith('video/')) {
        throw new Error('Por favor seleccione um ficheiro de vídeo válido (.mp4, .webm, .mov).');
      }
      if (acceptedType === 'image' && !file.type.startsWith('image/')) {
        throw new Error('Por favor seleccione um ficheiro de imagem (.jpg, .png, .webp).');
      }

      const dataUrl = await uploadMediaFile(file);
      setUploadedPreview({
        url: dataUrl,
        name: file.name,
        type: file.type.startsWith('video') ? 'video' : 'image',
      });
      setSelectedUrl(dataUrl);
    } catch (err: any) {
      console.error(err);
      setUploadError(err.message || 'Erro ao carregar o ficheiro do dispositivo.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files);
    }
  };

  const handleConfirmSelection = () => {
    if (!selectedUrl) return;
    onSelect(selectedUrl, selectedItem || undefined);
    onClose();
  };

  const handleSelectFromLibrary = (item: MediaItem) => {
    setSelectedUrl(item.url);
    setSelectedItem(item);
  };

  const handleConfirmManualUrl = () => {
    if (!manualUrl.trim()) return;
    onSelect(manualUrl.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-4xl w-full h-[88vh] max-h-[750px] flex flex-col shadow-2xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#c6a87c]/20 flex items-center justify-center text-[#c6a87c]">
              <Icon icon="solar:gallery-wide-bold" width="18" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">{title}</h3>
              <p className="text-[11px] text-gray-500">
                Seleccione uma imagem existente ou faça upload do seu computador/telemóvel
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-200/60 transition-colors cursor-pointer"
          >
            <Icon icon="solar:close-circle-linear" width="22" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 pt-3 border-b border-gray-200 flex items-center justify-between bg-white shrink-0">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('library')}
              className={`pb-3 px-3 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-colors cursor-pointer ${
                activeTab === 'library'
                  ? 'border-[#c6a87c] text-[#c6a87c]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon icon="solar:gallery-bold" width="15" />
              <span>Biblioteca de Ficheiros ({mediaLibrary.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('upload')}
              className={`pb-3 px-3 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-colors cursor-pointer ${
                activeTab === 'upload'
                  ? 'border-[#c6a87c] text-[#c6a87c]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon icon="solar:upload-track-2-bold" width="15" />
              <span>Carregar do Dispositivo</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('url')}
              className={`pb-3 px-3 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-colors cursor-pointer ${
                activeTab === 'url'
                  ? 'border-[#c6a87c] text-[#c6a87c]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon icon="solar:link-minimalistic-bold" width="15" />
              <span>Inserir por Link / URL</span>
            </button>
          </div>

          {activeTab === 'library' && (
            <div className="flex items-center gap-2 pb-2">
              <div className="relative">
                <Icon
                  icon="solar:magnifer-linear"
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
                  width="13"
                />
                <input
                  type="text"
                  placeholder="Pesquisar..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-7 pr-3 py-1 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-[#c6a87c] w-36 sm:w-44"
                />
              </div>

              {acceptedType === 'all' && (
                <div className="flex rounded-lg border border-gray-200 p-0.5 text-[10px]">
                  <button
                    type="button"
                    onClick={() => setSelectedTypeFilter('all')}
                    className={`px-2 py-0.5 rounded ${
                      selectedTypeFilter === 'all' ? 'bg-gray-900 text-white font-medium' : 'text-gray-600'
                    }`}
                  >
                    Todos
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedTypeFilter('image')}
                    className={`px-2 py-0.5 rounded ${
                      selectedTypeFilter === 'image' ? 'bg-gray-900 text-white font-medium' : 'text-gray-600'
                    }`}
                  >
                    Fotos
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedTypeFilter('video')}
                    className={`px-2 py-0.5 rounded ${
                      selectedTypeFilter === 'video' ? 'bg-gray-900 text-white font-medium' : 'text-gray-600'
                    }`}
                  >
                    Vídeos
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
          {activeTab === 'library' && (
            <div>
              {filteredItems.length === 0 ? (
                <div className="text-center py-16">
                  <Icon icon="solar:gallery-remove-linear" width="48" className="mx-auto text-gray-300 mb-2" />
                  <p className="text-sm font-semibold text-gray-700">Nenhum ficheiro encontrado</p>
                  <p className="text-xs text-gray-500 mt-1">Tente pesquisar por outro termo ou faça upload.</p>
                  <button
                    type="button"
                    onClick={() => setActiveTab('upload')}
                    className="mt-4 px-4 py-2 bg-[#c6a87c] text-black text-xs font-semibold rounded-lg"
                  >
                    Fazer Upload Agora
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {filteredItems.map((item) => {
                    const isSelected = selectedUrl === item.url;
                    return (
                      <div
                        key={item.id}
                        onClick={() => handleSelectFromLibrary(item)}
                        className={`group relative rounded-xl border-2 overflow-hidden bg-white cursor-pointer transition-all duration-200 shadow-2xs hover:shadow-md ${
                          isSelected
                            ? 'border-[#c6a87c] ring-2 ring-[#c6a87c]/30 shadow-md'
                            : 'border-transparent hover:border-gray-300'
                        }`}
                      >
                        {/* Media Thumbnail */}
                        <div className="aspect-video sm:aspect-4/3 w-full bg-gray-900 relative overflow-hidden flex items-center justify-center">
                          {item.type === 'video' ? (
                            <div className="w-full h-full flex flex-col items-center justify-center bg-gray-950 text-white">
                              <Icon icon="solar:videocamera-record-bold" width="32" className="text-[#c6a87c] mb-1" />
                              <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400">Vídeo MP4</span>
                            </div>
                          ) : (
                            <img
                              src={item.url}
                              alt={item.name}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              loading="lazy"
                            />
                          )}

                          {/* Selected Check Badge */}
                          {isSelected && (
                            <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#c6a87c] text-black flex items-center justify-center shadow-lg animate-scaleUp">
                              <Icon icon="solar:check-circle-bold" width="16" />
                            </div>
                          )}

                          {/* Type badge */}
                          <div className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-xs text-[9px] font-mono text-white flex items-center gap-1">
                            <Icon
                              icon={item.type === 'video' ? 'solar:videocamera-record-linear' : 'solar:camera-linear'}
                              width="11"
                            />
                            <span>{item.type === 'video' ? 'Vídeo' : 'Foto'}</span>
                          </div>
                        </div>

                        {/* Metadata */}
                        <div className="p-2.5">
                          <p className="text-xs font-semibold text-gray-900 truncate" title={item.name}>
                            {item.name}
                          </p>
                          <div className="flex items-center justify-between text-[10px] text-gray-400 mt-1">
                            <span>{item.category || 'Atelier'}</span>
                            <span>{item.size || 'HD'}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {activeTab === 'upload' && (
            <div className="max-w-xl mx-auto py-6">
              {/* Drag and Drop Zone */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 ${
                  dragOver
                    ? 'border-[#c6a87c] bg-[#c6a87c]/10'
                    : 'border-gray-300 hover:border-gray-400 bg-white'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={acceptedType === 'video' ? 'video/mp4,video/webm,video/quicktime,video/*' : acceptedType === 'image' ? 'image/*' : 'image/*,video/mp4,video/webm,video/quicktime,video/*'}
                  onChange={(e) => handleFileChange(e.target.files)}
                  className="hidden"
                />

                <div className="w-14 h-14 rounded-2xl bg-[#c6a87c]/15 text-[#c6a87c] mx-auto flex items-center justify-center mb-4">
                  <Icon icon="solar:cloud-upload-bold" width="32" />
                </div>

                <h4 className="text-sm font-bold text-gray-900">
                  Arraste e solte o ficheiro aqui ou clique para procurar
                </h4>
                <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                  Suporta fotografias de alta resolução (JPG, PNG, WEBP) e ficheiros de vídeo (MP4) directamente do seu dispositivo.
                </p>

                <button
                  type="button"
                  className="mt-5 px-5 py-2.5 bg-gray-950 hover:bg-black text-white text-xs font-semibold rounded-xl inline-flex items-center gap-2 shadow-sm transition-all"
                >
                  <Icon icon="solar:folder-open-bold" width="16" />
                  <span>Procurar no Computador / Telemóvel</span>
                </button>
              </div>

              {/* Upload Status / Loading */}
              {isUploading && (
                <div className="mt-5 p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-center gap-3 text-amber-800 text-xs">
                  <Icon icon="solar:refresh-circle-bold" className="animate-spin text-amber-600" width="20" />
                  <span>A processar e a optimizar o ficheiro do dispositivo...</span>
                </div>
              )}

              {uploadError && (
                <div className="mt-5 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <Icon icon="solar:danger-triangle-bold" width="18" className="shrink-0" />
                  <span>{uploadError}</span>
                </div>
              )}

              {/* Uploaded Preview */}
              {uploadedPreview && !isUploading && (
                <div className="mt-6 p-4 rounded-xl bg-white border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-gray-900 flex items-center gap-1.5 text-emerald-600">
                      <Icon icon="solar:check-circle-bold" width="16" />
                      Ficheiro pronto para inserção!
                    </span>
                    <span className="text-[11px] text-gray-500 truncate max-w-xs">{uploadedPreview.name}</span>
                  </div>

                  <div className="aspect-video w-full rounded-lg bg-gray-900 overflow-hidden flex items-center justify-center relative">
                    {uploadedPreview.type === 'video' ? (
                      <video src={uploadedPreview.url} controls className="w-full h-full object-contain" />
                    ) : (
                      <img
                        src={uploadedPreview.url}
                        alt="Preview"
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'url' && (
            <div className="max-w-lg mx-auto py-8 space-y-4">
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-2xs space-y-4">
                <label className="block text-xs font-bold text-gray-800">
                  Endereço URL da Imagem ou Vídeo
                </label>
                <div className="relative">
                  <Icon
                    icon="solar:link-linear"
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    width="16"
                  />
                  <input
                    type="url"
                    value={manualUrl}
                    onChange={(e) => setManualUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/... ou https://..."
                    className="w-full pl-9 pr-3 py-2.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-[#c6a87c]"
                  />
                </div>
                <p className="text-[11px] text-gray-500">
                  Cole um link direto para uma imagem externa de alta resolução (Unsplash, Pexels, etc.).
                </p>

                {manualUrl.trim() && (
                  <div className="mt-3 aspect-video w-full rounded-lg bg-gray-900 overflow-hidden relative">
                    <img
                      src={manualUrl}
                      alt="Preview manual"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 border-t border-gray-200 bg-white flex items-center justify-between shrink-0">
          <div className="text-xs text-gray-500 truncate max-w-sm">
            {selectedUrl ? (
              <span className="flex items-center gap-1.5 text-gray-700 font-mono text-[11px]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                <span className="truncate">Seleccionado: {selectedItem?.name || selectedUrl}</span>
              </span>
            ) : (
              <span>Nenhum ficheiro seleccionado</span>
            )}
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
            >
              Cancelar
            </button>

            {activeTab === 'url' ? (
              <button
                type="button"
                onClick={handleConfirmManualUrl}
                disabled={!manualUrl.trim()}
                className="px-5 py-2 text-xs font-semibold bg-[#c6a87c] hover:bg-[#b59567] disabled:opacity-50 text-black rounded-xl shadow-xs transition-all cursor-pointer"
              >
                Aplicar URL
              </button>
            ) : (
              <button
                type="button"
                onClick={handleConfirmSelection}
                disabled={!selectedUrl}
                className="px-5 py-2 text-xs font-semibold bg-[#c6a87c] hover:bg-[#b59567] disabled:opacity-50 text-black rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Icon icon="solar:check-read-bold" width="16" />
                <span>Confirmar & Inserir Ficheiro</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
