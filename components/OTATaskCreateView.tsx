
import React, { useState } from 'react';

interface OTATaskCreateViewProps {
  onBack: () => void;
}

const OTATaskCreateView: React.FC<OTATaskCreateViewProps> = ({ onBack }) => {
  const [mode, setMode] = useState<'Full' | 'Batch' | 'Targeted' | 'Scheduled'>('Full');

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
          <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </button>
        <h3 className="text-2xl font-bold text-slate-800">新建升级任务</h3>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
        <div className="p-8 space-y-8">
          {/* Step 1: Select Package */}
          <section>
            <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">第一步：选择升级资源包</label>
            <select className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium">
              <option>请选择已测试通过的升级包...</option>
              <option>V2.5.0-Stable (电控系统 - 巡翼 Rider Pro)</option>
              <option>V1.4.2-Hotfix (网联 APP - 全系车型)</option>
            </select>
          </section>

          {/* Step 2: Select Mode */}
          <section>
            <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">第二步：选择升级模式</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { id: 'Full', label: '全量升级', desc: '全范围推送' },
                { id: 'Batch', label: '分批升级', desc: '按比例推送' },
                { id: 'Targeted', label: '定向升级', desc: '指定 VIN 码' },
                { id: 'Scheduled', label: '预约升级', desc: '定时静默升级' },
              ].map(m => (
                <button 
                  key={m.id}
                  onClick={() => setMode(m.id as any)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    mode === m.id ? 'border-blue-600 bg-blue-50/50' : 'border-slate-100 hover:border-slate-200 bg-white'
                  }`}
                >
                  <p className={`font-bold ${mode === m.id ? 'text-blue-700' : 'text-slate-800'}`}>{m.label}</p>
                  <p className="text-[10px] text-slate-500 mt-1">{m.desc}</p>
                </button>
              ))}
            </div>
          </section>

          {/* Step 3: Conditional Config */}
          <section className="bg-slate-50 p-6 rounded-2xl border border-slate-100 min-h-[120px]">
            {mode === 'Batch' && (
              <div className="grid grid-cols-2 gap-6 animate-fadeIn">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2">分批比例 (默认 3:3:4)</label>
                  <input type="text" placeholder="30%, 30%, 40%" className="w-full p-3 bg-white border border-slate-200 rounded-lg outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2">批次间隔 (小时)</label>
                  <input type="number" defaultValue={24} className="w-full p-3 bg-white border border-slate-200 rounded-lg outline-none" />
                </div>
              </div>
            )}
            {mode === 'Targeted' && (
              <div className="animate-fadeIn">
                <label className="block text-xs font-bold text-slate-500 mb-2">批量导入 VIN 码 (.txt / .csv)</label>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center text-slate-400 hover:border-blue-400 cursor-pointer transition-colors">
                  点击或拖拽文件到此处上传
                </div>
              </div>
            )}
            {mode === 'Scheduled' && (
              <div className="animate-fadeIn">
                <label className="block text-xs font-bold text-slate-500 mb-2">预约升级时段</label>
                <div className="flex gap-4">
                  <input type="time" defaultValue="00:00" className="flex-1 p-3 bg-white border border-slate-200 rounded-lg outline-none" />
                  <span className="flex items-center text-slate-400">至</span>
                  <input type="time" defaultValue="06:00" className="flex-1 p-3 bg-white border border-slate-200 rounded-lg outline-none" />
                </div>
              </div>
            )}
            {mode === 'Full' && (
              <div className="animate-fadeIn flex items-center gap-3 text-slate-500">
                <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <p className="text-sm">全量升级将立即影响该车型下所有已绑定的在线终端，请谨慎操作。</p>
              </div>
            )}
          </section>

          {/* Step 4: Description */}
          <section>
            <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">第四步：升级说明 (用户端显示)</label>
            <textarea 
              rows={4} 
              placeholder="请填写详细的更新日志..."
              className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium text-sm"
            ></textarea>
          </section>
        </div>

        <div className="bg-slate-50 p-8 border-t border-slate-100 flex justify-end gap-4">
          <button 
            onClick={onBack}
            className="px-8 py-3 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-white transition-all"
          >
            取消
          </button>
          <button className="px-10 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">
            下发指令
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTATaskCreateView;
