import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const PrivateRoute = ({ children }) => {
  const authData = JSON.parse(localStorage.getItem("token"));

  if (!authData?.token || !authData?.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  try {
    const decoded = jwtDecode(authData.token);
    const isExpired = decoded.exp * 1000 < Date.now();

    return isExpired ? <Navigate to="/login" replace /> : children;
  } catch (error) {
    return <Navigate to="/login" replace />;
  }
};

export default PrivateRoute;
