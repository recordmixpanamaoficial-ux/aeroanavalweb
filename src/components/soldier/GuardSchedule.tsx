import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Clock, Shield, Calendar, MapPin, CheckCircle2, User, AlertCircle } from 'lucide-react';

export const GuardSchedule: React.FC = () => {
  const { guardDuties, currentUser } = useApp();
  const [checkedInIds, setCheckedInIds] = useState<string[]>([]);

  // Filter guard duties for current officer or display general ones
  const myDuties = currentUser
    ? guardDuties.filter((g) => g.officerId === currentUser.id)
    : guardDuties;

  const handleCheckIn = (id: string) => {
    if (!checkedInIds.includes(id)) {
      setCheckedInIds([...checkedInIds, id]);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold font-serif text-white flex items-center gap-2">
            <Clock size={20} className="text-amber-400" />
            <span>Rol de Guardia & Turnos de Servicio</span>
          </h3>
          <p className="text-xs text-slate-400">
            Asignación oficial de turnos de permanencia, vigilancia perimetral y puestos de mando
          </p>
        </div>

        <div className="text-xs px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
          Oficial: <span className="font-semibold text-amber-400">{currentUser?.rank} {currentUser?.name}</span>
        </div>
      </div>

      {/* Notice Banner */}
      <div className="p-4 bg-blue-950/40 border border-blue-500/30 rounded-xl flex items-start gap-3 text-xs text-blue-200">
        <AlertCircle size={16} className="text-blue-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold block mb-0.5">Disposición Reglamentaria de Guardia:</span>
          La presentación al puesto debe efectuarse con 15 minutos de anticipación en uniforme reglamentario con armamento de dotación revistado. En caso de fuerza mayor, tramitar relevo con 48h de anticipación.
        </div>
      </div>

      {/* Duty List Cards */}
      <div className="space-y-4">
        {myDuties.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-xs">
            No registra guardias asignadas en el cuadrante actual.
          </div>
        ) : (
          myDuties.map((duty) => {
            const isChecked = checkedInIds.includes(duty.id) || duty.status === 'En Turno';

            return (
              <div
                key={duty.id}
                className={`bg-slate-950 border rounded-2xl p-5 transition flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  isChecked
                    ? 'border-emerald-500/50 shadow-emerald-950/30'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded bg-blue-900/60 text-blue-300 text-xs font-mono font-bold border border-blue-500/30">
                      {duty.shift}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                        duty.status === 'En Turno' || isChecked
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : duty.status === 'Cumplido'
                          ? 'bg-slate-800 text-slate-400'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      }`}
                    >
                      {isChecked ? 'EN TURNO ACTIVO' : duty.status}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white font-serif">
                    {duty.post}
                  </h4>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1 text-slate-300">
                      <Calendar size={13} className="text-amber-400" />
                      {duty.date}
                    </span>
                    <span className="flex items-center gap-1 text-slate-300">
                      <MapPin size={13} className="text-red-400" />
                      {duty.base}
                    </span>
                    <span className="flex items-center gap-1 text-slate-400">
                      <User size={13} />
                      Supervisor: <span className="text-white">{duty.supervisor}</span>
                    </span>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-3">
                  {isChecked ? (
                    <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold px-3 py-1.5 bg-emerald-950/60 border border-emerald-500/40 rounded-xl">
                      <CheckCircle2 size={16} />
                      <span>Presente en Puesto</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleCheckIn(duty.id)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition shadow-md shadow-blue-950 flex items-center gap-1.5"
                    >
                      <CheckCircle2 size={14} />
                      <span>Registrar Asistencia</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
