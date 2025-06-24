// import React, { useState } from "react";
// import SideBar from "../components/SideBar";
// import NavBar from "../components/NavBar";

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
//   });

//   const handleSubmit = async () => {
//     console.log("Form submitted:", formData);
//     setShowModal(false);
//     setCurrentStep(1);
//     // Reset form data if needed
//   };

//   const handleFileUpload = (e) => {
//     setFormData({ ...formData, leadsData: e.target.files[0] });
//   };

//   const handleNext = () => {
//     setCurrentStep(currentStep + 1);
//   };

//   const handleBack = () => {
//     setCurrentStep(currentStep - 1);
//   };

//   const campaigns = [
//     {
//       name: "real estate",
//       progress: "+ Add New Lead",
//       members: "88.8",
//       form: "Software Development Form",
//       startedOn: "17-06-2025 05:33 am",
//       lastActioner: "Admin",
//     },
//     {
//       name: "Make New Mobile Application",
//       progress: "Remaining Leads: 6/99",
//       members: "88.8",
//       form: "Software Development Form",
//       startedOn: "18-05-2025 04:49 am",
//       lastActioner: "Admin",
//     },
//     {
//       name: "Job Applications",
//       progress: "Remaining Leads: 16/35",
//       members: "4/96",
//       form: "Default Form",
//       startedOn: "16-05-2025 04:28 pm",
//       lastActioner: "Admin",
//     },
//     {
//       name: "Website Development Campaign",
//       progress: "Remaining Leads: 7/183",
//       members: "8/96",
//       form: "Software Development Form",
//       startedOn: "19-05-2025 07:27 pm",
//       lastActioner: "Member",
//     },
//     {
//       name: "Social Media Campaign",
//       progress: "Remaining Leads: 7/498",
//       members: "7/96",
//       form: "Default Form",
//       startedOn: "10-06-2025 02:34 pm",
//       lastActioner: "Admin",
//     },
//     {
//       name: "Sell Home Loan Campaign",
//       progress: "Remaining Leads: 23/38",
//       members: "6/96",
//       form: "Insurance Enquiry Form",
//       startedOn: "16-05-2025 03:57 am",
//       lastActioner: "Admin",
//     },
//   ];

//   return (
//     <div>
//       <NavBar />
//       <SideBar />
//       <div className="page-title-box">
//         <div className="container-fluid">
//           <div className="row gap-0">
//             <div className="col-sm-12">
//               <div className="page-title-content d-sm-flex justify-content-sm-between align-items-center">
//                 <div className="">
//                   <ol className="breadcrumb mb-0">
//                     <li className="breadcrumb-item">
//                       <a href="/manager">Call Tracking</a>
//                     </li>
//                     <li className="breadcrumb-item active">Campaigns</li>
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
//             <div className="row">
//               <div className="col-md-12">
//                 <div className="d-flex justify-content-between align-items-center mb-3">
//                   <h4>Campaigns</h4>
//                   <button
//                     className="btn btn-primary"
//                     onClick={() => setShowModal(true)}
//                   >
//                     Add New Campaign
//                   </button>
//                 </div>
//               </div>
//             </div>

//             <div className="row">
//               <div className="col-md-12">
//                 <div className="card">
//                   <div className="card-body">
//                     <div className="d-flex mb-3">
//                       <button className="btn btn-outline-primary me-2">
//                         Active Campaign
//                       </button>
//                       <button className="btn btn-outline-secondary">
//                         Completed Campaign
//                       </button>
//                     </div>

//                     <div className="table-responsive">
//                       <table className="table table-hover">
//                         <thead>
//                           <tr>
//                             <th>Name</th>
//                             <th>Progress</th>
//                             <th>Members</th>
//                             <th>Form</th>
//                             <th>Started On</th>
//                             <th>Last Actioner</th>
//                             <th>Action</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {campaigns.map((campaign, index) => (
//                             <tr key={index}>
//                               <td>{campaign.name}</td>
//                               <td>{campaign.progress}</td>
//                               <td>{campaign.members}</td>
//                               <td>{campaign.form}</td>
//                               <td>{campaign.startedOn}</td>
//                               <td>{campaign.lastActioner}</td>
//                               <td style={{ width: "20%" }}>
//                               <button className="btn btn-sm me-1" style={{ backgroundColor: "#1890ff" }}>
//                                   <img src="/assets/images/icons/export.png" alt="View" style={{ width: "16px", height: "16px"}} />
//                                 </button><div className="d-inline-block mx-1"></div>
//                                 <button className="btn btn-sm me-1" style={{ backgroundColor: "#1890ff" }}>
//                                   <img src="/assets/images/icons/edit.png" alt="View" style={{ width: "16px", height: "16px"}} />
//                                 </button><div className="d-inline-block mx-1"></div>
//                                 <button className="btn btn-sm" style={{ backgroundColor: "#1890ff" }}>
//                                   <img src="/assets/images/icons/plus.png" alt="Add" style={{ width: "16px", height: "16px" }} />
//                                 </button><div className="d-inline-block mx-1"></div>
//                                 <button className="btn btn-sm" style={{ backgroundColor: "#1890ff" }}>
//                                   <img src="/assets/images/icons/delete.png" alt="Edit" style={{ width: "16px", height: "16px" }} />
//                                 </button><div className="d-inline-block mx-1"></div>
//                               </td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Modal */}
//             {showModal && (
//               <div
//                 className="modal d-block"
//                 style={{ background: "rgba(0,0,0,0.5)" }}
//               >
//                 <div className="modal-dialog modal-lg">
//                   <div className="modal-content">
//                     <div className="modal-header">
//                       <h5 className="modal-title">New Campaign</h5>
//                       <button
//                         className="btn-close"
//                         onClick={() => {
//                           setShowModal(false);
//                           setCurrentStep(1);
//                         }}
//                       ></button>
//                     </div>
//                     <div className="modal-body">
//                       <div className="steps mb-4">
//                         <div className="d-flex justify-content-between">
//                           <div
//                             className={`step ${currentStep === 1 ? "active" : ""}`}
//                           >
//                             <span>1</span> Basic Settings
//                           </div>
//                           <div
//                             className={`step ${currentStep === 2 ? "active" : ""}`}
//                           >
//                             <span>2</span> Campaign Settings
//                           </div>
//                           <div
//                             className={`step ${currentStep === 3 ? "active" : ""}`}
//                           >
//                             <span>3</span> Import Data
//                           </div>
//                         </div>
//                       </div>

//                       {currentStep === 1 && (
//                         <div>
//                           <div className="mb-3">
//                             <label className="form-label">Name</label>
//                             <input
//                               type="text"
//                               className="form-control"
//                               value={formData.name}
//                               onChange={(e) =>
//                                 setFormData({
//                                   ...formData,
//                                   name: e.target.value,
//                                 })
//                               }
//                               placeholder="Enter campaign name"
//                             />
//                           </div>
//                           <div className="mb-3">
//                             <label className="form-label">Agents</label>
//                             <select
//                               className="form-control"
//                               value={formData.agents}
//                               onChange={(e) =>
//                                 setFormData({
//                                   ...formData,
//                                   agents: e.target.value,
//                                 })
//                               }
//                             >
//                               <option value="">Select Type</option>
//                              <option value="Tony">Tony</option>
//                              <option value="John">John</option>
//                              <option value="Alice">Alice</option>
//                              <option value="Bob">Bob</option>
//                             </select>
//                           </div>
//                             <div className="mb-3">
//                             <label className="form-label">Form</label>
//                             <select
//                               className="form-control"
//                               value={formData.formType}
//                               onChange={(e) =>
//                                 setFormData({
//                                   ...formData,
//                                   formType: e.target.value,
//                                 })
//                               }
//                             >
//                               <option value="Default Form">Default Form</option>
//                               <option value="Software Development Form">
//                                 Software Development Form
//                               </option>
//                               <option value="Insurance Enquiry Form">
//                                 Insurance Enquiry Form
//                               </option>
//                             </select>
//                           </div>
//                         </div>
//                       )}

//                       {currentStep === 2 && (
//                         <div>
//                           <div className="mb-3">
//                             <label className="form-label">Form Type</label>
//                             <select
//                               className="form-control"
//                               value={formData.formType}
//                               onChange={(e) =>
//                                 setFormData({
//                                   ...formData,
//                                   formType: e.target.value,
//                                 })
//                               }
//                             >
//                               <option value="Default Form">Default Form</option>
//                               <option value="Software Development Form">
//                                 Software Development Form
//                               </option>
//                               <option value="Insurance Enquiry Form">
//                                 Insurance Enquiry Form
//                               </option>
//                             </select>
//                           </div>
//                           <div className="row">
//                             <div className="col-md-6 mb-3">
//                               <label className="form-label">Start Date</label>
//                               <input
//                                 type="date"
//                                 className="form-control"
//                                 value={formData.startDate}
//                                 onChange={(e) =>
//                                   setFormData({
//                                     ...formData,
//                                     startDate: e.target.value,
//                                   })
//                                 }
//                               />
//                             </div>
//                             <div className="col-md-6 mb-3">
//                               <label className="form-label">End Date</label>
//                               <input
//                                 type="date"
//                                 className="form-control"
//                                 value={formData.endDate}
//                                 onChange={(e) =>
//                                   setFormData({
//                                     ...formData,
//                                     endDate: e.target.value,
//                                   })
//                                 }
//                               />
//                             </div>
//                           </div>
//                         </div>
//                       )}

//                       {currentStep === 3 && (
//                         <div>
//                           <div className="mb-3">
//                             <label className="form-label">
//                               Import Campaign Leads/Data
//                             </label>
//                             <div className="border rounded p-4 text-center">
//                               <p>
//                                 Click or drag file to this area to upload
//                               </p>
//                               <p className="small text-muted">
//                                 Support for a single or bulk upload. Strictly
//                                 prohibit from uploading company data or other
//                                 band files
//                               </p>
//                               <input
//                                 type="file"
//                                 className="form-control d-none"
//                                 id="fileUpload"
//                                 onChange={handleFileUpload}
//                               />
//                               <label
//                                 htmlFor="fileUpload"
//                                 className="btn btn-primary mt-2"
//                               >
//                                 Select File
//                               </label>
//                               {formData.leadsData && (
//                                 <div className="mt-2">
//                                   Selected: {formData.leadsData.name}
//                                 </div>
//                               )}
//                             </div>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                     <div className="modal-footer">
//                       {currentStep > 1 && (
//                         <button
//                           className="btn btn-secondary me-2"
//                           onClick={handleBack}
//                         >
//                           Back
//                         </button>
//                       )}
//                       {currentStep < 3 ? (
//                         <button
//                           className="btn btn-primary"
//                           onClick={handleNext}
//                         >
//                           Next
//                         </button>
//                       ) : (
//                         <button
//                           className="btn btn-success"
//                           onClick={handleSubmit}
//                         >
//                           Submit
//                         </button>
//                       )}
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

// export default Campaigns;

import React, { useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import Papa from "papaparse";

function Campaigns() {
  const [showModal, setShowModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    agents: "",
    formType: "Default Form",
    startDate: "",
    endDate: "",
    leadsData: null,
    leadsDataParsed: [],
  });
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const stored = sessionStorage.getItem("campaigns");
    if (stored) setCampaigns(JSON.parse(stored));
  }, [showModal]);

  const handleSubmit = () => {
    const updatedCampaigns = [
      ...campaigns,
      {
        ...formData,
        members: Math.floor(Math.random() * 5) + 1, // Simulate number of members
        progress: `${Math.floor(Math.random() * 100)}%`,
        startedOn: new Date().toLocaleString(),
        lastActioner: "Admin",
      },
    ];
    sessionStorage.setItem("campaigns", JSON.stringify(updatedCampaigns));
    setCampaigns(updatedCampaigns);
    setShowModal(false);
    setCurrentStep(1);
    setFormData({
      name: "",
      agents: "",
      formType: "Default Form",
      startDate: "",
      endDate: "",
      leadsData: null,
      leadsDataParsed: [],
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          const filteredData = results.data.filter(
            (row) => row.name && row.phone
          );
          setFormData({
            ...formData,
            leadsData: file,
            leadsDataParsed: filteredData,
          });
        },
      });
    }
  };

  const downloadSampleCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "name,email,company,phone\nJohn Doe,john@example.com,ABC Corp,1234567890";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "sample_leads.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportLeadsCSV = (campaign) => {
    if (!campaign.leadsDataParsed || campaign.leadsDataParsed.length === 0)
      return;

    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Campaign Name,Agent,Name,Email,Company,Phone\n" +
      campaign.leadsDataParsed
        .map(
          (lead) =>
            `${campaign.name},${campaign.agents},${lead.name},${lead.email},${lead.company},${lead.phone}`
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `${campaign.name.replace(/\s+/g, "_")}_leads.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
        <div className="page-content">
          <div className="container-fluid">
            <div className="row mb-3">
              <div className="col-md-12 d-flex justify-content-between align-items-center">
                <h4>Campaigns</h4>
                <button
                  className="btn btn-primary"
                  onClick={() => setShowModal(true)}
                >
                  Add New Campaign
                </button>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Progress</th>
                        <th>Members</th>
                        <th>Form</th>
                        <th>Started On</th>
                        <th>Last Actioner</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {campaigns.map((campaign, index) => (
                        <tr key={index}>
                          <td>{campaign.name}</td>
                          <td>
                            <div
                              className="progress"
                              style={{ height: "20px" }}
                            >
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{
                                  width: campaign.progress || "40%",
                                  backgroundColor: "#1890ff",
                                }}
                                aria-valuenow={parseInt(campaign.progress)}
                                aria-valuemin="0"
                                aria-valuemax="100"
                              >
                                {campaign.progress}
                              </div>
                            </div>
                          </td>
                          <td>
                            {Array.from({ length: campaign.members || 1 }).map(
                              (_, i) => (
                                <span key={i} style={{ fontSize: "20px" }}>
                                  👤
                                </span>
                              )
                            )}
                          </td>
                          <td>{campaign.formType}</td>
                          <td>{campaign.startDate}</td>
                          <td>Admin</td>
                          <td style={{ width: "20%" }}>
                            <button
                              className="btn btn-sm me-1"
                              onClick={() => exportLeadsCSV(campaign)}
                              style={{ backgroundColor: "#1890ff" }}
                            >
                              <img
                                src="/assets/images/icons/export.png"
                                alt="Export"
                                style={{ width: "16px", height: "16px" }}
                              />
                            </button>
                            <button
                              className="btn btn-sm me-1"
                              style={{ backgroundColor: "#1890ff" }}
                            >
                              <img
                                src="/assets/images/icons/edit.png"
                                alt="Edit"
                                style={{ width: "16px", height: "16px" }}
                              />
                            </button>
                            <button
                              className="btn btn-sm me-1"
                              style={{ backgroundColor: "#1890ff" }}
                            >
                              <img
                                src="/assets/images/icons/plus.png"
                                alt="Add"
                                style={{ width: "16px", height: "16px" }}
                              />
                            </button>
                            <button
                              className="btn btn-sm"
                              style={{ backgroundColor: "#1890ff" }}
                            >
                              <img
                                src="/assets/images/icons/delete.png"
                                alt="Delete"
                                style={{ width: "16px", height: "16px" }}
                              />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {campaigns.length === 0 && (
                        <tr>
                          <td colSpan="7" className="text-center">
                            No campaigns added yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Modal */}
            {showModal && (
              <>
                {/* Backdrop */}
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

                {/* Drawer Panel */}
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
                    transform: "translateX(0%)",
                    transition: "transform 0.3s ease-in-out",
                    overflowY: "auto",
                    borderTopLeftRadius: "10px",
                    borderBottomLeftRadius: "10px",
                  }}
                >
                  {/* Header */}
                  <div className="p-4 border-bottom d-flex justify-content-between align-items-center">
                    <h5 className="mb-0 fw-semibold">New Campaign</h5>
                    <button
                      className="btn-close"
                      onClick={() => {
                        setShowModal(false);
                        setCurrentStep(1);
                      }}
                    ></button>
                  </div>

                  {/* Steps */}
                  <div className="p-4">
                    <div className="stepper-container d-flex justify-content-between align-items-center mb-5 px-3 position-relative">
  {[1, 2, 3].map((step, i) => (
    <div
      key={i}
      className="step-item text-center position-relative d-flex flex-column align-items-center"
      style={{ flex: 1 }}
    >
      {/* Connecting line */}
      {i < 2 && (
        <div
          className="step-line position-absolute top-50 start-100 translate-middle-y"
          style={{
            width: "100%",
            height: "2px",
            backgroundColor: currentStep > step ? "#28a745" : "#dee2e6",
            zIndex: 0,
          }}
        ></div>
      )}

      {/* Step circle */}
      <div
        className={`step-circle d-flex justify-content-center align-items-center mb-2 ${
          currentStep === step ? "active" : ""
        }`}
      >
        {step}
      </div>

      {/* Label */}
      <div
        className={`step-label ${
          currentStep === step ? "text-dark fw-bold" : "text-muted"
        }`}
      >
        {["Basic Settings", "Campaign Settings", "Import Leads"][i]}
      </div>
    </div>
  ))}
</div>


                    {/* Step 1: Basic */}
                    {currentStep === 1 && (
                      <>
                        <label className="form-label">Campaign Name</label>
                        <input
                          type="text"
                          className="form-control mb-3"
                          placeholder="Enter campaign name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                        />

                        <label className="form-label">Assign Agent</label>
                        <select
                          className="form-control mb-3"
                          value={formData.agents}
                          onChange={(e) =>
                            setFormData({ ...formData, agents: e.target.value })
                          }
                        >
                          <option value="">Select Agent</option>
                          <option value="Tony">Tony</option>
                          <option value="John">John</option>
                          <option value="Alice">Alice</option>
                        </select>
                      </>
                    )}

                    {/* Step 2: Settings */}
                    {currentStep === 2 && (
                      <>
                        <label className="form-label">Select Form</label>
                        <select
                          className="form-control mb-3"
                          value={formData.formType}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              formType: e.target.value,
                            })
                          }
                        >
                          <option value="Default Form">Default Form</option>
                          <option value="Software Development Form">
                            Software Development Form
                          </option>
                          <option value="Insurance Enquiry Form">
                            Insurance Enquiry Form
                          </option>
                        </select>

                        <div className="row">
                          <div className="col-6">
                            <label className="form-label">Start Date</label>
                            <input
                              type="date"
                              className="form-control mb-3"
                              value={formData.startDate}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  startDate: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="col-6">
                            <label className="form-label">End Date</label>
                            <input
                              type="date"
                              className="form-control mb-3"
                              value={formData.endDate}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  endDate: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {/* Step 3: Import Leads */}
                    {currentStep === 3 && (
                      <>
                        <label className="form-label">Import Leads (CSV)</label>
                        <div
                          className="border border-dashed rounded p-4 text-center"
                          onClick={() =>
                            document.getElementById("csvUpload").click()
                          }
                          style={{
                            cursor: "pointer",
                            background: "#f9f9f9",
                          }}
                        >
                          <img
                            src="/assets/images/icons/upload.png"
                            alt="Upload"
                            style={{ width: "40px", marginBottom: "10px" }}
                          />
                          <p className="mb-1">
                            Drag & drop CSV here or click to upload
                          </p>
                          <p className="small text-muted">
                            Format: name, email, company, phone
                          </p>
                          <input
                            type="file"
                            id="csvUpload"
                            className="d-none"
                            accept=".csv"
                            onChange={handleFileUpload}
                          />
                          {formData.leadsData && (
                            <div className="text-success mt-2">
                              ✅ Uploaded: {formData.leadsData.name}
                            </div>
                          )}
                        </div>

                        <button
                          className="btn btn-outline-primary btn-sm mt-3"
                          onClick={downloadSampleCSV}
                        >
                          📥 Download Sample Sheet
                        </button>
                      </>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="p-4 border-top d-flex justify-content-between">
                    {currentStep > 1 && (
                      <button
                        className="btn btn-outline-secondary"
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
    </div>
  );
}

export default Campaigns;
