import React from 'react';

const DataTable = ({ 
  data, 
  columns, 
  title, 
  darkMode, 
  maxRows = 10,
  sortable = true 
}) => {
  const [sortConfig, setSortConfig] = React.useState({ key: null, direction: 'asc' });

  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return data.slice(0, maxRows);
    
    return [...data]
      .sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];
        
        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
        }
        
        return sortConfig.direction === 'asc' 
          ? String(aVal).localeCompare(String(bVal))
          : String(bVal).localeCompare(String(aVal));
      })
      .slice(0, maxRows);
  }, [data, sortConfig, maxRows]);

  const handleSort = (key) => {
    if (!sortable) return;
    
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  return (
    <div className={`${
      darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    } rounded-xl border shadow-sm overflow-hidden`}>
      <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className={`text-base sm:text-lg font-semibold ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          {title}
        </h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    darkMode ? 'text-gray-300' : 'text-gray-500'
                  } ${sortable ? 'cursor-pointer hover:bg-gray-600' : ''}`}
                  onClick={() => handleSort(column.key)}
                >
                  <div className="flex items-center gap-1">
                    {column.label}
                    {sortable && sortConfig.key === column.key && (
                      <span className="text-xs">
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
            {sortedData.map((row, index) => (
              <tr 
                key={index}
                className={`${
                  darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                } transition-colors duration-150`}
              >
                {columns.map((column) => (
                  <td 
                    key={column.key}
                    className={`px-4 py-3 text-sm ${
                      darkMode ? 'text-gray-300' : 'text-gray-900'
                    }`}
                  >
                    {column.formatter 
                      ? column.formatter(row[column.key], row)
                      : row[column.key]
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {data.length > maxRows && (
        <div className={`px-4 py-3 border-t ${
          darkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'
        } text-sm text-center`}>
          Showing {Math.min(maxRows, data.length)} of {data.length} entries
        </div>
      )}
    </div>
  );
};

export default DataTable;
