import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Newspaper, PlusCircle, Trash2, Calendar, User, Eye, CheckCircle2 } from 'lucide-react';
import { PublicNews } from '../../types';

export const NewsManager: React.FC = () => {
  const { news, addNews, updateNews, deleteNews } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<PublicNews | null>(null);

  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<PublicNews['category']>('Operaciones');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&auto=format&fit=crop&q=80');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addNews({
      title,
      summary,
      content,
      category,
      imageUrl,
      date: new Date().toLocaleDateString('es-PA', { day: 'numeric', month: 'long', year: 'numeric' }),
      author: 'Comandancia General del SENAN',
      featured: false,
    });

    setShowModal(false);
    setTitle('');
    setSummary('');
    setContent('');
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold font-serif text-white flex items-center gap-2">
            <Newspaper size={20} className="text-amber-400" />
            <span>Gestión de Noticias y Comunicados de Prensa</span>
          </h3>
          <p className="text-xs text-slate-400">
            Publicación oficial de boletines institucionales visibles en el portal público
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition flex items-center gap-1.5 shadow"
        >
          <PlusCircle size={15} />
          <span>Publicar Nuevo Comunicado</span>
        </button>
      </div>

      <div className="space-y-4">
        {news.map((item) => (
          <div
            key={item.id}
            className="p-4 bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs"
          >
            <div className="flex items-start gap-4">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-20 h-16 rounded-xl object-cover border border-slate-800 shrink-0"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase">
                    {item.category}
                  </span>
                  <span className="text-slate-400 text-[11px]">{item.date}</span>
                </div>
                <h4 className="font-bold text-white text-sm line-clamp-1">{item.title}</h4>
                <p className="text-slate-400 line-clamp-1 text-[11px]">{item.summary}</p>
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-2">
              <button
                onClick={() => {
                  setEditingItem(item);
                  setTitle(item.title);
                  setSummary(item.summary);
                  setContent(item.content);
                  setCategory(item.category);
                  setImageUrl(item.imageUrl);
                }}
                className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-lg text-xs font-semibold transition"
              >
                Editar
              </button>
              <button
                onClick={() => {
                  if (confirm(`¿Desea eliminar la noticia "${item.title}"?`)) {
                    deleteNews(item.id);
                  }
                }}
                className="px-3 py-1.5 bg-red-950/60 hover:bg-red-900 border border-red-500/30 text-red-300 rounded-lg text-xs font-semibold flex items-center gap-1 transition"
              >
                <Trash2 size={13} />
                <span>Eliminar</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit News Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-amber-500/40 rounded-2xl max-w-xl w-full p-6 text-white space-y-4 text-xs max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="text-base font-bold font-serif text-white">Editar Comunicado de Prensa</h4>
              <button onClick={() => setEditingItem(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateNews(editingItem.id, {
                  title,
                  summary,
                  content,
                  category,
                  imageUrl,
                });
                setEditingItem(null);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-slate-300 font-medium mb-1">Título del Comunicado *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Categoría *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  >
                    <option>Operaciones</option>
                    <option>Búsqueda y Rescate (SAR)</option>
                    <option>Acción Social</option>
                    <option>Institucional</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">URL de Portada</label>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Resumen *</label>
                <textarea
                  required
                  rows={2}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Cuerpo Completo *</label>
                <textarea
                  required
                  rows={5}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 bg-slate-800 rounded-xl text-slate-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-amber-500/40 rounded-2xl max-w-xl w-full p-6 text-white space-y-4 text-xs max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="text-base font-bold font-serif text-white">Redactar Comunicado de Prensa</h4>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Título del Comunicado *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="ej. SENAN intercepta embarcación y rescata tripulación en Bocas del Toro"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Categoría *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  >
                    <option>Operaciones</option>
                    <option>Búsqueda y Rescate (SAR)</option>
                    <option>Acción Social</option>
                    <option>Institucional</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">URL de Imagen de Portada</label>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Resumen / Entradilla *</label>
                <textarea
                  required
                  rows={2}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Breve resumen visible en la tarjeta principal..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Cuerpo Completo de la Noticia *</label>
                <textarea
                  required
                  rows={5}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Texto oficial extendido..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-slate-800 rounded-xl text-slate-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow"
                >
                  Publicar en la Web Pública
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
