import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useAuth = () => {
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get("token");
    const roles = urlParams.get("roles");

    if (token) {
      localStorage.setItem("token", token);
      console.log("Token saved:", token);
    }

    if (roles) {
      localStorage.setItem("roles", roles);
      console.log("Roles saved:", roles);
    }
  }, [location]);

  const isLoggedIn = () => {
    const token = localStorage.getItem("token");
    return !!token;
  };

  const getUserRoles = () => {
    const roles = localStorage.getItem("roles");
    return roles ? roles.split(",") : [];
  };

  const logout = () => {
    console.log("Logging out...");
    localStorage.removeItem("token");
    localStorage.removeItem("roles");
    // Redirect to the Django logout endpoint
    window.location.href = "http://localhost:8081/employee-logout";
  };

  return { isLoggedIn, getUserRoles, logout };
};
