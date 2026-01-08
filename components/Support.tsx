
import React from 'react';
import { MessageCircle, Mail, Globe, Send, PhoneCall, ExternalLink, MessageSquare } from 'lucide-react';

const Support: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-500 pb-20">
      <div className="text-center space-y-4">
        <div className="inline-flex p-6 bg-blue-500/10 rounded-[2rem] text-blue-400 mb-2 shadow-xl border border-blue-500/5">
          <MessageCircle size={48} />
        </div>
        <h1 className="text-4xl font-black text-white tracking-tight">Trung tâm hỗ trợ</h1>
        <p className="text-slate-400 max-w-lg mx-auto leading-relaxed">Chúng tôi luôn sẵn sàng giải đáp thắc mắc của bạn 24/7. Hãy chọn phương thức liên hệ phù hợp bên dưới.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { 
            title: 'Hỗ trợ Zalo', 
            desc: 'Nhắn tin trực tiếp qua Zalo 0337117930 để được giải đáp tức thì.', 
            icon: <MessageSquare size={28} className="text-blue-500" />, 
            action: 'Mở Zalo 0337117930', 
            link: 'https://zalo.me/0337117930' 
          },
          { 
            title: 'Email hỗ trợ', 
            desc: 'Liên hệ qua hòm thư anhvuzzz09@gmail.com cho các vấn đề khiếu nại.', 
            icon: <Mail size={28} className="text-red-400" />, 
            action: 'Gửi Email ngay', 
            link: 'mailto:anhvuzzz09@gmail.com' 
          },
          { 
            title: 'Nhóm Telegram', 
            desc: 'Cộng đồng trao đổi MMO lớn nhất, nơi chia sẻ kinh nghiệm kiếm tiền.', 
            icon: <Send size={28} className="text-[#229ED9]" />, 
            action: 'Tham gia nhóm', 
            link: '#' 
          },
          { 
            title: 'Hotline ưu tiên', 
            desc: 'Dành riêng cho thành viên VIP, hỗ trợ trực tiếp mọi vấn đề kỹ thuật.', 
            icon: <PhoneCall size={28} className="text-emerald-400" />, 
            action: 'Gọi 0337117930', 
            link: 'tel:0337117930' 
          },
        ].map((item, i) => (
          <a key={i} href={item.link} target="_blank" rel="noopener noreferrer" className="bg-slate-900 p-8 rounded-[2rem] border border-white/5 shadow-2xl flex items-center gap-6 hover:border-white/10 transition-all group cursor-pointer">
            <div className="p-5 bg-slate-800 rounded-2xl group-hover:scale-110 transition-all shadow-lg">
              {item.icon}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-white text-lg">{item.title}</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.desc}</p>
              <span className="text-xs font-black text-blue-400 mt-4 flex items-center gap-2 hover:underline tracking-widest uppercase">
                {item.action} <ExternalLink size={14} />
              </span>
            </div>
          </a>
        ))}
      </div>

      <div className="bg-slate-900 p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl">
        <h3 className="text-2xl font-black text-white mb-8">Câu hỏi thường gặp</h3>
        <div className="space-y-6">
          {[
            { q: 'Làm sao để nhận tiền sau khi vượt link?', a: 'Hệ thống sẽ tự động cộng tiền vào số dư của bạn ngay sau khi bạn hoàn thành các bước yêu cầu trên trang liên kết.' },
            { q: 'Thời gian xử lý rút tiền là bao lâu?', a: 'Lệnh rút tiền qua Ngân hàng xử lý trong 24h, Thẻ Garena xử lý trong 15-30 phút.' },
            { q: 'Tôi có thể thay đổi số tài khoản ngân hàng không?', a: 'Có, bạn vào phần Tài khoản -> Chỉnh sửa thông tin Ngân hàng để cập nhật.' },
          ].map((faq, i) => (
            <div key={i} className="p-6 bg-white/5 rounded-2xl border border-white/5">
              <h4 className="font-bold text-blue-400 text-sm">Q: {faq.q}</h4>
              <p className="text-sm text-slate-400 mt-3 leading-relaxed font-medium">A: {faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Support;
