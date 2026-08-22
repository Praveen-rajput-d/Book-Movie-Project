import React, { useEffect, useState } from 'react'
import { activateMovie, deleteMovie, getAllMovie, getMoviesByGenre, getMoviesByLanguage, getReleaseMovies, getRunningMovies, getUpcomingMovies, searchMovie } from '../../services/movieService';
import { Navigate, useNavigate } from 'react-router-dom';

const AdminMovies = () => {
    const[movies,setMovies]=useState([]);
    const[loading,setLoading]=useState(true);
    const[search,setSearch]=useState("");
    const[genre,setgenre]=useState("");
    const[language,setLanguage]=useState("");
    const[filtertype,setfiltertype]=useState("");
    const navigate=useNavigate();
    useEffect(()=>{
 fetchMovies();
    },[]);
    const fetchMovies=async()=>{
        try{
            const response= await getAllMovie();
            console.log(response.data);
            setMovies(response.data);
        }catch(error){
            console.log("Error Fetching Movies:",error);
        }finally{
            setLoading(false);
        }

    }



    const handledeactivate=async(id)=>{
        const confirmdelete=window.confirm("Are you sure you want to delete this Movie?");
        if(!confirmdelete){
            return;
        }
        try{
            await deleteMovie(id);
            alert("Movie Deleted Successfully");
            fetchMovies();
        }catch(error){
            console.error("Error deactivating Movie:",error);
            alert("Failed to deactivate Movie");
        }
    }

    const handleactivate=async(id)=>{
        const confirmactivate=window.confirm("Are you sure you want to activate this Movie?");
        if(!confirmactivate){
            return;
        }
        try{
            await activateMovie(id);
            alert("Movie Activated Successfully");
            fetchMovies();
        }catch(error){
            console.log("Error activating Movie",error);
            alert("Failed to Activate Movie")
        }
    }
  

const searchbutton=async()=>{
    setLanguage("");
    setfiltertype("");
    setgenre("");
  
    try{
          if(!search.trim()){
        fetchMovies();
        return;

    }
        setLoading(true);
        const response=await searchMovie(search);
        console.log(response.data);
       setMovies(response.data)
    }catch(error){
        console.log(error);
        setMovies([]);
    }finally{
        setLoading(false);
    }
}

const filterbygenre=async(value)=>{
    setSearch("");
    setLanguage("");
    setfiltertype("");
    setgenre(value);
    if(!value){
        fetchMovies();
        return;
    }
    try{
        setLoading(true);
        const response=await getMoviesByGenre(value);
        console.log(response.data);
        setMovies(response.data);
    }catch(error){
        console.log(error);
        setMovies([]);
    }finally{
        setLoading(false);
    }

}
 const filterbylanguage=async(value)=>{
    setSearch("");
    setgenre("");
    setfiltertype("");
    setLanguage(value);
    if(!value){
        fetchMovies();
        return;
    }
    try{
        setLoading(true);
        const response=await getMoviesByLanguage(value);
        console.log(response.data);
        setMovies(response.data);
    }catch(error){
        console.log(error);
        setMovies([]);
    }finally{
        setLoading(false);
    }

 }

const clearbutton=()=>{
    setSearch("");
    setgenre("");
    setLanguage("");
    setStatus("");
    setfiltertype("");
    fetchMovies();
    
}

const filterbyMovieType=async(value)=>{
    setSearch("");
   
    setgenre("");
    setLanguage("");

   setfiltertype(value);
   try{
    setLoading(true);
    let resposne;
    if(value===""){
        resposne=await getAllMovie();
    
    }else if(value==="active"){
        resposne =await getRunningMovies();
    }else if(value==="upcoming"){
        resposne=await getUpcomingMovies();
    }else if(value==="released"){
        resposne=await getReleaseMovies();
    }
    console.log(value);
    console.log(resposne.data);
    setMovies(resposne.data);
   }catch(error){
    console.log("Filter Movie Error:",error);
    setMovies([]);
   }finally{
    setLoading(false);
   }
    
}


    // const handleSearchKeyDown = (e) => {

    //     if (e.key === "Enter") {

    //       searchbutton();

    //     }

    // };
    
  return (
  <div>
   

            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>
                    <h2><strong>Movie Management</strong></h2>

                    <p className="text-muted">
                        Manage movies in BookMovie
                    </p>
                </div>

                <button className="btn btn-primary" onClick={()=>{navigate("/admin/movies/add")}}>
                    + Add Movie
                </button>

            </div>

          
        <div className="card shadow-sm mb-4">
            <div className="card-body">
                <h5 className="mb-3"><strong>Search and Filter Movies</strong></h5>
                <div className="row g-3">
                    <div className="col-md-12">
                        <label className="form-label">Search Movie</label>
                        <div className="input-group">
                               <input className="form-control" placeholder="Enter Movie Name.." value={search} onChange={(e)=>setSearch(e.target.value)}/>
                               <button className="btn btn-outline-primary" onClick={searchbutton}>Search</button>

                        </div>
                    
                    </div>


                    {/*Genre filter*/}
                    <div className="col-md-4">
                        <label className="form-label">Genre</label>
                        <select className="form-select" onChange={(e)=>filterbygenre(e.target.value)} value={genre}>
                            <option value="" >All </option>
                                    <option value="Action" >Action</option>
                                            <option  value="Comedy">Comedy</option>
                                                    <option value="Drama" >Drama</option>
                                                    <option value="Thriller">Thriller</option>
                        </select>
                    </div>

                    {/*Language filter*/}
                    <div className="col-md-4">
                        <label className="form-label">Language</label>
                        <select className="form-select" value={language} onChange={(e)=>filterbylanguage(e.target.value)}>
                            <option>All</option>
                            <option>English</option>
                            <option>Hindi</option>
                            <option>Telgu</option>
                            <option>Tamil</option>
                        </select>
                    </div>
  {/* status filter*/}
             <div className="col-md-4">
                <label className="form-label">Movie Type</label>
                <select className="form-select" onChange={(e)=>filterbyMovieType(e.target.value)} value={filtertype}>
                <option value="">All </option>
                <option value="active">Active</option>
                <option value="upcoming">Upcoming</option>
                <option value="released">Released</option>

                </select>
             </div>

               {/* Clear button that refresh the page and clear */}
               <div className="col-md-12 d-flex align-items-end">
                <button className="btn btn-secondary w-100" onClick={clearbutton}>Reset</button>
               </div>
                </div>
            </div>
        </div>


            {/* Movie Table */}
            <div className="card">

                <div className="card-body">

                    <h5 className="card-title mb-3">
                        <strong>Movies</strong>
                    </h5>

                    {loading ? (

                        <p>Loading movies...</p>

                    ) : movies.length === 0 ? (

                        <p className="text-muted">
                            No movies found
                        </p>

                    ) : (

                        <div className="table-responsive">

                            <table className="table table-bordered table-hover">

                                <thead className="table-dark">

                                    <tr>
                                        <th>ID</th>
                                        <th>Poster</th>
                                        <th>Title</th>
                                        <th>Genre</th>
                                        <th>Language</th>
                                        <th>Duration</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                     
                                    </tr>

                                </thead>

                                <tbody>

                                    {movies.map((movie) => (

                                        <tr key={movie.id}>

                                            <td>
                                                {movie.id}
                                            </td>

                                            <td>

                                                <img
                                                    src={`http://localhost:8080/posters/${movie.posterUrl}`}
                                                    alt={movie.title}
                                                    width="70"
                                                    height="90"
                                                    style={{
                                                        objectFit: "cover"
                                                    }}
                                                />

                                            </td>

                                            <td>
                                                {movie.title}
                                            </td>

                                            <td>
                                                {movie.genre}
                                            </td>

                                            <td>
                                                {movie.language}
                                            </td>

                                            <td>
                                                {movie.duration}
                                            </td>
                                            <td>
                                                {movie.active?(
                                                <span className="badge bg-success">Active</span>):
                                                ( <span className="badge bg-danger">InActive</span>)}</td>

                                            <td>

                                                <button
                                                    className="btn btn-sm btn-warning me-2"
                                                    onClick={()=>navigate(`/admin/movies/edit/${movie.id}`)}
                                                >
                                                    Edit
                                                </button>

                                               {movie.active
                                               ?(
                                                <button className="btn btn-danger" onClick={()=>handledeactivate(movie.id)}>Deactivate</button>
                                               ):(
                                                <button className="btn btn-success" onClick={()=>handleactivate(movie.id)}>Activate</button>
                                               )}

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
}
export default AdminMovies