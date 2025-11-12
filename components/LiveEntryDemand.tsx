'use client';

import { useEffect, useState } from 'react';
import { supabase, type InvestmentData } from '@/lib/supabase';

export default function LiveEntryDemand() {
  const [data, setData] = useState<InvestmentData | null>(null);
  const [loading, setLoading] = useState(true);

  // Static current price value
  const STATIC_CURRENT_PRICE = 1.00; // 1 GBP

  useEffect(() => {
    // Fetch initial data
    fetchInvestmentData();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('investment-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'investment_batches',
          filter: 'is_active=eq.true',
        },
        (payload) => {
          console.log('Real-time update:', payload);
          if (payload.new) {
            setData(payload.new as InvestmentData);
          }
        }
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchInvestmentData = async () => {
    try {
      const { data: investmentData, error } = await supabase
        .from('investment_batches')
        .select('*')
        .eq('is_active', true)
        .single();

      if (error) {
        console.error('Error fetching investment data:', error);
      } else {
        setData(investmentData);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="pricing" className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-[#003366] border-l-4 border-[#003366] pl-3 mb-4">
          Live Entry Demand (1st Batch – 100 Positions)
        </h2>
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#0066cc] border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading live data...</p>
        </div>
      </section>
    );
  }

  if (!data) {
    return (
      <section id="pricing" className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-[#003366] border-l-4 border-[#003366] pl-3 mb-4">
          Live Entry Demand (1st Batch – 100 Positions)
        </h2>
        <div className="text-center py-8 text-red-600">
          <p>Unable to load investment data. Please check your Supabase configuration.</p>
        </div>
      </section>
    );
  }

  const remaining = data.total_positions - data.secured_applicants;
  const progressPercentage = (data.secured_applicants / data.total_positions) * 100;

  return (
    <section id="pricing" className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-[#003366] border-l-4 border-[#003366] pl-3 mb-4">
        Live Entry Demand (Batch {data.batch_number} – {data.total_positions} Positions)
      </h2>

      {/* Stats Display */}
      <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
        <div className="text-center">
          <p className="text-gray-600 text-sm mb-1">Applicants</p>
          <p className="text-[#003366] text-3xl font-bold">{data.secured_applicants}</p>
        </div>
        <div className="text-center">
          <p className="text-gray-600 text-sm mb-1">Remaining</p>
          <p className="text-[#003366] text-3xl font-bold">{remaining}</p>
        </div>
        <div className="text-center">
          <p className="text-gray-600 text-sm mb-1">Live Price</p>
          <p className="text-[#003366] text-3xl font-bold">£{STATIC_CURRENT_PRICE.toFixed(2)}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#003366] to-[#0066cc] transition-all duration-500 flex items-center justify-center text-white text-xs font-semibold"
            style={{ width: `${progressPercentage}%` }}
          >
            {progressPercentage > 10 && `${progressPercentage.toFixed(1)}%`}
          </div>
        </div>
      </div>

      <p className="text-gray-600 text-sm">
        As more applicants secure their positions, the live share rate automatically increases.
        Once {data.total_positions} positions are filled, the batch closes.
      </p>

      {/* Real-time indicator */}
      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        <span>Live Updates Active</span>
      </div>
    </section>
  );
}
