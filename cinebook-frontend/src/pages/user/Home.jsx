import React, { useEffect, useState } from 'react'
import MovieCard from '../../components/movie/MovieCard';
import { getAllMovie, getAllMovies } from '../../services/movieService';
import HeroBanner from '../../components/home/HeroBanner';

import "../../assets/styles/user/Home.css";

const Home = () => {
const[movies,setMovies]=useState([]);
useEffect(()=>{
    fetchMovie();
},[]);



const fetchMovie=async()=>{
    try{
        const response= await getAllMovie();
        setMovies(response.data);

    }catch(error){
        console.log(error);

    }
}




const featureMovie=movies.length>0?movies[0]:null;
  return (
     <div div className="home-page">

            {/* Hero Banner */}
        {movies.length > 0 && (
    <HeroBanner movies={movies} />
)}

            {/* Now Showing */}
            <section className="container now-showing-section">

                <h2 className="now-showing-title">
                    Now Showing
                </h2>

                <div className="row g-4">

                    {movies.map((movie) => (
                        <div
                            className="col-12 col-sm-6 col-md-4 col-lg-3 movie-column"
                            key={movie.id}
                        >
                            <MovieCard movie={movie} />
                        </div>
                    ))}

                </div>

            </section>

        </div>
    );
}

export default Home