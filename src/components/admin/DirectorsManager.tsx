import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DirectorProfile } from '../../types';
import { Shield, PlusCircle, Edit3, Trash2, Phone, Mail, Award, CheckCircle2, User } from 'lucide-react';

export const DirectorsManager: React.FC = () => {
  const { directors, addDirector, updateDirector, deleteDirector } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingDirector, setEditingDirector] = useState<DirectorProfile | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [rank, setRank] = useState('Comisionado Aeronaval');
  const [position, setPosition] = useState('');
  const [department, setDepartment] = useState('');
  const [photoUrl, setPhotoUrl] = useState('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80');
  const [bio, setBio] = useState('');
  const [order, setOrder] = useState<number>(directors.length + 1);
  const [phone, setPhone] = useState('+507 527-9000');
  const [email, setEmail] = useState('');

  const handleOpenAdd = () => {
    setName('');
    setRank('Comisionado Aeronaval');
    setPosition('');
    setDepartment('Comando General');
    setPhotoUrl('https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80');
    setBio('');
    setOrder(directors.length + 1);
    setPhone('+507 527-9000');
    setEmail('');
    setShowAddModal(true);
  };

  const handleOpenEdit = (d: DirectorProfile) => {
    setEditingDirector(d);
    setName(d.name);
    setRank(d.rank);
    setPosition(d.position);
    setDepartment(d.department);
    setPhotoUrl(d.photoUrl);
    setBio(d.bio);
    setOrder(d.order);
    setPhone(d.phone || '');
    setEmail(d.email || '');
  };

  const handleSaveAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addDirector({
      name,
      rank,
      position,
      department,
      photoUrl,
      bio,
      order: Number(order),
      phone,
      email,
    });
    setShowAddModal(false);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDirector) return;
    updateDirector(editingDirector.id, {
      name,
      rank,
      position,
      department,
      photoUrl,
      bio,
      order: Number(order),
      phone,
      email,
    });
    setEditingDirector(null);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold font-serif text-white flex items-center gap-2">
            <Award size={20} className="text-amber-400" />
            <span>Gestión de Directores y Alto Mando del SENAN</span>
          </h3>
          <p className="text-xs text-slate-400">
            Administre la plana mayor que se muestra en la sección pública de la web. Puede agregar, editar datos/foto o eliminar.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition flex items-center gap-1.5 shadow"
        >
          <PlusCircle size={15} />
          <span>Agregar Nuevo Director</span>
        </button>
      </div>

      {/* Directors Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
              <th className="py-3 px-4">Orden</th>
              <th className="py-3 px-4">Director / Foto</th>
              <th className="py-3 px-4">Cargo & Rango</th>
              <th className="py-3 px-4">Dirección / Comando</th>
              <th className="py-3 px-4">Contacto</th>
              <th className="py-3 px-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {directors
              .sort((a, b) => a.order - b.order)
              .map((d) => (
                <tr key={d.id} className="hover:bg-slate-950/60 transition">
                  <td className="py-3 px-4 font-mono font-bold text-amber-400 text-sm">
                    #{d.order}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={d.photoUrl}
                        alt={d.name}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-700 shrink-0"
                      />
                      <div>
                        <div className="font-bold text-white text-sm">{d.name}</div>
                        <div className="text-[10px] text-amber-400 font-mono">{d.rank}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-slate-200 font-medium block">{d.position}</span>
                    <span className="text-[10px] text-slate-400 line-clamp-1">{d.bio}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-300">
                    {d.department}
                  </td>
                  <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">
                    <div>{d.phone || 'N/A'}</div>
                    <div className="text-[10px] text-slate-500">{d.email || ''}</div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(d)}
                        className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-lg text-xs font-semibold flex items-center gap-1 transition"
                        title="Editar datos del Director"
                      >
                        <Edit3 size={13} />
                        <span>Editar</span>
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`¿Está seguro de eliminar a ${d.name} de la lista de directores?`)) {
                            deleteDirector(d.id);
                          }
                        }}
                        className="p-1.5 bg-red-950/60 hover:bg-red-900 border border-red-500/30 text-red-300 rounded-lg text-xs transition"
                        title="Eliminar Director"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* MODAL: Agregar Director */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="bg-slate-900 border border-amber-500/40 rounded-3xl max-w-xl w-full p-6 text-white space-y-4 text-xs max-h-[92vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="text-base font-bold font-serif text-white flex items-center gap-2">
                <PlusCircle size={18} className="text-amber-400" />
                <span>Agregar Director a la Plana Mayor</span>
              </h4>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleSaveAdd} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Nombre Completo *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="ej. Gabriel Arrocha"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Rango Institucional *</label>
                  <input
                    type="text"
                    required
                    value={rank}
                    onChange={(e) => setRank(e.target.value)}
                    placeholder="ej. Comisionado Aeronaval"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Cargo Oficial *</label>
                  <input
                    type="text"
                    required
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    placeholder="ej. Subdirector General del SENAN"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Dirección / Comando *</label>
                  <input
                    type="text"
                    required
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="ej. Subdirección General"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">URL de Fotografía Oficial *</label>
                <input
                  type="url"
                  required
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Biografía y Trayectoria Militar *</label>
                <textarea
                  required
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Reseña de carrera, especialidades y distinciones..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Orden de Jerarquía</label>
                  <input
                    type="number"
                    min="1"
                    max="99"
                    value={order}
                    onChange={(e) => setOrder(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Teléfono</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Correo Electrónico</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-800 rounded-xl text-slate-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl"
                >
                  Guardar Director
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Editar Director */}
      {editingDirector && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="bg-slate-900 border border-amber-500/40 rounded-3xl max-w-xl w-full p-6 text-white space-y-4 text-xs max-h-[92vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="text-base font-bold font-serif text-white flex items-center gap-2">
                <Edit3 size={18} className="text-amber-400" />
                <span>Editar Ficha de Director</span>
              </h4>
              <button onClick={() => setEditingDirector(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Nombre Completo *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Rango Institucional *</label>
                  <input
                    type="text"
                    required
                    value={rank}
                    onChange={(e) => setRank(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Cargo Oficial *</label>
                  <input
                    type="text"
                    required
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Dirección / Comando *</label>
                  <input
                    type="text"
                    required
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">URL de Fotografía Oficial *</label>
                <input
                  type="url"
                  required
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Biografía y Trayectoria Militar *</label>
                <textarea
                  required
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Orden de Jerarquía</label>
                  <input
                    type="number"
                    min="1"
                    max="99"
                    value={order}
                    onChange={(e) => setOrder(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Teléfono</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Correo Electrónico</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingDirector(null)}
                  className="px-4 py-2 bg-slate-800 rounded-xl text-slate-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
