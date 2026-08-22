import React, { useEffect, useState } from 'react'
import { allBookings, cancelBooking, searchBooking, searchByBookingStatus } from '../../services/bookingService';
import { useParams } from 'react-router-dom';

const AdminBookings = () => {
    const[bookings,setBooking]=useState([]);
    const[loading,setLoading]=useState(true);
    const[search,setSearch]=useState("");
    const[selectedstatus,setSelectedStatus]=useState("");

    useEffect(()=>{
fetchBooking();
    },[]);
    const fetchBooking=async()=>{
          try{
            const response=await allBookings();
            console.log(response.data);
            setBooking(response.data);
          }catch(error){
            console.log(error);
          }finally{
            setLoading(false);
          }
    }
    
 const handleCancelBooking = async (bookingId) => {
      const confirmCancel = window.confirm(
            "Are you sure you want to cancel this Booking?"
        );

        if (!confirmCancel) {
            return;
        }
    try {
      

        await cancelBooking(bookingId);

        setBooking((prevBookings) =>
            prevBookings.map((booking) =>
                booking.id === bookingId
                    ? { ...booking, bookingStatus: "CANCELLED" }
                    : booking
            )
        );

        alert("Booking cancelled successfully");

    } catch (error) {
        console.log(error);
        if(error.response?.data){
            alert(error.response.data);
        }else{
            alert("Failed to Cancel Booking");
        }
          
    }
};

const searchbar=async()=>{
    setSelectedStatus("");
    if(!search.trim()){
        fetchBooking();
        return;
    }
    try{
        setLoading(true);
        const response=await searchBooking(search);
        setBooking(response.data);
    }catch(error){
        console.error("Search Booking Error:",error);
        setBooking([]);
    }finally{
        setLoading(false);
    }
}

const searchByFilter=async(status)=>{

    setSearch("");
   setSelectedStatus(status);
   if(!status){
    fetchBooking();
    return;
   }
   try{
    setLoading(true);
    const response=await searchByBookingStatus(status);
    console.log(response.data);
    setBooking(response.data);
   }catch(error){
    console.error("Status Filter error",error);
    setBooking([]);
   }finally{
    setLoading(false);
   }
}
const clearbutton=()=>{
    setSearch("");
    setSelectedStatus("");
    fetchBooking();
};
  return (
    <div>
        
        <div className="d-flex justify-content-between align-items-center">
            <div>
                <h2><strong>Booking Management</strong></h2>
  <p className="text-muted">Manage  All Bookings  of Customers in BookMovie</p>
            
            </div>
            <button className="btn btn-outline-primary" onClick={fetchBooking}>Refresh</button>
         
        </div>
      

        {/*search and filter*/}

        <div className="card shadow-sm">
            <div className="card-body">
                <div className="row g-3 align-items-end">
                    <div className="col-md-5">
                        <label className="form-label">Search Booking Number</label>
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Enter Booking Number"
                            value={search} onKeyDown={(e)=>{
                             if(e.key==="Enter"){
                                searchbar();
                             }
                            }} onChange={(e)=>setSearch(e.target.value)}/>
                            <button className="btn btn-primary" onClick={searchbar}>Search</button>
                        </div>
                    </div>

                    {/*filter booking by status*/}
                    <div className="col-md-4">
                        <label className="form-label">Booking Status</label>
                        <select className="form-select"  value={selectedstatus} onChange={(e)=>searchByFilter(e.target.value)} >
                            <option  value="">All</option>
                             <option value="CONFIRMED">CONFIRMED</option>
                              <option value="PENDING">PENDING</option>
                               <option  value="CANCELLED">CANCELLED</option>

                        </select>
                    </div>
                    <div className="col-md-3">
                        <button className="btn btn-secondary w-100"  onClick={clearbutton}>Clear Filters</button>
                    </div>
                </div>
                
                <h5><strong>Bookings</strong></h5>
                {
                    loading ?(
                        <p>Loading Bookings...</p>
                    ):bookings.length===0 ?(
                        <p>No Bookings Found</p>
                    ):(
                     <div className="table-responsive">
                        <table className="table table-bordered table-hover align-middle">
                            <thead className="table-dark">
                                <tr>
                                    <th>Id</th>
                                    <th>BookingBumber</th>
                             
                                    <th>Movie Name</th>
                                    <th>Theatre Name</th>
                                    <th>Screen Name</th>
                                    <th>Show Date</th>
                                    <th>Show Time</th>
                                    <th>Seat Numbers</th>
                                    <th>Total Amount</th>
                                    <th>BookingStatus</th>
                                    <th>Action</th>
                                 
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    bookings.map(
                                    (booking)=>(
                                        <tr key={booking.id}>
                                            <td>{booking.id}</td>

                                             <td>
                                                <strong>  {booking.bookingNumber}</strong>
                                              
                                                </td>
                                            
                                               <td>{booking.movieName}</td>
                                                <td>{booking.theatreName}</td>
                                                 <td>{booking.screenName}</td>
                                                  <td>{booking.showDate}</td>
                                                   <td>{booking.showTime}</td>
                                                    <td>{booking.seatNumbers?.join(", ")}</td>
                                                    <td>₹{booking.totalAmount}</td>
                                    <td>
                                        {booking.bookingStatus==='CANCELLED'?(
                                            <span className="badge bg-danger">CANCELLED</span>
                                        ):booking.bookingStatus==='CONFIRMED'?(
                                            <span className="badge bg-success">CONFIRMED</span>
                                        ):(
                                            <span className="badge bg-warning text-dark">PENDING</span>
                                        )
                                        }
                                    </td>
                                    <td>
                                        {booking.bookingStatus!="CANCELLED"?(
                                            <button className="btn btn-sm btn-danger" onClick={()=>handleCancelBooking(booking.id)}>
                                                Cancel
                                            </button> 
                                        ):(<span className="text-muted">Cancelled</span>)
                                    }
                                    </td>
                                                   
                                        </tr>
                                    )
 
                                    )

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

export default AdminBookings