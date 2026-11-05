import React from 'react';
import { useApp } from '../../context/AppContext';
import { SENAN_LOGO } from '../../data/mockData';
import { Shield, Phone, Mail, MapPin, Lock, ExternalLink } from 'lucide-react';

export const PublicFooter: React.FC = () => {
  const { openLoginModal, siteContent } = useApp();

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      {/* Upper Footer: Bases and Contact */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1 & 2: Institutional Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={SENAN_LOGO}
                alt="Escudo SENAN"
                className="w-14 h-16 object-contain"
              />
              <div>
                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest block">
                  República de Panamá
                </span>
                <span className="text-base font-bold text-white font-serif block">
                  SERVICIO NACIONAL AERONAVAL
                </span>
                <span className="text-xs text-amber-300 font-semibold italic">
                  {siteContent.emergencyMotto || '"Dios, Patria y Honor"'}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed pr-4">
              Institución armada de seguridad pública y defensa civil responsable del resguardo y vigilancia ininterrumpida de las áreas costeras, aguas jurisdiccionales y el espacio aéreo soberano de Panamá.
            </p>

            <div className="space-y-1 text-slate-300 text-xs">
              <div className="flex items-center gap-2">
                <MapPin size={13} className="text-amber-400 shrink-0" />
                <span>{siteContent.footerHeadquarters}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={13} className="text-red-400 shrink-0" />
                <span>{siteContent.footerPhone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={13} className="text-blue-400 shrink-0" />
                <span>{siteContent.footerEmail}</span>
              </div>
            </div>
          </div>

          {/* Col 3: Principales Bases Aeronavales */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-serif mb-4">
              Bases Aeronavales
            </h4>
            <ul className="space-y-2 text-xs">
              {(siteContent.footerBases || []).map((base, idx) => (
                <li key={idx} className="hover:text-amber-300 transition">
                  {base}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Enlaces Institucionales */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-serif mb-4">
              Enlaces Oficiales
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#inicio" className="hover:text-amber-300 transition">Inicio Institucional</a>
              </li>
              <li>
                <a href="#comandos" className="hover:text-amber-300 transition">Comando Aéreo y Naval</a>
              </li>
              <li>
                <a href="#flota" className="hover:text-amber-300 transition">Aeronaves y Patrulleras</a>
              </li>
              <li>
                <a href="#operaciones" className="hover:text-amber-300 transition">Protocolo de Rescate SAR</a>
              </li>
              <li>
                <a href="#reclutamiento" className="hover:text-amber-300 transition">Admisión Escuela 2027</a>
              </li>
              <li>
                <a href="#noticias" className="hover:text-amber-300 transition">Sala de Prensa y Comunicados</a>
              </li>
            </ul>
          </div>

          {/* Col 5: Transparencia & Acceso Restringido */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-serif mb-4">
              Gobernanza
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <span className="text-slate-400">Ley Orgánica del SENAN</span>
              </li>
              <li>
                <span className="text-slate-400">Rendición de Cuentas</span>
              </li>
              <li>
                <span className="text-slate-400">Ministerio de Seguridad Pública</span>
              </li>
              <li>
                <span className="text-slate-400">Canal de Denuncia Antidroga</span>
              </li>
            </ul>

            {/* Discrete portal access in footer */}
            <div className="mt-6 pt-4 border-t border-slate-800">
              <span className="text-[10px] uppercase tracking-wider text-slate-500 block mb-1.5 font-bold">
                Personal Aeronaval
              </span>
              <button
                onClick={() => openLoginModal('officer')}
                className="w-full py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/40 text-[11px] text-slate-300 hover:text-amber-300 flex items-center justify-center gap-2 transition"
              >
                <Lock size={12} className="text-amber-400" />
                <span>Portal SIS-AERONAVAL</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal bar */}
      <div className="bg-black/90 py-4 px-4 border-t border-slate-900">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Servicio Nacional Aeronaval (SENAN). República de Panamá. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-4">
            <span>Privacidad y Términos</span>
            <span>·</span>
            <span>Seguridad Nacional</span>
            <span>·</span>
            <button
              onClick={() => openLoginModal('admin')}
              className="text-slate-500 hover:text-slate-400 underline decoration-dotted text-[10px]"
            >
              Acceso a Red Privada
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
