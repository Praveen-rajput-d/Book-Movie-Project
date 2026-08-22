
import React, { useEffect, useState } from "react";
import "./HeroBanner.css";
import { useNavigate } from "react-router-dom";

const HeroBanner = ({ movies }) => {

    const navigate = useNavigate();

    const [currentIndex, setCurrentIndex] = useState(0);

    // Automatically change movie every 4 seconds
    useEffect(() => {

        if (!movies || movies.length <= 1) {
            return;
        }

        const interval = setInterval(() => {

            setCurrentIndex((previousIndex) =>
                (previousIndex + 1) % movies.length
            );

        }, 4000);

        return () => clearInterval(interval);

    }, [movies]);


    // If movies are not available
    if (!movies || movies.length === 0) {
        return null;
    }


    // Current movie
    const movie = movies[currentIndex];


    return (

        <section
            className="hero-banner"
        >
            <img 
            src={`http://localhost:8080/posters/${movie.posterUrl}`}
            alt={movie.title}
            className="hero-image"/>

            {/* Dark cinematic overlay */}

            <div className="hero-overlay">

                <div className="container hero-content">

                    {/* Movie badge */}

                    <div className="hero-badge">
                        🎬 NOW SHOWING
                    </div>


                    {/* Movie title */}

                    <h1 className="hero-title">
                        {movie.title}
                    </h1>


                    {/* Movie description */}

                    <p className="hero-description">
                        {movie.description}
                    </p>


                    {/* Movie information */}

                    <div className="movie-info">

                        {/* Rating */}

                        <span className="movie-info-item rating">
                            ⭐ {movie.rating}
                        </span>


                        {/* Genre */}

                        <span className="movie-info-item">
                            🎭 {movie.genre || movie.action}
                        </span>


                        {/* Language */}

                        <span className="movie-info-item">
                            🌐 {movie.language}
                        </span>


                        {/* Duration */}

                        <span className="movie-info-item">
                            ⏱ {movie.duration} min
                        </span>

                    </div>


                    {/* Buttons */}

                    <div className="hero-buttons">

                        <button
                            className="hero-book-btn"
                            onClick={() =>
                                navigate(`/movie/${movie.id}/shows`)
                            }
                        >
                            🎟 Book Now
                        </button>


                        <button
                            className="hero-trailer-btn"
                            onClick={() => {

                                if (movie.trailerUrl) {

                                    window.open(
                                        movie.trailerUrl,
                                        "_blank"
                                    );

                                } else {

                                    alert("Trailer is not available");

                                }

                            }}
                        >
                            ▶ Watch Trailer
                        </button>

                    </div>

                </div>

            </div>


            {/* Bottom fade */}

            <div className="hero-bottom-fade"></div>

        </section>

    );
};

export default HeroBanner;