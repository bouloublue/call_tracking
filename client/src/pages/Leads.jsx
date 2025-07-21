import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import styles from "../pages/Home.module.css";


const VITE_API_URL = import.meta.env.VITE_API_URL;
const API_BASE_URL2 = import.meta.env.VITE_API_URL2;

function Leads() {
  const [leadsList, setLeadsList] = useState([]);
  const [calling, setCalling] = useState(null);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await fetch(`${VITE_API_URL}/api/campaign`);
        const campaigns = await response.json();

        // Flatten leads with campaign name
        const allLeads = campaigns.flatMap((campaign) =>
          (campaign.leads || []).map((lead) => ({
            campaignName: campaign.name,
            ...lead.data, // Spread name, email, phone, company
          }))
        );

        setLeadsList(allLeads);
      } catch (err) {
        console.error("Failed to load leads:", err);
      }
    };

    fetchLeads();
  }, []);

  const handleCall = async (phone) => {
    setCalling(phone);
    try {
      const res = await fetch(`${API_BASE_URL2}/call`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: [phone] }),
      });

      const data = await res.json();
      alert(data.message);
    } catch (err) {
      alert("Call failed");
      console.error(err);
    } finally {
      setCalling(null);
    }
  };

  return (
    <>
      <div className={styles.pageTitleBox}>
        <div className={styles.pageTitleContainer}>
          <div className={`${styles.row} ${styles.gap0}`}>
            <div className={styles.col12}>
              <div className={`${styles.pageTitleContent} ${styles.dSmFlex} ${styles.justifyContentSmBetween} ${styles.alignItemsCenter}`}>
                <div>
                  <ol className={styles.breadcrumb}>
                    <li className={styles.breadcrumbItem}>
                      <a href="/">Call Tracking</a>
                    </li>
                    <li className={`${styles.breadcrumbItem} ${styles.active}`}>Leads</li>
                  </ol>
                  <h1 className={styles.pageTitle}>Leads</h1>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      <SideBar />

      <div>
        <div className="page-wrapper">
          <div className="page-content">
            <div className="container-fluid">
              <div className="d-flex justify-content-between align-items-center mb-4">
              
              </div>

              <div className="card">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-hover align-middle">
                      <thead className="table-light">
                        <tr>
                          <th>S.No</th>
                          <th>Campaign Name</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Company</th>
                          <th>Call</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leadsList.length > 0 ? (
                          leadsList.map((lead, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{lead.campaignName}</td>
                              <td>{lead.name || "-"}</td>
                              <td>{lead.email || "-"}</td>
                              <td>{lead.phone || "-"}</td>
                              <td>{lead.company || "-"}</td>
                              <td>
                                <button
                                  className="btn btn-sm btn-success"
                                  onClick={() => handleCall(lead.phone)}
                                  disabled={calling === lead.phone}
                                >
                                  <img
                                    src="/assets/images/icons/play.png"
                                    alt="Call"
                                    style={{ width: "16px", height: "16px" }}
                                  />
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="7" className="text-center">
                              No leads available.
                            </td>
                          </tr>
                        )}
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

export default Leads;

