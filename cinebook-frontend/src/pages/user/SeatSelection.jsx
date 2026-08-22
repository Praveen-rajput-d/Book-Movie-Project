// import React, { useEffect, useState } from 'react'
// import { Await, useNavigate, useParams } from 'react-router-dom';
// import { getSeatsByShow } from '../../services/SeatService';
// import {getShowById} from "../../services/showService";
// import { createBooking } from '../../services/bookingService';


// const SeatSelection = () => {
//     const{showId}=useParams();
//     const[seat,setSeat]=useState([]);
//     const[selectedSeat,setSelectedseat]=useState([]);
//     const[show,setShow]=useState(null);
//     const totalprice=show?selectedSeat.length*show.ticketPrice:0;
//     const navigate=useNavigate();
//     //function to make the seat clickable and select seat
//     const handleSeatClick=(seat)=>{
    
//         if(seat.booked) return;

//         const alreadySelected=selectedSeat.find(s=>s.id===seat.id);
//         if(alreadySelected){
//             setSelectedseat(selectedSeat.filter(s=>s.id!==seat.id));
//         }else{
//             setSelectedseat([
//                 ...selectedSeat,seat
//             ]);
//         }
//     };
//     //use effect for fetching seats is render only one time
//     useEffect(()=>{
//      fetchSeats();
//      fetchShow();
//     },[]);



//       const fetchSeats= async()=>{
//         try{
//             const response=await getSeatsByShow(showId);
//             setSeat(response.data);
//         }catch(error){
//             console.log(error);
//         }
//       }

//       const fetchShow=async()=>{
//         try{
//             const response= await  getShowById(showId);
//             console.log(response.data);
//             setShow(response.data);
//         }catch(error)
//         {
//             console.log(error);
//         }
//       };

//       //use for the booking
//       const bookingdata={
//         showId:Number(showId), 
//         seatIds:selectedSeat.map(seat=>seat.id)
//       };
//       console.log(bookingdata)

       
//        //handle booking method logic
//        const handleBooking=async ()=>{
//          const bookingdata={
//             showId:Number(showId),
//             seatIds:selectedSeat.map((seat)=>
//                 seat.id
//             )
//          };
//          console.log(bookingdata);

//          try{
//             const response=await createBooking(bookingdata);
//             console.log(response.data);
//             alert("Booking created Successfully!");
//             localStorage.setItem("bookedId",response.data.id);
//             navigate("/payment");
//          }catch(error){
//             console.log(error);
//             alert("Bookin Failed");
//          }
//        }
      
//   return (
//     <div className="container mt-5">
//       <h2 className="text-center mb-4">Select Your Seats</h2>
//       {/*screen banner  and after that legend*/}
//       <div className="text-center mb-5">
//                     <div className="bg-secondary text-white py-2 rounded"style={{
//                         width:"60%",
//                         margin:"auto",
//                         fontWeight:"bold"
//                     }}>SCREEN</div>
//                 </div>
//                 <div className="d-flex justify-content-center gap-4 mb-4">
//                     <span className="btn btn-success btn-sm">Available</span>
//                          <span className="btn btn-danger btn-sm">Booked</span>
//                               <span className="btn btn-primary btn-sm">Selected</span>
//                 </div>

//         <div className="row justify-content-center">
//             <div className="col md-8">
//                 <div className="d-flex flex-wrap justify-content-center">
//                     {
//                         seat.map((seat)=>(
//                             <button onClick={()=>handleSeatClick(seat)} key={seat.id}
//                             className={`btn m-2${
//                                 seat.booked
//                                 ?"btn-danger"
//                                 :selectedSeat.some(s=>s.id===seat.id)?
//                                 "btn-primary":"btn-success"}`} disabled={seat.booked}>{seat.seatNumber}</button>
//                         ))
//                     }
//                 </div>
                
//                 <hr/>
//                 <h4>Selected Seats</h4>
//                 <p>
//                     {
//                         selectedSeat.length===0 ? "No Seat Selected":
//                         selectedSeat.map(seat=>seat.seatNumber).join(", ")
//                     }
//                 </p>

//                 <h5 className="mt-4">Ticket Price:₹ {show ? show.ticketPrice : 0}</h5>
//                 <h4 className="text-success">Total:  ₹ {totalprice}</h4>
//                 <button onClick={handleBooking}  key={seat.id} className="btn btn-danger mt-3" disabled={selectedSeat.length===0}>Proceed To Book</button>
//             </div>
//         </div>
//     </div>
    

//   )
// }

// export default SeatSelection






import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSeatsByShow } from "../../services/SeatService";
import { getShowById } from "../../services/showService";
import { createBooking } from "../../services/bookingService";
import "../../assets/styles/user/SeatSelection.css";

const SeatSelection = () => {

  const { showId } = useParams();

  const [seat, setSeat] = useState([]);

  const [selectedSeat, setSelectedseat] = useState([]);

  const [show, setShow] = useState(null);

  const navigate = useNavigate();


  // ================= TOTAL PRICE =================

  const totalprice =
    show
      ? selectedSeat.length * show.ticketPrice
      : 0;


  // ================= SEAT SELECTION =================

  const handleSeatClick = (seat) => {

    // Already booked
    if (seat.booked) return;


    const alreadySelected = selectedSeat.find(
      (s) => s.id === seat.id
    );


    if (alreadySelected) {

      // Remove seat
      setSelectedseat(
        selectedSeat.filter(
          (s) => s.id !== seat.id
        )
      );

    } else {

      // Select seat
      setSelectedseat([
        ...selectedSeat,
        seat,
      ]);

    }
  };


  // ================= FETCH DATA =================

  useEffect(() => {

    fetchSeats();

    fetchShow();

  }, [showId]);


  // Fetch seats
  const fetchSeats = async () => {

    try {

      const response =
        await getSeatsByShow(showId);

      setSeat(response.data);

    } catch (error) {

      console.log(error);

    }
  };


  // Fetch show
  const fetchShow = async () => {

    try {

      const response =
        await getShowById(showId);

      console.log(response.data);

      setShow(response.data);

    } catch (error) {

      console.log(error);

    }
  };


  // ================= BOOKING =================

  const handleBooking = async () => {

    if (selectedSeat.length === 0) {

      alert("Please select at least one seat");

      return;

    }


    const bookingdata = {

      showId: Number(showId),

      seatIds: selectedSeat.map(
        (seat) => seat.id
      ),

    };


    console.log("Booking Data:", bookingdata);


    try {

      const response =
        await createBooking(bookingdata);

      console.log(response.data);

      alert("Booking created successfully!");

      localStorage.setItem(
        "bookedId",
        response.data.id
      );
      localStorage.setItem("bookingNumber",response.data.bookingNumber);

      navigate("/payment");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Booking Failed"
      );

    }
  };


  // ================= LOADING =================

  if (!show) {

    return (

      <div className="seat-loading">

        <div className="spinner-border text-danger"></div>

        <p>
          Loading show...
        </p>

      </div>

    );

  }


  return (

    <div className="seat-selection-page">

      <div className="container">


        {/* ================= PAGE HEADER ================= */}

        <div className="seat-page-header">

          <div>

            <h2>
              Select Your Seats
            </h2>

            <p>
              Choose your preferred seats for the movie
            </p>

          </div>

        </div>


        {/* ================= SHOW INFORMATION ================= */}

        <div className="show-info-bar">

          <div>

            <span>
              Movie
            </span>

            <strong>
              {show.movieName || "Movie"}
            </strong>

          </div>


          <div>

            <span>
              Date
            </span>

            <strong>
              {show.showDate}
            </strong>

          </div>


          <div>

            <span>
              Time
            </span>

            <strong>
              {show.startTime}
            </strong>

          </div>


          <div>

            <span>
              Ticket Price
            </span>

            <strong>
              ₹ {show.ticketPrice}
            </strong>

          </div>

        </div>


        {/* ================= SCREEN ================= */}

        <div className="cinema-screen-area">

          <div className="screen-shape">
            SCREEN
          </div>

          <p>
            All eyes this way
          </p>

        </div>


        {/* ================= LEGEND ================= */}

        <div className="seat-legend">

          <div className="legend-item">

            <span className="legend-seat available"></span>

            <span>
              Available
            </span>

          </div>


          <div className="legend-item">

            <span className="legend-seat selected"></span>

            <span>
              Selected
            </span>

          </div>


          <div className="legend-item">

            <span className="legend-seat booked"></span>

            <span>
              Booked
            </span>

          </div>

        </div>


        {/* ================= SEATS ================= */}

        <div className="seat-area">

          <div className="seat-grid">

            {seat.map((seat) => (

              <button
                key={seat.id}
                onClick={() =>
                  handleSeatClick(seat)
                }
                disabled={seat.booked}
                className={`cinema-seat ${
                  seat.booked
                    ? "seat-booked"
                    : selectedSeat.some(
                        (s) => s.id === seat.id
                      )
                    ? "seat-selected"
                    : "seat-available"
                }`}
              >

                {seat.seatNumber}

              </button>

            ))}

          </div>

        </div>


        {/* ================= BOOKING SUMMARY ================= */}

        <div className="booking-summary">


          {/* Selected seats */}

          <div className="selected-seat-info">

            <h5>
              Selected Seats
            </h5>

            <div className="selected-seats-display">

              {selectedSeat.length === 0 ? (

                <span className="no-seat">
                  No seats selected
                </span>

              ) : (

                selectedSeat.map((seat) => (

                  <span
                    className="selected-seat-tag"
                    key={seat.id}
                  >
                    {seat.seatNumber}
                  </span>

                ))

              )}

            </div>

          </div>


          {/* Price */}

          <div className="price-summary">

            <div className="price-row">

              <span>
                Seats
              </span>

              <strong>
                {selectedSeat.length}
              </strong>

            </div>


            <div className="price-row">

              <span>
                Price per seat
              </span>

              <strong>
                ₹ {show.ticketPrice}
              </strong>

            </div>


            <div className="price-total">

              <span>
                Total
              </span>

              <strong>
                ₹ {totalprice}
              </strong>

            </div>

          </div>


          {/* Book button */}

          <button
            onClick={handleBooking}
            className="proceed-booking-btn"
            disabled={selectedSeat.length === 0}
          >

            {selectedSeat.length === 0
              ? "Select Seats to Continue"
              : "Proceed to Book →"}

          </button>

        </div>

      </div>

    </div>
  );
};

export default SeatSelection;

