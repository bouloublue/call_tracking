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
                      <p className={`${styles.textMuted} ${styles.mb0}`}>©2025 Conversion Studio | Real-time call distribution platform</p>
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
