
import React, { useState } from 'react';
import { User, BankInfo } from '../types';
import { Shield, Calendar, Award, LogOut, Settings, Bell, ChevronRight, Building2, Mail, Edit3, X } from 'lucide-react';

interface AccountProps {
  user: User;
  onUpdateUser: (data: Partial<User>) => void;
}

const Account: React.FC<AccountProps> = ({ user, onUpdateUser }) => {
  const [isEditingBank, setIsEditingBank] = useState(false);
  const [bankForm, setBankForm] = useState<BankInfo>(user.bankInfo || { bankName: '', accountNumber: '', accountOwner: '' });
  
  const [isEditingGarena, setIsEditingGarena] = useState(false);
  const [garenaEmail, setGarenaEmail] = useState(user.garenaEmail || '');

  const saveBank = () => {
    onUpdateUser({ bankInfo: bankForm });
    setIsEditingBank(false);
  };

  const saveGarena = () => {
    onUpdateUser({ garenaEmail: garenaEmail });
    setIsEditingGarena(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="bg-slate-900 p-8 md:p-10 rounded-[2.5rem] border border-white/5 shadow-2xl flex flex-col md:flex-row items-center gap-10">
        <div className="relative group">
          <div className="w-36 h-36 bg-slate-800 rounded-full overflow-hidden border-4 border-slate-950 shadow-2xl group-hover:scale-105 transition-transform">
            <img src={`https://picsum.photos/seed/${user.id}/144/144`} alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <div className="absolute bottom-1 right-1 p-2.5 bg-blue-600 text-white rounded-full border-4 border-slate-950 shadow-xl cursor-pointer hover:bg-blue-700 transition-colors">
            <Settings size={18} />
          </div>
        </div>
        
        <div className="flex-1 text-center md:text-left space-y-3">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <h1 className="text-4xl font-black text-white">{user.name}</h1>
            <span className={`inline-flex px-4 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest ${user.membership === 'VIP' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' : 'bg-white/5 text-slate-400 border border-white/5'}`}>
              VIP MEMBER
            </span>
          </div>
          <p className="text-slate-500 text-sm font-bold tracking-widest">ID: #{user.id.toUpperCase()} • CODE: {user.referralCode}</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-6 pt-2">
             <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
               <Calendar size={16} className="text-blue-500" />
               Tham gia: {user.joinDate}
             </div>
             <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
               <Shield size={16} />
               Đã xác minh
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-white ml-2">Ví thanh toán đã lưu</h3>
          
          {/* Bank Info */}
          <div className="bg-slate-900 p-8 rounded-[2rem] border border-white/5 shadow-2xl space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-blue-400 font-black text-xs uppercase tracking-widest">
                <Building2 size={20} /> Ngân hàng
              </div>
              <button onClick={() => setIsEditingBank(!isEditingBank)} className="p-2 bg-white/5 rounded-xl text-slate-500 hover:text-blue-400 transition-colors">
                {isEditingBank ? <X size={18} /> : <Edit3 size={18} />}
              </button>
            </div>
            
            {isEditingBank ? (
              <div className="space-y-4">
                <input type="text" value={bankForm.bankName} onChange={e => setBankForm({...bankForm, bankName: e.target.value})} className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-white text-sm" placeholder="Tên NH (Ví dụ: Techcombank)" />
                <input type="text" value={bankForm.accountNumber} onChange={e => setBankForm({...bankForm, accountNumber: e.target.value})} className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-white text-sm" placeholder="Số tài khoản" />
                <input type="text" value={bankForm.accountOwner} onChange={e => setBankForm({...bankForm, accountOwner: e.target.value})} className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-white text-sm" placeholder="Chủ tài khoản" />
                <button onClick={saveBank} className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-900/20 mt-2">Lưu thông tin</button>
              </div>
            ) : (
              <div className="p-6 bg-slate-800/50 rounded-2xl border border-white/5">
                {user.bankInfo ? (
                  <div className="space-y-2">
                    <p className="text-lg font-bold text-white">{user.bankInfo.bankName}</p>
                    <p className="text-sm text-slate-400 font-mono tracking-wider">{user.bankInfo.accountNumber}</p>
                    <p className="text-xs text-slate-500 font-black uppercase tracking-widest mt-2">{user.bankInfo.accountOwner}</p>
                  </div>
                ) : (
                  <p className="text-sm text-slate-600 italic">Chưa liên kết ngân hàng.</p>
                )}
              </div>
            )}
          </div>

          {/* Garena Email */}
          <div className="bg-slate-900 p-8 rounded-[2rem] border border-white/5 shadow-2xl space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-red-400 font-black text-xs uppercase tracking-widest">
                <Mail size={20} /> Email nhận thẻ
              </div>
              <button onClick={() => setIsEditingGarena(!isEditingGarena)} className="p-2 bg-white/5 rounded-xl text-slate-500 hover:text-red-400 transition-colors">
                {isEditingGarena ? <X size={18} /> : <Edit3 size={18} />}
              </button>
            </div>
            
            {isEditingGarena ? (
              <div className="space-y-4">
                <input type="email" value={garenaEmail} onChange={e => setGarenaEmail(e.target.value)} className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-red-500 text-white text-sm" placeholder="Nhập Email mới" />
                <button onClick={saveGarena} className="w-full py-4 bg-red-500 text-white rounded-xl font-bold shadow-lg shadow-red-900/20 mt-2">Cập nhật Email</button>
              </div>
            ) : (
              <div className="p-6 bg-slate-800/50 rounded-2xl border border-white/5">
                {user.garenaEmail ? (
                  <p className="text-lg font-bold text-white truncate">{user.garenaEmail}</p>
                ) : (
                  <p className="text-sm text-slate-600 italic">Chưa thiết lập Email Garena.</p>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-bold text-white ml-2">Cài đặt hệ thống</h3>
          <div className="bg-slate-900 rounded-[2rem] border border-white/5 shadow-2xl overflow-hidden divide-y divide-white/5">
            {[
              { label: 'Lịch sử nhận quà', icon: <Award size={18} />, color: 'text-yellow-400' },
              { label: 'Thông báo & Đẩy tin', icon: <Bell size={18} />, color: 'text-orange-400' },
              { label: 'Quyền riêng tư', icon: <Shield size={18} />, color: 'text-blue-400' },
            ].map((item, i) => (
              <button key={i} className="w-full flex items-center justify-between p-6 hover:bg-white/5 transition-all group">
                <div className="flex items-center gap-4">
                  <div className={`p-2 bg-slate-800 rounded-lg ${item.color} group-hover:scale-110 transition-transform`}>{item.icon}</div>
                  <span className="text-sm font-bold text-slate-300">{item.label}</span>
                </div>
                <ChevronRight size={18} className="text-slate-600 group-hover:translate-x-1 transition-transform" />
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-900 p-6 rounded-2xl border border-white/5 shadow-xl text-center">
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Số dư</p>
              <p className="text-2xl font-black text-blue-400">{user.balance.toLocaleString()}đ</p>
            </div>
            <div className="bg-slate-900 p-6 rounded-2xl border border-white/5 shadow-xl text-center">
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Đã rút</p>
              <p className="text-2xl font-black text-slate-100">{user.totalEarned.toLocaleString()}đ</p>
            </div>
          </div>

          <button 
            onClick={() => window.location.reload()}
            className="w-full py-5 bg-red-500/10 text-red-500 border border-red-500/20 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-red-500 hover:text-white transition-all shadow-xl"
          >
            <LogOut size={20} /> Đăng xuất hệ thống
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;