
import React, { useState, useEffect } from 'react';
import { ViewState, User, AppNotification } from '../types';
import { NAV_ITEMS } from '../constants';
import { LogOut, Menu, X, Bell, ChevronDown, User as UserIcon, ShieldCheck } from 'lucide-react';

interface LayoutProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  children: React.ReactNode;
  user: User;
  onLogout: () => void;
  notifications: AppNotification[];
  onMarkRead: (id: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ currentView, onNavigate, children, user, onLogout, notifications, onMarkRead }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotiOpen, setIsNotiOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      {/* Top Professional Navigation */}
      <header 
        className={`fixed top-0 w-full z-[100] transition-all duration-300 border-b ${
          scrolled ? 'bg-slate-950/80 backdrop-blur-xl py-3 border-white/10 shadow-2xl' : 'bg-transparent py-5 border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate(ViewState.DASHBOARD)}>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-blue-600/20">K</div>
              <span className="text-2xl font-black bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent tracking-tighter">
                KiemTienNet
              </span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id as ViewState)}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                    currentView === item.id 
                      ? 'bg-white/10 text-white' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            <div className="relative">
              <button 
                className="p-2.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all relative"
                onClick={() => { setIsNotiOpen(!isNotiOpen); setIsProfileOpen(false); }}
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-950 animate-pulse"></span>
                )}
              </button>
              {isNotiOpen && (
                <>
                  <div className="fixed inset-0" onClick={() => setIsNotiOpen(false)}></div>
                  <div className="absolute right-0 mt-4 w-80 bg-slate-900 border border-white/10 rounded-2xl shadow-3xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200 z-[110]">
                    <div className="p-4 border-b border-white/5 flex items-center justify-between bg-slate-800/50">
                      <h4 className="font-bold text-sm">Thông báo gần đây</h4>
                      <span className="text-[10px] bg-blue-600/20 text-blue-400 px-2 py-0.5 rounded-full font-black uppercase tracking-widest">{unreadCount} Mới</span>
                    </div>
                    <div className="max-h-[400px] overflow-y-auto">
                      {notifications.length > 0 ? notifications.map(n => (
                        <div 
                          key={n.id} 
                          onClick={() => { onMarkRead(n.id); setIsNotiOpen(false); }} 
                          className={`p-4 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-colors ${!n.isRead ? 'bg-blue-600/5 border-l-2 border-l-blue-500' : ''}`}
                        >
                          <p className={`text-xs font-bold ${!n.isRead ? 'text-white' : 'text-slate-400'}`}>{n.title}</p>
                          <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{n.message}</p>
                          <p className="text-[9px] text-slate-600 mt-2 font-black uppercase">{n.date}</p>
                        </div>
                      )) : (
                        <div className="p-8 text-center text-slate-500 italic text-xs">Không có thông báo mới</div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* User Profile Dropdown */}
            <div className="relative ml-2">
              <button 
                className="flex items-center gap-3 p-1.5 pl-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all"
                onClick={() => { setIsProfileOpen(!isProfileOpen); setIsNotiOpen(false); }}
              >
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold text-white leading-none">{user.name}</p>
                  <p className="text-[9px] text-blue-400 font-black tracking-widest uppercase mt-1">ID: #{user.id.substring(0,6)}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 overflow-hidden">
                  <img src={`https://picsum.photos/seed/${user.id}/100/100`} alt="Avatar" />
                </div>
                <ChevronDown size={14} className={`text-slate-500 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isProfileOpen && (
                <>
                  <div className="fixed inset-0" onClick={() => setIsProfileOpen(false)}></div>
                  <div className="absolute right-0 mt-4 w-56 bg-slate-900 border border-white/10 rounded-2xl shadow-3xl p-2 animate-in fade-in slide-in-from-top-4 duration-200 z-[110]">
                    <button onClick={() => { onNavigate(ViewState.ACCOUNT); setIsProfileOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                      <UserIcon size={18} /> Hồ sơ của tôi
                    </button>
                    {user.isAdmin && (
                      <button onClick={() => { onNavigate(ViewState.ADMIN); setIsProfileOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-orange-400 hover:bg-orange-400/10 rounded-xl transition-all">
                        <ShieldCheck size={18} /> Bảng quản trị
                      </button>
                    )}
                    <div className="h-px bg-white/5 my-2 mx-2"></div>
                    <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 rounded-xl transition-all font-bold">
                      <LogOut size={18} /> Đăng xuất
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Mobile Toggle */}
            <button className="lg:hidden p-2.5 text-slate-400" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-slate-900 border-b border-white/10 animate-in slide-in-from-top-2 duration-300">
            <nav className="p-4 flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { onNavigate(item.id as ViewState); setIsMobileMenuOpen(false); }}
                  className={`flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold ${
                    currentView === item.id ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-white/5'
                  }`}
                >
                  {item.icon} {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content with standard Web Container */}
      <main className="flex-1 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {children}
        </div>
      </main>

      {/* Professional Footer */}
      <footer className="bg-slate-900 border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">K</div>
            <span className="text-xl font-black text-white tracking-tighter">KiemTienNet</span>
          </div>
          <div className="flex gap-8 text-sm font-bold text-slate-500">
            <button onClick={() => onNavigate(ViewState.PRIVACY)} className="hover:text-blue-400 transition-colors">Điều khoản</button>
            <button onClick={() => onNavigate(ViewState.SUPPORT)} className="hover:text-blue-400 transition-colors">Hỗ trợ</button>
            <a href="https://zalo.me/0337117930" target="_blank" className="hover:text-blue-400 transition-colors">Zalo CSKH</a>
          </div>
          <p className="text-xs text-slate-600 font-bold uppercase tracking-widest">© 2025 KiemTienNet. Tech Solutions</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
