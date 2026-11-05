import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PublicNews } from '../../types';
import { Newspaper, Calendar, User, ArrowRight, X } from 'lucide-react';

export const NewsSection: React.FC = () => {
  const { news } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [activeArticle, setActiveArticle] = useState<PublicNews | null>(null);

  const categories = ['Todas', 'Operaciones', 'Búsqueda y Rescate (SAR)', 'Acción Social', 'Institucional'];

  const filteredNews = news.filter((item) => {
    if (selectedCategory === 'Todas') return true;
    return item.category === selectedCategory;
  });

  return (
    <section id="noticias" className="py-20 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-widest uppercase mb-3">
              <Newspaper size={14} />
              <span>Sala de Prensa y Comunicación Social</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-white">
              Boletines y Comunicados Oficiales
            </h2>
            <p className="mt-2 text-slate-400 text-sm max-w-xl">
              Información oficial verídica sobre operaciones, decomisos, rescates y vida institucional del Servicio Nacional Aeronaval.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 mt-6 md:mt-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* News Grid */}
        {filteredNews.length === 0 ? (
          <div className="p-10 bg-slate-900/60 rounded-2xl border border-slate-800 text-center max-w-lg mx-auto space-y-2">
            <Newspaper size={28} className="text-amber-400 mx-auto" />
            <h4 className="text-base font-bold text-white font-serif">
              Sala de Prensa en Preparación
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              No hay comunicados publicados en este momento. Las notas de prensa e intervenciones oficiales se emitirán directamente desde la Dirección de Comunicación y Mando.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((article) => (
              <div
                key={article.id}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden shadow-lg transition duration-200 flex flex-col justify-between group"
              >
              <div>
                <div className="relative h-48 overflow-hidden bg-slate-950">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded bg-slate-950/80 backdrop-blur-md text-amber-400 text-[10px] font-bold uppercase tracking-wider border border-amber-500/30">
                      {article.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} className="text-amber-400" />
                      {article.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 truncate">
                      <User size={12} />
                      {article.author}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white font-serif line-clamp-2 mb-3 group-hover:text-amber-300 transition">
                    {article.title}
                  </h3>

                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                    {article.summary}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-slate-800/80">
                <button
                  onClick={() => setActiveArticle(article)}
                  className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition group/btn"
                >
                  <span>Leer Comunicado Completo</span>
                  <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

        {/* Article Reader Modal */}
        {activeArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative text-white max-h-[90vh] flex flex-col">
              <div className="relative h-56 bg-slate-950 shrink-0">
                <img
                  src={activeArticle.imageUrl}
                  alt={activeArticle.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setActiveArticle(null)}
                  className="absolute top-4 right-4 p-2 bg-slate-900/80 hover:bg-slate-800 rounded-full text-slate-300 hover:text-white"
                >
                  <X size={18} />
                </button>
                <div className="absolute bottom-3 left-4">
                  <span className="px-2.5 py-1 rounded bg-amber-500 text-slate-950 text-xs font-bold uppercase">
                    {activeArticle.category}
                  </span>
                </div>
              </div>

              <div className="p-6 overflow-y-auto space-y-4">
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span>{activeArticle.date}</span>
                  <span>•</span>
                  <span>{activeArticle.author}</span>
                </div>

                <h3 className="text-xl font-bold font-serif text-white">
                  {activeArticle.title}
                </h3>

                <p className="text-xs font-medium text-amber-300/90 italic border-l-2 border-amber-400 pl-3">
                  {activeArticle.summary}
                </p>

                <div className="text-sm text-slate-300 leading-relaxed space-y-3 pt-2">
                  <p>{activeArticle.content}</p>
                </div>

                <div className="pt-4 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400">
                  <span>Servicio Nacional Aeronaval de Panamá</span>
                  <button
                    onClick={() => setActiveArticle(null)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
