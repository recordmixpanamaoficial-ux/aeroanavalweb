import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CitizenEmergencyReport } from '../../types';
import { PhoneCall, ShieldAlert, Radio, CheckCircle2, Clock, MapPin, Send, AlertTriangle } from 'lucide-react';

export const Emergency108Center: React.FC = () => {
  const { emergencyReports, updateEmergencyStatus, deleteEmergencyReport, webhookUrl, setWebhookUrl, testWebhook } = useApp();
  const [filter, setFilter] = useState<string>('TODAS');
  const [tempWebhook, setTempWebhook] = useState(webhookUrl);
  const [webhookSaved, setWebhookSaved] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [isTesting, setIsTesting] = useState(false);

  const handleSaveWebhook = (e: React.FormEvent) => {
    e.preventDefault();
    setWebhookUrl(tempWebhook.trim());
    setWebhookSaved(true);
    setTimeout(() => setWebhookSaved(false), 2500);
  };

  const handleTestWebhook = async () => {
    setIsTesting(true);
    setTestResult(null);
    const res = await testWebhook(tempWebhook);
    setTestResult(res);
    setIsTesting(false);
  };

  const filtered = emergencyReports.filter((r) => {
    if (filter === 'TODAS') return true;
    return r.status === filter;
  });

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold font-serif text-white flex items-center gap-2">
            <PhoneCall size={20} className="text-red-400" />
            <span>Centro de Despacho COAN · Línea 108</span>
          </h3>
          <p className="text-xs text-slate-400">
            Monitoreo en tiempo real de llamadas y reportes de auxilio marítimo y denuncias ciudadanas
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs">
          {['TODAS', 'RECIBIDA', 'EN_VERIFICACION', 'DESPACHADA'].map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-3 py-1 rounded-lg font-semibold transition ${
                filter === st
                  ? 'bg-red-700 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Webhook Configuration Section Requested by User */}
      <div className="p-4 bg-slate-950 rounded-2xl border border-red-500/30 space-y-3 text-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-bold text-red-400">
            <Radio size={16} className="animate-pulse" />
            <span>Integración de Enlace Táctico Webhook (Despacho Automático COAN 108)</span>
          </div>
          {webhookSaved && (
            <span className="text-emerald-400 flex items-center gap-1 font-bold text-[11px]">
              <CheckCircle2 size={13} /> ¡URL de Webhook Guardada Exitosamente!
            </span>
          )}
        </div>

        <p className="text-slate-400 text-[11px]">
          Coloque el link de su webhook (Discord, Slack, Zapier o servidor API de comando). Cada vez que entre un reporte o llamada al 108, el sistema disparará la alerta táctica a este enlace en tiempo real.
        </p>

        <form onSubmit={handleSaveWebhook} className="flex flex-col sm:flex-row gap-2">
          <input
            type="url"
            value={tempWebhook}
            onChange={(e) => setTempWebhook(e.target.value)}
            placeholder="https://discord.com/api/webhooks/... o https://hooks.slack.com/services/..."
            className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-red-500"
          />
          <div className="flex items-center gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-red-700 hover:bg-red-600 text-white font-bold rounded-xl text-xs transition shadow shrink-0"
            >
              Guardar Webhook
            </button>
            <button
              type="button"
              onClick={handleTestWebhook}
              disabled={isTesting || !tempWebhook}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-amber-300 font-semibold rounded-xl text-xs transition border border-slate-700 flex items-center gap-1 shrink-0"
            >
              <Send size={12} />
              <span>{isTesting ? 'Enviando Ping...' : 'Probar Envío'}</span>
            </button>
          </div>
        </form>

        {testResult && (
          <div
            className={`p-2.5 rounded-xl border text-[11px] flex items-center gap-2 ${
              testResult.success
                ? 'bg-emerald-950/70 border-emerald-500/40 text-emerald-300'
                : 'bg-red-950/70 border-red-500/40 text-red-300'
            }`}
          >
            {testResult.success ? <CheckCircle2 size={14} /> : <AlertTriangle size={14} />}
            <span>{testResult.message}</span>
          </div>
        )}
      </div>

      {/* Emergency Cards */}
      <div className="space-y-4">
        {filtered.map((rep) => (
          <div
            key={rep.id}
            className={`bg-slate-950 border rounded-2xl p-5 space-y-3 text-xs transition ${
              rep.priority === 'CRITICA'
                ? 'border-red-500/60 shadow-lg shadow-red-950/40'
                : 'border-slate-800'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="font-mono font-bold text-red-400 bg-red-950/60 px-2.5 py-1 rounded border border-red-500/30">
                  {rep.folio}
                </span>
                <span className="font-bold text-white text-sm">{rep.type}</span>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                    rep.priority === 'CRITICA'
                      ? 'bg-red-600 text-white animate-pulse'
                      : rep.priority === 'ALTA'
                      ? 'bg-amber-500/20 text-amber-300'
                      : 'bg-blue-500/20 text-blue-300'
                  }`}
                >
                  Prioridad {rep.priority}
                </span>

                <span
                  className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                    rep.status === 'DESPACHADA'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : rep.status === 'EN_VERIFICACION'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-red-500/20 text-red-300 border border-red-500/40'
                  }`}
                >
                  {rep.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-400 text-[11px]">
              <div className="flex items-center gap-1.5 text-slate-200">
                <MapPin size={14} className="text-red-400 shrink-0" />
                <span>Sector: <strong>{rep.location}</strong></span>
              </div>

              {rep.coordinates && (
                <div className="flex items-center gap-1.5 font-mono text-amber-400">
                  <span>GPS: {rep.coordinates}</span>
                </div>
              )}

              <div>
                Informante: <strong className="text-slate-300">{rep.reporterName || 'Anónimo'}</strong> · Tel: {rep.reporterPhone || 'N/A'}
              </div>

              <div>
                Hora de Reporte: <span className="text-slate-300">{rep.timestamp}</span>
              </div>
            </div>

            <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 text-slate-200 leading-relaxed">
              <span className="font-bold text-slate-400 block mb-1 text-[10px] uppercase">
                Detalle del Incidente:
              </span>
              {rep.description}
            </div>

            {/* Status Change Controls and Delete */}
            <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
              <span className="text-[11px] text-slate-400">Acciones de Despacho:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateEmergencyStatus(rep.id, 'EN_VERIFICACION')}
                  className="px-3 py-1 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded-lg text-[11px] transition"
                >
                  En Verificación
                </button>
                <button
                  onClick={() => updateEmergencyStatus(rep.id, 'DESPACHADA')}
                  className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-[11px] transition"
                >
                  Unidad Despachada
                </button>
                <button
                  onClick={() => updateEmergencyStatus(rep.id, 'ARCHIVADA')}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-[11px] transition"
                >
                  Archivar
                </button>
                <button
                  onClick={() => {
                    if (confirm(`¿Desea eliminar de forma permanente el reporte ${rep.folio}?`)) {
                      deleteEmergencyReport(rep.id);
                    }
                  }}
                  className="px-2.5 py-1 bg-red-950/60 hover:bg-red-900 border border-red-500/30 text-red-300 rounded-lg text-[11px] font-bold transition"
                  title="Eliminar reporte"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
