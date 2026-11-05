import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, Globe, ChevronDown, ChevronUp, Lock, Plane, Anchor, LogOut, KeyRound } from 'lucide-react';

export const RoleSwitcherBar: React.FC = () => {
  const { activeRole, currentUser, logout, openLoginModal } = useApp();
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="fixed bottom-3 right-3 z-50 print:hidden font-sans">
      <div className="bg-slate-900/95 text-white backdrop-blur-md border border-amber-500/40 rounded-2xl shadow-2xl p-3 transition-all duration-200 max-w-sm">
        <div className="flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-amber-400 uppercase tracking-wider text-[11px]">
            <Lock size={12} className="text-amber-400" />
            <span>Acceso con Usuario & Contraseña</span>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition"
            title={isExpanded ? 'Minimizar' : 'Expandir'}
          >
            {isExpanded ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
          </button>
        </div>

        {isExpanded && (
          <div className="mt-2.5 pt-2 border-t border-slate-800 space-y-2.5">
            <div className="text-[11px] text-slate-300">
              Estado actual:{' '}
              {activeRole === 'public' ? (
                <span className="font-semibold text-blue-400">🌐 En Portal Público (Sin sesión)</span>
              ) : activeRole === 'officer' ? (
                <span className="font-semibold text-amber-400">
                  🪖 Sesión: {currentUser?.rank} {currentUser?.name} (@{currentUser?.username})
                </span>
              ) : (
                <span className="font-semibold text-red-400">
                  🛡️ Sesión: {currentUser?.rank} {currentUser?.name} (@{currentUser?.username})
                </span>
              )}
            </div>

            <div className="text-[10px] text-slate-400">
              Seleccione el panel al que desea acceder para autenticarse con sus credenciales:
            </div>

            <div className="flex flex-col gap-1.5">
              <button
                onClick={() => openLoginModal('admin')}
                className={`w-full px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition ${
                  activeRole === 'admin'
                    ? 'bg-red-700 text-white shadow-md'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Shield size={14} className="text-red-400" />
                  <span>Acceso Mando Administrativo</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">Restringido</span>
              </button>

              <button
                onClick={() => openLoginModal('officer_pilot')}
                className={`w-full px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition ${
                  activeRole === 'officer' && currentUser?.militaryBranch === 'Aéreo'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Plane size={14} className="text-blue-400" />
                  <span>Acceso Soldado Piloto</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">Ingresar</span>
              </button>

              <button
                onClick={() => openLoginModal('officer_infantry')}
                className={`w-full px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition ${
                  activeRole === 'officer' && currentUser?.militaryBranch === 'Infantería Aeronaval'
                    ? 'bg-emerald-700 text-white shadow-md'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Anchor size={14} className="text-emerald-400" />
                  <span>Acceso Soldado Infantería</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">Ingresar</span>
              </button>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-slate-800/80 text-[11px]">
              {activeRole !== 'public' ? (
                <button
                  onClick={logout}
                  className="text-red-400 hover:text-red-300 flex items-center gap-1 font-semibold"
                >
                  <LogOut size={11} /> Cerrar Sesión y Volver al Portal
                </button>
              ) : (
                <span className="text-slate-500 text-[10px]">
                  Requiere usuario y contraseña válidos
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
