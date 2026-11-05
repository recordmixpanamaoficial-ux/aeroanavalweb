import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FileText, Send, CheckCircle2, Clock, XCircle, AlertCircle, Calendar } from 'lucide-react';
import { OfficerRequest } from '../../types';

export const LeaveRequestForm: React.FC = () => {
  const { leaveRequests, addLeaveRequest, currentUser } = useApp();
  const [showForm, setShowForm] = useState(false);

  const [type, setType] = useState<OfficerRequest['type']>('Permiso Especial');
  const [justification, setJustification] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [successMsg, setSuccessMsg] = useState(false);

  const myRequests = currentUser
    ? leaveRequests.filter((r) => r.officerId === currentUser.id)
    : leaveRequests;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    addLeaveRequest({
      officerId: currentUser.id,
      officerName: currentUser.name,
      rank: currentUser.rank,
      cip: currentUser.cip,
      type,
      justification,
      startDate,
      endDate,
    });

    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
      setShowForm(false);
      setJustification('');
    }, 1800);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold font-serif text-white flex items-center gap-2">
            <FileText size={20} className="text-amber-400" />
            <span>Solicitud de Permisos, Vacaciones y Trámites</span>
          </h3>
          <p className="text-xs text-slate-400">
            Canal interno reglamentario para solicitudes personales dirigidas a la Comandancia
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition flex items-center gap-1.5 shadow"
        >
          <Send size={14} />
          <span>{showForm ? 'Cerrar Formulario' : 'Nueva Solicitud'}</span>
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-slate-950 border border-blue-500/40 rounded-2xl p-6 space-y-4 text-xs animate-in fade-in">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="font-bold text-white uppercase tracking-wide">
              Formato de Solicitud Reglamentaria
            </span>
            <span className="text-slate-400">
              Solicitante: {currentUser?.rank} {currentUser?.name} ({currentUser?.cip})
            </span>
          </div>

          {successMsg && (
            <div className="p-3 bg-emerald-950 border border-emerald-500 text-emerald-200 rounded-xl flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-400" />
              <span>Solicitud remitida con éxito a la Jefatura de Recursos Humanos y Mando.</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Tipo de Trámite *
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-400"
              >
                <option>Permiso Especial</option>
                <option>Vacaciones Anuales</option>
                <option>Cambio de Guardia</option>
                <option>Dotación de Uniforme / Equipo</option>
                <option>Certificación de Servicios</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Fecha Inicio / Requerida *
              </label>
              <input
                type="date"
                required
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-400"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Fecha Culminación *
              </label>
              <input
                type="date"
                required
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">
              Exposición de Motivos / Justificación Oficial *
            </label>
            <textarea
              required
              rows={3}
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
              placeholder="Describa el motivo reglamentario o detalle el equipamiento solicitado..."
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-400"
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
              Enviar a Consideración de la Comandancia
            </button>
          </div>
        </form>
      )}

      {/* List of Requests */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Mis Trámites y Respuestas de la Comandancia
        </h4>

        {myRequests.length === 0 ? (
          <div className="text-center py-6 text-slate-500 text-xs bg-slate-950 rounded-xl border border-slate-800">
            No registra solicitudes activas en su expediente.
          </div>
        ) : (
          myRequests.map((req) => (
            <div
              key={req.id}
              className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3 text-xs"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">{req.type}</span>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Calendar size={12} className="text-amber-400" />
                    {req.startDate} al {req.endDate}
                  </span>
                </div>

                <div>
                  <span
                    className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase flex items-center gap-1 ${
                      req.status === 'APROBADO'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : req.status === 'RECHAZADO'
                        ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    }`}
                  >
                    {req.status === 'APROBADO' && <CheckCircle2 size={12} />}
                    {req.status === 'RECHAZADO' && <XCircle size={12} />}
                    {req.status === 'PENDIENTE' && <Clock size={12} />}
                    <span>{req.status}</span>
                  </span>
                </div>
              </div>

              <div>
                <span className="text-slate-500 text-[10px] uppercase font-bold block mb-0.5">Motivo:</span>
                <p className="text-slate-300">{req.justification}</p>
              </div>

              {req.adminNotes && (
                <div className="p-2.5 bg-blue-950/40 border border-blue-500/30 rounded-lg text-blue-200 text-[11px]">
                  <span className="font-bold block mb-0.5">Respuesta de la Comandancia:</span>
                  {req.adminNotes}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
