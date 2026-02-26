
import React from 'react';

interface HeaderProps {
  currentViewName: string;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentViewName, onLogout }) => {
  const viewNames: Record<string, string> = {
    'DASHBOARD': '数据看板',
    'APP_MANAGEMENT': 'APP 全生命周期管理',
    'USER_MANAGEMENT': '用户管理',
    'TERMINAL_MONITOR': '终端监控',
    'VEHICLE_CONFIG': '车辆功能配置',
    'APP_CONTENT': '内容管理 (H5/文案)',
    'FAULT_TICKETS': '故障工单',
    'OTA_MANAGEMENT': 'OTA 升级任务',
    'OTA_PACKAGE_MNG': 'OTA 资源仓库',
    'REPORT_STATS': '统计报表',
    'DEBUG_RECORDS': '调试记录',
    'AUDIT_LOGS': '操作日志',
    'SYSTEM_CONFIG': '系统配置'
  };

  const displayName = viewNames[currentViewName.replace(' ', '_').toUpperCase()] || currentViewName;

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-10">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold text-slate-800">{displayName}</h2>
        <span className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full font-medium">内部生产版 v2.5</span>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
            管理
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-slate-700 leading-none">管理员</p>
            <p className="text-xs text-slate-500 mt-1">超级管理员</p>
          </div>
        </div>
        
        <button 
          onClick={onLogout}
          className="text-sm text-slate-500 hover:text-red-600 transition-colors flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          退出登录
        </button>
      </div>
    </header>
  );
};

export default Header;
