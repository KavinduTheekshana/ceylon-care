-- Troubleshooting: Verify Investment Details Setup
-- Run this in Supabase SQL Editor

-- 1. Check if table exists
SELECT EXISTS (
  SELECT FROM information_schema.tables
  WHERE table_name = 'investment_details'
) AS table_exists;

-- 2. Check if there's data in the table
SELECT COUNT(*) as total_rows FROM investment_details;

-- 3. View all data
SELECT * FROM investment_details;

-- 4. Check if active row exists
SELECT * FROM investment_details WHERE is_active = true;

-- 5. Check RLS policies
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd
FROM pg_policies
WHERE tablename = 'investment_details';

-- 6. Check if realtime is enabled
SELECT * FROM pg_publication_tables
WHERE tablename = 'investment_details';

-- If no data exists, insert it:
-- INSERT INTO investment_details (
--   total_micro_shares,
--   current_share_price,
--   post_launch_price,
--   minimum_to_qualify,
--   minimum_investment_amount,
--   holding_period_years,
--   is_active
-- ) VALUES (
--   10000000,
--   0.25,
--   1.00,
--   10000,
--   2500.00,
--   1,
--   true
-- );
