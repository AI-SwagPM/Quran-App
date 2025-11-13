import { useState } from 'react';
import { Search } from 'lucide-react';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const mockResults = [
    {
      id: 1,
      surah: 'Al-Baqarah',
      verse: 255,
      arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ',
      translation: 'Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence.',
    },
    {
      id: 2,
      surah: 'Al-Ikhlas',
      verse: 1,
      arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ',
      translation: 'Say, "He is Allah, [who is] One"',
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // In a real app, this would search through actual Quran data
      setSearchResults(mockResults);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Search Quran
        </h2>
        <p className="text-gray-600">
          Search for verses, topics, and more
        </p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for verses, topics..."
            className="w-full px-4 py-4 pl-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-all"
          >
            Search
          </button>
        </div>
      </form>

      {/* Popular Searches */}
      {searchResults.length === 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Popular Searches
          </h3>
          <div className="flex flex-wrap gap-2">
            {['Prayer', 'Mercy', 'Paradise', 'Patience', 'Gratitude', 'Faith'].map((term) => (
              <button
                key={term}
                onClick={() => setSearchQuery(term)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-primary hover:text-white transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Search Results ({searchResults.length})
          </h3>
          <div className="space-y-4">
            {searchResults.map((result) => (
              <div
                key={result.id}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-primary">
                      {result.surah}
                    </h4>
                    <p className="text-sm text-gray-500">Verse {result.verse}</p>
                  </div>
                </div>
                <p className="text-2xl font-arabic text-right mb-3 leading-relaxed">
                  {result.arabic}
                </p>
                <p className="text-gray-700">
                  {result.translation}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
