import { User } from '@/types';
import { Bell, Settings, User as UserIcon, LogOut } from 'lucide-react';

interface DashboardHeaderProps {
  user?: User;
}

export default function DashboardHeader({ user }: DashboardHeaderProps) {
  if (!user) {
    return (
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto container-padding py-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48"></div>
          </div>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      });
      window.location.href = '/auth/login';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto container-padding py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {user.metadata.full_name}
            </h1>
            <p className="text-gray-600">
              {user.metadata.subscription_tier?.value || 'Free'} Plan • 
              Digest on {user.metadata.digest_day?.value || 'Friday'}s at {user.metadata.digest_time || '17:00'}
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="btn btn-ghost btn-sm">
              <Bell className="w-4 h-4" />
            </button>
            <button className="btn btn-ghost btn-sm">
              <Settings className="w-4 h-4" />
            </button>
            <button className="btn btn-ghost btn-sm">
              <UserIcon className="w-4 h-4" />
            </button>
            <button 
              onClick={handleLogout}
              className="btn btn-ghost btn-sm text-red-600 hover:text-red-700"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}