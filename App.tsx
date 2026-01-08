
import React, { useState } from 'react';
import { ViewState } from './types';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import MissionList from './components/MissionList';
import Wallet from './components/Wallet';
import Referral from './components/Referral';
import AIConsultant from './components/AIConsultant';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Coins } from 'lucide-react';

const LandingPage: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">K</div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              KiemTienNet
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-blue-600">Trang chủ</a>
            <a href="#" className="hover:text-blue-600">Bảng giá</a>
            <a href="#" className="hover:text-blue-600">Hướng dẫn</a>
            <a href="#" className="hover:text-blue-600">Liên hệ</a>
          </div>
          <button 
            onClick={onStart}
            className="px-6 py-2 bg-blue-600 text-white rounded-full font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
          >
            Đăng nhập
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-bold border border-blue-100 animate-bounce">
            <Sparkles size={16} />
            Nền tảng kiếm tiền MMO số 1 Việt Nam
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight">
            Kiếm tiền Online <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent italic">Dễ dàng & Uy tín</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            Hơn 50,000 người đã tham gia và rút tiền thành công mỗi ngày. Bắt đầu ngay hôm nay chỉ với chiếc điện thoại của bạn.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={onStart}
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-2xl shadow-blue-300 flex items-center justify-center gap-2 group"
            >
              Bắt đầu kiếm tiền ngay <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all">
              Xem bảng xếp hạng
            </button>
          </div>
          
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto opacity-70">
            <div className="text-center">
              <p className="text-3xl font-black text-slate-900">50K+</p>
              <p className="text-xs text-slate-500 font-bold uppercase">Thành viên</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-black text-slate-900">1.2B+</p>
              <p className="text-xs text-slate-500 font-bold uppercase">Đã chi trả (đ)</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-black text-slate-900">1M+</p>
              <p className="text-xs text-slate-500 font-bold uppercase">Nhiệm vụ</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-black text-slate-900">24/7</p>
              <p className="text-xs text-slate-500 font-bold uppercase">Hỗ trợ AI</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { 
              title: 'Thanh toán tức thì', 
              desc: 'Hệ thống rút tiền tự động về ngân hàng, ví Momo trong vòng vài phút.',
              icon: <Zap className="text-orange-500" size={32} />
            },
            { 
              title: 'Nhiệm vụ phong phú', 
              desc: 'Hàng ngàn nhiệm vụ mỗi ngày từ vượt link, xem video đến cài đặt ứng dụng.',
              icon: <Coins className="text-blue-500" size={32} />
            },
            { 
              title: 'An toàn & Bảo mật', 
              desc: 'Hệ thống bảo mật đa tầng, cam kết bảo vệ thông tin người dùng 100%.',
              icon: <ShieldCheck className="text-emerald-500" size={32} />
            }
          ].map((feature, i) => (
            <div key={i} className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-sm">
          <p>© 2024 KiemTienNet. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-blue-600">Chính sách bảo mật</a>
            <a href="#" className="hover:text-blue-600">Điều khoản sử dụng</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

const App: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>(ViewState.LANDING);

  const renderContent = () => {
    switch (viewState) {
      case ViewState.DASHBOARD: return <Dashboard />;
      case ViewState.MISSIONS: return <MissionList />;
      case ViewState.WALLET: return <Wallet />;
      case ViewState.REFERRAL: return <Referral />;
      case ViewState.AI_CHAT: return <AIConsultant />;
      default: return <Dashboard />;
    }
  };

  if (viewState === ViewState.LANDING) {
    return <LandingPage onStart={() => setViewState(ViewState.DASHBOARD)} />;
  }

  return (
    <Layout currentView={viewState} onNavigate={setViewState}>
      {renderContent()}
    </Layout>
  );
};

export default App;
