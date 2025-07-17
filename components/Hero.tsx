import Link from 'next/link';
import { BookOpen, Mail, Clock } from 'lucide-react';

export default function Hero() {
  return (
    <div className="hero-background text-white relative overflow-hidden">
      {/* Background pattern overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-black/10 to-black/20"></div>
      
      <div className="relative max-w-7xl mx-auto container-padding section-padding">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Never Miss an Article Again
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
            Save articles throughout the week and receive a beautifully organized digest email every weekend. Perfect for busy professionals who want to stay informed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link 
              href="/dashboard" 
              className="btn btn-lg px-8 py-4 bg-white text-blue-600 hover:bg-gray-100 font-semibold shadow-lg"
            >
              Start Free Today
            </Link>
            <Link 
              href="/pricing" 
              className="btn btn-lg px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold transition-all duration-300"
            >
              View Pricing
            </Link>
          </div>
          
          {/* Hero Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-25 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Save Instantly</h3>
              <p className="text-white/80 leading-relaxed">One-click article saving with automatic metadata extraction</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-25 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Weekly Digest</h3>
              <p className="text-white/80 leading-relaxed">Organized email with all your saved articles every weekend</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-25 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Never Forget</h3>
              <p className="text-white/80 leading-relaxed">Automatic reminders and reading time estimates</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}