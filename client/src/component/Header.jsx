import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';
import "../App.css";


const Header = ({ searchTerm, setSearchTerm }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className="header-container">
      <div className="animated-bg"></div>
      <div className="header-content">
        <h1 className="header-title">Student Database</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <button onClick={toggleTheme} className="theme-toggle">
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </header>
  );
};

export default Header;
