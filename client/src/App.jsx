import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import SideBar from './components/SideBar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Campaigns from './pages/Campaigns';
import Agents from './pages/Agents';
import Manager from './pages/Manager';

import CallLogs from './pages/CallLogs';
import Profile from './pages/Profile';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import CampaignOverview from './pages/CampaignOverview';
import BuyerActivities from './pages/BuyerActivities';
import ActiveNumbers from './pages/ActiveNumbers';
import BillingLogic from './pages/BillingLogic';
import BillingReport from './pages/BillingReport';

import CampaignReport from './pages/campaignReport';

import { FaBars } from 'react-icons/fa';
import appStyles from './App.module.css';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 200);
  const location = useLocation();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={appStyles.appContainer}>
      {/* Sidebar - hide on login/signup */}
      {!isAuthPage && (
        <>
          <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          {isSidebarOpen && window.innerWidth < 768 && (
            <div
              className={appStyles.mobileOverlay}
              onClick={toggleSidebar}
            ></div>
          )}
          <button
            onClick={toggleSidebar}
            className={appStyles.toggleButton}
            aria-label="Toggle sidebar"
          >
            <FaBars />
          </button>
        </>
      )}

      <div
        className={`${appStyles.mainContent} ${
          !isAuthPage && isSidebarOpen ? appStyles.sidebarOpen : ''
        }`}
      >
        <main>
          <ToastContainer position="top-right" autoClose={2000} />
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Protected Routes */}
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/campaigns" element={<ProtectedRoute><Campaigns /></ProtectedRoute>} />
            <Route path="/campaigns/:id" element={<ProtectedRoute><CampaignOverview /></ProtectedRoute>} />
            <Route path="/agents" element={<ProtectedRoute><Agents /></ProtectedRoute>} />
            <Route path="/numbers/active-numbers" element={<ProtectedRoute><ActiveNumbers /></ProtectedRoute>} />
            <Route path="/manager" element={<ProtectedRoute><Manager /></ProtectedRoute>} />
            <Route path="/call-logs" element={<ProtectedRoute><CallLogs /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/buyer-activities" element={<ProtectedRoute><BuyerActivities /></ProtectedRoute>} />
            <Route path="/billing-logic" element={<ProtectedRoute><BillingLogic /></ProtectedRoute>} />
            <Route path="/billing-report" element={<ProtectedRoute><BillingReport /></ProtectedRoute>} />

            <Route path="/campaign-report" element={<ProtectedRoute><CampaignReport /></ProtectedRoute>} />

            {/* Catch-all 404 */}
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

// Root App component wraps everything in <Router>
function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;


