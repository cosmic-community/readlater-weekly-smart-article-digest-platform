'use client';

import { useState, useEffect } from 'react';
import { Tag } from '@/types';

interface ArticleFiltersProps {
  tags: Tag[];
  onFilterChange: (filters: {
    search: string;
    selectedTags: string[];
    readStatus: string;
    sortBy: string;
  }) => void;
}

export default function ArticleFilters({ tags, onFilterChange }: ArticleFiltersProps) {
  const [search, setSearch] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [readStatus, setReadStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');

  useEffect(() => {
    onFilterChange({
      search,
      selectedTags,
      readStatus,
      sortBy,
    });
  }, [search, selectedTags, readStatus, sortBy, onFilterChange]);

  const handleTagToggle = (tagId: string) => {
    setSelectedTags(prev => 
      prev.includes(tagId) 
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  const clearFilters = () => {
    setSearch('');
    setSelectedTags([]);
    setReadStatus('all');
    setSortBy('date-desc');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <svg className="absolute left-3 top-3 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Read Status Filter */}
        <div className="lg:w-48">
          <select
            value={readStatus}
            onChange={(e) => setReadStatus(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Articles</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        {/* Sort By */}
        <div className="lg:w-48">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="title-asc">Title A-Z</option>
            <option value="title-desc">Title Z-A</option>
          </select>
        </div>

        {/* Clear Filters */}
        <button
          onClick={clearFilters}
          className="lg:w-auto px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Clear
        </button>
      </div>

      {/* Tags Filter */}
      {tags.length > 0 && (
        <div className="mt-4 pt-4 border-t">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Filter by Tags:</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag.id}
                onClick={() => handleTagToggle(tag.id)}
                className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                  selectedTags.includes(tag.id)
                    ? 'bg-blue-100 border-blue-300 text-blue-800'
                    : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
                }`}
                style={{
                  borderColor: selectedTags.includes(tag.id) ? tag.metadata.color : undefined,
                  backgroundColor: selectedTags.includes(tag.id) ? `${tag.metadata.color}15` : undefined,
                }}
              >
                {tag.metadata.tag_name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Active Filters Summary */}
      {(search || selectedTags.length > 0 || readStatus !== 'all' || sortBy !== 'date-desc') && (
        <div className="mt-4 pt-4 border-t">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Active filters:</span>
            {search && <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">Search: "{search}"</span>}
            {selectedTags.length > 0 && (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {selectedTags.length} tag{selectedTags.length > 1 ? 's' : ''}
              </span>
            )}
            {readStatus !== 'all' && (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                Status: {readStatus}
              </span>
            )}
            {sortBy !== 'date-desc' && (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                Sort: {sortBy}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}