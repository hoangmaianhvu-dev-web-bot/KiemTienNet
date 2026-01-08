
import React, { useState, useEffect } from 'react';
import { ViewState, Mission, Transaction, User, AppNotification } from './types';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import MissionList from './components/MissionList';
import Wallet from './components/Wallet';
import Referral from './components/Referral';
import Support from './components/Support';
import Account from './components/Account';
import AdminDashboard from './components/AdminDashboard';
import { MISSIONS as INITIAL_MISSIONS, NAV_ITEMS, INITIAL_USER } from './constants';
import { 
  Sparkles, ArrowRight, ShieldCheck, Zap, Globe, MousePointer2, CreditCard, Users, Lock, DollarSign, CheckCircle2, TrendingUp, MessageSquare, ChevronRight, Shield, X, Mail, User as UserIcon, Bell, ArrowLeft, Play, Star
} from 'lucide-react';

// Privacy View Component
const PrivacyView = () => (
  <div className="max-w-4xl mx-auto bg-slate-900 p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl animate-in fade-in duration-500">
    <div className="flex items-center gap-4 mb-8">
      <div className="p-4 bg-blue-600/10 text-blue-400 rounded-2xl"><Shield size={32} /></div>
      <h1 className="text-3xl font-black text-white">Chính sách Quyền riêng tư</h1>
    </div>
    <div className="space-y-6 text-slate-400 font-medium leading-relaxed">
      <p>Tại <strong>Kiếm Tiền Net</strong>, chúng tôi coi trọng sự tin tưởng của bạn và cam kết bảo vệ thông tin cá nhân của bạn một cách tuyệt đối.</p>
      <section className="space-y-3">
        <h3 className="text-white font-bold text-lg">1. Thu thập thông tin</h3>
        <p>Chúng tôi chỉ thu thập các thông tin cần thiết cho việc thanh toán và bảo mật tài khoản như: Tên, Email, Số tài khoản Ngân hàng (nếu có). Các dữ liệu này được mã hóa và lưu trữ tại hệ thống bảo mật riêng.</p>
      </section>
      <section className="space-y-3">
        <h3 className="text-white font-bold text-lg">2. Sử dụng thông tin</h3>
        <p>Thông tin của bạn được sử dụng duy nhất cho mục đích: Xác minh nhiệm vụ, thực hiện lệnh rút tiền và gửi thông báo quan trọng từ hệ thống.</p>
      </section>
      <section className="space-y-3">
        <h3 className="text-white font-bold text-lg">3. Cam kết bảo mật</h3>
        <p>Hệ thống sử dụng công nghệ mã hóa SSL 256-bit. Chúng tôi cam kết <strong>không bao giờ</strong> cung cấp hoặc bán dữ liệu của người dùng cho bất kỳ bên thứ ba nào.</p>
      </section>
      <div className="pt-8 border-t border-white/5">
        <p className="text-xs text-slate-500 italic text-center italic">Cập nhật lần cuối: Tháng 2, 2025</p>
      </div>
    </div>
  </div>
);

// New Website-style AuthPage
const AuthPage: React.FC<{ 
  onSuccess: (user: User) => void; 
  registeredUsers: User[]; 
  onRegister: (user: User) => void;
  onBack: () => void;
}> = ({ onSuccess, registeredUsers, onRegister, onBack }) => {
  const [mode, setMode] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (mode === 'REGISTER') {
      if (!formData.name || !formData.email || !formData.password) { setError('Vui lòng điền đủ thông tin'); return; }
      const newUser: User = {
        id: `u${Date.now()}`, name: formData.name, balance: 0, totalEarned: 0, referralCode: Math.random().toString(36).substring(2, 8).toUpperCase(), membership: 'FREE', joinDate: new Date().toISOString().split('T')[0],
        // @ts-ignore
        email: formData.email, password: formData.password
      };
      onRegister(newUser);
      setMode('LOGIN');
      setError('Đăng ký thành công!');
    } else {
      if (formData.email === 'avu@nthd.ebe' && formData.password === 'nthd19042009') {
        onSuccess({ id: 'admin-01', name: 'Admin NTHD', balance: 9999999, totalEarned: 9999999, referralCode: 'ADMIN', membership: 'VIP', joinDate: '2025-01-01', isAdmin: true }); return;
      }
      const user = registeredUsers.find(u => (u as any).email === formData.email && (u as any).password === formData.password);
      if (user) onSuccess(user); else setError('Email hoặc mật khẩu không chính xác!');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col lg:flex-row overflow-hidden">
      {/* Left side: Trust & Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-16 bg-gradient-to-br from-blue-900 via-slate-950 to-indigo-950 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500 blur-[150px] rounded-full"></div>
        </div>

        <div className="relative z-10 flex items-center gap-3 cursor-pointer" onClick={onBack}>
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white text-2xl font-black backdrop-blur-xl border border-white/20">K</div>
          <span className="text-3xl font-black text-white tracking-tighter">KiemTienNet</span>
        </div>

        <div className="relative z-10 space-y-8">
          <h2 className="text-6xl font-black text-white leading-none tracking-tighter">Bắt đầu hành trình <br /><span className="text-blue-500">MMO chuyên nghiệp.</span></h2>
          <p className="text-xl text-slate-400 max-w-md font-medium leading-relaxed">Tham gia cùng hơn 12,000 thành viên đang kiếm tiền mỗi ngày thông qua hệ thống làm nhiệm vụ tự động và uy tín nhất.</p>
          
          <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
            <div>
              <p className="text-3xl font-black text-white">520M+</p>
              <p className="text-xs font-black text-slate-500 uppercase tracking-widest mt-1">Đã thanh toán</p>
            </div>
            <div>
              <p className="text-3xl font-black text-white">24/7</p>
              <p className="text-xs font-black text-slate-500 uppercase tracking-widest mt-1">Hỗ trợ kỹ thuật</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-6">
          <div className="flex -space-x-4">
            {[1,2,3,4].map(i => <div key={i} className="w-12 h-12 rounded-full border-4 border-slate-950 bg-slate-800 overflow-hidden"><img src={`https://picsum.photos/seed/${i+10}/100/100`} alt="User" /></div>)}
          </div>
          <p className="text-sm font-bold text-slate-400">Tham gia cùng hàng nghìn người khác</p>
        </div>
      </div>

      {/* Right side: Auth Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 lg:p-24 relative bg-slate-950">
        <button 
          onClick={onBack}
          className="lg:absolute lg:top-12 lg:left-12 flex items-center gap-2 text-slate-500 hover:text-white transition-all font-bold text-sm mb-12 lg:mb-0"
        >
          <ArrowLeft size={18} /> Quay về trang chủ
        </button>

        <div className="w-full max-w-md space-y-10">
          <div className="space-y-4">
            <h1 className="text-4xl font-black text-white tracking-tight">{mode === 'LOGIN' ? 'Chào mừng trở lại!' : 'Tạo tài khoản mới'}</h1>
            <p className="text-slate-500 font-medium">{mode === 'LOGIN' ? 'Nhập thông tin của bạn để tiếp tục kiếm tiền.' : 'Hoàn thành thông tin bên dưới để bắt đầu nhận nhiệm vụ.'}</p>
          </div>

          {error && (
            <div className={`p-4 rounded-2xl border text-sm font-bold text-center animate-in fade-in slide-in-from-top-2 ${error.includes('thành công') ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === 'REGISTER' && (
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Họ và tên</label>
                <div className="relative">
                  <UserIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                  <input 
                    type="text" 
                    placeholder="Nguyễn Văn A" 
                    className="w-full pl-14 pr-6 py-5 bg-slate-900 border border-white/5 rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-600/50 transition-all placeholder:text-slate-700 font-bold"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Địa chỉ Email</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                <input 
                  type="email" 
                  placeholder="name@company.com" 
                  className="w-full pl-14 pr-6 py-5 bg-slate-900 border border-white/5 rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-600/50 transition-all placeholder:text-slate-700 font-bold"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Mật khẩu</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full pl-14 pr-6 py-5 bg-slate-900 border border-white/5 rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-600/50 transition-all placeholder:text-slate-700 font-bold"
                  value={formData.password}
                  onChange={e => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            <button type="submit" className="w-full py-6 bg-blue-600 text-white rounded-2xl font-black text-lg hover:bg-blue-700 shadow-2xl shadow-blue-900/40 transition-all active:scale-95">
              {mode === 'LOGIN' ? 'ĐĂNG NHẬP NGAY' : 'TẠO TÀI KHOẢN'}
            </button>
          </form>

          <div className="text-center">
            <p className="text-slate-500 font-bold text-sm">
              {mode === 'LOGIN' ? 'Bạn mới đến đây?' : 'Đã có tài khoản trước đó?'}
              <button 
                onClick={() => { setMode(mode === 'LOGIN' ? 'REGISTER' : 'LOGIN'); setError(''); }} 
                className="ml-2 text-blue-400 hover:text-blue-300 transition-colors underline underline-offset-4"
              >
                {mode === 'LOGIN' ? 'Đăng ký miễn phí' : 'Đăng nhập'}
              </button>
            </p>
          </div>
        </div>

        <div className="mt-20 flex gap-8 text-[10px] font-black text-slate-700 uppercase tracking-widest">
          <button className="hover:text-slate-400">Điều khoản</button>
          <button className="hover:text-slate-400">Bảo mật</button>
          <button className="hover:text-slate-400">Hỗ trợ</button>
        </div>
      </div>
    </div>
  );
};

const LandingPage: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-500 selection:text-white">
      {/* Website Navigation Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/90 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white text-xl font-black shadow-lg">K</div>
            <span className="text-2xl font-black text-white tracking-tighter">KiemTienNet</span>
          </div>
          <div className="hidden md:flex items-center gap-10">
            <a href="#features" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Tính năng</a>
            <a href="#stats" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Thống kê</a>
            <a href="#faq" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Câu hỏi</a>
          </div>
          <button onClick={onStart} className="px-6 py-3 bg-white text-slate-950 rounded-full font-black text-sm hover:bg-blue-500 hover:text-white transition-all shadow-xl">
            BẮT ĐẦU NGAY
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl -z-10">
          <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/20 blur-[150px] rounded-full"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/20 blur-[150px] rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-[11px] font-black uppercase tracking-widest mb-10 animate-bounce">
            <Sparkles size={14} /> Nền tảng MMO Uy tín nhất 2025
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
            Kiếm tiền trực tuyến <br /> 
            <span className="bg-gradient-to-r from-blue-400 to-indigo-600 bg-clip-text text-transparent">Chưa bao giờ dễ thế.</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-14 font-medium leading-relaxed">
            Hơn 12,000 người dùng đã tin tưởng và kiếm thêm thu nhập thụ động hàng tháng thông qua hệ thống nhiệm vụ tự động hóa 100%.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button onClick={onStart} className="w-full sm:w-auto px-12 py-6 bg-blue-600 text-white rounded-[2rem] font-black text-xl hover:bg-blue-700 transition-all shadow-2xl shadow-blue-600/30 flex items-center justify-center gap-4 group">
              BẮT ĐẦU KIẾM TIỀN <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </button>
            <button className="w-full sm:w-auto px-10 py-6 bg-white/5 border border-white/10 text-white rounded-[2rem] font-black text-xl hover:bg-white/10 transition-all flex items-center justify-center gap-3">
              <Play size={20} fill="currentColor" /> Xem giới thiệu
            </button>
          </div>

          <div className="mt-20 pt-20 border-t border-white/5 flex flex-wrap justify-center items-center gap-12 grayscale opacity-40">
            <div className="flex items-center gap-2 font-black text-2xl tracking-tighter">TRUSTBANK</div>
            <div className="flex items-center gap-2 font-black text-2xl tracking-tighter">SECURPAY</div>
            <div className="flex items-center gap-2 font-black text-2xl tracking-tighter">GARENA_PARTNER</div>
            <div className="flex items-center gap-2 font-black text-2xl tracking-tighter">VNPAY_OFFICIAL</div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-24 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { label: 'Người dùng active', value: '12,400+' },
            { label: 'Đã thanh toán', value: '520M+' },
            { label: 'Nhiệm vụ xong', value: '1.2M+' },
            { label: 'Hỗ trợ 24/7', value: '100%' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <h3 className="text-5xl font-black text-white mb-2">{stat.value}</h3>
              <p className="text-xs font-black text-slate-500 uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">Tại sao chọn KiemTienNet?</h2>
            <p className="text-slate-500 font-medium max-w-xl mx-auto">Chúng tôi cung cấp giải pháp MMO toàn diện nhất với độ bảo mật và tốc độ thanh toán hàng đầu.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: 'Nhiệm vụ đa dạng', desc: 'Từ vượt link, xem video đến cài đặt app, luôn có việc cho bạn làm.', icon: <Zap className="text-yellow-400" /> },
              { title: 'Thanh toán tức thì', desc: 'Hỗ trợ rút tiền qua Ngân hàng và Thẻ Garena với tốc độ xử lý nhanh nhất.', icon: <CreditCard className="text-blue-400" /> },
              { title: 'Bảo mật tuyệt đối', desc: 'Hệ thống mã hóa dữ liệu SSL 256-bit đảm bảo an toàn tài khoản.', icon: <Lock className="text-emerald-400" /> },
              { title: 'Hoa hồng giới thiệu', desc: 'Nhận ngay 20% hoa hồng vĩnh viễn từ doanh thu của bạn bè.', icon: <Users className="text-purple-400" /> },
              { title: 'Giao diện chuyên nghiệp', desc: 'Trải nghiệm mượt mà trên cả máy tính và điện thoại di động.', icon: <Globe className="text-indigo-400" /> },
              { title: 'Hỗ trợ 24/7', icon: <MessageSquare className="text-red-400" />, desc: 'Đội ngũ CSKH luôn sẵn sàng giải đáp mọi thắc mắc qua Zalo.' },
            ].map((f, i) => (
              <div key={i} className="p-10 bg-slate-900 border border-white/5 rounded-[3rem] hover:border-blue-500/30 transition-all group">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-slate-900/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              <div className="flex gap-1 text-yellow-500"><Star fill="currentColor" size={20} /><Star fill="currentColor" size={20} /><Star fill="currentColor" size={20} /><Star fill="currentColor" size={20} /><Star fill="currentColor" size={20} /></div>
              <h2 className="text-5xl font-black text-white leading-tight">Được tin tưởng bởi hàng nghìn Freelancer.</h2>
              <p className="text-lg text-slate-400 italic">"Kiếm Tiền Net là nền tảng rút gọn link và làm nhiệm vụ uy tín nhất mà tôi từng tham gia. Tiền về tài khoản chỉ sau 15 phút đặt lệnh!"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-800 border border-white/10 overflow-hidden"><img src="https://picsum.photos/seed/user1/100/100" /></div>
                <div>
                  <p className="font-bold text-white">Minh Quang</p>
                  <p className="text-xs text-slate-500 font-black uppercase">Top Member - Kiếm được 25M+</p>
                </div>
              </div>
            </div>
            <div className="flex-1 w-full max-w-md">
              <div className="bg-slate-950 p-8 rounded-[3rem] border border-white/10 shadow-3xl">
                <div className="space-y-6">
                  <div className="flex justify-between items-center"><span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Lịch sử mới nhất</span><div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div></div>
                  {[
                    { u: 'quang***', a: '500,000đ', t: 'Ngân hàng' },
                    { u: 'hang***', a: '100,000đ', t: 'Thẻ Garena' },
                    { u: 'tuan***', a: '1,200,000đ', t: 'Ngân hàng' },
                  ].map((pay, i) => (
                    <div key={i} className="flex justify-between items-center p-4 bg-white/5 rounded-2xl">
                      <div><p className="text-sm font-bold text-white">{pay.u}</p><p className="text-[10px] text-slate-600 font-bold uppercase">{pay.t}</p></div>
                      <p className="font-black text-emerald-400">+{pay.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40">
        <div className="max-w-5xl mx-auto px-6 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[4rem] p-16 md:p-24 text-center relative overflow-hidden shadow-2xl shadow-blue-900/40">
           <div className="absolute top-0 right-0 p-12 opacity-10"><DollarSign size={200} /></div>
           <h2 className="text-5xl md:text-6xl font-black text-white mb-10 tracking-tighter">Sẵn sàng để bắt đầu <br /> gia tăng thu nhập?</h2>
           <button onClick={onStart} className="px-12 py-6 bg-white text-blue-600 rounded-[2rem] font-black text-2xl hover:bg-slate-100 transition-all shadow-xl active:scale-95">
             ĐĂNG KÝ MIỄN PHÍ NGAY
           </button>
           <p className="mt-8 text-white/70 font-bold">Không cần vốn, không cần kinh nghiệm.</p>
        </div>
      </section>

      {/* Professional Web Footer */}
      <footer className="bg-slate-900 border-t border-white/5 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-1 md:col-span-1 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white text-xl font-black">K</div>
                <span className="text-2xl font-black text-white tracking-tighter">KiemTienNet</span>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">Nền tảng dẫn đầu về giải pháp MMO và Marketing tại Việt Nam. Xây dựng bởi đội ngũ chuyên gia công nghệ.</p>
            </div>
            <div>
              <h4 className="font-black text-white uppercase text-xs tracking-[0.2em] mb-8">Hệ thống</h4>
              <ul className="space-y-4 text-sm font-bold text-slate-500">
                <li><button className="hover:text-blue-400">Bảng tin</button></li>
                <li><button className="hover:text-blue-400">Kho nhiệm vụ</button></li>
                <li><button className="hover:text-blue-400">Thanh toán</button></li>
                <li><button className="hover:text-blue-400">Giới thiệu</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-white uppercase text-xs tracking-[0.2em] mb-8">Hỗ trợ</h4>
              <ul className="space-y-4 text-sm font-bold text-slate-500">
                <li><button className="hover:text-blue-400">Trung tâm giúp đỡ</button></li>
                <li><button className="hover:text-blue-400">Điều khoản sử dụng</button></li>
                <li><button className="hover:text-blue-400">Chính sách bảo mật</button></li>
                <li><button className="hover:text-blue-400">Zalo CSKH</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-white uppercase text-xs tracking-[0.2em] mb-8">Liên hệ</h4>
              <p className="text-sm font-bold text-slate-500 mb-4">Email: support@kiemtiennet.io</p>
              <div className="flex gap-4">
                 <button className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"><Globe size={18} /></button>
                 <button className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"><MessageSquare size={18} /></button>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/5 gap-6">
            <p className="text-xs text-slate-600 font-bold uppercase tracking-widest">© 2025 KiemTienNet. All Rights Reserved.</p>
            <div className="flex gap-8">
               <span className="text-[10px] text-slate-700 font-black tracking-widest uppercase">Secure SSL Encryption</span>
               <span className="text-[10px] text-slate-700 font-black tracking-widest uppercase">Verified by TrustHub</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>(ViewState.LANDING);
  const [missions, setMissions] = useState<Mission[]>(INITIAL_MISSIONS);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [registeredUsers, setRegisteredUsers] = useState<User[]>([]);
  const [withdrawals, setWithdrawals] = useState<Transaction[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  const handleAuthSuccess = (user: User) => {
    setCurrentUser(user);
    setViewState(ViewState.DASHBOARD);
    
    // Welcome Notification
    const welcomeNoti: AppNotification = {
      id: `noti-welcome-${Date.now()}`,
      title: 'Chào mừng thành viên mới! 🎉',
      message: `Chào mừng ${user.name} đã gia nhập Kiếm Tiền Net. Bắt đầu làm nhiệm vụ ngay để nhận thưởng nhé!`,
      date: new Date().toLocaleDateString(),
      isRead: false
    };
    setNotifications([welcomeNoti]);
  };

  const handleBroadcast = (title: string, message: string) => {
    const newNoti: AppNotification = {
      id: `noti-${Date.now()}`,
      title, message,
      date: new Date().toLocaleDateString(),
      isRead: false
    };
    setNotifications(prev => [newNoti, ...prev]);
  };

  const handleMarkRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const addWithdrawalRequest = (amount: number, method: string) => {
    if (!currentUser) return;
    const newTx: Transaction = {
      id: `tx${Date.now()}`, userId: currentUser.id, userName: currentUser.name, amount, type: 'WITHDRAW', status: 'PENDING', date: new Date().toLocaleString(), method
    };
    setWithdrawals(prev => [newTx, ...prev]);
    setCurrentUser({ ...currentUser, balance: currentUser.balance - amount });
  };

  const renderContent = () => {
    if (!currentUser) return null;
    switch (viewState) {
      case ViewState.DASHBOARD: return <Dashboard user={currentUser} />;
      case ViewState.MISSIONS: return <MissionList missions={missions} />;
      case ViewState.WALLET: return <Wallet user={currentUser} onUpdateUser={u => setCurrentUser({...currentUser, ...u})} onWithdraw={addWithdrawalRequest} history={withdrawals.filter(w => w.userId === currentUser.id)} />;
      case ViewState.REFERRAL: return <Referral user={currentUser} />;
      case ViewState.SUPPORT: return <Support />;
      case ViewState.ACCOUNT: return <Account user={currentUser} onUpdateUser={u => setCurrentUser({...currentUser, ...u})} onLogout={() => { setViewState(ViewState.LANDING); setCurrentUser(null); }} onNavigate={setViewState} />;
      case ViewState.PRIVACY: return <PrivacyView />;
      case ViewState.ADMIN: return (
        <AdminDashboard 
          users={[currentUser, ...registeredUsers]} missions={missions} withdrawals={withdrawals} 
          onAddMission={m => setMissions([...missions, m])} onDeleteMission={id => setMissions(missions.filter(x => x.id !== id))} 
          onUpdateWithdrawal={(id, s) => setWithdrawals(withdrawals.map(w => w.id === id ? {...w, status: s} : w))}
          onBroadcast={handleBroadcast}
        />
      );
      default: return <Dashboard user={currentUser} />;
    }
  };

  return (
    <>
      {viewState === ViewState.LANDING && (
        <LandingPage onStart={() => setViewState(ViewState.AUTH)} />
      )}
      {viewState === ViewState.AUTH && (
        <AuthPage 
          onSuccess={handleAuthSuccess} 
          registeredUsers={registeredUsers} 
          onRegister={u => setRegisteredUsers([...registeredUsers, u])} 
          onBack={() => setViewState(ViewState.LANDING)}
        />
      )}
      {currentUser && viewState !== ViewState.AUTH && viewState !== ViewState.LANDING && (
        <Layout currentView={viewState} onNavigate={setViewState} user={currentUser} onLogout={() => { setViewState(ViewState.LANDING); setCurrentUser(null); }} notifications={notifications} onMarkRead={handleMarkRead}>
          {renderContent()}
        </Layout>
      )}
    </>
  );
};

export default App;
