
import React, { useState, useEffect, useCallback } from 'react';
import { ViewState, Mission, Transaction, User, AppNotification } from './types';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import MissionList from './components/MissionList';
import Wallet from './components/Wallet';
import Referral from './components/Referral';
import Support from './components/Support';
import Account from './components/Account';
import AdminDashboard from './components/AdminDashboard';
import { MISSIONS as INITIAL_MISSIONS } from './constants';
import { supabase } from './index';
import { ArrowRight, Zap, ShieldCheck, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>(ViewState.LANDING);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [missions, setMissions] = useState<Mission[]>(INITIAL_MISSIONS);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [withdrawals, setWithdrawals] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

  const ADMIN_ID = "0337117930";

  // Bot tự động cộng tiền khi người dùng quay lại từ Blog nhiệm vụ
  const handleAutoReward = useCallback(async () => {
    const params = new URLSearchParams(window.location.search);
    const status = params.get('status');
    const token = params.get('token');
    const savedToken = localStorage.getItem('active_token');
    const missionId = params.get('mission_id');

    if (status === 'success' && token && token === savedToken) {
      try {
        const mission = missions.find(m => m.id === missionId) || { reward: 5000 };
        
        const { data: userData, error: fetchError } = await supabase
          .from('users')
          .select('xu')
          .eq('id', ADMIN_ID)
          .single();

        if (fetchError) throw fetchError;

        const currentBalance = userData?.xu || 0;
        const newBalance = currentBalance + mission.reward;

        const { error: updateError } = await supabase
          .from('users')
          .update({ xu: newBalance })
          .eq('id', ADMIN_ID);

        if (updateError) throw updateError;

        setNotifications(prev => [{
          id: `noti-${Date.now()}`,
          title: '✅ BOT: DUYỆT THÀNH CÔNG',
          message: `Hệ thống vừa cộng +${mission.reward.toLocaleString()}đ vào ví của bạn.`,
          date: 'Vừa xong',
          isRead: false
        }, ...prev]);
        
        alert(`✅ Tuyệt vời! Bạn vừa nhận được ${mission.reward.toLocaleString()}đ.`);
        
        localStorage.removeItem('active_token');
        window.history.replaceState({}, document.title, window.location.pathname);
        
        if (currentUser) {
          setCurrentUser(prev => prev ? { ...prev, balance: newBalance } : null);
        }
      } catch (err) {
        console.error("Lỗi bot xử lý:", err);
      }
    }
  }, [missions, currentUser]);

  useEffect(() => {
    if (viewState !== ViewState.LANDING) {
      handleAutoReward();
    }
  }, [viewState, handleAutoReward]);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', ADMIN_ID)
        .single();

      if (data) {
        setCurrentUser({
          id: data.id,
          name: 'Admin NTHD',
          balance: data.xu || 0,
          totalEarned: 1500000,
          referralCode: 'ADMIN',
          membership: 'VIP',
          joinDate: '2025-01-01',
          isAdmin: true
        });
        setViewState(ViewState.DASHBOARD);
      } else {
        const { error: insertError } = await supabase
          .from('users')
          .insert([{ id: ADMIN_ID, xu: 0 }]);
        if (!insertError) handleLogin();
      }
    } catch (err) {
      alert("Kết nối Supabase thất bại! Vui lòng kiểm tra lại cấu hình.");
    } finally {
      setLoading(false);
    }
  };

  const renderView = () => {
    if (!currentUser) return null;
    switch (viewState) {
      case ViewState.DASHBOARD: return <Dashboard user={currentUser} />;
      case ViewState.MISSIONS: return <MissionList missions={missions} />;
      case ViewState.WALLET: return <Wallet user={currentUser} onUpdateUser={u => setCurrentUser(prev => prev ? {...prev, ...u} : null)} onWithdraw={(a, m) => setWithdrawals([...withdrawals, { id: `w${Date.now()}`, userId: currentUser.id, userName: currentUser.name, amount: a, type: 'WITHDRAW', status: 'PENDING', date: new Date().toLocaleString(), method: m }])} history={withdrawals} />;
      case ViewState.REFERRAL: return <Referral user={currentUser} />;
      case ViewState.SUPPORT: return <Support />;
      case ViewState.ACCOUNT: return <Account user={currentUser} onUpdateUser={u => setCurrentUser(prev => prev ? {...prev, ...u} : null)} onLogout={() => { setViewState(ViewState.LANDING); setCurrentUser(null); }} onNavigate={setViewState} />;
      case ViewState.ADMIN: return <AdminDashboard users={[currentUser]} missions={missions} withdrawals={withdrawals} onAddMission={m => setMissions([...missions, m])} onDeleteMission={id => setMissions(missions.filter(x => x.id !== id))} onUpdateWithdrawal={(id, s) => setWithdrawals(withdrawals.map(w => w.id === id ? {...w, status: s} : w))} onBroadcast={(t, m) => setNotifications([{id: `b${Date.now()}`, title: t, message: m, date: 'Vừa xong', isRead: false}, ...notifications])} />;
      default: return <Dashboard user={currentUser} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col w-full">
      {viewState === ViewState.LANDING ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950">
          <div className="w-24 h-24 bg-blue-600 rounded-[2.5rem] flex items-center justify-center text-white text-5xl font-black mb-10 shadow-3xl shadow-blue-600/30">K</div>
          <div className="space-y-4 text-center mb-12">
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter">KiemTienNet</h1>
            <p className="text-xl text-slate-400 max-w-xl mx-auto font-medium leading-relaxed">Nền tảng MMO tự động hóa 100%. Kiếm tiền an toàn, thanh toán cực nhanh.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl w-full">
            {[
              { icon: <Zap className="text-blue-400" />, title: 'Auto Duyệt', desc: 'Hệ thống cộng tiền tự động' },
              { icon: <ShieldCheck className="text-emerald-400" />, title: 'An Toàn', desc: 'Dữ liệu được bảo mật 100%' },
              { icon: <Sparkles className="text-purple-400" />, title: 'VIP Pay', desc: 'Rút tiền xử lý ưu tiên' }
            ].map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-3xl text-center hover:bg-white/10 transition-colors">
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="text-white font-bold text-lg mb-1">{item.title}</h3>
                <p className="text-slate-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <button 
            onClick={handleLogin}
            disabled={loading}
            className="px-16 py-7 bg-blue-600 text-white rounded-[2rem] font-black text-2xl hover:bg-blue-700 shadow-3xl shadow-blue-600/20 transition-all active:scale-95 flex items-center gap-4 group"
          >
            {loading ? (
              <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>BẮT ĐẦU NGAY <ArrowRight className="group-hover:translate-x-2 transition-transform" /></>
            )}
          </button>
        </div>
      ) : currentUser && (
        <Layout 
          currentView={viewState} 
          onNavigate={setViewState} 
          user={currentUser} 
          onLogout={() => { setViewState(ViewState.LANDING); setCurrentUser(null); }} 
          notifications={notifications} 
          onMarkRead={id => setNotifications(notifications.map(n => n.id === id ? {...n, isRead: true} : n))}
        >
          {renderView()}
        </Layout>
      )}
    </div>
  );
};

export default App;
