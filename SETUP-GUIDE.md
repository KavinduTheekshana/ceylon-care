# Quick Setup Guide

Follow these steps to get your Ceylon Care investment platform running in 10 minutes.

## Step 1: Create Supabase Account (2 minutes)

1. Visit [https://app.supabase.com](https://app.supabase.com)
2. Sign up with GitHub or email
3. Click "New Project"
4. Fill in:
   - **Name**: ceylon-care (or any name)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to your users (Europe for UK)
5. Click "Create new project"
6. Wait 2-3 minutes for database setup

## Step 2: Run Database Schema (1 minute)

1. In Supabase dashboard, click "SQL Editor" in the left sidebar
2. Click "New query"
3. Open the file `supabase-schema.sql` in this project
4. Copy ALL the SQL code
5. Paste into the Supabase SQL Editor
6. Click "Run" button (bottom right)
7. You should see "Success. No rows returned"

## Step 3: Enable Realtime (1 minute)

1. In Supabase dashboard, go to "Database" → "Replication"
2. Find the table `investment_batches`
3. Toggle it ON (it should turn green)
4. Click "Save" if prompted

## Step 4: Get Your API Keys (1 minute)

1. In Supabase dashboard, go to "Settings" (gear icon) → "API"
2. You'll see two important values:
   - **Project URL**: Something like `https://abcdefgh.supabase.co`
   - **anon public key**: Long string starting with `eyJ...`
3. Copy both values

## Step 5: Configure Your App (1 minute)

1. Open the file `.env.local` in the `ceylon-care` folder
2. Replace the placeholder values with your actual keys:

```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefgh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. Save the file

## Step 6: Run the Application (2 minutes)

Open your terminal in the `ceylon-care` folder and run:

```bash
# Install dependencies (first time only)
npm install

# Start the development server
npm run dev
```

Wait for the message: "Ready - started server on 0.0.0.0:3000"

## Step 7: Test It Out! (2 minutes)

### View the Main Site

1. Open your browser
2. Go to [http://localhost:3000](http://localhost:3000)
3. You should see the Ceylon Care website
4. Scroll to "Live Entry Demand" - it should show:
   - Secured Applicants: 0
   - Remaining: 100
   - Live Price: £0.25

### Open the Admin Panel

1. Open a new browser tab
2. Go to [http://localhost:3000/admin](http://localhost:3000/admin)
3. You should see the admin dashboard
4. Try clicking "+1" or "+5" buttons
5. Watch the main site tab update in real-time!

## Troubleshooting

### "Unable to load investment data"

**Problem**: The app can't connect to Supabase

**Solutions**:
1. Check `.env.local` has the correct URL and key (no extra spaces)
2. Make sure you ran the SQL schema in Step 2
3. Restart the dev server: Press Ctrl+C, then run `npm run dev` again

### "No rows returned" after running SQL

**Problem**: This is actually SUCCESS! It means the SQL ran correctly.

**How to verify**:
1. Go to "Table Editor" in Supabase
2. You should see `investment_batches` table
3. Click it - you should see 1 row of data

### Site loads but data doesn't update in real-time

**Problem**: Realtime not enabled

**Solution**:
1. Go to "Database" → "Replication" in Supabase
2. Make sure `investment_batches` is toggled ON
3. Refresh your browser

### Port 3000 already in use

**Problem**: Another app is using port 3000

**Solution**:
```bash
# Kill the process
lsof -ti:3000 | xargs kill -9

# Or use a different port
npm run dev -- -p 3001
```

## Next Steps

### Deploy to Production

Once everything works locally, deploy to Vercel:

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add the same environment variables
5. Deploy!

### Secure the Admin Panel

For production, add authentication:

```bash
npm install @supabase/auth-ui-react @supabase/auth-ui-shared
```

See the main README.md for detailed instructions.

### Customize Pricing

Edit the pricing formula in Supabase:

1. Go to "SQL Editor"
2. Find the `update_investment_price()` function
3. Modify the calculation
4. Run the updated SQL

## Support

If you're stuck:
1. Check the main README.md for detailed documentation
2. Look at the browser console (F12) for error messages
3. Check Supabase dashboard logs
4. Email: info@routeonegroup.co.uk

## Quick Reference

| Task | URL |
|------|-----|
| Main Site | http://localhost:3000 |
| Admin Panel | http://localhost:3000/admin |
| Supabase Dashboard | https://app.supabase.com |
| Vercel Deploy | https://vercel.com |

## Success Checklist

- [ ] Supabase project created
- [ ] SQL schema executed successfully
- [ ] Realtime enabled for investment_batches table
- [ ] .env.local configured with correct keys
- [ ] npm install completed
- [ ] npm run dev running
- [ ] Main site loads at localhost:3000
- [ ] Admin panel loads at localhost:3000/admin
- [ ] Real-time updates work between admin and main site

If all boxes are checked, you're ready to go live!
