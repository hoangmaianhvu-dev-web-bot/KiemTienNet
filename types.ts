
export enum ViewState {
  LANDING = 'LANDING',
  DASHBOARD = 'DASHBOARD',
  MISSIONS = 'MISSIONS',
  WALLET = 'WALLET',
  REFERRAL = 'REFERRAL',
  SUPPORT = 'SUPPORT',
  ACCOUNT = 'ACCOUNT',
  ADMIN = 'ADMIN'
}

export interface BankInfo {
  bankName: string;
  accountNumber: string;
  accountOwner: string;
}

export interface User {
  id: string;
  name: string;
  balance: number;
  totalEarned: number;
  referralCode: string;
  membership: 'FREE' | 'VIP';
  joinDate: string;
  bankInfo?: BankInfo;
  garenaEmail?: string;
}

export interface Mission {
  id: string;
  title: string;
  reward: number;
  type: 'LINK' | 'ADS' | 'SOCIAL' | 'APP';
  description: string;
  url: string;
  status: 'AVAILABLE' | 'COMPLETED' | 'IN_PROGRESS';
}

export interface Transaction {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  type: 'WITHDRAW' | 'EARN' | 'BONUS';
  status: 'PENDING' | 'SUCCESS' | 'FAILED';
  date: string;
  method: string;
}
