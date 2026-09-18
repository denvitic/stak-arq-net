import React, { useState } from 'react';
import { useCms } from '../context/CmsContext';
import { Article, NavPage } from '../types';
import {
  Calendar,
  Clock,
  ArrowRight,
  BookOpen,
  X,
  Share2,
  Tag,
  Mail,
  CheckCircle2
} from 'lucide-react';

interface ArticlesPageProps {
  onNavigate: (page: NavPage) => void;
}

export const ArticlesPage: React.FC<ArticlesPageProps> = ({ onNavigate }) => {
  const { articles, pagesContent } = useCms();
  const articlesData = pagesContent?.articles;
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-[#090a0c] text-[#e8e8ea] pb-20">
      {/* 1. Header with Featured Background Image */}
      {(articlesData?.hero?.enabled ?? true) && (
      <div className="page-hero-banner border-b border-white/10 relative min-h-[420px] sm:min-h-[480px] pt-28 sm:pt-36 pb-16 sm:pb-24 flex items-center overflow-hidden">
        {/* Background Image with Dark Vignette & Architectural Gradients */}
        <div className="absolute inset-0 z-0">
          <img
            src={articlesData?.hero?.bgImage || 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=2000&q=85'}
            alt="Ensaios Teóricos e Publicações STAK Arquitectura"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover filter brightness-[0.35] contrast-110 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090a0c] via-[#090a0c]/75 to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#090a0c] via-[#090a0c]/80 to-transparent" />
          {/* Blueprint grid */}
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#c6a87c_1px,transparent_1px)] [background-size:24px_24px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10 w-full">
          <div className="flex items-center gap-2 text-xs font-mono text-[#c6a87c] uppercase tracking-[0.25em] mb-4">
            <button
              type="button"
              onClick={() => onNavigate('inicio')}
              className="hover:underline cursor-pointer"
            >
              Início
            </button>
            <span>/</span>
            <span className="text-white">{articlesData?.hero?.badge || 'Publicações & Diário do Atelier'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight font-heading max-w-4xl leading-tight mb-6">
            {articlesData?.hero?.title || 'Reflexões sobre arquitectura, bioclimatismo e a cidade de Luanda.'}
          </h1>

          <p className="text-sm sm:text-lg text-[#d1d5db] max-w-3xl font-light leading-relaxed">
            {articlesData?.hero?.description ||
              'Ensaios críticos, notas de estaleiro e investigações materiais desenvolvidas pelo corpo técnico do atelier STAK.'}
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-8 pt-6 border-t border-white/10 text-xs font-mono text-[#9ca3af]">
            <span>{articles.length} Artigos Publicados</span>
            <span>•</span>
            <span>Investigação Teórica & Prática de Estaleiro</span>
          </div>
        </div>
      </div>
      )}

      {/* 2. Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Optional Editorial Intro */}
        {articlesData?.sections?.editorialIntro?.enabled !== false && articlesData?.sections?.editorialIntro?.title && (
          <div className="mb-12 max-w-3xl space-y-2">
            {articlesData.sections.editorialIntro.tag && (
              <span className="text-xs font-mono text-[#c6a87c] uppercase tracking-widest block">
                {articlesData.sections.editorialIntro.tag}
              </span>
            )}
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading">
              {articlesData.sections.editorialIntro.title}
            </h2>
            {articlesData.sections.editorialIntro.description && (
              <p className="text-sm text-[#9ca3af] font-light">
                {articlesData.sections.editorialIntro.description}
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="group cursor-pointer bg-[#111216] border border-white/10 rounded-xl overflow-hidden hover:border-[#c6a87c]/50 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 shadow-xl"
            >
              <div>
                <div className="aspect-[16/10] overflow-hidden bg-black/60 relative">
                  <img
                    src={article.image}
                    alt={article.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-sm bg-black/80 backdrop-blur-md text-[#c6a87c] text-[10px] font-mono uppercase tracking-wider border border-white/10">
                      {article.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-[#8c909c] font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#c6a87c]" />
                      {article.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white font-heading group-hover:text-[#c6a87c] transition-colors leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#9ca3af] line-clamp-3 font-light leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-[#8c909c] text-[11px] font-mono">Por {article.author}</span>
                <span className="text-[#c6a87c] font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Ler Ensaio
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* 3. Boletim de Investigação Arquitectónica */}
      {(articlesData?.sections?.newsletter?.enabled ?? true) && (
      <section className="py-20 bg-[#0c0d10] border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-2xl bg-[#111216] border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="max-w-xl space-y-3 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#c6a87c] uppercase tracking-widest">
                <BookOpen className="w-4 h-4" />
                <span>{articlesData?.sections?.newsletter?.badge || 'Boletim Trimestral do Atelier'}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading">
                {articlesData?.sections?.newsletter?.title || 'Receba estudos de caso e análises de materiais no seu e-mail.'}
              </h3>
              <p className="text-xs sm:text-sm text-[#9ca3af] font-light">
                {articlesData?.sections?.newsletter?.description ||
                  'Partilhamos com promotores, engenheiros e amantes de arquitectura ensaios técnicos inéditos sobre construção em Luanda.'}
              </p>
            </div>

            <div className="w-full lg:max-w-md">
              {newsletterSubscribed ? (
                <div className="p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>Subscrição confirmada! Obrigado pelo interesse nas publicações do atelier.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-[#8c909c] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="seu.email@empresa.ao"
                      className="w-full bg-[#161820] border border-white/10 rounded-sm pl-10 pr-4 py-3 text-xs text-white placeholder-[#6b7280] focus:border-[#c6a87c] focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#c6a87c] hover:bg-[#d8bb90] text-black font-bold text-xs uppercase tracking-wider rounded-sm transition-all cursor-pointer shrink-0"
                  >
                    {articlesData?.sections?.newsletter?.buttonLabel || 'Subscrever'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
      )}

      {/* 4. Article Reading Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-[#111216] border border-white/15 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 space-y-6 relative shadow-2xl animate-in fade-in">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedArticle(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/15 text-white/80 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 text-xs text-[#8c909c] font-mono">
              <span className="px-2.5 py-0.5 rounded bg-[#c6a87c]/10 text-[#c6a87c] border border-[#c6a87c]/30 uppercase">
                {selectedArticle.category}
              </span>
              <span>•</span>
              <span>{selectedArticle.date}</span>
              <span>•</span>
              <span>{selectedArticle.readTime}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading leading-snug">
              {selectedArticle.title}
            </h2>

            <div className="text-xs font-mono text-[#c6a87c]">
              Publicado pelo gabinete técnico da STAK Arquitectura • Autor: {selectedArticle.author}
            </div>

            <div className="aspect-[16/9] rounded-xl overflow-hidden bg-black/60 border border-white/10">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content Paragraphs */}
            <div className="space-y-4 text-sm sm:text-base text-[#d1d5db] font-light leading-relaxed">
              {selectedArticle.content.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider rounded-sm"
              >
                Fechar Artigo
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedArticle(null);
                  onNavigate('contactos');
                }}
                className="px-6 py-2.5 bg-[#c6a87c] text-black text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-[#d8bb90]"
              >
                Discutir Projecto com o Autor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
