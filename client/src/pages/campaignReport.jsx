// import { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import styles from "../pages/Home.module.css";
// import BuyerChart from "../components/charts/BuyerChart";
// import axisoInstance from "../utils/axiosInstance";
// import AudioPlayer from "../components/AudioPlayer"
// const API_BASE_URL = import.meta.env.VITE_API_URL;

// function CampaignReport() {
//   const [logs, setLogs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const flattenRecentCallLogs = (data) => {
//     console.log("data", data)
//     const convertedCalls = data.callLogs
//       .filter((log) => log.is_converted)
//       .sort(
//         (a, b) =>
//           new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
//       )
//       .slice(0, 5) // Only latest 6 converted calls
//       .map((log) => ({
//         id: log.id,
//         callSid: log.call_sid,
//         callerNumber: log.caller_number,
//         to: log.buyer?.phone || "N/A",
//         duration: log.duration_sec,
//         status: log.status,
//         converted: "Yes",
//         amountCharged: log.amount_charged ?? 0,
//         campaignName: log.campaign?.name || "N/A",
//         recordingUrl: log.recording_url || "N/A",
//         createdAt: new Date(log.created_at).toLocaleString(),
//       }));

//     return convertedCalls;
//   };

//   const fetchRecentLogs = async () => {
//     try {
//       setLoading(true);
//       const res = await axisoInstance.get(
//         `${API_BASE_URL}/api/call/inbound-call-logs`
//       );
//       const callLogs = flattenRecentCallLogs(res.data);
//       setLogs(callLogs);
//     } catch (error) {
//       toast.error("Failed to fetch call logs");
//       console.error("Error fetching call logs:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchRecentLogs();
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
//                   {/* Left Section - Title & Breadcrumb */}
//                   <div>
//                     <ol className={styles.breadcrumb}>
//                       <li className={styles.breadcrumbItem}>
//                         <a href="/">Call Tracking</a>
//                       </li>
//                       <li
//                         className={`${styles.breadcrumbItem} ${styles.active}`}
//                       >
//                         Campaign Report
//                       </li>
//                     </ol>
//                     <h1 className={styles.pageTitle}>Campaign Report</h1>
//                   </div>

//                   {/* Right Section - Notification + Date Filter */}
//                   <div
//                     className={styles.dateFilter}
//                     style={{ display: "flex", alignItems: "center" }}
//                   >
//                     {/* 🔔 Notification Button */}
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
//                       {/* Red Dot */}
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
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className={styles.pageWrapper}>
//           <div className={styles.pageContent}>
//             {/* Charts Row */}
//             <div className={styles.row}>
//               <div className={`${styles.colMd12} ${styles.colLg4}`}>
//                 <div className={styles.card}>
//                   <div className={styles.cardHeader}>
//                     <div className={`${styles.row} ${styles.alignItemsCenter}`}>
//                       <div className={styles.col}>
//                         <h4 className={styles.cardTitle}>
//                           Campaign Performance
//                         </h4>
//                       </div>
//                     </div>
//                   </div>
//                   <div className={`${styles.cardBody} ${styles.pt0}`}>
//                     <BuyerChart />
//                   </div>
//                 </div>
//               </div>
//               <div className={`${styles.colMd12} ${styles.colLg8}`}>
//                 <div className={styles.card}>
//                   <div className={styles.cardHeader}>
//                     <div className={`${styles.row} ${styles.alignItemsCenter}`}>
//                       <div className={styles.col}>
//                         <h4 className={styles.cardTitle}>
//                           Recent Call Activity
//                         </h4>
//                       </div>
//                     </div>
//                   </div>
//                   <div className={`${styles.cardBody} ${styles.pt0}`}>
//                     <div style={{ width: "100%", overflowX: "auto" }}>
//                       <table
//                         style={{
//                           width: "100%",
//                           borderCollapse: "collapse",
//                           backgroundColor: "#ffffff",
//                           fontSize: "14px",
//                         }}
//                       >
//                         <thead>
//                           <tr style={{ backgroundColor: "#f8fafc" }}>
//                             <th
//                               style={{
//                                 padding: "12px 16px",
//                                 color: "#94A3B8",
//                                 textAlign: "left",
//                                 fontWeight: "600",
//                                 borderBottom: "1px solid #e2e8f0",
//                               }}
//                             >
//                               CAMPAIGN
//                             </th>
//                             <th
//                               style={{
//                                 padding: "12px 16px",
//                                 color: "#94A3B8",
//                                 textAlign: "left",
//                                 fontWeight: "600",
//                                 borderBottom: "1px solid #e2e8f0",
//                               }}
//                             >
//                               CALLER
//                             </th>
//                             <th
//                               style={{
//                                 padding: "12px 16px",
//                                 color: "#94A3B8",
//                                 textAlign: "left",
//                                 fontWeight: "600",
//                                 borderBottom: "1px solid #e2e8f0",
//                               }}
//                             >
//                               DURATION
//                             </th>
//                             <th
//                               style={{
//                                 padding: "12px 16px",
//                                 color: "#94A3B8",
//                                 textAlign: "left",
//                                 fontWeight: "600",
//                                 borderBottom: "1px solid #e2e8f0",
//                               }}
//                             >
//                               DATE
//                             </th>
//                             <th
//                               style={{
//                                 padding: "12px 16px",
//                                 color: "#94A3B8",
//                                 textAlign: "left",
//                                 fontWeight: "600",
//                                 borderBottom: "1px solid #e2e8f0",
//                               }}
//                             >
//                               RECORDINGS
//                             </th>
//                           </tr>
//                         </thead>
//                         {loading ? (
//                           <div
//                             style={{
//                               display: "flex",
//                               justifyContent: "center",
//                               alignItems: "center",
//                               height: "200px",
//                             }}
//                           >
//                             <div
//                               style={{
//                                 border: "4px solid rgba(0, 0, 0, 0.1)",
//                                 borderLeftColor: "#0E877D",
//                                 borderRadius: "50%",
//                                 width: "40px",
//                                 height: "40px",
//                                 animation: "spin 1s linear infinite",
//                               }}
//                             ></div>
//                             <style>
//                               {`
//                               @keyframes spin {
//                                 to { transform: rotate(360deg); }
//                               }
//                             `}
//                             </style>
//                           </div>
//                         ) : logs.length === 0 ? (
//                           <tr>
//                             <td colSpan="100%">
//                               <div
//                                 style={{
//                                   textAlign: "center",
//                                   marginTop: "50px",
//                                   padding: "40px 0",
//                                 }}
//                               >
//                                 <img
//                                   src="assets/images/icons/no_data2.png"
//                                   style={{ width: "20%" }}
//                                   alt="No Data"
//                                 />
//                                 <p
//                                   style={{
//                                     fontSize: "18px",
//                                     color: "#64748b",
//                                     marginTop: "16px",
//                                   }}
//                                 >
//                                   No Data Available
//                                 </p>
//                               </div>
//                             </td>
//                           </tr>
//                         ) : (
//                           <tbody>
//                             {logs.map((log, index) => (
//                               <tr
//                                 key={log.id}
//                                 style={{
//                                   backgroundColor:
//                                     index % 2 === 0 ? "#ffffff" : "#f9fbfd",
//                                   transition: "background-color 0.2s",
//                                   borderBottom: "1px solid #e2e8f0",
//                                 }}
//                                 onMouseEnter={(e) =>
//                                   (e.currentTarget.style.backgroundColor =
//                                     "#f1f5f9")
//                                 }
//                                 onMouseLeave={(e) =>
//                                   (e.currentTarget.style.backgroundColor =
//                                     index % 2 === 0 ? "#ffffff" : "#f9fbfd")
//                                 }
//                               >
//                                 <td style={{ padding: "12px 16px" }}>
//                                   <div
//                                     style={{
//                                       display: "inline-block",
//                                       padding: "4px 12px",
//                                       backgroundColor: "#ecfffdff",
//                                       borderRadius: "16px",
//                                       color: "#0E877D",
//                                       fontSize: "14px",
//                                     }}
//                                   >
//                                     {log.campaignName}
//                                   </div>
//                                 </td>
//                                 <td
//                                   style={{
//                                     padding: "12px 16px",
//                                     color: "#1e293b",
//                                   }}
//                                 >
//                                   {log.callerNumber}
//                                 </td>
//                                 <td style={{ padding: "12px 16px" }}>
//                                   <span
//                                     style={{
//                                       fontSize: "13px",
//                                       padding: "4px 8px",
//                                       borderRadius: "999px",
//                                       color: "#1e293b",
//                                     }}
//                                   >
//                                     {log.duration} sec
//                                   </span>
//                                 </td>
//                                 <td
//                                   style={{
//                                     padding: "12px 16px",
//                                     color: "#64748b",
//                                   }}
//                                 >
//                                   {log.createdAt}
//                                 </td>
//                                 {/* <td style={{ padding: "12px 16px" }}>
//                                   <span
//                                     style={{
//                                       fontSize: "13px",
//                                       padding: "4px 8px",
//                                       borderRadius: "999px",
//                                       color: "#1e293b",
//                                     }}
//                                   >
//                                     {log.recordingUrl}
//                                   </span>
//                                 </td> */}
//                                 <td style={{ padding: "12px 16px" }}>
//                                   <AudioPlayer
//                                     recordingSid={log.recording_sid}
//                                   />
//                                 </td>
//                               </tr>
//                             ))}
//                           </tbody>
//                         )}
//                       </table>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default CampaignReport;

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../pages/Home.module.css";
import BuyerChart from "../components/charts/BuyerChart";
import axisoInstance from "../utils/axiosInstance";
import AudioPlayer from "../components/AudioPlayer";

const API_BASE_URL = import.meta.env.VITE_API_URL;

function CampaignReport() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const flattenRecentCallLogs = (data) => {
    console.log("data", data)
    const convertedCalls = data.callLogs
      .filter((log) => log.is_converted)
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )
      .slice(0, 5)
      .map((log) => ({
        id: log.id,
        callSid: log.call_sid,
        callerNumber: log.caller_number,
        to: log.buyer?.phone || "N/A",
        duration: log.duration_sec,
        status: log.status,
        converted: "Yes",
        amountCharged: log.amount_charged ?? 0,
        campaignName: log.campaign?.name || "N/A",
        recordingUrl: log.recording_url || "N/A",
        recording_sid: log.recording_sid,
        createdAt: new Date(log.created_at).toLocaleString(),
      }));

    return convertedCalls;
  };

  const fetchRecentLogs = async () => {
    try {
      setLoading(true);
      const res = await axisoInstance.get(
        `${API_BASE_URL}/api/call/inbound-call-logs`
      );
      const callLogs = flattenRecentCallLogs(res.data);
      setLogs(callLogs);
    } catch (error) {
      toast.error("Failed to fetch call logs");
      console.error("Error fetching call logs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentLogs();
  }, []);

  return (
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
                    <li className={`${styles.breadcrumbItem} ${styles.active}`}>
                      Campaign Report
                    </li>
                  </ol>
                  <h1 className={styles.pageTitle}>Campaign Report</h1>
                </div>

                {/* Right Section - Notification */}
                <div className={styles.dateFilter} style={{ display: "flex", alignItems: "center" }}>
                  <button style={notificationButtonStyle}>
                    <img
                      src="/assets/images/notification.png"
                      alt="Notify"
                      style={{ width: "18px", height: "18px" }}
                    />
                    <span style={notificationDotStyle}></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.pageWrapper}>
        <div className={styles.pageContent}>
          {/* Charts Row */}
          <div className={styles.row}>
            <div className={`${styles.colMd12} ${styles.colLg4}`}>
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <h4 className={styles.cardTitle}>Buyers Performance</h4>
                </div>
                <div className={`${styles.cardBody} ${styles.pt0}`}>
                  <BuyerChart />
                </div>
              </div>
            </div>
            <div className={`${styles.colMd12} ${styles.colLg8}`}>
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <h4 className={styles.cardTitle}>Recent Call Activity</h4>
                </div>
                <div className={`${styles.cardBody} ${styles.pt0}`}>
                  <div style={{ width: "100%", overflowX: "auto" }}>
                    <table style={tableStyle}>
                      <thead>
                        <tr style={headerRowStyle}>
                          <th style={headerCellStyle}>CAMPAIGN</th>
                          <th style={headerCellStyle}>CALLER</th>
                          <th style={headerCellStyle}>DURATION</th>
                          <th style={headerCellStyle}>DATE</th>
                          <th style={headerCellStyle}>RECORDINGS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading ? (
                          <tr>
                            <td colSpan="5" style={loadingCellStyle}>
                              <div style={spinnerContainerStyle}>
                                <div style={spinnerStyle}></div>
                              </div>
                            </td>
                          </tr>
                        ) : logs.length === 0 ? (
                          <tr>
                            <td colSpan="5" style={noDataCellStyle}>
                              <div style={noDataContainerStyle}>
                                <img
                                  src="assets/images/icons/no_data2.png"
                                  style={{ width: "20%" }}
                                  alt="No Data"
                                />
                                <p style={noDataTextStyle}>No Data Available</p>
                              </div>
                            </td>
                          </tr>
                        ) : (
                          logs.map((log, index) => (
                            <tr
                              key={log.id}
                              style={{
                                ...rowStyle,
                                backgroundColor: index % 2 === 0 ? "#ffffff" : "#f9fbfd",
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f1f5f9")}
                              onMouseLeave={(e) => (
                                e.currentTarget.style.backgroundColor = index % 2 === 0 ? "#ffffff" : "#f9fbfd"
                              )}
                            >
                              <td style={cellStyle}>
                                <div style={campaignBadgeStyle}>
                                  {log.campaignName}
                                </div>
                              </td>
                              <td style={{ ...cellStyle, color: "#1e293b" }}>
                                {log.callerNumber}
                              </td>
                              <td style={cellStyle}>
                                <span style={durationStyle}>
                                  {log.duration} sec
                                </span>
                              </td>
                              <td style={{ ...cellStyle, color: "#64748b" }}>
                                {log.createdAt}
                              </td>
                              <td style={cellStyle}>
                                <AudioPlayer recordingSid={log.recording_sid} />
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Style objects
const notificationButtonStyle = {
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
};

const notificationDotStyle = {
  position: "absolute",
  top: "6px",
  right: "6px",
  width: "8px",
  height: "8px",
  backgroundColor: "red",
  borderRadius: "50%",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  backgroundColor: "#ffffff",
  fontSize: "14px",
};

const headerRowStyle = {
  backgroundColor: "#f8fafc"
};

const headerCellStyle = {
  padding: "12px 16px",
  color: "#94A3B8",
  textAlign: "left",
  fontWeight: "600",
  borderBottom: "1px solid #e2e8f0",
};

const rowStyle = {
  transition: "background-color 0.2s",
  borderBottom: "1px solid #e2e8f0",
};

const cellStyle = {
  padding: "12px 16px",
};

const campaignBadgeStyle = {
  display: "inline-block",
  padding: "4px 12px",
  backgroundColor: "#ecfffdff",
  borderRadius: "16px",
  color: "#0E877D",
  fontSize: "14px",
};

const durationStyle = {
  fontSize: "13px",
  padding: "4px 8px",
  borderRadius: "999px",
  color: "#1e293b",
};

const loadingCellStyle = {
  textAlign: "center",
  padding: "40px 0",
};

const spinnerContainerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "200px",
};

const spinnerStyle = {
  border: "4px solid rgba(0, 0, 0, 0.1)",
  borderLeftColor: "#0E877D",
  borderRadius: "50%",
  width: "40px",
  height: "40px",
  animation: "spin 1s linear infinite",
};

const noDataCellStyle = {
  textAlign: "center",
};

const noDataContainerStyle = {
  textAlign: "center",
  marginTop: "50px",
  padding: "40px 0",
};

const noDataTextStyle = {
  fontSize: "18px",
  color: "#64748b",
  marginTop: "16px",
};

export default CampaignReport;
