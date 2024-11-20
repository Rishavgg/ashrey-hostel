import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterStudent: React.FC = () => {
    const [rollNumber, setRollNumber] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:9090/student/auth/addStudent", { rollNumber, email });
            setMessage("Student registered successfully! Redirecting...");
            setTimeout(() => navigate("/reset-password"), 2000); // Redirect after success
        } catch {
            setMessage("Failed to register student.");
        }
    };

    return (
        <div>
            <h2>Register Student</h2>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Roll Number"
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit">Register</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default RegisterStudent;
