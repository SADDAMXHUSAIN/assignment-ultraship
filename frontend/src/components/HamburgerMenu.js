import React from 'react';
import { Link } from 'react-router-dom';
import './HamburgerMenu.css';

const HamburgerMenu = ({ isOpen, onClose }) => {
  const menuItems = [
    {
      title: 'Dashboard',
      path: '/',
      submenu: [
        { title: 'Overview', path: '/' },
        { title: 'Analytics', path: '/analytics' },
      ],
    },
    {
      title: 'Employees',
      path: '/',
      submenu: [
        { title: 'Grid View', path: '/' },
        { title: 'Tile View', path: '/tile' },
        { title: 'Add Employee', path: '/add-employee' },
      ],
    },
    {
      title: 'Reports',
      path: '/reports',
      submenu: [
        { title: 'Attendance', path: '/reports/attendance' },
        { title: 'Performance', path: '/reports/performance' },
      ],
    },
    {
      title: 'Settings',
      path: '/settings',
    },
    {
      title: 'Help',
      path: '/help',
    },
  ];

  return (
    <>
      {isOpen && <div className="menu-overlay" onClick={onClose} />}
      <nav className={`hamburger-menu ${isOpen ? 'open' : ''}`}>
        <div className="menu-header">
          <h2>Menu</h2>
        </div>
        <ul className="menu-list">
          {menuItems.map((item, index) => (
            <li key={index} className="menu-item">
              <Link
                to={item.path}
                className="menu-link"
                onClick={onClose}
              >
                {item.title}
              </Link>
              {item.submenu && (
                <ul className="submenu">
                  {item.submenu.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <Link
                        to={subItem.path}
                        className="submenu-link"
                        onClick={onClose}
                      >
                        {subItem.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default HamburgerMenu;

