import React from 'react';
import { useApp } from '../../context/AppContext';
import { Plane, Anchor, ShieldCheck, Compass, Target, Award, Users, HeartHandshake } from 'lucide-react';

export const MissionVision: React.FC = () => {
  const { siteContent } = useApp();

  return (
    <section id="comandos" className="py-20 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-widest uppercase mb-3">
            {siteContent.doctrineHeaderBadge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif tracking-tight text-white">
            {siteContent.doctrineHeaderTitle}
          </h2>
          <p className="mt-4 text-base text-slate-300">
            {siteContent.doctrineHeaderSubtitle}
          </p>
        </div>

        {/* 3 Main Operational Commands */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Comando Aéreo */}
          <div className="bg-slate-950/80 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-7 transition duration-300 flex flex-col justify-between group shadow-xl">
            <div>
              <div className="w-14 h-14 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition duration-300">
                <Plane size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-serif">
                {siteContent.airCommandTitle}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                {siteContent.airCommandDescription}
              </p>
              <ul className="text-xs text-slate-400 space-y-2 border-t border-slate-800 pt-4">
                {(siteContent.airCommandBullets || []).map((bullet, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Comando Naval */}
          <div className="bg-slate-950/80 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-7 transition duration-300 flex flex-col justify-between group shadow-xl">
            <div>
              <div className="w-14 h-14 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-slate-950 transition duration-300">
                <Anchor size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-serif">
                {siteContent.navalCommandTitle}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                {siteContent.navalCommandDescription}
              </p>
              <ul className="text-xs text-slate-400 space-y-2 border-t border-slate-800 pt-4">
                {(siteContent.navalCommandBullets || []).map((bullet, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Infantería Aeronaval */}
          <div className="bg-slate-950/80 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-7 transition duration-300 flex flex-col justify-between group shadow-xl">
            <div>
              <div className="w-14 h-14 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition duration-300">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-serif">
                {siteContent.infantryCommandTitle}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                {siteContent.infantryCommandDescription}
              </p>
              <ul className="text-xs text-slate-400 space-y-2 border-t border-slate-800 pt-4">
                {(siteContent.infantryCommandBullets || []).map((bullet, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Mission & Vision Banner */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gradient-to-r from-blue-950/40 via-slate-950/60 to-slate-950/80 border border-slate-800 rounded-2xl p-8 lg:p-10">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <Target size={16} />
              <span>Nuestra Misión</span>
            </div>
            <h4 className="text-2xl font-bold font-serif text-white">
              {siteContent.missionTitle}
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              {siteContent.missionDescription}
            </p>
          </div>

          <div className="space-y-4 border-t md:border-t-0 md:border-l border-slate-800 pt-6 md:pt-0 md:pl-8">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400">
              <Compass size={16} />
              <span>Nuestra Visión y Valores</span>
            </div>
            <h4 className="text-2xl font-bold font-serif text-white">
              {siteContent.visionTitle}
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              {siteContent.visionDescription}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
