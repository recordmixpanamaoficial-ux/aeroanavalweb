export type UserRole = 'public' | 'officer' | 'admin';

export type MilitaryBranch = 'Aéreo' | 'Naval' | 'Infantería Aeronaval' | 'Telecomunicaciones & C2';

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  password?: string;
  role: 'admin' | 'officer';
  rank: string; // ej. Comisionado, Teniente de Navío, Sargento 2do, Agente
  militaryBranch: MilitaryBranch;
  cip: string; // Cédula de Identidad Personal (e.g., 8-842-192)
  badgeNumber: string; // Placa institucional (e.g., SENAN-4109)
  assignedBase: string; // ej. Base Aeronaval Cocolí
  bloodType: string; // ej. O+, A+
  avatarUrl: string;
  phone: string;
  email: string;
  serviceYears: number;
  status: 'Activo' | 'En Misión' | 'Guardia' | 'Permiso' | 'Comisión';
  medals: string[];
}

export type OperationType = 'SAR' | 'PATRULLAJE' | 'INTERDICCION' | 'EVAC_MEDICA' | 'AYUDA_HUMANITARIA';
export type OperationStatus = 'PLANIFICACION' | 'ACTIVA' | 'COMPLETADA' | 'ALERTA';

export interface OperationMission {
  id: string;
  code: string; // ej. OP-ALBATROS-XX
  title: string;
  type: OperationType;
  status: OperationStatus;
  zone: string;
  coordinates?: string;
  commander: string;
  assignedUnits: string[];
  personnelCount: number;
  startDate: string;
  completionDate?: string;
  briefing: string;
  results?: string;
  priority: 'ALTA' | 'MEDIA' | 'CRITICA';
}

export interface FleetUnit {
  id: string;
  code: string; // ej. AN-137, BPO-403
  name: string;
  category: 'aereo' | 'naval' | 'infanteria';
  type: string; // ej. Helicóptero Bell 412, Patrullera Oceánica
  status: 'OPERATIVO' | 'MANTENIMIENTO' | 'EN_MISION';
  base: string;
  crew: string;
  speed: string;
  range: string;
  description: string;
  equipment: string[];
  imageUrl: string;
}

export interface GuardDuty {
  id: string;
  officerId: string;
  officerName: string;
  rank: string;
  date: string;
  shift: '0000 - 0800' | '0800 - 1600' | '1600 - 2400' | 'Guardia 24H' | 'Turno Especial 12H';
  post: string;
  base: string;
  status: 'Programado' | 'En Turno' | 'Cumplido' | 'Relevado' | 'Con Novedad';
  supervisor: string;
  equipment?: string;
  notes?: string;
  militaryBranch?: string;
}

export interface MissionLog {
  id: string;
  officerId: string;
  officerName: string;
  rank: string;
  missionCode: string;
  unitCode: string;
  date: string;
  startTime: string;
  endTime: string;
  fuelRemainingLbs: number;
  engineHours: number;
  routeZone: string;
  weatherConditions: string;
  novedades: string;
  status: 'Registrado' | 'Aprobado por Comandancia';
  submittedAt: string;
}

export interface OfficerRequest {
  id: string;
  officerId: string;
  officerName: string;
  rank: string;
  cip: string;
  type: 'Permiso Especial' | 'Vacaciones Anuales' | 'Cambio de Guardia' | 'Dotación de Uniforme / Equipo' | 'Certificación de Servicios';
  justification: string;
  startDate: string;
  endDate: string;
  status: 'PENDIENTE' | 'APROBADO' | 'RECHAZADO';
  adminNotes?: string;
  createdAt: string;
}

export interface Directive {
  id: string;
  code: string;
  title: string;
  category: 'Orden General' | 'Directiva Operacional' | 'Seguridad de Bases' | 'Boletín de Comando';
  date: string;
  author: string;
  summary: string;
  confidentiality: 'RESERVADO' | 'CONFIDENCIAL' | 'USO OFICIAL';
}

export interface PublicNews {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: 'Operaciones' | 'Búsqueda y Rescate (SAR)' | 'Acción Social' | 'Institucional';
  date: string;
  imageUrl: string;
  author: string;
  featured?: boolean;
}

export interface CitizenEmergencyReport {
  id: string;
  folio: string;
  type: 'Emergencia Marítima / SAR' | 'Actividad Sospechosa' | 'Contaminación Marina' | 'Embarcación a la Deriva' | 'Otro';
  location: string;
  coordinates?: string;
  description: string;
  reporterName?: string;
  reporterPhone?: string;
  status: 'RECIBIDA' | 'EN_VERIFICACION' | 'DESPACHADA' | 'ARCHIVADA';
  priority: 'CRITICA' | 'ALTA' | 'MEDIA';
  timestamp: string;
}

export interface RecruitmentCandidate {
  id: string;
  fullName: string;
  nationalId: string; // Cédula
  age: number;
  branchInterest: string;
  province: string;
  educationLevel: string;
  phone: string;
  email: string;
  status: 'Recibido' | 'Revisión Documentos' | 'Citado a Pruebas' | 'Apto';
  appliedAt: string;
}

export interface DirectorProfile {
  id: string;
  name: string;
  rank: string;
  position: string;
  department: string;
  photoUrl: string;
  bio: string;
  order: number;
  phone?: string;
  email?: string;
}

export interface PublicSiteContent {
  // Hero Section
  heroBadge: string;
  heroTitleLine1: string;
  heroTitleHighlight: string;
  heroDescription: string;
  heroBgImageUrl: string;
  heroCommitment1: string;
  heroCommitment2: string;
  heroCommitment3: string;

  // Operational Statistics
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
  stat3Value: string;
  stat3Label: string;
  stat4Value: string;
  stat4Label: string;

  // Institutional Mission & Doctrines
  doctrineHeaderBadge: string;
  doctrineHeaderTitle: string;
  doctrineHeaderSubtitle: string;

  airCommandTitle: string;
  airCommandDescription: string;
  airCommandBullets: string[];

  navalCommandTitle: string;
  navalCommandDescription: string;
  navalCommandBullets: string[];

  infantryCommandTitle: string;
  infantryCommandDescription: string;
  infantryCommandBullets: string[];

  // Mission & Vision
  missionTitle: string;
  missionDescription: string;
  visionTitle: string;
  visionDescription: string;

  // Emergency Banner
  emergencyBarPhone: string;
  emergencyBarText: string;
  emergencyMotto: string;

  // Footer & Contact
  footerHeadquarters: string;
  footerPhone: string;
  footerEmail: string;
  footerBases: string[];
}


