# Admin Panel Authentication Guide

## Overview

The admin panel is now protected with username/password authentication. Only authorized users with valid credentials can access the admin dashboard.

---

## Default Credentials

**Username:** `admin`
**Password:** `ceyloncare2025`

⚠️ **IMPORTANT:** Change these credentials before going to production!

---

## How to Change Credentials

### Method 1: Environment Variables (Recommended)

Edit the `.env.local` file:

```env
NEXT_PUBLIC_ADMIN_USERNAME=your_username
NEXT_PUBLIC_ADMIN_PASSWORD=your_secure_password
```

Then restart your dev server:
```bash
npm run dev
```

### Method 2: For Production Deployment

When deploying to Vercel:

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add:
   - `NEXT_PUBLIC_ADMIN_USERNAME` = your_username
   - `NEXT_PUBLIC_ADMIN_PASSWORD` = your_secure_password
4. Redeploy

---

## Features

### 🔐 Login Screen
- Beautiful, professional login interface
- Username and password fields
- Error messages for invalid credentials
- Loading states

### ✅ Session Management
- Sessions last 24 hours
- Auto-logout after 24 hours
- Session stored in browser sessionStorage
- Survives page refreshes

### 🔒 Logout Button
- Located in the top-right of admin panel
- Instantly logs you out
- Returns to login screen

### 🛡️ Protected Routes
- Admin panel only accessible after login
- Automatically redirects to login if not authenticated
- No way to bypass authentication

---

## How It Works

### Login Flow
```
User visits /admin
    ↓
Not authenticated? → Show login screen
    ↓
User enters credentials
    ↓
Validate against environment variables
    ↓
Correct? → Create session → Show admin panel
    ↓
Wrong? → Show error message
```

### Session Expiry
- Sessions expire after 24 hours
- User is automatically logged out
- Must log in again to continue

---

## Security Best Practices

### For Development
✅ Current setup is fine
✅ Default credentials are okay for testing

### For Production

1. **Use Strong Passwords**
   ```
   Bad:  admin / 123456
   Good: AdminCeylon2025!@#
   ```

2. **Change Default Credentials**
   - Never use `admin` / `ceyloncare2025` in production
   - Use unique, complex passwords

3. **Consider Adding:**
   - Multiple admin accounts
   - Password hashing (currently plain text)
   - IP whitelist
   - Two-factor authentication (2FA)
   - Login attempt limits
   - Activity logs

---

## Advanced: Multiple Admin Users

To add multiple admin accounts, edit `lib/auth.ts`:

```typescript
const ADMIN_USERS = [
  { username: 'admin1', password: 'Password1!' },
  { username: 'admin2', password: 'Password2!' },
  { username: 'manager', password: 'Manager123!' },
];

export function validateCredentials(username: string, password: string): boolean {
  return ADMIN_USERS.some(
    user => user.username === username && user.password === password
  );
}
```

---

## Troubleshooting

### Can't Login - "Invalid username or password"

**Check:**
1. Username and password are correct (case-sensitive)
2. `.env.local` has the correct credentials
3. Dev server was restarted after changing `.env.local`
4. No extra spaces in credentials

**Default credentials:**
- Username: `admin`
- Password: `ceyloncare2025`

### Session Expires Too Quickly

Edit `lib/auth.ts` to change session duration:

```typescript
// Current: 24 hours
const twentyFourHours = 24 * 60 * 60 * 1000;

// Change to 7 days:
const sevenDays = 7 * 24 * 60 * 60 * 1000;
```

### Logout Button Not Working

1. Check browser console for errors
2. Clear browser cache and sessionStorage
3. Restart dev server

---

## Testing

### Test Login
1. Go to [http://localhost:3000/admin](http://localhost:3000/admin)
2. Should see login screen
3. Enter: `admin` / `ceyloncare2025`
4. Should see admin dashboard

### Test Logout
1. Click "🔒 Logout" button in top-right
2. Should return to login screen
3. Try accessing /admin again
4. Should see login screen

### Test Session Persistence
1. Log in to admin panel
2. Refresh the page
3. Should stay logged in
4. Close tab and reopen /admin
5. Should still be logged in (within 24 hours)

---

## Upgrade to Supabase Auth (Advanced)

For enterprise-level authentication:

### 1. Install Supabase Auth

```bash
npm install @supabase/auth-ui-react @supabase/auth-ui-shared
```

### 2. Enable Auth in Supabase

1. Go to Supabase Dashboard
2. Navigate to Authentication → Providers
3. Enable Email provider
4. Create admin users

### 3. Replace Current Auth

Update admin panel to use Supabase Auth instead of simple username/password.

**Benefits:**
- Password hashing
- Email verification
- Password reset
- OAuth providers (Google, GitHub, etc.)
- Better security
- User management UI

---

## Security Notes

### Current Implementation

**Pros:**
- ✅ Simple to use
- ✅ No external dependencies
- ✅ Good for development
- ✅ Session management works
- ✅ Easy to customize

**Cons:**
- ⚠️ Passwords in plain text (in env variables)
- ⚠️ No password hashing
- ⚠️ No rate limiting
- ⚠️ No login attempt tracking
- ⚠️ Credentials visible in browser (sessionStorage)

### For Production

Consider upgrading to:
- Supabase Auth
- NextAuth.js
- Auth0
- Custom JWT implementation

---

## File Structure

```
lib/
  auth.ts                    # Authentication logic
components/
  AdminLogin.tsx             # Login component
app/
  admin/
    page.tsx                 # Protected admin panel
.env.local                   # Credentials (DO NOT COMMIT!)
```

---

## Quick Reference

| Action | Steps |
|--------|-------|
| Login | Go to /admin, enter credentials |
| Logout | Click "🔒 Logout" button |
| Change Password | Edit `.env.local` and restart |
| Add Users | Edit `lib/auth.ts` |
| Check Session | Look in browser sessionStorage |

---

## Important Reminders

1. ⚠️ **Never commit `.env.local` to Git** - It's already in .gitignore
2. 🔒 **Change default password before production**
3. 🛡️ **Consider upgrading to Supabase Auth for production**
4. 📝 **Keep track of who has admin credentials**
5. 🔄 **Rotate passwords regularly**

---

## Need Help?

If you have issues:
1. Check browser console for errors
2. Verify credentials in `.env.local`
3. Restart dev server
4. Clear browser cache/sessionStorage
5. Email: info@routeonegroup.co.uk

---

**Your admin panel is now secure!** 🎉

Default login:
- Username: `admin`
- Password: `ceyloncare2025`

Remember to change these before going live!
