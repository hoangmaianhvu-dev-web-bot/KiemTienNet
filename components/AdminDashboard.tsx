
import React, { useState } from 'react';
import { User, Mission, Transaction, AppNotification } from '../types';
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
  Bell,
  Send,
  X,
  DollarSign,
  Type
} from 'lucide-react';

interface AdminDashboardProps {
  users: User[];
  missions: Mission[];
  withdrawals: Transaction[];
  onAddMission: (mission: Mission) => void;
  onDeleteMission: (id: string) => void;
  onUpdateWithdrawal: (id: string, status: 'SUCCESS' | 'FAILED') => void;
  onBroadcast: (title: string, message: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  users, 
  missions, 
  withdrawals, 
  onAddMission, 
  onDeleteMission,
  onUpdateWithdrawal,
  onBroadcast
}) => {
  const [activeTab, setActiveTab] = useState<'USERS' | 'WITHDRAWALS' | 'MISSIONS' | 'NOTIFICATIONS'>('USERS');
  const [showAddMissionModal, setShowAddMissionModal] = useState(false);
  const [broadcastData, setBroadcastData] = useState({ title: '', message: '' });
  
  const [newMission, setNewMission] = useState<Partial<Mission>>({
    title: '', reward: 0, type: 'LINK', description: '', url: '', status: 'AVAILABLE'
  });

  const handleAddMission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMission.title || !newMission.reward || !newMission.url) {
      alert("Vui lòng nhập đầy đủ thông tin bắt buộc!");
      return;
    }
    onAddMission({ ...newMission, id: `m${Date.now()}` } as Mission);
    setShowAddMissionModal(false);
    setNewMission({ title: '', reward: 0, type: 'LINK', description: '', url: '', status: 'AVAILABLE' });
  };

  const handleDeleteMission = (id: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa nhiệm vụ này? Hành động này không thể hoàn tác.")) {
      onDeleteMission(id);
    }
  };

  const handleSendBroadcast = () => {
    if (!broadcastData.title || !broadcastData.message) {
      alert("Vui lòng nhập đầy đủ tiêu đề và nội dung thông báo!");
      return;
    }
    onBroadcast(broadcastData.title, broadcastData.message);
    alert("Đã phát thông báo đến toàn bộ người dùng!");
    setBroadcastData({ title: '', message: '' });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Quản trị hệ thống</h1>
          <p className="text-slate-400 mt-1 font-medium">Trung tâm điều hành nền tảng Kiếm Tiền Net.</p>
        </div>
        <div className="flex flex-wrap gap-2 p-1 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl">
          {(['USERS', 'WITHDRAWALS', 'MISSIONS', 'NOTIFICATIONS'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}>
              {tab === 'USERS' ? 'Thành viên' : tab === 'WITHDRAWALS' ? 'Lệnh rút' : tab === 'MISSIONS' ? 'Nhiệm vụ' : 'Thông báo'}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'USERS' && (
        <div className="bg-slate-900 rounded-[2rem] border border-white/5 shadow-2xl overflow-hidden">
          <div className="p-8 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h3 className="text-xl font-bold text-white">Danh sách thành viên</h3>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
              <input type="text" placeholder="Tìm kiếm..." className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-sm text-white placeholder:text-slate-600 outline-none" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-white/5 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                <tr><th className="px-8 py-5">Thành viên</th><th className="px-8 py-5">Tham gia</th><th className="px-8 py-5">Số dư</th><th className="px-8 py-5">Vai trò</th></tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {users.map(user => (
                  <tr key={user.id} className="hover:bg-white/5">
                    <td className="px-8 py-6"><div className="flex items-center gap-4"><div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center font-black text-blue-400 border border-white/10">{user.name.charAt(0)}</div><div><p className="font-bold text-slate-100">{user.name}</p><p className="text-[10px] text-slate-600 font-black">ID: {user.id}</p></div></div></td>
                    <td className="px-8 py-6 text-slate-400">{user.joinDate}</td>
                    <td className="px-8 py-6"><p className="font-black text-blue-400">{user.balance.toLocaleString()}đ</p></td>
                    <td className="px-8 py-6"><span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase ${user.isAdmin ? 'bg-red-500/10 text-red-500 border border-red-500/20' : user.membership === 'VIP' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-slate-800 text-slate-500'}`}>{user.isAdmin ? 'Admin' : user.membership}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'WITHDRAWALS' && (
        <div className="bg-slate-900 rounded-[2rem] border border-white/5 shadow-2xl overflow-hidden">
          <div className="p-8 border-b border-white/5 flex items-center justify-between">
            <h3 className="text-xl font-bold text-white">Xử lý rút tiền</h3>
            <span className="text-[10px] font-black bg-blue-600/10 text-blue-400 px-3 py-1 rounded-full border border-blue-500/20">Cần xử lý: {withdrawals.filter(w => w.status === 'PENDING').length}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-white/5 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                <tr><th className="px-8 py-5">Thành viên</th><th className="px-8 py-5">Số tiền</th><th className="px-8 py-5">Phương thức</th><th className="px-8 py-5">Trạng thái</th><th className="px-8 py-5">Thao tác</th></tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {withdrawals.map(w => (
                  <tr key={w.id} className="hover:bg-white/5">
                    <td className="px-8 py-6"><p className="font-bold text-white">{w.userName}</p></td>
                    <td className="px-8 py-6 font-black text-emerald-400">{w.amount.toLocaleString()}đ</td>
                    <td className="px-8 py-6 text-xs text-slate-400">{w.method}</td>
                    <td className="px-8 py-6"><span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase ${w.status === 'PENDING' ? 'text-orange-400 bg-orange-400/10' : w.status === 'SUCCESS' ? 'text-emerald-400 bg-emerald-400/10' : 'text-red-400 bg-red-400/10'}`}>{w.status}</span></td>
                    <td className="px-8 py-6">
                      {w.status === 'PENDING' && (
                        <div className="flex gap-2">
                          <button onClick={() => onUpdateWithdrawal(w.id, 'SUCCESS')} className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg hover:bg-emerald-500 hover:text-white transition-all"><CheckCircle size={16} /></button>
                          <button onClick={() => onUpdateWithdrawal(w.id, 'FAILED')} className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition-all"><XCircle size={16} /></button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'NOTIFICATIONS' && (
        <div className="bg-slate-900 p-8 rounded-[2rem] border border-white/5 shadow-2xl space-y-8">
          <div className="flex items-center gap-3">
            <Bell className="text-blue-400" />
            <h3 className="text-xl font-bold text-white">Phát thông báo hệ thống</h3>
          </div>
          <div className="space-y-6 max-w-2xl">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Tiêu đề thông báo</label>
              <input value={broadcastData.title} onChange={e => setBroadcastData({...broadcastData, title: e.target.value})} type="text" className="w-full px-6 py-4 bg-slate-800 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ví dụ: Bảo trì hệ thống" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Nội dung chi tiết</label>
              <textarea value={broadcastData.message} onChange={e => setBroadcastData({...broadcastData, message: e.target.value})} className="w-full px-6 py-4 bg-slate-800 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none" placeholder="Nhập nội dung thông báo cho người dùng..." />
            </div>
            <button onClick={handleSendBroadcast} className="flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-900/20"><Send size={18} /> Gửi thông báo ngay</button>
          </div>
        </div>
      )}

      {activeTab === 'MISSIONS' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-white ml-2">Kho nhiệm vụ</h3>
            <button onClick={() => setShowAddMissionModal(true)} className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase hover:bg-blue-700 shadow-xl transition-all active:scale-95">
              <Plus size={18} /> Thêm nhiệm vụ
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {missions.map(mission => (
              <div key={mission.id} className="bg-slate-900 p-8 rounded-[2rem] border border-white/5 shadow-2xl group relative hover:border-white/10 transition-all">
                <button 
                  onClick={() => handleDeleteMission(mission.id)} 
                  className="absolute top-6 right-6 p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={18} />
                </button>
                <div className="flex items-start gap-6 mb-6">
                  <div className="p-4 bg-slate-800 rounded-2xl text-blue-400">
                    {mission.type === 'LINK' ? <LinkIcon size={32} /> : mission.type === 'APP' ? <Info size={32} /> : <TrendingUp size={32} />}
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{mission.title}</h4>
                    <p className="text-sm text-emerald-400 font-black mt-1">{mission.reward.toLocaleString()}đ</p>
                  </div>
                </div>
                <p className="text-sm text-slate-500 line-clamp-2 mb-6 font-medium">{mission.description}</p>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-white/5 text-[9px] font-black text-slate-500 uppercase rounded border border-white/5">{mission.type}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Add Mission Modal */}
          {showAddMissionModal && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
              <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setShowAddMissionModal(false)}></div>
              <div className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-[2.5rem] shadow-3xl overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="p-8 border-b border-white/5 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white flex items-center gap-3"><Plus className="text-blue-500" /> Tạo nhiệm vụ mới</h3>
                  <button onClick={() => setShowAddMissionModal(false)} className="p-2 text-slate-500 hover:text-white transition-colors"><X size={24} /></button>
                </div>
                <form onSubmit={handleAddMission} className="p-8 space-y-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Tiêu đề nhiệm vụ</label>
                    <input 
                      type="text" 
                      required
                      placeholder="VD: Vượt link nhận 5k" 
                      className="w-full px-6 py-4 bg-slate-800 border border-white/5 rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-600/50 transition-all font-medium"
                      value={newMission.title}
                      onChange={e => setNewMission({...newMission, title: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Mức thưởng (đ)</label>
                      <input 
                        type="number" 
                        required
                        placeholder="5000" 
                        className="w-full px-6 py-4 bg-slate-800 border border-white/5 rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-600/50 transition-all font-medium"
                        value={newMission.reward || ''}
                        onChange={e => setNewMission({...newMission, reward: parseInt(e.target.value)})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Loại nhiệm vụ</label>
                      <select 
                        className="w-full px-6 py-4 bg-slate-800 border border-white/5 rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-600/50 transition-all font-medium appearance-none"
                        value={newMission.type}
                        onChange={e => setNewMission({...newMission, type: e.target.value as any})}
                      >
                        <option value="LINK">Vượt link</option>
                        <option value="APP">Cài App</option>
                        <option value="SOCIAL">Mạng xã hội</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Mô tả nhiệm vụ</label>
                    <textarea 
                      required
                      placeholder="Hướng dẫn ngắn gọn cho người dùng..." 
                      className="w-full px-6 py-4 bg-slate-800 border border-white/5 rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-600/50 transition-all font-medium h-24 resize-none"
                      value={newMission.description}
                      onChange={e => setNewMission({...newMission, description: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Liên kết nhiệm vụ (URL)</label>
                    <input 
                      type="url" 
                      required
                      placeholder="https://link.com/..." 
                      className="w-full px-6 py-4 bg-slate-800 border border-white/5 rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-600/50 transition-all font-medium"
                      value={newMission.url}
                      onChange={e => setNewMission({...newMission, url: e.target.value})}
                    />
                  </div>
                  <button type="submit" className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-lg hover:bg-blue-700 shadow-2xl shadow-blue-900/40 transition-all active:scale-95 mt-4">
                    XÁC NHẬN TẠO MỚI
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
