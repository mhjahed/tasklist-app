import { isToday, isThisWeek, isThisMonth } from './dateHelpers';

export const filterTasksByPeriod = (tasks, period) => {
  switch (period) {
    case 'day':
      return tasks.filter(task => isToday(task.date));
    case 'week':
      return tasks.filter(task => isThisWeek(task.date));
    case 'month':
      return tasks.filter(task => isThisMonth(task.date));
    default:
      return tasks;
  }
};

export const filterTasksByStatus = (tasks, status) => {
  switch (status) {
    case 'completed':
      return tasks.filter(task => task.completed);
    case 'pending':
      return tasks.filter(task => !task.completed);
    default:
      return tasks;
  }
};

export const sortTasks = (tasks, sortBy) => {
  const sorted = [...tasks];
  
  switch (sortBy) {
    case 'date':
      return sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
    case 'priority':
      const priorityOrder = { high: 1, medium: 2, low: 3 };
      return sorted.sort((a, b) => 
        (priorityOrder[a.priority] || 4) - (priorityOrder[b.priority] || 4)
      );
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return sorted;
  }
};

export const getTaskStats = (tasks) => {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  return { total, completed, pending, completionRate };
};