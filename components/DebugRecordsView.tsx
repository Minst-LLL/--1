
import React from 'react';

const DebugRecordsView: React.FC = () => {
  const records = [
    { id: 'DBG-001', vin: 'XY-SAMP-01', engineer: '工程师李', model: 'Rider Pro 样品', status: 'Passed', time: '2024-03-01', content: 'ABS 介入参数校准' },
    { id: 'DBG-002', vin: 'XY-SAMP-02', engineer: '工程师张', model: 'Sport 样品', status: 'Failed', time: '2024-02-28', content: '低温模块初始化测试' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-slate-800">样品调试记录</h3>
          <p className="text-sm text-slate-500 mt-1">记录供应商样品调试及实车测试全流程数据，关联车型适配进度。</p>
        </div>
        <button className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
          录入调试记录
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {records.map(record => (
          <div key={record.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-8 group hover:border-blue-400 transition-all">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center shrink-0">
               <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex justify-between">
                <h4 className="font-black text-slate-800 text-lg flex items-center gap-2">
                  {record.vin} 
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">[{record.model}]</span>
                </h4>
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${record.status === 'Passed' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                  {record.status === 'Passed' ? '测试通过' : '未通过'}
                </span>
              </div>
              <p className="text-sm font-bold text-slate-600">{record.content}</p>
              <div className="flex gap-4 text-xs text-slate-400 font-bold">
                 <span>负责人: {record.engineer}</span>
                 <span>调试时间: {record.time}</span>
              </div>
            </div>
            <div className="shrink-0 flex gap-2">
              <button className="px-4 py-2 text-sm font-bold text-blue-600 hover:bg-blue-50 rounded-lg transition-all">查看报告</button>
              <button className="px-4 py-2 text-sm font-bold text-slate-400 hover:text-slate-600 rounded-lg transition-all">编辑</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DebugRecordsView;
