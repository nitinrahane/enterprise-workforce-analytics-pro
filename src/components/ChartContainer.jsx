import React from 'react';

const ChartContainer = ({ title, children, darkMode }) => (
  <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-6 shadow-sm`}>
    <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
      {title}
    </h3>
    {children}
  </div>
);

export default ChartContainer;
