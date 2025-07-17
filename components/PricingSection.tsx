import { SubscriptionPlan } from '@/types';
import { Check } from 'lucide-react';

interface PricingSectionProps {
  plans: SubscriptionPlan[];
}

export default function PricingSection({ plans }: PricingSectionProps) {
  return (
    <div className="bg-gray-50 section-padding">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Choose Your Plan
          </h2>
          <p className="text-xl text-gray-600">
            Start free and upgrade when you need more features. No hidden fees, cancel anytime.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`pricing-card ${plan.metadata.popular_plan ? 'pricing-card-popular' : ''}`}
            >
              {plan.metadata.popular_plan && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="pricing-card-header">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.metadata.plan_name}
                </h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">
                    ${plan.metadata.monthly_price}
                  </span>
                  <span className="text-gray-600 ml-2">
                    {plan.metadata.monthly_price === 0 ? 'forever' : '/month'}
                  </span>
                </div>
                {plan.metadata.article_limit && plan.metadata.article_limit > 0 && (
                  <p className="text-gray-600">
                    Up to {plan.metadata.article_limit} articles per week
                  </p>
                )}
                {plan.metadata.article_limit === 0 && (
                  <p className="text-gray-600">
                    Unlimited articles
                  </p>
                )}
              </div>
              
              <div className="pricing-card-content">
                <ul className="space-y-3">
                  {plan.metadata.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="pricing-card-footer">
                <button
                  className={`btn btn-md w-full ${
                    plan.metadata.popular_plan
                      ? 'btn-primary'
                      : 'btn-outline'
                  }`}
                >
                  {plan.metadata.cta_button_text}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}