import { useAuth } from '../../contexts/AuthContext';
import { User, Mail, BookOpen, Bookmark, Clock, Settings } from 'lucide-react';

const ProfilePage = () => {
  const { user } = useAuth();

  const stats = [
    {
      icon: BookOpen,
      label: 'Surahs Read',
      value: '12',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      icon: Bookmark,
      label: 'Bookmarks',
      value: '24',
      color: 'bg-green-50 text-green-600',
    },
    {
      icon: Clock,
      label: 'Reading Time',
      value: '5h 30m',
      color: 'bg-purple-50 text-purple-600',
    },
  ];

  const menuItems = [
    { icon: Settings, label: 'Settings', action: () => alert('Settings coming soon') },
    { icon: BookOpen, label: 'Reading History', action: () => alert('Reading History coming soon') },
    { icon: Bookmark, label: 'My Bookmarks', action: () => alert('Bookmarks coming soon') },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-6">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-primary bg-opacity-10 flex items-center justify-center">
            <User size={40} className="text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              {user?.name}
            </h2>
            <div className="flex items-center gap-2 text-gray-600">
              <Mail size={16} />
              <span>{user?.email}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Your Progress
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-center"
              >
                <div className={`w-12 h-12 rounded-full ${stat.color} flex items-center justify-center mx-auto mb-3`}>
                  <Icon size={24} />
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-600">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Menu Items */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Account
        </h3>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={item.action}
                className={`w-full flex items-center gap-4 p-5 hover:bg-gray-50 transition-colors ${
                  index !== menuItems.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                  <Icon size={20} className="text-gray-600" />
                </div>
                <span className="flex-1 text-left font-medium text-gray-900">
                  {item.label}
                </span>
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            );
          })}
        </div>
      </div>

      {/* About */}
      <div className="bg-gradient-to-br from-primary to-teal-600 rounded-2xl p-6 text-white">
        <h3 className="text-lg font-semibold mb-2">
          About Quran App
        </h3>
        <p className="text-sm opacity-90 mb-4">
          A modern, minimalistic Quran reading application designed to help you connect with the Holy Quran anytime, anywhere.
        </p>
        <p className="text-xs opacity-75">
          Version 1.0.0
        </p>
      </div>
    </div>
  );
};

export default ProfilePage;
