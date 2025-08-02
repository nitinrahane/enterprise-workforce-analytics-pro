import React from 'react';
import { 
  FiHeart, 
  FiGithub, 
  FiTwitter, 
  FiLinkedin,
  FiMail,
  FiGlobe,
  FiShield,
  FiBook,
  FiHeadphones
} from 'react-icons/fi';

const Footer = ({ darkMode }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`border-t transition-colors duration-200 ${
      darkMode 
        ? 'bg-gray-900 border-gray-800' 
        : 'bg-white border-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className={`p-2 rounded-lg ${
                darkMode ? 'bg-blue-600' : 'bg-blue-500'
              }`}>
                <FiGlobe className="h-5 w-5 text-white" />
              </div>
              <h3 className={`text-lg font-bold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Analytics Pro
              </h3>
            </div>
            <p className={`text-sm mb-4 max-w-md ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Empowering organizations with intelligent workforce analytics and data-driven insights. 
              Transform your employee data into actionable business intelligence.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className={`p-2 rounded-lg transition-colors ${
                  darkMode 
                    ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                <FiGithub className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className={`p-2 rounded-lg transition-colors ${
                  darkMode 
                    ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                <FiTwitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className={`p-2 rounded-lg transition-colors ${
                  darkMode 
                    ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                <FiLinkedin className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className={`p-2 rounded-lg transition-colors ${
                  darkMode 
                    ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                <FiMail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={`text-sm font-semibold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Platform
            </h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#" 
                  className={`text-sm transition-colors ${
                    darkMode 
                      ? 'text-gray-400 hover:text-white' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className={`text-sm transition-colors ${
                    darkMode 
                      ? 'text-gray-400 hover:text-white' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Analytics
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className={`text-sm transition-colors ${
                    darkMode 
                      ? 'text-gray-400 hover:text-white' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Reports
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className={`text-sm transition-colors ${
                    darkMode 
                      ? 'text-gray-400 hover:text-white' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  API Access
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className={`text-sm font-semibold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Support
            </h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#" 
                  className={`text-sm transition-colors flex items-center space-x-2 ${
                    darkMode 
                      ? 'text-gray-400 hover:text-white' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <FiBook className="h-4 w-4" />
                  <span>Documentation</span>
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className={`text-sm transition-colors flex items-center space-x-2 ${
                    darkMode 
                      ? 'text-gray-400 hover:text-white' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <FiHeadphones className="h-4 w-4" />
                  <span>Help Center</span>
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className={`text-sm transition-colors flex items-center space-x-2 ${
                    darkMode 
                      ? 'text-gray-400 hover:text-white' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <FiMail className="h-4 w-4" />
                  <span>Contact Us</span>
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className={`text-sm transition-colors flex items-center space-x-2 ${
                    darkMode 
                      ? 'text-gray-400 hover:text-white' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <FiShield className="h-4 w-4" />
                  <span>Privacy Policy</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Status Bar */}
        <div className={`flex flex-col sm:flex-row justify-between items-center pt-6 border-t ${
          darkMode ? 'border-gray-800' : 'border-gray-200'
        }`}>
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className={`text-xs ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                All systems operational
              </span>
            </div>
            <div className={`text-xs ${
              darkMode ? 'text-gray-500' : 'text-gray-400'
            }`}>
              •
            </div>
            <span className={`text-xs ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Last updated: {new Date().toLocaleTimeString()}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <p className={`text-xs ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              © {currentYear} Analytics Pro. All rights reserved.
            </p>
            <div className="flex items-center space-x-1">
              <span className={`text-xs ${
                darkMode ? 'text-gray-500' : 'text-gray-400'
              }`}>
                Made with
              </span>
              <FiHeart className="h-3 w-3 text-red-500 animate-pulse" />
              <span className={`text-xs ${
                darkMode ? 'text-gray-500' : 'text-gray-400'
              }`}>
                for better insights
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
