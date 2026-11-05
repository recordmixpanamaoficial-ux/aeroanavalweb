import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SENAN_LOGO } from '../../data/mockData';
import { OperationsDispatch } from './OperationsDispatch';
import { PersonnelManagement } from './PersonnelManagement';
import { LeaveRequestsReview } from './LeaveRequestsReview';
import { Emergency108Center } from './Emergency108Center';
import { NewsManager } from './NewsManager';
import { RecruitmentReview } from './RecruitmentReview';
import { FormControlsManager } from './FormControlsManager';
import { HighCommandCredential } from './HighCommandCredential';
import { DirectorsManager } from './DirectorsManager';
import { SiteContentManager } from './SiteContentManager';
import { ServiceRegistryManager } from './ServiceRegistryManager';
import {
  Shield,
  Target,
  Users,
  FileCheck,
  PhoneCall,
  Newspaper,
  GraduationCap,
  LogOut,
  Globe,
  Radio,
  SlidersHorizontal,
  AlertTriangle,
  Award,
  IdCard,
  CalendarClock,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    currentUser,
    logout,
    operations,
    emergencyReports,
    users,
    leaveRequests,
    recruitmentList,
    directors,
    guardDuties,
    isRecruitmentFormEnabled,
    isEmergencyReportFormEnabled,
  } = useApp();
  const [activeTab, setActiveTab] = useState<'credencial' | 'servicio' | 'editor_web' | 'directores' | 'operaciones' | 'emergencias' | 'personal' | 'permisos' | 'noticias' | 'reclutamiento' | 'formularios'>('credencial');

  const pendingEmergencies = emergencyReports.filter((e) => e.status !== 'ARCHIVADA').length;
  const activeOps = operations.filter((o) => o.status === 'ACTIVA').length;
  const pendingLeaves = leaveRequests.filter((l) => l.status === 'PENDIENTE').length;
  const activeGuards = guardDuties.filter((g) => g.status === 'En Turno').length;

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      {/* High Command Ribbon */}
      <div className="bg-red-950/70 border-b border-red-500/40 text-xs px-4 py-2">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            <span className="font-extrabold text-red-300 tracking-wider uppercase text-[11px]">
              ESTADO MAYOR & COMANDANCIA GENERAL · SIS-AERONAVAL C2
            </span>
            <span className="hidden sm:inline text-red-500/40">|</span>
            <span className="hidden sm:inline text-red-200/80">
              Panel Administrativo Restringido · Nivel Estratégico 1
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={logout}
              className="text-slate-300 hover:text-white flex items-center gap-1.5 transition text-xs px-2.5 py-1 bg-slate-900 hover:bg-slate-800 rounded-lg border border-slate-700"
            >
              <Globe size={13} />
              <span>Ver Web Pública</span>
            </button>
            <button
              onClick={logout}
              className="text-red-400 hover:text-red-300 flex items-center gap-1 transition text-xs px-2.5 py-1 bg-red-950 hover:bg-red-900 rounded-lg border border-red-800"
            >
              <LogOut size={13} />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Admin Header */}
      <header className="bg-slate-900/90 border-b border-slate-800 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={SENAN_LOGO}
                alt="Escudo SENAN"
                className="w-16 h-20 object-contain drop-shadow"
              />
              <div>
                <span className="text-[10px] font-bold tracking-widest text-red-400 uppercase">
                  Centro de Mando & Control Estratégico
                </span>
                <h1 className="text-xl sm:text-2xl font-bold font-serif text-white">
                  Comandancia General del SENAN
                </h1>
                <p className="text-xs text-slate-300 mt-0.5">
                  Sesión activa de Mando: <strong className="text-white">{currentUser?.rank} {currentUser?.name}</strong> · Base Cocolí
                </p>
              </div>
            </div>

            {/* Live KPI widgets */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
              <div className="bg-slate-950 p-2.5 rounded-xl border border-blue-500/30">
                <div className="text-base font-bold font-mono text-blue-400">{activeOps}</div>
                <div className="text-[10px] text-slate-400 uppercase">Operaciones</div>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-emerald-500/30">
                <div className="text-base font-bold font-mono text-emerald-400">{activeGuards}</div>
                <div className="text-[10px] text-slate-400 uppercase">En Guardia</div>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-red-500/30">
                <div className="text-base font-bold font-mono text-red-400">{pendingEmergencies}</div>
                <div className="text-[10px] text-slate-400 uppercase">Alertas 108</div>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-amber-500/30">
                <div className="text-base font-bold font-mono text-amber-400">{pendingLeaves}</div>
                <div className="text-[10px] text-slate-400 uppercase">Permisos Pend.</div>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-700 hidden sm:block">
                <div className="text-base font-bold font-mono text-slate-300">{users.length}</div>
                <div className="text-[10px] text-slate-400 uppercase">Efectivos</div>
              </div>
            </div>
          </div>

          {/* Admin Navigation Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-6 mt-2 border-t border-slate-800 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('credencial')}
              className={`px-3.5 py-2.5 rounded-xl flex items-center gap-2 transition shrink-0 ${
                activeTab === 'credencial'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-950'
                  : 'text-amber-400 hover:text-white hover:bg-slate-800 border border-amber-500/30'
              }`}
            >
              <IdCard size={15} />
              <span>Mi Credencial de Alto Mando</span>
            </button>

            <button
              onClick={() => setActiveTab('servicio')}
              className={`px-3.5 py-2.5 rounded-xl flex items-center gap-2 transition shrink-0 ${
                activeTab === 'servicio'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-950'
                  : 'text-amber-400 hover:text-white hover:bg-slate-800 border border-amber-500/30'
              }`}
            >
              <CalendarClock size={15} />
              <span>Registro de Servicio ({guardDuties.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('editor_web')}
              className={`px-3.5 py-2.5 rounded-xl flex items-center gap-2 transition shrink-0 ${
                activeTab === 'editor_web'
                  ? 'bg-blue-600 text-white font-bold shadow-lg shadow-blue-950'
                  : 'text-blue-400 hover:text-white hover:bg-slate-800 border border-blue-500/30'
              }`}
            >
              <Globe size={15} />
              <span>Editor Web Pública (Editar & Eliminar)</span>
            </button>

            <button
              onClick={() => setActiveTab('directores')}
              className={`px-3.5 py-2.5 rounded-xl flex items-center gap-2 transition shrink-0 ${
                activeTab === 'directores'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-950'
                  : 'text-amber-400 hover:text-white hover:bg-slate-800 border border-amber-500/30'
              }`}
            >
              <Award size={15} />
              <span>Gestión de Directores ({directors.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('operaciones')}
              className={`px-3.5 py-2.5 rounded-xl flex items-center gap-2 transition shrink-0 ${
                activeTab === 'operaciones'
                  ? 'bg-red-700 text-white shadow-lg shadow-red-950'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Target size={15} />
              <span>Despacho Operacional ({activeOps})</span>
            </button>

            <button
              onClick={() => setActiveTab('emergencias')}
              className={`px-3.5 py-2.5 rounded-xl flex items-center gap-2 transition shrink-0 ${
                activeTab === 'emergencias'
                  ? 'bg-red-700 text-white shadow-lg shadow-red-950'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <PhoneCall size={15} />
              <span>Centro 108 COAN & Webhook ({pendingEmergencies})</span>
            </button>

            <button
              onClick={() => setActiveTab('personal')}
              className={`px-3.5 py-2.5 rounded-xl flex items-center gap-2 transition shrink-0 ${
                activeTab === 'personal'
                  ? 'bg-red-700 text-white shadow-lg shadow-red-950'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Users size={15} />
              <span>Personal & Soldados ({users.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('permisos')}
              className={`px-3.5 py-2.5 rounded-xl flex items-center gap-2 transition shrink-0 ${
                activeTab === 'permisos'
                  ? 'bg-red-700 text-white shadow-lg shadow-red-950'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <FileCheck size={15} />
              <span>Permisos de Tropa ({pendingLeaves})</span>
            </button>

            <button
              onClick={() => setActiveTab('noticias')}
              className={`px-3.5 py-2.5 rounded-xl flex items-center gap-2 transition shrink-0 ${
                activeTab === 'noticias'
                  ? 'bg-red-700 text-white shadow-lg shadow-red-950'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Newspaper size={15} />
              <span>Sala de Prensa CMS</span>
            </button>

            <button
              onClick={() => setActiveTab('reclutamiento')}
              className={`px-3.5 py-2.5 rounded-xl flex items-center gap-2 transition shrink-0 ${
                activeTab === 'reclutamiento'
                  ? 'bg-red-700 text-white shadow-lg shadow-red-950'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <GraduationCap size={15} />
              <span>Admisión & Aspirantes ({recruitmentList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('formularios')}
              className={`px-3.5 py-2.5 rounded-xl flex items-center gap-2 transition shrink-0 ${
                activeTab === 'formularios'
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-950 font-bold'
                  : 'text-amber-400 hover:text-white hover:bg-slate-800 border border-amber-500/30'
              }`}
            >
              <SlidersHorizontal size={15} />
              <span>Control Formularios Web ({isRecruitmentFormEnabled ? 'ON' : 'OFF'})</span>
            </button>
          </div>
        </div>
      </header>

      {/* Admin Body Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'credencial' && <HighCommandCredential />}
        {activeTab === 'servicio' && <ServiceRegistryManager />}
        {activeTab === 'editor_web' && <SiteContentManager />}
        {activeTab === 'directores' && <DirectorsManager />}
        {activeTab === 'operaciones' && <OperationsDispatch />}
        {activeTab === 'emergencias' && <Emergency108Center />}
        {activeTab === 'personal' && <PersonnelManagement />}
        {activeTab === 'permisos' && <LeaveRequestsReview />}
        {activeTab === 'noticias' && <NewsManager />}
        {activeTab === 'reclutamiento' && <RecruitmentReview />}
        {activeTab === 'formularios' && <FormControlsManager />}
      </main>
    </div>
  );
};
