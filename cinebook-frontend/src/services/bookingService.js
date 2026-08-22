import axiosInstance from "./axiosinstance";

export const createBooking=(bookingdata)=>{
    return axiosInstance.post("/api/booking",bookingdata);
}
export const getMyBookings=()=>{
      return axiosInstance.get("/api/booking/my-bookings");
}

export const cancelBooking=(bookingId)=>{
    return axiosInstance.put(`/api/booking/cancel/${bookingId}`);
}

export const getBookingById=(bookingId)=>{
    return axiosInstance.get(`/api/booking/${bookingId}`);
}

export const searchBooking=(bookingNumber)=>{
    return axiosInstance.get(`/api/booking/search/${bookingNumber}`);
}
export const searchByBookingStatus=(bookingStatus)=>{
    return axiosInstance.get(`/api/booking/status/${bookingStatus}`);
}
export const allBookings=()=>{
    return axiosInstance.get("/api/booking/all");
}
