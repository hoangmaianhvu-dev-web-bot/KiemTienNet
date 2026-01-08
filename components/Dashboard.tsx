
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
            <Sparkles size={14} /> Tổng quan tài khoản
          </div>
          <h1 className="text-5xl font-black text-white tracking-tighter">Chào {user.name.split(' ').pop()}, <span className="text-slate-500">thật vui khi bạn quay lại!</span></h1>
        </div>
        <div className="flex gap-4">
          <div className="px-5 py-3 bg-slate-900 border border-white/5 rounded-2xl flex items-center gap-3">
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">Server: HN-01 (Live)</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Số dư khả dụng', value: `${user.balance.toLocaleString()}đ`, icon: <Wallet size={24} className="text-blue-400" />, gradient: 'from-blue-500/10 to-transparent' },
          { label: 'Lợi nhuận tích lũy', value: `${user.totalEarned.toLocaleString()}đ`, icon: <TrendingUp size={24} className="text-emerald-400" />, gradient: 'from-emerald-500/10 to-transparent' },
          { label: 'Đã hoàn thành', value: '12', icon: <CheckCircle size={24} className="text-orange-400" />, gradient: 'from-orange-500/10 to-transparent' },
          { label: 'Mạng lưới bạn bè', value: '5', icon: <Users size={24} className="text-purple-400" />, gradient: 'from-purple-500/10 to-transparent' },
        ].map((stat, i) => (
          <div key={i} className={`bg-slate-900 p-8 rounded-[2.5rem] border border-white/5 shadow-xl hover:border-white/10 transition-all relative overflow-hidden group`}>
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.gradient} blur-3xl -translate-y-1/2 translate-x-1/2`}></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 bg-slate-800 rounded-xl group-hover:scale-110 transition-transform">{stat.icon}</div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg flex items-center gap-1">+12% <ArrowUpRight size={10} /></span>
                </div>
              </div>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-3xl font-black text-white">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-slate-900 p-8 md:p-10 rounded-[3rem] border border-white/5 shadow-2xl">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-xl font-bold text-white">Phân tích thu nhập</h3>
              <p className="text-slate-500 text-xs mt-1">Biến động số dư trong 7 ngày gần nhất</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Thu nhập</span>
              </div>
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
                  contentStyle={{backgroundColor: '#0f172a', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', padding: '16px'}}
                  itemStyle={{color: '#fff', fontWeight: 'black', fontSize: '14px'}}
                />
                <Area type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={5} fillOpacity={1} fill="url(#colorAmt)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-8">
          <div className="bg-slate-900 p-8 rounded-[3rem] border border-white/5 shadow-2xl flex-1 flex flex-col justify-between">
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white flex items-center gap-3">
                  <Target className="text-blue-500" size={24} /> Chỉ tiêu ngày
                </h3>
                <span className="text-[10px] font-black text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20 uppercase tracking-widest">70% Xong</span>
              </div>
              <div className="space-y-8">
                {[
                  { title: 'Vượt link (3/5)', p: 60, color: 'bg-blue-500' },
                  { title: 'Mời bạn (1/3)', p: 33, color: 'bg-purple-500' },
                  { title: 'Ads (8/10)', p: 80, color: 'bg-emerald-500' },
                ].map((item, i) => (
                  <div key={i} className="space-y-3">
                    <div className="flex justify-between text-[11px] font-black uppercase tracking-widest">
                      <span className="text-slate-400">{item.title}</span>
                      <span className="text-white">{item.p}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${item.color} rounded-full transition-all duration-1000`}
                        style={{ width: `${item.p}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-10 p-5 bg-gradient-to-br from-blue-600/10 to-indigo-600/10 rounded-3xl border border-blue-500/10 relative overflow-hidden group cursor-pointer hover:border-blue-500/30 transition-all">
              <div className="absolute top-0 right-0 p-3 text-blue-500 group-hover:scale-125 transition-transform"><Zap size={20} /></div>
              <p className="text-[11px] text-blue-400 font-black uppercase tracking-widest mb-1">Thưởng đặc biệt</p>
              <p className="text-xs text-slate-300 leading-relaxed">Hoàn thành 100% chỉ tiêu hôm nay để nhận thêm <span className="text-white font-bold">10.000đ</span> tiền thưởng trực tiếp!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
