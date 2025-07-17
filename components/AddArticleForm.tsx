'use client';

import { useState } from 'react';
import { validateUrl } from '@/lib/utils';

export default function AddArticleForm() {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    if (!validateUrl(url)) {
      setError('Please enter a valid URL');
      return;
    }

    setIsLoading(true);
    
    try {
      // TODO: Implement API call to add article
      console.log('Adding article:', url.trim());
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Clear form on success
      setUrl('');
      
      // Show success message or redirect
      alert('Article added successfully!');
      
    } catch (error) {
      console.error('Error adding article:', error);
      setError('Failed to add article. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New Article</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
            Article URL
          </label>
          <div className="relative">
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/article"
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                error ? 'border-red-300' : 'border-gray-300'
              }`}
              disabled={isLoading}
            />
            {isLoading && (
              <div className="absolute right-3 top-2.5">
                <svg className="animate-spin h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            )}
          </div>
          {error && (
            <p className="text-red-600 text-sm mt-1">{error}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading || !url.trim()}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Adding Article...' : 'Add Article'}
        </button>
      </form>

      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-2">How it works:</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Paste any article URL above</li>
          <li>• We'll automatically extract the title, description, and image</li>
          <li>• Articles are saved to your reading list for later</li>
          <li>• You'll receive them in your weekly digest email</li>
        </ul>
      </div>
    </div>
  );
}