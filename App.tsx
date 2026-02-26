
import React, { useState } from 'react';
import { AppView } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardView from './components/DashboardView';
import UserManagementView from './components/UserManagementView';
import TerminalMonitorView from './components/TerminalMonitorView';
import FaultTicketView from './components/FaultTicketView';
import OTAManagementView from './components/OTAManagementView';
import OTAPackageMngView from './components/OTAPackageMngView';
import OTATaskCreateView from './components/OTATaskCreateView';
import AuditLogView from './components/AuditLogView';
import ReportStatsView from './components/ReportStatsView';
import DebugRecordsView from './components/DebugRecordsView';
import SystemConfigView from './components/SystemConfigView';
import VehicleConfigView from './components/VehicleConfigView';
import AppContentMngView from './components/AppContentMngView';
import AppManagementView from './components/AppManagementView';
import PrototypeExportModal from './components/PrototypeExportModal';
import Login from './components/Login';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  const renderContent = () => {
    switch (currentView) {
      case AppView.DASHBOARD:
        return <DashboardView onNavigate={setCurrentView} />;
      case AppView.USER_MANAGEMENT:
        return <UserManagementView />;
      case AppView.TERMINAL_MONITOR:
        return <TerminalMonitorView />;
      case AppView.APP_MANAGEMENT: // 新增
        return <AppManagementView />;
      case AppView.VEHICLE_CONFIG:
        return <VehicleConfigView />;
      case AppView.APP_CONTENT:
        return <AppContentMngView />;
      case AppView.FAULT_TICKETS:
        return <FaultTicketView />;
      case AppView.OTA_MANAGEMENT:
        return <OTAManagementView onNewTask={() => setCurrentView(AppView.OTA_TASK_CREATE)} />;
      case AppView.OTA_PACKAGE_MNG:
        return <OTAPackageMngView />;
      case AppView.OTA_TASK_CREATE:
        return <OTATaskCreateView onBack={() => setCurrentView(AppView.OTA_MANAGEMENT)} />;
      case AppView.REPORT_STATS:
        return <ReportStatsView />;
      case AppView.DEBUG_RECORDS:
        return <DebugRecordsView />;
      case AppView.AUDIT_LOGS:
        return <AuditLogView />;
      case AppView.SYSTEM_CONFIG:
        return <SystemConfigView />;
      default:
        return <DashboardView onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50 font-sans">
      <Sidebar 
        currentView={currentView} 
        onViewChange={setCurrentView} 
        isCollapsed={isSidebarCollapsed}
        toggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header 
          currentViewName={currentView} 
          onLogout={() => setIsAuthenticated(false)}
        />
        
        <main className="flex-1 overflow-y-auto p-6 scroll-smooth bg-[#F8FAFC]">
          {renderContent()}
        </main>

        {/* Floating Action for Prototype Download (Requirement) */}
        <button 
          onClick={() => setIsExportModalOpen(true)}
          className="fixed bottom-8 right-8 w-14 h-14 bg-[#0F172A] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group z-40"
          title="导出交付原型资产"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
          <span className="absolute right-16 bg-slate-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">下载 Axure 交付资产包</span>
        </button>
      </div>

      <PrototypeExportModal isOpen={isExportModalOpen} onClose={() => setIsExportModalOpen(false)} />
    </div>
  );
};

export default App;
