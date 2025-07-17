import { getSubscriptionPlans } from '@/lib/cosmic';
import PricingHero from '@/components/PricingHero';
import PricingSection from '@/components/PricingSection';
import PricingFAQ from '@/components/PricingFAQ';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Pricing - ReadLater Weekly',
  description: 'Choose the perfect plan for your reading habits. Start free or upgrade to Pro for unlimited articles and advanced features.',
};

export default async function PricingPage() {
  const subscriptionPlans = await getSubscriptionPlans();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <PricingHero />
      <PricingSection plans={subscriptionPlans} />
      <PricingFAQ />
      <Footer />
    </div>
  );
}