
export enum ViewState {
  LANDING = 'LANDING',
  DASHBOARD = 'DASHBOARD',
  MISSIONS = 'MISSIONS',
  WALLET = 'WALLET',
  REFERRAL = 'REFERRAL',
  AI_CHAT = 'AI_CHAT'
}

export interface User {
  id: string;
  name: string;
  balance: number;
  totalEarned: number;
  referralCode: string;
  membership: 'FREE' | 'VIP';
}

export interface Mission {
  id: string;
  title: string;
  reward: number;
  type: 'LINK' | 'ADS' | 'SOCIAL' | 'APP';
  description: string;
  status: 'AVAILABLE' | 'COMPLETED' | 'IN_PROGRESS';
}

export interface Transaction {
  id: string;
  amount: number;
  type: 'WITHDRAW' | 'EARN' | 'BONUS';
  status: 'PENDING' | 'SUCCESS' | 'FAILED';
  date: string;
}
