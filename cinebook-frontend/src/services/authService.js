import axios from "axios";

const BASE_URL = "https://book-movie-project.onrender.com";

export const registerUser = (user) => {
    return axios.post(`${BASE_URL}/register`, user);
};

export const loginUser = (loginData) => {
    return axios.post(`${BASE_URL}/login`, loginData);
};