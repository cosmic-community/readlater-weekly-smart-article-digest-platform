'use client';

import { useState, useEffect, Suspense } from 'react';
import { getUsers, getSavedArticles, getWeeklyDigests } from '@/lib/cosmic';
import { User, SavedArticle, WeeklyDigest } from '@/types';
import DashboardHeader from '@/components/DashboardHeader';
import DashboardStats from '@/components/DashboardStats';
import ArticleList from '@/components/ArticleList';
import AddArticleForm from '@/components/AddArticleForm';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function DashboardPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [savedArticles, setSavedArticles] = useState<SavedArticle[]>([]);
  const [weeklyDigests, setWeeklyDigests] = useState<WeeklyDigest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [usersData, articlesData, digestsData] = await Promise.all([
          getUsers(),
          getSavedArticles(),
          getWeeklyDigests()
        ]);
        setUsers(usersData);
        setSavedArticles(articlesData);
        setWeeklyDigests(digestsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleAddArticle = async (url: string) => {
    // TODO: Implement add article functionality
    console.log('Adding article:', url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const currentUser = users[0]; // For demo purposes, use first user
  const userArticles = savedArticles.filter(article => 
    article.metadata.user?.id === currentUser?.id
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader user={currentUser} />
      
      <div className="max-w-7xl mx-auto container-padding py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            <Suspense fallback={<LoadingSpinner />}>
              <DashboardStats 
                articles={userArticles}
                weeklyDigests={weeklyDigests}
              />
            </Suspense>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Your Saved Articles</h2>
                <p className="text-gray-600 mt-1">
                  {userArticles.length} articles saved • {userArticles.filter(a => a.metadata.read_status?.key === 'unread').length} unread
                </p>
              </div>
              <ArticleList articles={userArticles} />
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <AddArticleForm onSubmit={handleAddArticle} />
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">This Week</span>
                  <span className="font-semibold">{userArticles.filter(a => a.metadata.week_batch === `${new Date().getFullYear()}-W${Math.ceil(new Date().getDate() / 7)}`).length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Unread</span>
                  <span className="font-semibold text-primary">{userArticles.filter(a => a.metadata.read_status?.key === 'unread').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total</span>
                  <span className="font-semibold">{userArticles.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}