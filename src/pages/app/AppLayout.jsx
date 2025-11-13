import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Home, Search, BookOpen, User, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const AppLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const tabs = [
    { name: 'Home', path: '/app', icon: Home },
    { name: 'Search', path: '/app/search', icon: Search },
    { name: 'Quran', path: '/app/quran', icon: BookOpen },
    { name: 'Profile', path: '/app/profile', icon: User },
  ];

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
      navigate('/login');
    }
  };

  const isActive = (path) => {
    if (path === '/app') {
      return location.pathname === '/app' || location.pathname === '/app/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">Quran App</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-around">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = isActive(tab.path);

              return (
                <button
                  key={tab.name}
                  onClick={() => navigate(tab.path)}
                  className={`flex flex-col items-center py-3 px-4 transition-colors ${
                    active ? 'text-primary' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon size={24} className={active ? 'stroke-2' : ''} />
                  <span className={`text-xs mt-1 ${active ? 'font-semibold' : 'font-medium'}`}>
                    {tab.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default AppLayout;
