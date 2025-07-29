import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "../pages/Home.module.css";
import "react-toastify/dist/ReactToastify.css";
import { HiBadgeCheck } from "react-icons/hi";
import { FaSpinner, FaCircleNotch, FaCog } from "react-icons/fa";
import { ImSpinner8, ImSpinner9 } from "react-icons/im";
import { RiLoader4Line, RiLoader5Line } from "react-icons/ri";
const API_BASE_URL = import.meta.env.VITE_API_URL;
import Swal from "sweetalert2";

function Agents() {
  const [showModal, setShowModal] = useState(false);
  const [agents, setAgents] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [verifying, setVerifying] = useState(false);
  const [loading, setLoading] = useState(true);
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

  const FullPageLoader = () => (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          border: "5px solid #f3f3f3",
          borderTop: "5px solid #2E6F6E",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          animation: "spin 1s linear infinite",
        }}
      ></div>
      <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
    </div>
  );

  const Loader = ({ type = "spinner", size = 24, color = "#2E6F6E" }) => {
    const styles = {
      container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      spinner: {
        animation: "spin 1s linear infinite",
      },
      pulse: {
        animation: "pulse 1.5s ease-in-out infinite",
      },
      bounce: {
        animation: "bounce 1.5s ease-in-out infinite",
      },
    };

    const loaderTypes = {
      spinner: (
        <FaSpinner style={{ ...styles.spinner, fontSize: size, color }} />
      ),
      notch: (
        <FaCircleNotch style={{ ...styles.spinner, fontSize: size, color }} />
      ),
      cog: <FaCog style={{ ...styles.spinner, fontSize: size, color }} />,
      spinner8: (
        <ImSpinner8 style={{ ...styles.spinner, fontSize: size, color }} />
      ),
      spinner9: (
        <ImSpinner9 style={{ ...styles.spinner, fontSize: size, color }} />
      ),
      loader4: (
        <RiLoader4Line style={{ ...styles.pulse, fontSize: size, color }} />
      ),
      loader5: (
        <RiLoader5Line style={{ ...styles.spinner, fontSize: size, color }} />
      ),
      dots: (
        <div style={{ display: "flex", gap: "6px" }}>
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              style={{
                width: size / 2,
                height: size / 2,
                backgroundColor: color,
                borderRadius: "50%",
                animation: `bounce 1.4s infinite ease-in-out ${i * 0.16}s`,
              }}
            />
          ))}
        </div>
      ),
      bar: (
        <div
          style={{
            width: size * 2,
            height: size / 3,
            position: "relative",
            backgroundColor: `${color}20`,
          }}
        >
          <div
            style={{
              position: "absolute",
              height: "100%",
              width: "20%",
              backgroundColor: color,
              animation: "loadingBar 2s infinite ease-in-out",
            }}
          />
        </div>
      ),
    };

    return (
      <div style={styles.container}>
        {loaderTypes[type] || loaderTypes.spinner}
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            @keyframes pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.5; }
            }
            @keyframes bounce {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-5px); }
            }
            @keyframes loadingBar {
              0% { left: 0%; width: 20%; }
              50% { left: 40%; width: 60%; }
              100% { left: 80%; width: 20%; }
            }
          `}
        </style>
      </div>
    );
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const sendOtp = async () => {
    const Phone = formData.phone;
    const countryCode = formData.countryCode;

    if (!Phone || !countryCode) {
      toast.error("Phone number and country code are required");
      return;
    }
    try {
      const res = await axios.post(`${API_BASE_URL}/api/user/send-otp`, {
        phone_number: `${countryCode}${Phone}`,
      });
      toast.success(res.data.message);
      setOtpSent(true);
      setCountdown(60);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        toast.error(err.response.data.error);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  const verifyOtp = async () => {
    setVerifying(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/api/user/verify-otp`, {
        phone_number: `${formData.countryCode}${formData.phone}`,
        otp: otp,
      });
      toast.success(res.data.message);
      setOtpVerified(true);
      setOtpSent(false);
    } catch (err) {
      toast.error("Invalid OTP. Please try again.");
    } finally {
      setVerifying(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchAgents();
    setRefreshing(false);
    toast.success("Buyers refreshed successfully");
  };

  const fetchAgents = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/api/user/buyers`);
      setAgents(res.data);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch agents");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill all required fields");
      return;
    }

    if (!otpVerified && !editMode) {
      toast.error("Please verify your phone number with OTP first");
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

      try {
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
      } catch (err) {
        if (err.response && err.response.data) {
          const errorMsg =
            err.response.data.message ||
            err.response.data.error ||
            "Server returned an error";
          toast.error(errorMsg);
        } else {
          toast.error("Something went wrong while saving the buyer");
        }
      } finally {
        setLoading(false);
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
      setOtpVerified(false);
    } catch (error) {
      toast.error("Failed to save buyer");
    }
  };

  const handleEdit = (agent) => {
    let fullPhone = agent.phone || "";
    let countryCode = "+91";
    let phoneNumber = "";

    if (fullPhone.startsWith("+")) {
      const match = fullPhone.match(/^(\+\d{1,1})(\d{6,15})$/);
      if (match) {
        countryCode = match[1];
        phoneNumber = match[2];
      } else {
        phoneNumber = fullPhone;
      }
    } else {
      phoneNumber = fullPhone;
    }

    setFormData({
      name: agent.name || "",
      email: agent.email || "",
      phone: phoneNumber,
      countryCode: countryCode,
      company: agent.company || "",
      status: agent.status || "active",
      address: agent.address || "",
      password: "",
      profile_img: agent.profile_img || null,
    });

    setEditId(agent.id);
    setEditMode(true);
    setShowModal(true);
    setOtpVerified(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`${API_BASE_URL}/api/user/${id}`);
      toast.success("Buyer deleted successfully");
      fetchAgents();
    } catch (error) {
      toast.error("Failed to delete buyer");
    }
  };

  return (
    <>
      <div className={styles.homePageContainer}>
        {loading && <FullPageLoader />}
        <div className={styles.pageTitleBox}>
          <div className={styles.pageTitleContainer}>
            <div className={`${styles.row} ${styles.gap0}`}>
              <div className={styles.col12}>
                <div
                  className={`${styles.pageTitleContent} ${styles.dSmFlex} ${styles.justifyContentSmBetween} ${styles.alignItemsCenter}`}
                >
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

                  <div
                    className={styles.dateFilter}
                    style={{ display: "flex", alignItems: "center" }}
                  >
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
                <div className="d-flex align-items-center gap-2">
                  <span className={styles.dateRange}>
                    Jun 16, 2025 - Jul 10, 2025
                  </span>

                  <button className={styles.filterBtn}>Filter</button>
                  <button
                    onClick={handleRefresh}
                    disabled={refreshing}
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "50%",
                      border: "none",
                      backgroundColor: "#f2f2f2",
                      marginLeft: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    {refreshing ? (
                      <Loader type="spinner8" size={18} color="#2E6F6E" />
                    ) : (
                      <img
                        src="/assets/images/icons/refresh.png"
                        alt="Refresh"
                        style={{ width: "18px", height: "18px" }}
                      />
                    )}
                  </button>
                </div>
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
                    setOtpVerified(false);
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
                        <th className="text-muted">Name</th>
                        <th className="text-muted">Email</th>
                        <th className="text-muted">Phone</th>
                        <th className="text-muted">Company</th>
                        <th className="text-muted">Status</th>
                        <th className="text-muted">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {agents.map((agent) => (
                        <tr key={agent.id}>
                          <td>{agent.name}</td>
                          <td>{agent.email}</td>
                          <td className="flex items-center gap-2 text-blue-600">
                            {agent.phone}
                            <HiBadgeCheck
                              style={{
                                color: "blue",
                                marginBottom: "4px",
                                marginLeft: "4px",
                                fontSize: "16px",
                              }}
                            />
                          </td>
                          <td>{agent.company || "N/A"}</td>
                          <td>
                            <span
                              className={`badge ${
                                agent.status === "active"
                                  ? "bg-success bg-opacity-10 text-success"
                                  : "bg-danger bg-opacity-10 text-danger"
                              } p-2`}
                              style={{ fontSize: "0.85rem" }}
                            >
                              {agent.status}
                            </span>
                          </td>
                          <td>
                            <button
                              className="btn btn-sm me-2 p-1"
                              onClick={() => handleEdit(agent)}
                              title="Edit"
                            >
                              <img
                                src="/assets/images/icons/edit.png"
                                alt="Edit"
                                width="16"
                              />
                            </button>
                            <button
                              className="btn btn-sm p-1"
                              onClick={() => handleDelete(agent.id)}
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

              {showModal && (
                <>
                  <div
                    className="modal-overlay"
                    onClick={() => {
                      setShowModal(false);
                      setEditId(null);
                      setOtpSent(false);
                    }}
                    style={{
                      position: "fixed",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: "rgba(0,0,0,0.5)",
                      zIndex: 1040,
                    }}
                  />

                  <div
                    className="slide-in-modal"
                    style={{
                      width: "700px",
                      position: "fixed",
                      top: 0,
                      right: 0,
                      height: "100vh",
                      backgroundColor: "#fff",
                      zIndex: 1050,
                      overflowY: "auto",
                      boxShadow: "-5px 0 15px rgba(0,0,0,0.1)",
                      animation: "slideIn 0.3s ease-out",
                    }}
                  >
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
                            setOtpSent(false);
                          }}
                        ></button>
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
                          {otpVerified && (
                            <span
                              style={{
                                color: "green",
                                marginLeft: "8px",
                                fontSize: "14px",
                                fontWeight: "normal",
                              }}
                            >
                              ✓ Verified
                            </span>
                          )}
                        </label>
                        <div
                          className="input-group"
                          style={{ alignItems: "center" }}
                        >
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
                            disabled={otpVerified}
                          >
                            <option value="+91">IN +91</option>
                            <option value="+1">US +1</option>
                            <option value="+44">GB +44</option>
                            <option value="+61">AU +61</option>
                          </select>

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
                            disabled={otpVerified}
                          />

                          {!otpVerified ? (
                            <button
                              className="btn btn-primary"
                              style={{
                                padding: "15px 10px",
                                background: "#2E6F6E",
                              }}
                              type="button"
                              onClick={sendOtp}
                              disabled={!formData.phone || countdown > 0}
                            >
                              {countdown > 0
                                ? `Resend in ${countdown}s`
                                : "Get OTP"}
                            </button>
                          ) : (
                            <button
                              className="btn btn-primary"
                              style={{
                                padding: "15px 10px",
                                background: "#2E6F6E",
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                              }}
                              type="button"
                              disabled
                            >
                              <span>Verified</span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                              >
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                              </svg>
                            </button>
                          )}
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
                            setOtpSent(false);
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
                          disabled={(!otpVerified && !editMode) || verifying}
                        >
                          {verifying ? (
                            <Loader type="dots" size={16} color="white" />
                          ) : editMode ? (
                            "Update"
                          ) : (
                            "Create"
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {otpSent && (
                <>
                  <div
                    style={{
                      position: "fixed",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: "rgba(0,0,0,0.5)",
                      zIndex: 1060,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "#fff",
                        borderRadius: "10px",
                        padding: "25px",
                        width: "400px",
                        boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
                        animation: "fadeIn 0.3s ease-out",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "20px",
                        }}
                      >
                        <h4 style={{ margin: 0 }}>Verify OTP</h4>
                        <button
                          onClick={() => setOtpSent(false)}
                          style={{
                            background: "none",
                            border: "none",
                            fontSize: "20px",
                            cursor: "pointer",
                          }}
                        >
                          ×
                        </button>
                      </div>
                      <p style={{ marginBottom: "20px" }}>
                        We've sent a 6-digit OTP to {formData.countryCode}{" "}
                        {formData.phone}
                      </p>
                      <div style={{ marginBottom: "20px" }}>
                        <input
                          type="text"
                          placeholder="Enter OTP"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          maxLength="6"
                          style={{
                            width: "100%",
                            padding: "12px",
                            borderRadius: "5px",
                            border: "1px solid #ddd",
                            fontSize: "16px",
                          }}
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span style={{ color: "#666" }}>
                          {countdown > 0 ? `Resend OTP in ${countdown}s` : ""}
                        </span>
                        {countdown === 0 && (
                          <button
                            onClick={sendOtp}
                            style={{
                              background: "none",
                              border: "none",
                              color: "#2E6F6E",
                              cursor: "pointer",
                            }}
                          >
                            Resend OTP
                          </button>
                        )}
                      </div>
                      <button
                        onClick={verifyOtp}
                        style={{
                          width: "100%",
                          padding: "12px",
                          backgroundColor: "#2E6F6E",
                          color: "white",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                          marginTop: "20px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px",
                        }}
                      >
                        {verifying ? (
                          <>
                            <Loader type="dots" size={16} color="white" />
                            Verifying...
                          </>
                        ) : (
                          "Verify"
                        )}
                      </button>
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
