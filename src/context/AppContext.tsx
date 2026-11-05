import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  OperationMission,
  FleetUnit,
  GuardDuty,
  MissionLog,
  OfficerRequest,
  Directive,
  PublicNews,
  CitizenEmergencyReport,
  RecruitmentCandidate,
  DirectorProfile,
  UserRole,
  PublicSiteContent,
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_FLEET,
  INITIAL_OPERATIONS,
  INITIAL_NEWS,
  INITIAL_GUARD_DUTIES,
  INITIAL_MISSION_LOGS,
  INITIAL_LEAVE_REQUESTS,
  INITIAL_DIRECTIVES,
  INITIAL_CITIZEN_REPORTS,
  INITIAL_RECRUITMENT,
  INITIAL_DIRECTORS,
  INITIAL_SITE_CONTENT,
} from '../data/mockData';

interface AppContextType {
  activeRole: UserRole;
  currentUser: UserProfile | null;
  users: UserProfile[];
  fleet: FleetUnit[];
  operations: OperationMission[];
  news: PublicNews[];
  guardDuties: GuardDuty[];
  missionLogs: MissionLog[];
  leaveRequests: OfficerRequest[];
  directives: Directive[];
  emergencyReports: CitizenEmergencyReport[];
  recruitmentList: RecruitmentCandidate[];
  isLoginModalOpen: boolean;
  loginRoleTarget: 'officer_pilot' | 'officer_infantry' | 'officer' | 'admin' | null;

  // Actions
  openLoginModal: (target?: 'officer_pilot' | 'officer_infantry' | 'officer' | 'admin') => void;
  closeLoginModal: () => void;
  login: (username: string, pass: string, targetRole: 'officer' | 'admin') => { success: boolean; message: string; user?: UserProfile };
  logout: () => void;

  // News Actions
  addNews: (newsItem: Omit<PublicNews, 'id'>) => void;
  updateNews: (id: string, updates: Partial<PublicNews>) => void;
  deleteNews: (id: string) => void;

  // Operations Actions
  addOperation: (op: Omit<OperationMission, 'id'>) => void;
  updateOperation: (id: string, updates: Partial<OperationMission>) => void;
  updateOperationStatus: (id: string, status: OperationMission['status'], results?: string) => void;
  deleteOperation: (id: string) => void;

  // Soldier Log Actions
  addMissionLog: (log: Omit<MissionLog, 'id' | 'submittedAt' | 'status'>) => void;

  // Guard Duty / Service Registry Actions
  addGuardDuty: (duty: Omit<GuardDuty, 'id'>) => void;
  updateGuardDuty: (id: string, updates: Partial<GuardDuty>) => void;
  deleteGuardDuty: (id: string) => void;

  // Leave Request Actions
  addLeaveRequest: (req: Omit<OfficerRequest, 'id' | 'status' | 'createdAt'>) => void;
  reviewLeaveRequest: (id: string, status: 'APROBADO' | 'RECHAZADO', adminNotes?: string) => void;

  // Citizen Report Actions
  submitEmergencyReport: (rep: Omit<CitizenEmergencyReport, 'id' | 'folio' | 'timestamp' | 'status'>) => string;
  updateEmergencyStatus: (id: string, status: CitizenEmergencyReport['status']) => void;
  deleteEmergencyReport: (id: string) => void;

  // Recruitment
  submitRecruitment: (candidate: Omit<RecruitmentCandidate, 'id' | 'appliedAt' | 'status'>) => void;
  updateRecruitmentStatus: (id: string, status: RecruitmentCandidate['status']) => void;
  deleteRecruitment: (id: string) => void;

  // Personnel Management
  addOfficer: (officer: Omit<UserProfile, 'id'>) => UserProfile;
  updateOfficer: (id: string, updates: Partial<UserProfile>) => void;
  updateOfficerStatus: (id: string, status: UserProfile['status']) => void;
  updateOfficerCredentials: (id: string, username: string, password: string) => void;
  deleteOfficer: (id: string) => void;

  // Directors / Alto Mando
  directors: DirectorProfile[];
  addDirector: (d: Omit<DirectorProfile, 'id'>) => void;
  updateDirector: (id: string, updates: Partial<DirectorProfile>) => void;
  deleteDirector: (id: string) => void;

  // Webhooks
  webhookUrl: string;
  setWebhookUrl: (url: string) => void;
  testWebhook: (customUrl?: string) => Promise<{ success: boolean; message: string }>;

  // Form Controls (Quitar / Poner desde el Panel Administrativo)
  isRecruitmentFormEnabled: boolean;
  isEmergencyReportFormEnabled: boolean;
  toggleRecruitmentForm: () => void;
  toggleEmergencyReportForm: () => void;

  // Editable Public Website Content & Fleet
  siteContent: PublicSiteContent;
  updateSiteContent: (updates: Partial<PublicSiteContent>) => void;
  addFleetUnit: (unit: Omit<FleetUnit, 'id'>) => void;
  updateFleetUnit: (id: string, updates: Partial<FleetUnit>) => void;
  deleteFleetUnit: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeRole, setActiveRole] = useState<UserRole>('public');
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  // Reference to websocket
  const wsRef = React.useRef<WebSocket | null>(null);
  const isRemoteSyncRef = React.useRef<boolean>(false);

  // Sync state to Server and all other devices
  const syncToServer = (payload: Record<string, any>) => {
    // 1. Send via WebSocket if open
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(
        JSON.stringify({
          type: 'UPDATE_STATE',
          payload,
        })
      );
    } else {
      // Fallback to REST API
      fetch('/api/state', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch((e) => console.error('API sync fallback error:', e));
    }
  };

  // Connect WebSocket for real-time live sync across all devices
  useEffect(() => {
    let socket: WebSocket;
    let reconnectTimeout: any;

    const connectWS = () => {
      try {
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const wsUrl = `${protocol}//${window.location.host}/ws`;
        socket = new WebSocket(wsUrl);
        wsRef.current = socket;

        socket.onopen = () => {
          console.log('✅ SIS-AERONAVAL WebSocket conectado para sincronización en tiempo real.');
        };

        socket.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.type === 'SYNC_STATE' || data.type === 'INIT_STATE') {
              const remote = data.state;
              if (remote) {
                isRemoteSyncRef.current = true;
                if (remote.users) setUsers(remote.users);
                if (remote.operations) setOperations(remote.operations);
                if (remote.news) setNews(remote.news);
                if (remote.missionLogs) setMissionLogs(remote.missionLogs);
                if (remote.leaveRequests) setLeaveRequests(remote.leaveRequests);
                if (remote.emergencyReports) setEmergencyReports(remote.emergencyReports);
                if (remote.recruitmentList) setRecruitmentList(remote.recruitmentList);
                if (remote.directors) setDirectors(remote.directors);
                if (remote.fleet) setFleet(remote.fleet);
                if (remote.guardDuties) setGuardDuties(remote.guardDuties);
                if (remote.siteContent) setSiteContent(remote.siteContent);
                if (remote.webhookUrl !== undefined) setWebhookUrlState(remote.webhookUrl);
                if (remote.isRecruitmentFormEnabled !== undefined) {
                  setIsRecruitmentFormEnabled(remote.isRecruitmentFormEnabled);
                }
                if (remote.isEmergencyReportFormEnabled !== undefined) {
                  setIsEmergencyReportFormEnabled(remote.isEmergencyReportFormEnabled);
                }

                setTimeout(() => {
                  isRemoteSyncRef.current = false;
                }, 50);
              }
            }
          } catch (err) {
            console.error('Error procesando mensaje WebSocket:', err);
          }
        };

        socket.onclose = () => {
          reconnectTimeout = setTimeout(connectWS, 2000);
        };

        socket.onerror = () => {
          socket.close();
        };
      } catch (e) {
        reconnectTimeout = setTimeout(connectWS, 3000);
      }
    };

    connectWS();

    // Also fetch initial state via REST
    fetch('/api/state')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.state) {
          const s = data.state;
          if (s.users) setUsers(s.users);
          if (s.operations) setOperations(s.operations);
          if (s.news) setNews(s.news);
          if (s.guardDuties) setGuardDuties(s.guardDuties);
          if (s.missionLogs) setMissionLogs(s.missionLogs);
          if (s.leaveRequests) setLeaveRequests(s.leaveRequests);
          if (s.emergencyReports) setEmergencyReports(s.emergencyReports);
          if (s.recruitmentList) setRecruitmentList(s.recruitmentList);
          if (s.directors) setDirectors(s.directors);
          if (s.fleet) setFleet(s.fleet);
          if (s.siteContent) setSiteContent(s.siteContent);
          if (s.webhookUrl !== undefined) setWebhookUrlState(s.webhookUrl);
          if (s.isRecruitmentFormEnabled !== undefined) {
            setIsRecruitmentFormEnabled(s.isRecruitmentFormEnabled);
          }
          if (s.isEmergencyReportFormEnabled !== undefined) {
            setIsEmergencyReportFormEnabled(s.isEmergencyReportFormEnabled);
          }
        }
      })
      .catch(() => {});

    return () => {
      clearTimeout(reconnectTimeout);
      if (socket) socket.close();
    };
  }, []);

  const [users, setUsers] = useState<UserProfile[]>(() => {
    const isCleaned = localStorage.getItem('senan_data_clean_v2');
    if (!isCleaned) return INITIAL_USERS;
    const saved = localStorage.getItem('senan_users');
    let loadedUsers: UserProfile[] = saved ? JSON.parse(saved) : INITIAL_USERS;

    // Ensure ibrain2026 administrator is always present with password 262728
    const hasIbrain = loadedUsers.some((u) => u.username.toLowerCase() === 'ibrain2026');
    if (!hasIbrain) {
      const ibrainUser = INITIAL_USERS.find((u) => u.username === 'ibrain2026');
      if (ibrainUser) {
        loadedUsers = [ibrainUser, ...loadedUsers];
      }
    } else {
      // Keep password 262728 synced
      loadedUsers = loadedUsers.map((u) =>
        u.username.toLowerCase() === 'ibrain2026' ? { ...u, password: '262728', role: 'admin' } : u
      );
    }
    return loadedUsers;
  });

  const [isRecruitmentFormEnabled, setIsRecruitmentFormEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('senan_form_recruitment');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [isEmergencyReportFormEnabled, setIsEmergencyReportFormEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('senan_form_emergency');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [fleet, setFleet] = useState<FleetUnit[]>(() => {
    const saved = localStorage.getItem('senan_fleet');
    return saved ? JSON.parse(saved) : INITIAL_FLEET;
  });

  const [siteContent, setSiteContent] = useState<PublicSiteContent>(() => {
    const saved = localStorage.getItem('senan_site_content');
    return saved ? { ...INITIAL_SITE_CONTENT, ...JSON.parse(saved) } : INITIAL_SITE_CONTENT;
  });

  const [operations, setOperations] = useState<OperationMission[]>(() => {
    const isCleaned = localStorage.getItem('senan_data_clean_v2');
    if (!isCleaned) return [];
    const saved = localStorage.getItem('senan_operations');
    return saved ? JSON.parse(saved) : [];
  });

  const [news, setNews] = useState<PublicNews[]>(() => {
    const isCleaned = localStorage.getItem('senan_data_clean_v2');
    if (!isCleaned) return [];
    const saved = localStorage.getItem('senan_news');
    return saved ? JSON.parse(saved) : [];
  });

  const [guardDuties, setGuardDuties] = useState<GuardDuty[]>(() => {
    const isCleaned = localStorage.getItem('senan_data_clean_v2');
    if (!isCleaned) return INITIAL_GUARD_DUTIES;
    const saved = localStorage.getItem('senan_guard_duties');
    return saved ? JSON.parse(saved) : INITIAL_GUARD_DUTIES;
  });

  const [missionLogs, setMissionLogs] = useState<MissionLog[]>(() => {
    const isCleaned = localStorage.getItem('senan_data_clean_v2');
    if (!isCleaned) return [];
    const saved = localStorage.getItem('senan_logs');
    return saved ? JSON.parse(saved) : [];
  });

  const [leaveRequests, setLeaveRequests] = useState<OfficerRequest[]>(() => {
    const isCleaned = localStorage.getItem('senan_data_clean_v2');
    if (!isCleaned) return [];
    const saved = localStorage.getItem('senan_leave');
    return saved ? JSON.parse(saved) : [];
  });

  const [directives] = useState<Directive[]>(INITIAL_DIRECTIVES);

  const [emergencyReports, setEmergencyReports] = useState<CitizenEmergencyReport[]>(() => {
    const isCleaned = localStorage.getItem('senan_data_clean_v2');
    if (!isCleaned) return [];
    const saved = localStorage.getItem('senan_emergencies');
    return saved ? JSON.parse(saved) : [];
  });

  const [recruitmentList, setRecruitmentList] = useState<RecruitmentCandidate[]>(() => {
    const isCleaned = localStorage.getItem('senan_data_clean_v2');
    if (!isCleaned) return [];
    const saved = localStorage.getItem('senan_recruitment');
    return saved ? JSON.parse(saved) : [];
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginRoleTarget, setLoginRoleTarget] = useState<'officer_pilot' | 'officer_infantry' | 'officer' | 'admin' | null>(null);

  // Directors state
  const [directors, setDirectors] = useState<DirectorProfile[]>(() => {
    const saved = localStorage.getItem('senan_directors');
    return saved ? JSON.parse(saved) : INITIAL_DIRECTORS;
  });

  // Webhook URL state
  const [webhookUrl, setWebhookUrlState] = useState<string>(() => {
    return localStorage.getItem('senan_coan_webhook_url') || '';
  });

  const setWebhookUrl = (url: string) => {
    setWebhookUrlState(url);
    localStorage.setItem('senan_coan_webhook_url', url);
    syncToServer({ webhookUrl: url });
  };

  const testWebhook = async (customUrl?: string): Promise<{ success: boolean; message: string }> => {
    const target = customUrl !== undefined ? customUrl.trim() : webhookUrl.trim();
    if (!target) {
      return { success: false, message: 'No hay URL de webhook configurada. Ingrese una URL válida.' };
    }

    try {
      const payload = {
        event: 'TEST_DISPATCH_COAN_108',
        timestamp: new Date().toISOString(),
        institution: 'Servicio Nacional Aeronaval de Panamá (SENAN)',
        despacho: 'Centro de Operaciones Aeronavales (COAN Línea 108)',
        message: 'Enlace táctico de prueba exitoso desde el Sistema de Comando SENAN.',
        testFolio: 'COAN-TEST-' + Math.floor(1000 + Math.random() * 9000),
      };

      const res = await fetch(target, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        mode: 'no-cors', // allows reaching external webhooks like Discord, Slack, Zapier
      });

      return {
        success: true,
        message: '¡Señal de prueba enviada satisfactoriamente al Webhook de Despacho COAN 108!',
      };
    } catch (err: any) {
      return {
        success: false,
        message: `Error al conectar con el Webhook: ${err?.message || 'Fallo de red'}`,
      };
    }
  };

  // Sync directors to localStorage and server
  useEffect(() => {
    localStorage.setItem('senan_directors', JSON.stringify(directors));
    if (!isRemoteSyncRef.current) {
      syncToServer({ directors });
    }
  }, [directors]);

  // Sync state to local storage and broadcast to all devices
  useEffect(() => {
    localStorage.setItem('senan_users', JSON.stringify(users));
    if (!isRemoteSyncRef.current) {
      syncToServer({ users });
    }
  }, [users]);

  useEffect(() => {
    localStorage.setItem('senan_operations', JSON.stringify(operations));
    if (!isRemoteSyncRef.current) {
      syncToServer({ operations });
    }
  }, [operations]);

  useEffect(() => {
    localStorage.setItem('senan_news', JSON.stringify(news));
    if (!isRemoteSyncRef.current) {
      syncToServer({ news });
    }
  }, [news]);

  useEffect(() => {
    localStorage.setItem('senan_logs', JSON.stringify(missionLogs));
    if (!isRemoteSyncRef.current) {
      syncToServer({ missionLogs });
    }
  }, [missionLogs]);

  useEffect(() => {
    localStorage.setItem('senan_leave', JSON.stringify(leaveRequests));
    if (!isRemoteSyncRef.current) {
      syncToServer({ leaveRequests });
    }
  }, [leaveRequests]);

  useEffect(() => {
    localStorage.setItem('senan_emergencies', JSON.stringify(emergencyReports));
    if (!isRemoteSyncRef.current) {
      syncToServer({ emergencyReports });
    }
  }, [emergencyReports]);

  useEffect(() => {
    localStorage.setItem('senan_recruitment', JSON.stringify(recruitmentList));
    if (!isRemoteSyncRef.current) {
      syncToServer({ recruitmentList });
    }
  }, [recruitmentList]);

  useEffect(() => {
    localStorage.setItem('senan_guard_duties', JSON.stringify(guardDuties));
    if (!isRemoteSyncRef.current) {
      syncToServer({ guardDuties });
    }
  }, [guardDuties]);

  useEffect(() => {
    localStorage.setItem('senan_fleet', JSON.stringify(fleet));
    if (!isRemoteSyncRef.current) {
      syncToServer({ fleet });
    }
  }, [fleet]);

  useEffect(() => {
    localStorage.setItem('senan_site_content', JSON.stringify(siteContent));
    if (!isRemoteSyncRef.current) {
      syncToServer({ siteContent });
    }
  }, [siteContent]);

  const openLoginModal = (target: 'officer_pilot' | 'officer_infantry' | 'officer' | 'admin' = 'officer') => {
    setLoginRoleTarget(target);
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
    setLoginRoleTarget(null);
  };

  const login = (username: string, pass: string, targetRole: 'officer' | 'admin') => {
    const cleanUser = username.trim().toLowerCase();
    const cleanPass = pass.trim();

    if (!cleanUser || !cleanPass) {
      return {
        success: false,
        message: 'Debe ingresar su usuario (o CIP) y contraseña para acceder.',
      };
    }

    const found = users.find(
      (u) =>
        (u.username.toLowerCase() === cleanUser || u.cip.toLowerCase() === cleanUser) &&
        (u.password ? u.password === cleanPass : cleanPass === 'soldado123' || cleanPass === 'admin' || cleanPass === '262728')
    );

    if (!found) {
      return {
        success: false,
        message: 'Credenciales inválidas. Verifique su usuario y contraseña.',
      };
    }

    if (targetRole === 'admin' && found.role !== 'admin') {
      return {
        success: false,
        message: 'Este usuario no cuenta con autorización de Estado Mayor / Mando Administrativo.',
      };
    }

    setCurrentUser(found);
    setActiveRole(found.role);
    closeLoginModal();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return {
      success: true,
      message: `Acceso concedido. Bienvenido, ${found.rank} ${found.name}`,
      user: found,
    };
  };

  const logout = () => {
    setActiveRole('public');
    setCurrentUser(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addNews = (newsItem: Omit<PublicNews, 'id'>) => {
    const newItem: PublicNews = {
      ...newsItem,
      id: `nw-${Date.now()}`,
    };
    setNews((prev) => [newItem, ...prev]);
  };

  const updateNews = (id: string, updates: Partial<PublicNews>) => {
    setNews((prev) => prev.map((item) => (item.id === id ? { ...item, ...updates } : item)));
  };

  const deleteNews = (id: string) => {
    setNews((prev) => prev.filter((n) => n.id !== id));
  };

  const addOperation = (op: Omit<OperationMission, 'id'>) => {
    const newOp: OperationMission = {
      ...op,
      id: `op-${Date.now()}`,
    };
    setOperations((prev) => [newOp, ...prev]);
  };

  const updateOperation = (id: string, updates: Partial<OperationMission>) => {
    setOperations((prev) => prev.map((op) => (op.id === id ? { ...op, ...updates } : op)));
  };

  const updateOperationStatus = (id: string, status: OperationMission['status'], results?: string) => {
    setOperations((prev) =>
      prev.map((op) =>
        op.id === id
          ? {
              ...op,
              status,
              ...(results ? { results } : {}),
              ...(status === 'COMPLETADA' && !op.completionDate ? { completionDate: new Date().toISOString().split('T')[0] } : {}),
            }
          : op
      )
    );
  };

  const deleteOperation = (id: string) => {
    setOperations((prev) => prev.filter((op) => op.id !== id));
  };

  const addMissionLog = (log: Omit<MissionLog, 'id' | 'submittedAt' | 'status'>) => {
    const newLog: MissionLog = {
      ...log,
      id: `ml-${Date.now()}`,
      submittedAt: new Date().toLocaleString('es-PA', { dateStyle: 'short', timeStyle: 'short' }),
      status: 'Registrado',
    };
    setMissionLogs((prev) => [newLog, ...prev]);
  };

  const addLeaveRequest = (req: Omit<OfficerRequest, 'id' | 'status' | 'createdAt'>) => {
    const newReq: OfficerRequest = {
      ...req,
      id: `req-${Date.now()}`,
      status: 'PENDIENTE',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setLeaveRequests((prev) => [newReq, ...prev]);
  };

  const reviewLeaveRequest = (id: string, status: 'APROBADO' | 'RECHAZADO', adminNotes?: string) => {
    setLeaveRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status, ...(adminNotes ? { adminNotes } : {}) } : r))
    );
  };

  const submitEmergencyReport = (rep: Omit<CitizenEmergencyReport, 'id' | 'folio' | 'timestamp' | 'status'>): string => {
    const folioNumber = Math.floor(1000 + Math.random() * 9000);
    const folio = `COAN-${new Date().getFullYear()}-${folioNumber}`;
    const newRep: CitizenEmergencyReport = {
      ...rep,
      id: `cit-${Date.now()}`,
      folio,
      status: 'RECIBIDA',
      timestamp: 'Recibido recientemente',
    };
    setEmergencyReports((prev) => [newRep, ...prev]);

    // Asynchronously dispatch to webhook if configured
    if (webhookUrl && webhookUrl.trim().startsWith('http')) {
      try {
        fetch(webhookUrl.trim(), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: 'NEW_EMERGENCY_COAN_108',
            folio,
            tipo: rep.type,
            prioridad: rep.priority,
            ubicacion: rep.location,
            coordenadas: rep.coordinates || 'No especificadas',
            descripcion: rep.description,
            denunciante: rep.reporterName || 'Anónimo',
            telefono: rep.reporterPhone || 'N/A',
            timestamp: new Date().toISOString(),
          }),
          mode: 'no-cors',
        }).catch(() => {
          // Silent catch for webhook background broadcast
        });
      } catch (e) {
        // Ignore network dispatch errors
      }
    }

    return folio;
  };

  const updateEmergencyStatus = (id: string, status: CitizenEmergencyReport['status']) => {
    setEmergencyReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  const deleteEmergencyReport = (id: string) => {
    setEmergencyReports((prev) => prev.filter((r) => r.id !== id));
  };

  const submitRecruitment = (candidate: Omit<RecruitmentCandidate, 'id' | 'appliedAt' | 'status'>) => {
    const newCand: RecruitmentCandidate = {
      ...candidate,
      id: `rec-${Date.now()}`,
      status: 'Recibido',
      appliedAt: new Date().toISOString().split('T')[0],
    };
    setRecruitmentList((prev) => [newCand, ...prev]);
  };

  const updateRecruitmentStatus = (id: string, status: RecruitmentCandidate['status']) => {
    setRecruitmentList((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status } : c))
    );
  };

  const deleteRecruitment = (id: string) => {
    setRecruitmentList((prev) => prev.filter((c) => c.id !== id));
  };

  const addOfficer = (officer: Omit<UserProfile, 'id'>): UserProfile => {
    const newOfficer: UserProfile = {
      ...officer,
      id: `usr-${Date.now()}`,
    };
    setUsers((prev) => [...prev, newOfficer]);
    return newOfficer;
  };

  const updateOfficer = (id: string, updates: Partial<UserProfile>) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...updates } : u)));
    if (currentUser && currentUser.id === id) {
      setCurrentUser((prev) => (prev ? { ...prev, ...updates } : prev));
    }
  };

  const updateOfficerStatus = (id: string, status: UserProfile['status']) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status } : u))
    );
  };

  const updateOfficerCredentials = (id: string, username: string, password: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, username: username.trim(), password: password.trim() } : u))
    );
  };

  const deleteOfficer = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  // Directors CRUD
  const addDirector = (d: Omit<DirectorProfile, 'id'>) => {
    const newDirector: DirectorProfile = {
      ...d,
      id: `dir-${Date.now()}`,
    };
    setDirectors((prev) => [...prev, newDirector]);
  };

  const updateDirector = (id: string, updates: Partial<DirectorProfile>) => {
    setDirectors((prev) => prev.map((d) => (d.id === id ? { ...d, ...updates } : d)));
  };

  const deleteDirector = (id: string) => {
    setDirectors((prev) => prev.filter((d) => d.id !== id));
  };

  const toggleRecruitmentForm = () => {
    setIsRecruitmentFormEnabled((prev) => {
      const next = !prev;
      localStorage.setItem('senan_form_recruitment', JSON.stringify(next));
      syncToServer({ isRecruitmentFormEnabled: next });
      return next;
    });
  };

  const toggleEmergencyReportForm = () => {
    setIsEmergencyReportFormEnabled((prev) => {
      const next = !prev;
      localStorage.setItem('senan_form_emergency', JSON.stringify(next));
      syncToServer({ isEmergencyReportFormEnabled: next });
      return next;
    });
  };

  const updateSiteContent = (updates: Partial<PublicSiteContent>) => {
    setSiteContent((prev) => {
      const next = { ...prev, ...updates };
      return next;
    });
  };

  const addFleetUnit = (unit: Omit<FleetUnit, 'id'>) => {
    const newUnit: FleetUnit = {
      ...unit,
      id: `fl-${Date.now()}`,
    };
    setFleet((prev) => [newUnit, ...prev]);
  };

  const updateFleetUnit = (id: string, updates: Partial<FleetUnit>) => {
    setFleet((prev) => prev.map((u) => (u.id === id ? { ...u, ...updates } : u)));
  };

  const deleteFleetUnit = (id: string) => {
    setFleet((prev) => prev.filter((u) => u.id !== id));
  };

  const addGuardDuty = (duty: Omit<GuardDuty, 'id'>) => {
    const newDuty: GuardDuty = {
      ...duty,
      id: `gd-${Date.now()}`,
    };
    setGuardDuties((prev) => [newDuty, ...prev]);
  };

  const updateGuardDuty = (id: string, updates: Partial<GuardDuty>) => {
    setGuardDuties((prev) => prev.map((g) => (g.id === id ? { ...g, ...updates } : g)));
  };

  const deleteGuardDuty = (id: string) => {
    setGuardDuties((prev) => prev.filter((g) => g.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        activeRole,
        currentUser,
        users,
        fleet,
        operations,
        news,
        guardDuties,
        missionLogs,
        leaveRequests,
        directives,
        emergencyReports,
        recruitmentList,
        isLoginModalOpen,
        loginRoleTarget,
        openLoginModal,
        closeLoginModal,
        login,
        logout,
        addNews,
        updateNews,
        deleteNews,
        addOperation,
        updateOperation,
        updateOperationStatus,
        deleteOperation,
        addMissionLog,
        addLeaveRequest,
        reviewLeaveRequest,
        submitEmergencyReport,
        updateEmergencyStatus,
        deleteEmergencyReport,
        submitRecruitment,
        updateRecruitmentStatus,
        deleteRecruitment,
        addOfficer,
        updateOfficer,
        updateOfficerStatus,
        updateOfficerCredentials,
        deleteOfficer,
        directors,
        addDirector,
        updateDirector,
        deleteDirector,
        webhookUrl,
        setWebhookUrl,
        testWebhook,
        isRecruitmentFormEnabled,
        isEmergencyReportFormEnabled,
        toggleRecruitmentForm,
        toggleEmergencyReportForm,
        siteContent,
        updateSiteContent,
        addFleetUnit,
        updateFleetUnit,
        deleteFleetUnit,
        addGuardDuty,
        updateGuardDuty,
        deleteGuardDuty,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
