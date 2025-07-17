import Link from 'next/link';
import { BookOpen, Mail, Clock } from 'lucide-react';

export default function Hero() {
  return (
    <div className="hero-background text-white">
      <div className="max-w-7xl mx-auto container-padding section-padding">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Never Miss an Article Again
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Save articles throughout the week and receive a beautifully organized digest email every weekend. Perfect for busy professionals who want to stay informed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link 
              href="/dashboard" 
              className="btn btn-lg px-8 py-4 bg-white text-primary hover:bg-gray-100 font-semibold"
            >
              Start Free Today
            </Link>
            <Link 
              href="/pricing" 
              className="btn btn-lg px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-primary font-semibold"
            >
              View Pricing
            </Link>
          </div>
          
          {/* Hero Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Save Instantly</h3>
              <p className="text-blue-100">One-click article saving with automatic metadata extraction</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Weekly Digest</h3>
              <p className="text-blue-100">Organized email with all your saved articles every weekend</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Never Forget</h3>
              <p className="text-blue-100">Automatic reminders and reading time estimates</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}