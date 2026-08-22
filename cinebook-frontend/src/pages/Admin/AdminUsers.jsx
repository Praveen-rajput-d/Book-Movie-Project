import React, { use, useEffect, useState } from 'react'
import { deleteUser, getAllActiveUsers, getAllDeletedUsers, getAllUsers, restoreUser, searchUserByEmail, searchUserByphone } from '../../services/UsersService';
import { useNavigate } from 'react-router-dom';

const AdminUsers = () => {
    const[users,setUser]=useState([]);
    const[loading,setLoading]=useState(true);
    const[status,setStatus]=useState("All");
    const[search,setsearch]=useState("");
    const[phone,setPhone]=useState("");
    const navigate=useNavigate();
    useEffect(()=>{
        fetchUser();
    },[])
    const fetchUser=async()=>{
        try{
            const response=await getAllUsers();
            console.log(response.data);
            setUser(response.data);
        }catch(error){
            console.log(error);
        }finally{
            setLoading(false);
        }
    }

    const deletebutton=async(userid)=>{
        const confirmedelte=window.confirm("are you sure you want to delete this user");
        if(!confirmedelte){
            return;
        }
        try{
            await deleteUser(userid);
            //remove from active users list
            setUser((prevusers)=>prevusers.map(
                (user)=>user.id===userid ?{...user,status:"DELETED"} :user
            ));
            alert("User Deleted Successfully");
            
        }catch(error){
            console.error("Delete user Error:",error);
            alert(error.response?.data?.message||"failed to delete user");
        }
    }

    const activatebutton=async(userid)=>{
        try{
            const response=await restoreUser(userid);
            setUser((prevusers)=>
            prevusers.map((user)=>
            user.id===userid?response.data:user));
            alert("User Restored Successfully");
        }catch(error){
            console.log("Restore User error:",error);
            alert(error.response?.data?.message||"failed to restore user");
        }
   
    }

    const handleFilterbutton=async(value)=>{
        setsearch("");
        setStatus(value);
        
        try{
           

            setLoading(true);
             let response;
             if(value==="All"){
                response=await  getAllUsers();
             }else if(value==="Active") {
                response=await getAllActiveUsers();
             }else if(value==="Deleted"){

                response=await getAllDeletedUsers();
             }


             console.log(response.data);
             setUser(response.data);
        }catch(error){
            console.log(error);
            setUser([]);
        }finally{
            setLoading(false);
        }
    }

    const handleSearch=async()=>{
        setStatus("");
        if(!search.trim()){
            fetchUser();
            return;
        }
        try{
            setLoading(true);
            const response=await searchUserByEmail(search);
            console.log(response.data);
            setUser([response.data]);
        }catch(error){
            console.log(error);
            setUser([]);
        }finally{
            setLoading(false);
        }

    }
    const handlesearchphone=async()=>{
        setsearch("");
        setStatus("");
        if(!phone.trim()){
            fetchUser();
            return;
        }
        try{
            setLoading(true);
            const response=await searchUserByphone(phone);
            console.log(response.data);
            setUser([response.data]);

        }catch(error){
        console.log(error);
        setUser([]);
        }finally{
            setLoading(false);
        }
    }
    const handleClearbutton=()=>{
        setsearch("");
        setStatus("");
        setPhone("");
        fetchUser();
    }
    const handleRefreshbutton=()=>{
        setsearch("");
        setStatus("");
       setPhone("");
        fetchUser();
    }
    
  return (
    <div>
       <div className="d-flex justify-content-between align-items-center">
        <div>
            <h2><strong>User Management</strong></h2>
            <p className="text-muted  mb-0">Manage All users in BookMovie</p>
        </div>
        <button className="btn btn-primary" onClick={handleRefreshbutton}>Refresh</button>
       </div>
       <div className="card shadow-sm">
        <div className="card-body">
            <h5 className="card-title "><strong>Search and Filter Users</strong></h5>
            <div className="row g-3">
                <div className="col-md-6">
                    <label className="form-label">Search Email</label>
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="eg. abc@gmail.com" value={search} onChange={(e)=>setsearch(e.target.value)}/>
                        <button className="btn btn-outline-primary" onClick={handleSearch}>Search</button>
                    </div>

                </div>

                      <div className="col-md-6">
                    <label className="form-label">Search Phone</label>
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Enter Phone Number" value={phone} onChange={(e)=>setPhone(e.target.value)}/>
                        <button className="btn btn-outline-primary" onClick={handlesearchphone}>Search</button>
                    </div>
                </div>

                <div className="col-md-12">
                    <label className="form-label">Status</label>
                    <select className="form-select" value={status} onChange={(e)=>handleFilterbutton(e.target.value)}>
                        <option value="All">ALL</option>
                        <option value="Active">Active</option>
                        <option  value="Deleted">Deleted</option>
                        
                    </select>
                </div>
                <div className="col-md-12 d-flex align-items-end">
                    <button className="btn btn-secondary w-100" onClick={handleClearbutton}>Clear</button>
                </div>
            </div>
        </div>
       </div>
     <div className="card shadow-sm">
        <div className="card-body">
            <h5 className="card-title mb-0"><strong>Users</strong></h5>
            {
                loading?(
                    <p>Loading Users....</p>
                ):users.length===0?(
                    <p>No Users Found</p>
                ):(
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover align-middle">
                             <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                 <th>First Name</th>
                                  <th>Last Name</th>
                                   <th>Email</th>
                                    <th>Phone</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                                {
                                    users.map((user)=>
                                        <tr key={user.id}>
                                            <td>{user.id}</td>
                                             <td>{user.firstName}</td>
                                             <td>{user.lastName}</td>
                                             <td><strong>{user.email}</strong></td>
                                             <td>{user.phone}</td>
                                             <td>
                                                <span className="badge bg-primary">{user.role}</span>
                                             </td>
                                          <td>
                                        {user.status==='DELETED'?(
                                            <span className="badge bg-danger">DELETED</span>
                                        ):user.status==='ACTIVE'?(
                                            <span className="badge bg-success">ACTIVE</span>
                                        ):(
                                            <span className="badge bg-primary text-dark">Inactive</span>
                                        )
                                        }
                                    </td>
                                             <td>
                                                      <div className="d-flex gap-2">
                                                        <button className="btn btn-sm btn-warning" onClick={()=>navigate(`/admin/users/edit/${user.id}`)}>Edit</button>
                                                        {
                                                            user.status==="ACTIVE"&&(
                                                                <button type="button" className="btn btn-sm btn-danger" onClick={()=>deletebutton(user.id)} >Delete</button>
                                                            )
                                                        }

                                                        {
                                                            user.status==="DELETED"&&(
                                                                <button type="button" className="btn btn-sm btn-success"  onClick={()=>activatebutton(user.id)} >Activate</button>
                                                            )
                                                        }
                                                      </div>
                                             </td>
                                        </tr>)
                                }
                        
                        </tbody>

                        </table>
                       
                          
                        </div>
                )
            }
        </div>

     </div>

    
      
      
    </div>
  )
}

export default AdminUsers