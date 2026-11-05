import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FleetUnit, PublicSiteContent } from '../../types';
import {
  Globe,
  LayoutTemplate,
  Shield,
  Plane,
  Anchor,
  MapPin,
  Phone,
  Plus,
  Trash2,
  Edit2,
  Save,
  CheckCircle2,
  Image as ImageIcon,
  Compass,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Info,
} from 'lucide-react';

export const SiteContentManager: React.FC = () => {
  const {
    siteContent,
    updateSiteContent,
    fleet,
    addFleetUnit,
    updateFleetUnit,
    deleteFleetUnit,
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'hero' | 'doctrinas' | 'flota' | 'footer'>('hero');
  const [saveNotification, setSaveNotification] = useState<string | null>(null);

  // Form states for Hero
  const [heroForm, setHeroForm] = useState<PublicSiteContent>({ ...siteContent });

  // Update heroForm when siteContent changes externally
  React.useEffect(() => {
    setHeroForm({ ...siteContent });
  }, [siteContent]);

  // Temporary state for adding a bullet to a command
  const [newAirBullet, setNewAirBullet] = useState('');
  const [newNavalBullet, setNewNavalBullet] = useState('');
  const [newInfantryBullet, setNewInfantryBullet] = useState('');
  const [newBase, setNewBase] = useState('');

  // Fleet management modal state
  const [isFleetModalOpen, setIsFleetModalOpen] = useState(false);
  const [editingFleetId, setEditingFleetId] = useState<string | null>(null);
  const [fleetFormData, setFleetFormData] = useState<Omit<FleetUnit, 'id'>>({
    code: '',
    name: '',
    category: 'aereo',
    type: '',
    status: 'OPERATIVO',
    base: '',
    crew: '',
    speed: '',
    range: '',
    description: '',
    equipment: [],
    imageUrl: '',
  });
  const [fleetEquipmentInput, setFleetEquipmentInput] = useState('');

  const triggerSaveAlert = (message: string) => {
    setSaveNotification(message);
    setTimeout(() => {
      setSaveNotification(null);
    }, 4000);
  };

  const handleSaveHeroAndStats = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteContent(heroForm);
    triggerSaveAlert('¡Portada y Estadísticas actualizadas con éxito! Cambios sincronizados en todos los dispositivos.');
  };

  const handleSaveDoctrines = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteContent(heroForm);
    triggerSaveAlert('¡Doctrinas, Misión y Visión actualizadas con éxito! Cambios sincronizados.');
  };

  const handleSaveFooter = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteContent(heroForm);
    triggerSaveAlert('¡Pie de página y Bases Aeronavales actualizadas con éxito!');
  };

  // Bullets handlers
  const handleAddAirBullet = () => {
    if (!newAirBullet.trim()) return;
    const updated = [...(heroForm.airCommandBullets || []), newAirBullet.trim()];
    const next = { ...heroForm, airCommandBullets: updated };
    setHeroForm(next);
    updateSiteContent(next);
    setNewAirBullet('');
  };

  const handleRemoveAirBullet = (idx: number) => {
    const updated = (heroForm.airCommandBullets || []).filter((_, i) => i !== idx);
    const next = { ...heroForm, airCommandBullets: updated };
    setHeroForm(next);
    updateSiteContent(next);
  };

  const handleAddNavalBullet = () => {
    if (!newNavalBullet.trim()) return;
    const updated = [...(heroForm.navalCommandBullets || []), newNavalBullet.trim()];
    const next = { ...heroForm, navalCommandBullets: updated };
    setHeroForm(next);
    updateSiteContent(next);
    setNewNavalBullet('');
  };

  const handleRemoveNavalBullet = (idx: number) => {
    const updated = (heroForm.navalCommandBullets || []).filter((_, i) => i !== idx);
    const next = { ...heroForm, navalCommandBullets: updated };
    setHeroForm(next);
    updateSiteContent(next);
  };

  const handleAddInfantryBullet = () => {
    if (!newInfantryBullet.trim()) return;
    const updated = [...(heroForm.infantryCommandBullets || []), newInfantryBullet.trim()];
    const next = { ...heroForm, infantryCommandBullets: updated };
    setHeroForm(next);
    updateSiteContent(next);
    setNewInfantryBullet('');
  };

  const handleRemoveInfantryBullet = (idx: number) => {
    const updated = (heroForm.infantryCommandBullets || []).filter((_, i) => i !== idx);
    const next = { ...heroForm, infantryCommandBullets: updated };
    setHeroForm(next);
    updateSiteContent(next);
  };

  const handleAddBase = () => {
    if (!newBase.trim()) return;
    const updated = [...(heroForm.footerBases || []), newBase.trim()];
    const next = { ...heroForm, footerBases: updated };
    setHeroForm(next);
    updateSiteContent(next);
    setNewBase('');
  };

  const handleRemoveBase = (idx: number) => {
    const updated = (heroForm.footerBases || []).filter((_, i) => i !== idx);
    const next = { ...heroForm, footerBases: updated };
    setHeroForm(next);
    updateSiteContent(next);
  };

  // Fleet unit handlers
  const openAddFleetModal = () => {
    setEditingFleetId(null);
    setFleetFormData({
      code: 'AN-',
      name: '',
      category: 'aereo',
      type: '',
      status: 'OPERATIVO',
      base: 'Base Aeronaval Cocolí',
      crew: '',
      speed: '',
      range: '',
      description: '',
      equipment: [],
      imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop&q=80',
    });
    setFleetEquipmentInput('');
    setIsFleetModalOpen(true);
  };

  const openEditFleetModal = (unit: FleetUnit) => {
    setEditingFleetId(unit.id);
    setFleetFormData({
      code: unit.code,
      name: unit.name,
      category: unit.category,
      type: unit.type,
      status: unit.status,
      base: unit.base,
      crew: unit.crew,
      speed: unit.speed,
      range: unit.range,
      description: unit.description,
      equipment: [...unit.equipment],
      imageUrl: unit.imageUrl,
    });
    setFleetEquipmentInput(unit.equipment.join(', '));
    setIsFleetModalOpen(true);
  };

  const handleSaveFleetUnit = (e: React.FormEvent) => {
    e.preventDefault();
    const equipmentArray = fleetEquipmentInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      ...fleetFormData,
      equipment: equipmentArray.length > 0 ? equipmentArray : ['Sistema de Navegación Táctica'],
    };

    if (editingFleetId) {
      updateFleetUnit(editingFleetId, payload);
      triggerSaveAlert(`Unidad de Flota ${payload.code} actualizada correctamente.`);
    } else {
      addFleetUnit(payload);
      triggerSaveAlert(`Nueva Unidad de Flota ${payload.code} registrada y publicada.`);
    }
    setIsFleetModalOpen(false);
  };

  const handleDeleteFleetUnit = (id: string, name: string) => {
    if (window.confirm(`¿Confirmar la eliminación de la unidad "${name}" de la flota pública?`)) {
      deleteFleetUnit(id);
      triggerSaveAlert(`Unidad "${name}" eliminada de la flota pública.`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Save Toast Notification */}
      {saveNotification && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 border border-emerald-400">
          <CheckCircle2 size={20} className="shrink-0" />
          <span className="text-sm font-semibold">{saveNotification}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Globe size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold font-serif text-white">
                  Editor de Contenido de la Web Pública
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-[10px] font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Sincronización en Vivo
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Modifique textos, imágenes, doctrinas, embarcaciones, aeronaves y datos de contacto. Cualquier cambio o eliminación se actualiza automáticamente en la web pública de todos los dispositivos.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#inicio"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-semibold flex items-center gap-2 border border-slate-700 transition"
            >
              <Globe size={14} />
              <span>Ver Web Pública</span>
            </a>
          </div>
        </div>

        {/* Sub-tabs selector */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-800 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveSubTab('hero')}
            className={`px-4 py-2 rounded-xl font-semibold flex items-center gap-2 transition shrink-0 ${
              activeSubTab === 'hero'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <LayoutTemplate size={14} />
            <span>Hero & Portada Principal</span>
          </button>

          <button
            onClick={() => setActiveSubTab('doctrinas')}
            className={`px-4 py-2 rounded-xl font-semibold flex items-center gap-2 transition shrink-0 ${
              activeSubTab === 'doctrinas'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Shield size={14} />
            <span>Comandos, Doctrinas & Misión</span>
          </button>

          <button
            onClick={() => setActiveSubTab('flota')}
            className={`px-4 py-2 rounded-xl font-semibold flex items-center gap-2 transition shrink-0 ${
              activeSubTab === 'flota'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Anchor size={14} />
            <span>Gestión de Flota ({fleet.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('footer')}
            className={`px-4 py-2 rounded-xl font-semibold flex items-center gap-2 transition shrink-0 ${
              activeSubTab === 'footer'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <MapPin size={14} />
            <span>Pie de Página & Bases</span>
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: HERO & PORTADA */}
      {activeSubTab === 'hero' && (
        <form onSubmit={handleSaveHeroAndStats} className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <LayoutTemplate size={18} className="text-amber-400" />
                <span>Textos del Hero & Encabezado Principal</span>
              </h3>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl flex items-center gap-2 transition shadow-lg shadow-blue-950"
              >
                <Save size={14} />
                <span>Guardar Cambios</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-slate-300 font-medium">Distintivo Superior (Badge):</label>
                <input
                  type="text"
                  value={heroForm.heroBadge}
                  onChange={(e) => setHeroForm({ ...heroForm, heroBadge: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500"
                  placeholder="Ej. Servicio de Protección Integral..."
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium">Título Principal (Línea 1):</label>
                <input
                  type="text"
                  value={heroForm.heroTitleLine1}
                  onChange={(e) => setHeroForm({ ...heroForm, heroTitleLine1: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500"
                  placeholder="Ej. Guardianes de"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium">Título Destacado (Dorado):</label>
                <input
                  type="text"
                  value={heroForm.heroTitleHighlight}
                  onChange={(e) => setHeroForm({ ...heroForm, heroTitleHighlight: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-amber-300 font-bold focus:outline-none focus:border-amber-500"
                  placeholder="Ej. Nuestros Mares, Cielos y Costas"
                  required
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-slate-300 font-medium">Descripción Institucional de la Portada:</label>
                <textarea
                  rows={3}
                  value={heroForm.heroDescription}
                  onChange={(e) => setHeroForm({ ...heroForm, heroDescription: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-slate-300 font-medium flex items-center justify-between">
                  <span>URL de Imagen de Fondo del Hero:</span>
                  <span className="text-[11px] text-slate-500">Unsplash o enlace directo CDN</span>
                </label>
                <div className="flex gap-3">
                  <input
                    type="url"
                    value={heroForm.heroBgImageUrl}
                    onChange={(e) => setHeroForm({ ...heroForm, heroBgImageUrl: e.target.value })}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500"
                    placeholder="https://..."
                    required
                  />
                  {heroForm.heroBgImageUrl && (
                    <div className="w-16 h-10 rounded-lg overflow-hidden border border-slate-700 bg-slate-950 shrink-0">
                      <img src={heroForm.heroBgImageUrl} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium">Compromiso 1 (Check inferior):</label>
                <input
                  type="text"
                  value={heroForm.heroCommitment1}
                  onChange={(e) => setHeroForm({ ...heroForm, heroCommitment1: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium">Compromiso 2 (Check inferior):</label>
                <input
                  type="text"
                  value={heroForm.heroCommitment2}
                  onChange={(e) => setHeroForm({ ...heroForm, heroCommitment2: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium">Compromiso 3 (Check inferior):</label>
                <input
                  type="text"
                  value={heroForm.heroCommitment3}
                  onChange={(e) => setHeroForm({ ...heroForm, heroCommitment3: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium">Número de Emergencia SOS Marítimo:</label>
                <input
                  type="text"
                  value={heroForm.emergencyBarPhone}
                  onChange={(e) => setHeroForm({ ...heroForm, emergencyBarPhone: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-red-400 font-bold focus:outline-none focus:border-red-500"
                  placeholder="108"
                />
              </div>
            </div>
          </div>

          {/* Operational Statistics */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Sparkles size={18} className="text-amber-400" />
              <span>Barra de Estadísticas Operacionales (4 Indicadores Clave)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              {/* Stat 1 */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <label className="text-amber-400 font-bold block">Indicador 1 (Dorado):</label>
                <input
                  type="text"
                  value={heroForm.stat1Value}
                  onChange={(e) => setHeroForm({ ...heroForm, stat1Value: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 font-mono font-bold text-amber-300"
                  placeholder="3,000+ NM"
                />
                <input
                  type="text"
                  value={heroForm.stat1Label}
                  onChange={(e) => setHeroForm({ ...heroForm, stat1Label: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-slate-300 text-[11px]"
                  placeholder="Litoral y ZEE Vigilada"
                />
              </div>

              {/* Stat 2 */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <label className="text-blue-400 font-bold block">Indicador 2 (Azul):</label>
                <input
                  type="text"
                  value={heroForm.stat2Value}
                  onChange={(e) => setHeroForm({ ...heroForm, stat2Value: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 font-mono font-bold text-blue-300"
                  placeholder="1,450+"
                />
                <input
                  type="text"
                  value={heroForm.stat2Label}
                  onChange={(e) => setHeroForm({ ...heroForm, stat2Label: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-slate-300 text-[11px]"
                  placeholder="Horas de Vuelo SAR"
                />
              </div>

              {/* Stat 3 */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <label className="text-emerald-400 font-bold block">Indicador 3 (Verde):</label>
                <input
                  type="text"
                  value={heroForm.stat3Value}
                  onChange={(e) => setHeroForm({ ...heroForm, stat3Value: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 font-mono font-bold text-emerald-300"
                  placeholder="184"
                />
                <input
                  type="text"
                  value={heroForm.stat3Label}
                  onChange={(e) => setHeroForm({ ...heroForm, stat3Label: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-slate-300 text-[11px]"
                  placeholder="Vidas Salvadas en el Mar"
                />
              </div>

              {/* Stat 4 */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <label className="text-red-400 font-bold block">Indicador 4 (Rojo):</label>
                <input
                  type="text"
                  value={heroForm.stat4Value}
                  onChange={(e) => setHeroForm({ ...heroForm, stat4Value: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 font-mono font-bold text-red-300"
                  placeholder="45.8 Ton"
                />
                <input
                  type="text"
                  value={heroForm.stat4Label}
                  onChange={(e) => setHeroForm({ ...heroForm, stat4Label: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-slate-300 text-[11px]"
                  placeholder="Drogas Incautadas"
                />
              </div>
            </div>

            <div className="flex justify-end pt-3">
              <button
                type="submit"
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl flex items-center gap-2 transition text-xs shadow-lg shadow-blue-900/40"
              >
                <Save size={15} />
                <span>Guardar Portada y Estadísticas</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* SUB-TAB 2: DOCTRINAS & MISIÓN */}
      {activeSubTab === 'doctrinas' && (
        <form onSubmit={handleSaveDoctrines} className="space-y-6">
          {/* Header of Section */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Shield size={18} className="text-amber-400" />
                <span>Encabezado de la Sección de Comandos</span>
              </h3>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl flex items-center gap-2 transition shadow"
              >
                <Save size={14} />
                <span>Guardar Sección</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Badge Superior:</label>
                <input
                  type="text"
                  value={heroForm.doctrineHeaderBadge}
                  onChange={(e) => setHeroForm({ ...heroForm, doctrineHeaderBadge: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-slate-300 font-medium">Título Principal:</label>
                <input
                  type="text"
                  value={heroForm.doctrineHeaderTitle}
                  onChange={(e) => setHeroForm({ ...heroForm, doctrineHeaderTitle: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-serif"
                />
              </div>
              <div className="space-y-1 md:col-span-3">
                <label className="text-slate-300 font-medium">Subtítulo Explicativo:</label>
                <input
                  type="text"
                  value={heroForm.doctrineHeaderSubtitle}
                  onChange={(e) => setHeroForm({ ...heroForm, doctrineHeaderSubtitle: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-300"
                />
              </div>
            </div>
          </div>

          {/* 3 Commands Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs">
            {/* Comando Aéreo */}
            <div className="bg-slate-900 border border-blue-500/30 rounded-2xl p-5 space-y-4 shadow-xl">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                <Plane size={18} />
                <span>Comando Aéreo</span>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium">Título:</label>
                <input
                  type="text"
                  value={heroForm.airCommandTitle}
                  onChange={(e) => setHeroForm({ ...heroForm, airCommandTitle: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium">Descripción:</label>
                <textarea
                  rows={4}
                  value={heroForm.airCommandDescription}
                  onChange={(e) => setHeroForm({ ...heroForm, airCommandDescription: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-slate-300"
                />
              </div>

              {/* Bullets */}
              <div className="space-y-2 border-t border-slate-800 pt-3">
                <label className="text-slate-400 font-medium block">Escuadrones y Capacidades:</label>
                <div className="space-y-1.5">
                  {(heroForm.airCommandBullets || []).map((bullet, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800 text-[11px]">
                      <span className="truncate pr-2">{bullet}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveAirBullet(idx)}
                        className="text-red-400 hover:text-red-300 p-1"
                        title="Eliminar elemento"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 pt-1">
                  <input
                    type="text"
                    value={newAirBullet}
                    onChange={(e) => setNewAirBullet(e.target.value)}
                    placeholder="Nuevo escuadrón..."
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-lg p-2 text-[11px]"
                  />
                  <button
                    type="button"
                    onClick={handleAddAirBullet}
                    className="px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Comando Naval */}
            <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-5 space-y-4 shadow-xl">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <Anchor size={18} />
                <span>Comando Naval</span>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium">Título:</label>
                <input
                  type="text"
                  value={heroForm.navalCommandTitle}
                  onChange={(e) => setHeroForm({ ...heroForm, navalCommandTitle: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium">Descripción:</label>
                <textarea
                  rows={4}
                  value={heroForm.navalCommandDescription}
                  onChange={(e) => setHeroForm({ ...heroForm, navalCommandDescription: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-slate-300"
                />
              </div>

              {/* Bullets */}
              <div className="space-y-2 border-t border-slate-800 pt-3">
                <label className="text-slate-400 font-medium block">Unidades y Flotillas:</label>
                <div className="space-y-1.5">
                  {(heroForm.navalCommandBullets || []).map((bullet, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800 text-[11px]">
                      <span className="truncate pr-2">{bullet}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveNavalBullet(idx)}
                        className="text-red-400 hover:text-red-300 p-1"
                        title="Eliminar elemento"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 pt-1">
                  <input
                    type="text"
                    value={newNavalBullet}
                    onChange={(e) => setNewNavalBullet(e.target.value)}
                    placeholder="Nueva flotilla o unidad..."
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-lg p-2 text-[11px]"
                  />
                  <button
                    type="button"
                    onClick={handleAddNavalBullet}
                    className="px-3 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg font-bold"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Infantería Aeronaval */}
            <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-5 space-y-4 shadow-xl">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Shield size={18} />
                <span>Infantería Aeronaval</span>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium">Título:</label>
                <input
                  type="text"
                  value={heroForm.infantryCommandTitle}
                  onChange={(e) => setHeroForm({ ...heroForm, infantryCommandTitle: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium">Descripción:</label>
                <textarea
                  rows={4}
                  value={heroForm.infantryCommandDescription}
                  onChange={(e) => setHeroForm({ ...heroForm, infantryCommandDescription: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-slate-300"
                />
              </div>

              {/* Bullets */}
              <div className="space-y-2 border-t border-slate-800 pt-3">
                <label className="text-slate-400 font-medium block">Fuerzas Especiales y BVT:</label>
                <div className="space-y-1.5">
                  {(heroForm.infantryCommandBullets || []).map((bullet, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800 text-[11px]">
                      <span className="truncate pr-2">{bullet}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveInfantryBullet(idx)}
                        className="text-red-400 hover:text-red-300 p-1"
                        title="Eliminar elemento"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 pt-1">
                  <input
                    type="text"
                    value={newInfantryBullet}
                    onChange={(e) => setNewInfantryBullet(e.target.value)}
                    placeholder="Nueva fuerza táctica..."
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-lg p-2 text-[11px]"
                  />
                  <button
                    type="button"
                    onClick={handleAddInfantryBullet}
                    className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Misión y Visión */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 text-xs">
            <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Compass size={18} className="text-blue-400" />
              <span>Misión y Visión Institucional</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-amber-400 font-bold block">Título de la Misión:</label>
                <input
                  type="text"
                  value={heroForm.missionTitle}
                  onChange={(e) => setHeroForm({ ...heroForm, missionTitle: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-serif font-bold"
                />
                <label className="text-slate-400 font-medium block">Texto de la Misión:</label>
                <textarea
                  rows={4}
                  value={heroForm.missionDescription}
                  onChange={(e) => setHeroForm({ ...heroForm, missionDescription: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-300 leading-relaxed"
                />
              </div>

              <div className="space-y-2">
                <label className="text-blue-400 font-bold block">Título de la Visión y Valores:</label>
                <input
                  type="text"
                  value={heroForm.visionTitle}
                  onChange={(e) => setHeroForm({ ...heroForm, visionTitle: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-serif font-bold"
                />
                <label className="text-slate-400 font-medium block">Texto de la Visión:</label>
                <textarea
                  rows={4}
                  value={heroForm.visionDescription}
                  onChange={(e) => setHeroForm({ ...heroForm, visionDescription: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-300 leading-relaxed"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl flex items-center gap-2 transition text-xs shadow-lg shadow-blue-900/40"
              >
                <Save size={15} />
                <span>Guardar Doctrinas, Misión y Visión</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* SUB-TAB 3: GESTIÓN DE FLOTA (Aeronaves y Embarcaciones) */}
      {activeSubTab === 'flota' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Anchor size={18} className="text-amber-400" />
                <span>Unidades de la Flota Aeronaval ({fleet.length})</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Añada nuevas aeronaves o patrulleras, edite fichas técnicas completas o elimine unidades del inventario público.
              </p>
            </div>

            <button
              onClick={openAddFleetModal}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 transition shadow-lg shadow-blue-900/40"
            >
              <Plus size={15} />
              <span>+ Añadir Nueva Unidad de Flota</span>
            </button>
          </div>

          {/* Fleet Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fleet.map((unit) => (
              <div
                key={unit.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between group"
              >
                <div className="relative h-44 bg-slate-950">
                  <img src={unit.imageUrl} alt={unit.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/40" />

                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded bg-slate-950/80 text-amber-400 border border-amber-500/40 font-mono font-bold text-xs">
                      {unit.code}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      {unit.status.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className="p-1.5 rounded-full bg-slate-950/80 text-slate-300 flex items-center">
                      {unit.category === 'aereo' ? <Plane size={14} /> : <Anchor size={14} />}
                    </span>
                  </div>

                  <div className="absolute bottom-2.5 left-3 right-3">
                    <h4 className="text-base font-bold text-white font-serif truncate">{unit.name}</h4>
                    <p className="text-xs text-amber-300/90 truncate">{unit.type}</p>
                  </div>
                </div>

                <div className="p-4 space-y-3 text-xs flex-1 flex flex-col justify-between">
                  <p className="text-slate-300 line-clamp-2 text-[11px]">{unit.description}</p>

                  <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                    <div>
                      <span className="text-slate-500 block">Velocidad:</span>
                      <span className="text-slate-200 truncate block font-medium">{unit.speed}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Alcance:</span>
                      <span className="text-slate-200 truncate block font-medium">{unit.range}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-slate-500 block">Base:</span>
                      <span className="text-amber-400 truncate block font-medium">{unit.base}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                    <button
                      onClick={() => openEditFleetModal(unit)}
                      className="flex-1 py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                    >
                      <Edit2 size={13} />
                      <span>Editar</span>
                    </button>
                    <button
                      onClick={() => handleDeleteFleetUnit(unit.id, unit.name)}
                      className="py-2 px-3 bg-red-950/70 hover:bg-red-900 border border-red-800 text-red-300 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                      title="Eliminar unidad"
                    >
                      <Trash2 size={13} />
                      <span>Eliminar</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 4: FOOTER & BASES */}
      {activeSubTab === 'footer' && (
        <form onSubmit={handleSaveFooter} className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <MapPin size={18} className="text-amber-400" />
                <span>Información de Contacto y Bases Aeronavales</span>
              </h3>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl flex items-center gap-2 transition shadow"
              >
                <Save size={14} />
                <span>Guardar Pie de Página</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-slate-300 font-medium">Lema Institucional:</label>
                <input
                  type="text"
                  value={heroForm.emergencyMotto}
                  onChange={(e) => setHeroForm({ ...heroForm, emergencyMotto: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-amber-300 italic font-semibold"
                  placeholder='"Dios, Patria y Honor"'
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium">Dirección del Cuartel General:</label>
                <input
                  type="text"
                  value={heroForm.footerHeadquarters}
                  onChange={(e) => setHeroForm({ ...heroForm, footerHeadquarters: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  placeholder="Cuartel General: Cocolí, Arraiján..."
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium">Teléfono / Línea de Despacho:</label>
                <input
                  type="text"
                  value={heroForm.footerPhone}
                  onChange={(e) => setHeroForm({ ...heroForm, footerPhone: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-red-400 font-semibold"
                  placeholder="Centro de Operaciones Aeronavales (COAN): Línea 108"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-slate-300 font-medium">Correos Electrónicos Oficiales:</label>
                <input
                  type="text"
                  value={heroForm.footerEmail}
                  onChange={(e) => setHeroForm({ ...heroForm, footerEmail: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-blue-300"
                  placeholder="info@aeronaval.gob.pa · contacto@senan.gob.pa"
                />
              </div>
            </div>

            {/* Bases Aeronavales list */}
            <div className="border-t border-slate-800 pt-5 space-y-4">
              <label className="text-sm font-bold text-white block">Lista de Bases Aeronavales en el Pie de Página:</label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(heroForm.footerBases || []).map((base, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
                    <span className="truncate pr-2">{base}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveBase(idx)}
                      className="text-red-400 hover:text-red-300 p-1"
                      title="Eliminar base"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 max-w-lg">
                <input
                  type="text"
                  value={newBase}
                  onChange={(e) => setNewBase(e.target.value)}
                  placeholder="Ej. Base Aeronaval Flamenco (Pacífico)..."
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                />
                <button
                  type="button"
                  onClick={handleAddBase}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold flex items-center gap-1.5"
                >
                  <Plus size={14} />
                  <span>Añadir Base</span>
                </button>
              </div>
            </div>

            <div className="flex justify-end pt-3">
              <button
                type="submit"
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl flex items-center gap-2 transition text-xs shadow-lg shadow-blue-900/40"
              >
                <Save size={15} />
                <span>Guardar Pie de Página y Bases</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* MODAL: AÑADIR O EDITAR UNIDAD DE FLOTA */}
      {isFleetModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-slate-900 border border-amber-500/50 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-5 text-white max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold font-serif text-white flex items-center gap-2">
                <Anchor size={20} className="text-amber-400" />
                <span>{editingFleetId ? 'Editar Unidad de Flota' : 'Registrar Nueva Unidad de Flota'}</span>
              </h3>
              <button
                onClick={() => setIsFleetModalOpen(false)}
                className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveFleetUnit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Código / Matrícula:</label>
                  <input
                    type="text"
                    value={fleetFormData.code}
                    onChange={(e) => setFleetFormData({ ...fleetFormData, code: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 font-mono text-amber-400 font-bold"
                    placeholder="AN-137 o BPO-403"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Nombre de la Unidad:</label>
                  <input
                    type="text"
                    value={fleetFormData.name}
                    onChange={(e) => setFleetFormData({ ...fleetFormData, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                    placeholder="Ej. Halcón Bell 412EP"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Categoría:</label>
                  <select
                    value={fleetFormData.category}
                    onChange={(e) => setFleetFormData({ ...fleetFormData, category: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  >
                    <option value="aereo">Comando Aéreo (Aeronave)</option>
                    <option value="naval">Comando Naval (Embarcación / Patrullera)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Tipo / Clase:</label>
                  <input
                    type="text"
                    value={fleetFormData.type}
                    onChange={(e) => setFleetFormData({ ...fleetFormData, type: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                    placeholder="Ej. Patrullera Oceánica (OPV) / Helicóptero SAR"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Estado Operativo:</label>
                  <select
                    value={fleetFormData.status}
                    onChange={(e) => setFleetFormData({ ...fleetFormData, status: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  >
                    <option value="OPERATIVO">OPERATIVO</option>
                    <option value="EN_MISION">EN MISIÓN</option>
                    <option value="MANTENIMIENTO">MANTENIMIENTO</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Base Asignada:</label>
                  <input
                    type="text"
                    value={fleetFormData.base}
                    onChange={(e) => setFleetFormData({ ...fleetFormData, base: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                    placeholder="Base Aeronaval Cocolí"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Velocidad Máxima:</label>
                  <input
                    type="text"
                    value={fleetFormData.speed}
                    onChange={(e) => setFleetFormData({ ...fleetFormData, speed: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                    placeholder="Ej. 140 Nudos (260 km/h)"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Autonomía / Alcance:</label>
                  <input
                    type="text"
                    value={fleetFormData.range}
                    onChange={(e) => setFleetFormData({ ...fleetFormData, range: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                    placeholder="Ej. 4,000 Millas Náuticas"
                    required
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-slate-300 font-medium">Dotación / Tripulación:</label>
                  <input
                    type="text"
                    value={fleetFormData.crew}
                    onChange={(e) => setFleetFormData({ ...fleetFormData, crew: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                    placeholder="Ej. 2 Pilotos + 2 Rescatistas / Médicos"
                    required
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-slate-300 font-medium">URL de Fotografía de la Unidad:</label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={fleetFormData.imageUrl}
                      onChange={(e) => setFleetFormData({ ...fleetFormData, imageUrl: e.target.value })}
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                      placeholder="https://..."
                      required
                    />
                    {fleetFormData.imageUrl && (
                      <div className="w-14 h-10 rounded-lg overflow-hidden border border-slate-700 bg-slate-950 shrink-0">
                        <img src={fleetFormData.imageUrl} alt="preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-slate-300 font-medium">Equipamiento y Sensores (Separados por coma):</label>
                  <input
                    type="text"
                    value={fleetEquipmentInput}
                    onChange={(e) => setFleetEquipmentInput(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                    placeholder="Radar FLIR, Grúa de Rescate, Enlace Táctico C2"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-slate-300 font-medium">Descripción y Misiones Tácticas:</label>
                  <textarea
                    rows={3}
                    value={fleetFormData.description}
                    onChange={(e) => setFleetFormData({ ...fleetFormData, description: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white leading-relaxed"
                    placeholder="Descripción detallada de la unidad..."
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsFleetModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow"
                >
                  <Save size={14} />
                  <span>{editingFleetId ? 'Guardar Cambios' : 'Registrar Unidad'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
