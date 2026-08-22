import axios from "axios";
import axiosInstance from "./axiosinstance";

export const getMyTickets=()=>{
    return axiosInstance.get("/api/tickets/my-tickets");
};

export const getTicketById=(id)=>{
    return axiosInstance.get(`/api/tickets/${id}`);
}

export const allTickets=()=>{
    return axiosInstance.get("/api/tickets/all");
}
export const getTicketByTicketId=(ticketNumber)=>{
    return axiosInstance.get(`/api/tickets/number/${ticketNumber}`);
}

export const getTicketByBookingId=(bookingId)=>{
    return axiosInstance.get(`/api/tickets/booking/${bookingId}`);
}
export const getActivateTickets=()=>{
    return axiosInstance.get("/api/tickets/ActiveTickets");
}
export const getTicketsByMovieId=(movieId)=>{
    return axiosInstance.get(`/api/tickets/movie/${movieId}`);
}

export const getTicketsBytheatreid=(theatreId)=>{
    return axiosInstance.get(`/api/tickets/theatre/${theatreId}`);



}
export const getTicketByShowDate=(showDate)=>{
    return axiosInstance.get(`/api/tickets/showDate/${showDate}`);
}
