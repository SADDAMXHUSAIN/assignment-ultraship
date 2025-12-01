import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './HorizontalMenu.css';

const HorizontalMenu = () => {
  const location = useLocation();
  
  const menuItems = [
    { title: 'Grid View', path: '/' },
    { title: 'Tile View', path: '/tile' },
    { title: 'Reports', path: '/reports' },
    { title: 'Settings', path: '/settings' },
  ];

  return (
    <nav className="horizontal-menu">
      <ul className="horizontal-menu-list">
        {menuItems.map((item, index) => (
          <li key={index} className="horizontal-menu-item">
            <Link
              to={item.path}
              className={`horizontal-menu-link ${
                location.pathname === item.path ? 'active' : ''
              }`}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default HorizontalMenu;

