# Ceylon Care Ltd - Investment Platform

A modern, real-time investment platform built with Next.js and Supabase for Ceylon Care's NHS Pilot & Job Sponsorship Programme 2025.

## Features

- **Real-time Updates**: Live Entry Demand section updates instantly across all connected clients
- **Dynamic Pricing**: Automatic price calculation based on demand
- **Admin Panel**: Easy-to-use interface for managing applicant counts
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Production Ready**: Built with TypeScript, Next.js 15, and Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 15 (App Router) + React 19
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Real-time**: Supabase Realtime
- **Language**: TypeScript
- **Hosting**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Supabase account (free tier works great)

### 1. Supabase Setup

1. Go to [https://app.supabase.com](https://app.supabase.com) and create a new project
2. Wait for your database to be ready (2-3 minutes)
3. Go to **SQL Editor** in the Supabase dashboard
4. Copy the entire contents of `supabase-schema.sql` from this project
5. Paste it into the SQL Editor and click "Run"
6. Go to **Database** → **Replication** and ensure `investment_batches` table has replication enabled

### 2. Get Your Supabase Credentials

1. In Supabase dashboard, go to **Settings** → **API**
2. Copy your **Project URL** (looks like: `https://xxxxx.supabase.co`)
3. Copy your **anon public** key (long string starting with `eyJ...`)

### 3. Configure Environment Variables

1. Open the `.env.local` file in this project
2. Replace the placeholder values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Install Dependencies and Run

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your site!

## Project Structure

```
ceylon-care/
├── app/
│   ├── page.tsx              # Main landing page
│   └── admin/
│       └── page.tsx          # Admin panel
├── components/
│   └── LiveEntryDemand.tsx   # Real-time demand component
├── lib/
│   └── supabase.ts           # Supabase client configuration
├── supabase-schema.sql       # Database schema
└── .env.local                # Environment variables
```

## Usage

### Main Website

Visit [http://localhost:3000](http://localhost:3000) to see the public-facing site with:
- NHS Programme information
- Investment details
- **Live Entry Demand** (updates in real-time)
- Employment opportunities
- Contact information

### Admin Panel

Visit [http://localhost:3000/admin](http://localhost:3000/admin) to access the admin panel.

**Login Credentials (Default):**
- Username: `admin`
- Password: `ceyloncare2025`

**Features:**
- View current applicant statistics
- Update secured applicant counts
- See real-time price calculations
- Use quick action buttons (+1, +5, +10)
- Monitor live progress
- Secure logout functionality

**⚠️ Important:** Change the default credentials before going to production! See [ADMIN-AUTH.md](ADMIN-AUTH.md) for details.

## How Real-time Works

1. When an admin updates the applicant count, it's saved to Supabase
2. A database trigger automatically calculates the new price
3. Supabase Realtime broadcasts the change to all connected clients
4. All users see the update instantly without refreshing

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Click Deploy!

Your site will be live at `your-project.vercel.app`

### Deploy to Other Platforms

This Next.js app can also be deployed to:
- **Netlify**: Similar to Vercel
- **Railway**: Supports full-stack apps
- **Your own server**: Build with `npm run build` then `npm start`

## Database Schema

The `investment_batches` table stores:
- `batch_number`: Current batch (1, 2, 3...)
- `secured_applicants`: Number of confirmed applicants
- `total_positions`: Total available positions (default: 100)
- `base_price`: Starting price (£0.25)
- `current_price`: Auto-calculated based on demand
- `growth_rate`: Price increase rate (0.5 = 50%)
- `is_active`: Whether this batch is currently active

## Customization

### Change Pricing Formula

Edit the SQL function in `supabase-schema.sql`:

```sql
NEW.current_price := NEW.base_price * (1 + (NEW.secured_applicants::DECIMAL / NEW.total_positions) * NEW.growth_rate);
```

### Modify Batch Size

Update in the admin panel or directly in Supabase:

```sql
UPDATE investment_batches
SET total_positions = 200
WHERE is_active = true;
```

### Add More Batches

```sql
INSERT INTO investment_batches (batch_number, total_positions, base_price)
VALUES (2, 100, 0.50);
```

## Security Considerations

### For Production

1. **Protect Admin Panel**: Add authentication using:
   - Supabase Auth
   - NextAuth.js
   - Custom password protection

2. **Row Level Security**: The database already has RLS enabled, but enhance it:
   ```sql
   -- Only allow updates from specific emails
   CREATE POLICY "Admin only updates"
   ON investment_batches FOR UPDATE
   USING (auth.email() IN ('admin@ceyloncare.co.uk'));
   ```

3. **Environment Variables**: Never commit `.env.local` to Git

4. **Rate Limiting**: Add rate limiting to prevent abuse

## Troubleshooting

### "Unable to load investment data"

1. Check `.env.local` has correct credentials
2. Ensure SQL schema was run in Supabase
3. Verify Realtime is enabled for the table

### Data not updating in real-time

1. Check browser console for errors
2. Verify Realtime is enabled: **Database** → **Replication**
3. Ensure RLS policies allow SELECT

### Admin panel can't update

1. Check RLS policies in Supabase
2. Verify the table exists and has data
3. Check browser console for API errors

## Support

For questions or issues:
- **Email**: info@routeonegroup.co.uk
- **Project Issues**: Create an issue in your repository

## License

© 2025 Route One Group | Ceylon Care Ltd | All Rights Reserved.

---

Built with Next.js, Supabase, and modern web technologies for a fast, secure, and scalable investment platform.
