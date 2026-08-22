import React, { useEffect, useState } from 'react'
import { activateTheater, allTheatres, deactivateTheater, getActiveTheatre, getTheatreByCity, getTheatreByMinimumScreens, getTheatreByPincode, getTheatreByState, searchTheatreByName } from '../../services/TheaterService';
import { useNavigate } from 'react-router-dom';

const AdminTheatres = () => {
  const[theatres,setTheatres]=useState([]);
  const[loading,setLoading]=useState(true);
  const[search,setSearch]=useState("");
  const[city,setCity]=useState("");
  const[state,setState]=useState("");
  const[pincode,setPincode]=useState("");
  const[status,setStatus]=useState("");
  const[screen,setscreen]=useState("");
  const navigate=useNavigate();
  useEffect(()=>{
    fetchTheatre();
  },[])
  const fetchTheatre=async()=>{
     try{
      const response=await allTheatres();
      console.log(response.data);
      setTheatres(response.data);
     }catch(error){
      console.log(error);

     }finally{
      setLoading(false);
     }
  };

const handleDeactive=async(id)=>{
  const confirmdeactivate=window.confirm("Are you sure you want to delete the theater?");
  if(!confirmdeactivate){
    return; 
  } 
  try{
    console.log("Deactivating Theatre ID:",id);
    const response=await deactivateTheater(id);
    console.log("Deactivate Response:",response.data);
    alert("Theatre Deactivated Successfully");
    await fetchTheatre();
   
  }catch(error){
    console.error("Deactivate Theatre Error:",error.response?.data||error);
    alert(error.response?.data?.message||error.response?.data||"failed to Deactivate the theatre");
  }
}
const handleActivate=async(id)=>{
  const confirmactivate=window.confirm("Are you sure you want to delete the theater?");
  if(!confirmactivate){
    return;
  }
  try{
    console.log("Activating Theatre Id:",id);
    const response=await activateTheater(id);
    console.log("Activate Response:",response.data);
    alert("Theatre Activated Successfully");

 
     await fetchTheatre();
  }catch(error){
        console.error(
            "Activate Theatre Error:",
            error.response?.data || error
        );
    alert(error.response?.data?.message||error.response?.data||"Failed to Activate the theater");
  }
}

const searchbutton=async()=>{
  if(!search.trim()){
    fetchTheatre();
    return;
  }
  try{
    setLoading(true);
    const response=await searchTheatreByName(search);
    console.log(response.data);
    setTheatres(response.data);
  }catch(error){
    console.log(error);
    setTheatres([]);
  }finally{
    setLoading(false);
  }
}
const citybutton=async(value)=>{
  setCity(value);
  if(!value){
    fetchTheatre();
    return;
  }
  try{
    setLoading(true);
    const response=await getTheatreByCity(value);
    console.log(response.data);
    setTheatres(response.data);
  }catch(error){
    console.log(error);
    setTheatres([]);
  }finally{
    setLoading(false);
  }


}
const statebutton=async(value)=>{
  setState(value);
  if(!value){
    setTheatres();
    return;
  }
  try{
    setLoading(true);
    const response=await getTheatreByState(value);
    console.log(response.data);
    setTheatres(response.data);
  }catch(error){
    setLoading(false);
    setTheatres([]);
  }finally{
    setLoading(false);
  }
  
}
const statepincode=async()=>{
  if(!pincode.trim()){
fetchTheatre();
    return;
  }
  try{
    setLoading(true);
    const response=await getTheatreByPincode(pincode);
    console.log(response.data);
    setTheatres(response.data);
  }catch(error){
    console.log(error);
    setTheatres([]);

  }finally{
    setLoading(false);
  }
  

}
const screenbutton=async()=>{
  if(!screen.trim()){
    fetchTheatre();
    return;
  }
  try{
    setLoading(true);
    const response=await getTheatreByMinimumScreens(screen);
    console.log(response.data);
    setTheatres(response.data);
  }catch(error){
    console.log(error);
  }finally{
    setLoading(false);
  }
}

const clearbutton=()=>{
 fetchTheatre();
  setSearch("");
  setCity("");
  setPincode("");
  setState("");
}
  return (
    <div>
      <div  className="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2><strong>Theatres Management</strong></h2>
        <p className="text-muted mb-0">Manage Theatres in BookMovie</p>
      </div>
      <button className="btn btn-primary" onClick={()=>navigate("/admin/theatres/add")}>+Add Theatre</button>
    </div>

    {/*search threatres by name,screen, pincode*/}

 <div className="card shadow-sm mb-4">
  <div className="card-body">
    <h5 className="mb-3"><strong>Search Theatres and Filters</strong></h5>
    <div className="row g-3">
      <div className="col-md-4">
        <label className="form-label">Search Theatre</label>
        <div className="input-group">
          <input type="text" placeholder="Enter Theatre Name" className="form-control" value={search} onChange={(e)=>setSearch(e.target.value)}/>
          <button className="btn btn-outline-primary" onClick={searchbutton}>Search</button>
        </div>
        
      </div>


         <div className="col-md-4">
        <label className="form-label">Pincode</label>
        <div className="input-group">
          <input type="text" className="form-control" placeholder="Enter Pincode..." value={pincode} onChange={(e)=>setPincode(e.target.value)}/>
          <button className="btn btn-outline-primary" onClick={statepincode}>Search</button>
        </div>
      </div>

      <div className="col-md-4">
        <label className="form-label">Screens</label>
          <div className="input-group">
            <input type="number" min="1" className="form-control" placeholder="e.g. 3" onChange={(e)=>setscreen(e.target.value)} value={screen}/>
            <button className="btn btn-outline-primary" onClick={screenbutton}>Search</button>
          </div>
        
      </div>
      <h5 ><strong>Filter Theatres</strong></h5>
      
      {/* filter*/}
  <div className="col-md-5">
        <label className="form-label">City</label>
        <select className="form-select" onChange={(e)=>citybutton(e.target.value)} value={city}>
          <option>All</option>
          <option>Haridwar</option>
             <option>Dehradun</option>
             <option>Pune</option>
             <open>Banglore</open>
        </select>
      </div>

      
      <div className="col-md-5">
        <label className="form-label">State</label>
        <select className="form-select" value={state} onChange={(e)=>statebutton(e.target.value)}>
          <option>All</option>
          <option>Uttarakhand</option>
             <option>Delhi</option>
             <option>Maharastra</option>
             <open>Uttarpradesh</open>
        </select>
      </div>
  <div className="col-md-13 d-flex align-items-end">
                <button className="btn btn-secondary w-100"  onClick={clearbutton}>Clear</button>
               </div>

      


    </div>
  </div>

 </div>
    
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title mb-3"><strong>Theatres</strong></h5>
        {
          loading?(
            <p>Loadin Theatres...</p>
          ):theatres.length===0?(
            <p className="text-muted">No Theatres Found</p>
          ):(
            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>Id</th>
                        <th>Name</th>
                            <th>City</th>
                                <th>State</th>
                                    <th>Pincode</th>
                                        <th>Screens</th>
                                        <th>Address</th>
                                        <th>Status</th>
                                            <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {theatres.map((theatre)=>(
                    <tr key={theatre.id}>
                      <td>{theatre.id}</td>
                       <td>{theatre.name}</td>
                        <td>{theatre.city}</td>
                         <td>{theatre.state}</td>
                          <td>{theatre.pincode}</td>
                           <td>{theatre.totalScreen}</td>
                           <td>{theatre.address}</td>
                      
                                    <td>
                                        {theatre.active ?(
                                            <span className="badge bg-success">Active</span>
                                        ):(
                                            <span className="badge bg-danger">Inactive</span>
                                        )}
                                      </td>

                            <td>
                              <button  className="btn btn-sm btn-warning me-2" onClick={()=>navigate(`/admin/theatres/edit/${theatre.id}`)}>Edit</button>
                              {theatre.active?(
                                <button className="btn btn-sm btn-danger" onClick={()=>handleDeactive(theatre.id)}>Deactivate</button>):(
                                  <button className="btn btn-sm btn-success" onClick={()=>handleActivate(theatre.id)}>Activate</button>
                                
                              )}
                             
                            </td>

                    </tr>
                  ))}
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

export default AdminTheatres