import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";

import "../../assets/styles/user/Register.css";


function Register() {

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        roleId: 2
    });

    const navigate = useNavigate();


    
    // handle input
   

    const handleChange = (e) => {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        });

    };


    // Register button function


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await registerUser(user);

            console.log(response.data);

            alert("Registration Successful!");

            navigate("/login");

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Registration Failed!"
            );

        }

    };


    return (

        <div className="cine-register-page">


            {/*
                Background
           */}

            <div className="cine-register-background"></div>

            <div className="cine-register-overlay"></div>


            {/* 
                Registration container
         */}

            <div className="container cine-register-container">

                <div className="row justify-content-center">

                    <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">


                        {/* 
                            REGISTER CARD
                      */}

                        <div className="cine-register-card">


                            {/* Logo */}

                            <div className="cine-register-logo">

                                🎬 BookMovie

                            </div>


                            {/* Heading */}

                            <h1>
                                Create Account
                            </h1>

                            <p className="cine-register-subtitle">
                                Join CineBook and start booking your
                                favourite movies.
                            </p>


                            {/*
                                Form for registration page
                           */}

                            <form onSubmit={handleSubmit}>


                                {/* First + Last Name */}

                                <div className="row">


                                    <div className="col-md-6">

                                        <div className="cine-register-input">

                                            <label>
                                                First Name
                                            </label>

                                            <input
                                                type="text"
                                                name="firstName"
                                                value={user.firstName}
                                                onChange={handleChange}
                                                placeholder="First name"
                                                required
                                            />

                                        </div>

                                    </div>


                                    <div className="col-md-6">

                                        <div className="cine-register-input">

                                            <label>
                                                Last Name
                                            </label>

                                            <input
                                                type="text"
                                                name="lastName"
                                                value={user.lastName}
                                                onChange={handleChange}
                                                placeholder="Last name"
                                                required
                                            />

                                        </div>

                                    </div>


                                </div>


                                {/* Email */}

                                <div className="cine-register-input">

                                    <label>
                                        Email Address
                                    </label>

                                    <div className="cine-register-input-wrapper">

                                        <span>
                                            ✉
                                        </span>

                                        <input
                                            type="email"
                                            name="email"
                                            value={user.email}
                                            onChange={handleChange}
                                            placeholder="Enter your email"
                                            required
                                        />

                                    </div>

                                </div>


                                {/* Password */}

                                <div className="cine-register-input">

                                    <label>
                                        Password
                                    </label>

                                    <div className="cine-register-input-wrapper">

                                        <span>
                                            🔒
                                        </span>

                                        <input
                                            type="password"
                                            name="password"
                                            value={user.password}
                                            onChange={handleChange}
                                            placeholder="Create a password"
                                            required
                                        />

                                    </div>

                                </div>


                                {/* Phone */}

                                <div className="cine-register-input">

                                    <label>
                                        Phone Number
                                    </label>

                                    <div className="cine-register-input-wrapper">

                                        <span>
                                            📱
                                        </span>

                                        <input
                                            type="tel"
                                            name="phone"
                                            value={user.phone}
                                            onChange={handleChange}
                                            placeholder="Enter phone number"
                                            required
                                        />

                                    </div>

                                </div>


                                {/* Register Button */}

                                <button
                                    type="submit"
                                    className="cine-register-button"
                                >

                                    Create CineBook Account

                                </button>


                            </form>


                            {/* Divider */}

                            <div className="cine-register-divider">

                                <span>
                                    ALREADY A MEMBER?
                                </span>

                            </div>


                            {/* Login */}

                            <p className="cine-login-text">

                                Already have an account?

                                <Link to="/login">
                                    Login
                                </Link>

                            </p>


                            {/* Security */}

                            <div className="cine-register-security">

                                🔒 Your information is securely protected

                            </div>


                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Register;

