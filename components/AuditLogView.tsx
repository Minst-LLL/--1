
import React from 'react';

const logs = [
  { id: 1, user: 'admin@xunyi.com', action: '创建 OTA 任务', resource: '固件 v2.5.0 (全量)', ip: '192.168.1.45', time: '2024-03-01 15:30:12', result: '成功' },
  { id: 2, user: 'op_zhang@xunyi.com', action: '用户数据导出', resource: '上海车主名单 (脱敏)', ip: '10.0.4.12', time: '2024-03-01 14:22:05', result: '成功' },
  { id: 3, user: 'dev_lee@xunyi.com', action: '下发清除故障指令', resource: 'VIN-1234 (ABS 传感器)', ip: '127.0.0.1', time: '2024-03-01 14:15:33', result: '成功' },
  { id: 4, user: 'admin@xunyi.com', action: '配置脱敏规则', resource: '轨迹信息留存期改为 365 天', ip: '192.168.1.45', time: '2024-03-01 10:05:01', result: '成功' },
  { id: 5, user: 'system_bot', action: '数据库凌晨冷备份', resource: '全量数据快照 (Bak_0301)', ip: 'Internal', time: '2024-03-01 02:00:00', result: '成功' },
];

const AuditLogView: React.FC = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-slate-800">系统审计日志</h3>
          <p className="text-sm text-slate-500 mt-1">记录所有核心操作流水，符合 R155 网络安全认证要求。日志不可被任何管理员删除或篡改。</p>
        </div>
        <button className="px-6 py-2.5 bg-white border border-slate-200 text-[#0F172A] rounded-xl text-sm font-bold shadow-sm hover:bg-slate-50 flex items-center gap-2">
           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
           导出合规审计报表
        </button>
      </div>

      <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-1 w-full">
          <div className="relative">
             <input type="text" placeholder="搜索操作人 / IP" className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500" />
             <svg className="w-4 h-4 absolute left-3 top-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
          <select className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-sm outline-none font-bold">
            <option>全部操作类型</option>
            <option>OTA 发布</option>
            <option>故障处理</option>
            <option>合规配置</option>
            <option>数据导出</option>
          </select>
          <input type="date" className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-sm font-bold" />
          <button className="bg-[#0F172A] text-white rounded-xl text-sm font-bold py-2 hover:bg-slate-800 transition-all">应用筛选</button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50/50 border-b border-slate-200 text-slate-500 font-black uppercase tracking-widest text-[10px]">
            <tr>
              <th className="px-6 py-5">时间戳</th>
              <th className="px-6 py-5">操作员</th>
              <th className="px-6 py-5">动作类型</th>
              <th className="px-6 py-5">涉及资源详情</th>
              <th className="px-6 py-5">IP / 节点</th>
              <th className="px-6 py-5">状态</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700 font-mono text-[12px]">
            {logs.map(log => (
              <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 text-slate-400 font-medium">{log.time}</td>
                <td className="px-6 py-4 font-black text-slate-800">{log.user}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black ${
                    log.action.includes('导出') ? 'bg-amber-100 text-amber-700' :
                    log.action.includes('配置') ? 'bg-rose-100 text-rose-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {log.action}
                  </span>
                </td>
                <td className="px-6 py-4 truncate max-w-xs font-medium">{log.resource}</td>
                <td className="px-6 py-4 text-slate-400 font-medium">{log.ip}</td>
                <td className="px-6 py-4">
                   <div className="flex items-center gap-1.5 text-emerald-600 font-black">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                      {log.result}
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="flex items-center gap-4 p-6 bg-slate-900 rounded-3xl text-white shadow-xl shadow-slate-200">
        <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shrink-0">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A3.323 3.323 0 0010.605 3h1.05a3.323 3.323 0 00.66 1.984l.063.102a.5.5 0 010 .52l-.063.102A3.323 3.323 0 0010.605 15h1.05a3.323 3.323 0 00.66-1.984l.063-.102a.5.5 0 010-.52l-.063-.102A3.323 3.323 0 0010.605 9h1.05z" /></svg>
        </div>
        <div>
           <h4 className="font-bold">合规存证说明</h4>
           <p className="text-xs text-slate-400 mt-1 leading-relaxed">
             巡翼智能网联平台所有日志均采用链式存储并进行数字签名校验。根据 R155 认证及国内车联网安全标准，管理员日志留存期设定为 365 天。关键动作（如全量升级推送）将触发短信二次验证。
           </p>
        </div>
      </div>
    </div>
  );
};

export default AuditLogView;
