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



    // Fetch the Movies


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


  
    // Search Movie function


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


    //clear button function for clear the data page


    const handleClearSearch = () => {

        setSearch("");

        setActiveGenre("All");

        setActiveLanguage("All");

        fetchMovies();

    };


    // function for clicking enter to search
  

    const handleSearchKeyDown = (e) => {

        if (e.key === "Enter") {

            handleSearch();

        }

    };



    // Genre function to filter the data


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


    
    // Langauge filter data function
   

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


    // All movies


    const handleAllMovies = () => {

        setActiveGenre("All");

        setActiveLanguage("All");

        setSearch("");

        fetchMovies();

    };


    return (

        <div className="movies-page">


            {/*
                page header of the movie page
        */}

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


            {/*
                Main Content
       */}

            <div className="container movies-container">


                {/*
                    Search bar
            */}

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


                {/* 
                    Filters
           */}

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


                {/* 
                    Movie section header part
            */}

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


                {/* 
                    Loading
              = */}

                {loading ? (

                    <div className="movies-loading">

                        <div className="movies-spinner"></div>

                        <p>
                            Finding movies...
                        </p>

                    </div>

                ) : movies.length === 0 ? (

                    /* 
                       Empty state if no movies found
                */

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

                    /*
                       Movie Grid
             */

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

