import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserProfile, MilitaryBranch } from '../../types';
import { Users, UserPlus, KeyRound, CheckCircle2, Search, Key, Copy, AlertCircle, Shield, Plane, Anchor, RefreshCw } from 'lucide-react';

export const PersonnelManagement: React.FC = () => {
  const { users, addOfficer, updateOfficerStatus, updateOfficerCredentials, deleteOfficer } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [branchFilter, setBranchFilter] = useState<string>('Todas');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Officer Form State
  const [name, setName] = useState('');
  const [rank, setRank] = useState('Agente Aeronaval');
  const [militaryBranch, setMilitaryBranch] = useState<MilitaryBranch>('Aéreo');
  const [cip, setCip] = useState('');
  const [badgeNumber, setBadgeNumber] = useState(`SENAN-${Math.floor(2000 + Math.random() * 7000)}`);
  const [assignedBase, setAssignedBase] = useState('Base Aérea Capitán Noel Rodríguez (Howard)');
  const [bloodType, setBloodType] = useState('O+');
  const [avatarUrl, setAvatarUrl] = useState('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80');
  const [phone, setPhone] = useState('+507 6000-0000');
  const [email, setEmail] = useState('');
  const [serviceYears, setServiceYears] = useState<number>(2);

  // Edit Officer Modal state
  const [editingFullOfficer, setEditingFullOfficer] = useState<UserProfile | null>(null);
  const [editFullName, setEditFullName] = useState('');
  const [editRank, setEditRank] = useState('');
  const [editBranch, setEditBranch] = useState<MilitaryBranch>('Aéreo');
  const [editCip, setEditCip] = useState('');
  const [editBadge, setEditBadge] = useState('');
  const [editBase, setEditBase] = useState('');
  const [editAvatarUrl, setEditAvatarUrl] = useState('');
  const [editPhone, setEditPhone] = useState('');

  // Credentials for the new soldier
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Password reset modal state
  const [editingOfficer, setEditingOfficer] = useState<UserProfile | null>(null);
  const [editUsername, setEditUsername] = useState('');
  const [editPassword, setEditPassword] = useState('');

  // Credential Created Banner / Notification
  const [createdCredentialsAlert, setCreatedCredentialsAlert] = useState<{
    name: string;
    username: string;
    pass: string;
    branch: string;
  } | null>(null);

  const [copiedText, setCopiedText] = useState(false);

  // Auto-generate username when name changes
  const handleNameChange = (val: string) => {
    setName(val);
    const clean = val.toLowerCase().trim().replace(/\s+/g, '.').normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (!newUsername || newUsername.startsWith('soldado.')) {
      const prefix = militaryBranch === 'Aéreo' ? 'piloto.' : militaryBranch === 'Infantería Aeronaval' ? 'infante.' : 'soldado.';
      setNewUsername(prefix + (clean.split('.').slice(-1)[0] || 'efectivo'));
    }
  };

  const handleBranchChange = (branch: MilitaryBranch) => {
    setMilitaryBranch(branch);
    const clean = name.toLowerCase().trim().replace(/\s+/g, '.').normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const surname = clean.split('.').slice(-1)[0] || 'soldado';
    if (branch === 'Aéreo') {
      setNewUsername(`piloto.${surname}`);
      setAssignedBase('Base Aérea Capitán Noel Rodríguez (Howard)');
      setAvatarUrl('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80');
    } else if (branch === 'Infantería Aeronaval') {
      setNewUsername(`infante.${surname}`);
      setAssignedBase('Base Aeronaval Mayor Salvador Córdoba (Pacífico)');
      setAvatarUrl('https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80');
    } else {
      setNewUsername(`marino.${surname}`);
      setAssignedBase('Base Aeronaval Vasco Núñez de Balboa');
      setAvatarUrl('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80');
    }
  };

  const generateRandomPassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let res = 'senan';
    for (let i = 0; i < 4; i++) {
      res += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewPassword(res);
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.cip.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.badgeNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBranch = branchFilter === 'Todas' || u.militaryBranch === branchFilter;
    return matchesSearch && matchesBranch;
  });

  const handleCreateSoldier = (e: React.FormEvent) => {
    e.preventDefault();

    const usernameFinal = newUsername.trim().toLowerCase();
    const passwordFinal = newPassword.trim();

    const created = addOfficer({
      name,
      username: usernameFinal,
      password: passwordFinal,
      role: 'officer',
      rank,
      militaryBranch,
      cip,
      badgeNumber,
      assignedBase,
      bloodType,
      avatarUrl: avatarUrl.trim() || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
      phone,
      email: email || `${usernameFinal}@aeronaval.gob.pa`,
      serviceYears: Number(serviceYears),
      status: 'Activo',
      medals: ['Certificado de Ingreso Escuela Aeronaval'],
    });

    setCreatedCredentialsAlert({
      name: created.name,
      username: usernameFinal,
      pass: passwordFinal,
      branch: created.militaryBranch,
    });

    setShowAddModal(false);
    setName('');
    setCip('');
    setNewUsername('');
    setNewPassword('');
  };

  const handleOpenEditCredentials = (u: UserProfile) => {
    setEditingOfficer(u);
    setEditUsername(u.username);
    setEditPassword(u.password || 'soldado123');
  };

  const handleSaveCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingOfficer) return;

    updateOfficerCredentials(editingOfficer.id, editUsername, editPassword);
    setCreatedCredentialsAlert({
      name: editingOfficer.name,
      username: editUsername,
      pass: editPassword,
      branch: editingOfficer.militaryBranch,
    });
    setEditingOfficer(null);
  };

  const handleCopyAlert = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold font-serif text-white flex items-center gap-2">
            <Users size={20} className="text-amber-400" />
            <span>Gestión de Personal & Asignación de Credenciales de Soldados</span>
          </h3>
          <p className="text-xs text-slate-400">
            Cree soldados (Pilotos o Infantes), asígneles usuario y contraseña para que puedan acceder a su panel propio
          </p>
        </div>

        <button
          onClick={() => {
            setShowAddModal(true);
            setNewPassword('senan2026');
            setBadgeNumber(`SENAN-${Math.floor(2000 + Math.random() * 7000)}`);
          }}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition flex items-center gap-2 shadow-lg shadow-blue-950"
        >
          <UserPlus size={16} />
          <span>Crear Soldado y Asignar Usuario/Contraseña</span>
        </button>
      </div>

      {/* Alert Banner when credentials are created or updated */}
      {createdCredentialsAlert && (
        <div className="p-4 bg-emerald-950/80 border border-emerald-500/50 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs animate-in fade-in">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
              <CheckCircle2 size={18} />
              <span>¡Credenciales generadas para {createdCredentialsAlert.name}!</span>
            </div>
            <p className="text-slate-300 text-[11px]">
              El soldado ya puede acceder a su panel propio ({createdCredentialsAlert.branch}) con las siguientes credenciales:
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1 font-mono text-xs">
              <span className="bg-slate-900 px-3 py-1 rounded-lg border border-slate-700 text-amber-300 font-bold">
                Usuario: {createdCredentialsAlert.username}
              </span>
              <span className="bg-slate-900 px-3 py-1 rounded-lg border border-slate-700 text-emerald-300 font-bold">
                Contraseña: {createdCredentialsAlert.pass}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                handleCopyAlert(
                  `SENAN - Credenciales de Acceso:\nNombre: ${createdCredentialsAlert.name}\nUsuario: ${createdCredentialsAlert.username}\nContraseña: ${createdCredentialsAlert.pass}\nPanel: ${createdCredentialsAlert.branch}`
                )
              }
              className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold rounded-lg flex items-center gap-1 transition text-xs"
            >
              <Copy size={13} />
              <span>{copiedText ? '¡Copiado!' : 'Copiar Credenciales'}</span>
            </button>
            <button
              onClick={() => setCreatedCredentialsAlert(null)}
              className="p-1.5 text-slate-400 hover:text-white"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Filters and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nombre, usuario, CIP o placa..."
            className="w-full pl-8 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
          />
          <Search size={14} className="absolute left-2.5 top-3 text-slate-500" />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-slate-400 text-[11px]">Filtrar por Especialidad:</span>
          <select
            value={branchFilter}
            onChange={(e) => setBranchFilter(e.target.value)}
            className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400"
          >
            <option>Todas</option>
            <option>Aéreo</option>
            <option>Infantería Aeronaval</option>
            <option>Naval</option>
            <option>Telecomunicaciones & C2</option>
          </select>
        </div>
      </div>

      {/* Roster Table with Explicit Credentials */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
              <th className="py-3 px-4">Efectivo / CIP</th>
              <th className="py-3 px-4">Rango & Especialidad</th>
              <th className="py-3 px-4">Credenciales de Acceso</th>
              <th className="py-3 px-4">Base Asignada</th>
              <th className="py-3 px-4">Estado</th>
              <th className="py-3 px-4 text-right">Gestión de Acceso</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filteredUsers.map((u) => (
              <tr key={u.id} className="hover:bg-slate-950/60 transition">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={u.avatarUrl}
                      alt={u.name}
                      className="w-10 h-10 rounded-xl object-cover border border-slate-700 shrink-0"
                    />
                    <div>
                      <div className="font-bold text-white flex items-center gap-1.5">
                        <span>{u.name}</span>
                        {u.role === 'admin' && (
                          <span className="px-1.5 py-0.2 rounded bg-red-950 text-red-300 text-[9px] font-bold">
                            MANDO
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-amber-400/90 font-mono">
                        CIP: {u.cip} · {u.badgeNumber}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="py-3 px-4">
                  <div className="text-slate-200 font-medium">{u.rank}</div>
                  <div className="text-[11px] flex items-center gap-1 mt-0.5">
                    {u.militaryBranch === 'Aéreo' && (
                      <span className="text-blue-400 font-semibold flex items-center gap-1">
                        <Plane size={11} /> Piloto Aeronaval
                      </span>
                    )}
                    {u.militaryBranch === 'Infantería Aeronaval' && (
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        <Anchor size={11} /> Infantería Táctica
                      </span>
                    )}
                    {u.militaryBranch !== 'Aéreo' && u.militaryBranch !== 'Infantería Aeronaval' && (
                      <span className="text-slate-400">{u.militaryBranch}</span>
                    )}
                  </div>
                </td>

                {/* Explicit Credentials Display */}
                <td className="py-3 px-4">
                  {u.role === 'admin' ? (
                    <div className="p-2 bg-slate-950 rounded-lg border border-red-500/30 space-y-1 font-mono text-[11px]">
                      <div className="flex items-center gap-1 text-slate-400">
                        <span className="text-slate-500">Credencial:</span>
                        <strong className="text-red-400">ALTO MANDO (Privada)</strong>
                      </div>
                      <div className="flex items-center gap-1 text-slate-500">
                        <span>Clave:</span>
                        <strong className="text-slate-500 tracking-widest">••••••••</strong>
                      </div>
                    </div>
                  ) : (
                    <div className="p-2 bg-slate-950 rounded-lg border border-slate-800 space-y-1 font-mono text-[11px]">
                      <div className="flex items-center gap-1 text-slate-300">
                        <span className="text-slate-500">Usuario:</span>
                        <strong className="text-amber-400">{u.username}</strong>
                      </div>
                      <div className="flex items-center gap-1 text-slate-400">
                        <span className="text-slate-500">Clave:</span>
                        <strong className="text-emerald-400">{u.password || '••••••••'}</strong>
                      </div>
                    </div>
                  )}
                </td>

                <td className="py-3 px-4 text-slate-300">
                  <span className="line-clamp-1">{u.assignedBase}</span>
                </td>

                <td className="py-3 px-4">
                  <select
                    value={u.status}
                    onChange={(e) => updateOfficerStatus(u.id, e.target.value as any)}
                    className="px-2 py-1 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 text-[11px] focus:outline-none focus:border-amber-400"
                  >
                    <option value="Activo">Activo</option>
                    <option value="Guardia">En Guardia</option>
                    <option value="En Misión">En Misión</option>
                    <option value="Permiso">De Permiso</option>
                  </select>
                </td>

                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => {
                        setEditingFullOfficer(u);
                        setEditFullName(u.name);
                        setEditRank(u.rank);
                        setEditBranch(u.militaryBranch);
                        setEditCip(u.cip);
                        setEditBadge(u.badgeNumber);
                        setEditBase(u.assignedBase);
                        setEditAvatarUrl(u.avatarUrl);
                        setEditPhone(u.phone);
                      }}
                      className="px-2.5 py-1 bg-blue-950/60 hover:bg-blue-900 border border-blue-500/30 text-blue-300 rounded-lg text-[11px] font-semibold flex items-center gap-1 transition"
                      title="Editar Datos, Especialidad o Foto del Soldado"
                    >
                      <Shield size={12} />
                      <span>Editar</span>
                    </button>

                    <button
                      onClick={() => handleOpenEditCredentials(u)}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-[11px] font-semibold flex items-center gap-1 transition border border-slate-700"
                      title="Cambiar Usuario / Contraseña del Soldado"
                    >
                      <KeyRound size={12} className="text-amber-400" />
                      <span>Clave</span>
                    </button>

                    {u.role !== 'admin' && (
                      <button
                        onClick={() => {
                          if (confirm(`¿Desea dar de baja y revocar el acceso a ${u.name}?`)) {
                            deleteOfficer(u.id);
                          }
                        }}
                        className="p-1 text-red-400 hover:text-red-300 hover:bg-red-950/60 rounded"
                        title="Eliminar Soldado"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL 1: Crear Soldado y Asignar Credenciales */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="bg-slate-900 border border-blue-500/40 rounded-3xl max-w-xl w-full p-6 text-white space-y-4 text-xs max-h-[92vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-600/20 border border-blue-500/30 rounded-xl text-blue-400">
                  <UserPlus size={18} />
                </div>
                <div>
                  <h4 className="text-base font-bold font-serif text-white">
                    Alta de Soldado & Creación de Credenciales
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Defina el usuario y contraseña con el que el soldado entrará a su panel
                  </p>
                </div>
              </div>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateSoldier} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Nombre Completo del Efectivo *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="ej. Eduardo Gómez Díaz"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Cédula de Identidad (CIP) *</label>
                  <input
                    type="text"
                    required
                    value={cip}
                    onChange={(e) => setCip(e.target.value)}
                    placeholder="ej. 8-892-1402"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono focus:outline-none focus:border-blue-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Especialidad / Panel *</label>
                  <select
                    value={militaryBranch}
                    onChange={(e) => handleBranchChange(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-bold"
                  >
                    <option value="Aéreo">Aéreo (Soldado Piloto)</option>
                    <option value="Infantería Aeronaval">Infantería Aeronaval</option>
                    <option value="Naval">Naval</option>
                    <option value="Telecomunicaciones & C2">Telecomunicaciones</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Rango *</label>
                  <select
                    value={rank}
                    onChange={(e) => setRank(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  >
                    <option>Subteniente</option>
                    <option>Teniente de Navío</option>
                    <option>Sargento 1ro.</option>
                    <option>Sargento 2do.</option>
                    <option>Cabo 1ro.</option>
                    <option>Agente Aeronaval</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Tipo de Sangre</label>
                  <select
                    value={bloodType}
                    onChange={(e) => setBloodType(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  >
                    <option>O+</option>
                    <option>A+</option>
                    <option>B+</option>
                    <option>AB+</option>
                    <option>O-</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Base Asignada *</label>
                  <input
                    type="text"
                    required
                    value={assignedBase}
                    onChange={(e) => setAssignedBase(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Placa Institucional</label>
                  <input
                    type="text"
                    value={badgeNumber}
                    onChange={(e) => setBadgeNumber(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono"
                  />
                </div>
              </div>

              {/* Photo for credential */}
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Foto para la Credencial del Soldado (URL) *
                </label>
                <div className="flex items-center gap-3">
                  <img
                    src={avatarUrl}
                    alt="Preview"
                    className="w-12 h-12 rounded-xl object-cover border border-amber-400 shrink-0 bg-slate-950"
                  />
                  <input
                    type="url"
                    required
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div className="flex items-center gap-2 mt-1.5 text-[10px] text-slate-400">
                  <span>Sugerencias:</span>
                  <button
                    type="button"
                    onClick={() => setAvatarUrl('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80')}
                    className="text-amber-400 hover:underline"
                  >
                    Piloto 1
                  </button>
                  <span>·</span>
                  <button
                    type="button"
                    onClick={() => setAvatarUrl('https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80')}
                    className="text-amber-400 hover:underline"
                  >
                    Infante 2
                  </button>
                  <span>·</span>
                  <button
                    type="button"
                    onClick={() => setAvatarUrl('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80')}
                    className="text-amber-400 hover:underline"
                  >
                    Oficial Femenina
                  </button>
                </div>
              </div>

              {/* CREDENTIALS SECTION */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-amber-500/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-bold text-amber-400">
                    <KeyRound size={15} />
                    <span>Credenciales de Acceso para el Soldado</span>
                  </div>
                  <button
                    type="button"
                    onClick={generateRandomPassword}
                    className="text-[10px] text-slate-400 hover:text-amber-300 flex items-center gap-1"
                  >
                    <RefreshCw size={11} /> Autogenerar Contraseña
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">
                      Usuario de Ingreso *
                    </label>
                    <input
                      type="text"
                      required
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      placeholder="ej. piloto.gomez o infante.gomez"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-amber-300 font-mono font-bold focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">
                      Contraseña de Ingreso *
                    </label>
                    <input
                      type="text"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="ej. senan2026"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-emerald-300 font-mono font-bold focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <p className="text-[10px] text-slate-400">
                  El soldado usará este usuario y contraseña para acceder a su panel ({militaryBranch === 'Aéreo' ? 'Panel de Soldado Piloto' : militaryBranch === 'Infantería Aeronaval' ? 'Panel de Soldado Infantería' : 'Panel de Soldado'}).
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-800 rounded-xl text-slate-300 hover:bg-slate-700"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-white shadow-lg"
                >
                  Crear Soldado y Habilitar Acceso
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Modificar Credenciales Existentes */}
      {editingOfficer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="bg-slate-900 border border-amber-500/40 rounded-2xl max-w-md w-full p-6 text-white space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <KeyRound size={18} className="text-amber-400" />
                <h4 className="text-base font-bold font-serif text-white">
                  Modificar Credenciales de Acceso
                </h4>
              </div>
              <button onClick={() => setEditingOfficer(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <p className="text-slate-300">
              Efectivo: <strong>{editingOfficer.rank} {editingOfficer.name}</strong> ({editingOfficer.militaryBranch})
            </p>

            <form onSubmit={handleSaveCredentials} className="space-y-4">
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Usuario de Acceso *
                </label>
                <input
                  type="text"
                  required
                  value={editUsername}
                  onChange={(e) => setEditUsername(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-amber-300 font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Nueva Contraseña *
                </label>
                <input
                  type="text"
                  required
                  value={editPassword}
                  onChange={(e) => setEditPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-emerald-300 font-mono font-bold"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingOfficer(null)}
                  className="px-3 py-1.5 bg-slate-800 rounded-lg text-slate-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg"
                >
                  Guardar Nuevas Credenciales
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: Editar Datos Completos y Foto del Soldado */}
      {editingFullOfficer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="bg-slate-900 border border-blue-500/40 rounded-3xl max-w-xl w-full p-6 text-white space-y-4 text-xs max-h-[92vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="text-base font-bold font-serif text-white flex items-center gap-2">
                <Shield size={18} className="text-blue-400" />
                <span>Editar Ficha y Credencial del Soldado</span>
              </h4>
              <button onClick={() => setEditingFullOfficer(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const { updateOfficer } = useApp();
                // update officer
                updateOfficer(editingFullOfficer.id, {
                  name: editFullName,
                  rank: editRank,
                  militaryBranch: editBranch,
                  cip: editCip,
                  badgeNumber: editBadge,
                  assignedBase: editBase,
                  avatarUrl: editAvatarUrl,
                  phone: editPhone,
                });
                setEditingFullOfficer(null);
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Nombre Completo *</label>
                  <input
                    type="text"
                    required
                    value={editFullName}
                    onChange={(e) => setEditFullName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Cédula (CIP) *</label>
                  <input
                    type="text"
                    required
                    value={editCip}
                    onChange={(e) => setEditCip(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Rango *</label>
                  <input
                    type="text"
                    required
                    value={editRank}
                    onChange={(e) => setEditRank(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Especialidad *</label>
                  <select
                    value={editBranch}
                    onChange={(e) => setEditBranch(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-bold"
                  >
                    <option value="Aéreo">Aéreo (Piloto)</option>
                    <option value="Infantería Aeronaval">Infantería Aeronaval</option>
                    <option value="Naval">Naval</option>
                    <option value="Telecomunicaciones & C2">Telecomunicaciones</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">URL Fotografía en Credencial *</label>
                <div className="flex items-center gap-3">
                  <img
                    src={editAvatarUrl}
                    alt="Preview"
                    className="w-12 h-12 rounded-xl object-cover border border-amber-400 shrink-0"
                  />
                  <input
                    type="url"
                    required
                    value={editAvatarUrl}
                    onChange={(e) => setEditAvatarUrl(e.target.value)}
                    className="flex-1 px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Base Asignada *</label>
                  <input
                    type="text"
                    required
                    value={editBase}
                    onChange={(e) => setEditBase(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Placa Institucional</label>
                  <input
                    type="text"
                    value={editBadge}
                    onChange={(e) => setEditBadge(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingFullOfficer(null)}
                  className="px-4 py-2 bg-slate-800 rounded-xl text-slate-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 font-bold rounded-xl text-white shadow"
                >
                  Guardar Ficha del Soldado
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
