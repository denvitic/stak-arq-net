import React, { useState, useRef } from 'react';
import { Icon } from '@iconify/react';
import { useCms } from '@/src/context/CmsContext';
import { MediaItem } from '@/src/types';

export default function MediaLibraryManager() {
  const { mediaLibrary, uploadMediaFile, deleteMediaItem } = useCms();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'image' | 'video'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [previewItem, setPreviewItem] = useState<MediaItem | null>(null);
  const [itemToDelete, setItemToDelete] = useState<MediaItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const categories = ['todos', ...Array.from(new Set(mediaLibrary.map((m) => m.category).filter(Boolean)))];

  const filteredMedia = mediaLibrary.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = selectedType === 'all' || item.type === selectedType;
    const matchesCategory = selectedCategory === 'todos' || item.category === selectedCategory;
    return matchesSearch && matchesType && matchesCategory;
  });

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setIsUploading(true);

    try {
      for (let i = 0; i < files.length; i++) {
        await uploadMediaFile(files[i]);
      }
      showToast(`${files.length} ficheiro(s) carregado(s) com sucesso!`);
    } catch (err: any) {
      showToast('Erro ao carregar ficheiros: ' + (err.message || 'Erro desconhecido'));
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    showToast('Link do ficheiro copiado para a área de transferência!');
  };

  const confirmDelete = () => {
    if (!itemToDelete) return;
    deleteMediaItem(itemToDelete.id);
    showToast(`"${itemToDelete.name}" removido da biblioteca.`);
    setItemToDelete(null);
    if (previewItem?.id === itemToDelete.id) {
      setPreviewItem(null);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-950 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-[#c6a87c]/30 text-xs animate-slideUp">
          <Icon icon="solar:check-circle-bold" className="text-[#c6a87c]" width="18" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-2xs p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-[#c6a87c] uppercase tracking-wider">
              <span>Painel Administrativo</span>
              <span>/</span>
              <span className="text-gray-900 font-semibold">Biblioteca de Mídia</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 font-heading">
              Gestão de Fotografias & Vídeos
            </h1>
            <p className="text-xs text-gray-500 max-w-2xl">
              Central de ativos multimídia do Atelier STAK. Faça upload directo de ficheiros do seu dispositivo para utilizar em projectos, hero banners e secções do website.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2.5 bg-gray-950 hover:bg-black text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <Icon icon="solar:cloud-upload-bold" className="text-[#c6a87c]" width="18" />
              <span>Carregar do Dispositivo</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,video/mp4"
              onChange={(e) => handleFileUpload(e.target.files)}
              className="hidden"
            />
          </div>
        </div>

        {/* Drag & Drop Quick Area */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`mt-6 border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all duration-200 ${
            dragOver ? 'border-[#c6a87c] bg-[#c6a87c]/10' : 'border-gray-200 hover:border-gray-300 bg-gray-50/50'
          }`}
        >
          <div className="flex items-center justify-center gap-3 text-xs text-gray-600">
            <Icon icon="solar:upload-track-2-bold" width="20" className="text-[#c6a87c]" />
            <span>
              Arraste imagens ou vídeos aqui para upload instantâneo (suporta JPG, PNG, WEBP e MP4)
            </span>
            {isUploading && (
              <span className="text-amber-600 font-semibold flex items-center gap-1">
                <Icon icon="solar:refresh-circle-bold" className="animate-spin" width="16" />
                A carregar...
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-2xs p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Search input */}
        <div className="relative flex-1 max-w-md">
          <Icon
            icon="solar:magnifer-linear"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            width="16"
          />
          <input
            type="text"
            placeholder="Pesquisar por nome do ficheiro ou categoria..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:border-[#c6a87c]"
          />
        </div>

        {/* Right: Type Filters & Category */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Type Switcher */}
          <div className="flex bg-gray-100 rounded-xl p-1 text-xs">
            <button
              type="button"
              onClick={() => setSelectedType('all')}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                selectedType === 'all' ? 'bg-white text-gray-900 shadow-2xs' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Todos ({mediaLibrary.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedType('image')}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                selectedType === 'image' ? 'bg-white text-gray-900 shadow-2xs' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Fotografias
            </button>
            <button
              type="button"
              onClick={() => setSelectedType('video')}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                selectedType === 'video' ? 'bg-white text-gray-900 shadow-2xs' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Vídeos
            </button>
          </div>

          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-xs border border-gray-200 rounded-xl px-3 py-2 bg-white focus:outline-none focus:border-[#c6a87c] capitalize"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'todos' ? 'Todas as Categorias' : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Media Grid */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-2xs p-6">
        {filteredMedia.length === 0 ? (
          <div className="text-center py-20">
            <Icon icon="solar:gallery-remove-linear" width="54" className="mx-auto text-gray-300 mb-3" />
            <h3 className="text-base font-bold text-gray-800">Nenhum ficheiro encontrado</h3>
            <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
              Não encontramos ficheiros com os filtros actuais. Tente limpar a busca ou carregar novas fotos e vídeos do seu dispositivo.
            </p>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="mt-4 px-4 py-2 bg-[#c6a87c] text-black text-xs font-semibold rounded-xl inline-flex items-center gap-2 shadow-2xs"
            >
              <Icon icon="solar:cloud-upload-bold" width="16" />
              <span>Carregar Ficheiros Agora</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredMedia.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col"
              >
                {/* Media Container */}
                <div
                  onClick={() => setPreviewItem(item)}
                  className="aspect-video sm:aspect-4/3 w-full bg-gray-950 relative overflow-hidden flex items-center justify-center cursor-pointer"
                >
                  {item.type === 'video' ? (
                    <div className="w-full h-full flex flex-col items-center justify-center text-white">
                      <Icon icon="solar:videocamera-record-bold" width="32" className="text-[#c6a87c] mb-1" />
                      <span className="text-[10px] font-mono uppercase text-gray-400">Vídeo MP4</span>
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

                  {/* Type Badge */}
                  <div className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-xs text-[9px] font-mono text-white flex items-center gap-1">
                    <Icon
                      icon={item.type === 'video' ? 'solar:videocamera-record-linear' : 'solar:camera-linear'}
                      width="11"
                    />
                    <span>{item.type === 'video' ? 'Vídeo' : 'Foto'}</span>
                  </div>

                  {/* Hover Overlay with Preview Icon */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <Icon icon="solar:eye-bold" width="24" />
                  </div>
                </div>

                {/* Metadata & Actions */}
                <div className="p-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-semibold text-gray-900 truncate" title={item.name}>
                      {item.name}
                    </h4>
                    <div className="flex items-center justify-between text-[10px] text-gray-400 mt-1">
                      <span className="truncate">{item.category || 'Atelier'}</span>
                      <span>{item.size || 'HD'}</span>
                    </div>
                  </div>

                  {/* Quick Action Buttons */}
                  <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => handleCopyUrl(item.url)}
                      className="text-[11px] text-gray-500 hover:text-gray-900 flex items-center gap-1 font-medium transition-colors cursor-pointer"
                      title="Copiar URL"
                    >
                      <Icon icon="solar:copy-linear" width="13" />
                      <span>Copiar Link</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setItemToDelete(item)}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                      title="Eliminar ficheiro"
                    >
                      <Icon icon="solar:trash-bin-trash-linear" width="14" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Preview Modal */}
      {previewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-gray-950 rounded-2xl max-w-4xl w-full overflow-hidden border border-white/10 shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-4 border-b border-white/10 flex items-center justify-between text-white">
              <div className="flex items-center gap-2 min-w-0">
                <Icon
                  icon={previewItem.type === 'video' ? 'solar:videocamera-record-bold' : 'solar:gallery-bold'}
                  className="text-[#c6a87c] shrink-0"
                  width="18"
                />
                <span className="text-sm font-semibold truncate">{previewItem.name}</span>
              </div>
              <button
                type="button"
                onClick={() => setPreviewItem(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 cursor-pointer"
              >
                <Icon icon="solar:close-circle-linear" width="22" />
              </button>
            </div>

            <div className="flex-1 bg-black flex items-center justify-center p-4 overflow-hidden min-h-[350px]">
              {previewItem.type === 'video' ? (
                <video src={previewItem.url} controls autoPlay className="max-h-[60vh] max-w-full rounded-lg" />
              ) : (
                <img
                  src={previewItem.url}
                  alt={previewItem.name}
                  className="max-h-[65vh] max-w-full object-contain rounded-lg shadow-2xl"
                />
              )}
            </div>

            <div className="p-4 border-t border-white/10 bg-gray-900/80 flex items-center justify-between text-xs text-gray-300">
              <div className="flex items-center gap-4">
                <span>Tipo: {previewItem.type.toUpperCase()}</span>
                <span>Tamanho: {previewItem.size || 'HD'}</span>
                <span>Data: {previewItem.uploadedAt}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCopyUrl(previewItem.url)}
                  className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Icon icon="solar:copy-linear" width="14" />
                  <span>Copiar URL</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setItemToDelete(previewItem);
                  }}
                  className="px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Icon icon="solar:trash-bin-trash-linear" width="14" />
                  <span>Eliminar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {itemToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4">
              <Icon icon="solar:trash-bin-trash-bold" width="24" />
            </div>
            <h3 className="text-base font-bold text-gray-900">Eliminar Ficheiro de Mídia?</h3>
            <p className="text-xs text-gray-500 mt-2">
              Tem a certeza de que deseja eliminar o ficheiro <strong className="text-gray-800">"{itemToDelete.name}"</strong> da biblioteca? Esta acção não poderá ser revertida.
            </p>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setItemToDelete(null)}
                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="px-4 py-2 text-xs font-semibold bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Sim, Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
