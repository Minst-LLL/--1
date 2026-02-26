
import React, { useState } from 'react';

const ReportStatsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'behavior' | 'maint' | 'ota' | 'car'>('behavior');

  const tabs = [
    { id: 'behavior', label: '用户行为报表' },
    { id: 'maint', label: '终端运维报表' },
    { id: 'ota', label: '升级任务报表' },
    { id: 'car', label: '车企专属报表' }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-slate-800">统计报表中心</h3>
          <p className="text-sm text-slate-500 mt-1">支持多维度数据钻取与合规报表导出，对接车企结算及运维评估。</p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-50 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            保存报表模板
          </button>
          <button className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">
            导出当前报表
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex border-b border-slate-100 bg-slate-50/50 px-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-8 py-4 text-sm font-bold transition-all relative ${
                activeTab === tab.id ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full"></div>}
            </button>
          ))}
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
             <div className="space-y-1">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">时间范围</label>
               <input type="date" className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-sm font-bold" />
             </div>
             <div className="space-y-1">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">车型筛选</label>
               <select className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-sm font-bold">
                 <option>全部车型</option>
                 <option>巡翼 Rider Pro</option>
                 <option>巡翼 Sport</option>
               </select>
             </div>
             <div className="space-y-1">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">关键字搜索</label>
               <input type="text" placeholder="VIN / 手机号..." className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-sm font-bold" />
             </div>
             <div className="flex items-end">
               <button className="w-full py-2.5 bg-[#0F172A] text-white rounded-xl text-sm font-bold shadow-md hover:bg-slate-800 transition-all">
                 生成报表
               </button>
             </div>
          </div>

          <div className="border border-slate-100 rounded-2xl overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-tighter text-[11px]">
                <tr>
                  <th className="px-4 py-3">统计维度</th>
                  <th className="px-4 py-3">终端总数</th>
                  <th className="px-4 py-3">活跃率</th>
                  <th className="px-4 py-3">组队使用率</th>
                  <th className="px-4 py-3">付费转化率</th>
                  <th className="px-4 py-3 text-right">详情</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {[1, 2, 3, 4, 5].map(i => (
                  <tr key={i} className="hover:bg-slate-50/50">
                    <td className="px-4 py-4 font-bold">2024-03-0{i}</td>
                    <td className="px-4 py-4 font-mono text-slate-600">12,450</td>
                    <td className="px-4 py-4 text-emerald-600">92.4%</td>
                    <td className="px-4 py-4 text-blue-600">18.2%</td>
                    <td className="px-4 py-4 text-indigo-600">5.4%</td>
                    <td className="px-4 py-4 text-right">
                      <button className="text-blue-600 hover:underline">钻取</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportStatsView;
