import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { cosmic } from '@/lib/cosmic';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import RecentArticles from '@/components/RecentArticles';
import Footer from '@/components/Footer';

export default async function HomePage() {
  const user = await getCurrentUser();
  
  // If user is logged in, redirect to dashboard
  if (user) {
    redirect('/dashboard');
  }

  // Fetch recent articles for the public homepage
  let articles: any[] = [];
  try {
    const response = await cosmic.objects.find({
      type: 'articles'
    }).props(['title', 'slug', 'metadata', 'created_at']).depth(1).limit(6);
    articles = response.objects || [];
  } catch (error) {
    // Handle case where no articles exist or API error
    console.error('Error fetching articles:', error);
    articles = [];
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      <Features />
      <RecentArticles articles={articles} />
      <Footer />
    </div>
  );
}