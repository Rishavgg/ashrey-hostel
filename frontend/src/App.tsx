import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import AdminLogin from "./pages/AdminLogin";
import StudentLogin from "./pages/StudentLogin";
import Dashboard from "./pages/Dashboard";
import RegisterStudent from "./pages/RegisterStudent";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token);
    }, []);

    return (
        <Router>
            <Routes>
                {/* <Route path="/" element={<Navigate to="/admin-login" />} /> */}
                {/* <Route path="/admin-login" element={<AdminLogin />} /> */}
                <Route path="/student-login" element={<Navigate to="/student-login" />} />
                <Route path="/register-student" element={<RegisterStudent />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route
                    path="/dashboard"
                    element={isAuthenticated ? <Dashboard /> : <Navigate to="/student-login" />}
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default App;
