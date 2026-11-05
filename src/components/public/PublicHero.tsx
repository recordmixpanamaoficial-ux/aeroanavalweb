import React from 'react';
import { useApp } from '../../context/AppContext';
import { SENAN_LOGO } from '../../data/mockData';
import { Shield, Plane, Anchor, LifeBuoy, ArrowRight, PhoneCall, CheckCircle } from 'lucide-react';

interface PublicHeroProps {
  onOpenReportModal: () => void;
}

export const PublicHero: React.FC<PublicHeroProps> = ({ onOpenReportModal }) => {
  const { siteContent } = useApp();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="inicio" className="relative bg-slate-950 overflow-hidden text-white">
      {/* Background with naval-aeronautical aesthetic */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-blue-950/70 z-10" />
      <div
        className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30 transform scale-105"
        style={{
          backgroundImage: `url('${siteContent.heroBgImageUrl || 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1600&auto=format&fit=crop&q=80'}')`,
        }}
      />

      {/* Subtle radar scan lines effect */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e3a8a_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none z-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Hero Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-900/60 border border-blue-500/30 text-blue-300 text-xs font-semibold tracking-wider uppercase">
              <Shield size={14} className="text-amber-400" />
              <span>{siteContent.heroBadge}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-serif text-white leading-tight">
              {siteContent.heroTitleLine1} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200">
                {siteContent.heroTitleHighlight}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              {siteContent.heroDescription}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => scrollTo('flota')}
                className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm tracking-wide transition shadow-lg shadow-blue-900/40 flex items-center gap-2 group"
              >
                <span>Explorar Flota Aeronaval</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition transform" />
              </button>

              <button
                onClick={onOpenReportModal}
                className="px-6 py-3.5 rounded-xl bg-red-700 hover:bg-red-600 text-white font-bold text-sm tracking-wide transition shadow-lg shadow-red-950/50 flex items-center gap-2"
              >
                <PhoneCall size={16} />
                <span>Línea {siteContent.emergencyBarPhone} SOS Marítimo</span>
              </button>

              <button
                onClick={() => scrollTo('reclutamiento')}
                className="px-5 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-amber-300 font-semibold text-sm transition"
              >
                Admisión 2027
              </button>
            </div>

            {/* Quick Commitments */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800/80 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle size={15} className="text-emerald-400 shrink-0" />
                <span>{siteContent.heroCommitment1}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={15} className="text-emerald-400 shrink-0" />
                <span>{siteContent.heroCommitment2}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={15} className="text-emerald-400 shrink-0" />
                <span>{siteContent.heroCommitment3}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Official Escudo Showcase Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-blue-950/80 border border-amber-500/40 rounded-3xl p-8 shadow-2xl backdrop-blur-md text-center">
              {/* Gold decorative border accents */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-amber-400" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-amber-400" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-amber-400" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-amber-400" />

              <div className="relative inline-block mb-4">
                <div className="absolute -inset-3 bg-amber-500/10 rounded-full blur-xl animate-pulse" />
                <img
                  src={SENAN_LOGO}
                  alt="Escudo Oficial del Servicio Nacional Aeronaval"
                  className="relative w-44 h-52 object-contain mx-auto filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)]"
                />
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white font-serif tracking-wider">
                  SERVICIO NACIONAL AERONAVAL
                </h3>
                <p className="text-amber-400 text-xs font-bold tracking-[0.25em] uppercase">
                  DIOS · PATRIA · HONOR
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-800 text-left space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-400">Jurisdicción:</span>
                  <span className="font-semibold text-white">Caribe y Pacífico Panameño</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-400">Cuartel General:</span>
                  <span className="font-semibold text-white">Base Aeronaval Cocolí</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-400">Centro de Mando:</span>
                  <span className="font-semibold text-amber-400">COAN (Línea 108)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Operational Statistics Bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-slate-900/80 border border-slate-800 rounded-2xl backdrop-blur-md">
          <div className="text-center p-2 border-r border-slate-800 last:border-r-0">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">
              {siteContent.stat1Value}
            </div>
            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">
              {siteContent.stat1Label}
            </div>
          </div>

          <div className="text-center p-2 border-r border-slate-800 last:border-r-0">
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-400 font-mono">
              {siteContent.stat2Value}
            </div>
            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">
              {siteContent.stat2Label}
            </div>
          </div>

          <div className="text-center p-2 border-r border-slate-800 last:border-r-0">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">
              {siteContent.stat3Value}
            </div>
            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">
              {siteContent.stat3Label}
            </div>
          </div>

          <div className="text-center p-2">
            <div className="text-2xl sm:text-3xl font-extrabold text-red-400 font-mono">
              {siteContent.stat4Value}
            </div>
            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">
              {siteContent.stat4Label}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
