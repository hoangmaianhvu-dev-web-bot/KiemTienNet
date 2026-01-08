
import React from 'react';
import { INITIAL_USER } from '../constants';
import { Copy, Gift, Share2, Award, Zap } from 'lucide-react';

const Referral: React.FC = () => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Đã sao chép vào bộ nhớ tạm!');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-4">
        <div className="inline-flex p-4 bg-blue-50 rounded-full text-blue-600 mb-2">
          <Gift size={48} className="animate-bounce" />
        </div>
        <h1 className="text-3xl font-black text-slate-900">Mời bạn bè, nhận hoa hồng 20%!</h1>
        <p className="text-slate-500 max-w-lg mx-auto">
          Nhận ngay 20% hoa hồng trên mỗi nhiệm vụ bạn bè của bạn hoàn thành. 
          Càng nhiều bạn bè, thu nhập thụ động càng lớn.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
          <div className="space-y-4">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Mã giới thiệu của bạn</label>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-slate-50 border-2 border-dashed border-slate-200 px-6 py-4 rounded-2xl text-2xl font-black text-blue-600 text-center tracking-[0.5em]">
                {INITIAL_USER.referralCode}
              </div>
              <button 
                onClick={() => copyToClipboard(INITIAL_USER.referralCode)}
                className="p-5 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
              >
                <Copy size={24} />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Link giới thiệu trực tiếp</label>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-slate-50 px-4 py-3 rounded-xl text-sm text-slate-600 truncate border border-slate-200">
                https://kiemtiennet.io/join?ref={INITIAL_USER.referralCode}
              </div>
              <button 
                onClick={() => copyToClipboard(`https://kiemtiennet.io/join?ref=${INITIAL_USER.referralCode}`)}
                className="p-3 text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
              >
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-8 rounded-3xl text-white shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Award className="text-yellow-400" size={32} />
              <h3 className="text-xl font-bold">Hệ thống cấp bậc</h3>
            </div>
            <p className="text-indigo-100 text-sm leading-relaxed">
              Khi đạt 100 lượt giới thiệu hoạt động, bạn sẽ được nâng cấp lên <strong>Đối tác Vàng</strong> với hoa hồng 30% và rút tiền ưu tiên.
            </p>
          </div>
          
          <div className="mt-8 p-4 bg-white/10 rounded-2xl border border-white/20">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-medium">Tiến trình (28/100)</span>
              <span className="text-xs font-bold text-yellow-400">Level 1</span>
            </div>
            <div className="h-2 w-full bg-black/20 rounded-full overflow-hidden">
              <div className="h-full bg-yellow-400 w-[28%]"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <Zap className="text-orange-500" />
          Cách thức hoạt động
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            { step: '01', title: 'Gửi lời mời', desc: 'Chia sẻ mã hoặc link giới thiệu cho bạn bè.' },
            { step: '02', title: 'Bạn bè đăng ký', desc: 'Người được mời thực hiện nhiệm vụ đầu tiên.' },
            { step: '03', title: 'Nhận hoa hồng', desc: 'Hệ thống tự động cộng tiền vào tài khoản của bạn.' },
          ].map((item, i) => (
            <div key={i} className="space-y-3">
              <span className="text-4xl font-black text-slate-100 block">{item.step}</span>
              <h4 className="font-bold text-slate-900">{item.title}</h4>
              <p className="text-sm text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Referral;
