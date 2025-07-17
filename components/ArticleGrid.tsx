import { SavedArticle } from '@/types';
import { formatDate, extractDomain, truncateText } from '@/lib/utils';
import TagBadge from './TagBadge';
import Link from 'next/link';

interface ArticleGridProps {
  articles: SavedArticle[];
}

export default function ArticleGrid({ articles }: ArticleGridProps) {
  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
        <p className="text-gray-500">Try adjusting your filters or add some articles to your reading list.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          {/* Featured Image */}
          {article.metadata.featured_image && (
            <div className="aspect-video bg-gray-200">
              <img
                src={`${article.metadata.featured_image.imgix_url}?w=400&h=225&fit=crop&auto=format,compress`}
                alt={article.metadata.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {extractDomain(article.metadata.url)}
              </span>
              <span className="text-xs text-gray-500">
                {formatDate(article.metadata.saved_date)}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
              <Link href={`/articles/${article.slug}`} className="hover:text-blue-600">
                {article.metadata.title}
              </Link>
            </h3>

            {/* Description */}
            {article.metadata.description && (
              <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                {truncateText(article.metadata.description, 120)}
              </p>
            )}

            {/* Tags */}
            {article.metadata.tags && article.metadata.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {article.metadata.tags.slice(0, 3).map((tag) => (
                  <TagBadge key={tag.id} tag={tag} size="sm" />
                ))}
                {article.metadata.tags.length > 3 && (
                  <span className="text-xs text-gray-500 px-2 py-1">
                    +{article.metadata.tags.length - 3} more
                  </span>
                )}
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t">
              <span className={`text-xs px-2 py-1 rounded-full ${
                article.metadata.read_status?.key === 'read' 
                  ? 'bg-green-100 text-green-800' 
                  : article.metadata.read_status?.key === 'archived'
                  ? 'bg-gray-100 text-gray-800'
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {article.metadata.read_status?.value || 'Unread'}
              </span>

              <div className="flex items-center gap-2">
                <a
                  href={article.metadata.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  Read
                </a>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}