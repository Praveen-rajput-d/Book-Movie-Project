// import React from 'react'
// import "./HeroBanner.css";
// import { useNavigate } from 'react-router-dom';

// const HeroBanner = ({movie}) => {
//       if(!movie){
//         return null;
//     }
//     const navigate=useNavigate();
//   return (
  
//       <section className="hero-banner"
//        style={{backgroundImage:`url(http://localhost:8080/posters/${movie.posterUrl})`}}
//       >
//         <div className="overlay">
//             <div className="container hero-content">
//                 <h1>{movie.title}</h1>
//                 <p className="lead">{movie.description}</p>
//                 <div className="movie-info">
//                     <span>{movie.rating}</span>
//                     <span>{movie.action}</span>
//                      <span>{movie.language}</span>
//                     <span>{movie.duration} min</span>
//                 </div>
//                 <div className="mt-4">
//                     <button className="btn btn-danger me-3"   onClick={()=> navigate(`/movie/${movie.id}/shows`)}>Book Now</button>
//                     <button className="btn btn-outline-light">  ▶ Watch Trailer</button>
//                 </div>
//             </div>
//         </div>
//       </section>
//   )
// }

// export default HeroBanner




// import React, { useEffect, useState } from "react";
// import "./HeroBanner.css";
// import { useNavigate } from "react-router-dom";
// import Movies from "../../pages/user/Movies";

// const HeroBanner = ({ movie }) => {

//     const navigate = useNavigate();
//       const [currentIndex, setCurrentIndex] = useState(0);
//     //automatically chane movies
//   useEffect(() => {

//         if (!movie || movie.length <= 1) {
//             return;
//         }

//         const interval = setInterval(() => {

//             setCurrentIndex((previousIndex) =>
//                 (previousIndex + 1) % movie.length
//             );

//         }, 4000);

//         return () => clearInterval(interval);

//     }, [movie]);

//     // If movie is not available
//     if (!movie||movie.length===0) {
//         return null;
//     }
// const movie=movie[currentIndex];

//     return (

//         <section
//             className="hero-banner"
//             style={{
//                 backgroundImage: `url(http://localhost:8080/posters/${movie.posterUrl})`   
//             }}
//         >

//             {/* Dark cinematic overlay */}

//             <div className="hero-overlay">


//                 <div className="container hero-content">


//                     {/* Movie badge */}

//                     <div className="hero-badge">
//                         🎬 NOW SHOWING
//                     </div>


//                     {/* Movie title */}

//                     <h1 className="hero-title">
//                         {movie.title}
//                     </h1>


//                     {/* Movie description */}

//                     <p className="hero-description">
//                         {movie.description}
//                     </p>


//                     {/* Movie information */}

//                     <div className="movie-info">


//                         {/* Rating */}

//                         <span className="movie-info-item rating">
//                             ⭐ {movie.rating}
//                         </span>


//                         {/* Genre */}

//                         <span className="movie-info-item">
//                             🎭 {movie.genre || movie.action}
//                         </span>


//                         {/* Language */}

//                         <span className="movie-info-item">
//                             🌐 {movie.language}
//                         </span>


//                         {/* Duration */}

//                         <span className="movie-info-item">
//                             ⏱ {movie.duration} min
//                         </span>


//                     </div>


//                     {/* Buttons */}

//                     <div className="hero-buttons">


//                         <button
//                             className="hero-book-btn"
//                             onClick={() =>
//                                 navigate(`/movie/${movie.id}/shows`)
//                             }
//                         >
//                             🎟 Book Now
//                         </button>


//                         <button
//                             className="hero-trailer-btn"
//                             onClick={() => {

//                                 if (movie.trailerUrl) {

//                                     window.open(
//                                         movie.trailerUrl,
//                                         "_blank"
//                                     );

//                                 } else {

//                                     alert(
//                                         "Trailer is not available"
//                                     );

//                                 }

//                             }}
//                         >
//                             ▶ Watch Trailer
//                         </button>


//                     </div>


//                 </div>

//             </div>


//             {/* Bottom fade */}

//             <div className="hero-bottom-fade"></div>

//         </section>

//     );
// };

// export default HeroBanner;



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