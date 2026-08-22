import React, { useState } from 'react'
import MovieCard from '../../components/movie/MovieCard';
import { useNavigate } from 'react-router-dom';
import { addMovie } from '../../services/movieService';

const AddMovie = () => {
    const[movie,setMovie]=useState({
        title:"",
        description:"",
        genre:"",
        duration:"",
        releaseDate:"",
         posterUrl:"",
        language:"",
        trailerUrl:"",
        rating:""
    });
    const[loading,setLoading]=useState(false);
    const navigate=useNavigate();
    
    const handleChange=(e)=>{
        const{name,value}=e.target;
        setMovie({
            ...movie,[name]:value
        });
    }



      
        const handlesubmit=async(e)=>{
            e.preventDefault();
            try{
             await addMovie(movie);
             alert("Movie Added Successfully");
             navigate("/admin/movies");
            }catch(error){
                console.log(error);
                alert(error.response?.data?.message||"failed to add Movie")
            }finally{
                setLoading(false);
            }
        }
    

  return (
    <div>
        <div className="mb-4">
            <h2>Add Movie</h2>
            <p className="text-muted">Add a new Movie to BookMovie</p>
        </div>
        <div className="card">
            <div className="card-body">
                <form onSubmit={handlesubmit}>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-control">Movie Title</label>
                            <input type="text" name="title" className="form-control" value={movie.title}  onChange={handleChange}required/>
                        </div>

                               <div className="col-md-6 mb-3">
                            <label className="form-control">Genre</label>
                            <input type="text" name="genre" className="form-control" value={movie.genre} onChange={handleChange} required/>
                        </div>

                                  <div className="col-md-6 mb-3">
                            <label className="form-control">Language</label>
                            <input type="text" name="language" className="form-control" value={movie.language} onChange={handleChange} required/>
                        </div>
                                  <div className="col-md-6 mb-3">
                            <label className="form-control">Duration</label>
                            <input type="text" name="duration" className="form-control" value={movie.duration} onChange={handleChange} placeholder="e.g. 2h 30min" required/>
                        </div>

                                  <div className="col-md-6 mb-3">
                            <label className="form-control">Release Date</label>
                            <input type="date" name="releaseDate" className="form-control" value={movie.releaseDate} onChange={handleChange} required/>
                        </div>

                             <div className="col-md-6 mb-3">
                            <label className="form-control">Rating</label>
                            <input type="number" name="rating" className="form-control" value={movie.rating} onChange={handleChange} required/>
                        </div>
                                  <div className="col-md-6 mb-3">
                            <label className="form-control">Poster Url</label>
                            <input type="text" name="posterUrl" className="form-control" value={movie.posterUrl}  onChange={handleChange} placeholder="e.g RRR.jpg"  required/>
                        </div>

        <div className="col-md-6 mb-3">
                            <label className="form-control">Trailer Url</label>
                            <input type="text" name="trailerUrl" className="form-control" value={movie.trailerUrl}  onChange={handleChange} placeholder="e.g RRR.jpg"  required/>
                        </div>
                                  <div className="col-md-6 mb-3">
                            <label className="form-control">Description</label>
                            <input type="text" name="description" className="form-control" value={movie.description} onChange={handleChange} rows="6" required/>
                        </div>

                    </div>
                    <div className="mt-3">
                        {/* <button type="submit" className="btn btn-primary me-2" >{loading?"Adding Movie...":"Add Movie"}</button> */}
                        <button className="btn btn-danger m-2" type="submit">Add Movie</button>
                        {/* <button type="button" className="btn btn-secondary" onClick={()=>{navigate("/admin/movies")}}>Cancel</button> */}
                        <button type="button" className="btn btn-secondary m-3" onClick={()=>{navigate("/admin/movies")}}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default AddMovie