import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../services/adminservice";

type Props = { children: React.ReactNode };

const AdminProtectedRoute = ({ children }: Props) => {
  const { isLoggedIn, getUserRoles } = useAuth();
  const roles = getUserRoles();

  if (!isLoggedIn()) {
    // Redirect to Django login if no token is found
    window.location.href = "http://localhost:8081/employee-login/";
    return null;
  }

    // Role-based redirection
    if (roles.includes("admin")) {
      return <>{children}</>;
    } else if (roles.includes("caretaker")) {
      return <Navigate to="/caretaker-dashboard" />;
    } else if (roles.includes("chief_warden")) {
      return <Navigate to="/chief-warden-dashboard" />;
    } else if (roles.includes("warden")) {
      return <Navigate to="/warden-dashboard" />;
    }
  
    // Default fallback if no role matches
    return <Navigate to="/unauthorized" />;

  // Check if user has 'admin' role
  return roles.includes("admin") ? <>{children}</> : <Navigate to="/warden-dashboard" />;
};

export default AdminProtectedRoute;
