import React from 'react';
import '../styles/Header.css';

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <div className="logo-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17l10 5 10-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12l10 5 10-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="logo-text">BeyondChats</span>
          </div>
          
          <nav className="nav">
            <a href="#articles" className="nav-link active">Articles</a>
            <a href="#about" className="nav-link">About</a>
            <a href="https://beyondchats.com" target="_blank" rel="noopener noreferrer" className="nav-link">
              Visit Site
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
