import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieById } from "../../services/movieService";
import "../../assets/styles/user/MovieDetails.css";

const MovieDetails = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [movie, setMovie] = useState(null);


    // Fetch Movie by usedeffect hook

    useEffect(() => {

        fetchMovie();

    }, [id]);


    const fetchMovie = async () => {

        try {

            const response = await getMovieById(id);

            console.log(response.data);

            setMovie(response.data);

        } catch (error) {

            console.log(error);

        }

    };


    // if the movies are loading

    if (!movie) {

        return (

            <div className="movie-loading">

                <div className="movie-spinner"></div>

                <p>
                    Loading movie...
                </p>

            </div>

        );

    }


    return (

        <div className="movie-details-page">


            {/* 
                Background for movie page
           */}

            <div
                className="movie-details-background"
                style={{
                    backgroundImage:
                        `${import.meta.env.VITE_API_URL}/posters/${movie.posterUrl})`
                }}
            ></div>


            <div className="movie-details-overlay"></div>


            {/* 
                Content
          */}

            <div className="container movie-details-container">


                {/* Back button */}

                <button
                    className="back-movies-btn"
                    onClick={() => navigate("/movies")}
                >
                    ← Back to Movies
                </button>


                <div className="movie-details-card">


                    {/*
                        Poster Image
                 */}

                    <div className="movie-poster-section">

                        <img
                            src={`${import.meta.env.VITE_API_URL}/posters/${movie.posterUrl}`}
                            alt={movie.title}
                            className="movie-details-poster"
                        />

                    </div>


                    {/*
                        Movie Information
                  */}

                    <div className="movie-info-section">


                        {/* Movie title */}

                        <h1 className="movie-details-title">
                            {movie.title}
                        </h1>


                        {/* Rating */}

                        <div className="movie-rating">

                            <span className="rating-star">
                                ⭐
                            </span>

                            <strong>
                                {movie.rating}
                            </strong>

                            <span>
                                / 10
                            </span>

                        </div>


                        {/* Movie metadata */}

                        <div className="movie-meta">


                            <span>
                                🎭 {movie.genre}
                            </span>


                            <span>
                                🌐 {movie.language}
                            </span>


                            <span>
                                ⏱ {movie.duration} min
                            </span>


                            <span>
                                📅 {movie.releaseDate}
                            </span>


                        </div>


                        {/* Divider */}

                        <div className="movie-details-divider"></div>


                        {/* About */}

                        <div className="movie-description">

                            <h3>
                                About the Movie
                            </h3>

                            <p>
                                {movie.description}
                            </p>

                        </div>


                        {/* Buttons */}

                        <div className="movie-action-buttons">


                            {/* Trailer */}

                            <a
                                href={movie.trailerUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="watch-trailer-btn"
                            >
                                ▶ Watch Trailer
                            </a>


                            {/* Book */}

                            <button
                                className="book-ticket-btn"
                                onClick={() =>
                                    navigate(
                                        `/movie/${movie.id}/shows`
                                    )
                                }
                            >
                                🎟 Book Tickets
                            </button>


                        </div>


                        {/* Secure booking message */}

                        <div className="secure-booking">

                            <span>
                                🔒
                            </span>

                            <p>
                                Secure booking • Instant confirmation •
                                Easy cancellation
                            </p>

                        </div>


                    </div>

                </div>

            </div>

        </div>

    );

};

export default MovieDetails;

