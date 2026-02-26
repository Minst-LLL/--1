
import React, { useState } from 'react';
import { H5Page, AppCopywriting } from '../types';

const h5Pages: H5Page[] = [
  { id: 'H5-001', title: '车辆手册 - 巡翼 Rider Pro', type: 'Manual', targetModels: ['Rider Pro'], status: 'Published', views: 12450, updatedBy: 'Admin', updatedAt: '2024-03-01' },
  { id: 'H5-002', title: '在线报修流程', type: 'Repair', targetModels: ['全系车型'], status: 'Review', views: 0, updatedBy: 'Ops_Zhang', updatedAt: '2024-03-05' },
  { id: 'H5-003', title: '春季保养活动页', type: 'Guide', targetModels: ['Sport', 'Lite'], status: 'Draft', views: 0, updatedBy: 'Ops_Zhang', updatedAt: '2024-03-06' },
];

const copywritings: AppCopywriting[] = [
  { id: 'CP-101', content: '您的车辆【{model}】已发生震动告警，请及时查看。', scene: '推送通知 - 防盗', languages: ['CN', 'EN'], status: 'Enabled', updatedAt: '2024-02-10' },
  { id: 'CP-102', content: 'Digital Key Connected Successfully', scene: '蓝牙连接提示', languages: ['EN'], status: 'Enabled', updatedAt: '2024-01-20' },
];

const AppContentMngView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'h5' | 'copy'>('h5');
  const [showH5Editor, setShowH5Editor] = useState(false);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-slate-800">APP 内容与文案管理</h3>
          <p className="text-sm text-slate-500 mt-1">统一管理 APP 内嵌 H5 页面及全场景多语言文案，支持可视化编辑。</p>
        </div>
        <div className="flex gap-3">
          <div className="flex bg-white p-1 rounded-xl border border-slate-200">
            <button 
              onClick={() => setActiveTab('h5')}
              className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'h5' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}
            >
              H5 页面管理
            </button>
            <button 
              onClick={() => setActiveTab('copy')}
              className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'copy' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}
            >
              文案配置
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'h5' && (
        <div className="space-y-4 animate-fadeIn">
           <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex gap-4">
                 <select className="bg-slate-50 border border-slate-200 text-sm font-bold p-2 rounded-lg outline-none"><option>全部类型</option><option>车辆手册</option><option>在线报修</option></select>
                 <select className="bg-slate-50 border border-slate-200 text-sm font-bold p-2 rounded-lg outline-none"><option>全部状态</option><option>已发布</option><option>草稿</option></select>
              </div>
              <button onClick={() => setShowH5Editor(true)} className="px-5 py-2 bg-blue-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">
                 + 新增 H5 页面
              </button>
           </div>

           <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[11px]">
                  <tr>
                    <th className="px-6 py-4">页面名称</th>
                    <th className="px-6 py-4">类型</th>
                    <th className="px-6 py-4">适配车型</th>
                    <th className="px-6 py-4">访问量</th>
                    <th className="px-6 py-4">状态</th>
                    <th className="px-6 py-4">最后更新</th>
                    <th className="px-6 py-4 text-right">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {h5Pages.map(page => (
                    <tr key={page.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-900">{page.title}</td>
                      <td className="px-6 py-4"><span className="px-2 py-1 bg-slate-100 rounded text-xs font-bold">{page.type}</span></td>
                      <td className="px-6 py-4 text-xs text-slate-500 truncate max-w-[150px]">{page.targetModels.join(', ')}</td>
                      <td className="px-6 py-4 font-mono">{page.views.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                          page.status === 'Published' ? 'bg-emerald-50 text-emerald-600' :
                          page.status === 'Review' ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-400'
                        }`}>
                          {page.status === 'Published' ? '已发布' : page.status === 'Review' ? '审核中' : '草稿'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-500">{page.updatedAt}<br/>by {page.updatedBy}</td>
                      <td className="px-6 py-4 text-right space-x-3">
                         <button onClick={() => setShowH5Editor(true)} className="text-blue-600 font-black hover:underline">编辑</button>
                         <button className="text-slate-400 font-black hover:text-slate-600">预览</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
           </div>
        </div>
      )}

      {activeTab === 'copy' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {copywritings.map(copy => (
               <div key={copy.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all">
                  <div className="flex justify-between items-start mb-3">
                     <span className="px-2 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase rounded">{copy.scene}</span>
                     <div className="flex gap-1">
                        {copy.languages.map(lang => <span key={lang} className="w-5 h-5 bg-slate-100 rounded flex items-center justify-center text-[10px] font-bold text-slate-500">{lang}</span>)}
                     </div>
                  </div>
                  <p className="font-bold text-slate-800 text-sm mb-4 line-clamp-2">{copy.content}</p>
                  <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                     <span className="text-xs text-slate-400 font-medium">更新于: {copy.updatedAt}</span>
                     <button className="text-blue-600 text-xs font-black hover:underline">编辑文案</button>
                  </div>
               </div>
             ))}
             <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-slate-400 hover:border-blue-400 hover:bg-blue-50/10 cursor-pointer transition-all min-h-[160px]">
                <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                <span className="text-sm font-bold">新增场景文案</span>
             </div>
          </div>
        </div>
      )}

      {/* Mock H5 Visual Editor Modal */}
      {showH5Editor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-6xl h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex">
             {/* Left: Components */}
             <div className="w-64 bg-slate-50 border-r border-slate-200 p-4 flex flex-col">
                <h5 className="font-black text-slate-400 uppercase text-xs tracking-widest mb-4">组件库</h5>
                <div className="space-y-2 flex-1 overflow-y-auto">
                   {['文本段落', '图片轮播', '功能按钮', '列表项', '表单输入', '视频播放'].map(c => (
                     <div key={c} className="p-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 cursor-move hover:shadow-md transition-all flex items-center gap-2">
                        <div className="w-4 h-4 bg-slate-200 rounded"></div> {c}
                     </div>
                   ))}
                </div>
             </div>

             {/* Center: Canvas */}
             <div className="flex-1 bg-slate-100 flex items-center justify-center p-8 relative">
                <div className="w-[375px] h-[667px] bg-white rounded-[3rem] border-8 border-slate-800 shadow-2xl overflow-hidden relative">
                   <div className="absolute top-0 left-0 right-0 h-6 bg-slate-800 flex justify-center"><div className="w-32 h-4 bg-black rounded-b-xl"></div></div>
                   <div className="mt-8 px-4">
                      <div className="h-40 bg-slate-100 rounded-xl mb-4 flex items-center justify-center text-slate-300 font-bold">Banner 占位</div>
                      <h2 className="text-xl font-black text-slate-800 mb-2">车辆保养手册</h2>
                      <p className="text-sm text-slate-500 mb-4">适用于巡翼 Rider Pro 2024 款</p>
                      <div className="space-y-2">
                         <div className="p-3 border border-slate-100 rounded-lg flex justify-between items-center"><span className="text-sm font-bold">1. 磨合期注意事项</span> <span className="text-slate-400">&gt;</span></div>
                         <div className="p-3 border border-slate-100 rounded-lg flex justify-between items-center"><span className="text-sm font-bold">2. 机油更换周期</span> <span className="text-slate-400">&gt;</span></div>
                      </div>
                      <button className="w-full mt-6 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm">预约保养</button>
                   </div>
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                   <button className="px-4 py-2 bg-white rounded-lg shadow font-bold text-xs">预览</button>
                   <button className="px-4 py-2 bg-white rounded-lg shadow font-bold text-xs">保存草稿</button>
                </div>
             </div>

             {/* Right: Properties */}
             <div className="w-72 bg-white border-l border-slate-200 p-6 flex flex-col">
                <div className="flex justify-between items-center mb-6">
                   <h5 className="font-bold text-slate-800">页面属性</h5>
                   <button onClick={() => setShowH5Editor(false)} className="text-slate-400 hover:text-slate-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg></button>
                </div>
                <div className="space-y-4 flex-1">
                   <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">页面标题</label>
                      <input type="text" defaultValue="车辆保养手册" className="w-full p-2 border border-slate-200 rounded-lg text-sm font-bold" />
                   </div>
                   <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">页面类型</label>
                      <select className="w-full p-2 border border-slate-200 rounded-lg text-sm font-bold"><option>Manual (手册)</option></select>
                   </div>
                   <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">适配车型</label>
                      <div className="flex flex-wrap gap-2">
                         <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded flex items-center gap-1">Rider Pro <button>×</button></span>
                         <button className="px-2 py-1 border border-dashed border-slate-300 rounded text-xs text-slate-400">+</button>
                      </div>
                   </div>
                </div>
                <button onClick={() => setShowH5Editor(false)} className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">发布页面</button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppContentMngView;
