import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OperationMission, OperationType, OperationStatus } from '../../types';
import { Target, PlusCircle, CheckCircle2, AlertTriangle, MapPin, Users, Plane, Anchor } from 'lucide-react';

export const OperationsDispatch: React.FC = () => {
  const { operations, addOperation, updateOperation, updateOperationStatus, deleteOperation, fleet, users } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [editingOp, setEditingOp] = useState<OperationMission | null>(null);

  const [code, setCode] = useState(`OP-AERO-${Math.floor(100 + Math.random() * 900)}`);
  const [title, setTitle] = useState('');
  const [type, setType] = useState<OperationType>('SAR');
  const [zone, setZone] = useState('Golfo de Panamá - Sector Taboga');
  const [coordinates, setCoordinates] = useState('08° 47\' N, 79° 33\' W');
  const [commander, setCommander] = useState(users[1]?.name || 'Tte. Carlos Morales');
  const [assignedUnits, setAssignedUnits] = useState<string[]>(['AN-137 (Bell 412)']);
  const [personnelCount, setPersonnelCount] = useState<number>(12);
  const [briefing, setBriefing] = useState('');
  const [priority, setPriority] = useState<'CRITICA' | 'ALTA' | 'MEDIA'>('ALTA');

  const [completingOpId, setCompletingOpId] = useState<string | null>(null);
  const [missionResults, setMissionResults] = useState('');

  const handleOpenEditOp = (op: OperationMission) => {
    setEditingOp(op);
    setCode(op.code);
    setTitle(op.title);
    setType(op.type);
    setZone(op.zone);
    setCoordinates(op.coordinates || '');
    setCommander(op.commander);
    setAssignedUnits(op.assignedUnits);
    setPersonnelCount(op.personnelCount);
    setBriefing(op.briefing);
    setPriority(op.priority);
  };

  const handleSaveEditOp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingOp) return;
    updateOperation(editingOp.id, {
      code,
      title,
      type,
      zone,
      coordinates: coordinates || undefined,
      commander,
      assignedUnits,
      personnelCount: Number(personnelCount),
      briefing,
      priority,
    });
    setEditingOp(null);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    addOperation({
      code,
      title,
      type,
      status: 'ACTIVA',
      zone,
      coordinates: coordinates || undefined,
      commander,
      assignedUnits,
      personnelCount: Number(personnelCount),
      startDate: new Date().toISOString().split('T')[0],
      briefing,
      priority,
    });
    setShowModal(false);
    setTitle('');
    setBriefing('');
    setCode(`OP-AERO-${Math.floor(100 + Math.random() * 900)}`);
  };

  const handleFinishMission = (id: string) => {
    updateOperationStatus(id, 'COMPLETADA', missionResults || 'Operación culminada con éxito sin incidentes.');
    setCompletingOpId(null);
    setMissionResults('');
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold font-serif text-white flex items-center gap-2">
            <Target size={20} className="text-red-400" />
            <span>Despacho y Seguimiento de Operaciones Aeronavales</span>
          </h3>
          <p className="text-xs text-slate-400">
            Control táctico central de misiones SAR, patrullaje oceánico e interdicción
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-red-700 hover:bg-red-600 text-white font-bold text-xs rounded-xl transition flex items-center gap-1.5 shadow-md shadow-red-950"
        >
          <PlusCircle size={15} />
          <span>Despachar Nueva Misión</span>
        </button>
      </div>

      {/* Grid of Missions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {operations.map((op) => (
          <div
            key={op.id}
            className={`bg-slate-950 border rounded-2xl p-5 flex flex-col justify-between space-y-4 transition ${
              op.status === 'ACTIVA'
                ? 'border-blue-500/60 shadow-lg shadow-blue-950/40'
                : 'border-slate-800'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs font-bold text-amber-400 bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
                  {op.code}
                </span>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                      op.priority === 'CRITICA'
                        ? 'bg-red-900/60 text-red-300 border border-red-500/40'
                        : 'bg-amber-900/40 text-amber-300'
                    }`}
                  >
                    Prioridad {op.priority}
                  </span>

                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                      op.status === 'ACTIVA'
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 animate-pulse'
                        : 'bg-emerald-500/20 text-emerald-300'
                    }`}
                  >
                    {op.status}
                  </span>
                </div>
              </div>

              <h4 className="text-base font-bold text-white font-serif">{op.title}</h4>

              <div className="text-xs text-slate-400 space-y-1">
                <div className="flex items-center gap-1.5">
                  <MapPin size={13} className="text-red-400 shrink-0" />
                  <span>{op.zone} {op.coordinates && `(${op.coordinates})`}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users size={13} className="text-slate-500 shrink-0" />
                  <span>Comandante: <strong className="text-slate-200">{op.commander}</strong> ({op.personnelCount} efectivos)</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 bg-slate-900/80 p-3 rounded-xl border border-slate-800/80 leading-relaxed">
                {op.briefing}
              </p>

              {op.results && (
                <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-xs text-emerald-200">
                  <strong className="block mb-0.5">Resultado Oficial:</strong>
                  {op.results}
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="text-[11px] text-slate-400">
                Unidades: <span className="text-amber-400">{op.assignedUnits.join(', ')}</span>
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleOpenEditOp(op)}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-lg text-xs font-semibold transition"
                  title="Editar Operación"
                >
                  Editar
                </button>

                <button
                  onClick={() => {
                    if (confirm(`¿Desea eliminar la operación ${op.code}?`)) {
                      deleteOperation(op.id);
                    }
                  }}
                  className="p-1 text-red-400 hover:text-red-300 hover:bg-red-950/60 rounded"
                  title="Eliminar Operación"
                >
                  ✕
                </button>

                {op.status === 'ACTIVA' && (
                  <button
                    onClick={() => setCompletingOpId(op.id)}
                    className="px-3 py-1 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition"
                  >
                    <CheckCircle2 size={13} />
                    <span>Cerrar</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Completion Modal */}
      {completingOpId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-emerald-500/40 rounded-2xl max-w-md w-full p-6 text-white space-y-4">
            <h4 className="text-base font-bold font-serif text-white flex items-center gap-2">
              <CheckCircle2 size={18} className="text-emerald-400" />
              <span>Concluir Operación Aeronaval</span>
            </h4>
            <p className="text-xs text-slate-300">
              Ingrese el balance y resultado oficial de la misión para asentar en el registro histórico y la sala de prensa:
            </p>
            <textarea
              rows={3}
              value={missionResults}
              onChange={(e) => setMissionResults(e.target.value)}
              placeholder="ej. 3 náufragos rescatados con vida, embarcación remolcada a puerto seguro..."
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-emerald-400"
            />
            <div className="flex justify-end gap-2 text-xs">
              <button
                onClick={() => setCompletingOpId(null)}
                className="px-3 py-1.5 bg-slate-800 rounded-lg text-slate-300"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleFinishMission(completingOpId)}
                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-bold text-white"
              >
                Confirmar Cierre de Misión
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Mission Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-red-500/40 rounded-2xl max-w-xl w-full p-6 text-white space-y-4 text-xs max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="text-base font-bold font-serif text-white flex items-center gap-2">
                <Target size={18} className="text-red-400" />
                <span>Orden de Despacho Operativo</span>
              </h4>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Código de Misión *</label>
                  <input
                    type="text"
                    required
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Tipo de Operación *</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  >
                    <option value="SAR">Búsqueda y Rescate (SAR)</option>
                    <option value="INTERDICCION">Interdicción Marítima</option>
                    <option value="PATRULLAJE">Patrullaje Preventivo</option>
                    <option value="EVAC_MEDICA">Evacuación Aeromédica</option>
                    <option value="AYUDA_HUMANITARIA">Ayuda Humanitaria</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Título de la Misión *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="ej. Rescate de embarcación con falla de motor en Golfo de San Miguel"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Zona Operacional *</label>
                  <input
                    type="text"
                    required
                    value={zone}
                    onChange={(e) => setZone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Coordenadas Estimadas</label>
                  <input
                    type="text"
                    value={coordinates}
                    onChange={(e) => setCoordinates(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Comandante *</label>
                  <input
                    type="text"
                    required
                    value={commander}
                    onChange={(e) => setCommander(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Unidad Principal</label>
                  <select
                    value={assignedUnits[0] || 'AN-137'}
                    onChange={(e) => setAssignedUnits([e.target.value])}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  >
                    {fleet.map((f) => (
                      <option key={f.id} value={`${f.code} (${f.name})`}>
                        {f.code} - {f.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Prioridad</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  >
                    <option value="CRITICA">Crítica</option>
                    <option value="ALTA">Alta</option>
                    <option value="MEDIA">Media</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Briefing y Órdenes de Misión *</label>
                <textarea
                  required
                  rows={3}
                  value={briefing}
                  onChange={(e) => setBriefing(e.target.value)}
                  placeholder="Detalle objetivos, puntos de contacto y reglas de empeñamiento..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-slate-800 rounded-xl text-slate-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-red-700 hover:bg-red-600 rounded-xl font-bold text-white shadow"
                >
                  Despachar Misión
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Edit Mission Modal */}
      {editingOp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-amber-500/40 rounded-2xl max-w-xl w-full p-6 text-white space-y-4 text-xs max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="text-base font-bold font-serif text-white flex items-center gap-2">
                <Target size={18} className="text-amber-400" />
                <span>Editar Orden de Operación: {editingOp.code}</span>
              </h4>
              <button onClick={() => setEditingOp(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleSaveEditOp} className="space-y-4">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Título de la Misión *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Zona Operacional *</label>
                  <input
                    type="text"
                    required
                    value={zone}
                    onChange={(e) => setZone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Coordenadas</label>
                  <input
                    type="text"
                    value={coordinates}
                    onChange={(e) => setCoordinates(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Comandante *</label>
                  <input
                    type="text"
                    required
                    value={commander}
                    onChange={(e) => setCommander(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Efectivos</label>
                  <input
                    type="number"
                    value={personnelCount}
                    onChange={(e) => setPersonnelCount(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Prioridad</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  >
                    <option value="CRITICA">Crítica</option>
                    <option value="ALTA">Alta</option>
                    <option value="MEDIA">Media</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Briefing Actualizado *</label>
                <textarea
                  required
                  rows={3}
                  value={briefing}
                  onChange={(e) => setBriefing(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingOp(null)}
                  className="px-4 py-2 bg-slate-800 rounded-xl text-slate-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl"
                >
                  Guardar Cambios de Operación
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
