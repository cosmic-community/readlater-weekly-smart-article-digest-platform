import { SavedArticle } from '@/types';
import { formatDate, extractDomain } from '@/lib/utils';
import { ExternalLink, Clock } from 'lucide-react';
import TagBadge from './TagBadge';

interface RecentArticlesProps {
  articles: SavedArticle[];
}

export default function RecentArticles({ articles }: RecentArticlesProps) {
  if (articles.length === 0) {
    return null;
  }

  return (
    <div className="bg-white section-padding">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Recently Saved Articles
          </h2>
          <p className="text-xl text-gray-600">
            See what others are reading and saving for later
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div key={article.id} className="article-card hover-lift">
              <div className="article-card-header">
                {article.metadata.featured_image && (
                  <img
                    src={`${article.metadata.featured_image.imgix_url}?w=600&h=300&fit=crop&auto=format,compress`}
                    alt={article.metadata.title}
                    width={300}
                    height={150}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                <h3 className="text-xl font-semibold text-gray-900 mb-2 truncate-2">
                  {article.metadata.title}
                </h3>
                {article.metadata.description && (
                  <p className="text-gray-600 text-sm truncate-3">
                    {article.metadata.description}
                  </p>
                )}
              </div>
              
              <div className="article-card-content">
                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <span>{extractDomain(article.metadata.url)}</span>
                  <span>{formatDate(article.metadata.saved_date)}</span>
                </div>
                
                {article.metadata.tags && article.metadata.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {article.metadata.tags.slice(0, 3).map((tag) => (
                      <TagBadge key={tag.id} tag={tag} size="sm" />
                    ))}
                    {article.metadata.tags.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{article.metadata.tags.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>
              
              <div className="article-card-footer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>5 min read</span>
                  </div>
                  <a
                    href={article.metadata.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-outline flex items-center gap-1"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Read
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}