import axiosInstance from "./axiosinstance";

export const getShowById=(showId)=>{
    return axiosInstance.get(`/api/show/${showId}`);
}
export const addShow=(show)=>{
    return axiosInstance.post("/api/show",show);
}

export const getAllShow=(page=0 , size=5)=>{
    return axiosInstance.get(`/api/show?page=${page}&size=${size}`);

}

export const updateShow=(id,show)=>{
    return axiosInstance.put(`/api/show/${id}`,show);
}

export const deleteShow=(id)=>{
    return axiosInstance.put(`/api/show/deactivate/${id}`);
}

export const activateShows=(id)=>{
    return axiosInstance.put(`/api/show/activate/${id}`);
}

export const searchBymovieid=(movieId)=>{
    return axiosInstance.get(`/api/show/movie/${movieId}`);

}

export const searchByScreen=(screenId)=>{
    return axiosInstance.get(`/api/show/screen/${screenId}`);
}

export const getShowsByDate=(showDate)=>{
    return axiosInstance.get(`/api/show/date/${showDate}`);
}

export const getShowsByStartTime=(time)=>{
    return axiosInstance.get(`/api/show/time/${time}`);
}
export const getActiveShows=()=>{
    return axiosInstance.get("/api/show/active");
}
export const getUpcomingshows=()=>{
    return axiosInstance.get("/api/show/upcoming");
}

export const getTodayShows=()=>{
    return axiosInstance.get("/api/show/today");

}

export const countActiveShows=()=>{
    return axiosInstance.get("/api/show/count/active");
}
export const allShows=()=>{
    return axiosInstance.get("/api/show/all");
}