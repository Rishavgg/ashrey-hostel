import {UserProfile} from "../Models/User.ts";
import React, {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {loginAPI, registerAPI} from "../services/authService.tsx";
import axios from "axios";


type UserContextType = {
    user: UserProfile | null;
    token: string | null;
    registerUser: (email: string, userName: string, password: string) => Promise<void>;
    loginUser: (userName: string, password: string) => Promise<void>;
    logout: () => void;
    isLoggedIn: () => boolean;
};


type Props = { children: React.ReactNode};

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        if (user && token) {
            setUser(JSON.parse(user));
            setToken(token);
            axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        }
        setIsReady(true);
    }, [])

    const registerUser = async (email: string, userName: string, password: string) => {
        try {
            const res = await registerAPI(email, userName, password);
            if (res?.data) {
                localStorage.setItem("token", res.data.token);
                const userObj = {
                    userName: res.data.userName,
                    email: res.data.email,
                };
                localStorage.setItem("user", JSON.stringify(userObj));
                setToken(res.data.token);
                setUser(userObj);
                toast.success("Registered successfully.");
                navigate("/dashboard");
            }
        } catch (error) {
            toast.warning("Server error occurred");
        }
    };

    const loginUser = async (userName: string, password: string) => {
        try {
            const res = await loginAPI(userName, password);
            if (res?.body) {
                localStorage.setItem("token", res.body); // Save the JWT token
                const userObj = {
                    userName, // Just use the passed username directly
                    email: res?.email || "", // Use the email from the response, if available
                };
                localStorage.setItem("user", JSON.stringify(userObj)); // Save user info
                setToken(res.body); // Update state with JWT token
                setUser(userObj); // Update state with user info
                toast.success("Login successfully.");
                navigate("/dashboard");
            }
        } catch (error) {
            toast.warning("Server error occurred");
        }
    };


    const isLoggedIn = () => {
        return !!user;
    }

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setToken(null);
        delete axios.defaults.headers.common.Authorization;
        navigate("/");
    };


    return (
        <UserContext.Provider value={{loginUser, user, token, logout, isLoggedIn, registerUser}}>
            {isReady ? children : null}
        </UserContext.Provider>
    );

};

export const useAuth = () => React.useContext(UserContext);







