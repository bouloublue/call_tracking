import React, { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import { toast } from "react-toastify";
import styles from "../pages/Home.module.css";
import "react-toastify/dist/ReactToastify.css";
const API_BASE_URL = import.meta.env.VITE_API_URL;

function BuyerActivities() {
  const [showModal, setShowModal] = useState(false);
  const [agents, setAgents] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    status: "active",
    address: "",
    password: "",
    profile_img: null,
  });

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/user/clients`);
      setAgents(res.data);
      console.log(res.data)
    } catch (error) {
      toast.error("Failed to fetch agents");
    }
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("status", formData.status);
      data.append("password", formData.password)
      data.append("address", formData.address);
      if (formData.profile_img) data.append("profile_img", formData.profile_img);

      if (editMode) {
        await axios.put(`${API_BASE_URL}/api/user/${editId}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Agent updated successfully");
      } else {
        await axios.post(`${API_BASE_URL}/api/user`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Agent added successfully");
      }

      fetchAgents();
      setFormData({
        name: "",
        phone: "",
        email: "",
        status: "active",
        address: "",
        profile_img: null,
      });
      setShowModal(false);
      setEditMode(false);
      setEditId(null);
    } catch (error) {
      toast.error("Failed to save agent");
    }
  };

  const handleEdit = (agent) => {
    setFormData({
      name: agent.name,
      phone: agent.phone,
      email: agent.email,
      status: agent.status,
      address: agent.address,
      profile_img: agent.profile_img,
    });
    setEditId(agent.id);
    setEditMode(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this agent?")) {
      try {
        await axios.delete(`${API_BASE_URL}/api/user/${id}`);
        toast.success("Agent deleted successfully");
        fetchAgents();
      } catch (error) {
        toast.error("Failed to delete agent");
      }
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
