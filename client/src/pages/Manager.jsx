import React, { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Manager() {
  const [showModal, setShowModal] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    role: "",
    email: "",
    password: "",
    status: "active",
    address: "",
    profile_img: null,
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/user");
      const filtered = res.data.filter((user) => user.role !== "client");
      setUsers(filtered);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:3000/api/user/${id}`);
        toast.success("User deleted successfully!");
        fetchUsers();
      } catch (error) {
        toast.error("Failed to delete user!");
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value && (key !== "profile_img" || value instanceof File)) {
          data.append(key, value);
        }
      });
      if (editingUserId) {
        await axios.put(
          `http://localhost:3000/api/user/${editingUserId}`,
          data,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        toast.success("User updated successfully!");
      } else {
        await axios.post("http://localhost:3000/api/user", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("User created successfully!");
      }

      setShowModal(false);
      setEditingUserId(null);
      resetForm();
      fetchUsers();
    } catch (error) {
      toast.error("Failed to save user!");
      console.error("Error submitting user:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      role: "",
      email: "",
      password: "",
      status: "active",
      address: "",
      profile_img: null,
    });
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
                  <li className="breadcrumb-item active">Manager</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="page-wrapper">
        <div className="page-content">
          <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4>Users</h4>
              <button
                className="btn btn-primary"
                onClick={() => {
                  resetForm();
                  setEditingUserId(null);
                  setShowModal(true);
                }}
              >
                New Manager
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
                      <th>Role</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>
                          <img
                            src={
                              user.profile_img
                                ? `http://localhost:3000${user.profile_img.replace(
                                    /\\/g,
                                    "/"
                                  )}`
                                : "/assets/images/users/avatar-2.jpg"
                            }
                            alt="Avatar"
                            className="rounded-circle me-2"
                            style={{ width: "30px", height: "30px" }}
                          />
                          {user.name}
                        </td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>{user.role}</td>
                        <td
                          className={
                            user.status === "active"
                              ? "text-success"
                              : "text-danger"
                          }
                        >
                          {user.status}
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-primary me-2"
                            onClick={() => {
                              setFormData({
                                name: user.name,
                                phone: user.phone,
                                role: user.role,
                                email: user.email,
                                password: "", // hide password
                                status: user.status,
                                address: user.address,
                                profile_img: user.profile_img,
                              });
                              setEditingUserId(user.id);
                              setShowModal(true);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(user.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                    {users.length === 0 && (
                      <tr>
                        <td colSpan="6" className="text-center">
                          No users found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {showModal && (
              <>
                {/* Overlay */}
                <div
                  className="modal-overlay"
                  onClick={() => {
                    setShowModal(false);
                    setEditingUserId(null);
                    resetForm();
                  }}
                />

                {/* Slide-in Modal */}
                <div className="slide-in-modal">
                  <div className="p-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="mb-0">
                        {editingUserId ? "Edit User" : "New Manager"}
                      </h5>
                      <button
                        className="btn-close"
                        onClick={() => {
                          setShowModal(false);
                          setEditingUserId(null);
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
                      <label className="form-label">Role</label>
                      <select
                        className="form-control"
                        value={formData.role}
                        onChange={(e) =>
                          setFormData({ ...formData, role: e.target.value })
                        }
                      >
                        <option value="">Select Role</option>
                        <option value="manager">Manager</option>
                        <option value="staff">Staff</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
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
                        className="form-control"
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
                        className="form-control"
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
                        className="form-control"
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
                        className="form-control"
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value })
                        }
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Status</label>
                      <select
                        className="form-control"
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
                        onClick={() => {
                          setShowModal(false);
                          setEditingUserId(null);
                          resetForm();
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={handleSubmit}
                      >
                        {editingUserId ? "Update" : "Create"}
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
  );
}

export default Manager;
