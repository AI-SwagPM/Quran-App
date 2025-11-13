import { useAuth } from '../../contexts/AuthContext';
import { BookOpen, Search, Bookmark, Clock } from 'lucide-react';

const HomePage = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: BookOpen,
      title: 'Read Quran',
      description: 'Read the Holy Quran with translations',
      color: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      icon: Search,
      title: 'Search',
      description: 'Search verses and topics',
      color: 'bg-green-50',
      iconColor: 'text-green-600',
    },
    {
      icon: Bookmark,
      title: 'Bookmarks',
      description: 'Save your favorite verses',
      color: 'bg-purple-50',
      iconColor: 'text-purple-600',
    },
    {
      icon: Clock,
      title: 'Prayer Times',
      description: 'View daily prayer times',
      color: 'bg-orange-50',
      iconColor: 'text-orange-600',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name}!
        </h2>
        <p className="text-gray-600">
          Continue your spiritual journey
        </p>
      </div>

      {/* Daily Verse Card */}
      <div className="bg-gradient-to-br from-primary to-teal-600 rounded-2xl p-6 mb-8 text-white shadow-lg">
        <h3 className="text-lg font-semibold mb-3">Verse of the Day</h3>
        <p className="text-2xl font-arabic mb-4 leading-relaxed">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>
        <p className="text-sm opacity-90 mb-2">
          "In the name of Allah, the Entirely Merciful, the Especially Merciful."
        </p>
        <p className="text-xs opacity-75">
          Surah Al-Fatiha (1:1)
        </p>
      </div>

      {/* Features Grid */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Quick Access
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={`${feature.color} rounded-xl p-6 cursor-pointer hover:shadow-md transition-shadow`}
              >
                <div className={`${feature.iconColor} mb-3`}>
                  <Icon size={32} />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  {feature.title}
                </h4>
                <p className="text-sm text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Continue Reading
        </h3>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">
                Surah Al-Baqarah
              </h4>
              <p className="text-sm text-gray-600">
                Last read: Verse 255
              </p>
            </div>
            <button className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-all">
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
