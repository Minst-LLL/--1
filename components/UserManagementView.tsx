
import React, { useState } from 'react';
import { User } from '../types';

const mockUsers: User[] = [
  // Fixed: Added missing 'role' property to comply with User interface
  { id: '1001', username: '张三', phone: '138****5678', boundVehicle: 'XY-2024-001', appVersion: 'v2.4.1', serviceStatus: 'Active', registerDate: '2023-12-01', role: 'CarOwner' },
  { id: '1002', username: '李四', phone: '139****1234', boundVehicle: 'XY-2024-042', appVersion: 'v2.4.0', serviceStatus: 'Expired', registerDate: '2023-11-15', role: 'CarOwner' },
  { id: '1003', username: '王五', phone: '137****8888', boundVehicle: 'XY-2024-129', appVersion: 'v2.3.9', serviceStatus: 'Active', registerDate: '2024-01-10', role: 'Engineer' },
  { id: '1004', username: '赵六', phone: '150****4433', boundVehicle: 'XY-2024-210', appVersion: 'v2.4.1', serviceStatus: 'Pending', registerDate: '2024-02-28', role: 'CarOwner' },
];

const UserManagementView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const statusMap: Record<string, string> = {
    'Active': '活跃',
    'Expired': '已到期',
    'Pending': '待处理'
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative flex-1 w-full">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </span>
          <input 
            type="text" 
            placeholder="搜索用户名、手机号或车架号..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-slate-800 text-white text-sm font-medium rounded-lg hover:bg-slate-700 transition-colors">
            导出数据
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-500 transition-colors">
            + 手动添加
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium">
              <tr>
                <th className="px-6 py-4">用户 ID</th>
                <th className="px-6 py-4">用户名</th>
                <th className="px-6 py-4">绑定车辆</th>
                <th className="px-6 py-4">APP 版本</th>
                <th className="px-6 py-4">服务状态</th>
                <th className="px-6 py-4">注册日期</th>
                <th className="px-6 py-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {mockUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs">{user.id}</td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold">{user.username}</p>
                      <p className="text-xs text-slate-400">{user.phone}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-blue-600">{user.boundVehicle}</td>
                  <td className="px-6 py-4">{user.appVersion}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      user.serviceStatus === 'Active' ? 'bg-emerald-50 text-emerald-600' : 
                      user.serviceStatus === 'Expired' ? 'bg-rose-50 text-rose-600' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {statusMap[user.serviceStatus]}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400">{user.registerDate}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-blue-600 hover:underline font-medium">详情</button>
                    <button className="ml-3 text-slate-400 hover:text-slate-600">编辑</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <p>当前显示第 1 至 10 条，共 2,450 条数据</p>
          <div className="flex gap-2">
            <button className="p-1 border border-slate-200 rounded disabled:opacity-50" disabled>上一页</button>
            <button className="p-1 px-2 border border-blue-200 bg-blue-50 text-blue-600 rounded">1</button>
            <button className="p-1 px-2 border border-slate-200 rounded">2</button>
            <button className="p-1 border border-slate-200 rounded">下一页</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagementView;