import { useState, useEffect } from "react";
import styles from "../pages/Home.module.css";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

function BillingLogic() {
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [rules, setRules] = useState([]);
  const [newRule, setNewRule] = useState({
    min_duration_sec: 90,
    rate_per_min: 0.06,
    allow_override: true,
  });
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchCampaigns();
    fetchBillingLogs();
  }, []);

  useEffect(() => {
    if (selectedCampaign) {
      fetchBillingRules(selectedCampaign);
    }
  }, [selectedCampaign]);

  const fetchCampaigns = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/campaign`);
      setCampaigns(res.data.filter((c) => c.routing_method === "smart"));
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    }
  };

  // const fetchBillingRules = async (campaignId) => {
  //   try {
  //     const res = await axios.get(
  //       `${API_BASE_URL}/api/billing/rules?campaign_id=${campaignId}`
  //     );
  //     setRules(res.data);
  //   } catch (error) {
  //     console.error("Error fetching billing rules:", error);
  //   }
  // };

  const fetchBillingRules = async (campaignId) => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/api/billing/rules?campaign_id=${campaignId}`
      );
      const rules = res.data.map((rule) => ({
        ...rule,
        rate_per_min: parseFloat(rule.rate_per_min), // Ensure it's a number
      }));
      setRules(rules);
    } catch (error) {
      console.error("Error fetching billing rules:", error);
    }
  };

  const fetchBillingLogs = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/call/billing-logs`);
      const logs = res.data;

      const flattenedLogs = logs.map((log) => ({
        id: log.id,
        call_log_id: log.call_log_id,
        rule_id: log.rule_id,
        amount_charged: log.amount_charged,
        override_rate: log.override_rate,
        duration_sec: log.duration_sec,
        created_at: log.created_at,
        caller_number: log.call_log?.caller_number || null,
        call_status: log.call_log?.status || null,
        buyer_id: log.call_log?.buyer_id || null,
        buyer_name: log.call_log?.buyer?.name || null,
        buyer_phone: log.call_log?.buyer?.phone || null,
        campaign_name: log.call_log?.campaign?.name || null,
      }));

      setLogs(flattenedLogs);
    } catch (error) {
      console.error("Error fetching billing logs:", error);
    }
  };

  const handleCreateRule = async () => {
    if (!selectedCampaign) return;

    try {
      await axios.post(`${API_BASE_URL}/api/billing/rules`, {
        ...newRule,
        campaign_id: selectedCampaign,
      });
      fetchBillingRules(selectedCampaign);
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
    try {
      await axios.delete(`${API_BASE_URL}/api/billing/rules/${ruleId}`);
      fetchBillingRules(selectedCampaign);
    } catch (error) {
      console.error("Error deleting billing rule:", error);
    }
  };
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
                        Billing Logic
                      </li>
                    </ol>
                    <h1 className={styles.pageTitle}>Billing Rules</h1>
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
        {/* Main Content Section */}
        <div className="page-wrapper">
          <div className="page-content container-fluid">
            <div className="row">
              {/* Campaign Selection - Premium Design with Background */}
              <div className="col-md-4">
                <div className="card mb-4 border-0" style={{
                  borderRadius: "16px",
                  background: "linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 100%)",
                  boxShadow: "0 4px 20px rgba(149, 164, 255, 0.15)",
                  border: "1px solid rgba(224, 231, 255, 0.6)"
                }}>
                  <div className="card-header bg-transparent border-0 pb-0 d-flex align-items-center">
                    <div className="bg-primary bg-opacity-10 p-2 rounded me-3" style={{
                      background: "rgba(99, 102, 241, 0.1)",
                      boxShadow: "inset 0 0 0 1px rgba(99, 102, 241, 0.2)"
                    }}>
                      <i className="fas fa-route text-primary" style={{ fontSize: "1.2rem", color: "#6366f1" }}></i>
                    </div>
                    <div>
                      <h5 className="fw-semibold mb-0" style={{ color: "#2c3e50" }}>Smart Routing Campaigns</h5>
                      <p className="text-muted small mb-0" style={{ color: "#64748b" }}>Select campaign to manage rules</p>
                    </div>
                  </div>
                  <div className="card-body pt-3">
                    <div className="input-group mb-3" style={{
                      boxShadow: "0 2px 8px rgba(99, 102, 241, 0.08)",
                      borderRadius: "10px",
                      overflow: "hidden"
                    }}>
                      <span className="input-group-text" style={{
                        background: "white",
                        border: "none",
                        padding: "0 15px"
                      }}>
                        <i className="fas fa-filter" style={{ color: "#94a3b8" }}></i>
                      </span>
                      <select
                        className="form-select"
                        style={{
                          height: "48px",
                          border: "none",
                          background: "white",
                          fontWeight: "500",
                          color: "#334155",
                          boxShadow: "none"
                        }}
                        value={selectedCampaign || ""}
                        onChange={(e) => setSelectedCampaign(e.target.value)}
                      >
                        <option value="">Select a campaign...</option>
                        {campaigns.map((campaign) => (
                          <option key={campaign.id} value={campaign.id}>
                            {campaign.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Billing Rules Form - Premium Design with Background */}
                {selectedCampaign && (
                  <div className="card border-0" style={{
                    borderRadius: "16px",
                    background: "linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 100%)",
                    boxShadow: "0 4px 20px rgba(149, 164, 255, 0.15)",
                    border: "1px solid rgba(224, 231, 255, 0.6)"
                  }}>
                    <div className="card-header bg-transparent border-0 d-flex align-items-center">
                      <div className="bg-success bg-opacity-10 p-2 rounded me-3" style={{
                        background: "rgba(16, 185, 129, 0.1)",
                        boxShadow: "inset 0 0 0 1px rgba(16, 185, 129, 0.2)"
                      }}>
                        <i className="fas fa-coins" style={{ fontSize: "1.2rem", color: "#10b981" }}></i>
                      </div>
                      <div>
                        <h5 className="fw-semibold mb-0" style={{ color: "#2c3e50" }}>Create Billing Rule</h5>
                        <p className="text-muted small mb-0" style={{ color: "#64748b" }}>Set custom pricing rules</p>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="mb-4">
                        <label className="form-label d-flex align-items-center text-muted small fw-bold mb-2" style={{ color: "#475569" }}>
                          <i className="fas fa-clock me-2" style={{ color: "#64748b" }}></i>Minimum Duration (seconds)
                        </label>
                        <div className="input-group" style={{
                          boxShadow: "0 2px 8px rgba(99, 102, 241, 0.08)",
                          borderRadius: "10px",
                          overflow: "hidden"
                        }}>
                          <input
                            type="number"
                            className="form-control"
                            style={{
                              height: "48px",
                              border: "none",
                              background: "white",
                              color: "#334155"
                            }}
                            value={newRule.min_duration_sec}
                            onChange={(e) =>
                              setNewRule({
                                ...newRule,
                                min_duration_sec: e.target.value,
                              })
                            }
                          />
                          <span className="input-group-text" style={{
                            background: "white",
                            border: "none",
                            color: "#94a3b8"
                          }}>sec</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="form-label d-flex align-items-center text-muted small fw-bold mb-2" style={{ color: "#475569" }}>
                          <i className="fas fa-dollar-sign me-2" style={{ color: "#64748b" }}></i>Rate per minute
                        </label>
                        <div className="input-group" style={{
                          boxShadow: "0 2px 8px rgba(99, 102, 241, 0.08)",
                          borderRadius: "10px",
                          overflow: "hidden"
                        }}>
                          <span className="input-group-text" style={{
                            background: "white",
                            border: "none",
                            color: "#94a3b8"
                          }}>$</span>
                          <input
                            type="number"
                            step="0.01"
                            className="form-control"
                            style={{
                              height: "48px",
                              border: "none",
                              background: "white",
                              color: "#334155"
                            }}
                            value={newRule.rate_per_min}
                            onChange={(e) =>
                              setNewRule({
                                ...newRule,
                                rate_per_min: e.target.value,
                              })
                            }
                          />
                          <span className="input-group-text" style={{
                            background: "white",
                            border: "none",
                            color: "#94a3b8"
                          }}>/min</span>
                        </div>
                      </div>

                      <div className="mb-4 form-check form-switch ps-0 d-flex align-items-center">
                        <div className="me-3" style={{ width: "46px" }}>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            role="switch"
                            style={{
                              width: "46px",
                              height: "24px",
                              backgroundColor: "#e2e8f0",
                              borderColor: "#e2e8f0",
                              backgroundImage: "none"
                            }}
                            checked={newRule.allow_override}
                            onChange={(e) =>
                              setNewRule({
                                ...newRule,
                                allow_override: e.target.checked,
                              })
                            }
                          />
                        </div>
                        <div>
                          <label className="form-check-label text-muted small fw-bold d-block" style={{ color: "#475569" }}>Allow Rate Override</label>
                          <small className="text-muted" style={{ color: "#94a3b8" }}>Agents can adjust rates per call</small>
                        </div>
                      </div>

                      <button
                        className="btn w-100 py-3 fw-semibold d-flex align-items-center justify-content-center"
                        style={{
                          borderRadius: "12px",
                          background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                          color: "white",
                          boxShadow: "0 4px 12px rgba(99, 102, 241, 0.25)",
                          fontSize: "0.95rem",
                          letterSpacing: "0.3px",
                          border: "none",
                          transition: "all 0.2s ease"
                        }}
                        onClick={handleCreateRule}
                      >
                        <i className="fas fa-plus-circle me-2"></i> Create Rule
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Billing Rules List - Modern Design */}
<div className="col-md-8">
  <div className="card mb-4 border-0" style={{ 
    borderRadius: "16px",
    background: "linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 100%)",
    boxShadow: "0 4px 20px rgba(149, 164, 255, 0.15)",
    border: "1px solid rgba(224, 231, 255, 0.6)"
  }}>
    <div className="card-header bg-transparent border-0 d-flex align-items-center">
      <div className="bg-primary bg-opacity-10 p-2 rounded me-3" style={{
        background: "rgba(99, 102, 241, 0.1)",
        boxShadow: "inset 0 0 0 1px rgba(99, 102, 241, 0.2)"
      }}>
        <i className="fas fa-list-check text-primary" style={{ fontSize: "1.2rem", color: "#6366f1" }}></i>
      </div>
      <div>
        <h5 className="fw-semibold mb-0" style={{ color: "#2c3e50" }}>Active Billing Rules</h5>
        <p className="text-muted small mb-0" style={{ color: "#64748b" }}>Current pricing rules for this campaign</p>
      </div>
      {selectedCampaign && (
        <span className="badge ms-auto bg-primary bg-opacity-10 text-primary">
          {rules.length} {rules.length === 1 ? 'rule' : 'rules'}
        </span>
      )}
    </div>
    <div className="card-body">
      {rules.length === 0 ? (
        <div className="text-center py-5">
          <i className="fas fa-slash text-muted mb-3" style={{ fontSize: "2rem", opacity: 0.5 }}></i>
          <p className="text-muted" style={{ color: "#94a3b8" }}>No billing rules for this campaign</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead>
              <tr>
                <th className="text-muted small fw-bold" style={{ color: "#64748b" }}>Min Duration</th>
                <th className="text-muted small fw-bold" style={{ color: "#64748b" }}>Rate/Min</th>
                <th className="text-muted small fw-bold" style={{ color: "#64748b" }}>Override</th>
                <th className="text-muted small fw-bold" style={{ color: "#64748b" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rules.map((rule) => (
                <tr key={rule.id} style={{ borderColor: "#f1f5f9" }}>
                  <td>
                    <span className="badge bg-white text-dark" style={{
                      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                      border: "1px solid rgba(0,0,0,0.05)"
                    }}>
                      {rule.min_duration_sec} sec
                    </span>
                  </td>
                  <td className="fw-semibold" style={{ color: "#334155" }}>
                    ${parseFloat(rule.rate_per_min || 0).toFixed(4)}
                  </td>
                  <td>
                    <span className={`badge ${rule.allow_override ? "bg-success bg-opacity-10 text-success" : "bg-danger bg-opacity-10 text-danger"}`}>
                      {rule.allow_override ? "Yes" : "No"}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm bg-danger bg-opacity-10 text-danger"
                      onClick={() => handleDeleteRule(rule.id)}
                      title="Delete"
                      style={{ borderRadius: "8px" }}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  </div>

  {/* Billing Logs - Modern Design */}
  <div className="card border-0" style={{ 
    borderRadius: "16px",
    background: "linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 100%)",
    boxShadow: "0 4px 20px rgba(149, 164, 255, 0.15)",
    border: "1px solid rgba(224, 231, 255, 0.6)"
  }}>
    <div className="card-header bg-transparent border-0 d-flex align-items-center">
      <div className="bg-info bg-opacity-10 p-2 rounded me-3" style={{
        background: "rgba(59, 130, 246, 0.1)",
        boxShadow: "inset 0 0 0 1px rgba(59, 130, 246, 0.2)"
      }}>
        <i className="fas fa-receipt text-info" style={{ fontSize: "1.2rem", color: "#3b82f6" }}></i>
      </div>
      <div>
        <h5 className="fw-semibold mb-0" style={{ color: "#2c3e50" }}>Billing Logs</h5>
        <p className="text-muted small mb-0" style={{ color: "#64748b" }}>Recent call billing transactions</p>
      </div>
      <span className="badge ms-auto bg-info bg-opacity-10 text-info">
        {logs.length} {logs.length === 1 ? 'entry' : 'entries'}
      </span>
    </div>
    <div className="card-body">s
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead>
            <tr>
              <th className="text-muted small fw-bold" style={{ color: "#64748b" }}>Caller</th>
              <th className="text-muted small fw-bold" style={{ color: "#64748b" }}>Buyer</th>
              <th className="text-muted small fw-bold" style={{ color: "#64748b" }}>Duration</th>
              <th className="text-muted small fw-bold" style={{ color: "#64748b" }}>Amount</th>
              <th className="text-muted small fw-bold" style={{ color: "#64748b" }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} style={{ borderColor: "#f1f5f9" }}>
                <td style={{ color: "#334155" }}>{log.caller_number}</td>
                <td style={{ color: "#334155" }}>{log.buyer_number}</td>
                <td>
                  <span className="badge bg-white text-dark" style={{
                    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                    border: "1px solid rgba(0,0,0,0.05)"
                  }}>
                    {log.duration_sec} sec
                  </span>
                </td>
                <td className="fw-semibold" style={{ color: "#334155" }}>
                  ${log.amount_charged.toFixed(4)}
                </td>
                <td style={{ color: "#64748b" }}>
                  {new Date(log.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BillingLogic;
