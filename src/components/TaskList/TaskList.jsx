import React, { useState, useMemo } from 'react';
import TaskCard from './TaskCard';
import TaskFilters from './TaskFilters';
import { filterTasksByPeriod, filterTasksByStatus, sortTasks, getTaskStats } from '../../utils/taskHelpers';
import './TaskList.css';

const TaskList = ({ tasks, onToggleComplete, onDelete, onUpdate, onClearCompleted }) => {
  const [periodFilter, setPeriodFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const filteredTasks = useMemo(() => {
    let filtered = tasks;
    
    // Filter by period
    if (periodFilter !== 'all') {
      filtered = filterTasksByPeriod(filtered, periodFilter);
    }
    
    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filterTasksByStatus(filtered, statusFilter);
    }
    
    // Sort tasks
    filtered = sortTasks(filtered, sortBy);
    
    return filtered;
  }, [tasks, periodFilter, statusFilter, sortBy]);

  const stats = useMemo(() => getTaskStats(tasks), [tasks]);

  return (
    <div className="task-list-container">
      <div className="task-list-header">
        <h2 className="section-title">📝 Your Tasks</h2>
        <div className="task-stats">
          <div className="stat-item">
            <span className="stat-value">{stats.total}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat-item">
            <span className="stat-value" style={{ color: 'var(--success)' }}>{stats.completed}</span>
            <span className="stat-label">Completed</span>
          </div>
          <div className="stat-item">
            <span className="stat-value" style={{ color: 'var(--warning)' }}>{stats.pending}</span>
            <span className="stat-label">Pending</span>
          </div>
          <div className="stat-item">
            <span className="stat-value" style={{ color: 'var(--accent-primary)' }}>{stats.completionRate}%</span>
            <span className="stat-label">Completion</span>
          </div>
        </div>
      </div>

      <TaskFilters
        periodFilter={periodFilter}
        statusFilter={statusFilter}
        sortBy={sortBy}
        onPeriodChange={setPeriodFilter}
        onStatusChange={setStatusFilter}
        onSortChange={setSortBy}
      />

      {tasks.length > 0 && stats.completed > 0 && (
        <button className="btn-clear-completed no-print" onClick={onClearCompleted}>
          🗑️ Clear Completed Tasks
        </button>
      )}

      {filteredTasks.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <h3>No tasks found</h3>
          <p>
            {tasks.length === 0 
              ? "Add your first task to get started!" 
              : "Try adjusting your filters"}
          </p>
        </div>
      ) : (
        <div className="task-grid">
          {filteredTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleComplete={onToggleComplete}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;