'use client';

import { useState, useEffect } from 'react';
import { supabase, type InvestmentData } from '@/lib/supabase';
import { isAuthenticated, clearAuthSession } from '@/lib/auth';
import AdminLogin from '@/components/AdminLogin';
import DocumentManager from '@/components/DocumentManager';

export default function AdminPanel() {
  const [isAuth, setIsAuth] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [data, setData] = useState<InvestmentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [newCount, setNewCount] = useState<number>(0);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    // Check authentication on mount
    const authStatus = isAuthenticated();
    setIsAuth(authStatus);
    setCheckingAuth(false);

    if (authStatus) {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      const { data: investmentData, error } = await supabase
        .from('investment_batches')
        .select('*')
        .eq('is_active', true)
        .single();

      if (error) throw error;

      setData(investmentData);
      setNewCount(investmentData.secured_applicants);
    } catch (error) {
      console.error('Error:', error);
      showMessage('error', 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const updateApplicantCount = async () => {
    if (!data) return;

    if (newCount < 0 || newCount > data.total_positions) {
      showMessage('error', `Count must be between 0 and ${data.total_positions}`);
      return;
    }

    setUpdating(true);
    try {
      const { error } = await supabase
        .from('investment_batches')
        .update({ secured_applicants: newCount })
        .eq('id', data.id);

      if (error) throw error;

      showMessage('success', 'Successfully updated applicant count!');
      await fetchData();
    } catch (error) {
      console.error('Error:', error);
      showMessage('error', 'Failed to update count');
    } finally {
      setUpdating(false);
    }
  };

  const incrementCount = async (amount: number) => {
    if (!data) return;
    const newValue = Math.min(data.secured_applicants + amount, data.total_positions);
    setNewCount(newValue);
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleLoginSuccess = () => {
    setIsAuth(true);
    fetchData();
  };

  const handleLogout = () => {
    clearAuthSession();
    setIsAuth(false);
  };

  // Show login screen if not authenticated
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#0066cc] border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAuth) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#0066cc] border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Configuration Error</h2>
          <p className="text-gray-700 mb-4">
            Unable to connect to the database. Please check your Supabase configuration:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
            <li>Ensure .env.local has correct SUPABASE_URL and SUPABASE_ANON_KEY</li>
            <li>Run the SQL schema in your Supabase SQL Editor</li>
            <li>Enable Realtime for the investment_batches table</li>
          </ol>
        </div>
      </div>
    );
  }

  const remaining = data.total_positions - data.secured_applicants;
  const progressPercentage = (data.secured_applicants / data.total_positions) * 100;

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#003366] to-[#0066cc] text-white p-6 rounded-t-lg">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-xs font-semibold tracking-wider mb-1 opacity-90">CAH INVESTMENT PLATFORM</div>
              <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
              <p className="text-blue-100">Manage investment batch applications in real-time</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
            >
              🔒 Logout
            </button>
          </div>
        </div>

        {/* Message Alert */}
        {message && (
          <div
            className={`p-4 ${
              message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Current Stats */}
        <div className="bg-white p-6 shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Current Status - Batch {data.batch_number}</h2>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-gray-600 text-sm">Secured</p>
              <p className="text-3xl font-bold text-[#003366]">{data.secured_applicants}</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-gray-600 text-sm">Remaining</p>
              <p className="text-3xl font-bold text-green-600">{remaining}</p>
            </div>
            <div className="text-center p-4 bg-indigo-50 rounded-lg">
              <p className="text-gray-600 text-sm">Live Price</p>
              <p className="text-3xl font-bold text-indigo-600">£{data.current_price.toFixed(2)}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{progressPercentage.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#003366] to-[#0066cc] transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Update Controls */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Update Applicant Count</h3>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              <button
                onClick={() => incrementCount(1)}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
              >
                +1
              </button>
              <button
                onClick={() => incrementCount(5)}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                +5
              </button>
              <button
                onClick={() => incrementCount(10)}
                className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition-colors"
              >
                +10
              </button>
              <button
                onClick={() => setNewCount(0)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Reset
              </button>
            </div>

            {/* Manual Input */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Applicant Count
                </label>
                <input
                  type="number"
                  min="0"
                  max={data.total_positions}
                  value={newCount}
                  onChange={(e) => setNewCount(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-2 text-gray-900 font-semibold text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066cc] focus:border-transparent"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={updateApplicantCount}
                  disabled={updating || newCount === data.secured_applicants}
                  className="px-8 py-2 bg-[#0066cc] text-white rounded-lg font-semibold hover:bg-[#004c99] disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  {updating ? 'Updating...' : 'Update'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white p-6 mt-6 rounded-b-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Instructions</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Use quick action buttons for fast increments</li>
            <li>• Enter exact count in the input field for precise updates</li>
            <li>• Price automatically adjusts based on demand formula</li>
            <li>• All changes update in real-time on the main website</li>
            <li>• Keep this page open to see live updates from other admins</li>
          </ul>
        </div>

        {/* Document Management Section */}
        <div className="mt-6">
          <DocumentManager />
        </div>

        {/* Back to Site */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="inline-block px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            ← Back to Main Site
          </a>
        </div>
      </div>
    </div>
  );
}
