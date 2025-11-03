import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type InvestmentData = {
  id: number;
  secured_applicants: number;
  total_positions: number;
  base_price: number;
  current_price: number;
  batch_number: number;
  is_active: boolean;
  last_updated: string;
};

export type InvestmentDetails = {
  id: number;
  total_micro_shares: number;
  current_share_price: number;
  post_launch_price: number;
  minimum_to_qualify: number;
  minimum_investment_amount: number;
  holding_period_years: number;
  launch_date: string;
  withdrawal_date: string;
  partners: string[];
  withdrawal_guarantee: string;
  is_active: boolean;
  last_updated: string;
};
