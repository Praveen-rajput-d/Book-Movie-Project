import React, { useEffect, useState } from 'react'
import { activateShows, allShows, deleteShow, getActiveShows, getShowById, getShowsByDate, getShowsByStartTime, getTodayShows, getUpcomingshows, searchBymovieid, searchByScreen } from '../../services/showService';
import { useNavigate } from 'react-router-dom';
import { SiElement } from 'react-icons/si';

const AdminShows = () => {
    const[shows,setshows]=useState([]);
    const[loading,setLoading]=useState(true);
    const[movieId,setMovieId]=useState("");
    const[screenId,setScreenId]=useState("");
    const[showDate,setShowDate]=useState("");
    const[showTime,setShowTime]=useState("");
    const[filterType,setFilterType]=useState("all");

    const navigate=useNavigate();
    useEffect(()=>{
        fetchShows();
    },[]);

    const fetchShows=async()=>{
       try{
          const response=await allShows();
          console.log(response.data);
          setshows(response.data);
       }catch(error){
        console.log(error);

       }finally{
        setLoading(false);
       }
    }
  


    const deactivateshow=async(id)=>{
        const confirmdelete=window.confirm("Are you sure you want to deactivate Show");
        if(!confirmdelete){
            return;
        }
        try{
            await deleteShow(id);
            alert("Show Deactivate Successfully");
            fetchShows();
           
        }catch(error){
            console.log(error);
        alert("failed to Deactivate Show");
        }
    }
    const activateButton=async(id)=>{
        const confirmdeactivate=window.confirm("Are you sure You want to activate Show");
        if(!confirmdeactivate){
            return;
        }
        try{
            await activateShows(id);
            alert("show Activate Successfully");
           fetchShows();
        }catch(error){
            console.log(error);
            alert("failed to activate Show");
        }

    }
    const searchbutton=async()=>{
        setFilterType("");
        setScreenId("");
        setShowDate("");
        setShowTime("");
  if(!movieId.trim()){
    fetchShows();
    return;

  }
 
  try{
    setLoading(true);
    const response=await searchBymovieid(movieId);
    console.log(response.data);
    setshows(response.data);
  }catch(error){
    console.log(error);
    setshows([]);
  }finally{
    setLoading(false);
  }

    }
    const handleSearchscreen=async()=>{
        setMovieId("");
        setShowTime("");
        setShowDate("");
        setFilterType(
            ""
        );
        if(!screenId){
            fetchShows();
            return;
        }
        try{
            setLoading(true);
            const response=await searchByScreen(screenId);
            console.log(response.data);
            setshows(response.data);
        }catch(error){
            console.log(error);
            setshows([]);
        }finally{
            setLoading(false);
        }
    }

    const handleshowdate=async()=>{
        //clear other search fileds
        setMovieId("");
        setScreenId("");
        setShowTime("");
        setFilterType("all")
        if(!showDate){
            fetchShows();
            return;
        }
        try{
            setLoading(true);
            const response =await getShowsByDate(showDate);
            console.log(response.data);
            setshows(response.data);
        }catch(error){
            console.log(error);
            setshows([]);
        }finally{
            setLoading(false);
        }
    
    }

    const handleShowTime=async()=>{
          setMovieId("");
        setScreenId("");
       setShowDate("")
        setFilterType("all")
        if(!showTime){
            fetchShows();
            return;
        }
        try{
            setLoading(true);
            const response=await getShowsByStartTime(showTime);
            console.log(response.data);
            setshows(response.data);
        }catch(error){
            console.log(error);
            setshows([]);
        }finally{
            setLoading(false);
        }
    }
    
    const handleFilter=async(value)=>{
          setMovieId("");
        setScreenId("");
        setShowTime("");
      setShowDate("")

        setFilterType(value);
        try{
            setLoading(true);
            let response;
            if(value==="active"){
                response=await getActiveShows();
            }else if(value==="upcoming"){
                response=await getUpcomingshows();
            }else if(value==="today"){
                response=await getTodayShows();
            }else{
                response=await allShows();
            }

            console.log(response.data);
            setshows(response.data);
        }catch(error){
            console.log(error);
            setshows([]);
        }finally{
            setLoading(false);
        }
    }

    const handleClear=()=>{
        setMovieId("");
        setScreenId("");
        setShowDate("");
        setShowTime("");
        setFilterType("all");
        fetchShows();
    }

  return (
    <div>
        <div className="d-flex justify-content-between align-items-center">
            <div>
         <h2><strong>Shows Management</strong></h2>
        <p className="text-muted">Add shows in BookMovie</p>   
         
            </div>
             
   <button className="btn btn-primary" onClick={()=>navigate("/admin/shows/add")}>+Add Shows</button>
        </div>

{/*Search and Filter part*/}

<div className="card shadow-sm">
    <div className="card-body">
        <h5 className="card-title"><strong>Search and Filter Shows</strong></h5>
        <div className="row g-3">
            <div className="col-md-6">
                <label className="form-label">Search Shows By Movie ID</label>
                <div className="input-group">
                    <input type="number" placeholder="Enter Movie Id" className="form-control" onChange={(e)=>setMovieId(e.target.value)} value={movieId}/>
                    <button className="btn btn-outline-primary"  onClick={searchbutton}>Search</button>
                </div>
            </div>

   <div className="col-md-6">
                <label className="form-label">Search Shows By Screen ID</label>
                <div className="input-group">
                    <input type="number" placeholder="Enter Screen ID" className="form-control" onChange={(e)=>setScreenId(e.target.value)} value={screenId}/>
                    <button className="btn btn-outline-primary"  onClick={handleSearchscreen}>Search</button>
                </div>
            </div>

            <div className="col-md-6">
                <label className="form-label"> Search By Show Date</label>
                <div className="input-group">
                    <input type="date" placeholder="e.g 23/08/2003"  className="form-control" value={showDate} onChange={(e)=>setShowDate(e.target.value)}/>
                    <button className="btn btn-outline-primary" onClick={handleshowdate}>Search</button>
                </div>
            </div>

            <div className="col-md-6">
                <label className="form-label"> Search By Show Time</label>
                <div className="input-group">
                    <input type="time" placeholder="eg. 6pm" className="form-control" value={showTime} onChange={(e)=>setShowTime(e.target.value)}/>
                    <button className="btn btn-outline-primary" onClick={handleShowTime}>Search</button>
                </div>
            </div>

            <div className="col-md-12">
                <label className="form-label">
                    Show Status
                </label>
                <select className="form-select" value={filterType} onChange={(e)=>handleFilter(e.target.value)}>
                    <option value="all">All</option>
                     <option value="active">Active Shows</option>
                      <option value="upcoming">Upcoming Shows</option>
                       <option value="today">Today's Shows</option>
                    
                    
                    

                </select>
            </div>
            <div className="col-md-12 d-flex align-items-end">
                <button className="btn btn-secondary w-100" onClick={handleClear}>Clear Search</button>
            </div>

        </div>
    </div>
</div>



        <div className="card shadow-sm">
            <div className="card-body">
                <h2 className="card-title m-0"><strong>Shows</strong></h2>
                {
                    loading?(
                        <p>Loading Shows...</p>
                    ):shows.length===0?(
                        <p>No Shows Found</p>
                    ):(
                        <div className="table-responsive">
                            <table className="table table-bordered table-hover align-middle">
                                <thead className="table-dark">
                                    <tr>
                                        <th>Id</th>
                                           <th>Movie</th>
                                              <th>Theatre</th>
                                                 <th>Screen</th>
                                                    <th>Date</th>
                                                       <th>Start Time</th>
                                                          <th>End Time</th>
                                                             <th>TicketPrice</th>
                                                                <th>Available Seats</th>
                                                                   <th>Status</th>
                                                                   <th>Actions</th>
                                                                   
                                    </tr>
                                   
                                </thead>
                                 <tbody>
                                        {
                                            shows.map((show)=>(
                                                <tr key={show.id}>
                                                    <td>{show.id}</td>
                                                    <td>{show.movieName}</td>
                                                    <td>{show.theaterName}</td>
                                                    <td>{show.screenName}</td>
                                                    <td>{show.showDate}</td>
                                                    <td>{show.startTime}</td>
                                                    <td>{show.endTime}</td>
                                                    <td> ₹{show.ticketPrice}</td>
                                                    <td>{show.availableSeats}</td>
                            
                                                  <td>
                                        {show.isActive ?(
                                            <span className="badge bg-success">Active</span>
                                        ):(
                                            <span className="badge bg-danger">Inactive</span>
                                        )}
                                      </td>
                                                    <td>
                                                        <div className="d-flex g-2">
 <button className="btn btn-warning me-2" onClick={()=>navigate(`/admin/shows/edit/${show.id}`)}>Edit</button>
                                                    {
                                                        show.isActive ?(
                                                            <button className="btn  btn-sm btn-danger" onClick={()=>deactivateshow(show.id)} >Deactivate</button>
                                                        ):(
                                                            <button className="btn  btn-sm btn-success" onClick={()=>activateButton(show.id)}>Activate</button>
                                                        )
                                                    }
                                                        </div>
                                                   
                                                  
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

export default AdminShows