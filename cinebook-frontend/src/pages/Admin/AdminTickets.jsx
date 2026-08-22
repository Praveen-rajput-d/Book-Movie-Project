import React, { useEffect, useState } from 'react'
import { allTickets, getTicketByTicketId } from '../../services/ticketService';

const AdminTickets = () => {
    const[tickets,setTickts]=useState([]);
    const[loading,setLoading]=useState(true);
    const[search,setSearch]=useState("");
    const[ticketstatus,setTicketstatus]=useState("");
    useEffect(()=>{
        fetchTickets();
    },[])
    const fetchTickets=async()=>{
        try{
            const response=await allTickets();
            console.log(response.data);
            setTickts(response.data);
        }catch(error){
            console.log(error);
        }finally{
            setLoading(false);
        }

    }

    const searchbutton=async()=>{
        setTicketstatus("");
         if(!search.trim()){
            fetchTickets();
            return;
         }
         try{
            setLoading(true);
            const resposne=await getTicketByTicketId(search);
            console.log("Searched Ticket:",resposne.data);
            setTickts([resposne.data]);
         }catch(error){
            console.log(error);
            console.error("Bakcend Response:",error.response?.data);
            setTickts([]);
         }finally{
            setLoading(false);
         }
    }
    const handleStatusFilter=(status)=>{
        setSearch("");
        setTicketstatus(status);
        if(!status){
            fetchTickets();
            return;
        }
        const filteredTickets=tickets.filter((ticket)=>ticket.ticketStatus===status);
        setTickts(filteredTickets);
    };

    const clearbutton=()=>{
        setSearch("");
        setTicketstatus("");
        fetchTickets();
    }
  
  return (
   <div>
        
        <div className="d-flex justify-content-between align-items-center">
            <div>
                <h2><strong>Ticket Management</strong></h2>
  <p className="text-muted">Manage  All Tickets of Customers in BookMovie</p>
            
            </div>
            <button className="btn btn-outline-primary" onClick={fetchTickets}>Refresh</button>
         
        </div>

        {/*search and filter*/}

        <div className="card shadow-sm">
            <div className="card-body">
                <div className="row g-3 align-items-end">
                    <div className="col-md-6">
                        <label className="form-label">Search Ticket Number</label>
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Enter Ticket Number"
                            value={search} onKeyDown={(e)=>{
                             if(e.key==="Enter"){
                                searchbutton();
                             }
                            }} onChange={(e)=>setSearch(e.target.value)}/>
                            <button className="btn btn-outline-primary" onClick={searchbutton}>Search</button>
                        </div>
                    </div>

                    {/*filter booking by status*/}
                    <div className="col-md-6">
                        <label className="form-label">Ticket Status</label>
                        <select className="form-select" value={ticketstatus} onChange={(e)=>handleStatusFilter(e.target.value)}  >
                            <option  value="">All</option>
                             <option value="ACTIVE">ACTIVE</option>
                              <option value="USED">USED</option>
                               <option  value="CANCELLED">CANCELLED</option>

                        </select>
                    </div>
                    <div className="col-md-12">
                        <button className="btn btn-secondary w-100"   onClick={clearbutton}>Clear Filters</button>
                    </div>
                </div>
                
                <h5><strong>All Tickets</strong></h5>
                {
                    loading ?(
                        <p>Loading Tickets...</p>
                    ):tickets.length===0 ?(
                        <p>No Ticket Found</p>
                    
                    ):(
                     <div className="table-responsive">
                        <table className="table table-bordered table-hover align-middle">
                            
                            <thead className="table-dark">
                                <tr>
                                    <th>Id</th>
                                    <th>Ticket Number</th>
                             
                                    <th>Booking Number</th>
                                    <th>Movie Name</th>
                                    <th>Theatre Name</th>
                                    <th>Screen Name</th>
                                    <th>Show Date</th>
                                    <th>Show Time</th>
                                    <th>Seat Numbers</th>
                                    <th>Total Amount</th>
                                    <th>Status</th>
                                   
                                 
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    tickets.map(
                                    (ticket)=>(
                                        <tr key={ticket.id}>
                                            <td>{ticket.id}</td>

                                             <td>
                                                <strong>  {ticket.ticketNumber}</strong>
                                              
                                                </td>
                                            <td><strong>{ticket.bookingNumber}</strong></td>
                                               <td>{ticket.movieName}</td>
                                                <td>{ticket.theatreName}</td>
                                                 <td>{ticket.screenName}</td>
                                                  <td>{ticket.showDate}</td>
                                                   <td>{ticket.showTime}</td>
                                                    <td>{ticket.seatNumbers?.join(", ")}</td>
                                                    <td>₹{ticket.totalAmount}</td>
                                    <td>
                                        {ticket.ticketStatus==='CANCELLED'?(
                                            <span className="badge bg-danger">CANCELLED</span>
                                        ):ticket.ticketStatus==='ACTIVE'?(
                                            <span className="badge bg-success">ACTIVE</span>
                                        ):(
                                            <span className="badge bg-warning text-dark">USED</span>
                                        )
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

export default AdminTickets