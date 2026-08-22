// import React, { useEffect, useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom';
// import { getMovieById } from '../../services/movieService';

// const MovieDetails = () => {
//     const{id}=useParams();
//     const[movie,setMovie]=useState(null);
//      //for make the button clickable book movie we use navigate hook
//        const navigate=useNavigate();
//     useEffect(()=>{
//       fetchMovie();
//     },[]);

//     function  fetchMovie(){
//       getMovieById(id).
//       then((Response)=>{
//         console.log(Response.data);
//         setMovie(Response.data);
//       })
//       .catch((error)=>{
//         console.log(error);
//       });
//     }

//     if(!movie){
//         return <h2 className="text-center mt-5">Loading</h2>
//     }

   

//   return (
//     <div className="container mt-5">
//         <div className="row">
//             <div className="col-md-4">
//                 <img src={`http://localhost:8080/posters/${movie.posterUrl}`} 
//                 alt={movie.title}
//                 className="img-fluid rounded shadow details-poster"
//                 style={{height:"550px",width:"100%",objectFit:"cover"}}/>

//             </div>
//             <div className="col-md-8">
//                 <h1 className="fw-bold">{movie.title}</h1>
//                 <h4 className="text-warning">⭐ {movie.rating}</h4>
//                 <p>
//                     <strong>Genre:</strong>{movie.genre}
//                 </p>
//                  <p>
//                     <strong>Language:</strong>{movie.language}
//                 </p>
//                  <p>
//                     <strong>Duration:</strong>{movie.duration} min
//                 </p>
//                  <p>
//                     <strong>Release:</strong>{movie.releaseDate}
//                 </p>
//                 <hr/>
//                 <p>
//                     {movie.description}
//                 </p>
//                 <div className="mt-4">
//                     <a href={movie.trailerUrl}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="btn btn-dark me-3">▶ Watch Trailer</a>

//                     <button className="btn btn-danger" 
//                     onClick={()=> navigate(`/movie/${movie.id}/shows`)}>🎟 Book Ticket</button>
//                 </div>
//             </div>
//         </div>  
//     </div>

//   );
// }

// export default MovieDetails






import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieById } from "../../services/movieService";
import "../../assets/styles/user/MovieDetails.css";

const MovieDetails = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [movie, setMovie] = useState(null);


    // ================= FETCH MOVIE =================

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


    // ================= LOADING =================

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


            {/* =================================================
                BACKGROUND
            ================================================= */}

            <div
                className="movie-details-background"
                style={{
                    backgroundImage:
                        `url(http://localhost:8080/posters/${movie.posterUrl})`
                }}
            ></div>


            <div className="movie-details-overlay"></div>


            {/* =================================================
                CONTENT
            ================================================= */}

            <div className="container movie-details-container">


                {/* Back button */}

                <button
                    className="back-movies-btn"
                    onClick={() => navigate("/movies")}
                >
                    ← Back to Movies
                </button>


                <div className="movie-details-card">


                    {/* =================================================
                        POSTER
                    ================================================= */}

                    <div className="movie-poster-section">

                        <img
                            src={`http://localhost:8080/posters/${movie.posterUrl}`}
                            alt={movie.title}
                            className="movie-details-poster"
                        />

                    </div>


                    {/* =================================================
                        MOVIE INFORMATION
                    ================================================= */}

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

