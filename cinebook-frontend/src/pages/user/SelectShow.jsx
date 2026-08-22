import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getShowsByMovie } from "../../services/movieService";
import "../../assets/styles/user/SelectShows.css";

const SelectShow = () => {

    const [shows, setShows] = useState([]);

    const { id } = useParams();


    // Fetch Shows

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


                {/*header part of the shows*/}

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


                {/* Shows Count */}

                {shows.length > 0 && (

                    <div className="show-count">

                        <span>
                            {shows.length}
                        </span>

                        shows available

                    </div>

                )}


                {/*if there is no shows*/}

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

                    /* Show List */

                    <div className="shows-grid">

                        {shows.map((show) => (

                            <div
                                className="show-card"
                                key={show.id}
                            >


                                {/* card header*/}

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


                                {/* Card body */}

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
