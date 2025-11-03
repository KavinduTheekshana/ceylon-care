-- Fix Admin Panel Update Issue
-- Run this in your Supabase SQL Editor to allow admin panel updates

-- Drop the old restrictive policy
DROP POLICY IF EXISTS "Allow authenticated updates" ON investment_batches;

-- Create new policy that allows anyone to update (for development)
-- WARNING: For production, replace this with proper authentication!
CREATE POLICY "Allow public updates"
  ON investment_batches
  FOR UPDATE
  USING (true);

-- Verify the policies are correct
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies
WHERE tablename = 'investment_batches';
