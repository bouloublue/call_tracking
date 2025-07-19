import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import SideBar from './components/SideBar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Campaigns from './pages/Campaigns';
import Leads from './pages/Leads';
import Agents from './pages/Agents';
import Manager from './pages/Manager';
import Forms from './pages/forms';
import CallLogs from './pages/CallLogs';
import Profile from './pages/Profile';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import CampaignOverview from './pages/CampaignOverview';
import BillingLogic from './pages/BillingLogic';
import BillingReport from './pages/BillingReport';

import { FaBars } from 'react-icons/fa';
import appStyles from './App.module.css';

function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
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
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Protected Routes */}
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/campaigns" element={<ProtectedRoute><Campaigns /></ProtectedRoute>} />
            <Route path="/campaigns/:id" element={<ProtectedRoute><CampaignOverview /></ProtectedRoute>} />
            <Route path="/leads" element={<ProtectedRoute><Leads /></ProtectedRoute>} />
            <Route path="/agents" element={<ProtectedRoute><Agents /></ProtectedRoute>} />
            <Route path="/manager" element={<ProtectedRoute><Manager /></ProtectedRoute>} />
            <Route path="/forms" element={<ProtectedRoute><Forms /></ProtectedRoute>} />
            <Route path="/call-logs" element={<ProtectedRoute><CallLogs /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/billing-logic" element={<ProtectedRoute><BillingLogic /></ProtectedRoute>} />
            <Route path="/billing-reports" element={<ProtectedRoute><BillingReport/></ProtectedRoute>} />
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






// import { BrowserRouter , Routes, Route } from 'react-router-dom'
// import Home from './pages/Home'
// import Login from './pages/Auth/Login'
// import SignUp from './pages/Auth/SignUp'
// import Profile from './pages/Profile'
// import ProtectedRoute from './components/ProtectedRoute'
// import Manager from './pages/Manager'
// import Agents from './pages/Agents'
// import CampaignOverview from './pages/CampaignOverview'
// import Campaigns from './pages/Campaigns'
// import CallLogs from './pages/CallLogs'
// import Leads from './pages/Leads'
// import FormBuilder from './pages/forms'
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function App() {
//   return (
//     <BrowserRouter>
//     <ToastContainer position="top-right" autoClose={2000} />
//     <Routes>
//       <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
//       <Route path='/login' element={<Login />} />
//       <Route path='/register' element={<SignUp />} />
//       <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
//       <Route path= '/manager' element={<ProtectedRoute><Manager /></ProtectedRoute>} />
//       <Route path= '/agents' element={<ProtectedRoute><Agents /></ProtectedRoute>} />
//       <Route path= '/campaign-overview' element={<ProtectedRoute><CampaignOverview /></ProtectedRoute>} />
//       <Route path= '/campaigns' element={<ProtectedRoute><Campaigns /></ProtectedRoute>} />
//       <Route path= '/call-logs' element={<ProtectedRoute><CallLogs /></ProtectedRoute>} />
//       <Route path= '/leads' element={<ProtectedRoute><Leads /></ProtectedRoute>} />
//       <Route path= '/forms' element={<ProtectedRoute><FormBuilder /></ProtectedRoute>} />
//     </Routes>
//     </BrowserRouter>
//   )
// }

// export default App




// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import SideBar from './components/SideBar';
// import NavBar from './components/NavBar'; // Assuming you have a NavBar component
// import ProtectedRoute from './components/ProtectedRoute'; // Assuming you have a ProtectedRoute
// import Home from './pages/Home';
// import Campaigns from './pages/Campaigns';
// import Leads from './pages/Leads';
// import Agents from './pages/Agents';
// import Manager from './pages/Manager';
// import Forms from './pages/forms'; // Renamed from 'forms' to 'Forms' for consistency
// import CallLogs from './pages/CallLogs';
// import Profile from './pages/Profile';
// import Login from './pages/Auth/Login';
// import SignUp from './pages/Auth/SignUp';
// import CampaignOverview from './pages/CampaignOverview';

// import { FaBars } from 'react-icons/fa'; // Import the hamburger icon

// // Removed import './App.css';
// // Removed import './index.css';
// import appStyles from './App.module.css'; // Import App.module.css

// function App() {
//   // State to control the sidebar's visibility
//   // Initialize based on screen width: true for desktop, false for mobile
//   const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);

//   // Function to toggle the sidebar's visibility
//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   // Effect to handle window resize for sidebar behavior
//   useEffect(() => {
//     const handleResize = () => {
//       // On resize, if screen becomes desktop-sized, open sidebar; if mobile-sized, close it.
//       // This helps maintain expected behavior when resizing browser window.
//       setIsSidebarOpen(window.innerWidth >= 768);
//     };

//     window.addEventListener('resize', handleResize);

//     // Cleanup the event listener on component unmount
//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

//   return (
//     <Router>
//       <div className={appStyles.appContainer}> {/* Use App.module.css for main container */}
//         {/* Sidebar component */}
//         <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

//         {/* Overlay for mobile when sidebar is open */}
//         {isSidebarOpen && window.innerWidth < 768 && (
//           <div
//             className={appStyles.mobileOverlay} // Use App.module.css for overlay
//             onClick={toggleSidebar} // Close sidebar when overlay is clicked
//           ></div>
//         )}

//         {/* Hamburger menu button */}
//         <button
//           onClick={toggleSidebar}
//           className={appStyles.toggleButton} // Use App.module.css for toggle button
//           aria-label="Toggle sidebar"
//         >
//           <FaBars />
//         </button>

//           {/* Main content area */}
//           <div
//             className={`${appStyles.mainContent} ${
//               isSidebarOpen ? appStyles.sidebarOpen : ''
//             }`}
//           >
//             {/* You might want to integrate NavBar here, or within each page */}
//             {/* For now, let's assume NavBar is a separate component that might also toggle the sidebar */}
//             {/* <NavBar toggleSidebar={toggleSidebar} /> */}

//             <main> {/* Removed p-4, now handled by Home.module.css or specific page styles */}
//               <Routes>
//                 {/* Public Routes */}
//                 <Route path="/login" element={<Login />} />
//                 <Route path="/signup" element={<SignUp />} />

//                 {/* Protected Routes - Wrap with ProtectedRoute if authentication is required */}
//                 <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
//                 <Route path="/campaigns" element={<ProtectedRoute><Campaigns /></ProtectedRoute>} />
//                 <Route path="/campaigns/:id" element={<ProtectedRoute><CampaignOverview /></ProtectedRoute>} />
//                 <Route path="/leads" element={<ProtectedRoute><Leads /></ProtectedRoute>} />
//                 <Route path="/agents" element={<ProtectedRoute><Agents /></ProtectedRoute>} />
//                 <Route path="/manager" element={<ProtectedRoute><Manager /></ProtectedRoute>} />
//                 <Route path="/forms" element={<ProtectedRoute><Forms /></ProtectedRoute>} />
//                 <Route path="/call-logs" element={<ProtectedRoute><CallLogs /></ProtectedRoute>} />
//                 <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

//                 {/* Add a catch-all route for 404 Not Found */}
//                 <Route path="*" element={<div>404 Not Found</div>} />
//               </Routes>
//             </main>
//           </div>
//         </div>
//       </Router>
//     );
//   }

// export default App;


