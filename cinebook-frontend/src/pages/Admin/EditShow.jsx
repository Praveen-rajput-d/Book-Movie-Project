import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { allShows, getShowById, updateShow } from '../../services/showService';

const EditShow = () => {

    const {id}=useParams();
    const[loading,setLoading]=useState(true);
    const[show,setShow]=useState({
        showDate:"",
        startTime:"",
        endTime:"",
        ticketPrice:"",
        availableSeats:"",
        movieId:"",
        screenId:"",
        isActive:true
    });
    useEffect(()=>{
        fetchShow();

    },[id]);
    const fetchShow=async()=>{
        try{
            const response=await getShowById(id);
            console.log(response.data);
            setShow(response.data);
        }catch(error){
            console.log(error);
        }finally{
            setLoading(false);
        }

    }
    const handleChange=(e)=>{
        const{name,value}=e.target
        setShow({
            ...show,[name]:value
        })

    }
    const navigate=useNavigate();

    const updateButton=async(e)=>{
        e.preventDefault();
        try{
          const data={
            ...show,
            showDate:show.showDate,
            startTime:show.startTime,
            endTime:show.endTime,
            ticketPrice:Number(show.ticketPrice),
            availableSeats:Number(show.availableSeats),
            movieId:Number(show.movieId),
            screenId:Number(show.screenId),
            isActive:show.isActive
          }
          await updateShow(id,data);
          alert("Show Updated Successfully");
          navigate("/admin/shows");
        }catch(error){
            console.log(error);
            alert(error.response?.data?.message||"failed to update Show");

        }
    }
    if(loading){
        return <h4>Loading Show...</h4>
    }
    
  return (
     <div>
           <h2>Update Show</h2>
             <div className="card shadow-sm p-4">
                  <p className="mb-4">update   Show in BookMovie</p>
            
                <form onSubmit={updateButton}>
                    <div className="row">
                        <div className="col-md-6  mb-3">
                            <label className="form-label">Movie ID</label>
                            <input type="number" className="form-control"  name="movieId" onChange={handleChange}  value={show.movieId??""}required/>
                        </div>
                           <div className="col-md-6  mb-3">
                            <label className="form-label">Screen ID</label>
                            <input type="number" className="form-control"  name="screenId" onChange={handleChange}value={show.screenId??""} required/>
                        </div>
                           <div className="col-md-6  mb-3">
                            <label className="form-label">Show Date</label>
                            <input type="date" className="form-control"  name="showDate" onChange={handleChange} value={show.showDate??""} required/>
                        </div>
                           <div className="col-md-6  mb-3">
                            <label className="form-label">Start Time</label>
                            <input type="time" className="form-control"  name="startTime" onChange={handleChange} value={show.startTime??""} required/>     
                        </div>
                       
                           <div className="col-md-6  mb-3">
                            <label className="form-label">End Time</label>
                            <input type="time" className="form-control"  onChange={handleChange} value={show.endTime??""} name="endTime" required/>
                        </div>
                        
                           <div className="col-md-6  mb-3">
                            <label className="form-label">Ticket Price</label>
                            <input type="number" className="form-control"  onChange={handleChange} value={show.ticketPrice??""} name="ticketPrice"  min="1" step="0.01" required/>
                        </div>

                         <div className="col-md-6  mb-3">
                            <label className="form-label"></label>Available Tickets
                            <input type="number" className="form-control"  onChange={handleChange} value={show.availableSeats??""} name="availableSeats"  min="1"  required/>
                        </div>
                        
                        

                    </div>
                    <button className="btn btn-danger  btn-sm me-2" type="submit">Add Show</button>
                    <button className="btn btn-secondary btn-sm  m-3" onClick={()=>navigate("/admin/shows")}>Cancel</button>
                </form>
            </div>
        </div>
  )
}

export default EditShow