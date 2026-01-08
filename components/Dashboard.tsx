
import React from 'react';
import { User } from '../types';
import { Wallet, TrendingUp, CheckCircle, Users, ArrowUpRight, Sparkles, Target, Zap } from 'lucide-react';
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
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-blue-400 text-xs font-black uppercase tracking-widest mb-2">
            <Sparkles size={14} /> Hệ thống đã sẵn sàng
          </div>
          <h1 className="text-5xl font-black text-white tracking-tighter">Chào {user.name.split(' ').pop()}, <span className="text-slate-500">hôm nay bạn thế nào?</span></h1>
        </div>
        <div className="flex gap-4">
          <div className="px-5 py-3 bg-slate-900 border border-white/5 rounded-2xl flex items-center gap-3">
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">Bot: Hoạt động (Online)</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Số dư khả dụng (Xu)', value: `${user.balance.toLocaleString()}đ`, icon: <Wallet size={24} className="text-blue-400" />, gradient: 'from-blue-500/10 to-transparent' },
          { label: 'Tổng tiền đã kiếm', value: `${user.totalEarned.toLocaleString()}đ`, icon: <TrendingUp size={24} className="text-emerald-400" />, gradient: 'from-emerald-500/10 to-transparent' },
          { label: 'Nhiệm vụ hôm nay', value: '12', icon: <CheckCircle size={24} className="text-orange-400" />, gradient: 'from-orange-500/10 to-transparent' },
          { label: 'Cấp bậc', value: user.membership, icon: <Users size={24} className="text-purple-400" />, gradient: 'from-purple-500/10 to-transparent' },
        ].map((stat, i) => (
          <div key={i} className={`bg-slate-900 p-8 rounded-[2.5rem] border border-white/5 shadow-xl hover:border-white/10 transition-all relative overflow-hidden group`}>
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.gradient} blur-3xl -translate-y-1/2 translate-x-1/2`}></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 bg-slate-800 rounded-xl group-hover:scale-110 transition-transform">{stat.icon}</div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg flex items-center gap-1">+24% <ArrowUpRight size={10} /></span>
                </div>
              </div>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-3xl font-black text-white">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-12 bg-slate-900 p-8 md:p-10 rounded-[3rem] border border-white/5 shadow-2xl">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-xl font-bold text-white">Thống kê thu nhập Bot</h3>
              <p className="text-slate-500 text-xs mt-1">Dữ liệu được cập nhật từ Supabase theo thời gian thực</p>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" opacity={0.5} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 11, fontWeight: 'bold'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 11, fontWeight: 'bold'}} />
                <Tooltip 
                  cursor={{stroke: '#3b82f6', strokeWidth: 2, strokeDasharray: '5 5'}}
                  contentStyle={{backgroundColor: '#0f172a', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', padding: '16px'}}
                  itemStyle={{color: '#fff', fontWeight: 'black', fontSize: '14px'}}
                />
                <Area type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={5} fillOpacity={1} fill="url(#colorAmt)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
