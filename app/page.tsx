import { Suspense } from 'react';
import { getSubscriptionPlans, getSavedArticles } from '@/lib/cosmic';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import PricingSection from '@/components/PricingSection';
import RecentArticles from '@/components/RecentArticles';
import Footer from '@/components/Footer';
import LoadingSpinner from '@/components/LoadingSpinner';

export default async function HomePage() {
  const [subscriptionPlans, recentArticles] = await Promise.all([
    getSubscriptionPlans(),
    getSavedArticles().then(articles => articles.slice(0, 6))
  ]);

  return (
    <div className="min-h-screen">
      <Hero />
      
      <Features />
      
      <Suspense fallback={<LoadingSpinner />}>
        <PricingSection plans={subscriptionPlans} />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <RecentArticles articles={recentArticles} />
      </Suspense>
      
      <Footer />
    </div>
  );
}