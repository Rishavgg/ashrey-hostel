import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../services/adminservice";

type Props = { children: React.ReactNode };

const WardenProtectedRoute = ({ children }: Props) => {
  const { isLoggedIn, getUserRoles } = useAuth();
  const roles = getUserRoles();

  if (!isLoggedIn()) {
    // Redirect to Django login if no token is found
    window.location.href = "http://localhost:8081/employee-login/";
    return null;
  }

  // Check if user has 'admin' role
  return roles.includes("admin") ? <>{children}</> : <Navigate to="/warden-dashboard" />;
};

export default WardenProtectedRoute;
