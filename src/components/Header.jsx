import React from 'react';
import { 
  FiBell, 
  FiUser, 
  FiSettings, 
  FiHelpCircle,
  FiChevronDown,
  FiBarChart,
  FiGlobe,
  FiSearch
} from 'react-icons/fi';

const Header = ({ darkMode, onToggleDarkMode }) => {
  return (
    <header className={`sticky top-0 z-50 border-b transition-colors duration-200 ${
      darkMode 
        ? 'bg-gray-900/95 border-gray-800 backdrop-blur-sm' 
        : 'bg-white/95 border-gray-200 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${
                darkMode ? 'bg-blue-600' : 'bg-blue-500'
              }`}>
                <FiBarChart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className={`text-xl font-bold ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Analytics Pro
                </h1>
                <p className={`text-xs ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Enterprise Dashboard
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Links - Hidden on mobile */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a 
              href="#dashboard" 
              className={`text-sm font-medium transition-colors ${
                darkMode 
                  ? 'text-white hover:text-blue-400' 
                  : 'text-gray-900 hover:text-blue-600'
              }`}
            >
              Dashboard
            </a>
            <a 
              href="#analytics" 
              className={`text-sm font-medium transition-colors ${
                darkMode 
                  ? 'text-gray-400 hover:text-white' 
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Analytics
            </a>
            <a 
              href="#reports" 
              className={`text-sm font-medium transition-colors ${
                darkMode 
                  ? 'text-gray-400 hover:text-white' 
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Reports
            </a>
            <a 
              href="#teams" 
              className={`text-sm font-medium transition-colors ${
                darkMode 
                  ? 'text-gray-400 hover:text-white' 
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Teams
            </a>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-3">
            {/* Search - Hidden on mobile */}
            <div className="hidden md:block relative">
              <FiSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <input
                type="text"
                placeholder="Search..."
                className={`pl-10 pr-4 py-2 w-64 rounded-lg border text-sm transition-colors ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500' 
                    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              />
            </div>

            {/* Notifications */}
            <button className={`p-2 rounded-lg transition-colors relative ${
              darkMode 
                ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}>
              <FiBell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Help */}
            <button className={`p-2 rounded-lg transition-colors ${
              darkMode 
                ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}>
              <FiHelpCircle className="h-5 w-5" />
            </button>

            {/* Settings */}
            <button className={`p-2 rounded-lg transition-colors ${
              darkMode 
                ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}>
              <FiSettings className="h-5 w-5" />
            </button>

            {/* User Profile */}
            <div className="relative">
              <button className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                darkMode 
                  ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}>
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <FiUser className="h-4 w-4 text-white" />
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium">John Smith</p>
                    <p className={`text-xs ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      Admin
                    </p>
                  </div>
                </div>
                <FiChevronDown className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
