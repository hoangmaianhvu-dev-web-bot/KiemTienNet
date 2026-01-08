
import React, { useState } from 'react';
import { MISSIONS } from '../constants';
import { Mission } from '../types';
import { ExternalLink, Link as LinkIcon, Smartphone, Share2, PlayCircle, Filter, Search } from 'lucide-react';

const MissionList: React.FC = () => {
  const [filter, setFilter] = useState<'ALL' | 'LINK' | 'APP' | 'SOCIAL'>('ALL');
  const [search, setSearch] = useState('');

  const filteredMissions = MISSIONS.filter(m => {
    const matchesFilter = filter === 'ALL' || m.type === filter;
    const matchesSearch = m.title.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'LINK': return <LinkIcon className="text-blue-500" size={24} />;
      case 'APP': return <Smartphone className="text-purple-500" size={24} />;
      case 'SOCIAL': return <PlayCircle className="text-red-500" size={24} />;
      default: return <Share2 className="text-slate-500" size={24} />;
    }
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Danh sách nhiệm vụ</h1>
        <p className="text-slate-500">Thực hiện các nhiệm vụ bên dưới để tích lũy số dư.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-2 p-1 bg-white border border-slate-200 rounded-xl overflow-x-auto w-full md:w-auto">
          {['ALL', 'LINK', 'APP', 'SOCIAL'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                filter === f ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {f === 'ALL' ? 'Tất cả' : f === 'LINK' ? 'Rút gọn link' : f === 'APP' ? 'Cài App' : 'Mạng xã hội'}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Tìm nhiệm vụ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredMissions.map((mission) => (
          <div key={mission.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all flex flex-col group">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-slate-50 rounded-xl group-hover:scale-110 transition-transform">
                {getIcon(mission.type)}
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Thưởng</p>
                <p className="text-lg font-extrabold text-emerald-600">{mission.reward.toLocaleString()}đ</p>
              </div>
            </div>
            
            <h3 className="text-lg font-bold text-slate-900 mb-2">{mission.title}</h3>
            <p className="text-sm text-slate-500 flex-1 leading-relaxed">
              {mission.description}
            </p>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg">
                {mission.type}
              </span>
              <button 
                className="flex items-center gap-2 text-blue-600 font-bold text-sm hover:underline"
                onClick={() => alert('Đang chuyển hướng tới trang nhiệm vụ...')}
              >
                Làm ngay <ExternalLink size={14} />
              </button>
            </div>
          </div>
        ))}

        {filteredMissions.length === 0 && (
          <div className="col-span-full py-20 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={32} className="text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Không tìm thấy nhiệm vụ</h3>
            <p className="text-slate-500">Hãy thử đổi bộ lọc hoặc từ khóa tìm kiếm khác.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MissionList;
