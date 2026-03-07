import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  let token = localStorage.getItem('token')

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  let decoded;
  try {
    decoded = jwtDecode(token);
  } catch (error) {
    console.error("Invalid token:", error);
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;