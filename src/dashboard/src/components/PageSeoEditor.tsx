import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { PageSeoSettings } from '../../../types';
import { ImagePickerInput } from './ImagePickerInput';

export interface PageSeoEditorProps {
  pageName: string;
  pagePath: string;
  seo?: PageSeoSettings;
  onChange: (newSeo: PageSeoSettings) => void;
  recommendedFallbacks: {
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
    ogImage: string;
  };
}

export const PageSeoEditor: React.FC<PageSeoEditorProps> = ({
  pageName,
  pagePath,
  seo = {},
  onChange,
  recommendedFallbacks,
}) => {
  const [previewTab, setPreviewTab] = useState<'google' | 'social' | 'twitter'>('google');
  const [devicePreview, setDevicePreview] = useState<'desktop' | 'mobile'>('desktop');

  // Resolved values with fallbacks
  const currentTitle = seo.metaTitle || recommendedFallbacks.metaTitle;
  const currentDesc = seo.metaDescription || recommendedFallbacks.metaDescription;
  const currentKeywords = seo.metaKeywords || recommendedFallbacks.metaKeywords;
  const currentCanonical = seo.canonicalUrl || `https://stakarquitectura.com${pagePath}`;
  const currentOgImage = seo.ogImage || recommendedFallbacks.ogImage;
  const currentOgTitle = seo.ogTitle || currentTitle;
  const currentOgDesc = seo.ogDescription || currentDesc;
  const currentOgUrl = seo.ogUrl || currentCanonical;
  const currentTwitterTitle = seo.twitterTitle || currentOgTitle;
  const currentTwitterDesc = seo.twitterDescription || currentOgDesc;
  const currentTwitterImage = seo.twitterImage || currentOgImage;
  const isNoIndex = Boolean(seo.noIndex);

  const titleLength = (seo.metaTitle || '').length;
  const descLength = (seo.metaDescription || '').length;

  const handleFieldChange = <K extends keyof PageSeoSettings>(field: K, value: PageSeoSettings[K]) => {
    onChange({
      ...seo,
      [field]: value,
    });
  };

  const handlePopulateRecommended = () => {
    onChange({
      metaTitle: recommendedFallbacks.metaTitle,
      metaDescription: recommendedFallbacks.metaDescription,
      metaKeywords: recommendedFallbacks.metaKeywords,
      canonicalUrl: `https://stakarquitectura.com${pagePath}`,
      ogTitle: recommendedFallbacks.metaTitle,
      ogDescription: recommendedFallbacks.metaDescription,
      ogImage: recommendedFallbacks.ogImage,
      ogUrl: `https://stakarquitectura.com${pagePath}`,
      twitterTitle: recommendedFallbacks.metaTitle,
      twitterDescription: recommendedFallbacks.metaDescription,
      twitterImage: recommendedFallbacks.ogImage,
      noIndex: false,
    });
  };

  const handleClearCustom = () => {
    onChange({
      metaTitle: '',
      metaDescription: '',
      metaKeywords: '',
      canonicalUrl: '',
      ogTitle: '',
      ogDescription: '',
      ogImage: '',
      ogUrl: '',
      twitterTitle: '',
      twitterDescription: '',
      twitterImage: '',
      noIndex: false,
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Banner with Page Identity & Actions */}
      <div className="p-5 rounded-2xl border border-gray-200 bg-linear-to-r from-gray-50 via-white to-gray-50 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#c6a87c]/15 text-[#c6a87c] flex items-center justify-center shrink-0">
              <Icon icon="solar:global-bold" width="22" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-gray-900 font-heading">
                  SEO & Metatags: {pageName}
                </h3>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider ${
                    isNoIndex
                      ? 'bg-amber-100 text-amber-800 border border-amber-200'
                      : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  }`}
                >
                  {isNoIndex ? 'NoIndex (Oculta)' : 'Indexável pelo Google'}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Caminho canónico base:{' '}
                <span className="font-mono text-gray-700 font-semibold">{pagePath}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handlePopulateRecommended}
              className="px-3 py-1.5 rounded-xl border border-[#c6a87c]/40 text-[#b59567] hover:bg-[#c6a87c]/10 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Icon icon="solar:magic-stick-bold" width="14" />
              <span>Usar Sugestão Padrão</span>
            </button>

            <button
              type="button"
              onClick={handleClearCustom}
              className="px-3 py-1.5 rounded-xl border border-gray-200 hover:bg-gray-100 text-gray-600 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Icon icon="solar:restart-bold" width="14" />
              <span>Limpar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Form Inputs + Live Previewers */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Left Column: Form Fields */}
        <div className="xl:col-span-7 space-y-6">
          {/* Section 1: Standard Meta Tags */}
          <div className="p-5 rounded-2xl border border-gray-200 bg-white shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <Icon icon="solar:document-text-bold" width="18" className="text-[#c6a87c]" />
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                  1. Meta Tags Principais (Motores de Busca)
                </h4>
              </div>
              <span className="text-[11px] text-gray-400 font-medium">Requerido</span>
            </div>

            {/* Meta Title */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-gray-800 flex items-center gap-1.5">
                  <span>Meta Title (Título da Aba & Snippet)</span>
                  <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[11px] font-mono font-bold ${
                      titleLength >= 30 && titleLength <= 60
                        ? 'text-emerald-600'
                        : titleLength > 60
                        ? 'text-amber-600'
                        : 'text-gray-400'
                    }`}
                  >
                    {titleLength}/60 chars
                  </span>
                  {titleLength >= 30 && titleLength <= 60 && (
                    <Icon icon="solar:check-circle-bold" width="14" className="text-emerald-500" />
                  )}
                </div>
              </div>
              <input
                type="text"
                value={seo.metaTitle || ''}
                onChange={(e) => handleFieldChange('metaTitle', e.target.value)}
                placeholder={recommendedFallbacks.metaTitle}
                className="w-full text-xs px-3.5 py-2.5 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none font-medium placeholder:text-gray-400"
              />
              <p className="text-[11px] text-gray-500">
                Se deixado em branco, utiliza o padrão do atelier:{' '}
                <span className="italic text-gray-600">"{recommendedFallbacks.metaTitle}"</span>
              </p>
            </div>

            {/* Meta Description */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-gray-800 flex items-center gap-1.5">
                  <span>Meta Description (Resumo na Pesquisa)</span>
                  <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[11px] font-mono font-bold ${
                      descLength >= 120 && descLength <= 160
                        ? 'text-emerald-600'
                        : descLength > 160
                        ? 'text-amber-600'
                        : 'text-gray-400'
                    }`}
                  >
                    {descLength}/160 chars
                  </span>
                  {descLength >= 120 && descLength <= 160 && (
                    <Icon icon="solar:check-circle-bold" width="14" className="text-emerald-500" />
                  )}
                </div>
              </div>
              <textarea
                rows={3}
                value={seo.metaDescription || ''}
                onChange={(e) => handleFieldChange('metaDescription', e.target.value)}
                placeholder={recommendedFallbacks.metaDescription}
                className="w-full text-xs p-3.5 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none leading-relaxed placeholder:text-gray-400"
              />
              <p className="text-[11px] text-gray-500">
                Resuma o valor arquitectónico da página em 1 a 2 frases convincentes.
              </p>
            </div>

            {/* Meta Keywords */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-800 flex items-center justify-between">
                <span>Palavras-Chave (Meta Keywords)</span>
                <span className="text-[11px] font-normal text-gray-400">Separadas por vírgula</span>
              </label>
              <input
                type="text"
                value={seo.metaKeywords || ''}
                onChange={(e) => handleFieldChange('metaKeywords', e.target.value)}
                placeholder={recommendedFallbacks.metaKeywords}
                className="w-full text-xs px-3.5 py-2.5 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none font-mono text-gray-700 placeholder:text-gray-400"
              />
            </div>

            {/* Canonical URL & Indexing Control */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {/* Canonical URL */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-800">
                  Canonical URL (URL Canónico)
                </label>
                <input
                  type="text"
                  value={seo.canonicalUrl || ''}
                  onChange={(e) => handleFieldChange('canonicalUrl', e.target.value)}
                  placeholder={`https://stakarquitectura.com${pagePath}`}
                  className="w-full text-xs px-3.5 py-2 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none font-mono text-gray-700 placeholder:text-gray-400"
                />
                <p className="text-[10px] text-gray-500">
                  Evita penalização por conteúdo duplicado no motor de busca.
                </p>
              </div>

              {/* Index / NoIndex Toggle */}
              <div className="space-y-1.5 p-3 rounded-xl border border-gray-200 bg-gray-50/70 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-800">
                    Indexação (Google / Bing)
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!isNoIndex}
                      onChange={(e) => handleFieldChange('noIndex', !e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>
                <p className="text-[10px] text-gray-500 leading-tight">
                  {isNoIndex
                    ? '⚠️ Página marcada com "noindex". Não aparecerá nos resultados de pesquisa.'
                    : '✅ Página pública autorizada a ser indexada normalmente.'}
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Open Graph Tags (WhatsApp, Facebook, LinkedIn) */}
          <div className="p-5 rounded-2xl border border-gray-200 bg-white shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <Icon icon="solar:share-bold" width="18" className="text-[#c6a87c]" />
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                  2. Open Graph (Partilha Social & WhatsApp)
                </h4>
              </div>
              <span className="text-[11px] text-gray-400 font-medium">og:*</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-800">
                  og:title (Título de Partilha)
                </label>
                <input
                  type="text"
                  value={seo.ogTitle || ''}
                  onChange={(e) => handleFieldChange('ogTitle', e.target.value)}
                  placeholder={currentTitle}
                  className="w-full text-xs px-3.5 py-2 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none placeholder:text-gray-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-800">
                  og:url (URL Partilhado)
                </label>
                <input
                  type="text"
                  value={seo.ogUrl || ''}
                  onChange={(e) => handleFieldChange('ogUrl', e.target.value)}
                  placeholder={currentCanonical}
                  className="w-full text-xs px-3.5 py-2 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none font-mono placeholder:text-gray-400"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-800">
                og:description (Descrição para Redes Sociais)
              </label>
              <textarea
                rows={2}
                value={seo.ogDescription || ''}
                onChange={(e) => handleFieldChange('ogDescription', e.target.value)}
                placeholder={currentDesc}
                className="w-full text-xs p-3 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none placeholder:text-gray-400"
              />
            </div>

            <ImagePickerInput
              label="og:image (Imagem de Destaque Social)"
              description="Proporção recomendada: 1200x630px (1.91:1). Exibida nos cartões do WhatsApp, LinkedIn e Facebook."
              value={seo.ogImage || ''}
              onChange={(url) => handleFieldChange('ogImage', url)}
              placeholder={recommendedFallbacks.ogImage}
            />
          </div>

          {/* Section 3: Twitter / X Card Tags */}
          <div className="p-5 rounded-2xl border border-gray-200 bg-white shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <Icon icon="solar:plain-bold" width="18" className="text-[#c6a87c]" />
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                  3. Twitter / X Card Tags
                </h4>
              </div>
              <span className="text-[11px] text-gray-400 font-medium">twitter:*</span>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-800">
                twitter:title (Título no X/Twitter)
              </label>
              <input
                type="text"
                value={seo.twitterTitle || ''}
                onChange={(e) => handleFieldChange('twitterTitle', e.target.value)}
                placeholder={currentOgTitle}
                className="w-full text-xs px-3.5 py-2 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-800">
                twitter:description (Resumo no X/Twitter)
              </label>
              <textarea
                rows={2}
                value={seo.twitterDescription || ''}
                onChange={(e) => handleFieldChange('twitterDescription', e.target.value)}
                placeholder={currentOgDesc}
                className="w-full text-xs p-3 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none placeholder:text-gray-400"
              />
            </div>

            <ImagePickerInput
              label="twitter:image (Imagem de Cartão X/Twitter)"
              description="Imagem de suporte no formato summary_large_image (1200x675px ou 1200x630px)."
              value={seo.twitterImage || ''}
              onChange={(url) => handleFieldChange('twitterImage', url)}
              placeholder={currentOgImage}
            />
          </div>
        </div>

        {/* Right Column: Live Interactive Previewers */}
        <div className="xl:col-span-5 space-y-6">
          <div className="sticky top-6 space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-800 flex items-center gap-1.5">
                  <Icon icon="solar:eye-bold" width="16" className="text-[#c6a87c]" />
                  <span>Pré-visualização em Tempo Real</span>
                </span>

                {/* Tabs */}
                <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setPreviewTab('google')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                      previewTab === 'google'
                        ? 'bg-white text-gray-900 shadow-xs'
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    Google
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewTab('social')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                      previewTab === 'social'
                        ? 'bg-white text-gray-900 shadow-xs'
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewTab('twitter')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                      previewTab === 'twitter'
                        ? 'bg-white text-gray-900 shadow-xs'
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    X / Twitter
                  </button>
                </div>
              </div>

              {/* 1. Google SERP Preview */}
              {previewTab === 'google' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-gray-400">
                    <span>Google Search Result Snippet</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setDevicePreview('desktop')}
                        className={`cursor-pointer ${
                          devicePreview === 'desktop' ? 'text-[#c6a87c] font-bold' : 'hover:text-gray-600'
                        }`}
                      >
                        Desktop
                      </button>
                      <span>|</span>
                      <button
                        type="button"
                        onClick={() => setDevicePreview('mobile')}
                        className={`cursor-pointer ${
                          devicePreview === 'mobile' ? 'text-[#c6a87c] font-bold' : 'hover:text-gray-600'
                        }`}
                      >
                        Mobile
                      </button>
                    </div>
                  </div>

                  <div
                    className={`p-4 bg-white rounded-xl border border-gray-200 shadow-xs space-y-1 font-sans ${
                      devicePreview === 'mobile' ? 'max-w-[340px] mx-auto' : ''
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                        S
                      </div>
                      <div className="truncate">
                        <div className="text-[11px] text-gray-800 font-medium leading-none truncate">
                          STAK Arquitectura & Design
                        </div>
                        <div className="text-[10px] text-gray-500 leading-none truncate font-mono mt-0.5">
                          {currentCanonical}
                        </div>
                      </div>
                    </div>

                    <h3 className="text-base text-[#1a0dab] font-medium hover:underline cursor-pointer line-clamp-2 pt-1 leading-snug">
                      {currentTitle}
                    </h3>
                    <p className="text-xs text-[#4d5156] line-clamp-3 leading-relaxed">
                      {currentDesc}
                    </p>
                  </div>
                </div>
              )}

              {/* 2. WhatsApp / LinkedIn Share Card Preview */}
              {previewTab === 'social' && (
                <div className="space-y-3">
                  <div className="text-[11px] text-gray-400">
                    WhatsApp & LinkedIn Link Card (1.91:1 Aspect Ratio)
                  </div>

                  <div className="rounded-xl border border-gray-200 overflow-hidden bg-gray-50 shadow-xs">
                    <div className="aspect-[1.91/1] bg-gray-950 relative overflow-hidden">
                      <img
                        src={currentOgImage}
                        alt="Social Share Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85';
                        }}
                      />
                    </div>
                    <div className="p-3 bg-white space-y-1">
                      <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">
                        STAKARQUITECTURA.COM
                      </span>
                      <h4 className="text-xs font-bold text-gray-900 line-clamp-1">
                        {currentOgTitle}
                      </h4>
                      <p className="text-[11px] text-gray-500 line-clamp-2 leading-snug">
                        {currentOgDesc}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. Twitter / X Card Preview */}
              {previewTab === 'twitter' && (
                <div className="space-y-3">
                  <div className="text-[11px] text-gray-400">
                    X / Twitter Summary Large Image Card
                  </div>

                  <div className="rounded-2xl border border-gray-200 overflow-hidden bg-black text-white shadow-xs">
                    <div className="aspect-[16/9] bg-gray-900 relative overflow-hidden">
                      <img
                        src={currentTwitterImage}
                        alt="Twitter Card Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85';
                        }}
                      />
                      <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm text-[10px] font-mono text-white">
                        stakarquitectura.com
                      </div>
                    </div>
                    <div className="p-3.5 space-y-1 bg-[#16181c]">
                      <h4 className="text-xs font-bold text-white line-clamp-1">
                        {currentTwitterTitle}
                      </h4>
                      <p className="text-[11px] text-gray-400 line-clamp-2 leading-snug">
                        {currentTwitterDesc}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Status and Health Checklist */}
              <div className="pt-2 border-t border-gray-100 space-y-2">
                <span className="text-[10px] font-mono uppercase text-gray-400 font-bold tracking-wider block">
                  Auditoria Automática de Qualidade SEO
                </span>
                <div className="space-y-1.5 text-[11px]">
                  <div className="flex items-center justify-between text-gray-600">
                    <span>Extensão do Título (30-60 chars)</span>
                    <span
                      className={
                        titleLength >= 30 && titleLength <= 60
                          ? 'text-emerald-600 font-bold'
                          : 'text-amber-600 font-semibold'
                      }
                    >
                      {titleLength >= 30 && titleLength <= 60 ? 'Ideal' : 'Ajustável'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-gray-600">
                    <span>Extensão da Descrição (120-160 chars)</span>
                    <span
                      className={
                        descLength >= 120 && descLength <= 160
                          ? 'text-emerald-600 font-bold'
                          : 'text-amber-600 font-semibold'
                      }
                    >
                      {descLength >= 120 && descLength <= 160 ? 'Ideal' : 'Ajustável'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-gray-600">
                    <span>Imagem OpenGraph (1200x630)</span>
                    <span className="text-emerald-600 font-bold">Configurada</span>
                  </div>

                  <div className="flex items-center justify-between text-gray-600">
                    <span>Canonical URL</span>
                    <span className="text-emerald-600 font-bold truncate max-w-[140px]">
                      {currentCanonical}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
