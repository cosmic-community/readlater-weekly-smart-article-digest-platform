import { Suspense } from 'react';
import { getSavedArticles, getTags } from '@/lib/cosmic';
import ArticleGrid from '@/components/ArticleGrid';
import ArticleFilters from '@/components/ArticleFilters';
import LoadingSpinner from '@/components/LoadingSpinner';

export default async function ArticlesPage() {
  const [savedArticles, tags] = await Promise.all([
    getSavedArticles(),
    getTags()
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto container-padding py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">All Articles</h1>
          <p className="text-gray-600 mt-2">
            Browse and manage your saved articles
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Suspense fallback={<LoadingSpinner />}>
              <ArticleFilters tags={tags} />
            </Suspense>
          </div>
          
          {/* Articles Grid */}
          <div className="lg:col-span-3">
            <Suspense fallback={<LoadingSpinner />}>
              <ArticleGrid articles={savedArticles} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}