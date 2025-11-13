import { BookOpen } from 'lucide-react';

const QuranPage = () => {
  const surahs = [
    { number: 1, name: 'Al-Fatihah', translation: 'The Opening', verses: 7, revelation: 'Meccan' },
    { number: 2, name: 'Al-Baqarah', translation: 'The Cow', verses: 286, revelation: 'Medinan' },
    { number: 3, name: 'Ali \'Imran', translation: 'Family of Imran', verses: 200, revelation: 'Medinan' },
    { number: 4, name: 'An-Nisa', translation: 'The Women', verses: 176, revelation: 'Medinan' },
    { number: 5, name: 'Al-Ma\'idah', translation: 'The Table Spread', verses: 120, revelation: 'Medinan' },
    { number: 6, name: 'Al-An\'am', translation: 'The Cattle', verses: 165, revelation: 'Meccan' },
    { number: 7, name: 'Al-A\'raf', translation: 'The Heights', verses: 206, revelation: 'Meccan' },
    { number: 8, name: 'Al-Anfal', translation: 'The Spoils of War', verses: 75, revelation: 'Medinan' },
    { number: 9, name: 'At-Tawbah', translation: 'The Repentance', verses: 129, revelation: 'Medinan' },
    { number: 10, name: 'Yunus', translation: 'Jonah', verses: 109, revelation: 'Meccan' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Holy Quran
        </h2>
        <p className="text-gray-600">
          Browse and read all 114 Surahs
        </p>
      </div>

      {/* Surahs List */}
      <div className="space-y-3">
        {surahs.map((surah) => (
          <div
            key={surah.number}
            className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-4">
              {/* Surah Number */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg bg-primary bg-opacity-10 flex items-center justify-center group-hover:bg-primary group-hover:bg-opacity-100 transition-all">
                  <span className="font-bold text-primary group-hover:text-white transition-colors">
                    {surah.number}
                  </span>
                </div>
              </div>

              {/* Surah Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-lg mb-1">
                  {surah.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {surah.translation} • {surah.verses} verses
                </p>
              </div>

              {/* Revelation Type */}
              <div className="flex-shrink-0 hidden sm:block">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  surah.revelation === 'Meccan'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-green-100 text-green-700'
                }`}>
                  {surah.revelation}
                </span>
              </div>

              {/* Arrow Icon */}
              <div className="flex-shrink-0">
                <BookOpen className="text-gray-400 group-hover:text-primary transition-colors" size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="mt-8 text-center">
        <button className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all">
          Load More Surahs
        </button>
      </div>
    </div>
  );
};

export default QuranPage;
