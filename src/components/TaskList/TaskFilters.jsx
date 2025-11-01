import React from 'react';
import './TaskFilters.css';

const TaskFilters = ({ 
  periodFilter, 
  statusFilter, 
  sortBy,
  onPeriodChange, 
  onStatusChange,
  onSortChange 
}) => {
  return (
    <div className="task-filters">
      <div className="filter-group">
        <label>Period:</label>
        <div className="btn-group">
          <button
            className={`filter-btn ${periodFilter === 'all' ? 'active' : ''}`}
            onClick={() => onPeriodChange('all')}
          >
            All
          </button>
          <button
            className={`filter-btn ${periodFilter === 'day' ? 'active' : ''}`}
            onClick={() => onPeriodChange('day')}
          >
            Today
          </button>
          <button
            className={`filter-btn ${periodFilter === 'week' ? 'active' : ''}`}
            onClick={() => onPeriodChange('week')}
          >
            This Week
          </button>
          <button
            className={`filter-btn ${periodFilter === 'month' ? 'active' : ''}`}
            onClick={() => onPeriodChange('month')}
          >
            This Month
          </button>
        </div>
      </div>

      <div className="filter-group">
        <label>Status:</label>
        <div className="btn-group">
          <button
            className={`filter-btn ${statusFilter === 'all' ? 'active' : ''}`}
            onClick={() => onStatusChange('all')}
          >
            All
          </button>
          <button
            className={`filter-btn ${statusFilter === 'pending' ? 'active' : ''}`}
            onClick={() => onStatusChange('pending')}
          >
            Pending
          </button>
          <button
            className={`filter-btn ${statusFilter === 'completed' ? 'active' : ''}`}
            onClick={() => onStatusChange('completed')}
          >
            Completed
          </button>
        </div>
      </div>

      <div className="filter-group">
        <label>Sort by:</label>
        <select 
          className="sort-select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="date">Date</option>
          <option value="priority">Priority</option>
          <option value="name">Name</option>
        </select>
      </div>
    </div>
  );
};

export default TaskFilters;