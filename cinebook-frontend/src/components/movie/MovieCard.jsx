// import React from 'react'
// import{Link, useNavigate} from "react-router-dom"

// const MovieCard = ({movie}) => {
// const navigate=useNavigate();
// console.log("Movie:",movie);
// console.log("Poster URL:",movie.posterUrl);

// return (


// <div>

//     {/* Movie Poster */}
//     <div className="position-relative">
//       <img
//         src={`http://localhost:8080/api/movies/poster/${movie.posterUrl}`}
//         className="card-img-top"
//         alt={movie.title}
//         style={{
//           height: "320px",
//           objectFit: "cover",
//         }}
      
//       />

//       {/* Rating */}
//       <div
//         className="position-absolute bottom-0 start-0 w-100 px-3 py-2 text-white"
//         style={{
//           background:
//             "linear-gradient(transparent, rgba(0,0,0,0.85))",
//         }}
//       >
//         ⭐ {movie.rating || "N/A"} / 10
//       </div>
//     </div>

//     {/* Movie Details */}
//     <div className="card-body d-flex flex-column">

//       {/* Title */}
//       <h5 className="card-title fw-bold mb-2">
//         {movie.title}
//       </h5>

//       {/* Genre */}
//       <p className="text-muted mb-2">
//         {movie.genre}
//       </p>

//       {/* Movie Information */}
//       <div className="small text-secondary mb-3">

//         <div className="mb-1">
//           🌐 {movie.language}
//         </div>

//         <div className="mb-1">
//           ⏱ {movie.duration} mins
//         </div>

//         <div>
//           📅 {movie.releaseDate}
//         </div>

//       </div>

//       <button
//         className="btn btn-danger w-100 mt-auto fw-semibold"
//         onClick={()=> navigate(`/movie/${movie.id}`)}
//       >
//         Book Now
//       </button>

//     </div>
// </div>

// );
// }

// export default MovieCard





import React from "react";
import { useNavigate } from "react-router-dom";
import "./MovieCard.css";

const MovieCard = ({ movie }) => {

    const navigate = useNavigate();

    return (

        <div className="cine-movie-card">

            {/* =================================================
                MOVIE POSTER
            ================================================= */}

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


            {/* =================================================
                MOVIE INFORMATION
            ================================================= */}

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
