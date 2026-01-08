
import React, { useState } from 'react';
import { Mission } from '../types';
import { ExternalLink, Link as LinkIcon, Smartphone, Share2, PlayCircle, Search } from 'lucide-react';

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
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Nhiệm vụ hiện có</h1>
          <p className="text-slate-400 mt-1">Làm càng nhiều, tích lũy càng lớn. Hãy lựa chọn nhiệm vụ phù hợp.</p>
        </div>
        <div className="flex items-center gap-2 p-1 bg-slate-900 border border-white/5 rounded-xl">
          {['ALL', 'LINK', 'APP', 'SOCIAL'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                filter === f ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {f === 'ALL' ? 'Tất cả' : f === 'LINK' ? 'Rút gọn link' : f === 'APP' ? 'Cài App' : 'Mạng xã hội'}
            </button>
          ))}
        </div>
      </div>

      <div className="relative w-full">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
        <input
          type="text"
          placeholder="Tìm kiếm nhiệm vụ theo tên..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-slate-900 border border-white/5 rounded-2xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-600 shadow-xl"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredMissions.map((mission) => (
          <div key={mission.id} className="bg-slate-900 p-6 rounded-2xl border border-white/5 shadow-xl hover:border-white/10 transition-all flex flex-col group">
            <div className="flex items-start justify-between mb-6">
              <div className="p-4 bg-slate-800 rounded-2xl group-hover:scale-110 group-hover:bg-slate-700 transition-all">
                {getIcon(mission.type)}
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Phần thưởng</p>
                <p className="text-xl font-black text-emerald-400">{mission.reward.toLocaleString()}đ</p>
              </div>
            </div>
            
            <h3 className="text-lg font-bold text-white mb-2 leading-tight">{mission.title}</h3>
            <p className="text-sm text-slate-400 flex-1 leading-relaxed line-clamp-3">
              {mission.description}
            </p>

            <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
              <span className="text-[10px] font-black px-2.5 py-1 bg-white/5 text-slate-400 rounded-lg uppercase tracking-wider">
                {mission.type}
              </span>
              <button 
                className="flex items-center gap-2 bg-blue-600 text-white font-bold text-xs px-4 py-2 rounded-xl hover:bg-blue-700 transition-all"
                onClick={() => handleStartMission(mission.url)}
              >
                Làm ngay <ExternalLink size={14} />
              </button>
            </div>
          </div>
        ))}

        {filteredMissions.length === 0 && (
          <div className="col-span-full py-20 text-center bg-slate-900/50 rounded-3xl border border-white/5 border-dashed">
            <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search size={32} className="text-slate-600" />
            </div>
            <h3 className="text-xl font-bold text-white">Chưa có nhiệm vụ nào</h3>
            <p className="text-slate-500 mt-2">Hãy quay lại sau hoặc liên hệ quản trị viên.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MissionList;