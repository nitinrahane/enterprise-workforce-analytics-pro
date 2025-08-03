import React, { useState, useRef, useEffect } from 'react';
import { 
  FiBell, 
  FiUser, 
  FiSettings, 
  FiHelpCircle,
  FiChevronDown,
  FiBarChart,
  FiGlobe,
  FiSearch,
  FiSun,
  FiMoon,
  FiLogOut,
  FiUserCheck,
  FiShield,
  FiMenu,
  FiX
} from 'react-icons/fi';

const Header = ({ darkMode, onToggleDarkMode }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const profileRef = useRef(null);
  const notificationsRef = useRef(null);

  // Mock notifications data
  const notifications = [
    { id: 1, title: 'Performance Review Due', message: 'John Smith\'s quarterly review is due', time: '2 hours ago', unread: true },
    { id: 2, title: 'New Employee Onboarded', message: 'Sarah Johnson joined Marketing', time: '4 hours ago', unread: true },
    { id: 3, title: 'Department Meeting', message: 'Weekly HR sync scheduled for tomorrow', time: '1 day ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
              <div className="hidden sm:block">
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
                placeholder="Search employees, departments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`pl-10 pr-4 py-2 w-64 rounded-lg border text-sm transition-colors ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500' 
                    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              />
            </div>

            {/* Dark/Light Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className={`p-2 rounded-lg transition-colors ${
                darkMode 
                  ? 'text-yellow-400 hover:text-yellow-300 hover:bg-gray-800' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />}
            </button>

            {/* Notifications */}
            <div className="relative" ref={notificationsRef}>
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className={`p-2 rounded-lg transition-colors relative ${
                  darkMode 
                    ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                <FiBell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {isNotificationsOpen && (
                <div className={`absolute right-0 mt-2 w-80 rounded-lg shadow-lg border ${
                  darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                } z-50`}>
                  <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Notifications
                    </h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id}
                        className={`p-4 border-b hover:bg-opacity-50 cursor-pointer ${
                          darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'
                        } ${notification.unread ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className={`font-medium text-sm ${
                              darkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                              {notification.title}
                            </p>
                            <p className={`text-sm mt-1 ${
                              darkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              {notification.message}
                            </p>
                            <p className={`text-xs mt-2 ${
                              darkMode ? 'text-gray-500' : 'text-gray-400'
                            }`}>
                              {notification.time}
                            </p>
                          </div>
                          {notification.unread && (
                            <div className="h-2 w-2 bg-blue-500 rounded-full ml-2 mt-1"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <button className={`text-sm text-blue-500 hover:text-blue-600 font-medium`}>
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

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
            <div className="relative" ref={profileRef}>
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                  darkMode 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
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
                <FiChevronDown className={`h-4 w-4 transition-transform ${
                  isProfileOpen ? 'rotate-180' : ''
                }`} />
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className={`absolute right-0 mt-2 w-56 rounded-lg shadow-lg border ${
                  darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                } z-50`}>
                  <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                        <FiUser className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          John Smith
                        </p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          john.smith@company.com
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="py-2">
                    <a href="#profile" className={`flex items-center space-x-3 px-4 py-2 text-sm transition-colors ${
                      darkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-700 hover:bg-gray-100'
                    }`}>
                      <FiUserCheck className="h-4 w-4" />
                      <span>My Profile</span>
                    </a>
                    <a href="#settings" className={`flex items-center space-x-3 px-4 py-2 text-sm transition-colors ${
                      darkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-700 hover:bg-gray-100'
                    }`}>
                      <FiSettings className="h-4 w-4" />
                      <span>Settings</span>
                    </a>
                    <a href="#privacy" className={`flex items-center space-x-3 px-4 py-2 text-sm transition-colors ${
                      darkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-700 hover:bg-gray-100'
                    }`}>
                      <FiShield className="h-4 w-4" />
                      <span>Privacy</span>
                    </a>
                  </div>
                  <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <button className={`flex items-center space-x-3 px-4 py-2 text-sm w-full text-left transition-colors ${
                      darkMode ? 'text-red-400 hover:bg-gray-700' : 'text-red-600 hover:bg-red-50'
                    }`}>
                      <FiLogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                darkMode 
                  ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              {isMobileMenuOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={`lg:hidden border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
            <div className="py-4 space-y-2">
              <a 
                href="#dashboard" 
                className={`block px-4 py-2 text-sm font-medium transition-colors ${
                  darkMode 
                    ? 'text-white hover:bg-gray-800' 
                    : 'text-gray-900 hover:bg-gray-100'
                }`}
              >
                Dashboard
              </a>
              <a 
                href="#analytics" 
                className={`block px-4 py-2 text-sm font-medium transition-colors ${
                  darkMode 
                    ? 'text-gray-400 hover:bg-gray-800 hover:text-white' 
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                Analytics
              </a>
              <a 
                href="#reports" 
                className={`block px-4 py-2 text-sm font-medium transition-colors ${
                  darkMode 
                    ? 'text-gray-400 hover:bg-gray-800 hover:text-white' 
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                Reports
              </a>
              <a 
                href="#teams" 
                className={`block px-4 py-2 text-sm font-medium transition-colors ${
                  darkMode 
                    ? 'text-gray-400 hover:bg-gray-800 hover:text-white' 
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                Teams
              </a>
              {/* Mobile Search */}
              <div className="px-4 py-2">
                <div className="relative">
                  <FiSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`pl-10 pr-4 py-2 w-full rounded-lg border text-sm transition-colors ${
                      darkMode 
                        ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500' 
                        : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
