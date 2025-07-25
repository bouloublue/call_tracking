import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../pages/Home.module.css";
import axios from "axios";
import Select from "react-select";
import Swal from "sweetalert2";

const API_BASE_URL = import.meta.env.VITE_API_URL;

function Campaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [showSidePanel, setShowSidePanel] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingCampaignId, setEditingCampaignId] = useState(null);
  const [activeTab, setActiveTab] = useState("settings");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [allBuyers, setAllBuyers] = useState([]);
  const [availableNumbers, setAvailableNumbers] = useState([]);

  const buyerOptions = allBuyers.map((buyer) => ({
    value: buyer.name,
    label: buyer.name,
  }));

  const [newCampaign, setNewCampaign] = useState({
    name: "",
    country: "US",
  });

  const [campaignDetails, setCampaignDetails] = useState({
    name: "",
    number: "",
    routingMethod: "manual",
    buyers: [],
    payoutOncePerCall: false,
    recordCalls: false,
  });

  useEffect(() => {
    fetchCampaigns();
    fetchBuyers();
    fetchNumbers();
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      await Promise.all([fetchCampaigns(), fetchBuyers(), fetchNumbers()]);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
    toast.success("Data refreshed successfully");
  };

  const fetchCampaigns = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/campaign`);
      setCampaigns(response.data); // depends on your response shape
    } catch (error) {
      console.error("Failed to fetch campaigns:", error);
    }
  };

  const fetchCampaignDetails = async (id) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/campaign/${id}`);
      return res.data;
    } catch (error) {
      console.error("Error fetching campaign details:", error);
      toast.error("Failed to fetch campaign details");
      return null;
    }
  };

  const fetchBuyers = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/user/buyers`);
      setAllBuyers(res.data); // Expecting: [{ name: "Tesla" }, { name: "Aegiiz" }]
    } catch (error) {
      console.error("Error fetching buyers:", error);
      toast.error("Failed to fetch buyers");
    }
  };

  const fetchNumbers = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/number`);
      setAvailableNumbers(res.data); // Expecting: [{ id: "...", number: "7012345678" }]
    } catch (error) {
      console.error("Error fetching numbers:", error);
      toast.error("Failed to fetch numbers");
    }
  };

  const createCampaign = async () => {
    if (!newCampaign.name) {
      toast.error("Please enter a campaign name");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/api/campaign`, {
        name: newCampaign.name,
        country: newCampaign.country,
      });

      const createdCampaign = response.data.campaign;

      if (!createdCampaign || !createdCampaign.id) {
        toast.error("API did not return a valid campaign");
        return;
      }

      setCampaigns((prevCampaigns) => [...prevCampaigns, createdCampaign]);

      toast.success("Campaign created successfully");
      setNewCampaign({ name: "", country: "US" });
      setShowSidePanel(false);
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message || "Failed to create campaign"
      );
    }
  };

  const updateCampaign = async () => {
    const payload = {
      name: campaignDetails.name,
      country: campaignDetails.country,
      number_id: campaignDetails.number,
      routing_method: campaignDetails.routingMethod,
      isCallRecordingEnabled: campaignDetails.recordCalls,
      is_active: campaignDetails.is_active,
      buyers: campaignDetails.buyers,
    };

    try {
      await axios.put(
        `${API_BASE_URL}/api/campaign/${editingCampaignId}`,
        payload
      );
      toast.success("Campaign updated successfully");
      setEditMode(false);
      fetchCampaigns();
    } catch (error) {
      console.error("Error updating campaign:", error);
      toast.error("Failed to update campaign");
    }
  };

  const deleteCampaign = async (id) => {
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

    // Rest of your existing code
    try {
      await axios.delete(`${API_BASE_URL}/api/campaign/${id}`);
      setCampaigns(campaigns.filter((c) => c.id !== id));
      toast.success("Campaign deleted successfully");
    } catch (error) {
      console.error("Error deleting campaign:", error);
      toast.error("Failed to delete campaign");
    }
  };

  const toggleSetting = (field) => {
    setCampaignDetails((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  // ✨ No layout or design changed – from here render remains untouched
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
                        campaign
                      </li>
                    </ol>
                    <h1 className={styles.pageTitle}>Campaign </h1>
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="page-wrapper">
          <div className="page-content container-fluid">
            {!editMode ? (
              <>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  {/* Left side - Add Campaign button */}
                  <div className="d-flex align-items-center gap-2">
                    {/* Date Range */}
                    <span className={styles.dateRange}>
                      Jun 16, 2025 - Jul 10, 2025
                    </span>

                    {/* Filter Button */}
                    <button
                      className={styles.filterBtn}
                    >
                      Filter
                    </button>

                    {/* Refresh Button */}
                    <button
                      onClick={handleRefresh}
                      disabled={refreshing}
                      style={{
                        width: "38px",
                        height: "38px",
                        borderRadius: "50%",
                        border: "none",
                        backgroundColor: "#f2f2f2",
                        marginLeft: "10px", // Added space between filter and refresh
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                    >
                      {refreshing ? (
                        <div
                          className="spinner-border spinner-border-sm text-primary"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      ) : (
                        <img
                          src="/assets/images/icons/refresh.png"
                          alt="Refresh"
                          style={{ width: "18px", height: "18px" }}
                        />
                      )}
                    </button>
                  </div>

                  {/* Right side - Filter and Refresh buttons */}

                  <button
                    className="btn btn-primary"
                    style={{
                      padding: "12px 20px",
                      backgroundColor: "#2E6F6E",
                      border: "none",
                      borderRadius: "8px",
                    }}
                    onClick={() => setShowSidePanel(true)}
                  >
                    + Add Campaign
                  </button>
                </div>

                <div className="card shadow-sm border-0">
                  <div className="card-body p-4">
                    <table className="table table-hover align-middle mb-0">
                      <thead className="table-light">
                        <tr>
                          <th
                            style={{
                              fontSize: "14px",
                              fontWeight: 600,
                              color: "#aca9a9ff",
                            }}
                          >
                            CAMPAIGN
                          </th>
                          <th
                            style={{
                              fontSize: "14px",
                              fontWeight: 600,
                              color: "#aca9a9ff",
                            }}
                          >
                            COUNTRY
                          </th>
                          <th
                            style={{
                              fontSize: "14px",
                              fontWeight: 600,
                              color: "#aca9a9ff",
                            }}
                          >
                            ACTIONS
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {Array.isArray(campaigns) &&
                          campaigns.map((c) => (
                            <tr key={c.id}>
                              <td style={{ fontSize: "14px" }}>
                                <span>{c.name}</span>
                              </td>
                              <td style={{ fontSize: "14px" }}>{c.country}</td>
                              <td>
                                <button
                                  className="btn btn-sm me-2 p-1"
                                  onClick={async () => {
                                    try {
                                      const res = await axios.get(
                                        `${API_BASE_URL}/api/campaign/${c.id}`
                                      );

                                      const campaignData = res.data;

                                      setEditingCampaignId(campaignData.id);
                                      setCampaignDetails({
                                        name: campaignData.name,
                                        country: campaignData.country,
                                        number: campaignData.number_id || "",
                                        routingMethod:
                                          campaignData.routing_method ||
                                          "manual",
                                        buyers: campaignData.buyer_mappings.map(
                                          (mapping) => mapping.buyer.name
                                        ),
                                        payoutOncePerCall:
                                          campaignData.payoutOncePerCall ||
                                          false,
                                        recordCalls:
                                          campaignData.isCallRecordingEnabled ||
                                          false,
                                        is_active: campaignData.is_active,
                                      });
                                      setEditMode(true);
                                    } catch (error) {
                                      console.error(
                                        "Error fetching campaign details:",
                                        error
                                      );
                                      toast.error(
                                        "Failed to load campaign details"
                                      );
                                    }
                                  }}
                                >
                                  <img
                                    src="/assets/images/icons/edit.png"
                                    alt="Edit"
                                    width="16"
                                  />
                                </button>
                                <button
                                  className="btn btn-sm p-1"
                                  onClick={() => deleteCampaign(c.id)}
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
              </>
            ) : (
              // <div className="card shadow-sm border-0">
              //   <div className="card-body p-4">
              //     <div className="d-flex justify-content-between align-items-center mb-4">
              //       <h4 style={{ fontSize: "20px", fontWeight: "bold" }}>
              //         Edit Campaign
              //       </h4>
              //       <button
              //         className="btn btn-primary"
              //         style={{
              //           padding: "10px 24px",
              //           backgroundColor: "#2E6F6E",
              //           border: "none",
              //           borderRadius: "6px",
              //           fontWeight: "500",
              //           fontSize: "14px",
              //         }}
              //         onClick={() => setEditMode(false)}
              //       >
              //         Back to Campaigns
              //       </button>
              //     </div>

              //     {/* Tabs */}
              //     <div className="d-flex border-bottom mb-4">
              //       <button
              //         className={`btn btn-link ${activeTab === "settings" ? "text-dark" : "text-muted"
              //           }`}
              //         style={{
              //           borderBottom:
              //             activeTab === "settings"
              //               ? "2px solid #2E6F6E"
              //               : "none",
              //           padding: "10px 15px",
              //         }}
              //         onClick={() => setActiveTab("settings")}
              //       >
              //         Campaign Settings
              //       </button>
              //       <button
              //         className={`btn btn-link ${activeTab === "performance" ? "text-dark" : "text-muted"
              //           }`}
              //         style={{
              //           borderBottom:
              //             activeTab === "performance"
              //               ? "2px solid #2E6F6E"
              //               : "none",
              //           padding: "10px 15px",
              //         }}
              //         onClick={() => setActiveTab("performance")}
              //       >
              //         Performance Summary
              //       </button>
              //     </div>

              //     {activeTab === "settings" ? (
              //       <div>
              //         {/* General Info Section */}
              //         <div className="mb-5">
              //           <div
              //             className="d-flex align-items-center mb-3"
              //             style={{
              //               borderBottom: "1px solid #eee",
              //               paddingBottom: "8px",
              //             }}
              //           >
              //             <div
              //               style={{
              //                 width: "4px",
              //                 height: "20px",
              //                 backgroundColor: "#2E6F6E",
              //                 marginRight: "12px",
              //                 borderRadius: "2px",
              //               }}
              //             ></div>
              //             <h5
              //               style={{
              //                 fontSize: "16px",
              //                 fontWeight: "600",
              //                 margin: 0,
              //               }}
              //             >
              //               General Info
              //             </h5>
              //           </div>

              //           <div className="row mb-3">
              //             <div className="col-md-4">
              //               <label
              //                 className="form-label"
              //                 style={{
              //                   fontSize: "14px",
              //                   color: "#6c757d",
              //                   fontWeight: "500",
              //                   display: "flex",
              //                   alignItems: "center",
              //                   height: "100%",
              //                 }}
              //               >
              //                 Campaign ID
              //               </label>
              //             </div>
              //             <div className="col-md-8">
              //               <div
              //                 style={{
              //                   padding: "10px 12px",
              //                   backgroundColor: "#f8f9fa",
              //                   borderRadius: "6px",
              //                   fontSize: "14px",
              //                   border: "1px solid #e9ecef",
              //                 }}
              //               >
              //                 {editingCampaignId || "N/A"}
              //               </div>
              //             </div>
              //           </div>

              //           <div className="row mb-3">
              //             <div className="col-md-4">
              //               <label
              //                 className="form-label"
              //                 style={{
              //                   fontSize: "14px",
              //                   color: "#6c757d",
              //                   fontWeight: "500",
              //                   display: "flex",
              //                   alignItems: "center",
              //                   height: "100%",
              //                 }}
              //               >
              //                 Campaign Name
              //               </label>
              //             </div>
              //             <div className="col-md-8">
              //               <input
              //                 type="text"
              //                 className="form-control"
              //                 style={{
              //                   padding: "10px 12px",
              //                   fontSize: "14px",
              //                   borderRadius: "6px",
              //                   border: "1px solid #e9ecef",
              //                 }}
              //                 value={campaignDetails.name}
              //                 onChange={(e) =>
              //                   setCampaignDetails({
              //                     ...campaignDetails,
              //                     name: e.target.value,
              //                   })
              //                 }
              //               />
              //             </div>
              //           </div>

              //           <div className="row mb-3">
              //             <div className="col-md-4">
              //               <label className="form-label">Number</label>
              //             </div>
              //             <div className="col-md-8">
              //               <select
              //                 className="form-select"
              //                 value={campaignDetails.number}
              //                 onChange={(e) =>
              //                   setCampaignDetails({
              //                     ...campaignDetails,
              //                     number: e.target.value,
              //                   })
              //                 }
              //               >
              //                 <option value="">Select a number</option>
              //                 {availableNumbers.map((num) => (
              //                   <option key={num.id} value={num.id}>
              //                     {num.number}
              //                   </option>
              //                 ))}
              //               </select>
              //             </div>
              //           </div>

              //           {/* Add Buyers Multi-select */}
              //           <div className="row mb-3">
              //             <div className="col-md-4">
              //               <label className="form-label">Buyers</label>
              //             </div>
              //             <div className="col-md-8">
              //               <Select
              //                 isMulti
              //                 name="buyers"
              //                 options={buyerOptions}
              //                 value={buyerOptions.filter((option) =>
              //                   (campaignDetails.buyers || []).includes(
              //                     option.value
              //                   )
              //                 )}
              //                 onChange={(selectedOptions) =>
              //                   setCampaignDetails({
              //                     ...campaignDetails,
              //                     buyers: selectedOptions.map(
              //                       (opt) => opt.value
              //                     ),
              //                   })
              //                 }
              //                 classNamePrefix="select"
              //                 placeholder="Select buyers"
              //               />
              //             </div>
              //           </div>

              //           <div className="row">
              //             <div className="col-md-4">
              //               <label
              //                 className="form-label"
              //                 style={{
              //                   fontSize: "14px",
              //                   color: "#6c757d",
              //                   fontWeight: "500",
              //                   display: "flex",
              //                   alignItems: "center",
              //                   height: "100%",
              //                 }}
              //               >
              //                 Routing Method
              //               </label>
              //             </div>
              //             <div className="col-md-8">
              //               <select
              //                 className="form-select"
              //                 style={{
              //                   padding: "10px 12px",
              //                   fontSize: "14px",
              //                   borderRadius: "6px",
              //                   border: "1px solid #e9ecef",
              //                 }}
              //                 value={campaignDetails.routingMethod}
              //                 onChange={(e) =>
              //                   setCampaignDetails({
              //                     ...campaignDetails,
              //                     routingMethod: e.target.value,
              //                   })
              //                 }
              //               >
              //                 <option value="manual">Manual</option>
              //                 <option value="smart">Smart</option>
              //               </select>
              //             </div>
              //           </div>
              //         </div>

              //         {/* Call Settings Section */}
              //         <div className="mb-5">
              //           <div
              //             className="d-flex align-items-center mb-3"
              //             style={{
              //               borderBottom: "1px solid #eee",
              //               paddingBottom: "8px",
              //             }}
              //           >
              //             <div
              //               style={{
              //                 width: "4px",
              //                 height: "20px",
              //                 backgroundColor: "#2E6F6E",
              //                 marginRight: "12px",
              //                 borderRadius: "2px",
              //               }}
              //             ></div>
              //             <h5
              //               style={{
              //                 fontSize: "16px",
              //                 fontWeight: "600",
              //                 margin: 0,
              //               }}
              //             >
              //               Call Settings
              //             </h5>
              //           </div>

              //           <div className="row mb-3">
              //             <div className="col-md-4">
              //               <label
              //                 className="form-label"
              //                 style={{
              //                   fontSize: "14px",
              //                   color: "#6c757d",
              //                   fontWeight: "500",
              //                   display: "flex",
              //                   alignItems: "center",
              //                   height: "100%",
              //                 }}
              //               >
              //                 Payout Once Per Call
              //               </label>
              //             </div>
              //             <div className="col-md-8 d-flex align-items-center">
              //               <div
              //                 onClick={() => toggleSetting("payoutOncePerCall")}
              //                 style={{
              //                   width: "40px",
              //                   height: "20px",
              //                   borderRadius: "10px",
              //                   backgroundColor:
              //                     campaignDetails.payoutOncePerCall
              //                       ? "#2E6F6E"
              //                       : "#e9ecef",
              //                   position: "relative",
              //                   cursor: "pointer",
              //                   transition: "background-color 0.2s",
              //                 }}
              //               >
              //                 <div
              //                   style={{
              //                     width: "16px",
              //                     height: "16px",
              //                     borderRadius: "50%",
              //                     backgroundColor: "#fff",
              //                     position: "absolute",
              //                     top: "2px",
              //                     left: campaignDetails.payoutOncePerCall
              //                       ? "22px"
              //                       : "2px",
              //                     transition: "left 0.2s",
              //                     boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              //                   }}
              //                 ></div>
              //               </div>
              //             </div>
              //           </div>

              //           <div className="row">
              //             <div className="col-md-4">
              //               <label
              //                 className="form-label"
              //                 style={{
              //                   fontSize: "14px",
              //                   color: "#6c757d",
              //                   fontWeight: "500",
              //                   display: "flex",
              //                   alignItems: "center",
              //                   height: "100%",
              //                 }}
              //               >
              //                 Record Calls
              //               </label>
              //             </div>
              //             <div className="col-md-8 d-flex align-items-center">
              //               <div
              //                 onClick={() => toggleSetting("recordCalls")}
              //                 style={{
              //                   width: "40px",
              //                   height: "20px",
              //                   borderRadius: "10px",
              //                   backgroundColor: campaignDetails.recordCalls
              //                     ? "#2E6F6E"
              //                     : "#e9ecef",
              //                   position: "relative",
              //                   cursor: "pointer",
              //                   transition: "background-color 0.2s",
              //                 }}
              //               >
              //                 <div
              //                   style={{
              //                     width: "16px",
              //                     height: "16px",
              //                     borderRadius: "50%",
              //                     backgroundColor: "#fff",
              //                     position: "absolute",
              //                     top: "2px",
              //                     left: campaignDetails.recordCalls
              //                       ? "22px"
              //                       : "2px",
              //                     transition: "left 0.2s",
              //                     boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              //                   }}
              //                 ></div>
              //               </div>
              //             </div>
              //           </div>
              //         </div>

              //         {/* Save Button */}
              //         <div className="d-flex justify-content-end mt-4">
              //           <button
              //             className="btn btn-primary"
              //             style={{
              //               padding: "10px 24px",
              //               backgroundColor: "#2E6F6E",
              //               border: "none",
              //               borderRadius: "6px",
              //               fontWeight: "500",
              //               fontSize: "14px",
              //             }}
              //             onClick={updateCampaign}
              //           >
              //             Save
              //           </button>
              //         </div>
              //       </div>
              //     ) : (
              //       <div className="text-center py-4">
              //         <p style={{ color: "#6c757d" }}>
              //           Performance summary will appear here
              //         </p>
              //       </div>
              //     )}
              //   </div>
              // </div>

              <div className="card" style={{
                border: "none",
                borderRadius: "12px",
                boxShadow: "0 4px 20px rgba(46, 111, 110, 0.1)"
              }}>
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 style={{
                      fontSize: "20px",
                      fontWeight: "600",
                      color: "#2E6F6E"
                    }}>
                      Edit Campaign
                    </h4>
                    <button
                      className="btn"
                      style={{
                        padding: "10px 24px",
                        backgroundColor: "white",
                        color: "#2E6F6E",
                        border: "1px solid #2E6F6E",
                        borderRadius: "8px",
                        fontWeight: "500",
                        fontSize: "14px",
                        transition: "all 0.3s ease",
                        boxShadow: "0 2px 4px rgba(46, 111, 110, 0.1)"
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "#2E6F6E";
                        e.target.style.color = "white";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "white";
                        e.target.style.color = "#2E6F6E";
                      }}
                      onClick={() => setEditMode(false)}
                    >
                      Back to Campaigns
                    </button>
                  </div>

                  {/* Tabs */}
                  <div className="d-flex mb-4" style={{
                    borderBottom: "1px solid #e0e0e0"
                  }}>
                    <button
                      className={`btn btn-link ${activeTab === "settings" ? "active-tab" : ""}`}
                      style={{
                        padding: "12px 20px",
                        color: activeTab === "settings" ? "#2E6F6E" : "#6c757d",
                        fontWeight: "500",
                        fontSize: "14px",
                        textDecoration: "none",
                        position: "relative",
                        border: "none",
                        backgroundColor: "transparent",
                        marginRight: "8px"
                      }}
                      onClick={() => setActiveTab("settings")}
                    >
                      Campaign Settings
                      {activeTab === "settings" && (
                        <div style={{
                          position: "absolute",
                          bottom: "-1px",
                          left: 0,
                          right: 0,
                          height: "2px",
                          backgroundColor: "#2E6F6E",
                          borderRadius: "2px 2px 0 0"
                        }}></div>
                      )}
                    </button>
                    <button
                      className={`btn btn-link ${activeTab === "performance" ? "active-tab" : ""}`}
                      style={{
                        padding: "12px 20px",
                        color: activeTab === "performance" ? "#2E6F6E" : "#6c757d",
                        fontWeight: "500",
                        fontSize: "14px",
                        textDecoration: "none",
                        position: "relative",
                        border: "none",
                        backgroundColor: "transparent"
                      }}
                      onClick={() => setActiveTab("performance")}
                    >
                      Performance Summary
                      {activeTab === "performance" && (
                        <div style={{
                          position: "absolute",
                          bottom: "-1px",
                          left: 0,
                          right: 0,
                          height: "2px",
                          backgroundColor: "#2E6F6E",
                          borderRadius: "2px 2px 0 0"
                        }}></div>
                      )}
                    </button>
                  </div>

                  {activeTab === "settings" ? (
                    <div>
                      {/* General Info Section */}
                      <div className="mb-5" style={{
                        backgroundColor: "#f8fafb",
                        borderRadius: "10px",
                        padding: "20px",
                        border: "1px solid #e9f0f0"
                      }}>
                        <div className="d-flex align-items-center mb-4">
                          <div style={{
                            width: "4px",
                            height: "24px",
                            backgroundColor: "#2E6F6E",
                            marginRight: "12px",
                            // marginLeft:"20px",
                            borderRadius: "2px",
                          }}></div>
                          <h5 style={{
                            fontSize: "16px",
                            fontWeight: "600",
                            margin: 0,
                            color: "#2E6F6E"
                          }}>
                            General Info
                          </h5>
                        </div>

                        <div className="row mb-3" >
                          <div className="col-md-4">
                            <label className="form-label" style={{
                              fontSize: "16px",
                              color: "#5a6a73",
                              fontWeight: "500",
                              marginRight: "20px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-end",
                              height: "100%",
                              position: "relative"
                            }}>
                              Campaign ID
                              <span
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  width: "18px",
                                  height: "18px",
                                  borderRadius: "50%",
                                  backgroundColor: "#e0e6e6",
                                  color: "#2E6F6E",
                                  fontSize: "12px",
                                  fontWeight: "semibold",
                                  cursor: "pointer",
                                  transition: "all 0.2s ease",
                                  marginLeft: "6px"
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.nextSibling.style.opacity = "1";
                                  e.currentTarget.nextSibling.style.visibility = "visible";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.nextSibling.style.opacity = "0";
                                  e.currentTarget.nextSibling.style.visibility = "hidden";
                                }}
                              >
                                ?
                              </span>
                              <span style={{
                                visibility: "hidden",
                                opacity: 0,
                                width: "220px",
                                backgroundColor: "#2E6F6E",
                                color: "#fff",
                                textAlign: "center",
                                borderRadius: "6px",
                                padding: "10px",
                                position: "absolute",
                                zIndex: 10,
                                right: "0",
                                top: "100%",
                                marginTop: "8px",
                                transition: "all 0.2s ease",
                                fontSize: "12px",
                                lineHeight: "1.4",
                                boxShadow: "0 2px 12px rgba(0,0,0,0.15)"
                              }}>
                                Unique identifier for this campaign
                              </span>
                            </label>
                          </div>
                          <div className="col-md-8 d-flex align-items-center">
                            <div style={{
                              width: "50%",
                              padding: "12px 0",
                              fontSize: "14px",
                              border: "none",
                              color: "Gray",
                              backgroundColor: "transparent",
                              transition: "all 0.3s ease",
                              outline: "none",
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              position: "relative"
                            }}>
                              {editingCampaignId || "N/A"}
                              {editingCampaignId && (
                                <div style={{ position: "relative", display: "inline-flex" }}>
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    style={{
                                      cursor: "pointer",
                                      transition: "all 0.2s ease",
                                      color: "#5a6a73"
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.color = "#2E6F6E";
                                      e.currentTarget.nextSibling.style.opacity = "1";
                                      e.currentTarget.nextSibling.style.visibility = "visible";
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.color = "#5a6a73";
                                      e.currentTarget.nextSibling.style.opacity = "0";
                                      e.currentTarget.nextSibling.style.visibility = "hidden";
                                    }}
                                    onClick={async () => {
                                      try {
                                        await navigator.clipboard.writeText(editingCampaignId);
                                        // Show toast notification
                                        const toast = document.createElement('div');
                                        toast.style.position = 'fixed';
                                        toast.style.bottom = '20px';
                                        toast.style.right = '20px';
                                        toast.style.backgroundColor = '#2E6F6E';
                                        toast.style.color = 'white';
                                        toast.style.padding = '8px 16px';
                                        toast.style.borderRadius = '4px';
                                        toast.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                                        toast.style.zIndex = '1000';
                                        toast.style.transition = 'all 0.3s ease';
                                        toast.textContent = 'Copied to clipboard!';
                                        document.body.appendChild(toast);

                                        setTimeout(() => {
                                          toast.style.opacity = '0';
                                          setTimeout(() => {
                                            document.body.removeChild(toast);
                                          }, 300);
                                        }, 2000);
                                      } catch (err) {
                                        console.error('Failed to copy: ', err);
                                      }
                                    }}
                                  >
                                    <path
                                      d="M8 4V16C8 17.1046 8.89543 18 10 18H18C19.1046 18 20 17.1046 20 16V7.5C20 7.22386 19.7761 7 19.5 7H17C15.8954 7 15 6.10457 15 5V4C15 3.44772 14.5523 3 14 3H10C8.89543 3 8 3.89543 8 5V4Z"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                    />
                                    <path
                                      d="M4 8V18C4 19.1046 4.89543 20 6 20H14"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                    />
                                  </svg>
                                  <span style={{
                                    visibility: "hidden",
                                    opacity: 0,
                                    width: "120px",
                                    backgroundColor: "#2E6F6E",
                                    color: "#fff",
                                    textAlign: "center",
                                    borderRadius: "4px",
                                    padding: "4px 8px",
                                    position: "absolute",
                                    zIndex: 10,
                                    bottom: "100%",
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    marginBottom: "8px",
                                    transition: "all 0.2s ease",
                                    fontSize: "12px",
                                    pointerEvents: "none"
                                  }}>
                                    Copy to clipboard
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="row mb-3">
                          <div className="col-md-4">
                            <label className="form-label" style={{
                              fontSize: "14px",
                              color: "#5a6a73",
                              fontWeight: "500",
                              display: "flex",
                              alignItems: "center",
                              marginRight: "20px",
                              justifyContent: "flex-end",
                              height: "100%",
                              position: "relative",
                              whiteSpace: "nowrap"
                            }}>
                              Campaign Name
                              <span
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  width: "16px",
                                  height: "16px",
                                  borderRadius: "50%",
                                  backgroundColor: "#e0e6e6",
                                  color: "#2E6F6E",
                                  fontSize: "11px",
                                  fontWeight: "bold",
                                  cursor: "pointer",
                                  transition: "all 0.2s ease",
                                  marginLeft: "6px",
                                  flexShrink: 0
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.nextSibling.style.opacity = "1";
                                  e.currentTarget.nextSibling.style.visibility = "visible";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.nextSibling.style.opacity = "0";
                                  e.currentTarget.nextSibling.style.visibility = "hidden";
                                }}
                              >
                                ?
                              </span>
                              <span style={{
                                visibility: "hidden",
                                opacity: 0,
                                width: "220px",
                                backgroundColor: "#2E6F6E",
                                color: "#fff",
                                textAlign: "center",
                                borderRadius: "6px",
                                padding: "10px",
                                position: "absolute",
                                zIndex: 10,
                                right: "0",
                                top: "100%",
                                marginTop: "8px",
                                transition: "all 0.2s ease",
                                fontSize: "12px",
                                lineHeight: "1.4",
                                boxShadow: "0 2px 12px rgba(0,0,0,0.15)"
                              }}>
                                The name of your campaign
                              </span>
                            </label>
                          </div>
                          <div className="col-md-8">
                            <input
                              type="text"
                              className="form-control"
                              style={{
                                width: "50%",
                                padding: "12px 0",
                                fontSize: "14px",
                                border: "none",
                                borderBottom: "1px solid #9c9c9cff",
                                backgroundColor: "transparent",
                                transition: "all 0.3s ease",
                                outline: "none"
                              }}
                              value={campaignDetails.name}
                              onChange={(e) =>
                                setCampaignDetails({
                                  ...campaignDetails,
                                  name: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>


                        <div className="row mb-3 align-items-center">
                          <div className="col-md-4">
                            <label className="form-label" style={{
                              fontSize: "16px",
                              color: "#5a6a73",
                              fontWeight: "500",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-end",
                              height: "100%",
                              paddingRight: "20px",
                              position: "relative",
                              whiteSpace: "nowrap"
                            }}>
                              Number
                              <span
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  width: "18px",
                                  height: "18px",
                                  borderRadius: "50%",
                                  backgroundColor: "#e0e6e6",
                                  color: "#2E6F6E",
                                  fontSize: "12px",
                                  fontWeight: "bold",
                                  cursor: "pointer",
                                  transition: "all 0.2s ease",
                                  marginLeft: "8px",
                                  flexShrink: 0
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.nextSibling.style.opacity = "1";
                                  e.currentTarget.nextSibling.style.visibility = "visible";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.nextSibling.style.opacity = "0";
                                  e.currentTarget.nextSibling.style.visibility = "hidden";
                                }}
                              >
                                ?
                              </span>
                              <span style={{
                                visibility: "hidden",
                                opacity: 0,
                                width: "250px",
                                backgroundColor: "#2E6F6E",
                                color: "#fff",
                                textAlign: "center",
                                borderRadius: "6px",
                                padding: "10px",
                                position: "absolute",
                                zIndex: 10,
                                right: "0",
                                top: "100%",
                                marginTop: "8px",
                                transition: "all 0.2s ease",
                                fontSize: "12px",
                                lineHeight: "1.4",
                                boxShadow: "0 2px 12px rgba(0,0,0,0.15)"
                              }}>
                                Selected Number used for this campaign
                              </span>
                            </label>
                          </div>
                          <div className="col-md-8">
                            <select
                              className="form-select"
                              style={{
                                width: "50%",
                                padding: "12px 0",
                                fontSize: "14px",
                                border: "none",
                                borderBottom: "1px solid #9c9c9cff",
                                backgroundColor: "transparent",
                                transition: "all 0.3s ease",
                                outline: "none"
                              }}
                              value={campaignDetails.number}
                              onChange={(e) =>
                                setCampaignDetails({
                                  ...campaignDetails,
                                  number: e.target.value,
                                })
                              }
                            >
                              <option value="">Select a number</option>
                              {availableNumbers.map((num) => (
                                <option key={num.id} value={num.id}>
                                  {num.number}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* Add Buyers Multi-select */}
                        <div className="row mb-3 align-items-center">
                          <div className="col-md-4">
                            <label className="form-label" style={{
                              fontSize: "14px",
                              color: "#5a6a73",
                              fontWeight: "500",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-end",
                              height: "100%",
                              paddingRight: "20px",
                              position: "relative",
                              whiteSpace: "nowrap"
                            }}>
                              Buyers
                              <span
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  width: "16px",
                                  height: "16px",
                                  borderRadius: "50%",
                                  backgroundColor: "#e0e6e6",
                                  color: "#2E6F6E",
                                  fontSize: "11px",
                                  fontWeight: "bold",
                                  cursor: "pointer",
                                  transition: "all 0.2s ease",
                                  marginLeft: "6px",
                                  flexShrink: 0
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.nextSibling.style.opacity = "1";
                                  e.currentTarget.nextSibling.style.visibility = "visible";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.nextSibling.style.opacity = "0";
                                  e.currentTarget.nextSibling.style.visibility = "hidden";
                                }}
                              >
                                ?
                              </span>
                              <span style={{
                                visibility: "hidden",
                                opacity: 0,
                                width: "250px",
                                backgroundColor: "#2E6F6E",
                                color: "#fff",
                                textAlign: "center",
                                borderRadius: "6px",
                                padding: "10px",
                                position: "absolute",
                                zIndex: 10,
                                right: "0",
                                top: "100%",
                                marginTop: "8px",
                                transition: "all 0.2s ease",
                                fontSize: "12px",
                                lineHeight: "1.4",
                                boxShadow: "0 2px 12px rgba(0,0,0,0.15)"
                              }}>
                                Select which buyers should receive leads from this campaign
                              </span>
                            </label>
                          </div>
                          <div className="col-md-8">
                            <Select
                              isMulti
                              name="buyers"
                              options={buyerOptions}
                              value={buyerOptions.filter((option) =>
                                (campaignDetails.buyers || []).includes(option.value)
                              )}
                              onChange={(selectedOptions) =>
                                setCampaignDetails({
                                  ...campaignDetails,
                                  buyers: selectedOptions.map(opt => opt.value),
                                })
                              }
                              classNamePrefix="select"
                              placeholder="Select buyers"
                              styles={{
                                control: (base, state) => ({
                                  ...base,
                                  width: "50%",
                                  minHeight: "44px",
                                  fontSize: "14px",
                                  border: "none",
                                  borderBottom: "1px solid #9c9c9cff",
                                  backgroundColor: "transparent",
                                  transition: "all 0.3s ease",
                                  outline: "none",
                                  boxShadow: "none",
                                  "&:hover": {
                                    borderBottom: "1px solid #9c9c9cff"
                                  }
                                }),
                                menu: (base) => ({
                                  ...base,
                                  width: "50%",
                                  borderRadius: "8px",
                                  marginTop: "4px",
                                  border: "1px solid #d9e2e2",
                                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                                }),
                                valueContainer: (base) => ({
                                  ...base,
                                  padding: "0 8px"
                                }),
                                indicatorsContainer: (base) => ({
                                  ...base,
                                  padding: "0 8px"
                                })
                              }}
                            />
                          </div>
                        </div>

                        <div className="row align-items-center">
                          <div className="col-md-4">
                            <label className="form-label" style={{
                              fontSize: "14px",
                              color: "#5a6a73",
                              fontWeight: "500",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-end",
                              height: "100%",
                              paddingRight: "20px",
                              marginBottom: "0",
                              position: "relative",
                              whiteSpace: "nowrap"
                            }}>
                              Routing Method
                              <span
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  width: "16px",
                                  height: "16px",
                                  borderRadius: "50%",
                                  backgroundColor: "#e0e6e6",
                                  color: "#2E6F6E",
                                  fontSize: "11px",
                                  fontWeight: "bold",
                                  cursor: "pointer",
                                  transition: "all 0.2s ease",
                                  marginLeft: "6px",
                                  flexShrink: 0
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.nextSibling.style.opacity = "1";
                                  e.currentTarget.nextSibling.style.visibility = "visible";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.nextSibling.style.opacity = "0";
                                  e.currentTarget.nextSibling.style.visibility = "hidden";
                                }}
                              >
                                ?
                              </span>
                              <span style={{
                                visibility: "hidden",
                                opacity: 0,
                                width: "220px",
                                backgroundColor: "#2E6F6E",
                                color: "#fff",
                                textAlign: "left",
                                borderRadius: "6px",
                                padding: "10px",
                                position: "absolute",
                                zIndex: 10,
                                right: "20px",
                                top: "100%",
                                marginTop: "6px",
                                transition: "all 0.2s ease",
                                fontSize: "12px",
                                lineHeight: "1.5",
                                boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
                              }}>
                                <div style={{ fontWeight: "600", marginBottom: "4px" }}>Routing Options:</div>
                                <div style={{ marginBottom: "4px" }}>• <strong>Manual</strong>: Distribute leads manually</div>
                                <div>• <strong>Smart</strong>: Auto-route based on buyer performance</div>
                              </span>
                            </label>
                          </div>
                          <div className="col-md-8">
                            <select
                              className="form-select"
                              style={{
                                width: "50%",
                                padding: "12px 8px", // Added horizontal padding for better text alignment
                                fontSize: "14px",
                                border: "none",
                                borderBottom: "1px solid #9c9c9cff",
                                backgroundColor: "transparent",
                                transition: "all 0.3s ease",
                                outline: "none",
                                appearance: "none", // Remove default system appearance
                                backgroundImage: "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e\")",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "right 0 center",
                                backgroundSize: "1em"
                              }}
                              value={campaignDetails.routingMethod}
                              onChange={(e) =>
                                setCampaignDetails({
                                  ...campaignDetails,
                                  routingMethod: e.target.value,
                                })
                              }
                            >
                              <option value="manual">Manual</option>
                              <option value="smart">Smart</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Call Settings Section */}
                      <div className="mb-5" style={{
                        backgroundColor: "#f8fafb",
                        borderRadius: "10px",
                        padding: "20px",
                        border: "1px solid #e9f0f0"
                      }}>
                        <div className="d-flex align-items-center mb-4">
                          <div style={{
                            width: "4px",
                            height: "24px",
                            backgroundColor: "#2E6F6E",
                            marginRight: "12px",
                            borderRadius: "2px",
                          }}></div>
                          <h5 style={{
                            fontSize: "16px",
                            fontWeight: "600",
                            margin: 0,
                            color: "#2E6F6E"
                          }}>
                            Call Settings
                          </h5>
                        </div>

                        <div className="row mb-4 align-items-center">
                          <div className="col-md-4">
                            <div style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              height: "100%",
                              paddingRight: "20px",
                              textAlign: "right"
                            }}>
                              <label className="form-label" style={{
                                fontSize: "14px",
                                color: "#5a6a73",
                                fontWeight: "500",
                                marginBottom: "4px",
                                display: "inline-flex",
                                justifyContent: "end",
                                alignItems: "center",
                                gap: "6px",
                                position: "relative"
                              }}>
                                Payout Once Per Call
                                <span
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "16px",
                                    height: "16px",
                                    borderRadius: "50%",
                                    backgroundColor: "#e0e6e6",
                                    color: "#2E6F6E",
                                    fontSize: "12px",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                    transition: "all 0.2s ease"
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.nextSibling.style.opacity = "1";
                                    e.currentTarget.nextSibling.style.visibility = "visible";
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.nextSibling.style.opacity = "0";
                                    e.currentTarget.nextSibling.style.visibility = "hidden";
                                  }}
                                >
                                  ?
                                </span>
                                <span style={{
                                  visibility: "hidden",
                                  opacity: 0,
                                  width: "250px",
                                  backgroundColor: "#2E6F6E",
                                  color: "#fff",
                                  textAlign: "center",
                                  borderRadius: "6px",
                                  padding: "10px",
                                  position: "absolute",
                                  zIndex: 10,
                                  right: "0",
                                  top: "100%",
                                  marginTop: "8px",
                                  transition: "all 0.2s ease",
                                  fontSize: "12px",
                                  lineHeight: "1.4",
                                  boxShadow: "0 2px 12px rgba(0,0,0,0.15)"
                                }}>
                                  Enable to pay only once per unique call
                                </span>
                              </label>
                            </div>
                          </div>
                          <div className="col-md-8 d-flex align-items-center">
                            <div
                              onClick={() => toggleSetting("payoutOncePerCall")}
                              style={{
                                width: "44px",
                                height: "24px",
                                borderRadius: "12px",
                                backgroundColor: campaignDetails.payoutOncePerCall
                                  ? "#2E6F6E"
                                  : "#e0e6e6",
                                position: "relative",
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                                flexShrink: 0
                              }}
                            >
                              <div
                                style={{
                                  width: "20px",
                                  height: "20px",
                                  borderRadius: "50%",
                                  backgroundColor: "white",
                                  position: "absolute",
                                  top: "2px",
                                  left: campaignDetails.payoutOncePerCall
                                    ? "22px"
                                    : "2px",
                                  transition: "all 0.2s ease",
                                  boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                                }}
                              ></div>
                            </div>
                            <span style={{
                              marginLeft: "12px",
                              fontSize: "14px",
                              color: campaignDetails.payoutOncePerCall ? "#2E6F6E" : "#6c757d",
                              fontWeight: "500",
                              transition: "color 0.2s ease"
                            }}>
                              {campaignDetails.payoutOncePerCall ? "Enabled" : "Disabled"}
                            </span>
                          </div>
                        </div>

                        <div className="row align-items-center mb-4">
                          <div className="col-md-4">
                            <div style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-end",
                              paddingRight: "20px"
                            }}>
                              <label className="form-label" style={{
                                fontSize: "14px",
                                color: "#5a6a73",
                                fontWeight: "500",
                                marginBottom: "4px",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "6px",
                                position: "relative"
                              }}>
                                Record Calls
                                <span
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "16px",
                                    height: "16px",
                                    borderRadius: "50%",
                                    backgroundColor: "#e0e6e6",
                                    color: "#2E6F6E",
                                    fontSize: "12px",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                    transition: "all 0.2s ease"
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.nextSibling.style.opacity = "1";
                                    e.currentTarget.nextSibling.style.visibility = "visible";
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.nextSibling.style.opacity = "0";
                                    e.currentTarget.nextSibling.style.visibility = "hidden";
                                  }}
                                >
                                  ?
                                </span>
                                <span style={{
                                  visibility: "hidden",
                                  opacity: 0,
                                  width: "250px",
                                  backgroundColor: "#2E6F6E",
                                  color: "#fff",
                                  textAlign: "center",
                                  borderRadius: "6px",
                                  padding: "10px",
                                  position: "absolute",
                                  zIndex: 10,
                                  right: "0",
                                  top: "100%",
                                  marginTop: "8px",
                                  transition: "all 0.2s ease",
                                  fontSize: "12px",
                                  lineHeight: "1.4",
                                  boxShadow: "0 2px 12px rgba(0,0,0,0.15)"
                                }}>
                                  Enable to record all calls for this campaign
                                </span>
                              </label>
                            </div>
                          </div>
                          <div className="col-md-8 d-flex align-items-center">
                            <div
                              onClick={() => toggleSetting("recordCalls")}
                              style={{
                                width: "44px",
                                height: "24px",
                                borderRadius: "12px",
                                backgroundColor: campaignDetails.recordCalls ? "#2E6F6E" : "#e0e6e6",
                                position: "relative",
                                cursor: "pointer",
                                transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                                flexShrink: 0
                              }}
                              aria-label="Toggle call recording"
                            >
                              <div
                                style={{
                                  width: "20px",
                                  height: "20px",
                                  borderRadius: "50%",
                                  backgroundColor: "white",
                                  position: "absolute",
                                  top: "2px",
                                  left: campaignDetails.recordCalls ? "22px" : "2px",
                                  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12)",
                                  transform: campaignDetails.recordCalls ? "translateX(0)" : "translateX(0)"
                                }}
                              />
                            </div>
                            <span style={{
                              marginLeft: "12px",
                              fontSize: "14px",
                              color: campaignDetails.recordCalls ? "#2E6F6E" : "#6c757d",
                              fontWeight: "500",
                              transition: "color 0.2s ease"
                            }}>
                              {campaignDetails.recordCalls ? "Enabled" : "Disabled"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Save Button */}
                      <div className="d-flex justify-content-end mt-4">
                        <button
                          className="btn"
                          style={{
                            padding: "12px 28px",
                            backgroundColor: "#2E6F6E",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            fontWeight: "500",
                            fontSize: "14px",
                            transition: "all 0.3s ease",
                            boxShadow: "0 2px 8px rgba(46, 111, 110, 0.3)"
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = "#25605f";
                            e.target.style.transform = "translateY(-1px)";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = "#2E6F6E";
                            e.target.style.transform = "translateY(0)";
                          }}
                          onClick={updateCampaign}
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-5" style={{
                      backgroundColor: "#f8fafb",
                      borderRadius: "10px",
                      border: "1px dashed #d9e2e2"
                    }}>
                      <div style={{
                        width: "80px",
                        height: "80px",
                        backgroundColor: "rgba(46, 111, 110, 0.1)",
                        borderRadius: "50%",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "16px"
                      }}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#2E6F6E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M9 10C10.1046 10 11 9.10457 11 8C11 6.89543 10.1046 6 9 6C7.89543 6 7 6.89543 7 8C7 9.10457 7.89543 10 9 10Z" stroke="#2E6F6E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M2.67004 18.95L7.60004 15.64C8.39004 15.11 9.53004 15.17 10.24 15.78L10.57 16.07C11.35 16.74 12.61 16.74 13.39 16.07L17.55 12.5C18.33 11.83 19.59 11.83 20.37 12.5L22 13.9" stroke="#2E6F6E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <h5 style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        color: "#2E6F6E",
                        marginBottom: "8px"
                      }}>
                        Performance Summary
                      </h5>
                      <p style={{
                        color: "#6c757d",
                        maxWidth: "400px",
                        margin: "0 auto",
                        fontSize: "14px"
                      }}>
                        Detailed performance metrics and analytics will appear here once the campaign is active.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Side Panel */}
            {showSidePanel && (
              <>
                <div
                  className="offcanvas-backdrop show"
                  onClick={() => setShowSidePanel(false)}
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

                <div
                  className="offcanvas-panel"
                  style={{
                    position: "fixed",
                    top: 0,
                    right: 0,
                    height: "100vh",
                    width: "400px",
                    backgroundColor: "#fff",
                    boxShadow: "-2px 0 10px rgba(0,0,0,0.1)",
                    zIndex: 1050,
                    padding: "20px",
                    overflowY: "auto",
                  }}
                >
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 style={{ fontSize: "20px", fontWeight: "bold" }}>
                      New Campaign
                    </h4>
                    <button
                      className="btn-close"
                      onClick={() => setShowSidePanel(false)}
                    ></button>
                  </div>

                  <div className="mb-4">
                    <label className="form-label">Campaign Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newCampaign.name}
                      onChange={(e) =>
                        setNewCampaign({ ...newCampaign, name: e.target.value })
                      }
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label">Country</label>
                    <select
                      className="form-select"
                      value={newCampaign.country}
                      onChange={(e) =>
                        setNewCampaign({
                          ...newCampaign,
                          country: e.target.value,
                        })
                      }
                    >
                      <option value="US">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="CA">Canada</option>
                      <option value="AU">Australia</option>
                    </select>
                  </div>

                  <div className="d-flex justify-content-end gap-2">
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => setShowSidePanel(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-primary"
                      style={{ backgroundColor: "#2E6F6E", border: "none" }}
                      onClick={createCampaign}
                    >
                      Add
                    </button>
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

export default Campaigns;
