// import { useState } from "react";
// import NavBar from "../components/NavBar";
// import SideBar from "../components/SideBar";

// function CallLogs() {
//   const [selectedLead, setSelectedLead] = useState(null);
//   const [showLeadDetails, setShowLeadDetails] = useState(false);

//   const callLogs = [
//     {
//       reference: "MEP_2725043",
//       campaign: "Make New Mobile Application",
//       name: "Bertram",
//       email: "destinee00@example.net",
//       duration: "3 M, 31 S",
//       calledOn: "13-06-2025 10:41 am",
//       calledBy: "Admin",
//     },
//     {
//       reference: "MEP_6530534",
//       campaign: "Make New Mobile Application",
//       name: "Kirstin",
//       email: "wschowalter@example.org",
//       duration: "3 M, 20 S",
//       calledOn: "13-06-2025 11:09 pm",
//       calledBy: "Admin",
//     },
//     {
//       reference: "MEP_9956863",
//       campaign: "Make New Mobile Application",
//       name: "Trey",
//       email: "ashlynn.schumm@example.com",
//       duration: "3 M, 31 S",
//       calledOn: "14-06-2025 12:36 pm",
//       calledBy: "Admin",
//     },
//     {
//       reference: "MEP_8333418",
//       campaign: "Make New Mobile Application",
//       name: "Regan",
//       email: "motson@example.net",
//       duration: "3 M, 1 S",
//       calledOn: "16-06-2025 03:06 pm",
//       calledBy: "Admin",
//     },
//     {
//       reference: "MEP_6049708",
//       campaign: "Electronic Item Self Campaign",
//       name: "Stan",
//       email: "lemke.arl@example.org",
//       duration: "4 M, 47 S",
//       calledOn: "07-06-2025 11:40 am",
//       calledBy: "Admin",
//     },
//     {
//       reference: "MEP_2522527",
//       campaign: "Electronic Item Self Campaign",
//       name: "Wilhelminie",
//       email: "marks.eugene@example.com",
//       duration: "4 M, 47 S",
//       calledOn: "06-06-2025 08:03 pm",
//       calledBy: "Admin",
//     },
//     {
//       reference: "MEP_5155932",
//       campaign: "Electronic Item Self Campaign",
//       name: "Miracle",
//       email: "qmett@example.org",
//       duration: "4 M, 17 S",
//       calledOn: "16-06-2025 03:35 am",
//       calledBy: "Admin",
//     },
//     {
//       reference: "MEP_8135481",
//       campaign: "Website Development Campaign",
//       name: "Anahi",
//       email: "marvin09@example.org",
//       duration: "3 M, 20 S",
//       calledOn: "15-06-2025 10:54 pm",
//       calledBy: "Admin",
//     },
//     {
//       reference: "MEP_5457366",
//       campaign: "Website Development Campaign",
//       name: "Zachary",
//       email: "klodman@example.com",
//       duration: "3 M, 54 S",
//       calledOn: "31-05-2025 10:06 pm",
//       calledBy: "Admin",
//     },
//     {
//       reference: "MEP_4601308",
//       campaign: "Website Development Campaign",
//       name: "Kole",
//       email: "deontae.marks@example.com",
//       duration: "3 M, 16 S",
//       calledOn: "11-06-2025 06:27 pm",
//       calledBy: "Admin",
//     },
//   ];

//   const handleReferenceClick = (log) => {
//     setSelectedLead({
//       ...log,
//       firstName: "Royce",
//       lastName: "Larkin",
//       company: "Lockman Ltd",
//       phone: "+19106971779",
//       website: "crudschank.com",
//       firstActionBy: "Admin",
//       leadNotes: "Interested in website redesign",
//       leadData: "High priority lead",
//     });
//     setShowLeadDetails(true);
//   };

//   return (
//     <div>
//       <NavBar />
//       <SideBar />

//         <div className="page-title-box">
//         <div className="container-fluid">
//           <div className="row gap-0">
//             <div className="col-sm-12">
//               <div className="page-title-content d-sm-flex justify-content-sm-between align-items-center">
//                 <div className="">
//                   <ol className="breadcrumb mb-0">
//                     <li className="breadcrumb-item">
//                       <a href="/">Call Tracking</a>
//                     </li>
//                     <li className="breadcrumb-item active">Call Logs</li>
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
//                        <div className="row mb-4">
//               <div className="col-12">
//                 <div className="d-flex justify-content-between align-items-center">
//                   <h4 className="mb-0">Call Logs</h4>
//                 </div>
//               </div>
//             </div>

//             <div className="row mb-4">
//               <div className="col-12">
//                 <div className="d-flex">
//                   <button className="btn btn-outline-primary me-2">
//                     Active Campaign
//                   </button>
//                   <button className="btn btn-outline-secondary me-2">
//                     Completed Campaign
//                   </button>
//                 </div>
//               </div>
//             </div>
//             <div className="row mb-4">
//               <div className="col-12">
//                 <div className="d-flex align-items-center flex-wrap gap-3">
//                   {/* Campaign Filter */}
//                   <div
//                     className="flex-grow-1"
//                     style={{ minWidth: "200px", maxWidth: "300px" }}
//                   >
//                     <label
//                       htmlFor="campaignFilter"
//                       className="form-label small text-muted mb-1"
//                     >
//                       Campaign
//                     </label>
//                     <select
//                       id="campaignFilter"
//                       className="form-select form-select-sm shadow-sm"
//                       style={{
//                         borderRadius: "8px",
//                         border: "1px solid #e0e0e0",
//                       }}
//                     >
//                       <option>Select Campaign Name...</option>
//                       <option>Make New Mobile Application</option>
//                       <option>Electronic Item Self Campaign</option>
//                       <option>Website Development Campaign</option>
//                     </select>
//                   </div>

//                   {/* User Filter */}
//                   <div
//                     className="flex-grow-1"
//                     style={{ minWidth: "200px", maxWidth: "300px" }}
//                   >
//                     <label
//                       htmlFor="userFilter"
//                       className="form-label small text-muted mb-1"
//                     >
//                       User
//                     </label>
//                     <select
//                       id="userFilter"
//                       className="form-select form-select-sm shadow-sm"
//                       style={{
//                         borderRadius: "8px",
//                         border: "1px solid #e0e0e0",
//                       }}
//                     >
//                       <option>All Users</option>
//                       <option>Admin</option>
//                       <option>Manager</option>
//                       <option>Tony</option>
//                       <option>John</option>
//                       <option>Jane</option>
//                       <option>Doe</option>
//                     </select>
//                   </div>

//                   {/* Status Filter */}
//                   <div
//                     className="flex-grow-1"
//                     style={{ minWidth: "200px", maxWidth: "300px" }}
//                   >
//                     <label
//                       htmlFor="statusFilter"
//                       className="form-label small text-muted mb-1"
//                     >
//                       Status
//                     </label>
//                     <select
//                       id="statusFilter"
//                       className="form-select form-select-sm shadow-sm"
//                       style={{
//                         borderRadius: "8px",
//                         border: "1px solid #e0e0e0",
//                       }}
//                     >
//                       <option>All Statuses</option>
//                       <option>Active</option>
//                       <option>Completed</option>
//                       <option>Pending</option>
//                     </select>
//                   </div>

//                   {/* Date Range - From */}
//                   <div
//                     className="flex-grow-1"
//                     style={{ minWidth: "200px", maxWidth: "300px" }}
//                   >
//                     <label
//                       htmlFor="fromDate"
//                       className="form-label small text-muted mb-1"
//                     >
//                       From
//                     </label>
//                     <div className="input-group input-group-sm">
//                       <input
//                         type="date"
//                         id="fromDate"
//                         className="form-control form-control-sm shadow-sm"
//                         style={{
//                           borderRadius: "8px",
//                           border: "1px solid #e0e0e0",
//                         }}
//                       />
//                       <span
//                         className="input-group-text bg-white"
//                         style={{ borderLeft: "none" }}
//                       >
//                         <i className="bi bi-calendar"></i>
//                       </span>
//                     </div>
//                   </div>

//                   {/* Date Range - To */}
//                   <div
//                     className="flex-grow-1"
//                     style={{ minWidth: "200px", maxWidth: "300px" }}
//                   >
//                     <label
//                       htmlFor="toDate"
//                       className="form-label small text-muted mb-1"
//                     >
//                       To
//                     </label>
//                     <div className="input-group input-group-sm">
//                       <input
//                         type="date"
//                         id="toDate"
//                         className="form-control form-control-sm shadow-sm"
//                         style={{
//                           borderRadius: "8px",
//                           border: "1px solid #e0e0e0",
//                         }}
//                       />
//                       <span
//                         className="input-group-text bg-white"
//                         style={{ borderLeft: "none" }}
//                       >
//                         <i className="bi bi-calendar"></i>
//                       </span>
//                     </div>
//                   </div>

//                 </div>
//               </div>
//             </div>

//             <div className="row">
//               <div className="col-12">
//                 {!showLeadDetails ? (
//                   <div className="card">
//                     <div className="card-body">
//                       <div className="table-responsive">
//                         <table className="table table-hover">
//                           <thead>
//                             <tr>
//                               <th>Reference Number</th>
//                               <th>Campaign Name</th>
//                               <th>Name</th>
//                               <th>Email</th>
//                               <th>Call Duration</th>
//                               <th>Called On</th>
//                               <th>Called By</th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {callLogs.map((log, index) => (
//                               <tr key={index}>
//                                 <td>
//                                   <a
//                                     className=""
//                                     onClick={() => handleReferenceClick(log)}
//                                     style={{ cursor: "pointer", color: "#007bff" }}
//                                   >
//                                     {log.reference}
//                                   </a>
//                                 </td>
//                                 <td>{log.campaign}</td>
//                                 <td>{log.name}</td>
//                                 <td>{log.email}</td>
//                                 <td>{log.duration}</td>
//                                 <td>{log.calledOn}</td>
//                                 <td>{log.calledBy}</td>
//                               </tr>
//                             ))}
//                           </tbody>
//                         </table>
//                       </div>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="card">
//                     <div className="card-body">
//                       <div className="d-flex justify-content-between align-items-center mb-4">
//                         <h5 className="mb-0">Lead Follow Up</h5>
//                         <button
//                           className="btn btn-sm btn-outline-secondary"
//                           onClick={() => setShowLeadDetails(false)}
//                         >
//                           Back to List
//                         </button>
//                       </div>

//                       <div className="row">
//                         <div className="col-md-6">
//                           <div className="mb-4">
//                             <h6>Basic Details</h6>
//                             <div className="card bg-light p-3">
//                               <div className="row">
//                                 <div className="col-6">
//                                   <p className="mb-2">
//                                     <strong>Reference Number:</strong> {selectedLead.reference}
//                                   </p>
//                                   <p className="mb-2">
//                                     <strong>First Actions:</strong> {selectedLead.firstActionBy}
//                                   </p>
//                                   <p className="mb-2">
//                                     <strong>Last Actions:</strong> {selectedLead.calledBy}
//                                   </p>
//                                 </div>
//                                 <div className="col-6">
//                                   <p className="mb-2">
//                                     <strong>Call Duration:</strong> {selectedLead.duration}
//                                   </p>
//                                   <p className="mb-2">
//                                     <strong>Campaign Name:</strong> {selectedLead.campaign}
//                                   </p>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>

//                           <div className="mb-4">
//                             <h6>Contact Information</h6>
//                             <div className="card bg-light p-3">
//                               <div className="row">
//                                 <div className="col-6">
//                                   <p className="mb-2">
//                                     <strong>First Name:</strong> {selectedLead.firstName}
//                                   </p>
//                                   <p className="mb-2">
//                                     <strong>Email:</strong> {selectedLead.email}
//                                   </p>
//                                   <p className="mb-2">
//                                     <strong>Company:</strong> {selectedLead.company}
//                                   </p>
//                                 </div>
//                                 <div className="col-6">
//                                   <p className="mb-2">
//                                     <strong>Last Name:</strong> {selectedLead.lastName}
//                                   </p>
//                                   <p className="mb-2">
//                                     <strong>Phone:</strong> {selectedLead.phone}
//                                   </p>
//                                   <p className="mb-2">
//                                     <strong>Website:</strong> {selectedLead.website}
//                                   </p>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>

//                         <div className="col-md-6">
//                           <div className="mb-4">
//                             <h6>Lead Data</h6>
//                             <div className="card bg-light p-3">
//                               <p>{selectedLead.leadData}</p>
//                             </div>
//                           </div>

//                           <div className="mb-4">
//                             <h6>Call Logs</h6>
//                             <div className="card bg-light p-3">
//                               <p>
//                                 <strong>Called On:</strong> {selectedLead.calledOn}
//                               </p>
//                               <p>
//                                 <strong>Duration:</strong> {selectedLead.duration}
//                               </p>
//                               <p>
//                                 <strong>By:</strong> {selectedLead.calledBy}
//                               </p>
//                             </div>
//                           </div>

//                           <div className="mb-4">
//                             <h6>Lead Notes</h6>
//                             <div className="card bg-light p-3">
//                               <p>{selectedLead.leadNotes}</p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CallLogs;

import { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";

function CallLogs() {
  const [callLogs, setCallLogs] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);
  const [showLeadDetails, setShowLeadDetails] = useState(false);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchCallLogs = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:3000/call-logs"); // Update if deployed
  //       setCallLogs(response.data.logs || []);
  //     } catch (error) {
  //       console.error("Failed to fetch call logs:", error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchCallLogs();
  // }, []);

  useEffect(() => {
    const fetchCallLogs = async () => {
      try {
        const response = await axios.get("http://localhost:3001/call-logs"); // or your API URL
        const logs = response.data.logs || [];

        // Get leads from localStorage
        const leads = JSON.parse(localStorage.getItem("leads")) || [];
        console.log("leads", leads)

        // Enrich logs with lead data
        const enrichedLogs = logs.map((call) => {
          const lead = leads.find((l) => l.phone === call.to);
          return {
            ...call,
            name: lead?.name || "Unknown",
            email: lead?.email || "Unknown",
            campaign: lead?.campaignName || "Unknown",
          };
        });

        setCallLogs(enrichedLogs);
      } catch (error) {
        console.error("Failed to fetch call logs:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCallLogs();
  }, []);

  const handleReferenceClick = (log) => {
    setSelectedLead({
      ...log,
      reference: log.sid,
      campaign: "N/A",
      firstName: "N/A",
      lastName: "N/A",
      email: "N/A",
      phone: log.to,
      website: "N/A",
      company: "N/A",
      firstActionBy: "Admin",
      calledBy: "System",
      duration: `${log.duration || "0"} S`,
      calledOn: log.startTime
        ? new Date(log.startTime).toLocaleString()
        : "Unknown",
      leadNotes: "No notes",
      leadData: `Status: ${log.status}`,
    });
    setShowLeadDetails(true);
  };

  return (
    <div>
      <NavBar />
      <SideBar />

      <div className="page-title-box">
        <div className="container-fluid">
          <div className="row gap-0">
            <div className="col-sm-12">
              <div className="page-title-content d-sm-flex justify-content-sm-between align-items-center">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <a href="/">Call Tracking</a>
                  </li>
                  <li className="breadcrumb-item active">Call Logs</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="page-wrapper">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row mb-4">
              <div className="col-12">
                <h4 className="mb-0">Call Logs</h4>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                {loading ? (
                  <p>Loading call logs...</p>
                ) : !showLeadDetails ? (
                  <div className="card">
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-hover">
                          {/* <thead>
                            <tr>
                              <th>Reference Number</th>
                              <th>From</th>
                              <th>To</th>
                              <th>Status</th>
                              <th>Start Time</th>
                              <th>Duration (sec)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {callLogs.map((log, index) => (
                              <tr key={index}>
                                <td>
                                  <a
                                    style={{ cursor: "pointer", color: "#007bff" }}
                                    onClick={() => handleReferenceClick(log)}
                                  >
                                    {log.sid}
                                  </a>
                                </td>
                                <td>{log.from}</td>
                                <td>{log.to}</td>
                                <td>{log.status}</td>
                                <td>
                                  {log.startTime
                                    ? new Date(log.startTime).toLocaleString()
                                    : "Unknown"}
                                </td>
                                <td>{log.duration || "0"}</td>
                              </tr>
                            ))}
                          </tbody> */}
                          <thead>
                            <tr>
                              <th>Reference</th>
                              <th>Campaign Name</th>
                              <th>Name</th>
                              <th>Email</th>
                              <th>Status</th>
                              <th>Start Time</th>
                              <th>Duration (sec)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {callLogs.map((log, index) => (
                              <tr key={index}>
                                <td>
                                  <a
                                    style={{
                                      cursor: "pointer",
                                      color: "#007bff",
                                    }}
                                    onClick={() => handleReferenceClick(log)}
                                  >
                                    {log.sid}
                                  </a>
                                </td>
                                <td>{log.campaign}</td>
                                <td>{log.name}</td>
                                <td>{log.email}</td>
                                <td>{log.status}</td>
                                <td>
                                  {log.startTime
                                    ? new Date(log.startTime).toLocaleString()
                                    : "Unknown"}
                                </td>
                                <td>{log.duration || "0"} S</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <h5 className="mb-0">Lead Follow Up</h5>
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => setShowLeadDetails(false)}
                        >
                          Back to List
                        </button>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-4">
                            <h6>Basic Details</h6>
                            <div className="card bg-light p-3">
                              <div className="row">
                                <div className="col-6">
                                  <p className="mb-2">
                                    <strong>Reference Number:</strong>{" "}
                                    {selectedLead.reference}
                                  </p>
                                  <p className="mb-2">
                                    <strong>First Actions:</strong>{" "}
                                    {selectedLead.firstActionBy}
                                  </p>
                                  <p className="mb-2">
                                    <strong>Last Actions:</strong>{" "}
                                    {selectedLead.calledBy}
                                  </p>
                                </div>
                                <div className="col-6">
                                  <p className="mb-2">
                                    <strong>Call Duration:</strong>{" "}
                                    {selectedLead.duration}
                                  </p>
                                  <p className="mb-2">
                                    <strong>Campaign Name:</strong>{" "}
                                    {selectedLead.campaign}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="mb-4">
                            <h6>Contact Information</h6>
                            <div className="card bg-light p-3">
                              <div className="row">
                                <div className="col-6">
                                  <p className="mb-2">
                                    <strong>First Name:</strong>{" "}
                                    {selectedLead.firstName}
                                  </p>
                                  <p className="mb-2">
                                    <strong>Email:</strong> {selectedLead.email}
                                  </p>
                                  <p className="mb-2">
                                    <strong>Company:</strong>{" "}
                                    {selectedLead.company}
                                  </p>
                                </div>
                                <div className="col-6">
                                  <p className="mb-2">
                                    <strong>Last Name:</strong>{" "}
                                    {selectedLead.lastName}
                                  </p>
                                  <p className="mb-2">
                                    <strong>Phone:</strong> {selectedLead.phone}
                                  </p>
                                  <p className="mb-2">
                                    <strong>Website:</strong>{" "}
                                    {selectedLead.website}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="mb-4">
                            <h6>Lead Data</h6>
                            <div className="card bg-light p-3">
                              <p>{selectedLead.leadData}</p>
                            </div>
                          </div>

                          <div className="mb-4">
                            <h6>Call Logs</h6>
                            <div className="card bg-light p-3">
                              <p>
                                <strong>Called On:</strong>{" "}
                                {selectedLead.calledOn}
                              </p>
                              <p>
                                <strong>Duration:</strong>{" "}
                                {selectedLead.duration}
                              </p>
                              <p>
                                <strong>By:</strong> {selectedLead.calledBy}
                              </p>
                            </div>
                          </div>

                          <div className="mb-4">
                            <h6>Lead Notes</h6>
                            <div className="card bg-light p-3">
                              <p>{selectedLead.leadNotes}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CallLogs;
