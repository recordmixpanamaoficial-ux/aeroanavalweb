import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { SENAN_LOGO } from '../../data/mockData';
import { X, Lock, Shield, Plane, Anchor, KeyRound, AlertTriangle, CheckCircle2, User, Eye, EyeOff } from 'lucide-react';

export const LoginModal: React.FC = () => {
  const { isLoginModalOpen, loginRoleTarget, closeLoginModal, login, users } = useApp();
  const [selectedPanel, setSelectedPanel] = useState<'pilot' | 'infantry' | 'admin'>('pilot');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (loginRoleTarget === 'admin') {
      setSelectedPanel('admin');
    } else if (loginRoleTarget === 'officer_infantry') {
      setSelectedPanel('infantry');
    } else if (loginRoleTarget === 'officer_pilot') {
      setSelectedPanel('pilot');
    } else {
      setSelectedPanel('admin');
    }
    setUsername('');
    setPassword('');
    setErrorMsg('');
    setSuccessMsg('');
  }, [loginRoleTarget, isLoginModalOpen]);

  if (!isLoginModalOpen) return null;

  const handlePanelChange = (panel: 'pilot' | 'infantry' | 'admin') => {
    setSelectedPanel(panel);
    setErrorMsg('');
    setSuccessMsg('');
    setUsername('');
    setPassword('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const targetRole = selectedPanel === 'admin' ? 'admin' : 'officer';
    const res = login(username, password, targetRole);

    if (!res.success) {
      setErrorMsg(res.message);
    } else {
      setSuccessMsg(res.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-slate-900 to-slate-950 border border-amber-500/40 rounded-3xl shadow-2xl shadow-blue-950/60 overflow-hidden">
        {/* Top Military Tricolor Ribbon */}
        <div className="h-2 bg-gradient-to-r from-blue-700 via-amber-500 to-red-600 w-full" />

        <button
          onClick={closeLoginModal}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-xl transition bg-slate-800/60 hover:bg-slate-800"
          aria-label="Cerrar"
        >
          <X size={20} />
        </button>

        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-block p-2 bg-blue-950/60 rounded-full border border-amber-500/30 mb-3 shadow-inner">
              <img
                src={SENAN_LOGO}
                alt="Escudo Oficial SENAN"
                className="w-14 h-18 object-contain drop-shadow"
              />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-white uppercase font-serif">
              SIS-AERONAVAL · ACCESO SEGURO
            </h2>
            <p className="text-xs text-amber-400 font-bold tracking-widest uppercase mt-0.5">
              Identificación Obligatoria por Usuario y Contraseña
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              Servicio Nacional Aeronaval · República de Panamá
            </p>
          </div>

          {/* 3 Dedicated Panel Selection Tabs */}
          <div className="grid grid-cols-3 p-1 bg-slate-950 rounded-2xl mb-5 border border-slate-800 text-xs">
            <button
              type="button"
              onClick={() => handlePanelChange('pilot')}
              className={`py-2.5 px-2 font-bold rounded-xl flex flex-col items-center justify-center gap-1 transition ${
                selectedPanel === 'pilot'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-950'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Plane size={16} />
              <span className="text-[11px]">Soldado Piloto</span>
            </button>

            <button
              type="button"
              onClick={() => handlePanelChange('infantry')}
              className={`py-2.5 px-2 font-bold rounded-xl flex flex-col items-center justify-center gap-1 transition ${
                selectedPanel === 'infantry'
                  ? 'bg-emerald-700 text-white shadow-lg shadow-emerald-950'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Anchor size={16} />
              <span className="text-[11px]">Soldado Infantería</span>
            </button>

            <button
              type="button"
              onClick={() => handlePanelChange('admin')}
              className={`py-2.5 px-2 font-bold rounded-xl flex flex-col items-center justify-center gap-1 transition ${
                selectedPanel === 'admin'
                  ? 'bg-red-700 text-white shadow-lg shadow-red-950'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Shield size={16} />
              <span className="text-[11px]">Mando Admin</span>
            </button>
          </div>

          {/* Context Notice based on selected panel */}
          <div className="mb-4 p-3 rounded-xl border text-xs bg-slate-950/80">
            {selectedPanel === 'pilot' && (
              <div className="text-blue-300 border-l-2 border-blue-500 pl-2">
                <span className="font-bold block text-white">Acceso al Panel de Soldado Piloto (Comando Aéreo)</span>
                Aeronaves Bell 412, Twin Otter, bitácora de vuelo y rescates SAR.
                <div className="mt-1 text-[11px] text-slate-300">
                  Ingrese con el <strong>usuario y contraseña</strong> asignados previamente por el Administrador desde el Panel de Mando.
                </div>
              </div>
            )}
            {selectedPanel === 'infantry' && (
              <div className="text-emerald-300 border-l-2 border-emerald-500 pl-2">
                <span className="font-bold block text-white">Acceso al Panel de Soldado de Infantería (Fuerza Anfibia BVT)</span>
                Patrullaje marítimo táctico, seguridad perimetral de muelles y bases.
                <div className="mt-1 text-[11px] text-slate-300">
                  Ingrese con el <strong>usuario y contraseña</strong> asignados previamente por el Administrador desde el Panel de Mando.
                </div>
              </div>
            )}
            {selectedPanel === 'admin' && (
              <div className="text-red-300 border-l-2 border-red-500 pl-2">
                <span className="font-bold block text-white">Acceso al Mando Administrativo (Estado Mayor)</span>
                Área de acceso restringido para la Comandancia General. Ingrese con sus credenciales de administrador.
              </div>
            )}
          </div>

          {/* Feedback */}
          {errorMsg && (
            <div className="mb-4 p-3 bg-red-950/90 border border-red-500/50 rounded-xl text-red-200 text-xs flex items-center gap-2">
              <AlertTriangle size={16} className="text-red-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 bg-emerald-950/90 border border-emerald-500/50 rounded-xl text-emerald-200 text-xs flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-medium mb-1.5">
                Usuario de Acceso o Cédula (CIP) *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <User size={15} />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="ej. piloto.morales o 4-750-1289"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400 placeholder:text-slate-600 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1.5">
                Contraseña Reglamentaria *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <KeyRound size={15} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingrese su contraseña"
                  className="w-full pl-9 pr-10 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400 placeholder:text-slate-600 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className={`w-full py-3 px-4 rounded-xl text-sm font-bold tracking-wide text-white transition flex items-center justify-center gap-2 shadow-lg ${
                selectedPanel === 'pilot'
                  ? 'bg-blue-600 hover:bg-blue-500 shadow-blue-950/50'
                  : selectedPanel === 'infantry'
                  ? 'bg-emerald-700 hover:bg-emerald-600 shadow-emerald-950/50'
                  : 'bg-red-700 hover:bg-red-600 shadow-red-950/50'
              }`}
            >
              <Lock size={15} />
              <span>
                {selectedPanel === 'pilot'
                  ? 'Entrar al Panel de Soldado Piloto'
                  : selectedPanel === 'infantry'
                  ? 'Entrar al Panel de Soldado Infantería'
                  : 'Entrar al Mando Administrativo'}
              </span>
            </button>
          </form>

          {/* Notice about accounts created in Admin */}
          <div className="mt-5 pt-4 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
            <p className="flex items-start gap-1.5">
              <Shield size={13} className="text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong>Soldados nuevos:</strong> Si el administrador le creó un nuevo usuario y contraseña en el Panel Administrativo, ingrese esas credenciales aquí para acceder a su panel de soldado.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
