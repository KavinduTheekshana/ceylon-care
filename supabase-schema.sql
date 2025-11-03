-- Ceylon Care Investment Tracking Schema
-- Run this in your Supabase SQL Editor

-- Create investment_batches table
CREATE TABLE IF NOT EXISTS investment_batches (
  id BIGSERIAL PRIMARY KEY,
  batch_number INTEGER NOT NULL DEFAULT 1,
  secured_applicants INTEGER NOT NULL DEFAULT 0,
  total_positions INTEGER NOT NULL DEFAULT 100,
  base_price DECIMAL(10, 2) NOT NULL DEFAULT 0.25,
  current_price DECIMAL(10, 2) NOT NULL DEFAULT 0.25,
  growth_rate DECIMAL(5, 2) NOT NULL DEFAULT 0.5,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create index for active batches
CREATE INDEX idx_active_batch ON investment_batches(is_active) WHERE is_active = true;

-- Insert initial batch
INSERT INTO investment_batches (
  batch_number,
  secured_applicants,
  total_positions,
  base_price,
  current_price,
  is_active
) VALUES (
  1,
  0,
  100,
  0.25,
  0.25,
  true
);

-- Create function to automatically update current_price when secured_applicants changes
CREATE OR REPLACE FUNCTION update_investment_price()
RETURNS TRIGGER AS $$
BEGIN
  NEW.current_price := NEW.base_price * (1 + (NEW.secured_applicants::DECIMAL / NEW.total_positions) * NEW.growth_rate);
  NEW.last_updated := TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update price
CREATE TRIGGER trigger_update_price
  BEFORE UPDATE OF secured_applicants ON investment_batches
  FOR EACH ROW
  EXECUTE FUNCTION update_investment_price();

-- Enable Row Level Security (RLS)
ALTER TABLE investment_batches ENABLE ROW LEVEL SECURITY;

-- Create policy to allow read access to everyone
CREATE POLICY "Allow public read access"
  ON investment_batches
  FOR SELECT
  USING (true);

-- Create policy to allow updates from anyone (for admin panel)
-- WARNING: For production, replace this with proper authentication!
-- Example: USING (auth.email() IN ('admin@ceyloncare.co.uk'))
CREATE POLICY "Allow public updates"
  ON investment_batches
  FOR UPDATE
  USING (true);

-- Enable realtime for the table
ALTER PUBLICATION supabase_realtime ADD TABLE investment_batches;
