import React from 'react';
import './ThemeToggle.css';

const ThemeToggle = ({ theme, onToggle }) => {
  return (
    <button 
      className="theme-toggle" 
      onClick={onToggle}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <span className="icon">🌙</span>
      ) : (
        <span className="icon">☀️</span>
      )}
    </button>
  );
};

export default ThemeToggle;