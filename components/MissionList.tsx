
import React, { useState } from 'react';
import { Mission } from '../types';
import { ExternalLink, Link as LinkIcon, Smartphone, Share2, PlayCircle, Search, Filter, TrendingUp } from 'lucide-react';

interface MissionListProps {
  missions: Mission[];
}

const MissionList: React.FC<MissionListProps> = ({ missions }) => {
  const [filter, setFilter] = useState<'ALL' | 'LINK' | 'APP' | 'SOCIAL'>('ALL');
  const [search, setSearch] = useState('');

  const filteredMissions = missions.filter(m => {
    const matchesFilter = filter === 'ALL' || m.type === filter;
    const matchesSearch = m.title.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'LINK': return <LinkIcon className="text-blue-400" size={24} />;
      case 'APP': return <Smartphone className="text-purple-400" size={24} />;
      case 'SOCIAL': return <PlayCircle className="text-red-400" size={24} />;
      default: return <Share2 className="text-slate-400" size={24} />;
    }
  };

  const handleStartMission = (url: string) => {
    if (!url) {
      alert("Nhiệm vụ này không có liên kết hợp lệ!");
      return;
    }
    if (confirm("Hệ thống sẽ chuyển hướng bạn đến liên kết nhiệm vụ. Vui lòng hoàn thành để nhận thưởng!")) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="space-y-10 animate-in slide-in-from-bottom-6 duration-500 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <div className="text-blue-500 text-[10px] font-black uppercase tracking-widest mb-3 flex items-center gap-2">
            <TrendingUp size={14} /> Nhiệm vụ khả dụng
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter">Kho Nhiệm Vụ <span className="text-slate-500">Tháng 02/2025</span></h1>
          <p className="text-slate-500 mt-2 font-medium">Lựa chọn các nhiệm vụ bên dưới để gia tăng số dư tài khoản của bạn.</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Modern Search & Filters bar */}
        <div className="flex-1 relative">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
          <input
            type="text"
            placeholder="Tìm kiếm nhiệm vụ theo tên gọi..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-16 pr-6 py-5 bg-slate-900 border border-white/5 rounded-[2rem] text-slate-100 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-600 shadow-xl font-medium"
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
              {f === 'ALL' ? 'Tất cả' : f === 'LINK' ? 'Rút gọn' : f === 'APP' ? 'Ứng dụng' : 'Video'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredMissions.map((mission) => (
          <div key={mission.id} className="bg-slate-900 p-8 rounded-[3rem] border border-white/5 shadow-2xl hover:border-blue-500/30 transition-all flex flex-col group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-600/5 to-transparent blur-2xl"></div>
            
            <div className="flex items-start justify-between mb-8 relative z-10">
              <div className="p-4 bg-slate-800 rounded-3xl group-hover:bg-blue-600/20 group-hover:scale-110 transition-all duration-300 shadow-xl border border-white/5">
                {getIcon(mission.type)}
              </div>
              <div className="text-right">
                <span className="text-[9px] text-slate-600 font-black uppercase tracking-[0.2em] block mb-1">Mức thưởng</span>
                <p className="text-2xl font-black text-emerald-400 tracking-tighter">{mission.reward.toLocaleString()}đ</p>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{mission.title}</h3>
            <p className="text-sm text-slate-500 font-medium leading-relaxed mb-8 flex-1 line-clamp-3">
              {mission.description}
            </p>

            <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
              <span className="px-3 py-1 bg-white/5 text-[10px] text-slate-400 font-black rounded-lg uppercase tracking-widest border border-white/5">
                {mission.type}
              </span>
              <button 
                className="flex items-center gap-2 bg-white text-black font-black text-[11px] uppercase tracking-widest px-6 py-3 rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-xl active:scale-95"
                onClick={() => handleStartMission(mission.url)}
              >
                Bắt đầu <ExternalLink size={14} />
              </button>
            </div>
          </div>
        ))}

        {filteredMissions.length === 0 && (
          <div className="col-span-full py-32 text-center bg-slate-900/50 rounded-[4rem] border border-white/5 border-dashed">
            <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <Search size={40} className="text-slate-600" />
            </div>
            <h3 className="text-2xl font-black text-white">Không tìm thấy nhiệm vụ</h3>
            <p className="text-slate-500 mt-2 font-medium">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm của bạn.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MissionList;
