import React from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Legend
} from 'recharts';

const PerformanceRadar = ({ data, title, darkMode }) => {
  return (
    <div className={`${
      darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    } rounded-xl border p-4 sm:p-6 shadow-sm`}>
      <h3 className={`text-base sm:text-lg font-semibold ${
        darkMode ? 'text-white' : 'text-gray-900'
      } mb-4`}>
        {title}
      </h3>
      <div className="h-64 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid stroke={darkMode ? '#374151' : '#E5E7EB'} />
            <PolarAngleAxis 
              dataKey="metric" 
              tick={{ 
                fill: darkMode ? '#9CA3AF' : '#6B7280',
                fontSize: 12 
              }}
            />
            <PolarRadiusAxis 
              angle={0} 
              domain={[0, 10]}
              tick={{ 
                fill: darkMode ? '#9CA3AF' : '#6B7280',
                fontSize: 10 
              }}
            />
            <Radar
              name="Score"
              dataKey="value"
              stroke="#3B82F6"
              fill="#3B82F6"
              fillOpacity={0.3}
              strokeWidth={2}
            />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceRadar;
