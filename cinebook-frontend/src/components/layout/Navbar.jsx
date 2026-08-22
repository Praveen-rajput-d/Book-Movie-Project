import React, { useEffect, useState } from 'react'
import {  NavLink } from 'react-router-dom';

import { useNavigate } from "react-router-dom";
import { getMyProfile } from '../../services/profileService';
import "../../assets/styles/user/Navbar.css";
const Navbar = () => {
    const navigate=useNavigate();
    const Logout=()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("role");
        navigate("/login");
    };
    //for showing the profile in navbar
    const[user,setUser]=useState(null);
    useEffect(()=>{
        loadProfile();
    },[]);
    const loadProfile=async()=>{
        try{
            const response=await getMyProfile();
            setUser(response.data);
        }catch(error){
            console.log(error);
        }
    };

    //for detect login
    const token=localStorage.getItem("token");

  return (
     <nav className="navbar navbar-expand-lg cine-navbar">
        <div className="container">
            {/*logo*/}
            <NavLink to="/" className="navbar-brand cine-logo"> 🎬BookMovie</NavLink>
  
            {/*mobile toggle button*/}
           <button className="navbar-toggler" type="button"
           data-bs-toggle="collapse"
           data-bs-target="#navbarNav"
           aria-expanded="false"
           aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
           </button>

       
      {/*Navigation*/}
    <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto align-items-lg-center">

           <li className="nav-item">
            <NavLink className="nav-link cine-nav-link" to="/">Home</NavLink>
           </li>

            <li className="nav-item">
            <NavLink className="nav-link cine-nav-link" to="/movies">Movies</NavLink>
           </li>
             {/*Login button condition here*/}
           {
            token ?(
                

              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle profile-dropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={(e)=>e.preventDefault()}>
                    <span className="profile-icon">👤</span>

                    <span className="profile-name">{user?user.firstName:"Profile"}</span>
                
                </a>

                    {/*Profile dropdown started  like myprofile,mybooking etc*/}
                <ul className="dropdown-menu dropdown-menu-end cine-dropdown">
                    <li>
                        <NavLink className="dropdown-item" to="/profile">👤My Profile</NavLink>
                    </li>

                                        <li>
                        <NavLink className="dropdown-item" to="/myBookings">🎟️My Bookings</NavLink>
                    </li>
                                        <li>
                        <NavLink className="dropdown-item" to="/my-tickets">🎫My Tickets</NavLink>
                    </li>
                    <li>
                        <hr className="dropdown-divider"/>
                        </li>
                    <li>
                        <button className="dropdown-item logout-item" onClick={Logout}>🚪Logout</button>
                    </li>
                </ul>
              </li>

                 
            

            ):(
            
                <>
                 {/*login ,register button when user is logout*/}
                <li className="nav-item">
                    <NavLink className="nav-link cine-nav-link" to="/login">Login</NavLink>
                </li>


                  <li className="nav-item">
                    <NavLink className="nav-link cine-nav-link" to="/register">Register</NavLink>
                </li>
                
                </>
            )
           }
        </ul>
    </div>
        </div>
     </nav>
  );
}

export default Navbar