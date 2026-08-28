

import axiosInstance from "./axiosInstance";



export const getAllMovies = (page=0,size=5) => {
    return axiosInstance.get(`/api/movies?page=${page}&size=${size}`);
};

export const getMovieById = (id) => {
    return axiosInstance.get(`/api/movies/${id}`);
};
export const getShowsByMovie = (movieId) => {
    return axiosInstance.get(`/api/show/movie/${movieId}`);
};

export const searchMovie=(title)=>{
    return axiosInstance.get(`/api/movies/search/${title}`);
}
export const getMoviesByGenre=(genre)=>{
    return axiosInstance.get(`/api/movies/genre/${genre}`);
}

export const getRunningMovies=()=>{
    return axiosInstance.get("/api/movies/running");
}
export const getUpcomingMovies=()=>{
    return axiosInstance.get("/api/movies/upcoming");
}
export const getReleaseMovies=()=>{
    return axiosInstance.get("/api/movies/released");
}

export const getMoviesByLanguage=(language)=>{
    return axiosInstance.get(`/api/movies/language/${language}`);
}

export const getAllMovie=()=>{
    return axiosInstance.get("/api/movies/all");
}



//for admin dashboard

export const addMovie=(movie)=>{
    return axiosInstance.post("/api/movies",movie);
}
export const updateMovies=(id,movie)=>{
    return axiosInstance.put(`/api/movies/${id}`,movie);
}

export const activateMovie=(id)=>{
    return axiosInstance.put(`/api/movies/actMovie/${id}`);
}
export const deleteMovie=(id)=>{
    return axiosInstance.put(`/api/movies/deactMovie/${id}`);

}