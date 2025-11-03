# Subdomain Setup with Cloudflare + Vercel

## Perfect Setup: Subdomain on Vercel + Main Domain on cPanel

**Your Scenario:**
- Main domain (e.g., `routeonegroup.co.uk`) → cPanel
- Subdomain (e.g., `invest.routeonegroup.co.uk`) → Vercel

This works perfectly! ✅

---

## 🎯 Recommended Subdomain Names

Choose one:
- `invest.routeonegroup.co.uk`
- `apply.routeonegroup.co.uk`
- `ceylon.routeonegroup.co.uk`
- `care.routeonegroup.co.uk`
- `shares.routeonegroup.co.uk`

---

## 📋 Step-by-Step Setup with Cloudflare

### Step 1: Deploy to Vercel First

1. Push code to GitHub
2. Import to Vercel
3. Add environment variables
4. Get your Vercel deployment URL (e.g., `ceylon-care.vercel.app`)

### Step 2: Add Subdomain in Vercel

1. Go to your Vercel project
2. Click **Settings** → **Domains**
3. Click **Add Domain**
4. Enter your subdomain: `invest.routeonegroup.co.uk`
5. Click **Add**

Vercel will show you need to configure DNS.

### Step 3: Configure Cloudflare DNS

**Option A: CNAME Record (Recommended)**

1. Log into [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Select your domain (`routeonegroup.co.uk`)
3. Go to **DNS** → **Records**
4. Click **Add record**
5. Configure:
   ```
   Type: CNAME
   Name: invest
   Target: cname.vercel-dns.com
   Proxy status: DNS only (gray cloud)
   TTL: Auto
   ```
6. Click **Save**

**Important:** Set to "DNS only" (gray cloud), NOT "Proxied" (orange cloud)

**Option B: A Record (Alternative)**

```
Type: A
Name: invest
IPv4 address: 76.76.21.21
Proxy status: DNS only (gray cloud)
TTL: Auto
```

### Step 4: Verify in Vercel

1. Go back to Vercel → Settings → Domains
2. Wait 1-5 minutes
3. Vercel will automatically verify
4. You'll see: ✅ Valid Configuration

### Step 5: Enable SSL (Automatic)

Vercel automatically provisions SSL certificate. Within 10 minutes:
- ✅ `https://invest.routeonegroup.co.uk` will be live
- ✅ SSL/HTTPS automatic
- ✅ All features working

---

## 🔧 Cloudflare-Specific Settings

### Recommended Cloudflare Settings:

1. **SSL/TLS Mode**: Full (not Full Strict)
   - Go to SSL/TLS → Overview
   - Select "Full"

2. **Proxy Status**: DNS only (gray cloud)
   - Important for Vercel to work correctly
   - You can enable proxy after SSL is set up

3. **Always Use HTTPS**: ON
   - Go to SSL/TLS → Edge Certificates
   - Toggle "Always Use HTTPS" ON

---

## 🎨 Visual Guide

### Your DNS Setup Will Look Like:

```
Cloudflare DNS Records:

Type    Name        Target                      Proxy
----    ----        ------                      -----
A       @           123.45.67.89 (cPanel)      ☁️ Proxied
CNAME   www         routeonegroup.co.uk        ☁️ Proxied
CNAME   invest      cname.vercel-dns.com       ⚪ DNS only
```

### What This Means:

- `routeonegroup.co.uk` → Your cPanel site
- `www.routeonegroup.co.uk` → Your cPanel site
- `invest.routeonegroup.co.uk` → Your Vercel app (Ceylon Care)

---

## ⚡ Quick Setup (Copy-Paste)

### Cloudflare DNS Record:

```
Type: CNAME
Name: invest
Target: cname.vercel-dns.com
Proxy: DNS only (gray cloud)
TTL: Auto
```

### Vercel Domain:

```
Domain: invest.routeonegroup.co.uk
```

---

## ✅ Verification Steps

### Test Your Setup:

1. **Check DNS Propagation** (1-5 minutes)
   ```bash
   # On Mac/Linux terminal
   dig invest.routeonegroup.co.uk

   # Or visit:
   # https://dnschecker.org
   ```

2. **Visit Your Subdomain**
   ```
   https://invest.routeonegroup.co.uk
   ```

3. **Check SSL Certificate**
   - Click padlock icon in browser
   - Should show "Issued by: Vercel"
   - Valid HTTPS ✅

---

## 🔄 Multiple Subdomains (Optional)

You can add multiple subdomains for different purposes:

### In Cloudflare:

```
invest.routeonegroup.co.uk  → Vercel (Ceylon Care)
app.routeonegroup.co.uk     → Vercel (Dashboard)
api.routeonegroup.co.uk     → Vercel (API)
```

### In Vercel:

Add each domain in Settings → Domains

---

## 🚨 Troubleshooting

### Issue 1: "Invalid Configuration" in Vercel

**Solution:**
1. Check Cloudflare DNS record is correct
2. Make sure Proxy is "DNS only" (gray cloud)
3. Wait 5-10 minutes for DNS propagation
4. Try removing and re-adding domain in Vercel

### Issue 2: SSL Certificate Not Working

**Solution:**
1. Wait 10-20 minutes for SSL provisioning
2. Check Cloudflare SSL mode is "Full"
3. Make sure "Always Use HTTPS" is enabled
4. Clear browser cache

### Issue 3: Subdomain Not Resolving

**Solution:**
1. Check DNS with `dig invest.routeonegroup.co.uk`
2. Verify CNAME target is `cname.vercel-dns.com`
3. Check Cloudflare DNS record is "DNS only"
4. Wait for DNS propagation (up to 24 hours, usually 5 minutes)

### Issue 4: "Too Many Redirects"

**Solution:**
1. Change Cloudflare SSL mode from "Flexible" to "Full"
2. Disable Cloudflare proxy (gray cloud) temporarily
3. Clear browser cache and cookies

---

## 🎯 Recommended Setup Flow

### Day 1:
1. ✅ Deploy to Vercel with default URL
2. ✅ Test everything works on `ceylon-care.vercel.app`
3. ✅ Add environment variables
4. ✅ Test admin panel, payments, real-time updates

### Day 2:
1. ✅ Add subdomain in Vercel
2. ✅ Configure Cloudflare DNS
3. ✅ Wait for verification
4. ✅ Test subdomain
5. ✅ Enable Cloudflare features if needed

---

## 💡 Pro Tips

### 1. Keep It Simple
Start with "DNS only" (gray cloud), enable Cloudflare proxy later if needed.

### 2. Multiple Environments
```
invest.routeonegroup.co.uk        → Production
dev.invest.routeonegroup.co.uk    → Development
```

### 3. Email Links
Update your marketing materials:
- "Visit: invest.routeonegroup.co.uk"
- Short, professional, memorable

### 4. Redirects (Optional)
Set up redirect from main domain:
```
routeonegroup.co.uk/invest → invest.routeonegroup.co.uk
```

---

## 🔐 Security Best Practices

### Cloudflare Security:

1. **Enable Firewall Rules**
   - Block suspicious IPs
   - Rate limiting for admin panel

2. **Enable DNSSEC**
   - Extra DNS security layer

3. **Set Up Page Rules**
   - Cache static assets
   - Force HTTPS

4. **Enable Bot Fight Mode**
   - Protect against bots

---

## 📊 Performance Optimization

### Cloudflare Settings:

1. **Enable Auto Minify**
   - JavaScript, CSS, HTML

2. **Enable Brotli**
   - Better compression

3. **Browser Cache TTL**
   - Set to 4 hours or higher

4. **Development Mode**
   - Turn OFF for production

---

## ✅ Final Checklist

Before going live:

- [ ] Vercel deployment successful
- [ ] Environment variables configured
- [ ] Subdomain added in Vercel
- [ ] Cloudflare DNS record created
- [ ] DNS propagation complete
- [ ] HTTPS/SSL working
- [ ] Main site still works on cPanel
- [ ] Subdomain loads Ceylon Care app
- [ ] Admin panel works
- [ ] Real-time updates work
- [ ] Payment page loads

---

## 🎉 Example Setup

### Your Final URLs:

**Main Site (cPanel):**
- `https://routeonegroup.co.uk` → Your main website
- `https://www.routeonegroup.co.uk` → Your main website

**Ceylon Care (Vercel):**
- `https://invest.routeonegroup.co.uk` → Investment platform
- `https://invest.routeonegroup.co.uk/admin` → Admin panel
- `https://invest.routeonegroup.co.uk/payment` → Payment page

---

## 📞 Support

### Cloudflare Issues:
- [Cloudflare Community](https://community.cloudflare.com)
- [Cloudflare Support](https://support.cloudflare.com)

### Vercel Issues:
- [Vercel Docs](https://vercel.com/docs)
- [Vercel Support](https://vercel.com/support)

### Our Support:
- Email: info@routeonegroup.co.uk

---

## 🚀 Quick Command Reference

### Check DNS:
```bash
# Check if DNS is configured
dig invest.routeonegroup.co.uk

# Check CNAME record
dig CNAME invest.routeonegroup.co.uk

# Check from different locations
# Visit: https://dnschecker.org
```

### Test SSL:
```bash
# Check SSL certificate
curl -vI https://invest.routeonegroup.co.uk

# Or use online tool:
# https://www.ssllabs.com/ssltest/
```

---

## ⏱️ Timeline

**Total Setup Time: 15-20 minutes**

- Deploy to Vercel: 10 minutes
- Add subdomain: 2 minutes
- Configure Cloudflare: 3 minutes
- DNS propagation: 5 minutes
- SSL provisioning: 10 minutes

**Your site will be live within 30 minutes!**

---

## 🎯 Summary

**Yes, you can use a subdomain with Cloudflare + Vercel!**

**Setup:**
1. Main domain → cPanel (via Cloudflare)
2. Subdomain → Vercel (via Cloudflare DNS)

**Cloudflare DNS Record:**
```
Type: CNAME
Name: invest
Target: cname.vercel-dns.com
Proxy: DNS only (gray cloud)
```

**Result:**
- ✅ Main site stays on cPanel
- ✅ Ceylon Care on subdomain
- ✅ Both work perfectly
- ✅ Independent management
- ✅ Professional setup

**Perfect solution for your needs!** 🎉
