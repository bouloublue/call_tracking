import React, { useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";

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
    image: null,
  });

  const handleSubmit = () => {
    const imageUrl = formData.image
      ? URL.createObjectURL(formData.image)
      : editMode
      ? agents.find((a) => a.id === editId)?.avatar ||
        "assets/images/users/avatar-1.jpg"
      : "assets/images/users/avatar-1.jpg";

    const updatedAgent = {
      id: editMode ? editId : Date.now(),
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      status: formData.status,
      address: formData.address,
      avatar: formData.image
        ? imageUrl
        : agents.find((a) => a.id === editId)?.avatar || imageUrl,
    };

    if (editMode) {
      setAgents(
        agents.map((agent) => (agent.id === editId ? updatedAgent : agent))
      );
    } else {
      setAgents([...agents, updatedAgent]);
    }

    // Reset form
    setFormData({
      name: "",
      phone: "",
      email: "",
      status: "active",
      address: "",
      image: null,
    });
    setShowModal(false);
    setEditMode(false);
    setEditId(null);
  };

  const handleEdit = (agent) => {
    setFormData({
      name: agent.name,
      phone: agent.phone,
      email: agent.email,
      status: agent.status,
      address: agent.address,
      image: null, // image only changes if re-uploaded
    });
    setEditId(agent.id);
    setEditMode(true);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this agent?"
    );
    if (confirmDelete) {
      setAgents(agents.filter((agent) => agent.id !== id));
    }
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
                      <a href="/agents">Call Tracking</a>
                    </li>
                    <li className="breadcrumb-item active">Agents</li>
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
              <h4>Agents</h4>
              <button
                className="btn btn-primary"
                onClick={() => setShowModal(true)}
              >
                New Agents
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
                    {agents.map((agent, index) => (
                      <tr key={index}>
                        <td>
                          <img
                            src={agent.avatar}
                            alt="Avatar"
                            className="rounded-circle me-2"
                            style={{ width: "30px", height: "30px" }}
                          />
                          {agent.name}
                        </td>
                        <td>{agent.email}</td>
                        <td>{agent.phone}</td>
                        <td
                          className={
                            agent.status === "active"
                              ? "text-success"
                              : "text-danger"
                          }
                        >
                          {agent.status.charAt(0).toUpperCase() +
                            agent.status.slice(1)}
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-primary"
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
              <div
                className="modal d-block"
                style={{ background: "rgba(0,0,0,0.5)" }}
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">
                        {editMode ? "Edit Agent" : "New Agent"}
                      </h5>
                      <button
                        className="btn-close"
                        onClick={() => setShowModal(false)}
                      ></button>
                    </div>
                    <div className="modal-body">
                      <label className="form-label">Profile Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        className="form-control mb-2"
                        onChange={(e) =>
                          setFormData({ ...formData, image: e.target.files[0] })
                        }
                      />

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
                      <button
                        className="btn btn-primary"
                        onClick={handleSubmit}
                      >
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
  );
}

export default Agents;
