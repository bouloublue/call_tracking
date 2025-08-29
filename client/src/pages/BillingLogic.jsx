import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import styles from "../pages/Home.module.css";
import Swal from "sweetalert2";
import axiosInstance from "../utils/axiosInstance"
const API_BASE_URL = import.meta.env.VITE_API_URL;

function BillingLogic() {
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newRule, setNewRule] = useState({
    min_duration_sec: 90,
    rate_per_min: 0.06,
    allow_override: true,
  });

  useEffect(() => {
    fetchCampaigns();
  }, []);

  useEffect(() => {
    if (selectedCampaign) {
      fetchBillingRules(selectedCampaign);
    }
  }, [selectedCampaign]);

  const fetchCampaigns = async () => {
    try {
      const res = await axiosInstance.get(`${API_BASE_URL}/api/campaign`);
      setCampaigns(res.data.filter((c) => c.routing_method === "smart"));
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    }
  };

  const fetchBillingRules = async (campaignId) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(
        `${API_BASE_URL}/api/billing/rules?campaign_id=${campaignId}`
      );
      const rules = res.data.map((rule) => ({
        ...rule,
        rate_per_min: parseFloat(rule.rate_per_min),
      }));
      setRules(rules);
    } catch (error) {
      console.error("Error fetching billing rules:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRule = async () => {
    if (!selectedCampaign) return;

    try {
      await axiosInstance.post(`${API_BASE_URL}/api/billing/rules`, {
        ...newRule,
        campaign_id: selectedCampaign,
      });
      fetchBillingRules(selectedCampaign);
      toast.success("Billing rule created for the campaign")
      setNewRule({
        min_duration_sec: 90,
        rate_per_min: 0.06,
        allow_override: true,
      });
    } catch (error) {
      console.error("Error creating billing rule:", error);
    }
  };

  const handleDeleteRule = async (ruleId) => {
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
      await axiosInstance.delete(`${API_BASE_URL}/api/billing/rules/${ruleId}`);
      toast.success("Billing rule deleted successfully");
      fetchBillingRules(selectedCampaign);
    } catch (error) {
      console.error("Error deleting billing rule:", error);
      toast.error("Failed to delete billing rule");
    }
  };

  return (
    <div className={styles.homePageContainer}>
      {/* Page Title Section */}
      <div className={styles.pageTitleBox}>
        <div className={styles.pageTitleContainer}>
          <div className={`${styles.row} ${styles.gap0}`}>
            <div className={styles.col12}>
              <div
                className={`${styles.pageTitleContent} ${styles.dSmFlex} ${styles.justifyContentSmBetween} ${styles.alignItemsCenter}`}
              >
                {/* Left Section */}
                <div>
                  <ol className={styles.breadcrumb}>
                    <li className={styles.breadcrumbItem}>
                      <a href="/">Call Tracking</a>
                    </li>
                    <li className={`${styles.breadcrumbItem} ${styles.active}`}>
                      Billing Logic
                    </li>
                  </ol>
                  <h1 className={styles.pageTitle}>Billing Rules</h1>
                </div>

                {/* Right Section */}
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

                  <span className={styles.dateRange}>
                    Jun 16, 2025 - Jul 10, 2025
                  </span>
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

      {/* Main Content Section */}
      <div className="page-wrapper" style={{ padding: "20px" }}>
        <div
          style={{
            backgroundColor: "#ffffff",
            width: "100%",
            maxWidth: "1200px",
            marginLeft: "40px",
            padding: "24px",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
            border: "1px solid #e2e8f0",
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
            <div>
              <h2 style={{ margin: 0, fontSize: "20px", color: "#1e293b" }}>
                Billing Rules Management
              </h2>
              <p
                style={{
                  color: "#64748b",
                  fontSize: "14px",
                  marginTop: "4px",
                }}
              >
                Configure pricing rules for smart routing campaigns
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span
                style={{
                  backgroundColor: "#eff6ff",
                  color: "#0D9488",
                  fontSize: "13px",
                  padding: "4px 10px",
                  borderRadius: "999px",
                }}
              >
                {campaigns.length} campaigns
              </span>
            </div>
          </div>

          <div style={{ display: "flex", gap: "24px" }}>
            {/* Left Column - Campaign Selection and Rule Creation */}
            <div style={{ flex: 1, minWidth: "350px" }}>
              <div
                style={{
                  backgroundColor: "#f8fafc",
                  padding: "20px",
                  borderRadius: "8px",
                  marginBottom: "20px",
                  border: "1px solid #e2e8f0",
                }}
              >
                <h3
                  style={{
                    fontSize: "16px",
                    color: "#1e293b",
                    marginBottom: "16px",
                  }}
                >
                  Select Campaign
                </h3>
                <select
                  className="form-select"
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: "6px",
                    border: "1px solid #e2e8f0",
                    fontSize: "14px",
                    backgroundColor: "#ffffff",
                    // Remove default focus outline
                    outline: "none",
                    // Custom hover effect
                    ":hover": {
                      backgroundColor: "#f8fafc",
                      borderColor: "#cbd5e1"
                    },
                    // Custom focus effect
                    ":focus": {
                      borderColor: "#94a3b8",
                      boxShadow: "0 0 0 1px #e2e8f0"
                    }
                  }}
                  value={selectedCampaign || ""}
                  onChange={(e) => setSelectedCampaign(e.target.value)}
                >
                  <option value="">Select a campaign...</option>
                  {campaigns.map((campaign) => (
                    <option
                      key={campaign.id}
                      value={campaign.id}
                      style={{
                        // Gray background on option hover
                        ":hover": {
                          backgroundColor: "#f1f5f9"
                        }
                      }}
                    >
                      {campaign.name}
                    </option>
                  ))}
                </select>
              </div>

              {selectedCampaign && (
                <div
                  style={{
                    backgroundColor: "#f8fafc",
                    padding: "20px",
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "16px",
                      color: "#1e293b",
                      marginBottom: "16px",
                    }}
                  >
                    Create New Rule
                  </h3>
                  <div style={{ marginBottom: "16px" }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "14px",
                        color: "#475569",
                        marginBottom: "8px",
                      }}
                    >
                      Minimum Duration (seconds)
                    </label>
                    <input
                      type="number"
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        borderRadius: "6px",
                        border: "1px solid #e2e8f0",
                        fontSize: "14px",
                        backgroundColor: "#ffffff",
                      }}
                      value={newRule.min_duration_sec}
                      onChange={(e) =>
                        setNewRule({
                          ...newRule,
                          min_duration_sec: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div style={{ marginBottom: "16px" }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "14px",
                        color: "#475569",
                        marginBottom: "8px",
                      }}
                    >
                      Rate per minute ($)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        borderRadius: "6px",
                        border: "1px solid #e2e8f0",
                        fontSize: "14px",
                        backgroundColor: "#ffffff",
                      }}
                      value={newRule.rate_per_min}
                      onChange={(e) =>
                        setNewRule({
                          ...newRule,
                          rate_per_min: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <input
                      type="checkbox"
                      style={{
                        width: "18px",
                        height: "18px",
                        marginRight: "8px",
                        cursor: "pointer",
                        accentColor: "#0D9488", // This changes the checkbox color
                      }}
                      checked={newRule.allow_override}
                      onChange={(e) =>
                        setNewRule({
                          ...newRule,
                          allow_override: e.target.checked,
                        })
                      }
                    />
                    <label
                      style={{
                        fontSize: "14px",
                        color: "#475569",
                      }}
                    >
                      Allow Rate Override
                    </label>
                  </div>

                  <button
                    style={{
                      width: "100%",
                      padding: "10px",
                      backgroundColor: "#0D9488",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      fontSize: "14px",
                      fontWeight: "500",
                      cursor: "pointer",
                    }}
                    onClick={handleCreateRule}
                  >
                    Create Rule
                  </button>
                </div>
              )}
            </div>

            {/* Right Column - Rules List */}
            <div style={{ flex: 2 }}>
              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "16px 20px",
                    backgroundColor: "#f8fafc",
                    borderBottom: "1px solid #e2e8f0",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "16px",
                      color: "#1e293b",
                      margin: 0,
                    }}
                  >
                    Active Billing Rules
                  </h3>
                  <span
                    style={{
                      backgroundColor: "#eff6ff",
                      color: "#0D9488",
                      fontSize: "13px",
                      padding: "4px 10px",
                      borderRadius: "999px",
                    }}
                  >
                    {rules.length} {rules.length === 1 ? "rule" : "rules"}
                  </span>
                </div>

                {loading ? (
                  <div
                    style={{
                      padding: "40px",
                      textAlign: "center",
                      color: "#64748b",
                    }}
                  >
                    Loading rules...
                  </div>
                ) : rules.length === 0 ? (
                  <div
                    style={{
                      padding: "40px",
                      textAlign: "center",
                      color: "#64748b",
                    }}
                  >
                    No billing rules found for selected campaign
                  </div>
                ) : (
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                    }}
                  >
                    <thead>
                      <tr
                        style={{
                          backgroundColor: "#f8fafc",
                          borderBottom: "1px solid #e2e8f0",
                        }}
                      >
                        <th
                          style={{
                            padding: "12px 16px",
                            textAlign: "left",
                            fontSize: "14px",
                            color: "#475569",
                            fontWeight: "500",
                          }}
                        >
                          Min Duration
                        </th>
                        <th
                          style={{
                            padding: "12px 16px",
                            textAlign: "left",
                            fontSize: "14px",
                            color: "#475569",
                            fontWeight: "500",
                          }}
                        >
                          Rate/Min
                        </th>
                        <th
                          style={{
                            padding: "12px 16px",
                            textAlign: "left",
                            fontSize: "14px",
                            color: "#475569",
                            fontWeight: "500",
                          }}
                        >
                          Override
                        </th>
                        <th
                          style={{
                            padding: "12px 16px",
                            textAlign: "left",
                            fontSize: "14px",
                            color: "#475569",
                            fontWeight: "500",
                          }}
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    {selectedCampaign && (
                      <tbody>
                        {rules.map((rule) => (
                          <tr
                            key={rule.id}
                            style={{
                              borderBottom: "1px solid #e2e8f0",
                              transition: "background-color 0.2s",
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.backgroundColor = "#f9fbfd")
                            }
                            onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor =
                              "transparent")
                            }
                          >
                            <td
                              style={{
                                padding: "12px 16px",
                                color: "#1e293b",
                              }}
                            >
                              {rule.min_duration_sec} sec
                            </td>
                            <td
                              style={{
                                padding: "12px 16px",
                                color: "#1e293b",
                                fontWeight: "500",
                              }}
                            >
                              ${rule.rate_per_min.toFixed(4)}
                            </td>
                            <td
                              style={{
                                padding: "12px 16px",
                                color: rule.allow_override
                                  ? "#10b981"
                                  : "#ef4444",
                              }}
                            >
                              {rule.allow_override ? "Allowed" : "Not Allowed"}
                            </td>
                            <td style={{ padding: "12px 16px", display: "flex", gap: "8px" }}>
                              {rule.allow_override ? (
                                <button
                                  style={{
                                    padding: "6px",
                                    backgroundColor: "transparent",
                                    border: "none",
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                  }}
                                  onClick={() => handleEditRule(rule.id)}
                                  aria-label="Edit"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#3b82f6"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                  </svg>
                                </button>
                              ) : null}

                              <button
                                style={{
                                  padding: "6px",
                                  backgroundColor: "transparent",
                                  border: "none",
                                  borderRadius: "6px",
                                  cursor: "pointer",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center"
                                }}
                                onClick={() => handleDeleteRule(rule.id)}
                                aria-label="Delete"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="#dc2626"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M3 6h18"></path>
                                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                  <line x1="10" y1="11" x2="10" y2="17"></line>
                                  <line x1="14" y1="11" x2="14" y2="17"></line>
                                </svg>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    )}
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BillingLogic;