import React from "react";

function SideBar({ isMenuOpen }) {
  return (
    <div className="startbar d-print-none">
      <div className="brand">
        {/* <a href="/" className="logo">
          <span>
            <img
              src="assets/images/logo-sm.png"
              alt="logo-small"
              className="logo-sm"
            />
          </span>
          <span className="">
            <img
              src="assets/images/logo-light.png"
              alt="logo-large"
              className="logo-lg logo-light"
            />
            <img
              src="assets/images/logo-dark.png"
              alt="logo-large"
              className="logo-lg logo-dark"
            />
          </span>
        </a> */}
          <a href="/" className="logo">
          <span>
            <img
              src="assets/images/logo-main.png"
              alt="logo-small"
              className="logo-sm"
            />
          </span>
          {/* <span className="">
            <img
              src="assets/images/logo-light.png"
              alt="logo-large"
              className="logo-lg logo-light"
            />
            <img
              src="assets/images/logo-dark.png"
              alt="logo-large"
              className="logo-lg logo-dark"
            />
          </span> */}
          <span className="">
            <img
              src="assets/images/logo-main1.png"
              alt="logo-large"
              className="logo-lg logo-light"
              style={{ width: "80%", height: "20%" }}
            />
            <img
              src="assets/images/logo-dark.png"
              alt="logo-large"
              className="logo-lg logo-dark"
            />
          </span>
        </a>
      </div>
     <aside className={`sidebar ${isMenuOpen ? "show" : "hide"}`}>
      <div className="startbar-menu">
        <div className="startbar-collapse" id="startbarCollapse" data-simplebar>
          <div className="d-flex align-items-start flex-column w-100">
            <ul className="navbar-nav mb-auto w-100">
              <li className="menu-label mt-2">
                <span>Navigation</span>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link"
                  href="/"
                  aria-controls="sidebarDashboards"
                >
                  <iconify-icon
                    icon="solar:monitor-bold-duotone"
                    className="menu-icon"
                  ></iconify-icon>
                  <span>Dashboards</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#"
                >
                  <iconify-icon
                    icon="solar:cart-large-2-bold-duotone"
                    className="menu-icon"
                  ></iconify-icon>
                  <span>Billings</span>
                </a>
                {/* <div className="collapse " id="sidebarEcommerce">
                                <ul className="nav flex-column">
                                    <li className="nav-item">
                                        <a className="nav-link" href="ecommerce-products.html">Products</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="ecommerce-customers.html">Customers</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="ecommerce-customer-details.html">Customer Details</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="ecommerce-orders.html">Orders</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="ecommerce-order-details.html">Order Details</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="ecommerce-refunds.html">Refunds</a>
                                    </li>
                                </ul>
                            </div> */}
              </li>

              <li className="menu-label mt-2">
                <small className="label-border">
                  <div className="border_left hidden-xs"></div>
                  <div className="border_right"></div>
                </small>
                <span>User Management</span>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="/manager"
                  aria-controls="sidebarDashboards"
                >
                  <iconify-icon
                    icon="solar:monitor-bold-duotone"
                    className="menu-icon"
                  ></iconify-icon>
                  <span>Manager</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#sidebarForms"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarForms"
                >
                  <iconify-icon
                    icon="solar:file-text-bold-duotone"
                    className="menu-icon"
                  ></iconify-icon>
                  <span>Agents</span>
                  <span className="badge rounded text-success bg-success-subtle ms-1">
                    New
                  </span>
                </a>
                <div className="collapse " id="sidebarForms">
                  <ul className="nav flex-column">
                    <li className="nav-item">
                      <a className="nav-link" href="/agents">
                        Agents
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        Agents Bookings
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="menu-label mt-2">
                <small className="label-border">
                  <div className="border_left hidden-xs"></div>
                  <div className="border_right"></div>
                </small>
                <span>Campaign Management</span>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/campaign-overview" aria-controls="sidebarPages">
                  <iconify-icon
                    icon="solar:book-2-bold-duotone"
                    className="menu-icon"
                  ></iconify-icon>
                  <span>Campaigns Overview</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/campaigns" aria-controls="sidebarPages">
                  <iconify-icon
                    icon="solar:book-2-bold-duotone"
                    className="menu-icon"
                  ></iconify-icon>
                  <span>Campaigns</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#sidebarAuthentication"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="SidebarAuthentication"
                >
                  <iconify-icon
                    icon="solar:lock-keyhole-bold-duotone"
                    className="menu-icon"
                  ></iconify-icon>
                  <span>Leads & Calls</span>
                </a>
                <div className="collapse " id="sidebarAuthentication">
                  <ul className="nav flex-column">
                    <li className="nav-item">
                      <a className="nav-link" href="/leads">
                        Leads
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/call-logs">
                        Call logs
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" aria-controls="sidebarPages">
                  <iconify-icon
                    icon="solar:book-2-bold-duotone"
                    className="menu-icon"
                  ></iconify-icon>
                  <span>Lead Follow Ups</span>
                  <span className="badge rounded text-success bg-success-subtle ms-1">
                    Upcoming
                  </span>
                </a>
              </li>
              <li className="menu-label mt-2">
                <small className="label-border">
                  <div className="border_left hidden-xs"></div>
                  <div className="border_right"></div>
                </small>
                <span>Settings</span>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#sidebarEmailTemplates"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarEmailTemplates"
                >
                  <iconify-icon
                    icon="solar:mailbox-bold-duotone"
                    className="menu-icon"
                  ></iconify-icon>
                  <span>Messagings</span>
                </a>
                <div className="collapse " id="sidebarEmailTemplates">
                  <ul className="nav flex-column">
                    <li className="nav-item">
                      <a className="nav-link" href="email-templates-basic.html">
                        Email Templates
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
               <li className="nav-item">
                <a className="nav-link" href="#" aria-controls="sidebarPages">
                  <iconify-icon
                    icon="solar:book-2-bold-duotone"
                    className="menu-icon"
                  ></iconify-icon>
                  <span>Forms</span>
                </a>
              </li>
                <li className="nav-item">
                <a className="nav-link" href="/profile" aria-controls="sidebarPages">
                  <iconify-icon
                    icon="solar:book-2-bold-duotone"
                    className="menu-icon"
                  ></iconify-icon>
                  <span>Settings</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </aside>
      </div>
  );
}

export default SideBar;
