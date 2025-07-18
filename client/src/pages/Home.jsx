// import React, { useState } from "react";
// import NavBar from "../components/NavBar";
// import SideBar from "../components/SideBar";
// import Chart16 from "../components/charts/Chart16";
// import Chart6 from "../components/charts/Chart6";

// function Home() {
//     const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const handleToggleMenu = () => { 
//     setIsMenuOpen(prev => !prev);
//   };
//   return (
//     <div>
//       <NavBar onToggleMenu={handleToggleMenu}/>

//       <SideBar isMenuOpen={isMenuOpen} />

//       <div className="page-title-box">
//         <div className="container-fluid">
//           <div className="row gap-0">
//             <div className="col-sm-12">
//               <div className="page-title-content d-sm-flex justify-content-sm-between align-items-center">
//                 <div className="">
//                   <ol className="breadcrumb mb-0">
//                     <li className="breadcrumb-item">
//                       <a href="/">Call Tracking</a>
//                     </li>
//                     <li className="breadcrumb-item active">Dashboard</li>
//                   </ol>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="page-wrapper">
//         <div className="page-content">
//           <div className="container-fluid">
//             <div className="row justify-content-center">
//               <div className="col-md-6 col-lg-3">
//                 <div className="card">
//                   <div className="card-body">
//                     <div className="d-flex justify-content-between">
//                       <div className="d-flex">
//                         <div className="flex-shrink-0">
//                           <div className="text-primary  position-relative ">
//                             <i className="iconoir-dollar-circle fs-28"></i>
//                             <span className="s-box bg-primary-subtle"></span>
//                           </div>
//                         </div>
//                         <div className="flex-grow-1 ms-2 text-truncate">
//                           <h6 className="text-dark mb-0 fw-semibold fs-20">
//                             4
//                           </h6>
//                           <p className="text-muted mb-0 fw-medium fs-13">
//                             Active Campaigns
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="col-md-6 col-lg-3">
//                 <div className="card">
//                   <div className="card-body">
//                     <div className="d-flex justify-content-between">
//                       <div className="d-flex">
//                         <div className="flex-shrink-0">
//                           <div className="text-success  position-relative ">
//                             <i className="iconoir-cart fs-28"></i>
//                             <span className="s-box bg-success-subtle"></span>
//                           </div>
//                         </div>
//                         <div className="flex-grow-1 ms-2 text-truncate">
//                           <h6 className="text-dark mb-0 fw-semibold fs-20">
//                             12
//                           </h6>
//                           <p className="text-muted mb-0 fw-medium fs-13">
//                             Total Follow Up
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="col-md-6 col-lg-3">
//                 <div className="card">
//                   <div className="card-body">
//                     <div className="d-flex justify-content-between">
//                       <div className="d-flex">
//                         <div className="flex-shrink-0">
//                           <div className="text-warning  position-relative ">
//                             <i className="iconoir-percentage-circle fs-28"></i>
//                             <span className="s-box bg-warning-subtle"></span>
//                           </div>
//                         </div>
//                         <div className="flex-grow-1 ms-2 text-truncate">
//                           <h6 className="text-dark mb-0 fw-semibold fs-20">
//                             60
//                           </h6>
//                           <p className="text-muted mb-0 fw-medium fs-13">
//                             Call made
//                           </p>
//                         </div>
//                       </div>
//                       {/* <div className="align-self-center">
//                                         <span className="badge bg-danger-subtle text-danger border border-danger px-2">0.7%</span>
//                                     </div> */}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="col-md-6 col-lg-3">
//                 <div className="card">
//                   <div className="card-body">
//                     <div className="d-flex justify-content-between">
//                       <div className="d-flex">
//                         <div className="flex-shrink-0">
//                           <div className="text-pink  position-relative ">
//                             <i className="iconoir-hexagon-dice fs-28"></i>
//                             <span className="s-box bg-pink-subtle"></span>
//                           </div>
//                         </div>
//                         <div className="flex-grow-1 ms-2 text-truncate">
//                           <h6 className="text-dark mb-0 fw-semibold fs-20">
//                             4 H, 42 M, 30 S
//                           </h6>
//                           <p className="text-muted mb-0 fw-medium fs-13">
//                             Total Duration
//                           </p>
//                         </div>
//                       </div>
//                       {/* <div className="align-self-center">
//                                         <span className="badge bg-success-subtle text-success border border-success px-2">1.9%</span>
//                                     </div> */}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="row">
//               <div className="col-md-12 col-lg-4">
//                 <div className="card">
//                   <div className="card-header">
//                     <div className="row align-items-center">
//                       <div className="col">
//                         <h4 className="card-title">
//                           Active Actioned Campaigns
//                         </h4>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="card-body pt-0">
//                     <div className="row">
//                       <div className="card-body pt-0">
//                         <Chart16 />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-md-12 col-lg-8">
//                 <div className="card">
//                   <div className="card-header">
//                     <div className="row align-items-center">
//                       <div className="col">
//                         <h4 className="card-title">Call Made</h4>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="card-body pt-0">
//                     <Chart6 />
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="row justify-content-center">
//               <div className="col-12">
//                 <div className="card">
//                   <div className="card-header">
//                     <div className="row align-items-center">
//                       <div className="col">
//                         <h4 className="card-title">Agent Booking</h4>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="card-body pt-0">
//                     <div className="table-responsive">
//                       <table className="table mb-0 table-striped">
//                         <thead className="">
//                           <tr>
//                             <th className="border-top-0">Campaign Name</th>
//                             <th className="border-top-0">Agent</th>
//                             <th className="border-top-0">Booking Time</th>
//                             <th className="border-top-0 text-end">Action</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           <tr>
//                             <td> Website Development Campaign</td>
//                             <td> Ricardo Hodkiewicz</td>
//                             <td>16-06-2025 09:56 am</td>
//                             <td className="text-end">
//                               <a
//                                 href="#"
//                                 data-bs-toggle="tooltip"
//                                 data-bs-placement="top"
//                                 data-bs-title="Edit"
//                               >
//                                 <i className="iconoir-edit text-secondary fs-18"></i>
//                               </a>
//                               <a
//                                 href="#"
//                                 data-bs-toggle="tooltip"
//                                 data-bs-placement="top"
//                                 data-bs-title="Delete"
//                               >
//                                 <i className="iconoir-xmark-circle text-secondary fs-18"></i>
//                               </a>
//                             </td>
//                           </tr>
//                           <tr>
//                             <td>Social Media Campaign</td>
//                             <td>Dr. Nash Lebsack</td>
//                             <td>18-06-2025 12:20 am</td>
//                             <td className="text-end">
//                               <a
//                                 href="#"
//                                 data-bs-toggle="tooltip"
//                                 data-bs-placement="top"
//                                 data-bs-title="Edit"
//                               >
//                                 <i className="iconoir-edit text-secondary fs-18"></i>
//                               </a>
//                               <a
//                                 href="#"
//                                 data-bs-toggle="tooltip"
//                                 data-bs-placement="top"
//                                 data-bs-title="Delete"
//                               >
//                                 <i className="iconoir-xmark-circle text-secondary fs-18"></i>
//                               </a>
//                             </td>
//                           </tr>
//                           <tr>
//                             <td>Social Media Campaign</td>
//                             <td>Prof. Gonzalo Upton</td>
//                             <td>20-06-2025 08:05 am</td>
//                             <td className="text-end">
//                               <a
//                                 href="#"
//                                 data-bs-toggle="tooltip"
//                                 data-bs-placement="top"
//                                 data-bs-title="Edit"
//                               >
//                                 <i className="iconoir-edit text-secondary fs-18"></i>
//                               </a>
//                               <a
//                                 href="#"
//                                 data-bs-toggle="tooltip"
//                                 data-bs-placement="top"
//                                 data-bs-title="Delete"
//                               >
//                                 <i className="iconoir-xmark-circle text-secondary fs-18"></i>
//                               </a>
//                             </td>
//                           </tr>
//                           <tr>
//                             <td>Social Media Campaign</td>
//                             <td>Marian Friesen V</td>
//                             <td>17-06-2025 05:46 pm</td>
//                             <td className="text-end">
//                               <a
//                                 href="#"
//                                 data-bs-toggle="tooltip"
//                                 data-bs-placement="top"
//                                 data-bs-title="Edit"
//                               >
//                                 <i className="iconoir-edit text-secondary fs-18"></i>
//                               </a>
//                               <a
//                                 href="#"
//                                 data-bs-toggle="tooltip"
//                                 data-bs-placement="top"
//                                 data-bs-title="Delete"
//                               >
//                                 <i className="iconoir-xmark-circle text-secondary fs-18"></i>
//                               </a>
//                             </td>
//                           </tr>
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="endbar-overlay d-print-none"></div>

//           <footer className="footer text-center text-sm-start d-print-none">
//             <div className="container-fluid">
//               <div className="row">
//                 <div className="col-12 px-0">
//                   <div className="card mb-0 rounded-bottom-0 border-0">
//                     <div className="card-body">
//                       <p className="text-muted mb-0">©2025 Call Tracking</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </footer>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Home;




import React from "react";
import Chart16 from "../components/charts/Chart16";
import Chart6 from "../components/charts/Chart6";
import styles from "./Home.module.css";
import SideBar from "../components/SideBar";
// import NavBar from "../components/NavBar";

import { FaDollarSign, FaShoppingCart, FaPercentage, FaDiceD6, FaEdit, FaTimesCircle, FaChevronRight } from 'react-icons/fa';
import { IoCall, IoTime } from 'react-icons/io5';

function Home() {
  return (
    <>
      <SideBar />
      <div className={styles.homePageContainer}>
        {/* Page Title Section */}
        <div className={styles.pageTitleBox}>
          <div className={styles.pageTitleContainer}>
            <div className={`${styles.row} ${styles.gap0}`}>
              <div className={styles.col12}>
                <div className={`${styles.pageTitleContent} ${styles.dSmFlex} ${styles.justifyContentSmBetween} ${styles.alignItemsCenter}`}>
                  {/* Left Section - Title & Breadcrumb */}
                  <div>
                    <ol className={styles.breadcrumb}>
                      <li className={styles.breadcrumbItem}>
                        <a href="/">Call Tracking</a>
                      </li>
                      <li className={`${styles.breadcrumbItem} ${styles.active}`}>Dashboard</li>
                    </ol>
                    <h1 className={styles.pageTitle}>Campaign Dashboard</h1>
                  </div>

                  {/* Right Section - Notification + Date Filter */}
                  <div className={styles.dateFilter} style={{ display: "flex", alignItems: "center" }}>
                    {/* 🔔 Notification Button */}
                    <button
                      style={{
                        width: "38px",
                        height: "38px",
                        borderRadius: "50%",
                        border: "none",
                        backgroundColor: "#f2f2f2",
                        marginRight: "10px",
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                    >
                      <img
                        src="/assets/images/notification.png"
                        alt="Notify"
                        style={{ width: "18px", height: "18px" }}
                      />
                      {/* Red Dot */}
                      <span
                        style={{
                          position: "absolute",
                          top: "6px",
                          right: "6px",
                          width: "8px",
                          height: "8px",
                          backgroundColor: "red",
                          borderRadius: "50%",
                        }}
                      ></span>
                    </button>

                    {/* 📅 Date Range */}
                    <span className={styles.dateRange}>Jun 16, 2025 - Jul 10, 2025</span>

                    {/* Filter Button */}
                    <button className={styles.filterBtn} style={{ marginLeft: "10px" }}>
                      Filter
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className={styles.pageWrapper}>
          <div className={styles.pageContent}>
            {/* Metrics Cards */}
            <div className={`${styles.row} ${styles.metricsRow}`}>
              <div className={`${styles.colMd6} ${styles.colLg3}`}>
                <div className={styles.card}>
                  <div className={styles.cardBody}>
                    <div className={styles.infoCardFlex}>
                      <div className={styles.infoCardContent}>
                        <div className={styles.infoCardIconWrapper}>
                          <div className={`${styles.infoCardIcon} ${styles.textPrimary} ${styles.positionRelative}`}>
                            <FaDollarSign />
                            <span className={`${styles.infoCardSubBox} ${styles.bgPrimarySubtle}`}></span>
                          </div>
                        </div>
                        <div className={`${styles.infoCardTextContent} ${styles.ms2} ${styles.textTruncate}`}>
                          <h6 className={`${styles.infoCardNumber} ${styles.textDark} ${styles.fwSemibold} ${styles.fs20}`}>
                            4
                          </h6>
                          <p className={`${styles.infoCardLabel} ${styles.textMuted} ${styles.fwMedium} ${styles.fs13}`}>
                            Active Campaigns
                          </p>
                        </div>
                      </div>
                      <div className={styles.infoCardTrend}>
                        <span className={styles.trendUp}>+2.5%</span>
                        <div className={styles.trendIcon}>↑</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`${styles.colMd6} ${styles.colLg3}`}>
                <div className={styles.card}>
                  <div className={styles.cardBody}>
                    <div className={styles.infoCardFlex}>
                      <div className={styles.infoCardContent}>
                        <div className={styles.infoCardIconWrapper}>
                          <div className={`${styles.infoCardIcon} ${styles.textSuccess} ${styles.positionRelative}`}>
                            <FaShoppingCart />
                            <span className={`${styles.infoCardSubBox} ${styles.bgSuccessSubtle}`}></span>
                          </div>
                        </div>
                        <div className={`${styles.infoCardTextContent} ${styles.ms2} ${styles.textTruncate}`}>
                          <h6 className={`${styles.infoCardNumber} ${styles.textDark} ${styles.fwSemibold} ${styles.fs20}`}>
                            12
                          </h6>
                          <p className={`${styles.infoCardLabel} ${styles.textMuted} ${styles.fwMedium} ${styles.fs13}`}>
                            Live Calls
                          </p>
                        </div>
                      </div>
                      <div className={styles.infoCardTrend}>
                        <span className={styles.trendUp}>+8.3%</span>
                        <div className={styles.trendIcon}>↑</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`${styles.colMd6} ${styles.colLg3}`}>
                <div className={styles.card}>
                  <div className={styles.cardBody}>
                    <div className={styles.infoCardFlex}>
                      <div className={styles.infoCardContent}>
                        <div className={styles.infoCardIconWrapper}>
                          <div className={`${styles.infoCardIcon} ${styles.textWarning} ${styles.positionRelative}`}>
                            <IoCall />
                            <span className={`${styles.infoCardSubBox} ${styles.bgWarningSubtle}`}></span>
                          </div>
                        </div>
                        <div className={`${styles.infoCardTextContent} ${styles.ms2} ${styles.textTruncate}`}>
                          <h6 className={`${styles.infoCardNumber} ${styles.textDark} ${styles.fwSemibold} ${styles.fs20}`}>
                            60
                          </h6>
                          <p className={`${styles.infoCardLabel} ${styles.textMuted} ${styles.fwMedium} ${styles.fs13}`}>
                            Calls Received
                          </p>
                        </div>
                      </div>
                      <div className={styles.infoCardTrend}>
                        <span className={styles.trendDown}>-1.2%</span>
                        <div className={styles.trendIcon}>↓</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`${styles.colMd6} ${styles.colLg3}`}>
                <div className={styles.card}>
                  <div className={styles.cardBody}>
                    <div className={styles.infoCardFlex}>
                      <div className={styles.infoCardContent}>
                        <div className={styles.infoCardIconWrapper}>
                          <div className={`${styles.infoCardIcon} ${styles.textPink} ${styles.positionRelative}`}>
                            <IoTime />
                            <span className={`${styles.infoCardSubBox} ${styles.bgPinkSubtle}`}></span>
                          </div>
                        </div>
                        <div className={`${styles.infoCardTextContent} ${styles.ms2} ${styles.textTruncate}`}>
                          <h6 className={`${styles.infoCardNumber} ${styles.textDark} ${styles.fwSemibold} ${styles.fs20}`}>
                            4m 42s
                          </h6>
                          <p className={`${styles.infoCardLabel} ${styles.textMuted} ${styles.fwMedium} ${styles.fs13}`}>
                            Avg. Duration
                          </p>
                        </div>
                      </div>
                      <div className={styles.infoCardTrend}>
                        <span className={styles.trendUp}>+12s</span>
                        <div className={styles.trendIcon}>↑</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Row */}
            <div className={styles.row}>
              <div className={`${styles.colMd12} ${styles.colLg6}`}>
                <div className={styles.card}>
                  <div className={styles.cardHeader}>
                    <div className={`${styles.row} ${styles.alignItemsCenter}`}>
                      <div className={styles.col}>
                        <h4 className={styles.cardTitle}>
                          Campaign Performance
                        </h4>
                      </div>
                      <div className={styles.colAuto}>
                        <select className={styles.chartFilter}>
                          <option>Last 7 Days</option>
                          <option>Last 30 Days</option>
                          <option>Last Quarter</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className={`${styles.cardBody} ${styles.pt0}`}>
                    <Chart16 />
                  </div>
                </div>
              </div>
              <div className={`${styles.colMd12} ${styles.colLg6}`}>
                <div className={styles.card}>
                  <div className={styles.cardHeader}>
                    <div className={`${styles.row} ${styles.alignItemsCenter}`}>
                      <div className={styles.col}>
                        <h4 className={styles.cardTitle}>Call Volume by Hour</h4>
                      </div>
                      <div className={styles.colAuto}>
                        <button className={styles.downloadBtn}>
                          Export Data
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className={`${styles.cardBody} ${styles.pt0}`}>
                    <Chart6 />
                  </div>
                </div>
              </div>
            </div>

            {/* Agent Booking Table */}
            <div className={`${styles.row} ${styles.justifyContentCenter}`}>
              <div className={styles.col12}>
                <div className={styles.card}>
                  <div className={styles.cardHeader}>
                    <div className={`${styles.row} ${styles.alignItemsCenter}`}>
                      <div className={styles.col}>
                        <h4 className={styles.cardTitle}>Recent Call Assignments</h4>
                      </div>
                      <div className={styles.colAuto}>
                        <button className={styles.viewAllBtn}>
                          View All <FaChevronRight />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className={`${styles.cardBody} ${styles.pt0}`}>
                    <div className={styles.tableResponsive}>
                      <table className={`${styles.table} ${styles.mb0} ${styles.tableStriped}`}>
                        <thead>
                          <tr>
                            <th className={styles.borderTop0}>Campaign</th>
                            <th className={styles.borderTop0}>Agent</th>
                            <th className={styles.borderTop0}>Caller</th>
                            <th className={styles.borderTop0}>Duration</th>
                            <th className={styles.borderTop0}>Time</th>
                            <th className={`${styles.borderTop0} ${styles.textEnd}`}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <div className={styles.campaignBadge}>Website Dev</div>
                            </td>
                            <td>
                              <div className={styles.agentInfo}>
                                <div className={styles.agentAvatar}>RH</div>
                                Ricardo Hodkiewicz
                              </div>
                            </td>
                            <td>(415) 555-0132</td>
                            <td>5m 12s</td>
                            <td>Today, 09:56 am</td>
                            <td className={styles.textEnd}>
                              <a href="#" className={styles.tableActionLink}>
                                <FaEdit />
                              </a>
                              <a href="#" className={styles.tableActionLink}>
                                <FaTimesCircle />
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className={styles.campaignBadge}>Social Media</div>
                            </td>
                            <td>
                              <div className={styles.agentInfo}>
                                <div className={styles.agentAvatar}>NL</div>
                                Dr. Nash Lebsack
                              </div>
                            </td>
                            <td>(628) 555-0126</td>
                            <td>3m 48s</td>
                            <td>Today, 12:20 pm</td>
                            <td className={styles.textEnd}>
                              <a href="#" className={styles.tableActionLink}>
                                <FaEdit />
                              </a>
                              <a href="#" className={styles.tableActionLink}>
                                <FaTimesCircle />
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className={styles.campaignBadge}>PPC</div>
                            </td>
                            <td>
                              <div className={styles.agentInfo}>
                                <div className={styles.agentAvatar}>GU</div>
                                Prof. Gonzalo Upton
                              </div>
                            </td>
                            <td>(925) 555-0187</td>
                            <td>7m 32s</td>
                            <td>Yesterday, 08:05 am</td>
                            <td className={styles.textEnd}>
                              <a href="#" className={styles.tableActionLink}>
                                <FaEdit />
                              </a>
                              <a href="#" className={styles.tableActionLink}>
                                <FaTimesCircle />
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className={styles.campaignBadge}>Email</div>
                            </td>
                            <td>
                              <div className={styles.agentInfo}>
                                <div className={styles.agentAvatar}>MF</div>
                                Marian Friesen V
                              </div>
                            </td>
                            <td>(510) 555-0198</td>
                            <td>4m 15s</td>
                            <td>Jul 8, 05:46 pm</td>
                            <td className={styles.textEnd}>
                              <a href="#" className={styles.tableActionLink}>
                                <FaEdit />
                              </a>
                              <a href="#" className={styles.tableActionLink}>
                                <FaTimesCircle />
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <footer className={`${styles.footer} ${styles.textCenter} ${styles.textSmStart}`}>
            <div className={styles.footerContainer}>
              <div className={styles.row}>
                <div className={styles.col12}>
                  <div className={`${styles.footerCard} ${styles.mb0} ${styles.roundedBottom0} ${styles.border0}`}>
                    <div className={styles.footerCardBody}>
                      <p className={`${styles.textMuted} ${styles.mb0}`}>©2025 CallTracking Pro | Real-time call distribution platform</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}

export default Home;
