
import React, { useState } from 'react';
import { Mission } from '../types';
import { ExternalLink, Link as LinkIcon, Smartphone, PlayCircle, Search, TrendingUp, Zap } from 'lucide-react';

interface MissionListProps {
  missions: Mission[];
}

const MissionList: React.FC<MissionListProps> = ({ missions }) => {
  const [filter, setFilter] = useState<'ALL' | 'LINK' | 'APP' | 'SOCIAL'>('ALL');
  const [search, setSearch] = useState('');

  const handleStartMission = (mission: Mission) => {
    // 1. Tạo token ngẫu nhiên
    const token = Math.random().toString(36).substring(2, 15);
    // 2. Lưu vào localStorage để đối chiếu khi quay lại
    localStorage.setItem('active_token', token);
    
    // 3. Build URL Blog (Thay đổi link blog của bạn tại đây)
    const blogUrl = "https://avudev-verifi.blogspot.com/";
    const finalUrl = `${blogUrl}?token=${token}&mission_id=${mission.id}`;
    
    if (confirm(`Bạn sẽ được chuyển đến trang nhiệm vụ. Hoàn thành để Bot tự động cộng ${mission.reward.toLocaleString()}đ vào tài khoản!`)) {
      window.open(finalUrl, '_blank');
    }
  };

  const filteredMissions = missions.filter(m => {
    const matchesFilter = filter === 'ALL' || m.type === filter;
    const matchesSearch = m.title.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-10 animate-in slide-in-from-bottom-6 duration-500 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <div className="text-blue-500 text-[10px] font-black uppercase tracking-widest mb-3 flex items-center gap-2">
            <TrendingUp size={14} /> Hệ thống Auto Duyệt 2.0
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter">Nhiệm Vụ <span className="text-slate-500">Kiếm Tiền</span></h1>
          <p className="text-slate-500 mt-2 font-medium">Hoàn thành các nhiệm vụ bên dưới, tiền sẽ tự động nhảy vào ví.</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 relative">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
          <input
            type="text"
            placeholder="Tìm nhiệm vụ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-16 pr-6 py-5 bg-slate-900 border border-white/5 rounded-[2rem] text-slate-100 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all shadow-xl font-medium"
          />
        </div>
        <div className="bg-slate-900 p-2 rounded-[2rem] border border-white/5 flex gap-1 shadow-xl">
          {['ALL', 'LINK', 'APP', 'SOCIAL'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-6 py-3 rounded-full text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                filter === f ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {f === 'ALL' ? 'Tất cả' : f === 'LINK' ? 'Vượt link' : f === 'APP' ? 'Ứng dụng' : 'Video'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredMissions.map((mission) => (
          <div key={mission.id} className="bg-slate-900 p-8 rounded-[3rem] border border-white/5 shadow-2xl hover:border-blue-500/30 transition-all flex flex-col group relative overflow-hidden">
            <div className="flex items-start justify-between mb-8">
              <div className="p-4 bg-blue-600/10 text-blue-400 rounded-3xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                <Zap size={24} />
              </div>
              <div className="text-right">
                <span className="text-[9px] text-slate-600 font-black uppercase tracking-[0.2em] block mb-1">Tiền thưởng</span>
                <p className="text-2xl font-black text-emerald-400 tracking-tighter">+{mission.reward.toLocaleString()}đ</p>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-3">{mission.title}</h3>
            <p className="text-sm text-slate-500 font-medium leading-relaxed mb-8 flex-1">
              {mission.description}
            </p>

            <button 
              onClick={() => handleStartMission(mission)}
              className="w-full py-5 bg-white text-black font-black text-[11px] uppercase tracking-widest rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2"
            >
              LÀM NHIỆM VỤ <ExternalLink size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MissionList;
