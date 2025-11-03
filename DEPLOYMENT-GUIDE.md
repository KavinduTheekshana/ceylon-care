# Deployment Guide - Ceylon Care Investment Platform

## Important: Next.js and cPanel

**⚠️ cPanel Challenge:** Traditional cPanel hosting doesn't support Next.js applications natively because:
- Next.js requires Node.js server
- cPanel is designed for PHP/static sites
- Real-time features need WebSocket support

---

## ✅ Recommended Deployment Options

### Option 1: Vercel (Recommended - FREE & Easy)

**Why Vercel:**
- Built by Next.js creators
- **FREE** hosting
- One-click deployment
- Automatic HTTPS
- Perfect for Next.js
- Real-time updates work perfectly
- Custom domain support

**Steps:**

1. **Push to GitHub**
```bash
cd ceylon-care
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/ceylon-care.git
git push -u origin main
```

2. **Deploy to Vercel**
- Go to [vercel.com](https://vercel.com)
- Sign up with GitHub
- Click "Import Project"
- Select your `ceylon-care` repository
- Click "Deploy"

3. **Add Environment Variables**
- Go to Project Settings → Environment Variables
- Add:
  ```
  NEXT_PUBLIC_SUPABASE_URL = your_supabase_url
  NEXT_PUBLIC_SUPABASE_ANON_KEY = your_anon_key
  NEXT_PUBLIC_ADMIN_USERNAME = admin
  NEXT_PUBLIC_ADMIN_PASSWORD = your_password
  ```

4. **Connect Custom Domain**
- Go to Settings → Domains
- Add your domain (e.g., ceyloncare.co.uk)
- Follow DNS instructions
- Vercel handles SSL automatically

**Time:** 10 minutes
**Cost:** FREE

---

### Option 2: Convert to Static & Host on cPanel

**If you must use cPanel**, convert to static HTML:

#### Step 1: Export Static Site

Edit `next.config.ts`:
```typescript
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

#### Step 2: Build Static Files
```bash
npm run build
```

This creates an `out/` folder with static HTML files.

#### Step 3: Upload to cPanel

1. Log into cPanel
2. Go to File Manager
3. Navigate to `public_html`
4. Upload all files from `out/` folder
5. Your site is live!

**⚠️ Limitations:**
- ❌ No real-time updates
- ❌ No server-side features
- ❌ Admin panel won't work
- ❌ Database features limited
- ✅ Basic pages will work

**Only use this if you absolutely need cPanel and can sacrifice features.**

---

### Option 3: Node.js Hosting on cPanel (Advanced)

**If your cPanel has Node.js support:**

#### Requirements:
- cPanel with Node.js enabled
- SSH access
- Node.js 18+

#### Steps:

1. **Enable Node.js in cPanel**
- Log into cPanel
- Find "Setup Node.js App"
- Create new application:
  - Node.js version: 18 or higher
  - Application root: `ceylon-care`
  - Application URL: your domain

2. **Upload Files via SSH**
```bash
# On your local machine
cd ceylon-care
npm run build

# Upload to server (replace with your details)
scp -r .next/ package.json package-lock.json user@yourserver.com:~/ceylon-care/
```

3. **Install Dependencies on Server**
```bash
ssh user@yourserver.com
cd ceylon-care
npm install --production
```

4. **Configure App**
- Set environment variables in cPanel Node.js settings
- Start the application
- Point domain to the app

**Challenges:**
- Requires technical knowledge
- Not all cPanel providers support this
- May need to contact hosting support

---

### Option 4: Netlify (Alternative to Vercel)

**Similar to Vercel, also FREE:**

1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub
3. Import your repository
4. Add environment variables
5. Deploy!

**Features:**
- FREE hosting
- Custom domains
- Automatic HTTPS
- Easy deployment

---

## 🎯 Our Recommendation

### For Your Ceylon Care Platform:

**Use Vercel** because:

1. ✅ **FREE forever** for your use case
2. ✅ **Real-time updates work** (Supabase WebSockets)
3. ✅ **Admin panel works** perfectly
4. ✅ **Database features** all functional
5. ✅ **Automatic SSL** (HTTPS)
6. ✅ **Fast deployment** (10 minutes)
7. ✅ **Custom domain** support (ceyloncare.co.uk)
8. ✅ **Automatic updates** when you push to GitHub
9. ✅ **Built for Next.js** - zero config needed

---

## 📋 Step-by-Step: Deploy to Vercel (Detailed)

### Step 1: Prepare Your Code

```bash
cd ceylon-care

# Make sure everything works locally
npm run dev
# Test at http://localhost:3000

# Build to check for errors
npm run build
```

### Step 2: Push to GitHub

```bash
# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Ready for deployment"

# Create repository on GitHub.com first, then:
git remote add origin https://github.com/YOUR_USERNAME/ceylon-care.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy to Vercel

1. Go to [vercel.com/signup](https://vercel.com/signup)
2. Click "Continue with GitHub"
3. Authorize Vercel
4. Click "Import Project"
5. Find your `ceylon-care` repository
6. Click "Import"
7. Configure:
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`
8. Click "Deploy"

### Step 4: Add Environment Variables

While deploying or after:

1. Go to Project Settings
2. Click "Environment Variables"
3. Add each variable:

```
NEXT_PUBLIC_SUPABASE_URL
Value: https://your-project.supabase.co

NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

NEXT_PUBLIC_ADMIN_USERNAME
Value: admin

NEXT_PUBLIC_ADMIN_PASSWORD
Value: your_secure_password
```

4. Click "Save"
5. Redeploy if needed

### Step 5: Connect Your Domain

**If you own ceyloncare.co.uk:**

1. In Vercel, go to Project Settings → Domains
2. Click "Add"
3. Enter: `ceyloncare.co.uk`
4. Vercel will show DNS records
5. Go to your domain registrar (where you bought the domain)
6. Update DNS records:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```
7. Wait 1-48 hours for DNS propagation
8. Your site will be live at ceyloncare.co.uk

---

## 🔄 Updating Your Site

### After Initial Deployment:

Every time you make changes:

```bash
# Make your changes
# Test locally
npm run dev

# Commit and push
git add .
git commit -m "Updated features"
git push

# Vercel automatically deploys!
```

**That's it!** Vercel sees the push and redeploys automatically.

---

## 💰 Cost Comparison

| Platform | Cost | Features |
|----------|------|----------|
| **Vercel** | FREE | Full Next.js, Real-time, SSL, Custom domain |
| **Netlify** | FREE | Full Next.js, Real-time, SSL, Custom domain |
| **cPanel (Static)** | $5-20/mo | ❌ No real-time, ❌ No admin panel |
| **cPanel (Node.js)** | $20-50/mo | Complex setup, May not work |
| **VPS (DigitalOcean)** | $6/mo | Full control, Requires setup |

**Winner:** Vercel (FREE + Full features)

---

## 🛠️ Troubleshooting

### Build Fails?

Check:
1. All environment variables are set
2. No syntax errors in code
3. Dependencies are in package.json
4. .env.local is NOT in git (it's in .gitignore)

### Real-time Not Working?

1. Check Supabase Realtime is enabled
2. Environment variables are correct
3. WebSockets are supported (Vercel: ✅)

### Admin Login Not Working?

1. Check environment variables are set
2. Try default: `admin` / `ceyloncare2025`
3. Clear browser cache

---

## 📞 Support

Need help deploying?

**Vercel Support:**
- [Vercel Docs](https://vercel.com/docs)
- [Vercel Discord](https://vercel.com/discord)

**Our Support:**
- Email: info@routeonegroup.co.uk

---

## ✅ Deployment Checklist

Before going live:

- [ ] All features tested locally
- [ ] Supabase database set up
- [ ] Environment variables ready
- [ ] Code pushed to GitHub
- [ ] Vercel account created
- [ ] Project deployed
- [ ] Environment variables added to Vercel
- [ ] Custom domain connected (optional)
- [ ] SSL certificate active (automatic)
- [ ] Admin panel tested
- [ ] Real-time updates working
- [ ] Payment page tested
- [ ] Mobile responsive checked

---

## 🎉 Summary

**Best Option: Vercel**

1. Push code to GitHub (5 min)
2. Import to Vercel (2 min)
3. Add environment variables (2 min)
4. Deploy! (1 min)
5. Connect domain (optional)

**Total Time:** 10-15 minutes
**Total Cost:** FREE

Your site will be live at:
- `https://ceylon-care.vercel.app` (free subdomain)
- `https://ceyloncare.co.uk` (your custom domain)

**All features work:**
- ✅ Real-time updates
- ✅ Admin panel
- ✅ Database
- ✅ Payment page
- ✅ Secure login
- ✅ HTTPS/SSL

Ready to deploy? Start with Step 1 above! 🚀
