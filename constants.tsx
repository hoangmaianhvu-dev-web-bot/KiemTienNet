
import React from 'react';
import { Mission } from './types';
import { 
  Home, 
  LayoutGrid, 
  Wallet, 
  Users, 
  MessageSquareText, 
  LogOut,
  TrendingUp,
  CheckCircle,
  Clock,
  ExternalLink
} from 'lucide-react';

export const INITIAL_USER = {
  id: 'u1',
  name: 'Người dùng Demo',
  balance: 150000,
  totalEarned: 2450000,
  referralCode: 'KTNET99',
  membership: 'FREE' as const
};

export const MISSIONS: Mission[] = [
  {
    id: 'm1',
    title: 'Vượt link rút gọn Shopee',
    reward: 500,
    type: 'LINK',
    description: 'Bấm vào link, xác nhận captcha và đợi 30s để nhận thưởng.',
    status: 'AVAILABLE'
  },
  {
    id: 'm2',
    title: 'Xem video quảng cáo TikTok',
    reward: 1200,
    type: 'SOCIAL',
    description: 'Xem video tối thiểu 15 giây và thả tim.',
    status: 'AVAILABLE'
  },
  {
    id: 'm3',
    title: 'Cài đặt App Ngân Hàng MB Bank',
    reward: 55000,
    type: 'APP',
    description: 'Tải ứng dụng qua link và đăng ký tài khoản thành công.',
    status: 'AVAILABLE'
  },
  {
    id: 'm4',
    title: 'Vượt link 1s.com',
    reward: 450,
    type: 'LINK',
    description: 'Vượt link rút gọn để nhận tiền ngay lập tức.',
    status: 'AVAILABLE'
  },
  {
    id: 'm5',
    title: 'Đăng ký tài khoản Lazada',
    reward: 15000,
    type: 'APP',
    description: 'Đăng ký tài khoản mới và đăng nhập.',
    status: 'AVAILABLE'
  }
];

export const NAV_ITEMS = [
  { id: 'DASHBOARD', label: 'Tổng quan', icon: <Home size={20} /> },
  { id: 'MISSIONS', label: 'Nhiệm vụ', icon: <LayoutGrid size={20} /> },
  { id: 'WALLET', label: 'Rút tiền', icon: <Wallet size={20} /> },
  { id: 'REFERRAL', label: 'Giới thiệu', icon: <Users size={20} /> },
  { id: 'AI_CHAT', label: 'Hỏi đáp AI', icon: <MessageSquareText size={20} /> },
];
