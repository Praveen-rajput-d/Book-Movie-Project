import axiosInstance from "./axiosInstance";

export const downloadTicket=(ticketId)=>{
    return axiosInstance.get(`/api/pdf-generate/${ticketId}/download`,
        {
            responseType:"blob"
        }
    );

}