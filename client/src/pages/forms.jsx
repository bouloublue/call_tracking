import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

function FormBuilder() {
  const [showModal, setShowModal] = useState(false);
  const [formName, setFormName] = useState("");
  const [status, setStatus] = useState("active");
  const [fields, setFields] = useState([{ name: "", type: "text" }]);
  const [formList, setFormList] = useState([]);
  const [editingFormId, setEditingFormId] = useState(null);

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/form");
      setFormList(res.data);
    } catch (err) {
      console.error("Failed to fetch forms", err);
    }
  };

  const handleEdit = (form) => {
    setFormName(form.name);
    setStatus(form.status);

    // Force fields to always be an array
    const safeFields = Array.isArray(form.fields)
      ? form.fields
      : [{ name: "", type: "text" }];

    setFields(safeFields);
    setEditingFormId(form.id);
    setShowModal(true);
  };

const handleDelete = async (formId) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this form?");
  if (!confirmDelete) return;

  try {
    await axios.delete(`http://localhost:3000/api/form/${formId}`);
    toast.success("Form deleted successfully!");
    fetchForms();
  } catch (error) {
    console.error("Error deleting form:", error);
    toast.error("Failed to delete form!");
  }
};


  const handleToggleStatus = async (formId) => {
    const form = formList.find((f) => f.id === formId);
    const updatedStatus = form.status === "active" ? "inactive" : "active";

    try {
      await axios.put(`http://localhost:3000/api/form/${formId}`, {
        status: updatedStatus,
      });
      toast.success("Form status updated!");
      fetchForms(); // refresh after toggle
    } catch (error) {
      console.error("Error updating form status:", error);
      toast.error("Failed to update form status!");
    }
  };

  const addField = () => {
    setFields([...fields, { name: "", type: "text" }]);
  };

  const removeField = (index) => {
    const updated = [...fields];
    updated.splice(index, 1);
    setFields(updated);
  };

  const handleFieldChange = (index, key, value) => {
    const updated = [...fields];
    updated[index][key] = value;
    setFields(updated);
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        name: formName,
        status,
        fields,
      };

      if (editingFormId) {
        await axios.put(
          `http://localhost:3000/api/form/${editingFormId}`,
          payload
        );
        toast.success("Form updated successfully!");
      } else {
        await axios.post("http://localhost:3000/api/form", payload);
        toast.success("Form created successfully!");
      }

      fetchForms(); // Refresh list after submit
      setShowModal(false);
      resetForm();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save form!");
    }
  };

  const resetForm = () => {
    setFormName("");
    setStatus("active");
    setFields([{ name: "", type: "text" }]);
    setEditingFormId(null);
  };

  return (
    <div>
      <NavBar />
      <SideBar />

      <div className="page-title-box">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="page-title-content d-flex justify-content-between align-items-center">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <a href="/dashboard">Dashboard</a>
                  </li>
                  <li className="breadcrumb-item active">Forms</li>
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
              <h4>Forms</h4>
              <button
                className="btn btn-primary"
                onClick={() => {
                  resetForm();
                  setShowModal(true);
                }}
              >
                + Add New Form
              </button>
            </div>

            {/* Table Component */}
            <div className="card">
              <div className="card-body">
                <table className="table align-middle">
                  <thead>
                    <tr>
                      <th>
                        <input type="checkbox" />
                      </th>
                      <th>Name</th>
                      <th>Form Fields</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formList.map((form) => (
                      <tr key={form.id}>
                        <td>
                          <input type="checkbox" />
                        </td>
                        <td>{form.name}</td>
                        <td>
                          <ul className="mb-0 ps-3">
                            {Array.isArray(form.fields) ? (
                              form.fields.map((field, index) => (
                                <li key={index}>{field.name}</li>
                              ))
                            ) : (
                              <li>Invalid field format</li>
                            )}
                          </ul>
                        </td>
                        <td>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={form.status === "active"}
                              onChange={() => handleToggleStatus(form.id)}
                            />
                          </div>
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-primary me-2"
                            onClick={() => handleEdit(form)}
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(form.id)}
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {formList.length === 0 && (
                      <tr>
                        <td colSpan="5" className="text-center">
                          No forms found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Modal */}
            {showModal && (
              <>
                <div
                  className="modal-overlay"
                  onClick={() => setShowModal(false)}
                ></div>

                <div className="slide-in-modal">
                  <div className="p-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="mb-0">
                        {editingFormId ? "Edit Form" : "Add New Form"}
                      </h5>
                      <button
                        className="btn-close"
                        onClick={() => setShowModal(false)}
                      ></button>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Form Name"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label d-block">Status</label>
                      <div className="btn-group">
                        <button
                          className={`btn ${
                            status === "active"
                              ? "btn-primary"
                              : "btn-outline-primary"
                          }`}
                          onClick={() => setStatus("active")}
                        >
                          Active
                        </button>
                        <button
                          className={`btn ${
                            status === "inactive"
                              ? "btn-primary"
                              : "btn-outline-primary"
                          }`}
                          onClick={() => setStatus("inactive")}
                        >
                          Inactive
                        </button>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Form Fields</label>
                      {Array.isArray(fields) ? (
                        fields.map((field, index) => (
                          <div
                            key={index}
                            className="d-flex align-items-center mb-2"
                          >
                            <input
                              type="text"
                              placeholder="Field Name"
                              className="form-control me-2"
                              value={field.name}
                              onChange={(e) =>
                                handleFieldChange(index, "name", e.target.value)
                              }
                            />
                            <select
                              className="form-select me-2"
                              value={field.type}
                              onChange={(e) =>
                                handleFieldChange(index, "type", e.target.value)
                              }
                            >
                              <option value="text">Text</option>
                              <option value="number">Number</option>
                              <option value="email">Email</option>
                              <option value="date">Date</option>
                            </select>
                            {fields.length > 1 && (
                              <button
                                className="btn btn-danger"
                                onClick={() => removeField(index)}
                              >
                                ×
                              </button>
                            )}
                          </div>
                        ))
                      ) : (
                        <p className="text-danger">Invalid fields data</p>
                      )}
                      <button className="btn btn-link" onClick={addField}>
                        + Add Form Field
                      </button>
                    </div>

                    <div className="d-flex justify-content-end gap-2 mt-4">
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => setShowModal(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={handleSubmit}
                      >
                        {editingFormId ? "Update" : "Create"}
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

export default FormBuilder;
