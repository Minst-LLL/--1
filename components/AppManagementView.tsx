
import React, { useState } from 'react';

const AppManagementView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'versions' | 'features' | 'push'>('versions');
  const [showVersionModal, setShowVersionModal] = useState(false);
  const [showPushModal, setShowPushModal] = useState(false);
  const [pushStep, setPushStep] = useState(1);

  const versions = [
    { id: 'V2.5.0', type: '正式版', system: 'iOS/Android', models: '全系', status: '已发布', linkedOta: 'OTA-V2.5.0', date: '2024-03-01' },
    { id: 'V2.5.1-Beta', type: '灰度版', system: 'Android', models: '巡翼 Sport', status: '灰度中 (30%)', linkedOta: 'OTA-V2.5.1', date: '2024-03-05' },
    { id: 'V2.6.0', type: '测试版', system: 'iOS', models: '巡翼 Rider Pro', status: '草稿', linkedOta: '-', date: '-' },
  ];

  const appPages = [
    { name: '总稿 (首页)', required: true, isOpen: true, sort: 1 },
    { name: 'OTA 升级入口', required: true, isOpen: true, sort: 5 },
    { name: '我的车库', required: true, isOpen: true, sort: 9 },
    { name: '车辆手册 (H5)', required: false, isOpen: true, sort: 3 },
    { name: '组队骑行', required: false, isOpen: false, sort: 12 },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Tab Navigation */}
      <div className="flex justify-between items-center">
        <div className="flex bg-white p-1 rounded-xl border border-slate-200">
          {[
            { id: 'versions', label: '版本管理' },
            { id: 'features', label: '页面与功能开关' },
            { id: 'push', label: '消息推送' }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === tab.id ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div>
           {activeTab === 'versions' && (
             <button onClick={() => setShowVersionModal(true)} className="px-5 py-2.5 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-all flex items-center gap-2">
               + 新增版本
             </button>
           )}
           {activeTab === 'push' && (
             <button onClick={() => { setShowPushModal(true); setPushStep(1); }} className="px-5 py-2.5 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-all flex items-center gap-2">
               + 新建推送
             </button>
           )}
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6 min-h-[500px]">
        {activeTab === 'versions' && (
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[11px]">
              <tr>
                <th className="px-6 py-4">版本号</th>
                <th className="px-6 py-4">类型</th>
                <th className="px-6 py-4">适配系统</th>
                <th className="px-6 py-4">适配车型</th>
                <th className="px-6 py-4">关联 OTA</th>
                <th className="px-6 py-4">状态</th>
                <th className="px-6 py-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {versions.map(v => (
                <tr key={v.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-black text-slate-800">{v.id}</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 bg-slate-100 rounded text-xs font-bold text-slate-600">{v.type}</span></td>
                  <td className="px-6 py-4 text-slate-500">{v.system}</td>
                  <td className="px-6 py-4 text-slate-500">{v.models}</td>
                  <td className="px-6 py-4">
                     {v.linkedOta !== '-' ? (
                       <span className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded text-xs font-bold flex items-center gap-1 w-fit">
                         <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                         {v.linkedOta}
                       </span>
                     ) : <span className="text-slate-300">-</span>}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-black ${v.status.includes('已发布') ? 'bg-emerald-50 text-emerald-600' : v.status.includes('灰度') ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
                      {v.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button className="text-blue-600 font-bold hover:underline">详情</button>
                    {v.status === '草稿' && <button className="text-slate-400 font-bold hover:text-rose-600">删除</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === 'features' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
                APP 页面入口配置
                <span className="text-xs font-normal text-slate-400 bg-slate-50 px-2 py-1 rounded">控制 APP 端底部导航及快捷功能的显示</span>
              </h4>
              <div className="space-y-3">
                {appPages.map((page, idx) => (
                   <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="flex items-center gap-3">
                         <span className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs font-bold text-slate-400 border border-slate-200">{page.sort}</span>
                         <span className="font-bold text-slate-700">{page.name}</span>
                         {page.required && <span className="text-[10px] text-rose-500 bg-rose-50 px-1.5 py-0.5 rounded font-bold">核心</span>}
                      </div>
                      <div className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${page.isOpen ? 'bg-blue-600' : 'bg-slate-300'}`}>
                         <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${page.isOpen ? 'right-1' : 'left-1'}`}></div>
                      </div>
                   </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold text-lg text-slate-800 mb-4">功能模块参数开关</h4>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-6">
                 <div className="flex justify-between items-start">
                    <div>
                       <h5 className="font-bold text-slate-700">数字钥匙 - 感应解锁</h5>
                       <p className="text-xs text-slate-500 mt-1">需配合车辆蓝牙模块，默认距离 2m</p>
                    </div>
                    <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div></div>
                 </div>
                 <div className="flex justify-between items-start">
                    <div>
                       <h5 className="font-bold text-slate-700">防盗服务 - 哨兵模式</h5>
                       <p className="text-xs text-slate-500 mt-1">仅带摄像头车型可用，录像时长 1min</p>
                    </div>
                    <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div></div>
                 </div>
                 <div className="flex justify-between items-start opacity-60">
                    <div>
                       <h5 className="font-bold text-slate-700">骑行数据 - 压弯记录</h5>
                       <p className="text-xs text-slate-500 mt-1">记录阈值 15°，低于该角度不记录</p>
                    </div>
                    <div className="w-12 h-6 bg-slate-300 rounded-full relative cursor-pointer"><div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div></div>
                 </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'push' && (
          <div className="text-center py-12 text-slate-400">
             <div className="w-20 h-20 bg-slate-50 rounded-full mx-auto flex items-center justify-center mb-4">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
             </div>
             <p className="font-bold text-lg text-slate-600">暂无待发送的推送任务</p>
             <p className="text-sm mt-2">请点击右上角“新建推送”创建通知任务。</p>
          </div>
        )}
      </div>

      {/* New Version Modal */}
      {showVersionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
             <h4 className="text-xl font-bold text-slate-800 mb-6">新增 APP 版本</h4>
             <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                   <div>
                      <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">版本号 <span className="text-rose-500">*</span></label>
                      <input type="text" placeholder="V2.x.x" className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl font-bold outline-none" />
                   </div>
                   <div>
                      <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">版本类型</label>
                      <div className="flex bg-slate-100 p-1 rounded-xl">
                         <button className="flex-1 py-2 bg-white rounded-lg shadow-sm text-xs font-bold">正式版</button>
                         <button className="flex-1 py-2 text-slate-500 text-xs font-bold">灰度版</button>
                         <button className="flex-1 py-2 text-slate-500 text-xs font-bold">测试版</button>
                      </div>
                   </div>
                </div>
                <div>
                   <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">适配系统 <span className="text-rose-500">*</span></label>
                   <div className="flex gap-4">
                      <label className="flex items-center gap-2 font-bold text-slate-700"><input type="checkbox" className="w-4 h-4 rounded text-blue-600" defaultChecked /> iOS</label>
                      <label className="flex items-center gap-2 font-bold text-slate-700"><input type="checkbox" className="w-4 h-4 rounded text-blue-600" defaultChecked /> Android</label>
                   </div>
                </div>
                <div>
                   <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">关联 OTA 升级包</label>
                   <select className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl font-bold outline-none">
                      <option>不关联</option>
                      <option>OTA-V2.5.0 (已测试)</option>
                   </select>
                   <p className="text-[10px] text-blue-600 mt-1 font-bold">关联后，“更新内容”将自动同步 OTA 升级日志。</p>
                </div>
                <div>
                   <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">更新内容</label>
                   <textarea rows={4} className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl font-medium outline-none text-sm"></textarea>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div>
                      <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">iOS 下载链接</label>
                      <input type="text" placeholder="App Store URL" className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl font-bold outline-none text-sm" />
                   </div>
                   <div>
                      <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Android 下载链接</label>
                      <input type="text" placeholder="HTTP/HTTPS" className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl font-bold outline-none text-sm" />
                   </div>
                </div>
             </div>
             <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-slate-100">
                <button onClick={() => setShowVersionModal(false)} className="px-6 py-3 font-bold text-slate-500 hover:bg-slate-50 rounded-xl transition-all">取消</button>
                <button className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-all">保存并提交审核</button>
             </div>
          </div>
        </div>
      )}

      {/* Push Notification Wizard Modal */}
      {showPushModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-8">
             <div className="flex justify-between items-center mb-6">
                <h4 className="text-xl font-bold text-slate-800">新建消息推送 ({pushStep}/3)</h4>
                <div className="flex gap-1">
                   {[1, 2, 3].map(s => <div key={s} className={`w-2 h-2 rounded-full ${pushStep >= s ? 'bg-blue-600' : 'bg-slate-200'}`}></div>)}
                </div>
             </div>
             
             {pushStep === 1 && (
               <div className="space-y-4 animate-fadeIn">
                  <div>
                     <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">推送标题 <span className="text-rose-500">*</span></label>
                     <input type="text" className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl font-bold outline-none" placeholder="限 30 字" />
                  </div>
                  <div>
                     <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">推送类型</label>
                     <div className="grid grid-cols-3 gap-3">
                        {['系统通知', '功能提醒', '营销活动'].map(t => (
                           <button key={t} className="py-3 border border-slate-200 rounded-xl font-bold text-sm hover:border-blue-500 hover:text-blue-600 transition-all focus:border-blue-600 focus:bg-blue-50 focus:text-blue-700">{t}</button>
                        ))}
                     </div>
                  </div>
                  <div>
                     <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">推送范围</label>
                     <select className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl font-bold outline-none">
                        <option>全部用户</option>
                        <option>指定车型 (如：巡翼 Rider Pro)</option>
                        <option>OTA 待升级用户</option>
                     </select>
                  </div>
               </div>
             )}

             {pushStep === 2 && (
               <div className="space-y-4 animate-fadeIn">
                  <div>
                     <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">文本内容 <span className="text-rose-500">*</span></label>
                     <textarea rows={4} className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl font-medium outline-none text-sm" placeholder="限 100 字，支持 {车型名称} 等变量"></textarea>
                     <div className="flex gap-2 mt-2">
                        <button className="text-[10px] bg-slate-100 px-2 py-1 rounded font-bold text-slate-500 hover:bg-slate-200">+ 车型名称</button>
                        <button className="text-[10px] bg-slate-100 px-2 py-1 rounded font-bold text-slate-500 hover:bg-slate-200">+ 升级版本</button>
                     </div>
                  </div>
                  <div>
                     <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">跳转链接</label>
                     <select className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl font-bold outline-none">
                        <option>无跳转</option>
                        <option>H5: 车辆保养手册</option>
                        <option>APP: 车辆体检页</option>
                     </select>
                  </div>
               </div>
             )}

             {pushStep === 3 && (
               <div className="space-y-4 animate-fadeIn">
                  <div>
                     <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">推送时间</label>
                     <div className="flex bg-slate-100 p-1 rounded-xl mb-3">
                         <button className="flex-1 py-2 bg-white rounded-lg shadow-sm text-xs font-bold">立即推送</button>
                         <button className="flex-1 py-2 text-slate-500 text-xs font-bold">定时推送</button>
                      </div>
                  </div>
                  <div>
                     <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">重复策略</label>
                     <select className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl font-bold outline-none">
                        <option>不重复</option>
                        <option>每日重复</option>
                     </select>
                  </div>
                  <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl flex gap-3 items-start">
                     <svg className="w-5 h-5 text-amber-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                     <p className="text-xs text-amber-700 font-bold">请注意：营销类推送每天限发 1 次，系统将自动拦截过频请求。</p>
                  </div>
               </div>
             )}

             <div className="flex justify-between mt-8 pt-6 border-t border-slate-100">
                {pushStep > 1 ? (
                   <button onClick={() => setPushStep(pushStep - 1)} className="px-6 py-3 font-bold text-slate-600 hover:bg-slate-50 rounded-xl transition-all">上一步</button>
                ) : (
                   <button onClick={() => setShowPushModal(false)} className="px-6 py-3 font-bold text-slate-500 hover:bg-slate-50 rounded-xl transition-all">取消</button>
                )}
                
                {pushStep < 3 ? (
                   <button onClick={() => setPushStep(pushStep + 1)} className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-all">下一步</button>
                ) : (
                   <button onClick={() => setShowPushModal(false)} className="px-8 py-3 bg-[#0F172A] text-white font-bold rounded-xl shadow-lg hover:bg-slate-800 transition-all">确认发布</button>
                )}
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppManagementView;
