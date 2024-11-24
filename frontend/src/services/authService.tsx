import axios from "axios";
import {handleError} from "../Helpers/ErrorHander.tsx";
import {RegisterUser, ResetPasswordProfile, UserProfileToken} from "../Models/User.ts";

const api = "http://localhost:9090";

export const loginAPI = async (userName: string, password: string) => {
    try {
        const response = await axios.post<UserProfileToken>(`${api}/student/auth/login`,  {
            rollNumber: userName,
            password: password
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const registerAPI = async (name: string, userName: string, email: string, contact: string) => {
    try {
        const response = await axios.post<RegisterUser>(api+"/student/auth/addStudent", {
            name: name,
            rollNumber: userName,
            email: email,
            contact: contact,
        });
        return response.data;

    } catch (error) {
        handleError(error)
    }
};

export const logoutAPI = async (token: string) => {
    try {
        const response = await axios.post(api + "/student/auth/logout", null, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        handleError(error);
        throw new Error('Logout failed');
    }
};

export const resetAPI = async (userName: string, oldPassword: string, password: string) => {
    try {
        const response = await axios.post<ResetPasswordProfile>(`${api}/student/auth/reset-password`,  {
            rollNumber: userName,
            oldPassword: oldPassword,
            password: password
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};