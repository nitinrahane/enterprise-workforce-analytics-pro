import React, { useState, useEffect, useRef } from 'react';
import { 
  FiSearch, 
  FiUser, 
  FiUsers, 
  FiTrendingUp,
  FiBarChart,
  FiFileText,
  FiX,
  FiClock
} from 'react-icons/fi';

const SearchModal = ({ isOpen, onClose, darkMode, data }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ employees: [], departments: [], metrics: [] });
  const [recentSearches, setRecentSearches] = useState([
    'High Performance Employees',
    'Marketing Department',
    'Salary Analysis',
    'Retention Rate'
  ]);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.length > 0) {
      performSearch(query);
    } else {
      setResults({ employees: [], departments: [], metrics: [] });
    }
  }, [query, data]);

  const performSearch = (searchQuery) => {
    const lowerQuery = searchQuery.toLowerCase();
    
    // Search employees
    const employees = data.filter(emp => 
      emp.respondent.toLowerCase().includes(lowerQuery) ||
      emp.role.toLowerCase().includes(lowerQuery) ||
      emp.department.toLowerCase().includes(lowerQuery) ||
      emp.skillLevel.toLowerCase().includes(lowerQuery)
    ).slice(0, 5);

    // Search departments
    const allDepartments = [...new Set(data.map(emp => emp.department))];
    const departments = allDepartments.filter(dept => 
      dept.toLowerCase().includes(lowerQuery)
    ).slice(0, 3);

    // Search metrics/KPIs
    const metrics = [
      { name: 'Performance Score', description: 'Average employee performance rating', icon: FiTrendingUp },
      { name: 'Satisfaction Rate', description: 'Employee satisfaction metrics', icon: FiBarChart },
      { name: 'Retention Rate', description: 'Employee retention statistics', icon: FiUsers },
      { name: 'Productivity', description: 'Team productivity measurements', icon: FiFileText },
      { name: 'Salary Analysis', description: 'Compensation and salary data', icon: FiUsers },
    ].filter(metric => 
      metric.name.toLowerCase().includes(lowerQuery) ||
      metric.description.toLowerCase().includes(lowerQuery)
    ).slice(0, 3);

    setResults({ employees, departments, metrics });
  };

  const handleSearchSubmit = (searchTerm) => {
    if (searchTerm && !recentSearches.includes(searchTerm)) {
      setRecentSearches(prev => [searchTerm, ...prev.slice(0, 3)]);
    }
    // Here you would typically navigate to search results or filter the dashboard
    console.log('Searching for:', searchTerm);
    onClose();
  };

  const clearSearch = () => {
    setQuery('');
    setResults({ employees: [], departments: [], metrics: [] });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20 p-4">
      <div className={`max-w-2xl w-full rounded-xl shadow-2xl ${
        darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
      } border overflow-hidden`}>
        {/* Search Input */}
        <div className={`flex items-center p-4 border-b ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <FiSearch className={`h-5 w-5 mr-3 ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search employees, departments, metrics..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearchSubmit(query)}
            className={`flex-1 bg-transparent outline-none text-lg ${
              darkMode ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'
            }`}
          />
          {query && (
            <button
              onClick={clearSearch}
              className={`p-1 rounded-lg transition-colors ${
                darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FiX className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className={`ml-2 p-1 rounded-lg transition-colors ${
              darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        {/* Search Results */}
        <div className="max-h-96 overflow-y-auto">
          {query.length === 0 ? (
            // Recent Searches
            <div className="p-4">
              <h3 className={`text-sm font-medium mb-3 flex items-center ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <FiClock className="h-4 w-4 mr-2" />
                Recent Searches
              </h3>
              <div className="space-y-2">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setQuery(search);
                      handleSearchSubmit(search);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      darkMode 
                        ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {/* Employees Results */}
              {results.employees.length > 0 && (
                <div className="p-4">
                  <h3 className={`text-sm font-medium mb-3 flex items-center ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <FiUser className="h-4 w-4 mr-2" />
                    Employees ({results.employees.length})
                  </h3>
                  <div className="space-y-2">
                    {results.employees.map((employee, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearchSubmit(employee.respondent)}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          darkMode 
                            ? 'hover:bg-gray-800' 
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className={`font-medium ${
                              darkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                              {employee.respondent}
                            </p>
                            <p className={`text-sm ${
                              darkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              {employee.role} • {employee.department}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className={`text-sm font-medium ${
                              employee.performanceScore >= 8 ? 'text-green-500' :
                              employee.performanceScore >= 7 ? 'text-yellow-500' : 'text-red-500'
                            }`}>
                              Performance: {employee.performanceScore}
                            </div>
                            <div className={`text-xs ${
                              darkMode ? 'text-gray-500' : 'text-gray-400'
                            }`}>
                              ${employee.salary.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Departments Results */}
              {results.departments.length > 0 && (
                <div className="p-4">
                  <h3 className={`text-sm font-medium mb-3 flex items-center ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <FiUsers className="h-4 w-4 mr-2" />
                    Departments ({results.departments.length})
                  </h3>
                  <div className="space-y-2">
                    {results.departments.map((department, index) => {
                      const deptEmployees = data.filter(emp => emp.department === department);
                      const avgPerformance = (deptEmployees.reduce((sum, emp) => sum + emp.performanceScore, 0) / deptEmployees.length).toFixed(1);
                      
                      return (
                        <button
                          key={index}
                          onClick={() => handleSearchSubmit(department)}
                          className={`w-full text-left p-3 rounded-lg transition-colors ${
                            darkMode 
                              ? 'hover:bg-gray-800' 
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className={`font-medium ${
                                darkMode ? 'text-white' : 'text-gray-900'
                              }`}>
                                {department}
                              </p>
                              <p className={`text-sm ${
                                darkMode ? 'text-gray-400' : 'text-gray-600'
                              }`}>
                                {deptEmployees.length} employees
                              </p>
                            </div>
                            <div className="text-right">
                              <div className={`text-sm font-medium ${
                                avgPerformance >= 8 ? 'text-green-500' :
                                avgPerformance >= 7 ? 'text-yellow-500' : 'text-red-500'
                              }`}>
                                Avg Performance: {avgPerformance}
                              </div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Metrics Results */}
              {results.metrics.length > 0 && (
                <div className="p-4">
                  <h3 className={`text-sm font-medium mb-3 flex items-center ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <FiBarChart className="h-4 w-4 mr-2" />
                    Metrics & KPIs ({results.metrics.length})
                  </h3>
                  <div className="space-y-2">
                    {results.metrics.map((metric, index) => {
                      const Icon = metric.icon;
                      return (
                        <button
                          key={index}
                          onClick={() => handleSearchSubmit(metric.name)}
                          className={`w-full text-left p-3 rounded-lg transition-colors ${
                            darkMode 
                              ? 'hover:bg-gray-800' 
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <Icon className={`h-5 w-5 ${
                              darkMode ? 'text-blue-400' : 'text-blue-500'
                            }`} />
                            <div>
                              <p className={`font-medium ${
                                darkMode ? 'text-white' : 'text-gray-900'
                              }`}>
                                {metric.name}
                              </p>
                              <p className={`text-sm ${
                                darkMode ? 'text-gray-400' : 'text-gray-600'
                              }`}>
                                {metric.description}
                              </p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* No Results */}
              {query.length > 0 && results.employees.length === 0 && results.departments.length === 0 && results.metrics.length === 0 && (
                <div className="p-8 text-center">
                  <FiSearch className={`h-8 w-8 mx-auto mb-3 ${
                    darkMode ? 'text-gray-600' : 'text-gray-400'
                  }`} />
                  <p className={`text-lg font-medium ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    No results found
                  </p>
                  <p className={`text-sm ${
                    darkMode ? 'text-gray-500' : 'text-gray-500'
                  }`}>
                    Try searching for employees, departments, or metrics
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className={`p-4 border-t ${
          darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
        }`}>
          <div className="flex items-center justify-between text-xs">
            <div className={`flex items-center space-x-4 ${
              darkMode ? 'text-gray-500' : 'text-gray-400'
            }`}>
              <span>↑↓ to navigate</span>
              <span>↵ to select</span>
              <span>esc to close</span>
            </div>
            <div className={`${
              darkMode ? 'text-gray-500' : 'text-gray-400'
            }`}>
              Advanced search coming soon
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
