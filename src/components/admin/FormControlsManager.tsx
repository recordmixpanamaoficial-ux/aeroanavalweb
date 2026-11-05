import React from 'react';
import { useApp } from '../../context/AppContext';
import { ToggleLeft, ToggleRight, GraduationCap, ShieldAlert, CheckCircle2, XCircle, Globe, Shield, Eye, AlertTriangle } from 'lucide-react';

export const FormControlsManager: React.FC = () => {
  const {
    isRecruitmentFormEnabled,
    isEmergencyReportFormEnabled,
    toggleRecruitmentForm,
    toggleEmergencyReportForm,
    logout,
  } = useApp();

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Shield size={13} />
            <span>Panel de Control de Formularios</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
            Gestión de Formularios en la Web Pública
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Desde aquí el Administrador puede <strong>quitar y poner</strong> los formularios públicos en cualquier momento. Los cambios se aplican al instante para todos los ciudadanos.
          </p>
        </div>

        <button
          onClick={logout}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold flex items-center gap-2 transition self-start sm:self-auto"
        >
          <Globe size={14} className="text-blue-400" />
          <span>Ver Efecto en la Web Pública</span>
        </button>
      </div>

      {/* Form Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Control 1: Formulario de Reclutamiento / Admisión 2027 */}
        <div className={`p-6 rounded-2xl border transition duration-300 flex flex-col justify-between space-y-5 ${
          isRecruitmentFormEnabled
            ? 'bg-slate-950 border-emerald-500/40 shadow-xl shadow-emerald-950/20'
            : 'bg-slate-950/90 border-amber-500/40'
        }`}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
                <GraduationCap size={24} />
              </div>

              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase flex items-center gap-1.5 border ${
                isRecruitmentFormEnabled
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-red-500/20 text-red-300 border-red-500/40'
              }`}>
                {isRecruitmentFormEnabled ? (
                  <>
                    <CheckCircle2 size={13} />
                    <span>FORMULARIO ACTIVO (Puesto)</span>
                  </>
                ) : (
                  <>
                    <XCircle size={13} />
                    <span>FORMULARIO PAUSADO (Quitado)</span>
                  </>
                )}
              </span>
            </div>

            <div>
              <h4 className="text-base font-bold text-white font-serif">
                Formulario de Admisión & Pre-Inscripción 2027
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Formulario donde los aspirantes a Oficiales y Agentes completan sus datos, cédula, edad y especialidad deseada.
              </p>
            </div>

            <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1.5">
              <span className="font-bold text-slate-200 block text-[11px] uppercase">
                Comportamiento en la Web Pública:
              </span>
              {isRecruitmentFormEnabled ? (
                <p className="text-emerald-300 text-[11px]">
                  ✓ Los postulantes pueden llenar el formulario y enviar su pre-inscripción normalmente.
                </p>
              ) : (
                <p className="text-amber-300 text-[11px]">
                  ✕ El formulario está oculto. Se muestra un aviso institucional de convocatoria cerrada hasta nueva orden.
                </p>
              )}
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={toggleRecruitmentForm}
              className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-lg ${
                isRecruitmentFormEnabled
                  ? 'bg-red-800 hover:bg-red-700 text-white shadow-red-950/40'
                  : 'bg-emerald-700 hover:bg-emerald-600 text-white shadow-emerald-950/40'
              }`}
            >
              {isRecruitmentFormEnabled ? (
                <>
                  <ToggleRight size={18} />
                  <span>Quitar Formulario de la Web (Pausar Admisión)</span>
                </>
              ) : (
                <>
                  <ToggleLeft size={18} />
                  <span>Poner Formulario en la Web (Reabrir Admisión)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Control 2: Formulario de Denuncias y Auxilio COAN 108 */}
        <div className={`p-6 rounded-2xl border transition duration-300 flex flex-col justify-between space-y-5 ${
          isEmergencyReportFormEnabled
            ? 'bg-slate-950 border-blue-500/40 shadow-xl shadow-blue-950/20'
            : 'bg-slate-950/90 border-amber-500/40'
        }`}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-2xl bg-red-600/10 text-red-400 border border-red-500/30">
                <ShieldAlert size={24} />
              </div>

              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase flex items-center gap-1.5 border ${
                isEmergencyReportFormEnabled
                  ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                  : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
              }`}>
                {isEmergencyReportFormEnabled ? (
                  <>
                    <CheckCircle2 size={13} />
                    <span>RECEPCIÓN WEB ACTIVA (Puesto)</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle size={13} />
                    <span>SOLO LLAMADAS DIRECTAS 108 (Quitado)</span>
                  </>
                )}
              </span>
            </div>

            <div>
              <h4 className="text-base font-bold text-white font-serif">
                Formulario de Denuncias & SOS Marítimo 108
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Ventana interactiva de envío de alertas por internet para ciudadanos y navegantes.
              </p>
            </div>

            <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1.5">
              <span className="font-bold text-slate-200 block text-[11px] uppercase">
                Comportamiento en la Web Pública:
              </span>
              {isEmergencyReportFormEnabled ? (
                <p className="text-blue-300 text-[11px]">
                  ✓ Ciudadanos pueden enviar denuncias, coordenadas y reportes de auxilio por la página web.
                </p>
              ) : (
                <p className="text-amber-300 text-[11px]">
                  ✕ El formulario web está pausado. Se orienta al ciudadano a llamar al teléfono 108 o por radio marina.
                </p>
              )}
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={toggleEmergencyReportForm}
              className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-lg ${
                isEmergencyReportFormEnabled
                  ? 'bg-amber-700 hover:bg-amber-600 text-white shadow-amber-950/40'
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-950/40'
              }`}
            >
              {isEmergencyReportFormEnabled ? (
                <>
                  <ToggleRight size={18} />
                  <span>Quitar Formulario Web (Pausar Envío por Web)</span>
                </>
              ) : (
                <>
                  <ToggleLeft size={18} />
                  <span>Poner Formulario Web (Activar Recepción Online)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
