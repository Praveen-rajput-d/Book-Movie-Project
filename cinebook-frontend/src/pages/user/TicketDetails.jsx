// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom';
// import { getTicketById } from '../../services/ticketService';
// import { downloadTicket } from '../../services/downloadService';

// const TicketDetails = () => {
   
//     const{id}=useParams();
    
//     const[ticket,setTicket]=useState(null);
//     useEffect(()=>{
//      fetchTicket();
//     },[])
//     const fetchTicket=async()=>{
//         try{
//             // console.log("Ticket ID:",id);
//          const response=await getTicketById(id);
//          console.log(response.data);
//         setTicket(response.data);
//         }catch(error){
//             console.log(error);
//         }
//     }

//     //download ticket
//     const handledownload= async()=>{
  
//              console.log("Ticket Id:",id);
//             try{
//                 const response=await downloadTicket(id);
//                   console.log(response);
//                 const blob=new Blob(
//                     [response.data],
//                     {
//                         type:"application/pdf"
//                     }
//                 );
//                 const url=window.URL.createObjectURL(blob);
//                 const link=document.createElement("a");
//                 link.href=url;
//                 link.download=`ticket_${id}.pdf`;
//                 document.body.appendChild(link);
//                 link.click();
//                 link.remove();
//                 window.URL.revokeObjectURL(url);
                
//             }
//             catch(error){
//                 console.log(error);
         
//             }
//     }

//     if(!ticket){
//         return(
//             <div className="text-center mt-5">Loading Ticket...</div>
//         );
//     }
//   return (
//    <div className="container mt-5">  
//     <div className="row justify-content-center">
//         <div className="col-md-8">

//             <div className="card shadow-lg border-0">

//                 <div className="card-header bg-danger text-white text-center">
//                     <h2>{ticket.movieName}</h2>
//                     <h5>CineBook E-Ticket</h5>
//                 </div>

//                 <div className="card-body">

//                     <div className="row">

//                         <div className="col-md-6">
//                             <p><strong>Ticket No:</strong></p>
//                             <p>{ticket.ticketNumber}</p>
//                         </div>

//                         <div className="col-md-6">
//                             <p><strong>Booking No:</strong></p>
//                             <p>{ticket.bookingNumber}</p>
//                         </div>

//                     </div>

//                     <hr/>

//                     <div className="row">

//                         <div className="col-md-6">
//                             <p><strong>Theatre</strong></p>
//                             <p>{ticket.theatreName}</p>
//                         </div>

//                         <div className="col-md-6">
//                             <p><strong>Screen</strong></p>
//                             <p>{ticket.screenName}</p>
//                         </div>

//                     </div>

//                     <div className="row">

//                         <div className="col-md-4">
//                             <p><strong>Date</strong></p>
//                             <p>{ticket.showDate}</p>
//                         </div>

//                         <div className="col-md-4">
//                             <p><strong>Time</strong></p>
//                             <p>{ticket.showTime}</p>
//                         </div>

//                         <div className="col-md-4">
//                             <p><strong>Seats</strong></p>
//                             <p>{ticket.seatNumbers.join(", ")}</p>
//                         </div>

//                     </div>

//                     <hr/>

//                     <h4 className="text-success">
//                         ₹ {ticket.totalAmount}
//                     </h4>

//                     <span className={`badge ${
//                         ticket.ticketStatus === "ACTIVE"
//                             ? "bg-success"
//                             : ticket.ticketStatus === "USED"
//                             ? "bg-secondary"
//                             : "bg-danger"
//                     }`}>
//                         {ticket.ticketStatus}
//                     </span>

//                     <hr/>

//                     <small className="text-muted">
//                         Generated :
//                         <br/>
//                         {ticket.generatedAt}
//                     </small>

//                 </div>

//             </div>
//             <div className="text-center mt-5 " >
//                     <button className="btn btn-primary" onClick={handledownload}>Download Ticket</button>
//             </div>

                    
           

//         </div>
//     </div>
// </div>
//   )
// }

// export default TicketDetails




import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTicketById } from "../../services/ticketService";
import { downloadTicket } from "../../services/downloadService";
import "../../assets/styles/user/ticketdetails.css";

const TicketDetails = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [ticket, setTicket] = useState(null);


  // ================= FETCH TICKET =================

  useEffect(() => {
    fetchTicket();
  }, [id]);


  const fetchTicket = async () => {

    try {

      console.log("Ticket ID:", id);

      const response = await getTicketById(id);
      console.log("QR Code:",response.data.qrCode);
      console.log("QR Start");
      console.log("QR Start:",response.data.qrCode?.length);

      console.log(response.data);

      setTicket(response.data);

    } catch (error) {

      console.log(error);
   

    }
  };


  // ================= DOWNLOAD TICKET =================

  const handledownload = async () => {

    try {

      console.log("Downloading Ticket ID:", id);

      const response = await downloadTicket(id);

      const blob = new Blob(
        [response.data],
        {
          type: "application/pdf",
        }
      );

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;

      link.download = `ticket_${id}.pdf`;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);

    } catch (error) {

      console.log("Download error:", error);

      alert("Failed to download ticket");

    }
  };


  // ================= LOADING =================

  if (!ticket) {

    return (

      <div className="ticket-loading">

        <div className="spinner-border text-danger"></div>

        <p>
          Loading Ticket...
        </p>

      </div>

    );

  }


  return (

    <div className="ticket-details-page">

      <div className="container">


        {/* ================= PAGE HEADER ================= */}

        <div className="ticket-details-heading">

          <div>

            <h2>
              E-Ticket
            </h2>

            <p>
              Your CineBook movie ticket
            </p>

          </div>

          <button
            className="back-ticket-btn"
            onClick={() => navigate("/my-tickets")}
          >
            ← My Tickets
          </button>

        </div>


        {/* ================= MAIN TICKET ================= */}

        <div className="cinema-ticket">


          {/* ================= TICKET TOP ================= */}

          <div className="cinema-ticket-top">

            <div className="ticket-brand">

              <div className="ticket-brand-icon">
                🎬
              </div>

              <div>

                <h2>
                  CineBook
                </h2>

                <span>
                  E-Ticket
                </span>

              </div>

            </div>


            <div className="ticket-status-wrapper">

              <span
                className={`details-ticket-status ${
                  ticket.ticketStatus === "ACTIVE"
                    ? "details-status-active"
                    : ticket.ticketStatus === "USED"
                    ? "details-status-used"
                    : "details-status-cancelled"
                }`}
              >

                <span className="status-circle"></span>

                {ticket.ticketStatus}

              </span>

            </div>

          </div>


          {/* ================= MOVIE INFORMATION ================= */}

          <div className="movie-ticket-section">

            <span className="section-label">
              MOVIE
            </span>

            <h1>
              {ticket.movieName}
            </h1>

          </div>


          {/* ================= DOTTED DIVIDER ================= */}

          <div className="ticket-divider">

            <span></span>

          </div>


          {/* ================= TICKET NUMBERS ================= */}

          <div className="ticket-number-section">

            <div>

              <small>
                Ticket Number
              </small>

              <strong>
                {ticket.ticketNumber}
              </strong>

            </div>

            <div>

              <small>
                Booking Number
              </small>

              <strong>
                {ticket.bookingNumber}
              </strong>

            </div>

          </div>


          {/* ================= SHOW DETAILS ================= */}

          <div className="show-details-grid">


            {/* Theatre */}

            <div className="show-detail-box">

              <div className="show-detail-icon">
                🏢
              </div>

              <div>

                <small>
                  Theatre
                </small>

                <strong>
                  {ticket.theatreName}
                </strong>

              </div>

            </div>


            {/* Screen */}

            <div className="show-detail-box">

              <div className="show-detail-icon">
                🖥️
              </div>

              <div>

                <small>
                  Screen
                </small>

                <strong>
                  {ticket.screenName}
                </strong>

              </div>

            </div>


            {/* Date */}

            <div className="show-detail-box">

              <div className="show-detail-icon">
                📅
              </div>

              <div>

                <small>
                  Date
                </small>

                <strong>
                  {ticket.showDate}
                </strong>

              </div>

            </div>


            {/* Time */}

            <div className="show-detail-box">

              <div className="show-detail-icon">
                🕐
              </div>

              <div>

                <small>
                  Time
                </small>

                <strong>
                  {ticket.showTime}
                </strong>

              </div>

            </div>


            {/* Seats */}

            <div className="show-detail-box">

              <div className="show-detail-icon">
                💺
              </div>

              <div>

                <small>
                  Seats
                </small>

                <strong>
                  {ticket.seatNumbers?.join(", ")}
                </strong>

              </div>

            </div>


            {/* Amount */}

            <div className="show-detail-box amount-box">

              <div className="show-detail-icon">
                ₹
              </div>

              <div>

                <small>
                  Total Amount
                </small>

                <strong>
                  ₹ {ticket.totalAmount}
                </strong>

              </div>

            </div>

          </div>
          {/*QR Code*/}
         <div className="ticket-qr-details">
          <div className="ticket-qr-heading">
            <h4>Ticket QR Code</h4>
            <p>Scan this QR code at the theatre entrance</p>
          </div>
          {ticket.qrCode ?(
            <img src={`data:image/png;base64,${ticket.qrCode}`} 
            alt="Ticket QR Code"
            className="ticket-details-qr"/>

          ):(
            <p className="ticket-details-qr-unavailable">
              QR Code Unavailable
            </p>
          )}
         </div>

          {/* ================= TICKET DIVIDER ================= */}

          <div className="ticket-divider ticket-divider-bottom">

            <span></span>

          </div>


          {/* ================= FOOTER ================= */}

          <div className="ticket-bottom">

            <div className="generated-info">

              <small>
                Ticket Generated
              </small>

              <strong>
                {ticket.generatedAt}
              </strong>

            </div>


            <div className="ticket-note">

              <span>
                🎟️
              </span>

              <p>
                Please show this ticket at the theatre entrance.
              </p>

            </div>

          </div>

        </div>


        {/* ================= ACTIONS ================= */}

        <div className="ticket-actions">

          <button
            className="download-ticket-btn"
            onClick={handledownload}
          >
            ↓ Download Ticket
          </button>

          <button
            className="back-button"
            onClick={() => navigate("/my-tickets")}
          >
            Back to My Tickets
          </button>

        </div>


      </div>

    </div>
  );
};

export default TicketDetails;

