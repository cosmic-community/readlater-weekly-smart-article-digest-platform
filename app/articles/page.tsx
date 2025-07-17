'use client';

import { useState, useEffect, Suspense } from 'react';
import { getSavedArticles, getTags } from '@/lib/cosmic';
import { SavedArticle, Tag } from '@/types';
import ArticleGrid from '@/components/ArticleGrid';
import ArticleFilters from '@/components/ArticleFilters';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function ArticlesPage() {
  const [savedArticles, setSavedArticles] = useState<SavedArticle[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<SavedArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [articlesData, tagsData] = await Promise.all([
          getSavedArticles(),
          getTags()
        ]);
        setSavedArticles(articlesData);
        setTags(tagsData);
        setFilteredArticles(articlesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleFilterChange = (filters: {
    search: string;
    selectedTags: string[];
    readStatus: string;
    sortBy: string;
  }) => {
    let filtered = [...savedArticles];

    // Apply search filter
    if (filters.search) {
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        article.metadata.description?.toLowerCase().includes(filters.search.toLowerCase()) ||
        article.metadata.domain?.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Apply tag filter
    if (filters.selectedTags.length > 0) {
      filtered = filtered.filter(article => 
        article.metadata.tags?.some(tag => filters.selectedTags.includes(tag.id))
      );
    }

    // Apply read status filter
    if (filters.readStatus !== 'all') {
      filtered = filtered.filter(article => 
        article.metadata.read_status?.key === filters.readStatus
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'date-asc':
          return new Date(a.metadata.saved_date).getTime() - new Date(b.metadata.saved_date).getTime();
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        case 'date-desc':
        default:
          return new Date(b.metadata.saved_date).getTime() - new Date(a.metadata.saved_date).getTime();
      }
    });

    setFilteredArticles(filtered);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

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
              <ArticleFilters tags={tags} onFilterChange={handleFilterChange} />
            </Suspense>
          </div>
          
          {/* Articles Grid */}
          <div className="lg:col-span-3">
            <Suspense fallback={<LoadingSpinner />}>
              <ArticleGrid articles={filteredArticles} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}