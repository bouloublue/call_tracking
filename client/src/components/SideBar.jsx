import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, Link, useLocation } from 'react-router-dom';
import { IconContext } from 'react-icons';
import {
  FaTachometerAlt,
  FaBullhorn,
  FaUsers,
  FaRandom,
  FaMoneyBill,
  FaPhone,
  FaUserCircle,
  FaHashtag,
  FaSignOutAlt,
  FaChevronDown,
  FaChevronRight,
  FaUserTie,
  FaUserCheck,
  FaMobileAlt,
  FaTrashRestore,
  FaRoute,
  FaClock,
  FaRegBell,
  FaCalculator,
  FaChartLine,
  FaPhoneAlt,
  FaMicrophone
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
      name: 'Admin User',
      role: 'Admin',
      initials: 'AU',
    };
    setUser(loggedInUser);
  }, []);

  useEffect(() => {
    const currentPath = location.pathname;
    let foundActiveMenu = null;

    for (let item of navStructure) {
      if (item.submenu) {
        const activeSubItem = item.submenu.find(sub => currentPath.startsWith(sub.path));
        if (activeSubItem) {
          foundActiveMenu = item.name;
          setOpenMenu(item.name);
          break;
        }
      } else if (currentPath === item.path) {
        foundActiveMenu = item.name;
        break;
      }
    }

    setActiveMainMenu(foundActiveMenu);
  }, [location.pathname]);

  const handleLogout = () => {
    navigate('/login');
    localStorage.removeItem('auth');
    setUser(null);
  };

  const toggleSubmenu = (menuName) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
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
        { name: 'Buyers', path: '/agents', icon: <FaUserTie /> },
        { name: 'Buyer Activities', path: '/buyer-activities', icon: <FaUserCheck /> },
      ],
    },
    {
      name: 'Numbers',
      icon: <FaHashtag />,
      submenu: [
<<<<<<< HEAD
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
=======
        { name: 'Active Numbers', path: '/numbers/active-numbers', icon: <FaMobileAlt /> },
        { name: 'Released Numbers', path: '/numbers/released', icon: <FaTrashRestore /> },
>>>>>>> 565cd98ce4ab139f6446e19b17fbd13898858087
      ],
    },
    // {
    //   name: 'Call Routing',
    //   icon: <FaRandom />,
    //   submenu: [
    //     { name: 'Routing Rules', path: '/calllogs', icon: <FaRoute /> },
    //     { name: 'Routing History', path: '/CallLogs', icon: <FaClock /> },
    //     { name: 'Notifications', path: '/CallLogs', icon: <FaRegBell /> },
    //   ],
    // },
    {
      name: 'Billing',
      icon: <FaMoneyBill />,
      submenu: [
<<<<<<< HEAD
        { name: 'Billing Logic', path: '/billing-logic' },
        { name: 'Billing Reports', path: '/billing-reports' },
=======
        { name: 'Billing Logic', path: '/forms', icon: <FaCalculator /> },
        { name: 'Billing Reports', path: '/forms', icon: <FaChartLine /> },
>>>>>>> 565cd98ce4ab139f6446e19b17fbd13898858087
      ],
    },
    {
      name: 'Call Handling',
      icon: <FaPhone />,
      submenu: [
<<<<<<< HEAD
        { name: 'Call Logs', path: '/call-logs' },
=======
        { name: 'Call Logs', path: '/leads', icon: <FaPhoneAlt /> },
>>>>>>> 565cd98ce4ab139f6446e19b17fbd13898858087
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
      <div className={styles.sidebarContent}>
        <div className={styles.sidebarHeader}>
          <Link to="/">
            <img
              src="/assets/images/logo-main1.png"
              alt="CallTrack Logo"
              className={styles.logoImage}
            />
          </Link>
        </div>

        <div className={styles.navContent}>
          <IconContext.Provider value={{ className: styles.navIcon }}>
            <ul className={styles.sidebarNav}>
              {navStructure.map((item) => {
                const isActiveParent = activeMainMenu === item.name;
                const hasSubmenu = item.submenu && item.submenu.length > 0;
                const isSubmenuOpen = openMenu === item.name;

                return (
                  <li key={item.name} className={styles.navItem}>
                    {!hasSubmenu ? (
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
                        <span className={styles.navText}>{item.name}</span>
                      </NavLink>
                    ) : (
                      <>
                        <div
                          className={`${styles.navLink} ${isActiveParent ? styles.active : ''}`}
                          onClick={() => toggleSubmenu(item.name)}
                        >
                          <div className={styles.navIconWrapper}>{item.icon}</div>
                          <span className={styles.navText}>{item.name}</span>
                          <span className={styles.dropdownArrow}>
                            {isSubmenuOpen ? <FaChevronDown /> : <FaChevronRight />}
                          </span>
                        </div>
                        <div className={`${styles.submenuContainer} ${isSubmenuOpen ? styles.open : ''}`}>
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
                                >
                                  <span className={styles.submenuIcon}>
                                    {subItem.icon}
                                  </span>
                                  <span className={styles.submenuText}>{subItem.name}</span>
                                </NavLink>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>
                    )}
                  </li>
                );
              })}
            </ul>
          </IconContext.Provider>
        </div>

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
    </div>
  );
};

export default SideBar;