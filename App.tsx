
import React, { useState } from 'react';
import { ViewState, Mission, Transaction, User } from './types';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import MissionList from './components/MissionList';
import Wallet from './components/Wallet';
import Referral from './components/Referral';
import Support from './components/Support';
import Account from './components/Account';
import AdminDashboard from './components/AdminDashboard';
import { MISSIONS as INITIAL_MISSIONS, MOCK_USERS, MOCK_WITHDRAWALS, INITIAL_USER } from './constants';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Globe, MousePointer2, CreditCard, Users } from 'lucide-react';

const LandingPage: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-blue-500/30">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-[#020617]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-blue-600/20">K</div>
            <span className="text-2xl font-black bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent tracking-tighter">
              KiemTienNet
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Trang chủ</a>
            <a href="#features" className="hover:text-white transition-colors">Tính năng</a>
            <a href="#payouts" className="hover:text-white transition-colors">Thanh toán</a>
          </div>
          <button 
            onClick={onStart}
            className="px-6 py-2.5 bg-white text-black rounded-full font-black text-sm hover:bg-blue-500 hover:text-white transition-all shadow-xl active:scale-95"
          >
            ĐĂNG NHẬP NGAY
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 text-blue-400 rounded-full text-xs font-black border border-blue-500/20 tracking-widest uppercase">
              <Sparkles size={14} /> Nền tảng MMO hàng đầu 2025
            </div>
            <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter">
              Kiếm Tiền Online <br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">Dễ Dàng Hơn.</span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed max-w-xl">
              Thực hiện các nhiệm vụ đơn giản như vượt link, cài đặt ứng dụng và giới thiệu bạn bè để nhận thưởng không giới hạn mỗi ngày.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={onStart}
                className="px-10 py-5 bg-blue-600 rounded-2xl font-black text-xl hover:bg-blue-700 transition-all shadow-2xl shadow-blue-600/30 flex items-center justify-center gap-3 group"
              >
                BẮT ĐẦU KIẾM TIỀN <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </button>
              <div className="flex items-center gap-4 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map(i => (
                    <img key={i} className="w-8 h-8 rounded-full border-2 border-[#020617]" src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
                  ))}
                </div>
                <div className="text-xs">
                  <p className="font-bold text-white">10,000+ thành viên</p>
                  <p className="text-slate-500">Đã tham gia kiếm tiền</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative animate-in fade-in slide-in-from-right-8 duration-1000">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-slate-900 border border-white/10 rounded-[2.5rem] p-4 shadow-2xl">
              <div className="bg-[#020617] rounded-[2rem] overflow-hidden border border-white/5 aspect-video flex items-center justify-center">
                {/* Mock UI Preview */}
                <div className="w-full h-full p-8 flex flex-col gap-4">
                  <div className="h-6 w-32 bg-white/10 rounded-full mb-4"></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-24 bg-blue-600/20 rounded-2xl border border-blue-500/20"></div>
                    <div className="h-24 bg-emerald-600/20 rounded-2xl border border-emerald-500/20"></div>
                  </div>
                  <div className="h-32 bg-white/5 rounded-2xl border border-white/5 mt-4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Stats */}
      <section id="payouts" className="border-y border-white/5 bg-white/[0.02] py-12">
        <div className="max-w-7xl mx-auto px-6 overflow-hidden">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-12 grayscale opacity-50">
            <div className="flex items-center gap-3 font-black text-2xl"><Globe size={24} /> GLOBAL MMO</div>
            <div className="flex items-center gap-3 font-black text-2xl"><Zap size={24} /> FAST PAYOUT</div>
            <div className="flex items-center gap-3 font-black text-2xl"><ShieldCheck size={24} /> SECURE 256</div>
            <div className="flex items-center gap-3 font-black text-2xl"><CreditCard size={24} /> AUTO BANK</div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter">Tại sao chọn KiemTienNet?</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Nền tảng của chúng tôi được tối ưu hóa cho người dùng tại Việt Nam với tốc độ xử lý nhanh nhất.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <MousePointer2 className="text-blue-400" />, title: "Nhiệm vụ đa dạng", desc: "Hàng trăm nhiệm vụ từ vượt link, xem clip đến cài đặt app được cập nhật mỗi giờ." },
              { icon: <Zap className="text-yellow-400" />, title: "Rút tiền siêu tốc", desc: "Hệ thống duyệt lệnh tự động, nhận tiền qua ngân hàng hoặc thẻ Garena chỉ sau 5-15 phút." },
              { icon: <Users className="text-emerald-400" />, title: "Hoa hồng hấp dẫn", desc: "Mời bạn bè và nhận vĩnh viễn 20% hoa hồng trên tổng thu nhập của họ." }
            ].map((f, i) => (
              <div key={i} className="p-10 bg-slate-900 border border-white/5 rounded-[2rem] hover:border-blue-500/30 transition-all hover:-translate-y-2">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6 shadow-inner">{f.icon}</div>
                <h3 className="text-xl font-bold mb-4">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black">K</div>
            <span className="font-black text-xl tracking-tighter">KiemTienNet</span>
          </div>
          <p className="text-slate-500 text-sm">© 2025 KiemTienNet Team. Bảo lưu mọi quyền.</p>
          <div className="flex gap-6 text-sm font-bold text-slate-500">
            <a href="#" className="hover:text-white transition-colors">Điều khoản</a>
            <a href="#" className="hover:text-white transition-colors">Bảo mật</a>
            <a href="#" className="hover:text-white transition-colors">Liên hệ</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>(ViewState.LANDING);
  const [missions, setMissions] = useState<Mission[]>(INITIAL_MISSIONS);
  const [currentUser, setCurrentUser] = useState<User>(INITIAL_USER);
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [withdrawals, setWithdrawals] = useState<Transaction[]>(MOCK_WITHDRAWALS);

  const updateUser = (data: Partial<User>) => {
    setCurrentUser(prev => ({ ...prev, ...data }));
  };

  const addWithdrawalRequest = (amount: number, method: string) => {
    const newTx: Transaction = {
      id: `tx${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      amount,
      type: 'WITHDRAW',
      status: 'PENDING',
      date: new Date().toLocaleString(),
      method
    };
    setWithdrawals(prev => [newTx, ...prev]);
    updateUser({ balance: currentUser.balance - amount });
  };

  const renderContent = () => {
    switch (viewState) {
      case ViewState.DASHBOARD: return <Dashboard user={currentUser} />;
      case ViewState.MISSIONS: return <MissionList missions={missions} />;
      case ViewState.WALLET: return <Wallet user={currentUser} onUpdateUser={updateUser} onWithdraw={addWithdrawalRequest} />;
      case ViewState.REFERRAL: return <Referral user={currentUser} />;
      case ViewState.SUPPORT: return <Support />;
      case ViewState.ACCOUNT: return <Account user={currentUser} onUpdateUser={updateUser} />;
      case ViewState.ADMIN: return (
        <AdminDashboard 
          users={users} 
          missions={missions} 
          withdrawals={withdrawals}
          onAddMission={(m) => setMissions([...missions, m])}
          onDeleteMission={(id) => setMissions(missions.filter(x => x.id !== id))}
          onUpdateWithdrawal={(id, s) => setWithdrawals(withdrawals.map(w => w.id === id ? {...w, status: s} : w))}
        />
      );
      default: return <Dashboard user={currentUser} />;
    }
  };

  if (viewState === ViewState.LANDING) {
    return <LandingPage onStart={() => setViewState(ViewState.DASHBOARD)} />;
  }

  return (
    <Layout currentView={viewState} onNavigate={setViewState} user={currentUser}>
      {renderContent()}
    </Layout>
  );
};

export default App;
