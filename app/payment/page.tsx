'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const [referenceNumber, setReferenceNumber] = useState('');
  const [copied, setCopied] = useState('');

  useEffect(() => {
    // Generate unique reference number
    const ref = generateReferenceNumber();
    setReferenceNumber(ref);
  }, []);

  const generateReferenceNumber = () => {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 7).toUpperCase();
    return `R1-${timestamp}-${random}`;
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(''), 2000);
  };

  const bankDetails = {
    accountName: 'CEYLON CARE LTD',
    accountNumber: '43025632',
    sortCode: '20-63-28',
    iban: 'GB27BUKB20632843025632',
    swiftBic: 'BUKBGB22',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#003366] mb-2">
            Complete Your Investment
          </h1>
          <p className="text-gray-600">
            Transfer funds to secure your position in Ceylon Care Ltd
          </p>
        </div>

        {/* Bank Logo */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 text-center">
          <a
            href="https://www.barclays.co.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block hover:opacity-80 transition-opacity"
          >
            <div className="relative w-64 h-20 mx-auto">
              <Image
                src="/Barclays_(logo).svg.png"
                alt="Barclays Bank UK"
                fill
                className="object-contain"
                priority
              />
            </div>
          </a>
          <p className="text-sm text-gray-500 mt-4">Powered by Barclays Bank UK</p>
        </div>

        {/* Bank Details Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-[#003366] mb-6 flex items-center">
            <span className="mr-2">🏦</span>
            Bank Transfer Details
          </h2>

          <div className="space-y-4">
            {/* Account Name */}
            <div className="border-b pb-4">
              <label className="text-sm text-gray-600 font-medium block mb-2">Account Holder Name</label>
              <div className="flex justify-between items-center gap-4">
                <p className="text-lg font-bold text-black">{bankDetails.accountName}</p>
                <button
                  onClick={() => copyToClipboard(bankDetails.accountName, 'name')}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  {copied === 'name' ? (
                    <>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      Copied
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/>
                        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"/>
                      </svg>
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Account Number */}
            <div className="border-b pb-4">
              <label className="text-sm text-gray-600 font-medium block mb-2">Account Number</label>
              <div className="flex justify-between items-center gap-4">
                <p className="text-lg font-bold text-black font-mono">{bankDetails.accountNumber}</p>
                <button
                  onClick={() => copyToClipboard(bankDetails.accountNumber, 'account')}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  {copied === 'account' ? (
                    <>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      Copied
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/>
                        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"/>
                      </svg>
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Sort Code */}
            <div className="border-b pb-4">
              <label className="text-sm text-gray-600 font-medium block mb-2">Sort Code</label>
              <div className="flex justify-between items-center gap-4">
                <p className="text-lg font-bold text-black font-mono">{bankDetails.sortCode}</p>
                <button
                  onClick={() => copyToClipboard(bankDetails.sortCode, 'sort')}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  {copied === 'sort' ? (
                    <>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      Copied
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/>
                        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"/>
                      </svg>
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* IBAN */}
            <div className="border-b pb-4">
              <label className="text-sm text-gray-600 font-medium block mb-2">IBAN</label>
              <div className="flex justify-between items-center gap-4">
                <p className="text-lg font-bold text-black font-mono break-all">{bankDetails.iban}</p>
                <button
                  onClick={() => copyToClipboard(bankDetails.iban, 'iban')}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex-shrink-0"
                >
                  {copied === 'iban' ? (
                    <>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      Copied
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/>
                        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"/>
                      </svg>
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* SWIFT/BIC */}
            <div className="border-b pb-4">
              <label className="text-sm text-gray-600 font-medium block mb-2">SWIFT/BIC</label>
              <div className="flex justify-between items-center gap-4">
                <p className="text-lg font-bold text-black font-mono">{bankDetails.swiftBic}</p>
                <button
                  onClick={() => copyToClipboard(bankDetails.swiftBic, 'swift')}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  {copied === 'swift' ? (
                    <>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      Copied
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/>
                        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"/>
                      </svg>
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Reference Number - Highlighted */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border-2 border-[#0066cc]">
              <label className="text-sm text-gray-700 block mb-2 font-bold">
                Payment Reference (IMPORTANT)
              </label>
              <div className="flex justify-between items-center gap-4">
                <p className="text-xl font-bold text-black font-mono">{referenceNumber}</p>
                <button
                  onClick={() => copyToClipboard(referenceNumber, 'ref')}
                  className="flex items-center gap-2 px-4 py-2 text-sm bg-[#0066cc] text-white hover:bg-[#004c99] rounded-lg transition-colors font-semibold"
                >
                  {copied === 'ref' ? (
                    <>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/>
                        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"/>
                      </svg>
                      Copy Reference
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-700 font-medium mt-2">
                ⚠️ Please include this reference number in your bank transfer
              </p>
            </div>
          </div>
        </div>

        {/* Important Instructions */}
        <div className="bg-amber-50 border-l-4 border-amber-500 rounded-lg p-6 mb-6">
          <h3 className="font-bold text-amber-900 mb-3 flex items-center">
            <span className="mr-2">⚠️</span>
            Important Instructions
          </h3>
          <ul className="space-y-2 text-amber-900 text-sm">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                <strong>Include your reference number</strong> ({referenceNumber}) in the payment reference field
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>This reference is required to match your payment to your application</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Transfers typically take 1-3 business days to process</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>You will receive confirmation once payment is received</span>
            </li>
          </ul>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-[#003366] mb-4">What Happens Next?</h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-[#0066cc] text-white rounded-full flex items-center justify-center font-bold mr-3">
                1
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Make Your Transfer</h4>
                <p className="text-gray-600 text-sm">
                  Transfer funds to the bank account above using your online banking or bank branch
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-[#0066cc] text-white rounded-full flex items-center justify-center font-bold mr-3">
                2
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Payment Verification</h4>
                <p className="text-gray-600 text-sm">
                  Our team will verify your payment within 1-3 business days
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-[#0066cc] text-white rounded-full flex items-center justify-center font-bold mr-3">
                3
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Confirmation Email</h4>
                <p className="text-gray-600 text-sm">
                  You'll receive confirmation email with your investment details
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-[#0066cc] text-white rounded-full flex items-center justify-center font-bold mr-3">
                4
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Position Secured</h4>
                <p className="text-gray-600 text-sm">
                  Your position in the Ceylon Care investment programme is secured
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-[#003366] mb-4">Need Help?</h3>
          <div className="space-y-2 text-gray-700">
            <p>
              <strong>Email:</strong> info@routeonegroup.co.uk | hr@ceyloncare.co.uk
            </p>
            <p>
              <strong>Pre-Sale Team:</strong> +44 7861 872412
            </p>
            <p>
              <strong>WhatsApp:</strong>{' '}
              <a
                href="https://wa.me/447376288689"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0066cc] hover:underline"
              >
                +44 7376 288689
              </a>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="/"
            className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold text-center hover:bg-gray-300 transition-colors"
          >
            ← Back to Home
          </a>
          <button
            onClick={() => window.print()}
            className="flex-1 px-6 py-3 bg-[#0066cc] text-white rounded-lg font-semibold hover:bg-[#004c99] transition-colors"
          >
            🖨️ Print Details
          </button>
        </div>

        {/* Print Styles */}
        <style jsx global>{`
          @media print {
            body {
              background: white;
            }
            .no-print {
              display: none !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
