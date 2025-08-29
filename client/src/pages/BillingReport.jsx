// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import styles from "../pages/Home.module.css";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axiosInstance from "../utils/axiosInstance";
// // import { FiRefreshCw } from "react-icons/fi";

// const API_BASE_URL = import.meta.env.VITE_API_URL;

// function BillingReport() {
//   const [logs, setLogs] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchBillingLogs = async () => {
//     setLoading(true);
//     try {
//       const res = await axiosInstance.get(
//         `${API_BASE_URL}/api/call/billing-logs`
//       );
//       const flattenedLogs = res.data.map((log) => ({
//         id: log.id,
//         call_log_id: log.call_log_id,
//         rule_id: log.rule_id,
//         amount_charged: log.amount_charged,
//         override_rate: log.override_rate,
//         duration_sec: log.duration_sec,
//         created_at: log.created_at,
//         caller_number: log.call_log?.caller_number || null,
//         call_status: log.call_log?.status || null,
//         buyer_id: log.call_log?.buyer_id || null,
//         buyer_name: log.call_log?.buyer?.name || null,
//         buyer_phone: log.call_log?.buyer?.phone || null,
//         campaign_name: log.call_log?.campaign?.name || null,
//       }));
//       setLogs(flattenedLogs);
//       toast.success("Billing logs refreshed successfully");
//     } catch (error) {
//       console.error("Error fetching billing logs:", error);
//       toast.error("Failed to fetch billing logs");
//     } finally {
//       setLoading(false);
//     }
//   };

//   function getInitials(name) {
//     if (!name) return "";
//     const parts = name.split(" ");
//     let initials = parts[0].charAt(0);
//     if (parts.length > 1) {
//       initials += parts[parts.length - 1].charAt(0);
//     }
//     return initials.toUpperCase();
//   }

//   useEffect(() => {
//     fetchBillingLogs();
//   }, []);

//   return (
//     <>
//       <div className={styles.homePageContainer}>
//         {/* Page Title Section */}
//         <div className={styles.pageTitleBox}>
//           <div className={styles.pageTitleContainer}>
//             <div className={`${styles.row} ${styles.gap0}`}>
//               <div className={styles.col12}>
//                 <div
//                   className={`${styles.pageTitleContent} ${styles.dSmFlex} ${styles.justifyContentSmBetween} ${styles.alignItemsCenter}`}
//                 >
//                   {/* Left Section */}
//                   <div>
//                     <ol className={styles.breadcrumb}>
//                       <li className={styles.breadcrumbItem}>
//                         <a href="/">Call Tracking</a>
//                       </li>
//                       <li
//                         className={`${styles.breadcrumbItem} ${styles.active}`}
//                       >
//                         Billing Report
//                       </li>
//                     </ol>
//                     <h1 className={styles.pageTitle}>Billing Report</h1>
//                   </div>

//                   {/* Right Section */}
//                   <div
//                     className={styles.dateFilter}
//                     style={{ display: "flex", alignItems: "center" }}
//                   >
//                     <button
//                       style={{
//                         width: "38px",
//                         height: "38px",
//                         borderRadius: "50%",
//                         border: "none",
//                         backgroundColor: "#f2f2f2",
//                         marginRight: "10px",
//                         position: "relative",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         cursor: "pointer",
//                       }}
//                     >
//                       <img
//                         src="/assets/images/notification.png"
//                         alt="Notify"
//                         style={{ width: "18px", height: "18px" }}
//                       />
//                       <span
//                         style={{
//                           position: "absolute",
//                           top: "6px",
//                           right: "6px",
//                           width: "8px",
//                           height: "8px",
//                           backgroundColor: "red",
//                           borderRadius: "50%",
//                         }}
//                       ></span>
//                     </button>

//                     <span className={styles.dateRange}>
//                       Jun 16, 2025 - Jul 10, 2025
//                     </span>
//                     <button
//                       className={styles.filterBtn}
//                       style={{ marginLeft: "10px" }}
//                     >
//                       Filter
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Billing Table Section */}
//         <div className="page-wrapper" style={{ padding: "20px" }}>
//           <div
//             style={{
//               backgroundColor: "#ffffff",
//               width: "100%",
//               maxWidth: "1200px",
//               marginLeft: "40px",
//               padding: "24px",
//               borderRadius: "12px",
//               boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
//               border: "1px solid #e2e8f0",
//             }}
//           >
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 marginBottom: "20px",
//               }}
//             >
//               <div>
//                 <h2 style={{ margin: 0, fontSize: "20px", color: "#1e293b" }}>
//                   Billing Logs
//                 </h2>
//                 <p
//                   style={{
//                     color: "#64748b",
//                     fontSize: "14px",
//                     marginTop: "4px",
//                   }}
//                 >
//                   Recent call billing transactions
//                 </p>
//               </div>
//               <div
//                 style={{ display: "flex", alignItems: "center", gap: "12px" }}
//               >
//                 <button
//                   onClick={fetchBillingLogs}
//                   className="refresh-btn"
//                   title="Refresh logs"
//                   disabled={loading}
//                 >
//                   <i
//                     className={`fas fa-sync-alt ${loading ? "fa-spin" : ""}`}
//                   ></i>
//                 </button>
//                 <span
//                   style={{
//                     backgroundColor: "#e2fbf9ff",
//                     color: "#0D9488",
//                     fontSize: "13px",
//                     padding: "6px 12px",
//                     borderRadius: "999px",
//                   }}
//                 >
//                   {logs.length} {logs.length === 1 ? "entry" : "entries"}
//                 </span>
//                 <div className={styles.colAuto}>
//                   <button className={styles.downloadBtn}>Export Data</button>
//                 </div>
//               </div>
//             </div>

//             <div style={{ width: "100%", overflowX: "auto" }}>
//               <table
//                 style={{
//                   width: "100%",
//                   borderCollapse: "collapse",
//                   backgroundColor: "#ffffff",
//                   fontSize: "14px",
//                 }}
//               >
//                 <thead>
//                   <tr style={{ backgroundColor: "#f8fafc" }}>
//                     <th
//                       style={{
//                         padding: "12px 16px",
//                         color: "#94A3B8",
//                         textAlign: "left",
//                         fontWeight: "600",
//                         borderBottom: "1px solid #e2e8f0",
//                       }}
//                     >
//                       CAMPAIGN
//                     </th>
//                     <th
//                       style={{
//                         padding: "12px 16px",
//                         color: "#94A3B8",
//                         textAlign: "left",
//                         fontWeight: "600",
//                         borderBottom: "1px solid #e2e8f0",
//                       }}
//                     >
//                       CALLER
//                     </th>
//                     <th
//                       style={{
//                         padding: "12px 16px",
//                         color: "#94A3B8",
//                         textAlign: "left",
//                         fontWeight: "600",
//                         borderBottom: "1px solid #e2e8f0",
//                       }}
//                     >
//                       BUYER
//                     </th>
//                     <th
//                       style={{
//                         padding: "12px 16px",
//                         color: "#94A3B8",
//                         textAlign: "left",
//                         fontWeight: "600",
//                         borderBottom: "1px solid #e2e8f0",
//                       }}
//                     >
//                       DURATION
//                     </th>
//                     <th
//                       style={{
//                         padding: "12px 16px",
//                         color: "#94A3B8",
//                         textAlign: "left",
//                         fontWeight: "600",
//                         borderBottom: "1px solid #e2e8f0",
//                       }}
//                     >
//                       AMOUNT
//                     </th>
//                     <th
//                       style={{
//                         padding: "12px 16px",
//                         color: "#94A3B8",
//                         textAlign: "left",
//                         fontWeight: "600",
//                         borderBottom: "1px solid #e2e8f0",
//                       }}
//                     >
//                       DATE
//                     </th>
//                   </tr>
//                 </thead>
//                 {loading ? (
//                         <div
//                           style={{
//                             display: "flex",
//                             justifyContent: "center",
//                             alignItems: "center",
//                             height: "200px",
//                           }}
//                         >
//                           <div
//                             style={{
//                               border: "4px solid rgba(0, 0, 0, 0.1)",
//                               borderLeftColor: "#0E877D",
//                               borderRadius: "50%",
//                               width: "40px",
//                               height: "40px",
//                               animation: "spin 1s linear infinite",
//                             }}
//                           ></div>
//                           <style>
//                             {`
//                               @keyframes spin {
//                                 to { transform: rotate(360deg); }
//                               }
//                             `}
//                           </style>
//                         </div>
//                       ) :
//                 logs.length === 0 ? (
//                   <tr>
//                     <td colSpan="100%">
//                       <div
//                         style={{
//                           textAlign: "center",
//                           marginTop: "50px",
//                           padding: "40px 0",
//                         }}
//                       >
//                         <img
//                           src="assets/images/icons/no_data2.png"
//                           style={{ width: "14%" }}
//                           alt="No Data"
//                         />
//                         <p
//                           style={{
//                             fontSize: "18px",
//                             color: "#64748b",
//                             marginTop: "16px",
//                           }}
//                         >
//                           No Data Available
//                         </p>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   <tbody>
//                     {logs.map((log, index) => (
//                       <tr
//                         key={log.id}
//                         style={{
//                           backgroundColor:
//                             index % 2 === 0 ? "#ffffff" : "#f9fbfd",
//                           transition: "background-color 0.2s",
//                           borderBottom: "1px solid #e2e8f0",
//                         }}
//                         onMouseEnter={(e) =>
//                           (e.currentTarget.style.backgroundColor = "#f1f5f9")
//                         }
//                         onMouseLeave={(e) =>
//                           (e.currentTarget.style.backgroundColor =
//                             index % 2 === 0 ? "#ffffff" : "#f9fbfd")
//                         }
//                       >
//                         <td style={{ padding: "12px 16px" }}>
//                           <div
//                             style={{
//                               display: "inline-block",
//                               padding: "4px 12px",
//                               backgroundColor: "#ecfffdff",
//                               borderRadius: "16px",
//                               color: "#0E877D",
//                               fontSize: "14px",
//                             }}
//                           >
//                             {log.campaign_name}
//                           </div>
//                         </td>
//                         <td
//                           style={{
//                             padding: "12px 16px",
//                             color: "#1e293b",
//                           }}
//                         >
//                           {log.caller_number}
//                         </td>
//                         <td style={{ padding: "12px 16px" }}>
//                           <div
//                             style={{
//                               display: "flex",
//                               alignItems: "center",
//                               gap: "8px",
//                             }}
//                           >
//                             <div
//                               style={{
//                                 width: "32px",
//                                 height: "32px",
//                                 borderRadius: "50%",
//                                 backgroundColor: "#0E877D",
//                                 color: "white",
//                                 display: "flex",
//                                 alignItems: "center",
//                                 justifyContent: "center",
//                                 fontSize: "12px",
//                                 fontWeight: "500",
//                               }}
//                             >
//                               {getInitials(log.buyer_name)}
//                             </div>
//                             {log.buyer_name}
//                           </div>
//                         </td>
//                         <td style={{ padding: "12px 16px" }}>
//                           <span
//                             style={{
//                               // border: "1px solid #d1d5db",
//                               fontSize: "13px",
//                               padding: "4px 8px",
//                               borderRadius: "999px",
//                               // backgroundColor: "#f1f5f9",
//                               color: "#1e293b",
//                             }}
//                           >
//                             {log.duration_sec} sec
//                           </span>
//                         </td>
//                         <td
//                           style={{
//                             padding: "12px 16px",
//                             color: "#1e293b",
//                             fontWeight: "600",
//                           }}
//                         >
//                           ${log.amount_charged.toFixed(4)}
//                         </td>
//                         <td
//                           style={{
//                             padding: "12px 16px",
//                             color: "#64748b",
//                           }}
//                         >
//                           {new Date(log.created_at).toLocaleString()}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 )}
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default BillingReport;

import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../pages/Home.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../utils/axiosInstance";
import Papa from "papaparse";

const API_BASE_URL = import.meta.env.VITE_API_URL;

function BillingReport() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [filters, setFilters] = useState({
    buyer: "",
    campaign: "",
    dateFrom: "",
    dateTo: "",
  });
  const [showFilterModal, setShowFilterModal] = useState(false);

  const fetchBillingLogs = async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        limit: itemsPerPage,
        ...(filters.buyer && { buyer: filters.buyer }),
        ...(filters.campaign && { campaign: filters.campaign }),
        ...(filters.dateFrom && { dateFrom: filters.dateFrom }),
        ...(filters.dateTo && { dateTo: filters.dateTo }),
      };

      const res = await axiosInstance.get(
        `${API_BASE_URL}/api/call/billing-logs`,
        { params }
      );

      const flattenedLogs = res.data.data.map((log) => ({
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
      setTotalItems(res.data.total);
      toast.success("Billing logs refreshed successfully");
    } catch (error) {
      console.error("Error fetching billing logs:", error);
      toast.error("Failed to fetch billing logs");
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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const applyFilters = () => {
    setCurrentPage(1);
    fetchBillingLogs();
    setShowFilterModal(false);
  };

  const resetFilters = () => {
    setFilters({
      buyer: "",
      campaign: "",
      dateFrom: "",
      dateTo: "",
    });
    setCurrentPage(1);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    fetchBillingLogs();
  }, [currentPage]);

  const exportToCSV = () => {
    if (!logs.length) {
      toast.info("No logs available to export.");
      return;
    }

    const csvData = logs.map((log) => ({
      Campaign: log.campaign_name,
      Caller: log.caller_number,
      Buyer: log.buyer_name,
      "Buyer Phone": log.buyer_phone,
      Duration: log.duration_sec,
      "Call Status": log.call_status,
      Amount: log.amount_charged,
      "Created At": new Date(log.created_at).toLocaleString(),
    }));

    const csv = Papa.unparse(csvData);

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `billing-report-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Exported Billing Reports to CSV");
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
                      {filters.dateFrom || "Start date"} -{" "}
                      {filters.dateTo || "End date"}
                    </span>
                    <button
                      className={styles.filterBtn}
                      style={{ marginLeft: "10px" }}
                      onClick={() => setShowFilterModal(true)}
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
                  {totalItems} {totalItems === 1 ? "entry" : "entries"}
                </span>
                <button className={styles.downloadBtn} onClick={exportToCSV}>
                  Export Data
                </button>
              </div>
            </div>

            {/* Active Filters */}
            {(filters.buyer ||
              filters.campaign ||
              filters.dateFrom ||
              filters.dateTo) && (
              <div
                style={{
                  marginBottom: "16px",
                  display: "flex",
                  gap: "8px",
                  flexWrap: "wrap",
                }}
              >
                {filters.buyer && (
                  <span
                    style={{
                      backgroundColor: "#e2fbf9",
                      color: "#0D9488",
                      padding: "4px 12px",
                      borderRadius: "16px",
                      fontSize: "12px",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    Buyer: {filters.buyer}
                    <button
                      onClick={() =>
                        setFilters((prev) => ({ ...prev, buyer: "" }))
                      }
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      ×
                    </button>
                  </span>
                )}
                {filters.campaign && (
                  <span
                    style={{
                      backgroundColor: "#e2fbf9",
                      color: "#0D9488",
                      padding: "4px 12px",
                      borderRadius: "16px",
                      fontSize: "12px",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    Campaign: {filters.campaign}
                    <button
                      onClick={() =>
                        setFilters((prev) => ({ ...prev, campaign: "" }))
                      }
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      ×
                    </button>
                  </span>
                )}
                {(filters.dateFrom || filters.dateTo) && (
                  <span
                    style={{
                      backgroundColor: "#e2fbf9",
                      color: "#0D9488",
                      padding: "4px 12px",
                      borderRadius: "16px",
                      fontSize: "12px",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    Date: {filters.dateFrom || "Start"} -{" "}
                    {filters.dateTo || "End"}
                    <button
                      onClick={() =>
                        setFilters((prev) => ({
                          ...prev,
                          dateFrom: "",
                          dateTo: "",
                        }))
                      }
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      ×
                    </button>
                  </span>
                )}
                <button
                  onClick={resetFilters}
                  style={{
                    backgroundColor: "transparent",
                    color: "#64748b",
                    border: "none",
                    fontSize: "12px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  Clear all
                </button>
              </div>
            )}

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
                      AMOUNT
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
                {loading ? (
                  <tbody>
                    <tr>
                      <td
                        colSpan="6"
                        style={{ textAlign: "center", padding: "40px 0" }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              border: "4px solid rgba(0, 0, 0, 0.1)",
                              borderLeftColor: "#0E877D",
                              borderRadius: "50%",
                              width: "40px",
                              height: "40px",
                              animation: "spin 1s linear infinite",
                            }}
                          ></div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ) : logs.length === 0 ? (
                  <tbody>
                    <tr>
                      <td colSpan="6">
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
                  </tbody>
                ) : (
                  <tbody>
                    {logs.map((log, index) => (
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
                            {log.campaign_name}
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
                              {getInitials(log.buyer_name)}
                            </div>
                            {log.buyer_name}
                          </div>
                        </td>
                        <td style={{ padding: "12px 16px" }}>
                          <span
                            style={{
                              fontSize: "13px",
                              padding: "4px 8px",
                              borderRadius: "999px",
                              color: "#1e293b",
                            }}
                          >
                            {log.duration_sec} sec
                          </span>
                        </td>
                        <td
                          style={{
                            padding: "12px 16px",
                            color: "#1e293b",
                            fontWeight: "600",
                          }}
                        >
                          ${log.amount_charged.toFixed(4)}
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

              {/* Pagination */}
              {totalItems > itemsPerPage && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "20px",
                    padding: "12px 16px",
                    borderTop: "1px solid #e2e8f0",
                  }}
                >
                  <div>
                    Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                    {Math.min(currentPage * itemsPerPage, totalItems)} of{" "}
                    {totalItems} entries
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      style={{
                        padding: "8px 12px",
                        border: "1px solid #e2e8f0",
                        borderRadius: "4px",
                        backgroundColor:
                          currentPage === 1 ? "#f1f5f9" : "#ffffff",
                        color: currentPage === 1 ? "#94a3b8" : "#334155",
                        cursor: currentPage === 1 ? "not-allowed" : "pointer",
                      }}
                    >
                      Previous
                    </button>
                    {Array.from(
                      {
                        length: Math.min(
                          5,
                          Math.ceil(totalItems / itemsPerPage)
                        ),
                      },
                      (_, i) => {
                        let pageNum;
                        if (Math.ceil(totalItems / itemsPerPage) <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (
                          currentPage >=
                          Math.ceil(totalItems / itemsPerPage) - 2
                        ) {
                          pageNum =
                            Math.ceil(totalItems / itemsPerPage) - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }
                        return (
                          <button
                            key={pageNum}
                            onClick={() => paginate(pageNum)}
                            style={{
                              padding: "8px 12px",
                              border: "1px solid #e2e8f0",
                              borderRadius: "4px",
                              backgroundColor:
                                currentPage === pageNum ? "#0E877D" : "#ffffff",
                              color:
                                currentPage === pageNum ? "#ffffff" : "#334155",
                              cursor: "pointer",
                            }}
                          >
                            {pageNum}
                          </button>
                        );
                      }
                    )}
                    <button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={
                        currentPage === Math.ceil(totalItems / itemsPerPage)
                      }
                      style={{
                        padding: "8px 12px",
                        border: "1px solid #e2e8f0",
                        borderRadius: "4px",
                        backgroundColor:
                          currentPage === Math.ceil(totalItems / itemsPerPage)
                            ? "#f1f5f9"
                            : "#ffffff",
                        color:
                          currentPage === Math.ceil(totalItems / itemsPerPage)
                            ? "#94a3b8"
                            : "#334155",
                        cursor:
                          currentPage === Math.ceil(totalItems / itemsPerPage)
                            ? "not-allowed"
                            : "pointer",
                      }}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Filter Modal */}
        {showFilterModal && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                padding: "24px",
                width: "400px",
                maxWidth: "90%",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
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
                <h3 style={{ margin: 0 }}>Filter Billing Logs</h3>
                <button
                  onClick={() => setShowFilterModal(false)}
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "20px",
                    cursor: "pointer",
                    color: "#64748b",
                  }}
                >
                  ×
                </button>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontSize: "14px",
                    color: "#334155",
                    fontWeight: "500",
                  }}
                >
                  Buyer Name
                </label>
                <input
                  type="text"
                  name="buyer"
                  value={filters.buyer}
                  onChange={handleFilterChange}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    border: "1px solid #e2e8f0",
                    borderRadius: "4px",
                    fontSize: "14px",
                  }}
                  placeholder="Filter by buyer name"
                />
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontSize: "14px",
                    color: "#334155",
                    fontWeight: "500",
                  }}
                >
                  Campaign Name
                </label>
                <input
                  type="text"
                  name="campaign"
                  value={filters.campaign}
                  onChange={handleFilterChange}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    border: "1px solid #e2e8f0",
                    borderRadius: "4px",
                    fontSize: "14px",
                  }}
                  placeholder="Filter by campaign name"
                />
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontSize: "14px",
                    color: "#334155",
                    fontWeight: "500",
                  }}
                >
                  Date Range
                </label>
                <div style={{ display: "flex", gap: "8px" }}>
                  <input
                    type="date"
                    name="dateFrom"
                    value={filters.dateFrom}
                    onChange={handleFilterChange}
                    style={{
                      flex: 1,
                      padding: "10px 12px",
                      border: "1px solid #e2e8f0",
                      borderRadius: "4px",
                      fontSize: "14px",
                    }}
                  />
                  <span style={{ display: "flex", alignItems: "center" }}>
                    to
                  </span>
                  <input
                    type="date"
                    name="dateTo"
                    value={filters.dateTo}
                    onChange={handleFilterChange}
                    style={{
                      flex: 1,
                      padding: "10px 12px",
                      border: "1px solid #e2e8f0",
                      borderRadius: "4px",
                      fontSize: "14px",
                    }}
                  />
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "12px",
                  marginTop: "24px",
                }}
              >
                <button
                  onClick={resetFilters}
                  style={{
                    padding: "10px 16px",
                    border: "1px solid #e2e8f0",
                    borderRadius: "4px",
                    backgroundColor: "#ffffff",
                    color: "#334155",
                    cursor: "pointer",
                  }}
                >
                  Reset
                </button>
                <button
                  onClick={applyFilters}
                  style={{
                    padding: "10px 16px",
                    border: "none",
                    borderRadius: "4px",
                    backgroundColor: "#0E877D",
                    color: "#ffffff",
                    cursor: "pointer",
                  }}
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </>
  );
}

export default BillingReport;
