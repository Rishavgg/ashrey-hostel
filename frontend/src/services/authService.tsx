import axios from "axios";
import {handleError} from "../Helpers/ErrorHander.tsx";
import {UserProfileToken} from "../Models/User.ts";

const api = "http://localhost:9090";

export const loginAPI = async (userName: string, password: string) => {
    try {
        // Use POST but append query params in the URL
        const response = await axios.post<UserProfileToken>(`${api}/student/auth/login`, null, {
            params: {
                rollNumber: userName,   // rollNumber passed as query param
                tempPassword: password  // tempPassword passed as query param
            }
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};
export const registerAPI = async (email: string, userName: string, password: string) => {
    try {
        const data = await axios.post<UserProfileToken>(api+"/student/auth/addStudent", {
            email: email,
            userName: userName,
            password: password,
        })
        return data;

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
