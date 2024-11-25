// import React, { useState, useEffect } from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../services/adminservice"; // Assuming it's under services
// import axios from "axios";

// const WardenProtectedRoute = ({ children }: { children: React.ReactNode }) => {
//   const { isLoggedIn } = useAuth();
//   const [roles, setRoles] = useState<string[]>([]);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (token) {
//       // Fetch roles from the backend (Django) using the token
//       axios.get('http://localhost:8081/api/roles', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//         .then((response) => {
//           console.log("Roles:", response.data.roles);
//           setRoles(response.data.roles);
//         })
//         .catch((error) => {
//           console.error("Failed to fetch roles:", error);
//         });
//     } 
//   }, [token]);

//   if (!token) {
//     window.location.href = "http://localhost:8081/login/";
//     return null;
//   }

//   return roles.includes("admin") ? <>{children}</> : <Navigate to="/warden-dashboard" />;
// };

// export default WardenProtectedRoute;

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../services/adminservice";

type Props = { children: React.ReactNode };

const WardenProtectedRoute = ({ children }: Props) => {
  const { isLoggedIn, getUserRoles } = useAuth();
  const roles = getUserRoles();

  if (!isLoggedIn()) {
    // Redirect to Django login if no token is found
    window.location.href = "http://localhost:8081/login/";
    return null;
  }

  // Check if user has 'admin' role
  return roles.includes("admin") ? <>{children}</> : <Navigate to="/warden-dashboard" />;
};

export default WardenProtectedRoute;
