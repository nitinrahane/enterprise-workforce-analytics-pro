import React from 'react';
import { 
  ComposedChart, 
  Bar, 
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';

const AdvancedChart = ({ 
  data, 
  title, 
  darkMode, 
  type = 'composed',
  primaryKey,
  secondaryKey,
  primaryName,
  secondaryName,
  primaryColor = '#3B82F6',
  secondaryColor = '#10B981'
}) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={`p-3 rounded-lg shadow-lg border ${
          darkMode 
            ? 'bg-gray-800 border-gray-600 text-white' 
            : 'bg-white border-gray-200 text-gray-900'
        }`}>
          <p className="font-medium mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {`${entry.name}: ${typeof entry.value === 'number' ? entry.value.toFixed(1) : entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

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
          <ComposedChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
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
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar 
              dataKey={primaryKey} 
              fill={primaryColor} 
              name={primaryName}
              radius={[4, 4, 0, 0]}
            />
            <Area 
              type="monotone" 
              dataKey={secondaryKey} 
              fill={secondaryColor + '20'}
              stroke={secondaryColor}
              strokeWidth={2}
              name={secondaryName}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdvancedChart;
