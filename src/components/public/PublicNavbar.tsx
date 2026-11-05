import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SENAN_LOGO } from '../../data/mockData';
import { PhoneCall, ShieldAlert, Lock, Menu, X, Compass, Anchor, Plane, FileText } from 'lucide-react';

interface PublicNavbarProps {
  onOpenReportModal: () => void;
}

export const PublicNavbar: React.FC<PublicNavbarProps> = ({ onOpenReportModal }) => {
  const { openLoginModal, siteContent } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full shadow-lg">
      {/* Top emergency ribbon */}
      <div className="bg-slate-950 text-slate-300 text-[11px] px-4 py-1.5 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-red-400 font-bold tracking-wider">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block"></span>
              {siteContent.emergencyBarText}
            </span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:inline text-slate-400">
              República de Panamá · Ministerio de Seguridad Pública
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-amber-400 font-semibold italic hidden sm:inline">
              "{siteContent.emergencyMotto}"
            </span>

            {/* Discrete Portal Access button - styled as a discreet secure lock */}
            <button
              onClick={() => openLoginModal('officer')}
              className="text-slate-400 hover:text-amber-300 transition flex items-center gap-1.5 px-2 py-0.5 rounded border border-slate-800 hover:border-amber-500/40 text-[11px] bg-slate-900/60"
              title="Acceso Seguro a la Red Interna SENAN"
            >
              <Lock size={11} className="text-amber-400" />
              <span>Acceso Institucional</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <nav className="bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo & Institutional Title */}
            <div
              onClick={() => scrollTo('inicio')}
              className="flex items-center gap-3.5 cursor-pointer group"
            >
              <img
                src={SENAN_LOGO}
                alt="Escudo Oficial SENAN"
                className="w-13 h-15 object-contain group-hover:scale-105 transition transform duration-200"
              />
              <div>
                <span className="text-[10px] font-bold tracking-widest text-amber-400 uppercase block">
                  República de Panamá
                </span>
                <span className="text-lg md:text-xl font-extrabold tracking-tight text-white block leading-tight font-serif">
                  SERVICIO NACIONAL AERONAVAL
                </span>
                <span className="text-[11px] text-slate-400 tracking-wider hidden sm:block">
                  Comando Aéreo · Comando Naval · Infantería Aeronaval
                </span>
              </div>
            </div>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-1 text-sm font-medium">
              <button
                onClick={() => scrollTo('inicio')}
                className="px-3 py-2 text-slate-200 hover:text-amber-400 transition"
              >
                Inicio
              </button>
              <button
                onClick={() => scrollTo('comandos')}
                className="px-3 py-2 text-slate-200 hover:text-amber-400 transition"
              >
                Comandos
              </button>
              <button
                onClick={() => scrollTo('flota')}
                className="px-3 py-2 text-slate-200 hover:text-amber-400 transition"
              >
                Flota
              </button>
              <button
                onClick={() => scrollTo('operaciones')}
                className="px-3 py-2 text-slate-200 hover:text-amber-400 transition"
              >
                Misiones SAR
              </button>
              <button
                onClick={() => scrollTo('directores')}
                className="px-3 py-2 text-slate-200 hover:text-amber-400 transition"
              >
                Directores
              </button>
              <button
                onClick={() => scrollTo('noticias')}
                className="px-3 py-2 text-slate-200 hover:text-amber-400 transition"
              >
                Comunicados
              </button>
              <button
                onClick={() => scrollTo('reclutamiento')}
                className="px-3 py-2 text-slate-200 hover:text-amber-400 transition"
              >
                Admisión 2027
              </button>

              {/* Action Buttons */}
              <button
                onClick={onOpenReportModal}
                className="ml-2 px-3.5 py-2 rounded-lg bg-red-700 hover:bg-red-600 text-white text-xs font-bold tracking-wider uppercase transition shadow-md shadow-red-950 flex items-center gap-1.5"
              >
                <ShieldAlert size={14} />
                <span>Denuncia / SOS 108</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={onOpenReportModal}
                className="px-2.5 py-1.5 rounded-lg bg-red-700 text-white text-[11px] font-bold flex items-center gap-1"
              >
                <PhoneCall size={12} />
                <span>108</span>
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-400 hover:text-white rounded-lg focus:outline-none"
                aria-label="Abrir Menú"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 pt-3 pb-6 space-y-2 text-sm font-medium">
            <button
              onClick={() => scrollTo('inicio')}
              className="w-full text-left py-2 px-3 rounded hover:bg-slate-900 text-slate-200"
            >
              Inicio
            </button>
            <button
              onClick={() => scrollTo('comandos')}
              className="w-full text-left py-2 px-3 rounded hover:bg-slate-900 text-slate-200"
            >
              Comandos Aéreo y Naval
            </button>
            <button
              onClick={() => scrollTo('flota')}
              className="w-full text-left py-2 px-3 rounded hover:bg-slate-900 text-slate-200"
            >
              Flota de Aeronaves y Embarcaciones
            </button>
            <button
              onClick={() => scrollTo('operaciones')}
              className="w-full text-left py-2 px-3 rounded hover:bg-slate-900 text-slate-200"
            >
              Operaciones y Búsqueda SAR
            </button>
            <button
              onClick={() => scrollTo('directores')}
              className="w-full text-left py-2 px-3 rounded hover:bg-slate-900 text-slate-200"
            >
              Alto Mando y Directores
            </button>
            <button
              onClick={() => scrollTo('noticias')}
              className="w-full text-left py-2 px-3 rounded hover:bg-slate-900 text-slate-200"
            >
              Sala de Prensa y Comunicados
            </button>
            <button
              onClick={() => scrollTo('reclutamiento')}
              className="w-full text-left py-2 px-3 rounded hover:bg-slate-900 text-amber-400 font-semibold"
            >
              Admisión y Reclutamiento 2027
            </button>

            <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
              <button
                onClick={onOpenReportModal}
                className="w-full py-2.5 px-3 bg-red-700 rounded-lg text-center font-bold text-white flex items-center justify-center gap-2"
              >
                <ShieldAlert size={16} />
                <span>Reporte de Emergencia Línea 108</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openLoginModal('officer');
                }}
                className="w-full py-2 px-3 bg-slate-800 rounded-lg text-center text-xs text-slate-300 hover:text-white flex items-center justify-center gap-1.5"
              >
                <Lock size={12} className="text-amber-400" />
                <span>Portal Institucional SIS-AERONAVAL</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
