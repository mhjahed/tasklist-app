import React, { useEffect } from 'react';
import Header from './components/Header/Header';
import TaskForm from './components/TaskInput/TaskForm';
import TaskList from './components/TaskList/TaskList';
import Analytics from './components/Analytics/Analytics';
import Footer from './components/Footer/Footer';
import { useTheme } from './hooks/useTheme';
import { useTasks } from './hooks/useTasks';
import './App.css';
import './styles/global.css';
import './styles/theme.css';
import './styles/print.css';

function App() {
  const { theme, toggleTheme } = useTheme();
  const {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleComplete,
    clearCompleted
  } = useTasks();

  const handlePrint = () => {
    // Add print date to header
    const printDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    
    const headerElement = document.querySelector('.header');
    if (headerElement) {
      headerElement.setAttribute('data-print-date', printDate);
    }

    // Open print dialog
    setTimeout(() => {
      window.print();
    }, 100);
  };

  // Listen for keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Ctrl/Cmd + P for print
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        handlePrint();
      }
      
      // Ctrl/Cmd + K to focus task input
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const taskInput = document.querySelector('#name');
        if (taskInput) {
          taskInput.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const completedCount = tasks.filter(task => task.completed).length;

  return (
    <div className="app">
      <Header 
        theme={theme} 
        onToggleTheme={toggleTheme}
        onPrint={handlePrint}
      />
      
      <main className="main-content">
        <div className="container">
          <TaskForm onAddTask={addTask} />
          
          <TaskList
            tasks={tasks}
            onToggleComplete={toggleComplete}
            onDelete={deleteTask}
            onUpdate={updateTask}
            onClearCompleted={clearCompleted}
          />
          
          {tasks.length > 0 && (
            <Analytics tasks={tasks} />
          )}
        </div>
      </main>

      <Footer 
        taskCount={tasks.length}
        completedCount={completedCount}
      />
    </div>
  );
}

export default App;