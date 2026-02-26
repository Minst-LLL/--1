
import React, { useState } from 'react';
import { ConfigTemplate } from '../types';

const initialTemplates: ConfigTemplate[] = [
  { id: 'TMP-001', name: '巡翼 250 基础版', targetModels: ['巡翼 Rider Pro'], features: ['数字钥匙 (3人)', '油耗统计 (周)', '电子围栏 (3km)'], updatedAt: '2024-03-01', status: 'Active' },
  { id: 'TMP-002', name: '巡翼 400 高配版', targetModels: ['巡翼 Sport'], features: ['数字钥匙 (5人)', '哨兵模式 (高灵敏)', '远程锁车', '压弯记录'], updatedAt: '2024-02-28', status: 'Active' },
  { id: 'TMP-003', name: '巡翼 Lite 省电版', targetModels: ['巡翼 Lite'], features: ['基础防盗', '低功耗模式'], updatedAt: '2024-01-15', status: 'Draft' },
];

const VehicleConfigView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'template' | 'model'>('template');
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [configTemplates, setConfigTemplates] = useState<ConfigTemplate[]>(initialTemplates);

  // Create Template Form State
  const [newTemplateName, setNewTemplateName] = useState('');
  const [newSelectedModels, setNewSelectedModels] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState('基础版');
  const [newDescription, setNewDescription] = useState('');

  const handleCreateTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTemplateName || newSelectedModels.length === 0) {
      alert('请填写模板名称并选择至少一个适配车型');
      return;
    }

    const newTemplate: ConfigTemplate = {
      id: `TMP-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      name: newTemplateName,
      targetModels: newSelectedModels,
      features: [newCategory, '默认基础配置'],
      updatedAt: new Date().toISOString().split('T')[0],
      status: 'Draft'
    };

    setConfigTemplates([newTemplate, ...configTemplates]);
    setShowCreateModal(false);
    resetCreateForm();
  };

  const resetCreateForm = () => {
    setNewTemplateName('');
    setNewSelectedModels([]);
    setNewCategory('基础版');
    setNewDescription('');
  };

  const toggleModel = (model: string) => {
    setNewSelectedModels(prev => 
      prev.includes(model) ? prev.filter(m => m !== model) : [...prev, model]
    );
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-slate-800">车辆功能配置云平台</h3>
          <p className="text-sm text-slate-500 mt-1">管理 APP 端车辆功能权限与参数，支持多车型模板化配置。</p>
        </div>
        <div className="flex gap-3">
          <div className="flex bg-white p-1 rounded-xl border border-slate-200">
            <button 
              onClick={() => setActiveTab('template')}
              className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'template' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}
            >
              配置模板
            </button>
            <button 
              onClick={() => setActiveTab('model')}
              className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'model' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}
            >
              车型管理
            </button>
          </div>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="px-5 py-2.5 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
            新增配置模板
          </button>
        </div>
      </div>

      {activeTab === 'template' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {configTemplates.map(tmp => (
            <div key={tmp.id} className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-blue-400 transition-all shadow-sm group relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                 <svg className="w-16 h-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
               </div>
               <div className="flex justify-between items-start mb-4 relative z-10">
                 <div>
                   <h4 className="font-bold text-lg text-slate-800">{tmp.name}</h4>
                   <p className="text-xs text-slate-400 mt-1">ID: {tmp.id}</p>
                 </div>
                 <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${tmp.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                   {tmp.status === 'Active' ? '已启用' : '草稿'}
                 </span>
               </div>

               <div className="space-y-3 mb-6 relative z-10">
                 <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">适配车型</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {tmp.targetModels.map(m => (
                        <span key={m} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs font-bold">{m}</span>
                      ))}
                    </div>
                 </div>
                 <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">核心配置项</span>
                    <ul className="mt-1 space-y-1">
                      {tmp.features.map(f => (
                        <li key={f} className="text-xs font-medium text-slate-600 flex items-center gap-1.5">
                          <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                          {f}
                        </li>
                      ))}
                    </ul>
                 </div>
               </div>

               <div className="flex gap-3 relative z-10">
                 <button onClick={() => setShowConfigModal(true)} className="flex-1 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-white hover:border-blue-400 transition-all">配置功能</button>
                 <button className="flex-1 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-white hover:border-blue-400 transition-all">复制模板</button>
               </div>
            </div>
          ))}
        </div>
      )}

      {/* Mock Model Management Tab */}
      {activeTab === 'model' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
           <div className="w-20 h-20 bg-slate-50 rounded-full mx-auto flex items-center justify-center mb-4">
             <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
           </div>
           <h4 className="text-lg font-bold text-slate-800">车型功能配置矩阵</h4>
           <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">此处可对特定车型进行单独的参数调整（覆盖通用模板）。当前共有 5 个在售车型已绑定配置模板。</p>
           <button className="mt-6 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold shadow-lg">查看车型列表</button>
        </div>
      )}

      {/* Create Template Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h4 className="text-xl font-bold text-slate-800 tracking-tight">新增配置模板</h4>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form id="create-template-form" onSubmit={handleCreateTemplate} className="flex-1 overflow-y-auto p-8 space-y-6">
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">模板名称 <span className="text-rose-500">*</span></label>
                <input 
                  required 
                  type="text" 
                  placeholder="例: 巡翼 500 旗舰版" 
                  className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-bold" 
                  value={newTemplateName}
                  onChange={e => setNewTemplateName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">适配车型 <span className="text-rose-500">*</span></label>
                <div className="grid grid-cols-2 gap-3 mt-1">
                  {['巡翼 Rider Pro', '巡翼 Sport', '巡翼 Lite'].map(m => (
                    <label key={m} className={`flex items-center gap-2 p-3 border rounded-xl cursor-pointer transition-all ${
                      newSelectedModels.includes(m) ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-slate-200 hover:bg-white'
                    }`}>
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded text-blue-600" 
                        checked={newSelectedModels.includes(m)}
                        onChange={() => toggleModel(m)}
                      />
                      <span className={`text-xs font-bold ${newSelectedModels.includes(m) ? 'text-blue-700' : 'text-slate-600'}`}>{m}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">功能分类 <span className="text-rose-500">*</span></label>
                <select 
                  required 
                  className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-bold" 
                  value={newCategory} 
                  onChange={e => setNewCategory(e.target.value)}
                >
                  <option value="基础版">基础版</option>
                  <option value="性能版">性能版</option>
                  <option value="舒适版">舒适版</option>
                  <option value="安全版">安全版</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">模板描述</label>
                <textarea 
                  rows={4} 
                  placeholder="描述该模板的适用场景及核心功能特点..." 
                  className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium text-sm"
                  value={newDescription}
                  onChange={e => setNewDescription(e.target.value)}
                ></textarea>
              </div>
            </form>
            <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-end gap-4">
              <button type="button" onClick={() => setShowCreateModal(false)} className="px-8 py-3 font-bold text-slate-600 hover:text-slate-800 transition-colors">取消</button>
              <button 
                form="create-template-form"
                type="submit"
                className="px-10 py-3 bg-blue-600 text-white font-bold rounded-2xl shadow-xl hover:bg-blue-700 transition-all"
              >
                保存模板
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Config Detail Modal */}
      {showConfigModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <div>
                 <h4 className="text-xl font-bold text-slate-800">配置功能参数</h4>
                 <p className="text-xs text-slate-500 mt-1">正在编辑: 巡翼 250 基础版</p>
              </div>
              <button onClick={() => setShowConfigModal(false)} className="text-slate-400 hover:text-slate-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8">
               <div className="space-y-8">
                  {/* Vehicle Info Section */}
                  <section>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                      </div>
                      <h5 className="font-bold text-slate-800">车辆基础信息</h5>
                    </div>
                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 grid grid-cols-2 gap-6">
                       <div>
                          <label className="text-xs font-bold text-slate-500 block mb-2">剩余燃油预警阈值</label>
                          <select className="w-full p-2 rounded-lg border border-slate-200 text-sm font-bold"><option>20%</option><option>10%</option><option>30%</option></select>
                       </div>
                       <div>
                          <label className="text-xs font-bold text-slate-500 block mb-2">电池电压预警值 (V)</label>
                          <input type="number" step="0.1" defaultValue="11.8" className="w-full p-2 rounded-lg border border-slate-200 text-sm font-bold" />
                       </div>
                       <div>
                          <label className="text-xs font-bold text-slate-500 block mb-2">油耗统计周期</label>
                          <select className="w-full p-2 rounded-lg border border-slate-200 text-sm font-bold"><option>自然月</option><option>每周</option></select>
                       </div>
                    </div>
                  </section>

                  {/* Digital Key Section */}
                  <section>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
                      </div>
                      <h5 className="font-bold text-slate-800">数字钥匙配置</h5>
                    </div>
                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-4">
                       <div className="flex items-center justify-between">
                          <label className="text-sm font-bold text-slate-700">感应解锁 (PKE)</label>
                          <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div></div>
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-500 mb-1">授权人数上限</label>
                            <select className="w-full p-2 rounded-lg border border-slate-200 text-sm font-bold"><option>3人</option><option>5人</option></select>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-500 mb-1">临时授权最长时限</label>
                            <select className="w-full p-2 rounded-lg border border-slate-200 text-sm font-bold"><option>24小时</option><option>72小时</option></select>
                          </div>
                       </div>
                    </div>
                  </section>

                  {/* Anti-Theft Section */}
                  <section>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-rose-100 text-rose-600 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                      </div>
                      <h5 className="font-bold text-slate-800">防盗服务配置</h5>
                    </div>
                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-4">
                       <div className="grid grid-cols-2 gap-6">
                          <div>
                             <label className="text-sm font-bold text-slate-700 block mb-2">电子围栏半径范围 (km)</label>
                             <input type="range" className="w-full accent-blue-600" min="0.5" max="10" defaultValue="3" />
                             <div className="flex justify-between text-xs text-slate-400 font-bold mt-1"><span>0.5</span><span>3.0</span><span>10</span></div>
                          </div>
                          <div>
                             <label className="text-sm font-bold text-slate-700 block mb-2">哨兵模式录像角度</label>
                             <select className="w-full p-2 rounded-lg border border-slate-200 text-sm font-bold">
                                <option>主视图</option>
                                <option>主视图 + 后视镜 (需四摄)</option>
                             </select>
                          </div>
                       </div>
                    </div>
                  </section>
               </div>
            </div>

            <div className="p-6 border-t border-slate-100 flex justify-end gap-3">
               <button onClick={() => setShowConfigModal(false)} className="px-6 py-2.5 font-bold text-slate-500 hover:bg-slate-50 rounded-xl transition-all">取消</button>
               <button onClick={() => setShowConfigModal(false)} className="px-8 py-2.5 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">保存配置</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleConfigView;
