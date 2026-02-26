
import React, { useState } from 'react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // 模拟接口请求延迟
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white text-3xl font-black shadow-xl shadow-blue-500/20">
            X
          </div>
          <h1 className="text-2xl font-bold text-white">巡翼智能网联管理平台</h1>
          <p className="text-slate-400 mt-2">欢迎登录管理后台</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">账号 / 邮箱</label>
              <input 
                type="email" 
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="admin@xunyi.com"
                defaultValue="admin@xunyi.com"
              />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <label className="block text-sm font-medium text-slate-700">密码</label>
                <a href="#" className="text-xs text-blue-600 font-bold hover:underline">忘记密码?</a>
              </div>
              <input 
                type="password" 
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="••••••••"
                defaultValue="password123"
              />
            </div>
            <div className="flex items-center">
              <input type="checkbox" className="w-4 h-4 rounded text-blue-600" defaultChecked />
              <label className="ml-2 text-xs text-slate-500">记住登录状态 (30 天)</label>
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : '立即登录'}
            </button>
          </form>
        </div>
        
        <p className="text-center text-slate-500 text-xs mt-10">
          &copy; 2024 巡翼智能网联有限公司. 内部使用，严禁外传。
        </p>
      </div>
    </div>
  );
};

export default Login;
