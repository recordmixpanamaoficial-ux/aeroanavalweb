import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SENAN_LOGO } from '../../data/mockData';
import { MilitaryIDCard } from './MilitaryIDCard';
import { GuardSchedule } from './GuardSchedule';
import { MissionLogForm } from './MissionLogForm';
import { LeaveRequestForm } from './LeaveRequestForm';
import { TacticalDirectives } from './TacticalDirectives';
import { TacticalFrequencies } from './TacticalFrequencies';
import {
  Shield,
  User,
  Clock,
  ClipboardList,
  FileText,
  BookOpen,
  Radio,
  LogOut,
  Globe,
  Plane,
  Anchor,
  Compass,
  KeyRound,
} from 'lucide-react';

export const SoldierDashboard: React.FC = () => {
  const { currentUser, logout, openLoginModal, operations } = useApp();
  const [activeTab, setActiveTab] = useState<'carnet' | 'guardias' | 'bitacora' | 'tramites' | 'directivas' | 'frecuencias'>('carnet');

  if (!currentUser) return null;

  const isPilot = currentUser.militaryBranch === 'Aéreo';
  const isInfantry = currentUser.militaryBranch === 'Infantería Aeronaval';

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      {/* Top Military Ribbon */}
      <div className={`border-b text-xs px-4 py-2 ${
        isPilot ? 'bg-blue-950/90 border-blue-600/40' : isInfantry ? 'bg-emerald-950/90 border-emerald-600/40' : 'bg-slate-900 border-slate-800'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-extrabold text-amber-400 tracking-wider uppercase text-[11px] flex items-center gap-1.5">
              {isPilot && <Plane size={13} className="text-blue-300" />}
              {isInfantry && <Anchor size={13} className="text-emerald-300" />}
              <span>
                {isPilot
                  ? 'SIS-AERONAVAL · PANEL DE SOLDADO PILOTO (COMANDO AÉREO)'
                  : isInfantry
                  ? 'SIS-AERONAVAL · PANEL DE SOLDADO DE INFANTERÍA AERONAVAL (FUERZA TÁCTICA)'
                  : 'SIS-AERONAVAL · PORTAL DEL SOLDADO Y EFECTIVO'}
              </span>
            </span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="hidden sm:inline text-slate-300 text-[11px]">
              Sesión iniciada como: <strong className="text-white">{currentUser.username}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => openLoginModal('officer')}
              className="text-amber-300 hover:text-white flex items-center gap-1.5 transition text-xs px-2.5 py-1 bg-slate-900 hover:bg-slate-800 rounded-lg border border-slate-700"
              title="Cambiar de Soldado con Usuario y Contraseña"
            >
              <KeyRound size={12} />
              <span>Cambiar de Cuenta</span>
            </button>
            <button
              onClick={logout}
              className="text-slate-300 hover:text-white flex items-center gap-1.5 transition text-xs px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded-lg"
            >
              <Globe size={12} />
              <span>Web Pública</span>
            </button>
            <button
              onClick={logout}
              className="text-red-400 hover:text-red-300 flex items-center gap-1 transition text-xs px-2.5 py-1 bg-red-950/60 hover:bg-red-950 rounded-lg border border-red-800/40"
            >
              <LogOut size={12} />
              <span>Salir</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header / Officer Profile Banner */}
      <header className="bg-slate-900/80 border-b border-slate-800 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={currentUser.avatarUrl}
                  alt={currentUser.name}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 shadow-lg ${
                    isPilot ? 'border-blue-500' : isInfantry ? 'border-emerald-500' : 'border-amber-500'
                  }`}
                />
                <img
                  src={SENAN_LOGO}
                  alt="Escudo"
                  className="w-6 h-7 object-contain absolute -bottom-1 -right-1 drop-shadow"
                />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest font-mono">
                    {currentUser.badgeNumber}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${
                    isPilot
                      ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                      : isInfantry
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  }`}>
                    {isPilot ? 'Ala de Piloto Militar' : isInfantry ? 'Infantería Anfibia' : currentUser.militaryBranch}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase border border-emerald-500/30">
                    {currentUser.status}
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl font-bold font-serif text-white">
                  {currentUser.rank} {currentUser.name}
                </h1>
                <p className="text-xs text-slate-300 mt-0.5">
                  Usuario: <span className="font-mono font-bold text-amber-300">@{currentUser.username}</span> · CIP: <span className="font-mono text-slate-200">{currentUser.cip}</span> · Base: <span className="text-slate-200">{currentUser.assignedBase}</span>
                </p>
              </div>
            </div>

            {/* Quick KPI stats for the soldier */}
            <div className="flex items-center gap-3">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center min-w-[95px]">
                <div className="text-base sm:text-lg font-mono font-bold text-amber-400">
                  {currentUser.serviceYears} Años
                </div>
                <div className="text-[10px] text-slate-400 uppercase">Servicio</div>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center min-w-[95px]">
                <div className="text-base sm:text-lg font-mono font-bold text-blue-400">
                  {isPilot ? '1,420 H' : '18 Misiones'}
                </div>
                <div className="text-[10px] text-slate-400 uppercase">
                  {isPilot ? 'Horas de Vuelo' : 'Patrullajes BVT'}
                </div>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center min-w-[95px]">
                <div className="text-base sm:text-lg font-mono font-bold text-emerald-400">
                  {currentUser.medals.length}
                </div>
                <div className="text-[10px] text-slate-400 uppercase">Méritos</div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-6 mt-2 border-t border-slate-800/80 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('carnet')}
              className={`px-3.5 py-2.5 rounded-xl flex items-center gap-2 transition shrink-0 ${
                activeTab === 'carnet'
                  ? 'bg-amber-500 text-slate-950 shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <User size={15} />
              <span>Carnet & Expediente Militar</span>
            </button>

            <button
              onClick={() => setActiveTab('guardias')}
              className={`px-3.5 py-2.5 rounded-xl flex items-center gap-2 transition shrink-0 ${
                activeTab === 'guardias'
                  ? 'bg-amber-500 text-slate-950 shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Clock size={15} />
              <span>Rol de Guardia & Turnos</span>
            </button>

            <button
              onClick={() => setActiveTab('bitacora')}
              className={`px-3.5 py-2.5 rounded-xl flex items-center gap-2 transition shrink-0 ${
                activeTab === 'bitacora'
                  ? 'bg-amber-500 text-slate-950 shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <ClipboardList size={15} />
              <span>{isPilot ? 'Bitácora de Vuelo (Piloto)' : 'Bitácora de Patrullaje (Infantería)'}</span>
            </button>

            <button
              onClick={() => setActiveTab('tramites')}
              className={`px-3.5 py-2.5 rounded-xl flex items-center gap-2 transition shrink-0 ${
                activeTab === 'tramites'
                  ? 'bg-amber-500 text-slate-950 shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <FileText size={15} />
              <span>Permisos & Trámites</span>
            </button>

            <button
              onClick={() => setActiveTab('directivas')}
              className={`px-3.5 py-2.5 rounded-xl flex items-center gap-2 transition shrink-0 ${
                activeTab === 'directivas'
                  ? 'bg-amber-500 text-slate-950 shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <BookOpen size={15} />
              <span>Directivas de Comando</span>
            </button>

            <button
              onClick={() => setActiveTab('frecuencias')}
              className={`px-3.5 py-2.5 rounded-xl flex items-center gap-2 transition shrink-0 ${
                activeTab === 'frecuencias'
                  ? 'bg-amber-500 text-slate-950 shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Radio size={15} />
              <span>Frecuencias Tácticas</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'carnet' && <MilitaryIDCard officer={currentUser} />}
        {activeTab === 'guardias' && <GuardSchedule />}
        {activeTab === 'bitacora' && <MissionLogForm />}
        {activeTab === 'tramites' && <LeaveRequestForm />}
        {activeTab === 'directivas' && <TacticalDirectives />}
        {activeTab === 'frecuencias' && <TacticalFrequencies />}
      </main>
    </div>
  );
};
