# Quick Deploy Guide - 10 Minutes to Live! 🚀

## ⚠️ Important: cPanel vs Vercel

**cPanel won't work** for this Next.js app because:
- Needs Node.js server (cPanel = PHP/static)
- Real-time features need WebSocket support
- Admin panel requires server-side logic

**Use Vercel instead - it's FREE and takes 10 minutes!**

---

## 🎯 Option 1: Vercel (Recommended - FREE)

### Step 1: GitHub (2 minutes)

```bash
cd ceylon-care

# Initialize git
git init
git add .
git commit -m "Initial commit"

# Create repo on github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/ceylon-care.git
git push -u origin main
```

### Step 2: Deploy (5 minutes)

1. Go to [vercel.com](https://vercel.com/signup)
2. Click "Continue with GitHub"
3. Click "Import Project"
4. Select `ceylon-care` repository
5. Click "Deploy"
6. Done! ✅

### Step 3: Environment Variables (3 minutes)

In Vercel dashboard:

Settings → Environment Variables → Add:

```
NEXT_PUBLIC_SUPABASE_URL = https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGci...
NEXT_PUBLIC_ADMIN_USERNAME = admin
NEXT_PUBLIC_ADMIN_PASSWORD = your_password
```

Click "Redeploy"

### Step 4: Custom Domain (Optional)

1. Settings → Domains
2. Add `ceyloncare.co.uk`
3. Update DNS at your registrar:
   - A record: `76.76.21.21`
   - CNAME: `cname.vercel-dns.com`

---

## 🔧 Option 2: cPanel (Static Only - Limited)

**⚠️ This removes all dynamic features!**

### What Won't Work:
- ❌ Real-time updates
- ❌ Admin panel
- ❌ Database features
- ❌ Supabase integration

### If you still want to try:

1. Edit `next.config.ts`:
```typescript
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
};
```

2. Build:
```bash
npm run build
```

3. Upload `out/` folder to cPanel `public_html`

**Only basic pages will work!**

---

## 📋 What You Need

### From Supabase:
- ✅ Project URL
- ✅ Anon Key
- ✅ SQL schema executed
- ✅ Realtime enabled

### From Your Code:
- ✅ All files in ceylon-care folder
- ✅ .env.local configured
- ✅ Tested locally (npm run dev)

---

## ✅ Deployment Checklist

**Before Deploy:**
- [ ] App works locally (`npm run dev`)
- [ ] Supabase database set up
- [ ] All SQL scripts run
- [ ] Admin login works
- [ ] Payment page tested

**Vercel Deploy:**
- [ ] Code pushed to GitHub
- [ ] Imported to Vercel
- [ ] Environment variables added
- [ ] Site deployed successfully
- [ ] Test live site

**Custom Domain (Optional):**
- [ ] Domain added in Vercel
- [ ] DNS records updated
- [ ] SSL certificate active
- [ ] Site live on custom domain

---

## 🆘 Quick Troubleshooting

### Build Fails?
```bash
# Test build locally first
npm run build

# Fix any errors shown
# Then commit and push again
```

### Environment Variables Missing?
```bash
# Check .env.local has all values
# Add same values to Vercel dashboard
# Redeploy
```

### Site is Blank?
- Check browser console (F12)
- Verify environment variables in Vercel
- Check Supabase credentials are correct

---

## 💡 Pro Tips

1. **Test locally first**: Always run `npm run dev` and test everything
2. **Check environment variables**: Most issues are wrong credentials
3. **Use Vercel**: It's designed for Next.js, FREE, and works perfectly
4. **Skip cPanel**: It won't support your app's features

---

## 🎉 Success!

After deploying to Vercel, your site will be at:
- **Free domain**: `https://ceylon-care.vercel.app`
- **Custom domain**: `https://ceyloncare.co.uk` (after DNS setup)

**All features work:**
✅ Real-time updates
✅ Admin panel
✅ Supabase database
✅ Payment page
✅ Secure HTTPS
✅ Automatic deployments

---

## 📞 Need Help?

**Vercel Issues:**
- [Vercel Docs](https://vercel.com/docs)
- [Vercel Support](https://vercel.com/support)

**Our Support:**
- Email: info@routeonegroup.co.uk

---

**Total Time: 10 minutes**
**Total Cost: FREE**

Ready? Start with Step 1! 🚀
