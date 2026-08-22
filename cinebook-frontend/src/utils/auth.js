export const isLoggedIn=()=>{
    return localStorage.getItem("token")!=null;
};
export const logout=()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
}