import axiosInstance from "./axiosinstance";

export const getDashBoard = () => {
    return axiosInstance.get("/api/dashboard");
};

export const getMostBookedMovie = () => {
    return axiosInstance.get("/api/dashboard/most-booked-movie");
};

export const getHighestRevenueMovie = () => {
    return axiosInstance.get("/api/dashboard/highest-revenue-movie");
};

export const getBookingStatusReport = () => {
    return axiosInstance.get("/api/dashboard/booking-status-report");
};

export const getPaymentStatusReport = () => {
    return axiosInstance.get(
        "/api/dashboard/booking-Payment-status-report"
    );
};