import axiosInstance from "./axiosinstance";

export const getMyProfile=()=>{
return axiosInstance.get("/api/users/me");
}
export const updateProfile=(user)=>{
    return axiosInstance.put("/api/users/update-profile",user);
}
export const changePassword=(request)=>{
return axiosInstance.put("/api/users/change-password",request);
}
export const deleteAccount=()=>{
    return axiosInstance.delete("/api/users/delete-account");
    
}


//admin 

export const getAllUsers=()=>{
    return axiosInstance.get("/api/users/all");
}

export const restoreUser=(userid)=>{
    return axiosInstance.put(`/api/users/${userid}/restore`);
}

export const deleteUser=(userid)=>{
    return axiosInstance.put(`/api/users/${userid}/delete`);

}

export const updateUserById=(userid,responseDto)=>{
    return axiosInstance.put(`/api/users/${userid}/update`,responseDto);
}
export const getUserByid=(userid)=>{
    return axiosInstance.get(`/api/users/${userid}/byuserid`);
}
export const getAllActiveUsers=()=>{
    return axiosInstance.get("/api/users/allactive");
}

export const getAllDeletedUsers=()=>{
    return axiosInstance.get("/api/users/alldeleteuser");
}
export const searchUserByEmail=(Email)=>{
    return axiosInstance.get(`/api/users/user/${Email}`);
}

export const searchUserByphone=(phone)=>{
    return axiosInstance.get(`/api/users/user/phone/${phone}`);
}