import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import styles from "../pages/Home.module.css";

const VITE_API_URL = import.meta.env.VITE_API_URL;
const API_BASE_URL2 = import.meta.env.VITE_API_URL2;

function Reports() {
    const [ReportsList, setReportsList] = useState([]);
    const [calling, setCalling] = useState(null);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await fetch(`${VITE_API_URL}/api/campaign`);
                const campaigns = await response.json();

                const allReports = campaigns.flatMap((campaign) =>
                    (campaign.Reports || []).map((lead) => ({
                        campaignName: campaign.name,
                        ...lead.data,
                    }))
                );

                setReportsList(allReports);
            } catch (err) {
                console.error("Failed to load Reports:", err);
            }
        };

        fetchReports();
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
                                        <li className={`${styles.breadcrumbItem} ${styles.active}`}>Billing</li>
                                    </ol>
                                    <h1 className={styles.pageTitle}>Billing Reports</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <SideBar />

            <div className="page-wrapper">
                <div className="page-content">
                    <div className="container-fluid">

                        {/* Export Button Top-Right */}
                        <div className="d-flex justify-content-end mb-3">
                            <button
                                className="btn btn-outline-success"
                                style={{
                                    border: "1.5px solid #198754",
                                    color: "#198754",
                                    fontWeight: "600",
                                    fontSize:"16px",
                                    marginBottom:"10px",
                                    padding: "10px 15px",
                                    borderRadius: "6px"
                                }}
                            >
                                Export Data
                            </button>
                        </div>

                        <div className="card">
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-hover align-middle">
                                        <thead className="table-light">
                                            <tr>
                                                <th style={{ fontSize: "14px", fontWeight: 600, color: "#aca9a9ff" }}>S.No</th>
                                                <th style={{ fontSize: "14px", fontWeight: 600, color: "#aca9a9ff" }}>Campaign Name</th>
                                                <th style={{ fontSize: "14px", fontWeight: 600, color: "#aca9a9ff" }}>Name</th>
                                                <th style={{ fontSize: "14px", fontWeight: 600, color: "#aca9a9ff" }}>Email</th>
                                                <th style={{ fontSize: "14px", fontWeight: 600, color: "#aca9a9ff" }}>Phone</th>
                                                <th style={{ fontSize: "14px", fontWeight: 600, color: "#aca9a9ff" }}>Company</th>
                                                <th style={{ fontSize: "14px", fontWeight: 600, color: "#aca9a9ff" }}>Call</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ReportsList.length > 0 ? (
                                                ReportsList.map((lead, index) => (
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
                                                        No Reports available.
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
        </>
    );
}

export default Reports;
