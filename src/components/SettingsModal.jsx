import React, { useState } from 'react';
import { 
  FiSettings, 
  FiUser, 
  FiBell, 
  FiShield,
  FiMonitor,
  FiDownload,
  FiRefreshCw,
  FiToggleLeft,
  FiToggleRight,
  FiSave,
  FiX
} from 'react-icons/fi';

const SettingsModal = ({ isOpen, onClose, darkMode, onToggleDarkMode, settings, onUpdateSettings }) => {
  const [localSettings, setLocalSettings] = useState(settings);
  const [activeTab, setActiveTab] = useState('general');

  const handleSave = () => {
    onUpdateSettings(localSettings);
    onClose();
  };

  const updateSetting = (category, key, value) => {
    setLocalSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const tabs = [
    { id: 'general', label: 'General', icon: FiSettings },
    { id: 'profile', label: 'Profile', icon: FiUser },
    { id: 'notifications', label: 'Notifications', icon: FiBell },
    { id: 'privacy', label: 'Privacy', icon: FiShield },
    { id: 'display', label: 'Display', icon: FiMonitor },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className={`max-w-4xl w-full max-h-[90vh] overflow-hidden rounded-xl shadow-2xl ${
        darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
      } border`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-6 border-b ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className="flex items-center space-x-3">
            <FiSettings className={`h-6 w-6 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
            <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Settings
            </h2>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${
              darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <div className="flex h-[600px]">
          {/* Sidebar */}
          <div className={`w-64 border-r ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
            <nav className="p-4 space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? darkMode 
                          ? 'bg-blue-600 text-white'
                          : 'bg-blue-500 text-white'
                        : darkMode
                          ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                          : 'text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {activeTab === 'general' && (
              <div className="space-y-6">
                <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  General Settings
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Auto-refresh Dashboard
                      </label>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Automatically refresh data every 5 minutes
                      </p>
                    </div>
                    <button
                      onClick={() => updateSetting('general', 'autoRefresh', !localSettings.general.autoRefresh)}
                      className={`${localSettings.general.autoRefresh ? 'text-blue-500' : darkMode ? 'text-gray-400' : 'text-gray-300'}`}
                    >
                      {localSettings.general.autoRefresh ? <FiToggleRight className="h-6 w-6" /> : <FiToggleLeft className="h-6 w-6" />}
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Show Performance Trends
                      </label>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Display trend indicators on KPI cards
                      </p>
                    </div>
                    <button
                      onClick={() => updateSetting('general', 'showTrends', !localSettings.general.showTrends)}
                      className={`${localSettings.general.showTrends ? 'text-blue-500' : darkMode ? 'text-gray-400' : 'text-gray-300'}`}
                    >
                      {localSettings.general.showTrends ? <FiToggleRight className="h-6 w-6" /> : <FiToggleLeft className="h-6 w-6" />}
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Enable Data Export
                      </label>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Allow downloading of analytics data
                      </p>
                    </div>
                    <button
                      onClick={() => updateSetting('general', 'enableExport', !localSettings.general.enableExport)}
                      className={`${localSettings.general.enableExport ? 'text-blue-500' : darkMode ? 'text-gray-400' : 'text-gray-300'}`}
                    >
                      {localSettings.general.enableExport ? <FiToggleRight className="h-6 w-6" /> : <FiToggleLeft className="h-6 w-6" />}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'display' && (
              <div className="space-y-6">
                <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Display Preferences
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Dark Mode
                      </label>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Use dark theme for better viewing in low light
                      </p>
                    </div>
                    <button
                      onClick={onToggleDarkMode}
                      className={`${darkMode ? 'text-blue-500' : 'text-gray-300'}`}
                    >
                      {darkMode ? <FiToggleRight className="h-6 w-6" /> : <FiToggleLeft className="h-6 w-6" />}
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Compact View
                      </label>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Reduce spacing between dashboard elements
                      </p>
                    </div>
                    <button
                      onClick={() => updateSetting('display', 'compactView', !localSettings.display.compactView)}
                      className={`${localSettings.display.compactView ? 'text-blue-500' : darkMode ? 'text-gray-400' : 'text-gray-300'}`}
                    >
                      {localSettings.display.compactView ? <FiToggleRight className="h-6 w-6" /> : <FiToggleLeft className="h-6 w-6" />}
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Show Animations
                      </label>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Enable smooth transitions and animations
                      </p>
                    </div>
                    <button
                      onClick={() => updateSetting('display', 'showAnimations', !localSettings.display.showAnimations)}
                      className={`${localSettings.display.showAnimations ? 'text-blue-500' : darkMode ? 'text-gray-400' : 'text-gray-300'}`}
                    >
                      {localSettings.display.showAnimations ? <FiToggleRight className="h-6 w-6" /> : <FiToggleLeft className="h-6 w-6" />}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Notification Preferences
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Email Notifications
                      </label>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Receive important updates via email
                      </p>
                    </div>
                    <button
                      onClick={() => updateSetting('notifications', 'email', !localSettings.notifications.email)}
                      className={`${localSettings.notifications.email ? 'text-blue-500' : darkMode ? 'text-gray-400' : 'text-gray-300'}`}
                    >
                      {localSettings.notifications.email ? <FiToggleRight className="h-6 w-6" /> : <FiToggleLeft className="h-6 w-6" />}
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Desktop Notifications
                      </label>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Show browser notifications for alerts
                      </p>
                    </div>
                    <button
                      onClick={() => updateSetting('notifications', 'desktop', !localSettings.notifications.desktop)}
                      className={`${localSettings.notifications.desktop ? 'text-blue-500' : darkMode ? 'text-gray-400' : 'text-gray-300'}`}
                    >
                      {localSettings.notifications.desktop ? <FiToggleRight className="h-6 w-6" /> : <FiToggleLeft className="h-6 w-6" />}
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Performance Alerts
                      </label>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Get notified about performance changes
                      </p>
                    </div>
                    <button
                      onClick={() => updateSetting('notifications', 'performance', !localSettings.notifications.performance)}
                      className={`${localSettings.notifications.performance ? 'text-blue-500' : darkMode ? 'text-gray-400' : 'text-gray-300'}`}
                    >
                      {localSettings.notifications.performance ? <FiToggleRight className="h-6 w-6" /> : <FiToggleLeft className="h-6 w-6" />}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className={`flex items-center justify-between p-6 border-t ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <button
            onClick={onClose}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              darkMode 
                ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors"
          >
            <FiSave className="h-4 w-4" />
            <span>Save Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
