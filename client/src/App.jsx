import { BrowserRouter , Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
import Profile from './pages/Profile'
import ProtectedRoute from './components/ProtectedRoute'
import Manager from './pages/Manager'
import Agents from './pages/Agents'
import CampaignOverview from './pages/CampaignOverview'
import Campaigns from './pages/Campaigns'
import CallLogs from './pages/CallLogs'
import Leads from './pages/Leads'
import FormBuilder from './pages/forms'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
    <ToastContainer position="top-right" autoClose={2000} />
    <Routes>
      <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<SignUp />} />
      <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path= '/manager' element={<ProtectedRoute><Manager /></ProtectedRoute>} />
      <Route path= '/agents' element={<ProtectedRoute><Agents /></ProtectedRoute>} />
      <Route path= '/campaign-overview' element={<ProtectedRoute><CampaignOverview /></ProtectedRoute>} />
      <Route path= '/campaigns' element={<ProtectedRoute><Campaigns /></ProtectedRoute>} />
      <Route path= '/call-logs' element={<ProtectedRoute><CallLogs /></ProtectedRoute>} />
      <Route path= '/leads' element={<ProtectedRoute><Leads /></ProtectedRoute>} />
      <Route path= '/forms' element={<ProtectedRoute><FormBuilder /></ProtectedRoute>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App