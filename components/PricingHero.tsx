export default function PricingHero() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Simple, Transparent Pricing
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan for your reading habits. Start free and upgrade when you're ready.
          </p>
          
          <div className="mt-8 flex justify-center">
            <div className="bg-white rounded-lg p-1 shadow-sm">
              <div className="flex space-x-1">
                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md">
                  Monthly
                </button>
                <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
                  Annual
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}