'use client';

import { useEffect, useState } from 'react';
import { supabase, type Document } from '@/lib/supabase';

export default function DocumentsSection() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDocuments();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('documents-public-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'documents',
        },
        () => {
          fetchDocuments();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchDocuments = async () => {
    try {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) throw error;
      setDocuments(data || []);
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="documents" className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-[#003366] border-l-4 border-[#003366] pl-3 mb-4">
          Documents & Resources
        </h2>
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#0066cc] border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading documents...</p>
        </div>
      </section>
    );
  }

  if (documents.length === 0) {
    return null; // Don't show section if no documents
  }

  return (
    <section id="documents" className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-[#003366] border-l-4 border-[#003366] pl-3 mb-6">
        Documents & Resources
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="group relative bg-gradient-to-br from-white via-blue-50 to-indigo-50 rounded-xl border-2 border-gray-200 hover:border-[#0066cc] transition-all duration-300 hover:shadow-xl overflow-hidden"
          >
            {/* Decorative accent */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#0066cc]/10 to-transparent rounded-bl-full"></div>

            <div className="relative p-5">
              {/* Header with Icon */}
              <div className="flex items-start gap-4 mb-4">
                {/* PDF Icon */}
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                    <path d="M14 2v6h6"/>
                    <path d="M9 13h6M9 17h3" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>

                {/* Title */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-2 group-hover:text-[#0066cc] transition-colors">
                    {doc.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>PDF Document</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              {doc.description && (
                <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                  {doc.description}
                </p>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2">
                <a
                  href={doc.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0066cc] text-white text-sm font-semibold rounded-lg hover:bg-[#004c99] transition-all shadow-md hover:shadow-lg"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View
                </a>
                <a
                  href={doc.file_url}
                  download={doc.file_name}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white border-2 border-gray-300 text-gray-700 text-sm font-semibold rounded-lg hover:border-[#0066cc] hover:text-[#0066cc] transition-all"
                  title="Download PDF"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Info Banner */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
        <div className="flex items-center gap-3">
          <svg className="w-5 h-5 text-[#0066cc] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <p className="text-sm text-gray-700">
            <strong className="font-semibold">Important:</strong> Review all documents carefully before making investment decisions. Click "View" to open in browser or download for offline access.
          </p>
        </div>
      </div>

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
