import axiosInstance from "./axiosinstance";

export const getSeatsByShow=(showId)=>{
    return axiosInstance.get(`/api/seat/show/${showId}`);
}