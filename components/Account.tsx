
import React, { useState } from 'react';
import { User, BankInfo, ViewState } from '../types';
import { Shield, Calendar, Award, LogOut, Settings, Bell, ChevronRight, Building2, Mail, Edit3, X, Lock } from 'lucide-react';

interface AccountProps {
  user: User;
  onUpdateUser: (data: Partial<User>) => void;
  onLogout: () => void;
  onNavigate: (view: ViewState) => void;
}

const Account: React.FC<AccountProps> = ({ user, onUpdateUser, onLogout, onNavigate }) => {
  const [isEditingBank, setIsEditingBank] = useState(false);
  const [bankForm, setBankForm] = useState<BankInfo>(user.bankInfo || { bankName: '', accountNumber: '', accountOwner: '' });
  const [isEditingGarena, setIsEditingGarena] = useState(false);
  const [garenaEmail, setGarenaEmail] = useState(user.garenaEmail || '');

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="bg-slate-900 p-8 md:p-10 rounded-[2.5rem] border border-white/5 shadow-2xl flex flex-col md:flex-row items-center gap-10">
        <div className="relative group">
          <div className="w-36 h-36 bg-slate-800 rounded-full overflow-hidden border-4 border-slate-950 shadow-2xl group-hover:scale-105 transition-transform">
            <img src={`https://picsum.photos/seed/${user.id}/144/144`} alt="Avatar" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="flex-1 text-center md:text-left space-y-3">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <h1 className="text-4xl font-black text-white">{user.name}</h1>
            <span className={`inline-flex px-4 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest ${user.membership === 'VIP' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' : 'bg-white/5 text-slate-400 border border-white/5'}`}>{user.membership} MEMBER</span>
          </div>
          <p className="text-slate-500 text-sm font-bold tracking-widest">ID: #{user.id.toUpperCase()}</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-6 pt-2">
             <div className="flex items-center gap-2 text-xs font-bold text-slate-400"><Calendar size={16} className="text-blue-500" /> Tham gia: {user.joinDate}</div>
             <div className="flex items-center gap-2 text-xs font-bold text-emerald-400"><Shield size={16} /> Đã xác minh</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-white ml-2">Ví thanh toán đã lưu</h3>
          <div className="bg-slate-900 p-8 rounded-[2rem] border border-white/5 shadow-2xl space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-blue-400 font-black text-xs uppercase tracking-widest"><Building2 size={20} /> Ngân hàng</div>
              <button onClick={() => setIsEditingBank(!isEditingBank)} className="p-2 bg-white/5 rounded-xl text-slate-500 hover:text-blue-400 transition-colors">{isEditingBank ? <X size={18} /> : <Edit3 size={18} />}</button>
            </div>
            {isEditingBank ? (
              <div className="space-y-4">
                <input type="text" value={bankForm.bankName} onChange={e => setBankForm({...bankForm, bankName: e.target.value})} className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl outline-none text-white text-sm" placeholder="Tên NH" />
                <input type="text" value={bankForm.accountNumber} onChange={e => setBankForm({...bankForm, accountNumber: e.target.value})} className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl outline-none text-white text-sm" placeholder="Số TK" />
                <input type="text" value={bankForm.accountOwner} onChange={e => setBankForm({...bankForm, accountOwner: e.target.value})} className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl outline-none text-white text-sm" placeholder="Họ tên" />
                <button onClick={() => { onUpdateUser({ bankInfo: bankForm }); setIsEditingBank(false); }} className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold">Lưu thông tin</button>
              </div>
            ) : (
              <div className="p-6 bg-slate-800/50 rounded-2xl border border-white/5">
                {user.bankInfo ? <div className="space-y-1"><p className="text-lg font-bold text-white">{user.bankInfo.bankName}</p><p className="text-sm text-slate-400">{user.bankInfo.accountNumber}</p><p className="text-[10px] text-slate-500 font-black uppercase mt-1">{user.bankInfo.accountOwner}</p></div> : <p className="text-xs text-slate-600">Chưa liên kết ngân hàng.</p>}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-bold text-white ml-2">Cài đặt hệ thống</h3>
          <div className="bg-slate-900 rounded-[2rem] border border-white/5 shadow-2xl overflow-hidden divide-y divide-white/5">
            <button onClick={() => onNavigate(ViewState.PRIVACY)} className="w-full flex items-center justify-between p-6 hover:bg-white/5 transition-all group">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-slate-800 rounded-lg text-blue-400 group-hover:scale-110 transition-transform"><Lock size={18} /></div>
                <span className="text-sm font-bold text-slate-300">Quyền riêng tư</span>
              </div>
              <ChevronRight size={18} className="text-slate-600 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full flex items-center justify-between p-6 hover:bg-white/5 transition-all group">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-slate-800 rounded-lg text-yellow-400 group-hover:scale-110 transition-transform"><Award size={18} /></div>
                <span className="text-sm font-bold text-slate-300">Lịch sử nhận quà</span>
              </div>
              <ChevronRight size={18} className="text-slate-600 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <button onClick={onLogout} className="w-full py-5 bg-red-500/10 text-red-500 border border-red-500/20 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-red-500 hover:text-white transition-all"><LogOut size={20} /> Đăng xuất hệ thống</button>
        </div>
      </div>
    </div>
  );
};

export default Account;
