# Fix: Investment Details Not Showing

If your Investment & Sponsorship Details section shows "Investment details are currently unavailable" or prices aren't updating, follow these steps:

---

## Quick Diagnosis

### Step 1: Check Browser Console

1. Open your website: [http://localhost:3000](http://localhost:3000)
2. Press **F12** to open Developer Tools
3. Go to **Console** tab
4. Refresh the page
5. Look for messages starting with:
   - `Fetching investment details...`
   - `Investment details loaded:`
   - Or any **red error messages**

---

## Common Issues & Fixes

### Issue 1: Table Doesn't Exist

**Symptoms:**
- Console shows: `relation "investment_details" does not exist`
- Alert: "Error loading investment details"

**Fix:**
1. Go to Supabase SQL Editor
2. Copy ALL contents from [update-investment-details.sql](update-investment-details.sql)
3. Paste and click **"Run"**
4. Refresh your website

---

### Issue 2: No Data in Table

**Symptoms:**
- Console shows: `No rows returned`
- Data loads but section is empty

**Fix - Run Verification Script:**

1. Open Supabase SQL Editor
2. Copy contents from [verify-investment-details.sql](verify-investment-details.sql)
3. Run it
4. Check results:
   - `table_exists` should be `true`
   - `total_rows` should be `1` or more
   - You should see data in the results

**If no data exists:**

```sql
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
```

Run this SQL to insert data, then refresh website.

---

### Issue 3: RLS Policy Blocking Read

**Symptoms:**
- Console shows: `new row violates row-level security policy`
- Or: `permission denied for table investment_details`

**Fix:**

```sql
-- Drop existing policies
DROP POLICY IF EXISTS "Allow public read access" ON investment_details;

-- Create new read policy
CREATE POLICY "Allow public read access"
  ON investment_details
  FOR SELECT
  USING (true);
```

---

### Issue 4: Multiple Rows, None Active

**Symptoms:**
- Data exists but `is_active = false` for all rows

**Fix:**

```sql
-- Check which rows exist
SELECT id, is_active FROM investment_details;

-- Set one row as active (use correct ID)
UPDATE investment_details
SET is_active = true
WHERE id = 1;  -- Change 1 to your row ID

-- Make sure only one is active
UPDATE investment_details
SET is_active = false
WHERE id != 1;  -- Change 1 to your active row ID
```

---

### Issue 5: Supabase Credentials Wrong

**Symptoms:**
- Console shows: `Invalid API key` or `Invalid URL`
- Nothing loads at all

**Fix:**

1. Check [.env.local](/.env.local) file
2. Verify:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
   ```
3. Go to Supabase → Settings → API
4. Copy **Project URL** and **anon public** key
5. Update `.env.local`
6. Restart dev server: `npm run dev`

---

### Issue 6: Real-time Not Enabled

**Symptoms:**
- Data loads initially but doesn't update when changed in Supabase
- No real-time updates

**Fix:**

1. Go to Supabase Dashboard
2. Navigate to **Database** → **Replication**
3. Find `investment_details` table
4. Toggle it **ON** (green)
5. Try updating a value in Table Editor
6. Website should update instantly

---

## Complete Step-by-Step Fix

If nothing works, start fresh:

### Step 1: Drop Everything

```sql
-- Drop table if exists
DROP TABLE IF EXISTS investment_details CASCADE;

-- Drop publication if exists
ALTER PUBLICATION supabase_realtime DROP TABLE IF EXISTS investment_details;
```

### Step 2: Recreate from Scratch

Copy and run the entire [update-investment-details.sql](update-investment-details.sql) file.

### Step 3: Verify Data Exists

```sql
SELECT * FROM investment_details WHERE is_active = true;
```

Should return 1 row with all your data.

### Step 4: Check RLS Policies

```sql
SELECT policyname, cmd FROM pg_policies WHERE tablename = 'investment_details';
```

Should show:
- `Allow public read access` for SELECT
- `Allow public updates` for UPDATE

### Step 5: Enable Realtime

Database → Replication → Toggle `investment_details` ON

### Step 6: Restart Dev Server

```bash
# Stop server (Ctrl+C)
npm run dev
```

### Step 7: Test

1. Open [http://localhost:3000](http://localhost:3000)
2. Press F12 → Console
3. Should see: `Investment details loaded:` with data
4. Section should display correctly

---

## Debugging Checklist

Run through this checklist:

- [ ] Table `investment_details` exists in Supabase
- [ ] Table has at least 1 row of data
- [ ] At least 1 row has `is_active = true`
- [ ] RLS policy `Allow public read access` exists
- [ ] Realtime enabled for table (Database → Replication)
- [ ] `.env.local` has correct Supabase URL and key
- [ ] Dev server restarted after env changes
- [ ] Browser console shows "Investment details loaded:"
- [ ] No red errors in browser console

---

## Still Not Working?

### Check Supabase API Status

```sql
-- Test basic connectivity
SELECT NOW();
```

If this doesn't work, Supabase might be down or credentials are wrong.

### Check Network Tab

1. Open browser (F12)
2. Go to **Network** tab
3. Refresh page
4. Look for requests to Supabase
5. Check responses:
   - **200 OK** = Success
   - **401** = Authentication issue
   - **403** = Permission issue
   - **404** = Table doesn't exist

### Manual Test in Browser Console

Open browser console and paste:

```javascript
const { createClient } = window.supabase || require('@supabase/supabase-js');
const supabase = createClient(
  'YOUR_SUPABASE_URL',
  'YOUR_SUPABASE_ANON_KEY'
);

const { data, error } = await supabase
  .from('investment_details')
  .select('*')
  .eq('is_active', true)
  .single();

console.log('Data:', data);
console.log('Error:', error);
```

Replace with your actual credentials. This will show exactly what's happening.

---

## Common Error Messages

### "relation investment_details does not exist"
→ Run [update-investment-details.sql](update-investment-details.sql)

### "No rows returned"
→ Insert data using SQL above

### "Permission denied"
→ Fix RLS policies

### "Invalid API key"
→ Check `.env.local` credentials

### "Failed to fetch"
→ Check internet connection and Supabase status

---

## Get Detailed Logs

The component now has debugging enabled. Check console for:

```
Fetching investment details...
Investment details loaded: {
  id: 1,
  total_micro_shares: 10000000,
  current_share_price: "0.25",
  ...
}
```

If you see this, data is loading! If prices still aren't showing, it's a display issue.

---

## Contact Support

If you've tried everything:

1. Take screenshot of browser console (F12)
2. Run [verify-investment-details.sql](verify-investment-details.sql) and screenshot results
3. Check `.env.local` credentials (don't share the actual keys!)
4. Email: info@routeonegroup.co.uk

Include:
- Error messages from console
- Verification script results
- What you've already tried

---

## Quick Summary

**Most common fix:**

1. Run [update-investment-details.sql](update-investment-details.sql) in Supabase SQL Editor
2. Enable Realtime (Database → Replication)
3. Check browser console (F12) for errors
4. Verify data exists: `SELECT * FROM investment_details;`

90% of issues are solved by these 4 steps! ✅
