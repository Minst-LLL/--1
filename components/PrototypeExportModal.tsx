
import React, { useState } from 'react';

interface PrototypeExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrototypeExportModal: React.FC<PrototypeExportModalProps> = ({ isOpen, onClose }) => {
  const [downloading, setDownloading] = useState(false);

  if (!isOpen) return null;

  const handleExport = () => {
    setDownloading(true);
    // 模拟生成原型包的过程
    setTimeout(() => {
      setDownloading(false);
      alert('原型交付包（巡翼车联网PC端_原型交付_V2.4.zip）已生成。由于浏览器限制，该压缩包内含 HTML 交互原型、Axure 导入辅助定义文件(.txt)及权限矩阵表，您可以直接在 Axure RP 9 中通过“文件->从RP文件导入”辅助还原或直接使用 HTML 演示。');
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-scaleIn">
        <div className="p-8 space-y-6">
          <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-3xl mx-auto flex items-center justify-center">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">导出原型交付资产</h3>
            <p className="text-sm text-slate-500 mt-2">系统将为您打包巡翼车联网管理平台全量 13 个核心页面的原型逻辑、字段校验规则及权限矩阵说明文档。</p>
          </div>
          
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-3">
             <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-xs font-bold text-slate-600">HTML 交互原型包 (支持 Axure 逆向导入)</span>
             </div>
             <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-xs font-bold text-slate-600">RP 9 专用字段定义列表 (.txt)</span>
             </div>
             <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-xs font-bold text-slate-600">权限分配矩阵与 R155 合规标注文档</span>
             </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button onClick={onClose} className="flex-1 py-3 font-bold text-slate-500 hover:bg-slate-50 rounded-2xl transition-all">取消</button>
            <button 
              onClick={handleExport}
              disabled={downloading}
              className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-2xl shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
            >
              {downloading ? (
                 <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  打包中...
                 </>
              ) : '开始生成下载'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrototypeExportModal;
