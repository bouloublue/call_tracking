import React, { useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import Papa from "papaparse";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const API_BASE_URL = import.meta.env.VITE_API_URL;
import styles from "../pages/Home.module.css";

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
      .get(`${API_BASE_URL}/api/user/clients`)
      .then((res) => setClients(res.data));
    axios.get(`${API_BASE_URL}/api/form`).then((res) => setForms(res.data));
    axios
      .get(`${API_BASE_URL}/api/campaign`)
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
        const filtered = results.data.filter((row) =>
          Object.values(row).some((v) => v?.trim() !== "")
        );
        const initialMap = {};
        headers.forEach((header) => (initialMap[header] = ""));
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
  //     leadsDataParsed: formData.leadsDataParsed,
  //   };

  //   try {
  //     if (editMode && editingCampaignId) {
  //       await axios.put(
  //         `${API_BASE_URL}/api/campaign/${editingCampaignId}`,
  //         payload
  //       );
  //     } else {
  //       await axios.post(`${API_BASE_URL}/api/campaign`, payload);

  //       // Save leads to localStorage for now
  //       const savedLeads = JSON.parse(localStorage.getItem("leads")) || [];
  //       const updatedLeads = [
  //         ...savedLeads,
  //         ...formData.leadsDataParsed.map((lead) => ({
  //           campaignName: formData.name,
  //           ...lead,
  //         })),
  //       ];
  //       localStorage.setItem("leads", JSON.stringify(updatedLeads));
  //     }

  //     setShowModal(false);
  //     setEditMode(false);
  //     setEditingCampaignId(null);
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
  //     alert("Failed to save campaign.");
  //   }
  // };

  const handleSubmit = async () => {
    if (Object.values(formData.fieldMap).filter((v) => v).length < 3) {
      alert("Please map at least 3 fields.");
      return;
    }

    try {
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("user_id", formData.user_id);
      payload.append("client_id", formData.client_id);
      payload.append("form_id", formData.form_id);
      payload.append("import_lead_fields", JSON.stringify(formData.fieldMap));
      if (formData.leadsData) {
        payload.append("file", formData.leadsData);
      }
      payload.append(
        "leadsDataParsed",
        JSON.stringify(formData.leadsDataParsed)
      );

      if (editMode && editingCampaignId) {
        await axios.put(
          `${API_BASE_URL}/api/campaign/${editingCampaignId}`,
          payload,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        toast.success("Campaign updated successfully");
      } else {
        await axios.post(`${API_BASE_URL}/api/campaign`, payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Campaign addes successfully");
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
      toast.error("Failed to save campaigny");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this campaign?"))
      return;
    try {
      await axios.delete(`${API_BASE_URL}/api/campaign/${id}`);
      setCampaigns((prev) => prev.filter((c) => c.id !== id));
      toast.success("Campaign Deleted Successfully");
    } catch (err) {
      console.error("Delete failed", err);
      toast.error("Failed to delete campaign");
    }
  };

  // Handle parsing selected form fields
  const selectedForm = forms.find((f) => f.id === formData.form_id);
  const selectedFields =
    selectedForm?.fields && typeof selectedForm.fields === "string"
      ? JSON.parse(selectedForm.fields)
      : selectedForm?.fields || [];
  // const selectedFields = ["Name", "Email", "Phone number", "Company"];

  return (
    <>
      {/* NavBar and SideBar */}


      <div className={styles.pageTitleBox}>
        <div className={styles.pageTitleContainer}>
          <div className={`${styles.row} ${styles.gap0}`}>
            <div className={styles.col12}>
              <div className={`${styles.pageTitleContent} ${styles.dSmFlex} ${styles.justifyContentSmBetween} ${styles.alignItemsCenter}`}>
                <div>
                  <ol className={styles.breadcrumb}>
                    <li className={styles.breadcrumbItem}>
                      <a href="/">Call Tracking</a>
                    </li>
                    <li className={`${styles.breadcrumbItem} ${styles.active}`}>Campaigns</li>
                  </ol>
                  <h1 className={styles.pageTitle}>Campaigns</h1>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      <SideBar />

      {/* Main Content */}
      <div className="page-wrapper">
        <div className="page-content container-fluid">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <button
              className="btn btn-primary" style={{ alignItems: "left", padding: "15px 20px", fontSize: "16px", backgroundColor: "#2E6F6E" }}
              onClick={() => setShowModal(true)}
            >
              + Add Campaign
            </button>
          </div>

          {/* Campaign List Table Styled Like Screenshot */}
          {/* Campaign List Table Styled Like Screenshot */}
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th style={{ fontSize: "14px", fontWeight: 600, color: "#aca9a9ff" }}>CAMPAIGN</th>
                    <th style={{ fontSize: "14px", fontWeight: 600, color: "#aca9a9ff" }}>AGENT</th>
                    <th style={{ fontSize: "14px", fontWeight: 600, color: "#aca9a9ff" }}>FORM</th>
                    <th style={{ fontSize: "14px", fontWeight: 600, color: "#aca9a9ff" }}>LAST ACTIONER</th>
                    <th style={{ fontSize: "14px", fontWeight: 600, color: "#aca9a9ff" }}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map((c) => (
                    <tr key={c.id}>
                      <td>
                        <span className="badge bg-light text-dark px-3 py-2 rounded-pill text-capitalize fw-medium">
                          {c.name}
                        </span>
                      </td>
                      <td className="d-flex align-items-center gap-2">
                        <div
                          className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center"
                          style={{ width: 35, height: 35, fontWeight: 600 }}
                        >
                          {getInitials(c.client?.name)}
                        </div>
                        <span>{c.client?.name}</span>
                      </td>
                      <td>{c.form?.name || "N/A"}</td>
                      <td>Admin</td>
                      <td>
                        <button
                          className="btn btn-sm me-2 p-1"
                          title="Edit"
                          onClick={() => {
                            setEditMode(true);
                            setShowModal(true);
                            setEditingCampaignId(c.id);
                            setFormData({
                              name: c.name,
                              client_id: c.client_id,
                              form_id: c.form_id,
                              user_id: c.user_id,
                              fieldMap:
                                typeof c.import_lead_fields === "string"
                                  ? JSON.parse(c.import_lead_fields)
                                  : c.import_lead_fields || {},
                              file: c.file || "",
                              leadsData: null,
                              leadsDataParsed: [],
                            });
                          }}
                        >
                          <img src="/assets/images/icons/edit.png" alt="Edit" width="16" />
                        </button>
                        <button
                          className="btn btn-sm p-1"
                          title="Delete"
                          onClick={() => handleDelete(c.id)}
                        >
                          <img src="/assets/images/icons/delete.png" alt="Delete" width="16" />
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
    {/* Overlay */}
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

    {/* Modal */}
    <div
      className="offcanvas-panel"
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        height: "100vh",
        width: "30%",
        backgroundColor: "#fff",
        boxShadow: "-2px 0 10px rgba(0,0,0,0.15)",
        zIndex: 1050,
        overflowY: "auto",
        padding: "10px",
      }}
    >
      <div className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0" style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "24px" }}>
            {editMode ? "Edit Campaign" : "New Campaign"}
          </h5>
          <button
            className="btn-close"
            style={{ fontSize: "24px" }}
            onClick={() => {
              setShowModal(false);
              setEditMode(false);
              setEditingCampaignId(null);
              resetForm();
            }}
          ></button>
        </div>

        {/* 👇 Description Field */}
        <div className="mb-3">
          <label className="form-label" style={{ marginBottom: "10px", fontSize: "18px" }}>Description</label>
          <textarea
            className="form-control"
            style={{ padding: "15px" }}
            rows={3}
            value={formData.description || ""}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          ></textarea>
        </div>

        {/* 👇 Numbers Multi-select Dropdown */}
        <div className="mb-3">
          <label className="form-label" style={{ marginBottom: "10px", fontSize: "18px" }}>Numbers</label>
          <select
            className="form-select"
            multiple
            style={{ padding: "15px", height: "120px" }}
            value={formData.numbers || []}
            onChange={(e) => {
              const selectedOptions = Array.from(e.target.selectedOptions).map(opt => opt.value);
              setFormData({ ...formData, numbers: selectedOptions });
            }}
          >

            <option value="7012345678">7012345678</option>
          </select>
          <small className="text-muted">Hold Ctrl (Windows) or Command (Mac) to select multiple numbers.</small>
        </div>

        {/* 👇 Campaign Name Field */}
        <div className="mb-3">
          <label className="form-label" style={{ marginBottom: "20px", fontSize: "20px" }}>
            Name Campaign
          </label>
          <input
            type="text"
            className="form-control"
            style={{ padding: "15px" }}
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />
        </div>

        {/* 👇 Action Buttons */}
        <div className="d-flex justify-content-end gap-2 mt-4">
          <button
            className="btn btn-outline-secondary"
            onClick={() => {
              setShowModal(false);
              setEditMode(false);
              setEditingCampaignId(null);
              resetForm();
            }}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary"
            style={{ backgroundColor: "#2E6F6E" }}
            onClick={handleSubmit}
          >
            {editMode ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  </>
)}

        </div>
      </div>
    </>
  );
}

export default Campaigns;
