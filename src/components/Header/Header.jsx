import React from 'react';
import ThemeToggle from './ThemeToggle';
import './Header.css';

const Header = ({ theme, onToggleTheme, onPrint }) => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <h1 className="app-title">
            📋 TaskMaster
          </h1>
          <p className="app-subtitle">Modern Task & Accomplishment Tracker</p>
        </div>
        
        <div className="header-right">
          <button className="btn-print no-print" onClick={onPrint}>
            🖨️ Print
          </button>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
      </div>
    </header>
  );
};

export default Header;