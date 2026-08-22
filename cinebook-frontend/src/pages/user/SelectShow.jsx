// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom';
// import { getShowsByMovie } from '../../services/movieService';
// import { Link} from 'react-router-dom';

// const SelectShow = () => {
//    const[shows,setShows]=useState([]);
//    const{id}=useParams();
//    useEffect(()=>{
//     fetchshows();
//    },[]);
//    function fetchshows(){
//     getShowsByMovie(id).then((Response)=>{
//         console.log(Response.data);
//         setShows(Response.data);
//     })
//     .catch((error)=>{
//         console.error(error);
//     })
//    }
   
//   return (
//     <div className="container mt-5">
//         <h2 className="text-center mb-5">🎬 Available Shows</h2>
//         {
//          shows.length===0 ? <div className="text-center">
//             <h3>No Shows Available</h3>
//             </div>
//             :shows.map((show)=>(
//             <div className="card shadow-lg mb-4 border-0" key={show.id}>
//                 <div className="card-body">
//                     <div className="row align-items-center">
//                         <div className="col-md-8">
//                             <h3 className="fw-bold"> 🏢 {show.theaterName}</h3>
//                             <h5 className="text-secondary">  📺 {show.screenName}</h5>
//                             <p className="mb-1">📅 {show.showDate}</p>
//                              <p className="mb-1">  ⏰ {show.startTime}</p>
//                              <span className="badge bg-success">  ₹ {show.ticketPrice}</span>
//                         </div>
//                         <div className="col-md-4 text-end">
//                            <Link to={`/seat-selection/${show.id}`}
//                            className="btn btn-danger">Select Seats</Link>
//                         </div>
//                 </div>
//                 </div>
//                 </div>
//          ))   
//         }
//     </div>
//   );
// }

// export default SelectShow





import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getShowsByMovie } from "../../services/movieService";
import "../../assets/styles/user/SelectShows.css";

const SelectShow = () => {

    const [shows, setShows] = useState([]);

    const { id } = useParams();


    // ================= FETCH SHOWS =================

    useEffect(() => {

        fetchShows();

    }, [id]);


    const fetchShows = async () => {

        try {

            const response = await getShowsByMovie(id);

            console.log(response.data);

            setShows(response.data);

        } catch (error) {

            console.error(error);

        }
    };


    return (

        <div className="select-show-page">

            <div className="container">


                {/* ================= HEADER ================= */}

                <div className="select-show-header">

                    <div className="show-title-icon">
                        🎬
                    </div>

                    <div>

                        <h2>
                            Available Shows
                        </h2>

                        <p>
                            Select a showtime and book your seats
                        </p>

                    </div>

                </div>


                {/* ================= SHOW COUNT ================= */}

                {shows.length > 0 && (

                    <div className="show-count">

                        <span>
                            {shows.length}
                        </span>

                        shows available

                    </div>

                )}


                {/* ================= NO SHOWS ================= */}

                {shows.length === 0 ? (

                    <div className="no-shows-card">

                        <div className="no-show-icon">
                            🎬
                        </div>

                        <h4>
                            No Shows Available
                        </h4>

                        <p>
                            There are currently no shows available
                            for this movie.
                        </p>

                        <Link
                            to="/movies"
                            className="browse-movies-btn"
                        >
                            Browse Movies
                        </Link>

                    </div>

                ) : (

                    /* ================= SHOW LIST ================= */

                    <div className="shows-grid">

                        {shows.map((show) => (

                            <div
                                className="show-card"
                                key={show.id}
                            >


                                {/* CARD HEADER */}

                                <div className="show-card-header">

                                    <div className="show-date">

                                        <span>
                                            DATE
                                        </span>

                                        <strong>
                                            {show.showDate}
                                        </strong>

                                    </div>

                                    <div className="show-price">

                                        <span>
                                            FROM
                                        </span>

                                        <strong>
                                            ₹ {show.ticketPrice}
                                        </strong>

                                    </div>

                                </div>


                                {/* CARD BODY */}

                                <div className="show-card-body">


                                    {/* Theatre */}

                                    <div className="show-location">

                                        <div className="location-icon">
                                            🏢
                                        </div>

                                        <div>

                                            <span>
                                                Theatre
                                            </span>

                                            <h5>
                                                {show.theaterName}
                                            </h5>

                                        </div>

                                    </div>


                                    {/* Screen */}

                                    <div className="show-info-row">

                                        <div className="show-info-item">

                                            <span className="info-icon">
                                                📺
                                            </span>

                                            <div>

                                                <small>
                                                    Screen
                                                </small>

                                                <strong>
                                                    {show.screenName}
                                                </strong>

                                            </div>

                                        </div>


                                        {/* Time */}

                                        <div className="show-info-item">

                                            <span className="info-icon">
                                                ⏰
                                            </span>

                                            <div>

                                                <small>
                                                    Showtime
                                                </small>

                                                <strong>
                                                    {show.startTime}
                                                </strong>

                                            </div>

                                        </div>

                                    </div>


                                    {/* BOOK BUTTON */}

                                    <Link
                                        to={`/seat-selection/${show.id}`}
                                        className="select-seat-btn"
                                    >
                                        Select Seats
                                        <span>→</span>
                                    </Link>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
};

export default SelectShow;
