// import { useState, useEffect } from "react";
// import axios from "axios";
// import NavBar from "../components/NavBar";
// const API_BASE_URL2 = import.meta.env.VITE_API_URL2;
// import SideBar from "../components/SideBar";

// function CallLogs() {
//   const [callLogs, setCallLogs] = useState([]);
//   const [selectedLead, setSelectedLead] = useState(null);
//   const [showLeadDetails, setShowLeadDetails] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCallLogs = async () => {
//       try {
//         const response = await axios.get(`${API_BASE_URL2}/call-logs`);
//         console.log("response", response)
//         const logs = response.data.logs || [];
//         const leads = JSON.parse(localStorage.getItem("leads")) || [];

//         const enrichedLogs = logs.map((call) => {
//           const lead = leads.find((l) => l.phone === call.to);
//           return {
//             ...call,
//             name: lead?.name || "Unknown",
//             email: lead?.email || "Unknown",
//             campaign: lead?.campaignName || "Unknown",
//           };
//         });

//         setCallLogs(enrichedLogs);
//       } catch (error) {
//         console.error("Failed to fetch call logs:", error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCallLogs();
//   }, []);

//   const handleReferenceClick = (log) => {
//     setSelectedLead({
//       ...log,
//       recordings: log.recordings || [],
//       reference: log.sid,
//       direction: log.direction,
//       campaign: log.campaign || "N/A",
//       firstName: log.name || "N/A",
//       lastName: "N/A",
//       email: log.email || "N/A",
//       phone: log.to,
//       website: "N/A",
//       company: "N/A",
//       firstActionBy: "Admin",
//       calledBy: "System",
//       duration: `${log.duration || "0"} S`,
//       calledOn: log.startTime
//         ? new Date(log.startTime).toLocaleString()
//         : "Unknown",
//       leadNotes: "No notes",
//       leadData: `Status: ${log.status}`,
//     });
//     setShowLeadDetails(true);
//   };

//   return (
//     <div>
//       <NavBar />
//       <SideBar />
//             <div className="page-title-box">
//         <div className="container-fluid">
//           <div className="row gap-0">
//             <div className="col-sm-12">
//               <div className="page-title-content d-sm-flex justify-content-sm-between align-items-center">
//                 <ol className="breadcrumb mb-0">
//                   <li className="breadcrumb-item">
//                     <a href="/">Call Tracking</a>
//                   </li>
//                   <li className="breadcrumb-item active">Call Logs</li>
//                 </ol>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="page-wrapper">
//         <div className="page-content">
//           <div className="container-fluid">
//             <h4 className="mb-4">Call Logs</h4>

//             {loading ? (
//               <p>Loading call logs...</p>
//             ) : !showLeadDetails ? (
//               <div className="card">
//                 <div className="card-body">
//                   <div className="table-responsive">
//                     <table className="table table-hover">
//                       <thead>
//                         <tr>
//                           <th>Reference</th>
//                           <th>Campaign</th>
//                           <th>Name</th>
//                           <th>Email</th>
//                           <th>Status</th>
//                           <th>Start Time</th>
//                           <th>Duration</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {callLogs.map((log, index) => (
//                           <tr key={index}>
//                             <td>
//                               <a
//                                 style={{ cursor: "pointer", color: "#007bff" }}
//                                 onClick={() => handleReferenceClick(log)}
//                               >
//                                 {log.sid}
//                               </a>
//                             </td>
//                             <td>{log.campaign}</td>
//                             <td>{log.name}</td>
//                             <td>{log.email}</td>
//                             <td>{log.status}</td>
//                             <td>
//                               {log.startTime
//                                 ? new Date(log.startTime).toLocaleString()
//                                 : "Unknown"}
//                             </td>
//                             <td>{log.duration || "0"} S</td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <div className="card">
//                 <div className="card-body">
//                   <div className="d-flex justify-content-between mb-4">
//                     <h5>Lead Details</h5>
//                     <button
//                       className="btn btn-outline-secondary btn-sm"
//                       onClick={() => setShowLeadDetails(false)}
//                     >
//                       Back to List
//                     </button>
//                   </div>

//                   <div className="row">
//                     <div className="col-md-6">
//                       <div className="card bg-light p-3 mb-3">
//                         <h6>Basic Info</h6>
//                         <p><strong>Reference:</strong> {selectedLead.reference}</p>
//                         <p><strong>Campaign:</strong> {selectedLead.campaign}</p>
//                         <p><strong>Call Type:</strong> {selectedLead.direction === 'inbound' ? 'Inbound' : 'Outbound'}</p>
//                         <p><strong>Status:</strong> {selectedLead.leadData === 'Status: completed' ? 'Completed' : 'Incompleted'}</p>
//                         <p><strong>Duration:</strong> {selectedLead.duration}</p>
//                         <p><strong>Called On:</strong> {selectedLead.calledOn}</p>
//                       </div>

//                       <div className="card bg-light p-3 mb-3">
//                         <h6>Contact</h6>
//                         <p><strong>Name:</strong> {selectedLead.firstName}</p>
//                         <p><strong>Email:</strong> {selectedLead.email}</p>
//                         <p><strong>Phone:</strong> {selectedLead.phone}</p>
//                       </div>
//                     </div>

//                     <div className="col-md-6">
//                       <div className="card bg-light p-3 mb-3">
//                         <h6>Call Recordings</h6>
//                         {selectedLead.recordings.length > 0 ? (
//                           selectedLead.recordings.map((rec, idx) => (
//                             <div key={idx} className="mb-3">
//                               <audio controls src={`${API_BASE_URL2}/recording/${rec.sid}`}>
//                                 Your browser does not support the audio tag.
//                               </audio>
//                               <br />
//                               <a href={`${API_BASE_URL2}/recording/${rec.sid}`} download target="_blank" rel="noopener noreferrer">
//                                 <button className="btn btn-sm btn-primary mt-2">
//                                   Download Recording
//                                 </button>
//                               </a>
//                             </div>
//                           ))
//                         ) : (
//                           <p>No recordings available.</p>
//                         )}
//                       </div>

//                       <div className="card bg-light p-3">
//                         <h6>Lead Notes</h6>
//                         <p>{selectedLead.leadNotes}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
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
const API_BASE_URL = import.meta.env.VITE_API_URL;
const API_BASE_URL2 = import.meta.env.VITE_API_URL2;

function CallLogs() {
  const [callLogs, setCallLogs] = useState([]);
  const [leadsMap, setLeadsMap] = useState({});
  const [selectedLead, setSelectedLead] = useState(null);
  const [showLeadDetails, setShowLeadDetails] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch call logs and leads from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch call logs
        const callLogRes = await axios.get(`${API_BASE_URL2}/call-logs`);
        const logs = callLogRes.data.logs || [];

        // Fetch campaigns with leads
        const campaignsRes = await axios.get(`${API_BASE_URL}/api/campaign`);
        const campaigns = campaignsRes.data || [];

        // Flatten all leads and map by phone number
        const allLeads = {};
        campaigns.forEach((campaign) => {
          const campaignName = campaign.name;
          (campaign.leads || []).forEach((leadObj) => {
            const lead = leadObj.data;
            if (lead?.phone) {
              allLeads[lead.phone] = { ...lead, campaignName };
            }
          });
        });

        setLeadsMap(allLeads);

        // Enrich call logs with lead info
        const enrichedLogs = logs.map((call) => {
          const lead = allLeads[call.to] || {};
          return {
            ...call,
            name: lead.name || "Unknown",
            email: lead.email || "Unknown",
            campaign: lead.campaignName || "Unknown",
          };
        });

        setCallLogs(enrichedLogs);
      } catch (error) {
        console.error("Failed to fetch call logs or leads:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleReferenceClick = (log) => {
    const lead = leadsMap[log.to] || {};
    setSelectedLead({
      ...log,
      recordings: log.recordings || [],
      reference: log.sid,
      reference_id: log.reference_id,
      direction: log.direction,
      campaign: lead.campaignName || "N/A",
      firstName: lead.name || "N/A",
      lastName: "N/A",
      email: lead.email || "N/A",
      phone: log.to,
      website: "N/A",
      company: lead.company || "N/A",
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
            <h4 className="mb-4">Call Logs</h4>

            {loading ? (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "200px" }}
              >
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : !showLeadDetails ? (
              <div className="card">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Reference</th>
                          <th>Campaign</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Status</th>
                          <th>Start Time</th>
                          <th>Duration</th>
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
                                {log.reference_id}
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
                  <div className="d-flex justify-content-between mb-4">
                    <h5>Lead Details</h5>
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => setShowLeadDetails(false)}
                    >
                      Back to List
                    </button>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="card bg-light p-3 mb-3">
                        <h6>Basic Info</h6>
                        <p>
                          <strong>Reference:</strong> {selectedLead.reference}
                        </p>
                        <p>
                          <strong>Campaign:</strong> {selectedLead.campaign}
                        </p>
                        <p>
                          <strong>Call Type:</strong>{" "}
                          {selectedLead.direction === "inbound"
                            ? "Inbound"
                            : "Outbound"}
                        </p>
                        <p>
                          <strong>Status:</strong>{" "}
                          {selectedLead.leadData === "Status: completed"
                            ? "Completed"
                            : "Incompleted"}
                        </p>
                        <p>
                          <strong>Duration:</strong> {selectedLead.duration}
                        </p>
                        <p>
                          <strong>Called On:</strong> {selectedLead.calledOn}
                        </p>
                      </div>

                      <div className="card bg-light p-3 mb-3">
                        <h6>Contact</h6>
                        <p>
                          <strong>Name:</strong> {selectedLead.firstName}
                        </p>
                        <p>
                          <strong>Email:</strong> {selectedLead.email}
                        </p>
                        <p>
                          <strong>Phone:</strong> {selectedLead.phone}
                        </p>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="card bg-light p-3 mb-3">
                        <h6>Call Recordings</h6>
                        {selectedLead.recordings.length > 0 ? (
                          selectedLead.recordings.map((rec, idx) => (
                            <div key={idx} className="mb-3">
                              <audio
                                controls
                                src={`${API_BASE_URL2}/recording/${rec.sid}`}
                              >
                                Your browser does not support the audio tag.
                              </audio>
                              <br />
                              <a
                                href={`${API_BASE_URL2}/recording/${rec.sid}`}
                                download
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <button className="btn btn-sm btn-primary mt-2">
                                  Download Recording
                                </button>
                              </a>
                            </div>
                          ))
                        ) : (
                          <p>No recordings available.</p>
                        )}
                      </div>

                      <div className="card bg-light p-3">
                        <h6>Lead Notes</h6>
                        <p>{selectedLead.leadNotes}</p>
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
  );
}

export default CallLogs;
