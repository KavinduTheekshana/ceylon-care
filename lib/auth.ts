// Simple authentication helper
// For production, consider using Supabase Auth or NextAuth.js

export const ADMIN_CREDENTIALS = {
  username: process.env.NEXT_PUBLIC_ADMIN_USERNAME || 'admin',
  password: process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'ceyloncare2025',
};

export function validateCredentials(username: string, password: string): boolean {
  return username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password;
}

export function setAuthSession() {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('admin_authenticated', 'true');
    sessionStorage.setItem('admin_login_time', Date.now().toString());
  }
}

export function clearAuthSession() {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('admin_authenticated');
    sessionStorage.removeItem('admin_login_time');
  }
}

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;

  const isAuth = sessionStorage.getItem('admin_authenticated') === 'true';
  const loginTime = sessionStorage.getItem('admin_login_time');

  if (!isAuth || !loginTime) return false;

  // Session expires after 24 hours
  const timeElapsed = Date.now() - parseInt(loginTime);
  const twentyFourHours = 24 * 60 * 60 * 1000;

  if (timeElapsed > twentyFourHours) {
    clearAuthSession();
    return false;
  }

  return true;
}
