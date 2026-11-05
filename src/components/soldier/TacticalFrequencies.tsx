import React from 'react';
import { Radio, Phone, Shield, Anchor, Plane, Waves } from 'lucide-react';

export const TacticalFrequencies: React.FC = () => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold font-serif text-white flex items-center gap-2">
            <Radio size={20} className="text-amber-400" />
            <span>Frecuencias Tácticas & Directorio de Comunicaciones</span>
          </h3>
          <p className="text-xs text-slate-400">
            Canales de enlace marítimo, aeronáutico y líneas directas de bases para personal de guardia
          </p>
        </div>

        <div className="text-[11px] px-3 py-1 bg-blue-950/60 border border-blue-500/30 text-blue-300 rounded-lg font-bold">
          Cifrado Táctico: ACTIVO
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Maritime Frequencies */}
        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-amber-400 font-serif font-bold text-sm">
            <Anchor size={18} />
            <span>Comunicaciones Navales & VHF Marítimo</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-white block">Canal 16 VHF Marino (156.800 MHz)</span>
                <span className="text-slate-400 text-[11px]">Llamada Internacional, Socorro y Seguridad en Mar</span>
              </div>
              <span className="text-red-400 font-mono font-bold text-xs">CANAL 16</span>
            </div>

            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-white block">Canal 22A VHF (157.100 MHz)</span>
                <span className="text-slate-400 text-[11px]">Enlace Táctico de Interdicción y Coordinación Guardacostas</span>
              </div>
              <span className="text-blue-400 font-mono font-bold text-xs">CANAL 22A</span>
            </div>

            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-white block">Canal 06 VHF (156.300 MHz)</span>
                <span className="text-slate-400 text-[11px]">Coordinación Interbuque e Interaeronave SAR</span>
              </div>
              <span className="text-emerald-400 font-mono font-bold text-xs">CANAL 06</span>
            </div>
          </div>
        </div>

        {/* Aeronautical Frequencies */}
        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-blue-400 font-serif font-bold text-sm">
            <Plane size={18} />
            <span>Comunicaciones Aeronáuticas & SAR</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-white block">Frecuencia Internacional SAR: 121.500 MHz</span>
                <span className="text-slate-400 text-[11px]">Emergencia Civil y Balizas ELT 406 MHz</span>
              </div>
              <span className="text-red-400 font-mono font-bold text-xs">121.5 MHz</span>
            </div>

            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-white block">Frecuencia Militar SAR: 243.000 MHz</span>
                <span className="text-slate-400 text-[11px]">Guarda Aeronáutica y Coordinación Táctica Aérea</span>
              </div>
              <span className="text-amber-400 font-mono font-bold text-xs">243.0 MHz</span>
            </div>

            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-white block">Torre Howard (MPHO): 118.300 MHz</span>
                <span className="text-slate-400 text-[11px]">Control de Tránsito y Despacho Aéreo SENAN</span>
              </div>
              <span className="text-emerald-400 font-mono font-bold text-xs">118.3 MHz</span>
            </div>
          </div>
        </div>
      </div>

      {/* Direct phone lines */}
      <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
        <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
          <Phone size={14} className="text-amber-400" />
          <span>Líneas Directas de Mando de Bases Aeronavales</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
            <span className="text-slate-400 block text-[10px]">Centro de Mando COAN</span>
            <span className="font-mono font-bold text-amber-300">108 / 527-9000</span>
          </div>
          <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
            <span className="text-slate-400 block text-[10px]">Base Aérea Howard</span>
            <span className="font-mono font-bold text-slate-200">527-9200 (Ext. 24)</span>
          </div>
          <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
            <span className="text-slate-400 block text-[10px]">Base Balboa (Muelle)</span>
            <span className="font-mono font-bold text-slate-200">527-9400 (Ext. 11)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
