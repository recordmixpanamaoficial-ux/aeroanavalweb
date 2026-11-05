import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ClipboardList, PlusCircle, CheckCircle2 } from 'lucide-react';

export const MissionLogForm: React.FC = () => {
  const { missionLogs, addMissionLog, currentUser, operations } = useApp();
  const [showForm, setShowForm] = useState(false);

  const [missionCode, setMissionCode] = useState(operations[0]?.code || 'PAT-VIGILANCIA-01');
  const [unitCode, setUnitCode] = useState('AN-137 (Bell 412)');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('11:30');
  const [fuelRemainingLbs, setFuelRemainingLbs] = useState<number>(750);
  const [engineHours, setEngineHours] = useState<number>(3.5);
  const [routeZone, setRouteZone] = useState('Sector Taboga - Las Perlas');
  const [weatherConditions, setWeatherConditions] = useState('Viento 10 kts NNE, mar calmo, visibilidad óptima');
  const [novedades, setNovedades] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);

  const myLogs = currentUser
    ? missionLogs.filter((m) => m.officerId === currentUser.id)
    : missionLogs;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    addMissionLog({
      officerId: currentUser.id,
      officerName: currentUser.name,
      rank: currentUser.rank,
      missionCode,
      unitCode,
      date,
      startTime,
      endTime,
      fuelRemainingLbs: Number(fuelRemainingLbs),
      engineHours: Number(engineHours),
      routeZone,
      weatherConditions,
      novedades: novedades || 'Sin novedades que lamentar. Misión concluida con éxito reglamentario.',
    });

    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
      setShowForm(false);
      setNovedades('');
    }, 1800);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold font-serif text-white flex items-center gap-2">
            <ClipboardList size={20} className="text-amber-400" />
            <span>Bitácora Operacional & Novedades del Soldado</span>
          </h3>
          <p className="text-xs text-slate-400">
            Registro reglamentario de patrullas, horas operacionales y novedades del cuadrante
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition flex items-center gap-1.5 shadow-md"
        >
          <PlusCircle size={15} />
          <span>{showForm ? 'Cancelar Reporte' : 'Registrar Nueva Bitácora'}</span>
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-slate-950 border border-amber-500/40 rounded-2xl p-6 space-y-4 text-xs animate-in fade-in">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-2">
            <span className="font-bold text-white uppercase text-sm tracking-wide">
              Formulario de Debriefing Operacional
            </span>
            <span className="text-slate-400">Oficial: {currentUser?.rank} {currentUser?.name}</span>
          </div>

          {successMsg && (
            <div className="p-3 bg-emerald-950 border border-emerald-500 text-emerald-200 rounded-xl flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-400" />
              <span>Bitácora asentada en el sistema y remitida a la Jefatura de Mando.</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Código de Operación *
              </label>
              <input
                type="text"
                required
                value={missionCode}
                onChange={(e) => setMissionCode(e.target.value)}
                placeholder="ej. OP-CARIBE-SEGURO-88"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400 font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Aeronave / Embarcación *
              </label>
              <input
                type="text"
                required
                value={unitCode}
                onChange={(e) => setUnitCode(e.target.value)}
                placeholder="ej. AN-137 Bell 412 o BPC-3801"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Fecha de Misión *
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Hora Salida
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Hora Arribo
              </label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Horas Motor
              </label>
              <input
                type="number"
                step="0.1"
                value={engineHours}
                onChange={(e) => setEngineHours(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400 font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Combustible Restante
              </label>
              <input
                type="number"
                value={fuelRemainingLbs}
                onChange={(e) => setFuelRemainingLbs(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Ruta / Cuadrante Patrullado *
              </label>
              <input
                type="text"
                required
                value={routeZone}
                onChange={(e) => setRouteZone(e.target.value)}
                placeholder="ej. Base Howard - Archipiélago de Las Perlas - Cocolí"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Condiciones Meteorológicas
              </label>
              <input
                type="text"
                value={weatherConditions}
                onChange={(e) => setWeatherConditions(e.target.value)}
                placeholder="ej. Viento 12 kts, visibilidad 8 NM, nubosidad dispersa"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">
              Novedades, Observaciones de Patrulla y Contactos *
            </label>
            <textarea
              required
              rows={3}
              value={novedades}
              onChange={(e) => setNovedades(e.target.value)}
              placeholder="Detalle incidentes, avistamientos o condiciones especiales..."
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl hover:bg-slate-700 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition shadow"
            >
              Firmar y Asentar en el Libro de Guardia
            </button>
          </div>
        </form>
      )}

      {/* Logs Table */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Historial de Bitácoras Asentadas por el Efectivo
        </h4>

        {myLogs.length === 0 ? (
          <div className="text-center py-6 text-slate-500 text-xs bg-slate-950 rounded-xl border border-slate-800">
            Aún no ha registrado bitácoras de misión en esta cuenta.
          </div>
        ) : (
          myLogs.map((log) => (
            <div
              key={log.id}
              className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3 text-xs"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-amber-400">{log.missionCode}</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">{log.unitCode}</span>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-slate-400">
                  <span>{log.date} ({log.startTime} - {log.endTime})</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/50 text-[10px] font-bold">
                    {log.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-slate-400">
                <div>
                  <span className="text-slate-500 block">Zona / Ruta:</span>
                  <span className="text-slate-200 font-medium">{log.routeZone}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Horas Motor / Combustible:</span>
                  <span className="text-slate-200 font-medium">{log.engineHours} Hrs · {log.fuelRemainingLbs} Lbs</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Condición Clima:</span>
                  <span className="text-slate-200 font-medium">{log.weatherConditions}</span>
                </div>
              </div>

              <div className="pt-1">
                <span className="text-slate-500 text-[10px] uppercase font-bold block mb-0.5">Novedades Asentadas:</span>
                <p className="text-slate-300 italic bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/60">
                  "{log.novedades}"
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
