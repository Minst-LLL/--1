
import React from 'react';
import { FaultTicket } from '../types';

const tickets: FaultTicket[] = [
  { id: 'TICK-901', vin: 'XY-VIN-9921', type: 'ECU 故障', severity: 'High', status: 'Open', createdAt: '2024-03-01 10:20', description: '检测到发动机控制模块数据不匹配。' },
  { id: 'TICK-902', vin: 'XY-VIN-8832', type: 'IOT 离线', severity: 'Medium', status: 'Processing', createdAt: '2024-03-01 11:45', description: '联网模块信号强度低于阈值。' },
  { id: 'TICK-903', vin: 'XY-VIN-1234', type: 'ABS 异常', severity: 'High', status: 'Open', createdAt: '2024-03-01 14:10', description: 'ABS 传感器持续报告 44 号错误码。' },
  { id: 'TICK-889', vin: 'XY-VIN-2210', type: '电池电压低', severity: 'Low', status: 'Closed', createdAt: '2024-02-28 09:30', description: '电压水平 11.2V，维修人员已更换电池。' },
];

const FaultTicketView: React.FC = () => {
  const statusMap: Record<string, string> = {
    'Open': '待处理',
    'Processing': '处理中',
    'Closed': '已闭环'
  };

  const severityMap: Record<string, string> = {
    'High': '高危',
    'Medium': '中等',
    'Low': '低危'
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 text-white shadow-lg shadow-blue-200">
        <h3 className="text-xl font-bold">故障实时监控</h3>
        <p className="text-blue-100 mt-1 opacity-80">当前监控 1,240 辆车辆。有 3 个待处理的高危故障需要立即关注。</p>
        <div className="flex gap-4 mt-6">
          <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20">
            <span className="text-sm font-medium">高危故障</span>
            <p className="text-2xl font-bold">03</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20">
            <span className="text-sm font-medium">处理中</span>
            <p className="text-2xl font-bold">12</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20">
            <span className="text-sm font-medium">平均修复时长</span>
            <p className="text-2xl font-bold">4.2h</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center">
          <h4 className="font-bold text-slate-700">最近上报故障</h4>
          <button className="text-xs text-blue-600 font-bold hover:underline">解决方案知识库</button>
        </div>
        <div className="divide-y divide-slate-100">
          {tickets.map(ticket => (
            <div key={ticket.id} className="p-6 hover:bg-slate-50 transition-colors flex flex-col md:flex-row gap-6">
              <div className="md:w-48 shrink-0">
                <div className={`text-[10px] font-black tracking-widest uppercase mb-1 ${
                  ticket.severity === 'High' ? 'text-rose-500' : ticket.severity === 'Medium' ? 'text-amber-500' : 'text-blue-500'
                }`}>
                  {severityMap[ticket.severity]} 等级
                </div>
                <h5 className="font-bold text-slate-800">{ticket.id}</h5>
                <p className="text-xs text-slate-400 mt-1">{ticket.createdAt}</p>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded">{ticket.type}</span>
                  <span className="text-sm font-bold text-blue-600">{ticket.vin}</span>
                </div>
                <p className="text-sm text-slate-600 line-clamp-2">{ticket.description}</p>
              </div>
              <div className="md:w-32 flex flex-col items-end justify-center gap-2">
                <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                  ticket.status === 'Open' ? 'bg-rose-50 text-rose-600' : 
                  ticket.status === 'Processing' ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-400'
                }`}>
                  {statusMap[ticket.status]}
                </span>
                <button className="text-xs font-bold text-blue-600 border border-blue-200 px-3 py-1 rounded hover:bg-blue-50 transition-colors">
                  处理工单
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaultTicketView;
