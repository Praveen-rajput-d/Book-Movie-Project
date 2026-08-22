import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getMovieById, updateMovies } from '../../services/movieService';

const EditMovie = () => {
    const {id}=useParams();
    const navigate=useNavigate();
    const[movie,setMovie]=useState({
         title: "",
        description: "",
        genre: "",
        language: "",
        duration: "",
        releaseDate: "",
        posterUrl: "",
        trailerUrl: "",
        rating: "",
        active: true

    });
    const[loading,setLoading]=useState(true);
    useEffect(()=>{
        fetchMovie();
    },[id]);
    const fetchMovie=async()=>{
        try{
            const response=await getMovieById(id);
            setMovie(response.data);
        }catch(error){
            console.log(error);
            alert("Failed to load Movie");
        }finally{
            setLoading(false);
        }
    }
    const handleChange=(e)=>{
        const{name,value}=e.target;
        setMovie({
            ...movie,[name]:value
        });
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            await updateMovies(id,movie);
            alert("Movie Updated Successfully");
            navigate("/admin/movies");
        }catch(error){
            console.log("Error Updating Movie",error);
            alert("Failed to upate Movie");
        }

    }

    if(loading){
        return<h4>Loading movie...</h4>;
    }
  return (
    <div>
        <h2 className="mb-4">Edit Movie</h2>
        <form className="card shadow-sm p-4" onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label className="form-control">Movie Title</label>
                    <input type="text"name="title" className="form-control" value={movie.title} onChange={handleChange}required/>
                </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-control">Genre</label>
                    <input type="text"name="genre" className="form-control" value={movie.genre} onChange={handleChange}required/>
                </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-control">Language</label>
                    <input type="text"name="language" className="form-control" value={movie.language} onChange={handleChange}required/>
                </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-control">Duration(minutes)</label>
                    <input type="number"name="duration" className="form-control" value={movie.duration} onChange={handleChange}required/>
                </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-control">Release Date</label>
                    <input type="date"name="releaseDate" className="form-control" value={movie.releaseDate} onChange={handleChange}required/>
                </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-control">Rating</label>
                    <input type="text"name="rating" className="form-control" value={movie.rating} onChange={handleChange}required/>
                </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-control">Description</label>
                    <input type="text"name="description" className="form-control" value={movie.description} onChange={handleChange}required/>
                </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-control">Poster Url</label>
                    <input type="text"name="posterUrl" className="form-control" value={movie.posterUrl??""} onChange={handleChange}required/>
                </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-control">Trailer Url</label>
                    <input type="text"name="trailerUrl" className="form-control" value={movie.trailerUrl??""} onChange={handleChange}required/>
                </div>

              <div className="col-12 mb-3">
                <div className="form-check">
                    <input type="checkbox" name="active" className="form-check-input" 
                    checked={movie.active??false} onChange={(e)=>{
                        setMovie({
                            ...movie,
                            active:e.target.checked
                        })
                    }}/>
                    <label className="form-check-label">Movie Active</label>

                </div>
              </div>
            </div>
            <div>
                <button type="submit" className="btn btn-danger me-2">Update Movie</button>
                <button type="button" className="btn btn-secondary" onClick={()=>{navigate("/admin/movies")}}>Cancel</button>
            </div>
            
        </form>
    </div>
  )
}

export default EditMovie