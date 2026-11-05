import React from 'react';
import { useApp } from '../../context/AppContext';
import { LifeBuoy, MapPin, Radio, ShieldAlert, CheckCircle2, AlertCircle, Clock, Navigation } from 'lucide-react';

export const OperationsSAR: React.FC = () => {
  const { operations } = useApp();

  return (
    <section id="operaciones" className="py-20 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold tracking-widest uppercase mb-3">
            Búsqueda, Salvamento y Seguridad
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-white">
            Operaciones Aeronavales y Misiones SAR
          </h2>
          <p className="mt-4 text-base text-slate-300">
            Respuesta inmediata ante siniestros marítimos, emergencias médicas en comunidades aisladas y protección inquebrantable de nuestras costas.
          </p>
        </div>

        {/* Live Operations Feed */}
        {operations.length === 0 ? (
          <div className="mb-16 p-8 bg-slate-950/80 rounded-2xl border border-slate-800 text-center max-w-xl mx-auto space-y-2">
            <Radio size={28} className="text-blue-400 mx-auto animate-pulse" />
            <h4 className="text-base font-bold text-white font-serif">
              Canal de Mando Operacional en Escucha
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Actualmente no hay operaciones activas despachadas en cartelera pública. Las nuevas misiones SAR e interdicciones se publicarán en tiempo real una vez sean ordenadas por la Comandancia General.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {operations.map((op) => (
              <div
                key={op.id}
                className={`bg-slate-950/90 border rounded-2xl p-6 transition duration-200 flex flex-col justify-between shadow-xl relative ${
                  op.status === 'ACTIVA'
                    ? 'border-blue-500/60 shadow-blue-950/50'
                    : 'border-slate-800'
                }`}
              >
              {op.status === 'ACTIVA' && (
                <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold tracking-wider uppercase animate-pulse flex items-center gap-1 shadow">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  Misión en Curso
                </div>
              )}

              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-mono font-bold text-amber-400">
                    {op.code}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                      op.type === 'SAR'
                        ? 'bg-amber-500/20 text-amber-300'
                        : op.type === 'EVAC_MEDICA'
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-red-500/20 text-red-300'
                    }`}
                  >
                    {op.type.replace('_', ' ')}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white font-serif mb-2">
                  {op.title}
                </h3>

                <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
                  <MapPin size={13} className="text-red-400 shrink-0" />
                  <span>{op.zone}</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {op.briefing}
                </p>

                {op.results && (
                  <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-xs text-emerald-200 mb-4">
                    <span className="font-bold block mb-1">Resultado de la Misión:</span>
                    {op.results}
                  </div>
                )}
              </div>

              <div className="border-t border-slate-800 pt-4 mt-2 space-y-2 text-[11px] text-slate-400">
                <div className="flex items-center justify-between">
                  <span>Comandante a Cargo:</span>
                  <span className="text-white font-medium">{op.commander}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Medios Asignados:</span>
                  <span className="text-amber-400 font-medium">
                    {op.assignedUnits.join(', ')}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Fecha de Inicio:</span>
                  <span className="text-slate-300">{op.startDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

        {/* Protocol for Nautical Distress */}
        <div className="bg-gradient-to-r from-red-950/70 via-slate-950 to-blue-950/70 border border-red-500/40 rounded-2xl p-8 lg:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-xs font-bold uppercase tracking-wider">
                <LifeBuoy size={14} />
                <span>Protocolo Oficial de Auxilio Marítimo</span>
              </div>
              <h3 className="text-2xl font-bold font-serif text-white">
                ¿Qué hacer si su embarcación se encuentra en peligro?
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                El Centro de Operaciones Aeronavales (COAN) mantiene escucha ininterrumpida las 24 horas del día. Si sufre avería de motor, vía de agua o desorientación:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
                <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl">
                  <div className="font-bold text-amber-400 flex items-center gap-1.5 mb-1">
                    <Radio size={14} />
                    <span>1. Canal 16 VHF Marino</span>
                  </div>
                  <p className="text-slate-400">
                    Transmita Mayday o Pan-Pan indicando nombre de nave, tripulantes y coordenadas.
                  </p>
                </div>

                <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl">
                  <div className="font-bold text-red-400 flex items-center gap-1.5 mb-1">
                    <ShieldAlert size={14} />
                    <span>2. Marque al 108 desde Celular</span>
                  </div>
                  <p className="text-slate-400">
                    Llamada directa y gratuita al Centro de Despacho de Búsqueda y Rescate.
                  </p>
                </div>

                <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl">
                  <div className="font-bold text-blue-400 flex items-center gap-1.5 mb-1">
                    <Navigation size={14} />
                    <span>3. Permanezca con la Nave</span>
                  </div>
                  <p className="text-slate-400">
                    Una embarcación a flote es 10 veces más visible para los radares de aviones que un nadador.
                  </p>
                </div>

                <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl">
                  <div className="font-bold text-emerald-400 flex items-center gap-1.5 mb-1">
                    <CheckCircle2 size={14} />
                    <span>4. Chalecos Salvavidas Puestos</span>
                  </div>
                  <p className="text-slate-400">
                    Asegure chalecos colocados en todos los tripulantes antes de cualquier maniobra.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-slate-950 p-6 rounded-2xl border border-red-500/30 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-red-600/20 border border-red-500/40 text-red-400 flex items-center justify-center mx-auto animate-pulse">
                <LifeBuoy size={32} />
              </div>
              <h4 className="text-lg font-bold text-white font-serif">
                Línea de Emergencia 108
              </h4>
              <p className="text-xs text-slate-400">
                Atención directa las 24 horas del día en ambos litorales panameños.
              </p>
              <div className="text-2xl font-black font-mono text-red-400 tracking-wider">
                COAN: 108
              </div>
              <p className="text-[11px] text-slate-500">
                Llamada gratuita desde cualquier operador telefónico en Panamá.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
