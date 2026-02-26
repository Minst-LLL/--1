
import React, { useState } from 'react';
import { VehicleTerminal } from '../types';

const terminals: VehicleTerminal[] = [
  { id: 'T101', vin: 'XY-VIN-9921', model: '巡翼 Rider Pro', status: 'Online', signal: 95, faultCode: null, lastHeartbeat: '10秒前', location: '上海 · 浦东', mode: 'Sport+', lastUpdate: '2024-03-01' },
  { id: 'T102', vin: 'XY-VIN-8832', model: '巡翼 Sport', status: 'Online', signal: 82, faultCode: null, lastHeartbeat: '2分钟前', location: '北京 · 朝阳', mode: 'Comfort', lastUpdate: '2024-02-28' },
  { id: 'T103', vin: 'XY-VIN-1234', model: '巡翼 Lite', status: 'Warning', signal: 45, faultCode: 'P0300', lastHeartbeat: '5分钟前', location: '杭州 · 西湖', mode: 'Eco', lastUpdate: '2024-02-15' },
  { id: 'T104', vin: 'XY-VIN-7721', model: '巡翼 Rider Pro', status: 'Offline', signal: 0, faultCode: null, lastHeartbeat: '2小时前', location: '广州 · 天河', mode: 'Standard', lastUpdate: '2024-01-20' },
  { id: 'T105', vin: 'XY-VIN-4451', model: '巡翼 Sport', status: 'Online', signal: 91, faultCode: null, lastHeartbeat: '刚刚', location: '深圳 · 南山', mode: 'Sport', lastUpdate: '2024-03-05' },
];

const TerminalMonitorView: React.FC = () => {
  const [selectedTerminal, setSelectedTerminal] = useState<VehicleTerminal | null>(null);
  const [isClearingFault, setIsClearingFault] = useState(false);
  const [activeTab, setActiveTab] = useState<'base' | 'data' | 'ota' | 'fault'>('base');

  const statusMap: Record<string, string> = {
    'Online': '在线',
    'Offline': '离线',
    'Warning': '告警'
  };

  const handleClearFault = (t: VehicleTerminal) => {
    setSelectedTerminal(t);
    setIsClearingFault(true);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-800">终端实时监控</h3>
          <p className="text-sm text-slate-500 mt-1">全局 1,240 个在线终端，点击卡片可查看脱敏后的详细运行参数。</p>
        </div>
        <div className="flex gap-3">
          <select className="bg-white border border-slate-200 text-sm px-4 py-2 rounded-xl focus:outline-none shadow-sm font-medium">
            <option>全部车型</option>
            <option>巡翼 Rider Pro</option>
            <option>巡翼 Sport</option>
            <option>巡翼 Lite</option>
          </select>
          <button className="px-5 py-2 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-200">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            同步最新数据
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {terminals.map((t) => (
          <div key={t.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:border-blue-400 transition-all group flex flex-col cursor-pointer" onClick={() => {setSelectedTerminal(t); setIsClearingFault(false); setActiveTab('base');}}>
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
              <div>
                <span className="font-mono text-sm font-black text-slate-800 tracking-tight">{t.vin}</span>
                <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">{t.model}</p>
              </div>
              <span className={`flex items-center gap-1.5 text-[11px] font-bold uppercase ${
                t.status === 'Online' ? 'text-emerald-500' : t.status === 'Offline' ? 'text-slate-400' : 'text-amber-500'
              }`}>
                <span className={`w-2 h-2 rounded-full ${
                  t.status === 'Online' ? 'bg-emerald-500 animate-pulse' : t.status === 'Offline' ? 'bg-slate-400' : 'bg-amber-500'
                }`}></span>
                {statusMap[t.status]}
              </span>
            </div>
            
            <div className="p-5 flex-1 space-y-5">
              <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-widest">
                <span>4G 网络信号</span>
                <div className="flex items-center gap-1 w-28 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${t.signal > 50 ? 'bg-emerald-500' : t.signal > 0 ? 'bg-amber-500' : 'bg-slate-200'}`} 
                    style={{width: `${t.signal}%`}}
                  ></div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                  <p className="text-[10px] uppercase text-slate-400 font-black tracking-tighter mb-1">电控模式</p>
                  <p className="text-sm font-black text-indigo-600">{t.mode}</p>
                </div>
                <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                  <p className="text-[10px] uppercase text-slate-400 font-black tracking-tighter mb-1">最近上报</p>
                  <p className="text-sm font-bold text-slate-700">{t.lastHeartbeat}</p>
                </div>
              </div>

              <div className="bg-blue-50/30 p-3 rounded-xl border border-blue-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <span className="text-xs font-bold text-slate-600">{t.location}</span>
                </div>
                {t.faultCode && (
                  <span className="px-2 py-0.5 bg-rose-100 text-rose-600 text-[10px] font-black rounded">{t.faultCode}</span>
                )}
              </div>
            </div>

            <div className="px-5 py-4 border-t border-slate-100 bg-white group-hover:bg-slate-50 transition-colors flex justify-between">
              <button className="text-xs font-black text-slate-400 hover:text-slate-600 uppercase tracking-widest">查看详情</button>
              {t.faultCode ? (
                 <button 
                  onClick={(e) => { e.stopPropagation(); handleClearFault(t); }}
                  className="text-xs font-black text-rose-600 hover:text-rose-800 uppercase tracking-widest flex items-center gap-1"
                >
                  清除故障
                </button>
              ) : (
                <button className="text-xs font-black text-blue-600 hover:text-blue-800 uppercase tracking-widest flex items-center gap-1">
                  远程控制
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Terminal Details Modal */}
      {selectedTerminal && !isClearingFault && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm animate-fadeIn" onClick={() => setSelectedTerminal(null)}>
          <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
            <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center font-black text-xl">X</div>
                <div>
                  <h4 className="text-xl font-bold tracking-tight">终端详情监控 - {selectedTerminal.vin}</h4>
                  <p className="text-xs text-slate-400">内部诊断模式 • 实时数据链路已建立</p>
                </div>
              </div>
              <button onClick={() => setSelectedTerminal(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="flex border-b border-slate-100 bg-slate-50/50 px-6">
              {[
                { id: 'base', label: '基础信息' },
                { id: 'data', label: '运行数据' },
                { id: 'ota', label: '升级记录' },
                { id: 'fault', label: '故障历史' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-6 py-4 text-sm font-bold transition-all relative ${
                    activeTab === tab.id ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full"></div>}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto p-8">
              {activeTab === 'base' && (
                <div className="grid grid-cols-2 gap-8 animate-fadeIn">
                  <div className="space-y-6">
                    <div>
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2">车架号 (VIN)</label>
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 font-mono font-bold text-lg">{selectedTerminal.vin}</div>
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2">适配车型</label>
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 font-bold">{selectedTerminal.model}</div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2">绑定车主</label>
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 font-bold text-blue-600 flex justify-between items-center">
                        <span>张* (138****5678)</span>
                        <button className="text-xs font-black underline">查看用户</button>
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2">激活日期</label>
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 font-bold">2023-11-20</div>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'data' && (
                 <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 animate-fadeIn">
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">当前车速</p>
                      <p className="text-2xl font-black text-slate-800">42 <span className="text-sm font-medium">km/h</span></p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">今日里程</p>
                      <p className="text-2xl font-black text-slate-800">12.5 <span className="text-sm font-medium">km</span></p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">总里程</p>
                      <p className="text-2xl font-black text-slate-800">1,240 <span className="text-sm font-medium">km</span></p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">ABS 状态</p>
                      <p className="text-2xl font-black text-emerald-600">正常</p>
                    </div>
                 </div>
              )}
              {activeTab === 'ota' && (
                <div className="space-y-4 animate-fadeIn">
                   <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl flex justify-between items-center">
                      <div>
                        <p className="font-bold text-blue-900">当前版本: V2.5.0-Stable</p>
                        <p className="text-xs text-blue-700 mt-1">更新时间: {selectedTerminal.lastUpdate}</p>
                      </div>
                      <span className="px-3 py-1 bg-emerald-500 text-white text-[10px] font-black rounded-full">最新版本</span>
                   </div>
                   <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 text-sm">
                      没有更多的历史升级记录
                   </div>
                </div>
              )}
              {activeTab === 'fault' && (
                <div className="space-y-4 animate-fadeIn">
                   {selectedTerminal.faultCode ? (
                     <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl flex items-center gap-4">
                        <div className="w-10 h-10 bg-rose-500 rounded-lg flex items-center justify-center text-white">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        </div>
                        <div>
                          <p className="font-bold text-rose-900">故障代码: {selectedTerminal.faultCode}</p>
                          <p className="text-xs text-rose-700 mt-1">检测到传感器信号异常，请及时下发诊断指令。</p>
                        </div>
                     </div>
                   ) : (
                     <div className="text-center py-12 text-slate-400">
                        <svg className="w-12 h-12 mx-auto mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <p className="font-bold">该终端当前状态良好，未检测到任何历史故障</p>
                     </div>
                   )}
                </div>
              )}
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-4">
              <button className="px-8 py-3 bg-slate-800 text-white rounded-2xl font-bold text-sm hover:bg-slate-700 transition-all shadow-lg" onClick={() => setSelectedTerminal(null)}>关闭窗口</button>
              <button className="px-8 py-3 bg-blue-600 text-white rounded-2xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">导出详细报告</button>
            </div>
          </div>
        </div>
      )}

      {/* Clear Fault Confirmation Modal */}
      {selectedTerminal && isClearingFault && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 backdrop-blur-md animate-fadeIn">
          <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl p-8 text-center space-y-6">
            <div className="w-20 h-20 bg-rose-100 text-rose-600 rounded-full mx-auto flex items-center justify-center">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
            <div>
              <h4 className="text-xl font-bold text-slate-800">确认清除故障码？</h4>
              <p className="text-sm text-slate-500 mt-2">将对终端 {selectedTerminal.vin} 下发故障清除指令。该操作将被审计并记录原因。</p>
            </div>
            <div className="space-y-4">
              <select className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500">
                <option>请选择清除原因...</option>
                <option>远程诊断正常</option>
                <option>车主已线下维修</option>
                <option>传感器误报</option>
                <option>测试任务需要</option>
              </select>
              <div className="flex gap-4 pt-2">
                <button 
                  onClick={() => {setSelectedTerminal(null); setIsClearingFault(false);}}
                  className="flex-1 py-3 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-all"
                >
                  取消
                </button>
                <button 
                  onClick={() => {setSelectedTerminal(null); setIsClearingFault(false);}}
                  className="flex-1 py-3 bg-rose-600 text-white rounded-xl font-bold hover:bg-rose-700 transition-all shadow-lg shadow-rose-200"
                >
                  确认清除
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TerminalMonitorView;
