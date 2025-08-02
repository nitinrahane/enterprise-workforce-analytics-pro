import React from 'react';
import { 
  FiTrendingUp, 
  FiTrendingDown, 
  FiMinus 
} from 'react-icons/fi';

const KPICard = ({ 
  title, 
  value, 
  subtitle, 
  trend, 
  trendValue, 
  icon: Icon, 
  color, 
  darkMode,
  formatter = (val) => val 
}) => {
  const getTrendIcon = () => {
    if (trend > 0) return <FiTrendingUp className="h-3 w-3" />;
    if (trend < 0) return <FiTrendingDown className="h-3 w-3" />;
    return <FiMinus className="h-3 w-3" />;
  };

  const getTrendColor = () => {
    if (trend > 0) return 'text-green-500';
    if (trend < 0) return 'text-red-500';
    return 'text-gray-500';
  };

  return (
    <div className={`${
      darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    } rounded-xl border p-4 sm:p-6 shadow-sm transition-all duration-200 hover:shadow-md`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Icon className={`h-4 w-4 ${color}`} />
            <p className={`text-xs sm:text-sm font-medium ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {title}
            </p>
          </div>
          <p className={`text-xl sm:text-3xl font-bold ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {formatter(value)}
          </p>
          {subtitle && (
            <p className={`text-xs ${
              darkMode ? 'text-gray-500' : 'text-gray-500'
            } mt-1`}>
              {subtitle}
            </p>
          )}
          {trendValue && (
            <div className={`flex items-center gap-1 mt-2 ${getTrendColor()}`}>
              {getTrendIcon()}
              <span className="text-xs font-medium">
                {Math.abs(trendValue)}% from last period
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KPICard;
