import { getCurrentUser } from '@/lib/auth';
import { getSavedArticles } from '@/lib/cosmic';
import DashboardHeader from '@/components/DashboardHeader';
import DashboardStats from '@/components/DashboardStats';
import RecentArticles from '@/components/RecentArticles';
import AddArticleForm from '@/components/AddArticleForm';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/auth/login');
  }

  const savedArticles = await getSavedArticles(user.id);

  // Helper function to get the value from string or object
  const getSelectDropdownValue = (field: string | { key: string; value: string }) => {
    return typeof field === 'string' ? field : field?.value || '';
  };

  // Create a properly typed subscription tier object
  const subscriptionTierValue = getSelectDropdownValue(user.metadata.subscription_tier);
  const subscriptionTier = {
    key: typeof user.metadata.subscription_tier === 'object' ? user.metadata.subscription_tier.key : subscriptionTierValue.toLowerCase(),
    value: subscriptionTierValue
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader user={{
        id: user.id,
        email: user.metadata.email,
        fullName: user.metadata.full_name,
        subscriptionTier: subscriptionTier
      }} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user.metadata.full_name}
          </h1>
          <p className="text-gray-600">
            Manage your saved articles and reading digest
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <DashboardStats articles={savedArticles} />
            <RecentArticles articles={savedArticles} />
          </div>
          
          <div className="lg:col-span-1">
            <AddArticleForm userId={user.id} />
          </div>
        </div>
      </main>
    </div>
  );
}