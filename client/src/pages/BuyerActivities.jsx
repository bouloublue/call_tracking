import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "../pages/Home.module.css";
import "react-toastify/dist/ReactToastify.css";
const API_BASE_URL = import.meta.env.VITE_API_URL;

function BuyerActivities() {

  return (
    <>
           <div className={styles.homePageContainer}>
             {/* Page Title Section */}
             <div className={styles.pageTitleBox}>
               <div className={styles.pageTitleContainer}>
                 <div className={`${styles.row} ${styles.gap0}`}>
                   <div className={styles.col12}>
                     <div className={`${styles.pageTitleContent} ${styles.dSmFlex} ${styles.justifyContentSmBetween} ${styles.alignItemsCenter}`}>
                       {/* Left Section - Title & Breadcrumb */}
                       <div>
                         <ol className={styles.breadcrumb}>
                           <li className={styles.breadcrumbItem}>
                             <a href="/">Call Tracking</a>
                           </li>
                           <li className={`${styles.breadcrumbItem} ${styles.active}`}>Buyers activities</li>
                         </ol>
                         <h1 className={styles.pageTitle}>Buyers activities</h1>
                       </div>
     
                       {/* Right Section - Notification + Date Filter */}
                       <div className={styles.dateFilter} style={{ display: "flex", alignItems: "center" }}>
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
                         <span className={styles.dateRange}>Jun 16, 2025 - Jul 10, 2025</span>
     
                         {/* Filter Button */}
                         <button className={styles.filterBtn} style={{ marginLeft: "10px" }}>
                           Filter
                         </button>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
              {/* Main Content Section */}

              <div>
                <h1 style={{ textAlign: "center", marginTop: "20px", fontSize: "14px", fontWeight: "bold" }}>
                  Page under Development
                </h1>
              </div>
      </div>
    </>
  );

}

export default BuyerActivities;
