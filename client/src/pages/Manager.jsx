import React, { useState, useEffect } from "react"
import SideBar from "../components/SideBar"
import NavBar from "../components/NavBar"

function Manager() {
   const [showModal, setShowModal] = useState(false);
     const [formData, setFormData] = useState({
    name: "",
    phone: "",
    role: "",
    email: "",
    password: "",
    status: "active",
    address: "",

  });

    const handleSubmit = async () => {
    // Here you would typically send the formData to your backend API
    console.log("Form submitted:", formData);
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
                <div className="">
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
      </div>
      <div className="page-wrapper">
        <div className="page-content">
          <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4>Users</h4>
              <button
                className="btn btn-primary"
                onClick={() => setShowModal(true)}
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
                 <tr>
                   <td>
                    <img
                      src="assets/images/users/avatar-2.jpg"
                      alt="Avatar"
                      className="rounded-circle me-2"
                      style={{ width: "30px", height: "30px" }}
                    />
                    John Doe
                   </td>
                   <td>john.doe@example.com</td>
                   <td>123-456-7890</td>
                   <td>Manager</td>
                   <td className="text-success">Active</td>
                   <td>
                    <button className="btn btn-sm btn-primary">Edit</button>
                    <button className="btn btn-sm btn-danger">Delete</button>
                   </td>
                 </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Modal */}
          {showModal && (
            <div className="modal d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">New Campaign</h5>
                    <button
                      className="btn-close"
                      onClick={() => setShowModal(false)}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <label className="form-label">Role</label>
                     <select
                      className="form-control mb-2"
                      name="role"
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
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control mb-2"
                      name="name"
                      placeholder="Enter Your Name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                    <label className="form-label">Phone</label>
                    <input
                      type="number"
                      className="form-control mb-2"
                      name="phone"
                      placeholder=" Enter your Phone number"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                    <label className="form-label">Email</label>
                     <input
                      type="email"
                      className="form-control mb-2"
                      name="email"
                      placeholder=" Enter your Email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control mb-2"
                      name="password"
                      placeholder=" Enter your Password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                    <label className="form-label">Address</label>
                    <input
                      type="text"
                      className="form-control mb-2"
                      name="address"
                      placeholder=" Enter your Address"
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                    />
                    <label className="form-label">Status</label>
                    <select
                      className="form-control mb-2"
                      name="status"
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({ ...formData, status: e.target.value })
                      }
                    >
                      <option value="active">active</option>
                      <option value="inactive">inactive</option>
                    </select>
                    
                  </div>
                  <div className="modal-footer">
                    <button
                      className="btn btn-secondary"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                    <button className="btn btn-primary" onClick={handleSubmit}>
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Manager