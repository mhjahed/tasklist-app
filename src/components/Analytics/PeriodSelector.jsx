import React from 'react';
import './PeriodSelector.css';

const PeriodSelector = ({ period, onPeriodChange }) => {
  return (
    <div className="period-selector">
      <button
        className={`period-btn ${period === 'day' ? 'active' : ''}`}
        onClick={() => onPeriodChange('day')}
      >
        📅 Daily
      </button>
      <button
        className={`period-btn ${period === 'week' ? 'active' : ''}`}
        onClick={() => onPeriodChange('week')}
      >
        📊 Weekly
      </button>
      <button
        className={`period-btn ${period === 'month' ? 'active' : ''}`}
        onClick={() => onPeriodChange('month')}
      >
        📈 Monthly
      </button>
    </div>
  );
};

export default PeriodSelector;