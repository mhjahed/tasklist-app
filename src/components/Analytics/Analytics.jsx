import React, { useState } from 'react';
import PeriodSelector from './PeriodSelector';
import ChartCanvas from './ChartCanvas';
import './Analytics.css';

const Analytics = ({ tasks }) => {
  const [period, setPeriod] = useState('week');

  return (
    <div className="analytics-container">
      <h2 className="section-title">📊 Analytics & Progress</h2>
      <PeriodSelector period={period} onPeriodChange={setPeriod} />
      <ChartCanvas tasks={tasks} period={period} />
    </div>
  );
};

export default Analytics;