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
    email: "",
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
      const res = await axios.get(`${API_BASE_URL}/api/user/clients`);
      setAgents(res.data);
      console.log(res.data)
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
      data.append("status", formData.status);
      data.append("password", formData.password)
      data.append("address", formData.address);
      if (formData.profile_img) data.append("profile_img", formData.profile_img);

      if (editMode) {
        await axios.put(`${API_BASE_URL}/api/user/${editId}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Agent updated successfully");
      } else {
        await axios.post(`${API_BASE_URL}/api/user`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Agent added successfully");
      }

      fetchAgents();
      setFormData({
        name: "",
        phone: "",
        email: "",
        status: "active",
        address: "",
        profile_img: null,
      });
      setShowModal(false);
      setEditMode(false);
      setEditId(null);
    } catch (error) {
      toast.error("Failed to save agent");
    }
  };

  const handleEdit = (agent) => {
    setFormData({
      name: agent.name,
      phone: agent.phone,
      email: agent.email,
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
        toast.success("Agent deleted successfully");
        fetchAgents();
      } catch (error) {
        toast.error("Failed to delete agent");
      }
    }
  };

  return (
    <>
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
                    <li className={`${styles.breadcrumbItem} ${styles.active}`}>Agents</li>
                  </ol>
                  <h1 className={styles.pageTitle}>Agents</h1>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      <SideBar />

      <div>
        <div className="page-wrapper">
          <div className="page-content container-fluid">
            <div className="d-flex justify-content-between align-items-center mb-3">
              {/* <h4>Agents</h4> */}
              <button className="btn btn-primary" style={{ alignItems: "left", padding: "15px 20px", fontSize: "16px", backgroundColor: "#2E6F6E" }}
              onClick={() => setShowModal(true)}>
                New Agent
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
                                ? `http://localhost:3000${agent.profile_img.replace(/\\/g, "/")}`
                                : "/assets/images/users/avatar-1.jpg"
                            }
                            alt="Avatar"
                            className="rounded-circle me-2"
                            style={{ width: "30px", height: "30px" }}
                          />
                          {agent.name}
                        </td>
                        <td>{agent.email}</td>
                        <td>{agent.phone}</td>
                        <td className={agent.status === "active" ? "text-success" : "text-danger"}>{agent.status}</td>
                        <td>
                          <button className="btn btn-sm btn-primary me-1" onClick={() => handleEdit(agent)}>
                            Edit
                          </button>
                          <button className="btn btn-sm btn-danger" onClick={() => handleDelete(agent.id)}>
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
                <div className="slide-in-modal" style={{ width: "700px"}}>
                  <div className="p-4">
                    <div className="d-flex justify-content-between align-items-center mb-3" >
                      <h5 className="mb-0" style={{ fontSize: "18px", fontWeight: "bold" }}> 
                        {editMode ? "Edit User" : "New Agent"}
                      </h5>
                      <button
                        className="btn-close" style={{ fontSize: "24px" }}
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
                        className="profile-upload-label" style={{ cursor: "pointer", padding: "10px 20px", backgroundColor: "#2E6F6E", color: "#fff", borderRadius: "5px" }}
                      >
                        {formData.profile_img ? "Change Photo" : "Upload Photo"}
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
                        className="form-control" style={{ padding: "15px" }}
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Phone</label>
                      <input
                        type="text"
                        className="form-control" style={{ padding: "15px" }}
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control" style={{ padding: "15px" }}
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control" style={{ padding: "15px" }}
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Address</label>
                      <input
                        type="text"
                        className="form-control" style={{ padding: "15px" }}
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value })
                        }
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Status</label>
                      <select
                        className="form-control" style={{ padding: "15px", color: "#808080ff" }}
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
                        className="btn btn-outline-secondary" style={{ padding: "10px 20px", fontSize: "16px" }}
                        onClick={() => {
                          setShowModal(false);
                          setEditId(null);
                          resetForm();
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        className="btn btn-primary" style={{ padding: "10px 20px", fontSize: "16px", backgroundColor: "#2E6F6E" }}
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
    </>
  );

}

export default Agents;
