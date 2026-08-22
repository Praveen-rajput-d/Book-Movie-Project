import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTicketById } from "../../services/ticketService";
import { downloadTicket } from "../../services/downloadService";
import "../../assets/styles/user/ticketdetails.css";

const TicketDetails = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [ticket, setTicket] = useState(null);


  //fetch ticket

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


  //ticket download function

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


  //loading part of ticket

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


        {/*Page header */}

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


        {/* Main Ticket */}

        <div className="cinema-ticket">


          {/*Ticket Top */}

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


          {/*Movie Information */}

          <div className="movie-ticket-section">

            <span className="section-label">
              MOVIE
            </span>

            <h1>
              {ticket.movieName}
            </h1>

          </div>


          {/* Dotted Divider */}

          <div className="ticket-divider">

            <span></span>

          </div>


          {/* Ticket Numbers */}

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


          {/* Show Details */}

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

          {/*ticket Divider */}

          <div className="ticket-divider ticket-divider-bottom">

            <span></span>

          </div>


          {/*Footer part */}

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


        {/*Actions */}

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

