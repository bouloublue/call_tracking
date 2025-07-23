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
      const res = await axios.get(`${API_BASE_URL}/api/billing/logs`);
      setLogs(res.data);
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
              {/* Campaign Selection */}
              <div className="col-md-4">
                <div className="card shadow-sm mb-4">
                  <div className="card-header">
                    <h5>Smart Routing Campaigns</h5>
                  </div>
                  <div className="card-body">
                    <select
                      className="form-select"
                      value={selectedCampaign || ""}
                      onChange={(e) => setSelectedCampaign(e.target.value)}
                    >
                      <option value="">Select a campaign</option>
                      {campaigns.map((campaign) => (
                        <option key={campaign.id} value={campaign.id}>
                          {campaign.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Billing Rules Form */}
                {selectedCampaign && (
                  <div className="card shadow-sm">
                    <div className="card-header">
                      <h5>Create Billing Rule</h5>
                    </div>
                    <div className="card-body">
                      <div className="mb-3">
                        <label className="form-label">
                          Minimum Duration (seconds)
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          value={newRule.min_duration_sec}
                          onChange={(e) =>
                            setNewRule({
                              ...newRule,
                              min_duration_sec: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">
                          Rate per minute ($)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          className="form-control"
                          value={newRule.rate_per_min}
                          onChange={(e) =>
                            setNewRule({
                              ...newRule,
                              rate_per_min: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="mb-3 form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={newRule.allow_override}
                          onChange={(e) =>
                            setNewRule({
                              ...newRule,
                              allow_override: e.target.checked,
                            })
                          }
                        />
                        <label className="form-check-label">
                          Allow Rate Override
                        </label>
                      </div>
                      <button
                        className="btn btn-primary"
                        onClick={handleCreateRule}
                      >
                        Create Rule
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Billing Rules List */}
              <div className="col-md-8">
                <div className="card shadow-sm mb-4">
                  <div className="card-header">
                    <h5>Active Billing Rules</h5>
                  </div>
                  <div className="card-body">
                    {rules.length === 0 ? (
                      <p>No billing rules for this campaign</p>
                    ) : (
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Min Duration</th>
                            <th>Rate/Min</th>
                            <th>Override</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {rules.map((rule) => (
                            <tr key={rule.id}>
                              <td>{rule.min_duration_sec} sec</td>
                              <td>
                                ${parseFloat(rule.rate_per_min || 0).toFixed(4)}
                              </td>
                              <td>{rule.allow_override ? "Yes" : "No"}</td>
                              <td>
                                <button
                                  className="btn btn-sm btn-danger"
                                  onClick={() => handleDeleteRule(rule.id)}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>

                {/* Billing Logs */}
                <div className="card shadow-sm">
                  <div className="card-header">
                    <h5>Billing Logs</h5>
                  </div>
                  <div className="card-body">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Caller</th>
                          <th>Buyer</th>
                          <th>Duration</th>
                          <th>Amount</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {logs.map((log) => (
                          <tr key={log.id}>
                            <td>{log.caller_number}</td>
                            <td>{log.buyer_number}</td>
                            <td>{log.duration_sec} sec</td>
                            <td>${log.amount_charged.toFixed(4)}</td>
                            <td>{new Date(log.created_at).toLocaleString()}</td>
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
    </>
  );
}

export default BillingLogic;
