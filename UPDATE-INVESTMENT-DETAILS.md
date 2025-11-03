# How to Update Investment Details

The Investment & Sponsorship Details section is now **fully dynamic** and updates in real-time from the database!

---

## What's Now Dynamic

✅ **Total Micro-Shares** - 10 Million (10,000,000)
✅ **Current Price** - £0.25
✅ **Post-Launch Price** - £1.00
✅ **Minimum to Qualify** - 10,000 Micro-Shares
✅ **Minimum Investment Amount** - £2,500
✅ **Holding Period** - 1 Year
✅ **Launch Date** - 11/11/2025 @ 11:11 AM
✅ **Withdrawal Date** - 11/11/2026 @ 11:11 AM
✅ **Partners List** - Barclays Bank UK | CDX Exchange | R1 Coin UK Ltd
✅ **Withdrawal Guarantee Text**

All these values are now stored in the database and update in real-time!

---

## Setup (One-Time)

### Step 1: Run the Database Schema

1. Open your Supabase dashboard: [https://app.supabase.com](https://app.supabase.com)
2. Go to **SQL Editor**
3. Open the file `update-investment-details.sql` from your project
4. Copy all the contents
5. Paste into SQL Editor
6. Click **"Run"**
7. You should see: "Success" with 1 row returned

### Step 2: Enable Realtime

1. Go to **Database** → **Replication**
2. Find the table `investment_details`
3. Toggle it **ON** (green)
4. Changes will now update in real-time!

### Step 3: Verify It's Working

1. Go to **Table Editor**
2. Click on `investment_details` table
3. You should see 1 row with all your investment data
4. Go to your website at [http://localhost:3000](http://localhost:3000)
5. The Investment section should load with data from database ✅

---

## How to Update Values

### Method 1: Using Supabase Table Editor (Easiest)

1. Go to Supabase Dashboard
2. Click **Table Editor**
3. Select `investment_details` table
4. Click on the value you want to change
5. Edit it
6. Press Enter to save
7. **Watch your website update instantly!** ✨

### Method 2: Using SQL Editor

```sql
UPDATE investment_details
SET
  total_micro_shares = 20000000,  -- Change to 20 million
  current_share_price = 0.30,     -- Change price to £0.30
  post_launch_price = 1.50,       -- Change post-launch to £1.50
  minimum_to_qualify = 15000,     -- Change minimum shares
  minimum_investment_amount = 3750.00  -- Update investment amount
WHERE is_active = true;
```

Run this in SQL Editor to update multiple values at once.

---

## Examples: Common Updates

### Example 1: Change Share Price

```sql
UPDATE investment_details
SET current_share_price = 0.35
WHERE is_active = true;
```

Website will instantly show: **"Current Price: £0.35"**

### Example 2: Update Launch Date

```sql
UPDATE investment_details
SET launch_date = '2025-12-25 11:11:00+00'
WHERE is_active = true;
```

Website will show: **"Official Launch: 25/12/2025 @ 11:11 AM"**

### Example 3: Change Partners

```sql
UPDATE investment_details
SET partners = ARRAY[
  'Barclays Bank UK',
  'CDX Exchange',
  'R1 Coin UK Ltd',
  'New Partner Ltd'
]
WHERE is_active = true;
```

### Example 4: Update Withdrawal Guarantee Text

```sql
UPDATE investment_details
SET withdrawal_guarantee = 'Your new withdrawal guarantee text goes here.'
WHERE is_active = true;
```

### Example 5: Change Minimum Investment

```sql
UPDATE investment_details
SET
  minimum_to_qualify = 20000,
  minimum_investment_amount = 5000.00
WHERE is_active = true;
```

Button will update to: **"Buy 20,000 Shares (£5,000.00) & Secure Your Position"**

---

## Field Reference

| Field Name | Type | Description | Example |
|------------|------|-------------|---------|
| `total_micro_shares` | Number | Total shares available | 10000000 |
| `current_share_price` | Decimal | Current price per share | 0.25 |
| `post_launch_price` | Decimal | Price after launch | 1.00 |
| `minimum_to_qualify` | Number | Min shares to qualify | 10000 |
| `minimum_investment_amount` | Decimal | Min investment in £ | 2500.00 |
| `holding_period_years` | Number | Years to hold | 1 |
| `launch_date` | Timestamp | Official launch date | 2025-11-11 11:11:00 |
| `withdrawal_date` | Timestamp | When can withdraw | 2026-11-11 11:11:00 |
| `partners` | Array | List of partners | ['Partner 1', 'Partner 2'] |
| `withdrawal_guarantee` | Text | Guarantee description | 'If sponsorship...' |

---

## Date Format

Dates are stored in ISO 8601 format with timezone:

```sql
'2025-11-11 11:11:00+00'  -- UK time
```

The website automatically formats them to:
```
11/11/2025 @ 11:11
```

---

## Real-time Updates

Changes made in Supabase will **instantly** appear on:
- ✅ Main website
- ✅ All connected users
- ✅ No refresh needed!

**How it works:**
1. You update database in Supabase
2. Supabase Realtime broadcasts change
3. All website users see update instantly
4. Magic! ✨

---

## Troubleshooting

### Changes not showing on website?

**Check:**
1. Realtime is enabled for `investment_details` table
2. Browser console (F12) for errors
3. Refresh the page manually
4. Check the `is_active` field is `true`

### "Investment details are currently unavailable"

**Fix:**
1. Make sure you ran `update-investment-details.sql`
2. Check the table exists in Supabase
3. Verify there's at least 1 row with `is_active = true`
4. Check `.env.local` has correct Supabase credentials

### Data shows but doesn't update in real-time?

**Fix:**
1. Enable Realtime in Database → Replication
2. Toggle `investment_details` table ON
3. Check browser console for WebSocket errors

---

## Security Note

Current setup allows public reads (everyone can see) but only allows updates through Supabase dashboard.

**For production:**
- Keep read access public (so users can see)
- Updates can only be made through Supabase dashboard (requires login)
- Or add an admin panel to update these values (similar to applicant count panel)

---

## Create an Admin Panel for Investment Details (Optional)

You can create a second admin page to update these values:

1. Copy the existing admin panel structure
2. Create `/admin/investment` route
3. Add form fields for each investment detail
4. Save button updates the database
5. Real-time updates for all users!

Let me know if you'd like me to create this!

---

## Quick Test

### Test 1: Update Price
```sql
UPDATE investment_details SET current_share_price = 0.99 WHERE is_active = true;
```
Check website - should show £0.99

### Test 2: Update Back
```sql
UPDATE investment_details SET current_share_price = 0.25 WHERE is_active = true;
```
Check website - should show £0.25 again

### Test 3: Change Partners
```sql
UPDATE investment_details
SET partners = ARRAY['Test Partner 1', 'Test Partner 2']
WHERE is_active = true;
```
Check website - should show new partners

---

## Best Practices

1. **Always use WHERE is_active = true** - This ensures you update the active record
2. **Test changes** - Make small changes and verify before big updates
3. **Keep backups** - Export your data before major changes
4. **Check formatting** - Dates must be in correct format
5. **Use decimals** - For prices, use 2 decimal places (0.25, not 0.2)

---

## Need Help?

If you have issues:
1. Check browser console (F12)
2. Verify data in Supabase Table Editor
3. Check Realtime is enabled
4. Email: info@routeonegroup.co.uk

---

## Summary

Your Investment & Sponsorship Details section is now:
- ✅ Fully dynamic
- ✅ Updates in real-time
- ✅ Easy to change via Supabase
- ✅ No code changes needed
- ✅ Professional and scalable

Update values anytime through Supabase dashboard and watch your website update instantly! 🎉
