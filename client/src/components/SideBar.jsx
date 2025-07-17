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
} from 'react-icons/fa';
import styles from './Sidebar.module.css';

const SideBar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
  const [activeMainMenu, setActiveMainMenu] = useState(null); // 👈 New state

  useEffect(() => {
    const loggedInUser = {
      name: 'John Doe',
      role: 'Manager',
      initials: 'JD',
    };
    setUser(loggedInUser);
  }, []);

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
      name: 'Campaign Management',
      icon: <FaBullhorn />,
      submenu: [{ name: 'Campaign', path: '/campaigns' }],
    },
    {
      name: 'Buyer Management',
      icon: <FaUsers />,
      submenu: [
        { name: 'Buyer', path: '/agents' },
        { name: 'Rule Configuration', path: '/agents' },
      ],
    },
    {
      name: 'Call Routing',
      icon: <FaRandom />,
      submenu: [
        { name: 'Call Routing Rules', path: '/calllogs' },
        { name: 'Smart Routing', path: '/CallLogs' },
        { name: 'Call Routing History', path: '/CallLogs' },
        { name: 'Notifications & Alerts', path: '/CallLogs' },
      ],
    },
    {
      name: 'Billing',
      icon: <FaMoneyBill />,
      submenu: [
        { name: 'Billing Logic', path: '/forms' },
        { name: 'Billing Reports', path: '/forms' },
      ],
    },
    {
      name: 'Call Handling',
      icon: <FaPhone />,
      submenu: [
        { name: 'Call Recording Settings', path: '/leads' },
        // { name: 'IVR Configuration (Optional)', path: '/leads' },
      ],
    },
  ];

  const isSubmenuActive = (submenu) =>
    submenu?.some((subItem) => location.pathname === subItem.path);

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
            const isActiveSubmenu = isSubmenuActive(item.submenu);
            const isActiveParent = activeMainMenu === item.name || isActiveSubmenu;

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
                      setActiveMainMenu(null);
                    }}
                  >
                    <div className={styles.navIconWrapper}>{item.icon}</div>
                    <span>{item.name}</span>
                  </NavLink>
                ) : (
                  <>
                    <div
                      className={`${styles.navLink} ${
                        isActiveParent ? styles.active : ''
                      }`}
                      onClick={() => {
                        const isOpening = openMenu !== item.name;
                        setOpenMenu(isOpening ? item.name : null);
                        setActiveMainMenu(isOpening ? item.name : null);
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