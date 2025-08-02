import React, { useState, useMemo } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { 
  FiUsers, 
  FiTrendingUp, 
  FiStar, 
  FiBriefcase,
  FiSun,
  FiMoon,
  FiRefreshCw,
  FiFilter
} from 'react-icons/fi';
import StatCard from './StatCard.jsx';
import ChartContainer from './ChartContainer.jsx';
import surveyData from '../data/survey.json';

// Custom tooltip component for charts
const CustomTooltip = ({ active, payload, label, darkMode }) => {
  if (active && payload && payload.length) {
    return (
      <div className={`p-3 rounded-lg shadow-lg border ${
        darkMode 
          ? 'bg-gray-800 border-gray-600 text-white' 
          : 'bg-white border-gray-200 text-gray-900'
      }`}>
        <p className="font-medium">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Color palette for charts
const CHART_COLORS = {
  primary: '#3B82F6',
  secondary: '#10B981', 
  accent: '#F59E0B',
  danger: '#EF4444',
  purple: '#8B5CF6',
  indigo: '#6366F1',
  pink: '#EC4899',
  teal: '#14B8A6'
};

// Hook for local storage
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  return [storedValue, setValue];
};

const EnhancedDashboard = () => {
  const [darkMode, setDarkMode] = useLocalStorage('dashboardDarkMode', false);
  const [selectedRole, setSelectedRole] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  // Filter data based on selected role
  const filteredData = useMemo(() => {
    if (selectedRole === 'all') return surveyData;
    return surveyData.filter(item => item.role === selectedRole);
  }, [surveyData, selectedRole]);

  // Calculate statistics
  const stats = useMemo(() => {
    if (!filteredData.length) {
      return {
        totalResponses: 0,
        avgExperience: '0.0',
        avgSatisfaction: '0.0',
        topRole: 'N/A'
      };
    }

    const totalResponses = filteredData.length;
    const avgExperience = filteredData.reduce((sum, item) => sum + item.experience, 0) / totalResponses;
    const avgSatisfaction = filteredData.reduce((sum, item) => sum + item.satisfaction, 0) / totalResponses;
    
    // Find top role from original data
    const roleCounts = surveyData.reduce((acc, item) => {
      acc[item.role] = (acc[item.role] || 0) + 1;
      return acc;
    }, {});
    const topRole = Object.entries(roleCounts).reduce((a, b) => a[1] > b[1] ? a : b)?.[0] || 'N/A';

    return {
      totalResponses,
      avgExperience: avgExperience.toFixed(1),
      avgSatisfaction: avgSatisfaction.toFixed(1),
      topRole
    };
  }, [filteredData, surveyData]);

  // Get unique roles for filter
  const uniqueRoles = useMemo(() => {
    return [...new Set(surveyData.map(item => item.role))];
  }, [surveyData]);

  // Prepare chart data
  const satisfactionData = filteredData.map(item => ({
    name: item.respondent.split(' ')[0],
    satisfaction: item.satisfaction,
    fullName: item.respondent
  }));

  const roleData = useMemo(() => {
    const roleCounts = filteredData.reduce((acc, item) => {
      acc[item.role] = (acc[item.role] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(roleCounts).map(([role, count]) => ({
      name: role,
      value: count,
      percentage: ((count / filteredData.length) * 100).toFixed(1)
    }));
  }, [filteredData]);

  const experienceTrendData = useMemo(() => {
    return filteredData
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map(item => ({
        date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        experience: item.experience,
        satisfaction: item.satisfaction,
        respondent: item.respondent
      }));
  }, [filteredData]);

  const COLORS = Object.values(CHART_COLORS);

  const handleRefresh = async () => {
    setIsLoading(true);
    // Simulate data refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  if (!surveyData.length) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className={`text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div className="mb-4 lg:mb-0">
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Analytics Dashboard
            </h1>
            <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Survey insights and analytics overview
              {selectedRole !== 'all' && ` • Filtered by ${selectedRole}`}
            </p>
          </div>
          
          {/* Controls */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Role Filter */}
            <div className="flex items-center gap-2">
              <FiFilter className={`h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className={`rounded-lg border px-3 py-2 text-sm transition-colors ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500' 
                    : 'bg-white border-gray-200 text-gray-900 focus:border-blue-500'
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              >
                <option value="all">All Roles</option>
                {uniqueRoles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>

            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className={`p-2 rounded-lg transition-colors ${
                darkMode 
                  ? 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white border-gray-700' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900 border-gray-200'
              } border disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <FiRefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-3 rounded-lg transition-colors ${
                darkMode 
                  ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              } border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
            >
              {darkMode ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={FiUsers}
            title="Total Responses"
            value={stats.totalResponses}
            color="bg-blue-500"
            darkMode={darkMode}
          />
          <StatCard
            icon={FiTrendingUp}
            title="Avg. Experience"
            value={`${stats.avgExperience} yrs`}
            color="bg-green-500"
            darkMode={darkMode}
          />
          <StatCard
            icon={FiStar}
            title="Avg. Satisfaction"
            value={`${stats.avgSatisfaction}/10`}
            color="bg-yellow-500"
            darkMode={darkMode}
          />
          <StatCard
            icon={FiBriefcase}
            title="Top Role"
            value={stats.topRole}
            color="bg-purple-500"
            darkMode={darkMode}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Satisfaction Bar Chart */}
          <ChartContainer title="Satisfaction by Respondent" darkMode={darkMode}>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={satisfactionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#E5E7EB'} />
                  <XAxis 
                    dataKey="name" 
                    stroke={darkMode ? '#9CA3AF' : '#6B7280'}
                    fontSize={12}
                  />
                  <YAxis 
                    stroke={darkMode ? '#9CA3AF' : '#6B7280'}
                    fontSize={12}
                  />
                  <Tooltip 
                    content={<CustomTooltip darkMode={darkMode} />}
                    cursor={{ fill: darkMode ? 'rgba(55, 65, 81, 0.1)' : 'rgba(229, 231, 235, 0.1)' }}
                  />
                  <Bar 
                    dataKey="satisfaction" 
                    fill={CHART_COLORS.primary} 
                    radius={[4, 4, 0, 0]}
                    name="Satisfaction"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartContainer>

          {/* Role Distribution Pie Chart */}
          <ChartContainer title="Role Distribution" darkMode={darkMode}>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={roleData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name} ${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {roleData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    content={<CustomTooltip darkMode={darkMode} />}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </ChartContainer>
        </div>

        {/* Experience Trend Line Chart */}
        <ChartContainer title="Experience Trend Over Time" darkMode={darkMode}>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={experienceTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#E5E7EB'} />
                <XAxis 
                  dataKey="date" 
                  stroke={darkMode ? '#9CA3AF' : '#6B7280'}
                  fontSize={12}
                />
                <YAxis 
                  stroke={darkMode ? '#9CA3AF' : '#6B7280'}
                  fontSize={12}
                />
                <Tooltip 
                  content={<CustomTooltip darkMode={darkMode} />}
                />
                <Line 
                  type="monotone" 
                  dataKey="experience" 
                  stroke={CHART_COLORS.secondary} 
                  strokeWidth={3}
                  dot={{ fill: CHART_COLORS.secondary, strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: CHART_COLORS.secondary, strokeWidth: 2 }}
                  name="Experience (years)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartContainer>
      </div>
    </div>
  );
};

export default EnhancedDashboard;
