import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GuardDuty, UserProfile } from '../../types';
import {
  CalendarClock,
  Clock,
  Shield,
  User,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Trash2,
  Edit2,
  Search,
  Filter,
  Save,
  Radio,
  FileText,
  BadgeAlert,
  ChevronRight,
  ShieldCheck,
  Check,
  RotateCcw,
} from 'lucide-react';

export const ServiceRegistryManager: React.FC = () => {
  const { guardDuties, addGuardDuty, updateGuardDuty, deleteGuardDuty, users } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [baseFilter, setBaseFilter] = useState<string>('all');
  const [shiftFilter, setShiftFilter] = useState<string>('all');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDutyId, setEditingDutyId] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState<Omit<GuardDuty, 'id'>>({
    officerId: '',
    officerName: '',
    rank: 'Agente Aeronaval',
    date: new Date().toISOString().split('T')[0],
    shift: '0800 - 1600',
    post: 'Puesto de Guardia de Prevención y Control de Acceso',
    base: 'Base Aeronaval Cocolí (Comando General)',
    status: 'Programado',
    supervisor: 'Mayor de Día - Inspector de Guardia',
    equipment: 'Fusil M4 cal. 5.56 + Radio Portátil Táctico VHF',
    notes: 'Sin novedades al momento del nombramiento.',
    militaryBranch: 'Infantería Aeronaval',
  });

  // Incident log quick modal
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
  const [selectedDutyForNotes, setSelectedDutyForNotes] = useState<GuardDuty | null>(null);
  const [dutyNotesText, setDutyNotesText] = useState('');

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Pre-configured guard posts in SENAN
  const commonPosts = [
    'Puesto de Guardia de Prevención y Control de Acceso',
    'Vigilancia de Rampa y Hangares de Vuelo',
    'Custodia de Muelle de Patrulleras y Embarcaciones',
    'Oficial de Ronda y Revista Nocturna',
    'Puesto de Observación y Vigía Costero',
    'Centro de Telecomunicaciones y Enlace C2',
    'Seguridad de Polvorín y Parque de Armamento',
    'Puesto de Control de Puerta Cocolí',
  ];

  const commonBases = [
    'Base Aeronaval Cocolí (Comando General)',
    'Base Aérea Capitán Noel Rodríguez (Howard)',
    'Base Vasco Núñez de Balboa (Pacífico)',
    'Base Cristóbal Colón (Caribe)',
    'Base Mayor Salvador Córdoba (Darién)',
    'Base Aeronaval Rambala (Bocas del Toro)',
    'Base Aeronaval Mensabé (Los Santos)',
  ];

  // Quick select an existing soldier to populate name, rank, and ID
  const handleSelectOfficer = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    if (!selectedId) return;

    const officer = users.find((u) => u.id === selectedId);
    if (officer) {
      setFormData({
        ...formData,
        officerId: officer.id,
        officerName: officer.name,
        rank: officer.rank,
        base: officer.assignedBase || formData.base,
        militaryBranch: officer.militaryBranch,
      });
    }
  };

  const handleOpenAddModal = () => {
    setEditingDutyId(null);
    const today = new Date().toISOString().split('T')[0];
    const defaultOfficer = users[0];

    setFormData({
      officerId: defaultOfficer ? defaultOfficer.id : 'of-generic',
      officerName: defaultOfficer ? defaultOfficer.name : '',
      rank: defaultOfficer ? defaultOfficer.rank : 'Agente Aeronaval',
      date: today,
      shift: '0800 - 1600',
      post: 'Puesto de Guardia de Prevención y Control de Acceso',
      base: defaultOfficer?.assignedBase || 'Base Aeronaval Cocolí (Comando General)',
      status: 'Programado',
      supervisor: 'Mayor de Día - Inspector de Guardia',
      equipment: 'Fusil M4 cal. 5.56 + Radio Portátil Táctico VHF',
      notes: 'Servicio nombrado según Orden del Día.',
      militaryBranch: defaultOfficer?.militaryBranch || 'Infantería Aeronaval',
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (duty: GuardDuty) => {
    setEditingDutyId(duty.id);
    setFormData({
      officerId: duty.officerId,
      officerName: duty.officerName,
      rank: duty.rank,
      date: duty.date,
      shift: duty.shift,
      post: duty.post,
      base: duty.base,
      status: duty.status,
      supervisor: duty.supervisor,
      equipment: duty.equipment || '',
      notes: duty.notes || '',
      militaryBranch: duty.militaryBranch || '',
    });
    setIsModalOpen(true);
  };

  const handleSaveDuty = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.officerName.trim()) {
      alert('Debe especificar el nombre del efectivo asignado.');
      return;
    }

    if (editingDutyId) {
      updateGuardDuty(editingDutyId, formData);
      showToast(`Servicio del oficial ${formData.officerName} actualizado correctamente.`);
    } else {
      addGuardDuty(formData);
      showToast(`Nuevo servicio de guardia registrado para ${formData.rank} ${formData.officerName}.`);
    }

    setIsModalOpen(false);
  };

  const handleDeleteDuty = (duty: GuardDuty) => {
    if (window.confirm(`¿Confirmar la eliminación del registro de servicio de ${duty.rank} ${duty.officerName} (${duty.post})?`)) {
      deleteGuardDuty(duty.id);
      showToast(`Registro de servicio eliminado del sistema.`);
    }
  };

  const handleQuickStatusChange = (dutyId: string, newStatus: GuardDuty['status']) => {
    updateGuardDuty(dutyId, { status: newStatus });
    showToast(`Estado del servicio actualizado a: ${newStatus}`);
  };

  const handleOpenNotesModal = (duty: GuardDuty) => {
    setSelectedDutyForNotes(duty);
    setDutyNotesText(duty.notes || '');
    setIsNotesModalOpen(true);
  };

  const handleSaveNotes = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDutyForNotes) return;

    updateGuardDuty(selectedDutyForNotes.id, {
      notes: dutyNotesText.trim(),
      status: dutyNotesText.toLowerCase().includes('novedad') && !dutyNotesText.toLowerCase().includes('sin novedad')
        ? 'Con Novedad'
        : selectedDutyForNotes.status,
    });

    showToast(`Novedades registradas en la bitácora de servicio.`);
    setIsNotesModalOpen(false);
  };

  // Metrics
  const activeCount = guardDuties.filter((g) => g.status === 'En Turno').length;
  const scheduledCount = guardDuties.filter((g) => g.status === 'Programado').length;
  const completedCount = guardDuties.filter((g) => g.status === 'Cumplido' || g.status === 'Relevado').length;
  const incidentCount = guardDuties.filter((g) => g.status === 'Con Novedad').length;

  // Filtered duties
  const filteredDuties = guardDuties.filter((duty) => {
    const matchesSearch =
      duty.officerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      duty.rank.toLowerCase().includes(searchTerm.toLowerCase()) ||
      duty.post.toLowerCase().includes(searchTerm.toLowerCase()) ||
      duty.base.toLowerCase().includes(searchTerm.toLowerCase()) ||
      duty.supervisor.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || duty.status === statusFilter;
    const matchesBase = baseFilter === 'all' || duty.base === baseFilter;
    const matchesShift = shiftFilter === 'all' || duty.shift === shiftFilter;

    return matchesSearch && matchesStatus && matchesBase && matchesShift;
  });

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 border border-emerald-400">
          <CheckCircle2 size={18} className="shrink-0" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Main Header Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <CalendarClock size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold font-serif text-white">
                  Registro de Servicio y Rol de Guardia
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-[10px] font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Sincronizado 24/7
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Libro de registro de servicios militares: nombramientos de guardia, entrega de armamento, revista de puestos y libro de novedades.
              </p>
            </div>
          </div>

          <button
            onClick={handleOpenAddModal}
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 transition shadow-lg shadow-amber-950"
          >
            <Plus size={16} />
            <span>+ Nombrar Nuevo Servicio</span>
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-800">
          <div className="bg-slate-950 p-3 rounded-xl border border-emerald-500/30">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                En Turno Activo
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="text-xl font-extrabold text-emerald-400 font-mono mt-1">{activeCount}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Efectivos en Puesto</div>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-amber-500/30">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Programados
              </span>
              <Clock size={12} className="text-amber-400" />
            </div>
            <div className="text-xl font-extrabold text-amber-400 font-mono mt-1">{scheduledCount}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Turnos Próximos</div>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-blue-500/30">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Cumplidos
              </span>
              <ShieldCheck size={12} className="text-blue-400" />
            </div>
            <div className="text-xl font-extrabold text-blue-400 font-mono mt-1">{completedCount}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Relevados con Éxito</div>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-red-500/30">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Con Novedad
              </span>
              <AlertTriangle size={12} className="text-red-400" />
            </div>
            <div className="text-xl font-extrabold text-red-400 font-mono mt-1">{incidentCount}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Incidencias en Guardia</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 text-xs">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3.5 top-3 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por soldado, rango, puesto, supervisor o base..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-300 focus:outline-none"
          >
            <option value="all">Todos los Estados</option>
            <option value="En Turno">En Turno Activo</option>
            <option value="Programado">Programados</option>
            <option value="Cumplido">Cumplidos</option>
            <option value="Relevado">Relevados</option>
            <option value="Con Novedad">Con Novedad</option>
          </select>

          <select
            value={shiftFilter}
            onChange={(e) => setShiftFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-300 focus:outline-none"
          >
            <option value="all">Todos los Turnos</option>
            <option value="0000 - 0800">0000 - 0800</option>
            <option value="0800 - 1600">0800 - 1600</option>
            <option value="1600 - 2400">1600 - 2400</option>
            <option value="Guardia 24H">Guardia 24H</option>
            <option value="Turno Especial 12H">Turno Especial 12H</option>
          </select>

          <select
            value={baseFilter}
            onChange={(e) => setBaseFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-300 focus:outline-none max-w-[200px] truncate"
          >
            <option value="all">Todas las Bases</option>
            {commonBases.map((base, idx) => (
              <option key={idx} value={base}>
                {base}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Services List / Cards */}
      <div className="space-y-4">
        {filteredDuties.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-400 space-y-3">
            <CalendarClock size={36} className="mx-auto text-slate-600" />
            <p className="text-sm font-semibold">No se encontraron registros de servicio coincidentes.</p>
            <p className="text-xs text-slate-500">
              Puede nombrar un nuevo servicio de guardia haciendo clic en "+ Nombrar Nuevo Servicio".
            </p>
          </div>
        ) : (
          filteredDuties.map((duty) => (
            <div
              key={duty.id}
              className={`bg-slate-900 border rounded-2xl p-5 shadow-xl transition space-y-4 ${
                duty.status === 'En Turno'
                  ? 'border-emerald-500/50 bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/20'
                  : duty.status === 'Con Novedad'
                  ? 'border-red-500/50 bg-gradient-to-r from-slate-900 via-slate-900 to-red-950/20'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Officer & Post */}
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded bg-blue-900/60 border border-blue-500/30 text-blue-300 text-xs font-mono font-bold">
                      {duty.shift}
                    </span>
                    <span className="text-xs text-slate-400">·</span>
                    <span className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                      <Clock size={12} className="text-amber-400" />
                      {duty.date}
                    </span>
                    <span className="text-xs text-slate-400">·</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                        duty.status === 'En Turno'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 animate-pulse'
                          : duty.status === 'Programado'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : duty.status === 'Con Novedad'
                          ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}
                    >
                      {duty.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white font-serif">
                      {duty.rank} {duty.officerName}
                    </h3>
                    {duty.militaryBranch && (
                      <span className="text-[11px] px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                        {duty.militaryBranch}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-amber-300/90 font-medium flex items-center gap-1.5">
                    <Shield size={13} className="text-amber-400 shrink-0" />
                    <span>Puesto: {duty.post}</span>
                  </p>
                </div>

                {/* Base & Supervisor */}
                <div className="text-xs space-y-1 bg-slate-950 p-3 rounded-xl border border-slate-800 shrink-0 md:min-w-[260px]">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <MapPin size={13} className="text-red-400 shrink-0" />
                    <span className="truncate">{duty.base}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <User size={13} className="text-slate-500 shrink-0" />
                    <span className="truncate">Revista: <strong className="text-white">{duty.supervisor}</strong></span>
                  </div>
                  {duty.equipment && (
                    <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-800/80 truncate">
                      Dotación: <span className="text-amber-300">{duty.equipment}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Notes / Bitácora strip */}
              {duty.notes && (
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs flex items-start gap-2.5 text-slate-300">
                  <FileText size={14} className="text-blue-400 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="font-semibold text-slate-400 text-[10px] uppercase tracking-wider block">
                      Bitácora de Novedades del Turno:
                    </span>
                    <p className="text-slate-200 mt-0.5 text-xs">{duty.notes}</p>
                  </div>
                </div>
              )}

              {/* Actions Footer */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80 text-xs">
                {/* Quick Status Buttons */}
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-slate-500 font-semibold mr-1">Cambiar a:</span>
                  <button
                    onClick={() => handleQuickStatusChange(duty.id, 'En Turno')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition ${
                      duty.status === 'En Turno'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-950 hover:bg-slate-800 text-emerald-400 border border-emerald-500/30'
                    }`}
                  >
                    En Turno
                  </button>
                  <button
                    onClick={() => handleQuickStatusChange(duty.id, 'Cumplido')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition ${
                      duty.status === 'Cumplido'
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-950 hover:bg-slate-800 text-blue-400 border border-blue-500/30'
                    }`}
                  >
                    Cumplido
                  </button>
                  <button
                    onClick={() => handleQuickStatusChange(duty.id, 'Relevado')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition ${
                      duty.status === 'Relevado'
                        ? 'bg-slate-700 text-white'
                        : 'bg-slate-950 hover:bg-slate-800 text-slate-400 border border-slate-800'
                    }`}
                  >
                    Relevado
                  </button>
                  <button
                    onClick={() => handleQuickStatusChange(duty.id, 'Con Novedad')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition ${
                      duty.status === 'Con Novedad'
                        ? 'bg-red-600 text-white'
                        : 'bg-slate-950 hover:bg-slate-800 text-red-400 border border-red-500/30'
                    }`}
                  >
                    Novedad
                  </button>
                </div>

                {/* Edit, Note, Delete */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenNotesModal(duty)}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-blue-300 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition border border-slate-700"
                    title="Anotar novedades en la bitácora"
                  >
                    <FileText size={13} />
                    <span>Bitácora Novedades</span>
                  </button>

                  <button
                    onClick={() => handleOpenEditModal(duty)}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition border border-slate-700"
                  >
                    <Edit2 size={13} />
                    <span>Editar</span>
                  </button>

                  <button
                    onClick={() => handleDeleteDuty(duty)}
                    className="px-3 py-1.5 bg-red-950/70 hover:bg-red-900 border border-red-800 text-red-300 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
                  >
                    <Trash2 size={13} />
                    <span>Eliminar</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL: REGISTRAR / EDITAR SERVICIO DE GUARDIA */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-slate-900 border border-amber-500/50 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-5 text-white max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold font-serif text-white flex items-center gap-2">
                <CalendarClock size={20} className="text-amber-400" />
                <span>{editingDutyId ? 'Editar Nombramiento de Servicio' : 'Nombrar Nuevo Servicio de Guardia'}</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveDuty} className="space-y-4 text-xs">
              {/* Quick Select from Personnel */}
              <div className="space-y-1 bg-slate-950 p-3 rounded-xl border border-slate-800">
                <label className="text-slate-300 font-bold flex items-center justify-between">
                  <span>Seleccionar Soldado / Efectivo Registrado:</span>
                  <span className="text-[11px] text-amber-400 font-normal">Auto-completa datos</span>
                </label>
                <select
                  onChange={handleSelectOfficer}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="">-- Seleccionar de la tropa registrada ({users.length} efectivos) --</option>
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.rank} {u.name} · CIP: {u.cip} · {u.militaryBranch}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Nombre del Soldado / Oficial:</label>
                  <input
                    type="text"
                    value={formData.officerName}
                    onChange={(e) => setFormData({ ...formData, officerName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                    placeholder="Nombre completo"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Rango Militar:</label>
                  <input
                    type="text"
                    value={formData.rank}
                    onChange={(e) => setFormData({ ...formData, rank: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                    placeholder="Ej. Cabo 1ro, Sargento 2do, Teniente"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Rama Militar:</label>
                  <select
                    value={formData.militaryBranch}
                    onChange={(e) => setFormData({ ...formData, militaryBranch: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  >
                    <option value="Infantería Aeronaval">Infantería Aeronaval</option>
                    <option value="Aéreo">Comando Aéreo</option>
                    <option value="Naval">Comando Naval</option>
                    <option value="Telecomunicaciones & C2">Telecomunicaciones & C2</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Fecha del Servicio:</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Turno / Horario de Guardia:</label>
                  <select
                    value={formData.shift}
                    onChange={(e) => setFormData({ ...formData, shift: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  >
                    <option value="0800 - 1600">0800 - 1600 (Turno Diurno)</option>
                    <option value="1600 - 2400">1600 - 2400 (Turno Vespertino)</option>
                    <option value="0000 - 0800">0000 - 0800 (Turno Madrugada)</option>
                    <option value="Guardia 24H">Guardia Continua 24H</option>
                    <option value="Turno Especial 12H">Turno Especial 12H</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Estado Inicial:</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  >
                    <option value="Programado">Programado</option>
                    <option value="En Turno">En Turno Activo</option>
                    <option value="Cumplido">Cumplido</option>
                    <option value="Relevado">Relevado</option>
                    <option value="Con Novedad">Con Novedad</option>
                  </select>
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-slate-300 font-medium">Puesto de Guardia Táctico:</label>
                  <input
                    type="text"
                    value={formData.post}
                    onChange={(e) => setFormData({ ...formData, post: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-medium"
                    placeholder="Puesto de Guardia"
                    required
                  />
                  {/* Quick suggestion pills */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {commonPosts.slice(0, 4).map((p, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setFormData({ ...formData, post: p })}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-slate-300 font-medium">Base Aeronaval Asignada:</label>
                  <select
                    value={formData.base}
                    onChange={(e) => setFormData({ ...formData, base: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  >
                    {commonBases.map((b, idx) => (
                      <option key={idx} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-slate-300 font-medium">Armamento & Dotación Militar Entregada:</label>
                  <input
                    type="text"
                    value={formData.equipment}
                    onChange={(e) => setFormData({ ...formData, equipment: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-amber-300"
                    placeholder="Ej. Fusil M4 + 3 Tolvas, Pistola Glock 17, Radio VHF C2"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-slate-300 font-medium">Oficial de Ronda / Supervisor de Guardia:</label>
                  <input
                    type="text"
                    value={formData.supervisor}
                    onChange={(e) => setFormData({ ...formData, supervisor: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                    placeholder="Mayor de Día o Capitán Inspector"
                    required
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-slate-300 font-medium">Observaciones de Nombramiento / Novedades:</label>
                  <textarea
                    rows={2}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-300"
                    placeholder="Sin novedades al nombramiento..."
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold flex items-center gap-2 shadow"
                >
                  <Save size={14} />
                  <span>{editingDutyId ? 'Guardar Cambios' : 'Registrar Servicio'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QUICK MODAL: ANOTAR NOVEDAD EN LA BITÁCORA */}
      {isNotesModalOpen && selectedDutyForNotes && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-slate-900 border border-blue-500/50 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 text-white">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold font-serif text-white flex items-center gap-2">
                <FileText size={18} className="text-blue-400" />
                <span>Libro de Novedades del Servicio</span>
              </h3>
              <button
                onClick={() => setIsNotesModalOpen(false)}
                className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="text-xs bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
              <div>
                Efectivo: <strong className="text-white">{selectedDutyForNotes.rank} {selectedDutyForNotes.officerName}</strong>
              </div>
              <div className="text-slate-400">
                Puesto: <span className="text-amber-300">{selectedDutyForNotes.post}</span> ({selectedDutyForNotes.shift})
              </div>
            </div>

            <form onSubmit={handleSaveNotes} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium">Novedad o Incidencia Ocurrida en la Guardia:</label>
                <textarea
                  rows={4}
                  value={dutyNotesText}
                  onChange={(e) => setDutyNotesText(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white leading-relaxed focus:outline-none focus:border-blue-500"
                  placeholder="Ej. 14:30 Revista de armamento efectuada sin novedad. Tránsito perimetral despejado..."
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNotesModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow"
                >
                  <Save size={13} />
                  <span>Asentar en Bitácora</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
