import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      <Features />
      <RecentArticles />
      <Footer />
    </div>
  );
}