
import React from 'react';
import { INITIAL_USER } from '../constants';
import { CreditCard, History, Smartphone, Building2, AlertCircle, ChevronRight } from 'lucide-react';

const Wallet: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="lg:col-span-2 space-y-8">
        {/* Balance Card */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-[2rem] text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="relative z-10">
            <p className="text-slate-400 text-sm font-medium uppercase tracking-widest">Khả dụng để rút</p>
            <h2 className="text-5xl font-black mt-2 tracking-tight">{INITIAL_USER.balance.toLocaleString()}đ</h2>
            <div className="mt-12 flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-[10px] uppercase font-bold">Mã tài khoản</p>
                <p className="text-sm font-mono tracking-widest">**** **** **** 8899</p>
              </div>
              <div className="w-12 h-12 bg-white/10 rounded-xl backdrop-blur-md flex items-center justify-center">
                <CreditCard size={24} className="text-blue-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Withdrawal Options */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900">Phương thức rút tiền</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: 'Chuyển khoản Ngân hàng', desc: 'Rút về mọi NH tại VN', icon: <Building2 className="text-blue-600" />, time: '2-24h' },
              { title: 'Thẻ cào / Data', desc: 'Viettel, Mobi, Vina', icon: <Smartphone className="text-orange-500" />, time: '30 phút' },
              { title: 'Ví điện tử Momo', desc: 'Rút nhanh 24/7', icon: <div className="w-6 h-6 bg-[#A50064] rounded flex items-center justify-center text-[10px] font-bold text-white">M</div>, time: '5 phút' },
              { title: 'Ví điện tử ZaloPay', desc: 'Rút tiền siêu tốc', icon: <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center text-[10px] font-bold text-white">Z</div>, time: '5 phút' },
            ].map((opt, i) => (
              <button key={i} className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-2xl hover:border-blue-500 hover:shadow-md transition-all group">
                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                  {opt.icon}
                </div>
                <div className="text-left flex-1">
                  <h4 className="font-bold text-slate-900 text-sm">{opt.title}</h4>
                  <p className="text-xs text-slate-500">{opt.desc}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-blue-600">{opt.time}</p>
                  <ChevronRight size={14} className="ml-auto text-slate-300" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* History & Guidelines */}
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <History size={18} className="text-blue-600" />
              Giao dịch gần đây
            </h3>
            <button className="text-xs text-blue-600 font-bold">Tất cả</button>
          </div>
          <div className="space-y-4">
            {[
              { type: 'Rút tiền', amount: -50000, date: 'Hôm nay', status: 'Đang xử lý', color: 'text-orange-500' },
              { type: 'Thưởng nhiệm vụ', amount: 1200, date: 'Hôm qua', status: 'Thành công', color: 'text-emerald-500' },
              { type: 'Thưởng nhiệm vụ', amount: 55000, date: '2 ngày trước', status: 'Thành công', color: 'text-emerald-500' },
            ].map((tx, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                <div>
                  <p className="text-sm font-bold text-slate-900">{tx.type}</p>
                  <p className="text-[10px] text-slate-400">{tx.date} • <span className={tx.color}>{tx.status}</span></p>
                </div>
                <p className={`text-sm font-bold ${tx.amount > 0 ? 'text-emerald-600' : 'text-slate-900'}`}>
                  {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString()}đ
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-orange-50 p-5 rounded-2xl border border-orange-100 space-y-3">
          <div className="flex items-center gap-2 text-orange-700">
            <AlertCircle size={18} />
            <h4 className="font-bold text-sm">Lưu ý quan trọng</h4>
          </div>
          <ul className="text-xs text-orange-600 space-y-2 list-disc list-inside leading-relaxed">
            <li>Hạn mức rút tối thiểu là 10,000đ.</li>
            <li>Đảm bảo thông tin số tài khoản chính xác 100%.</li>
            <li>Các giao dịch xử lý chậm có thể mất tới 24h.</li>
            <li>Phí rút tiền cố định là 1% trên mỗi giao dịch.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
