import { SavedArticle, WeeklyDigest } from '@/types';
import { BookOpen, Mail, Clock, TrendingUp } from 'lucide-react';

interface DashboardStatsProps {
  articles: SavedArticle[];
  weeklyDigests: WeeklyDigest[];
}

export default function DashboardStats({ articles, weeklyDigests }: DashboardStatsProps) {
  const unreadCount = articles.filter(article => 
    article.metadata.read_status?.key === 'unread'
  ).length;
  
  const thisWeekCount = articles.filter(article => {
    const currentWeek = `${new Date().getFullYear()}-W${Math.ceil(new Date().getDate() / 7)}`;
    return article.metadata.week_batch === currentWeek;
  }).length;

  const stats = [
    {
      title: 'Total Articles',
      value: articles.length,
      icon: BookOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Unread Articles',
      value: unreadCount,
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      title: 'This Week',
      value: thisWeekCount,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Digests Sent',
      value: weeklyDigests.length,
      icon: Mail,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="dashboard-stat">
          <div className="flex items-center justify-between">
            <div>
              <p className="dashboard-stat-title">{stat.title}</p>
              <p className="dashboard-stat-value">{stat.value}</p>
            </div>
            <div className={`w-12 h-12 rounded-lg ${stat.bgColor} ${stat.color} flex items-center justify-center`}>
              <stat.icon className="w-6 h-6" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}