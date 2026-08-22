import React, { useState } from 'react'
import { addShow } from '../../services/showService';
import { useNavigate } from 'react-router-dom';

const AddShows = () => {

    const[show,setShow]=useState({
        showDate:"",
        startTime:"",
        endTime:"",
        availableSeats:"",
        isActive:true,
        ticketPrice:"",
        movieId:"",
     
        screenId:"",
       
    
    
    })
    const[loading,setLoading]=useState(true);

     const handleChange=(e)=>{
        const{name,value}=e.target
        setShow({
            ...show,[name]:value
        })

     }
     const navigate=useNavigate();

     const addbutton=async(e)=>{
        e.preventDefault();
        try{
            const data={
                ...show,
                movieId:Number(show.movieId),
                screenId:Number(show.screenId),
                availableSeats:Number(show.availableSeats),
                ticketPrice:Number(show.ticketPrice)
            }
            console.log("adding Show:",data);
            await addShow(data);
            alert("Show Added Successfully");
        navigate("/admin/shows");
        }catch(error){
            console.log(error);
            alert(error.response?.data?.message||"failed to add Show");
            
        }
     }
  return (
    <div>
           <h2>Add Shows</h2>
             <div className="card shadow-sm p-4">
                  <p className="mb-4">Add a new  Show in BookMovie</p>
            
                <form onSubmit={addbutton}>
                    <div className="row">
                        <div className="col-md-6  mb-3">
                            <label className="form-label">Movie ID</label>
                            <input type="number" className="form-control"  name="movieId" onChange={handleChange}  value={show.movieId}required/>
                        </div>
                           <div className="col-md-6  mb-3">
                            <label className="form-label">Screen ID</label>
                            <input type="number" className="form-control"  name="screenId" onChange={handleChange}value={show.screenId} required/>
                        </div>
                           <div className="col-md-6  mb-3">
                            <label className="form-label">Show Date</label>
                            <input type="date" className="form-control"  name="showDate" onChange={handleChange} value={show.showDate} required/>
                        </div>
                           <div className="col-md-6  mb-3">
                            <label className="form-label">Start Time</label>
                            <input type="time" className="form-control"  name="startTime" onChange={handleChange} value={show.startTime} required/>     
                        </div>
                       
                           <div className="col-md-6  mb-3">
                            <label className="form-label">End Time</label>
                            <input type="time" className="form-control"  onChange={handleChange} value={show.endTime} name="endTime" required/>
                        </div>
                        
                           <div className="col-md-6  mb-3">
                            <label className="form-label">Ticket Price</label>
                            <input type="number" className="form-control"  onChange={handleChange} value={show.ticketPrice} name="ticketPrice"  min="1" step="0.01" required/>
                        </div>

                         <div className="col-md-6  mb-3">
                            <label className="form-label"></label>Available Tickets
                            <input type="number" className="form-control"  onChange={handleChange} value={show.availableSeats} name="availableSeats"  min="1"  required/>
                        </div>
                        
                        

                    </div>
                    <button className="btn btn-danger  btn-sm me-2" type="submit">Add Show</button>
                    <button className="btn btn-secondary btn-sm  m-3" onClick={()=>navigate("/admin/shows")}>Cancel</button>
                </form>
            </div>
        </div>


  )
}

export default AddShows