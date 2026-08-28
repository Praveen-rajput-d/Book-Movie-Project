import axiosInstance from "./axiosInstance";

export const allTheatres=()=>{
    return axiosInstance.get("/api/theater/all");
}

export const getTheatreById=(id)=>{
    return axiosInstance.get(`/api/theater/${id}`);
}

export const addTheatre=(theatre)=>{
    return axiosInstance.post("/api/theater",theatre);
}

export const updateTheater=(id,theatre)=>{
    return axiosInstance.put(`/api/theater/${id}`,theatre);
}

export const deactivateTheater=(id)=>{
    return axiosInstance.put(`/api/theater/${id}/deactivate`);
}

export const activateTheater=(id)=>{
    return axiosInstance.put(`/api/theater/${id}/activate`);
}

export const searchTheatreByName=(name)=>{
    return axiosInstance.get(`/api/theater/search/${name}`);
}
export const getTheatreByCity=(city)=>{
    return axiosInstance.get(`/api/theater/city/${city}`);
}

export const getTheatreByState=(state)=>{
    return axiosInstance.get(`/api/theater/state/${state}`);
}

export const getActiveTheatre=()=>{
    return axiosInstance.get('/api/theater/running');
}

export const getTheatreByPincode=(pincode)=>{
    return axiosInstance.get(`/api/theater/pincode/${pincode}`);
}
export const getTheatreByMinimumScreens=(totalScreen)=>{
    return axiosInstance.get(`/api/theater/screens/${totalScreen}`);
}

export const countActiveTheaters=()=>{
    return axiosInstance.get("/api/theater/count");
}