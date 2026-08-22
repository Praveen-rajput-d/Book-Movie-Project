// import React, { useState,useEffect } from 'react'
// import { getAllMovies, getMoviesByGenre, getMoviesByLanguage, searchMovie } from '../../services/movieService';

// import MovieCard from '../../components/movie/MovieCard';
// const Movies = () => {
// const[movies,setMovies]=useState([]);
// const[search,setSearch]=useState("");
// useEffect(()=>{
// fetchMovies();
// },[]);
// //fetch movie from the bakcend
// const fetchMovies=async ()=>{
//   try{
//     const response=await getAllMovies();
//     console.log(response.data);
//     setMovies(response.data.content);
//   }catch(error){
//     console.log(error);
//   }
// }

// //handle search when the user search for movie
// const handleSearch=async()=>{
//   if(search.trim()===""){
//     fetchMovies();
//     return;
//   }
//   try{
//     const response=await searchMovie(search);
//     setMovies(response.data);
//   }catch(error){
//     console.log(error);
//     setMovies([]);
//   }
// }
// //clear the search

// const handleClearSearch=()=>{
//   setSearch("");
//   fetchMovies();
// }

// //for filtering the movie based on the genre
// const handleGenre=async(genre)=>{

//   try{
//     const response=await getMoviesByGenre(genre);
//     console.log("Genre:",genre);
//     console.log("Response:",response.data);
//     setMovies(response.data);

//   }catch(error){
//     console.log(error);
//     setMovies([]);

//   }
// }

// const handleLanguage=async(language)=>{
//   try{
//     const response=await getMoviesByLanguage(language);
//     console.log("Response:",response.data);
//     setMovies(response.data);

//   }catch(error){
//     console.log(error);
//     setMovies([]);

//   }
// }

//   return (
  
//    <div className="container mt-5">

//   <div className="input-group mb-4">
//     <input
//         type="text"
//         className="form-control"
//         placeholder="Search movies..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//     />

//     <button
//         className="btn btn-danger"
//         onClick={handleSearch}
//     >
//         Search
//     </button>
//     <button className="btn btn-secondary" onClick={handleClearSearch} >Clear</button>
// </div>
// <div className="mb-4">

//     <h6 className="fw-bold mb-2">Genre</h6>

//     <button
//         className="btn btn-outline-danger btn-sm me-2 mb-2"
//         onClick={fetchMovies}
//     >
//         All
//     </button>

//     <button
//         className="btn btn-outline-danger btn-sm me-2 mb-2"
//         onClick={() => handleGenre("Action")}
//     >
//         Action
//     </button>

//     <button
//         className="btn btn-outline-danger btn-sm me-2 mb-2"
//         onClick={() => handleGenre("Comedy")}
//     >
//         Comedy
//     </button>

//     <button
//         className="btn btn-outline-danger btn-sm me-2 mb-2"
//         onClick={() => handleGenre("Drama")}
//     >
//         Drama
//     </button>

// </div>

// <div className="mb-4">

//     <h6 className="fw-bold mb-2">Language</h6>

//     <button
//         className="btn btn-outline-primary btn-sm me-2 mb-2"
//         onClick={() => handleLanguage("Hindi")}
//     >
//         Hindi
//     </button>

//     <button
//         className="btn btn-outline-primary btn-sm me-2 mb-2"
//         onClick={() => handleLanguage("English")}
//     >
//         English
//     </button>

// </div>

//     <h1>Movies</h1>
//     <p>Explore all Movies</p>
//          <p>Explore all movies</p>

// <div className="row g-4 mt-3">

//     {movies.map((movie) => (

//         <div
//             className="col-md-4 col-lg-4"
//             key={movie.id}
//         >

//             <MovieCard movie={movie} />

//         </div>

//     ))}

// </div>
//    </div>
//   )
// }

// export default Movies





import React, { useState, useEffect } from "react";

import {
    getAllMovie,
    getAllMovies,
    getMoviesByGenre,
    getMoviesByLanguage,
    searchMovie
} from "../../services/movieService";

import MovieCard from "../../components/movie/MovieCard";

import "../../assets/styles/user/Movies.css";


const Movies = () => {

    const [movies, setMovies] = useState([]);

    const [search, setSearch] = useState("");

    const [activeGenre, setActiveGenre] = useState("All");

    const [activeLanguage, setActiveLanguage] = useState("All");

    const [loading, setLoading] = useState(false);


    // =====================================================
    // FETCH ALL MOVIES
    // =====================================================

    useEffect(() => {

        fetchMovies();

    }, []);


    const fetchMovies = async () => {

        setLoading(true);

        try {

            const response = await getAllMovie();

            console.log(response.data);

            setMovies(response.data);

        } catch (error) {

            console.log(error);

            setMovies([]);

        } finally {

            setLoading(false);

        }

    };


    // =====================================================
    // SEARCH MOVIE
    // =====================================================

    const handleSearch = async () => {

        if (search.trim() === "") {

            fetchMovies();

            return;

        }


        setLoading(true);

        try {

            const response = await searchMovie(search);

            setMovies(response.data);

        } catch (error) {

            console.log(error);

            setMovies([]);

        } finally {

            setLoading(false);

        }

    };


    // =====================================================
    // CLEAR SEARCH
    // =====================================================

    const handleClearSearch = () => {

        setSearch("");

        setActiveGenre("All");

        setActiveLanguage("All");

        fetchMovies();

    };


    // =====================================================
    // SEARCH ON ENTER
    // =====================================================

    const handleSearchKeyDown = (e) => {

        if (e.key === "Enter") {

            handleSearch();

        }

    };


    // =====================================================
    // GENRE FILTER
    // =====================================================

    const handleGenre = async (genre) => {

        setActiveGenre(genre);

        setActiveLanguage("All");

        setLoading(true);


        try {

            const response =
                await getMoviesByGenre(genre);

            console.log("Genre:", genre);

            console.log("Response:", response.data);

            setMovies(response.data);

        } catch (error) {

            console.log(error);

            setMovies([]);

        } finally {

            setLoading(false);

        }

    };


    // =====================================================
    // LANGUAGE FILTER
    // =====================================================

    const handleLanguage = async (language) => {

        setActiveLanguage(language);

        setActiveGenre("All");

        setLoading(true);


        try {

            const response =
                await getMoviesByLanguage(language);

            console.log("Language:", language);

            console.log("Response:", response.data);

            setMovies(response.data);

        } catch (error) {

            console.log(error);

            setMovies([]);

        } finally {

            setLoading(false);

        }

    };


    // =====================================================
    // ALL MOVIES
    // =====================================================

    const handleAllMovies = () => {

        setActiveGenre("All");

        setActiveLanguage("All");

        setSearch("");

        fetchMovies();

    };


    return (

        <div className="movies-page">


            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <section className="movies-header">

                <div className="container">

                    <div className="movies-header-content">

                        <span className="movies-badge">
                            🎬 CINEBOOK
                        </span>

                        <h1>
                            Explore Movies
                        </h1>

                        <p>
                            Discover the latest movies and book
                            your favourite seats instantly.
                        </p>

                    </div>

                </div>

            </section>


            {/* =================================================
                MAIN CONTENT
            ================================================= */}

            <div className="container movies-container">


                {/* =================================================
                    SEARCH
                ================================================= */}

                <div className="movie-search-card">

                    <div className="movie-search">

                        <span className="search-icon">
                            🔍
                        </span>

                        <input
                            type="text"
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            onKeyDown={handleSearchKeyDown}
                            placeholder="Search for movies..."
                        />

                        {search && (

                            <button
                                className="search-clear"
                                onClick={() =>
                                    setSearch("")
                                }
                            >
                                ✕
                            </button>

                        )}

                        <button
                            className="search-btn"
                            onClick={handleSearch}
                        >
                            Search
                        </button>

                    </div>

                    <button
                        className="clear-filter-btn"
                        onClick={handleClearSearch}
                    >
                        Clear All
                    </button>

                </div>


                {/* =================================================
                    FILTERS
                ================================================= */}

                <div className="movie-filter-card">


                    {/* Genre */}

                    <div className="filter-group">

                        <div className="filter-title">

                            <span>
                                🎭
                            </span>

                            Genre

                        </div>


                        <div className="filter-buttons">

                            <button
                                className={
                                    activeGenre === "All"
                                        ? "filter-btn genre-active"
                                        : "filter-btn"
                                }
                                onClick={handleAllMovies}
                            >
                                All
                            </button>

                            <button
                                className={
                                    activeGenre === "Action"
                                        ? "filter-btn genre-active"
                                        : "filter-btn"
                                }
                                onClick={() =>
                                    handleGenre("Action")
                                }
                            >
                                Action
                            </button>

                            <button
                                className={
                                    activeGenre === "Comedy"
                                        ? "filter-btn genre-active"
                                        : "filter-btn"
                                }
                                onClick={() =>
                                    handleGenre("Comedy")
                                }
                            >
                                Comedy
                            </button>

                            <button
                                className={
                                    activeGenre === "Drama"
                                        ? "filter-btn genre-active"
                                        : "filter-btn"
                                }
                                onClick={() =>
                                    handleGenre("Drama")
                                }
                            >
                                Drama
                            </button>

                        </div>

                    </div>


                    <div className="filter-divider"></div>


                    {/* Language */}

                    <div className="filter-group">

                        <div className="filter-title">

                            <span>
                                🌐
                            </span>

                            Language

                        </div>


                        <div className="filter-buttons">

                            <button
                                className={
                                    activeLanguage === "All"
                                        ? "filter-btn language-active"
                                        : "filter-btn"
                                }
                                onClick={handleAllMovies}
                            >
                                All
                            </button>

                            <button
                                className={
                                    activeLanguage === "Hindi"
                                        ? "filter-btn language-active"
                                        : "filter-btn"
                                }
                                onClick={() =>
                                    handleLanguage("Hindi")
                                }
                            >
                                Hindi
                            </button>

                            <button
                                className={
                                    activeLanguage === "English"
                                        ? "filter-btn language-active"
                                        : "filter-btn"
                                }
                                onClick={() =>
                                    handleLanguage("English")
                                }
                            >
                                English
                            </button>

                        </div>

                    </div>

                </div>


                {/* =================================================
                    MOVIE SECTION HEADER
                ================================================= */}

                <div className="movie-section-header">

                    <div>

                        <h2>
                            Movies
                        </h2>

                        <p>
                            {movies.length} movies available
                        </p>

                    </div>

                </div>


                {/* =================================================
                    LOADING
                ================================================= */}

                {loading ? (

                    <div className="movies-loading">

                        <div className="movies-spinner"></div>

                        <p>
                            Finding movies...
                        </p>

                    </div>

                ) : movies.length === 0 ? (

                    /* =================================================
                       EMPTY STATE
                    ================================================= */

                    <div className="movies-empty">

                        <div className="empty-icon">
                            🎬
                        </div>

                        <h3>
                            No Movies Found
                        </h3>

                        <p>
                            We couldn't find any movies matching
                            your search or filters.
                        </p>

                        <button
                            onClick={handleAllMovies}
                        >
                            View All Movies
                        </button>

                    </div>

                ) : (

                    /* =================================================
                       MOVIE GRID
                    ================================================= */

                    <div className="row movie-grid">

                        {movies.map((movie) => (

                            <div
                                className="col-12 col-sm-6 col-lg-4 col-xl-3"
                                key={movie.id}
                            >

                                <MovieCard
                                    movie={movie}
                                />

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>

    );

};

export default Movies;

