import React, { useEffect, useState } from 'react'
import { activateScreen, allScreens, deactivateScreen, getActiveScreens, getAllScreen, getNotActiveScreen, searchByScreenType, searchScreen } from '../../services/ScreenService';
import { useNavigate } from 'react-router-dom';
import { searchByScreen } from '../../services/showService';

const AdminScreen = () => {
    const[screens,setScreens]=useState([]);
    const[loading,setLoading]=useState(true);
    const[search,setSearch]=useState("");
    const[status,setstatus]=useState("All")
    const[type,setType]=useState("");
    const navigate=useNavigate();
    useEffect(()=>{
        fetchScreen();
    },[])
    const fetchScreen= async()=>{
        try{
            const response=await allScreens();
            console.log(response.data);
            setScreens(response.data);
        }catch(error){
            console.log(error);
        }finally{
            setLoading(false);
        }
    }

    const deactivatebutton=async(id)=>{
        const confirmdelete=window.confirm("Are you sure to deactivate screen");
        if(!confirmdelete){
            return;
        }
        try{
            await deactivateScreen(id);
            alert("Screen Deactivated Successfully");
            fetchScreen();
        }catch(error){
            console.log(error);
            alert("failed to deactivate the Screen");
        }
    }
    const activatebutton=async(id)=>{
        const confirmactivate=window.confirm("Are you sure you want to activate this Screen?");
        if(!confirmactivate){
            return;
        }
        try{
            await activateScreen(id);
            alert("Screen Activated Successfully");
            fetchScreen();
        }catch(error){
            console.log(error);
            alert("failed to activate the screen");
        }
    }
    
const searchbutton=async()=>{
    setType("");
    setstatus("");
    if(!search.trim()){
        fetchScreen();
        return;
    }
    try{
        setLoading(true);
        const response=await searchScreen(search);
        console.log(response.data);
        setScreens(response.data);
    }catch(error){
        console.log(error);
        setScreens([]);
    }finally{
        setLoading(false);
    }
}
const  filterbyStatus=async(value)=>{
    setSearch("");
    setType("");

    setstatus(value);
   try{
    let response;
    if(value==="All"){
        response=await allScreens();
    }else if(value==="Active"){
        response=await getActiveScreens();
    }else if(value==="Inactive"){
        response=await getNotActiveScreen();
    }
    console.log(response.data);
    setScreens(response.data);
   }catch(error){
    console.log("Filter Screen Error:",error);
    setScreens([]);
   }
}
const handlesearchByscreenType=async()=>{
    setSearch("");
    setstatus("");

    if(!type.trim()){
        fetchScreen();
        return;
    }
    try{
        setLoading(true);
        const response=await searchByScreenType(type);
        console.log(response.data);
        setScreens(response.data);
    }catch(error){
        console.log(error);
        setScreens([]);
    }finally{
        setLoading(false);
    }
}
const clearbutton=()=>{
    setSearch("");
    fetchScreen();
    setType("");
    setstatus("");
}

//  const handleSearchKeyDown=(e)=>{
//     if(e.key==="Enter"){
//         searchbutton();
//     }

// }

  return (
    <div>
        <div className="d-flex justify-content-between align-items-center">
            <div>
                          <h3><strong>Screen Management</strong></h3>
            <p className="text-muted">Add screen in BookMovie</p>  
            </div>
           <button className="btn btn-primary" onClick={()=>navigate("/admin/screens/add")}>+Add Screen</button>
        </div>
          
{/*Search and Filter section*/}
<div className="card shadow-sm">
    <div className="card-body">
        <h5 className="mb-3"><strong>Search Screens and Filters</strong></h5>
        <div className="row g-3">
            <div className="col-md-6">
                <label className="form-label">Search Screen</label>
                  <div className="input-group">
                <input type="text" placeholder="Enter Screen Name" className="form-control" value={search} onChange={(e)=>setSearch(e.target.value)}/>
                <button className="btn btn-outline-primary" onClick={searchbutton}>Search</button>
            </div>
                   </div>

 <div className="col-md-6">
                <label className="form-label">Screen Type</label>
                  <div className="input-group">
                <input type="text" placeholder="Enter Screen Type" className="form-control" value={type} onChange={(e)=>setType(e.target.value)}/>
                <button className="btn btn-outline-primary" onClick={handlesearchByscreenType} >Search</button>
            </div>
            
                   </div>
 <div className="col-md-12">
                    <label className="form-label">Status</label>
                    <select className="form-select" value={status} onChange={(e)=>filterbyStatus(e.target.value)}>
                        <option value="All">All</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                   </div>
                  
                   <div className="col-md-12 d-flex align-items-end">
                    <button className="btn btn-secondary w-100" onClick={clearbutton}>Clear</button>
                   </div>
          
        </div>

       
    </div>
</div>


       <div className="card shadow-sm">
        <div className="card-body">
            <h5><strong>Screens</strong></h5>
            {
                loading?(
                    <p>loading Screens...</p>
                ):screen.length===0?(
                    <p>No Screens Found</p>
                ):(
                     <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>Id</th>
                        <th>Screen Name</th>
                            <th>Screen Type</th>
                                <th>Capacity</th>
                                <th>TheaterId</th>
                                    <th>Theater Name</th>
                                        <th>Status</th>
                             <th>Actions</th>
                                           
                  </tr>
                </thead>
                <tbody>
                    {
                        screens.map((screen)=>(
                            <tr key={screen.id}>
                                <td>{screen.id}</td>
                                  <td>{screen.screenName}</td>
                                    <td>{screen.screenType}</td>
                                      <td>{screen.capacity}</td>
                                      <td>{screen.theaterId}</td>
                                      <td>{screen.theaterName}</td>
                                      <td>
                                        {screen.active?(
                                            <span className="badge bg-success">Active</span>
                                        ):(
                                            <span className="badge bg-danger">InActive</span>
                                        )}
                                      </td>
                                      <td>
                                        <button className="btn btn-sm btn-warning me-2" onClick={()=>navigate(`/admin/screens/edit/${screen.id}`)}>Edit</button>
                                        {screen.active?(
                                            <button className="btn btn-sm btn-danger"  onClick={ ()=>deactivatebutton(screen.id)}>Deactivate</button>
                                        ):(
                                            <button className="btn btn-sm btn-success" onClick={()=>activatebutton(screen.id)}>Activate</button>
                                        )}
                                      </td>
                            </tr>
                        ))
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

export default AdminScreen