import { 
  BookOpen, 
  Tag, 
  Mail, 
  Clock, 
  Search, 
  BarChart3, 
  Smartphone,
  Users
} from 'lucide-react';

const features = [
  {
    icon: BookOpen,
    title: 'Smart Article Saving',
    description: 'Paste any article URL and we automatically extract title, description, and featured image.'
  },
  {
    icon: Tag,
    title: 'Intelligent Tagging',
    description: 'Organize articles with color-coded tags for easy categorization and filtering.'
  },
  {
    icon: Mail,
    title: 'Weekly Digest Emails',
    description: 'Receive beautifully formatted emails with all your saved articles every weekend.'
  },
  {
    icon: Clock,
    title: 'Reading Time Estimates',
    description: 'Know exactly how long each article will take to read before you start.'
  },
  {
    icon: Search,
    title: 'Advanced Search',
    description: 'Find any article instantly with powerful search and filtering capabilities.'
  },
  {
    icon: BarChart3,
    title: 'Reading Analytics',
    description: 'Track your reading habits and see insights about your article consumption.'
  },
  {
    icon: Smartphone,
    title: 'Mobile Optimized',
    description: 'Perfect experience on all devices with responsive design and fast loading.'
  },
  {
    icon: Users,
    title: 'Team Features',
    description: 'Share articles with colleagues and collaborate on reading lists (Pro plan).'
  }
];

export default function Features() {
  return (
    <div className="bg-white section-padding">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Everything You Need to Stay Informed
          </h2>
          <p className="text-xl text-gray-600">
            ReadLater Weekly provides all the tools you need to manage your reading list efficiently and never miss important articles.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="feature-icon mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}