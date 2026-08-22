// import React, { useEffect, useState } from 'react'
// import { cancelBooking, getMyBookings } from '../../services/bookingService';
// import { useNavigate } from 'react-router-dom';

// const MyBookings = () => {
//   const[booking,setBooking]=useState([]);
//   const navigate=useNavigate();
//   useEffect(()=>{
//  fetchBooking();
//   },[]);
//   const fetchBooking=async()=>{
//          try{
//             const response= await getMyBookings();
//             console.log(response.da);
//             setBooking(response.data);
//          }catch(error){
//           console.log(error);
//          }
//   }


//   //for canceling the booking
//   const handlecancel=async(bookingId)=>{
//     const confirmcancel=window.confirm("are you sure to cancel the booking");
//     if(!confirmcancel)return;
//     try{
//         await cancelBooking(bookingId);
//         alert("Booking Cancelled Successfully");
//         fetchBooking();//refresh list
//     }catch(error){
//       console.log(error);
//       alert("Failed to cancel Booking");
//     }
//   }

//   return (
//     <div className="container mt-5">

//     <h2 className="text-center mb-4">
//         My Bookings
//     </h2>

//     <div className="row">

//         {
//             booking.map((booking) => (

//                 <div className="col-md-4 mb-6" key={booking.id}>

//                     <div className="card shadow-lg border-0">

//                         <div className="card-header bg-danger text-white text-center">

//                             <h4>{booking.movieName}</h4>

//                         </div>

//                         <div className="card-body">

//                             <p>
//                                 <strong>Booking No :</strong>
//                                 {booking.bookingNumber}
//                             </p>

//                             <p>
//                                 <strong>Theatre :</strong>
//                                 {booking.theatreName}
//                             </p>

//                             <p>
//                                 <strong>Screen :</strong>
//                                 {booking.screenName}
//                             </p>

//                             <p>
//                                 <strong>Seats :</strong>
//                                 {booking.seatNumbers.join(", ")}
//                             </p>

//                             <p>
//                                 <strong>Date :</strong>
//                                 {booking.showDate}
//                             </p>

//                             <p>
//                                 <strong>Time :</strong>
//                                 {booking.showTime}
//                             </p>

//                             <p>
//                                 <strong>Total :</strong>
//                                 ₹ {booking.totalAmount}
//                             </p>

//                             <p>

//                                 <span
//                                     className={`badge ${
//                                         booking.bookingStatus === "CONFIRMED"
//                                             ? "bg-success"
//                                             : booking.bookingStatus === "CANCELLED"
//                                             ? "bg-danger"
//                                             : "bg-secondary"
//                                     }`}
//                                 >
//                                     {booking.bookingStatus}
//                                 </span>

//                             </p>
//                             <div className="d-flex justify-content-between mt-3">
                               
//                               <button className="btn btn-outline-primary btn-sm" onClick={()=>navigate(`/ticket/${booking.ticketId}`)}>
//                                 View Ticket
//                               </button>
//                               <button className="btn btn-outline-danger btn-sm" 
//                               onClick={()=>handlecancel(booking.id)} disabled={booking.bookingStatus==="CANCELLED"}>Cancel Booking</button>
//                         </div>
//                         </div>

//                     </div>

//                 </div>

//             ))
//         }

//     </div>

// </div>
  
      
//   )
// }

// export default MyBookings


import React, { useEffect, useState } from "react";
import {
  cancelBooking,
  getMyBookings,
} from "../../services/bookingService";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/user/MyBookings.css";

const MyBookings = () => {

  const [booking, setBooking] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchBooking();
  }, []);

  // Fetch bookings
  const fetchBooking = async () => {

    try {

      const response = await getMyBookings();

      console.log(response.data);

      setBooking(response.data);

    } catch (error) {

      console.log(error);

    }
  };


  // Cancel booking
  const handlecancel = async (bookingId) => {

    const confirmcancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmcancel) return;

    try {

      await cancelBooking(bookingId);

      alert("Booking Cancelled Successfully");

      fetchBooking();

    } catch (error) {

      console.log(error);

      alert("Failed to cancel Booking");

    }
  };


  return (

    <div className="my-bookings-page">

      <div className="container">

        {/* ================= PAGE HEADER ================= */}

        <div className="bookings-header">

          <div>

            <h2>
              My Bookings
            </h2>

            <p>
              View and manage all your CineBook movie bookings
            </p>

          </div>

          <div className="booking-count">

            {booking.length}{" "}
            {booking.length === 1 ? "Booking" : "Bookings"}

          </div>

        </div>


        {/* ================= EMPTY STATE ================= */}

        {booking.length === 0 ? (

          <div className="empty-bookings">

            <div className="empty-icon">
              🎬
            </div>

            <h3>
              No Bookings Yet
            </h3>

            <p>
              You haven't booked any movies yet.
              Start exploring movies and book your first ticket!
            </p>

            <button
              className="browse-movies-btn"
              onClick={() => navigate("/movies")}
            >
              🎥 Browse Movies
            </button>

          </div>

        ) : (

          /* ================= BOOKINGS ================= */

          <div className="row g-4">

            {booking.map((booking) => (

              <div
                className="col-lg-4 col-md-6"
                key={booking.id}
              >

                <div className="booking-card">


                  {/* ================= MOVIE HEADER ================= */}

                  <div className="booking-card-header">

                    <div className="movie-icon">
                      🎬
                    </div>

                    <div className="movie-title">

                      <h4>
                        {booking.movieName}
                      </h4>

                      <span>
                        {booking.bookingNumber}
                      </span>

                    </div>

                  </div>


                  {/* ================= BOOKING DETAILS ================= */}

                  <div className="booking-card-body">


                    {/* Theatre */}

                    <div className="booking-detail">

                      <span className="detail-icon">
                        🏢
                      </span>

                      <div>
                        <small>
                          Theatre
                        </small>

                        <strong>
                          {booking.theatreName}
                        </strong>
                      </div>

                    </div>


                    {/* Screen */}

                    <div className="booking-detail">

                      <span className="detail-icon">
                        🖥️
                      </span>

                      <div>
                        <small>
                          Screen
                        </small>

                        <strong>
                          {booking.screenName}
                        </strong>
                      </div>

                    </div>


                    {/* Date */}

                    <div className="booking-detail">

                      <span className="detail-icon">
                        📅
                      </span>

                      <div>
                        <small>
                          Date
                        </small>

                        <strong>
                          {booking.showDate}
                        </strong>
                      </div>

                    </div>


                    {/* Time */}

                    <div className="booking-detail">

                      <span className="detail-icon">
                        🕐
                      </span>

                      <div>
                        <small>
                          Time
                        </small>

                        <strong>
                          {booking.showTime}
                        </strong>
                      </div>

                    </div>


                    {/* Seats */}

                    <div className="booking-detail seats-detail">

                      <span className="detail-icon">
                        💺
                      </span>

                      <div>

                        <small>
                          Seats
                        </small>

                        <strong>
                          {booking.seatNumbers?.join(", ")}
                        </strong>

                      </div>

                    </div>


                    {/* ================= TOTAL ================= */}

                    <div className="booking-total">

                      <span>
                        Total Amount
                      </span>

                      <strong>
                        ₹ {booking.totalAmount}
                      </strong>

                    </div>


                    {/* ================= STATUS ================= */}

                    <div className="booking-status-row">

                      <span>
                        Booking Status
                      </span>

                      <span
                        className={`booking-status ${
                          booking.bookingStatus === "CONFIRMED"
                            ? "status-confirmed"
                            : booking.bookingStatus === "CANCELLED"
                            ? "status-cancelled"
                            : "status-pending"
                        }`}
                      >

                        <span className="status-dot"></span>

                        {booking.bookingStatus}

                      </span>

                    </div>


                  </div>


                  {/* ================= CARD FOOTER ================= */}

                  <div className="booking-card-footer">

                    {/* <button
                      className="view-ticket-btn"
                      onClick={() =>
                        navigate(
                          `/ticket/${booking.ticketId}`
                        )
                      }
                    >
                      🎟️ View Ticket
                    </button> */}
                    {
                      booking.bookingStatus==="CANCELLED"?(
                        <button className="btn btn-outline-secondary btn-sm" disabled>Ticket Unavailable</button>
                      )
                      :(
                        <button className="btn btn-outline-primary btn-sm"     onClick={() =>
                        navigate(
                          `/ticket/${booking.ticketId}`
                        )
                      }>
                          View Ticket
                        </button>
                      )
                    }


                    <button
                      className="cancel-booking-btn"
                      onClick={() =>
                        handlecancel(booking.id)
                      }
                      disabled={
                        booking.bookingStatus === "CANCELLED"
                      }
                    >
                      {booking.bookingStatus === "CANCELLED"
                        ? "Cancelled"
                        : "Cancel"}
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

export default MyBookings;

