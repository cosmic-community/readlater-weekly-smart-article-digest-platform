'use client';

import { useState } from 'react';

const faqs = [
  {
    question: "What's included in the free plan?",
    answer: "The free plan includes up to 20 articles per week, weekly digest emails, basic email templates, and read/unread tracking. It's perfect for casual readers who want to try out the service."
  },
  {
    question: "How does the Pro plan differ from the free plan?",
    answer: "The Pro plan offers unlimited articles, custom digest frequency, advanced email templates, tag organization, search functionality, and priority support. It's designed for power users and heavy readers."
  },
  {
    question: "Can I upgrade or downgrade at any time?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle, and you'll have immediate access to new features when upgrading."
  },
  {
    question: "How do weekly digests work?",
    answer: "We collect all the articles you save during the week and send them to you in a beautifully formatted email digest. You can customize the day and time you receive it, and Pro users can even adjust the frequency."
  },
  {
    question: "Is there a limit to how many articles I can save?",
    answer: "Free users can save up to 20 articles per week. Pro users have unlimited article saving. All saved articles are stored securely and remain accessible in your account."
  },
  {
    question: "What happens to my data if I cancel?",
    answer: "Your articles and reading list will remain accessible for 30 days after cancellation. You can export your data at any time, and we'll send you a reminder before permanent deletion."
  },
  {
    question: "Do you offer refunds?",
    answer: "Yes, we offer a 30-day money-back guarantee. If you're not satisfied with the Pro plan, contact us within 30 days for a full refund."
  },
  {
    question: "Can I use this for team or business purposes?",
    answer: "Currently, our plans are designed for individual use. We're working on team features and business plans. Contact us if you're interested in using this for your organization."
  }
];

export default function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Everything you need to know about our plans and features.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
              >
                <span className="font-medium text-gray-900">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-700">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Still have questions?{' '}
            <a href="mailto:support@readlater.com" className="text-blue-600 hover:text-blue-800">
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}