import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import HamburgerMenu from './HamburgerMenu';
import HorizontalMenu from './HorizontalMenu';
import './Layout.css';

const Layout = () => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(() => {
    // Set to true by default on desktop screens
    return window.innerWidth >= 768;
  });
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const prevWidthRef = useRef(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      const prevWidth = prevWidthRef.current;
      const wasDesktop = prevWidth >= 768;
      const isDesktop = currentWidth >= 768;

      // Only adjust if crossing the 768px threshold
      if (wasDesktop !== isDesktop) {
        setIsHamburgerOpen(isDesktop);
      }

      prevWidthRef.current = currentWidth;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="layout">
      <header className="header">
        <div className="header-content">
          <div className="header-left">
            <button
              className="hamburger-toggle"
              onClick={() => setIsHamburgerOpen(!isHamburgerOpen)}
              aria-label="Toggle menu"
            >
              <span className={`hamburger-icon ${isHamburgerOpen ? 'open' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
            <h1 className="logo">Ultraship</h1>
          </div>
          <div className="header-right">
            {token && (
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        </div>
        <HorizontalMenu />
      </header>

      <div className={`layout-body ${isHamburgerOpen ? 'menu-open' : ''}`}>
        <HamburgerMenu isOpen={isHamburgerOpen} onClose={() => setIsHamburgerOpen(false)} />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;

