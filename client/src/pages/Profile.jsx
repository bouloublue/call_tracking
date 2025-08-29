// import NavBar from "../components/NavBar"
// import SideBar from "../components/SideBar"
// import styles from "../pages/Home.module.css";

// function Profile() {
//     return (
//         <>
//             <div className={styles.pageTitleBox}>
//                 <div className={styles.pageTitleContainer}>
//                     <div className={`${styles.row} ${styles.gap0}`}>
//                         <div className={styles.col12}>
//                             <div className={`${styles.pageTitleContent} ${styles.dSmFlex} ${styles.justifyContentSmBetween} ${styles.alignItemsCenter}`}>
//                                 <div>
//                                     <ol className={styles.breadcrumb}>
//                                         <li className={styles.breadcrumbItem}>
//                                             <a href="/">Call Tracking</a>
//                                         </li>
//                                         <li className={`${styles.breadcrumbItem} ${styles.active}`}>Profile</li>
//                                     </ol>
//                                     <h1 className={styles.pageTitle}>Profile</h1>
//                                 </div>

//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <SideBar />
//             <div>
//                 <div className="page-wrapper">
//                     <div className="page-content">
//                         <div className="container-fluid">
//                             <div className="row justify-content-center">
//                                 <div className="col-md-4">
//                                     <div className="card">
//                                         <div className="card-body p-4  rounded text-center img-bg">
//                                         </div>
//                                         <div className="position-relative">
//                                             <div className="shape overflow-hidden text-card-bg">
//                                                 <svg viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                                     <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
//                                                 </svg>
//                                             </div>
//                                         </div>
//                                         <div className="card-body mt-n6">
//                                             <div className="row align-items-center">
//                                                 <div className="col">
//                                                     <div className="d-flex align-items-center">
//                                                         <div className="position-relative">
//                                                             <img src="assets/images/users/avatar-2.jpg" alt="" className="rounded-circle img-fluid" />
//                                                             <div className="position-absolute top-50 start-100 translate-middle">
//                                                                 <img src="assets/images/flags/us_flag.jpg" alt="" className="rounded-circle thumb-sm border border-3  border-white" />
//                                                             </div>
//                                                         </div>
//                                                         <div className="flex-grow-1 text-truncate ms-3 align-self-end">
//                                                             <h5 className="m-0 fs-3 fw-bold">Admin</h5>
//                                                             <p className="text-muted mb-0 mt-n1">@admin</p>
//                                                         </div>
//                                                         <div className="align-self-center">
//                                                             <span className="badge bg-success-subtle text-success border border-success px-2">Admin</span>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <div class="mt-3">
//                                                     <div class="text-body mb-2  d-flex align-items-center fs-13"><i class="las la-language fs-20 me-1 text-muted"></i><span class="text-body fw-semibold">Company :</span> Call Tracking</div>
//                                                     <div class="text-muted mb-2 d-flex align-items-center fs-13"><i class="las la-envelope fs-20 me-1"></i><span class="text-body fw-semibold">Email :</span><a href="#" class="text-primary text-decoration-underline">admin@example.com</a></div>
//                                                     <div class="text-body mb-3 d-flex align-items-center fs-13"><i class="las la-phone fs-20 me-1 text-muted"></i><span class="text-body fw-semibold">Phone :</span> +1 123 456 789</div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="col-lg-8">
//                                     <ul className="nav nav-tabs mb-3" role="tablist">
//                                         <li className="nav-item">
//                                             <a className="nav-link fw-medium active" data-bs-toggle="tab" href="#settings" role="tab" aria-selected="true">Settings</a>
//                                         </li>
//                                         <li className="nav-item">
//                                             <a className="nav-link fw-medium " data-bs-toggle="tab" href="#post" role="tab" aria-selected="false">Company Settings</a>
//                                         </li>
//                                     </ul>
//                                     <div className="tab-content">
//                                         <div className="tab-pane p-3 active" id="settings" role="tabpanel">
//                                             <div className="card">
//                                                 <div className="card-header">
//                                                     <div className="row align-items-center">
//                                                         <div className="col">
//                                                             <h4 className="card-title">Personal Information</h4>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <div className="card-body pt-0">
//                                                     <div className="form-group mb-3 row">
//                                                         <label className="col-xl-3 col-lg-3 text-end mb-lg-0 align-self-center form-label">Name</label>
//                                                         <div className="col-lg-9 col-xl-8">
//                                                             <input className="form-control" type="text" value="Admin" />
//                                                         </div>
//                                                     </div>
//                                                     <div className="form-group mb-3 row">
//                                                         <label className="col-xl-3 col-lg-3 text-end mb-lg-0 align-self-center form-label">Company Name</label>
//                                                         <div className="col-lg-9 col-xl-8">
//                                                             <input className="form-control" type="text" value="Call Tracking" />
//                                                         </div>
//                                                     </div>

//                                                     <div className="form-group mb-3 row">
//                                                         <label className="col-xl-3 col-lg-3 text-end mb-lg-0 align-self-center form-label">Contact Phone</label>
//                                                         <div className="col-lg-9 col-xl-8">
//                                                             <div className="input-group">
//                                                                 <span className="input-group-text"><i className="las la-phone"></i></span>
//                                                                 <input type="text" className="form-control" value="+123456789" placeholder="Phone" aria-describedby="basic-addon1" />
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                     <div className="form-group mb-3 row">
//                                                         <label className="col-xl-3 col-lg-3 text-end mb-lg-0 align-self-center form-label">Email Address</label>
//                                                         <div className="col-lg-9 col-xl-8">
//                                                             <div className="input-group">
//                                                                 <span className="input-group-text"><i className="las la-at"></i></span>
//                                                                 <input type="text" className="form-control" value="call.tracking@demo.com" placeholder="Email" aria-describedby="basic-addon1" />
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                     {/* <div className="form-group mb-3 row">
//                                                         <label className="col-xl-3 col-lg-3 text-end mb-lg-0 align-self-center form-label">Website Link</label>
//                                                         <div className="col-lg-9 col-xl-8">
//                                                             <div className="input-group">
//                                                                 <span className="input-group-text"><i className="la la-globe"></i></span>
//                                                                 <input type="text" className="form-control" value="" placeholder="Email" aria-describedby="basic-addon1" />
//                                                             </div>
//                                                         </div>
//                                                     </div> */}
//                                                     <div className="form-group mb-3 row">
//                                                         <label className="col-xl-3 col-lg-3 text-end mb-lg-0 align-self-center form-label">Location</label>
//                                                         <div className="col-lg-9 col-xl-8">
//                                                             <select className="form-select">
//                                                                 <option>USA</option>
//                                                                 <option>London</option>
//                                                                 <option>India</option>
//                                                                 <option>Canada</option>
//                                                                 <option>Thailand</option>
//                                                             </select>
//                                                         </div>
//                                                     </div>
//                                                     <div className="form-group row">
//                                                         <div className="col-lg-9 col-xl-8 offset-lg-3">
//                                                             <button type="submit" className="btn btn-primary" style={{ padding: "10px 20px", background: "#2E6F6E" }}>Update</button>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             <div className="card">
//                                                 <div className="card-header">
//                                                     <h4 className="card-title">Change Password</h4>
//                                                 </div>
//                                                 <div className="card-body pt-0">
//                                                     <div className="form-group mb-3 row">
//                                                         <label className="col-xl-3 col-lg-3 text-end mb-lg-0 align-self-center form-label">New Password</label>
//                                                         <div className="col-lg-9 col-xl-8">
//                                                             <input className="form-control" type="password" placeholder="New Password" />
//                                                         </div>
//                                                     </div>
//                                                     <div className="form-group mb-3 row">
//                                                         <label className="col-xl-3 col-lg-3 text-end mb-lg-0 align-self-center form-label">Confirm Password</label>
//                                                         <div className="col-lg-9 col-xl-8">
//                                                             <input className="form-control" type="password" placeholder="Re-Password" />
//                                                         </div>
//                                                     </div>
//                                                     <div className="form-group row">
//                                                         <div className="col-lg-9 col-xl-8 offset-lg-3">
//                                                             <button type="submit" className="btn btn-primary" style={{ padding: "10px 20px", background: "#2E6F6E" }}>Change Password</button>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Profile

import { useEffect, useState } from "react";
import styles from "../pages/Home.module.css";
import axiosInstance from "../utils/axiosInstance";
const API_BASE_URL = import.meta.env.VITE_API_URL;

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    address: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          `${API_BASE_URL}/api/user/profile`
        );
        setUser(response.data.user);
        setFormData({
          name: response.data.user.name,
          email: response.data.user.email,
          phone: response.data.user.phone,
          company: response.data.user.company,
          address: response.data.user.address,
        });
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await axiosInstance.put(`${API_BASE_URL}/api/user/profile`, formData);
      setUser((prev) => ({ ...prev, ...formData }));
      setEditMode(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !user)
    return (
      <div className={styles.homePageContainer}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
          }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );

  return (
    <div className={styles.homePageContainer}>
      {/* Modern Header */}
      <div className={styles.pageTitleBox}>
        <div className={styles.pageTitleContainer}>
          <div className={`${styles.row} ${styles.gap0}`}>
            <div className={styles.col12}>
              <div
                className={`${styles.pageTitleContent} ${styles.dSmFlex} ${styles.justifyContentSmBetween} ${styles.alignItemsCenter}`}
              >
                <div>
                  <h1 className={styles.pageTitle}>My Profile</h1>
                  <p className={styles.pageSubtitle}>
                    Manage your account information
                  </p>
                </div>
                {editMode ? (
                  <div>
                    <button
                      onClick={() => setEditMode(false)}
                      className="btn btn-outline-secondary me-2"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="btn btn-primary"
                      style={{
                      backgroundColor: "rgb(14, 135, 125)",
                      borderColor: "rgb(14, 135, 125)",
                    }} 
                      disabled={loading}
                    >
                      {loading ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setEditMode(true)}
                    className="btn btn-success"
                    style={{
                      backgroundColor: "rgb(14, 135, 125)",
                      borderColor: "rgb(14, 135, 125)",
                    }}
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Profile Layout */}
      <div className={styles.pageWrapper}>
        <div className={styles.pageContent}>
          <div className="container-fluid">
            <div className="row">
              {/* Left Profile Card */}
              <div className="col-md-4">
                <div
                  className="card"
                  style={{
                    border: "none",
                    borderRadius: "12px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "120px",
                      background:
                        "linear-gradient(135deg, #2E6F6E 0%, #0E877D 100%)",
                      position: "relative",
                    }}
                  >
                    {user?.profile_img ? (
                      <div
                        style={{
                          position: "absolute",
                          bottom: "-50px",
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: "100px",
                          height: "100px",
                          borderRadius: "50%",
                          background: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                          overflow: "hidden",
                        }}
                      >
                        <img
                          src={`${API_BASE_URL}${user.profile_img}`}
                          alt="Profile"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    ) : (
                      <div
                        style={{
                          position: "absolute",
                          bottom: "-50px",
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: "100px",
                          height: "100px",
                          borderRadius: "50%",
                          background: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                        }}
                      >
                        <div
                          style={{
                            width: "90px",
                            height: "90px",
                            borderRadius: "50%",
                            background: "#f0f2f5",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "36px",
                            fontWeight: "bold",
                            color: "#2E6F6E",
                          }}
                        >
                          {user?.name
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                      </div>
                    )}
                  </div>

                  <div
                    className="card-body"
                    style={{ marginTop: "60px", textAlign: "center" }}
                  >
                    <h3 style={{ marginBottom: "4px", fontWeight: "600" }}>
                      {editMode ? (
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="form-control text-center"
                          style={{
                            fontWeight: "600",
                            fontSize: "1.25rem",
                          }}
                        />
                      ) : (
                        user?.name
                      )}
                    </h3>
                    <p
                      style={{
                        color: "#64748b",
                        marginBottom: "16px",
                        fontSize: "14px",
                      }}
                    >
                      @{user?.role}
                    </p>

                    <span
                      style={{
                        display: "inline-block",
                        backgroundColor:
                          user?.status === "active" ? "#ECFDF5" : "#FEF2F2",
                        color:
                          user?.status === "active" ? "#0E877D" : "#DC2626",
                        padding: "4px 12px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: "500",
                        marginBottom: "24px",
                      }}
                    >
                      {user?.status}
                    </span>

                    <div
                      style={{
                        borderTop: "1px solid #f1f5f9",
                        paddingTop: "20px",
                        textAlign: "left",
                      }}
                    >
                      <div style={{ marginBottom: "16px" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "8px",
                          }}
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ marginRight: "8px" }}
                          >
                            <path
                              d="M3 5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5Z"
                              stroke="#64748b"
                              strokeWidth="2"
                            />
                            <path
                              d="M3 10H21"
                              stroke="#64748b"
                              strokeWidth="2"
                            />
                            <path
                              d="M10 3V10"
                              stroke="#64748b"
                              strokeWidth="2"
                            />
                          </svg>
                          <span style={{ color: "#64748b", fontSize: "14px" }}>
                            Company
                          </span>
                        </div>
                        {editMode ? (
                          <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            className="form-control"
                          />
                        ) : (
                          <p style={{ margin: 0, fontWeight: "500" }}>
                            {user?.company || "Not specified"}
                          </p>
                        )}
                      </div>

                      <div style={{ marginBottom: "16px" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "8px",
                          }}
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ marginRight: "8px" }}
                          >
                            <path
                              d="M22 16.92V19C22 20.1046 21.1046 21 20 21H4C2.89543 21 2 20.1046 2 19V16.92M22 16.92C21.9975 15.8587 21.6253 14.8343 20.9537 14.0256C20.2822 13.2168 19.3542 12.6726 18.34 12.49M22 16.92C21.9975 17.9813 21.6253 19.0057 20.9537 19.8144C20.2822 20.6232 19.3542 21.1674 18.34 21.35M2 16.92V7.85C2 6.74543 2.89543 5.85 4 5.85H20C21.1046 5.85 22 6.74543 22 7.85V16.92M2 16.92C2.00253 15.8587 2.37469 14.8343 3.04625 14.0256C3.71781 13.2168 4.64577 12.6726 5.66 12.49M2 16.92C2.00253 17.9813 2.37469 19.0057 3.04625 19.8144C3.71781 20.6232 4.64577 21.1674 5.66 21.35"
                              stroke="#64748b"
                              strokeWidth="2"
                            />
                          </svg>
                          <span style={{ color: "#64748b", fontSize: "14px" }}>
                            Email
                          </span>
                        </div>
                        {editMode ? (
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="form-control"
                          />
                        ) : (
                          <a
                            href={`mailto:${user?.email}`}
                            style={{
                              margin: 0,
                              fontWeight: "500",
                              color: "#2E6F6E",
                              textDecoration: "none",
                            }}
                          >
                            {user?.email}
                          </a>
                        )}
                      </div>

                      <div style={{ marginBottom: "16px" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "8px",
                          }}
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ marginRight: "8px" }}
                          >
                            <path
                              d="M5 4H9L11 9L8.5 10.5C9.57096 12.6715 11.3285 14.429 13.5 15.5L15 13L20 15V19C20 20.1046 19.1046 21 18 21C14.0993 21 10.4204 19.4205 7.65683 16.6569C4.89328 13.8933 3.3138 10.2144 3 6.00001C3 4.89544 3.89543 4 5 4Z"
                              stroke="#64748b"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span style={{ color: "#64748b", fontSize: "14px" }}>
                            Phone
                          </span>
                        </div>
                        {editMode ? (
                          <div className="input-group">
                            <select
                              className="form-select"
                              style={{ maxWidth: "100px" }}
                              value={user?.countryCode}
                              disabled
                            >
                              <option value={user?.countryCode}>
                                {user?.countryCode}
                              </option>
                            </select>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              className="form-control"
                            />
                          </div>
                        ) : (
                          <p style={{ margin: 0, fontWeight: "500" }}>
                            {user?.countryCode} {user?.phone}
                          </p>
                        )}
                      </div>

                      <div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "8px",
                          }}
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ marginRight: "8px" }}
                          >
                            <path
                              d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z"
                              stroke="#64748b"
                              strokeWidth="2"
                            />
                            <path
                              d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                              stroke="#64748b"
                              strokeWidth="2"
                            />
                          </svg>
                          <span style={{ color: "#64748b", fontSize: "14px" }}>
                            Location
                          </span>
                        </div>
                        {editMode ? (
                          <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            className="form-control"
                          />
                        ) : (
                          <p style={{ margin: 0, fontWeight: "500" }}>
                            {user?.address || "Not specified"}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Content Area */}
              <div className="col-md-8">
                <div
                  className="card"
                  style={{
                    border: "none",
                    borderRadius: "12px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                  }}
                >
                  <div
                    className="card-header"
                    style={{
                      borderBottom: "1px solid #f1f5f9",
                      background: "none",
                      padding: "20px 24px",
                    }}
                  >
                    <h4
                      style={{
                        margin: 0,
                        fontWeight: "600",
                        color: "#1e293b",
                      }}
                    >
                      Account Information
                    </h4>
                  </div>

                  <div className="card-body" style={{ padding: "24px" }}>
                    <div className="mb-4">
                      <h5
                        style={{
                          marginBottom: "16px",
                          fontWeight: "600",
                          color: "#1e293b",
                        }}
                      >
                        Verification Status
                      </h5>

                      <div
                        className="alert"
                        style={{
                          backgroundColor: user?.is_verified
                            ? "#ECFDF5"
                            : "#FFFBEB",
                          borderLeft: `4px solid ${
                            user?.is_verified ? "#0E877D" : "#D97706"
                          }`,
                          borderRadius: "6px",
                          padding: "16px",
                        }}
                      >
                        <div className="d-flex align-items-center">
                          {user?.is_verified ? (
                            <>
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                style={{ marginRight: "12px" }}
                              >
                                <path
                                  d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.86"
                                  stroke="#0E877D"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M22 4L12 14.01L9 11.01"
                                  stroke="#0E877D"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <div>
                                <h6 style={{ margin: 0, color: "#0E877D" }}>
                                  Verified Account
                                </h6>
                                <p
                                  style={{
                                    margin: 0,
                                    color: "#64748b",
                                    fontSize: "14px",
                                  }}
                                >
                                  Your account has been verified
                                </p>
                              </div>
                            </>
                          ) : (
                            <>
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                style={{ marginRight: "12px" }}
                              >
                                <path
                                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                  stroke="#D97706"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M12 8V12"
                                  stroke="#D97706"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M12 16H12.01"
                                  stroke="#D97706"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <div>
                                <h6 style={{ margin: 0, color: "#D97706" }}>
                                  Unverified Account
                                </h6>
                                <p
                                  style={{
                                    margin: 0,
                                    color: "#64748b",
                                    fontSize: "14px",
                                  }}
                                >
                                  Please verify your account to access all
                                  features
                                </p>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h5
                        style={{
                          marginBottom: "16px",
                          fontWeight: "600",
                          color: "#1e293b",
                        }}
                      >
                        Account Activity
                      </h5>

                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <div
                            className="card"
                            style={{
                              border: "1px solid #e2e8f0",
                              borderRadius: "8px",
                              padding: "16px",
                            }}
                          >
                            <h6
                              style={{
                                color: "#64748b",
                                fontSize: "14px",
                                marginBottom: "8px",
                              }}
                            >
                              Member Since
                            </h6>
                            <p
                              style={{
                                margin: 0,
                                fontWeight: "500",
                                fontSize: "16px",
                              }}
                            >
                              {new Date(user?.created_at).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="col-md-6 mb-3">
                          <div
                            className="card"
                            style={{
                              border: "1px solid #e2e8f0",
                              borderRadius: "8px",
                              padding: "16px",
                            }}
                          >
                            <h6
                              style={{
                                color: "#64748b",
                                fontSize: "14px",
                                marginBottom: "8px",
                              }}
                            >
                              Last Updated
                            </h6>
                            <p
                              style={{
                                margin: 0,
                                fontWeight: "500",
                                fontSize: "16px",
                              }}
                            >
                              {new Date(user?.updated_at).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
