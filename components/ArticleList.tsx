import { SavedArticle } from '@/types';
import { formatDate, extractDomain, truncateText } from '@/lib/utils';
import TagBadge from './TagBadge';
import Link from 'next/link';

interface ArticleListProps {
  articles: SavedArticle[];
}

export default function ArticleList({ articles }: ArticleListProps) {
  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No articles saved yet</h3>
        <p className="text-gray-500">Start saving articles to see them here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {articles.map((article) => (
        <div key={article.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
          <div className="p-4">
            <div className="flex items-start gap-4">
              {/* Featured Image */}
              {article.metadata.featured_image && (
                <div className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={`${article.metadata.featured_image.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                    alt={article.metadata.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                    {extractDomain(article.metadata.url)}
                  </span>
                  <span>•</span>
                  <span>{formatDate(article.metadata.saved_date)}</span>
                </div>

                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  <Link href={`/articles/${article.slug}`} className="hover:text-blue-600">
                    {article.metadata.title}
                  </Link>
                </h3>

                {article.metadata.description && (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {truncateText(article.metadata.description, 200)}
                  </p>
                )}

                {/* Tags */}
                {article.metadata.tags && article.metadata.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {article.metadata.tags.slice(0, 4).map((tag) => (
                      <TagBadge key={tag.id} tag={tag} size="sm" />
                    ))}
                    {article.metadata.tags.length > 4 && (
                      <span className="text-xs text-gray-500 px-2 py-1">
                        +{article.metadata.tags.length - 4} more
                      </span>
                    )}
                  </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    article.metadata.read_status?.key === 'read' 
                      ? 'bg-green-100 text-green-800' 
                      : article.metadata.read_status?.key === 'archived'
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {article.metadata.read_status?.value || 'Unread'}
                  </span>

                  <div className="flex items-center gap-3">
                    <a
                      href={article.metadata.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Read Original
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
          </div>
        </div>
      ))}
    </div>
  );
}