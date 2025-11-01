export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const isToday = (date) => {
  const today = new Date();
  const taskDate = new Date(date);
  return taskDate.toDateString() === today.toDateString();
};

export const isThisWeek = (date) => {
  const now = new Date();
  const taskDate = new Date(date);
  const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
  const weekEnd = new Date(now.setDate(now.getDate() - now.getDay() + 6));
  
  return taskDate >= weekStart && taskDate <= weekEnd;
};

export const isThisMonth = (date) => {
  const now = new Date();
  const taskDate = new Date(date);
  return taskDate.getMonth() === now.getMonth() && 
         taskDate.getFullYear() === now.getFullYear();
};

export const getWeekDays = () => {
  const days = [];
  const today = new Date();
  const currentDay = today.getDay();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - currentDay);

  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    days.push(day);
  }
  return days;
};

export const getMonthDays = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  return Array.from({ length: daysInMonth }, (_, i) => 
    new Date(year, month, i + 1)
  );
};