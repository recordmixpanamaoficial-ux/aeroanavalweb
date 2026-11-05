import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GraduationCap, CheckCircle2, UserCheck, Send, Award, FileCheck, Shield } from 'lucide-react';

export const RecruitmentSection: React.FC = () => {
  const { submitRecruitment, isRecruitmentFormEnabled } = useApp();

  const [fullName, setFullName] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [age, setAge] = useState<number>(20);
  const [branchInterest, setBranchInterest] = useState('Piloto Aeronaval');
  const [province, setProvince] = useState('Panamá Centro');
  const [educationLevel, setEducationLevel] = useState('Bachiller en Ciencias');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [submittedVoucher, setSubmittedVoucher] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitRecruitment({
      fullName,
      nationalId,
      age: Number(age),
      branchInterest,
      province,
      educationLevel,
      phone,
      email,
    });
    setSubmittedVoucher(`SENAN-ADM-2027-${Math.floor(1000 + Math.random() * 9000)}`);
  };

  const handleReset = () => {
    setFullName('');
    setNationalId('');
    setPhone('');
    setEmail('');
    setSubmittedVoucher(null);
  };

  return (
    <section id="reclutamiento" className="py-20 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-widest uppercase mb-3">
            <GraduationCap size={14} />
            <span>Dirección de Docencia y Formación Aeronaval</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-white">
            Convocatoria de Admisión y Reclutamiento 2027
          </h2>
          <p className="mt-4 text-base text-slate-300">
            Forja tu destino con disciplina y honor. Conviértete en Oficial de la República de Panamá o Agente de Infantería del Servicio Nacional Aeronaval.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Requirements and Career Paths */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-lg font-bold font-serif text-amber-400 flex items-center gap-2">
                <FileCheck size={20} />
                <span>Requisitos de Ingreso</span>
              </h3>
              <ul className="text-xs text-slate-300 space-y-2.5">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span>Nacionalidad panameña por nacimiento.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span>Edad comprendida entre 18 y 23 años al momento del ingreso.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span>Título de Educación Media (Bachillerato reconocido por MEDUCA).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span>Estatura mínima: Caballeros 1.65 m / Damas 1.60 m.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span>Estado civil soltero(a) y sin personas bajo su dependencia.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span>No tener antecedentes penales ni tatuajes visibles en uniforme.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span>Aprobar exámenes médicos, físicos, psicológicos y académicos.</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-base font-bold font-serif text-white flex items-center gap-2">
                <Award size={18} className="text-amber-400" />
                <span>Beneficios del Personal Aeronaval</span>
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                  <span className="font-semibold text-white block">Beca de Estudios</span>
                  Alojamiento, dotación y estipendio completo.
                </div>
                <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                  <span className="font-semibold text-white block">Estabilidad Laboral</span>
                  Régimen de carrera militar y ascensos.
                </div>
                <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                  <span className="font-semibold text-white block">Especializaciones</span>
                  Cursos en academias de EE.UU., Chile, Colombia y Europa.
                </div>
                <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                  <span className="font-semibold text-white block">Seguro Social</span>
                  Cobertura médica integral para el servidor.
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Pre-registration Form or Disabled Notice */}
          <div className="lg:col-span-7 bg-slate-950 p-8 rounded-2xl border border-amber-500/30 shadow-2xl">
            {!isRecruitmentFormEnabled ? (
              <div className="text-center py-12 space-y-5">
                <div className="w-18 h-18 rounded-2xl bg-amber-500/10 border-2 border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto shadow-inner p-4">
                  <Shield size={40} />
                </div>

                <div className="space-y-2">
                  <span className="px-3 py-1 rounded-full bg-red-950 text-red-300 border border-red-500/30 text-[10px] font-bold uppercase tracking-wider">
                    Convocatoria en Pausa por Comandancia
                  </span>
                  <h3 className="text-2xl font-bold font-serif text-white">
                    Formulario de Pre-Inscripción Cerrado Temporalmente
                  </h3>
                  <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                    Por orden de la Comandancia General del SENAN, el formulario web de postulación de aspirantes ha sido deshabilitado temporalmente para fase de revisión interna.
                  </p>
                </div>

                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl max-w-md mx-auto text-left text-xs text-slate-300 space-y-2">
                  <div className="font-bold text-amber-400 flex items-center gap-1.5 text-[11px] uppercase">
                    <CheckCircle2 size={14} />
                    <span>¿Cuándo se reabrirá la pre-inscripción?</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Las fechas de reapertura serán anunciadas en los comunicados de prensa institucionales de este portal y en las redes oficiales del SENAN.
                  </p>
                  <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-500">
                    Atención al postulante: Dirección General de Docencia, Base Cocolí · Teléfono: 527-9000
                  </div>
                </div>
              </div>
            ) : submittedVoucher ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-2xl font-bold font-serif text-white">
                  ¡Pre-Inscripción Registrada con Éxito!
                </h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  Estimado(a) <span className="font-semibold text-white">{fullName}</span>, su formulario ha sido recibido por el Departamento de Reclutamiento y Selección del SENAN.
                </p>

                <div className="p-4 bg-slate-900 border border-amber-500/40 rounded-xl inline-block text-left my-2">
                  <div className="text-[11px] text-slate-400">Comprobante de Solicitud:</div>
                  <div className="text-lg font-mono font-bold text-amber-400">{submittedVoucher}</div>
                  <div className="text-[11px] text-slate-400 mt-1">Especialidad: {branchInterest}</div>
                </div>

                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Le contactaremos a su correo ({email}) o teléfono ({phone}) con las instrucciones para la entrega física de documentos en la Base Aeronaval más cercana.
                </p>

                <div className="pt-4">
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white rounded-xl transition"
                  >
                    Registrar Otra Postulación
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <h3 className="text-xl font-bold font-serif text-white">
                    Formulario Oficial de Pre-Inscripción
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Complete los siguientes datos personales. Esta información es confidencial y para uso exclusivo del proceso de selección.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">
                        Nombre Completo (como en Cédula) *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="ej. Juan Carlos Pérez González"
                        className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-medium mb-1">
                        Cédula de Identidad Personal (CIP) *
                      </label>
                      <input
                        type="text"
                        required
                        value={nationalId}
                        onChange={(e) => setNationalId(e.target.value)}
                        placeholder="ej. 8-945-1200"
                        className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">
                        Edad *
                      </label>
                      <input
                        type="number"
                        min={18}
                        max={26}
                        required
                        value={age}
                        onChange={(e) => setAge(Number(e.target.value))}
                        className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-medium mb-1">
                        Provincia de Residencia *
                      </label>
                      <select
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                        className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400"
                      >
                        <option>Panamá Centro</option>
                        <option>Panamá Oeste</option>
                        <option>Colón</option>
                        <option>Chiriquí</option>
                        <option>Veraguas</option>
                        <option>Coclé</option>
                        <option>Herrera</option>
                        <option>Los Santos</option>
                        <option>Bocas del Toro</option>
                        <option>Darién</option>
                        <option>Comarcas Indígenas</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-300 font-medium mb-1">
                        Especialidad de Interés *
                      </label>
                      <select
                        value={branchInterest}
                        onChange={(e) => setBranchInterest(e.target.value)}
                        className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400"
                      >
                        <option>Piloto Aeronaval</option>
                        <option>Oficial de Cubierta / Naval</option>
                        <option>Agente de Infantería Aeronaval</option>
                        <option>Técnico de Mantenimiento Aeronáutico</option>
                        <option>Comunicaciones & C2</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">
                        Nivel de Estudios *
                      </label>
                      <input
                        type="text"
                        required
                        value={educationLevel}
                        onChange={(e) => setEducationLevel(e.target.value)}
                        placeholder="ej. Bachiller en Ciencias / Marítimo"
                        className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-medium mb-1">
                        Teléfono / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+507 6000-0000"
                        className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-medium mb-1">
                        Correo Electrónico *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="usuario@correo.com"
                        className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition shadow-lg flex items-center justify-center gap-2 text-sm tracking-wide"
                    >
                      <Send size={15} />
                      <span>Enviar Formulario de Pre-Inscripción 2027</span>
                    </button>
                    <p className="text-[10px] text-slate-500 text-center mt-2">
                      Al enviar, certifica que los datos provistos son veraces bajo gravedad de juramento institucional.
                    </p>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
