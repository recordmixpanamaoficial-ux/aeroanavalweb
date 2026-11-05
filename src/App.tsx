import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { PublicNavbar } from './components/public/PublicNavbar';
import { PublicHero } from './components/public/PublicHero';
import { MissionVision } from './components/public/MissionVision';
import { FleetShowcase } from './components/public/FleetShowcase';
import { OperationsSAR } from './components/public/OperationsSAR';
import { NewsSection } from './components/public/NewsSection';
import { DirectorsSection } from './components/public/DirectorsSection';
import { RecruitmentSection } from './components/public/RecruitmentSection';
import { EmergencyReportModal } from './components/public/EmergencyReportModal';
import { PublicFooter } from './components/public/PublicFooter';
import { LoginModal } from './components/auth/LoginModal';
import { SoldierDashboard } from './components/soldier/SoldierDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { RoleSwitcherBar } from './components/common/RoleSwitcherBar';

const AppContent: React.FC = () => {
  const { activeRole } = useApp();
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* View router based on active role */}
      {activeRole === 'admin' ? (
        <AdminDashboard />
      ) : activeRole === 'officer' ? (
        <SoldierDashboard />
      ) : (
        <div className="flex flex-col min-h-screen">
          <PublicNavbar onOpenReportModal={() => setIsReportModalOpen(true)} />
          <main className="flex-1">
            <PublicHero onOpenReportModal={() => setIsReportModalOpen(true)} />
            <MissionVision />
            <FleetShowcase />
            <OperationsSAR />
            <DirectorsSection />
            <NewsSection />
            <RecruitmentSection />
          </main>
          <PublicFooter />
        </div>
      )}

      {/* Global Modals & Helpers */}
      <EmergencyReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />
      <LoginModal />
      <RoleSwitcherBar />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
