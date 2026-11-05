import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SENAN_LOGO } from '../../data/mockData';
import { Shield, Award, Phone, Mail, ChevronRight, UserCheck } from 'lucide-react';
import { DirectorProfile } from '../../types';

export const DirectorsSection: React.FC = () => {
  const { directors } = useApp();
  const [selectedDirector, setSelectedDirector] = useState<DirectorProfile | null>(null);

  const sortedDirectors = [...directors].sort((a, b) => a.order - b.order);
  const directorGeneral = sortedDirectors.find((d) => d.order === 1) || sortedDirectors[0];
  const otherDirectors = sortedDirectors.filter((d) => d.id !== directorGeneral?.id);

  return (
    <section id="directores" className="py-20 bg-slate-900/60 border-t border-slate-800 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Award size={14} />
            <span>Cadena de Mando Superior</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif tracking-tight text-white">
            Alto Mando y Directores de la Aeronaval
          </h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto mt-4 mb-4 rounded-full" />
          <p className="text-sm text-slate-300">
            Oficiales superiores y comisionados al frente de la conducción estratégica, 
            operacional y doctrinaria del Servicio Nacional Aeronaval de la República de Panamá.
          </p>
        </div>

        {/* Featured Card: Director General */}
        {directorGeneral && (
          <div className="mb-12 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl -z-0 pointer-events-none" />
            <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 bg-amber-500 text-slate-950 rounded-full font-bold text-xs uppercase tracking-wider shadow">
              <Shield size={13} />
              <span>Comandancia General</span>
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="relative shrink-0">
                <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden border-2 border-amber-500/60 shadow-xl bg-slate-800">
                  <img
                    src={directorGeneral.photoUrl}
                    alt={directorGeneral.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <img
                  src={SENAN_LOGO}
                  alt="Escudo Oficial"
                  className="w-12 h-14 object-contain absolute -bottom-3 -right-3 drop-shadow-xl"
                />
              </div>

              <div className="flex-1 text-center md:text-left space-y-3">
                <div className="inline-block px-3 py-0.5 rounded bg-amber-500/20 text-amber-300 text-xs font-mono font-bold uppercase">
                  {directorGeneral.rank}
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white">
                  {directorGeneral.name}
                </h3>
                <p className="text-amber-400 font-semibold text-sm sm:text-base">
                  {directorGeneral.position}
                </p>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
                  {directorGeneral.bio}
                </p>

                <div className="pt-3 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-slate-400 border-t border-slate-800">
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <UserCheck size={14} className="text-amber-400" />
                    <span>{directorGeneral.department}</span>
                  </span>
                  {directorGeneral.phone && (
                    <span className="flex items-center gap-1.5">
                      <Phone size={14} className="text-emerald-400" />
                      <span>{directorGeneral.phone}</span>
                    </span>
                  )}
                  {directorGeneral.email && (
                    <span className="flex items-center gap-1.5">
                      <Mail size={14} className="text-blue-400" />
                      <span>{directorGeneral.email}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Grid of Other High Command Directors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherDirectors.map((director) => (
            <div
              key={director.id}
              className="bg-slate-950 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-xl group"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative shrink-0">
                    <img
                      src={director.photoUrl}
                      alt={director.name}
                      className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl object-cover border border-slate-700 group-hover:border-amber-400 transition"
                    />
                    <img
                      src={SENAN_LOGO}
                      alt="SENAN"
                      className="w-6 h-7 object-contain absolute -bottom-1 -right-1 drop-shadow"
                    />
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-amber-400 uppercase font-mono block">
                      {director.rank}
                    </span>
                    <h4 className="text-base font-bold font-serif text-white group-hover:text-amber-300 transition">
                      {director.name}
                    </h4>
                    <p className="text-xs text-slate-300 font-medium line-clamp-1 mt-0.5">
                      {director.position}
                    </p>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800/80 leading-relaxed">
                  <span className="block font-semibold text-slate-300 text-[10px] uppercase mb-1">
                    {director.department}
                  </span>
                  <p className="line-clamp-3">{director.bio}</p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <div className="flex items-center gap-2">
                  {director.phone && (
                    <span className="flex items-center gap-1 font-mono text-[10px]">
                      <Phone size={11} className="text-emerald-400" />
                      {director.phone}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setSelectedDirector(director)}
                  className="text-amber-400 hover:text-white flex items-center gap-0.5 font-bold transition text-xs"
                >
                  <span>Ver Ficha</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal with full director details */}
      {selectedDirector && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="bg-slate-900 border border-amber-500/40 rounded-3xl max-w-lg w-full p-6 text-white space-y-4 shadow-2xl animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                <Shield size={16} />
                <span>Hoja de Servicio de Alto Mando</span>
              </div>
              <button
                onClick={() => setSelectedDirector(null)}
                className="text-slate-400 hover:text-white text-base"
              >
                ✕
              </button>
            </div>

            <div className="flex items-center gap-4">
              <img
                src={selectedDirector.photoUrl}
                alt={selectedDirector.name}
                className="w-24 h-24 rounded-2xl object-cover border-2 border-amber-400 shrink-0"
              />
              <div>
                <span className="text-xs font-mono font-bold text-amber-400 block">
                  {selectedDirector.rank}
                </span>
                <h3 className="text-xl font-bold font-serif text-white">
                  {selectedDirector.name}
                </h3>
                <p className="text-xs text-slate-300 font-semibold mt-0.5">
                  {selectedDirector.position}
                </p>
                <p className="text-[11px] text-slate-400">
                  {selectedDirector.department}
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                Trayectoria Institucional:
              </span>
              <p>{selectedDirector.bio}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs pt-2">
              {selectedDirector.phone && (
                <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Teléfono Oficial:</span>
                  <span className="font-mono text-slate-200 font-bold">{selectedDirector.phone}</span>
                </div>
              )}
              {selectedDirector.email && (
                <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Correo Electrónico:</span>
                  <span className="font-mono text-slate-200 font-bold text-[11px] truncate block">{selectedDirector.email}</span>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedDirector(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
