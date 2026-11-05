import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, ShieldAlert, PhoneCall, AlertTriangle, CheckCircle2, Send, MapPin } from 'lucide-react';

interface EmergencyReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyReportModal: React.FC<EmergencyReportModalProps> = ({ isOpen, onClose }) => {
  const { submitEmergencyReport, isEmergencyReportFormEnabled } = useApp();

  const [type, setType] = useState<'Emergencia Marítima / SAR' | 'Actividad Sospechosa' | 'Contaminación Marina' | 'Embarcación a la Deriva'>('Emergencia Marítima / SAR');
  const [location, setLocation] = useState('');
  const [coordinates, setCoordinates] = useState('');
  const [description, setDescription] = useState('');
  const [reporterName, setReporterName] = useState('');
  const [reporterPhone, setReporterPhone] = useState('');
  const [priority, setPriority] = useState<'CRITICA' | 'ALTA' | 'MEDIA'>('ALTA');
  const [submittedFolio, setSubmittedFolio] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const folio = submitEmergencyReport({
      type,
      location,
      coordinates: coordinates || undefined,
      description,
      reporterName: reporterName || 'Anónimo',
      reporterPhone: reporterPhone || 'No especificado',
      priority,
    });
    setSubmittedFolio(folio);
  };

  const handleClose = () => {
    setSubmittedFolio(null);
    setLocation('');
    setDescription('');
    setCoordinates('');
    setReporterName('');
    setReporterPhone('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 border border-red-500/50 rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl relative text-white">
        {/* Header Strip */}
        <div className="h-2 bg-gradient-to-r from-red-600 via-amber-500 to-red-600" />

        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg transition"
          aria-label="Cerrar"
        >
          <X size={20} />
        </button>

        <div className="p-6 sm:p-8">
          {!isEmergencyReportFormEnabled ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-red-600/20 text-red-400 border border-red-500/40 flex items-center justify-center mx-auto">
                <PhoneCall size={32} />
              </div>
              <h3 className="text-2xl font-bold font-serif text-white">
                Recepción Web en Mantenimiento Preventivo
              </h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                Por disposición técnica del Centro de Operaciones Aeronavales (COAN), el formulario web se encuentra en pausa. Todas las emergencias marítimas deben comunicarse directamente por voz.
              </p>

              <div className="p-4 bg-slate-950 border border-red-500/50 rounded-2xl max-w-sm mx-auto text-center space-y-1 my-3">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Línea Directa de Urgencia 24/7</span>
                <div className="text-3xl font-mono font-black text-red-400">108</div>
                <span className="text-[11px] text-amber-300">Canal 16 VHF Marino (156.800 MHz)</span>
              </div>

              <button
                onClick={handleClose}
                className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white rounded-xl transition"
              >
                Entendido
              </button>
            </div>
          ) : submittedFolio ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-red-600/20 text-red-400 border border-red-500/40 flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="text-2xl font-bold font-serif text-white">
                Reporte Transmitido al COAN
              </h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                Su aviso de auxilio o denuncia ha ingresado en tiempo real a la central de despacho del Centro de Operaciones Aeronavales.
              </p>

              <div className="p-4 bg-slate-950 border border-red-500/40 rounded-xl inline-block text-left my-2">
                <div className="text-[11px] text-slate-400">Folio de Atención COAN:</div>
                <div className="text-xl font-mono font-bold text-red-400">{submittedFolio}</div>
                <div className="text-[11px] text-amber-400 mt-1">Prioridad: {priority}</div>
              </div>

              <div className="p-3 bg-slate-950/70 rounded-xl text-xs text-slate-400 max-w-md mx-auto">
                <p>
                  Si la situación compromete vidas en peligro inmediato, recuerde que también puede llamar en directo y sin costo al <span className="font-bold text-red-400">108</span> desde cualquier teléfono móvil o por radio marina en el <span className="font-bold text-amber-400">Canal 16 VHF</span>.
                </p>
              </div>

              <button
                onClick={handleClose}
                className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white rounded-xl transition"
              >
                Cerrar Ventana
              </button>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-red-600/20 border border-red-500/40 rounded-xl text-red-400">
                  <ShieldAlert size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-serif text-white">
                    Reporte Ciudadano & Auxilio COAN 108
                  </h3>
                  <p className="text-xs text-slate-400">
                    Emergencias en el mar, embarcaciones en peligro y denuncias confidenciales
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">
                      Tipo de Reporte *
                    </label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value as any)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-red-400"
                    >
                      <option>Emergencia Marítima / SAR</option>
                      <option>Actividad Sospechosa</option>
                      <option>Contaminación Marina</option>
                      <option>Embarcación a la Deriva</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">
                      Nivel de Prioridad *
                    </label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value as any)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-red-400"
                    >
                      <option value="CRITICA">CRÍTICA (Vidas en Riesgo Inminente)</option>
                      <option value="ALTA">ALTA (Embarcación con Fallas / Averías)</option>
                      <option value="MEDIA">MEDIA (Prevención / Denuncia)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">
                      Ubicación / Sector Aproximado *
                    </label>
                    <input
                      type="text"
                      required
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="ej. A 3 millas de Isla Taboga, Bahía de Panamá"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-red-400"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">
                      Coordenadas GPS (Si se conocen)
                    </label>
                    <input
                      type="text"
                      value={coordinates}
                      onChange={(e) => setCoordinates(e.target.value)}
                      placeholder="ej. 08° 47' N, 79° 32' W"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-red-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Descripción del Suceso / Detalles de la Nave / Personas a Bordo *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describa la situación: color de la nave, número de personas, condición del clima, si hay personas heridas..."
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-red-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">
                      Nombre del Informante (Opcional)
                    </label>
                    <input
                      type="text"
                      value={reporterName}
                      onChange={(e) => setReporterName(e.target.value)}
                      placeholder="Dejar en blanco para denuncia anónima"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-red-400"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">
                      Teléfono de Contacto
                    </label>
                    <input
                      type="tel"
                      value={reporterPhone}
                      onChange={(e) => setReporterPhone(e.target.value)}
                      placeholder="+507 6000-0000"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-red-400"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-red-700 hover:bg-red-600 text-white font-bold rounded-xl transition shadow-lg flex items-center justify-center gap-2 text-sm tracking-wide"
                  >
                    <Send size={15} />
                    <span>Enviar Reporte Inmediato al Centro de Despacho</span>
                  </button>
                  <p className="text-[10px] text-slate-500 text-center mt-2">
                    Las llamadas y reportes falsos a los números de emergencia están sancionados por las leyes de la República de Panamá.
                  </p>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
