import React, { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "../components/SideBar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../pages/Home.module.css";
import Swal from "sweetalert2";
import { HiBadgeCheck } from "react-icons/hi";
const API_BASE_URL = import.meta.env.VITE_API_URL;

function ActiveNumbers() {
  const [showModal, setShowModal] = useState(false);
  const [numbers, setNumbers] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    number: "",
    friendly_name: "",
    type: "local", // default to local
    status: "active"
  });

  useEffect(() => {
    fetchNumbers();
  }, []);

  const fetchNumbers = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/number`);
      setNumbers(res.data);
    } catch (error) {
      toast.error("Failed to fetch numbers");
    }
  };

  const handleSubmit = async () => {
    if (!formData.number || !formData.friendly_name) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      if (editMode) {
        await axios.put(`${API_BASE_URL}/api/number/${editId}`, formData);
        toast.success("Number updated successfully");
      } else {
        await axios.post(`${API_BASE_URL}/api/number`, formData);
        toast.success("Number added successfully");
      }

      fetchNumbers();
      resetForm();
      setShowModal(false);
    } catch (error) {
      toast.error("Failed to save number");
    }
  };

  const handleEdit = (number) => {
    setFormData({
      number: number.number,
      friendly_name: number.friendly_name,
      type: number.type,
      status: number.status
    });
    setEditId(number.id);
    setEditMode(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`${API_BASE_URL}/api/numbers/${id}`);
      toast.success("Number deleted successfully");
      fetchNumbers();
    } catch (error) {
      toast.error("Failed to delete number");
    }
  };

  const resetForm = () => {
    setFormData({
      number: "",
      friendly_name: "",
      type: "local",
      status: "active"
    });
    setEditMode(false);
    setEditId(null);
  };

  return (
    <>
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
                      <li className={`${styles.breadcrumbItem} ${styles.active}`}>Active Numbers</li>
                    </ol>
                    <h1 className={styles.pageTitle}>Active Numbers</h1>
                  </div>

                  {/* Right Section - Notification + Date Filter */}
                  <div className={styles.dateFilter} style={{ display: "flex", alignItems: "center" }}>
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
                    <span className={styles.dateRange}>Jun 16, 2025 - Jul 10, 2025</span>

                    {/* Filter Button */}
                    <button className={styles.filterBtn} style={{ marginLeft: "10px" }}>
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
                <button
                  className="btn btn-primary"
                  style={{ backgroundColor: "#2E6F6E" }}
                  onClick={() => setShowModal(true)}
                >
                  Add New Number
                </button>
              </div>

              <div className="card">
                <div className="card-body">
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="text-muted">Number</th>
                        <th className="text-muted">Friendly Name</th>
                        <th className="text-muted">Type</th>
                        <th className="text-muted">Status</th>
                        <th className="text-muted">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {numbers.map((number) => (
                        <tr key={number.id}>
                          <td>{number.number}
                            <HiBadgeCheck style={{ color: 'blue', marginBottom: '4px', marginLeft: '4px', fontSize: '16px' }} />
                          </td>
                          <td>{number.friendly_name}</td>
                          <td>{number.type}</td>
                          <td>
                            <span
                              className={`badge ${number.status === "active" ? "bg-success bg-opacity-10 text-success" : "bg-danger bg-opacity-10 text-danger"} p-2`}
                              style={{ fontSize: "0.85rem" }}
                            >
                              {number.status}
                            </span>
                          </td>
                          <td>
                            <button
                              className="btn btn-sm me-2 p-1"
                              onClick={() => handleEdit(number)}
                              title="Edit"
                            >
                              {/* <i className="fas fa-edit"></i> */}
                              <img
                                src="/assets/images/icons/edit.png"
                                alt="Edit"
                                width="16"
                              />
                            </button>
                            <button
                              className="btn btn-sm p-1"
                              onClick={() => handleDelete(number.id)}
                              title="Delete"
                            >
                              <img
                                src="/assets/images/icons/delete.png"
                                alt="Delete"
                                width="16"
                              />
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
                      resetForm();
                    }}
                  />

                  {/* Slide-in Modal */}
                  <div className="slide-in-modal" style={{ width: "700px" }}>
                    <div className="p-4">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="mb-0" style={{ fontSize: "18px", fontWeight: "bold" }}>
                          {editMode ? "Edit Number" : "Add New Number"}
                        </h5>
                        <button
                          className="btn-close"
                          style={{ fontSize: "24px" }}
                          onClick={() => {
                            setShowModal(false);
                            resetForm();
                          }}
                        ></button>
                      </div>

                      {/* Form Fields */}
                      <div className="mb-3">
                        <label className="form-label">Phone Number</label>
                        <input
                          type="text"
                          className="form-control"
                          style={{ padding: "15px" }}
                          value={formData.number}
                          onChange={(e) =>
                            setFormData({ ...formData, number: e.target.value })
                          }
                          placeholder="Enter phone number"
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Friendly Name</label>
                        <input
                          type="text"
                          className="form-control"
                          style={{ padding: "15px" }}
                          value={formData.friendly_name}
                          onChange={(e) =>
                            setFormData({ ...formData, friendly_name: e.target.value })
                          }
                          placeholder="Enter friendly name"
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Type</label>
                        <select
                          className="form-control"
                          style={{ padding: "15px", color: "#808080ff" }}
                          value={formData.type}
                          onChange={(e) =>
                            setFormData({ ...formData, type: e.target.value })
                          }
                        >
                          <option value="local">Local</option>
                          <option value="toll-free">Toll Free</option>
                        </select>
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
                            backgroundColor: "#2E6F6E"
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

export default ActiveNumbers;