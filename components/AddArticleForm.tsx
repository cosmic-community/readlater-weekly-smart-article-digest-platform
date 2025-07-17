'use client';

import { useState } from 'react';
import { saveArticle } from '@/lib/cosmic';
import LoadingSpinner from './LoadingSpinner';

interface AddArticleFormProps {
  userId: string;
}

export default function AddArticleForm({ userId }: AddArticleFormProps) {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      setMessage('Please enter a valid URL');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      // Basic URL validation
      const urlPattern = /^https?:\/\/.+/;
      if (!urlPattern.test(url)) {
        throw new Error('Please enter a valid URL starting with http:// or https://');
      }

      // Extract domain from URL
      const domain = new URL(url).hostname;
      
      // For demo purposes, we'll create a simple title from the URL
      const title = url.split('/').pop() || domain;
      
      const articleData = {
        url: url.trim(),
        title,
        domain,
        userId,
        tags: [],
        readStatus: 'unread' as const,
        savedDate: new Date().toISOString().split('T')[0],
        weekBatch: getWeekBatch()
      };

      await saveArticle(articleData);
      setMessage('Article saved successfully!');
      setUrl('');
      
      // Clear success message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
      
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Failed to save article');
    } finally {
      setIsLoading(false);
    }
  };

  const getWeekBatch = () => {
    const now = new Date();
    const year = now.getFullYear();
    const week = Math.ceil((now.getTime() - new Date(year, 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000));
    return `${year}-W${week.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Save New Article
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
            Article URL
          </label>
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/article"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || !url.trim()}
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <LoadingSpinner size="sm" className="mr-2" />
              Saving...
            </>
          ) : (
            'Save Article'
          )}
        </button>

        {message && (
          <div className={`p-3 rounded-md text-sm ${
            message.includes('successfully') 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {message}
          </div>
        )}
      </form>

      <div className="mt-4 text-xs text-gray-500">
        <p>Tip: You can save articles from any website by pasting the URL above.</p>
      </div>
    </div>
  );
}