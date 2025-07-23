import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../pages/Home.module.css";
import axios from "axios";
import Select from "react-select";

const API_BASE_URL = import.meta.env.VITE_API_URL;

function Campaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [showSidePanel, setShowSidePanel] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingCampaignId, setEditingCampaignId] = useState(null);
  const [activeTab, setActiveTab] = useState("settings");

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
  }, []);

  const fetchCampaigns = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/campaign`);
      setCampaigns(res.data);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
      toast.error("Failed to fetch campaigns");
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

  const createCampaign = () => {
    if (!newCampaign.name) {
      toast.error("Please enter a campaign name");
      return;
    }

    const campaign = {
      id: Date.now().toString(),
      name: newCampaign.name,
      country: newCampaign.country,
    };

    setCampaigns([...campaigns, campaign]);
    toast.success("Campaign created successfully");
    setNewCampaign({ name: "", country: "US" });
    setShowSidePanel(false);
  };

  // const updateCampaign = async () => {
  //   const payload = {
  //     name: campaignDetails.name,
  //     number_id: campaignDetails.number,
  //     routing_method: campaignDetails.routingMethod,
  //     isCallRecordingEnabled: campaignDetails.recordCalls,
  //     is_active: true,
  //     buyers: campaignDetails.buyers,
  //   };

  //   try {
  //     await axios.put(
  //       `${API_BASE_URL}/api/campaign/${editingCampaignId}`,
  //       payload
  //     );
  //     toast.success("Campaign updated successfully");
  //     setEditMode(false);
  //     fetchCampaigns();
  //   } catch (error) {
  //     console.error("Error updating campaign:", error);
  //     toast.error("Failed to update campaign");
  //   }
  // };

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

  const deleteCampaign = (id) => {
    if (!window.confirm("Are you sure you want to delete this campaign?"))
      return;
    setCampaigns(campaigns.filter((c) => c.id !== id));
    toast.success("Campaign deleted successfully");
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

        <div className="page-wrapper">
          <div className="page-content container-fluid">
            {!editMode ? (
              <>
                <div className="d-flex justify-content-between align-items-center mb-3">
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
                        {campaigns.map((c) => (
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
                                        campaignData.routing_method || "manual",
                                      buyers: campaignData.buyer_mappings.map(
                                        (mapping) => mapping.buyer.name
                                      ),
                                      payoutOncePerCall:
                                        campaignData.payoutOncePerCall || false,
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
              <div className="card shadow-sm border-0">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 style={{ fontSize: "20px", fontWeight: "bold" }}>
                      Edit Campaign
                    </h4>
                    <button
                      className="btn btn-primary"
                      style={{
                        padding: "10px 24px",
                        backgroundColor: "#2E6F6E",
                        border: "none",
                        borderRadius: "6px",
                        fontWeight: "500",
                        fontSize: "14px",
                      }}
                      onClick={() => setEditMode(false)}
                    >
                      Back to Campaigns
                    </button>
                  </div>

                  {/* Tabs */}
                  <div className="d-flex border-bottom mb-4">
                    <button
                      className={`btn btn-link ${
                        activeTab === "settings" ? "text-dark" : "text-muted"
                      }`}
                      style={{
                        borderBottom:
                          activeTab === "settings"
                            ? "2px solid #2E6F6E"
                            : "none",
                        padding: "10px 15px",
                      }}
                      onClick={() => setActiveTab("settings")}
                    >
                      Campaign Settings
                    </button>
                    <button
                      className={`btn btn-link ${
                        activeTab === "performance" ? "text-dark" : "text-muted"
                      }`}
                      style={{
                        borderBottom:
                          activeTab === "performance"
                            ? "2px solid #2E6F6E"
                            : "none",
                        padding: "10px 15px",
                      }}
                      onClick={() => setActiveTab("performance")}
                    >
                      Performance Summary
                    </button>
                  </div>

                  {activeTab === "settings" ? (
                    <div>
                      {/* General Info Section */}
                      <div className="mb-5">
                        <div
                          className="d-flex align-items-center mb-3"
                          style={{
                            borderBottom: "1px solid #eee",
                            paddingBottom: "8px",
                          }}
                        >
                          <div
                            style={{
                              width: "4px",
                              height: "20px",
                              backgroundColor: "#2E6F6E",
                              marginRight: "12px",
                              borderRadius: "2px",
                            }}
                          ></div>
                          <h5
                            style={{
                              fontSize: "16px",
                              fontWeight: "600",
                              margin: 0,
                            }}
                          >
                            General Info
                          </h5>
                        </div>

                        <div className="row mb-3">
                          <div className="col-md-4">
                            <label
                              className="form-label"
                              style={{
                                fontSize: "14px",
                                color: "#6c757d",
                                fontWeight: "500",
                                display: "flex",
                                alignItems: "center",
                                height: "100%",
                              }}
                            >
                              Campaign ID
                            </label>
                          </div>
                          <div className="col-md-8">
                            <div
                              style={{
                                padding: "10px 12px",
                                backgroundColor: "#f8f9fa",
                                borderRadius: "6px",
                                fontSize: "14px",
                                border: "1px solid #e9ecef",
                              }}
                            >
                              {editingCampaignId || "N/A"}
                            </div>
                          </div>
                        </div>

                        <div className="row mb-3">
                          <div className="col-md-4">
                            <label
                              className="form-label"
                              style={{
                                fontSize: "14px",
                                color: "#6c757d",
                                fontWeight: "500",
                                display: "flex",
                                alignItems: "center",
                                height: "100%",
                              }}
                            >
                              Campaign Name
                            </label>
                          </div>
                          <div className="col-md-8">
                            <input
                              type="text"
                              className="form-control"
                              style={{
                                padding: "10px 12px",
                                fontSize: "14px",
                                borderRadius: "6px",
                                border: "1px solid #e9ecef",
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

                        <div className="row mb-3">
                          <div className="col-md-4">
                            <label className="form-label">Number</label>
                          </div>
                          <div className="col-md-8">
                            <select
                              className="form-select"
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
                        <div className="row mb-3">
                          <div className="col-md-4">
                            <label className="form-label">Buyers</label>
                          </div>
                          <div className="col-md-8">
                            <Select
                              isMulti
                              name="buyers"
                              options={buyerOptions}
                              value={buyerOptions.filter((option) =>
                                (campaignDetails.buyers || []).includes(
                                  option.value
                                )
                              )}
                              onChange={(selectedOptions) =>
                                setCampaignDetails({
                                  ...campaignDetails,
                                  buyers: selectedOptions.map(
                                    (opt) => opt.value
                                  ),
                                })
                              }
                              classNamePrefix="select"
                              placeholder="Select buyers"
                            />
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-4">
                            <label
                              className="form-label"
                              style={{
                                fontSize: "14px",
                                color: "#6c757d",
                                fontWeight: "500",
                                display: "flex",
                                alignItems: "center",
                                height: "100%",
                              }}
                            >
                              Routing Method
                            </label>
                          </div>
                          <div className="col-md-8">
                            <select
                              className="form-select"
                              style={{
                                padding: "10px 12px",
                                fontSize: "14px",
                                borderRadius: "6px",
                                border: "1px solid #e9ecef",
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
                      <div className="mb-5">
                        <div
                          className="d-flex align-items-center mb-3"
                          style={{
                            borderBottom: "1px solid #eee",
                            paddingBottom: "8px",
                          }}
                        >
                          <div
                            style={{
                              width: "4px",
                              height: "20px",
                              backgroundColor: "#2E6F6E",
                              marginRight: "12px",
                              borderRadius: "2px",
                            }}
                          ></div>
                          <h5
                            style={{
                              fontSize: "16px",
                              fontWeight: "600",
                              margin: 0,
                            }}
                          >
                            Call Settings
                          </h5>
                        </div>

                        <div className="row mb-3">
                          <div className="col-md-4">
                            <label
                              className="form-label"
                              style={{
                                fontSize: "14px",
                                color: "#6c757d",
                                fontWeight: "500",
                                display: "flex",
                                alignItems: "center",
                                height: "100%",
                              }}
                            >
                              Payout Once Per Call
                            </label>
                          </div>
                          <div className="col-md-8 d-flex align-items-center">
                            <div
                              onClick={() => toggleSetting("payoutOncePerCall")}
                              style={{
                                width: "40px",
                                height: "20px",
                                borderRadius: "10px",
                                backgroundColor:
                                  campaignDetails.payoutOncePerCall
                                    ? "#2E6F6E"
                                    : "#e9ecef",
                                position: "relative",
                                cursor: "pointer",
                                transition: "background-color 0.2s",
                              }}
                            >
                              <div
                                style={{
                                  width: "16px",
                                  height: "16px",
                                  borderRadius: "50%",
                                  backgroundColor: "#fff",
                                  position: "absolute",
                                  top: "2px",
                                  left: campaignDetails.payoutOncePerCall
                                    ? "22px"
                                    : "2px",
                                  transition: "left 0.2s",
                                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-4">
                            <label
                              className="form-label"
                              style={{
                                fontSize: "14px",
                                color: "#6c757d",
                                fontWeight: "500",
                                display: "flex",
                                alignItems: "center",
                                height: "100%",
                              }}
                            >
                              Record Calls
                            </label>
                          </div>
                          <div className="col-md-8 d-flex align-items-center">
                            <div
                              onClick={() => toggleSetting("recordCalls")}
                              style={{
                                width: "40px",
                                height: "20px",
                                borderRadius: "10px",
                                backgroundColor: campaignDetails.recordCalls
                                  ? "#2E6F6E"
                                  : "#e9ecef",
                                position: "relative",
                                cursor: "pointer",
                                transition: "background-color 0.2s",
                              }}
                            >
                              <div
                                style={{
                                  width: "16px",
                                  height: "16px",
                                  borderRadius: "50%",
                                  backgroundColor: "#fff",
                                  position: "absolute",
                                  top: "2px",
                                  left: campaignDetails.recordCalls
                                    ? "22px"
                                    : "2px",
                                  transition: "left 0.2s",
                                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Save Button */}
                      <div className="d-flex justify-content-end mt-4">
                        <button
                          className="btn btn-primary"
                          style={{
                            padding: "10px 24px",
                            backgroundColor: "#2E6F6E",
                            border: "none",
                            borderRadius: "6px",
                            fontWeight: "500",
                            fontSize: "14px",
                          }}
                          onClick={updateCampaign}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p style={{ color: "#6c757d" }}>
                        Performance summary will appear here
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
