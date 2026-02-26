
import React from 'react';
import { OTATask } from '../types';

interface OTAManagementViewProps {
  onNewTask: () => void;
}

const otaTasks: OTATask[] = [
  { id: 'OTA-202403-01', version: 'v2.5.0-Stable', targetModel: '巡翼 Rider Pro', progress: 85, status: 'In Progress', startTime: '2024-03-01 08:00', mode: 'Full' },
  { id: 'OTA-202402-99', version: 'v2.4.9-Hotfix', targetModel: '巡翼 Lite', progress: 100, status: 'Completed', startTime: '2024-02-28 10:00', mode: 'Batch' },
  { id: 'OTA-202403-05', version: 'v2.5.1-Beta', targetModel: '全系车型', progress: 12, status: 'In Progress', startTime: '2024-03-01 15:30', mode: 'Targeted' },
  { id: 'OTA-202402-10', version: 'v2.4.5-Stable', targetModel: '巡翼 Sport', progress: 98, status: 'Failed', startTime: '2024-02-15 09:00', mode: 'Full' },
];

const OTAManagementView: React.FC<OTAManagementViewProps> = ({ onNewTask }) => {
  const statusMap: Record<string, string> = {
    'In Progress': '进行中',
    'Completed': '已完成',
    'Failed': '升级失败',
    'Pending': '等待中'
  };

  const modeMap: Record<string, string> = {
    'Full': '全量升级',
    'Batch': '分批升级',
    'Targeted': '定向升级',
    'Scheduled': '预约升级'
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h3 className="text-xl font-bold text-slate-800">OTA 发布流水线</h3>
          <p className="text-sm text-slate-500 mt-1">管理全线车辆终端的固件与应用升级任务，支持全量、分批、定向及预约模式。</p>
        </div>
        <button 
          onClick={onNewTask}
          className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
          新建升级任务
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {otaTasks.map(task => (
          <div key={task.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-6 group hover:border-blue-300 transition-all">
            <div className="flex-1 w-full">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-800 text-lg">{task.version}</h4>
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded">{modeMap[task.mode]}</span>
                  </div>
                  <p className="text-xs text-slate-400 font-mono mt-1">{task.id} • 目标车型: {task.targetModel} • 开始时间: {task.startTime}</p>
                </div>
                <span className={`text-[11px] px-2.5 py-1 rounded-full font-bold uppercase ${
                  task.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' :
                  task.status === 'Failed' ? 'bg-rose-50 text-rose-600' : 'bg-blue-50 text-blue-600'
                }`}>
                  {statusMap[task.status]}
                </span>
              </div>
              <div className="mt-5">
                <div className="flex justify-between text-xs text-slate-500 mb-2">
                  <span>分发进度</span>
                  <span className="font-bold text-slate-800">{task.progress}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 rounded-full ${
                      task.status === 'Failed' ? 'bg-rose-500' : 'bg-blue-600'
                    }`}
                    style={{width: `${task.progress}%`}}
                  ></div>
                </div>
              </div>
            </div>
            <div className="shrink-0 flex gap-3 w-full md:w-auto">
              <button className="flex-1 md:flex-none px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                监控详情
              </button>
              {task.status === 'In Progress' && (
                <button className="flex-1 md:flex-none px-5 py-2.5 bg-rose-50 text-rose-600 rounded-xl text-sm font-bold hover:bg-rose-100 transition-colors">
                  中止任务
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OTAManagementView;
