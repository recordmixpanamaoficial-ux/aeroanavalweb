import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FileCheck, CheckCircle2, XCircle, Clock, Calendar, MessageSquare } from 'lucide-react';

export const LeaveRequestsReview: React.FC = () => {
  const { leaveRequests, reviewLeaveRequest } = useApp();
  const [filter, setFilter] = useState<'PENDIENTE' | 'TODOS'>('PENDIENTE');
  const [reviewingId, setReviewingId] = useState<string | null>(null);
  const [adminNotes, setAdminNotes] = useState('');

  const filteredRequests = leaveRequests.filter((r) => {
    if (filter === 'TODOS') return true;
    return r.status === filter;
  });

  const handleDecision = (id: string, decision: 'APROBADO' | 'RECHAZADO') => {
    reviewLeaveRequest(
      id,
      decision,
      adminNotes || (decision === 'APROBADO' ? 'Aprobado por el Comando General.' : 'No procede por requerimientos operacionales.')
    );
    setReviewingId(null);
    setAdminNotes('');
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold font-serif text-white flex items-center gap-2">
            <FileCheck size={20} className="text-amber-400" />
            <span>Resolución de Permisos y Trámites de Soldados</span>
          </h3>
          <p className="text-xs text-slate-400">
            Aprobación o rechazo de solicitudes de tropa por parte del Estado Mayor
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setFilter('PENDIENTE')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              filter === 'PENDIENTE'
                ? 'bg-amber-500 text-slate-950'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Pendientes ({leaveRequests.filter((r) => r.status === 'PENDIENTE').length})
          </button>
          <button
            onClick={() => setFilter('TODOS')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              filter === 'TODOS'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Ver Todos
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredRequests.length === 0 ? (
          <div className="text-center py-8 text-slate-500 text-xs bg-slate-950 rounded-xl border border-slate-800">
            No hay solicitudes que coincidan con el filtro seleccionado.
          </div>
        ) : (
          filteredRequests.map((req) => (
            <div
              key={req.id}
              className="bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 space-y-3 text-xs"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div>
                  <span className="font-bold text-white text-sm">{req.officerName}</span>
                  <span className="text-slate-400 ml-2">
                    ({req.rank} · CIP: {req.cip})
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded bg-blue-950 text-blue-300 font-bold border border-blue-800/40 text-[10px]">
                    {req.type}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                      req.status === 'APROBADO'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : req.status === 'RECHAZADO'
                        ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    }`}
                  >
                    {req.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-400 text-[11px]">
                <div className="flex items-center gap-1.5">
                  <Calendar size={13} className="text-amber-400" />
                  <span>Periodo Solicitado: <strong className="text-slate-200">{req.startDate} al {req.endDate}</strong></span>
                </div>
                <div>
                  Fecha de Radicación: <span className="text-slate-300">{req.createdAt}</span>
                </div>
              </div>

              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-slate-200 leading-relaxed">
                <span className="font-bold text-slate-400 block mb-1 text-[10px] uppercase">
                  Justificación del Efectivo:
                </span>
                {req.justification}
              </div>

              {req.adminNotes && (
                <div className="p-2.5 bg-blue-950/40 border border-blue-500/30 rounded-lg text-blue-200 text-[11px]">
                  <strong>Resolución Dictada:</strong> {req.adminNotes}
                </div>
              )}

              {req.status === 'PENDIENTE' && (
                <div className="pt-2 border-t border-slate-800/80 flex flex-col sm:flex-row items-end justify-between gap-3">
                  <div className="w-full sm:w-2/3">
                    <input
                      type="text"
                      placeholder="Nota de comandancia u orden interna..."
                      value={reviewingId === req.id ? adminNotes : ''}
                      onFocus={() => setReviewingId(req.id)}
                      onChange={(e) => {
                        setReviewingId(req.id);
                        setAdminNotes(e.target.value);
                      }}
                      className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDecision(req.id, 'APROBADO')}
                      className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg font-bold flex items-center gap-1 transition"
                    >
                      <CheckCircle2 size={13} />
                      <span>Aprobar</span>
                    </button>
                    <button
                      onClick={() => handleDecision(req.id, 'RECHAZADO')}
                      className="px-3.5 py-1.5 bg-red-800 hover:bg-red-700 text-white rounded-lg font-bold flex items-center gap-1 transition"
                    >
                      <XCircle size={13} />
                      <span>Rechazar</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
