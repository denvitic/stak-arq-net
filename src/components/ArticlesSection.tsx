import React, { useState } from 'react';
import { useCms } from '../context/CmsContext';
import { Article } from '../types';
import { Calendar, Clock, ArrowUpRight, X, User } from 'lucide-react';

export const ArticlesSection: React.FC = () => {
  const { articles } = useCms();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <section id="artigos" className="py-24 sm:py-32 bg-[#0c0d0f] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#c6a87c] tracking-[0.25em] uppercase mb-3">
              <span>Diário & Publicações</span>
              <span>/</span>
              <span>Notícias do Atelier</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading leading-tight">
              Pensamento crítico, ensaios de arquitectura e acompanhamento de obras.
            </h2>
          </div>
          <p className="text-sm text-[#9ca3af] max-w-sm font-light">
            Reflexões sobre sustentabilidade bioclimática, inovação em materiais e a transformação urbana de Luanda.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="group cursor-pointer bg-[#111216] border border-white/10 rounded-lg overflow-hidden flex flex-col justify-between hover:border-[#c6a87c]/50 transition-all duration-300 shadow-lg hover:-translate-y-1"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-black/50">
                  <img
                    src={article.image}
                    alt={article.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-sm bg-black/80 backdrop-blur-md text-[#c6a87c] text-[10px] font-mono uppercase tracking-wider border border-white/10">
                    {article.category}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-[11px] text-[#8c909c] mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#c6a87c]" />
                      {article.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#c6a87c]" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white font-heading group-hover:text-[#c6a87c] transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs text-[#9ca3af] mt-2.5 line-clamp-3 font-light leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between border-t border-white/5 mt-4 pt-4 text-xs">
                <span className="text-[#8c909c] text-[11px]">Por: {article.author}</span>
                <span className="text-[#c6a87c] font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Ler Artigo
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div
            className="bg-[#121317] border border-white/15 rounded-xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedArticle(null)}
              className="absolute top-5 right-5 p-2 rounded-md bg-white/5 hover:bg-white/15 text-white/80 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-xs font-mono uppercase tracking-wider text-[#c6a87c] mb-2">
              {selectedArticle.category} • {selectedArticle.date}
            </div>
            <h2 className="text-2xl font-bold text-white font-heading mb-4 leading-tight">
              {selectedArticle.title}
            </h2>

            <div className="aspect-[16/9] rounded-lg overflow-hidden mb-6 border border-white/10">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4 text-sm text-[#b0b4c0] leading-relaxed font-light">
              {selectedArticle.content.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-[#8c909c]">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-[#c6a87c]" />
                {selectedArticle.author}
              </span>
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="px-4 py-2 rounded bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                Fechar Leitura
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
