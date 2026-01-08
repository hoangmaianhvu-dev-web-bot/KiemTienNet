
import React from 'react';
import { 
  Home, 
  LayoutGrid, 
  Wallet, 
  Users, 
  Headphones, 
  UserCircle,
  ShieldCheck 
} from 'lucide-react';
import { User, Mission, Transaction } from './types';

export const INITIAL_USER: User = {
  id: 'u1',
  name: 'Người dùng Demo',
  balance: 25000,
  totalEarned: 50000,
  referralCode: 'KTNET88',
  membership: 'FREE',
  joinDate: new Date().toISOString().split('T')[0]
};

export const MOCK_USERS: User[] = [INITIAL_USER];
export const MOCK_WITHDRAWALS: Transaction[] = [];
export const MISSIONS: Mission[] = [
  {
    id: 'm1',
    title: 'Vượt link Shopee Video nhận 5k',
    reward: 5000,
    type: 'LINK',
    description: 'Thực hiện vượt link rút gọn để lấy mã xác nhận dán vào hệ thống.',
    url: 'https://shopee.vn',
    status: 'AVAILABLE'
  },
  {
    id: 'm2',
    title: 'Theo dõi Fanpage nhận quà',
    reward: 2000,
    type: 'SOCIAL',
    description: 'Like và Follow fanpage chính thức để cập nhật tin tức.',
    url: 'https://facebook.com',
    status: 'AVAILABLE'
  }
];

export const NAV_ITEMS = [
  { id: 'DASHBOARD', label: 'Tổng quan', icon: <Home size={20} /> },
  { id: 'MISSIONS', label: 'Nhiệm vụ', icon: <LayoutGrid size={20} /> },
  { id: 'WALLET', label: 'Rút tiền', icon: <Wallet size={20} /> },
  { id: 'REFERRAL', label: 'Giới thiệu', icon: <Users size={20} /> },
  { id: 'SUPPORT', label: 'Hỗ trợ', icon: <Headphones size={20} /> },
  { id: 'ACCOUNT', label: 'Tài khoản', icon: <UserCircle size={20} /> },
  { id: 'ADMIN', label: 'Admin', icon: <ShieldCheck size={20} className="text-orange-500" /> },
];
