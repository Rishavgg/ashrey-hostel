import {UserProfile} from "../Models/User.ts";
import React, {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {loginAPI, logoutAPI, registerAPI, resetAPI} from "../services/authService.tsx";
import axios from "axios";


type UserContextType = {
    user: UserProfile | null;
    token: string | null;
    registerUser: (email: string, userName: string, password: string) => Promise<void>;
    loginUser: (userName: string, password: string) => Promise<void>;
    logoutUser: () => void;
    isLoggedIn: () => boolean;
    resetUser: (userName: string, oldPassword: string, password: string) => void;
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
        const res = await registerAPI(email, userName, password);
        try {
            if (res?.data) {
                localStorage.setItem("token", res.data.token);
                const userObj = {
                    userName: res.data.userName,
                    message: res.data.message,
                };
                localStorage.setItem("user", JSON.stringify(userObj));
                setToken(res.data.token);
                setUser(userObj);
                toast.success("Registered successfully.");
                navigate("/dashboard");
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast.warning("Server error occurred");
        }
    };

    const loginUser = async (userName: string, password: string) => {
        try {
            const res = await loginAPI(userName, password);
            if (res?.body) {
                localStorage.setItem("token", res.body);
                const userObj = {
                    userName,
                    message: res?.message || "",
                };
                localStorage.setItem("user", JSON.stringify(userObj));
                setToken(res.body);
                setUser(userObj);
                toast.success("Login successfully.");
                navigate("/student-dashboard");
            } else {
                toast.warning(res?.message);
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast.warning("Server error occurred");
        }
    };


    const isLoggedIn = () => {
        return user !== null && token !== null;
    };


    const logoutUser = async () => {
        try {
            if (token) {
                const res = await logoutAPI(token);
                if (res?.message === "Logout successful") {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    setUser(null);
                    setToken(null);
                    delete axios.defaults.headers.common.Authorization;
                    toast.success("Logout successful.");
                    navigate("/student-login");
                }
            }
        } catch (error) {
            console.error("Logout failed: ", error);
            toast.warning("Logout failed.");
        }
    };

    const resetUser = async (userName: string, oldPassword:string, password: string) => {
        try {
            const res = await resetAPI(userName, oldPassword, password);
            if (res?.message === "Password updated successfully") {
                toast.success("Password reset successfully.");
                navigate("/student-login");
            } else {
                toast.warning(res?.message);
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast.warning("Server error occurred");
        }
    };



    return (
        <UserContext.Provider value={{loginUser, user, token, logoutUser, isLoggedIn, registerUser, resetUser}}>
            {isReady ? children : null}
        </UserContext.Provider>
    );

};

export const useAuth = () => React.useContext(UserContext);







