import axiosInstance from "./axiosInstance";

export const addScreen=(screen)=>{
    return axiosInstance.post("/api/screen",screen);
}
export const getAllScreen=(page=0,size=5)=>{
    return axiosInstance.get(`/api/screen?page=${page}&size=${size}`);

}
export const allScreens=()=>{
    return axiosInstance.get("/api/screen/all");
}

export const getScreenByid=(id)=>{
    return axiosInstance.get(`/api/screen/${id}`);
}

export const updateScreen=(id,screen)=>{
    return axiosInstance.put(`/api/screen/${id}`,screen);
}

export const activateScreen=(id)=>{
    return axiosInstance.put(`/api/screen/${id}/activate`);
}
export const deactivateScreen=(id)=>{
    return axiosInstance.put(`/api/screen/${id}/deactivate`);
}

export const searchScreen=(screenName)=>{
    return axiosInstance.get(`/api/screen/search/${screenName}`);

}

export const searchByScreenType=(screenType)=>{
    return axiosInstance.get(`/api/screen/search/type/${screenType}`);
}

export const countActiveScreens=()=>{
    return axiosInstance.get("/api/screen/count/active");
}

export const getActiveScreens=()=>{
    return axiosInstance.get("/api/screen/active");
}

export const getNotActiveScreen=()=>{
    return axiosInstance.get("/api/screen/Inactive");
}

export const getScreensByTheater=(theaterId)=>{
    return axiosInstance.get(`/api/screen/theater/${theaterId}`);
}