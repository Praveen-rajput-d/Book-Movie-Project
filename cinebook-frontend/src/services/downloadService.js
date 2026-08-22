import axiosInstance from "./axiosinstance";

export const downloadTicket=(ticketId)=>{
    return axiosInstance.get(`/api/pdf-generate/${ticketId}/download`,
        {
            responseType:"blob"
        }
    );

}