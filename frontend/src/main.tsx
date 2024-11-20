import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import AdminLogin from "./pages/AdminLogin";
import StudentLogin from "./pages/StudentLogin";
import Dashboard from "./pages/Dashboard";
import RegisterStudent from "./pages/RegisterStudent";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";
import "./styles.css";

const App: React.FC = () => {
    // const [isAuthenticated, setIsAuthenticated] = useState(false);

    // useEffect(() => {
    //     // Check if the user is authenticated (using a stored token, for example)
    //     const token = localStorage.getItem("token");
    //     setIsAuthenticated(!!token); // Set authentication status
    // }, []);

    // const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    //     // Protect private routes
    //     return isAuthenticated ? children : <Navigate to="/student-login" />;
    // };

    return (
        <Router>
            <div>
                <Routes>
                    {/* Default route */}
                    <Route path="/" element={<Navigate to="/student-login" />} />

                    {/* Admin login page */}
                    {/* <Route path="/admin-login" element={<AdminLogin />} /> */}

                    {/* Student login page */}
                    <Route path="/student-login" element={<StudentLogin />} />

                    {/* Register student */}
                    <Route path="/student/auth/addStudent" element={<RegisterStudent />} />

                    {/* Reset password */}
                    <Route path="/reset-password" element={<ResetPassword />} />

                    {/* Dashboard (protected route) */}
                    <Route
                        path="/dashboard"
                        element={
                            // <PrivateRoute>
                                <Dashboard />
                            // </PrivateRoute>
                        }
                    />

                    {/* Catch-all route */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
