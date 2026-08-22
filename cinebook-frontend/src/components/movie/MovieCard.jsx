import React from "react";
import { useNavigate } from "react-router-dom";
import "./MovieCard.css";

const MovieCard = ({ movie }) => {

    const navigate = useNavigate();

    return (

        <div className="cine-movie-card">

            {/*
                MOVIE POSTER
          */}

            <div className="cine-poster-wrapper">

                <img
                    src={`http://localhost:8080/api/movies/poster/${movie.posterUrl}`}
                    alt={movie.title}
                    className="cine-movie-poster"
                />

                {/* Dark overlay */}

                <div className="cine-poster-overlay"></div>


                {/* Rating */}

                <div className="cine-rating">

                    ⭐ {movie.rating || "N/A"}

                </div>


                {/* Genre */}

                <div className="cine-genre">

                    {movie.genre}

                </div>


                {/* Hover button */}

                <button
                    className="cine-quick-view"
                    onClick={() =>
                        navigate(`/movie/${movie.id}`)
                    }
                >
                    View Details
                </button>

            </div>


            {/*
                MOVIE INFORMATION
       */}

            <div className="cine-movie-body">

                {/* Title */}

                <h5 className="cine-movie-title">

                    {movie.title}

                </h5>


                {/* Movie information */}

                <div className="cine-movie-info">

                    <span>
                        🌐 {movie.language}
                    </span>

                    <span>
                        ⏱ {movie.duration} min
                    </span>

                </div>


                {/* Release date */}

                <div className="cine-release-date">

                    📅 {movie.releaseDate}

                </div>


                {/* Book button */}

                <button
                    className="cine-book-button"
                    onClick={() =>
                        navigate(`/movie/${movie.id}`)
                    }
                >
                    🎟 Book Tickets
                </button>

            </div>

        </div>
    );
};

export default MovieCard;
