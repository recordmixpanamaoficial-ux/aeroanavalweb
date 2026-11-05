import React from 'react';
import { UserProfile } from '../../types';
import { SENAN_LOGO } from '../../data/mockData';
import { Shield, QrCode, Award, CheckCircle, Droplet, MapPin, Hash, Sparkles } from 'lucide-react';

interface MilitaryIDCardProps {
  officer: UserProfile;
}

export const MilitaryIDCard: React.FC<MilitaryIDCardProps> = ({ officer }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-bold font-serif text-white flex items-center gap-2">
            <Shield size={20} className="text-amber-400" />
            <span>Credencial Digital de Identidad Militar</span>
          </h3>
          <p className="text-xs text-slate-400">
            Documento reglamentario de acreditación personal en dependencias del SENAN
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {officer.status} en Servicio
          </span>
        </div>
      </div>

      {/* ID Badge Card Visual */}
      <div className="max-w-xl mx-auto bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 border-2 border-amber-500/60 rounded-3xl p-6 shadow-2xl relative overflow-hidden text-white">
        {/* Holographic shimmer line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-amber-400 to-red-600" />
        <div className="absolute -right-16 -bottom-16 w-48 h-48 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

        {/* Card Header */}
        <div className="flex items-center justify-between border-b border-amber-500/30 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <img
              src={SENAN_LOGO}
              alt="Escudo SENAN"
              className="w-12 h-14 object-contain filter drop-shadow"
            />
            <div>
              <span className="text-[9px] font-bold tracking-widest text-amber-400 uppercase block">
                REPÚBLICA DE PANAMÁ
              </span>
              <span className="text-xs font-black tracking-wider text-white font-serif block">
                SERVICIO NACIONAL AERONAVAL
              </span>
              <span className="text-[10px] text-slate-300 font-medium">
                CARNET DE IDENTIDAD MILITAR
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[9px] text-slate-400 block">PLACA / MATRÍCULA</span>
            <span className="font-mono text-xs font-bold text-amber-400">
              {officer.badgeNumber}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
          {/* Photo & Hologram */}
          <div className="sm:col-span-4 flex flex-col items-center">
            <div className="relative w-28 h-36 rounded-xl overflow-hidden border-2 border-amber-500/50 shadow-md bg-slate-800">
              <img
                src={officer.avatarUrl}
                alt={officer.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-1 right-1 p-0.5 rounded bg-amber-500/80 text-slate-950">
                <Sparkles size={10} />
              </div>
            </div>
            <span className="text-[9px] text-amber-300/80 mt-1.5 uppercase font-mono tracking-wider">
              CHIP BIOMÉTRICO
            </span>
          </div>

          {/* Officer Details */}
          <div className="sm:col-span-8 space-y-2 text-xs">
            <div>
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                RANGO / GRADO
              </span>
              <span className="text-base font-extrabold text-white font-serif">
                {officer.rank}
              </span>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 uppercase block">
                NOMBRE Y APELLIDO
              </span>
              <span className="text-sm font-bold text-white tracking-wide">
                {officer.name}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <div>
                <span className="text-[9px] text-slate-400 uppercase block">
                  CÉDULA (CIP)
                </span>
                <span className="font-mono font-bold text-amber-300">
                  {officer.cip}
                </span>
              </div>
              <div>
                <span className="text-[9px] text-slate-400 uppercase block">
                  RAMA MILITAR
                </span>
                <span className="font-semibold text-white">
                  {officer.militaryBranch}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-[9px] text-slate-400 uppercase block">
                  TIPO SANGRE
                </span>
                <span className="font-bold text-red-400 flex items-center gap-1">
                  <Droplet size={11} /> {officer.bloodType}
                </span>
              </div>
              <div>
                <span className="text-[9px] text-slate-400 uppercase block">
                  AÑOS DE SERVICIO
                </span>
                <span className="font-bold text-white">
                  {officer.serviceYears} Años
                </span>
              </div>
            </div>

            <div>
              <span className="text-[9px] text-slate-400 uppercase block">
                BASE ASIGNADA
              </span>
              <span className="text-[11px] font-medium text-slate-200 truncate block">
                {officer.assignedBase}
              </span>
            </div>
          </div>
        </div>

        {/* Card Footer: Barcode & Security Strip */}
        <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-[9px] text-slate-400">
          <div className="flex items-center gap-2">
            <QrCode size={24} className="text-white" />
            <div className="font-mono">
              VAL: 2026-2028 · C2-SENAN-SEC
            </div>
          </div>
          <div className="text-right italic text-amber-400/90 font-serif">
            "Dios, Patria y Honor"
          </div>
        </div>
      </div>

      {/* Merits & Medals Strip */}
      <div className="mt-8 pt-6 border-t border-slate-800">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-1.5">
          <Award size={15} className="text-amber-400" />
          <span>Condecoraciones, Cintas de Mérito y Especialidades</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
          {officer.medals.map((medal, idx) => (
            <div
              key={idx}
              className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl flex items-center gap-2.5 text-slate-200"
            >
              <div className="w-2 h-8 rounded-sm bg-gradient-to-b from-amber-400 via-blue-600 to-red-600 shrink-0" />
              <span className="font-medium">{medal}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
