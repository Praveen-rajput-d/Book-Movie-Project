import { Navigate } from "react-router-dom";

const adminprotectedRoute=({children})=>{
    const token=localStorage.getItem("token");
    const role=localStorage.getItem("role");

    //if token is not prsent or not valid
  if(!token){
    return <Navigate to="/login" replace/>
  }
   //now token is present but we not allow to login as admin
   if(role!=="ROLE_ADMIN"){
    return <Navigate to="/" replace/>
   }

   return children;

};
export default adminprotectedRoute;