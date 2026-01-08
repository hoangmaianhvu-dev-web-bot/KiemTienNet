
import React, { useState } from 'react';
import { User, BankInfo } from '../types';
import { CreditCard, History, Building2, AlertCircle, Gamepad2, ArrowLeft, CheckCircle2 } from 'lucide-react';

interface WalletProps {
  user: User;
  onUpdateUser: (data: Partial<User>) => void;
  onWithdraw: (amount: number, method: string) => void;
}

const Wallet: React.FC<WalletProps> = ({ user, onUpdateUser, onWithdraw }) => {
  const [step, setStep] = useState<'SELECT' | 'SETUP_BANK' | 'SETUP_GARENA' | 'WITHDRAW_BANK' | 'WITHDRAW_GARENA'>('SELECT');
  const [amount, setAmount] = useState<string>('');
  
  const [bankForm, setBankForm] = useState<BankInfo>({
    bankName: '',
    accountNumber: '',
    accountOwner: ''
  });
  
  const [garenaEmail, setGarenaEmail] = useState<string>('');

  const handleSelectMethod = (method: 'BANK' | 'GARENA') => {
    if (method === 'BANK') {
      if (!user.bankInfo) setStep('SETUP_BANK');
      else setStep('WITHDRAW_BANK');
    } else {
      if (!user.garenaEmail) setStep('SETUP_GARENA');
      else setStep('WITHDRAW_GARENA');
    }
  };

  const handleSaveBank = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bankForm.bankName || !bankForm.accountNumber || !bankForm.accountOwner) return;
    onUpdateUser({ bankInfo: bankForm });
    setStep('WITHDRAW_BANK');
  };

  const handleSaveGarena = (e: React.FormEvent) => {
    e.preventDefault();
    if (!garenaEmail) return;
    onUpdateUser({ garenaEmail: garenaEmail });
    setStep('WITHDRAW_GARENA');
  };

  const handleConfirmWithdraw = (method: 'BANK' | 'GARENA') => {
    const val = parseInt(amount);
    const min = method === 'BANK' ? 20000 : 10000;
    
    if (isNaN(val) || val < min) {
      alert(`Số tiền tối thiểu là ${min.toLocaleString()}đ`);
      return;
    }
    if (val > user.balance) {
      alert("Số dư không đủ!");
      return;
    }

    if (confirm(`Bạn chắc chắn muốn rút ${val.toLocaleString()}đ?`)) {
      onWithdraw(val, method === 'BANK' ? `NH: ${user.bankInfo?.bankName}` : 'Thẻ Garena');
      alert("Lệnh rút tiền đã được gửi thành công!");
      setStep('SELECT');
      setAmount('');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-500">
      <div className="lg:col-span-2 space-y-8">
        {/* Compact Balance Card - Matches Image Style */}
        <div className="bg-gradient-to-br from-blue-700 to-indigo-900 p-6 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden h-64 flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          
          <div className="relative z-10">
            <p className="text-white/70 text-[10px] font-black uppercase tracking-[0.2em]">SỐ DƯ KHẢ DỤNG</p>
            <h2 className="text-5xl font-black mt-2 flex items-baseline gap-1">
              {user.balance.toLocaleString()}
              <span className="text-2xl font-bold">đ</span>
            </h2>
          </div>

          <div className="relative z-10 flex items-end justify-between">
            <div className="space-y-1">
              <p className="text-white/50 text-[10px] uppercase font-black tracking-widest">MÃ TÀI KHOẢN</p>
              <p className="text-xs font-mono font-bold text-white/80 uppercase">KT-{user.id.toUpperCase()}-0000</p>
            </div>
            <div className="w-12 h-12 bg-white/10 rounded-xl backdrop-blur-md flex items-center justify-center border border-white/20 shadow-lg">
              <CreditCard size={24} className="text-white/90" />
            </div>
          </div>
        </div>

        {/* Withdrawal View */}
        <div className="bg-slate-900 p-6 md:p-10 rounded-[2.5rem] border border-white/5 shadow-2xl min-h-[450px] flex flex-col">
          {step === 'SELECT' && (
            <div className="space-y-8 flex-1">
              <h3 className="text-2xl font-bold text-white">Rút tiền về tài khoản</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <button 
                  onClick={() => handleSelectMethod('BANK')}
                  className="flex flex-col items-center gap-6 p-10 bg-slate-800/50 border border-white/5 rounded-[2rem] hover:border-blue-500/50 hover:bg-slate-800 transition-all group"
                >
                  <div className="w-20 h-20 rounded-3xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform shadow-lg">
                    <Building2 size={40} />
                  </div>
                  <div className="text-center">
                    <h4 className="font-bold text-lg text-white">Chuyển khoản NH</h4>
                    <p className="text-xs text-slate-500 mt-2">Phí 0đ • Min 20,000đ</p>
                  </div>
                </button>

                <button 
                  onClick={() => handleSelectMethod('GARENA')}
                  className="flex flex-col items-center gap-6 p-10 bg-slate-800/50 border border-white/5 rounded-[2rem] hover:border-red-500/50 hover:bg-slate-800 transition-all group"
                >
                  <div className="w-20 h-20 rounded-3xl bg-red-500/10 flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform shadow-lg">
                    <Gamepad2 size={40} />
                  </div>
                  <div className="text-center">
                    <h4 className="font-bold text-lg text-white">Thẻ Garena</h4>
                    <p className="text-xs text-slate-500 mt-2">Phí 0% • Min 10,000đ</p>
                  </div>
                </button>
              </div>
            </div>
          )}

          {(step === 'SETUP_BANK' || step === 'SETUP_GARENA') && (
            <div className="space-y-8 flex-1">
              <button onClick={() => setStep('SELECT')} className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-300 transition-colors uppercase tracking-widest">
                <ArrowLeft size={14} /> Quay lại
              </button>
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-black text-white">Thiết lập ví</h3>
                <p className="text-sm text-slate-400">Thông tin này sẽ được lưu bảo mật cho lần sau.</p>
              </div>

              {step === 'SETUP_BANK' ? (
                <form onSubmit={handleSaveBank} className="max-w-md mx-auto space-y-4 pt-4">
                  <input 
                    type="text" placeholder="Tên Ngân hàng (Ví dụ: MB Bank)"
                    className="w-full px-6 py-4 bg-slate-800 border border-white/10 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-white placeholder:text-slate-600"
                    value={bankForm.bankName} onChange={e => setBankForm({...bankForm, bankName: e.target.value})} required
                  />
                  <input 
                    type="text" placeholder="Số tài khoản"
                    className="w-full px-6 py-4 bg-slate-800 border border-white/10 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-white placeholder:text-slate-600"
                    value={bankForm.accountNumber} onChange={e => setBankForm({...bankForm, accountNumber: e.target.value})} required
                  />
                  <input 
                    type="text" placeholder="Họ tên chủ tài khoản (Viết hoa)"
                    className="w-full px-6 py-4 bg-slate-800 border border-white/10 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-white placeholder:text-slate-600"
                    value={bankForm.accountOwner} onChange={e => setBankForm({...bankForm, accountOwner: e.target.value})} required
                  />
                  <button type="submit" className="w-full py-5 bg-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-900/20 hover:bg-blue-700 mt-4">Lưu & Tiếp tục</button>
                </form>
              ) : (
                <form onSubmit={handleSaveGarena} className="max-w-md mx-auto space-y-6 pt-4">
                  <div className="space-y-4">
                    <input 
                      type="email" placeholder="Địa chỉ Email nhận mã thẻ"
                      className="w-full px-6 py-4 bg-slate-800 border border-white/10 rounded-2xl focus:ring-2 focus:ring-red-500 outline-none text-white placeholder:text-slate-600"
                      value={garenaEmail} onChange={e => setGarenaEmail(e.target.value)} required
                    />
                    <div className="p-4 bg-red-500/5 rounded-2xl border border-red-500/10">
                      <p className="text-[10px] text-red-400 font-bold italic text-center leading-relaxed">
                        Lưu ý: Mã thẻ sẽ được gửi tự động qua email này. Vui lòng nhập chính xác.
                      </p>
                    </div>
                  </div>
                  <button type="submit" className="w-full py-5 bg-red-500 text-white rounded-2xl font-bold shadow-xl shadow-red-900/20 hover:bg-red-600">Xác nhận Email</button>
                </form>
              )}
            </div>
          )}

          {(step === 'WITHDRAW_BANK' || step === 'WITHDRAW_GARENA') && (
            <div className="space-y-8 flex-1">
              <button onClick={() => setStep('SELECT')} className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-300 transition-colors uppercase tracking-widest">
                <ArrowLeft size={14} /> Quay lại
              </button>
              
              <div className="bg-slate-800/50 p-6 rounded-3xl border border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-blue-400 font-black uppercase tracking-widest mb-1">Ví nhận tiền</p>
                  <h4 className="font-bold text-white text-lg leading-tight">
                    {step === 'WITHDRAW_BANK' ? `${user.bankInfo?.bankName}` : user.garenaEmail}
                  </h4>
                  <p className="text-sm text-slate-500">{step === 'WITHDRAW_BANK' ? user.bankInfo?.accountNumber : 'Thẻ nạp Garena'}</p>
                </div>
                <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center border border-emerald-500/20">
                  <CheckCircle2 size={24} />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 block">Số tiền rút</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      placeholder={step === 'WITHDRAW_BANK' ? "Min 20,000" : "Min 10,000"}
                      value={amount}
                      onChange={e => setAmount(e.target.value)}
                      className="w-full px-8 py-6 bg-slate-800 border-2 border-white/5 rounded-3xl text-4xl font-black text-white focus:border-blue-500 outline-none pr-16"
                    />
                    <span className="absolute right-8 top-1/2 -translate-y-1/2 text-2xl font-black text-slate-700">đ</span>
                  </div>
                </div>
                
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {[10000, 20000, 50000, 100000, 200000, 500000].map(val => (
                    <button 
                      key={val} onClick={() => setAmount(val.toString())}
                      className="px-4 py-2 bg-slate-800 rounded-xl text-xs font-black text-slate-400 hover:bg-white/5 hover:text-white border border-white/5 transition-all whitespace-nowrap"
                    >
                      {val.toLocaleString()}đ
                    </button>
                  ))}
                </div>

                <button 
                  onClick={() => handleConfirmWithdraw(step === 'WITHDRAW_BANK' ? 'BANK' : 'GARENA')}
                  className={`w-full py-5 mt-4 text-white rounded-2xl font-black text-xl shadow-2xl transition-all ${step === 'WITHDRAW_BANK' ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-900/20' : 'bg-red-500 hover:bg-red-600 shadow-red-900/20'}`}
                >
                  Rút tiền ngay
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-slate-900 p-8 rounded-[2rem] border border-white/5 shadow-2xl">
          <h3 className="font-bold text-white flex items-center gap-3 mb-8">
            <History size={20} className="text-blue-400" />
            Lịch sử giao dịch
          </h3>
          <div className="py-20 text-center opacity-40">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <History size={28} className="text-slate-600" />
            </div>
            <p className="text-sm font-bold text-slate-500">Chưa có giao dịch nào</p>
          </div>
        </div>

        <div className="bg-blue-500/5 p-6 rounded-[2rem] border border-blue-500/10 space-y-4">
          <div className="flex items-center gap-3 text-blue-400">
            <AlertCircle size={20} />
            <h4 className="font-black text-xs uppercase tracking-widest">Quy định rút tiền</h4>
          </div>
          <ul className="text-xs text-slate-400 space-y-3 leading-relaxed font-medium">
            <li className="flex gap-2">
              <span className="text-blue-400 font-bold">•</span>
              <span><strong>Ngân hàng:</strong> Tối thiểu rút 20,000đ. Xử lý trong vòng 24h.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-400 font-bold">•</span>
              <span><strong>Thẻ Garena:</strong> Tối thiểu 10,000đ. Gửi mã qua Email sau 15p.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-400 font-bold">•</span>
              <span>Vui lòng kiểm tra kỹ thông tin. Hệ thống không hỗ trợ hoàn tiền nếu nhập sai số TK/Email.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
