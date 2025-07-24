import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../pages/Home.module.css";
import "react-toastify/dist/ReactToastify.css";
// import { FiRefreshCw } from "react-icons/fi";

const API_BASE_URL = import.meta.env.VITE_API_URL;

function BillingReport() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBillingLogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/api/call/billing-logs`);
      const flattenedLogs = res.data.map((log) => ({
        id: log.id,
        call_log_id: log.call_log_id,
        rule_id: log.rule_id,
        amount_charged: log.amount_charged,
        override_rate: log.override_rate,
        duration_sec: log.duration_sec,
        created_at: log.created_at,
        caller_number: log.call_log?.caller_number || null,
        call_status: log.call_log?.status || null,
        buyer_id: log.call_log?.buyer_id || null,
        buyer_name: log.call_log?.buyer?.name || null,
        buyer_phone: log.call_log?.buyer?.phone || null,
        campaign_name: log.call_log?.campaign?.name || null,
      }));
      setLogs(flattenedLogs);
    } catch (error) {
      console.error("Error fetching billing logs:", error);
    } finally {
      setLoading(false);
    }
  };

  function getInitials(name) {
    if (!name) return '';
    const parts = name.split(' ');
    let initials = parts[0].charAt(0);
    if (parts.length > 1) {
      initials += parts[parts.length - 1].charAt(0);
    }
    return initials.toUpperCase();
  }

  useEffect(() => {
    fetchBillingLogs();
  }, []);

  return (
    <>
      <div className={styles.homePageContainer}>
        {/* Page Title Section */}
        <div className={styles.pageTitleBox}>
          <div className={styles.pageTitleContainer}>
            <div className={`${styles.row} ${styles.gap0}`}>
              <div className={styles.col12}>
                <div
                  className={`${styles.pageTitleContent} ${styles.dSmFlex} ${styles.justifyContentSmBetween} ${styles.alignItemsCenter}`}
                >
                  {/* Left Section */}
                  <div>
                    <ol className={styles.breadcrumb}>
                      <li className={styles.breadcrumbItem}>
                        <a href="/">Call Tracking</a>
                      </li>
                      <li
                        className={`${styles.breadcrumbItem} ${styles.active}`}
                      >
                        Billing Report
                      </li>
                    </ol>
                    <h1 className={styles.pageTitle}>Billing Report</h1>
                  </div>

                  {/* Right Section */}
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

                    <span className={styles.dateRange}>
                      Jun 16, 2025 - Jul 10, 2025
                    </span>
                    <button
                      className={styles.filterBtn}
                      style={{ marginLeft: "10px" }}
                    >
                      Filter
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Billing Table Section */}
        <div className="page-wrapper" style={{ padding: "20px" }}>
          <div
            style={{
              backgroundColor: "#ffffff",
              width: "100%",
              maxWidth: "1200px",
              marginLeft: "40px",
              padding: "24px",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
              border: "1px solid #e2e8f0",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <div>
                <h2 style={{ margin: 0, fontSize: "20px", color: "#1e293b" }}>
                  Billing Logs
                </h2>
                <p
                  style={{
                    color: "#64748b",
                    fontSize: "14px",
                    marginTop: "4px",
                  }}
                >
                  Recent call billing transactions
                </p>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <button
                  onClick={fetchBillingLogs}
                  className="refresh-btn"
                  title="Refresh logs"
                  disabled={loading}
                >
                  <i
                    className={`fas fa-sync-alt ${loading ? "fa-spin" : ""}`}
                  ></i>
                </button>
                <span
                  style={{
                    backgroundColor: "#e2fbf9ff",
                    color: "#0D9488",
                    fontSize: "13px",
                    padding: "6px 12px",
                    borderRadius: "999px",
                  }}
                >
                  {logs.length} {logs.length === 1 ? "entry" : "entries"}
                </span>
                <div className={styles.colAuto}>
                  <button className={styles.downloadBtn}>
                    Export Data
                  </button>
                </div>
              </div>
            </div>

            <div style={{ width: "100%", overflowX: "auto" }}>
              <table style={{
                width: "100%",
                borderCollapse: "collapse",
                backgroundColor: "#ffffff",
                fontSize: "14px"
              }}>
                <thead>
                  <tr style={{ backgroundColor: "#f8fafc" }}>
                    <th style={{
                      padding: "12px 16px",
                      color: "#94A3B8",
                      textAlign: "left",
                      fontWeight: "600",
                      borderBottom: "1px solid #e2e8f0"
                    }}>CAMPAIGN</th>
                    <th style={{
                      padding: "12px 16px",
                      color: "#94A3B8",
                      textAlign: "left",
                      fontWeight: "600",
                      borderBottom: "1px solid #e2e8f0"
                    }}>CALLER</th>
                    <th style={{
                      padding: "12px 16px",
                      color: "#94A3B8",
                      textAlign: "left",
                      fontWeight: "600",
                      borderBottom: "1px solid #e2e8f0"
                    }}>BUYER</th>
                    <th style={{
                      padding: "12px 16px",
                      color: "#94A3B8",
                      textAlign: "left",
                      fontWeight: "600",
                      borderBottom: "1px solid #e2e8f0"
                    }}>DURATION</th>
                    <th style={{
                      padding: "12px 16px",
                      color: "#94A3B8",
                      textAlign: "left",
                      fontWeight: "600",
                      borderBottom: "1px solid #e2e8f0"
                    }}>AMOUNT</th>
                    <th style={{
                      padding: "12px 16px",
                      color: "#94A3B8",
                      textAlign: "left",
                      fontWeight: "600",
                      borderBottom: "1px solid #e2e8f0"
                    }}>DATE</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log, index) => (
                    <tr
                      key={log.id}
                      style={{
                        backgroundColor: index % 2 === 0 ? "#ffffff" : "#f9fbfd",
                        transition: "background-color 0.2s",
                        borderBottom: "1px solid #e2e8f0"
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f1f5f9")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = index % 2 === 0 ? "#ffffff" : "#f9fbfd")}
                    >
                      <td style={{ padding: "12px 16px" }}>
                        <div style={{
                          display: "inline-block",
                          padding: "4px 12px",
                          backgroundColor: "#ecfffdff",
                          borderRadius: "16px",
                          color: "#0E877D",
                          fontSize: "14px"
                        }}>
                          {log.campaign_name}
                        </div>
                      </td>
                      <td style={{
                        padding: "12px 16px",
                        color: "#1e293b"
                      }}>
                        {log.caller_number}
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px"
                        }}>
                          <div style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%",
                            backgroundColor: "#0E877D",
                            color: "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "12px",
                            fontWeight: "500"
                          }}>
                            {getInitials(log.buyer_name)}
                          </div>
                          {log.buyer_name}
                        </div>
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <span style={{
                          // border: "1px solid #d1d5db",
                          fontSize: "13px",
                          padding: "4px 8px",
                          borderRadius: "999px",
                          // backgroundColor: "#f1f5f9",
                          color: "#1e293b"
                        }}>
                          {log.duration_sec} sec
                        </span>
                      </td>
                      <td style={{
                        padding: "12px 16px",
                        color: "#1e293b",
                        fontWeight: "600"
                      }}>
                        ${log.amount_charged.toFixed(4)}
                      </td>
                      <td style={{
                        padding: "12px 16px",
                        color: "#64748b"
                      }}>
                        {new Date(log.created_at).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BillingReport;
