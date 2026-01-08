
import React from 'react';
import { User } from '../types';
import { Wallet, TrendingUp, CheckCircle, Users, ArrowUpRight, Sparkles } from 'lucide-react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const chartData = [
  { name: 'T2', amount: 5000 },
  { name: 'T3', amount: 12000 },
  { name: 'T4', amount: 8000 },
  { name: 'T5', amount: 25000 },
  { name: 'T6', amount: 18000 },
  { name: 'T7', amount: 32000 },
  { name: 'CN', amount: 45000 },
];

const Dashboard: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white">Chào {user.name.split(' ').pop()}! 👋</h1>
          <p className="text-slate-400 mt-1">Hôm nay là một ngày tuyệt vời để gia tăng thu nhập.</p>
        </div>
        <div className="px-4 py-2 bg-blue-600/10 border border-blue-500/20 rounded-xl flex items-center gap-3">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
          <span className="text-xs font-black text-blue-400 uppercase tracking-widest">Hệ thống đang trực tuyến</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Số dư hiện tại', value: `${user.balance.toLocaleString()}đ`, icon: <Wallet className="text-blue-400" />, color: 'bg-blue-500/10' },
          { label: 'Tổng thu nhập', value: `${user.totalEarned.toLocaleString()}đ`, icon: <TrendingUp className="text-emerald-400" />, color: 'bg-emerald-500/10' },
          { label: 'Nhiệm vụ xong', value: '12', icon: <CheckCircle className="text-orange-400" />, color: 'bg-orange-500/10' },
          { label: 'Lượt giới thiệu', value: '5', icon: <Users className="text-purple-400" />, color: 'bg-purple-500/10' },
        ].map((stat, i) => (
          <div key={i} className="bg-slate-900 p-6 rounded-[2rem] border border-white/5 shadow-xl hover:border-white/10 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-4 rounded-2xl ${stat.color}`}>{stat.icon}</div>
              <span className="text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg flex items-center">+12% <ArrowUpRight size={10} /></span>
            </div>
            <p className="text-slate-500 text-xs font-black uppercase tracking-widest">{stat.label}</p>
            <h3 className="text-2xl font-black text-white mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-slate-900 p-8 rounded-[2.5rem] border border-white/5 shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-white">Hiệu suất thu nhập</h3>
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-xs text-slate-500 font-bold uppercase">VNĐ / Ngày</span>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{backgroundColor: '#0f172a', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'}}
                  itemStyle={{color: '#fff', fontWeight: 'bold'}}
                />
                <Area type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorAmt)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900 p-8 rounded-[2.5rem] border border-white/5 shadow-2xl space-y-8">
          <h3 className="text-xl font-bold text-white flex items-center gap-3">
            <Sparkles className="text-yellow-400" /> Tiến độ ngày
          </h3>
          <div className="space-y-6">
            {[
              { title: 'Vượt link rút gọn', cur: 3, total: 5, color: 'bg-blue-500' },
              { title: 'Mời bạn bè mới', cur: 1, total: 3, color: 'bg-purple-500' },
              { title: 'Xem video quảng cáo', cur: 8, total: 10, color: 'bg-emerald-500' },
            ].map((p, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-[11px] font-black uppercase tracking-widest">
                  <span className="text-slate-400">{p.title}</span>
                  <span className="text-white">{p.cur}/{p.total}</span>
                </div>
                <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden p-0.5">
                  <div 
                    className={`h-full ${p.color} rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(59,130,246,0.2)]`}
                    style={{ width: `${(p.cur/p.total)*100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 bg-blue-500/5 rounded-2xl border border-blue-500/10">
            <p className="text-[10px] text-blue-400 font-black uppercase tracking-tighter text-center leading-relaxed italic">
              "Hoàn thành tất cả mục tiêu để nhận ngay rương thưởng 10.000đ"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
