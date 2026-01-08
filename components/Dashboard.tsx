
import React from 'react';
import { INITIAL_USER } from '../constants';
import { 
  TrendingUp, 
  Wallet, 
  CheckCircle, 
  Users, 
  ArrowUpRight, 
  Sparkles 
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const data = [
  { name: 'T2', amount: 45000 },
  { name: 'T3', amount: 52000 },
  { name: 'T4', amount: 38000 },
  { name: 'T5', amount: 65000 },
  { name: 'T6', amount: 48000 },
  { name: 'T7', amount: 95000 },
  { name: 'CN', amount: 110000 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Chào mừng trở lại, {INITIAL_USER.name.split(' ')[2]}! 👋</h1>
          <p className="text-slate-500 mt-1">Hôm nay là một ngày tuyệt vời để tăng thêm thu nhập của bạn.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 font-medium">
          <Sparkles size={18} />
          Nhiệm vụ mới nhất
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Số dư hiện tại', value: `${INITIAL_USER.balance.toLocaleString()}đ`, icon: <Wallet className="text-blue-600" />, color: 'bg-blue-50' },
          { label: 'Tổng thu nhập', value: `${INITIAL_USER.totalEarned.toLocaleString()}đ`, icon: <TrendingUp className="text-emerald-600" />, color: 'bg-emerald-50' },
          { label: 'Nhiệm vụ hoàn tất', value: '142', icon: <CheckCircle className="text-orange-600" />, color: 'bg-orange-50' },
          { label: 'Bạn bè giới thiệu', value: '28', icon: <Users className="text-purple-600" />, color: 'bg-purple-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.color}`}>
                {stat.icon}
              </div>
              <span className="flex items-center text-emerald-500 text-sm font-bold bg-emerald-50 px-2 py-1 rounded-lg">
                +12% <ArrowUpRight size={14} className="ml-1" />
              </span>
            </div>
            <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900">Biểu đồ thu nhập tuần này</h3>
            <select className="text-sm border border-slate-200 rounded-lg px-3 py-1 bg-slate-50">
              <option>7 ngày gần nhất</option>
              <option>30 ngày gần nhất</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                  formatter={(value) => [`${value.toLocaleString()}đ`, 'Thu nhập']}
                />
                <Area type="monotone" dataKey="amount" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorAmt)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Nhiệm vụ hàng ngày</h3>
          <div className="space-y-4 flex-1">
            {[
              { title: 'Vượt 5 link rút gọn', progress: 3, total: 5, color: 'bg-blue-500' },
              { title: 'Mời 2 bạn mới', progress: 1, total: 2, color: 'bg-purple-500' },
              { title: 'Kiếm 50,000đ từ App', progress: 15000, total: 50000, color: 'bg-emerald-500' },
            ].map((task, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 font-medium">{task.title}</span>
                  <span className="text-slate-400">{Math.round((task.progress / task.total) * 100)}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${task.color} transition-all duration-1000`} 
                    style={{ width: `${(task.progress / task.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-sm text-blue-700 font-medium">Hoàn thành tất cả để nhận thêm <span className="font-bold">2,000đ</span>!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
