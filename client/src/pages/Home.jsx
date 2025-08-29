import React, { useState, useEffect } from "react";
import styles from "./Home.module.css";
import SideBar from "../components/SideBar";
import { FaDollarSign, FaShoppingCart, FaBullhorn, FaPhoneAlt } from "react-icons/fa";
import { IoCallSharp, IoTime } from "react-icons/io5";
import { MdCallReceived } from "react-icons/md";
import axiosInstance from "../utils/axiosInstance";
import flattenCallLogs from "../utils/flattenData";
import { toast } from "react-toastify";

const API_BASE_URL = import.meta.env.VITE_API_URL;

function Home() {
  const [recentCalls, setRecentCalls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [metrics, setMetrics] = useState({
    activeCampaigns: 0,
    liveCalls: 0,
    callsReceived: 0,
    avgCallDuration: 0,
  });

  const authData = JSON.parse(localStorage.getItem("token"));
  const role = authData?.role;

  function getInitials(name) {
    if (!name) return "";
    const parts = name.split(" ");
    let initials = parts[0].charAt(0);
    if (parts.length > 1) {
      initials += parts[parts.length - 1].charAt(0);
    }
    return initials.toUpperCase();
  }

  function formatDuration(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  }

  // Fetch metrics API
  const fetchMetrics = async () => {
    try {
      const res = await axiosInstance.get(`${API_BASE_URL}/api/call/dashboard/metrics`);
      setMetrics(res.data.data || {});
    } catch (error) {
      console.error("Error fetching metrics:", error);
      toast.error("Error fetching metrics");
    }
  };

  // Fetch recent call logs
  const fetchRecentCalls = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`${API_BASE_URL}/api/call/inbound-call-logs`);
      const flattenDataRes = flattenCallLogs(res.data);
      setRecentCalls(flattenDataRes.slice(0, 5));
    } catch (error) {
      console.error("Error fetching recent calls:", error);
      toast.error("Error fetching recent calls");
    } finally {
      setLoading(false);
    }
  };

  function getStatusBadge(status) {
    const statusMap = {
      completed: { color: "#0E877D", bg: "#ECFDF5" },
      failed: { color: "#DC2626", bg: "#FEF2F2" },
      "no-answer": { color: "#D97706", bg: "#FFFBEB" },
      busy: { color: "#7C3AED", bg: "#F5F3FF" },
    };
    const style = statusMap[status] || { color: "#64748B", bg: "#F1F5F9" };

    return (
      <span
        style={{
          backgroundColor: style.bg,
          color: style.color,
          fontSize: "13px",
          padding: "4px 8px",
          borderRadius: "999px",
          fontWeight: "500",
        }}
      >
        {status}
      </span>
    );
  }

  useEffect(() => {
    fetchRecentCalls();
    fetchMetrics();

    // Optional: Auto-refresh metrics every 10 seconds
    const interval = setInterval(fetchMetrics, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <SideBar />
      <div className={styles.homePageContainer}>
        {/* PAGE TITLE */}
        <div className={styles.pageTitleBox}>
          <div className={styles.pageTitleContainer}>
            <div className={`${styles.row} ${styles.gap0}`}>
              <div className={styles.col12}>
                <div
                  className={`${styles.pageTitleContent} ${styles.dSmFlex} ${styles.justifyContentSmBetween} ${styles.alignItemsCenter}`}
                >
                  <div>
                    <ol className={styles.breadcrumb}>
                      <li className={styles.breadcrumbItem}>
                        <a href="/">Call Tracking</a>
                      </li>
                      <li
                        className={`${styles.breadcrumbItem} ${styles.active}`}
                      >
                        Dashboard
                      </li>
                    </ol>
                    <h1 className={styles.pageTitle}>Campaign Dashboard</h1>
                  </div>
                  <div
                    className={styles.dateFilter}
                    style={{ display: "flex", alignItems: "center" }}
                  >
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className={styles.pageWrapper}>
          <div className={styles.pageContent}>
            {/* Metrics Section */}
            <div className={`${styles.row} ${styles.metricsRow}`}>
              {/* Active Campaigns */}
              <div className={`${styles.colMd6} ${styles.colLg3}`}>
                <div className={styles.card}>
                  <div className={styles.cardBody}>
                    <div className={styles.infoCardFlex}>
                      <div className={styles.infoCardContent}>
                        <div className={styles.infoCardIconWrapper}>
                          <div
                            className={`${styles.infoCardIcon} ${styles.textPrimary} ${styles.positionRelative}`}
                          >
                            <FaBullhorn />
                            <span
                              className={`${styles.infoCardSubBox} ${styles.bgPrimarySubtle}`}
                            ></span>
                          </div>
                        </div>
                        <div
                          className={`${styles.infoCardTextContent} ${styles.ms2} ${styles.textTruncate}`}
                        >
                          <h6
                            className={`${styles.infoCardNumber} ${styles.textDark} ${styles.fwSemibold} ${styles.fs20}`}
                          >
                            {metrics.activeCampaigns}
                          </h6>
                          <p
                            className={`${styles.infoCardLabel} ${styles.textMuted} ${styles.fwMedium} ${styles.fs13}`}
                          >
                            Active Campaigns
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Calls */}
              <div className={`${styles.colMd6} ${styles.colLg3}`}>
                <div className={styles.card}>
                  <div className={styles.cardBody}>
                    <div className={styles.infoCardFlex}>
                      <div className={styles.infoCardContent}>
                        <div className={styles.infoCardIconWrapper}>
                          <div
                            className={`${styles.infoCardIcon} ${styles.textSuccess} ${styles.positionRelative}`}
                          >
                            <FaPhoneAlt style={{ color: "red", fontSize: "24px" }} />
                            <span
                              className={`${styles.infoCardSubBox} ${styles.bgSuccessSubtle}`}
                            ></span>
                          </div>
                        </div>
                        <div
                          className={`${styles.infoCardTextContent} ${styles.ms2} ${styles.textTruncate}`}
                        >
                          <h6
                            className={`${styles.infoCardNumber} ${styles.textDark} ${styles.fwSemibold} ${styles.fs20}`}
                          >
                            {metrics.liveCalls}
                          </h6>
                          <p
                            className={`${styles.infoCardLabel} ${styles.textMuted} ${styles.fwMedium} ${styles.fs13}`}
                          >
                            Live Calls
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Calls Received */}
              <div className={`${styles.colMd6} ${styles.colLg3}`}>
                <div className={styles.card}>
                  <div className={styles.cardBody}>
                    <div className={styles.infoCardFlex}>
                      <div className={styles.infoCardContent}>
                        <div className={styles.infoCardIconWrapper}>
                          <div
                            className={`${styles.infoCardIcon} ${styles.textWarning} ${styles.positionRelative}`}
                          >
                            <MdCallReceived />
                            <span
                              className={`${styles.infoCardSubBox} ${styles.bgWarningSubtle}`}
                            ></span>
                          </div>
                        </div>
                        <div
                          className={`${styles.infoCardTextContent} ${styles.ms2} ${styles.textTruncate}`}
                        >
                          <h6
                            className={`${styles.infoCardNumber} ${styles.textDark} ${styles.fwSemibold} ${styles.fs20}`}
                          >
                            {metrics.callsReceivedLast30Days}
                          </h6>
                          <p
                            className={`${styles.infoCardLabel} ${styles.textMuted} ${styles.fwMedium} ${styles.fs13}`}
                          >
                            Calls Received (30d)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Average Duration */}
              <div className={`${styles.colMd6} ${styles.colLg3}`}>
                <div className={styles.card}>
                  <div className={styles.cardBody}>
                    <div className={styles.infoCardFlex}>
                      <div className={styles.infoCardContent}>
                        <div className={styles.infoCardIconWrapper}>
                          <div
                            className={`${styles.infoCardIcon} ${styles.textPink} ${styles.positionRelative}`}
                          >
                            <IoTime />
                            <span
                              className={`${styles.infoCardSubBox} ${styles.bgPinkSubtle}`}
                            ></span>
                          </div>
                        </div>
                        <div
                          className={`${styles.infoCardTextContent} ${styles.ms2} ${styles.textTruncate}`}
                        >
                          <h6
                            className={`${styles.infoCardNumber} ${styles.textDark} ${styles.fwSemibold} ${styles.fs20}`}
                          >
                            {metrics.avgCallDuration}
                          </h6>
                          <p
                            className={`${styles.infoCardLabel} ${styles.textMuted} ${styles.fwMedium} ${styles.fs13}`}
                          >
                            Avg. Duration
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Call Assignments Table */}
            <div className={`${styles.row} ${styles.justifyContentCenter}`}>
              <div className={styles.col12}>
                <div className={styles.card}>
                  <div className={styles.cardHeader}>
                    <h4 className={styles.cardTitle}>Recent Call Assignments</h4>
                  </div>
                  <div className={`${styles.cardBody} ${styles.pt0}`}>
                    <div className={styles.tableResponsive}>
                      <table className={`${styles.table} ${styles.mb0} ${styles.tableStriped}`}>
                        <thead>
                          <tr>
                            <th>Campaign</th>
                            <th>Buyer</th>
                            <th>Caller</th>
                            <th>Status</th>
                            <th>Converted</th>
                            <th>Duration</th>
                            <th>Time</th>
                          </tr>
                        </thead>
                        <tbody>
                          {loading ? (
                            <tr>
                              <td colSpan="7" style={{ textAlign: "center" }}>Loading...</td>
                            </tr>
                          ) : recentCalls.length > 0 ? (
                            recentCalls.map((log) => (
                              <tr key={log.id}>
                                <td>
                                  <div className={styles.campaignBadge}>
                                    {log.campaign?.name}
                                  </div>
                                </td>
                                <td>
                                  <div className={styles.agentInfo}>
                                    <div className={styles.agentAvatar}>
                                      {getInitials(log.buyer?.name)}
                                    </div>
                                    {log.buyer?.name || "N/A"}
                                  </div>
                                </td>
                                <td>{log.caller_number}</td>
                                <td>{getStatusBadge(log.status)}</td>
                                <td>
                                  <span
                                    style={{
                                      backgroundColor: log.is_converted ? "#ECFDF5" : "#FEF2F2",
                                      color: log.is_converted ? "#0E877D" : "#DC2626",
                                      fontSize: "13px",
                                      padding: "4px 8px",
                                      borderRadius: "999px",
                                      fontWeight: "500",
                                    }}
                                  >
                                    {log.is_converted ? "Yes" : "No"}
                                  </span>
                                </td>
                                <td>{formatDuration(log.duration_sec)}</td>
                                {/* <td>{new Date(log.created_at).toLocaleString()}</td> */}
                                <td>{log.created_at === Date.now() ? "today" : new Date(log.created_at).toLocaleString()}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="7" style={{ textAlign: "center" }}>No Recent Calls</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Footer */}
          <footer className={`${styles.footer} ${styles.textCenter} ${styles.textSmStart}`}>
            <div className={styles.footerContainer}>
              <p className={`${styles.textMuted} ${styles.mb0}`}>
                ©2025 Conversion Studio | Real-time call distribution platform
              </p>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}

export default Home;
