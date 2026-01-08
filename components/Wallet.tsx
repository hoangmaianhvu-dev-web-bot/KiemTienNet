
import React, { useState } from 'react';
import { User, BankInfo, Transaction } from '../types';
import { CreditCard, History, Building2, AlertCircle, Gamepad2, ArrowLeft, CheckCircle2, Clock, XCircle } from 'lucide-react';

interface WalletProps {
  user: User;
  onUpdateUser: (data: Partial<User>) => void;
  onWithdraw: (amount: number, method: string) => void;
  history: Transaction[];
}

const Wallet: React.FC<WalletProps> = ({ user, onUpdateUser, onWithdraw, history }) => {
  const [step, setStep] = useState<'SELECT' | 'SETUP_BANK' | 'SETUP_GARENA' | 'WITHDRAW_BANK' | 'WITHDRAW_GARENA'>('SELECT');
  const [amount, setAmount] = useState<string>('');
  const [bankForm, setBankForm] = useState<BankInfo>(user.bankInfo || { bankName: '', accountNumber: '', accountOwner: '' });
  const [garenaEmail, setGarenaEmail] = useState<string>(user.garenaEmail || '');

  const handleConfirmWithdraw = (method: 'BANK' | 'GARENA') => {
    const val = parseInt(amount);
    if (isNaN(val) || val < (method === 'BANK' ? 20000 : 10000)) { alert("Số tiền không hợp lệ!"); return; }
    if (val > user.balance) { alert("Số dư không đủ!"); return; }
    onWithdraw(val, method === 'BANK' ? `NH: ${user.bankInfo?.bankName}` : 'Thẻ Garena');
    setStep('SELECT');
    setAmount('');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-500 pb-20">
      <div className="lg:col-span-2 space-y-8">
        <div className="bg-gradient-to-br from-blue-700 to-indigo-900 p-6 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden h-64 flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="relative z-10">
            <p className="text-white/70 text-[10px] font-black uppercase tracking-[0.2em]">SỐ DƯ KHẢ DỤNG</p>
            <h2 className="text-5xl font-black mt-2 flex items-baseline gap-1">{user.balance.toLocaleString()}<span className="text-2xl font-bold">đ</span></h2>
          </div>
          <div className="relative z-10 flex items-end justify-between">
            <div className="space-y-1"><p className="text-white/50 text-[10px] uppercase font-black tracking-widest">Tài khoản</p><p className="text-xs font-mono font-bold text-white/80 uppercase">#{user.id.substring(0,8).toUpperCase()}</p></div>
            <div className="w-12 h-12 bg-white/10 rounded-xl backdrop-blur-md flex items-center justify-center border border-white/20"><CreditCard size={24} /></div>
          </div>
        </div>

        <div className="bg-slate-900 p-6 md:p-10 rounded-[2.5rem] border border-white/5 shadow-2xl min-h-[400px]">
          {step === 'SELECT' ? (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-white">Chọn phương thức rút</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <button onClick={() => user.bankInfo ? setStep('WITHDRAW_BANK') : setStep('SETUP_BANK')} className="flex flex-col items-center gap-6 p-10 bg-slate-800/50 border border-white/5 rounded-[2rem] hover:border-blue-500/50 transition-all group">
                  <div className="w-20 h-20 rounded-3xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-all"><Building2 size={40} /></div>
                  <h4 className="font-bold text-lg text-white">Chuyển khoản NH</h4>
                </button>
                <button onClick={() => user.garenaEmail ? setStep('WITHDRAW_GARENA') : setStep('SETUP_GARENA')} className="flex flex-col items-center gap-6 p-10 bg-slate-800/50 border border-white/5 rounded-[2rem] hover:border-red-500/50 transition-all group">
                  <div className="w-20 h-20 rounded-3xl bg-red-500/10 flex items-center justify-center text-red-400 group-hover:scale-110 transition-all"><Gamepad2 size={40} /></div>
                  <h4 className="font-bold text-lg text-white">Thẻ Garena</h4>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <button onClick={() => setStep('SELECT')} className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-300 uppercase"><ArrowLeft size={14} /> Quay lại</button>
              {(step === 'SETUP_BANK' || step === 'SETUP_GARENA') ? (
                <div className="space-y-6">
                  <h3 className="text-2xl font-black text-white">Cài đặt ví</h3>
                  <input type="text" placeholder="Nhập thông tin cần thiết..." className="w-full px-6 py-4 bg-slate-800 rounded-2xl border border-white/10 text-white outline-none" onChange={e => step === 'SETUP_BANK' ? setBankForm({...bankForm, bankName: e.target.value}) : setGarenaEmail(e.target.value)} />
                  <button onClick={() => { if(step==='SETUP_BANK') onUpdateUser({bankInfo: bankForm}); else onUpdateUser({garenaEmail}); setStep('SELECT'); }} className="w-full py-5 bg-blue-600 rounded-2xl font-bold">Lưu & Tiếp tục</button>
                </div>
              ) : (
                <div className="space-y-6">
                  <h3 className="text-2xl font-black text-white">Số tiền muốn rút</h3>
                  <div className="relative"><input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="w-full px-8 py-6 bg-slate-800 border-2 border-white/5 rounded-3xl text-4xl font-black text-white outline-none focus:border-blue-500" /><span className="absolute right-8 top-1/2 -translate-y-1/2 text-2xl font-black text-slate-700">đ</span></div>
                  <button onClick={() => handleConfirmWithdraw(step === 'WITHDRAW_BANK' ? 'BANK' : 'GARENA')} className="w-full py-5 bg-blue-600 rounded-2xl font-black text-xl shadow-2xl">Xác nhận rút tiền</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-slate-900 p-8 rounded-[2rem] border border-white/5 shadow-2xl">
          <h3 className="font-bold text-white flex items-center gap-3 mb-8"><History size={20} className="text-blue-400" /> Lịch sử rút tiền</h3>
          <div className="space-y-4">
            {history.length > 0 ? history.map(tx => (
              <div key={tx.id} className="p-4 bg-white/5 rounded-xl border border-white/5 flex justify-between items-center">
                <div>
                  <p className="text-xs font-black text-white">{tx.amount.toLocaleString()}đ</p>
                  <p className="text-[9px] text-slate-500 font-bold mt-0.5">{tx.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${tx.status === 'PENDING' ? 'bg-orange-500/10 text-orange-400' : tx.status === 'SUCCESS' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                    {tx.status}
                  </span>
                  {tx.status === 'PENDING' ? <Clock size={12} className="text-orange-400" /> : tx.status === 'SUCCESS' ? <CheckCircle2 size={12} className="text-emerald-400" /> : <XCircle size={12} className="text-red-400" />}
                </div>
              </div>
            )) : (
              <div className="py-12 text-center opacity-30 italic text-xs font-bold">Chưa có giao dịch nào</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
