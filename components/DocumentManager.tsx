'use client';

import { useEffect, useState } from 'react';
import { supabase, type Document } from '@/lib/supabase';

export default function DocumentManager() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fileUrl, setFileUrl] = useState('');

  useEffect(() => {
    fetchDocuments();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('documents-changes')
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
      showMessage('error', 'Failed to load documents');
    } finally {
      setLoading(false);
    }
  };

  const addDocument = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !fileUrl.trim()) {
      showMessage('error', 'Title and file URL are required');
      return;
    }

    setUploading(true);
    try {
      const fileName = fileUrl.split('/').pop() || 'document.pdf';
      const displayOrder = documents.length;

      const { error } = await supabase
        .from('documents')
        .insert({
          title: title.trim(),
          description: description.trim() || null,
          file_url: fileUrl.trim(),
          file_name: fileName,
          display_order: displayOrder,
          is_active: true,
        });

      if (error) throw error;

      showMessage('success', 'Document added successfully!');

      // Reset form
      setTitle('');
      setDescription('');
      setFileUrl('');

      fetchDocuments();
    } catch (error) {
      console.error('Error adding document:', error);
      showMessage('error', 'Failed to add document');
    } finally {
      setUploading(false);
    }
  };

  const deleteDocument = async (id: number) => {
    if (!confirm('Are you sure you want to delete this document?')) return;

    try {
      const { error } = await supabase
        .from('documents')
        .update({ is_active: false })
        .eq('id', id);

      if (error) throw error;

      showMessage('success', 'Document deleted successfully!');
      fetchDocuments();
    } catch (error) {
      console.error('Error deleting document:', error);
      showMessage('error', 'Failed to delete document');
    }
  };

  const moveDocument = async (id: number, direction: 'up' | 'down') => {
    const index = documents.findIndex(doc => doc.id === id);
    if (index === -1) return;
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === documents.length - 1) return;

    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    const doc1 = documents[index];
    const doc2 = documents[swapIndex];

    try {
      // Swap display orders
      await supabase
        .from('documents')
        .update({ display_order: doc2.display_order })
        .eq('id', doc1.id);

      await supabase
        .from('documents')
        .update({ display_order: doc1.display_order })
        .eq('id', doc2.id);

      fetchDocuments();
    } catch (error) {
      console.error('Error moving document:', error);
      showMessage('error', 'Failed to reorder document');
    }
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Document Management</h2>
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#0066cc] border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading documents...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Document Management</h2>

      {/* Message Alert */}
      {message && (
        <div className={`mb-4 p-3 rounded-lg ${
          message.type === 'success'
            ? 'bg-green-100 border border-green-400 text-green-700'
            : 'bg-red-100 border border-red-400 text-red-700'
        }`}>
          {message.text}
        </div>
      )}

      {/* Add Document Form */}
      <form onSubmit={addDocument} className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Add New Document</h3>

        <div className="space-y-3">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Document Title *
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Investment Prospectus"
              required
              className="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066cc] focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description (Optional)
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of the document"
              rows={2}
              className="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066cc] focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="fileUrl" className="block text-sm font-medium text-gray-700 mb-1">
              PDF File URL *
            </label>
            <input
              id="fileUrl"
              type="url"
              value={fileUrl}
              onChange={(e) => setFileUrl(e.target.value)}
              placeholder="https://example.com/document.pdf"
              required
              className="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066cc] focus:border-transparent"
            />
            <p className="mt-1 text-xs text-gray-500">
              Upload your PDF to a cloud storage service and paste the public URL here
            </p>
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="w-full px-4 py-2 bg-[#0066cc] text-white font-semibold rounded-lg hover:bg-[#004c99] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {uploading ? 'Adding Document...' : '+ Add Document'}
          </button>
        </div>
      </form>

      {/* Documents List */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Active Documents ({documents.length})</h3>

        {documents.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No documents added yet</p>
        ) : (
          <div className="space-y-2">
            {documents.map((doc, index) => (
              <div
                key={doc.id}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => moveDocument(doc.id, 'up')}
                    disabled={index === 0}
                    className="text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Move up"
                  >
                    ▲
                  </button>
                  <button
                    onClick={() => moveDocument(doc.id, 'down')}
                    disabled={index === documents.length - 1}
                    className="text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Move down"
                  >
                    ▼
                  </button>
                </div>

                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{doc.title}</h4>
                  {doc.description && (
                    <p className="text-sm text-gray-600">{doc.description}</p>
                  )}
                  <a
                    href={doc.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#0066cc] hover:underline"
                  >
                    {doc.file_name}
                  </a>
                </div>

                <button
                  onClick={() => deleteDocument(doc.id)}
                  className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
