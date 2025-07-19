import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, Link, useLocation } from 'react-router-dom';
import { IconContext } from 'react-icons';
import {
  FaTachometerAlt,
  FaBullhorn,
  FaUsers,
  FaCogs,
  FaRandom,
  FaHistory,
  FaBell,
  FaMoneyBill,
  FaChartBar,
  FaPhone,
  FaHeadset,
  FaSignOutAlt,
  FaUserCircle,
  FaHashtag, // for Numbers menu
} from 'react-icons/fa';
import styles from './Sidebar.module.css';

const SideBar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
  const [activeMainMenu, setActiveMainMenu] = useState(null);

  useEffect(() => {
    const loggedInUser = {
      name: 'John Doe',
      role: 'Manager',
      initials: 'JD',
    };
    setUser(loggedInUser);
  }, []);

  useEffect(() => {
    const currentPath = location.pathname;

    for (let item of navStructure) {
      if (item.submenu) {
        if (item.submenu.some((sub) => sub.path === currentPath)) {
          setActiveMainMenu(item.name);
          setOpenMenu(item.name);
          return;
        }
      } else if (item.path === currentPath) {
        setActiveMainMenu(item.name);
        setOpenMenu(null);
        return;
      }
    }

    setActiveMainMenu(null);
    setOpenMenu(null);
  }, [location.pathname]);

  const handleLogout = () => {
    navigate('/login');
  };

  const navStructure = [
    {
      name: 'Dashboard',
      path: '/',
      icon: <FaTachometerAlt />,
    },
    {
      name: 'Campaign',
      path: '/campaigns',
      icon: <FaBullhorn />,
    },
    {
      name: 'Buyer Management',
      icon: <FaUsers />,
      submenu: [
        { name: 'Buyer', path: '/agents' },
        { name: 'Buyer Activities', path: '/buyer-activities' },
      ],
    },
    {
      name: 'Numbers',
      icon: <FaHashtag />,
      submenu: [
        { name: 'Active', path: '/forms' },
        { name: 'Released', path: '/Leads' },
      ],
    },
    {
      name: 'Call Routing',
      icon: <FaRandom />,
      submenu: [
        { name: 'Routing Rules', path: '/forms' },
        { name: 'Routing History', path: '/Leads' },
        { name: 'Notifications', path: '/Leads' },
      ],
    },
    {
      name: 'Billing',
      icon: <FaMoneyBill />,
      submenu: [
        { name: 'Billing Logic', path: '/billing-logic' },
        { name: 'Billing Reports', path: '/billing-reports' },
      ],
    },
    {
      name: 'Call Handling',
      icon: <FaPhone />,
      submenu: [
        { name: 'Call Logs', path: '/call-logs' },
      ],
    },
    {
      name: 'Profile',
      path: '/profile',
      icon: <FaUserCircle />,
    },
  ];

  return (
    <div className={`${styles.sidebarContainer} ${!isOpen ? styles.hidden : ''}`}>
      <div className={styles.backgroundGlyphs}>
        <span>◐</span>
        <span>◑</span>
        <span>◒</span>
      </div>

      <div className={styles.sidebarHeader}>
        <Link to="/">
          <img
            src="/assets/images/logo-main1.png"
            alt="CallTrack Logo"
            className={styles.logoImage}
          />
        </Link>
      </div>

      <IconContext.Provider value={{ className: styles.navIcon }}>
        <ul className={styles.sidebarNav}>
          {navStructure.map((item) => {
            const isActiveParent = activeMainMenu === item.name;

            return (
              <li key={item.name} className={styles.navItem}>
                {!item.submenu ? (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
                    }
                    onClick={() => {
                      setOpenMenu(null);
                      setActiveMainMenu(item.name);
                    }}
                  >
                    <div className={styles.navIconWrapper}>{item.icon}</div>
                    <span>{item.name}</span>
                  </NavLink>
                ) : (
                  <>
                    <div
                      className={`${styles.navLink} ${isActiveParent ? styles.active : ''}`}
                      onClick={() => {
                        const isOpening = openMenu !== item.name;
                        setOpenMenu(isOpening ? item.name : null);
                        setActiveMainMenu(item.name);
                      }}
                    >
                      <div className={styles.navIconWrapper}>{item.icon}</div>
                      <span>{item.name}</span>
                    </div>
                    {openMenu === item.name && (
                      <ul className={styles.submenuList}>
                        {item.submenu.map((subItem) => (
                          <li key={subItem.name}>
                            <NavLink
                              to={subItem.path}
                              className={({ isActive }) =>
                                isActive
                                  ? `${styles.submenuLink} ${styles.active}`
                                  : styles.submenuLink
                              }
                              onClick={() => {
                                setActiveMainMenu(item.name);
                              }}
                            >
                              {subItem.name}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </li>
            );
          })}
        </ul>
      </IconContext.Provider>

      {user && (
        <div className={styles.userSection}>
          <div className={styles.profileInfo}>
            <div className={styles.profileAvatar}>{user.initials}</div>
            <div>
              <span className={styles.profileName}>{user.name}</span>
              <span className={styles.profileRole}>{user.role}</span>
            </div>
          </div>
          <button onClick={handleLogout} className={styles.logoutButton}>
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default SideBar;
