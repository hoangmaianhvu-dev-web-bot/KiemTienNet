
import React, { useState } from 'react';
import { User, Mission, Transaction } from '../types';
import { 
  Users, 
  CheckCircle, 
  XCircle, 
  Plus, 
  Trash2, 
  Search, 
  CreditCard, 
  LayoutGrid,
  TrendingUp,
  Link as LinkIcon,
  Info,
  ExternalLink
} from 'lucide-react';

interface AdminDashboardProps {
  users: User[];
  missions: Mission[];
  withdrawals: Transaction[];
  onAddMission: (mission: Mission) => void;
  onDeleteMission: (id: string) => void;
  onUpdateWithdrawal: (id: string, status: 'SUCCESS' | 'FAILED') => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  users, 
  missions, 
  withdrawals, 
  onAddMission, 
  onDeleteMission,
  onUpdateWithdrawal 
}) => {
  const [activeTab, setActiveTab] = useState<'USERS' | 'WITHDRAWALS' | 'MISSIONS'>('USERS');
  const [showAddMissionModal, setShowAddMissionModal] = useState(false);
  const [newMission, setNewMission] = useState<Partial<Mission>>({
    title: '',
    reward: 0,
    type: 'LINK',
    description: '',
    url: '',
    status: 'AVAILABLE'
  });

  const handleAddMission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMission.title || !newMission.reward || !newMission.url) {
      alert("Vui lòng nhập đầy đủ tiêu đề, phần thưởng và liên kết!");
      return;
    }
    onAddMission({
      ...newMission,
      id: `m${Date.now()}`,
    } as Mission);
    setShowAddMissionModal(false);
    setNewMission({ title: '', reward: 0, type: 'LINK', description: '', url: '', status: 'AVAILABLE' });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Quản trị hệ thống</h1>
          <p className="text-slate-400 mt-1 font-medium">Trung tâm điều hành nền tảng Kiếm Tiền Net.</p>
        </div>
        <div className="flex gap-2 p-1 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl">
          {(['USERS', 'WITHDRAWALS', 'MISSIONS'] as const).map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
            >
              {tab === 'USERS' ? 'Thành viên' : tab === 'WITHDRAWALS' ? 'Lệnh rút' : 'Nhiệm vụ'}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-slate-900 p-8 rounded-[2rem] border border-white/5 shadow-2xl">
          <div className="flex items-center gap-6">
            <div className="p-4 bg-blue-500/10 text-blue-400 rounded-2xl shadow-inner"><Users size={32} /></div>
            <div>
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Tổng người dùng</p>
              <h3 className="text-3xl font-black text-white">{users.length}</h3>
            </div>
          </div>
        </div>
        <div className="bg-slate-900 p-8 rounded-[2rem] border border-white/5 shadow-2xl">
          <div className="flex items-center gap-6">
            <div className="p-4 bg-orange-500/10 text-orange-400 rounded-2xl shadow-inner"><CreditCard size={32} /></div>
            <div>
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Đang chờ duyệt</p>
              <h3 className="text-3xl font-black text-white">{withdrawals.filter(w => w.status === 'PENDING').length}</h3>
            </div>
          </div>
        </div>
        <div className="bg-slate-900 p-8 rounded-[2rem] border border-white/5 shadow-2xl">
          <div className="flex items-center gap-6">
            <div className="p-4 bg-emerald-500/10 text-emerald-400 rounded-2xl shadow-inner"><LayoutGrid size={32} /></div>
            <div>
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Nhiệm vụ active</p>
              <h3 className="text-3xl font-black text-white">{missions.length}</h3>
            </div>
          </div>
        </div>
      </div>

      {activeTab === 'USERS' && (
        <div className="bg-slate-900 rounded-[2rem] border border-white/5 shadow-2xl overflow-hidden">
          <div className="p-8 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h3 className="text-xl font-bold text-white">Danh sách thành viên</h3>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
              <input type="text" placeholder="Tìm theo tên, email hoặc ID..." className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-sm text-white placeholder:text-slate-600 outline-none focus:ring-2 focus:ring-blue-500/50" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-white/5 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                <tr>
                  <th className="px-8 py-5">Thành viên</th>
                  <th className="px-8 py-5">Tham gia</th>
                  <th className="px-8 py-5">Số dư</th>
                  <th className="px-8 py-5">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {users.map(user => (
                  <tr key={user.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center font-black text-blue-400 border border-white/10">{user.name.charAt(0)}</div>
                        <div>
                          <p className="font-bold text-slate-100 group-hover:text-white transition-colors">{user.name}</p>
                          <p className="text-[10px] text-slate-600 uppercase font-black tracking-tighter">ID: {user.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-slate-400 font-medium">{user.joinDate}</td>
                    <td className="px-8 py-6">
                      <p className="font-black text-blue-400">{user.balance.toLocaleString()}đ</p>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${user.membership === 'VIP' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' : 'bg-slate-800 text-slate-500'}`}>
                        {user.membership}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'WITHDRAWALS' && (
        <div className="bg-slate-900 rounded-[2rem] border border-white/5 shadow-2xl overflow-hidden">
          <div className="p-8 border-b border-white/5">
            <h3 className="text-xl font-bold text-white">Xử lý rút tiền</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-white/5 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                <tr>
                  <th className="px-8 py-5">Thành viên</th>
                  <th className="px-8 py-5">Số tiền</th>
                  <th className="px-8 py-5">Phương thức</th>
                  <th className="px-8 py-5">Thời gian</th>
                  <th className="px-8 py-5">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {withdrawals.filter(w => w.status === 'PENDING').map(w => (
                  <tr key={w.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-8 py-6">
                      <p className="font-bold text-white">{w.userName}</p>
                      <p className="text-[10px] text-slate-600 font-black tracking-tighter">ID: {w.userId}</p>
                    </td>
                    <td className="px-8 py-6 font-black text-emerald-400">{w.amount.toLocaleString()}đ</td>
                    <td className="px-8 py-6">
                      <span className="text-xs font-bold text-slate-400 bg-slate-800 px-3 py-1.5 rounded-xl border border-white/5">{w.method}</span>
                    </td>
                    <td className="px-8 py-6 text-xs text-slate-500 font-medium">{w.date}</td>
                    <td className="px-8 py-6">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => onUpdateWithdrawal(w.id, 'SUCCESS')}
                          className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl hover:bg-emerald-500 hover:text-white transition-all border border-emerald-500/20"
                        >
                          <CheckCircle size={18} />
                        </button>
                        <button 
                          onClick={() => onUpdateWithdrawal(w.id, 'FAILED')}
                          className="p-3 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all border border-red-500/20"
                        >
                          <XCircle size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {withdrawals.filter(w => w.status === 'PENDING').length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-8 py-20 text-center text-slate-600 italic font-medium">Không có yêu cầu rút tiền nào đang chờ xử lý.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'MISSIONS' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-white ml-2">Kho nhiệm vụ</h3>
            <button 
              onClick={() => setShowAddMissionModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-900/20"
            >
              <Plus size={18} /> Thêm nhiệm vụ
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {missions.map(mission => (
              <div key={mission.id} className="bg-slate-900 p-8 rounded-[2rem] border border-white/5 shadow-2xl group relative flex flex-col h-full hover:border-white/10 transition-all">
                <button 
                  onClick={() => onDeleteMission(mission.id)}
                  className="absolute top-6 right-6 p-2 text-slate-700 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={20} />
                </button>
                <div className="flex items-start gap-6 mb-6">
                  <div className="p-4 bg-slate-800 rounded-2xl text-blue-400 shadow-lg"><TrendingUp size={32} /></div>
                  <div>
                    <h4 className="font-bold text-white pr-8 leading-tight">{mission.title}</h4>
                    <p className="text-sm text-emerald-400 font-black mt-1">{mission.reward.toLocaleString()}đ</p>
                  </div>
                </div>
                <p className="text-sm text-slate-500 line-clamp-2 mb-6 font-medium">{mission.description}</p>
                
                <div className="mt-auto pt-6 border-t border-white/5 space-y-4">
                   <div className="flex items-center gap-2 text-[10px] text-blue-400 font-black uppercase tracking-tight truncate">
                     <LinkIcon size={14} />
                     <span className="truncate">{mission.url}</span>
                   </div>
                   <div className="flex items-center justify-between">
                     <span className="text-[10px] font-black px-3 py-1 bg-white/5 text-slate-500 rounded-lg uppercase tracking-widest">{mission.type}</span>
                     <span className="text-[10px] text-slate-700 font-black tracking-tighter uppercase">ID: {mission.id}</span>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Mission Modal */}
      {showAddMissionModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
          <div className="bg-slate-900 w-full max-w-lg rounded-[2.5rem] p-10 shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto border border-white/5">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-2xl font-black text-white">Tạo nhiệm vụ mới</h3>
               <button onClick={() => setShowAddMissionModal(false)} className="p-2 text-slate-500 hover:text-white transition-colors"><XCircle size={24}/></button>
            </div>
            
            <form onSubmit={handleAddMission} className="space-y-6">
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                  Tiêu đề nhiệm vụ <Info size={12} />
                </label>
                <input 
                  type="text" 
                  value={newMission.title}
                  onChange={e => setNewMission({...newMission, title: e.target.value})}
                  className="w-full px-6 py-4 bg-slate-800 border border-white/10 rounded-2xl focus:ring-2 focus:ring-blue-500 text-white text-sm outline-none placeholder:text-slate-700" 
                  placeholder="Ví dụ: Vượt link rút gọn Shopee"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 block">Loại hình</label>
                  <select 
                    value={newMission.type}
                    onChange={e => setNewMission({...newMission, type: e.target.value as any})}
                    className="w-full px-6 py-4 bg-slate-800 border border-white/10 rounded-2xl focus:ring-2 focus:ring-blue-500 text-white text-sm outline-none"
                  >
                    <option value="LINK">Rút gọn Link</option>
                    <option value="SOCIAL">Mạng xã hội</option>
                    <option value="APP">Cài App</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 block">Thưởng (VNĐ)</label>
                  <input 
                    type="number" 
                    value={newMission.reward}
                    onChange={e => setNewMission({...newMission, reward: parseInt(e.target.value)})}
                    className="w-full px-6 py-4 bg-slate-800 border border-white/10 rounded-2xl focus:ring-2 focus:ring-blue-500 text-white text-sm outline-none"
                    placeholder="500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                  Liên kết (URL) <LinkIcon size={12} />
                </label>
                <input 
                  type="url" 
                  value={newMission.url}
                  onChange={e => setNewMission({...newMission, url: e.target.value})}
                  className="w-full px-6 py-4 bg-slate-800 border border-white/10 rounded-2xl focus:ring-2 focus:ring-blue-500 text-white text-sm outline-none placeholder:text-slate-700" 
                  placeholder="https://example.com/link"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 block">Mô tả / Hướng dẫn</label>
                <textarea 
                  value={newMission.description}
                  onChange={e => setNewMission({...newMission, description: e.target.value})}
                  className="w-full px-6 py-4 bg-slate-800 border border-white/10 rounded-2xl focus:ring-2 focus:ring-blue-500 text-white text-sm outline-none h-32 resize-none placeholder:text-slate-700"
                  placeholder="Mô tả chi tiết các bước thực hiện để người dùng không bị sai sót..."
                  required
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="button" 
                  onClick={() => setShowAddMissionModal(false)}
                  className="flex-1 py-5 bg-white/5 border border-white/10 text-slate-400 font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-white/10 transition-all"
                >
                  Hủy bỏ
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-5 bg-blue-600 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-blue-700 shadow-2xl shadow-blue-900/20 transition-all"
                >
                  Tạo ngay
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;