
import React, { useState } from 'react';

const SystemConfigView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'data' | 'compliance' | 'api' | 'permission'>('data');

  const subMenus = [
    { id: 'data', label: '数据管理', icon: 'M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7c-2 0-3 1-3 3z' },
    { id: 'compliance', label: '合规配置', icon: 'M9 12l2 2 4-4m5.618-4.016A3.323 3.323 0 0010.605 3h1.05a3.323 3.323 0 00.66 1.984l.063.102a.5.5 0 010 .52l-.063.102A3.323 3.323 0 0010.605 15h1.05a3.323 3.323 0 00.66-1.984l.063-.102a.5.5 0 010-.52l-.063-.102A3.323 3.323 0 0010.605 9h1.05z' },
    { id: 'api', label: '接口管理', icon: 'M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { id: 'permission', label: '权限矩阵', icon: 'M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z' },
  ];

  return (
    <div className="flex gap-6 h-full animate-fadeIn">
      {/* Sub Sidebar */}
      <div className="w-48 shrink-0 bg-white rounded-3xl border border-slate-200 p-4 shadow-sm space-y-2">
        <h4 className="px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">系统设置</h4>
        {subMenus.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveSubTab(item.id as any)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
              activeSubTab === item.id ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} /></svg>
            {item.label}
          </button>
        ))}
      </div>

      {/* Config Content */}
      <div className="flex-1 bg-white rounded-3xl border border-slate-200 shadow-sm p-8 overflow-y-auto">
        {activeSubTab === 'data' && (
          <div className="space-y-8 animate-fadeIn">
            <div>
              <h3 className="text-lg font-bold text-slate-800">数据库管理</h3>
              <p className="text-sm text-slate-500 mt-1">配置每日凌晨的冷备份策略及历史快照清理规则。</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-sm font-bold text-slate-700 mb-4">手动触发备份</p>
                <button className="px-6 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">立即开始备份</button>
              </div>
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-sm font-bold text-slate-700 mb-4">自动清理规则</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">保留近</span>
                  <input type="number" defaultValue={90} className="w-20 p-1 border rounded text-center font-bold" />
                  <span className="text-xs text-slate-500">天的备份文件</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSubTab === 'compliance' && (
          <div className="space-y-8 animate-fadeIn">
            <div>
              <h3 className="text-lg font-bold text-slate-800">合规与脱敏设置</h3>
              <p className="text-sm text-slate-500 mt-1">根据 R155 及个人信息保护法配置敏感字段展示规则。</p>
            </div>
            <div className="space-y-4">
              {['手机号 (中间4位隐藏)', '地理位置 (仅显示区县)', '完整行驶轨迹 (7天自动删除)'].map(rule => (
                <div key={rule} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                  <span className="text-sm font-bold text-slate-700">{rule}</span>
                  <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSubTab === 'api' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center">
               <h3 className="text-lg font-bold text-slate-800">外部系统接口</h3>
               <button className="text-xs font-bold text-blue-600 underline">接口文档</button>
            </div>
            <div className="border border-slate-100 rounded-2xl overflow-hidden">
               <table className="w-full text-left text-sm">
                 <thead className="bg-slate-50 text-slate-500 font-bold text-[11px] uppercase">
                   <tr>
                     <th className="px-6 py-3">接口名称</th>
                     <th className="px-6 py-3">对接方</th>
                     <th className="px-6 py-3">状态</th>
                     <th className="px-6 py-3">负载</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100 font-medium">
                   <tr>
                     <td className="px-6 py-4 font-bold">VehData_Sync_V3</td>
                     <td className="px-6 py-4">电控供应商</td>
                     <td className="px-6 py-4 text-emerald-500 flex items-center gap-2 font-black">
                       <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                       正常
                     </td>
                     <td className="px-6 py-4 font-mono">124 req/min</td>
                   </tr>
                   <tr>
                     <td className="px-6 py-4 font-bold">AppUser_Auth</td>
                     <td className="px-6 py-4">巡翼网联APP</td>
                     <td className="px-6 py-4 text-emerald-500 flex items-center gap-2 font-black">
                       <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                       正常
                     </td>
                     <td className="px-6 py-4 font-mono">450 req/min</td>
                   </tr>
                 </tbody>
               </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SystemConfigView;
