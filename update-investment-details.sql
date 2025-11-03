-- Add Investment Details to Database
-- Run this in your Supabase SQL Editor

-- Create investment_details table
CREATE TABLE IF NOT EXISTS investment_details (
  id BIGSERIAL PRIMARY KEY,
  total_micro_shares BIGINT NOT NULL DEFAULT 10000000,
  current_share_price DECIMAL(10, 2) NOT NULL DEFAULT 0.25,
  post_launch_price DECIMAL(10, 2) NOT NULL DEFAULT 1.00,
  minimum_to_qualify INTEGER NOT NULL DEFAULT 10000,
  minimum_investment_amount DECIMAL(10, 2) NOT NULL DEFAULT 2500.00,
  holding_period_years INTEGER NOT NULL DEFAULT 1,
  launch_date TIMESTAMP WITH TIME ZONE DEFAULT '2025-11-11 11:11:00+00',
  withdrawal_date TIMESTAMP WITH TIME ZONE DEFAULT '2026-11-11 11:11:00+00',
  partners TEXT[] DEFAULT ARRAY['Barclays Bank UK', 'CDX Exchange', 'R1 Coin UK Ltd (Trading as Codexer.co.uk)'],
  withdrawal_guarantee TEXT DEFAULT 'If sponsorship is not approved, you can withdraw your micro-share investment anytime after maturity. Only successful applicants'' shares will remain secured under company structure.',
  is_active BOOLEAN NOT NULL DEFAULT true,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Insert default investment details
INSERT INTO investment_details (
  total_micro_shares,
  current_share_price,
  post_launch_price,
  minimum_to_qualify,
  minimum_investment_amount,
  holding_period_years,
  is_active
) VALUES (
  10000000,
  0.25,
  1.00,
  10000,
  2500.00,
  1,
  true
);

-- Enable Row Level Security
ALTER TABLE investment_details ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access"
  ON investment_details
  FOR SELECT
  USING (true);

-- Create policy to allow public updates (for admin panel)
CREATE POLICY "Allow public updates"
  ON investment_details
  FOR UPDATE
  USING (true);

-- Enable realtime for the table
ALTER PUBLICATION supabase_realtime ADD TABLE investment_details;

-- Verify the data
SELECT * FROM investment_details;
