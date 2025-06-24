function NavBar({ onToggleMenu }) {
  return (
    <>
      <div className="topbar d-print-none">
        <div className="container-fluid">
          <nav
            className="topbar-custom d-flex justify-content-between"
            id="topbar-custom"
          >
            <ul className="topbar-item list-unstyled d-inline-flex align-items-center mb-0">
              {/* <li>
              <button
                className="nav-link mobile-menu-btn nav-icon"
                id="togglemenu"
              >
                <iconify-icon
                  icon="solar:hamburger-menu-line-duotone"
                  className="fs-20"
                ></iconify-icon>
              </button>
            </li> */}
              <li>
                <button
                  type="button"
                  className="nav-link mobile-menu-btn nav-icon"
                  id="togglemenu"
                  onClick={onToggleMenu}
                >
                  <iconify-icon
                    icon="solar:hamburger-menu-line-duotone"
                    className="fs-20"
                  ></iconify-icon>
                </button>
              </li>
              <li className="mx-2 welcome-text">
                <h5 className="mb-0 fw-semibold text-truncate">
                  Good Morning, Admin!
                </h5>
              </li>
            </ul>
            <ul className="topbar-item list-unstyled d-inline-flex align-items-center mb-0">
              <li className="hide-phone app-search">
                <form role="search" action="#" method="get">
                  <input
                    type="search"
                    name="search"
                    className="form-control top-search mb-0"
                    placeholder="Search here..."
                  />
                  <button type="submit">
                    <i className="iconoir-search"></i>
                  </button>
                </form>
              </li>

              <li className="topbar-item">
                <a
                  className="nav-link nav-icon"
                  href="javascript:void(0);"
                  id="light-dark-mode"
                >
                  <iconify-icon
                    icon="solar:moon-bold-duotone"
                    className="dark-mode fs-20"
                  ></iconify-icon>
                  <iconify-icon
                    icon="solar:sun-2-bold-duotone"
                    className="light-mode fs-20"
                  ></iconify-icon>
                </a>
              </li>

              {/* <li className="topbar-item">
              <button
                className="nav-link nav-icon"
                onClick={() => setDarkMode(!darkMode)}
              >
                <iconify-icon
                  icon={
                    darkMode
                      ? "solar:sun-2-bold-duotone"
                      : "solar:moon-bold-duotone"
                  }
                  className={`fs-20 ${darkMode ? "dark-mode" : "light-mode"}`}
                ></iconify-icon>
              </button>
            </li> */}

              <li className="topbar-item">
                <a
                  className="nav-link nav-icon endbar-btn "
                  href="javascript:void(0);"
                  id="toggleendbar"
                >
                  <iconify-icon
                    icon="solar:settings-bold-duotone"
                    className="fs-20"
                  ></iconify-icon>
                </a>
              </li>
              <li className="dropdown topbar-item">
                <a
                  className="nav-link dropdown-toggle arrow-none nav-icon"
                  data-bs-toggle="dropdown"
                  href="#"
                  role="button"
                  aria-haspopup="false"
                  aria-expanded="false"
                  data-bs-offset="0,19"
                >
                  <img
                    src="assets/images/users/avatar-2.jpg"
                    alt=""
                    className="thumb-md rounded"
                  />
                </a>
                <div className="dropdown-menu dropdown-menu-end py-0">
                  <div className="dropdown-divider mt-0"></div>
                  <small className="text-muted px-2 pb-1 d-block">
                    Account
                  </small>
                  <a className="dropdown-item" href="/profile">
                    <i className="las la-user fs-18 me-1 align-text-bottom"></i>{" "}
                    Profile
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="las la-cog fs-18 me-1 align-text-bottom"></i>
                    Account Settings
                  </a>
                  <div className="dropdown-divider mb-0"></div>
                  {/* <a className="dropdown-item text-danger" >
                  <i className="las la-power-off fs-18 me-1 align-text-bottom"></i>{" "}
                  Logout
                </a> */}
                  <a
                    className="dropdown-item text-danger"
                    onClick={() => {
                      localStorage.removeItem("auth");
                      window.location.href = "/login"; 
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <i className="las la-power-off fs-18 me-1 align-text-bottom"></i>{" "}
                    Logout
                  </a>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

export default NavBar;
