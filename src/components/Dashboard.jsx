import React, { useState, useMemo, useEffect } from 'react';
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
  Line,
  ScatterChart,
  Scatter,
  ComposedChart,
  Area
} from 'recharts';
import { 
  FiUsers, 
  FiTrendingUp, 
  FiStar, 
  FiBriefcase,
  FiFilter,
  FiDollarSign,
  FiTarget,
  FiClock,
  FiAward,
  FiBarChart2,
  FiPieChart,
  FiActivity,
  FiUserCheck,
  FiSettings,
  FiDownload,
  FiRefreshCw,
  FiSearch
} from 'react-icons/fi';
import enhancedData from '../data/enhanced-survey.json';
import KPICard from './KPICard.jsx';
import AdvancedChart from './AdvancedChart.jsx';
import DataTable from './DataTable.jsx';
import PerformanceRadar from './PerformanceRadar.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import SettingsModal from './SettingsModal.jsx';
import SearchModal from './SearchModal.jsx';

// Hook for localStorage with SSR safety
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
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

const Dashboard = () => {
  const [darkMode, setDarkMode] = useLocalStorage('dashboardDarkMode', false);
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [settings, setSettings] = useLocalStorage('dashboardSettings', {
    general: {
      autoRefresh: true,
      showTrends: true,
      enableExport: true
    },
    display: {
      compactView: false,
      showAnimations: true
    },
    notifications: {
      email: true,
      desktop: false,
      performance: true
    }
  });

  // Filter data based on selections
  const filteredData = useMemo(() => {
    let filtered = enhancedData;
    
    if (selectedDepartment !== 'all') {
      filtered = filtered.filter(item => item.department === selectedDepartment);
    }
    
    // Add period filtering logic here if needed
    return filtered;
  }, [selectedDepartment, selectedPeriod]);

  // Auto-refresh functionality
  useEffect(() => {
    if (settings.general.autoRefresh) {
      const interval = setInterval(() => {
        handleRefresh();
      }, 300000); // 5 minutes
      return () => clearInterval(interval);
    }
  }, [settings.general.autoRefresh]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Cmd/Ctrl + K for search
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        setIsSearchOpen(true);
      }
      // Cmd/Ctrl + , for settings
      if ((event.metaKey || event.ctrlKey) && event.key === ',') {
        event.preventDefault();
        setIsSettingsOpen(true);
      }
      // Cmd/Ctrl + D for dark mode toggle
      if ((event.metaKey || event.ctrlKey) && event.key === 'd') {
        event.preventDefault();
        setDarkMode(!darkMode);
      }
      // Escape to close modals
      if (event.key === 'Escape') {
        setIsSearchOpen(false);
        setIsSettingsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [darkMode, setDarkMode]);

  const updateSettings = (newSettings) => {
    setSettings(newSettings);
  };

  // Calculate comprehensive KPIs
  const kpis = useMemo(() => {
    if (!filteredData.length) {
      return {
        totalEmployees: 0,
        avgSatisfaction: 0,
        retentionRate: 0,
        avgPerformance: 0,
        totalSalary: 0,
        avgProductivity: 0,
        avgEngagement: 0,
        totalProjects: 0
      };
    }

    const totalEmployees = filteredData.length;
    const avgSatisfaction = filteredData.reduce((sum, item) => sum + item.satisfaction, 0) / totalEmployees;
    const retentionRate = (filteredData.filter(item => item.retention).length / totalEmployees) * 100;
    const avgPerformance = filteredData.reduce((sum, item) => sum + item.performanceScore, 0) / totalEmployees;
    const totalSalary = filteredData.reduce((sum, item) => sum + item.salary, 0);
    const avgProductivity = filteredData.reduce((sum, item) => sum + item.productivity, 0) / totalEmployees;
    const avgEngagement = filteredData.reduce((sum, item) => sum + item.engagement, 0) / totalEmployees;
    const totalProjects = filteredData.reduce((sum, item) => sum + item.projectsCompleted, 0);

    return {
      totalEmployees,
      avgSatisfaction,
      retentionRate,
      avgPerformance,
      totalSalary,
      avgProductivity,
      avgEngagement,
      totalProjects
    };
  }, [filteredData]);

  // Get unique departments
  const departments = useMemo(() => {
    return [...new Set(enhancedData.map(item => item.department))];
  }, []);

  // Prepare chart data
  const departmentData = useMemo(() => {
    const deptCounts = filteredData.reduce((acc, item) => {
      if (!acc[item.department]) {
        acc[item.department] = {
          name: item.department,
          employees: 0,
          avgSalary: 0,
          avgPerformance: 0,
          avgSatisfaction: 0,
          totalSalary: 0
        };
      }
      acc[item.department].employees++;
      acc[item.department].totalSalary += item.salary;
      acc[item.department].avgPerformance += item.performanceScore;
      acc[item.department].avgSatisfaction += item.satisfaction;
      return acc;
    }, {});

    return Object.values(deptCounts).map(dept => ({
      ...dept,
      avgSalary: Math.round(dept.totalSalary / dept.employees),
      avgPerformance: Number((dept.avgPerformance / dept.employees).toFixed(1)),
      avgSatisfaction: Number((dept.avgSatisfaction / dept.employees).toFixed(1))
    }));
  }, [filteredData]);

  const skillLevelData = useMemo(() => {
    const skillCounts = filteredData.reduce((acc, item) => {
      acc[item.skillLevel] = (acc[item.skillLevel] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(skillCounts).map(([level, count]) => ({
      name: level,
      value: count,
      percentage: ((count / filteredData.length) * 100).toFixed(1)
    }));
  }, [filteredData]);

  const performanceData = useMemo(() => {
    return filteredData.map(item => ({
      name: item.respondent.split(' ')[0],
      performance: item.performanceScore,
      satisfaction: item.satisfaction,
      productivity: item.productivity,
      salary: item.salary
    }));
  }, [filteredData]);

  const radarData = useMemo(() => {
    return [
      { metric: 'Performance', value: kpis.avgPerformance },
      { metric: 'Satisfaction', value: kpis.avgSatisfaction },
      { metric: 'Engagement', value: kpis.avgEngagement },
      { metric: 'Productivity', value: kpis.avgProductivity / 10 }, // Scale to 0-10
      { metric: 'Retention', value: kpis.retentionRate / 10 } // Scale to 0-10
    ];
  }, [kpis]);

  // Table columns configuration
  const tableColumns = [
    { 
      key: 'respondent', 
      label: 'Employee',
      formatter: (value) => (
        <div className="font-medium">{value}</div>
      )
    },
    { key: 'role', label: 'Role' },
    { key: 'department', label: 'Department' },
    { 
      key: 'performanceScore', 
      label: 'Performance',
      formatter: (value) => (
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          value >= 8 ? 'bg-green-100 text-green-800' :
          value >= 7 ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {value}
        </span>
      )
    },
    { 
      key: 'salary', 
      label: 'Salary',
      formatter: (value) => `$${value.toLocaleString()}`
    },
    { 
      key: 'retention', 
      label: 'Status',
      formatter: (value) => (
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {value ? 'Active' : 'At Risk'}
        </span>
      )
    }
  ];

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate data refresh with realistic delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real app, you would fetch new data here
    // const newData = await fetchLatestData();
    
    setIsRefreshing(false);
    
    // Show notification if enabled
    if (settings.notifications.desktop && 'Notification' in window) {
      new Notification('Analytics Pro', {
        body: 'Dashboard data has been refreshed',
        icon: '/favicon.svg'
      });
    }
  };

  const handleExport = () => {
    if (!settings.general.enableExport) {
      alert('Data export is disabled in settings');
      return;
    }
    
    // Enhanced export with multiple formats
    const exportData = {
      metadata: {
        exported_at: new Date().toISOString(),
        total_employees: filteredData.length,
        department_filter: selectedDepartment,
        version: '1.0.0'
      },
      summary: kpis,
      employees: filteredData,
      departments: departmentData
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `analytics-report-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6', '#6366F1'];

  if (!enhancedData.length) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        darkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className={`text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Loading analytics dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      darkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Professional Header */}
      <Header 
        darkMode={darkMode} 
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />
      
      {/* Main Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Dashboard Title & Controls */}
        <div className="flex flex-col space-y-4 lg:flex-row lg:justify-between lg:items-center lg:space-y-0 mb-6 sm:mb-8">
          <div>
            <h1 className={`text-2xl sm:text-3xl font-bold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Employee Analytics Overview
            </h1>
            <p className={`mt-1 sm:mt-2 text-sm sm:text-base ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Real-time workforce insights and performance analytics
              {selectedDepartment !== 'all' && ` • ${selectedDepartment} Department`}
              {settings.general.autoRefresh && (
                <span className="ml-2 inline-flex items-center">
                  <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse mr-1"></span>
                  Auto-refresh enabled
                </span>
              )}
            </p>
          </div>
          
          {/* Dashboard Controls */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            {/* Quick Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className={`hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-colors ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700 text-gray-400 hover:text-white hover:border-gray-600' 
                  : 'bg-white border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              <FiSearch className="h-4 w-4" />
              <span>Search...</span>
              <span className={`text-xs px-1.5 py-0.5 rounded ${
                darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'
              }`}>
                ⌘K
              </span>
            </button>

            {/* Department Filter */}
            <div className="flex items-center gap-2">
              <FiFilter className={`h-4 w-4 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`} />
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className={`rounded-lg border px-3 py-2 text-sm transition-colors ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500' 
                    : 'bg-white border-gray-200 text-gray-900 focus:border-blue-500'
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              >
                <option value="all">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className={`p-2 sm:p-3 rounded-lg transition-colors ${
                darkMode 
                  ? 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white border-gray-700' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900 border-gray-200'
              } border disabled:opacity-50 disabled:cursor-not-allowed`}
              title={settings.general.autoRefresh ? 'Auto-refresh enabled' : 'Manual refresh'}
            >
              <FiRefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>

            {/* Export Button */}
            <button
              onClick={handleExport}
              disabled={!settings.general.enableExport}
              className={`p-2 sm:p-3 rounded-lg transition-colors ${
                settings.general.enableExport
                  ? darkMode 
                    ? 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white border-gray-700' 
                    : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900 border-gray-200'
                  : 'opacity-50 cursor-not-allowed'
              } border`}
              title={settings.general.enableExport ? 'Export data' : 'Export disabled in settings'}
            >
              <FiDownload className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <KPICard
            icon={FiUsers}
            title="Total Employees"
            value={kpis.totalEmployees}
            color="text-blue-500"
            darkMode={darkMode}
            trend={5}
            trendValue={8.2}
          />
          <KPICard
            icon={FiDollarSign}
            title="Avg Salary"
            value={kpis.totalSalary / kpis.totalEmployees}
            color="text-green-500"
            darkMode={darkMode}
            formatter={(val) => `$${Math.round(val).toLocaleString()}`}
            trend={3}
            trendValue={4.1}
          />
          <KPICard
            icon={FiTarget}
            title="Performance Score"
            value={kpis.avgPerformance}
            color="text-purple-500"
            darkMode={darkMode}
            formatter={(val) => val.toFixed(1)}
            trend={2}
            trendValue={2.3}
          />
          <KPICard
            icon={FiUserCheck}
            title="Retention Rate"
            value={kpis.retentionRate}
            color="text-orange-500"
            darkMode={darkMode}
            formatter={(val) => `${val.toFixed(1)}%`}
            trend={1}
            trendValue={1.8}
          />
        </div>

        {/* Secondary KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <KPICard
            icon={FiStar}
            title="Satisfaction"
            value={kpis.avgSatisfaction}
            color="text-yellow-500"
            darkMode={darkMode}
            formatter={(val) => `${val.toFixed(1)}/10`}
            trend={4}
            trendValue={6.7}
          />
          <KPICard
            icon={FiActivity}
            title="Productivity"
            value={kpis.avgProductivity}
            color="text-red-500"
            darkMode={darkMode}
            formatter={(val) => `${val.toFixed(1)}%`}
            trend={3}
            trendValue={3.2}
          />
          <KPICard
            icon={FiBarChart2}
            title="Engagement"
            value={kpis.avgEngagement}
            color="text-indigo-500"
            darkMode={darkMode}
            formatter={(val) => `${val.toFixed(1)}/10`}
            trend={2}
            trendValue={5.1}
          />
          <KPICard
            icon={FiAward}
            title="Projects Completed"
            value={kpis.totalProjects}
            color="text-pink-500"
            darkMode={darkMode}
            trend={8}
            trendValue={12.4}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Department Performance */}
          <div className="xl:col-span-2">
            <AdvancedChart
              data={departmentData}
              title="Department Performance Analysis"
              darkMode={darkMode}
              primaryKey="employees"
              secondaryKey="avgPerformance"
              primaryName="Employee Count"
              secondaryName="Avg Performance"
              primaryColor="#3B82F6"
              secondaryColor="#10B981"
            />
          </div>

          {/* Skill Level Distribution */}
          <div className={`${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } rounded-xl border p-4 sm:p-6 shadow-sm`}>
            <h3 className={`text-base sm:text-lg font-semibold ${
              darkMode ? 'text-white' : 'text-gray-900'
            } mb-4`}>
              Skill Level Distribution
            </h3>
            <div className="h-64 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={skillLevelData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name} ${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {skillLevelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Performance vs Satisfaction Scatter & Radar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Performance vs Satisfaction Scatter Plot */}
          <div className={`${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } rounded-xl border p-4 sm:p-6 shadow-sm`}>
            <h3 className={`text-base sm:text-lg font-semibold ${
              darkMode ? 'text-white' : 'text-gray-900'
            } mb-4`}>
              Performance vs Satisfaction Analysis
            </h3>
            <div className="h-64 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#E5E7EB'} />
                  <XAxis 
                    type="number"
                    dataKey="performance"
                    name="Performance"
                    stroke={darkMode ? '#9CA3AF' : '#6B7280'}
                    fontSize={12}
                  />
                  <YAxis 
                    type="number"
                    dataKey="satisfaction"
                    name="Satisfaction"
                    stroke={darkMode ? '#9CA3AF' : '#6B7280'}
                    fontSize={12}
                  />
                  <Tooltip 
                    formatter={(value, name) => [value, name]}
                    labelFormatter={(label) => `Employee: ${label}`}
                  />
                  <Scatter 
                    name="Employees" 
                    dataKey="satisfaction" 
                    fill="#8B5CF6"
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Performance Radar Chart */}
          <PerformanceRadar
            data={radarData}
            title="Overall Performance Metrics"
            darkMode={darkMode}
          />
        </div>

        {/* Salary Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Salary by Department */}
          <div className={`${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } rounded-xl border p-4 sm:p-6 shadow-sm`}>
            <h3 className={`text-base sm:text-lg font-semibold ${
              darkMode ? 'text-white' : 'text-gray-900'
            } mb-4`}>
              Average Salary by Department
            </h3>
            <div className="h-64 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#E5E7EB'} />
                  <XAxis 
                    type="number"
                    stroke={darkMode ? '#9CA3AF' : '#6B7280'}
                    fontSize={12}
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  />
                  <YAxis 
                    type="category"
                    dataKey="name"
                    stroke={darkMode ? '#9CA3AF' : '#6B7280'}
                    fontSize={12}
                    width={80}
                  />
                  <Tooltip 
                    formatter={(value) => [`$${value.toLocaleString()}`, 'Avg Salary']}
                  />
                  <Bar 
                    dataKey="avgSalary" 
                    fill="#F59E0B"
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Productivity Trend */}
          <div className={`${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } rounded-xl border p-4 sm:p-6 shadow-sm`}>
            <h3 className={`text-base sm:text-lg font-semibold ${
              darkMode ? 'text-white' : 'text-gray-900'
            } mb-4`}>
              Productivity vs Performance Correlation
            </h3>
            <div className="h-64 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={performanceData}>
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
                  <Tooltip />
                  <Bar 
                    dataKey="productivity" 
                    fill="#EC4899" 
                    name="Productivity %"
                    radius={[4, 4, 0, 0]}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="performance" 
                    stroke="#14B8A6" 
                    strokeWidth={3}
                    name="Performance Score"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Employee Data Table */}
        <div className="mb-6 sm:mb-8">
          <DataTable
            data={filteredData}
            columns={tableColumns}
            title="Employee Performance Overview"
            darkMode={darkMode}
            maxRows={15}
          />
        </div>

        {/* Additional Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Retention Analysis */}
          <div className={`${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } rounded-xl border p-4 sm:p-6 shadow-sm`}>
            <h3 className={`text-base sm:text-lg font-semibold ${
              darkMode ? 'text-white' : 'text-gray-900'
            } mb-4`}>
              Retention Insights
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Active Employees
                </span>
                <span className="text-green-500 font-semibold">
                  {filteredData.filter(emp => emp.retention).length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  At Risk
                </span>
                <span className="text-red-500 font-semibold">
                  {filteredData.filter(emp => !emp.retention).length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Retention Rate
                </span>
                <span className="text-blue-500 font-semibold">
                  {kpis.retentionRate.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>

          {/* Top Performers */}
          <div className={`${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } rounded-xl border p-4 sm:p-6 shadow-sm`}>
            <h3 className={`text-base sm:text-lg font-semibold ${
              darkMode ? 'text-white' : 'text-gray-900'
            } mb-4`}>
              Top Performers
            </h3>
            <div className="space-y-3">
              {filteredData
                .sort((a, b) => b.performanceScore - a.performanceScore)
                .slice(0, 5)
                .map((emp, index) => (
                  <div key={emp.id} className="flex justify-between items-center">
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {emp.respondent.split(' ')[0]}
                    </span>
                    <span className="text-green-500 font-semibold text-sm">
                      {emp.performanceScore}
                    </span>
                  </div>
                ))}
            </div>
          </div>

          {/* Department Summary */}
          <div className={`${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } rounded-xl border p-4 sm:p-6 shadow-sm`}>
            <h3 className={`text-base sm:text-lg font-semibold ${
              darkMode ? 'text-white' : 'text-gray-900'
            } mb-4`}>
              Department Summary
            </h3>
            <div className="space-y-3">
              {departmentData.slice(0, 5).map((dept) => (
                <div key={dept.name} className="flex justify-between items-center">
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {dept.name}
                  </span>
                  <span className="text-blue-500 font-semibold text-sm">
                    {dept.employees} emp
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Professional Footer */}
      <Footer darkMode={darkMode} />

      {/* Enterprise Modals */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        settings={settings}
        onUpdateSettings={updateSettings}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        darkMode={darkMode}
        data={enhancedData}
      />
    </div>
  );
};

export default Dashboard;
