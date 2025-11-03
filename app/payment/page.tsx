import { Suspense } from 'react';
import PaymentPageContent from '@/components/PaymentPageContent';

function PaymentLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#0066cc] mx-auto"></div>
        <p className="mt-4 text-gray-600 font-semibold">Loading payment details...</p>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<PaymentLoading />}>
      <PaymentPageContent />
    </Suspense>
  );
}