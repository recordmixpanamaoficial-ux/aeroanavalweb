import express from 'express';
import { createServer } from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Persistent state storage file
const DATA_FILE = path.join(__dirname, 'senan-state.json');

// Default initial state
const DEFAULT_STATE = {
  users: [
    {
      id: 'usr-admin-ibrain',
      name: 'Ibrain',
      username: 'ibrain2026',
      password: '262728',
      role: 'admin',
      rank: 'Comisionado Mayor (Director General)',
      militaryBranch: 'Naval',
      cip: '8-800-2628',
      badgeNumber: 'SENAN-0001',
      assignedBase: 'Base Aeronaval Cocolí (Comando General)',
      bloodType: 'O+',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
      phone: '+507 527-9000',
      email: 'ibrain@aeronaval.gob.pa',
      serviceYears: 25,
      status: 'Activo',
      medals: [
        'Cruz de Honor Aeronaval al Mérito Superior',
        'Distintivo de Mando Máximo Presidencial',
        'Medalla de Servicios Distinguidos en Operaciones SAR',
        'Encomio por Seguridad Nacional en Costas y Cielos',
      ],
    },
  ],
  operations: [],
  news: [],
  guardDuties: [],
  missionLogs: [],
  leaveRequests: [],
  emergencyReports: [],
  recruitmentList: [],
  directors: [
    {
      id: 'dir-ibrain',
      name: 'Ibrain',
      rank: 'Comisionado Mayor',
      position: 'Director General del Servicio Nacional Aeronaval',
      department: 'Dirección General y Comandancia Superior',
      photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80',
      bio: 'Máxima autoridad del SENAN con más de 25 años de intachable trayectoria militar y naval. Egresado de altas academias de comando y estado mayor, lidera la modernización operativa y tecnológica de las fuerzas aeronavales de Panamá.',
      order: 1,
      phone: '+507 527-9000',
      email: 'despacho.superior@aeronaval.gob.pa',
    },
    {
      id: 'dir-arrocha',
      name: 'Gabriel Arrocha',
      rank: 'Subcomisionado Aeronaval',
      position: 'Subdirector General del SENAN',
      department: 'Subdirección General',
      photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=80',
      bio: 'Especialista en administración de fuerzas armadas, logística estratégica y articulación de cooperación interinstitucional con organismos de seguridad marítima internacional.',
      order: 2,
      phone: '+507 527-9001',
      email: 'garrocha@aeronaval.gob.pa',
    },
    {
      id: 'dir-pimentel',
      name: 'Jorge Pimentel',
      rank: 'Mayor de Aviación Naval',
      position: 'Director Nacional de Operaciones Aéreas',
      department: 'Comando Aéreo',
      photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80',
      bio: 'Piloto instructor de aeronaves de patrullaje marítimo y helicópteros SAR. Responsable de la planificación de evacuaciones aeromédicas y cobertura aérea en ambos litorales.',
      order: 3,
      phone: '+507 527-9200',
      email: 'operaciones.aereas@aeronaval.gob.pa',
    },
    {
      id: 'dir-degracia',
      name: 'Luis De Gracia',
      rank: 'Capitán de Fragata',
      position: 'Director Nacional de Operaciones Navales',
      department: 'Comando Naval',
      photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=80',
      bio: 'Comandante de buques de patrullaje oceánico y guardacostas con amplia experiencia en rescate de náufragos en altamar e interdicción contra el crimen organizado.',
      order: 4,
      phone: '+507 527-9300',
      email: 'operaciones.navales@aeronaval.gob.pa',
    },
    {
      id: 'dir-mendez',
      name: 'Ricardo Méndez',
      rank: 'Mayor de Infantería',
      position: 'Director de Infantería Aeronaval',
      department: 'Infantería Aeronaval y Fuerzas Especiales',
      photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=80',
      bio: 'Comandante de unidades tácticas anfibias BVT y fuerzas de asalto marítimo, especialista en custodia de puertos de trasbordo y seguridad insular.',
      order: 5,
      phone: '+507 527-9400',
      email: 'infanteria@aeronaval.gob.pa',
    },
    {
      id: 'dir-valdes',
      name: 'Eric Valdés',
      rank: 'Capitán de Corbeta',
      position: 'Director de Docencia e Instrucción Aeronaval',
      department: 'Escuela de Oficiales y Agentes',
      photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=80',
      bio: 'Lidera la formación académica y doctrinaria de los futuros oficiales y clases de la República de Panamá, velando por la disciplina, honor y valores cívicos.',
      order: 6,
      phone: '+507 527-9500',
      email: 'docencia@aeronaval.gob.pa',
    },
  ],
  webhookUrl: '',
  isRecruitmentFormEnabled: true,
  isEmergencyReportFormEnabled: true,
  fleet: [
    {
      id: 'fl-1',
      code: 'BPO-403',
      name: 'Presidente Guillermo Endara',
      category: 'naval',
      type: 'Patrullera Oceánica (OPV - 900T)',
      status: 'OPERATIVO',
      base: 'Base Vasco Núñez de Balboa',
      crew: '32 Oficiales y Tripulantes',
      speed: '23 Nudos (42 km/h)',
      range: '4,000 Millas Náuticas (Autonomía 25 días)',
      description: 'Buque patrullero insignia para vigilancia de Zona Económica Exclusiva, interdicción oceánica y operaciones SAR combinadas.',
      equipment: ['Radar de Exploración Terma', 'Sistema FLIR Infrarrojo', 'Embarcación Rápida RHIB 11m Integrada', 'Plataforma para Helicóptero Liviano'],
      imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 'fl-2',
      code: 'AN-137',
      name: 'Halcón Bell 412EP',
      category: 'aereo',
      type: 'Helicóptero Utilitario y SAR Marítimo',
      status: 'EN_MISION',
      base: 'Base Aérea Noel Rodríguez (Howard)',
      crew: '2 Pilotos + 2 Rescatistas / Médicos',
      speed: '140 Nudos (260 km/h)',
      range: '380 Millas Náuticas',
      description: 'Aeronave de ala rotatoria equipada para operaciones de salvamento nocturno, evacuación aeromédica y grúa de rescate sobre mar abierto.',
      equipment: ['Grúa de Rescate Externa Goodrich 600 lbs', 'Reflector Táctico Nightsun 30M CP', 'Equipo de Flotación de Emergencia', 'Camilla de Cuidados Críticos'],
      imageUrl: 'https://images.unsplash.com/photo-1519074069444-1ba4ea16e6f9?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 'fl-3',
      code: 'BPC-3801',
      name: 'General Omar Torrijos',
      category: 'naval',
      type: 'Patrullera Costera Damen Stan Patrol 2606',
      status: 'OPERATIVO',
      base: 'Base Aeronaval Cristóbal Colón (Caribe)',
      crew: '14 Marinos y Especialistas',
      speed: '30 Nudos',
      range: '1,500 Millas Náuticas',
      description: 'Unidad de reacción rápida para patrullaje costero, control de aguas jurisdiccionales y persecución de embarcaciones ilícitas.',
      equipment: ['Sistema de Radar Furuno Doble Banda', 'Comunicaciones Tácticas Satelitales', 'Lanza cabos de salvamento', 'Montajes de Proa'],
      imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 'fl-4',
      code: 'AN-260',
      name: 'Twin Otter DHC-6 400',
      category: 'aereo',
      type: 'Aeronave STOL Transporte Táctico y SAR',
      status: 'OPERATIVO',
      base: 'Base Aérea Noel Rodríguez (Howard)',
      crew: '2 Pilotos + 18 Pasajeros / Carga',
      speed: '180 Nudos',
      range: '775 Millas Náuticas',
      description: 'Aeronave robusta de despegue y aterrizaje corto, vital para abastecer puestos fronterizos y trasladar brigadas médicas a islas y selva.',
      equipment: ['Radar Meteorológico Honeywell', 'Puerta Lateral Amplia para Lanzamiento de Carga', 'Configuración Rápida Ambulancia Aérea'],
      imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 'fl-5',
      code: 'BVT-109',
      name: 'Centinela Táctico 109',
      category: 'naval',
      type: 'Bote de Vigilancia Táctica (Interceptor Rápido)',
      status: 'OPERATIVO',
      base: 'Base Mayor Salvador Córdoba (Pacífico)',
      crew: '4 Infantes Aeronavales',
      speed: '50+ Nudos',
      range: '300 Millas Náuticas',
      description: 'Lancha interceptora de alta velocidad con 3 motores fuera de borda para captura e interceptación marítima en bajíos y esteros.',
      equipment: ['Visores Nocturnos Gen 3+', 'GPS Náutico Diferencial', 'Blindaje Táctico Perimetral', 'Sistema de Altavoces de Disuasión'],
      imageUrl: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d17?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 'fl-6',
      code: 'AN-250',
      name: 'King Air 350ER Guardián',
      category: 'aereo',
      type: 'Vigilancia y Exploración Marítima (MPA)',
      status: 'MANTENIMIENTO',
      base: 'Base Aeronaval Cocolí',
      crew: '2 Pilotos + 3 Operadores de Sistemas',
      speed: '280 Nudos',
      range: '2,200 Millas Náuticas (Autonomía 8.5 Horas)',
      description: 'Plataforma estratégica equipada con radar de barrido marítimo 360° para detección de embarcaciones no autorizadas en ambos océanos.',
      equipment: ['Radar Telephonics RDR-1700B', 'Torreta Electro-óptica MX-15 FLIR', 'Enlace de Datos Táctico C2'],
      imageUrl: 'https://images.unsplash.com/photo-1517976487502-5f653a968641?w=800&auto=format&fit=crop&q=80',
    },
  ],
  siteContent: {
    heroBadge: 'Servicio de Protección Integral de la República de Panamá',
    heroTitleLine1: 'Guardianes de',
    heroTitleHighlight: 'Nuestros Mares, Cielos y Costas',
    heroDescription: 'El Servicio Nacional Aeronaval (SENAN) vela permanentemente por la integridad territorial, la soberanía de las aguas y el espacio aéreo soberano de Panamá, ejecutando misiones de búsqueda y rescate (SAR), evacuaciones aeromédicas y asistencia humanitaria en beneficio de toda la ciudadanía.',
    heroBgImageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1600&auto=format&fit=crop&q=80',
    heroCommitment1: 'Patrullaje 24/7 en Dos Océanos',
    heroCommitment2: 'Rescate Aéreo y Marítimo SAR',
    heroCommitment3: 'Apoyo Humanitario a Zonas Aisladas',
    stat1Value: '3,000+ NM',
    stat1Label: 'Litoral y ZEE Vigilada',
    stat2Value: '1,450+',
    stat2Label: 'Horas de Vuelo SAR',
    stat3Value: '184',
    stat3Label: 'Vidas Salvadas en el Mar',
    stat4Value: '45.8 Ton',
    stat4Label: 'Drogas Incautadas (2026)',
    doctrineHeaderBadge: 'Estructura y Doctrina Operacional',
    doctrineHeaderTitle: 'Nuestros Comandos y Pilares Institucionales',
    doctrineHeaderSubtitle: 'Una fuerza profesional, moderna y comprometida con la defensa de la patria y el auxilio incondicional a la población panameña.',
    airCommandTitle: 'Comando Aéreo',
    airCommandDescription: 'Custodia permanente del espacio aéreo nacional, patrullaje marítimo de reconocimiento mediante radares FLIR, evacuaciones aeromédicas urgentes (MEDEVAC) y apoyo aéreo cercano.',
    airCommandBullets: [
      'Escuadrón de Helicópteros SAR (Bell 412)',
      'Escuadrón de Transporte Táctico (Twin Otter DHC-6)',
      'Vigilancia de Patrullaje Marítimo (King Air 350ER)',
    ],
    navalCommandTitle: 'Comando Naval',
    navalCommandDescription: 'Seguridad en aguas jurisdiccionales y Zona Económica Exclusiva, interdicción marítima de lanchas rápidas y custodia de canales de acceso al Canal de Panamá.',
    navalCommandBullets: [
      'Patrulleras Oceánicas (OPV Damen)',
      'Patrulleras Costeras (BPC)',
      'Botes Interceptores de Respuesta Inmediata',
    ],
    infantryCommandTitle: 'Infantería Aeronaval',
    infantryCommandDescription: 'Fuerzas especiales anfibias de desembarco táctico, botes BVT y seguridad perimetral de instalaciones portuarias y bases insulares.',
    infantryCommandBullets: [
      'Unidad de Botes de Vigilancia Táctica (BVT)',
      'Comandos de Operaciones Especiales Aeronavales',
      'Brigada de Ayuda Humanitaria y Desastres',
    ],
    missionTitle: 'Soberanía, Seguridad y Protección Ciudadana',
    missionDescription: 'Ejercer la vigilancia, control y seguridad en los espacios marítimos, aéreos y portuarios de la República de Panamá, velar por el cumplimiento de las leyes nacionales y los convenios internacionales, salvaguardar la vida humana en el mar y el espacio aéreo, y contribuir decididamente al desarrollo y la paz social de la nación.',
    visionTitle: 'Excelencia, Honor y Vocación de Servicio',
    visionDescription: 'Consolidarnos como una institución aeronaval de referencia regional, altamente tecnificada, íntegra y respetada por la ciudadanía, sustentada en los pilares inquebrantables de Dios, fuente de fe y fortaleza moral; Patria, entrega suprema al bienestar del pueblo panameño; y Honor, lealtad y rectitud en cada misión encomendada.',
    emergencyBarPhone: '108',
    emergencyBarText: 'EMERGENCIAS MARÍTIMAS Y AÉREAS: LÍNEA 108 (COAN 24/7)',
    emergencyMotto: '"Dios, Patria y Honor"',
    footerHeadquarters: 'Cuartel General: Cocolí, Arraiján, República de Panamá',
    footerPhone: 'Centro de Operaciones Aeronavales (COAN): Línea 108',
    footerEmail: 'info@aeronaval.gob.pa · contacto@senan.gob.pa',
    footerBases: [
      'Base Aeronaval Cocolí (Comandancia General)',
      'Base Aérea Capitán Noel Rodríguez (Howard)',
      'Base Vasco Núñez de Balboa (Pacífico)',
      'Base Cristóbal Colón (Caribe)',
      'Base Mayor Salvador Córdoba (Darién)',
      'Base Aeronaval Rambala (Bocas del Toro)',
      'Base Aeronaval Mensabé (Los Santos)',
    ],
  },
  lastUpdated: Date.now(),
};

// Load or initialize state
let appState = { ...DEFAULT_STATE };
try {
  if (fs.existsSync(DATA_FILE)) {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    appState = { ...DEFAULT_STATE, ...JSON.parse(raw) };
  } else {
    fs.writeFileSync(DATA_FILE, JSON.stringify(appState, null, 2), 'utf-8');
  }
} catch (e) {
  console.error('Error reading state file, using default state:', e);
}

// Helper to save state
function saveState() {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(appState, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing state file:', err);
  }
}

// WebSocket Server for Multi-Device Real-Time Sync
const wss = new WebSocketServer({ noServer: true });

function broadcastSync(senderWs?: WebSocket) {
  const payload = JSON.stringify({
    type: 'SYNC_STATE',
    state: appState,
    timestamp: Date.now(),
  });

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(payload);
    }
  });
}

wss.on('connection', (ws: WebSocket) => {
  // Send current state immediately upon connection
  ws.send(
    JSON.stringify({
      type: 'INIT_STATE',
      state: appState,
      timestamp: Date.now(),
    })
  );

  ws.on('message', (message: string) => {
    try {
      const data = JSON.parse(message.toString());

      if (data.type === 'UPDATE_STATE') {
        // Merge state change
        appState = {
          ...appState,
          ...data.payload,
          lastUpdated: Date.now(),
        };
        // Ensure admin ibrain2026 remains present
        const hasAdmin = appState.users.some(
          (u: any) => u.username?.toLowerCase() === 'ibrain2026'
        );
        if (!hasAdmin) {
          appState.users = [DEFAULT_STATE.users[0], ...appState.users];
        }

        saveState();
        broadcastSync();
      } else if (data.type === 'REQUEST_SYNC') {
        ws.send(
          JSON.stringify({
            type: 'SYNC_STATE',
            state: appState,
            timestamp: Date.now(),
          })
        );
      }
    } catch (e) {
      console.error('Error parsing WS message:', e);
    }
  });
});

// Upgrade handling on the HTTP server for /ws
server.on('upgrade', (request, socket, head) => {
  const { pathname } = new URL(request.url || '', `http://${request.headers.host}`);
  if (pathname === '/ws') {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  }
});

// REST API Endpoints
app.get('/api/state', (_req, res) => {
  res.json({ success: true, state: appState });
});

app.post('/api/state', (req, res) => {
  const updates = req.body;
  appState = {
    ...appState,
    ...updates,
    lastUpdated: Date.now(),
  };
  saveState();
  broadcastSync();
  res.json({ success: true, state: appState });
});

// In development, hook Vite middleware; in production, serve built dist files
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  const portNum = Number(PORT) || 3000;
  server.listen(portNum, '0.0.0.0', () => {
    console.log(`SIS-AERONAVAL Real-Time Server running on http://0.0.0.0:${portNum}`);
  });
}

startServer();
