import React, { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import { toast } from "react-toastify";
import styles from "../pages/Home.module.css";
import "react-toastify/dist/ReactToastify.css";
const API_BASE_URL = import.meta.env.VITE_API_URL;

function Agents() {
  const [showModal, setShowModal] = useState(false);
  const [agents, setAgents] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    countryCode: "+91",
    email: "",
    company: "",
    status: "active",
    address: "",
    password: "",
    profile_img: null,
  });

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/user/buyers`);
      setAgents(res.data);
      console.log(res.data);
    } catch (error) {
      toast.error("Failed to fetch agents");
    }
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("countryCode", formData.countryCode);
      data.append("company", formData.company);
      data.append("status", formData.status);
      data.append("password", formData.password);
      data.append("address", formData.address);
      if (formData.profile_img)
        data.append("profile_img", formData.profile_img);

      if (editMode) {
        await axios.put(`${API_BASE_URL}/api/user/${editId}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Buyer updated successfully");
      } else {
        await axios.post(`${API_BASE_URL}/api/user`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Buyer added successfully");
      }

      fetchAgents();
      setFormData({
        name: "",
        phone: "",
        countryCode: "+91",
        email: "",
        company: "",
        status: "active",
        address: "",
        profile_img: null,
      });
      setShowModal(false);
      setEditMode(false);
      setEditId(null);
    } catch (error) {
      toast.error("Failed to save buyer");
    }
  };

  const handleEdit = (agent) => {
    setFormData({
      name: agent.name,
      phone: agent.phone,
      countryCode: agent.countryCode || "+91",
      email: agent.email,
      company: agent.company || "",
      status: agent.status,
      address: agent.address,
      profile_img: agent.profile_img,
    });
    setEditId(agent.id);
    setEditMode(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this agent?")) {
      try {
        await axios.delete(`${API_BASE_URL}/api/user/${id}`);
        toast.success("Buyer deleted successfully");
        fetchAgents();
      } catch (error) {
        toast.error("Failed to delete buyer");
      }
    }
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
                  {/* Left Section - Title & Breadcrumb */}
                  <div>
                    <ol className={styles.breadcrumb}>
                      <li className={styles.breadcrumbItem}>
                        <a href="/">Call Tracking</a>
                      </li>
                      <li
                        className={`${styles.breadcrumbItem} ${styles.active}`}
                      >
                        Buyers
                      </li>
                    </ol>
                    <h1 className={styles.pageTitle}>Buyers</h1>
                  </div>

                  {/* Right Section - Notification + Date Filter */}
                  <div
                    className={styles.dateFilter}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    {/* 🔔 Notification Button */}
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
                      {/* Red Dot */}
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

                    {/* 📅 Date Range */}
                    <span className={styles.dateRange}>
                      Jun 16, 2025 - Jul 10, 2025
                    </span>

                    {/* Filter Button */}
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

        <div>
          <div className="page-wrapper">
            <div className="page-content container-fluid">
              <div className="d-flex justify-content-between align-items-center mb-3">
                {/* <h4>Agents</h4> */}
                <button
                  className="btn btn-primary"
                  style={{ backgroundColor: "#2E6F6E" }}
                  onClick={() => {
                    setShowModal(true);
                    setEditMode(false);
                    setEditId(null);
                    setFormData({
                      name: "",
                      phone: "",
                      countryCode: "+91",
                      email: "",
                      company: "",
                      status: "active",
                      address: "",
                      password: "",
                      profile_img: null,
                    });
                  }}
                >
                  New Buyer
                </button>
              </div>

              <div className="card">
                <div className="card-body">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Company</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {agents.map((agent) => (
                        <tr key={agent.id}>
                          <td>
                            <img
                              src={
                                agent.profile_img
                                  ? `http://localhost:3000${agent.profile_img.replace(
                                      /\\/g,
                                      "/"
                                    )}`
                                  : "/assets/images/users/avatar-1.jpg"
                              }
                              alt="Avatar"
                              className="rounded-circle me-2"
                              style={{ width: "30px", height: "30px" }}
                            />
                            {agent.name}
                          </td>
                          <td>{agent.email}</td>
                          <td>{agent.phone}
                          </td>
                          <td>{agent.company || "N/A"}</td>
                          <td
                            className={
                              agent.status === "active"
                                ? "text-success"
                                : "text-danger"
                            }
                          >
                            {agent.status}
                          </td>
                          <td>
                            <button
                              className="btn btn-sm btn-primary me-1"
                              onClick={() => handleEdit(agent)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDelete(agent.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Modal */}
              {showModal && (
                <>
                  {/* Overlay */}
                  <div
                    className="modal-overlay"
                    onClick={() => {
                      setShowModal(false);
                      setEditId(null);
                      resetForm();
                    }}
                  />

                  {/* Slide-in Modal */}
                  <div className="slide-in-modal" style={{ width: "700px" }}>
                    <div className="p-4">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5
                          className="mb-0"
                          style={{ fontSize: "18px", fontWeight: "bold" }}
                        >
                          {editMode ? "Edit User" : "New Buyer"}
                        </h5>
                        <button
                          className="btn-close"
                          style={{ fontSize: "24px" }}
                          onClick={() => {
                            setShowModal(false);
                            setEditId(null);
                            resetForm();
                          }}
                        ></button>
                      </div>

                      {/* Form Fields */}
                      <div className="mb-3 profile-upload-wrapper">
                        <img
                          src={
                            formData.profile_img
                              ? typeof formData.profile_img === "object"
                                ? URL.createObjectURL(formData.profile_img)
                                : `http://localhost:3000${formData.profile_img.replace(
                                    /\\/g,
                                    "/"
                                  )}`
                              : "/assets/images/users/avatar-10.jpg"
                          }
                          alt="Profile"
                          className="profile-upload-img"
                        />

                        <label
                          htmlFor="profileUpload"
                          className="profile-upload-label"
                          style={{
                            cursor: "pointer",
                            padding: "10px 20px",
                            backgroundColor: "#2E6F6E",
                            color: "#fff",
                            borderRadius: "5px",
                          }}
                        >
                          {formData.profile_img
                            ? "Change Photo"
                            : "Upload Photo"}
                        </label>

                        <input
                          id="profileUpload"
                          type="file"
                          accept="image/*"
                          className="profile-upload-input"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              profile_img: e.target.files[0],
                            })
                          }
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Name</label>
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

                      <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          style={{ padding: "15px" }}
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          className="form-label"
                          style={{ fontWeight: 600, fontSize: "16px" }}
                        >
                          Phone
                        </label>
                        <div
                          className="input-group"
                          style={{ alignItems: "center" }}
                        >
                          {/* Country Code Dropdown */}
                          <select
                            className="form-select"
                            style={{ maxWidth: "100px", padding: "15px 10px" }}
                            value={formData.countryCode}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                countryCode: e.target.value,
                              })
                            }
                          >
                            <option value="+91">IN +91</option>
                            <option value="+1">US +1</option>
                            <option value="+44">GB +44</option>
                            <option value="+61">AU +61</option>
                          </select>

                          {/* Phone Input */}
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter phone number"
                            style={{ padding: "15px" }}
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                phone: e.target.value,
                              })
                            }
                          />

                          {/* Get OTP Button */}
                          <button
                            className="btn btn-primary"
                            style={{
                              padding: "15px 10px",
                              background: "#2E6F6E",
                            }}
                            type="button"
                            onClick={() => {
                              const { countryCode, phone } = formData;
                              if (!countryCode || !phone.trim()) {
                                alert(
                                  "❌ Please enter country code and phone number."
                                );
                              } else if (!/^\d{6,15}$/.test(phone)) {
                                alert("❌ Invalid phone number format.");
                              } else {
                                alert(
                                  `✅ OTP sent successfully to ${countryCode}${phone}`
                                );
                              }
                            }}
                          >
                            Get OTP
                          </button>
                        </div>
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                          type="password"
                          className="form-control"
                          style={{ padding: "15px" }}
                          value={formData.password}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              password: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Company</label>
                        <input
                          type="text"
                          className="form-control"
                          style={{ padding: "15px" }}
                          value={formData.company}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              company: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Address</label>
                        <input
                          type="text"
                          className="form-control"
                          style={{ padding: "15px" }}
                          value={formData.address}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              address: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Status</label>
                        <select
                          className="form-control"
                          style={{ padding: "15px", color: "#808080ff" }}
                          value={formData.status}
                          onChange={(e) =>
                            setFormData({ ...formData, status: e.target.value })
                          }
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </div>

                      <div className="d-flex justify-content-end gap-2 mt-4">
                        <button
                          className="btn btn-outline-secondary"
                          style={{ padding: "10px 20px", fontSize: "16px" }}
                          onClick={() => {
                            setShowModal(false);
                            setEditId(null);
                            resetForm();
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          className="btn btn-primary"
                          style={{
                            padding: "10px 20px",
                            fontSize: "16px",
                            backgroundColor: "#2E6F6E",
                          }}
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
        </div>
      </div>
    </>
  );
}

export default Agents;
