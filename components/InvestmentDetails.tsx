'use client';

import { useEffect, useState } from 'react';
import { supabase, type InvestmentDetails } from '@/lib/supabase';

export default function InvestmentDetailsSection() {
  const [details, setDetails] = useState<InvestmentDetails | null>(null);
  const [loading, setLoading] = useState(true);

  // Static current price value
  const STATIC_CURRENT_PRICE = 1.00; // 1 GBP

  const fetchDetails = async () => {
    try {
      console.log('Fetching investment details...');
      const { data, error } = await supabase
        .from('investment_details')
        .select('*')
        .eq('is_active', true)
        .single();

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Investment details loaded:', data);
      setDetails(data);
    } catch (error) {
      console.error('Error fetching investment details:', error);
      // Show error in UI for debugging
      alert('Error loading investment details. Check browser console (F12) for details.');
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchDetails();

    // Subscribe to investment_details updates
    const detailsChannel = supabase
      .channel('investment-details-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'investment_details',
          filter: 'is_active=eq.true',
        },
        (payload) => {
          console.log('Investment details updated:', payload);
          if (payload.new) {
            setDetails(payload.new as InvestmentDetails);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(detailsChannel);
    };
  }, []);

  if (loading) {
    return (
      <section id="investment" className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-[#003366] border-l-4 border-[#003366] pl-3 mb-4">
          Investment & Sponsorship Details
        </h2>
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#0066cc] border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading investment details...</p>
        </div>
      </section>
    );
  }

  if (!details) {
    return (
      <section id="investment" className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-[#003366] border-l-4 border-[#003366] pl-3 mb-4">
          Investment & Sponsorship Details
        </h2>
        <p className="text-gray-600">Investment details are currently unavailable.</p>
      </section>
    );
  }

  // Format numbers with commas
  const formatNumber = (num: number) => num.toLocaleString('en-GB');

  // Format dates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).replace(',', ' @');
  };

  // Use static current price
  const effectivePrice = STATIC_CURRENT_PRICE;

  // Calculate minimum investment amount dynamically using live price
  const calculatedMinimumAmount = details.minimum_to_qualify * effectivePrice;

  return (
    <section id="investment" className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-[#003366] border-l-4 border-[#003366] pl-3 mb-4">
        Investment & Sponsorship Details
      </h2>
      <ul className="space-y-2 text-gray-700 mb-6">
        <li>
          <strong>Total Micro-Shares:</strong>{' '}
          {formatNumber(details.total_micro_shares)} ({details.total_micro_shares.toLocaleString()})
        </li>
        <li>
          <strong>Current Price:</strong> £{effectivePrice.toFixed(2)} |{' '}
          <strong>Post-Launch Price:</strong> £{details.post_launch_price.toFixed(2)}
        </li>
        <li>
          <strong>Minimum to Qualify:</strong> {formatNumber(details.minimum_to_qualify)} Micro-Shares
        </li>
        <li>
          <strong>Holding Period:</strong> {details.holding_period_years} Year
          (Withdraw from {formatDate(details.withdrawal_date)})
        </li>
        <li>
          <strong>Withdrawal Guarantee:</strong> {details.withdrawal_guarantee}
        </li>
        <li>
          <strong>Partners:</strong> {details.partners.join(' | ')}
        </li>
      </ul>
      <a
        href="/payment"
        className="inline-block px-6 py-3 bg-[#0066cc] text-white rounded-lg font-bold hover:bg-[#004c99] transition-colors shadow-lg hover:shadow-xl"
      >
        Buy {formatNumber(details.minimum_to_qualify)} Shares (£{calculatedMinimumAmount.toFixed(2)}) & Secure Your Position
      </a>
    </section>
  );
}
