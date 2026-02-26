
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';
import { AppView } from '../types';

interface DashboardViewProps {
  onNavigate: (view: AppView) => void;
}

const dataActivity = [
  { name: '周一', active: 4000 },
  { name: '周二', active: 3000 },
  { name: '周三', active: 2000 },
  { name: '周四', active: 2780 },
  { name: '周五', active: 1890 },
  { name: '周六', active: 2390 },
  { name: '周日', active: 3490 },
];

const dataModels = [
  { name: 'Rider Pro', value: 40, color: '#4f46e5' },
  { name: 'Sport', value: 35, color: '#10b981' },
  { name: 'Lite', value: 25, color: '#f59e0b' },
];

const stats = [
  { label: '总用户数', value: '128,450', change: '+12%', color: 'blue' },
  { label: '终端在线率', value: '98.2%', change: '+0.4%', color: 'emerald' },
  { label: '付费转化率', value: '18.5%', change: '+2.1%', color: 'amber' },
  { label: '故障修复率', value: '94.5%', change: '-0.5%', color: 'rose' },
];

const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h3 className="text-xl font-bold text-slate-800">业务核心指标看板</h3>
          <p className="text-sm text-slate-500 mt-1">数据每 5 分钟自动从网联 APP 与整车系统同步。</p>
        </div>
        <div className="flex gap-2">
           <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold shadow-sm hover:bg-slate-50">设置预警阈值</button>
           <button 
            onClick={() => onNavigate(AppView.REPORT_STATS)}
            className="px-4 py-2 bg-[#0F172A] text-white rounded-xl text-xs font-bold shadow-lg hover:bg-slate-800 transition-all"
           >
             查看详细报表
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group hover:border-blue-200 transition-all">
            <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-bl-full -mr-10 -mt-10 group-hover:bg-blue-50 transition-colors"></div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest relative z-10">{stat.label}</p>
            <h3 className="text-3xl font-black text-slate-800 mt-2 relative z-10 tracking-tight">{stat.value}</h3>
            <div className="mt-4 flex items-center gap-2 relative z-10">
              <span className={`text-[11px] font-black px-2 py-0.5 rounded-full ${stat.change.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                {stat.change}
              </span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">环比上月</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm h-[400px]">
          <h3 className="text-lg font-bold text-slate-800 mb-8 flex items-center gap-2">
            用户活跃度趋势
            <span className="text-xs font-medium text-slate-400 bg-slate-50 px-2 py-1 rounded">近 7 天数据</span>
          </h3>
          <ResponsiveContainer width="100%" height="80%">
            <AreaChart data={dataActivity}>
              <defs>
                <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 700}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 700}} />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                labelStyle={{ fontWeight: 800, color: '#1e293b' }}
              />
              <Area type="monotone" name="活跃用户" dataKey="active" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorActive)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm h-[400px]">
          <h3 className="text-lg font-bold text-slate-800 mb-8 flex items-center gap-2">车型分布统计</h3>
          <ResponsiveContainer width="100%" height="70%">
            <PieChart>
              <Pie
                data={dataModels}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {dataModels.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-3 gap-2 mt-4">
            {dataModels.map(m => (
              <div key={m.name} className="text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase">{m.name}</p>
                <p className="text-sm font-black text-slate-800">{m.value}%</p>
                <div className="w-4 h-1 mx-auto mt-1 rounded-full" style={{backgroundColor: m.color}}></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-2xl flex items-center gap-3">
        <svg className="w-5 h-5 text-blue-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <p className="text-xs text-blue-800 font-medium">
          <strong>数据合规提示：</strong> 当前看板展示的位置信息已脱敏处理（仅精确到区县），符合《个人信息保护法》相关要求。导出审计报表前需进行二级管理员授权。
        </p>
      </div>
    </div>
  );
};

export default DashboardView;
