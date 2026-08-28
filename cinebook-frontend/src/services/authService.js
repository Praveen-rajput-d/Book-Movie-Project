import axiosInstance from "./axiosInstance";

export const registerUser = (user) => {
    return axiosInstance.post("/api/auth/register", user);
};

export const loginUser = (loginData) => {
    return axiosInstance.post("/api/auth/login", loginData);
};