import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BookOpen, Shield, Calendar, AlertOctagon, FileCheck, Eye, Download } from 'lucide-react';
import { Directive } from '../../types';

export const TacticalDirectives: React.FC = () => {
  const { directives } = useApp();
  const [selectedDir, setSelectedDir] = useState<Directive | null>(null);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold font-serif text-white flex items-center gap-2">
            <BookOpen size={20} className="text-amber-400" />
            <span>Directivas Reservadas & Órdenes del Día</span>
          </h3>
          <p className="text-xs text-slate-400">
            Boletines oficiales de acatamiento obligatorio emitidos por el Director General y Estado Mayor
          </p>
        </div>

        <div className="text-[11px] px-3 py-1 bg-red-950/60 border border-red-500/40 text-red-300 rounded-lg flex items-center gap-1.5 font-bold uppercase tracking-wider">
          <AlertOctagon size={13} />
          <span>Información de Uso Oficial Reservado</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {directives.map((dir) => (
          <div
            key={dir.id}
            className="bg-slate-950 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-5 transition flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-amber-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  {dir.code}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-red-950 text-red-300 font-bold uppercase tracking-wider border border-red-800/40">
                  {dir.confidentiality}
                </span>
              </div>

              <h4 className="text-sm font-bold text-white font-serif group-hover:text-amber-300 transition">
                {dir.title}
              </h4>

              <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                {dir.summary}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <Calendar size={12} />
                {dir.date}
              </span>
              <button
                onClick={() => setSelectedDir(dir)}
                className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
              >
                <Eye size={12} />
                <span>Leer</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Reader Modal */}
      {selectedDir && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-slate-900 border border-amber-500/50 rounded-2xl max-w-xl w-full p-6 text-white space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-amber-400">{selectedDir.code}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-red-950 text-red-300 font-bold uppercase">
                  {selectedDir.confidentiality}
                </span>
              </div>
              <button
                onClick={() => setSelectedDir(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <h3 className="text-lg font-bold font-serif text-white">
              {selectedDir.title}
            </h3>

            <div className="text-xs text-slate-400 flex items-center gap-3">
              <span>Emisor: {selectedDir.author}</span>
              <span>·</span>
              <span>Fecha: {selectedDir.date}</span>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-2">
              <p>{selectedDir.summary}</p>
              <p>
                Todo oficial, clase y agente deberá dar estricto cumplimiento y asentar su toma de conocimiento en el parte diario de la respectiva guardia.
              </p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[10px] text-slate-500">Copia digital autenticada C2-SENAN</span>
              <button
                onClick={() => setSelectedDir(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-xl text-white transition"
              >
                Entendido y Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
