// import React, { useState, useEffect } from "react";
// import SideBar from "../components/SideBar";
// import NavBar from "../components/NavBar";
// import Papa from "papaparse";

// function Campaigns() {
//   const [showModal, setShowModal] = useState(false);
//   const [currentStep, setCurrentStep] = useState(1);
//   const [formData, setFormData] = useState({
//     name: "",
//     agents: "",
//     formType: "Default Form",
//     startDate: "",
//     endDate: "",
//     leadsData: null,
//     leadsDataParsed: [],
//     fieldMap: {},
//   });
//   const [campaigns, setCampaigns] = useState([]);

//   useEffect(() => {
//     const stored = sessionStorage.getItem("campaigns");
//     if (stored) setCampaigns(JSON.parse(stored));
//   }, [showModal]);

//   const handleSubmit = () => {
//     if (Object.values(formData.fieldMap).filter((val) => val).length < 3) {
//       alert("Please map at least 3 fields (e.g. Name, Email, Phone)");
//       return;
//     }
//     const updatedCampaigns = [
//       ...campaigns,
//       {
//         ...formData,
//         members: Math.floor(Math.random() * 5) + 1, // Simulate number of members
//         progress: `${Math.floor(Math.random() * 100)}%`,
//         startedOn: new Date().toLocaleString(),
//         lastActioner: "Admin",
//       },
//     ];
//     sessionStorage.setItem("campaigns", JSON.stringify(updatedCampaigns));
//     setCampaigns(updatedCampaigns);
//     setShowModal(false);
//     setCurrentStep(1);
//     setFormData({
//       name: "",
//       agents: "",
//       formType: "Default Form",
//       startDate: "",
//       endDate: "",
//       leadsData: null,
//       leadsDataParsed: [],
//     });
//   };

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       Papa.parse(file, {
//         header: true,
//         complete: (results) => {
//           const filteredData = results.data.filter(
//             (row) => row.name && row.phone
//           );

//           const headers = results.meta.fields; // e.g. ['name', 'email', 'company', 'phone']
//           const initialMap = {};
//           headers.forEach((header) => {
//             // Pre-fill common fields
//             if (header.toLowerCase().includes("name"))
//               initialMap[header] = "First Name";
//             else if (header.toLowerCase().includes("email"))
//               initialMap[header] = "Email";
//             else if (header.toLowerCase().includes("company"))
//               initialMap[header] = "Company Name";
//             else if (header.toLowerCase().includes("phone"))
//               initialMap[header] = "Contact No";
//             else initialMap[header] = "";
//           });

//           setFormData({
//             ...formData,
//             leadsData: file,
//             leadsDataParsed: filteredData,
//             fieldMap: initialMap,
//           });
//         },
//       });
//     }
//   };

//   const downloadSampleCSV = () => {
//     const csvContent =
//       "data:text/csv;charset=utf-8," +
//       "name,email,company,phone\nJohn Doe,john@example.com,ABC Corp,1234567890";
//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     link.setAttribute("download", "sample_leads.csv");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const exportLeadsCSV = (campaign) => {
//     if (!campaign.leadsDataParsed || campaign.leadsDataParsed.length === 0)
//       return;

//     const csvContent =
//       "data:text/csv;charset=utf-8," +
//       "Campaign Name,Agent,Name,Email,Company,Phone\n" +
//       campaign.leadsDataParsed
//         .map(
//           (lead) =>
//             `${campaign.name},${campaign.agents},${lead.name},${lead.email},${lead.company},${lead.phone}`
//         )
//         .join("\n");

//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     link.setAttribute(
//       "download",
//       `${campaign.name.replace(/\s+/g, "_")}_leads.csv`
//     );
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <div>
//       <NavBar />
//       <SideBar />
//       <div className="page-title-box">
//         <div className="container-fluid">
//           <div className="row gap-0">
//             <div className="col-sm-12">
//               <div className="page-title-content d-sm-flex justify-content-sm-between align-items-center">
//                 <ol className="breadcrumb mb-0">
//                   <li className="breadcrumb-item">
//                     <a href="/manager">Call Tracking</a>
//                   </li>
//                   <li className="breadcrumb-item active">Campaigns</li>
//                 </ol>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="page-wrapper">
//         <div className="page-content">
//           <div className="container-fluid">
//             <div className="row mb-3">
//               <div className="col-md-12 d-flex justify-content-between align-items-center">
//                 <h4>Campaigns</h4>
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => setShowModal(true)}
//                 >
//                   Add New Campaign
//                 </button>
//               </div>
//             </div>

//             <div className="card">
//               <div className="card-body">
//                 <div className="table-responsive">
//                   <table className="table table-hover">
//                     <thead>
//                       <tr>
//                         <th>Name</th>
//                         <th>Progress</th>
//                         <th>Members</th>
//                         <th>Form</th>
//                         <th>Started On</th>
//                         <th>Last Actioner</th>
//                         <th>Action</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {campaigns.map((campaign, index) => (
//                         <tr key={index}>
//                           <td>{campaign.name}</td>
//                           <td>
//                             <div
//                               className="progress"
//                               style={{ height: "20px" }}
//                             >
//                               <div
//                                 className="progress-bar"
//                                 role="progressbar"
//                                 style={{
//                                   width: campaign.progress || "40%",
//                                   backgroundColor: "#1890ff",
//                                 }}
//                                 aria-valuenow={parseInt(campaign.progress)}
//                                 aria-valuemin="0"
//                                 aria-valuemax="100"
//                               >
//                                 {campaign.progress}
//                               </div>
//                             </div>
//                           </td>
//                           <td>
//                             {Array.from({ length: campaign.members || 1 }).map(
//                               (_, i) => (
//                                 <span key={i} style={{ fontSize: "20px" }}>
//                                   👤
//                                 </span>
//                               )
//                             )}
//                           </td>
//                           <td>{campaign.formType}</td>
//                           <td>{campaign.startDate}</td>
//                           <td>Admin</td>
//                           <td style={{ width: "20%" }}>
//                             <button
//                               className="btn btn-sm me-1"
//                               onClick={() => exportLeadsCSV(campaign)}
//                               style={{ backgroundColor: "#1890ff" }}
//                             >
//                               <img
//                                 src="/assets/images/icons/export.png"
//                                 alt="Export"
//                                 style={{ width: "16px", height: "16px" }}
//                               />
//                             </button>
//                             <button
//                               className="btn btn-sm me-1"
//                               style={{ backgroundColor: "#1890ff" }}
//                             >
//                               <img
//                                 src="/assets/images/icons/edit.png"
//                                 alt="Edit"
//                                 style={{ width: "16px", height: "16px" }}
//                               />
//                             </button>
//                             <button
//                               className="btn btn-sm me-1"
//                               style={{ backgroundColor: "#1890ff" }}
//                             >
//                               <img
//                                 src="/assets/images/icons/plus.png"
//                                 alt="Add"
//                                 style={{ width: "16px", height: "16px" }}
//                               />
//                             </button>
//                             <button
//                               className="btn btn-sm"
//                               style={{ backgroundColor: "#1890ff" }}
//                             >
//                               <img
//                                 src="/assets/images/icons/delete.png"
//                                 alt="Delete"
//                                 style={{ width: "16px", height: "16px" }}
//                               />
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                       {campaigns.length === 0 && (
//                         <tr>
//                           <td colSpan="7" className="text-center">
//                             No campaigns added yet.
//                           </td>
//                         </tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>

//             {/* Modal */}
//             {showModal && (
//               <>
//                 {/* Backdrop */}
//                 <div
//                   className="offcanvas-backdrop show"
//                   onClick={() => {
//                     setShowModal(false);
//                     setCurrentStep(1);
//                   }}
//                   style={{
//                     position: "fixed",
//                     top: 0,
//                     left: 0,
//                     width: "100vw",
//                     height: "100vh",
//                     backgroundColor: "rgba(0,0,0,0.5)",
//                     zIndex: 1040,
//                   }}
//                 ></div>

//                 {/* Drawer Panel */}
//                 <div
//                   className="offcanvas-panel"
//                   style={{
//                     position: "fixed",
//                     top: 0,
//                     right: 0,
//                     height: "100vh",
//                     width: "60%",
//                     backgroundColor: "#fff",
//                     boxShadow: "-2px 0 10px rgba(0,0,0,0.15)",
//                     zIndex: 1050,
//                     transform: "translateX(0%)",
//                     transition: "transform 0.3s ease-in-out",
//                     overflowY: "auto",
//                     borderTopLeftRadius: "10px",
//                     borderBottomLeftRadius: "10px",
//                   }}
//                 >
//                   {/* Header */}
//                   <div className="p-4 border-bottom d-flex justify-content-between align-items-center">
//                     <h5 className="mb-0 fw-semibold">New Campaign</h5>
//                     <button
//                       className="btn-close"
//                       onClick={() => {
//                         setShowModal(false);
//                         setCurrentStep(1);
//                       }}
//                     ></button>
//                   </div>

//                   {/* Steps */}
//                   <div className="p-4">
//                     <div className="stepper-container d-flex justify-content-between align-items-center mb-5 px-3 position-relative">
//                       {[1, 2, 3].map((step, i) => (
//                         <div
//                           key={i}
//                           className="step-item text-center position-relative d-flex flex-column align-items-center"
//                           style={{ flex: 1 }}
//                         >
//                           {/* Connecting line */}
//                           {i < 2 && (
//                             <div
//                               className="step-line position-absolute top-50 start-100 translate-middle-y"
//                               style={{
//                                 width: "100%",
//                                 height: "2px",
//                                 backgroundColor:
//                                   currentStep > step ? "#28a745" : "#dee2e6",
//                                 zIndex: 0,
//                               }}
//                             ></div>
//                           )}

//                           {/* Step circle */}
//                           <div
//                             className={`step-circle d-flex justify-content-center align-items-center mb-2 ${
//                               currentStep === step ? "active" : ""
//                             }`}
//                           >
//                             {step}
//                           </div>

//                           {/* Label */}
//                           <div
//                             className={`step-label ${
//                               currentStep === step
//                                 ? "text-dark fw-bold"
//                                 : "text-muted"
//                             }`}
//                           >
//                             {
//                               [
//                                 "Basic Settings",
//                                 "Campaign Settings",
//                                 "Import Leads",
//                               ][i]
//                             }
//                           </div>
//                         </div>
//                       ))}
//                     </div>

//                     {/* Step 1: Basic */}
//                     {currentStep === 1 && (
//                       <>
//                         <label className="form-label">Campaign Name</label>
//                         <input
//                           type="text"
//                           className="form-control mb-3"
//                           placeholder="Enter campaign name"
//                           value={formData.name}
//                           onChange={(e) =>
//                             setFormData({ ...formData, name: e.target.value })
//                           }
//                         />

//                         <label className="form-label">Assign Agent</label>
//                         <select
//                           className="form-control mb-3"
//                           value={formData.agents}
//                           onChange={(e) =>
//                             setFormData({ ...formData, agents: e.target.value })
//                           }
//                         >
//                           <option value="">Select Agent</option>
//                           <option value="Tony">Tony</option>
//                           <option value="John">John</option>
//                           <option value="Alice">Alice</option>
//                         </select>
//                       </>
//                     )}

//                     {/* Step 2: Settings */}
//                     {currentStep === 2 && (
//                       <>
//                         <label className="form-label">Select Form</label>
//                         <select
//                           className="form-control mb-3"
//                           value={formData.formType}
//                           onChange={(e) =>
//                             setFormData({
//                               ...formData,
//                               formType: e.target.value,
//                             })
//                           }
//                         >
//                           <option value="Default Form">Default Form</option>
//                           <option value="Software Development Form">
//                             Software Development Form
//                           </option>
//                           <option value="Insurance Enquiry Form">
//                             Insurance Enquiry Form
//                           </option>
//                         </select>

//                         <div className="row">
//                           <div className="col-6">
//                             <label className="form-label">Start Date</label>
//                             <input
//                               type="date"
//                               className="form-control mb-3"
//                               value={formData.startDate}
//                               onChange={(e) =>
//                                 setFormData({
//                                   ...formData,
//                                   startDate: e.target.value,
//                                 })
//                               }
//                             />
//                           </div>
//                           <div className="col-6">
//                             <label className="form-label">End Date</label>
//                             <input
//                               type="date"
//                               className="form-control mb-3"
//                               value={formData.endDate}
//                               onChange={(e) =>
//                                 setFormData({
//                                   ...formData,
//                                   endDate: e.target.value,
//                                 })
//                               }
//                             />
//                           </div>
//                         </div>
//                       </>
//                     )}

//                     {/* Step 3: Import Leads */}
//                     {currentStep === 3 && (
//                       <>
//                         <label className="form-label">Import Leads (CSV)</label>
//                         <div
//                           className="border border-dashed rounded p-4 text-center"
//                           onClick={() =>
//                             document.getElementById("csvUpload").click()
//                           }
//                           style={{ cursor: "pointer", background: "#f9f9f9" }}
//                         >
//                           <img
//                             src="/assets/images/icons/upload.png"
//                             alt="Upload"
//                             style={{ width: "40px", marginBottom: "10px" }}
//                           />
//                           <p className="mb-1">
//                             Drag & drop CSV here or click to upload
//                           </p>
//                           <p className="small text-muted">
//                             Format: name, email, company, phone
//                           </p>
//                           <input
//                             type="file"
//                             id="csvUpload"
//                             className="d-none"
//                             accept=".csv"
//                             onChange={handleFileUpload}
//                           />
//                           {formData.leadsData && (
//                             <div className="text-success mt-2">
//                               ✅ Uploaded: {formData.leadsData.name}
//                             </div>
//                           )}
//                         </div>

//                         <button
//                           className="btn btn-outline-primary btn-sm mt-3"
//                           onClick={downloadSampleCSV}
//                         >
//                           📥 Download Sample Sheet
//                         </button>

//                         {formData.leadsData && (
//                           <div className="mt-4">
//                             <h6 className="mb-3">🧩 Match Fields</h6>
//                             <table className="table table-bordered">
//                               <thead>
//                                 <tr>
//                                   <th>Header Field</th>
//                                   <th>Sample Data</th>
//                                   <th>Form Field</th>
//                                 </tr>
//                               </thead>
//                               <tbody>
//                                 {Object.entries(formData.fieldMap).map(
//                                   ([header, mappedField]) => (
//                                     <tr key={header}>
//                                       <td>{header}</td>
//                                       <td>
//                                         {formData.leadsDataParsed.length > 0
//                                           ? formData.leadsDataParsed[0][
//                                               header
//                                             ] || "-"
//                                           : "-"}
//                                       </td>
//                                       <td>
//                                         <select
//                                           className="form-control"
//                                           value={mappedField}
//                                           onChange={(e) =>
//                                             setFormData((prev) => ({
//                                               ...prev,
//                                               fieldMap: {
//                                                 ...prev.fieldMap,
//                                                 [header]: e.target.value,
//                                               },
//                                             }))
//                                           }
//                                         >
//                                           <option value="">Unmapped</option>
//                                           <option value="First Name">
//                                             First Name
//                                           </option>
//                                           <option value="Email">Email</option>
//                                           <option value="Company Name">
//                                             Company Name
//                                           </option>
//                                           <option value="Contact No">
//                                             Contact No
//                                           </option>
//                                         </select>
//                                       </td>
//                                     </tr>
//                                   )
//                                 )}
//                               </tbody>
//                             </table>
//                           </div>
//                         )}
//                       </>
//                     )}
//                   </div>

//                   {/* Footer */}
//                   <div className="p-4 border-top d-flex justify-content-between">
//                     {currentStep > 1 && (
//                       <button
//                         className="btn btn-outline-secondary"
//                         onClick={() => setCurrentStep(currentStep - 1)}
//                       >
//                         ← Back
//                       </button>
//                     )}
//                     {currentStep < 3 ? (
//                       <button
//                         className="btn btn-primary ms-auto"
//                         onClick={() => setCurrentStep(currentStep + 1)}
//                       >
//                         Next →
//                       </button>
//                     ) : (
//                       <button
//                         className="btn btn-success ms-auto"
//                         onClick={handleSubmit}
//                       >
//                         ✅ Submit
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Campaigns;
import React, { useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import Papa from "papaparse";
import axios from "axios";

function Campaigns() {
  const [showModal, setShowModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [editMode, setEditMode] = useState(false);
const [editingCampaignId, setEditingCampaignId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    client_id: "",
    form_id: "",
    user_id: "67c7a808-038a-4b5c-b24f-216908ecb715",
    leadsData: null,
    leadsDataParsed: [],
    fieldMap: {},
    file: "",
  });

  const [clients, setClients] = useState([]);
  const [forms, setForms] = useState([]);
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/user/clients")
      .then((res) => setClients(res.data));
    axios
      .get("http://localhost:3000/api/form")
      .then((res) => setForms(res.data));
    axios
      .get("http://localhost:3000/api/campaign")
      .then((res) => setCampaigns(res.data));
  }, [showModal]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileName = `/uploads/campaigns/${Date.now()}-${file.name}`;

    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const headers = results.meta.fields;
        const filtered = results.data.filter((row) => row.name && row.phone);
        const initialMap = {};

        headers.forEach((header) => {
          if (header.toLowerCase().includes("name"))
            initialMap[header] = "Name";
          else if (header.toLowerCase().includes("email"))
            initialMap[header] = "Email";
          else if (header.toLowerCase().includes("company"))
            initialMap[header] = "Company Name";
          else if (header.toLowerCase().includes("phone"))
            initialMap[header] = "Phone number";
          else initialMap[header] = "";
        });

        setFormData((prev) => ({
          ...prev,
          leadsData: file,
          leadsDataParsed: filtered,
          fieldMap: initialMap,
          file: fileName,
        }));
      },
    });
  };

//   const handleFileUpload = (e) => {
//   const file = e.target.files[0];
//   if (!file) return;

//   const fileName = `/uploads/campaigns/${Date.now()}-${file.name}`;

//   // Get the selected form's fields dynamically
//   const selectedForm = forms.find((f) => f.id === formData.form_id);
//   const availableFields = selectedForm?.fields || [];

//   Papa.parse(file, {
//     header: true,
//     complete: (results) => {
//       const headers = results.meta.fields;
//       const filtered = results.data.filter((row) => row.name && row.phone);
//       const initialMap = {};

//       headers.forEach((header) => {
//         // Try to match CSV header to available form field (case insensitive)
//         const matchedField = availableFields.find((field) =>
//           header.toLowerCase().includes(field.toLowerCase())
//         );
//         initialMap[header] = matchedField || ""; // leave unmapped if no match
//       });

//       setFormData((prev) => ({
//         ...prev,
//         leadsData: file,
//         leadsDataParsed: filtered,
//         fieldMap: initialMap,
//         file: fileName,
//       }));
//     },
//   });
// };

  const exportLeadsCSV = () => {
    const csvContent =
      "name,email,company,phone\nJohn Doe,john@example.com,ABC Inc,1234567890";
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sample_leads.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  // const handleSubmit = async () => {
  //   if (Object.values(formData.fieldMap).filter((v) => v).length < 3) {
  //     alert("Please map at least 3 fields.");
  //     return;
  //   }

  //   const payload = {
  //     name: formData.name,
  //     user_id: formData.user_id,
  //     client_id: formData.client_id,
  //     form_id: formData.form_id,
  //     import_lead_fields: JSON.stringify(formData.fieldMap),
  //     file: formData.file,
  //   };

  //   try {
  //     await axios.post("http://localhost:3000/api/campaign", payload);

  //     // save in local storage
  //       const savedLeads = JSON.parse(localStorage.getItem("leads")) || [];
  //   const updatedLeads = [
  //     ...savedLeads,
  //     ...formData.leadsDataParsed.map((lead) => ({
  //       campaignName: formData.name,
  //       ...lead,
  //     })),
  //   ];
  //   localStorage.setItem("leads", JSON.stringify(updatedLeads));

  //   //reset form
  //     setShowModal(false);
  //     setCurrentStep(1);
  //     setFormData({
  //       name: "",
  //       client_id: "",
  //       form_id: "",
  //       user_id: formData.user_id,
  //       leadsData: null,
  //       leadsDataParsed: [],
  //       fieldMap: {},
  //       file: "",
  //     });
  //   } catch (err) {
  //     console.error("Submission error", err);
  //   }
  // };

  const handleSubmit = async () => {
  if (Object.values(formData.fieldMap).filter((v) => v).length < 3) {
    alert("Please map at least 3 fields.");
    return;
  }

  const payload = {
    name: formData.name,
    user_id: formData.user_id,
    client_id: formData.client_id,
    form_id: formData.form_id,
    import_lead_fields: JSON.stringify(formData.fieldMap),
    file: formData.file,
  };

  try {
    if (editMode && editingCampaignId) {
      await axios.put(`http://localhost:3000/api/campaign/${editingCampaignId}`, payload);
    } else {
      await axios.post("http://localhost:3000/api/campaign", payload);

      // Save leads to localStorage only for new campaigns
      const savedLeads = JSON.parse(localStorage.getItem("leads")) || [];
      const updatedLeads = [
        ...savedLeads,
        ...formData.leadsDataParsed.map((lead) => ({
          campaignName: formData.name,
          ...lead,
        })),
      ];
      localStorage.setItem("leads", JSON.stringify(updatedLeads));
    }

    // Reset
    setShowModal(false);
    setEditMode(false);
    setEditingCampaignId(null);
    setCurrentStep(1);
    setFormData({
      name: "",
      client_id: "",
      form_id: "",
      user_id: formData.user_id,
      leadsData: null,
      leadsDataParsed: [],
      fieldMap: {},
      file: "",
    });
  } catch (err) {
    console.error("Submission error", err);
    alert("Failed to save campaign.");
  }
};


  const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this campaign?")) return;
  try {
    await axios.delete(`http://localhost:3000/api/campaign/${id}`);
    setCampaigns((prev) => prev.filter((c) => c.id !== id));
  } catch (err) {
    console.error("Delete failed", err);
    alert("Failed to delete campaign.");
  }
};

  // Dynamically get fields of the selected form
  const selectedForm = forms.find((f) => f.id === formData.form_id);
  const selectedFields = selectedForm?.fields || [];

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
                    <a href="/manager">Call Tracking</a>
                  </li>
                  <li className="breadcrumb-item active">Campaigns</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="page-wrapper">
        <div className="page-content container-fluid">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4>Campaigns</h4>
            <button
              className="btn btn-primary"
              onClick={() => setShowModal(true)}
            >
              + Add Campaign
            </button>
          </div>

          <div className="card">
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Members</th>
                    <th>Form</th>
                    <th>Last Actioner</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map((c) => (
                    <tr key={c.id}>
                      <td>{c.name}</td>
                      <td>{c.client?.name}</td>
                      <td>{c.form?.name}</td>
                      <td>{c.creator?.name}</td>
                      <td style={{ width: "20%" }}>
                        <button
                          className="btn btn-sm me-1"
                          onClick={() => exportLeadsCSV(c)}
                          style={{ backgroundColor: "#1890ff" }}
                        >
                          <img
                            src="/assets/images/icons/export.png"
                            alt="Export"
                            style={{ width: 16, height: 16 }}
                          />
                        </button>
                        <button
  className="btn btn-sm me-1"
  style={{ backgroundColor: "#1890ff" }}
  onClick={() => {
    setEditMode(true);
    setShowModal(true);
    setEditingCampaignId(c.id);
    setFormData({
      ...formData,
      name: c.name,
      client_id: c.client_id,
      form_id: c.form_id,
      user_id: c.user_id,
      fieldMap: c.import_lead_fields || {},
      file: c.file || "",
    });
  }}
>
  <img src="/assets/images/icons/edit.png" alt="Edit" style={{ width: 16, height: 16 }} />
</button>
                        <button
                          className="btn btn-sm me-1"
                          style={{ backgroundColor: "#1890ff" }}
                        >
                          <img
                            src="/assets/images/icons/plus.png"
                            alt="Add"
                            style={{ width: 16, height: 16 }}
                          />
                        </button>
                       <button
  className="btn btn-sm"
  style={{ backgroundColor: "#1890ff" }}
  onClick={() => handleDelete(c.id)}
>
  <img src="/assets/images/icons/delete.png" alt="Delete" style={{ width: 16, height: 16 }} />
</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Modal Drawer */}
          {showModal && (
            <>
              <div
                className="offcanvas-backdrop show"
                onClick={() => {
                  setShowModal(false);
                  setCurrentStep(1);
                }}
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100vw",
                  height: "100vh",
                  backgroundColor: "rgba(0,0,0,0.5)",
                  zIndex: 1040,
                }}
              ></div>

              <div
                className="offcanvas-panel"
                style={{
                  position: "fixed",
                  top: 0,
                  right: 0,
                  height: "100vh",
                  width: "60%",
                  backgroundColor: "#fff",
                  boxShadow: "-2px 0 10px rgba(0,0,0,0.15)",
                  zIndex: 1050,
                  overflowY: "auto",
                  padding: "2rem",
                  borderTopLeftRadius: "10px",
                  borderBottomLeftRadius: "10px",
                }}
              >
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5>Create Campaign</h5>
                  <button
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>

                {/* Stepper */}
                <div className="d-flex justify-content-between mb-4">
                  {["Basic Info", "Form", "Leads"].map((label, index) => (
                    <div
                      key={index}
                      className="text-center"
                      style={{ flex: 1 }}
                    >
                      <div
                        className={`rounded-circle mx-auto mb-2 ${
                          currentStep === index + 1
                            ? "bg-primary text-white"
                            : "bg-light"
                        }`}
                        style={{ width: 40, height: 40, lineHeight: "40px" }}
                      >
                        {index + 1}
                      </div>
                      <div
                        className={
                          currentStep === index + 1 ? "fw-bold" : "text-muted"
                        }
                      >
                        {label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Step 1 */}
                {currentStep === 1 && (
                  <>
                    <label>Campaign Name</label>
                    <input
                      className="form-control mb-3"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                    <label>Select Client</label>
                    <select
                      className="form-control mb-3"
                      value={formData.client_id}
                      onChange={(e) =>
                        setFormData({ ...formData, client_id: e.target.value })
                      }
                    >
                      <option value="">Select Client</option>
                      {clients.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </>
                )}

                {/* Step 2 */}
                {currentStep === 2 && (
                  <>
                    <label>Select Form</label>
                    <select
                      className="form-control mb-3"
                      value={formData.form_id}
                      onChange={(e) =>
                        setFormData({ ...formData, form_id: e.target.value })
                      }
                    >
                      <option value="">Select Form</option>
                      {forms.map((f) => (
                        <option key={f.id} value={f.id}>
                          {f.name}
                        </option>
                      ))}
                    </select>
                  </>
                )}

                {/* Step 3 */}
                {currentStep === 3 && (
                  <>
                    <label>Upload Leads CSV</label>
                    <div
                      className="border border-dashed rounded p-4 text-center"
                      onClick={() =>
                        document.getElementById("csvUpload").click()
                      }
                      style={{ cursor: "pointer", background: "#f9f9f9" }}
                    >
                      <p className="mb-0">Click or drag CSV file here</p>
                      <input
                        type="file"
                        id="csvUpload"
                        accept=".csv"
                        className="d-none"
                        onChange={handleFileUpload}
                      />
                    </div>

                    {formData.leadsData && (
                      <>
                        <div className="mt-3 text-success">
                          ✅ Uploaded: {formData.leadsData.name}
                        </div>
                        <h6 className="mt-4">Field Mapping</h6>
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>CSV Header</th>
                              <th>Sample</th>
                              <th>Map to</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Object.entries(formData.fieldMap).map(
                              ([header, mapped]) => (
                                <tr key={header}>
                                  <td>{header}</td>
                                  <td>
                                    {formData.leadsDataParsed[0]?.[header] ||
                                      "-"}
                                  </td>
                                  <td>
                                    <select
                                      className="form-control"
                                      value={mapped}
                                      onChange={(e) =>
                                        setFormData((prev) => ({
                                          ...prev,
                                          fieldMap: {
                                            ...prev.fieldMap,
                                            [header]: e.target.value,
                                          },
                                        }))
                                      }
                                    >
                                      <option value="">Unmapped</option>
                                      {selectedFields
                                        .filter(
                                          (field) =>
                                            typeof field === "string" &&
                                            field.trim() !== ""
                                        )
                                        .map((field) => (
                                          <option key={field} value={field}>
                                            {field}
                                          </option>
                                        ))}
                                    </select>
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                      </>
                    )}
                  </>
                )}

                {/* Footer */}
                <div className="mt-4 d-flex justify-content-between">
                  {currentStep > 1 && (
                    <button
                      className="btn btn-secondary"
                      onClick={() => setCurrentStep(currentStep - 1)}
                    >
                      ← Back
                    </button>
                  )}
                  {currentStep < 3 ? (
                    <button
                      className="btn btn-primary ms-auto"
                      onClick={() => setCurrentStep(currentStep + 1)}
                    >
                      Next →
                    </button>
                  ) : (
                    <button
                      className="btn btn-success ms-auto"
                      onClick={handleSubmit}
                    >
                      ✅ Submit
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Campaigns;
