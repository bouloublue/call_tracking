// ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem('auth') === 'true';
  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
