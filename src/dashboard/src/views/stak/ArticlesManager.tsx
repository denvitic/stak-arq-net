import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useCms } from '@/src/context/CmsContext';
import { Article } from '@/src/types';
import { ImagePickerInput } from '@/src/dashboard/src/components/ImagePickerInput';

export default function ArticlesManager() {
  const { articles, addArticle, updateArticle, deleteArticle } = useCms();
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [formData, setFormData] = useState<Omit<Article, 'id'>>({
    title: '',
    category: 'Arquitectura & Cidade',
    date: new Date().toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' }),
    readTime: '4 min',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    altText: '',
    slug: '',
    excerpt: '',
    content: [],
    author: 'Equipa Editorial STAK',
  });

  const [rawTextContent, setRawTextContent] = useState('');
  const [articleToDelete, setArticleToDelete] = useState<{ id: string; title: string } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleOpenCreate = () => {
    setFormData({
      title: '',
      slug: '',
      category: 'Arquitectura & Cidade',
      date: new Date().toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' }),
      readTime: '5 min',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      altText: '',
      excerpt: '',
      content: [],
      author: 'Atelier STAK',
    });
    setRawTextContent('');
    setIsCreating(true);
    setEditingArticle(null);
  };

  const handleOpenEdit = (art: Article) => {
    setEditingArticle(art);
    setFormData({
      title: art.title,
      slug: art.slug || '',
      category: art.category || 'Arquitectura & Cidade',
      date: art.date,
      readTime: art.readTime,
      image: art.image,
      altText: art.altText || '',
      excerpt: art.excerpt,
      content: [...(art.content || [])],
      author: art.author,
    });
    setRawTextContent(Array.isArray(art.content) ? art.content.join('\n\n') : (art.content as unknown as string) || '');
    setIsCreating(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const parsedParagraphs = rawTextContent
      .split('\n\n')
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    const generatedSlug = formData.slug?.trim()
      ? formData.slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      : formData.title
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');

    const payload: Omit<Article, 'id'> = {
      ...formData,
      slug: generatedSlug,
      content: parsedParagraphs.length > 0 ? parsedParagraphs : [rawTextContent.trim() || formData.excerpt],
    };

    if (isCreating) {
      addArticle(payload);
      showToast(`Artigo "${formData.title}" publicado com sucesso!`);
    } else if (editingProjectArticle(payload)) {
      showToast(`Artigo "${formData.title}" actualizado com sucesso!`);
    }

    setIsCreating(false);
    setEditingArticle(null);
  };

  const editingProjectArticle = (payload: Omit<Article, 'id'>) => {
    if (editingArticle) {
      updateArticle({
        ...editingArticle,
        ...payload,
      });
      return true;
    }
    return false;
  };

  const handleConfirmDelete = () => {
    if (!articleToDelete) return;
    const title = articleToDelete.title;
    deleteArticle(articleToDelete.id);
    showToast(`Artigo "${title}" eliminado com sucesso.`);
    setArticleToDelete(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-[#111827] text-white rounded-xl shadow-2xl border border-emerald-500/50 animate-fade-in">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold text-[#c6a87c] tracking-widest uppercase">
              Publicações & Blog
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight font-serif">
            Artigos & Notícias de Arquitectura
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Publique reflexões sobre tectónica, bioclimatismo, sustentabilidade e inovação de materiais em Angola.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#111827] hover:bg-black text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-xs"
        >
          <Icon icon="solar:add-circle-linear" width="18" />
          <span>+ Novo Artigo</span>
        </button>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((art) => (
          <div
            key={art.id}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-2xs hover:border-gray-400 transition-all flex flex-col group"
          >
            <div className="relative aspect-16/10 bg-gray-100 overflow-hidden">
              <img
                src={art.image}
                alt={art.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute bottom-2.5 left-2.5 bg-black/75 text-white text-[10px] px-2 py-0.5 rounded">
                {art.readTime}
              </span>
              <span className="absolute top-2.5 left-2.5 bg-white/90 text-gray-900 text-[10px] font-semibold px-2 py-0.5 rounded">
                {art.category || 'Arquitectura'}
              </span>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[11px] text-gray-400 font-mono block mb-1">
                  {art.date} • {art.author}
                </span>
                <h3 className="font-bold text-base text-gray-900 group-hover:text-[#c6a87c] transition-colors line-clamp-2">
                  {art.title}
                </h3>
                <p className="text-xs text-gray-600 line-clamp-3 mt-2 leading-relaxed">
                  {art.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(art)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  <Icon icon="solar:pen-linear" width="14" />
                  <span>Editar</span>
                </button>

                <button
                  type="button"
                  onClick={() => setArticleToDelete({ id: art.id, title: art.title })}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                  title="Eliminar Artigo"
                >
                  <Icon icon="solar:trash-bin-trash-linear" width="16" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Form */}
      {(isCreating || editingArticle) && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-gray-200 overflow-hidden my-8 animate-scale-up">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#c6a87c] tracking-widest uppercase">
                  {isCreating ? 'Novo Artigo' : 'Edição'}
                </span>
                <h3 className="text-base font-bold text-gray-900 font-serif">
                  {isCreating ? 'Redigir Artigo de Arquitectura' : `Editar: ${editingArticle?.title}`}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsCreating(false);
                  setEditingArticle(null);
                }}
                className="p-1.5 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
              >
                <Icon icon="solar:close-circle-linear" width="20" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Título do Artigo</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#c6a87c] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Categoria</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#c6a87c] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Autor</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#c6a87c] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Tempo de Leitura</label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#c6a87c] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Slug do Artigo (URL amigável para SEO)
                </label>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-gray-400 font-mono">#artigos/</span>
                  <input
                    type="text"
                    value={formData.slug || ''}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="ex: arquitectura-bioclimatica-luanda"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs font-mono focus:ring-1 focus:ring-[#c6a87c] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <ImagePickerInput
                  label="Fotografia de Capa do Artigo *"
                  description="Fotografia em alta resolução ilustrativa da reflexão arquitectónica"
                  value={formData.image}
                  onChange={(url) => setFormData({ ...formData, image: url })}
                  altText={formData.altText || ''}
                  onAltChange={(alt) => setFormData({ ...formData, altText: alt })}
                  altPlaceholder="ex: Fotografia de obra com brises de madeira em Luanda"
                  acceptedType="image"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Resumo / Excerto</label>
                <textarea
                  rows={2}
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#c6a87c] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Conteúdo Completo (separe parágrafos com linha em branco)
                </label>
                <textarea
                  rows={6}
                  value={rawTextContent}
                  onChange={(e) => setRawTextContent(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#c6a87c] focus:outline-none leading-relaxed"
                />
              </div>

              <div className="pt-3 border-t border-gray-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreating(false);
                    setEditingArticle(null);
                  }}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#111827] hover:bg-black text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  style={{ color: '#ffffff' }}
                >
                  <span style={{ color: '#ffffff' }}>Guardar Artigo</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* In-App Delete Confirmation Modal (NO window.confirm!) */}
      {articleToDelete && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200 animate-fade-in space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Icon icon="solar:trash-bin-trash-bold" width="24" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-gray-900">
                Eliminar Artigo?
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Tem a certeza que deseja eliminar o artigo <strong>"{articleToDelete.title}"</strong>? Esta acção é irreversível e remove o artigo das publicações do website.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setArticleToDelete(null)}
                className="w-1/2 py-2.5 border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={handleConfirmDelete}
                className="w-1/2 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-xs"
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
