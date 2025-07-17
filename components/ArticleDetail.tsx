import { SavedArticle } from '@/types';
import { formatDate, extractDomain, getTagColor } from '@/lib/utils';
import TagBadge from './TagBadge';

interface ArticleDetailProps {
  article: SavedArticle;
}

export default function ArticleDetail({ article }: ArticleDetailProps) {
  const { metadata } = article;
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="p-6 border-b">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
            <span className="bg-gray-100 px-2 py-1 rounded text-xs">
              {extractDomain(metadata.url)}
            </span>
            <span>•</span>
            <span>{formatDate(metadata.saved_date)}</span>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {metadata.title}
          </h1>
          
          {metadata.description && (
            <p className="text-lg text-gray-700 mb-4">
              {metadata.description}
            </p>
          )}
          
          {/* Tags */}
          {metadata.tags && metadata.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {metadata.tags.map((tag) => (
                <TagBadge
                  key={tag.id}
                  tag={tag}
                  size="md"
                />
              ))}
            </div>
          )}
          
          {/* Status Badge */}
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              metadata.read_status?.key === 'read' 
                ? 'bg-green-100 text-green-800' 
                : metadata.read_status?.key === 'archived'
                ? 'bg-gray-100 text-gray-800'
                : 'bg-blue-100 text-blue-800'
            }`}>
              {metadata.read_status?.value || 'Unread'}
            </span>
          </div>
        </div>

        {/* Featured Image */}
        {metadata.featured_image && (
          <div className="aspect-video bg-gray-200">
            <img
              src={`${metadata.featured_image.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
              alt={metadata.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Content Section */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <a
                href={metadata.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Read Original Article
              </a>
              
              <button className="text-gray-500 hover:text-gray-700">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </button>
            </div>
            
            <div className="text-sm text-gray-500">
              Week: {metadata.week_batch || 'N/A'}
            </div>
          </div>

          {/* Article Actions */}
          <div className="flex gap-2 pt-4 border-t">
            <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Mark as Read
            </button>
            
            <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
              </svg>
              Archive
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}