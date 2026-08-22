import axios from "axios";

const BASE_URL = "http://localhost:8080/api/auth";

export const registerUser = (user) => {
    return axios.post(`${BASE_URL}/register`, user);
};

export const loginUser = (loginData) => {
    return axios.post(`${BASE_URL}/login`, loginData);
};