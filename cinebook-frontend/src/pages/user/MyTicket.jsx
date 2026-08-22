// import React, { useEffect, useState } from 'react'
// import { getMyTickets } from '../../services/ticketService';
// import { useNavigate } from 'react-router-dom';

// const MyTicket  = () => {
//     const[ticket,setTicket]=useState([]);
//     const navigate=useNavigate();
//     useEffect(()=>{
//         fetchTickets();
//     },[]);
//     const fetchTickets=async()=>{
//         try{
//             const response=await getMyTickets();
//             console.log(response.data);
//             setTicket(response.data);
//         }catch(error){
//             console.log(error);
//         }
//     }
//     // {
//     //     ticket.map((ticket)=>{
//     //         console.log(ticket.ticketStatus);
//     //     })
//     // }
//   return (
//     <div className="container mt-5">
//         <h2 className="text-center">My Tickets</h2>
//         <div className="row ">
//             {
//                 ticket.map((ticket)=>(
                
//                     <div className="col-md-6 mb-4" key={ticket.id}>
                        
//                         <div className="card shadow-lg border-0">

//                            <div className="card-header bg-danger text-white text-center">
//                             <h5 className=" mb-0">{ticket.movieName}
                                
//                             </h5>
                                
//                            </div>
//                            <div className="card-body">
//                             <p>
//                                 <strong>Ticket No:</strong>{ticket.ticketNumber}
//                             </p>
//                                 <p>
//                                 <strong>Booking No:</strong>{ticket.bookingNumber}
//                             </p>
//                                 <p>
//                                 <strong>Theatre:</strong>{ticket.theatreName}
//                             </p>
//                                 <p>
//                                 <strong>Seat  No:</strong>{ticket.seatNumbers.join(",")}
//                             </p>
//                              <p>
//                                 <strong>Show Date:</strong>{ticket.showDate}
//                             </p>
//                              <p>
//                                 <strong>Show Time:</strong>{ticket.showTime}
//                             </p>
//                              <p>
//                                 <strong>Amount:</strong>₹{ticket.totalAmount}
//                             </p>
                         
//                             <p>  <span className={`badge ${
//                                 ticket.ticketStatus==="ACTIVE"?"bg-success": ticket.ticketStatus==="USED"?"bg-secondary":"bg-danger"}`}>{ticket.ticketStatus}</span>
//                             </p>
                               
                            
                            
                             
//                             <hr/>
//                             <div className="d-flex justify-content-between align-items-center">
//                                 <small className="text-muted">Generated:
//                                     <br/>
//                                     {ticket.generatedAt}
//                                 </small>
//                                 <button className="btn btn-outline-danger btn-sm" onClick={()=>navigate(`/ticket/${ticket.id}`)}>View Ticket</button>
//                            </div>
//                            </div>
//                            </div>
//                            </div>
//                 ))
//             }
//         </div>
       
//         </div>
//   )
// }


// export default MyTicket





import React, { useEffect, useState } from "react";
import { getMyTickets } from "../../services/ticketService";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/user/MyTickets.css";

const MyTicket = () => {

  const [ticket, setTicket] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchTickets();
  }, []);

  // Fetch tickets
  const fetchTickets = async () => {

    try {

      const response = await getMyTickets();

      console.log(response.data);

      setTicket(response.data);

    } catch (error) {

      console.log(error);

    }
  };


  return (

    <div className="my-ticket-page">

      <div className="container">

        {/* ================= PAGE HEADER ================= */}

        <div className="ticket-page-header">

          <div>

            <h2>
              My Tickets
            </h2>

            <p>
              Your movie tickets and booking details
            </p>

          </div>

          <div className="ticket-count">

            {ticket.length}{" "}
            {ticket.length === 1 ? "Ticket" : "Tickets"}

          </div>

        </div>


        {/* ================= EMPTY STATE ================= */}

        {ticket.length === 0 ? (

          <div className="empty-tickets">

            <div className="empty-ticket-icon">
              🎟️
            </div>

            <h3>
              No Tickets Found
            </h3>

            <p>
              You don't have any movie tickets yet.
              Book a movie and your ticket will appear here.
            </p>

            <button
              className="browse-ticket-btn"
              onClick={() => navigate("/movies")}
            >
              🎬 Browse Movies
            </button>

          </div>

        ) : (

          /* ================= TICKETS ================= */

          <div className="row g-4">

            {ticket.map((ticket) => (

              <div
                className="col-lg-6 col-md-6"
                key={ticket.id}
              >

                <div className="ticket-card">


                  {/* ================= TICKET HEADER ================= */}

                  <div className="ticket-header">

                    <div className="ticket-movie-icon">
                      🎬
                    </div>

                    <div className="ticket-movie-info">

                      <h4>
                        {ticket.movieName}
                      </h4>

                      <span>
                        Ticket #{ticket.ticketNumber}
                      </span>

                    </div>

                    {/* STATUS */}

                    <span
                      className={`ticket-status ${
                        ticket.ticketStatus === "ACTIVE"
                          ? "ticket-active"
                          : ticket.ticketStatus === "USED"
                          ? "ticket-used"
                          : "ticket-cancelled"
                      }`}
                    >

                      <span className="ticket-status-dot"></span>

                      {ticket.ticketStatus}

                    </span>

                  </div>


                  {/* ================= TICKET BODY ================= */}

                  <div className="ticket-body">


                    {/* Booking number */}

                    <div className="ticket-info-item">

                      <span className="ticket-info-icon">
                        🎟️
                      </span>

                      <div>

                        <small>
                          Booking Number
                        </small>

                        <strong>
                          {ticket.bookingNumber}
                        </strong>

                      </div>

                    </div>


                    {/* Theatre */}

                    <div className="ticket-info-item">

                      <span className="ticket-info-icon">
                        🏢
                      </span>

                      <div>

                        <small>
                          Theatre
                        </small>

                        <strong>
                          {ticket.theatreName}
                        </strong>

                      </div>

                    </div>


                    {/* Seats */}

                    <div className="ticket-info-item">

                      <span className="ticket-info-icon">
                        💺
                      </span>

                      <div>

                        <small>
                          Seats
                        </small>

                        <strong>
                          {ticket.seatNumbers?.join(", ")}
                        </strong>

                      </div>

                    </div>


                    {/* Date */}

                    <div className="ticket-info-item">

                      <span className="ticket-info-icon">
                        📅
                      </span>

                      <div>

                        <small>
                          Show Date
                        </small>

                        <strong>
                          {ticket.showDate}
                        </strong>

                      </div>

                    </div>


                    {/* Time */}

                    <div className="ticket-info-item">

                      <span className="ticket-info-icon">
                        🕐
                      </span>

                      <div>

                        <small>
                          Show Time
                        </small>

                        <strong>
                          {ticket.showTime}
                        </strong>

                      </div>

                    </div>


                    {/* Amount */}

                    <div className="ticket-amount">

                      <span>
                        Total Amount
                      </span>

                      <strong>
                        ₹ {ticket.totalAmount}
                      </strong>

                    </div>

                    {/*QR Code For Ticket*/}
                    <div className="ticket-qr-section">
                      <div className="ticket-qr-info">
                        <small>Scan this QR code at the theatre</small>
                        {ticket.qrCode?(
                          <img src={`data:image/png;base64,${ticket.qrCode}`}
                          alt="Ticket QR Code"
                          className="ticket-qr-image"/>
                        ):(
                          <p className="qr-unavailable">QR Code Unavailable</p>
                        )}
                        </div>
                        </div>


                    {/* ================= GENERATED ================= */}

                    <div className="ticket-generated">

                      <span>
                        Generated
                      </span>

                      <strong>
                        {ticket.generatedAt}
                      </strong>

                    </div>

                  </div>


                  {/* ================= TICKET FOOTER ================= */}

                  <div className="ticket-footer">

                    <button
                      className="view-full-ticket-btn"
                      onClick={() =>
                        navigate(`/ticket/${ticket.id}`)
                      }
                    >
                      🎟️ View Full Ticket
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
};

export default MyTicket;

