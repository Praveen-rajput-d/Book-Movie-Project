import React, { useEffect, useState } from 'react'
import { AiFillSketchSquare } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserByid, updateUserById } from '../../services/UsersService';

const EditUsers = () => {
    const navigate=useNavigate();
    const {id}=useParams();
    const[user,setUser]=useState({
        firstName:"",
        lastName:"",
        email:"",
        phone:""
    });
    const[loading,setLoading]=useState(true);
    const[saving,setSaving]=useState(false);
    useEffect(()=>{
        fetchUser();
    },[id]);
    const fetchUser=async()=>{
        try{
            setLoading(true);
            const response=await getUserByid(id);
            console.log(response.data);
            setUser({firstName:response.data.firstName||"",
                lastName:response.data.lastName||"",
                email:response.data.email||"",
                phone:response.data.phone||""}
            );
        }catch(error){
            console.log("Get User Error:",error.response?.data||error);
            alert(error.response?.data?.message||"Failed to load User");
        }finally{
            setLoading(false);
        }

    }
    const handleChange=(e)=>{
        const{name,value}=e.target;
        setUser((prev)=>({
            ...prev,[name]:value
        }));

    };
    const handlesubmit=async(e)=>{
        e.preventDefault();
        try{
            setSaving(true);
            const response=await updateUserById(id,user);
            console.log(response.data);
            alert("User Updated Succesfully");
            navigate("/admin/users");
        }catch(error){
            console.log(error);
            alert("failed to update Users Information");
        }finally{
            setSaving(false);
        }
    }

  return (
    <div>
        <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
                <h2><strong>Edit User</strong></h2>
                <p className="text-muted">Update User Information</p>
            </div>
            <button className="btn btn-secondary" onClick={()=>navigate("/admin/users")}>Back</button>
        </div>
        <div className="card shadow-sm">
            <div className="card-body">
                <form onSubmit={handlesubmit}>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">First Name</label>
                            <input type="text" className="form-control" name="firstName" value={user.firstName} onChange={handleChange} required/>

                        </div>
                         <div className="col-md-6">
                            <label className="form-label">Last Name</label>
                            <input type="text" className="form-control" name="lastName" value={user.lastName} onChange={handleChange} required/>

                        </div>
                         <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" name="email" value={user.email} onChange={handleChange}  required/>

                        </div>

                         <div className="col-md-6">
                            <label className="form-label">Phone</label>
                            <input type="text" className="form-control" name="phone" value={user.phone} onChange={handleChange} maxLength="10" required/>

                        </div>

                        <div className="col-12 mt-4">
                            <button className="btn btn-primary me-2" disabled={saving}>{saving?"updating...":"Update User"}</button>
                            <button className="btn btn-secondary" onClick={()=>navigate("/admin/users")}>Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default EditUsers