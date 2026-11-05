import React from 'react';
import { useApp } from '../../context/AppContext';
import { GraduationCap, Mail, Phone, Calendar, CheckCircle2, UserCheck } from 'lucide-react';

export const RecruitmentReview: React.FC = () => {
  const { recruitmentList, updateRecruitmentStatus, deleteRecruitment } = useApp();

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold font-serif text-white flex items-center gap-2">
            <GraduationCap size={20} className="text-amber-400" />
            <span>Admisión 2027 · Expedientes de Aspirantes</span>
          </h3>
          <p className="text-xs text-slate-400">
            Revisión de solicitudes remitidas a través de la convocatoria pública de ingreso
          </p>
        </div>

        <div className="text-xs font-mono px-3 py-1 bg-slate-950 border border-slate-800 rounded-lg text-amber-400">
          Total Postulaciones: {recruitmentList.length}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
              <th className="py-3 px-4">Aspirante / CIP</th>
              <th className="py-3 px-4">Especialidad de Interés</th>
              <th className="py-3 px-4">Provincia / Edad</th>
              <th className="py-3 px-4">Contacto</th>
              <th className="py-3 px-4">Estado del Proceso</th>
              <th className="py-3 px-4 text-right">Actualizar Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {recruitmentList.map((cand) => (
              <tr key={cand.id} className="hover:bg-slate-950/60 transition">
                <td className="py-3 px-4">
                  <div className="font-bold text-white">{cand.fullName}</div>
                  <div className="text-[10px] text-amber-400/90 font-mono">
                    Cédula: {cand.nationalId}
                  </div>
                </td>

                <td className="py-3 px-4">
                  <span className="font-semibold text-slate-200 block">{cand.branchInterest}</span>
                  <span className="text-[10px] text-slate-400">{cand.educationLevel}</span>
                </td>

                <td className="py-3 px-4 text-slate-300">
                  {cand.province} ({cand.age} años)
                </td>

                <td className="py-3 px-4 text-slate-300">
                  <div className="flex items-center gap-1 text-[11px]">
                    <Phone size={11} className="text-emerald-400" />
                    <span>{cand.phone}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-slate-400">
                    <Mail size={11} className="text-blue-400" />
                    <span>{cand.email}</span>
                  </div>
                </td>

                <td className="py-3 px-4">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      cand.status === 'Apto'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : cand.status === 'Citado a Pruebas'
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {cand.status}
                  </span>
                </td>

                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <select
                      value={cand.status}
                      onChange={(e) => updateRecruitmentStatus(cand.id, e.target.value as any)}
                      className="px-2 py-1 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 text-[11px] focus:outline-none focus:border-amber-400"
                    >
                      <option value="Recibido">Recibido</option>
                      <option value="Revisión Documentos">Revisión Documentos</option>
                      <option value="Citado a Pruebas">Citado a Pruebas</option>
                      <option value="Apto">Apto para Ingreso</option>
                    </select>

                    <button
                      onClick={() => {
                        if (confirm(`¿Desea descartar y eliminar la postulación de ${cand.fullName}?`)) {
                          deleteRecruitment(cand.id);
                        }
                      }}
                      className="p-1 text-red-400 hover:text-red-300 hover:bg-red-950/60 rounded"
                      title="Eliminar Postulación"
                    >
                      ✕
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
