import axiosInstance from "./axiosInstance";

export const getSeatsByShow=(showId)=>{
    return axiosInstance.get(`/api/seat/show/${showId}`);
}