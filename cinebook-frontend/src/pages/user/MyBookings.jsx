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

        {/*Bookings page header*/}

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


        {/* Empty state */}

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

          /* BOOKINGS */

          <div className="row g-4">

            {booking.map((booking) => (

              <div
                className="col-lg-4 col-md-6"
                key={booking.id}
              >

                <div className="booking-card">


                  {/*  Movie header part*/}

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


                  {/* Booking Details*/}

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


                    {/* Booking Total Amount */}

                    <div className="booking-total">

                      <span>
                        Total Amount
                      </span>

                      <strong>
                        ₹ {booking.totalAmount}
                      </strong>

                    </div>


                    {/* Status*/}

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


                  {/*Card Footer part */}

                  <div className="booking-card-footer">

                  
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

