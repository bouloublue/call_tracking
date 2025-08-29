import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, Link, useLocation } from "react-router-dom";
import { IconContext } from "react-icons";
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
  FaMicrophone,
} from "react-icons/fa";
import styles from "./Sidebar.module.css";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const SideBar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
  const [activeMainMenu, setActiveMainMenu] = useState(null);
  const authData = JSON.parse(localStorage.getItem("token"));

  const fetchUserData = async () => {
    const res = await axiosInstance.get(`${API_BASE_URL}/api/user/profile`);
    const loggedInUser = res.data.user;
    setUser(loggedInUser);
    console.log("loggedInUser", loggedInUser)
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    const currentPath = location.pathname;
    let foundActiveMenu = null;

    for (let item of navStructure) {
      if (item.submenu) {
        const activeSubItem = item.submenu.find((sub) =>
          currentPath.startsWith(sub.path)
        );
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

  function getInitials(name) {
    if (!name) return "";
    const parts = name.split(" ");
    let initials = parts[0].charAt(0);
    if (parts.length > 1) {
      initials += parts[parts.length - 1].charAt(0);
    }
    return initials.toUpperCase();
  }

  const handleLogout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    localStorage.removeItem("auth");
    setUser(null);
    toast.success("Logout successfully");
  };

  const toggleSubmenu = (menuName) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
  };

  const navStructure = [
    {
      name: "Dashboard",
      path: "/",
      icon: <FaTachometerAlt />,
      visibleTo: ["admin"],
    },
    {
      name: "Campaign Report",
      path: "/campaign-report",
      icon: <FaChartLine />,
      visibleTo: ["buyer"],
    },
    {
      name: "Call Stats",
      path: "/call-logs",
      icon: <FaRegBell />,
      visibleTo: ["buyer"],
    },
    {
      name: "Billable Summaries",
      path: "/billing-report",
      icon: <FaMoneyBill />,
      visibleTo: ["buyer"],
    },
    {
      name: "Campaigns",
      icon: <FaBullhorn />,
      submenu: [
        { name: "Campaign", path: "/campaigns", icon: <FaBullhorn /> },
        {
          name: "Campaign Report",
          path: "/campaign-reports",
          icon: <FaChartLine />,
        },
      ],
      visibleTo: ["admin"],
    },
    {
      name: "Buyer Management",
      icon: <FaUsers />,
      submenu: [
        { name: "Buyers", path: "/agents", icon: <FaUserTie /> },
        {
          name: "Buyer Activities",
          path: "/buyer-activities",
          icon: <FaUserCheck />,
        },
      ],
      visibleTo: ["admin"],
    },
    {
      name: "Numbers",
      icon: <FaHashtag />,
      submenu: [
        {
          name: "Active Numbers",
          path: "/numbers/active-numbers",
          icon: <FaMobileAlt />,
        },
        {
          name: "Released Numbers",
          path: "/numbers/released",
          icon: <FaTrashRestore />,
        },
      ],
      visibleTo: ["admin"],
    },
    {
      name: "Billing",
      icon: <FaMoneyBill />,
      submenu: [
        {
          name: "Billing Logic",
          path: "/billing-logic",
          icon: <FaCalculator />,
        },
        {
          name: "Billing Reports",
          path: "/billing-report",
          icon: <FaChartLine />,
        },
      ],
      visibleTo: ["admin"],
    },
    {
      name: "Call Handling",
      icon: <FaPhone />,
      submenu: [
        { name: "Call Logs", path: "/call-logs", icon: <FaPhoneAlt /> },
      ],
      visibleTo: ["admin"],
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <FaUserCircle />,
    },
  ];

  // const buyerRole = authData?.role;

  // const allowedBuyerRoutes = ["Dashboard"];

  // const buyerNav =
  //   buyerRole === "buyer"
  //     ? navStructure.filter((item) => allowedBuyerRoutes.includes(item.name))
  //     : navStructure;

  const role = authData?.role;

  const buyerNav = navStructure.filter((item) => {
    if (!item.visibleTo) return true;
    return item.visibleTo.includes(role);
  });

  console.log(buyerNav);

  return (
    <div
      className={`${styles.sidebarContainer} ${!isOpen ? styles.hidden : ""}`}
    >
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
              {buyerNav.map((item) => {
                const isActiveParent = activeMainMenu === item.name;
                const hasSubmenu = item.submenu && item.submenu.length > 0;
                const isSubmenuOpen = openMenu === item.name;

                return (
                  <li key={item.name} className={styles.navItem}>
                    {!hasSubmenu ? (
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          isActive
                            ? `${styles.navLink} ${styles.active}`
                            : styles.navLink
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
                          className={`${styles.navLink} ${
                            isActiveParent ? styles.active : ""
                          }`}
                          onClick={() => toggleSubmenu(item.name)}
                        >
                          <div className={styles.navIconWrapper}>
                            {item.icon}
                          </div>
                          <span className={styles.navText}>{item.name}</span>
                          <span className={styles.dropdownArrow}>
                            {isSubmenuOpen ? (
                              <FaChevronDown />
                            ) : (
                              <FaChevronRight />
                            )}
                          </span>
                        </div>
                        <div
                          className={`${styles.submenuContainer} ${
                            isSubmenuOpen ? styles.open : ""
                          }`}
                        >
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
                                  <span className={styles.submenuText}>
                                    {subItem.name}
                                  </span>
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
              <div className={styles.profileAvatar}>{getInitials(user.name)}</div>
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
