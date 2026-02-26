
import React, { useState, useRef } from 'react';
import { OTAPackage } from '../types';

const initialPackages: OTAPackage[] = [
  { id: 'PKG-001', version: 'V1.2.0', type: 'ECU', targetModels: ['巡翼 Rider Pro', '巡翼 Sport'], status: 'Released', uploader: 'Admin', uploadTime: '2024-03-01', size: '45.2 MB', changelog: '修复低温环境下电控介入延迟问题。' },
  { id: 'PKG-002', version: 'V2.5.1', type: 'App', targetModels: ['全系车型'], status: 'Testing', uploader: 'Engineer_Li', uploadTime: '2024-03-05', size: '128.5 MB', changelog: '全新组队功能上线。' },
  { id: 'PKG-003', version: 'V1.1.9', type: 'ECU', targetModels: ['巡翼 Lite'], status: 'Deprecated', uploader: 'Admin', uploadTime: '2024-02-10', size: '38.1 MB', changelog: '初始版本。' },
];

const OTAPackageMngView: React.FC = () => {
  const [packages, setPackages] = useState<OTAPackage[]>(initialPackages);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  // Form State
  const [packageType, setPackageType] = useState<'App' | 'ECU' | 'Dual'>('App');
  const [version, setVersion] = useState('');
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [changelog, setChangelog] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const extension = file.name.split('.').pop()?.toLowerCase();
      if (extension === 'bin' || extension === 'zip') {
        setSelectedFile(file);
      } else {
        alert('仅支持 .bin 或 .zip 格式的文件');
        e.target.value = '';
      }
    }
  };

  const toggleModel = (model: string) => {
    setSelectedModels(prev => 
      prev.includes(model) ? prev.filter(m => m !== model) : [...prev, model]
    );
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !version || selectedModels.length === 0 || !changelog) {
      alert('请填写所有必填项并上传文件');
      return;
    }

    setUploading(true);
    
    // Simulate upload delay
    setTimeout(() => {
      const newPkg: OTAPackage = {
        id: `PKG-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
        version,
        type: packageType,
        targetModels: selectedModels,
        status: 'Testing',
        uploader: 'Admin',
        uploadTime: new Date().toISOString().split('T')[0],
        size: `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`,
        changelog
      };

      setPackages([newPkg, ...packages]);
      setUploading(false);
      setShowUploadModal(false);
      resetForm();
    }, 1500);
  };

  const resetForm = () => {
    setPackageType('App');
    setVersion('');
    setSelectedModels([]);
    setChangelog('');
    setSelectedFile(null);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-slate-800">OTA 资源仓库</h3>
          <p className="text-sm text-slate-500 mt-1">上传及管理网联 APP 与电控系统升级包（.bin / .zip）。</p>
        </div>
        <button 
          onClick={() => setShowUploadModal(true)}
          className="px-6 py-2.5 bg-[#0F172A] text-white font-bold rounded-xl shadow-lg hover:bg-slate-800 transition-all flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
          上传升级包
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
            <tr>
              <th className="px-6 py-4">版本号</th>
              <th className="px-6 py-4">类型</th>
              <th className="px-6 py-4">适配车型</th>
              <th className="px-6 py-4">大小</th>
              <th className="px-6 py-4">状态</th>
              <th className="px-6 py-4">上传记录</th>
              <th className="px-6 py-4 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
            {packages.map(pkg => (
              <tr key={pkg.id} className="hover:bg-slate-50/80 transition-colors group">
                <td className="px-6 py-4 font-black text-slate-900">{pkg.version}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black ${pkg.type === 'ECU' ? 'bg-purple-50 text-purple-600' : pkg.type === 'App' ? 'bg-blue-50 text-blue-600' : 'bg-indigo-50 text-indigo-600'}`}>
                    {pkg.type === 'ECU' ? '电控系统' : pkg.type === 'App' ? '网联 APP' : '双模组'}
                  </span>
                </td>
                <td className="px-6 py-4 text-xs max-w-[180px] truncate text-slate-500">{pkg.targetModels.join(', ')}</td>
                <td className="px-6 py-4 font-mono text-slate-400 text-xs">{pkg.size}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-black ${
                    pkg.status === 'Released' ? 'bg-emerald-50 text-emerald-600' :
                    pkg.status === 'Testing' ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-400'
                  }`}>
                    {pkg.status === 'Released' ? '已发布' : pkg.status === 'Testing' ? '测试中' : '已废弃'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-[11px]">
                    <p className="font-black text-slate-800">{pkg.uploader}</p>
                    <p className="text-slate-400">{pkg.uploadTime}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                   <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-blue-600 font-black hover:underline">编辑</button>
                      <button className="text-slate-400 font-black hover:text-rose-600">废弃</button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h4 className="text-xl font-bold text-slate-800 tracking-tight">上传新升级包</h4>
              <button onClick={() => setShowUploadModal(false)} className="text-slate-400 hover:text-slate-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form id="upload-form" onSubmit={handleUpload} className="flex-1 overflow-y-auto p-8 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">资源类型 <span className="text-rose-500">*</span></label>
                  <select 
                    required 
                    className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-bold" 
                    value={packageType} 
                    onChange={e => setPackageType(e.target.value as any)}
                  >
                    <option value="App">网联 APP 包</option>
                    <option value="ECU">电控固件包</option>
                    <option value="Dual">组合包</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">版本号 <span className="text-rose-500">*</span></label>
                  <input 
                    required 
                    type="text" 
                    placeholder="例: V1.2.0" 
                    className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-bold" 
                    value={version}
                    onChange={e => setVersion(e.target.value)}
                  />
                </div>
              </div>

              {/* Link App Version */}
              {packageType === 'App' && (
                 <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <label className="block text-xs font-black text-blue-500 uppercase tracking-widest mb-2">关联 APP 版本 (可选)</label>
                    <select className="w-full bg-white border border-blue-200 p-3 rounded-xl font-bold outline-none text-blue-900">
                       <option value="">不关联</option>
                       <option value="v2.5">APP V2.5.0 (已发布)</option>
                    </select>
                    <p className="text-[10px] text-blue-400 mt-2 font-bold">关联后，APP 更新内容将自动同步 OTA 升级日志。</p>
                 </div>
              )}

              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">文件上传 <span className="text-rose-500">*</span></label>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  className="hidden" 
                  accept=".bin,.zip"
                />
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all group cursor-pointer ${
                    selectedFile ? 'border-emerald-500 bg-emerald-50/30' : 'border-slate-200 bg-slate-50/50 hover:border-blue-500'
                  }`}
                >
                  {selectedFile ? (
                    <div className="flex flex-col items-center">
                      <svg className="w-10 h-10 text-emerald-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <p className="text-sm font-bold text-emerald-700">{selectedFile.name}</p>
                      <p className="text-[10px] text-emerald-500 mt-1">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                      <button 
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setSelectedFile(null); }}
                        className="mt-3 text-xs text-rose-500 font-bold hover:underline"
                      >
                        重新选择
                      </button>
                    </div>
                  ) : (
                    <>
                      <svg className="w-10 h-10 text-slate-300 group-hover:text-blue-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                      <p className="text-sm font-bold text-slate-500">点击上传文件</p>
                      <p className="text-[10px] text-slate-400 mt-1">仅支持 .bin / .zip 格式，且文件不超过 200MB</p>
                    </>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">适配车型 <span className="text-rose-500">*</span></label>
                <div className="grid grid-cols-3 gap-3 mt-1">
                  {['巡翼 Rider Pro', '巡翼 Sport', '巡翼 Lite'].map(m => (
                    <label key={m} className={`flex items-center gap-2 p-3 border rounded-xl cursor-pointer transition-all ${
                      selectedModels.includes(m) ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-slate-200 hover:bg-white'
                    }`}>
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded text-blue-600" 
                        checked={selectedModels.includes(m)}
                        onChange={() => toggleModel(m)}
                      />
                      <span className={`text-xs font-bold ${selectedModels.includes(m) ? 'text-blue-700' : 'text-slate-600'}`}>{m}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">更新日志 <span className="text-rose-500">*</span></label>
                <textarea 
                  required 
                  rows={4} 
                  placeholder="描述本次更新的核心内容 (如关联 APP，可自动填充)..." 
                  className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium text-sm"
                  value={changelog}
                  onChange={e => setChangelog(e.target.value)}
                ></textarea>
              </div>
            </form>
            <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-end gap-4">
              <button onClick={() => setShowUploadModal(false)} className="px-8 py-3 font-bold text-slate-600 hover:text-slate-800 transition-colors">取消</button>
              <button 
                form="upload-form"
                type="submit"
                disabled={uploading}
                className="px-10 py-3 bg-[#0F172A] text-white font-bold rounded-2xl shadow-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {uploading ? (
                   <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    正在校验文件...
                   </>
                ) : '确认上传并存入仓库'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OTAPackageMngView;
