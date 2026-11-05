import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FleetUnit } from '../../types';
import { Plane, Anchor, Shield, Gauge, Users, Compass, Eye, CheckCircle2 } from 'lucide-react';

export const FleetShowcase: React.FC = () => {
  const { fleet } = useApp();
  const [filter, setFilter] = useState<'all' | 'aereo' | 'naval'>('all');
  const [selectedUnit, setSelectedUnit] = useState<FleetUnit | null>(null);

  const filteredFleet = fleet.filter((item) => {
    if (filter === 'all') return true;
    return item.category === filter;
  });

  return (
    <section id="flota" className="py-20 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold tracking-widest uppercase mb-3">
              Poder Operativo y Recursos
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-white">
              Flota Aérea y Naval del SENAN
            </h2>
            <p className="mt-2 text-slate-400 text-sm max-w-xl">
              Nuestros medios estratégicos equipados con tecnología de vanguardia para la exploración marítima, interdicción y misiones de salvamento en todo el territorio panameño.
            </p>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 mt-6 md:mt-0 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition ${
                filter === 'all'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Todas las Unidades
            </button>
            <button
              onClick={() => setFilter('aereo')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                filter === 'aereo'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Plane size={14} />
              <span>Flota Aérea</span>
            </button>
            <button
              onClick={() => setFilter('naval')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                filter === 'naval'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Anchor size={14} />
              <span>Flota Naval</span>
            </button>
          </div>
        </div>

        {/* Fleet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFleet.map((unit) => (
            <div
              key={unit.id}
              className="bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-2xl overflow-hidden shadow-lg transition duration-300 flex flex-col group"
            >
              {/* Image banner */}
              <div className="relative h-52 overflow-hidden bg-slate-950">
                <img
                  src={unit.imageUrl}
                  alt={unit.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/30" />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md text-amber-400 border border-amber-500/40 text-xs font-bold font-mono tracking-wider">
                    {unit.code}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      unit.status === 'OPERATIVO'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : unit.status === 'EN_MISION'
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 animate-pulse'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    }`}
                  >
                    {unit.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="absolute top-3 right-3">
                  <span className="p-1.5 rounded-full bg-slate-900/80 backdrop-blur-md text-slate-300 flex items-center justify-center">
                    {unit.category === 'aereo' ? <Plane size={15} /> : <Anchor size={15} />}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-lg font-bold text-white font-serif drop-shadow">
                    {unit.name}
                  </h3>
                  <p className="text-xs text-amber-300/90 font-medium">
                    {unit.type}
                  </p>
                </div>
              </div>

              {/* Info Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-slate-300 line-clamp-2">
                  {unit.description}
                </p>

                {/* Quick Specs */}
                <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <Gauge size={13} className="text-amber-400 shrink-0" />
                    <span className="truncate">{unit.speed}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <Compass size={13} className="text-blue-400 shrink-0" />
                    <span className="truncate">{unit.range}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-300 col-span-2">
                    <Users size={13} className="text-emerald-400 shrink-0" />
                    <span className="truncate">{unit.crew}</span>
                  </div>
                </div>

                {/* Equipment Tags */}
                <div className="flex flex-wrap gap-1">
                  {unit.equipment.slice(0, 2).map((eq, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 truncate max-w-full"
                    >
                      {eq}
                    </span>
                  ))}
                  {unit.equipment.length > 2 && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                      +{unit.equipment.length - 2}
                    </span>
                  )}
                </div>

                {/* Detail action */}
                <button
                  onClick={() => setSelectedUnit(unit)}
                  className="w-full py-2 px-3 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 rounded-lg flex items-center justify-center gap-1.5 transition border border-slate-700 hover:border-slate-600"
                >
                  <Eye size={13} />
                  <span>Ver Ficha Técnica Completa</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Full Specification */}
        {selectedUnit && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
            <div className="bg-slate-900 border border-amber-500/50 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative text-white">
              <div className="relative h-64 bg-slate-950">
                <img
                  src={selectedUnit.imageUrl}
                  alt={selectedUnit.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/40" />

                <button
                  onClick={() => setSelectedUnit(null)}
                  className="absolute top-4 right-4 p-2 bg-slate-900/80 hover:bg-slate-800 rounded-full text-slate-300 hover:text-white"
                >
                  ✕
                </button>

                <div className="absolute bottom-4 left-6">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded bg-amber-500 text-slate-950 font-bold font-mono text-xs">
                      {selectedUnit.code}
                    </span>
                    <span className="text-xs uppercase tracking-wider text-slate-300 font-medium">
                      {selectedUnit.category === 'aereo' ? 'Comando Aéreo' : 'Comando Naval'}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold font-serif">{selectedUnit.name}</h3>
                  <p className="text-sm text-amber-300">{selectedUnit.type}</p>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <p className="text-sm text-slate-300 leading-relaxed">
                  {selectedUnit.description}
                </p>

                {/* Specs Table */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div>
                    <span className="text-slate-400 block mb-0.5">Velocidad Máxima:</span>
                    <span className="font-semibold text-white">{selectedUnit.speed}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Autonomía / Alcance:</span>
                    <span className="font-semibold text-white">{selectedUnit.range}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Dotación:</span>
                    <span className="font-semibold text-white">{selectedUnit.crew}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Base Asignada:</span>
                    <span className="font-semibold text-amber-300">{selectedUnit.base}</span>
                  </div>
                </div>

                {/* Equipment & Sensors */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
                    <Shield size={14} className="text-amber-400" />
                    <span>Equipamiento de Misión y Sistemas de a Bordo</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {selectedUnit.equipment.map((eq, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-slate-800/60 border border-slate-800 text-slate-200">
                        <CheckCircle2 size={13} className="text-blue-400 shrink-0" />
                        <span>{eq}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => setSelectedUnit(null)}
                    className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition"
                  >
                    Cerrar Ficha
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
