import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StudentLogin: React.FC = () => {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:9090/student/auth/login", {
                userId,
                password,
            });

            const token = response.data.token;
            localStorage.setItem("token", token); // Store the token
            navigate("/dashboard"); // Redirect to dashboard
        } catch (err) {
            setError("Login failed. Please check your credentials.");
        }
    };

    return (
        <div>
            <h2>Student Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default StudentLogin;
