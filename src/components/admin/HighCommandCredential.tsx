import React, { useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SENAN_LOGO } from '../../data/mockData';
import { Shield, Award, QrCode, Printer, CheckCircle2, Lock, Star, Sparkles, AlertCircle } from 'lucide-react';

export const HighCommandCredential: React.FC = () => {
  const { currentUser, updateOfficer } = useApp();
  const printRef = useRef<HTMLDivElement>(null);
  const [isEditingPhoto, setIsEditingPhoto] = useState(false);
  const [customPhotoUrl, setCustomPhotoUrl] = useState(currentUser?.avatarUrl || '');

  // Default to Director General Ibrain if not specified
  const name = currentUser?.name || 'Ibrain';
  const rank = currentUser?.rank || 'Comisionado Mayor (Director General)';
  const cip = currentUser?.cip || '8-800-2628';
  const badge = currentUser?.badgeNumber || 'SENAN-0001';
  const base = currentUser?.assignedBase || 'Base Aeronaval Cocolí (Comando General)';
  const photo = currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80';

  const handlePrint = () => {
    window.print();
  };

  const handleSavePhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser && customPhotoUrl.trim()) {
      updateOfficer(currentUser.id, { avatarUrl: customPhotoUrl.trim() });
      setIsEditingPhoto(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Star size={13} className="fill-amber-400" />
            <span>Credencial Institucional de Alto Mando</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-serif text-white flex items-center gap-2">
            <span>Carnet Oficial de Mando Estratégico</span>
          </h3>
          <p className="text-xs text-slate-400">
            Acreditación oficial emitida bajo el Decreto Ejecutivo de Seguridad Nacional para el Director General y Estado Mayor.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsEditingPhoto(!isEditingPhoto)}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 font-semibold text-xs rounded-xl transition border border-slate-700"
          >
            {isEditingPhoto ? 'Cerrar Edición de Foto' : 'Cambiar Foto de Credencial'}
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition flex items-center gap-1.5 shadow"
          >
            <Printer size={15} />
            <span>Imprimir Carnet</span>
          </button>
        </div>
      </div>

      {/* Photo URL edit drawer */}
      {isEditingPhoto && (
        <form onSubmit={handleSavePhoto} className="p-4 bg-slate-950 rounded-2xl border border-amber-500/30 space-y-3 animate-in fade-in text-xs">
          <label className="block text-slate-300 font-bold">
            URL de Fotografía Oficial para la Credencial de Alto Mando:
          </label>
          <div className="flex gap-2">
            <input
              type="url"
              required
              value={customPhotoUrl}
              onChange={(e) => setCustomPhotoUrl(e.target.value)}
              placeholder="https://ejemplo.com/foto-oficial.jpg"
              className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs"
            >
              Guardar Foto
            </button>
          </div>
          <p className="text-[11px] text-slate-500">
            Coloque una imagen con vestimenta reglamentaria de gala o uniforme aeronaval.
          </p>
        </form>
      )}

      {/* The High Command Credential Visual Card (Front & Back) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* FRONT OF THE CARD */}
        <div className="relative mx-auto w-full max-w-md bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 rounded-3xl border-2 border-amber-500/70 p-6 shadow-2xl text-white overflow-hidden shadow-amber-950/30">
          {/* Gold Decorative Corner Borders */}
          <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-amber-400 rounded-tl-3xl pointer-events-none" />
          <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-amber-400 rounded-tr-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-amber-400 rounded-bl-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-amber-400 rounded-br-3xl pointer-events-none" />

          {/* Watermark Logo Background */}
          <img
            src={SENAN_LOGO}
            alt="Marca de agua"
            className="absolute inset-0 m-auto w-64 h-72 object-contain opacity-5 pointer-events-none"
          />

          {/* Holographic Security Ribbon */}
          <div className="h-2 w-full bg-gradient-to-r from-amber-400 via-yellow-200 via-emerald-400 via-blue-400 to-amber-400 rounded-full mb-4 opacity-80" />

          {/* Header */}
          <div className="flex items-center justify-between border-b border-amber-500/30 pb-3 mb-4">
            <div className="flex items-center gap-3">
              <img
                src={SENAN_LOGO}
                alt="Escudo Oficial"
                className="w-12 h-14 object-contain drop-shadow"
              />
              <div>
                <span className="text-[9px] font-bold tracking-widest text-amber-400 uppercase block font-mono">
                  REPÚBLICA DE PANAMÁ · MINSEG
                </span>
                <span className="text-xs font-black tracking-tight text-white block uppercase font-serif">
                  SERVICIO NACIONAL AERONAVAL
                </span>
                <span className="text-[10px] text-amber-200/90 font-bold block">
                  CREDENCIAL DE ALTO MANDO / DIRECTOR GENERAL
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[9px] font-mono text-slate-400 uppercase block">CLASE</span>
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono font-black text-xs border border-amber-500/40">
                MANDO 01
              </span>
            </div>
          </div>

          {/* Main Card Body */}
          <div className="flex items-start gap-5 relative z-10">
            {/* Officer Photo */}
            <div className="relative shrink-0">
              <div className="w-28 h-36 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-xl bg-slate-900">
                <img
                  src={photo}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 p-1 bg-amber-500 text-slate-950 rounded-full shadow font-bold text-[9px] flex items-center gap-0.5">
                <Shield size={11} />
                <span>GEN</span>
              </div>
            </div>

            {/* Officer Details */}
            <div className="flex-1 space-y-1.5 text-xs">
              <div>
                <span className="text-[9px] text-slate-400 uppercase font-mono block">NOMBRE COMPLETO:</span>
                <span className="text-base font-black text-white font-serif block tracking-wide">
                  {name}
                </span>
              </div>

              <div>
                <span className="text-[9px] text-slate-400 uppercase font-mono block">CARGO Y RANGO:</span>
                <span className="font-bold text-amber-300 text-xs block leading-tight">
                  {rank}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-800">
                <div>
                  <span className="text-[9px] text-slate-400 uppercase font-mono block">CÉDULA (CIP):</span>
                  <span className="font-mono font-bold text-slate-200">{cip}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 uppercase font-mono block">PLACA SENAN:</span>
                  <span className="font-mono font-black text-amber-400">{badge}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[9px] text-slate-400 uppercase font-mono block">TIPO SANGRE:</span>
                  <span className="font-bold text-red-400 font-mono">O+ Rh Positivo</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 uppercase font-mono block">SEGURIDAD:</span>
                  <span className="font-bold text-emerald-400 font-mono text-[10px]">ULTRA SECRET</span>
                </div>
              </div>
            </div>
          </div>

          {/* Base & Authorization Footer */}
          <div className="mt-4 pt-3 border-t border-amber-500/30 flex items-center justify-between text-[10px] relative z-10">
            <div>
              <span className="text-slate-400 block text-[9px]">ASIGNACIÓN DE COMANDO:</span>
              <span className="font-semibold text-slate-200">{base}</span>
            </div>
            <div className="flex items-center gap-1.5 text-amber-400 font-bold">
              <Sparkles size={13} />
              <span>DIOS · PATRIA · HONOR</span>
            </div>
          </div>
        </div>

        {/* BACK OF THE CARD */}
        <div className="relative mx-auto w-full max-w-md bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 rounded-3xl border-2 border-slate-800 p-6 shadow-2xl text-white space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-[10px] font-mono text-slate-400 uppercase">
              REVERSO OFICIAL DE IDENTIFICACIÓN AERONAVAL
            </span>
            <span className="text-[10px] font-bold text-amber-400">VIGENCIA: PERMANENTE</span>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[10px] text-slate-300 leading-relaxed space-y-2">
            <p>
              El portador de esta credencial ostenta la <strong>Dirección General y Comandancia Superior del Servicio Nacional Aeronaval</strong>.
            </p>
            <p className="text-slate-400">
              Todas las autoridades civiles, policiales y militares de la República de Panamá brindarán pleno apoyo, custodia y facilitación para el libre tránsito y ejercicio de sus facultades de orden público y defensa de costas y cielos nacionales.
            </p>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="space-y-1">
              <span className="text-[9px] font-mono text-slate-400 uppercase block">FIRMA AUTÓGRAFA:</span>
              <div className="font-serif italic text-base text-amber-300 font-bold border-b border-slate-700 pb-1">
                Comisionado Mayor Ibrain
              </div>
              <span className="text-[8px] text-slate-500 uppercase block">Director General SENAN</span>
            </div>

            <div className="text-center">
              <div className="p-2 bg-white rounded-xl inline-block shadow">
                <QrCode size={56} className="text-slate-950" />
              </div>
              <span className="text-[8px] font-mono text-slate-400 block mt-1">VERIFICACIÓN C2</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 text-center text-[9px] text-slate-500 font-mono">
            SISTEMA INTEGRADO DE IDENTIFICACIÓN MILITAR · REPÚBLICA DE PANAMÁ · COAN LÍNEA 108
          </div>
        </div>
      </div>
    </div>
  );
};
