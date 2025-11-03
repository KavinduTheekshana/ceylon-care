# Troubleshooting Guide - Admin Panel Not Updating

## Problem: Admin Panel Data Not Updating

This happens because of Row Level Security (RLS) policies in Supabase. The database is blocking updates from unauthenticated users.

---

## Quick Fix (2 minutes)

### Step 1: Go to Supabase SQL Editor

1. Open your Supabase dashboard at [https://app.supabase.com](https://app.supabase.com)
2. Select your Ceylon Care project
3. Click "SQL Editor" in the left sidebar
4. Click "New query"

### Step 2: Run the Fix Script

Copy and paste this SQL code into the editor:

```sql
-- Fix Admin Panel Update Issue
DROP POLICY IF EXISTS "Allow authenticated updates" ON investment_batches;

CREATE POLICY "Allow public updates"
  ON investment_batches
  FOR UPDATE
  USING (true);
```

### Step 3: Click "Run"

You should see: "Success. No rows returned"

### Step 4: Test the Admin Panel

1. Go back to [http://localhost:3000/admin](http://localhost:3000/admin)
2. Click the "+1" button
3. It should now work! ✅

---

## Alternative: Run the Fix Script File

I've created a file called `fix-admin-policy.sql` in your project. You can:

1. Open `fix-admin-policy.sql`
2. Copy all the contents
3. Paste into Supabase SQL Editor
4. Click "Run"

---

## Verify It's Working

### In Browser Console (F12):

Before fix:
```
Error: new row violates row-level security policy
```

After fix:
```
Successfully updated applicant count!
```

### Check Database Directly:

1. Go to "Table Editor" in Supabase
2. Click on `investment_batches` table
3. You should see the `secured_applicants` value updating

---

## Other Common Issues

### Issue 1: "Unable to load investment data"

**Cause**: Environment variables not set correctly

**Fix**:
1. Check `.env.local` has correct values
2. No extra spaces or quotes
3. Restart dev server: `Ctrl+C` then `npm run dev`

### Issue 2: Updates work but don't show in real-time

**Cause**: Realtime not enabled

**Fix**:
1. Go to "Database" → "Replication" in Supabase
2. Find `investment_batches` table
3. Toggle it ON (green)
4. Refresh your browser

### Issue 3: Price not calculating automatically

**Cause**: Database trigger not created

**Fix**:
1. Go to SQL Editor
2. Run the full `supabase-schema.sql` again
3. This will recreate the trigger

### Issue 4: Connection errors

**Cause**: Invalid Supabase credentials

**Fix**:
1. Go to Settings → API in Supabase
2. Copy Project URL (should start with `https://`)
3. Copy anon key (long string starting with `eyJ`)
4. Update `.env.local` with correct values
5. Restart: `npm run dev`

---

## Debug Checklist

Run through this checklist:

- [ ] Supabase project is created and running
- [ ] SQL schema was executed successfully
- [ ] Fix script was run to update RLS policy
- [ ] `.env.local` has correct URL and key
- [ ] Dev server is running (`npm run dev`)
- [ ] Browser console shows no errors (F12)
- [ ] Network tab shows successful API calls
- [ ] Realtime is enabled for investment_batches

---

## Advanced Debugging

### Check RLS Policies

Run this in Supabase SQL Editor:

```sql
SELECT
  policyname,
  cmd,
  qual
FROM pg_policies
WHERE tablename = 'investment_batches';
```

You should see:
- `Allow public read access` for SELECT
- `Allow public updates` for UPDATE

### Check Realtime Status

Run this:

```sql
SELECT * FROM pg_publication_tables
WHERE tablename = 'investment_batches';
```

Should return one row showing the table is published.

### Test Update Directly

Try updating directly in SQL Editor:

```sql
UPDATE investment_batches
SET secured_applicants = 5
WHERE is_active = true;

SELECT * FROM investment_batches;
```

If this works, the problem is in the frontend code.

---

## Still Not Working?

### Check Browser Console

1. Open browser (F12)
2. Go to Console tab
3. Look for red error messages
4. Common errors:

**"Invalid supabaseUrl"**
→ Check `.env.local` has correct URL

**"Invalid API key"**
→ Check `.env.local` has correct anon key

**"new row violates row-level security policy"**
→ Run the fix script above

### Check Network Tab

1. Open browser (F12)
2. Go to Network tab
3. Click "+1" in admin panel
4. Look for request to Supabase
5. Check response:

**200 OK** = Success! ✅
**401 Unauthorized** = API key issue
**403 Forbidden** = RLS policy issue (run fix script)

---

## Security Note

The fix above allows **anyone** to update the data (for development).

### For Production:

Before going live, secure the admin panel:

#### Option 1: Email Whitelist

```sql
DROP POLICY IF EXISTS "Allow public updates" ON investment_batches;

CREATE POLICY "Allow admin updates"
  ON investment_batches
  FOR UPDATE
  USING (auth.email() IN ('admin@ceyloncare.co.uk', 'hr@routeonegroup.co.uk'));
```

#### Option 2: Add Supabase Auth

```bash
npm install @supabase/auth-ui-react @supabase/auth-ui-shared
```

Then wrap admin panel with authentication.

#### Option 3: Simple Password

Add basic password protection to the admin route.

---

## Quick Test Commands

### Test if Supabase is reachable:

```bash
curl https://your-project.supabase.co
```

Should return HTML, not an error.

### Test API key:

Open browser console and run:

```javascript
const { createClient } = window.supabase;
const supabase = createClient('YOUR_URL', 'YOUR_KEY');
const { data, error } = await supabase.from('investment_batches').select('*');
console.log(data, error);
```

Should show your data, not an error.

---

## Contact Support

If you're still stuck after trying everything:

1. Check browser console for exact error message
2. Screenshot the error
3. Email: info@routeonegroup.co.uk
4. Include:
   - Error message
   - What you've tried
   - Browser and OS

---

## Summary

**Most common fix**: Run the SQL fix script to update RLS policy.

```sql
DROP POLICY IF EXISTS "Allow authenticated updates" ON investment_batches;
CREATE POLICY "Allow public updates" ON investment_batches FOR UPDATE USING (true);
```

This should resolve 90% of admin panel update issues! ✅
