import React, { useEffect, useRef } from 'react';
import { drawBarChart, drawLineChart, drawPieChart } from '../../utils/chartHelpers';
import { filterTasksByPeriod, getTaskStats } from '../../utils/taskHelpers';
import { getWeekDays, getMonthDays } from '../../utils/dateHelpers';
import './ChartCanvas.css';

const ChartCanvas = ({ tasks, period }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    const chartOptions = {
      backgroundColor: isDark ? '#1e293b' : '#f3f4f6',
      textColor: isDark ? '#f1f5f9' : '#1f2937',
      barColor: isDark ? '#60a5fa' : '#3b82f6'
    };

    if (period === 'day') {
      drawDailyChart(canvas, tasks, chartOptions);
    } else if (period === 'week') {
      drawWeeklyChart(canvas, tasks, chartOptions);
    } else if (period === 'month') {
      drawMonthlyChart(canvas, tasks, chartOptions);
    }
  }, [tasks, period]);

  const drawDailyChart = (canvas, tasks, options) => {
    const todayTasks = filterTasksByPeriod(tasks, 'day');
    const stats = getTaskStats(todayTasks);

    const data = [
      { label: 'Total', value: stats.total },
      { label: 'Completed', value: stats.completed },
      { label: 'Pending', value: stats.pending }
    ];

    drawBarChart(canvas, data, options);
  };

  const drawWeeklyChart = (canvas, tasks, options) => {
    const weekDays = getWeekDays();
    const data = weekDays.map(day => {
      const dayTasks = tasks.filter(task => {
        const taskDate = new Date(task.date);
        return taskDate.toDateString() === day.toDateString();
      });
      
      return {
        label: day.toLocaleDateString('en-US', { weekday: 'short' }),
        value: dayTasks.filter(t => t.completed).length
      };
    });

    drawLineChart(canvas, data, options);
  };

  const drawMonthlyChart = (canvas, tasks, options) => {
    const categories = {};
    
    tasks.forEach(task => {
      if (!categories[task.category]) {
        categories[task.category] = 0;
      }
      if (task.completed) {
        categories[task.category]++;
      }
    });

    const data = Object.entries(categories).map(([label, value]) => ({
      label: label.charAt(0).toUpperCase() + label.slice(1),
      value
    }));

    if (data.length > 0) {
      drawPieChart(canvas, data, options);
    }
  };

  return (
    <div className="chart-container">
      <canvas
        ref={canvasRef}
        width={800}
        height={400}
        className="chart-canvas"
      />
    </div>
  );
};

export default ChartCanvas;