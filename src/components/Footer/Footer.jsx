import React from 'react';
import './Footer.css';

const Footer = ({ taskCount, completedCount }) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-stats">
          <p>
            <strong>{taskCount}</strong> total tasks • 
            <strong> {completedCount}</strong> completed
          </p>
        </div>
        <div className="footer-info">
          <p>© {currentYear} TaskMaster • Built with React</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;