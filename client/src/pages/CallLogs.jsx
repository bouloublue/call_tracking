import { useState, useEffect } from "react";
import styles from "./Home.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../utils/axiosInstance";
import flattenCallLogs from "../utils/flattenData"

const API_BASE_URL = import.meta.env.VITE_API_URL;

function CallLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
   // Add these state variables for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // You can adjust this number


  const authData = JSON.parse(localStorage.getItem("token"));
  const role = authData?.role;

   const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLogs = logs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(logs.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const fetchCallLogs = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(
        `${API_BASE_URL}/api/call/inbound-call-logs`
      );
      const flattenData = flattenCallLogs(res.data);
      setLogs(flattenData);
      setCurrentPage(1); // Reset to first page when new data is fetched
      toast.success("Call logs fetched successfully");
    } catch (error) {
      console.error("Error fetching call logs:", error);
      toast.error("Error fetching call logs");
    } finally {
      setLoading(false);
    }
  };

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
    fetchCallLogs();
  }, []);

  const exportToCSV = () => {
    if (!logs || logs.length === 0) {
      toast.warning("No data to export");
      return;
    }

    const headers = [
      "Campaign",
      "Caller",
      ...(role === "admin" ? ["Buyer"] : []),
      "Duration",
      "Status",
      "Converted",
      "Date",
    ];

    const rows = logs.map((log) => [
      log.campaign?.name || "",
      log.caller_number || "",
      ...(role === "admin"
        ? [`${log.buyer?.name || ""} (${log.buyer?.phone || ""})`]
        : []),
      formatDuration(log.duration_sec || 0),
      log.status,
      log.is_converted ? "Yes" : "No",
      new Date(log.created_at).toLocaleString(),
    ]);

    const csvContent = [headers, ...rows]
      .map((e) =>
        e.map((field) => `"${String(field).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "cs_call_logs.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("Exported call logs to CSV");
  };

  const Pagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        marginTop: '20px',
        alignItems: 'center',
        gap: '8px'
      }}>
        <button
          onClick={() => paginate(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          style={{
            padding: '6px 12px',
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
            backgroundColor: currentPage === 1 ? '#f1f5f9' : 'white',
            color: currentPage === 1 ? '#94a3b8' : '#334155',
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
            fontSize: '14px'
          }}
        >
          Previous
        </button>

        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => paginate(number)}
            style={{
              padding: '6px 12px',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              backgroundColor: currentPage === number ? '#0E877D' : 'white',
              color: currentPage === number ? 'white' : '#334155',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            {number}
          </button>
        ))}

        <button
          onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          style={{
            padding: '6px 12px',
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
            backgroundColor: currentPage === totalPages ? '#f1f5f9' : 'white',
            color: currentPage === totalPages ? '#94a3b8' : '#334155',
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
            fontSize: '14px'
          }}
        >
          Next
        </button>
      </div>
    );
  };

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
                        Call Logs
                      </li>
                    </ol>
                    <h1 className={styles.pageTitle}>Call Logs</h1>
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

        {/* Call Logs Table Section */}
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
                  Inbound Call Logs
                </h2>
                <p
                  style={{
                    color: "#64748b",
                    fontSize: "14px",
                    marginTop: "4px",
                  }}
                >
                  Recent inbound call activities
                </p>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <button
                  onClick={fetchCallLogs}
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
                  {logs.length} {logs.length === 1 ? "call" : "calls"}
                </span>
                <div className={styles.colAuto}>
                  <button className={styles.downloadBtn} onClick={exportToCSV}>
                    Export CSV
                  </button>
                </div>
              </div>
            </div>

            <div style={{ width: "100%", overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  backgroundColor: "#ffffff",
                  fontSize: "14px",
                }}
              >
                <thead>
                  <tr style={{ backgroundColor: "#f8fafc" }}>
                    <th
                      style={{
                        padding: "12px 16px",
                        color: "#94A3B8",
                        textAlign: "left",
                        fontWeight: "600",
                        borderBottom: "1px solid #e2e8f0",
                      }}
                    >
                      CAMPAIGN
                    </th>
                    <th
                      style={{
                        padding: "12px 16px",
                        color: "#94A3B8",
                        textAlign: "left",
                        fontWeight: "600",
                        borderBottom: "1px solid #e2e8f0",
                      }}
                    >
                      CALLER
                    </th>
                    {role === "admin" && (
                      <th
                        style={{
                          padding: "12px 16px",
                          color: "#94A3B8",
                          textAlign: "left",
                          fontWeight: "600",
                          borderBottom: "1px solid #e2e8f0",
                        }}
                      >
                        BUYER
                      </th>
                    )}
                    <th
                      style={{
                        padding: "12px 16px",
                        color: "#94A3B8",
                        textAlign: "left",
                        fontWeight: "600",
                        borderBottom: "1px solid #e2e8f0",
                      }}
                    >
                      DURATION
                    </th>
                    <th
                      style={{
                        padding: "12px 16px",
                        color: "#94A3B8",
                        textAlign: "left",
                        fontWeight: "600",
                        borderBottom: "1px solid #e2e8f0",
                      }}
                    >
                      STATUS
                    </th>
                    <th
                      style={{
                        padding: "12px 16px",
                        color: "#94A3B8",
                        textAlign: "left",
                        fontWeight: "600",
                        borderBottom: "1px solid #e2e8f0",
                      }}
                    >
                      CONVERTED
                    </th>
                    <th
                      style={{
                        padding: "12px 16px",
                        color: "#94A3B8",
                        textAlign: "left",
                        fontWeight: "600",
                        borderBottom: "1px solid #e2e8f0",
                      }}
                    >
                      DATE
                    </th>
                  </tr>
                </thead>
                                {logs.length === 0 ? (
                  <tr>
                    <td colSpan="100%">
                      <div
                        style={{
                          textAlign: "center",
                          marginTop: "50px",
                          padding: "40px 0",
                        }}
                      >
                        <img
                          src="assets/images/icons/no_data2.png"
                          style={{ width: "14%" }}
                          alt="No Data"
                        />
                        <p
                          style={{
                            fontSize: "18px",
                            color: "#64748b",
                            marginTop: "16px",
                          }}
                        >
                          No Data Available
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                <tbody>
                  {currentLogs.map((log, index) => (
                    <tr
                      key={log.id}
                      style={{
                        backgroundColor:
                          index % 2 === 0 ? "#ffffff" : "#f9fbfd",
                        transition: "background-color 0.2s",
                        borderBottom: "1px solid #e2e8f0",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "#f1f5f9")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          index % 2 === 0 ? "#ffffff" : "#f9fbfd")
                      }
                    >
                      <td style={{ padding: "12px 16px" }}>
                        <div
                          style={{
                            display: "inline-block",
                            padding: "4px 12px",
                            backgroundColor: "#ecfffdff",
                            borderRadius: "16px",
                            color: "#0E877D",
                            fontSize: "14px",
                          }}
                        >
                          {log.campaign?.name}
                        </div>
                      </td>
                      <td
                        style={{
                          padding: "12px 16px",
                          color: "#1e293b",
                        }}
                      >
                        {log.caller_number}
                      </td>
                      {role === "admin" && (
                        <td style={{ padding: "12px 16px" }}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                            }}
                          >
                            <div
                              style={{
                                width: "32px",
                                height: "32px",
                                borderRadius: "50%",
                                backgroundColor: "#0E877D",
                                color: "white",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "12px",
                                fontWeight: "500",
                              }}
                            >
                              {getInitials(log.buyer?.name)}
                            </div>
                            {log.buyer?.name}
                          </div>
                        </td>
                      )}
                      <td style={{ padding: "12px 16px" }}>
                        <span
                          style={{
                            fontSize: "13px",
                            color: "#1e293b",
                          }}
                        >
                          {formatDuration(log.duration_sec)}
                        </span>
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        {getStatusBadge(log.status)}
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <span
                          style={{
                            backgroundColor: log.is_converted
                              ? "#ECFDF5"
                              : "#FEF2F2",
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
                      <td
                        style={{
                          padding: "12px 16px",
                          color: "#64748b",
                        }}
                      >
                        {new Date(log.created_at).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
                )}
              </table>
              {logs.length > 0 && <Pagination />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CallLogs;
