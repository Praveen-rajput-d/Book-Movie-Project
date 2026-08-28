import axiosInstance from "./axiosInstance";

export const getMyProfile=()=>{
    return axiosInstance.get("/api/users/me");
}

export const updateProfile=(data)=>{
    return axiosInstance.put("/api/users/update-profile",data);
}



export const deleteAccount=()=>{
    return axiosInstance.delete("/api/users/delete-account");
}
export const changepassoword=(data)=>{
    return axiosInstance.put("/api/users/change-password",data)
}